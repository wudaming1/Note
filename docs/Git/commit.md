# 提交
在git中， 每次提交生成一个提交记录。

## commit
* `git commit -m "comment"` ：将modify提交到本地仓库。
* `git push` ：将本地所有的提交记录同步的远程仓库。


## log
 `git log` 用于查看提交记录。exp:
 
 
```
commit a11bef06a3f659402fe7563abf99ad00de2209e6 //hash值
Author: Scott Chacon <schacon@gee-mail.com> //修改人
Date:   Sat Mar 15 10:31:28 2008 -0700

    first commit //提交时的注释
```
 
 
*参数说明*
-------

* -p :展开提交的diff。
* -2 :表示显示最近的2条提交。
* --word-diff :`-p`的附加参数，用于设置diff单词层面对比显示，默认是行对比显示。
 
 
## Tag
作为版本管理工具，Git可以对某个版本打上标签(tag)，表示本版本为发行版。
[参考](https://blog.csdn.net/b735098742/article/details/78935748)

