import { inject, provide, type InjectionKey } from 'vue'

export interface CrudProvide {
  crud: any
  refresh: () => void
  add: (row?: any) => void
  edit: (row: any) => void
  del: (row: any) => void
  view: (row: any) => void
  save: () => void
  close: () => void
  resetSearch: () => void
  searchSubmit: (params?: any) => void
  pageChange: (page: number) => void
  sizeChange: (size: number) => void
  selectionChange: (selection: any[]) => void
  batchDelete: () => void
  selection: any
  upsert: any
  append: any
  form: any
  formLoading: any
  loading: any
  data: any
  total: any
  page: any
  size: any
  search: any
}

export const crudProvideKey: InjectionKey<CrudProvide> = Symbol('crud')

export function useCrudProvide() {
  return inject(crudProvideKey)
}

export function useCrudInject(crudProvide: CrudProvide) {
  return provide(crudProvideKey, crudProvide)
}
