<template>
  <div ref="tabInkRef" class="btc-tab-ink">
    <div 
      class="btc-tab-ink__line" 
      :style="inkStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'

/**
 * TabInk 下划线动画组件
 * 用于 Tab 组件的下划线指示器，支持平滑的动画过渡
 * 
 * @param activeIndex 当前激活的标签索引
 * @param tabs 标签列表，用于计算位置和宽度
 * @param duration 动画持续时间(ms)
 * @param color 下划线颜色，默认使用主题色
 * @param height 下划线高度(px)
 */
interface TabItem {
  id: string | number
  label: string
  disabled?: boolean
}

interface Props {
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

const props = withDefaults(defineProps<Props>(), {
  duration: 300,
  color: '',
  height: 2
})

const tabInkRef = ref<HTMLElement>()
const inkStyle = ref({
  transform: 'translateX(0px)',
  width: '0px',
  transition: `all ${props.duration}ms ease-in-out`
})

/**
 * 计算下划线的位置和宽度
 */
const calculateInkPosition = async () => {
  if (!tabInkRef.value || props.tabs.length === 0) return

  await nextTick()
  
  const container = tabInkRef.value.parentElement
  if (!container) return

  const tabElements = container.querySelectorAll('.btc-tab-item')
  if (tabElements.length === 0) return

  const activeTab = tabElements[props.activeIndex] as HTMLElement
  if (!activeTab) return

  const containerRect = container.getBoundingClientRect()
  const activeTabRect = activeTab.getBoundingClientRect()
  
  // 计算相对于容器的位置
  const left = activeTabRect.left - containerRect.left
  const width = activeTabRect.width

  inkStyle.value = {
    transform: `translateX(${left}px)`,
    width: `${width}px`,
    transition: `all ${props.duration}ms ease-in-out`
  }
}

/**
 * 监听激活索引变化
 */
watch(
  () => props.activeIndex,
  () => {
    calculateInkPosition()
  },
  { immediate: false }
)

/**
 * 监听标签列表变化
 */
watch(
  () => props.tabs,
  () => {
    calculateInkPosition()
  },
  { immediate: true, deep: true }
)

/**
 * 监听窗口大小变化，重新计算位置
 */
const handleResize = () => {
  calculateInkPosition()
}

onMounted(() => {
  calculateInkPosition()
  window.addEventListener('resize', handleResize)
})

// 清理事件监听器
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

/**
 * 暴露给父组件的方法
 */
defineExpose({
  /** 重新计算下划线位置 */
  recalculate: calculateInkPosition
})
</script>

<style scoped>
.btc-tab-ink {
  position: relative;
  overflow: hidden;
  pointer-events: none;
}

.btc-tab-ink__line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: v-bind('`${props.height}px`');
  background-color: v-bind('props.color || "var(--el-color-primary)"');
  border-radius: 1px;
  transform-origin: left center;
  will-change: transform, width;
}

/* 主题色支持 */
.btc-tab-ink__line {
  background-color: var(--el-color-primary);
}

/* 暗色主题支持 */
.dark .btc-tab-ink__line {
  background-color: var(--el-color-primary-light-3);
}

/* 动画优化 */
.btc-tab-ink__line {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}
</style>
