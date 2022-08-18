# Java NIO
NIO指java nio包提供的一套IO工具。和IO包一样，也是用于与操作系统交互来完成磁盘读写和网络读写。它的核心概念是Channel。Channel具有以下特点：
1. 一个Channel既可以读数据，同时也可以写数据。
2. 必须使用Buffer。
3. SocketChannel和ServerSocketChannel可以实现非阻塞IO。

## Channel
常用的实现有四个：
1. FileChannel：通过RandomAccessFile获取文件读写Channel，不能实现非阻塞。
2. DatagramChannel：
3. SocketChannel
4. ServerSocketChannel


## Buffer
一个Buffer是线性的、有限的元素序列，它的元素都是指定的基础类型，除了元素内容外，Buffer的一些重要的属性是capacity、limit、position。
1. capacity：Buffer内部元素的总个数。
2. limit：第一个不能读写的元素的index，及第一个无用元素的下标。不能大于capacity。
3. position：下一个应该读写的元素的下标，不能大于limit。

除了boolean类型，其他基础类型的各有一个对应的Buffer的具体实现。ByteBuffer、IntBuffer...

### 读/写
Buffer本身有两种模式，分别用于读写，简单理解为读模式和写模式。在Buffer中并不存在一个这样的标志来表示处于何种模式，这个模式只是概念上的东西。对于读写目前仅有的规则如下：
1. 无论读写，都是从position开始往后读写数据，并增加position的值，当position超过limit时，抛出异常。
2. 我们可以手动修改position、limit的值。

读数据指的是从Buffer中往其他任何地方读出数据、写数据指的是从任何地方往Buffer中写数据。

有两种方式操作Buffer内部的元素，通过Buffer本身提供的方法、通过Channel方法读写。

## Selector
一个SelectableChannel的多路复用器。用于管理注册在它上面的SelectableChannel，把注册的key分成三类：key(全部注册的可以)、selected-key(准备好的key)、cancelled-key(取消的key)。一般只需要关注selected-key。


## 参考资料
JDK1.8

[极客学院](http://wiki.jikexueyuan.com/project/java-nio-zh/)