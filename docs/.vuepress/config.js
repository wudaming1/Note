module.exports = {
  title: '笔记',
  description: 'Just playing around',
  themeConfig: {
    sidebar: [
      {
        title: 'Java',   // 必要的
        path: '/Java/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/Java/reference_type.md',
          '/Java/lock.md'
        ]
      },
      {
        title: 'Android',   // 必要的
        path: '/Android/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          '/Android/decompile.md',
          '/Android/directory.md'
        ]
      },
    ]
  }
}