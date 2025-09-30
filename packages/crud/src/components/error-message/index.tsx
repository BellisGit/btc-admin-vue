import { defineComponent, computed } from 'vue'
import { ElAlert } from 'element-plus'

export default defineComponent({
  name: 'BtcErrorMessage',
  props: {
    error: {
      type: [String, Error, Object],
      default: null
    },
    title: {
      type: String,
      default: '错误'
    },
    type: {
      type: String as () => 'error' | 'primary' | 'success' | 'warning' | 'info',
      default: 'error'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  setup(props, { emit, slots }) {
    const errorMessage = computed(() => {
      if (!props.error) return ''
      
      if (typeof props.error === 'string') {
        return props.error
      }
      
      if (props.error instanceof Error) {
        return props.error.message
      }
      
      if (typeof props.error === 'object' && props.error.message) {
        return props.error.message
      }
      
      return '未知错误'
    })

    const handleClose = () => {
      emit('close')
    }

    return () => {
      if (!props.error) return null

      return (
        <ElAlert
          title={props.title}
          type={props.type}
          showIcon={props.showIcon}
          closable={props.closable}
          center={props.center}
          description={props.description || errorMessage.value}
          onClose={handleClose}
        >
          {{
            default: () => slots.default?.() || errorMessage.value
          }}
        </ElAlert>
      )
    }
  }
})
