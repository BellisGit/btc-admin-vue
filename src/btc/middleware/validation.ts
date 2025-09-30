import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { z } from 'zod';
import { safeParse, ValidationResult } from '../utils/validation';
import { getValidationConfig } from '../config/validation';

/**
 * 验证中间件类型
 */
export interface ValidationMiddleware {
  request?: (config: AxiosRequestConfig) => ValidationResult | Promise<ValidationResult>;
  response?: (response: AxiosResponse) => ValidationResult | Promise<ValidationResult>;
  error?: (error: any) => void;
}

/**
 * 创建请求验证中间件
 */
export function createRequestValidationMiddleware(
  schema?: z.ZodSchema<any>
): ValidationMiddleware['request'] {
  if (!schema) return undefined;
  
  return (config: AxiosRequestConfig) => {
    const validationConfig = getValidationConfig();
    
    try {
      // 验证请求数据
      const data = config.data;
      if (data) {
        const result = safeParse(schema, data);
        
        if (!result.success && validationConfig.verbose) {
          console.warn('Request validation failed:', result.errors?.format());
        }
        
        return result;
      }
      
      return { success: true };
    } catch (error) {
      if (validationConfig.verbose) {
        console.error('Request validation error:', error);
      }
      return { success: false, errors: error as z.ZodError };
    }
  };
}

/**
 * 创建响应验证中间件
 */
export function createResponseValidationMiddleware(
  schema?: z.ZodSchema<any>
): ValidationMiddleware['response'] {
  if (!schema) return undefined;
  
  return (response: AxiosResponse) => {
    const validationConfig = getValidationConfig();
    
    try {
      // 验证响应数据
      const data = response.data;
      const result = safeParse(schema, data);
      
      if (!result.success && validationConfig.verbose) {
        console.warn('Response validation failed:', result.errors?.format());
      }
      
      return result;
    } catch (error) {
      if (validationConfig.verbose) {
        console.error('Response validation error:', error);
      }
      return { success: false, errors: error as z.ZodError };
    }
  };
}

/**
 * 创建错误处理中间件
 */
export function createErrorValidationMiddleware(): ValidationMiddleware['error'] {
  const validationConfig = getValidationConfig();
  
  return (error: any) => {
    if (validationConfig.verbose) {
      console.error('Validation middleware error:', error);
    }
    
    // 可以在这里添加错误上报逻辑
    if (validationConfig.logErrors) {
      // 发送错误到监控系统
      console.error('Validation error logged:', error);
    }
  };
}

/**
 * 创建完整的验证中间件
 */
export function createValidationMiddleware(
  requestSchema?: z.ZodSchema<any>,
  responseSchema?: z.ZodSchema<any>
): ValidationMiddleware {
  return {
    request: createRequestValidationMiddleware(requestSchema),
    response: createResponseValidationMiddleware(responseSchema),
    error: createErrorValidationMiddleware()
  };
}

/**
 * 验证装饰器 - 用于类方法
 */
export function validate(schema: z.ZodSchema<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const validationConfig = getValidationConfig();
      
      try {
        // 验证参数
        const result = safeParse(schema, args[0]);
        
        if (!result.success) {
          if (validationConfig.verbose) {
            console.warn(`Validation failed for ${propertyKey}:`, result.errors?.format());
          }
          
          if (validationConfig.strict) {
            throw new Error(`Validation failed: ${result.errors?.message}`);
          }
        }
        
        // 如果验证通过，使用验证后的数据
        if (result.success && result.data) {
          args[0] = result.data;
        }
        
        return originalMethod.apply(this, args);
      } catch (error) {
        if (validationConfig.verbose) {
          console.error(`Validation error in ${propertyKey}:`, error);
        }
        throw error;
      }
    };
    
    return descriptor;
  };
}

/**
 * 异步验证装饰器
 */
export function validateAsync(schema: z.ZodSchema<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const validationConfig = getValidationConfig();
      
      try {
        // 异步验证参数
        const validatedData = await schema.parseAsync(args[0]);
        args[0] = validatedData;
        
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (validationConfig.verbose) {
          console.error(`Async validation error in ${propertyKey}:`, error);
        }
        throw error;
      }
    };
    
    return descriptor;
  };
}

/**
 * 验证工具类
 */
export class ValidationMiddlewareManager {
  private middlewares: ValidationMiddleware[] = [];
  
  /**
   * 添加验证中间件
   */
  add(middleware: ValidationMiddleware) {
    this.middlewares.push(middleware);
  }
  
  /**
   * 移除验证中间件
   */
  remove(middleware: ValidationMiddleware) {
    const index = this.middlewares.indexOf(middleware);
    if (index > -1) {
      this.middlewares.splice(index, 1);
    }
  }
  
  /**
   * 清空所有中间件
   */
  clear() {
    this.middlewares = [];
  }
  
  /**
   * 执行请求验证
   */
  async validateRequest(config: AxiosRequestConfig): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    for (const middleware of this.middlewares) {
      if (middleware.request) {
        try {
          const result = await middleware.request(config);
          results.push(result);
        } catch (error) {
          if (middleware.error) {
            middleware.error(error);
          }
          results.push({ success: false, errors: error as z.ZodError });
        }
      }
    }
    
    return results;
  }
  
  /**
   * 执行响应验证
   */
  async validateResponse(response: AxiosResponse): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    for (const middleware of this.middlewares) {
      if (middleware.response) {
        try {
          const result = await middleware.response(response);
          results.push(result);
        } catch (error) {
          if (middleware.error) {
            middleware.error(error);
          }
          results.push({ success: false, errors: error as z.ZodError });
        }
      }
    }
    
    return results;
  }
}

// 导出全局验证中间件管理器实例
export const validationMiddlewareManager = new ValidationMiddlewareManager();
