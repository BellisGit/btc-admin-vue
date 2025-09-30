<template>
  <div class="btc-component-overview">
    <!-- 头部统计信息 -->
    <OverviewHeader :stats="stats" />
    
    <!-- 搜索和筛选 -->
    <OverviewControls 
      v-model:search="searchQuery"
      v-model:tab="activeTab"
      v-model:type="selectedType"
      @tab-change="handleTabChange"
    />
    
    <!-- 组件列表 -->
    <ComponentGrid 
      :components="filteredComponents"
      @select="selectComponent"
      @migrate="migrateComponent"
      @open-docs="openDocumentation"
    />
    
    <!-- 组件详情弹窗 -->
    <ComponentDetailDialog
      v-model="showDetailDialog"
      :component="selectedComponent"
      @close="closeDetailDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { componentRegistry, type ComponentMetadata } from '../ComponentRegistry'
import OverviewHeader from './components/OverviewHeader.vue'
import OverviewControls from './components/OverviewControls.vue'
import ComponentGrid from './components/ComponentGrid.vue'
import ComponentDetailDialog from './components/ComponentDetailDialog.vue'

// 响应式数据
const searchQuery = ref('')
const activeTab = ref('all')
const selectedType = ref('')
const showDetailDialog = ref(false)
const selectedComponent = ref<ComponentMetadata | null>(null)

// 计算属性
const stats = computed(() => componentRegistry.getStats())
const filteredComponents = computed(() => {
  let filtered = componentRegistry.getAll()

  // 按作用域筛选
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(c => c.scope === activeTab.value)
  }

  // 按类型筛选
  if (selectedType.value) {
    filtered = filtered.filter(c => c.type === selectedType.value)
  }

  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// 方法
const handleTabChange = (tab: string) => {
  activeTab.value = tab
}

const selectComponent = (component: ComponentMetadata) => {
  selectedComponent.value = component
  showDetailDialog.value = true
}

const closeDetailDialog = () => {
  showDetailDialog.value = false
  selectedComponent.value = null
}

const openDocumentation = (component: ComponentMetadata) => {
  if (component.documentation) {
    console.log(`打开文档: ${component.documentation}`)
  }
}

const migrateComponent = (component: ComponentMetadata) => {
  console.log(`开始迁移组件: ${component.name}`)
}
</script>

<style scoped>
.btc-component-overview {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
