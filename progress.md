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
