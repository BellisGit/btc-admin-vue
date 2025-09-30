import { ref, reactive } from 'vue'

export interface FormApiOptions {
  add?: (data: any) => Promise<any>
  update?: (data: any) => Promise<any>
  info?: (id: any) => Promise<any>
}

export function useFormApi(options: FormApiOptions = {}) {
  const loading = ref(false)
  const form = ref({})
  const append = ref(false)

  const add = async (data: any) => {
    loading.value = true
    try {
      if (options.add) {
        return await options.add(data)
      }
      throw new Error('Add API not configured')
    } finally {
      loading.value = false
    }
  }

  const update = async (data: any) => {
    loading.value = true
    try {
      if (options.update) {
        return await options.update(data)
      }
      throw new Error('Update API not configured')
    } finally {
      loading.value = false
    }
  }

  const info = async (id: any) => {
    loading.value = true
    try {
      if (options.info) {
        const data = await options.info(id)
        form.value = data
        return data
      }
      throw new Error('Info API not configured')
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    form.value = {}
    append.value = false
  }

  return {
    loading,
    form,
    append,
    add,
    update,
    info,
    reset
  }
}
