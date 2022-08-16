# 其他小功能

## 合并commit
在commit还没push前，


```
git log -i //查看最近i条记录，找到需要合并的条数，如2条，则已第三条的commit_id reabse。
git reabse -i commit_id //进入合并操作，最上面的一条不要动。其他选s。退出编辑:wq。
```

## 忽略被track的文件
.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。解决方法就是先把本地缓存删除（改变成未track状态），然后再提交:


```
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```