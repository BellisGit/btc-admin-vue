import { ref, reactive, computed } from 'vue'

export interface TableDataOptions {
  data?: any[]
  loading?: boolean
  total?: number
  page?: number
  size?: number
}

export function useTableData(options: TableDataOptions = {}) {
  const data = ref(options.data || [])
  const loading = ref(options.loading || false)
  const total = ref(options.total || 0)
  const page = ref(options.page || 1)
  const size = ref(options.size || 20)

  const isEmpty = computed(() => data.value.length === 0)
  const hasData = computed(() => data.value.length > 0)

  const setData = (newData: any[]) => {
    data.value = newData
  }

  const addData = (item: any) => {
    data.value.push(item)
  }

  const updateData = (index: number, item: any) => {
    if (index >= 0 && index < data.value.length) {
      data.value[index] = { ...data.value[index], ...item }
    }
  }

  const removeData = (index: number) => {
    if (index >= 0 && index < data.value.length) {
      data.value.splice(index, 1)
    }
  }

  const clearData = () => {
    data.value = []
  }

  const setLoading = (state: boolean) => {
    loading.value = state
  }

  const setTotal = (totalCount: number) => {
    total.value = totalCount
  }

  const setPage = (pageNum: number) => {
    page.value = pageNum
  }

  const setSize = (pageSize: number) => {
    size.value = pageSize
  }

  return {
    data,
    loading,
    total,
    page,
    size,
    isEmpty,
    hasData,
    setData,
    addData,
    updateData,
    removeData,
    clearData,
    setLoading,
    setTotal,
    setPage,
    setSize
  }
}
