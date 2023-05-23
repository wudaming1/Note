# ParentData

**这个机制完全依赖于Widget树，Element树以及Render树的构建流程，类似于一个插件。**

RenderObject有一个parentData属性，这个字段被其他RenderObject(一般来说是parent节点))使用，来确定如何展示当前RenderObject。

ParentDataWidget: 用于hook ParentData发生改变。

ParentDataElemnet：用于在ParentDataWidget和RenderObject之间传递ParentData。

而且ParentDataWidget的使用需要和ParentWidget搭配：

1. Flexible => Flex(Row, Column)
2. Positioned => Stack

## 设置ParentData

接入点在RenderObjectElement的attachRenderObject：

```dart

  @override
  void attachRenderObject(Object? newSlot) {
    assert(_ancestorRenderObjectElement == null);
    _slot = newSlot;
    _ancestorRenderObjectElement = _findAncestorRenderObjectElement();
    _ancestorRenderObjectElement?.insertRenderObjectChild(renderObject, newSlot);
    final ParentDataElement<ParentData>? parentDataElement = _findAncestorParentDataElement();
    if (parentDataElement != null) {
      _updateParentData(parentDataElement.widget as ParentDataWidget<ParentData>);
    }
  }

```

## 更新ParentData

从Element的update方法介入流程：

    update:改变这个Element所使用的Widget，当Parent希望使用新的Widget来配置这个元素时，framework会调用这个方法。

切入点在ProxyElement， ProxyElement是ParentDataElement的父类。

```dart
  @override
  void update(ProxyWidget newWidget) {
    final ProxyWidget oldWidget = widget as ProxyWidget;
    assert(widget != null);
    assert(widget != newWidget);
    super.update(newWidget);
    assert(widget == newWidget);
    updated(oldWidget);
    rebuild(force: true);
  }

  @protected
  void updated(covariant ProxyWidget oldWidget) {
    notifyClients(oldWidget);
  } 
```

然后在ParentDataElement中：

```dart

  @override
  void notifyClients(ParentDataWidget<T> oldWidget) {
    _applyParentData(widget as ParentDataWidget<T>);
  }

  void _applyParentData(ParentDataWidget<T> widget) {
    void applyParentDataToChild(Element child) {
      if (child is RenderObjectElement) {
        child._updateParentData(widget);
      } else {
        assert(child is! ParentDataElement<ParentData>);
        child.visitChildren(applyParentDataToChild);
      }
    }
    visitChildren(applyParentDataToChild);
  }

```

然后在RenderObjectElement

```dart
  void _updateParentData(ParentDataWidget<ParentData> parentDataWidget) {
    bool applyParentData = true;
    if (applyParentData) {
      parentDataWidget.applyParentData(renderObject);
    }
  }
```

最后接入到ParentDataWidget

```dart
  void applyParentData(RenderObject renderObject);
```