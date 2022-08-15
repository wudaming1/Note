# 四大引用类型
除了强引用，其他的引用都是用关联对象来实现的，SoftReference、WeakReference、PhantomReference。

## 强引用
强引用是使用最普遍的引用。如果一个对象具有强引用，那垃圾收器绝不会回收它。当内存空间不足，Java虚拟机宁愿抛出OutOfM moryError错误，使程序异常终止，也不会靠随意回收具有强引用 对象来解决内存不足的问题。

## 软引用
软引用是用来描述一些还有用但并非必须的对象。对于软引用关联着的对象，在系统将要发生内存溢出异常之前，将会把这些对象列进回收范围进行第二次回收。如果这次回收还没有足够的内存，才会抛出内存溢出异常。


```java
/**
 * 软引用何时被收集
 * 运行参数 -Xmx200m -XX:+PrintGC
 */
public class SoftReferenceDemo {

    public static void main(String[] args) throws InterruptedException {
        //100M的缓存数据
        byte[] cacheData = new byte[100 * 1024 * 1024];
        //将缓存数据用软引用持有
        SoftReference<byte[]> cacheRef = new SoftReference<>(cacheData);
        //将缓存数据的强引用去除
        cacheData = null;
        System.out.println("第一次GC前" + cacheData);
        System.out.println("第一次GC前" + cacheRef.get());
        //进行一次GC后查看对象的回收情况
        System.gc();
        //等待GC
        Thread.sleep(500);
        System.out.println("第一次GC后" + cacheData);
        System.out.println("第一次GC后" + cacheRef.get());

        //在分配一个120M的对象，看看缓存对象的回收情况
        byte[] newData = new byte[120 * 1024 * 1024];
        System.out.println("分配后" + cacheData);
        System.out.println("分配后" + cacheRef.get());
    }

}

第一次GC前null
第一次GC前[B@7d4991ad
[GC (System.gc())  105728K->103248K(175104K), 0.0009623 secs]
[Full GC (System.gc())  103248K->103139K(175104K), 0.0049909 secs]
第一次GC后null
第一次GC后[B@7d4991ad
[GC (Allocation Failure)  103805K->103171K(175104K), 0.0027889 secs]
[GC (Allocation Failure)  103171K->103171K(175104K), 0.0016018 secs]
[Full GC (Allocation Failure)  103171K->103136K(175104K), 0.0089988 secs]
[GC (Allocation Failure)  103136K->103136K(199680K), 0.0009408 secs]
[Full GC (Allocation Failure)  103136K->719K(128512K), 0.0082685 secs]
分配后null
分配后null
```
像这种如果内存充足，GC时就保留，内存不够，GC再来收集的功能很适合用在缓存的引用场景中。在使用缓存时有一个原则，如果缓存中有就从缓存获取，如果没有就从数据库中获取，缓存的存在是为了加快计算速度，如果因为缓存导致了内存不足进而整个程序崩溃，那就得不偿失了。


## 弱引用
弱引用也是用来描述非必须对象的，他的强度比软引用更弱一些，被弱引用关联的对象，在垃圾回收时，如果这个对象只被弱引用关联（没有任何强引用关联他），那么这个对象就会被回收。


```java
/**
 * 弱引用关联对象何时被回收
 */
public class WeakReferenceDemo {
    public static void main(String[] args) throws InterruptedException {
        //100M的缓存数据
        byte[] cacheData = new byte[100 * 1024 * 1024];
        //将缓存数据用软引用持有
        WeakReference<byte[]> cacheRef = new WeakReference<>(cacheData);
        System.out.println("第一次GC前" + cacheData);
        System.out.println("第一次GC前" + cacheRef.get());
        //进行一次GC后查看对象的回收情况
        System.gc();
        //等待GC
        Thread.sleep(500);
        System.out.println("第一次GC后" + cacheData);
        System.out.println("第一次GC后" + cacheRef.get());

        //将缓存数据的强引用去除
        cacheData = null;
        System.gc();
        //等待GC
        Thread.sleep(500);
        System.out.println("第二次GC后" + cacheData);
        System.out.println("第二次GC后" + cacheRef.get());
    }
}
第一次GC前[B@7d4991ad
第一次GC前[B@7d4991ad
第一次GC后[B@7d4991ad
第一次GC后[B@7d4991ad
第二次GC后null
第二次GC后null
```


## 虚引用
一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用来获取一个对象的实例。为一个对象设置虚引用关联的唯一目的就是能在这个对象被收集器回收时收到一个系统通知。虚引用和弱引用对关联对象的回收都不会产生影响，如果只有虚引用活着弱引用关联着对象，那么这个对象就会被回收。它们的不同之处在于弱引用的get方法，虚引用的get方法始终返回null,弱引用可以使用ReferenceQueue,虚引用必须配合ReferenceQueue使用。

虚引用必须和引用队列(ReferenceQueue)联合使用。当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象的内存之前，把这个虚引用加入到与之关联的引用队列中。


```java
    String str = new String("abc");
    ReferenceQueue queue = new ReferenceQueue();
    // 创建虚引用，要求必须与一个引用队列关联
    PhantomReference pr = new PhantomReference(str, queue);

```