import { z } from 'zod';

/**
 * 验证结果类型
 */
export interface ValidationResult<T = any> {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
}

/**
 * 安全解析函数，返回验证结果而不是抛出异常
 */
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data
    };
  } else {
    return {
      success: false,
      errors: result.error
    };
  }
}

/**
 * 解析并验证数据，失败时抛出异常
 */
export function parse<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * 异步解析并验证数据
 */
export async function parseAsync<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<T> {
  return await schema.parseAsync(data);
}

/**
 * 创建响应数据验证模式
 */
export const ResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    code: z.number(),
    message: z.string(),
    data: dataSchema.optional(),
    timestamp: z.number().optional()
  });

/**
 * 分页数据验证模式
 */
export const PaginationSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    list: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    size: z.number()
  });

/**
 * 用户信息验证模式
 */
export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  roles: z.array(z.string()).optional(),
  permissions: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  updateTime: z.string().optional()
});

/**
 * 登录请求验证模式
 */
export const LoginRequestSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(6, '密码至少6位'),
  captcha: z.string().optional(),
  remember: z.boolean().optional()
});

/**
 * 菜单项验证模式
 */
export const MenuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  path: z.string(),
  icon: z.string().optional(),
  component: z.string().optional(),
  parentId: z.number().optional(),
  sort: z.number().optional(),
  visible: z.boolean().optional(),
  children: z.array(z.lazy(() => MenuItemSchema)).optional()
});

/**
 * API 端点验证模式
 */
export const ApiEndpointSchema = z.object({
  name: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  path: z.string(),
  description: z.string().optional()
});

/**
 * 服务验证模式
 */
export const ServiceSchema = z.object({
  prefix: z.string(),
  name: z.string(),
  namespace: z.string().optional(),
  api: z.array(ApiEndpointSchema),
  columns: z.array(z.any()).optional(),
  search: z.object({
    fieldEq: z.array(z.any()).optional(),
    fieldLike: z.array(z.any()).optional(),
    keyWordLikeFields: z.array(z.any()).optional()
  }).optional()
});

/**
 * 表单字段验证模式
 */
export const FormFieldSchema = z.object({
  prop: z.string(),
  label: z.string(),
  type: z.string(),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
  options: z.array(z.any()).optional(),
  rules: z.array(z.any()).optional()
});

/**
 * 表格列验证模式
 */
export const TableColumnSchema = z.object({
  prop: z.string(),
  label: z.string(),
  width: z.number().optional(),
  minWidth: z.number().optional(),
  sortable: z.boolean().optional(),
  formatter: z.function().optional(),
  render: z.function().optional()
});

/**
 * 搜索条件验证模式
 */
export const SearchConditionSchema = z.object({
  field: z.string(),
  operator: z.enum(['eq', 'like', 'in', 'between', 'gt', 'lt', 'gte', 'lte']),
  value: z.any()
});

/**
 * 通用 CRUD 操作验证模式
 */
export const CrudOperationSchema = z.object({
  action: z.enum(['create', 'read', 'update', 'delete', 'list']),
  data: z.any().optional(),
  id: z.number().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  search: z.array(SearchConditionSchema).optional()
});

/**
 * 验证工具类
 */
export class Validator {
  /**
   * 验证用户输入
   */
  static validateUser(data: unknown) {
    return safeParse(UserSchema, data);
  }

  /**
   * 验证登录请求
   */
  static validateLogin(data: unknown) {
    return safeParse(LoginRequestSchema, data);
  }

  /**
   * 验证菜单项
   */
  static validateMenuItem(data: unknown) {
    return safeParse(MenuItemSchema, data);
  }

  /**
   * 验证服务
   */
  static validateService(data: unknown) {
    return safeParse(ServiceSchema, data);
  }

  /**
   * 验证 API 响应
   */
  static validateResponse<T>(dataSchema: z.ZodTypeAny, data: unknown) {
    return safeParse(ResponseSchema(dataSchema), data);
  }

  /**
   * 验证分页数据
   */
  static validatePagination<T>(itemSchema: z.ZodTypeAny, data: unknown) {
    return safeParse(PaginationSchema(itemSchema), data);
  }

  /**
   * 验证 CRUD 操作
   */
  static validateCrudOperation(data: unknown) {
    return safeParse(CrudOperationSchema, data);
  }
}

/**
 * 类型推断辅助函数
 */
export type InferType<T extends z.ZodTypeAny> = z.infer<T>;

// 导出常用类型
export type User = InferType<typeof UserSchema>;
export type LoginRequest = InferType<typeof LoginRequestSchema>;
export type MenuItem = InferType<typeof MenuItemSchema>;
export type Service = InferType<typeof ServiceSchema>;
export type FormField = InferType<typeof FormFieldSchema>;
export type TableColumn = InferType<typeof TableColumnSchema>;
export type SearchCondition = InferType<typeof SearchConditionSchema>;
export type CrudOperation = InferType<typeof CrudOperationSchema>;
