# 类型系统

## Route
所有route的基类，规定了最基础的能力:

1. 生成overlayEntries，overlayEntries被 Navigator用来填充到内部的Overlay中，route的界面需要被放在overlayEntries中。
2. 传递返回值,通过```didPop```和```didComplete```配合完成，result就是pop时传递的对象。
3. 查询状态：```isCurrent```,```isFirst```,```hasActiveRouteBelow```,```isActive```等。
4. 感知上下路由状态变化的能力:```didPopNext```,```didChangeNext```,```didChangePrevious```

他的唯一直接子类是[OverlayRoute](#overlayroute)

```dart
abstract class Route<T>{
    NavigatorState? get navigator => _navigator;

    RouteSettings get settings => _settings;

    List<OverlayEntry> get overlayEntries => const <OverlayEntry>[];

    ///被调用后，[overlayEntries]至少有一个元素 
    void install() { }

    TickerFuture didPush() {}
    void didAdd() {}
    void didReplace(Route<dynamic>? oldRoute) { }
    bool didPop(T? result) {}
    void didComplete(T? result) {}

    void didPopNext(Route<dynamic> nextRoute) { }
    void didChangeNext(Route<dynamic>? nextRoute) { }
    void didChangePrevious(Route<dynamic>? previousRoute) { }

    bool get isCurrent {}
    bool get isFirst {}
    bool get hasActiveRouteBelow {}
    bool get isActive {}
}
```


## OverlayRoute

就是扩展了下_overlayEntries的填充方式。它的唯一直接子类是[TransitionRoute](#transitionroute)

```dart
abstract class OverlayRoute<T> extends Route<T> {
  /// Subclasses should override this getter to return the builders for the overlay.
  @factory
  Iterable<OverlayEntry> createOverlayEntries();

  @override
  void install() {
    assert(_overlayEntries.isEmpty);
    _overlayEntries.addAll(createOverlayEntries());
    super.install();
  }  
}

```

### TransitionRoute

给Route赋予了转场动画。在didAdd等各种需要动画的地方触发_controller的相应操作，并返回_controller操作的Future。它的直接子类只有[ModalRoute](#modalroute)。

```dart
abstract class TransitionRoute<T> extends OverlayRoute<T> {

    /// 推入和推出这个路由时,控制当前页面的动画的AnimationController。
    Duration get transitionDuration;
    Animation<double>? get animation => _animation;
    AnimationController? get controller => _controller;
    AnimationController createAnimationController() {}
    Animation<double> createAnimation() {}

    /// 当新路由推到这个路由上或者推出上面一个路由时，这个路由的动画。
    Animation<double>? get secondaryAnimation => _secondaryAnimation;

    bool canTransitionTo(TransitionRoute<dynamic> nextRoute) => true;
    bool canTransitionFrom(TransitionRoute<dynamic> previousRoute) => true;
}

```

## ModalRoute

具有阻断前一个route交互的能力，如何阻断目前不清楚。直接子类：PageRoute，PopupRoute。

ModalBarrier用于处理背景点击。

```dart
abstract class ModalRoute<T> extends TransitionRoute<T> with LocalHistoryRoute<T>{
    Widget buildPage(BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation);
    Widget buildTransitions(BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation, Widget child) {
    return child;
  }
    ///  查询自己是否在舞台。
    bool get offstage => _offstage;
    BuildContext? get subtreeContext => _subtreeKey.currentContext;

    /// 是否能推出这个route。
    bool get canPop => hasActiveRouteBelow || willHandlePopInternally;

    @override
    Animation<double>? get animation => _animationProxy;
    ProxyAnimation? _animationProxy;

    @override
    Animation<double>? get secondaryAnimation => _secondaryAnimationProxy;
    ProxyAnimation? _secondaryAnimationProxy;

    bool get barrierDismissible;
    
}

```

### 缓存

_ModalScope 和 _ModalScopeStatus。


_ModalScope是一个StatefulWidget，在State的build中会使用到ModalRoute的buildPage和buildTransitions来构建Builder和AnimatedBuilder。所以动画最终是在_ModalScope来组装的。但是为啥继承关系中把这个能力放在了TransitionRoute？

```dart
class _ModalScopeState<T> extends State<_ModalScope<T>> {
      @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: widget.route.restorationScopeId,
      builder: (BuildContext context, Widget? child) {
        assert(child != null);
        return RestorationScope(
          restorationId: widget.route.restorationScopeId.value,
          child: child!,
        );
      },
      child: _ModalScopeStatus(
        route: widget.route,
        isCurrent: widget.route.isCurrent, // _routeSetState is called if this updates
        canPop: widget.route.canPop, // _routeSetState is called if this updates
        child: Offstage(
          offstage: widget.route.offstage, // _routeSetState is called if this updates
          child: PageStorage(
            bucket: widget.route._storageBucket, // immutable
            child: Builder(
              builder: (BuildContext context) {
                return Actions(
                  actions: <Type, Action<Intent>>{
                    DismissIntent: _DismissModalAction(context),
                  },
                  child: PrimaryScrollController(
                    controller: primaryScrollController,
                    child: FocusScope(
                      node: focusScopeNode, // immutable
                      child: FocusTrap(
                        focusScopeNode: focusScopeNode,
                        child: RepaintBoundary(
                          child: AnimatedBuilder(
                            animation: _listenable, // immutable
                            builder: (BuildContext context, Widget? child) {
                              return widget.route.buildTransitions(
                                context,
                                widget.route.animation!,
                                widget.route.secondaryAnimation!,
                                // This additional AnimatedBuilder is include because if the
                                // value of the userGestureInProgressNotifier changes, it's
                                // only necessary to rebuild the IgnorePointer widget and set
                                // the focus node's ability to focus.
                                AnimatedBuilder(
                                  animation: widget.route.navigator?.userGestureInProgressNotifier ?? ValueNotifier<bool>(false),
                                  builder: (BuildContext context, Widget? child) {
                                    final bool ignoreEvents = _shouldIgnoreFocusRequest;
                                    focusScopeNode.canRequestFocus = !ignoreEvents;
                                    return IgnorePointer(
                                      ignoring: ignoreEvents,
                                      child: child,
                                    );
                                  },
                                  child: child,
                                ),
                              );
                            },
                            child: _page ??= RepaintBoundary(
                              key: widget.route._subtreeKey, // immutable
                              child: Builder(
                                builder: (BuildContext context) {
                                  return widget.route.buildPage(
                                    context,
                                    widget.route.animation!,
                                    widget.route.secondaryAnimation!,
                                  );
                                },
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ),
      ),
    );
  }

}
```

_ModalScopeStatus是一个InheritedWidget，提供和缓存更新相关的能力。


## PageRoute 与 PopupRoute
这两个的区别就是opaque的值不同，但是这就区分了页面和dialog。


1. PageRoute有三个子类：CupertinoPageRoute（iOS风格-切换动画）、MaterialPageRoute（自适应风格-切换动画）、PageRouteBuilder（可以自定义切换动画）这三个的构造函数都要求提供pageBuilder。
2. PopupRoute有两个子类：CupertinoModalPopupRoute、RawDialogRoute，RawDialogRoute也很简单，加了一些barrier属性。
3. RawDialogRoute有两个子类：CupertinoDialogRoute（iOS风格）、DialogRoute（Material风格）。