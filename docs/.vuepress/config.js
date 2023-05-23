module.exports = {
  title: '笔记',
  description: 'Just playing around',
  themeConfig: {
    sidebar: [
      {
        title: '机器学习',   // 必要的
        children: [
          '/机器学习/书单及顺序.md',
        ]
      },
      {
        title: 'Dart',   // 必要的
        children: [
          '/Dart/extension.md',
          '/Dart/generator.md',
          '/Dart/mixins.md',
          '/Dart/async.md',
        ]
      },
      {
        title: 'Flutter',   // 必要的
        path: '/Flutter/',
        children: [
          '/Flutter/provider.md',
          '/Flutter/sliver.md',
          {
            title: 'build',   // 必要的
            path: '/Flutter/build',
            children: [
              '/Flutter/build/library_builder.md',
            ]
          },
          {
            title: 'layout',   // 必要的
            children: [
              '/Flutter/layout/layout.md',
            ]
          },
          {
            title: '核心Widget',
            children: [
              '/Flutter/core_widget/ParentData.md',
            ]
          },
          {
            title: 'widgets',   // 必要的
            children: [
              '/Flutter/widgets/InheritedWidget/InheritedWidget.md',
            ]
          }, 
          {
            title: 'navigator',   // 必要的
            path: '/Flutter/navigator',
            children: [
              '/Flutter/navigator/initialize.md',
              '/Flutter/navigator/navigator.md',
              '/Flutter/navigator/push.md',
              {
                title: 'route',   // 必要的
                path: '/Flutter/navigator/route',
                children: [
                  '/Flutter/navigator/route/hierarchy.md',
                  '/Flutter/navigator/route/widgets.md',
                ]
              },
            ]
          },
          {
            title: 'GetX',   // 必要的
            path: '/Flutter/GetX',
            children: [
              '/Flutter/GetX/match.md',
              '/Flutter/GetX/get_page.md',
            ]
          },
        ]
      },
      {
        title: 'Java',   // 必要的
        path: '/Java/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/Java/reference_type.md',
          '/Java/lock.md',
          '/Java/gc.md',
          '/Java/io.md',
          '/Java/okio.md',
          '/Java/nio.md',
          '/Java/history.md',
          '/Java/keytool.md',
          '/Java/innerClass.md',
          '/Java/VM/bytecode.md',
          '/Java/VM/ClassInit.md',
          '/Java/VM/ClassLoader.md',

          {
            title: 'JDK5',
            children: [
              '/Java/JDK5/compileStructrue.md',
              '/Java/JDK5/enum.md',
              '/Java/JDK5/generic.md',
              '/Java/JDK5/processor.md',
            ]
          },
        ]
      },
      {
        title: 'Android',   // 必要的
        path: '/Android/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/Android/color.md',
          '/Android/decompile.md',
          '/Android/directory.md'
        ]
      },
      {
        title: 'Git',   // 必要的
        path: '/Git/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/Git/GitHub/create.md',
          {
            title: 'GitLab',   // 必要的
            children: [
              '/Git/GitLab/cicd.md',
            ]
          },
          '/Git/base.md',
          '/Git/core.md',
          '/Git/commit.md',
          '/Git/stash.md',
          '/Git/others.md'
        ]
      },
      {
        title: 'Mac',   // 必要的
        children: [
          '/Mac/bash_profile.md',
        ]
      },
      {
        title: 'Web',   // 必要的
        children: [
          '/Web/npm.md',
          '/Web/eslint.md',
          {
            title: 'Vue',   // 必要的
            children: [
              '/Web/Vue/_init.md',
              '/Web/Vue/createElement.md',
              '/Web/Vue/Vue_class.md',
              '/Web/Vue/Vue_object.md',
              '/Web/Vue/Router/introduce.md',
              '/Web/Vue/Router/register.md',
              '/Web/Vue/Router/router.md',
            ]
          },
          {
            title: 'Node',   // 必要的
            children: [
              '/Web/Node/nvm.md',
            ]
          }, {
            title: 'JavaScript',   // 必要的
            children: [
              '/Web/JavaScript/原型链.md',
              '/Web/JavaScript/作用域.md',
              '/Web/JavaScript/closure.md',
              '/Web/JavaScript/curry.md',
              '/Web/JavaScript/Promise.md',
              '/Web/JavaScript/promise译文.md',
            ]
          },
          {
            title: 'CSS',   // 必要的
            children: [
              '/Web/CSS/block.md',
              '/Web/CSS/Cascading.md',
              '/Web/CSS/core.md',
              '/Web/CSS/flex.md',
              '/Web/CSS/grid.md',
              '/Web/CSS/inline.md',
            ]
          },
        ]
      },
    ]
  }
}