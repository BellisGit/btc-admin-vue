import { ref, reactive } from 'vue'

export interface TableRowOptions {
  rowKey?: string
  rowClassName?: string | ((row: any, index: number) => string)
  rowStyle?: Record<string, any> | ((row: any, index: number) => Record<string, any>)
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
}

export function useTableRow(options: TableRowOptions = {}) {
  const config = reactive({
    rowKey: 'id',
    rowClassName: '',
    rowStyle: {},
    highlightCurrentRow: false,
    currentRowKey: '',
    ...options
  })

  const currentRow = ref<any>(null)

  const setCurrentRow = (row: any) => {
    currentRow.value = row
  }

  const getRowKey = (row: any) => {
    return row[config.rowKey]
  }

  const getRowClassName = (row: any, index: number) => {
    if (typeof config.rowClassName === 'function') {
      return config.rowClassName(row, index)
    }
    return config.rowClassName
  }

  const getRowStyle = (row: any, index: number) => {
    if (typeof config.rowStyle === 'function') {
      return config.rowStyle(row, index)
    }
    return config.rowStyle
  }

  return {
    config,
    currentRow,
    setCurrentRow,
    getRowKey,
    getRowClassName,
    getRowStyle
  }
}
