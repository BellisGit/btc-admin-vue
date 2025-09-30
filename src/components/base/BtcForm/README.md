# BtcForm 表单组件

## 📋 概述

BtcForm 是基于 Element Plus Form 的封装组件，提供统一的表单处理能力，支持完整的表单验证、数据管理和事件处理。

## ✨ 特性

- ✅ 完整的表单验证支持
- ✅ 灵活的表单配置
- ✅ 统一的 API 接口
- ✅ TypeScript 完整支持
- ✅ 主题定制支持
- ✅ 响应式数据绑定
- ✅ 表单状态管理

## 🚀 快速开始

### 基础用法

```vue
<template>
  <BtcForm
    ref="formRef"
    :model="formData"
    :rules="formRules"
    @submit="handleSubmit"
  >
    <BtcFormItem label="用户名" prop="username">
      <el-input v-model="formData.username" />
    </BtcFormItem>
    
    <BtcFormItem label="密码" prop="password">
      <el-input v-model="formData.password" type="password" />
    </BtcFormItem>
    
    <BtcFormItem>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </BtcFormItem>
  </BtcForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BtcForm, BtcFormItem } from '@/components'
import type { BtcFormInstance } from '@/components'

const formRef = ref<BtcFormInstance>()
const formData = ref({
  username: '',
  password: ''
})

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  const isValid = await formRef.value?.validate()
  if (isValid) {
    console.log('表单验证通过', formData.value)
  }
}

const resetForm = () => {
  formRef.value?.resetFields()
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据对象 | `Record<string, any>` | `{}` |
| rules | 表单验证规则 | `FormRules` | `{}` |
| labelWidth | 标签宽度 | `string \| number` | `'120px'` |
| labelPosition | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |
| size | 表单尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| validateOnRuleChange | 是否在规则改变时验证 | `boolean` | `true` |
| hideRequiredAsterisk | 是否隐藏必填星号 | `boolean` | `false` |
| showMessage | 是否显示验证消息 | `boolean` | `true` |
| inlineMessage | 是否内联显示验证消息 | `boolean` | `false` |
| statusIcon | 是否显示状态图标 | `boolean` | `false` |
| validateTrigger | 验证触发方式 | `'blur' \| 'change' \| 'submit' \| 'manual'` | `'blur'` |
| scrollToError | 是否滚动到错误字段 | `boolean` | `false` |
| scrollIntoViewOptions | 滚动选项 | `ScrollIntoViewOptions` | - |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| validate | 字段验证事件 | `(prop: string, isValid: boolean, message: string)` |
| submit | 表单提交事件 | `(event: Event)` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| validate | 验证表单 | `(callback?: FormValidateCallback)` | `Promise<boolean>` |
| validateField | 验证指定字段 | `(props: string \| string[], callback?: FieldValidateCallback)` | `Promise<void>` |
| resetFields | 重置表单 | - | `void` |
| clearValidate | 清除验证结果 | `(props?: string \| string[])` | `void` |
| scrollToField | 滚动到指定字段 | `(prop: string)` | `void` |

## 🎨 使用示例

### 高级配置

```vue
<template>
  <BtcForm
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-width="150px"
    label-position="top"
    size="large"
    :scroll-to-error="true"
    @validate="handleValidate"
  >
    <!-- 表单项 -->
  </BtcForm>
</template>
```

### 动态验证

```vue
<template>
  <BtcForm
    ref="formRef"
    :model="formData"
    :rules="dynamicRules"
  >
    <BtcFormItem label="邮箱" prop="email">
      <el-input v-model="formData.email" @blur="validateEmail" />
    </BtcFormItem>
  </BtcForm>
</template>

<script setup lang="ts">
const validateEmail = async () => {
  await formRef.value?.validateField('email')
}
</script>
```

### 表单重置

```vue
<template>
  <BtcForm ref="formRef" :model="formData" :rules="formRules">
    <!-- 表单项 -->
    
    <BtcFormItem>
      <el-button @click="resetForm">重置表单</el-button>
      <el-button @click="clearValidation">清除验证</el-button>
    </BtcFormItem>
  </BtcForm>
</template>

<script setup lang="ts">
const resetForm = () => {
  formRef.value?.resetFields()
}

const clearValidation = () => {
  formRef.value?.clearValidate()
}
</script>
```

## 🎯 最佳实践

### 1. 表单验证

```typescript
// 推荐：使用 async/await
const submitForm = async () => {
  try {
    const isValid = await formRef.value?.validate()
    if (isValid) {
      // 处理表单提交
    }
  } catch (error) {
    // 处理验证错误
  }
}

// 或者使用回调
const submitForm = () => {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      // 处理表单提交
    }
  })
}
```

### 2. 动态规则

```typescript
const dynamicRules = computed(() => ({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: formData.value.username ? [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ] : []
}))
```

### 3. 表单状态管理

```typescript
const formState = reactive({
  loading: false,
  submitted: false,
  errors: {}
})

const submitForm = async () => {
  formState.loading = true
  try {
    const isValid = await formRef.value?.validate()
    if (isValid) {
      formState.submitted = true
      // 提交表单
    }
  } finally {
    formState.loading = false
  }
}
```

## 🔧 主题定制

```scss
// 自定义主题变量
.btc-form {
  --btc-form-label-width: 150px;
  --btc-form-label-position: top;
  --btc-form-size: large;
}

// 暗色主题
.dark .btc-form {
  // 暗色主题样式
}
```

## 📝 注意事项

1. **表单引用**：确保在模板中使用 `ref` 获取表单实例
2. **数据绑定**：使用 `v-model` 绑定表单数据
3. **验证规则**：验证规则需要与表单项的 `prop` 属性对应
4. **异步验证**：支持异步验证，但需要正确处理 Promise
5. **性能优化**：大量表单项时，考虑使用虚拟滚动

## 🔗 相关组件

- [BtcFormItem](./BtcFormItem.md) - 表单项组件
- [BtcInput](./BtcInput.md) - 输入框组件
- [BtcButton](./BtcButton.md) - 按钮组件

## 📄 更新日志

### v1.0.0 (2025-09-30)
- ✅ 初始版本发布
- ✅ 完整的表单验证支持
- ✅ TypeScript 类型定义
- ✅ 主题定制支持
