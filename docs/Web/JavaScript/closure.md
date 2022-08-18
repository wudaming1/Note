# 闭包
定义：函数内部定义新的函数叫闭包。
特性：闭包内部函数可以把外部函数当做运行环境，可以实现下面特性：
1. 私有变量。
2. 函数代理。
3. 等等...

## 应用
1. 事件防抖：只放过事件流的最后一个事件，拦截其他事件。
2. 事件节流：每隔一段时间放过一个事件流的一个事件，拦截其他事件。