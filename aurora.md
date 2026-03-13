# Aurora 主题改动记录（升级防丢）

> 目的：记录所有“可能被主题升级覆盖”的改动与原因，便于日后迁移/恢复。  
> 原则：**尽量不改 `node_modules/hexo-theme-aurora`**；优先使用 `_config.aurora.yml`、`source/` 下的静态资源、以及 `injects` 注入自定义 CSS/JS。

## 当前主题/插件版本

- `hexo-theme-aurora`: 2.5.3
- `hexo-plugin-aurora`: 1.8.4

## 变更日志

### 2026-03-13

- **新增主题配置文件**：创建 `d:\RRWang\Contents\aurora\_config.aurora.yml`  
  - **原因**：将 Aurora 主题配置放在根目录，避免改 `node_modules`。  
  - **影响范围**：主题配置（菜单、头像、渐变、Meta、插件等）。

- **新增头像资源并启用**：使用 `d:\RRWang\Contents\aurora\source\images\head.jpg`，并配置 `site.avatar: /images/head.jpg`  
  - **原因**：自定义头像。  
  - **影响范围**：站点头像展示。

- **头像框形状调整**：`theme.profile_shape` 切换为 `rounded`  
  - **原因**：使用圆角矩形头像框（文档第三种）。  
  - **影响范围**：个人资料卡/相关头像组件。

- **主题渐变色调整**：`theme.gradient` 更新为  
  - `color_1: '#f7971e'`  
  - `color_2: '#ffd200'`  
  - `color_3: '#ff6e7f'`

- **覆盖默认封面图（避免内置默认图不跟随主题色）**
  - **做法**：通过注入自定义 CSS 覆盖 Banner/封面视觉，而不修改主题包文件。  
  - **改动点 1**：在 `d:\RRWang\Contents\aurora\_config.aurora.yml` 增加：
    - `injects.css: - /css/custom.css`
  - **改动点 2**：新增 `d:\RRWang\Contents\aurora\source\css\custom.css`
    - **作用**：让顶部 Banner 与文章卡片封面使用当前渐变色，并隐藏主题内置默认封面图片显示层（通过 CSS `opacity` 覆盖）。

## 主题内置文件修改记录（需要特别关注）

> 这里记录**直接改动** `node_modules/hexo-theme-aurora`（或 `themes/aurora`）的情况。  
> **目前：无（0 条）**。所有改动均通过配置与注入实现。

