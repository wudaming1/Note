# Mixin
维基百科定义：是面向对象程序设计语言中的类，提供了方法的实现。其他类可以访问mixin类的方法、变量而不必成为其子类。

在Dart中，更像是一种带有默认实现的接口。

## mixin and on
mixin和on关键字用于定义mixin class(混入类)。mixin class不能被实例化，在定义mixin类时，不能定义构造方法。

```
abstruct Base { 
    Base(){};
    void printSelf(){print('Base');}
    void printSelf2(){print('Base2');}
}


mixin A on Base{
void printSelf(){print('A');}
void printSelf2(){print('A2');}
}

mixin C on Base{
    void printSelf(){print('C');}
}

mixin B on Base, A{
void printSelf2(){print('B2');}
}
```

在这里A可以调用Base的方法。B可以调用A和Base的方法。使用o关键字除了赋予了上面的调用能力，还对被混入对象的声明有要求，假设M需要混入A，那么M必须继承Base；假设M需要混入B，那么M必须继承Base，且必须先混入A，及在with的顺序中，A在B前面。






## extend and with

按照with的顺序，会给被混入的类一个线性关系，这关系到同名方法和属性的具体调用。

```
class M extend Base with A,C,B{

}

```

在M的实例上调用了混入的同名方法(属性也是一样的)时:
1. 调用printSelf时，结果是：C
2. 调用printSelf2时，结果是：B2
结论是按照线下查找，找到直接使用，线性顺序为：B => C => A => Base。

在这个混入中，只有C的位置是比较灵活的，A与B有顺序要求。