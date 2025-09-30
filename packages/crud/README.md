# BTC CRUD Package

基于 Vue 3 + TypeScript + Element Plus 的 CRUD 组件库

## 功能特性

- 🚀 基于 Vue 3 Composition API
- 📦 TypeScript 支持
- 🎨 Element Plus UI 组件
- 🔧 完整的 CRUD 操作
- 📱 响应式设计
- 🌍 国际化支持

## 组件列表

### 核心组件
- `BtcCrud` - CRUD 容器组件
- `BtcTable` - 表格组件
- `BtcForm` - 表单组件
- `BtcSearch` - 搜索组件
- `BtcPagination` - 分页组件

### 操作组件
- `BtcAddBtn` - 新增按钮
- `BtcRefreshBtn` - 刷新按钮
- `BtcMultiDeleteBtn` - 批量删除按钮

### 布局组件
- `BtcRow` - 行布局
- `BtcFlex1` - 弹性布局
- `BtcDialog` - 对话框

## 使用方法

```typescript
import { BtcCrud } from '@btc-vue/crud'

// 在组件中使用
<BtcCrud>
  <BtcTable />
  <BtcPagination />
</BtcCrud>
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

## 许可证

MIT
