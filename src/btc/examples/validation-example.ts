import { z } from 'zod';
import { safeParse, Validator, UserSchema, LoginRequestSchema } from '../utils/validation';

/**
 * Zod 验证示例
 * 展示如何在项目中使用 Zod 进行类型验证
 */

// 示例 1: 基本验证
export function basicValidationExample() {
  console.log('=== 基本验证示例 ===');
  
  // 定义用户模式
  const userSchema = z.object({
    id: z.number(),
    name: z.string().min(1, '姓名不能为空'),
    email: z.string().email('邮箱格式不正确'),
    age: z.number().min(0, '年龄不能为负数').max(150, '年龄不能超过150岁')
  });
  
  // 有效数据
  const validUser = {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    age: 25
  };
  
  // 无效数据
  const invalidUser = {
    id: '1', // 应该是数字
    name: '', // 不能为空
    email: 'invalid-email', // 邮箱格式错误
    age: -5 // 年龄不能为负数
  };
  
  // 验证有效数据
  const validResult = safeParse(userSchema, validUser);
  console.log('有效数据验证结果:', validResult);
  
  // 验证无效数据
  const invalidResult = safeParse(userSchema, invalidUser);
  console.log('无效数据验证结果:', invalidResult);
  
  if (!invalidResult.success) {
    console.log('错误详情:', invalidResult.errors?.format());
  }
}

// 示例 2: 使用预定义验证器
export function predefinedValidatorExample() {
  console.log('\n=== 预定义验证器示例 ===');
  
  // 验证用户数据
  const userData = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    phone: '13800138000',
    avatar: 'https://example.com/avatar.jpg',
    roles: ['user', 'admin'],
    permissions: ['read', 'write']
  };
  
  const result = Validator.validateUser(userData);
  console.log('用户验证结果:', result);
  
  // 验证登录请求
  const loginData = {
    username: 'testuser',
    password: '123456',
    remember: true
  };
  
  const loginResult = Validator.validateLogin(loginData);
  console.log('登录验证结果:', loginResult);
}

// 示例 3: 异步验证
export async function asyncValidationExample() {
  console.log('\n=== 异步验证示例 ===');
  
  // 异步验证模式（例如需要查询数据库验证用户名是否已存在）
  const asyncUserSchema = z.object({
    username: z.string().min(3, '用户名至少3个字符'),
    email: z.string().email('邮箱格式不正确')
  }).refine(async (data) => {
    // 模拟异步验证用户名是否已存在
    await new Promise(resolve => setTimeout(resolve, 100));
    return data.username !== 'admin'; // 假设 admin 用户名已被占用
  }, {
    message: '用户名已被占用',
    path: ['username']
  });
  
  const userData = {
    username: 'admin', // 这个用户名会被拒绝
    email: 'admin@example.com'
  };
  
  try {
    const result = await asyncUserSchema.parseAsync(userData);
    console.log('异步验证成功:', result);
  } catch (error) {
    console.log('异步验证失败:', error.message);
  }
}

// 示例 4: 复杂嵌套验证
export function complexValidationExample() {
  console.log('\n=== 复杂嵌套验证示例 ===');
  
  // 定义嵌套的验证模式
  const addressSchema = z.object({
    street: z.string().min(1, '街道不能为空'),
    city: z.string().min(1, '城市不能为空'),
    zipCode: z.string().regex(/^\d{6}$/, '邮编必须是6位数字')
  });
  
  const companySchema = z.object({
    name: z.string().min(1, '公司名称不能为空'),
    address: addressSchema,
    employees: z.array(z.object({
      name: z.string().min(1, '员工姓名不能为空'),
      position: z.string().min(1, '职位不能为空'),
      salary: z.number().min(0, '薪资不能为负数')
    })).min(1, '至少需要一个员工')
  });
  
  const companyData = {
    name: '示例公司',
    address: {
      street: '示例街道123号',
      city: '北京',
      zipCode: '100000'
    },
    employees: [
      {
        name: '张三',
        position: '前端工程师',
        salary: 15000
      },
      {
        name: '李四',
        position: '后端工程师',
        salary: 18000
      }
    ]
  };
  
  const result = safeParse(companySchema, companyData);
  console.log('复杂验证结果:', result);
}

// 示例 5: 条件验证
export function conditionalValidationExample() {
  console.log('\n=== 条件验证示例 ===');
  
  // 根据用户类型进行不同的验证
  const userSchema = z.discriminatedUnion('type', [
    z.object({
      type: z.literal('individual'),
      name: z.string().min(1, '个人姓名不能为空'),
      idCard: z.string().regex(/^\d{18}$/, '身份证号必须是18位数字')
    }),
    z.object({
      type: z.literal('company'),
      companyName: z.string().min(1, '公司名称不能为空'),
      businessLicense: z.string().min(1, '营业执照号不能为空'),
      contactPerson: z.string().min(1, '联系人不能为空')
    })
  ]);
  
  // 个人用户数据
  const individualUser = {
    type: 'individual',
    name: '张三',
    idCard: '110101199001011234'
  };
  
  // 企业用户数据
  const companyUser = {
    type: 'company',
    companyName: '示例科技有限公司',
    businessLicense: '91110000123456789X',
    contactPerson: '李四'
  };
  
  const individualResult = safeParse(userSchema, individualUser);
  console.log('个人用户验证结果:', individualResult);
  
  const companyResult = safeParse(userSchema, companyUser);
  console.log('企业用户验证结果:', companyResult);
}

// 示例 6: 自定义错误消息
export function customErrorMessageExample() {
  console.log('\n=== 自定义错误消息示例 ===');
  
  const schema = z.object({
    username: z.string({
      message: '用户名必须是字符串'
    }).min(3, {
      message: '用户名至少需要3个字符'
    }).max(20, {
      message: '用户名不能超过20个字符'
    }),
    password: z.string({
      message: '密码是必填项'
    }).min(8, {
      message: '密码至少需要8个字符'
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: '密码必须包含大小写字母和数字'
    })
  });
  
  const userData = {
    username: 'ab', // 太短
    password: '123' // 太简单
  };
  
  const result = safeParse(schema, userData);
  if (!result.success) {
    console.log('自定义错误消息:', result.errors?.format());
  }
}

// 运行所有示例
export function runAllExamples() {
  console.log('🚀 开始运行 Zod 验证示例\n');
  
  basicValidationExample();
  predefinedValidatorExample();
  asyncValidationExample();
  complexValidationExample();
  conditionalValidationExample();
  customErrorMessageExample();
  
  console.log('\n✅ 所有示例运行完成');
}

// 如果直接运行此文件，执行所有示例
if (require.main === module) {
  runAllExamples();
}
