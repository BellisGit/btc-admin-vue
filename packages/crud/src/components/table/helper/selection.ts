import { ref, reactive, computed } from 'vue'

export interface TableSelectionOptions {
  type?: string
  reserveSelection?: boolean
  selectable?: (row: any, index: number) => boolean
  selectOnIndeterminate?: boolean
}

export function useTableSelection(options: TableSelectionOptions = {}) {
  const config = reactive({
    type: 'selection',
    reserveSelection: false,
    selectable: () => true,
    selectOnIndeterminate: true,
    ...options
  })

  const selection = ref<any[]>([])
  const isAllSelected = ref(false)
  const isIndeterminate = ref(false)

  const selectedCount = computed(() => selection.value.length)
  const hasSelection = computed(() => selection.value.length > 0)

  const toggleRowSelection = (row: any, selected?: boolean) => {
    const index = selection.value.findIndex(item => item === row)
    
    if (selected === undefined) {
      selected = index === -1
    }

    if (selected && index === -1) {
      selection.value.push(row)
    } else if (!selected && index > -1) {
      selection.value.splice(index, 1)
    }
  }

  const toggleAllSelection = () => {
    if (isAllSelected.value) {
      clearSelection()
    } else {
      selectAll()
    }
  }

  const clearSelection = () => {
    selection.value = []
    isAllSelected.value = false
    isIndeterminate.value = false
  }

  const selectAll = () => {
    // 这里需要根据实际的数据源来实现
    // selection.value = [...data.value]
    isAllSelected.value = true
    isIndeterminate.value = false
  }

  const setSelection = (rows: any[]) => {
    selection.value = [...rows]
  }

  return {
    config,
    selection,
    isAllSelected,
    isIndeterminate,
    selectedCount,
    hasSelection,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    selectAll,
    setSelection
  }
}
