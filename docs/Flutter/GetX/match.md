# 如何匹配命名路由

1. GetX在Navigator的基础上，添加了对query parameter的支持。
2. 提供默认路由匹配方式，支持正则。
3. 添加中间件流程。

## 准备
1. 在GetMaterialApp的构造函数中getPages负责接收存储路由表。
2. 在GetMaterialApp的build过程中，将路由表添加到ParseRouteTree。

## push

1. Get.pushNamed("xxx")。
2. 将path和parameters合并为Uri，使用Uri作为新的path。
3. 转发的flutter框架的pushNamed方法。
4. flutter框架使用_routeNamed匹配Route。
5. 封装_RouteEntry，推入_RouteEntry到history，刷新栈，完成push流程。

## _routeNamed匹配Route

```dart
Route<T?>? _routeNamed<T>(String name, { required Object? arguments, bool allowNull = false }) {
    if (allowNull && widget.onGenerateRoute == null) {
      return null;
    }
    final RouteSettings settings = RouteSettings(
      name: name,
      arguments: arguments,
    );
    Route<T?>? route = widget.onGenerateRoute!(settings) as Route<T?>?;
    if (route == null && !allowNull) {
      route = widget.onUnknownRoute!(settings) as Route<T?>?;
      
    }
    return route;
  }
```

## 默认的onGenerateRoute 

```dart
Route<dynamic> generator(RouteSettings settings) =>
      PageRedirect(settings, unknownRoute).page();
```

匹配过程发生在PageRedirect的page方法，

1. 根据name找到GetPage=> needCheck()。
2. 根据GetPage生成GetPageRoute。

### needCheck

```dart
 bool needRecheck() {
    /// 找到直接对应的GetPage，解析参数。
    final match = Get.routeTree.matchRoute(settings.name!);
    Get.parameters = match.parameters;

    // No Match found
    if (match.route == null) {
      isUnknown = true;
      return false;
    }

    /// 执行GetPage的中间件。
    final runner = MiddlewareRunner(match.route!.middlewares);
    route = runner.runOnPageCalled(match.route);
    ///刷新 parameters 参数
    addPageParameter(route!);

    // No middlewares found return match.
    if (match.route!.middlewares == null || match.route!.middlewares!.isEmpty) {
      return false;
    }
    final newSettings = runner.runRedirect(settings.name);
    if (newSettings == null) {
      return false;
    }
    settings = newSettings;
    return true;
  }
```

### 生成GetPageRoute

```dart
        GetPageRoute<T>(
            page: route!.page,
            routeName: route!.name,
            parameter: route!.parameter,
            settings: RouteSettings(
                name: settings.name, arguments: settings.arguments),
            curve: route!.curve,
            opaque: route!.opaque,
            customTransition: route!.customTransition,
            binding: route!.binding,
            bindings: route!.bindings,
            transitionDuration:
                (route!.transitionDuration ?? Get.defaultTransitionDuration),
            transition: route!.transition,
            popGesture: route!.popGesture,
            fullscreenDialog: route!.fullscreenDialog,
            middlewares: route!.middlewares)
```

## ParseRouteTree

```dart
    RouteDecoder matchRoute(String name) {
        /// 还原成Uri
        final uri = Uri.parse(name);
        /// 使用纯path来匹配，所以后面的queryParameters不对匹配过程产生影响。
        /// 支持正则匹配
        final route = _findRoute(uri.path);
        final params = Map<String, String?>.from(uri.queryParameters);
        if (route != null) {
        final parsedParams = _parseParams(name, route.path);
        if (parsedParams.isNotEmpty) {
            params.addAll(parsedParams);
        }
        } else {
        Get.log('Route "${uri.path}" not found');
        }

        return RouteDecoder(route, params);
    }

    /// 支持正则匹配
    GetPage? _findRoute(String name) {
    return _routes.firstWhereOrNull(
      (route) => route.path.regex.hasMatch(name),
    );
```

在准备步骤，已经将路由表保存到了ParseRouteTree。通过ParseRouteTree可以匹配到GetPage，并解析出查询参数(queryParameters)。