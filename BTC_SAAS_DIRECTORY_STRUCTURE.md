# BTC-SaaS 目录结构规划

## 概述

基于 Cool-Admin-Vue 的架构设计思路，为 BTC-SaaS 项目制定标准化的目录结构规划。

## 项目根目录结构

```
btc-saas/
├── README.md                          # 项目说明文档
├── package.json                       # 项目配置和依赖
├── pnpm-lock.yaml                     # 包管理器锁定文件
├── pnpm-workspace.yaml                # 工作空间配置
├── vite.config.ts                     # Vite 构建配置
├── tsconfig.json                      # TypeScript 配置
├── tailwind.config.js                 # Tailwind CSS 配置
├── eslint.config.js                   # ESLint 配置
├── postcss.config.js                  # PostCSS 配置
├── env.d.ts                           # 环境变量类型定义
├── index.html                         # HTML 入口文件
├── Dockerfile                         # Docker 配置
├── nginx.conf                         # Nginx 配置
├── docker-compose.yml                 # Docker Compose 配置
├── .gitignore                         # Git 忽略文件
├── .cursorrules                       # Cursor 开发规则
├── docs/                              # 项目文档
│   ├── ARCHITECTURE.md                # 架构设计文档
│   ├── DEVELOPMENT.md                 # 开发指南
│   ├── DEPLOYMENT.md                  # 部署指南
│   └── API.md                         # API 文档
├── packages/                          # 包管理目录
│   ├── btc-crud/                      # BTC CRUD 组件库
│   ├── crud/                          # Cool CRUD 组件库
│   └── vite-plugin/                   # 自定义 Vite 插件
├── public/                            # 静态资源目录
│   ├── icons/                         # 图标文件
│   ├── favicon.ico                    # 网站图标
│   └── logo.png                       # Logo 图片
├── src/                               # 源代码目录
│   ├── App.vue                        # 根组件
│   ├── main.ts                        # 应用入口
│   ├── env.d.ts                       # 环境变量类型
│   ├── vite-env.d.ts                  # Vite 环境类型
│   ├── shims-vue.d.ts                 # Vue 类型声明
│   ├── assets/                        # 资源文件
│   │   ├── images/                    # 图片资源
│   │   ├── fonts/                     # 字体文件
│   │   └── icons/                     # 图标资源
│   ├── btc/                           # BTC 核心框架
│   ├── components/                    # 全局组件
│   ├── config/                        # 配置文件
│   ├── modules/                       # 功能模块
│   ├── plugins/                       # 插件系统
│   └── styles/                        # 全局样式
├── dist/                              # 构建输出目录
└── node_modules/                      # 依赖包目录
```

## 核心框架目录 (src/btc/)

```
src/btc/
├── index.ts                           # 框架入口文件
├── index.vue                          # 框架根组件
├── bootstrap/                         # 启动引导模块
│   ├── index.ts                       # 启动主文件
│   ├── module.ts                      # 模块管理器
│   ├── eps.ts                         # 端点管理
│   └── service.ts                     # 服务初始化
├── hooks/                             # 钩子系统
│   ├── index.ts                       # 钩子入口
│   ├── hmr.ts                         # 热更新钩子
│   ├── browser.ts                     # 浏览器相关钩子
│   ├── mitt.ts                        # 事件总线
│   └── storage.ts                     # 存储钩子
├── module/                            # 模块管理
│   ├── index.ts                       # 模块管理器
│   ├── loader.ts                      # 模块加载器
│   └── registry.ts                    # 模块注册器
├── router/                            # 路由管理
│   ├── index.ts                       # 路由配置
│   ├── guards.ts                      # 路由守卫
│   └── utils.ts                       # 路由工具
├── service/                           # 服务层
│   ├── index.ts                       # 服务入口
│   ├── base.ts                        # 基础服务
│   ├── request.ts                     # 请求封装
│   ├── stream.ts                      # 流处理
│   └── websocket.ts                   # WebSocket 服务
├── store/                             # 状态管理
│   ├── index.ts                       # Store 入口
│   ├── app.ts                         # 应用状态
│   ├── user.ts                        # 用户状态
│   ├── menu.ts                        # 菜单状态
│   └── theme.ts                       # 主题状态
├── types/                             # 类型定义
│   ├── index.ts                       # 类型入口
│   ├── module.ts                      # 模块类型
│   ├── plugin.ts                      # 插件类型
│   └── service.ts                     # 服务类型
└── utils/                             # 工具函数
    ├── index.ts                       # 工具入口
    ├── loading.ts                     # 加载工具
    ├── storage.ts                     # 存储工具
    ├── format.ts                      # 格式化工具
    └── validate.ts                    # 验证工具
```

## 功能模块目录 (src/modules/)

```
src/modules/
├── base/                              # 基础模块
│   ├── config.ts                      # 模块配置
│   ├── index.ts                       # 模块入口
│   ├── components/                    # 模块组件
│   │   ├── avatar/                    # 头像组件
│   │   ├── code/                      # 代码组件
│   │   ├── dept/                      # 部门组件
│   │   ├── editor/                    # 编辑器组件
│   │   ├── icon/                      # 图标组件
│   │   ├── image/                     # 图片组件
│   │   ├── link/                      # 链接组件
│   │   ├── menu/                      # 菜单组件
│   │   └── num/                       # 数字组件
│   ├── directives/                    # 指令
│   │   └── permission.ts              # 权限指令
│   ├── locales/                       # 国际化文件
│   │   ├── en.json                    # 英文
│   │   ├── zh-cn.json                 # 简体中文
│   │   └── zh-tw.json                 # 繁体中文
│   ├── pages/                         # 页面组件
│   │   ├── auth/                      # 认证页面
│   │   ├── error/                     # 错误页面
│   │   └── main/                      # 主页面
│   ├── static/                        # 静态资源
│   │   ├── css/                       # 样式文件
│   │   └── svg/                       # SVG 图标
│   ├── store/                         # 状态管理
│   │   ├── index.ts                   # Store 入口
│   │   ├── app.ts                     # 应用状态
│   │   ├── menu.ts                    # 菜单状态
│   │   ├── process.ts                 # 进程状态
│   │   └── user.ts                    # 用户状态
│   ├── types/                         # 类型定义
│   │   └── index.d.ts                 # 类型声明
│   ├── utils/                         # 工具函数
│   │   ├── index.ts                   # 工具入口
│   │   └── permission.ts              # 权限工具
│   └── views/                         # 视图组件
│       ├── frame.vue                  # 框架视图
│       ├── info.vue                   # 信息视图
│       ├── log.vue                    # 日志视图
│       ├── menu/                      # 菜单管理
│       ├── param.vue                  # 参数视图
│       ├── role.vue                   # 角色视图
│       └── user/                      # 用户管理
├── dashboard/                         # 仪表板模块
│   ├── config.ts                      # 模块配置
│   ├── components/                    # 仪表板组件
│   ├── locales/                       # 国际化
│   ├── store/                         # 状态管理
│   ├── types/                         # 类型定义
│   └── views/                         # 仪表板视图
├── system/                            # 系统管理模块
│   ├── config.ts                      # 模块配置
│   ├── components/                    # 系统组件
│   ├── locales/                       # 国际化
│   ├── store/                         # 状态管理
│   ├── types/                         # 类型定义
│   └── views/                         # 系统视图
│       ├── config/                    # 系统配置
│       ├── log/                       # 系统日志
│       ├── monitor/                   # 系统监控
│       └── backup/                    # 数据备份
├── business/                          # 业务模块
│   ├── config.ts                      # 模块配置
│   ├── components/                    # 业务组件
│   ├── locales/                       # 国际化
│   ├── store/                         # 状态管理
│   ├── types/                         # 类型定义
│   └── views/                         # 业务视图
│       ├── customer/                  # 客户管理
│       ├── order/                     # 订单管理
│       ├── product/                   # 产品管理
│       └── inventory/                 # 库存管理
├── workflow/                          # 工作流模块
│   ├── config.ts                      # 模块配置
│   ├── components/                    # 工作流组件
│   ├── locales/                       # 国际化
│   ├── store/                         # 状态管理
│   ├── types/                         # 类型定义
│   └── views/                         # 工作流视图
│       ├── design/                    # 流程设计
│       ├── instance/                  # 流程实例
│       └── task/                      # 任务管理
└── report/                            # 报表模块
    ├── config.ts                      # 模块配置
    ├── components/                    # 报表组件
    ├── locales/                       # 国际化
    ├── store/                         # 状态管理
    ├── types/                         # 类型定义
    └── views/                         # 报表视图
        ├── dashboard/                 # 报表仪表板
        ├── design/                    # 报表设计
        └── export/                    # 报表导出
```

## 插件系统目录 (src/plugins/)

```
src/plugins/
├── btc-crud/                          # BTC CRUD 插件
│   ├── config.ts                      # 插件配置
│   ├── index.ts                       # 插件入口
│   ├── components/                    # CRUD 组件
│   │   ├── column-custom/             # 列自定义
│   │   ├── date/                      # 日期组件
│   │   ├── dict/                      # 字典组件
│   │   ├── number/                    # 数字组件
│   │   ├── render/                    # 渲染组件
│   │   ├── select/                    # 选择组件
│   │   ├── switch/                    # 开关组件
│   │   ├── text/                      # 文本组件
│   │   └── user/                      # 用户组件
│   ├── locales/                       # 国际化
│   ├── plugins/                       # CRUD 插件
│   │   ├── form/                      # 表单插件
│   │   ├── search/                    # 搜索插件
│   │   └── table/                     # 表格插件
│   ├── types/                         # 类型定义
│   └── utils/                         # 工具函数
├── btc-chart/                         # BTC 图表插件
│   ├── config.ts                      # 插件配置
│   ├── components/                    # 图表组件
│   ├── locales/                       # 国际化
│   ├── types/                         # 类型定义
│   └── utils/                         # 工具函数
├── btc-editor/                        # BTC 编辑器插件
│   ├── config.ts                      # 插件配置
│   ├── components/                    # 编辑器组件
│   ├── locales/                       # 国际化
│   ├── types/                         # 类型定义
│   └── utils/                         # 工具函数
├── btc-upload/                        # BTC 上传插件
│   ├── config.ts                      # 插件配置
│   ├── components/                    # 上传组件
│   ├── locales/                       # 国际化
│   ├── types/                         # 类型定义
│   └── utils/                         # 工具函数
├── btc-excel/                         # BTC Excel 插件
│   ├── config.ts                      # 插件配置
│   ├── components/                    # Excel 组件
│   ├── locales/                       # 国际化
│   ├── types/                         # 类型定义
│   └── utils/                         # 工具函数
├── btc-print/                         # BTC 打印插件
│   ├── config.ts                      # 插件配置
│   ├── components/                    # 打印组件
│   ├── locales/                       # 国际化
│   ├── types/                         # 类型定义
│   └── utils/                         # 工具函数
├── theme/                             # 主题插件
│   ├── config.ts                      # 插件配置
│   ├── components/                    # 主题组件
│   ├── hooks/                         # 主题钩子
│   ├── locales/                       # 国际化
│   ├── static/                        # 主题资源
│   ├── types/                         # 类型定义
│   └── utils/                         # 工具函数
├── i18n/                              # 国际化插件
│   ├── config.ts                      # 插件配置
│   ├── components/                    # 国际化组件
│   ├── locales/                       # 语言包
│   └── utils/                         # 工具函数
└── dev-tools/                         # 开发工具插件
    ├── config.ts                      # 插件配置
    ├── components/                    # 开发工具组件
    ├── locales/                       # 国际化
    ├── static/                        # 静态资源
    └── utils/                         # 工具函数
```

## 全局组件目录 (src/components/)

```
src/components/
├── base/                              # 基础组件
│   ├── btc-button/                    # 按钮组件
│   │   ├── index.vue                  # 组件文件
│   │   ├── index.ts                   # 组件导出
│   │   └── README.md                  # 组件文档
│   ├── btc-form/                      # 表单组件
│   │   ├── index.vue                  # 组件文件
│   │   ├── index.ts                   # 组件导出
│   │   └── README.md                  # 组件文档
│   ├── btc-table/                     # 表格组件
│   │   ├── index.vue                  # 组件文件
│   │   ├── index.ts                   # 组件导出
│   │   └── README.md                  # 组件文档
│   ├── btc-dialog/                    # 对话框组件
│   │   ├── index.vue                  # 组件文件
│   │   ├── index.ts                   # 组件导出
│   │   └── README.md                  # 组件文档
│   └── btc-layout/                    # 布局组件
│       ├── index.vue                  # 组件文件
│       ├── index.ts                   # 组件导出
│       └── README.md                  # 组件文档
├── business/                          # 业务组件
│   ├── btc-user-select/               # 用户选择组件
│   ├── btc-dept-tree/                 # 部门树组件
│   ├── btc-role-select/               # 角色选择组件
│   └── btc-permission-tree/           # 权限树组件
└── common/                            # 通用组件
    ├── btc-loading/                   # 加载组件
    ├── btc-empty/                     # 空状态组件
    ├── btc-error/                     # 错误组件
    └── btc-skeleton/                  # 骨架屏组件
```

## 配置文件目录 (src/config/)

```
src/config/
├── index.ts                           # 配置入口
├── dev.ts                             # 开发环境配置
├── prod.ts                            # 生产环境配置
├── proxy.ts                           # 代理配置
├── api.ts                             # API 配置
├── theme.ts                           # 主题配置
├── i18n.ts                            # 国际化配置
└── storage.ts                         # 存储配置
```

## 样式文件目录 (src/styles/)

```
src/styles/
├── index.scss                         # 样式入口
├── variables.scss                     # 样式变量
├── mixins.scss                        # 样式混入
├── reset.scss                         # 样式重置
├── base.scss                          # 基础样式
├── components.scss                    # 组件样式
├── utilities.scss                     # 工具样式
├── dark.scss                          # 暗色主题
├── light.scss                         # 亮色主题
└── responsive.scss                    # 响应式样式
```

## 包管理目录 (packages/)

```
packages/
├── btc-crud/                          # BTC CRUD 包
│   ├── package.json                   # 包配置
│   ├── src/                           # 源代码
│   ├── dist/                          # 构建输出
│   ├── README.md                      # 包文档
│   └── tsconfig.json                  # TypeScript 配置
├── crud/                              # Cool CRUD 包
│   ├── package.json                   # 包配置
│   ├── src/                           # 源代码
│   ├── dist/                          # 构建输出
│   └── README.md                      # 包文档
└── vite-plugin/                       # Vite 插件包
    ├── package.json                   # 包配置
    ├── src/                           # 源代码
    ├── dist/                          # 构建输出
    └── README.md                      # 包文档
```

## 文档目录 (docs/)

```
docs/
├── README.md                          # 文档入口
├── ARCHITECTURE.md                    # 架构设计文档
├── DEVELOPMENT.md                     # 开发指南
├── DEPLOYMENT.md                      # 部署指南
├── API.md                             # API 文档
├── COMPONENTS.md                      # 组件文档
├── PLUGINS.md                         # 插件文档
├── MODULES.md                         # 模块文档
├── STYLING.md                         # 样式指南
├── TESTING.md                         # 测试指南
├── CONTRIBUTING.md                    # 贡献指南
└── CHANGELOG.md                       # 更新日志
```

## 目录结构规范

### 1. 命名规范
- **目录名**: 使用小写字母和连字符 (kebab-case)
- **文件名**: 使用小写字母和连字符 (kebab-case)
- **组件名**: 使用 btc- 前缀，小写字母和连字符
- **模块名**: 使用小写字母和连字符
- **插件名**: 使用 btc- 前缀，小写字母和连字符

### 2. 文件组织规范
- **每个组件**: 必须有独立的目录和 README.md
- **每个模块**: 必须有 config.ts 和 index.ts
- **每个插件**: 必须有 config.ts 和 index.ts
- **类型定义**: 统一放在 types/ 目录
- **国际化**: 统一放在 locales/ 目录

### 3. 导入路径规范
- **源码目录**: `/@/` 指向 `src/`
- **模块目录**: `/$/` 指向 `src/modules/`
- **插件目录**: `/#/` 指向 `src/plugins/`
- **包目录**: `/~` 指向 `packages/`

### 4. 配置文件规范
- **模块配置**: 必须导出 ModuleConfig 类型
- **插件配置**: 必须导出 PluginConfig 类型
- **环境配置**: 区分开发、测试、生产环境
- **类型定义**: 使用 TypeScript 严格模式

## 总结

这个目录结构规划基于 Cool-Admin-Vue 的成熟架构，结合 BTC-SaaS 的业务特点，提供了：

1. **清晰的模块划分**: 基础模块、业务模块、工作流模块等
2. **完整的插件系统**: 支持功能扩展和自定义开发
3. **标准化的组件库**: 统一的组件命名和开发规范
4. **完善的文档体系**: 详细的开发和使用文档
5. **灵活的配置管理**: 支持多环境和动态配置

这个结构为 BTC-SaaS 项目提供了坚实的基础，支持快速开发和长期维护。
