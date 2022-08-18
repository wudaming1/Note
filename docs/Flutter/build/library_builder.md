# LibraryBuilder分析

## Build
build_runner与build交互的接口。

```
abstract class Builder {

  FutureOr<void> build(BuildStep buildStep);

  Map<String, List<String>> get buildExtensions;
}
```

## _Builder
build：做一些逻辑筛选工作
_generateForLibrary：
    _generate：生成GeneratedOutput列表，用于生成文件的元素数据。
buildStep.writeAsString：将生成的数据写入AssetId对应的文件。


## LibraryBuilder
单一生成器的build。

## PartBuilder

