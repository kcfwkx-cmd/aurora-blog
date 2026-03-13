# Claude Code 工作规范（Aurora 博客项目）

> 用途：约定每次协作的行为边界与记录规范，避免"改了什么/为什么改/怎么回滚"说不清。

## 开工约定（每次开始前）

- 你发 **"开工"**：先读 `CLAUDE.md`、`aurora.md`、`progress.md`，再处理新任务
- 你发 **"收工"**：把当天改动/结论补记到 `progress.md`（涉及主题行为改变时同步更新 `aurora.md`）

## 修改优先级（从高到低）

1. **改配置**：优先改 `_config.yml` / `_config.aurora.yml`
2. **用站点自定义资源覆盖**：优先在 `source/` 下添加资源（如 `source/css/custom.css`）
3. **注入自定义 CSS/JS**：优先使用 `_config.aurora.yml` 的 `injects` 注入
4. **最后才改主题包**：不改 `node_modules/hexo-theme-aurora`（升级会覆盖）
   - 如不得不改：必须同步记录到 `aurora.md` 的"主题内置文件修改记录"

## 终端命令约定

- **终端命令由你执行**（`hexo clean; hexo g; hexo s` 等）
- 我提供：需要跑的命令（PowerShell 兼容写法）+ 改完后提醒运行哪条命令

## 需求描述建议

- **给目标**：想要"长什么样/达到什么效果"
- **给范围**：只改配置？还是允许加 `source/css/custom.css`？能不能动主题包？
- **给截图**：UI/样式类问题尽量截图

## 工作规范

- 修改 `_config.aurora.yml` 之前，必须先查阅 `aurora-docs.md` 确认字段是否存在及正确用法，不确定不乱加。

## 记录规范

- **凡是涉及 Aurora 主题行为改变**：在 `progress.md` 写一条当天记录
- **凡是可能被主题升级覆盖的改动**：在 `aurora.md` 写一条可迁移的记录
- **每条修改点末尾标注操作工具**，格式 `[工具名]`，可选值：`[Claude]` `[Cursor]` `[Trae]` `[千问]` `[手动]` `[其他]`
