# Navigator

```dart
class Navigator extends StatefulWidget {

    /// 用于生成history路由表。createRoute方法会生成对应的Route。Navigator.pages API。
    final List<Page<dynamic>> pages;

    /// 当pop时， 如果Route有对应的Page，这个回调会被唤起。[PopPageCallback]负责唤起[Route.didPop]。Navigator.pages API。
    final PopPageCallback? onPopPage;

    final String? initialRoute;
    /// 将initialRoute转换为初始路由表
    final RouteListFactory onGenerateInitialRoutes;

    /// Called to generate a route for a given [RouteSettings].
    final RouteFactory? onGenerateRoute;

    /// 当onGenerateRoute无法生成route时被用来生成route的备用项。
    final RouteFactory? onUnknownRoute; 
    
    /// 路由转场动画
    final TransitionDelegate<dynamic> transitionDelegate;

    /// A list of observers for this navigator.
    final List<NavigatorObserver> observers;


} 
```


```dart
class NavigatorState {
    /// 路由栈
    List<_RouteEntry> _history = <_RouteEntry>[];

    ///overlay 相关
    late GlobalKey<OverlayState> _overlayKey;
    OverlayState? get overlay => _overlayKey.currentState;
    Iterable<OverlayEntry> get _allRouteOverlayEntries

    /// 命名路由匹配, Navigator与命名路由相关的入栈操作，都是使用这个方法来匹配到Route.
    /// 如：Navigator.of(context).pushNamed("/detail");
    /// 1. widget.onGenerateRoute!(settings)
    /// 2. widget.onUnknownRoute!(settings)
    Route<T>? _routeNamed<T>(String name, { required Object? arguments, bool allowNull = false }) {
        if (allowNull && widget.onGenerateRoute == null)
        return null;
        final RouteSettings settings = RouteSettings(
        name: name,
        arguments: arguments,
        );
        Route<T>? route = widget.onGenerateRoute!(settings) as Route<T>?;
        if (route == null && !allowNull) {
        route = widget.onUnknownRoute!(settings) as Route<T>?;
        }
        return route;
    }
}

```


## 重要属性

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

### _RouteEntry
路由Bean对象。

```dart
class _RouteEntry {
    ///路由对象
    final Route<dynamic> route;

    ///路由状态
    _RouteLifecycle currentState;

}
```

### _RouteLifecycle
路由状态

```dart
enum _RouteLifecycle {
  staging, // we will wait for transition delegate to decide what to do with this route.
  //
  // routes that are present:
  //
  add, // we'll want to run install, didAdd, etc; a route created by onGenerateInitialRoutes or by the initial widget.pages
  adding, // we'll waiting for the future from didPush of top-most route to complete
  // routes that are ready for transition.
  push, // we'll want to run install, didPush, etc; a route added via push() and friends
  pushReplace, // we'll want to run install, didPush, etc; a route added via pushReplace() and friends
  pushing, // we're waiting for the future from didPush to complete
  replace, // we'll want to run install, didReplace, etc; a route added via replace() and friends
  idle, // route is being harmless
  //
  // routes that are not present:
  //
  // routes that should be included in route announcement and should still listen to transition changes.
  pop, // we'll want to call didPop
  complete, // we'll want to call didComplete,
  remove, // we'll want to run didReplace/didRemove etc
  // routes should not be included in route announcement but should still listen to transition changes.
  popping, // we're waiting for the route to call finalizeRoute to switch to dispose
  removing, // we are waiting for subsequent routes to be done animating, then will switch to dispose
  // routes that are completely removed from the navigator and overlay.
  dispose, // we will dispose the route momentarily
  disposed, // we have disposed the route
}
```