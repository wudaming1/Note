# generator
生成器adjsgf


sdfas

## 关键字


| 类别 | 关键字 | 返回类型 | 搭档 |
| --- | --- | --- | --- |
| 同步生成器 | sync* | Iterable | yield、yield* |
| 异步生成器 | async* | Stream | yield、yield*|

* sync* ：用于声明函数，位置在函数声明的末尾，被标记的函数必须返回一个Iterable对象。
* async*：用于声明函数，位置在函数声明的末尾，被标记的函数必须返回一个Stream对象。
* yield：只能在函数体中使用，传递单个值。
* yield*：只能在函数体中使用，传递Iterable或者Stream的内部值。