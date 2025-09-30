<template>
  <div class="tab-ink-example">
    <h3>TabInk 组件使用示例</h3>
    
    <!-- 基础用法 -->
    <div class="example-section">
      <h4>基础用法</h4>
      <div class="tabs">
        <div 
          v-for="(tab, index) in basicTabs" 
          :key="tab.id"
          class="btc-tab-item"
          :class="{ active: index === basicActiveIndex }"
          @click="basicActiveIndex = index"
        >
          {{ tab.label }}
        </div>
        <BtcTabInk :activeIndex="basicActiveIndex" :tabs="basicTabs" />
      </div>
    </div>

    <!-- 自定义配置 -->
    <div class="example-section">
      <h4>自定义配置</h4>
      <div class="tabs">
        <div 
          v-for="(tab, index) in customTabs" 
          :key="tab.id"
          class="btc-tab-item"
          :class="{ active: index === customActiveIndex }"
          @click="customActiveIndex = index"
        >
          {{ tab.label }}
        </div>
        <BtcTabInk 
          :activeIndex="customActiveIndex" 
          :tabs="customTabs"
          :duration="500"
          color="#ff6b6b"
          :height="3"
        />
      </div>
    </div>

    <!-- 动态标签 -->
    <div class="example-section">
      <h4>动态标签</h4>
      <div class="controls">
        <button @click="addTab">添加标签</button>
        <button @click="removeTab">删除标签</button>
        <button @click="shuffleTabs">随机排序</button>
      </div>
      <div class="tabs">
        <div 
          v-for="(tab, index) in dynamicTabs" 
          :key="tab.id"
          class="btc-tab-item"
          :class="{ active: index === dynamicActiveIndex }"
          @click="dynamicActiveIndex = index"
        >
          {{ tab.label }}
        </div>
        <BtcTabInk :activeIndex="dynamicActiveIndex" :tabs="dynamicTabs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BtcTabInk from './index.vue'
import type { TabItem } from './types'

// 基础用法
const basicActiveIndex = ref(0)
const basicTabs = ref<TabItem[]>([
  { id: 1, label: '首页' },
  { id: 2, label: '产品' },
  { id: 3, label: '关于我们' }
])

// 自定义配置
const customActiveIndex = ref(1)
const customTabs = ref<TabItem[]>([
  { id: 1, label: '设置' },
  { id: 2, label: '账户' },
  { id: 3, label: '安全' },
  { id: 4, label: '通知' }
])

// 动态标签
const dynamicActiveIndex = ref(0)
const dynamicTabs = ref<TabItem[]>([
  { id: 1, label: '标签1' },
  { id: 2, label: '标签2' },
  { id: 3, label: '标签3' }
])

let nextId = 4

const addTab = () => {
  dynamicTabs.value.push({
    id: nextId++,
    label: `标签${nextId - 1}`
  })
}

const removeTab = () => {
  if (dynamicTabs.value.length > 1) {
    dynamicTabs.value.pop()
    if (dynamicActiveIndex.value >= dynamicTabs.value.length) {
      dynamicActiveIndex.value = dynamicTabs.value.length - 1
    }
  }
}

const shuffleTabs = () => {
  const shuffled = [...dynamicTabs.value].sort(() => Math.random() - 0.5)
  dynamicTabs.value = shuffled
  dynamicActiveIndex.value = 0
}
</script>

<style scoped>
.tab-ink-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.example-section {
  margin-bottom: 40px;
}

.example-section h4 {
  margin-bottom: 16px;
  color: var(--el-text-color-primary);
}

.tabs {
  position: relative;
  display: flex;
  border-bottom: 1px solid var(--el-border-color-light);
  margin-bottom: 20px;
}

.btc-tab-item {
  padding: 12px 24px;
  cursor: pointer;
  color: var(--el-text-color-regular);
  transition: color 0.3s ease;
  user-select: none;
  white-space: nowrap;
}

.btc-tab-item:hover {
  color: var(--el-color-primary);
}

.btc-tab-item.active {
  color: var(--el-color-primary);
  font-weight: 500;
}

.controls {
  margin-bottom: 16px;
}

.controls button {
  margin-right: 8px;
  padding: 6px 12px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  background: var(--el-bg-color);
  color: var(--el-text-color-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.controls button:hover {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}

/* 暗色主题支持 */
.dark .btc-tab-item {
  color: var(--el-text-color-regular);
}

.dark .btc-tab-item:hover {
  color: var(--el-color-primary-light-3);
}

.dark .btc-tab-item.active {
  color: var(--el-color-primary-light-3);
}
</style>
