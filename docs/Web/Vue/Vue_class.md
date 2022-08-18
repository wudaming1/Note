# Vue类分析
在Vue.js中，Vue函数是所有Vue实例、组件的构造器。其中在Vue对象上直接挂载的方法称为类方法，在Vue.property上挂载的方法称为对象方法，这一点可以很好的和Java对应。

## Vue.options
类配置对象，最终会合并到vue.$options。


```javascript
Vue.options = {
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


## Vue.prototype


```JavaScript
Vue.prototype={
    //初始化对象
    _init:{},
    //生命周期
    _update:{},
    $forceUpdate:{},
    $destroy:{},
    //渲染相关
    $nextTick:{},
    _render:{},
    //事件相关
    $on:{},
    $once:{},
    $off:{},
    $emit:{}
}
```

## 插件相关

```JavaScript
    Vue.use() //  在core/global-api/use.js文件中定义
    Vue._installPlugins // 所有注册的组件保存在Vue._installPlugins数组里面。
```

Vue.use()方法会调用插件的install方法。