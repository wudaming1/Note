# SliverWidget

Sliver 类型的 Widget 与普通 RenderObjectWidget 没有区别，只是生成的 RenderObject 必须是 RenderSliver。因为 Sliver 组件使用 Sliver 布局协议，而在 Flutter 框架中 RenderSliver 类型才使用 SliverConstraints。列举几个常见的 RenderSliver：

1.  RenderSliverSingleBoxAdapter：单个 RenderBox 类型的孩子。常见的 RenderSliverToBoxAdapter，
2.  RenderSliverMultiBoxAdaptor：多个 RenderBox 类型的孩子。常见的 RenderSliverList，RenderSliverGrid 都是他的子类。
3.  RenderSliverPersistentHeader：单个 RenderBox 类型的孩子，用于实现吸顶效果。

## SliverPersistentHeader

这个 Widget 用于做悬浮和置顶。依据配置不同可以生成 4 个具体 Silver：\_SliverFloatingPinnedPersistentHeader、\_SliverPinnedPersistentHeader、\_SliverFloatingPersistentHeader、\_SliverScrollingPersistentHeader。他们所创建的 Render 全是 RenderSliverPersistentHeader 子类。
