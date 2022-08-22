# Navigator 2.0
Navigator是Flutter库内置的导航控件，目前是2.0版本，支持page入栈、出栈。多页出栈、中间位置出栈。

* Page：不可变对象，用于设置Navigator的历史栈。
* Router：页面列表配置。
* RouteInformationParser：解析RouteInformationProvider的RouteInformation对象，生成定义好的数据对象。
* RouterDelegate：根据app的状态和RouteInformationParser动态生成Navigator组件。
* BackButtonDispatcher：返回按钮点击回调。


## 导航---Navigator
导航管理Router实例对象。

## 路由---Router

