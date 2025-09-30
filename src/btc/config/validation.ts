import { z } from 'zod';

/**
 * 验证配置
 */
export const validationConfig = {
  // 是否启用严格模式
  strict: true,
  
  // 是否在开发环境显示详细错误
  verbose: process.env['NODE_ENV'] === 'development',
  
  // 是否自动转换类型
  coerce: true,
  
  // 错误消息配置
  messages: {
    required: '此字段为必填项',
    invalid: '输入格式不正确',
    minLength: '长度不能少于 {min} 个字符',
    maxLength: '长度不能超过 {max} 个字符',
    email: '请输入有效的邮箱地址',
    url: '请输入有效的网址',
    number: '请输入有效的数字',
    integer: '请输入整数',
    positive: '请输入正数',
    negative: '请输入负数',
    min: '值不能小于 {min}',
    max: '值不能大于 {max}',
    date: '请输入有效的日期',
    time: '请输入有效的时间'
  }
};

/**
 * 创建带自定义错误消息的验证模式
 */
export function createSchemaWithMessages<T extends z.ZodTypeAny>(
  schema: T,
  customMessages?: Partial<typeof validationConfig.messages>
) {
  const messages = { ...validationConfig.messages, ...customMessages };
  
  // 这里可以根据需要扩展自定义消息逻辑
  return schema;
}

/**
 * 验证中间件配置
 */
export const validationMiddleware = {
  // 是否在请求前验证
  validateRequest: true,
  
  // 是否在响应后验证
  validateResponse: true,
  
  // 是否验证 API 端点
  validateEndpoints: true,
  
  // 是否验证路由参数
  validateRouteParams: true,
  
  // 是否验证查询参数
  validateQueryParams: true
};

/**
 * 开发环境验证配置
 */
export const devValidationConfig = {
  ...validationConfig,
  verbose: true,
  strict: false, // 开发环境可以稍微宽松一些
  logErrors: true,
  logWarnings: true
};

/**
 * 生产环境验证配置
 */
export const prodValidationConfig = {
  ...validationConfig,
  verbose: false,
  strict: true,
  logErrors: false,
  logWarnings: false
};

/**
 * 获取当前环境的验证配置
 */
export function getValidationConfig() {
  return process.env['NODE_ENV'] === 'production' 
    ? prodValidationConfig 
    : devValidationConfig;
}
