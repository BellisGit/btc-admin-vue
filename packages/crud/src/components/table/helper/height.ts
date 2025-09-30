import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface TableHeightOptions {
  autoHeight?: boolean
  height?: string | number
  maxHeight?: string | number
  minHeight?: string | number
}

export function useTableHeight(options: TableHeightOptions = {}) {
  const containerRef = ref<HTMLElement>()
  const tableRef = ref()
  const containerHeight = ref(0)
  const headerHeight = ref(0)
  const footerHeight = ref(0)

  const tableHeight = computed(() => {
    if (options.height) {
      return typeof options.height === 'number' ? `${options.height}px` : options.height
    }
    
    if (options.autoHeight && containerHeight.value > 0) {
      const availableHeight = containerHeight.value - headerHeight.value - footerHeight.value
      return `${Math.max(availableHeight, Number(options.minHeight) || 200)}px`
    }
    
    return undefined
  })

  const updateHeight = () => {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight
    }
  }

  const resizeObserver = ref<ResizeObserver>()

  onMounted(() => {
    updateHeight()
    
    if (options.autoHeight) {
      resizeObserver.value = new ResizeObserver(() => {
        updateHeight()
      })
      
      if (containerRef.value) {
        resizeObserver.value.observe(containerRef.value)
      }
    }
  })

  onUnmounted(() => {
    if (resizeObserver.value) {
      resizeObserver.value.disconnect()
    }
  })

  return {
    containerRef,
    tableRef,
    containerHeight,
    headerHeight,
    footerHeight,
    tableHeight,
    updateHeight
  }
}
