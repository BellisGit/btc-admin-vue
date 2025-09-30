import { defineComponent, computed } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { useFormTabs } from '../form/helper'

export default defineComponent({
  name: 'BtcFormTabs',
  props: {
    tabs: {
      type: Array as () => any[],
      default: () => []
    },
    activeTab: {
      type: String,
      default: ''
    },
    type: {
      type: String as () => 'card' | 'border-card',
      default: 'card'
    },
    position: {
      type: String,
      default: 'top'
    },
    closable: {
      type: Boolean,
      default: false
    },
    addable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['tab-click', 'tab-remove', 'tab-add'],
  setup(props, { emit, slots }) {
    const { tabs, activeTab, setActiveTab } = useFormTabs({
      tabs: props.tabs,
      activeTab: props.activeTab
    })

    const handleTabClick = (tab: any) => {
      setActiveTab(tab.name)
      emit('tab-click', tab)
    }

    const handleTabRemove = (name: any) => {
      emit('tab-remove', name)
    }

    const handleTabAdd = () => {
      emit('tab-add')
    }

    return () => (
      <ElTabs
        v-model={activeTab.value}
        type={props.type}
        {...(props.position && { position: props.position })}
        closable={props.closable}
        addable={props.addable}
        onTabClick={handleTabClick}
        onTabRemove={handleTabRemove}
        onTabAdd={handleTabAdd}
      >
        {tabs.value.map((tab: any) => (
          <ElTabPane
            key={tab.name}
            label={tab.label}
            name={tab.name}
            disabled={tab.disabled}
          >
            {slots[`tab-${tab.name}`]?.() || slots.default?.()}
          </ElTabPane>
        ))}
      </ElTabs>
    )
  }
})
