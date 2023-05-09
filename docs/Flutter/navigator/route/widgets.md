# 关键Widgets
在Route的层级结构中，最重要的是ModalRoute,ModalRoute构建页面依赖于_ModalScope

## _ModalScope

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

## OverlayEntry
Overlay 组件的元素，内部持有Widget。OverlayEntry通过一些参数为使用Widget提高了效率。

1. opaque：当OverlayEntry处于opaque状态时，将跳过Widget构建。
2. maintainState：当为true时，即使当OverlayEntry处于opaque状态，也会构建Widget。
