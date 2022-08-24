# Navigator

## 重要属性

* pages：Page列表
* Router：页面列表配置。
* RouteInformationParser：解析RouteInformationProvider的RouteInformation对象，生成定义好的数据对象。
* RouterDelegate：根据app的状态和RouteInformationParser动态生成Navigator组件。
* BackButtonDispatcher：返回按钮点击回调。


## 对象介绍

### Page
```abstract class Page<T> extends RouteSettings```

1. restorationId：用于存储和恢复Route的状态，一个String标识。存储恢复机制由[RestorationManager](https://api.flutter.dev/flutter/services/RestorationManager-class.html)实现。
2. ```Route<T> createRoute(BuildContext context)```：创建一个与当前Page关联的Route。

其他参数参考[RouteSettings](route.md#routesettings)。