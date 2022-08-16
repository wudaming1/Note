# 注解处理器
注解处理器是一个在javac中的，用来编译时扫描和处理的注解的工具。你可以为特定的注解，注册你自己的注解处理器。注解处理器的工作方式，以Java代码（或者编译过的字节码）作为输入，生成文件（通常是.java文件）作为输出。这具体的含义什么呢？你可以生成Java代码！这些生成的Java代码是在生成的.java文件中，所以你不能修改已经存在的Java类，例如向已有的类中添加方法。这些生成的Java文件，会同其他普通的手动编写的Java源代码一样被javac编译。

##虚处理器AbstractProcessor


```java
public abstract class AbstractProcessor implements Processor {
    public Set<String> getSupportedOptions()
    public Set<String> getSupportedAnnotationTypes()
    public SourceVersion getSupportedSourceVersion()
    public synchronized void init(ProcessingEnvironment processingEnv)
    public abstract boolean process(Set<? extends TypeElement> annotations,RoundEnvironment roundEnv)
    public Iterable<? extends Completion> getCompletions(Element element,AnnotationMirror annotation,ExecutableElement member,String userText)
    protected synchronized boolean isInitialized()
}
```

public及protected方法一共7个，其中init、process、getSupportedAnnotationTypes、getSupportedSourceVersion比较重要，下面会重点介绍。其他方法

* getSupportedOptions：返回注解处理器可处理的注解操作，默认实现是获取通过注解@SupportedOptions设置的可支持的输入选项值。
* getCompletions：不明白具体用处。


##init
每一个注解处理器类都必须有一个空的构造函数。然而，这里有一个特殊的init()方法，它会被注解处理工具调用，并输入ProcessingEnviroment参数。ProcessingEnviroment提供很多有用的工具类Elements, Types和Filer。

##process
这相当于每个处理器的主函数main()。你在这里写你的扫描、评估和处理注解的代码，以及生成Java文件。输入参数RoundEnviroment，可以让你查询出包含特定注解的被注解元素。

##getSupportedAnnotationTypes
这里你必须指定，这个注解处理器是注册给哪个注解的。注意，它的返回值是一个字符串的集合，包含本处理器想要处理的注解类型的合法全称。换句话说，你在这里定义你的注解处理器注册到哪些注解上。

##getSupportedSourceVersion
用来指定你使用的Java版本。通常这里返回SourceVersion.latestSupported()。然而，如果你有足够的理由只支持Java 6的话，你也可以返回SourceVersion.RELEASE_6。

