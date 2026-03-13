---
title: Solitude主题配置全解——我踩过的那些坑
date: 2026-03-12
categories: 学点没用的
tags:
  - Hexo
  - Solitude
  - 建站
desc: _config.solitude.yml 里能改的东西，比你想象的多得多。
---

用 Solitude 搭博客大概一个月，期间踩了不少坑。这篇文章把 `_config.solitude.yml` 里值得关注的配置项挨个过一遍，顺便记录一下哪些地方容易出问题。

所有改动都在 `_config.solitude.yml` 里，除非特别说明。

---

## 站点基础信息

最先要改的是 `_config.yml`（注意不是主题配置，是 Hexo 本身的配置）：
```yaml
title: 你的博客名
author: 你的名字
language: zh-CN
timezone: Asia/Shanghai
```

这几行决定了网站标题、作者署名和时区。时区如果不填，文章发布时间会对不上。

---

## 导航栏

导航菜单在 `nav.menu` 里，支持多级嵌套：
```yaml
nav:
  menu:
    首页: /
    文章:
      全部文章: /archives/ || fas fa-folder-closed
      全部分类: /categories/ || fas fa-clone
    关于: /about/
```

`||` 后面跟的是 Font Awesome 图标类名，悬停时会显示图标。右侧可以加自定义按钮，比如「开往」这类博客联盟的跳转链接。

导航右侧还有几个功能图标——搜索、控制台、相册等，这些是通过其他配置项开关控制的，不在 `nav` 里直接配置。

---

## 首页顶部 Banner
```yaml
hometop:
  enable: true
  banner:
    title: 你想说的第一句话
    desc:
      - 副标题第一行
      - 副标题第二行
```

`title` 支持 `<br>` 换行，适合写长一点的开场白。`desc` 是数组，可以写多行，会轮播显示。

Banner 下面还有分类快捷组 `group`，格式是：
```yaml
  group:
    随笔: /categories/随笔/ || fas fa-pen || linear-gradient(to right,#f65,#ffbf37)
```

名称、链接、图标、渐变色，四个元素用 `||` 分隔。渐变色直接写 CSS gradient，自由度很高。

---

## 侧边栏

侧边栏的显示内容分三个场景单独配置：首页、文章页、普通页面。
```yaml
aside:
  home:
    noSticky: "about"
    Sticky: "allInfo"
  post:
    noSticky: "about"
    Sticky: "newestPost"
```

`noSticky` 是不跟随滚动的部分，`Sticky` 是跟随滚动的部分。值是预设组件的名称，比如 `about`（作者卡片）、`allInfo`（站点信息）、`newestPost`（最新文章）。

侧边栏位置用 `position` 控制：`0` 是左侧，`1` 是右侧。

作者卡片 `my_card` 里可以配置头像、签名、状态问候语（早上好/下午好/晚安）、社交链接等，细节比较多，值得花时间填好。

---

## 主题色与显示模式
```yaml
theme_color:
  dark: "#ffc848"
  light: "#425AEF"

display_mode:
  type: auto   # auto 跟随系统 / dark 强制深色 / light 强制浅色
  universe: false  # 深色模式下显示星空背景
```

主题色会影响链接、按钮、高亮等大量元素。`universe` 开启后深色模式下会有粒子星空效果，很好看但对性能有一点影响。

---

## 音乐胶囊

左下角的浮动播放器：
```yaml
meting_api: "你的MetingAPI地址"

capsule:
  enable: true
  id: 歌单ID
  server: netease
  type: playlist
  volume: 0.8
```

Meting API 需要自建或用公共地址。网易云歌单受版权限制，很多歌只有40秒试听，这是平台问题，API 层面解决不了。

---

## 文章配置
```yaml
post:
  default:
    cover:
      - /img/default.png   # 没有封面时的默认图
    copyright:
      enable: true
      license: CC BY-NC-SA 4.0
  meta:
    date: true        # 显示发布日期
    wordcount: true   # 显示字数
    readtime: true    # 显示阅读时长
```

文章底部的版权声明默认开启，license 可以改成你喜欢的协议。`meta` 里的字段控制文章头部显示哪些信息。

文章还可以开启 AI 摘要：
```yaml
  ai:
    enable: true
    modelName: 你给AI起的名字
```

开启后文章顶部会出现一个摘要卡片，内容需要在文章 front-matter 里手动填 `ai_text`。

---

## 代码高亮
```yaml
highlight:
  enable: true
  copy: true      # 显示复制按钮
  expand: true    # 默认展开长代码
  theme: mac      # default / mac
  color: dracula  # default / solidity / dracula
```

`mac` 主题会给代码块加上红黄绿三个圆点，视觉上好看很多。颜色方案 `dracula` 是经典的暗紫色，适合深色模式。

---

## 搜索

本地搜索是最简单的方案，不依赖第三方服务：
```yaml
search:
  enable: true
  type: local
```

需要同时安装插件 `hexo-generator-search`，并在 `_config.yml` 里加：
```yaml
search:
  path: search.xml
  field: post
  content: true
```

搜索框会索引所有文章标题和正文，速度快，但博客很大时索引文件会变重。

---

## 页脚
```yaml
footer:
  information:
    author: false
  beian:
    - name: 湘ICP备xxxxxxxx号
      url: https://beian.miit.gov.cn/
```

备案号如果有的话在 `beian` 里填。`author` 设为 `false` 可以隐藏作者信息那行。

「框架：Hexo 主题：Solitude」这行文字在配置里控制不了，需要直接修改主题文件 `themes/solitude/layout/includes/footer.pug`。这是我遇到的第一个必须动主题文件的地方。

---

## 扩展注入

这个功能很实用，可以在不改主题文件的前提下插入自定义代码：
```yaml
extends:
  head:
    -
  body:
    -
```

自定义 CSS 放到 `source/css/custom.css`，通过这个方式引入，升级主题也不会丢失。

---

## 关于页

关于页的内容不在 `_config.solitude.yml` 里，而是在 `source/_data/about.yml` 里单独管理。模块非常丰富，包括头像标签、个人介绍、技能图标、座右铭、爱好、建站原因等，每个模块独立开关，按需启用。

`source/about/index.md` 的 front-matter 必须加 `type: about`，否则主题不知道这是关于页，会按普通页面渲染。

---

## 哪些东西配置文件控制不了

用下来发现，有几类需求是 `_config.solitude.yml` 解决不了的：

**页面细节样式**：比如导航下拉菜单的背景色、某个组件的字体大小，需要改主题的 CSS 文件或者用自定义 CSS 覆盖。

**模板结构**：比如页脚的版权文字、导航按钮的 tooltip 格式，写死在 Pug 模板里，只能改主题文件。

**多语言文本**：界面上显示的固定文字（比如「中控台」改成「控制台」），在 `themes/solitude/languages/zh-CN.yml` 里改。

这三类改动一旦涉及主题文件，就要记录下来，主题升级时手动合并。代价不大，但要养成习惯。

---

## 一个建议

刚开始配置的时候很容易陷进去，改一个地方验证一个地方，一天过去什么都没写。

我的做法是：先把框架搭好，能跑起来就行，细节问题记到一个清单里，集中处理。完美主义是建站的天敌——博客是用来写东西的，不是用来配置的。
