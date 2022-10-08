# Push
无论是使用命名路由还是非命名路由，推入一个路由都必须使用```NavigatorState#push```方法。

## push
创建一个_RouteEntry并初始化为_RouteLifecycle.push状态，然后推入_RouteEntry。

```dart
  Future<T?> push<T extends Object?>(Route<T> route) {
    assert(_debugCheckIsPagelessRoute(route));
    _pushEntry(_RouteEntry(route, initialState: _RouteLifecycle.push));
    return route.popped;
  }
```

## _pushEntry

```dart

  void _pushEntry(_RouteEntry entry) {
    /// 更新路由栈
    _history.add(entry);
    /// 刷新路由栈状态
    _flushHistoryUpdates();
    _afterNavigation(entry.route);
  }
```

##  _flushHistoryUpdates

考虑推入一个Route的简单情况，history中，除了顶部，都处于idle状态。所以仅有顶部route会执行entry.handlePush，其他route并没有任何动作。

```dart
  void _flushHistoryUpdates({bool rearrangeOverlay = true}) {
    _flushingHistory = true;
    // Clean up the list, sending updates to the routes that changed. Notably,
    // we don't send the didChangePrevious/didChangeNext updates to those that
    // did not change at this point, because we're not yet sure exactly what the
    // routes will be at the end of the day (some might get disposed).
    int index = _history.length - 1;
    _RouteEntry? next;
    _RouteEntry? entry = _history[index];
    _RouteEntry? previous = index > 0 ? _history[index - 1] : null;
    bool canRemoveOrAdd = false; // Whether there is a fully opaque route on top to silently remove or add route underneath.
    Route<dynamic>? poppedRoute; // The route that should trigger didPopNext on the top active route.
    bool seenTopActiveRoute = false; // Whether we've seen the route that would get didPopNext.
    final List<_RouteEntry> toBeDisposed = <_RouteEntry>[];
    while (index >= 0) {
      switch (entry!.currentState) {
        case _RouteLifecycle.add:
          assert(rearrangeOverlay);
          entry.handleAdd(
            navigator: this,
            previousPresent: _getRouteBefore(index - 1, _RouteEntry.isPresentPredicate)?.route,
          );
          assert(entry.currentState == _RouteLifecycle.adding);
          continue;
        case _RouteLifecycle.adding:
          if (canRemoveOrAdd || next == null) {
            entry.didAdd(
              navigator: this,
              isNewFirst: next == null,
            );
            assert(entry.currentState == _RouteLifecycle.idle);
            continue;
          }
          break;
        case _RouteLifecycle.push:
        case _RouteLifecycle.pushReplace:
        case _RouteLifecycle.replace:
          assert(rearrangeOverlay);
          entry.handlePush(
            navigator: this,
            previous: previous?.route,
            previousPresent: _getRouteBefore(index - 1, _RouteEntry.isPresentPredicate)?.route,
            isNewFirst: next == null,
          );
          assert(entry.currentState != _RouteLifecycle.push);
          assert(entry.currentState != _RouteLifecycle.pushReplace);
          assert(entry.currentState != _RouteLifecycle.replace);
          if (entry.currentState == _RouteLifecycle.idle) {
            continue;
          }
          break;
        case _RouteLifecycle.pushing: // Will exit this state when animation completes.
          if (!seenTopActiveRoute && poppedRoute != null)
            entry.handleDidPopNext(poppedRoute);
          seenTopActiveRoute = true;
          break;
        case _RouteLifecycle.idle:
          if (!seenTopActiveRoute && poppedRoute != null)
            entry.handleDidPopNext(poppedRoute);
          seenTopActiveRoute = true;
          // This route is idle, so we are allowed to remove subsequent (earlier)
          // routes that are waiting to be removed silently:
          canRemoveOrAdd = true;
          break;
        case _RouteLifecycle.pop:
          if (!entry.handlePop(
                navigator: this,
                previousPresent: _getRouteBefore(index, _RouteEntry.willBePresentPredicate)?.route)){
            assert(entry.currentState == _RouteLifecycle.idle);
            continue;
          }
          if (!seenTopActiveRoute) {
            if (poppedRoute != null)
              entry.handleDidPopNext(poppedRoute);
            poppedRoute = entry.route;
          }
          _observedRouteDeletions.add(
            _NavigatorPopObservation(entry.route, _getRouteBefore(index, _RouteEntry.willBePresentPredicate)?.route),
          );
          if (entry.currentState == _RouteLifecycle.dispose) {
            // The pop finished synchronously. This can happen if transition
            // duration is zero.
            continue;
          }
          assert(entry.currentState == _RouteLifecycle.popping);
          canRemoveOrAdd = true;
          break;
        case _RouteLifecycle.popping:
          // Will exit this state when animation completes.
          break;
        case _RouteLifecycle.complete:
          entry.handleComplete();
          assert(entry.currentState == _RouteLifecycle.remove);
          continue;
        case _RouteLifecycle.remove:
          if (!seenTopActiveRoute) {
            if (poppedRoute != null)
              entry.route.didPopNext(poppedRoute);
            poppedRoute = null;
          }
          entry.handleRemoval(
            navigator: this,
            previousPresent: _getRouteBefore(index, _RouteEntry.willBePresentPredicate)?.route,
          );
          assert(entry.currentState == _RouteLifecycle.removing);
          continue;
        case _RouteLifecycle.removing:
          if (!canRemoveOrAdd && next != null) {
            // We aren't allowed to remove this route yet.
            break;
          }
          entry.currentState = _RouteLifecycle.dispose;
          continue;
        case _RouteLifecycle.dispose:
          // Delay disposal until didChangeNext/didChangePrevious have been sent.
          toBeDisposed.add(_history.removeAt(index));
          entry = next;
          break;
        case _RouteLifecycle.disposed:
        case _RouteLifecycle.staging:
          assert(false);
          break;
      }
      index -= 1;
      next = entry;
      entry = previous;
      previous = index > 0 ? _history[index - 1] : null;
    }
    // Informs navigator observers about route changes.
    _flushObserverNotifications();

    // Now that the list is clean, send the didChangeNext/didChangePrevious
    // notifications.
    _flushRouteAnnouncement();

    // Announce route name changes.
    if (widget.reportsRouteUpdateToEngine) {
      final _RouteEntry? lastEntry = _history.cast<_RouteEntry?>().lastWhere(
        (_RouteEntry? e) => e != null && _RouteEntry.isPresentPredicate(e), orElse: () => null,
      );
      final String? routeName = lastEntry?.route.settings.name;
      if (routeName != null && routeName != _lastAnnouncedRouteName) {
        SystemNavigator.routeInformationUpdated(location: routeName);
        _lastAnnouncedRouteName = routeName;
      }
    }

    // Lastly, removes the overlay entries of all marked entries and disposes
    // them.
    for (final _RouteEntry entry in toBeDisposed) {
      for (final OverlayEntry overlayEntry in entry.route.overlayEntries)
        overlayEntry.remove();
      entry.dispose();
    }
    if (rearrangeOverlay) {
      overlay?.rearrange(_allRouteOverlayEntries);
    }
    if (bucket != null) {
      _serializableHistory.update(_history);
    }
    _flushingHistory = false;
  }
```

## handlePush
_RouteEntry 对象居然负责推入路由的功能，并不单纯是记录状态。
```dart
  void handlePush({ required NavigatorState navigator, required bool isNewFirst, required Route<dynamic>? previous, required Route<dynamic>? previousPresent }) {
    final _RouteLifecycle previousState = currentState;
    route._navigator = navigator;
    route.install();
    if (currentState == _RouteLifecycle.push || currentState == _RouteLifecycle.pushReplace) {
      final TickerFuture routeFuture = route.didPush();
      currentState = _RouteLifecycle.pushing;
      routeFuture.whenCompleteOrCancel(() {
        if (currentState == _RouteLifecycle.pushing) {
          currentState = _RouteLifecycle.idle;
          assert(!navigator._debugLocked);
          assert(() { navigator._debugLocked = true; return true; }());
          navigator._flushHistoryUpdates();
          assert(() { navigator._debugLocked = false; return true; }());
        }
      });
    } else {
      assert(currentState == _RouteLifecycle.replace);
      route.didReplace(previous);
      currentState = _RouteLifecycle.idle;
    }
    if (isNewFirst) {
      route.didChangeNext(null);
    }

    if (previousState == _RouteLifecycle.replace || previousState == _RouteLifecycle.pushReplace) {
      navigator._observedRouteAdditions.add(
        _NavigatorReplaceObservation(route, previousPresent),
      );
    } else {
      assert(previousState == _RouteLifecycle.push);
      navigator._observedRouteAdditions.add(
        _NavigatorPushObservation(route, previousPresent),
      );
    }
  }

```