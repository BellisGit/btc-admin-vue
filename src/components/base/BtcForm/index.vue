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

/**
 * BtcForm 表单组件
 * 基于 Element Plus Form 的封装，提供统一的表单处理能力
 * 
 * @param model 表单数据对象
 * @param rules 表单验证规则
 * @param labelWidth 标签宽度
 * @param labelPosition 标签位置
 * @param size 表单尺寸
 * @param disabled 是否禁用
 * @param validateOnRuleChange 是否在规则改变时验证
 * @param hideRequiredAsterisk 是否隐藏必填星号
 * @param showMessage 是否显示验证消息
 * @param inlineMessage 是否内联显示验证消息
 * @param statusIcon 是否显示状态图标
 * @param validateTrigger 验证触发方式
 * @param scrollToError 是否滚动到错误字段
 * @param scrollIntoViewOptions 滚动选项
 */
defineOptions({
  name: 'BtcForm',
  inheritAttrs: false
});

// Props 定义
interface Props extends Partial<FormProps> {
  /** 表单数据对象 */
  model?: Record<string, any>;
  /** 表单验证规则 */
  rules?: FormRules;
  /** 标签宽度 */
  labelWidth?: string | number;
  /** 标签位置 */
  labelPosition?: 'left' | 'right' | 'top';
  /** 表单尺寸 */
  size?: 'large' | 'default' | 'small';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否在规则改变时验证 */
  validateOnRuleChange?: boolean;
  /** 是否隐藏必填星号 */
  hideRequiredAsterisk?: boolean;
  /** 是否显示验证消息 */
  showMessage?: boolean;
  /** 是否内联显示验证消息 */
  inlineMessage?: boolean;
  /** 是否显示状态图标 */
  statusIcon?: boolean;
  /** 验证触发方式 */
  validateTrigger?: 'blur' | 'change' | 'submit' | 'manual';
  /** 是否滚动到错误字段 */
  scrollToError?: boolean;
  /** 滚动选项 */
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
  /** 字段验证事件 */
  validate: [prop: string, isValid: boolean, message: string];
  /** 表单提交事件 */
  submit: [event: Event];
}

const emit = defineEmits<Emits>();

// 表单引用
const formRef = ref<FormInstance>();

// 计算属性：直接使用原始 model，不做任何数据清理
// Element Plus 会自己管理表单数据和验证状态
const model = computed(() => {
  return props.model || {};
});

/**
 * 表单验证方法
 * @param callback 验证完成回调
 * @returns 验证结果
 */
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

/**
 * 验证指定字段
 * @param props 字段名或字段名数组
 * @param callback 验证完成回调
 */
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

/**
 * 重置表单
 */
const resetFields = () => {
  if (!formRef.value) {
    console.warn('Form ref is not available');
    return;
  }
  
  formRef.value.resetFields();
};

/**
 * 清除验证结果
 * @param props 字段名或字段名数组
 */
const clearValidate = (props?: string | string[]) => {
  if (!formRef.value) {
    console.warn('Form ref is not available');
    return;
  }
  
  formRef.value.clearValidate(props);
};

/**
 * 滚动到指定字段
 * @param prop 字段名
 */
const scrollToField = (prop: string) => {
  if (!formRef.value) {
    console.warn('Form ref is not available');
    return;
  }
  
  formRef.value.scrollToField(prop);
};

/**
 * 处理表单验证事件
 * @param prop 字段名
 * @param isValid 是否有效
 * @param message 验证消息
 */
const handleValidate = (prop: string, isValid: boolean, message: string) => {
  emit('validate', prop, isValid, message);
};

/**
 * 处理表单提交事件
 * @param event 提交事件
 */
const handleSubmit = (event: Event) => {
  emit('submit', event);
};

// 监听 model 变化，确保数据同步
watch(
  () => props.model,
  (newModel) => {
    if (newModel && typeof newModel === 'object') {
      // model 变化时，可以在这里添加额外的逻辑
      nextTick(() => {
        // 确保表单状态正确
      });
    }
  },
  { deep: true, immediate: true }
);

// 暴露方法给父组件
defineExpose({
  /** 表单引用 */
  formRef: readonly(formRef),
  /** 验证表单 */
  validate,
  /** 验证指定字段 */
  validateField,
  /** 重置表单 */
  resetFields,
  /** 清除验证结果 */
  clearValidate,
  /** 滚动到指定字段 */
  scrollToField
});
</script>

<style scoped>
.btc-form {
  width: 100%;
}

/* 主题支持 */
.btc-form {
  --btc-form-label-width: v-bind('typeof props.labelWidth === "string" ? props.labelWidth : `${props.labelWidth}px`');
  --btc-form-label-position: v-bind('props.labelPosition');
  --btc-form-size: v-bind('props.size');
}

/* 暗色主题支持 */
.dark .btc-form {
  /* 暗色主题样式 */
}
</style>
