import { ref, reactive } from 'vue'

export interface FormActionOptions {
  saveButtonText?: string
  closeButtonText?: string
  justify?: string
  buttons?: string[]
  hidden?: boolean
}

export function useFormAction(options: FormActionOptions = {}) {
  const config = reactive({
    saveButtonText: '保存',
    closeButtonText: '关闭',
    justify: 'flex-end',
    buttons: ['close', 'save'],
    hidden: false,
    ...options
  })

  const loading = ref(false)

  const save = async (callback?: () => Promise<void>) => {
    loading.value = true
    try {
      if (callback) {
        await callback()
      }
    } finally {
      loading.value = false
    }
  }

  const close = (callback?: () => void) => {
    if (callback) {
      callback()
    }
  }

  return {
    config,
    loading,
    save,
    close
  }
}
