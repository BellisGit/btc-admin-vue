import { defineComponent, inject } from 'vue'
import { ElButton } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { crudProvideKey } from '../../provide'

export default defineComponent({
  name: 'BtcAddBtn',
  props: {
    text: {
      type: String,
      default: '新增'
    },
    icon: {
      type: [String, Object],
      default: () => Plus
    },
    size: {
      type: String as () => 'default' | 'small' | 'large',
      default: 'default'
    },
    type: {
      type: String as () => 'default' | 'text' | 'primary' | 'success' | 'warning' | 'info' | 'danger',
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const crud = inject(crudProvideKey)

    const handleClick = () => {
      if (crud?.add) {
        crud.add()
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
