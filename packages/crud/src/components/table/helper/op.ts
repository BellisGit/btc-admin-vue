import { ref, reactive } from 'vue'

export interface TableOpOptions {
  buttons?: any[]
  width?: string | number
  fixed?: boolean | string
  align?: string
  label?: string
}

export function useTableOp(options: TableOpOptions = {}) {
  const config = reactive({
    buttons: [],
    width: 150,
    fixed: 'right',
    align: 'center',
    label: '操作',
    ...options
  })

  const addButton = (button: any) => {
    config.buttons.push(button)
  }

  const removeButton = (index: number) => {
    if (index >= 0 && index < config.buttons.length) {
      config.buttons.splice(index, 1)
    }
  }

  const clearButtons = () => {
    config.buttons = []
  }

  return {
    config,
    addButton,
    removeButton,
    clearButtons
  }
}
