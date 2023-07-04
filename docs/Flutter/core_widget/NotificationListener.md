# NotificationListener

一个监听Notification在Element树中冒泡的Widget。事件由用户主动触发。具体参考[youtube](https://www.youtube.com/watch?v=cAnFbFoGM50)

NotificationListener对应的Element为_NotificationElement。 Flutter Framework会维护一颗通知树NotificationTree，这颗树的结构类似以Element树，但是只有NotifiableElementMixin部分节点的映射。NotificationTree和ElementTree的形成时间也一致，在Element::mount时触发attachNotificationTree()，ElementTree构建完成时NotificationTree也构建完成。

## attachNotificationTree

Element实现：

```dart
  void attachNotificationTree() {
    _notificationTree = _parent?._notificationTree;
  }
```

NotifiableElementMixin实现：

```dart
  void attachNotificationTree() {
    _notificationTree = _NotificationNode(_parent?._notificationTree, this);
  }
```

每个Element都持有一个NotificationTree节点=>_notificationTree(_NotificationNode),这个节点对应的Element则分为几种情况：

1. 当前Element为NotifiableElementMixin类型，那么_notificationTree对应的Element就是当前Element。
2. 当前Element不是NotifiableElementMixin类型，那么_notificationTree对应的Element是离当前Element最近的类型为NotifiableElementMixin的祖先节点。如果期祖先节点没有NotifiableElementMixin类型的Element，那么_notificationTree为空。

## 通知冒泡

我们可以通过任何BuildContext发送冒泡通知。dispatchNotification是BuildContext暴露的接口。Element会将Notification转发给对应的_notificationTree节点进行冒泡。_notificationTree往上冒泡，将通知逐个发送给NotifiableElementMixin，直到NotifiableElementMixin消耗事件才结束冒泡，否则冒泡到树顶。

```dart
mixin NotifiableElementMixin on Element {
  /// Called when a notification of the appropriate type arrives at this
  /// location in the tree.
  ///
  /// Return true to cancel the notification bubbling. Return false to
  /// allow the notification to continue to be dispatched to further ancestors.
  bool onNotification(Notification notification);

  @override
  void attachNotificationTree() {
    _notificationTree = _NotificationNode(_parent?._notificationTree, this);
  }
}
```

## _NotificationElement

_NotificationElement是官方提供的一种NotifiableElementMixin的实现，主要添加了两种功能：

1. 将事件转发给Widget=> NotificationListener;
2. 转发时过滤类型。
