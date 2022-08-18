# Box通用属性

Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。

## 通用属性

### margin

注意外边距叠加现象。

```
{
margin-top:5px; 
margin-right:10px; 
margin-bottom:12px; 
margin-left:8px;
}
```

**VS**


```
{
    margin:5px 10px 12px 8px;
}
```

### padding

```
{
padding-top:5px; 
padding-right:10px; 
padding-bottom:12px; 
padding-left:8px;
}
```

**VS**


```
{
    padding:5px 10px 12px 8px;
}
```

### border


```
//全部3个属性，全部4条边
{border:2px dashed red;}
//1个属性，全部4条边
{border-style:dashed;}
//1个属性，1条边
{border-left-style:dashed;}

```

### background


## 宽度与边框
默认情况下，宽度和高低是针对内容设置的，padding、border、margin会导致盒子变大。设置box-sizing属性后，有宽度的盒子将表现的和auto的一样。
* 没有（就是没有设置width的，默认值是auto）宽度的元素始终会扩展到填满其父元素的宽度为止。添加水平边框、内边距和外边距，会导致内容宽度减少，减少量等于水平边框、内边距和外边距的和。
* 为设定了宽度的盒子添加边框、内边距和外边距，会导致盒子扩展得更宽。实际上，盒子的width属性设定的只是盒子内容区的宽度，而非盒子要占据的水平宽度。



## 参考

* [盒子模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Box_model)
* [盒模型概要](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_boxes/Box_model_recap)
* 《CSS设计指南》———— Charles Wyke-Smith