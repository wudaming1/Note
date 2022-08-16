# Git常用命令
Git是一个分布式版本管理系统。常用命令包括分支操作和记录提交相关操作。
## 分支操作
类似数据库，主要是增删改查。
### 查看分支
* git branch:显示本地分支。
* git branch -r:显示远程分支。
* git branch -a:显示所有分支。

### 新增分支
* git branch branch_name:新建分支。
* git checkout -b branch_name:新建分支，然后切换到branch_name分支。
* git checkout -b branch_name origin/branch_name: checkout远程的branch_name分支，在本地起名为branch_name分支，并切换到本地的branch_name分支。


### 切换分支
* git checkout branch_name:切换到branch_name分支。
* git checkout -b branch_name origin/branch_name: checkout远程的branch_name分支，在本地起名为branch_name分支，并切换到本地的branch_name分支。

### 删除分支
* git branch -d branch_name: 删除本地分支。
* git push origin --delete branch_name: 删除远程分支。

## 记录相关

* git commit -m "comment": 提交记录到本地缓存。
* git push: 将本地缓存的commit提交到远程库。
* git rm --cached “文件路径”: 不删除物理文件，仅将该文件从缓存中删除。删除本地缓存的commit。