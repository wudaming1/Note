# flexiable-box(弹性盒子)
在某个元素的css属性中声明`display: flex;`，元素就称为了弹性容器。FFC。

基本性质：
1. 每个弹性容器都有两根轴：主轴和交叉轴，两轴之间成90度关系。**水平的不一定就是主轴**。
2. 每根轴都有起点和终点，这对于元素的对齐非常重要。
3. 弹性容器中的所有子元素称为<弹性元素>，**弹性元素永远沿主轴排列**。不会自动换行。

个人感觉类似于Android的LinearLayout。浏览器是可以拖拽改变窗口大小的，移动端原生app没有这个特性。


## 属性
属性值列举并不完整，完整参考[MDN](https://developer.mozilla.org/zh-CN/)

-------

 容器属性（粗体代表默认值）

1. flex-direction: 修改主轴的方向。**row**、column、row-resverse、colume-resverse。
2. flex-wrap: 主轴排列不下时的换行方式。**nowrap** 、 wrap 、 wrap-reverse
3. flex-flow: flex-drection和flex-wrap的组合。
4. justify-content:主轴上的对齐方式，**flex-start**、flex-end、space-between、space-around、safe center。
5. align-items: 交叉轴上的对齐方式，align-items属性将所有直接子节点上的align-self值设置为一个组。 align-self属性设置项目在其包含块中在交叉轴方向上的对齐方式。**stretch**、
6. align-content: 行侧轴对齐方式，该属性对单行弹性盒子模型无效,**normal**、center、start、end等。


-------

 元素属性
1. order:可设置元素之间的排列顺序,数值越小，越靠前，默认为0,值相同时，以dom中元素排列为准。
2. flex-grow: 放大比例。数字值，默认0。
3. flex-shrink: 缩小比例。数字值，默认1。
4. flex-basis: 在主轴上的尺寸，优先级高于宽、高。
5. flex:flex-grow+flex-shrink+flex-basis。
6. align-self:单独设置对齐方式，值和效果同align-items，但是是单个item生效。



## 元素的弹性伸缩




## 参考资料

* [伸缩容器](https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container)
* [flex 布局的基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
* [对齐弹性容器中的弹性项目](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container)
* [掌握伸缩项如何进行换行](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items)
* [30分钟彻底弄懂flex布局](https://www.cnblogs.com/qcloud1001/p/9848619.html)

