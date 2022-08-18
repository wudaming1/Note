# 环境变量
在Mac系统中，配置文件有4个，分别是：
* /etc/profile:用于设置系统级的环境变量和启动程序，对所有用户生效。
* /etc/bashrc:这个文件用于配置函数或别名,对所有用户生效。
* ~/.bashrc:这个文件用于配置函数或别名,对当前用户生效。
* ~/.bash_profile:用于配置环境变量和启动程序，对当前用户生效。

## 修改.bash_profile
1. 打开terminal(终端)
2. cd ~ ( 进入当前用户的home目录)
3. open .bash_profile (打开.bash_profile文件，如果文件不存在就  创建文件：touch .bash_profile  编辑文件：open -e bash_profile)
4. 直接更改弹出的.bash_profile文件内容
5. command + s 保存文件，然后关闭
6. 在terminal(终端)中输入 source .bash_profile (使用刚才更新之后的内容)

## 分析.bash_profile
这个文件在用户登录时会被执行一次，并将结果记录在系统内存里面。在linux系统中，export命令用于设置或显示环境变量。在shell中执行程序时，shell会提供一组环境变量。export可新增，修改或删除环境变量，供后续执行的程序使用。同时，重要的一点是，export的效力仅及于该次登陆操作。注销或者重新开一个窗口，export命令给出的环境变量都不存在了。
语法：

```
export [-fnp][变量名称]=[变量设置值]
// -f:代表[变量名称]中为函数名称。
// -n:删除指定的变量。变量实际上并未删除，只是不会输出到后续指令的执行环境中。
// -p:列出所有的shell赋予程序的环境变量。
```

使用export修改PATH环境变量，PATH是一个保留变量名，shell环境会对它有解析规则，按“:”分隔不同路径，当用户在terminal输入一个一串字符并按回车后，shell会依次在这些路径里找对应的可执行文件并交给系统核心执行。

```
export PATH="/bin/bash:$PATH" //$PATH表示取PATH变量的值，而不是把PATH当做字符串。
```
使用export添加环境变量

```
export name="value"
```

## 访问
待续...