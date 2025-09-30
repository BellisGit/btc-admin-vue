import { defineComponent, inject, computed } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { crudProvideKey } from '../../provide'

export default defineComponent({
  name: 'BtcMultiDeleteBtn',
  props: {
    text: {
      type: String,
      default: '批量删除'
    },
    icon: {
      type: [String, Object],
      default: () => Delete
    },
    size: {
      type: String as () => 'default' | 'small' | 'large',
      default: 'default'
    },
    type: {
      type: String as () => 'default' | 'text' | 'primary' | 'success' | 'warning' | 'info' | 'danger',
      default: 'danger'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const crud = inject(crudProvideKey)

    const isDisabled = computed(() => {
      return props.disabled || !crud?.selection?.value?.length
    })

    const handleClick = () => {
      if (!crud?.selection?.value?.length) {
        ElMessage.warning('请选择要删除的数据')
        return
      }

      if (crud?.batchDelete) {
        crud.batchDelete()
      }
    }

    return () => (
      <ElButton
        type={props.type}
        size={props.size}
        icon={props.icon}
        disabled={isDisabled.value}
        onClick={handleClick}
      >
        {slots.default?.() || props.text}
      </ElButton>
    )
  }
})
