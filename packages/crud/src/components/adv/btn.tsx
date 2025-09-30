import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { Filter } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'BtcAdvBtn',
  props: {
    text: {
      type: String,
      default: '高级搜索'
    },
    icon: {
      type: [String, Object],
      default: () => Filter
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
  emits: ['click'],
  setup(props, { emit, slots }) {
    const handleClick = () => {
      emit('click')
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
