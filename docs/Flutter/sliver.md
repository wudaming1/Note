# Sliver 协议

Sliver 协议用于显示滚动组件。viewport 测量 sliver 时使用这套协议，与 box 协议类似，viewport 向 sliver 传递 SliverConstraints，sliver 向 viewport 输出 SliverGeometry。

## 对象介绍

### SliverConstraints

SliverConstraints 描述的是当前 ViewPort 的滚动状态，RenderSliver 使用 SliverConstraints 来测量、布局自己。

```
class SliverConstraints extends Constraints {
    /// 主轴方向
    final AxisDirection axisDirection;

    /// Sliver 沿着主轴从列表的哪个方向插入？枚举类型，正向或反向
    final GrowthDirection growthDirection;

    /// 用户滑动方向
    final ScrollDirection userScrollDirection;

    /// 当前Sliver顶部（scrollExtent的起点）滑出Viewport起点的距离
    final double scrollOffset;

    /// 当前Sliver之前的Sliver占据的scroll总高度，因为列表是懒加载，如果不能预估时，该值为double.infinity
    final double precedingScrollExtent;

    /// 上一个 sliver 覆盖当前 sliver 的大小，通常在 sliver 是 pinned/floating
    final double overlap;

    /// Viewport剩余的可用绘制范围
    final double remainingPaintExtent;

    /// 纵轴的长度；如果列表滚动方向是垂直方向，则表示列表宽度。
    final double crossAxisExtent;

    /// 纵轴排版方向，一般作用与文字排版
    final AxisDirection crossAxisDirection;

    /// Viewport在主轴方向的长度
    final double viewportMainAxisExtent;

    /// Viewport 预渲染区域的起点[-Viewport.cacheExtent, 0]
    final double cacheOrigin;

    /// Viewport加载区域的长度，范围:[viewportMainAxisExtent,viewportMainAxisExtent + Viewport.cacheExtent*2]
    final double remainingCacheExtent;

}
```

### SliverGeometry

描述 RenderSliver 所占空间信息。

```
class SliverGeometry {

    /// 在滑动方向上sliver所占的长度。
    final double scrollExtent;

    /// sliver的绘制起点，相对与测量结果。
    final double paintOrigin;

    /// 绘制范围，不影响任何测量
    fianl double paintExtent;

    /// 当前Sliver可见部分的起点到下一个Sliver可见部分的起点的距离。
    final double layoutExtent;

    /// 一般为0，特殊情况下用于计算Viewport的大小。
    final double maxPaintExtent;

    /// 当Sliver可以收缩时，最大收缩范围。一般slive是pinned或者float。
    final double maxScrollObstructionExtent;

    /// 纵轴长度
    final double crossAxisExtent;

    /// 点击范围
    final double hitTestExtent;

    /// 可见性
    final bool visible;

    /// 是否被剪切
    final bool hasVisualOverflow;

    /// 缓存长度
    final double cacheExtent;

    /// 不知道什么用
    final double scrollOffsetCorrection;

}
```
