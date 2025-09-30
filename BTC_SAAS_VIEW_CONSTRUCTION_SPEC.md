# BTC-SaaS 新视图构建规范

> **核心理念**：不是一直拆，而是从第一天就把"可长肉的位置"钉死，让后续新增大多是"挂件式接入"

## 📚 文档导航

本文档已拆分为多个专门的文档，请根据需求查看相应章节：

### 🏗️ 架构设计
- [目录结构规范](./docs/architecture/directory-structure.md) - 基于现有架构的能力驱动结构
- [核心设计原则](./docs/architecture/design-principles.md) - 开放-封闭原则和能力注册机制
- [扩展点设计](./docs/architecture/extension-points.md) - 模块、插件、包系统的扩展

### 🛠️ 开发指南
- [能力包开发规范](./docs/development/capability-development.md) - 普通能力包的完整开发规范
- [晋升机制](./docs/development/promotion-mechanism.md) - 能力包晋升路径和自动化
- [开发工作流](./docs/development/workflow.md) - 标准开发流程和质量检查

### 📖 API 参考
- [能力包 API](./docs/api/capability-api.md) - 能力包相关的 API 接口

### 🎯 示例教程
- [用户认证能力包](./docs/examples/auth-capability.md) - 完整的认证能力包实现

## 🚀 快速开始

1. **了解架构**：先阅读 [目录结构规范](./docs/architecture/directory-structure.md)
2. **学习开发**：查看 [能力包开发规范](./docs/development/capability-development.md)
3. **实践示例**：参考 [用户认证能力包](./docs/examples/auth-capability.md)

## 📋 开发检查清单

### 新增能力包前
- [ ] 阅读 [能力包开发规范](./docs/development/capability-development.md)
- [ ] 确认功能范围和挂载点
- [ ] 设计权限和事件

### 开发过程中
- [ ] 遵循标准目录结构
- [ ] 实现完整的类型定义
- [ ] 编写测试和文档

### 开发完成后
- [ ] 运行质量检查清单
- [ ] 更新模块配置
- [ ] 验证挂载点工作正常

## 🎯 核心价值

这套基于现有架构的规范核心价值：

### 1. **充分利用现有架构**
- **模块系统**：在现有 `modules/*` 基础上扩展 `caps/*` 能力包
- **插件系统**：能力包可晋升为 `plugins/*` 插件
- **包系统**：成熟能力包可晋升为 `packages/*` 独立包
- **Bootstrap 系统**：集成到现有的模块加载机制
- **CRUD 包**：能力包可直接使用现有的 CRUD 组件

### 2. **渐进式演进路径**
- **阶段 A**：`modules/*/caps/*` 能力包（快速原型）
- **阶段 B**：`plugins/*` 插件（跨模块使用）
- **阶段 C**：`packages/*` 独立包（通用功能）
- **阶段 D**：独立微应用（大型功能）

### 3. **事件驱动架构**
- 基于现有的 `Mitt` 事件系统
- 通过命令总线解耦组件
- 支持能力包的独立演进

### 4. **工具化支持**
- 集成现有的 `pnpm`、`vite`、`typescript` 工具链
- 基于现有的 `.cursorrules` 扩展自动化规则
- 利用现有的构建和部署流程

### 5. **关键成功因素**
- **严格执行**：基于现有目录结构的依赖管理规则
- **能力注册**：通过 `modules/*/config.ts` 统一管理
- **自动化检查**：集成到现有的 `pnpm` 脚本
- **及时晋升**：基于阈值的自动晋升机制

### 6. **实际应用价值**
- **降低重构成本**：大多数新功能只需要"挂件式接入"
- **提高开发效率**：标准化的能力包开发流程
- **保证代码质量**：基于现有工具链的质量检查
- **支持团队协作**：清晰的模块边界和依赖关系

## 🔗 相关链接

- [文档中心](./docs/README.md)
- [现有架构文档](./COOL_ADMIN_ARCHITECTURE_DESIGN.md)
- [目录结构文档](./BTC_SAAS_DIRECTORY_STRUCTURE.md)

## 📝 文档贡献

如需更新文档，请遵循以下原则：
1. 保持文档结构的一致性
2. 提供完整的代码示例
3. 包含必要的类型定义
4. 添加相应的测试用例

---

这样，我们既保持了现有架构的稳定性，又为未来的功能扩展提供了"可生长的边界"，真正实现了**不是一直拆，而是从第一天就把"可长肉的位置"钉死**的设计理念。
