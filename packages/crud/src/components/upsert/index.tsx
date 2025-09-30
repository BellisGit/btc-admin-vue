import { defineComponent, ref, computed, watch, inject } from 'vue'
import { ElDialog, ElForm, ElButton, ElSpace } from 'element-plus'
import { Close, Check } from '@element-plus/icons-vue'
import BtcForm from '../form'
import { crudProvideKey } from '../../provide'

export default defineComponent({
  name: 'BtcUpsert',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    items: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    append: {
      type: Boolean,
      default: false
    },
    showAction: {
      type: Boolean,
      default: true
    },
    saveButtonText: {
      type: String,
      default: '保存'
    },
    closeButtonText: {
      type: String,
      default: '关闭'
    }
  },
  emits: ['update:visible', 'submit', 'reset', 'change'],
  setup(props, { emit, slots }) {
    const formRef = ref()
    const crud = inject(crudProvideKey)

    const isVisible = computed({
      get: () => props.visible,
      set: (value) => emit('update:visible', value)
    })

    const dialogTitle = computed(() => {
      if (props.title) return props.title
      return props.append ? '新增' : '编辑'
    })

    // 监听表单数据变化
    watch(() => props.form, (newForm) => {
      if (formRef.value) {
        formRef.value.form = newForm
      }
    }, { deep: true })

    // 提交表单
    const handleSubmit = (formData: any) => {
      emit('submit', formData)
      if (crud?.save) {
        crud.save()
      }
    }

    // 重置表单
    const handleReset = () => {
      emit('reset')
    }

    // 表单变化
    const handleChange = (value: any, field: string, formData: any) => {
      emit('change', value, field, formData)
    }

    // 关闭对话框
    const handleClose = () => {
      isVisible.value = false
      if (crud?.close) {
        crud.close()
      }
    }

    return () => (
      <ElDialog
        v-model={isVisible.value}
        title={dialogTitle.value}
        width={props.width}
        onClose={handleClose}
      >
        <BtcForm
          ref={formRef}
          items={props.items}
          form={props.form}
          loading={props.loading}
          disabled={props.disabled}
          rules={props.rules}
          showAction={false}
          onSubmit={handleSubmit}
          onReset={handleReset}
          onChange={handleChange}
        >
          {slots}
        </BtcForm>
        
        {{
          footer: () => props.showAction ? (
            <ElSpace>
              <ElButton
                icon={Close}
                onClick={handleClose}
              >
                {props.closeButtonText}
              </ElButton>
              <ElButton
                type="primary"
                icon={Check}
                loading={props.loading}
                onClick={() => formRef.value?.submit()}
              >
                {props.saveButtonText}
              </ElButton>
            </ElSpace>
          ) : slots.footer?.()
        }}
      </ElDialog>
    )
  }
})
