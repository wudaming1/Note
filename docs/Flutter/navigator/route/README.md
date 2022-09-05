# Route
Route在flutter中代表一个路由，并不代表page。Route需要负责携带页面跳转动画，需要携带如何构建页面。Navigator管理的是Route而非Page。在Flutter中，常常说一切都是Widget，但是Route并不是Widget。

## install
当route被插入到Navigator中时调用，负责创建OverlayEntry列表。

## didPush
并不是Navigator来执行推入，而是Route自己来执行推入，看起来很奇怪。但是看到在TransitionRoute触发入栈动画```_controller!.forward()```，就感觉挺合理的。毕竟动画只能由Widget实现。

```dart
 ///route
  TickerFuture didPush() {
    return TickerFuture.complete()..then<void>((void _) {
      if (navigator?.widget.requestFocus ?? false) {
        navigator!.focusScopeNode.requestFocus();
      }
    });
  }

  ///TransitionRoute
  @override
  TickerFuture didPush() {
    assert(_controller != null, '$runtimeType.didPush called before calling install() or after calling dispose().');
    assert(!_transitionCompleter.isCompleted, 'Cannot reuse a $runtimeType after disposing it.');
    super.didPush();
    return _controller!.forward();
  }

  ///ModalRoute
  @override
  TickerFuture didPush() {
    if (_scopeKey.currentState != null && navigator!.widget.requestFocus) {
      navigator!.focusScopeNode.setFirstFocus(_scopeKey.currentState!.focusScopeNode);
    }
    return super.didPush();
  }

```


## popped
返回一个Future,这个Future在出栈时被完成。

```dart
Future<T?> get popped => _popCompleter.future;
```


## 对象介绍
### OverlayEntry
OverlayEntry并不是Widget，但是他内部可以构建一个widget。Route可以生成多个OverlayEntry以提供给Navigator来填充到Overlay。

1. maintainState(bool): 当页面完全不可见时，当前OverlayEntry对应的Widget是否仍然被插入Widget树中，默认false。设置为true会有较大开销。
2. opaque(bool): 当前OverlayEntry是否会遮盖整个Overlay。


### RouteSettings
route的数据

1. name：路由名称，如"/settings"。
2. arguments：路由的参数