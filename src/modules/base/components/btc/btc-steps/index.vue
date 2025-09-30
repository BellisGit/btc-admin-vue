<template>
  <div class="btc-steps" :class="{ 'show-arrow': showArrow }">
    <el-steps
      :active="active"
      :direction="direction"
      :align-center="alignCenter"
      :space="space"
      :simple="simple"
      :finish-status="finishStatus"
      :process-status="processStatus"
    >
      <el-step
        v-for="(step, index) in steps"
        :key="index"
        :title="step.title"
        :description="step.description"
        :icon="step.icon"
        :status="step.status"
      />
    </el-steps>
  </div>
</template>

<script lang="ts" setup>
// 定义组件
defineOptions({
  name: 'btc-steps'
})

// 定义接口
interface Step {
  title: string
  description?: string
  icon?: string
  status?: 'wait' | 'process' | 'finish' | 'error' | 'success'
}

interface Props {
  active: number
  steps: Step[]
  direction?: 'horizontal' | 'vertical'
  alignCenter?: boolean
  space?: string | number
  simple?: boolean
  finishStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  processStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  showArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: 0,
  direction: 'horizontal',
  alignCenter: true,
  simple: false,
  finishStatus: 'success', // 使用Element Plus默认的success状态
  processStatus: 'process', // 使用Element Plus默认的process状态
  space: '',
  showArrow: false
})

// 动态设置连线和箭头颜色
import { watch, nextTick } from 'vue'

// 设置连线和箭头颜色的函数
const updateArrowColors = () => {
  nextTick(() => {
    // 查找当前组件实例中的所有步骤
    const component = document.querySelector('.btc-steps')
    if (!component) return

    const steps = component.querySelectorAll('.el-step:not(:last-child) .el-step__head')

    steps.forEach((step, index) => {
      // 获取当前步骤的状态
      const stepElement = step.closest('.el-step')
      if (!stepElement) return

      const isFinish = stepElement.classList.contains('is-finish')
      const isProcess = stepElement.classList.contains('is-process')
      const isError = stepElement.classList.contains('is-error')

      // 设置颜色逻辑
      // 1. 当前步骤(index < active)：已完成，使用主题色
      // 2. 当前步骤(index = active)：进行中，使用主题色
      // 3. 未来步骤(index > active)：等待中，使用灰色
      let color = 'var(--el-border-color)' // 使用 Element Plus 默认灰色

      // 只有当前步骤和已完成步骤之间的连线才使用主题色
      if (index < props.active || (index === props.active && isProcess)) {
        color = 'var(--el-color-primary)' // Element Plus 主题色
      } else if (isError) {
        color = 'var(--el-color-danger)' // Element Plus 危险色
      } else {
        // 确保未来步骤使用 Element Plus 默认灰色
        color = 'var(--el-border-color)'
      }

      // 直接设置CSS变量到步骤元素
      ;(step as HTMLElement).style.setProperty('--arrow-color', color)

      // 查找或创建连线元素
      let lineElement = (step as HTMLElement).querySelector('.custom-line') as HTMLElement
      if (!lineElement) {
        lineElement = document.createElement('div')
        lineElement.className = 'custom-line'
        lineElement.style.cssText = `
          position: absolute;
          top: 50%;
          left: calc(50% + 32px);
          right: calc(-50% + 32px);
          height: 2px;
          transform: translateY(-50%);
          z-index: 1;
        `
        ;(step as HTMLElement).appendChild(lineElement as HTMLElement)
      }

      // 强制设置连线颜色
      ;(lineElement as HTMLElement).style.setProperty('background-color', color, 'important')

      // 查找或创建箭头元素
      let arrowElement = (step as HTMLElement).querySelector('.custom-arrow') as HTMLElement
      if (!arrowElement) {
        arrowElement = document.createElement('div')
        arrowElement.className = 'custom-arrow'
        ;(step as HTMLElement).appendChild(arrowElement as HTMLElement)
      }

      // 设置箭头元素的完整样式
      arrowElement.style.cssText = `
        position: absolute;
        top: 50%;
        right: calc(-50% + 24px);
        width: 0;
        height: 0;
        border-left: 8px solid ${color};
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        transform: translateY(-50%);
        z-index: 2;
      `
    })
  })
}

// 监听 active 变化
watch(() => props.active, updateArrowColors, { immediate: true })

// 监听 steps 变化
watch(() => props.steps, updateArrowColors, { immediate: true })
</script>

<style lang="scss" scoped>
.btc-steps {
  // 自定义样式 - 完全控制颜色

  // 箭头模式
  &.show-arrow {
    // 隐藏默认连线
    :deep(.el-step__line) {
      display: none;
    }

    // 为每个步骤添加自定义连线和箭头
    :deep(.el-step:not(:last-child) .el-step__head) {
      position: relative;

      // 隐藏伪元素，使用 JavaScript 创建的实际元素
      &::before,
      &::after {
        display: none;
      }
    }

    // 状态颜色现在通过 JavaScript 动态设置，使用 --arrow-color CSS 变量
  }

  // 普通模式下的自定义样式
  &:not(.show-arrow) {
    // 步骤圆圈样式
    :deep(.el-step__head) {
      border-color: var(--el-border-color);

      &.is-process {
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
      }

      &.is-finish {
        border-color: var(--el-color-success);
        color: var(--el-color-success);
      }

      &.is-error {
        border-color: var(--el-color-danger);
        color: var(--el-color-danger);
      }

      &.is-success {
        border-color: var(--el-color-success);
        color: var(--el-color-success);
      }
    }

    // 步骤标题样式
    :deep(.el-step__title) {
      &.is-process {
        color: var(--el-color-primary);
        font-weight: 600;
      }

      &.is-finish {
        color: var(--el-text-color-primary);
      }

      &.is-error {
        color: var(--el-color-danger);
      }

      &.is-success {
        color: var(--el-color-success);
      }
    }

    // 步骤描述样式
    :deep(.el-step__description) {
      &.is-process {
        color: var(--el-color-primary);
      }

      &.is-finish {
        color: var(--el-text-color-regular);
      }

      &.is-error {
        color: var(--el-color-danger);
      }

      &.is-success {
        color: var(--el-color-success);
      }
    }

    // 连线样式
    :deep(.el-step__line) {
      background-color: var(--el-border-color);

      &.is-process {
        background-color: var(--el-color-primary);
      }

      &.is-finish {
        background-color: var(--el-color-success);
      }

      &.is-error {
        background-color: var(--el-color-danger);
      }

      &.is-success {
        background-color: var(--el-color-success);
      }
    }
  }
}
</style>
