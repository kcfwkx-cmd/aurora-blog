# Aurora 博客每日进度记录

> 用途：记录每天做了什么、改了哪些文件、下一步要做什么。  
> 约定：每次开工先在当天日期下追加一条；每条尽量包含“目标 / 修改点 / 结果 / 待办”。

## 2026-03-13

### 今日目标
- Aurora 主题基础配置、配色与头像调整
- 解决默认封面图与主题色不一致问题

### 修改点（摘要）
- 新增 `/_config.aurora.yml`：统一 Aurora 主题配置
- 配置头像：`site.avatar: /images/head.jpg`
- 头像框：`theme.profile_shape: rounded`
- 配色：`theme.gradient` 更新为 `#f7971e / #ffd200 / #ff6e7f`
- 新增 `source/css/custom.css` 并通过 `injects.css` 注入：覆盖默认封面/顶部 Banner 显示
- 新增 `aurora.md`：主题改动记录（升级防丢）

### 结果/状态
- 本地可预览，改动生效（颜色/头像/头像框）
- 遇到端口占用（4000）时已学会用 PID 结束进程

### 下一步（可选）
- 完善站点信息：`_config.yml` 的 `title/url/description` 等
- 按文章需要设置分类/标签/摘要/封面图（如果需要每篇不同封面）

---

## 2026-03-14

### 今日目标
- 自定义导航菜单配置
- 调整字体为思源黑体
- 创建工作规则文档

### 修改点（摘要）
- **导航菜单配置**：在 `_config.aurora.yml` 中配置自定义菜单项（首页、我是谁、提供的服务、随机看一篇）
- **创建自定义页面**：`source/about/index.md`、`source/services/index.md`、`source/random/index.md`
- **调整字体**：通过 `injects.css` 引入 Noto Sans SC（思源黑体）并覆盖所有文本元素字体
- **创建 TRAE.md**：工作规则文档，约定优先使用主题配置、避免修改 node_modules、记录重要改动等原则
- **创建 trae-aurora-change.md**：主题底层配置修改记录文档

### 结果/状态
- 导航菜单自定义配置完成
- 思源黑体已通过 injects.css 成功配置（未修改 node_modules）
- 工作规则文档已建立

### 下一步（可选）
- 完善"我是谁"和"提供的服务"页面内容
- 实现"随机看一篇"功能

