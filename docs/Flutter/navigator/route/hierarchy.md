# Route类型系统

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

ModalRoute中提供了两个Widgets接口：buildPage、buildTransitions，这两个接口会在_ModalScope中使用来构建页面。那么关联路径如下：

    buildPage、buildTransitions => 
    _ModalScope => 
    _buildModalScope => 
    OverlayEntry => 
    createOverlayEntries => 
    _overlayEntries => 
    Overlay(in Navigator)

_buildModalBarrier方法用于构建背景页面，也就是屏障，会阻断底层Route的页面交互。

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

    @override
  Iterable<OverlayEntry> createOverlayEntries() {
    return <OverlayEntry>[
      _modalBarrier = OverlayEntry(builder: _buildModalBarrier),
      _modalScope = OverlayEntry(builder: _buildModalScope, maintainState: maintainState),
    ];
  }

  Widget _buildModalScope(BuildContext context) {
    // To be sorted before the _modalBarrier.
    return _modalScopeCache ??= Semantics(
      sortKey: const OrdinalSortKey(0.0),
      child: _ModalScope<T>(
        key: _scopeKey,
        route: this,
        // _ModalScope calls buildTransitions() and buildChild(), defined above
      ),
    );
  }

  Widget _buildModalBarrier(BuildContext context) {
    ...
  }
    
}

```


## PageRoute 与 PopupRoute
这两个的区别就是opaque的值不同，但是这就区分了页面和dialog。


1. PageRoute有三个子类：CupertinoPageRoute（iOS风格-切换动画）、MaterialPageRoute（自适应风格-切换动画）、PageRouteBuilder（可以自定义切换动画）这三个的构造函数都要求提供pageBuilder。
2. PopupRoute有两个子类：CupertinoModalPopupRoute、RawDialogRoute，RawDialogRoute也很简单，加了一些barrier属性。
3. RawDialogRoute有两个子类：CupertinoDialogRoute（iOS风格）、DialogRoute（Material风格）。