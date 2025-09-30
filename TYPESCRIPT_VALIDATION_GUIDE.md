# TypeScript 类型检查与 Zod 验证快速指南

## 🚀 快速开始

### 安装依赖
```bash
pnpm install
```

### 运行类型检查
```bash
# 宽松模式（推荐开发时使用）
pnpm type-check:loose

# 严格模式（推荐提交前使用）
pnpm type-check

# 验证模式（检查 Zod 功能）
pnpm type-check:validation

# 监听模式（实时检查）
pnpm type-check:watch
```

## 📋 检查模式对比

| 模式 | 命令 | 用途 | 严格程度 |
|------|------|------|----------|
| 宽松模式 | `pnpm type-check:loose` | 开发时快速检查 | ⭐⭐ |
| 严格模式 | `pnpm type-check` | 提交前全面检查 | ⭐⭐⭐⭐⭐ |
| 验证模式 | `pnpm type-check:validation` | Zod 功能验证 | ⭐⭐⭐ |
| 监听模式 | `pnpm type-check:watch` | 实时检查 | ⭐⭐⭐ |

## 🔧 Zod 验证使用

### 基本用法
```typescript
import { Validator } from '/@/btc/utils';

// 验证用户数据
const userResult = Validator.validateUser({
  id: 1,
  username: 'testuser',
  email: 'test@example.com'
});

if (userResult.success) {
  console.log('用户数据有效:', userResult.data);
} else {
  console.log('验证失败:', userResult.errors?.format());
}
```

### 自定义验证
```typescript
import { z, safeParse } from 'zod';

const customSchema = z.object({
  name: z.string().min(1, '名称不能为空'),
  age: z.number().min(0, '年龄不能为负数')
});

const result = safeParse(customSchema, data);
```

## 📁 核心文件

- `src/btc/utils/validation.ts` - 验证工具和预定义模式
- `src/btc/config/validation.ts` - 验证配置
- `src/btc/middleware/validation.ts` - 验证中间件
- `src/btc/examples/validation-example.ts` - 使用示例

## 🛠️ 配置文件

- `tsconfig.json` - 基础 TypeScript 配置
- `tsconfig.strict.json` - 严格模式配置
- `tsconfig.loose.json` - 宽松模式配置

## 📊 生成报告

```bash
# 生成类型检查报告
pnpm type-check:report
```

报告文件：
- `type-check-report.json` - 类型检查报告
- `zod-validation-report.json` - Zod 验证报告

## 🐛 常见问题

### 1. 虚拟模块错误
```
Cannot find module 'virtual:eps'
```
**解决**：确保 vite-plugin 包已正确构建

### 2. Zod 验证失败
```
Validation failed: [错误信息]
```
**解决**：检查数据格式是否符合模式定义

### 3. 类型检查超时
**解决**：使用宽松模式或排除大文件

## 📚 详细文档

更多详细信息请参考：
- [完整文档](./docs/development/typescript-validation.md)
- [架构设计](./docs/architecture/design-principles.md)
- [开发指南](./docs/development/workflow.md)

## 🎯 最佳实践

1. **开发时**：使用 `pnpm type-check:loose`
2. **提交前**：使用 `pnpm type-check`
3. **部署前**：使用 `pnpm type-check:validation`
4. **持续开发**：使用 `pnpm type-check:watch`

## 🔄 工作流程

```mermaid
graph LR
    A[开发] --> B[宽松检查]
    B --> C[提交前]
    C --> D[严格检查]
    D --> E[验证检查]
    E --> F[部署]
```

## 📞 支持

如有问题，请查看：
1. 错误日志
2. 生成的报告文件
3. 详细文档
4. 示例代码
