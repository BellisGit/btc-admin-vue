/**
 * BTC 项目级组件库
 * 
 * 提供项目中可复用的组件，按功能分类：
 * - base: 基础组件 (Button, Input, Icon)
 * - composite: 复合组件 (Modal, Dropdown, BtcTabInk)
 * - business: 业务组件 (AuthForm, DataTable)
 */

// 基础组件
export { default as BtcForm } from './base/BtcForm'

// 复合组件
export { default as BtcTabInk } from './composite/BtcTabInk'

// 可视化组件
export { default as ComponentOverview } from './ComponentOverview/ComponentOverview.vue'

// 组件注册表
export { componentRegistry, ComponentRegistry } from './ComponentRegistry'
export type { ComponentMetadata, ComponentStats } from './ComponentRegistry'

// 类型导出
export type { 
  // BtcForm 类型
  BtcFormProps,
  BtcFormEmits,
  BtcFormExpose,
  BtcFormInstance,
  FormValidateCallback,
  FieldValidateCallback,
  FormConfig,
  FormState,
  FormMethods,
  // BtcTabInk 类型
  TabItem, 
  TabInkProps, 
  TabInkExpose, 
  TabInkInstance,
  InkPosition,
  InkAnimation,
  InkTheme
} from './base/BtcForm/types'

/**
 * 组件库信息
 */
export const COMPONENT_LIBRARY_INFO = {
  name: 'BTC Component Library',
  version: '1.0.0',
  description: 'BTC 项目级组件库，提供可复用的 Vue 组件',
  categories: {
    base: '基础组件 - 原子级别的 UI 组件',
    composite: '复合组件 - 由多个基础组件组合而成',
    business: '业务组件 - 包含特定业务逻辑的组件',
    visualization: '可视化组件 - 组件管理和分析工具'
  },
  components: [
    { name: 'BtcForm', description: '表单组件，基于 Element Plus Form 的封装', category: 'base' },
    { name: 'BtcTabInk', description: 'Tab 下划线动画组件', category: 'composite' },
    { name: 'ComponentOverview', description: '组件总览可视化组件', category: 'visualization' }
  ],
  stats: {
    total: 3,
    base: 1,
    composite: 1,
    business: 0,
    visualization: 1
  }
} as const

/**
 * 组件使用示例
 * 
 * @example
 * ```vue
 * <template>
 *   <div class="tabs">
 *     <div 
 *       v-for="(tab, index) in tabs" 
 *       :key="tab.id"
 *       class="btc-tab-item"
 *       :class="{ active: index === activeIndex }"
 *       @click="activeIndex = index"
 *     >
 *       {{ tab.label }}
 *     </div>
 *     <BtcTabInk :activeIndex="activeIndex" :tabs="tabs" />
 *   </div>
 * </template>
 * 
 * <script setup>
 * import { ref } from 'vue'
 * import { BtcTabInk } from '@/components'
 * 
 * const activeIndex = ref(0)
 * const tabs = ref([
 *   { id: 1, label: '标签1' },
 *   { id: 2, label: '标签2' },
 *   { id: 3, label: '标签3' }
 * ])
 * </script>
 * ```
 */
