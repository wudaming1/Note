# 如何关联Widget
页面的关联逻辑在ModalRoute对象，在install时会创建route的OverlayEntries,通过_ModalScope对象来完成绘制具体Widget，在其build方法中可以找到```widget.route.buildPage```