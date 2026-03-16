# Aurora 博客进度记录

> 用途：记录每天做了什么、改了哪些文件、下一步要做什么。
> 约定：每次开工先在当天日期下追加；每条包含"目标 / 修改点 / 结果 / 待办"。
> **工具标注**：每条修改点末尾注明操作工具，格式 `[工具名]`，可选值：`[Claude]` `[Cursor]` `[Trae]` `[千问]` `[手动]` `[其他]`。

---

## 2026-03-13

### 今日目标
- Aurora 主题基础配置、配色与头像调整
- 解决默认封面图与主题色不一致问题

### 修改点
- 新增 `_config.aurora.yml`：统一 Aurora 主题配置 [Cursor]
- 配置头像：`site.avatar: /images/head.jpg` [Cursor]
- 头像框：`theme.profile_shape: rounded` [Cursor]
- 配色：`theme.gradient` → `#f7971e / #ffd200 / #ff6e7f` [Cursor]
- 新增 `source/css/custom.css` + `injects.css` 注入：覆盖默认封面/顶部 Banner [Cursor]
- 新增 `aurora.md`：主题改动记录（升级防丢）[Cursor]
- 新增 `CLAUDE.md`：Claude Code 协作规范 [Claude]
- 新增 `progress.md`：本文件 [Claude]

### 结果
- 本地可预览，改动生效（颜色/头像/头像框）
- 遇到端口占用（4000）时可用 PID 结束进程

### 后续追加修改点（同日）
- 爬取 Aurora 官方文档，保存为 `aurora-docs.md`（全量中文文档备查）[Claude]
- 确认 Aurora 不支持全局 `post.default_cover` 配置，删除 `_config.aurora.yml` 中该无效字段 [Claude]
- 新增 `CLAUDE.md` 工作规范：修改配置前必须先查阅 `aurora-docs.md` [Claude]
- 用 Playwright 检查 DOM，确认无封面卡片选择器为 `.article-thumbnail` / `.feature-thumbnail` [Claude]
- 修复 `source/css/custom.css` 选择器错误（`.article .article-thumbnail` → `.article-thumbnail`）[Claude]
- 排查 CSS 未生效原因：Aurora 把 `source/css/` 当自定义页面处理，生成 HTML 壳而非 CSS 文件 [Claude]
- 排查 inject 格式错误：`- /css/custom.css` 是裸文本注入，改为完整 `<style>` 标签内嵌到 `injects.css` [Claude]
- 截图目录统一改为 `screenshots/`，不再散落根目录 [Claude]
- **最终方案**：CSS 直接内嵌到 `_config.aurora.yml` 的 `injects.css` 中，生效 ✓

### 当前状态
- 无封面文章卡片显示 `default_cover.png`（波浪纹图），几何默认图已隐藏 ✓
- Playwright 无头截图验证：opacity=0 ✓，backgroundImage 正确 ✓

### 待办
- [ ] 完善站点信息：`_config.yml` 的 `title / url / description`
- [ ] 按需为文章设置分类/标签/摘要/封面图
- [ ] 推送到 GitHub（网络问题暂缓，remote 已配置好）

---

## 2026-03-13（补录）

### 修改点
- 完善 `CLAUDE.md` Playwright 截图流程：明确读 `.browser_ws` → connectOverCDP → 失败时重启并回写端点，截图后只关 page 不关浏览器 [Claude]
- 新增 `CLAUDE.md` 文件操作范围规范：只在项目根目录内读写，禁止访问系统临时目录 [Claude]
- 新增 `CLAUDE.md` Debug 规范：优先用 Playwright 截图，不用临时文件传递结果 [Claude]
- 修改 `CLAUDE.md` 终端命令约定：命令由 Claude 执行，用户只负责确认 [Claude]
- 新增 `CLAUDE.md` 调试脚本目录规范：统一放 `tools/`，禁止放 `scripts/`（Hexo 会自动执行）[Claude]
- 修复 `_config.aurora.yml` `dark_mode: auto` → `dark_mode: true`，强制深色模式 [Claude]
- 修复顶部 banner 紫色背景：根源是主题 CSS 变量 `--background-primary-alt: #0d0b12`（紫调深色），通过 `body#body-container.theme-dark{background:#1a1a1a!important;}` 覆盖 [Claude]
- 修复 banner 渐变 CSS 写反问题：`.app-banner-image` 改回 `opacity:0`（隐藏默认紫调 banner 图），`.app-banner-screen` 改回 `opacity:1`（显示橙色渐变）[Claude]
- 新增 `tools/screenshot.js`、`tools/check_body_bg.js`、`tools/check_purple.js`：可复用的 Playwright 调试工具 [Claude]

---

## 2026-03-13（推送）

### 修改点
- 更新 `.gitignore`：新增排除 `.browser_ws`、`screenshots/`、`.cursor/`、`*.log` [Claude]
- git remote 从 SSH 改为 HTTPS：`https://github.com/kcfwkx-cmd/aurora-blog.git` [手动]
- git 全局代理从 7890 更新为 6789 [手动]
- 首次推送到 GitHub，main 分支上传成功 ✓ [手动]

### 待办
- [ ] 完善站点信息：`_config.yml` 的 `title / url / description / author`
- [ ] 按需为文章设置分类/标签/摘要/封面图

---

## 2026-03-14

### 今日目标
- 修复导航栏菜单项不显示问题（只剩首页）
- 修复移动端侧边栏菜单文字重复问题（"首页HOME"）

### 修改点

#### 菜单项不显示
- 新增 `source/about/index.md`、`source/services/index.md`、`source/random/index.md`：三个自定义页面 [手动/Claude]
- 修改 `_config.aurora.yml` menu：添加 `about / services / random` 三个自定义菜单项 [Claude]
- **根因排查**：主题 JS 渲染菜单时，`multi_language: true` 下始终读 `c.i18n[locale]`，自定义项没有 `i18n` 字段导致渲染空字符串 [Claude]
- **修复**：给三个自定义菜单项补充 `i18n` 字段（`zh-CN` / `en`）[Claude]

#### 移动端侧边栏文字重复（"首页HOME"、"我是谁我是谁"）
- **根因**：移动端侧边栏渲染逻辑是两个独立 span 并排输出，`zh-CN` 下第一个 span 显示 `i18n['zh-CN']`，第二个 span 因 zh-TW/en 条件不满足永远兜底显示 `h.name`，导致两段文字拼在一起
- **修复**：向 `injects.css` 注入 `.App-Mobile-sidebar li > div > span + span{display:none!important;}` 隐藏兜底 span [Claude]
- 该 CSS 只在 zh-CN 时生效（两个相邻 span），zh-TW/en 只有一个 span 不受影响

### 遗留问题（明日继续）
- [x] **首页顶部 header 显示异常**：2026-03-15 截图确认正常，顶部灰色为主题下拉默认样式，非 bug ✓
- [ ] 推送今日改动到 GitHub

---

## 2026-03-15

### 今日目标
- 确认并修复导航栏遗留问题

### 结果
- 截图确认：桌面端导航栏 4 个菜单项（首页/我是谁/提供的服务/随机看一篇）全部正常显示 ✓
- 移动端侧边栏 `span+span` CSS 修复已生效 ✓
- 顶部 banner 渐变色（熔岩橙红）正常 ✓
- 所谓"灰色 banner"确认为主题下拉区域的默认样式，非异常

---

## 2026-03-15（续）

### 修改点

#### About 页三张跳转卡片
- 修改 `source/about/index.md`：加入三张卡片 HTML，`type: about` [Claude]
- 新增 `source/about-life/index.md`、`source/about-insurance/index.md`、`source/about-learning/index.md` [Claude]
- **根因排查**：Aurora Vue Router 路由 `/page/:slug` 不匹配带斜杠路径，子页面需平铺到顶层目录 [Claude]
- 修复卡片链接：`/about/life/` → `/page/about-life/` 等 [Claude]

#### Services 页面
- `source/services/index.md` 补充 `type: page` [Claude]
- 菜单路径 `/services` → `/page/services` [Claude]

#### 随机看一篇
- 确认 Aurora 无内置 random 路由，改用 JS 注入实现 [Claude]
- 从菜单移除"随机看一篇"，改为注入"随便看一篇"按钮 [Claude]
- 按钮位置：分类筛选条（`ul.tab`）上方 [Claude]
- 按钮样式：EDITOR'S SELECTION 渐变文字风格 + 圆角胶囊背景 [Claude]
- 跳转方式：`fetch /api/search.json` 取随机 slug，`router.push('/post/'+slug)` [Claude]

#### 封面图加载优化
- 改用 CSS `:has()` 选择器，仅对含 `dccf965f` 的卡片设置默认封面背景，有自定义封面的文章不再预载默认图 [Claude]

### 待办
- [x] 推送今日改动到 GitHub ✓

---

## 2026-03-16

### 修改点

#### 修复"随便看一篇"按钮在 50% 缩放时异常放大
- **根因**：按钮被插入到父级 flex 容器中，`align-items:stretch`（默认值）将按钮高度拉伸至父容器全高，叠加 `border-radius:9999px` 后变成巨大半圆
- **修复**：为按钮加 `align-self:flex-start` 阻止 flex 拉伸，`height:auto` 明确约束高度 [Claude]
- **顺带**：将按钮尺寸相关单位从 `rem/em` 改为 `px`（gap/padding/font-size/SVG 尺寸）[Claude]
- **验证**：Playwright 宽视口模拟（2880px），按钮高度从 7724px 恢复正常 44px ✓

#### 修复"随便看一篇"按钮破坏文章列表布局
- **根因**：按钮被插入到 `#article-list.main-grid`（2列 CSS Grid）的直接子节点，变成第3个 grid item，导致主内容列被挤到窄列（89px）[Claude]
- **修复**：改为插入到 `.ob-gradient-plate`（EDITOR'S SELECTION 框）内部，不再影响 Grid 结构 [Claude]

#### 随便看一篇按钮最终位置与样式
- 位置：EDITOR'S SELECTION 卡片底部，"推荐文章"文字与边框底部之间，左对齐 `left:27px; bottom:36px` [Claude]
- 图标：替换为 Font Awesome 鸽子 SVG，主题渐变配色（玫红→橙红→金黄）[Claude]

#### 首页标签页标题去重（"REXO | REXO" → "REXO"）
- **根因**：Aurora `getTitle()` 将 `this.title` 和 `site.subtitle` 均设为 "REXO" 拼接 [Claude]
- **修复**：注入 MutationObserver，检测到 `X | X` 格式自动去重 [Claude]

#### Favicon 更新
- 配置 `site_meta.favicon: /images/logo-1.png`（深色圆角方块 R 字 logo）[Claude]
- 新增 `source/favicon.ico`、`source/favicon.svg`（尝试透明底方案，最终用 logo-1.png）[Claude]
