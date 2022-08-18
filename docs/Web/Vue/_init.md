# Vue _init()过程分析
_init()方法在new Vue()时触发，是第一个触发的原型方法。这个方法在将参数合并到$options属性后，初始化整个生命周期。js文件位置：src/core/instance/init.js

关键代码如下

```javascript
if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    
    ...
    
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
```


## 将Vue实例渲染到DOM

1. Vue._init():src/core/instance/init.js
2. Vue.$mount():src/platform/entry-runtime-with-compiler.js，检查并生成Vue._render()函数。
3. Vue.$mount():src/platforms/web/runtime/index.js
4. mountComponent():src/core/instance/lifecycle.js
5. vm._render():src/core/instance/render.js,创建VNode。
6. vm._update():src/core/instance/lifecycle.js，把 VNode 渲染成真实的 DOM。
 