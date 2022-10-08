# 关键Widgets
Route本身并不是Widget，但是在ModalRoute中提供了两个Widgets接口：buildPage、buildTransitions，这两个接口会在_ModalScope中使用来构建页面。那么关联路径如下：

    buildPage、buildTransitions => 
    _ModalScope => 
    _buildModalScope => 
    OverlayEntry => 
    createOverlayEntries => 
    _overlayEntries => 
    Overlay(in Navigator)

_buildModalBarrier方法用于构建背景页面，也就是屏障，会阻断底层Route的页面交互。但是与这个route的页面内容与动画没有任何关系。
```dart
abstract class ModalRoute<T> extends TransitionRoute<T> with LocalHistoryRoute<T>{
    ...
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

    ...
}
```



## _ModalScope
