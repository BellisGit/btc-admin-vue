import { ref, reactive } from 'vue'

export interface SearchPlugin {
  name: string
  install: (search: any) => void
}

export interface SearchPluginsOptions {
  plugins?: SearchPlugin[]
}

export function useSearchPlugins(options: SearchPluginsOptions = {}) {
  const plugins = ref<SearchPlugin[]>(options.plugins || [])
  const installed = reactive<Record<string, boolean>>({})

  const install = (plugin: SearchPlugin, search: any) => {
    if (!installed[plugin.name]) {
      plugin.install(search)
      installed[plugin.name] = true
    }
  }

  const installAll = (search: any) => {
    plugins.value.forEach(plugin => {
      install(plugin, search)
    })
  }

  const addPlugin = (plugin: SearchPlugin) => {
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
