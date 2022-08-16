# app专属目录分析
在Android专属目录中，分为两种目录。**缓存目录**、**文件目录**。

* 缓存目录：用于存放临时文件，一般来说是文件大小比较小的文件，这个目录在SD卡和手机自身硬盘上都有。
* 文件目录：用于存放app需要持久化的文件，图片、文档、音视频等。对应目录名称就好。

专属目录具有以下优点：

* 随着应用的删除被系统删除。
* 操作这种目录不要任何权限声明，直接可以被app使用。
* 其他app无法读写该app的缓存目录。
* 手机自带硬盘上不建议存储大文件，例如：图片。应该放在SD卡上。


## SD卡缓存

```java
/**
缓存目录：/storage/emulated/0/Android/data/com.arise.android.demo/cache
*/
Content.getExternalCacheDir();
```

## SD卡文件
系统Environment环境变量中会对应一些文件目录，有些手机会自动创建这个目录系统，有的不会。我们也可以把这些变量运用到自带硬盘和缓存，只不过我们要自己控制文件的创建。

```java
    /**
    图片目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Pictures
    音乐目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Music
    播客目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Podcasts
    铃声目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Ringtones
    提示音目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Alarms
    通知目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Notifications
    电影目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Movies
    下载目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Download
    相机目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/DCIM
    文档目录：/storage/emulated/0/Android/data/com.arise.android.demo/files/Documents
    */
    Content.getExternalFilesDir(type);
```

type内容为空的时候返回/storage/emulated/0/Android/data/com.arise.android.demo/files目录。


### 手机自带硬盘缓存和文件目录

```java
Content. getCacheDir(); //  /data/data/app_package_name/cache
Content. getFilesDir(); //  /data/data/app_package_name/files
```


