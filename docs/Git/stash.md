# 储藏

```
git stash:储藏变更
git stash list:
git stash apply:
git stash drop:删除储藏，命令格式同apply。
git stash pop:应用并删除储藏，命令格式同apply。
git stash branch:从储藏中创建分支，有疑惑。
```

## 查看储藏列表

```
$ git stash list
stash@{0}: WIP on master: 049d078 added the index file
stash@{1}: WIP on master: c264051 Revert "added file_size"
stash@{2}: WIP on master: 21d80a5 added number to log
```

## 应用储藏

```
git stash apply：应用最新的储藏。
git stash apply stash@{2}：应用特定的储藏。
```

