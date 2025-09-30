import { ref, reactive, computed } from 'vue'

export interface FormTab {
  label: string
  name: string
  items: any[]
  disabled?: boolean
}

export interface FormTabsOptions {
  tabs?: FormTab[]
  activeTab?: string
  type?: string
  position?: string
}

export function useFormTabs(options: FormTabsOptions = {}) {
  const tabs = ref<FormTab[]>(options.tabs || [])
  const activeTab = ref(options.activeTab || '')
  const type = ref(options.type || 'card')
  const position = ref(options.position || 'top')

  const currentTab = computed(() => {
    return tabs.value.find(tab => tab.name === activeTab.value)
  })

  const currentItems = computed(() => {
    return currentTab.value?.items || []
  })

  const addTab = (tab: FormTab) => {
    tabs.value.push(tab)
    if (!activeTab.value) {
      activeTab.value = tab.name
    }
  }

  const removeTab = (name: string) => {
    const index = tabs.value.findIndex(tab => tab.name === name)
    if (index > -1) {
      tabs.value.splice(index, 1)
      if (activeTab.value === name) {
        activeTab.value = tabs.value[0]?.name || ''
      }
    }
  }

  const setActiveTab = (name: string) => {
    const tab = tabs.value.find(tab => tab.name === name)
    if (tab && !tab.disabled) {
      activeTab.value = name
    }
  }

  return {
    tabs,
    activeTab,
    type,
    position,
    currentTab,
    currentItems,
    addTab,
    removeTab,
    setActiveTab
  }
}
