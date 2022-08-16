module.exports = {
  title: '笔记',
  description: 'Just playing around',
  themeConfig: {
    sidebar: [
      {
        title: 'Java',   // 必要的
        path: '/Java/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/Java/reference_type.md',
          '/Java/lock.md',
          '/Java/gc.md',
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
          '/Git/base.md',
          '/Git/core.md',
          '/Git/commit.md',
          '/Git/stash.md',
          '/Git/others.md'
        ]
      },
    ]
  }
}