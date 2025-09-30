<template>
  <el-form
    ref="formRef"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :size="size"
    :disabled="disabled"
    :validate-on-rule-change="validateOnRuleChange"
    :hide-required-asterisk="hideRequiredAsterisk"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :validate-trigger="validateTrigger"
    :scroll-to-error="scrollToError"
    :scroll-into-view-options="scrollIntoViewOptions"
    @validate="handleValidate"
    @submit.prevent="handleSubmit"
  >
    <slot />
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, readonly, type Ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import type { FormInstance, FormRules, FormProps } from 'element-plus';

defineOptions({
  name: 'BtcForm',
  inheritAttrs: false
});

// Props 定义
interface Props extends Partial<FormProps> {
  model?: Record<string, any>;
  rules?: FormRules;
  labelWidth?: string | number;
  labelPosition?: 'left' | 'right' | 'top';
  size?: 'large' | 'default' | 'small';
  disabled?: boolean;
  validateOnRuleChange?: boolean;
  hideRequiredAsterisk?: boolean;
  showMessage?: boolean;
  inlineMessage?: boolean;
  statusIcon?: boolean;
  validateTrigger?: 'blur' | 'change' | 'submit' | 'manual';
  scrollToError?: boolean;
  scrollIntoViewOptions?: ScrollIntoViewOptions;
}

const props = withDefaults(defineProps<Props>(), {
  model: () => ({}),
  rules: () => ({}),
  labelWidth: '120px',
  labelPosition: 'right',
  size: 'default',
  disabled: false,
  validateOnRuleChange: true,
  hideRequiredAsterisk: false,
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateTrigger: 'blur',
  scrollToError: false
});

// Emits 定义
interface Emits {
  validate: [prop: string, isValid: boolean, message: string];
  submit: [event: Event];
}

const emit = defineEmits<Emits>();

// 表单引用
const formRef = ref<FormInstance>();

// 数据清理函数：确保字段值是字符串类�?
const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized = { ...data };
  Object.keys(sanitized).forEach(key => {
    const value = sanitized[key];
    if (Array.isArray(value)) {
      // 如果是数组，检查是否是验证错误信息数组
      if (value.length > 0 && typeof value[0] === 'object' && value[0].message) {
        // 这是验证错误信息数组，保持原样不转换
        sanitized[key] = value;
      } else {
        // 普通数组，取第一个元素并转换为字符串
        sanitized[key] = value.length > 0 ? String(value[0]) : '';
      }
    } else if (value !== null && value !== undefined) {
      // 确保是字符串类型
      sanitized[key] = String(value);
    } else {
      // null 或 undefined 转换为空字符串
      sanitized[key] = '';
    }
  });
  return sanitized;
};

// 计算属性：直接使用原始 model，不做任何数据清理
// Element Plus 会自己管理表单数据和验证状态
const model = computed(() => {
  return props.model || {};
});

// 表单验证方法
const validate = async (callback?: (isValid: boolean, invalidFields?: any) => void) => {
  if (!formRef.value) {
    return false;
  }
  
  try {
    const isValid = await formRef.value.validate();
    if (callback) {
      callback(isValid);
    }
    return isValid;
  } catch (error) {
    // 验证失败时，不输出错误日志
    // Element Plus 会自动在表单中显示错误信息
    if (callback) {
      callback(false, error);
    }
    return false;
  }
};

// 验证指定字段
const validateField = async (props: string | string[], callback?: (errorMessage?: string) => void) => {
  if (!formRef.value) {
    console.warn('Form ref is not available');
    return;
  }
  
  try {
    await formRef.value.validateField(props);
    if (callback) {
      callback();
    }
  } catch (error) {
    if (callback) {
      callback(error as string);
    }
  }
};

// 重置表单
const resetFields = () => {
  if (!formRef.value) {
    console.warn('Form ref is not available');
    return;
  }
  
  formRef.value.resetFields();
};

// 清除验证结果
const clearValidate = (props?: string | string[]) => {
  if (!formRef.value) {
    console.warn('Form ref is not available');
    return;
  }
  
  formRef.value.clearValidate(props);
};

// 滚动到指定字�?
const scrollToField = (prop: string) => {
  if (!formRef.value) {
    console.warn('Form ref is not available');
    return;
  }
  
  formRef.value.scrollToField(prop);
};

// 处理表单验证事件
const handleValidate = (prop: string, isValid: boolean, message: string) => {
  emit('validate', prop, isValid, message);
};

// 处理表单提交事件
const handleSubmit = (event: Event) => {
  emit('submit', event);
};

// 监听 model 变化，确保数据同�?
watch(
  () => props.model,
  (newModel) => {
    if (newModel && typeof newModel === 'object') {
      // �?model 变化时，可以在这里添加额外的逻辑
      nextTick(() => {
        // 确保表单状态正�?
      });
    }
  },
  { deep: true, immediate: true }
);

// 暴露方法给父组件
defineExpose({
  formRef: readonly(formRef),
  validate,
  validateField,
  resetFields,
  clearValidate,
  scrollToField
});
</script>

<style scoped>
.el-form {
  width: 100%;
}
</style>
