# Extension
支持版本Dart 2.7以上。

## 问题
目前我们无法修改第三方class的源码。只能通过static方法来对第三方类进行扩展，但是使用static方法用起来有两个缺点：
1. 看起来不清爽，阅读有点费劲。
2. 无法让编辑器进行智能提示。

exp：
```doMyOtherStuff(doMyStuff(something.doStuff()).doOtherStuff())```

vs

```something.doStuff().doMyStuff().doOtherStuff().doMyOtherStuff()```

* 支持类型： normal methods, operators, getter and setters.

## Extension 不能有

* 构造方法：因为extension不产生类型。
* 抽象方法：因为extension不引入接口。
* 实例变量：因为虚拟机不会给extension分配内存。(We could implement instance variables using an Expando, but it would necessarily be nullable, so it would still not be an actual instance variable.)
* 与Object的成员方法同名：因为Object的一些方法与语义直接相关。


## 参考资料

[feature-specification](https://github.com/dart-lang/language/blob/master/accepted/2.7/static-extension-methods/feature-specification.md#dart-static-extension-methods-design)