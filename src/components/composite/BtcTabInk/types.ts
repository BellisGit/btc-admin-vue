/**
 * TabInk 组件类型定义
 */

export interface TabItem {
  /** 标签唯一标识 */
  id: string | number
  /** 标签显示文本 */
  label: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: Record<string, any>
}

export interface TabInkProps {
  /** 当前激活的标签索引 */
  activeIndex: number
  /** 标签列表 */
  tabs: TabItem[]
  /** 动画持续时间(ms) */
  duration?: number
  /** 下划线颜色，默认使用主题色 */
  color?: string
  /** 下划线高度(px) */
  height?: number
}

export interface TabInkExpose {
  /** 重新计算下划线位置 */
  recalculate: () => Promise<void>
}

export interface TabInkEvents {
  /** 下划线位置更新时触发 */
  onUpdate: (position: { left: number; width: number }) => void
}

/**
 * TabInk 组件实例类型
 */
export type TabInkInstance = TabInkExpose

/**
 * 下划线位置信息
 */
export interface InkPosition {
  /** 下划线左边距(px) */
  left: number
  /** 下划线宽度(px) */
  width: number
  /** 下划线高度(px) */
  height: number
}

/**
 * 动画配置
 */
export interface InkAnimation {
  /** 动画持续时间(ms) */
  duration: number
  /** 动画缓动函数 */
  easing: string
  /** 是否启用动画 */
  enabled: boolean
}

/**
 * 主题配置
 */
export interface InkTheme {
  /** 主色调 */
  primary: string
  /** 激活状态颜色 */
  active: string
  /** 禁用状态颜色 */
  disabled: string
  /** 暗色主题主色调 */
  darkPrimary: string
}
