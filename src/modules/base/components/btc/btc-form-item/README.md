# BtcFormItem 组件

## 概述

`BtcFormItem` 是一个增强版的表单项目组件，基于 Element Plus 的 `el-form-item`，增加了智能栅格布局功能。它能够自动处理表单项目的宽度对齐问题，确保同一行内的 label 宽度一致，输入框宽度一致，并且支持响应式布局。

## 核心特性

### 🎯 自量尺 + 栅格布局
- **同一行对齐**：自动测量同一行内所有 label 的最大宽度，统一设置
- **总宽度一致**：使用 CSS Grid 确保所有表单项的总宽度一致
- **输入框宽度一致**：所有输入控件自动撑满内容区域

### 📱 响应式设计
- 支持 `minColWidth` 控制最小列宽
- 自动适应不同屏幕尺寸
- 可自定义列间距

### 🎨 两种 Label 模式
- **auto 模式**：自动测量同一行 label 的最大宽度（推荐用于 label 长短不一的场景）
- **fixed 模式**：使用固定宽度（推荐用于 label 长度较均匀的场景）

## 使用方法

### 基础用法

```vue
<template>
  <btc-form :model="form" label-position="left">
    <!-- ✅ 只保留一个 grid 容器，把所有 el-form-item 都塞进来 -->
    <btc-form-item :min-col-width="300" :gap="16" label-mode="auto">
      <el-form-item label="工号" prop="empId">
        <el-input v-model="form.empId" />
      </el-form-item>
      
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      
      <el-form-item label="常用联系邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
    </btc-form-item>
  </btc-form>
</template>
```

### 固定宽度模式

```vue
<template>
  <btc-form :model="form" label-position="left">
    <!-- 固定宽度模式：所有 label 使用固定宽度 -->
    <btc-form-item 
      :min-col-width="300" 
      :gap="16" 
      label-mode="fixed" 
      :label-width="120"
    >
      <el-form-item label="入职日期" prop="hireDate">
        <el-date-picker v-model="form.hireDate" type="date" />
      </el-form-item>
      
      <el-form-item label="是否启用" prop="enabled">
        <el-switch v-model="form.enabled" />
      </el-form-item>
    </btc-form-item>
  </btc-form>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| **栅格布局属性** | | | | |
| minColWidth | 最少列宽，配合 auto-fill 实现响应式分栏 | number | — | 360 |
| gap | 栅格列间距（水平 + 垂直） | number | — | 16 |
| labelMode | label 模式 | string | auto / fixed | auto |
| labelWidth | label 宽度（labelMode=fixed 时生效） | string / number | — | 120 |
| minContentWidth | 内容区最小宽度 | number | — | 180 |
| fillControls | 是否强制让输入控件撑满内容区 | boolean | — | true |
| **原有 el-form-item 属性** | | | | |
| prop | 表单域 model 字段 | string | — | — |
| label | 标签文本 | string | — | — |
| required | 是否必填 | boolean | — | false |
| rules | 表单验证规则 | FormItemRule / FormItemRule[] | — | — |
| error | 表单验证错误信息 | string | — | — |
| showMessage | 是否显示校验错误信息 | boolean | — | true |
| inlineMessage | 是否以行内形式展示校验信息 | boolean | — | false |
| size | 用于控制该表单域下组件的尺寸 | string | large / default / small | default |
| validateStatus | 表单域验证状态 | string | validating / success / error | — |
| validateTrigger | 触发校验的时机 | string | blur / change / submit / manual | blur |
| validateDebounce | 输入时的防抖延迟 | number | — | 0 |
| validateFirst | 是否在第一个校验规则失败后停止校验 | boolean | — | false |
| validateEvent | 是否触发表单验证 | boolean | — | true |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| validate | 表单验证触发时的回调 | (prop: string, isValid: boolean, message: string) |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 表单项内容 |
| label | 自定义标签内容 |
| error | 自定义错误信息 |
| extra | 额外的提示信息 |
| help | 帮助信息 |
| tooltip | 提示信息 |

## 设计原理

### 三段式配宽策略

1. **总宽度固定**：使用 CSS Grid 的 `repeat(auto-fill, minmax(minColWidth, 1fr))` 确保每个表单项的总宽度一致
2. **Label 宽度统一**：
   - auto 模式：动态测量同一行内所有 label 的最大宽度
   - fixed 模式：使用固定宽度
3. **输入框宽度一致**：内容区域自动撑满剩余空间，所有输入控件设置为 `width: 100%`

### 响应式实现

- 使用 `ResizeObserver` 监听窗口大小变化
- 使用 `MutationObserver` 监听内容变化
- 自动重新测量和调整布局

## 最佳实践

### 1. 选择合适的 Label 模式

- **auto 模式**：适用于 label 长度差异较大的表单
- **fixed 模式**：适用于 label 长度相对均匀的表单

### 2. 合理设置 minColWidth

- 桌面端：300-400px
- 平板端：250-300px
- 移动端：200-250px

### 3. 控制列间距

- 一般表单：16px
- 紧凑表单：12px
- 宽松表单：20px

### 4. 避免过度使用

- 只在需要解决对齐问题的表单中使用
- 简单的单列表单可以直接使用 `el-form-item`

## 兼容性

- Vue 3.x
- Element Plus 2.x
- 现代浏览器（支持 CSS Grid、ResizeObserver、MutationObserver）

## 注意事项

1. 组件会自动处理 Element Plus 表单组件的样式，无需额外配置
2. 建议在表单容器上设置 `label-position="right"` 以获得最佳效果
3. 组件会在挂载时自动测量，支持动态内容变化
4. 在暗色主题下会自动适配背景色
