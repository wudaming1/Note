# 字节码操作
java字节码操作是一个成熟、古老、的底层技术。目前广泛应用于Profiler工具、调试工具、mock框架、网络监听。当下流行的字节码修改工具：ASM、Javaassist、BCEL等。

Javaassist:高层Java字节码处理类库,能运行时动态生成类,修改类。
ASM：底层Java字节码处理类库，能生成和修改class文件。可以在运行时和编译时使用。
BCEL：Apache的一个开源项目，在过去的几年里没有多少发展。功能类似ASM，不准确统计效率类似Javaassist。不会做介绍。
效率：运行时反射 < Javaassist < ASM

##字节码插桩-ASM
ASMifier能帮助我们用ASM生成类，使用方式


查看class文件的ASM生成所需要的代码: java -classpath asm-7.0.jar:asm-util-7.0.jar  org.objectweb.asm.util.ASMifier  java.lang.Runnable > demo.java




在命令行: java -classpath asm-7.0.jar:asm-util-7.0.jar  org.objectweb.asm.util.TraceClassVisitor  java.lang.Void > void.txt

命令行: java -classpath asm-7.0.jar:asm-util-7.0.jar  org.objectweb.asm.util.Textifier  java.lang.Void > void.txt

查看class文件的字节码: javap -p -v class文件。