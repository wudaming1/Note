# 局部匿名内部类使用final局部变量
> java的闭包仅仅实现了“值捕捉”，并没有实现“引用捕捉”。

先说几个概念：
* 局部内部类：在方法内部创建的类
* 局部匿名内部类：在方法内部创建的匿名内部类
* 局部变量：在方法内部声明的变量，或者方法参数
* 全局变量：类的成员变量
问题：在java语言中，局部内部类使用局部变量时，局部变量必须声明为final类型的，为什么？
原因：局部变量的声明周期可能会比局部内部类的生命周期短。当然我们需要考虑的就是最坏的情况！
解决生命周期不一致：编译器会对局部变量做一个值的copy，并保存在局部内部类的成员变量中，所以和局部变量本身没有一毛钱关系，只是把局部变量指向的内存或者值保存到局部内部类的成员变量中。
**先举个栗子(只看问题相关的代码，逻辑神马的不要管了)：**

```java
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final int a = 6;
        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ToastUtil.showToast("ss"+a);
            }
        });
        return convertView;
    }
```

以上是我们写的源代码，经过编译器处理后的代码实际上应该类似这个

```java
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        int a = 6;
        convertView.setOnClickListener(new View.OnClickListener() {
            final int a_copy = 6;
            @Override
            public void onClick(View v) {
                ToastUtil.showToast("ss"+a_copy);
            }
        });
        return convertView;
    }
```

在局部内部类中根本没有用到a这个变量，只是把a的值复制过来了，如果是引用类型的局部变量应该是这样的：

```java
 @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final BaseBean a = data.get(position);
        convertView.setOnClickListener(new View.OnClickListener() {
            
            @Override
            public void onClick(View v) {
                ToastUtil.showToast("ss"+a);
            }
        });
        return convertView;
    }
```
实际上：

```java
@Override
    public View getView(int position, View convertView, ViewGroup parent) {
        BaseBean a = data.get(position);
        convertView.setOnClickListener(new View.OnClickListener() {
            final BaseBean a_copy = a;
            @Override
            public void onClick(View v) {
                ToastUtil.showToast("ss"+a_copy);
            }
        });
        return convertView;
    }
```
    

声明为final的原因：如果不声明为final，在源代码中，如果在方法体中将a指向另一个变量，但是a_copy并不会被改变，所以编译器做了限制。但是我们可以看到对a做内部状态的修改是可以同步的。
所以我们可以通过类包装来避免这种问题

```java
 @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        BaseBean a = data.get(position);
        final Wrapper b = new Wrapper(a)
        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                b.obj = new BaseBean();
                ToastUtil.showToast("ss"+b);
            }
        });
        b.obj = new BaseBean();
        return convertView;
    }
```

这样obj这个变量就是存储在堆内存里面，不存在生命周期不统一的问题，局部内部类没有复制obj所指向的内存地址，而是使用的obj本身。
在kotlin中，lambda表达式使用局部变量的捕获机制就是这个原理。局部变量a不用声明为final类型的，应为总是使用的包装类来包裹局部变量。