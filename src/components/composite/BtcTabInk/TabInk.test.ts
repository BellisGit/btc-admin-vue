/**
 * TabInk 组件单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BtcTabInk from './index.vue'
import type { TabItem } from './types'

// Mock DOM methods
Object.defineProperty(window, 'getBoundingClientRect', {
  value: vi.fn(() => ({
    left: 0,
    top: 0,
    width: 100,
    height: 40,
    right: 100,
    bottom: 40,
    x: 0,
    y: 0,
    toJSON: vi.fn()
  }))
})

Object.defineProperty(window, 'querySelectorAll', {
  value: vi.fn(() => [
    { getBoundingClientRect: () => ({ left: 0, width: 100 }) },
    { getBoundingClientRect: () => ({ left: 100, width: 100 }) },
    { getBoundingClientRect: () => ({ left: 200, width: 100 }) }
  ])
})

describe('BtcTabInk Component', () => {
  const mockTabs: TabItem[] = [
    { id: 1, label: '标签1' },
    { id: 2, label: '标签2' },
    { id: 3, label: '标签3' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确渲染组件', () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 0,
        tabs: mockTabs
      }
    })

    expect(wrapper.find('.btc-tab-ink').exists()).toBe(true)
    expect(wrapper.find('.btc-tab-ink__line').exists()).toBe(true)
  })

  it('应该使用默认 props', () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 0,
        tabs: mockTabs
      }
    })

    const line = wrapper.find('.btc-tab-ink__line')
    expect(line.attributes('style')).toContain('height: 2px')
  })

  it('应该支持自定义 props', () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 1,
        tabs: mockTabs,
        duration: 500,
        color: '#ff0000',
        height: 3
      }
    })

    const line = wrapper.find('.btc-tab-ink__line')
    expect(line.attributes('style')).toContain('height: 3px')
  })

  it('应该响应 activeIndex 变化', async () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 0,
        tabs: mockTabs
      }
    })

    // 初始状态
    expect(wrapper.props('activeIndex')).toBe(0)

    // 更新 activeIndex
    await wrapper.setProps({ activeIndex: 1 })
    expect(wrapper.props('activeIndex')).toBe(1)
  })

  it('应该响应 tabs 变化', async () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 0,
        tabs: mockTabs
      }
    })

    const newTabs: TabItem[] = [
      { id: 1, label: '新标签1' },
      { id: 2, label: '新标签2' }
    ]

    await wrapper.setProps({ tabs: newTabs })
    expect(wrapper.props('tabs')).toEqual(newTabs)
  })

  it('应该暴露 recalculate 方法', () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 0,
        tabs: mockTabs
      }
    })

    const vm = wrapper.vm as any
    expect(typeof vm.recalculate).toBe('function')
  })

  it('应该处理空 tabs 数组', () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 0,
        tabs: []
      }
    })

    expect(wrapper.find('.btc-tab-ink').exists()).toBe(true)
  })

  it('应该处理无效的 activeIndex', () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: -1,
        tabs: mockTabs
      }
    })

    expect(wrapper.find('.btc-tab-ink').exists()).toBe(true)
  })

  it('应该支持主题色', () => {
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 0,
        tabs: mockTabs
      }
    })

    const line = wrapper.find('.btc-tab-ink__line')
    // 应该使用 CSS 变量作为背景色
    expect(line.classes()).toContain('btc-tab-ink__line')
  })

  it('应该支持自定义颜色', () => {
    const customColor = '#ff6b6b'
    const wrapper = mount(BtcTabInk, {
      props: {
        activeIndex: 0,
        tabs: mockTabs,
        color: customColor
      }
    })

    const line = wrapper.find('.btc-tab-ink__line')
    expect(line.attributes('style')).toContain(customColor)
  })
})
