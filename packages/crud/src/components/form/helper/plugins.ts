import { ref, reactive } from 'vue'

export interface FormPlugin {
  name: string
  install: (form: any) => void
}

export interface FormPluginsOptions {
  plugins?: FormPlugin[]
}

export function useFormPlugins(options: FormPluginsOptions = {}) {
  const plugins = ref<FormPlugin[]>(options.plugins || [])
  const installed = reactive<Record<string, boolean>>({})

  const install = (plugin: FormPlugin, form: any) => {
    if (!installed[plugin.name]) {
      plugin.install(form)
      installed[plugin.name] = true
    }
  }

  const installAll = (form: any) => {
    plugins.value.forEach(plugin => {
      install(plugin, form)
    })
  }

  const addPlugin = (plugin: FormPlugin) => {
    plugins.value.push(plugin)
  }

  const removePlugin = (name: string) => {
    const index = plugins.value.findIndex(p => p.name === name)
    if (index > -1) {
      plugins.value.splice(index, 1)
      delete installed[name]
    }
  }

  return {
    plugins,
    installed,
    install,
    installAll,
    addPlugin,
    removePlugin
  }
}
