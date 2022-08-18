# Vue创建的实例对象分析
在Vue.js中，通过new Vue()创建和定义的组件都是Vue类的实例。

## vue.$option
实例的配置参数对象，包括几个部分组成：

1. new Vue()时传入的配置。
2. Vue类预先定义的配置。

```javascript
vue.$options = {
    $data:{}, //PropertyDescriptor,并非普通属性，实际访问_data。
    $props:{},//PropertyDescriptor，并非普通属性，实际访问_props。
    //这种定义方式可以实现一个只读属性。以下划线开头的变量在理解意义上表示私有属性。
    //通过私有属性+PropertyDescriptor代理的方式实现数据的只读性。通过在get方法抛
    //出异常只是提示。类似于Java的私有属性+get方法。但是JS的实现方式并不能从语法上
    //保证，只能从语义上保证，应为我们任然可以直接访问Vue._data。在Java则需要反射。各有优点。
    $set:{},
    $delete:{},
    $watch:{},
    
    //ASSET_TYPES,资源有关？？？
    components:{},//组件：内置组件、自定义全局组件。
    directives:{},
    filters:{},
    
    _base:Vue //指向Vue类
}
```