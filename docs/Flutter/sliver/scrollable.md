# Scrollable

负责更新 Viewport 的 SliverConstrains，通过 Listener 监听用户滚动，计算滚动距离，更新 Viewport layout。

## RawGestureDetector

手势监听，负责将收到的手势信息传递给 ScrollPosition。

## ScrollPosition

它实现了 Observe 模式，可以注册监听。在整个滑动流程中，负责分发所有手势信息。

RenderViewportBase:

```
  @override
  void attach(PipelineOwner owner) {
    super.attach(owner);
    _offset.addListener(markNeedsLayout);
  }
```

这里的 \_offset 是 ViewportOffset，ScrollPosition 是 ViewportOffset 的子类。

ScrollPosition:

```
  double setPixels(double newPixels) {
    assert(hasPixels);
    assert(SchedulerBinding.instance.schedulerPhase != SchedulerPhase.persistentCallbacks, "A scrollable's position should not change during the build, layout, and paint phases, otherwise the rendering will be confused.");
    if (newPixels != pixels) {
      final double overscroll = applyBoundaryConditions(newPixels);
      assert(() {
        final double delta = newPixels - pixels;
        if (overscroll.abs() > delta.abs()) {
          throw FlutterError(
            '$runtimeType.applyBoundaryConditions returned invalid overscroll value.\n'
            'setPixels() was called to change the scroll offset from $pixels to $newPixels.\n'
            'That is a delta of $delta units.\n'
            '$runtimeType.applyBoundaryConditions reported an overscroll of $overscroll units.',
          );
        }
        return true;
      }());
      final double oldPixels = pixels;
      _pixels = newPixels - overscroll;
      if (_pixels != oldPixels) {
        notifyListeners();
        didUpdateScrollPositionBy(pixels - oldPixels);
      }
      if (overscroll != 0.0) {
        didOverscrollBy(overscroll);
        return overscroll;
      }
    }
    return 0.0;
  }
```
