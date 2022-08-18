# createElement过程分析
Vue通过_render函数来生成VNode，而_render的主要逻辑是通过createElement实现的。createElement有两个主要流程：
1. 生成内置的标签的VNode，如：div、span。
2. 生成组件的VNode。


## 生成组件VNode
createComponent
