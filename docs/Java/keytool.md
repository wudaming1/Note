# keytool
keytool是一个java数据证书管理工具。keytool将密钥和证书存在一个称为keystore的文件中。
在keystore中包括两种数据：
* 密钥实体：非对称加密的私钥。
* 可信任证书实体：包含非对称加密公钥，及其他一些信息。

## 生成keystore命令解释
keytool -genkey -alias "tomcat" -keyalg "RSA" -keystore "d:\mykeystore"  -dname "CN=localhost, OU=localhost, O=localhost, L=SH, ST=SH, C=CN" -keypass "changeit" -storepass -validity 180
参数说明：

1. -genkey表示要创建一个新的密钥
2. -dname表示密钥的Distinguished Names，表明了密钥的发行者身份
3. CN=commonName
4. OU=organizationUnit
5. O=organizationName
6. L=localityName
7. S=stateName
8. C=country
9. -keyalg使用加密的算法，这里是RSA
10. -alias密钥的别名
11. -keypass私有密钥的密码，这里设置为changeit
12. -keystore 密钥保存在D:盘目录下的mykeystore文件中
13. -storepass 存取密码，这里设置为changeit，这个密码提供系统从mykeystore文件中将信息取出
14. -validity该密钥的有效期为 180天 (默认为90天)

## 创建keystore证书（服务器使用）
**生成证书时，CN要和服务器的域名相同，如果在本地测试，则使用localhost**
keytool -genkey -alias "tomcat" -keyalg "RSA" -keystore "mykeystore.jks " -dname "CN=172.28.16.227, OU=localhost, O=localhost, L=SH, ST=SH, C=CN" -keypass "123456" -storepass "123456"

## 导出数字证书（客户端使用）
**通过上一步生成的keystore来导出数字证书**
keytool -export -alias tomcat -keystore mykeystore -file localhost.cer -storepass 123456

## 客户端配置：为JVM导入数字证书
keytool -import -trustcacerts -alias tomcat -keystore "%JAVA_HOME%/jre/lib/security/cacerts " -file d:\mycerts.cer -storepass changeit

生成的证书可以交付客户端用户使用，用以进行SSL通讯，或者伴随电子签名的jar包进行发布者的身份认证。

常出现的异常：“未找到可信任的证书”--主要原因为在客户端未将服务器下发的证书导入到JVM中，可以用

keytool -list -alias tomcat -keystore "%JAVA_HOME%/JRE/LIB/SECURITY/CACERTS" -storepass changeit

keytool -list -v -keystore "%JAVA_HOME%/JRE/LIB/SECURITY/CACERTS" -storepass 123456

linux: #keytool -list -alias tomcat -keystore "$JAVA_HOME/jre/lib/security/cacerts" -storepass changeit

来查看证书是否真的导入到JVM中。

keytool生成根证书时出现如下错误：

keytool错误:java.io.IOException:keystore was tampered with,or password was incorrect

原因是在你的home目录下是否还有.keystore存在。如果存在那么把他删除掉，然后再执行或者删除"%JAVA_HOME%/jre/lib/security/cacerts 再执行

##参考资料
[keytool工具应用实例详解](https://www.cnblogs.com/benwu/articles/4891758.html)

