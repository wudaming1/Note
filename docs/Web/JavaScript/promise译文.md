# promise源码解析（译）
[原文地址](https://github.com/kriskowal/q/tree/v1/design)

设想你正在写一个不会立即返回值的函数。最通用的方式是：把最终结果当做参数传递给回调函数。


```JavaScript
    var oneOneSecondLater = function (callback) {
    setTimeout(function () {
        callback(1);//1是最终结果
    }, 1000);
};
```

这是一种相当简单的解决方案，这个方案还有很大的改进空间。

为正常返回值和抛出的异常提供相似的处理工具。通过扩展回调模式来处理异常的方式有很多，其中一种是同时提供callback和errback。

```JavaScript
var maybeOneOneSecondLater = function (callback, errback) {
    setTimeout(function () {
        if (Math.random() < .5) {
            callback(1);
        } else {
            errback(new Error("Can't provide one."));
        }
    }, 1000);
};
```

There are other approaches, variations on providing the error as an argument to the callback, either by position or a distinguished sentinel value. However, none of these approaches actually model thrown exceptions. The purpose of exceptions and try/catch blocks is to postpone the explicit handling of exceptions until the program has returned to a point where it makes sense to attempt to recover. There needs to be some mechanism for implicitly propagating exceptions if they are not handled.

## Promises
所以考虑到大多数的情况，代替最简单的返回值和抛出异常，我们更希望函数通常会返回一个对象(Promise)用来表示最后执行成功或者失败的结果。

接下去我们开始迭代设计promise。我们先把promise设计成一个具有“then”方法对象，通过“then”方法，我们能注册回调函数。


```JavaScript
var maybeOneOneSecondLater = function () {
    var callback;
    setTimeout(function () {
        callback(1);
    }, 1000);
    return {
        then: function (_callback) {
            callback = _callback;
        }
    };
};

maybeOneOneSecondLater().then(callback);
```

这个设计有两个缺点：

* 只能执行一个添加的回调函数。最好的做法是每一个通过then添加进来的回调都能被通知到然后顺序执行。
* 如果在这个promise被创建1秒后注册回调函数，那么回调函数不会被调用。

正常情况下，我们希望可以接收任何数量的回调，且不管是否超时，仍然可以继续注册回调。为了达到这个目的，我们将promise设计成具有两种状态的对象。


```JavaScript
var maybeOneOneSecondLater = function () {
    var pending = [], value;//pending的状态标识promise是正在进行中还是已完成。
    setTimeout(function () {
        value = 1;
        for (var i = 0, ii = pending.length; i < ii; i++) {
            var callback = pending[i];
            callback(value);
        }
        pending = undefined;
    }, 1000);
    return {
        then: function (callback) {
            if (pending) {
                pending.push(callback);
            } else {
                callback(value);
            }
        }
    };
};
```

现在我们将上面的代码拆分成独立的工具函数，deferred对象由两部分组成：

* then:用于注册观察者。
* resolve:用于通知观察者。


```JavaScript
var defer = function () {
    var pending = [], value;
    return {
        resolve: function (_value) {
            value = _value;
            for (var i = 0, ii = pending.length; i < ii; i++) {
                var callback = pending[i];
                callback(value);
            }
            pending = undefined;
        },
        then: function (callback) {
            if (pending) {
                pending.push(callback);
            } else {
                callback(value);
            }
        }
    }
};

var oneOneSecondLater = function () {
    var result = defer();
    setTimeout(function () {
        result.resolve(1);
    }, 1000);
    return result;
};

oneOneSecondLater().then(callback);
```

现在这个模型有一个问题，我们可以多次调用resolve方法，导致最终结果改变(value的值发生变化会导致后序注册的回调的参数发生变化。)，改进版的defer如下：


```JavaScript
var defer = function () {
    var pending = [], value;
    return {
        resolve: function (_value) {
            if (pending) {
                value = _value;
                for (var i = 0, ii = pending.length; i < ii; i++) {
                    var callback = pending[i];
                    callback(value);
                }
                pending = undefined;
            } else {
                throw new Error("A promise can only be resolved once.");
            }
        },
        then: function (callback) {
            if (pending) {
                pending.push(callback);
            } else {
                callback(value);
            }
        }
    }
};
```