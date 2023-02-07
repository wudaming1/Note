# Generator
生成器是是用于产生集合值的函数，同步生成器为迭代对象（Iterable）生成提供语法糖；异步生成器为流（Stream）生成提供语法糖。


## 同步生成器
 example：从起始时间到结束时间的每一天的集合，可迭代对象。

 ```dart
/// 同步函数生成器
Iterable<DateTime> dateTimeRange(DateTime start, DateTime end) sync* {
  DateTime temp = start;
  while (temp.isBefore(end)) {
    yield temp;
    temp = temp.add(Duration(days: 1));
  }
}

Iterable<DateTime> dateTimeRange2(DateTime start, DateTime end) sync* {
  DateTime temp = start;
  List<DateTime> list = [];
  while (temp.isBefore(end)) {
    list.add(temp);
    temp = temp.add(Duration(days: 1));
  }
  yield* list;
}

void main(List<String> arguments) {
  for (DateTime date
      in dateTimeRange(DateTime(2023, 1, 1), DateTime(2023, 1, 2))) {
    print('date: $date');
  }
}  

```

```dart
class DateTimeIterable extends Iterable<DateTime> {
  final DateTime start;
  final DateTime end;

  DateTimeIterable(this.start, this.end);

  @override
  DateTimeIterator get iterator => DateTimeIterator(this);
}

class DateTimeIterator extends Iterator<DateTime> {
  final DateTimeIterable iterable;

  DateTimeIterator(this.iterable)
      : current = iterable.start.subtract(Duration(days: 1));

  @override
  DateTime current;

  @override
  bool moveNext() {
    current = current.add(Duration(days: 1));
    if (current.isBefore(iterable.end)) {
      return true;
    }
    return false;
  }
}

void main(List<String> arguments) {
    for (DateTime date
      in DateTimeIterable(DateTime(2023, 1, 1), DateTime(2023, 1, 2))) {
    print('date: $date');
  }
}

```
上面几种实现产生的效果相同，但是明显使用函数生成器可以省略大量模板代码。

打印    `dateTimeRange(DateTime(2023, 1, 1), DateTime(2023, 1, 2))`所产生的对象，可以看到这个对象实际上也是Iterable的子类。那么可以得出同步生成器实际上是一种Iterable的语法糖。使用起来很便利。

![iterable_object.png](./iterable_object.jpg)

### for-in
* for-in语句：必须和[Iterable](https://api.dart.dev/stable/2.19.1/dart-core/Iterable-class.html)对象搭配使用，Iterable表示一个数据集合，其中的元素可以被顺序查询。所以同步函数生成器产生的对象可以直接用于for-in语句。
* await for-in语句：用于变量[Stream](https://api.dart.dev/stable/2.19.1/dart-async/Stream-class.html)中的值。


## 异步生成器

example：

```dart
/// 异步函数生成器
Stream<DateTime> dateTimeRange(DateTime start, DateTime end) async* {
  DateTime temp = start;
  while (temp.isBefore(end)) {
    yield temp;
    temp = temp.add(Duration(days: 1));
  }
}

```

语法与同步生成器类似，但是函数必须使用async*关键字，而非sync*关键字， 而且函数体重运行使用await同步关键字来等待异步结果。使用该函数立即返回Stream对象，当Stream被监听时，函数体开始执行。

## 关键字

***不能再函数体内部使用return关键字***

* sync*：用于函数体前，标识这个函数是同步生成器。
* async*：用与函数体前，标识这个函数是异步生成器。
* yield：用于表达式(值)前，对与同步生成器来说，表示向Iterable中加入一条数据；对于异步生成器来说，表示向Stream发送一条数据。
* yield*：在同步生成器中，用于Iterable前，表示将这个Iterable中的值全部插入生成器生成的Iterable；对于异步生成器来说，用于Stream前，表示把当前Stream的结果，逐条发送给生成的Stream。

## 递归

```dart
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```

使用***yield****调用自身的方式可以使这个函数的时间复杂度保持在线性。