# 注册
注册的入口是VueRouter的install方法。

## 实现思路

通过mixin在Vue的生命周期中混入操作。beforeCreate、 destroyed。