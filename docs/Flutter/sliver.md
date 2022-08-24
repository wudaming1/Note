# Sliver
Sliver布局用于滑动组件的布局和绘制。


## 对象介绍

### SliverConstraints

SliverConstraints描述的是当前ViewPort的滚动状态，RenderSliver使用SliverConstraints来测量、布局自己。

``` dart
class SliverConstraints extends Constraints {
    //主轴方向
    final AxisDirection axisDirection;
    //Sliver 沿着主轴从列表的哪个方向插入？枚举类型，正向或反向
    final GrowthDirection growthDirection;
    //用户滑动方向
    final ScrollDirection userScrollDirection;
    //当前Sliver理论上（可能会固定在顶部）已经滑出可视区域的总偏移
    final double scrollOffset;
    //当前Sliver之前的Sliver占据的总高度，因为列表是懒加载，如果不能预估时，该值为double.infinity
    final double precedingScrollExtent;
    //上一个 sliver 覆盖当前 sliver 的大小，通常在 sliver 是 pinned/floating
    //或者处于列表头尾时有效，我们在后面的小节中会有相关的例子。
    final double overlap;
    //当前Sliver在Viewport中的最大可以绘制的区域。
    //绘制如果超过该区域会比较低效（因为不会显示）
    final double remainingPaintExtent;
    //纵轴的长度；如果列表滚动方向是垂直方向，则表示列表宽度。
    final double crossAxisExtent;
    //纵轴方向
    final AxisDirection crossAxisDirection;
    //Viewport在主轴方向的长度；如果列表滚动方向是垂直方向，则表示列表高度。
    final double viewportMainAxisExtent;
    //Viewport 预渲染区域的起点[-Viewport.cacheExtent, 0]
    final double cacheOrigin;
    //Viewport加载区域的长度，范围:
    //[viewportMainAxisExtent,viewportMainAxisExtent + Viewport.cacheExtent*2]
    final double remainingCacheExtent;
}
```

### SliverGeometry
描述RenderSliver所占空间信息。

```dart
class SliverGeometry {
    /// 在滑动方向上sliver所占的长度。
    final double scrollExtent;
    /// 
    final double paintOrigin;

}
```