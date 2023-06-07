# ProxyWidget
文档介绍很简略，就是说有一个child Widget，并不用自己去build一个Widget。


## ProxyWidget
其三个子类 InheritedWidget ,NotificationListener,ParentDataWidget 分别对应不同场景的消息传递。

1. InheritedWidget: ancestor节点发生变化时，向子节点发送通知，此时可以将子节点看成Client。
2. NotificationListener: 子节点发生变化时，向ancestor节点发送消息，此时可以将NotificationListener中注册的回调当成Client。
3. ParentDataWidget: 子节点发生变化时，向父节点发送消息，此时可以将父节点当成Client。这里的父子节点关系指Render树中的父子关系。

这三个子类的支持机制略有区别：

1. InheritedWidget: 依赖Element，其中有两个重要字段 **_inheritedWidgets**， **_dependencies**，他自己还有一个额外的**_dependents**字段用于存储依赖。
2. NotificationListener: 依赖于Element，**_notificationTree**存储着依赖树，并负责事件冒泡。
3. ParentDataWidget: 依赖于RenderObject，**parentData**存储父节点要用的绘制信息。

从实现机制上，InheritedWidget和NotificationListener可以在任何节点使用，而ParentDataWidget必须与特定的父节点搭配，且不用越过RenderObject节点。

## ProxyElement

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

最关键的代码如上，在Widget更新后向客户发出通知。

**因为ProxyElement有子节点，所以他继承自ComponentElement**