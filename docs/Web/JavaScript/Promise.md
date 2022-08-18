# Promise
Promise是一个用于做异步消息传递的类，它的实例是一个绑定了回调的对象，实例只有三种状态pending(进行中)、fulfilled(已成功)、rejected(已失败)。区别于Event的是：**如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。**

## 构造函数
其构造方法的参数必须是一个函数，而且这个函数的两个参数必须是resolve和reject回调函数。这两个函数调用时可以接受任意参数。

* resolve函数:用于将Promise实例的状态从pending变成fulfilled。
* reject函数:用于将Promise实例的状态从pending变成rejected。


```JavaScript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

## 类方法

### all()
Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
新promise的状态由p1、p2、p3决定，分成两种情况。

1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

### race()

### resolve()
有时需要将现有对象转为 Promise 对象：

```JavaScript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

### reject()
与resolve类似。

### try()


## 成员方法

### then()
then方法会返回一个全新的Promise实例对象。**这个全新的Promise对象的状态何时被改变？？换句话说，这个新的Promise对象是如何创建的？**

```JavaScript
let successCallback = function(value) {
  
}
let failCallback = function(error) {
  // failure
}
promise.then(successCallback, failCallback);
```

假设then函数的内部实现

```JavaScript
//这里的value和error均为上一次返回的结果，这里假设结果不是Promise对象。
new Promise(function(resolve, reject) {
    if (/* 异步操作成功 */){
    resolve(successCallback(value))
  } else {
    reject(failCallback(error));
  }
})
```

### catch()
catch是方法then(null, rejection)或then(undefined, rejection)的别名，用于指定发生错误时的回调函数。


### finally()
finally本质上还是then方法的包裹，,finally方法的函数不接收任何参数。

```JavaScript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};    
```


## 参考资料

[promise源码解析（译）-掘金](https://juejin.im/entry/599968f6518825244630f809)

[github](https://github.com/kriskowal/q/tree/v1/design)

[使用 Promises-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

[Promise 对象-阮一峰](http://es6.ruanyifeng.com/#docs/promise)