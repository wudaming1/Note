# 结构分析
因为编译时并没有把代码加载到虚拟机，只是把这些代码当做普通文件在处理，所以需要一种结构来组织Java文件，这种方式的实现在javax.lang.model包中，最最最最重要的就是Element类

##Element
在注解处理器中，并不能像运行时那样去组织Java代码，所有的Java代码都被转换成Element，注解处理器只能处理Element。
###Java类分解为Element
缺失图片

###Element结构分析
基本看一下返回值对应的类就可以明了了！

```java
public interface Element extends AnnotatedConstruct {
    //记录这个元素的类型
    TypeMirror asType();
    //记录这个元素的类型
    ElementKind getKind();
    //Java修饰符
    Set<Modifier> getModifiers();
    //名字，和String类似。之所以不用String可能是怕引起冲突，猜测的！
    Name getSimpleName();
    //下面分析
    Element getEnclosingElement();
    //下面分析
    List<? extends Element> getEnclosedElements();
    //忽略
    boolean equals(Object var1);
    //忽略
    int hashCode();
    //暂时不明白什么意思
    List<? extends AnnotationMirror> getAnnotationMirrors();
    //获取注解，这是个泛型函数，通过Class对象，取出具体的注解类。不用关心多个注解，应为是根据Class对象取的。
    <A extends Annotation> A getAnnotation(Class<A> var1);
    //暂时不明白什么意思
    <R, P> R accept(ElementVisitor<R, P> var1, P var2);
}
```

###TypeMirror和ElementKind的区别
这两个都是说记录类型，但是针对的体系不同。
**TypeMirror**：代表的是我们常用的Java声明变量用的类型体系，如一个Int类型的变量。为啥叫Mirror呢？目前的虚拟机中并不存在这个Class，编译也是开启一个虚拟机去做的，例如：other原理，他的类型是Other类型，但是现在虚拟机中并没有Other的Class对象，所有我们用一个TypeMirror来描述这个Class对象。在代码中验证基础数据类型和类类型的Element的值。
**ElementKind**：是针对Element所代表的类型体系，如图1。Element继承体系的中并不是每个类型对有对应的一个Element子类，如TypeElement就可以代表Java语言中的类、接口、注解、枚举。所有需要ElementKind来具体区分。

###树形结构的组织
如图1所见，一个Class类的Element并不是孤立的，而是相互可以检索到。这种检索机制依赖于getEnclosingElement和getEnclosedElements。以图1为例分析：
**getEnclosingElement：**获取最外层的元素，如果在Foo元素上调用这个方法，返回的还是Foo本身，如果在a、other、Foo构造方法、setA上调用，则返回的元素是Foo元素。
**getEnclosedElements**获取这个元素包裹的元素，在Foo上调用，返回a、other、Foo构造方法、setA组成的List。在a上调用则是空List。



