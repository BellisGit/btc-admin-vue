# BTC 组件库

## 📚 概述

BTC 项目级组件库，提供项目中可复用的 Vue 3 组件，按功能和使用场景分类管理。

## 🏗️ 目录结构

```
src/components/
├── README.md              ← 组件库总览文档
├── index.ts               ← 统一导出入口
├── base/                  ← 基础组件 (原子级别)
│   ├── Button/           ← 按钮组件
│   ├── Input/            ← 输入框组件
│   └── Icon/             ← 图标组件
├── composite/             ← 复合组件 (组合级别)
│   ├── BtcTabInk/        ← Tab 下划线动画组件
│   ├── Modal/            ← 模态框组件
│   └── Dropdown/         ← 下拉菜单组件
└── business/              ← 业务组件 (业务级别)
    ├── AuthForm/         ← 认证表单组件
    └── DataTable/        ← 数据表格组件
```

## 🎯 组件分类

### 基础组件 (base/)
原子级别的 UI 组件，功能单一，复用性极高。

- **特点**: 功能简单、使用频繁、维护成本低
- **文档**: 仅提供 JSDoc 注释，无需单独 README
- **示例**: Button, Input, Icon

### 复合组件 (composite/)
由多个基础组件组合而成，提供特定功能。

- **特点**: 功能相对复杂、有多种使用方式、需要配置说明
- **文档**: 提供简化 README，包含基础用法和配置
- **示例**: TabInk, Modal, Dropdown

### 业务组件 (business/)
包含特定业务逻辑的完整功能组件。

- **特点**: 功能复杂、业务逻辑多、使用方式多样
- **文档**: 提供完整 README，包含详细说明和示例
- **示例**: AuthForm, DataTable, UserManagement

## 🚀 快速开始

### 安装使用

```typescript
// 导入组件
import { BtcTabInk } from '@/components'

// 导入类型
import type { TabItem, TabInkProps } from '@/components'
```

### 基础用法

```vue
<template>
  <div class="tabs">
    <div 
      v-for="(tab, index) in tabs" 
      :key="tab.id"
      class="btc-tab-item"
      :class="{ active: index === activeIndex }"
      @click="activeIndex = index"
    >
      {{ tab.label }}
    </div>
    <BtcTabInk :activeIndex="activeIndex" :tabs="tabs" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BtcTabInk } from '@/components'
import type { TabItem } from '@/components'

const activeIndex = ref(0)
const tabs = ref<TabItem[]>([
  { id: 1, label: '标签1' },
  { id: 2, label: '标签2' },
  { id: 3, label: '标签3' }
])
</script>
```

## 📦 可用组件

### BtcTabInk - Tab 下划线动画组件

用于 Tab 组件的下划线指示器，支持平滑的动画过渡。

#### 特性
- ✅ 支持任意数量的标签
- ✅ 平滑的动画过渡
- ✅ 自动响应窗口大小变化
- ✅ 主题色支持
- ✅ TypeScript 完整支持
- ✅ 性能优化

#### Props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| activeIndex | 当前激活的标签索引 | number | - |
| tabs | 标签列表 | TabItem[] | - |
| duration | 动画持续时间(ms) | number | 300 |
| color | 下划线颜色 | string | 主题色 |
| height | 下划线高度(px) | number | 2 |

#### 使用示例

```vue
<!-- 基础用法 -->
<BtcTabInk :activeIndex="0" :tabs="tabs" />

<!-- 自定义配置 -->
<BtcTabInk 
  :activeIndex="activeIndex" 
  :tabs="tabs"
  :duration="500"
  color="#ff6b6b"
  :height="3"
/>

<!-- 响应式更新 -->
<BtcTabInk 
  :activeIndex="activeIndex" 
  :tabs="dynamicTabs"
  @update="handleInkUpdate"
/>
```

## 🎨 主题支持

所有组件都支持主题定制，通过 CSS 变量实现：

```css
/* 主色调 */
--el-color-primary: #409eff;

/* 暗色主题 */
.dark {
  --el-color-primary: #79bbff;
}
```

## 🔧 开发规范

### 组件开发

1. **命名规范**
   - 组件名使用 PascalCase
   - 文件名使用 PascalCase
   - 目录名使用 PascalCase

2. **类型定义**
   - 所有组件必须提供 TypeScript 类型
   - 接口命名以组件名开头
   - 导出所有相关类型

3. **样式规范**
   - 使用 `btc-` 前缀避免样式冲突
   - 支持 CSS 变量主题定制
   - 提供暗色主题支持

4. **文档要求**
   - 基础组件：仅 JSDoc 注释
   - 复合组件：简化 README
   - 业务组件：完整 README

### 代码示例

```typescript
// 组件定义
export default defineComponent({
  name: 'BtcTabInk',
  props: {
    // 使用接口定义 props
  } as const,
  setup(props, { expose }) {
    // 组件逻辑
    return {
      // 返回值
    }
  }
})

// 类型定义
export interface TabInkProps {
  activeIndex: number
  tabs: TabItem[]
  duration?: number
}
```

## 📝 贡献指南

### 添加新组件

1. 确定组件分类（base/composite/business）
2. 创建组件目录和文件
3. 添加类型定义
4. 更新 `index.ts` 导出
5. 添加相应文档

### 组件测试

```bash
# 运行组件测试
pnpm test components

# 测试覆盖率
pnpm test:coverage components
```

## 🔗 相关资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Element Plus 组件库](https://element-plus.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

## 📄 许可证

MIT License - 详见项目根目录 LICENSE 文件
