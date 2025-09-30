import { defineComponent, ref, reactive, computed, watch } from 'vue'
import { ElForm, ElFormItem, ElButton, ElRow, ElCol } from 'element-plus'
import { useFormAction, useFormApi, useFormPlugins, useFormTabs } from './helper'

export default defineComponent({
  name: 'BtcForm',
  props: {
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
    inline: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String as () => 'left' | 'right' | 'top',
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: 'auto'
    },
    size: {
      type: String as () => 'default' | 'small' | 'large',
      default: 'default'
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    showAction: {
      type: Boolean,
      default: true
    },
    actionConfig: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['submit', 'reset', 'change'],
  setup(props, { emit, slots }) {
    const formRef = ref()
    
    // 使用 helper hooks
    const { config: actionConfig, loading: actionLoading, save, close } = useFormAction(props.actionConfig)
    const { form: apiForm, loading: apiLoading, add, update, reset: resetForm } = useFormApi()
    const { installAll } = useFormPlugins()
    const { tabs, activeTab, currentItems } = useFormTabs()

    // 合并表单数据
    const formData = computed(() => ({
      ...props.form,
      ...apiForm.value
    }))

    // 合并加载状态
    const isLoading = computed(() => props.loading || actionLoading.value || apiLoading.value)

    // 表单验证
    const validate = async () => {
      if (!formRef.value) return false
      try {
        await formRef.value.validate()
        return true
      } catch (error) {
        return false
      }
    }

    // 重置表单
    const reset = () => {
      if (formRef.value) {
        formRef.value.resetFields()
      }
      resetForm()
      emit('reset')
    }

    // 提交表单
    const submit = async () => {
      const isValid = await validate()
      if (!isValid) return

      await save(async () => {
        emit('submit', formData.value)
      })
    }

    // 表单变化
    const handleChange = (value: any, field: string) => {
      emit('change', value, field, formData.value)
    }

    // 渲染表单项
    const renderFormItem = (item: any) => {
      const { prop, label, component, span = 24, ...itemProps } = item

      return (
        <ElCol span={span} key={prop}>
          <ElFormItem
            label={label}
            prop={prop}
            {...itemProps}
          >
              {slots[`form-${prop}`]?.({ 
              value: (formData.value as any)[prop], 
              onChange: (value: any) => handleChange(value, prop),
              disabled: props.disabled || itemProps.disabled,
              ...itemProps 
            }) || (
              <component
                modelValue={(formData.value as any)[prop]}
                onUpdate:modelValue={(value: any) => handleChange(value, prop)}
                disabled={props.disabled || itemProps.disabled}
                {...itemProps}
              />
            )}
          </ElFormItem>
        </ElCol>
      )
    }

    // 渲染操作按钮
    const renderAction = () => {
      if (!props.showAction || actionConfig.hidden) return null

      return (
        <ElRow>
          <ElCol span={24}>
            <div class="btc-form-action" style={{ justifyContent: actionConfig.justify }}>
              {actionConfig.buttons.includes('close') && (
                <ElButton onClick={() => close()}>
                  {actionConfig.closeButtonText}
                </ElButton>
              )}
              {actionConfig.buttons.includes('save') && (
                <ElButton 
                  type="primary" 
                  loading={isLoading.value}
                  onClick={submit}
                >
                  {actionConfig.saveButtonText}
                </ElButton>
              )}
              {slots.action?.()}
            </div>
          </ElCol>
        </ElRow>
      )
    }

    return () => (
      <ElForm
        ref={formRef}
        model={formData.value}
        rules={props.rules}
        inline={props.inline}
        labelPosition={props.labelPosition}
        labelWidth={props.labelWidth}
        size={props.size}
        disabled={props.disabled}
      >
        <ElRow gutter={20}>
          {props.items.map(renderFormItem)}
        </ElRow>
        {renderAction()}
      </ElForm>
    )
  }
})
