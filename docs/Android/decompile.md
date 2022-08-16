# Android反编译

## 工具介绍
* [apktool](https://bitbucket.org/iBotPeaches/apktool/downloads/)
* [dex2jar](https://sourceforge.net/projects/dex2jar/files/)
* [JD-GUI](http://jd.benow.ca/)
* [独立集成环境jadx](https://github.com/skylot/jadx)


## 第一步，使用apktool

```
java -jar apktool.jar d -f “apk路径” -o “输出目录”
```
命令分析：
java -jar apktool.jar：调用apktool.jar，后面都是输入到jar包的命令。
d:反编译
-f “”：文件目录
-o ""：输出目录

这一步反编译apk，将apk分解，移除签名。

## 第二步，使用dex2jar

![](media/15302387238992/15302405275636.gif)
先直接将apk文件改变扩展名为普通压缩文件，然后解压。
将dex文件复制到![](media/15302387238992/15302405867342.jpg)
在命令行下定位到dex2jar.bat所在目录，输入"d2j-dex2jar classes.dex"
在本机的测试

```
wudamingdeMacBook-Pro:dex2jar-2.0 wudaming$ ./d2j-dex2jar.sh /Users/wudaming/Tools/Android/反编译/out/135bianjiqi/classes.dex 
dex2jar /Users/wudaming/Tools/Android/反编译/out/135bianjiqi/classes.dex -> ./classes-dex2jar.jar
```
注意sh文件执行的权限问题。

## 第三步，使用jd-gui
简单使用jar包，不介绍了。




