
# ClassLoader
ClassLoader主要对类的请求提供服务，当JVM需要某类时，它根据名称向ClassLoader要求这个类，然后由ClassLoader返回这个类的class对象。
ClassLoader负责载入系统的所有资源（Class，文件，图片，来自网络的字节流等），通过ClassLoader从而将资源载入JVM 中。每个class都有一个引用，指向自己的ClassLoader

##获取ClassLoader
```
this.getClass.getClassLoader();  // 使用当前类的ClassLoader   
  
Thread.currentThread().getContextClassLoader();  // 使用当前线程的ClassLoader   
  
ClassLoader.getSystemClassLoader();  // 使用系统ClassLoader，即系统的入口点所使用的ClassLoader。
```

##用ClassLoader载入资源
一些随程序发布出去的资源需要用ClassLoader来加载。