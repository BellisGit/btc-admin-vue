/**
 * 组件注册表 - 管理所有组件的元数据
 */

export interface ComponentMetadata {
  /** 组件名称 */
  name: string
  /** 组件类型 */
  type: 'base' | 'composite' | 'business'
  /** 组件作用域 */
  scope: 'project' | 'module' | 'page'
  /** 组件状态 */
  status: 'migrated' | 'pending' | 'deprecated' | 'stable'
  /** 组件描述 */
  description: string
  /** 组件版本 */
  version?: string
  /** 组件标签 */
  tags: string[]
  /** 维护者 */
  maintainer: string
  /** 最后更新时间 */
  lastUpdated: string
  /** 使用次数 */
  usageCount: number
  /** 使用的模块 */
  usedInModules: string[]
  /** 依赖的组件 */
  dependencies: string[]
  /** 被依赖的组件 */
  dependents: string[]
  /** 文档路径 */
  documentation?: string
  /** 组件路径 */
  path: string
  /** 组件大小 (KB) */
  size?: number
  /** 复杂度评分 (1-10) */
  complexity?: number
  /** 复用性评分 (1-10) */
  reusability?: number
  /** 维护成本评分 (1-10) */
  maintenanceCost?: number
}

export interface ComponentStats {
  /** 总组件数 */
  total: number
  /** 按类型统计 */
  byType: Record<string, number>
  /** 按作用域统计 */
  byScope: Record<string, number>
  /** 按状态统计 */
  byStatus: Record<string, number>
  /** 按维护者统计 */
  byMaintainer: Record<string, number>
  /** 使用频率统计 */
  usageFrequency: Array<{
    name: string
    count: number
  }>
  /** 依赖关系统计 */
  dependencyStats: {
    mostDependent: string[]
    mostDependencies: string[]
  }
}

/**
 * 组件注册表类
 */
export class ComponentRegistry {
  private components: Map<string, ComponentMetadata> = new Map()
  private dependencies: Map<string, Set<string>> = new Map()
  private dependents: Map<string, Set<string>> = new Map()

  /**
   * 注册组件
   */
  register(component: ComponentMetadata): void {
    this.components.set(component.name, component)
    this.updateDependencies(component)
  }

  /**
   * 批量注册组件
   */
  registerBatch(components: ComponentMetadata[]): void {
    components.forEach(component => this.register(component))
  }

  /**
   * 获取组件
   */
  get(name: string): ComponentMetadata | undefined {
    return this.components.get(name)
  }

  /**
   * 获取所有组件
   */
  getAll(): ComponentMetadata[] {
    return Array.from(this.components.values())
  }

  /**
   * 按条件筛选组件
   */
  filter(criteria: {
    type?: string
    scope?: string
    status?: string
    tags?: string[]
    maintainer?: string
  }): ComponentMetadata[] {
    return this.getAll().filter(component => {
      if (criteria.type && component.type !== criteria.type) return false
      if (criteria.scope && component.scope !== criteria.scope) return false
      if (criteria.status && component.status !== criteria.status) return false
      if (criteria.tags && !criteria.tags.some(tag => component.tags.includes(tag))) return false
      if (criteria.maintainer && component.maintainer !== criteria.maintainer) return false
      return true
    })
  }

  /**
   * 搜索组件
   */
  search(query: string): ComponentMetadata[] {
    const lowerQuery = query.toLowerCase()
    return this.getAll().filter(component =>
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * 获取组件统计信息
   */
  getStats(): ComponentStats {
    const components = this.getAll()
    
    const byType: Record<string, number> = {}
    const byScope: Record<string, number> = {}
    const byStatus: Record<string, number> = {}
    const byMaintainer: Record<string, number> = {}
    
    components.forEach(component => {
      byType[component.type] = (byType[component.type] || 0) + 1
      byScope[component.scope] = (byScope[component.scope] || 0) + 1
      byStatus[component.status] = (byStatus[component.status] || 0) + 1
      byMaintainer[component.maintainer] = (byMaintainer[component.maintainer] || 0) + 1
    })

    const usageFrequency = components
      .map(c => ({ name: c.name, count: c.usageCount }))
      .sort((a, b) => b.count - a.count)

    const mostDependent = components
      .map(c => ({ name: c.name, count: c.dependents.length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(c => c.name)

    const mostDependencies = components
      .map(c => ({ name: c.name, count: c.dependencies.length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(c => c.name)

    return {
      total: components.length,
      byType,
      byScope,
      byStatus,
      byMaintainer,
      usageFrequency,
      dependencyStats: {
        mostDependent,
        mostDependencies
      }
    }
  }

  /**
   * 获取组件依赖关系
   */
  getDependencies(name: string): string[] {
    return Array.from(this.dependencies.get(name) || [])
  }

  /**
   * 获取被依赖的组件
   */
  getDependents(name: string): string[] {
    return Array.from(this.dependents.get(name) || [])
  }

  /**
   * 获取依赖关系图数据
   */
  getDependencyGraph(): {
    nodes: Array<{ id: string; name: string; type: string; scope: string }>
    edges: Array<{ source: string; target: string; type: string }>
  } {
    const components = this.getAll()
    const nodes = components.map(component => ({
      id: component.name,
      name: component.name,
      type: component.type,
      scope: component.scope
    }))

    const edges: Array<{ source: string; target: string; type: string }> = []
    components.forEach(component => {
      component.dependencies.forEach(dep => {
        edges.push({
          source: component.name,
          target: dep,
          type: 'depends'
        })
      })
    })

    return { nodes, edges }
  }

  /**
   * 更新组件使用统计
   */
  updateUsage(name: string, module: string): void {
    const component = this.components.get(name)
    if (component) {
      component.usageCount++
      if (!component.usedInModules.includes(module)) {
        component.usedInModules.push(module)
      }
    }
  }

  /**
   * 更新依赖关系
   */
  private updateDependencies(component: ComponentMetadata): void {
    // 更新依赖关系
    this.dependencies.set(component.name, new Set(component.dependencies))
    
    // 更新被依赖关系
    component.dependencies.forEach(dep => {
      if (!this.dependents.has(dep)) {
        this.dependents.set(dep, new Set())
      }
      this.dependents.get(dep)!.add(component.name)
    })
  }

  /**
   * 导出组件数据
   */
  export(): string {
    return JSON.stringify({
      components: this.getAll(),
      stats: this.getStats(),
      dependencyGraph: this.getDependencyGraph()
    }, null, 2)
  }

  /**
   * 导入组件数据
   */
  import(data: string): void {
    try {
      const parsed = JSON.parse(data)
      if (parsed.components) {
        this.registerBatch(parsed.components)
      }
    } catch (error) {
      console.error('Failed to import component data:', error)
    }
  }
}

// 创建全局组件注册表实例
export const componentRegistry = new ComponentRegistry()

// 预定义组件数据
const predefinedComponents: ComponentMetadata[] = [
  {
    name: 'BtcForm',
    type: 'base',
    scope: 'project',
    status: 'migrated',
    description: '基于 Element Plus Form 的封装组件，提供统一的表单处理能力',
    version: '1.0.0',
    tags: ['form', 'validation', 'element-plus'],
    maintainer: 'BTC Team',
    lastUpdated: '2025-09-30',
    usageCount: 15,
    usedInModules: ['auth', 'user', 'system'],
    dependencies: ['BtcFormItem'],
    dependents: ['BtcStepsForm', 'BtcAuthForm'],
    documentation: '/components/base/BtcForm/README.md',
    path: 'src/components/base/BtcForm',
    size: 12.5,
    complexity: 7,
    reusability: 9,
    maintenanceCost: 3
  },
  {
    name: 'BtcTabInk',
    type: 'composite',
    scope: 'project',
    status: 'migrated',
    description: 'Tab 下划线动画组件，支持平滑的动画过渡',
    version: '1.0.0',
    tags: ['tab', 'animation', 'ui'],
    maintainer: 'BTC Team',
    lastUpdated: '2025-09-30',
    usageCount: 0,
    usedInModules: [],
    dependencies: [],
    dependents: ['BtcTabs', 'BtcAuthForm'],
    documentation: '/components/composite/BtcTabInk/README.md',
    path: 'src/components/composite/BtcTabInk',
    size: 8.2,
    complexity: 5,
    reusability: 8,
    maintenanceCost: 2
  },
  {
    name: 'btc-form',
    type: 'base',
    scope: 'module',
    status: 'pending',
    description: '原始表单组件，待迁移到项目级组件库',
    tags: ['form', 'legacy'],
    maintainer: 'BTC Team',
    lastUpdated: '2025-09-25',
    usageCount: 12,
    usedInModules: ['base'],
    dependencies: [],
    dependents: ['btc-steps-form'],
    path: 'src/modules/base/components/btc/btc-form',
    size: 15.8,
    complexity: 8,
    reusability: 9,
    maintenanceCost: 4
  },
  {
    name: 'btc-steps',
    type: 'composite',
    scope: 'module',
    status: 'pending',
    description: '步骤组件，待迁移到项目级组件库',
    tags: ['steps', 'navigation'],
    maintainer: 'BTC Team',
    lastUpdated: '2025-09-25',
    usageCount: 8,
    usedInModules: ['base'],
    dependencies: [],
    dependents: ['btc-steps-form'],
    path: 'src/modules/base/components/btc/btc-steps',
    size: 6.5,
    complexity: 4,
    reusability: 7,
    maintenanceCost: 2
  },
  {
    name: 'password-form',
    type: 'business',
    scope: 'page',
    status: 'stable',
    description: '密码登录表单组件，用于认证页面',
    tags: ['auth', 'login', 'password'],
    maintainer: 'BTC Team',
    lastUpdated: '2025-09-28',
    usageCount: 3,
    usedInModules: ['auth'],
    dependencies: ['btc-form'],
    dependents: [],
    path: 'src/modules/base/pages/auth/login/password-form',
    size: 18.3,
    complexity: 6,
    reusability: 4,
    maintenanceCost: 5
  },
  {
    name: 'tenant-selector',
    type: 'composite',
    scope: 'page',
    status: 'stable',
    description: '租户选择器组件，用于注册流程',
    tags: ['selector', 'registration'],
    maintainer: 'BTC Team',
    lastUpdated: '2025-09-28',
    usageCount: 2,
    usedInModules: ['auth'],
    dependencies: [],
    dependents: ['register-form'],
    path: 'src/modules/base/pages/auth/register/tenant-selector',
    size: 22.1,
    complexity: 7,
    reusability: 6,
    maintenanceCost: 4
  }
]

// 初始化注册表
componentRegistry.registerBatch(predefinedComponents)
