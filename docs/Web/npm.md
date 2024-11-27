# npm

npm可以指几个东西：

1.  一个网站，就是前面提到用于搜索 JS 模块的网站：https://www.npmjs.com/。
2.  一个仓库，保存着人们分享的 JS 模块的大数据库。
3.  命令行里的客户端，开发者使用它来管理、安装、发布模块，是node的一个模块。

## package.json

```
{
    "name" : "xxx",//名称，可以是发布包用的，在网页项目开发中没有意义，必须！
    "version" : "x.x.x",//版本，必须。
    "description" : "xxxx",//描述信息，有助于搜索。
    "keywords" : "xxx",//关键字，有助于在人们使用 npm search 搜索时发现你的项目。
    "author" : "xxx",
    "license" : "xxx", //默认是 MIT许可证。
    "bugs" : "xxx",// 当前项目的一些错误信息，如果有的话
    "main" : "xx/xxx.js",//入口文件，一般都是index.js。
    "scripts" : {},// 支持的脚本。可以用npm run xxx来运行这些脚本。
    "dependencies" : {}, //在生产环境中需要用到的依赖。
    "devDependencies" : {}, //在开发、测试环境中用到的依赖。 
}
```

安装依赖:

1.  npm install：安装dependencies和devDependencies中列出的依赖。
2.  npm install --production：安装dependencies中列出的依赖。
3.  npm install sax@latest：安装特定的包，与package.json无关。
4.  npm install --save：表示将这个包名及对应的版本添加到 package.json的 dependencies。
5.  npm install --save-dev： 表示将这个包名及对应的版本添加到 package.json的 devDependencies。
6.  npm install -g ：全局安装包。

npm的install会在当前目录创建node\_modules目录(如果没有的话)，然后下载我们指定的包到这个目录中。

更新依赖:

1.  npm outdated：依赖的包是否有新版本。
2.  npm update ：更新包。
3.  npm update：更新所有包。

更新的规则：先到远程仓库查询最新版本；然后对比本地版本，如果本地版本不存在，或者远程版本较新；查看 package.json 中对应的语义版本规则；如果当前新版本符合语义规则，就更新，否则不更新。

卸载依赖：

1.  npm uninstall ：在node\_modules删除包。
2.  npm uninstall --save ：在node\_modules删除包。并在package.json中移除依赖。
3.  npm uninstall -g ：卸载全局包。

关键字总结：install、uninstall、outdated、update、-g、--save。

## npm run

npm run 是 npm run-script 的缩写，npm run 会创建一个Shell，执行指定的命令，并临时将node\_modules/.bin加入PATH 变量，这意味着本地模块可以直接运行。直接运行 npm run 会列出当前项目的 package.json 中 scripts 属性下的所有脚本命令。

## 参考资料

[CSDN 拭心:npm 与 package.json 快速入门教程](https://blog.csdn.net/u011240877/article/details/76582670)

[《JavaScript标准参考教程》 阮一峰](http://javascript.ruanyifeng.com/nodejs/packagejson.html)