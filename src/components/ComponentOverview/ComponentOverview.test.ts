/**
 * @file ComponentOverview 组件单元测试
 * @description 验证组件总览的渲染、搜索和筛选功能
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ComponentOverview from './ComponentOverview.vue'
import { componentRegistry } from '../ComponentRegistry'

// Mock 子组件
vi.mock('./components/OverviewHeader.vue', () => ({
  default: {
    name: 'OverviewHeader',
    props: ['stats'],
    template: '<div class="overview-header">Header</div>'
  }
}))

vi.mock('./components/OverviewControls.vue', () => ({
  default: {
    name: 'OverviewControls',
    props: ['search', 'tab', 'type'],
    emits: ['update:search', 'update:tab', 'update:type', 'tab-change'],
    template: '<div class="overview-controls">Controls</div>'
  }
}))

vi.mock('./components/ComponentGrid.vue', () => ({
  default: {
    name: 'ComponentGrid',
    props: ['components'],
    emits: ['select', 'migrate', 'open-docs'],
    template: '<div class="component-grid">Grid</div>'
  }
}))

vi.mock('./components/ComponentDetailDialog.vue', () => ({
  default: {
    name: 'ComponentDetailDialog',
    props: ['modelValue', 'component'],
    emits: ['update:modelValue', 'close'],
    template: '<div class="component-detail-dialog">Dialog</div>'
  }
}))

describe('ComponentOverview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确渲染组件', () => {
    const wrapper = mount(ComponentOverview)
    
    expect(wrapper.find('.btc-component-overview').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'OverviewHeader' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'OverviewControls' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ComponentGrid' }).exists()).toBe(true)
  })

  it('应该正确传递统计数据给头部组件', () => {
    const wrapper = mount(ComponentOverview)
    const headerComponent = wrapper.findComponent({ name: 'OverviewHeader' })
    
    expect(headerComponent.props('stats')).toBeDefined()
    expect(headerComponent.props('stats').total).toBeGreaterThan(0)
  })

  it('应该正确处理标签页切换', async () => {
    const wrapper = mount(ComponentOverview)
    const controlsComponent = wrapper.findComponent({ name: 'OverviewControls' })
    
    // 模拟标签页切换
    await controlsComponent.vm.$emit('tab-change', 'project')
    await nextTick()
    
    expect(wrapper.vm.activeTab).toBe('project')
  })

  it('应该正确处理搜索功能', async () => {
    const wrapper = mount(ComponentOverview)
    const controlsComponent = wrapper.findComponent({ name: 'OverviewControls' })
    
    // 模拟搜索
    await controlsComponent.vm.$emit('update:search', 'BtcForm')
    await nextTick()
    
    expect(wrapper.vm.searchQuery).toBe('BtcForm')
  })

  it('应该正确处理组件选择', async () => {
    const wrapper = mount(ComponentOverview)
    const gridComponent = wrapper.findComponent({ name: 'ComponentGrid' })
    
    const mockComponent = {
      name: 'TestComponent',
      type: 'base',
      scope: 'project',
      status: 'migrated',
      description: 'Test component',
      tags: ['test'],
      maintainer: 'Test Team',
      lastUpdated: '2025-09-30',
      usageCount: 0,
      usedInModules: [],
      dependencies: [],
      dependents: [],
      path: 'test/path'
    }
    
    // 模拟组件选择
    await gridComponent.vm.$emit('select', mockComponent)
    await nextTick()
    
    expect(wrapper.vm.selectedComponent).toEqual(mockComponent)
    expect(wrapper.vm.showDetailDialog).toBe(true)
  })

  it('应该正确处理组件迁移', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = mount(ComponentOverview)
    const gridComponent = wrapper.findComponent({ name: 'ComponentGrid' })
    
    const mockComponent = {
      name: 'TestComponent',
      type: 'base',
      scope: 'module',
      status: 'pending',
      description: 'Test component',
      tags: ['test'],
      maintainer: 'Test Team',
      lastUpdated: '2025-09-30',
      usageCount: 0,
      usedInModules: [],
      dependencies: [],
      dependents: [],
      path: 'test/path'
    }
    
    // 模拟组件迁移
    await gridComponent.vm.$emit('migrate', mockComponent)
    await nextTick()
    
    expect(consoleSpy).toHaveBeenCalledWith('开始迁移组件: TestComponent')
    
    consoleSpy.mockRestore()
  })

  it('应该正确关闭详情弹窗', async () => {
    const wrapper = mount(ComponentOverview)
    
    // 设置初始状态
    wrapper.vm.showDetailDialog = true
    wrapper.vm.selectedComponent = { name: 'Test' } as any
    
    // 模拟关闭弹窗
    await wrapper.vm.closeDetailDialog()
    
    expect(wrapper.vm.showDetailDialog).toBe(false)
    expect(wrapper.vm.selectedComponent).toBe(null)
  })

  it('应该正确筛选组件', async () => {
    const wrapper = mount(ComponentOverview)
    
    // 测试按作用域筛选
    wrapper.vm.activeTab = 'project'
    await nextTick()
    
    const projectComponents = wrapper.vm.filteredComponents
    expect(projectComponents.every(c => c.scope === 'project')).toBe(true)
    
    // 测试按类型筛选
    wrapper.vm.selectedType = 'base'
    await nextTick()
    
    const baseComponents = wrapper.vm.filteredComponents
    expect(baseComponents.every(c => c.type === 'base')).toBe(true)
    
    // 测试搜索筛选
    wrapper.vm.searchQuery = 'BtcForm'
    await nextTick()
    
    const searchResults = wrapper.vm.filteredComponents
    expect(searchResults.every(c => 
      c.name.toLowerCase().includes('btcform') ||
      c.description.toLowerCase().includes('btcform') ||
      c.tags.some(tag => tag.toLowerCase().includes('btcform'))
    )).toBe(true)
  })
})
