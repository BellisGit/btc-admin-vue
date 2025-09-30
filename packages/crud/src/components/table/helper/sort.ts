import { ref, reactive } from 'vue'

export interface TableSortOptions {
  defaultSort?: {
    prop: string
    order: 'ascending' | 'descending'
  }
  sortMethod?: (a: any, b: any) => number
  sortBy?: string | string[] | ((row: any, index: number) => any)
  sortOrders?: ('ascending' | 'descending' | null)[]
}

export function useTableSort(options: TableSortOptions = {}) {
  const config = reactive({
    defaultSort: null,
    sortMethod: null,
    sortBy: null,
    sortOrders: ['ascending', 'descending', null],
    ...options
  })

  const currentSort = ref<{
    prop: string
    order: 'ascending' | 'descending' | null
  } | null>(config.defaultSort || null)

  const setSort = (prop: string, order: 'ascending' | 'descending' | null) => {
    currentSort.value = { prop, order }
  }

  const clearSort = () => {
    currentSort.value = null
  }

  const sortData = (data: any[], prop: string, order: 'ascending' | 'descending') => {
    if (!prop || !order) return data

    return [...data].sort((a, b) => {
      const aVal = a[prop]
      const bVal = b[prop]

      if (config.sortMethod) {
        return config.sortMethod(aVal, bVal)
      }

      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'ascending' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'ascending' ? aVal - bVal : bVal - aVal
      }

      return 0
    })
  }

  return {
    config,
    currentSort,
    setSort,
    clearSort,
    sortData
  }
}
