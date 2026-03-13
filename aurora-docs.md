# Hexo Aurora 主题完整文档（中文版）

> 来源：https://aurora.tridiamond.tech/cn/
> 版本：hexo-theme-aurora 2.x / hexo-plugin-aurora 1.x
> 整理日期：2026-03-13

---

## 目录

1. [快速开始](#1-快速开始)
2. [基础配置](#2-基础配置)
3. [菜单配置](#3-菜单配置)
4. [主题外观](#4-主题外观)
5. [路由配置](#5-路由配置)
6. [文章配置](#6-文章配置)
7. [页面 & 导航](#7-页面--导航)
8. [社交链接](#8-社交链接)
9. [插件](#9-插件)
10. [网页 Meta](#10-网页-meta)
11. [Markdown 配置](#11-markdown-配置)
12. [升级到 v2.5.2](#12-升级到-v252)
13. [升级到 v2.5](#13-升级到-v25)
14. [升级到 v2.0](#14-升级到-v20)

---

## 1. 快速开始

> 来源：https://aurora.tridiamond.tech/cn/guide/getting-started.html

### 环境要求

- Hexo 6.3+
- Yarn 或 NPM

### 安装步骤

**Step 1：安装主题包**

```bash
yarn add hexo-theme-aurora hexo-plugin-aurora
# 或
npm install hexo-theme-aurora hexo-plugin-aurora --save
```

**Step 2：生成主题配置文件**

通过 NPM/Yarn 安装的主题需要手动在项目根目录创建 `_config.aurora.yml`。

Linux/MacOS：
```bash
cp -rf ./node_modules/hexo-theme-aurora/_config.yml ./_config.aurora.yml
```

Windows：手动复制 `node_modules/hexo-theme-aurora/_config.yml` 到根目录，改名为 `_config.aurora.yml`。

**Step 3：配置主题**

修改 `_config.yml` 中的 theme：
```yaml
theme: aurora
```

**Step 4：设置永久链接**

修改 `_config.yml` 中的 permalink，与 Vue-router 路径对齐：
```yaml
permalink: /post/:title.html
```

**Step 5：配置代码高亮**

在 `_config.yml` 中禁用默认高亮：
```yaml
highlight:
  enable: false
prismjs:
  enable: false
```

在 `_config.aurora.yml` 中启用 Shiki：
```yaml
shiki:
  enable: true
  backgroundColor: '#1a1a1a'
```

**Step 6：创建 About 页面**

```bash
hexo new page about
```

**Step 7：生成并预览**

```bash
hexo clean && hexo g && hexo server
```

浏览器访问 `localhost:4000` 查看效果。

---

## 2. 基础配置

> 来源：https://aurora.tridiamond.tech/cn/configs/general.html

### 配置文件说明

- `_config.yml`：Hexo 主配置文件
- `_config.aurora.yml`：Aurora 主题专属配置文件

### site 站点信息

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `subtitle` | String | 博客副标题 |
| `author` | String | 博主名称（显示在 Logo 和介绍区） |
| `nick` | String | 副名称（显示在 Logo 下方） |
| `description` | String | 博客介绍（支持 HTML） |
| `language` | en / zh-CN | 默认语言 |
| `multi_language` | true / false | 是否开启多语言 |
| `logo` | String | Logo 图片 URL |
| `avatar` | String | 头像图片 URL（未设置时使用 logo） |
| `beian` | Object | 网站 ICP 备案信息 |
| `started_date` | String | 建站日期（格式 YYYY-MM-DD），用于运行时长计数 |

### beian（ICP 备案）

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `number` | String | 备案号 |
| `link` | String | 备案链接 |

### police_beian（公安备案）

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `number` | String | 备案号 |
| `link` | String | 备案链接 |

### 配置示例

```yaml
site:
  subtitle: TriDiamond's Blog
  author: 三钻
  nick: TriDiamond
  description: 一位正在重塑知识的技术人 <br /> @ <b>公众号：技术银河</b>
  language: zh-CN
  multi_language: true
  logo: https://image-website.com/path-to-image.jpg
  avatar: https://image-website.com/path-to-image.jpg
  beian:
    number: "123123123123"
    link: 'https://link-to-beian.com'
  police_beian:
    number: "123123123123"
    link: 'https://link-to-police-beian.com'
  started_date: 2023-08-08
```

---

## 3. 菜单配置

> 来源：https://aurora.tridiamond.tech/cn/configs/menu.html

### 默认菜单页面

Aurora 内置三个页面：About、Tags、Archives。

```yaml
menu:
  About: false
  Tags: true
  Archives: true
```

设为 `false` 时隐藏该页面。

### 外部链接

```yaml
menu:
  Tags: true
  Archives: true
  Aurora:
    name: 'Aurora'
    path: 'https://github.com/Aurora/hexo-theme-Aurora'
```

支持 mailto 链接（v1.4.3+）：

```yaml
menu:
  Email:
    name: 'Mail Me'
    path: 'mailto:[email protected]'
```

### 多级菜单

使用 `children` 属性创建子菜单：

```yaml
menu:
  Tags: true
  Archives: true
  projects:
    name: 'Projects'
    children:
      obsidian:
        name: 'Obsidian Theme'
        path: 'https://github.com/tridiamond/hexo-theme-obsidian'
      Aurora:
        name: 'Aurora Theme'
        path: 'https://github.com/Aurora/hexo-theme-Aurora'
```

> 顶级菜单项不需要 `path`，点击不会跳转。

### 国际化 i18n

支持 zh-CN、zh-TW、en。

默认页面 i18n：
```yaml
menu:
  Tags:
    i18n:
      en: My Tags
      zh-CN: 我的标签
  Archives: true
```

自定义页面 i18n：
```yaml
menu:
  contact:
    name: 'Contact'
    i18n:
      zh-CN: '联系我'
      en: 'Contact'
    path: 'http://domain.com/contact'
```

---

## 4. 主题外观

> 来源：https://aurora.tridiamond.tech/cn/configs/theme.html

### 深色模式

| 配置值 | 效果 |
|--------|------|
| `true` | 强制深色 |
| `false` | 强制浅色 |
| `'auto'` | 跟随系统 |

```yaml
theme:
  dark_mode: true
```

### 头像形状

通过 `profile_shape` 配置，可选值：`circle`（圆形）、`diamond`（菱形）、`rounded`（圆角矩形）。

### 渐变色

```yaml
theme:
  gradient:
    color_1: '#24c6dc'
    color_2: '#5433ff'
    color_3: '#ff0099'
```

### 精选文章布局

在 front-matter 中标记 `feature: true` 的文章会出现在首页推荐区（优先显示 3 篇；不足时自动补充最新文章）。

```yaml
theme:
  feature: true
```

### 置顶布局模式

将 `feature` 设为 `false` 时切换为置顶模式：

```yaml
theme:
  feature: false
```

更改后需重新生成：`hexo cl && hexo g`

### 代码高亮（Shiki）

`_config.yml`：
```yaml
highlight:
  enable: false
prismjs:
  enable: false
```

`_config.aurora.yml`：
```yaml
shiki:
  enable: true
  theme:
  externalTheme:
  backgroundColor: '#1a1a1a'
```

**内置主题**（部分）：dark-plus、dracula、github-dark、github-light、monokai、nord、one-dark-pro、solarized-dark、vitesse-dark 等。

**自定义主题**（VSCode 主题 JSON）：

在项目根目录新建 `shiki/` 文件夹，放入 JSON 文件：

```
.
├─ shiki/
│  └─ aurora-future.json
├─ _config.yml
└─ _config.aurora.yml
```

```yaml
shiki:
  enable: true
  theme: aurora-future
  customTheme: '/shiki/aurora-future.json'
  backgroundColor: "#1a1a1a"
```

---

## 5. 路由配置

> 来源：https://aurora.tridiamond.tech/cn/configs/router.html

### 子目录部署

如果博客部署在子目录（如 `https://example.github.io/blog`），需要额外配置，因为 Vue 不支持运行时修改 public path。

**Step 1**：克隆主题源码到 `themes/` 目录

**Step 2**：安装主题依赖

**Step 3**：修改两个配置文件

- `_config.yml`：添加 `root: '/blog/'`
- 主题目录下 `.env.production`：设置 `VUE_APP_PUBLIC_PATH = '/blog/'`

**Step 4**：重新构建主题

```bash
yarn build
# 或
npm run build
```

**Step 5**：重新生成 Hexo 静态文件

```bash
hexo cl && hexo g
```

---

## 6. 文章配置

> 来源：https://aurora.tridiamond.tech/cn/configs/post.html

### 封面图

在文章 front-matter 中配置 `cover` 字段：

```markdown
---
title: 文章标题
date: 2020-08-15 18:49:36
tags:
  - Tag
categories:
  - Cate
cover: https://cover.png
feature: true
---
```

> **注意**：Aurora 主题没有全局 `default_cover` 配置项。封面优先级：
> 1. front-matter 中的 `cover` 字段
> 2. 文章正文中第一张图片
> 3. 无封面（显示主题渐变色兜底）

### 精选文章

在 front-matter 中添加 `feature: true` 标记文章为首页推荐：

```markdown
---
title: 文章标题
feature: true
---
```

---

## 7. 页面 & 导航

> 来源：https://aurora.tridiamond.tech/cn/configs/page.html

### 创建自定义页面

```bash
hexo new page message-board
```

执行后在 `source/` 下生成：

```
.
└── source
    └── message-board
        └── index.md
```

在 `_config.aurora.yml` 中配置导航：

```yaml
menu:
  About: true
  Tags: true
  Archives: true
  pages-menu:
    name: 'MessageBoard'
    path: '/page/message-board'
    i18n:
      cn: 留言板
      en: Message board
```

### 创建 About 页

```bash
hexo new page about
```

```yaml
menu:
  About: true
```

### 创建友链页（Links）

```bash
hexo new page links
```

```yaml
menu:
  About: true
  Tags: true
  Archives: true
  Links: true
```

在 `source/links/index.md` 的 front-matter 中配置友链数据：

**基础属性**

| 属性 | 说明 |
|------|------|
| `type` | 固定填 `friends` |
| `categoryMode` | `true`：按 label 分类展示；`false`：全部平铺 |
| `data` | 数组，友链数据 |

**data 属性**

| 属性 | 说明 |
|------|------|
| `nick` | 博主昵称 |
| `avatar` | 头像链接 |
| `description` | 简介 |
| `link` | 博客链接 |
| `label` | 标签（见下方可用值） |

**label 可用值**

| 标签名 | 中文 | 英文 |
|--------|------|------|
| `links-badge-vip` | 赞助者 | sponsors |
| `links-badge-tech` | 技术 | technical |
| `links-badge-personal` | 个人 | personal |
| `links-badge-designer` | 设计 | designer |

**配置示例**

```yaml
---
title: friends
date: 2023-08-06 17:19:32
type: friends
categoryMode: true
data:
  - nick: 三钻
    avatar: https://res.cloudinary.com/tridiamond/image/upload/xxx.png
    description: Think like an artist, develop like an artisan.
    link: https://tridiamond.tech/
    label: links-badge-vip
---
```

### 菜单配置字段说明

| 属性 | 说明 |
|------|------|
| `name` | 菜单名称（需唯一） |
| `i18n` | 多语言标签 |
| `path` | 自定义页面路径，格式：`/page/[页面文件夹名]` |

多个页面放入子菜单：

```yaml
menu:
  pages-menu:
    name: 'Top Menu'
    children:
      page-1:
        name: 'Page 1'
        path: '/page/page-1'
      page-2:
        name: 'Page 2'
        path: '/page/page-2'
```

---

## 8. 社交链接

> 来源：https://aurora.tridiamond.tech/cn/configs/social.html

### 内置社交平台

| 配置项 | 说明 |
|--------|------|
| `github` | GitHub 主页链接 |
| `twitter` | Twitter 主页链接 |
| `stackoverflow` | Stackoverflow 主页链接 |
| `weibo` | 微博主页链接 |
| `zhihu` | 知乎主页链接 |
| `csdn` | CSDN 主页链接 |
| `juejin` | 掘金主页链接 |

```yaml
socials:
  github: 'https://github.com/TriDiamond'
  twitter: ''
  stackoverflow: ''
  weibo: 'https://weibo.com/u/xxx'
  zhihu: 'https://www.zhihu.com/people/xxx'
  csdn: 'https://blog.csdn.net/xxx'
  juejin: 'https://juejin.cn/user/xxx'
```

### 自定义社交链接

支持格式：SVG、iconfont、jpg、png。

```yaml
socials:
  customs:
    # 使用 SVG（文件放 source/svg/）
    bilibili:
      icon: /svg/bilibili.svg
      link: https://live.bilibili.com/xxx
    # 使用 IconFont
    baidu:
      icon: iconfont icon-baidu
      link: https://baidu.com
    # 使用 FontAwesome
    book:
      icon: far fa-address-book
      link: https://example.com
```

**使用 SVG**：将 `.svg` 放入 `source/svg/` 目录。

**使用 iconfont**：先在 `injects.css` 中引入字体 CSS：

```yaml
injects:
  css:
    - <link rel="stylesheet" href="//at.alicdn.com/t/font_xxx.css" />
```

**使用图片（jpg/png）**：将图片放入 `source/img/` 目录：

```yaml
socials:
  customs:
    facebook:
      icon: /img/facebook.png
      link: https://facebook.com
```

> ⚠️ 每个自定义社交链接的 key 必须唯一。

---

## 9. 插件

> 来源：https://aurora.tridiamond.tech/cn/configs/plugins.html

### 多作者

**方式一**：在文章 front-matter 中直接配置：

```yaml
author:
  name: TriDiamond
  link: https://tridiamond.tech
  avatar: https://avatar.png
  description: 'Think like an artist, code like an artisan.'
  socials:
    github: https://github.com/tridiamond
```

**方式二**：在 `_config.aurora.yml` 预配置作者，文章中通过 key 引用：

```yaml
authors:
  author-1:
    name: TriDiamond
    link: https://tridiamond.tech
    avatar: https://avatar.png
    description: '...'
    socials:
      github: https://github.com/tridiamond
```

### 评论系统（四选一）

**Gitalk**
```yaml
gitalk:
  enable: false
  autoExpand: true
  clientID: ''
  clientSecret: ''
  repo: ''
  owner: ''
  admin: ['']
  id: uid
  language: zh-CN
  distractionFreeMode: true
  recentComment: true
  proxy: ''
```

**Valine**
```yaml
valine:
  enable: false
  app_id: ''
  app_key: ''
  avatar: ''
  placeholder: 留下你的想法~
  visitor: true
  lang: zh-CN
  avatarForce: false
  meta: ['nick', 'mail']
  requiredFields: ['nick', 'mail']
  admin: ''
  recentComment: true
```

**Twikoo**
```yaml
twikoo:
  enable: false
  recentComment: true
  envId: ''
  lang: 'zh-CN'
```

**Waline**
```yaml
waline:
  enable: false
  recentComment: true
  reaction: false
  login: 'disable'
  meta: ['nick', 'mail']
  requiredMeta: ['nick', 'mail']
  commentSorting: 'latest'
  wordLimit: 0
  imageUploader: false
  pageSize: 10
  serverURL: ''
```

### AI 聊天机器人（Dia）

一个吉祥物角色，功能包括：
- 每 30 秒随机发送消息
- 基于时间的欢迎语
- 识别搜索引擎来源
- 悬停和点击事件响应
- 节假日特别问候

```yaml
aurora_bot:
  enable: false
  locale: zh-CN
  bot_type: dia
  tips: []
```

---

## 10. 网页 Meta

> 来源：https://aurora.tridiamond.tech/cn/configs/site-meta.html

### CDN 配置

| 值 | CDN |
|----|-----|
| `en` | Jsdelivr（国际） |
| `cn` | 南方科技大学 CDN（国内） |

```yaml
site_meta:
  cdn: cn
```

> 更换 CDN 后需重新生成：`hexo cl && hexo g`

### SEO Meta

```yaml
site_meta:
  cdn: cn
  favicon:
  description: '博客描述'
  keywords: 'Frontend, Blog, Aurora'
  author: '作者名'
```

### 自定义注入（injects）

```yaml
injects:
  scripts:
    - <script src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
  css:
    - <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css">
    - /css/custom.css
```

---

## 11. Markdown 配置

> 来源：https://aurora.tridiamond.tech/cn/configs/markdown.html

### Front-Matter 扩展属性

**feature**：标记为首页推荐文章
```yaml
---
feature: true
---
```

**abstracts**：自定义首页摘要（默认截取前 140 字符）
```yaml
---
abstracts: 这是一段自定义的文章摘要。
---
```

### 自定义容器

格式：
```
:::[type] [title]
内容
:::
```

**Tip 容器**
```
:::tip
普通提示
:::

:::tip 自定义标题
- 提示内容第一行
- 提示内容第二行
:::
```

**Warning 容器**
```
:::warning
警告内容
:::
```

**Danger 容器**
```
:::danger
危险提示
:::
```

**Details 折叠容器**
```
:::details 点击查看更多
折叠内容（支持文字、列表、代码块）
:::
```

---

## 12. 升级到 v2.5.2

> 来源：https://aurora.tridiamond.tech/cn/upgrade/v2.5.2.html

### 友链文件夹改名

此版本修复了友链文件夹名称不一致的问题，需将 `source/friends/` 重命名为 `source/links/`：

```
source/friends/  →  source/links/
```

---

## 13. 升级到 v2.5

> 来源：https://aurora.tridiamond.tech/cn/upgrade/v2.5.html

### 语言配置变更

`language` 字段从 `cn` 改为标准的 `zh-CN`：

```yaml
site:
  language: zh-CN  # 原来是 cn
```

可用值：`en`、`zh-CN`、`zh-TW`

### 代码高亮引擎切换

从 Prism 切换为 Shiki，参考 [主题外观 - 代码高亮](#代码高亮shiki) 章节配置。

更新完成后重新生成：

```bash
hexo clean && hexo g
```

---

## 14. 升级到 v2.0

> 来源：https://aurora.tridiamond.tech/cn/upgrade/v2.0.html

### 核心变更

所有 Hexo 脚本和生成器从主题包中分离，移至独立插件包 `hexo-plugin-aurora`。

### 三步升级

**Step 1**：升级 Hexo 和相关插件到最新版（Hexo 6.x+）

**Step 2**：安装最新主题和插件

```bash
yarn add hexo-theme-aurora@latest hexo-plugin-aurora@latest
# 或
npm install hexo-theme-aurora@latest hexo-plugin-aurora@latest --save
```

推荐 `package.json` 依赖版本：
- `hexo`: `^6.3.0`
- `hexo-plugin-aurora`: `^1.2.0`
- `hexo-theme-aurora`: `^2.0.0`

**Step 3**：清理并重新生成

```bash
hexo clean && hexo generate
```
