import { ref, reactive } from 'vue'

export interface TablePlugin {
  name: string
  install: (table: any) => void
}

export interface TablePluginsOptions {
  plugins?: TablePlugin[]
}

export function useTablePlugins(options: TablePluginsOptions = {}) {
  const plugins = ref<TablePlugin[]>(options.plugins || [])
  const installed = reactive<Record<string, boolean>>({})

  const install = (plugin: TablePlugin, table: any) => {
    if (!installed[plugin.name]) {
      plugin.install(table)
      installed[plugin.name] = true
    }
  }

  const installAll = (table: any) => {
    plugins.value.forEach(plugin => {
      install(plugin, table)
    })
  }

  const addPlugin = (plugin: TablePlugin) => {
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
