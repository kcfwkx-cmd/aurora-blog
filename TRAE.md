# TRAE 工作规则

> 每次工作开始前请先阅读此文件

## 核心原则

### 1. 优先使用主题配置功能
- **第一选择**：通过 `_config.aurora.yml` 等配置文件进行调整
- **第二选择**：查阅主题文档，寻找官方支持的配置项
- **最后选择**：使用 CSS/JS 注入等方式覆盖

### 2. 优先更改根目录文件
- **优先级**：根目录文件 > 主题配置 > 覆盖方案
- **禁止直接修改**：未经询问，不得修改 `node_modules/` 下的主题底层文件
- **必须询问**：如需修改主题底层配置，必须先询问用户
- **记录改动**：修改主题底层后，必须将信息记录到 `trae-aurora-change.md`

### 3. 避免直接修改 node_modules
- 永远不要直接修改 `node_modules/` 下的文件
- 所有改动应通过配置文件或 `source/` 目录下的资源实现
- 这样可以避免主题升级时丢失改动

### 4. 记录重要改动
- 凡是涉及 Aurora 主题行为改变：在 `Aurora_progress.md` 写一条当天记录
- 凡是可能被主题升级覆盖的改动：在 `aurora.md` 写一条可迁移的记录
- 凡是修改主题底层配置：在 `trae-aurora-change.md` 记录详细信息

## 工作流程

1. **开始工作前**：阅读 TRAE.md
2. **遇到问题时**：
   - 先搜索主题文档和现有配置
   - 尝试通过配置项解决
   - 确认无配置项可用时，再考虑覆盖方案
3. **完成改动后**：
   - 更新相关记录文件（Aurora_progress.md 或 aurora.md）
   - 确认改动生效

## 已知配置项参考

### Aurora 主题配置
- 文档：https://aurora.tridiamond.tech/guide/configuration.html
- 配置文件：`_config.aurora.yml`
- 主要配置项：
  - `site`: 站点信息（subtitle, author, nick, avatar 等）
  - `menu`: 导航菜单
  - `theme`: 主题外观（dark_mode, profile_shape, gradient 等）
  - `site_meta`: 站点 Meta（cdn, favicon, description 等）
  - `injects`: 自定义注入（scripts, css）

### 自定义样式
- 通过 `injects.css` 注入自定义 CSS
- 或在 `source/css/custom.css` 中编写样式

### 自定义页面
- 在 `source/` 下创建页面目录和 `index.md`
- 在 `_config.aurora.yml` 的 `menu` 中配置导航

## 注意事项

- Aurora 主题的 i18n 文本硬编码在编译后的 JS 中，暂无配置方式覆盖
- 如需修改硬编码文本，只能通过 CSS 隐藏或 JS 覆盖
- `multi_language` 配置控制是否显示多语言切换功能，与菜单文本重复显示无关
