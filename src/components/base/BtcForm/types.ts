/**
 * BtcForm 组件类型定义
 */

import type { FormInstance, FormRules, FormProps } from 'element-plus';

export interface BtcFormProps extends Partial<FormProps> {
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

export interface BtcFormEmits {
  /** 字段验证事件 */
  validate: [prop: string, isValid: boolean, message: string];
  /** 表单提交事件 */
  submit: [event: Event];
}

export interface BtcFormExpose {
  /** 表单引用 */
  formRef: Readonly<Ref<FormInstance | undefined>>;
  /** 验证表单 */
  validate: (callback?: (isValid: boolean, invalidFields?: any) => void) => Promise<boolean>;
  /** 验证指定字段 */
  validateField: (props: string | string[], callback?: (errorMessage?: string) => void) => Promise<void>;
  /** 重置表单 */
  resetFields: () => void;
  /** 清除验证结果 */
  clearValidate: (props?: string | string[]) => void;
  /** 滚动到指定字段 */
  scrollToField: (prop: string) => void;
}

/**
 * BtcForm 组件实例类型
 */
export type BtcFormInstance = BtcFormExpose;

/**
 * 表单验证回调类型
 */
export type FormValidateCallback = (isValid: boolean, invalidFields?: any) => void;

/**
 * 字段验证回调类型
 */
export type FieldValidateCallback = (errorMessage?: string) => void;

/**
 * 表单配置选项
 */
export interface FormConfig {
  /** 默认标签宽度 */
  defaultLabelWidth: string | number;
  /** 默认标签位置 */
  defaultLabelPosition: 'left' | 'right' | 'top';
  /** 默认表单尺寸 */
  defaultSize: 'large' | 'default' | 'small';
  /** 是否默认禁用 */
  defaultDisabled: boolean;
  /** 默认验证触发方式 */
  defaultValidateTrigger: 'blur' | 'change' | 'submit' | 'manual';
}

/**
 * 表单状态
 */
export interface FormState {
  /** 是否正在验证 */
  validating: boolean;
  /** 是否已提交 */
  submitted: boolean;
  /** 验证错误字段 */
  invalidFields: Record<string, string[]>;
  /** 表单数据 */
  formData: Record<string, any>;
}

/**
 * 表单方法
 */
export interface FormMethods {
  /** 验证表单 */
  validate: () => Promise<boolean>;
  /** 验证指定字段 */
  validateField: (field: string | string[]) => Promise<void>;
  /** 重置表单 */
  reset: () => void;
  /** 清除验证 */
  clearValidation: () => void;
  /** 获取表单数据 */
  getFormData: () => Record<string, any>;
  /** 设置表单数据 */
  setFormData: (data: Record<string, any>) => void;
  /** 提交表单 */
  submit: () => Promise<boolean>;
}
