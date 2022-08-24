# Route
Route在flutter中代表一个路由，并不代表page。Route需要负责携带页面跳转动画，需要携带如何构建页面。Navigator管理的是Route而非Page。在Flutter中，常常说一切都是Widget，但是Route并不是Widget。

## install
当route被插入到Navigator中时调用，负责创建OverlayEntry列表。

## didPush
当route被插入到Navigator后调用，紧随install方法。此方法返回一个Future对象，在push动画完成时，Future完成。


## 对象介绍
### OverlayEntry
OverlayEntry并不是Widget，但是他内部可以构建一个widget。Route可以生成多个OverlayEntry以提供给Navigator来填充到Overlay。

1. maintainState(bool): 当页面完全不可见时，当前OverlayEntry对应的Widget是否仍然被插入Widget树中，默认false。设置为true会有较大开销。
2. opaque(bool): 当前OverlayEntry是否会遮盖整个Overlay。


### RouteSettings
route的数据

1. name：路由名称，如"/settings"。
2. arguments：路由的参数