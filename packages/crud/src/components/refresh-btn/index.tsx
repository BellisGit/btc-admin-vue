import { defineComponent, inject } from 'vue'
import { ElButton } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { crudProvideKey } from '../../provide'

export default defineComponent({
  name: 'BtcRefreshBtn',
  props: {
    text: {
      type: String,
      default: '刷新'
    },
    icon: {
      type: [String, Object],
      default: () => Refresh
    },
    size: {
      type: String as () => 'default' | 'small' | 'large',
      default: 'default'
    },
    type: {
      type: String as () => 'default' | 'text' | 'primary' | 'success' | 'warning' | 'info' | 'danger',
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const crud = inject(crudProvideKey)

    const handleClick = () => {
      if (crud?.refresh) {
        crud.refresh()
      }
    }

    return () => (
      <ElButton
        type={props.type}
        size={props.size}
        icon={props.icon}
        disabled={props.disabled}
        onClick={handleClick}
      >
        {slots.default?.() || props.text}
      </ElButton>
    )
  }
})
