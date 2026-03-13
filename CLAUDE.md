# Claude Code 工作规范（Aurora 博客项目）

> 用途：约定每次协作的行为边界与记录规范，避免"改了什么/为什么改/怎么回滚"说不清。

## 开工约定（每次开始前）

- 你发 **"开工"**：先读 `CLAUDE.md`、`aurora.md`、`progress.md`，再处理新任务
- 你发 **"收工"**：把当天改动/结论补记到 `progress.md`（涉及主题行为改变时同步更新 `aurora.md`），然后提醒执行 git commit
- **阶段性改动完成后**（不必等收工）：提醒执行 git commit，message 简明描述做了什么
- **Playwright 截图**：按以下固定流程执行，不得跳步：
  1. 读取 `.browser_ws` 文件，获取 WebSocket 端点
  2. 用 `chromium.connectOverCDP(wsEndpoint)` 尝试连接已有浏览器
  3. **连接成功**：直接在已有浏览器里打开新 page，导航到目标 URL，截图，截图后关闭 page（不关浏览器）
  4. **连接失败**（浏览器已关）：`chromium.launch({ headless: false })` 启动新实例，把 `browser.wsEndpoint()` 写回 `.browser_ws`，再执行截图，截图后关闭 page（不关浏览器）
  5. **严禁**：不读 `.browser_ws` 就直接截图；每次截图都新开浏览器实例

## 修改优先级（从高到低）

1. **改配置**：优先改 `_config.yml` / `_config.aurora.yml`
2. **用站点自定义资源覆盖**：优先在 `source/` 下添加资源（如 `source/css/custom.css`）
3. **注入自定义 CSS/JS**：优先使用 `_config.aurora.yml` 的 `injects` 注入
4. **最后才改主题包**：不改 `node_modules/hexo-theme-aurora`（升级会覆盖）
   - 如不得不改：必须同步记录到 `aurora.md` 的"主题内置文件修改记录"

## 终端命令约定

- **终端命令由用户执行**：Ctrl+C 停服务器、`hexo clean && hexo g && hexo s` 均由用户手动运行；Claude 负责告知"现在需要重启"或"可以执行了"。

## 需求描述建议

- **给目标**：想要"长什么样/达到什么效果"
- **给范围**：只改配置？还是允许加 `source/css/custom.css`？能不能动主题包？
- **给截图**：UI/样式类问题尽量截图

## 工作规范

- 修改 `_config.aurora.yml` 之前，必须先查阅 `aurora-docs.md` 确认字段是否存在及正确用法，不确定不乱加。
- **文件操作范围**：所有文件读写只在项目根目录 `D:/rrwang/contents/aurora` 内进行，禁止读写系统临时目录或其他路径。
- **Debug 优先用截图**：调试时优先用 Playwright 启动 Chromium 截图查看实际效果，不用临时文件传递结果。
- **调试脚本目录**：Playwright/Node.js 调试脚本统一放 `tools/`，**严禁放 `scripts/`**（Hexo 会自动执行 `scripts/` 下所有 `.js` 文件，会破坏构建）。

## 记录规范

- **凡是涉及 Aurora 主题行为改变**：在 `progress.md` 写一条当天记录
- **凡是可能被主题升级覆盖的改动**：在 `aurora.md` 写一条可迁移的记录
- **每条修改点末尾标注操作工具**，格式 `[工具名]`，可选值：`[Claude]` `[Cursor]` `[Trae]` `[千问]` `[手动]` `[其他]`
