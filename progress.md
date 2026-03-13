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
