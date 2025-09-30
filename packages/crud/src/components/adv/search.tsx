import { defineComponent, ref, reactive, computed } from 'vue'
import { ElDialog, ElForm, ElFormItem, ElButton, ElRow, ElCol, ElSpace } from 'element-plus'
import { Search, Refresh, Close } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'BtcAdvSearch',
  props: {
    visible: {
      type: Boolean,
      default: false
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
    title: {
      type: String,
      default: '高级搜索'
    },
    width: {
      type: String,
      default: '50%'
    },
    colSpan: {
      type: Number,
      default: 12
    }
  },
  emits: ['update:visible', 'search', 'reset', 'change'],
  setup(props, { emit, slots }) {
    const formRef = ref()
    const searchForm = reactive({ ...props.form })

    const isVisible = computed({
      get: () => props.visible,
      set: (value) => emit('update:visible', value)
    })

    // 搜索
    const handleSearch = () => {
      emit('search', searchForm)
      isVisible.value = false
    }

    // 重置
    const handleReset = () => {
      if (formRef.value) {
        formRef.value.resetFields()
      }
      Object.keys(searchForm).forEach(key => {
        searchForm[key] = undefined
      })
      emit('reset')
    }

    // 关闭
    const handleClose = () => {
      isVisible.value = false
    }

    // 表单变化
    const handleChange = (value: any, field: string) => {
      searchForm[field] = value
      emit('change', value, field, searchForm)
    }

    // 渲染表单项
    const renderFormItem = (item: any) => {
      const { prop, label, component, span = props.colSpan, ...itemProps } = item

      return (
        <ElCol span={span} key={prop}>
          <ElFormItem
            label={label}
            prop={prop}
            {...itemProps}
          >
            {slots[`adv-${prop}`]?.({ 
              value: searchForm[prop], 
              onChange: (value: any) => handleChange(value, prop),
              ...itemProps 
            }) || (
              <component
                modelValue={searchForm[prop]}
                onUpdate:modelValue={(value: any) => handleChange(value, prop)}
                {...itemProps}
              />
            )}
          </ElFormItem>
        </ElCol>
      )
    }

    return () => (
      <ElDialog
        v-model={isVisible.value}
        title={props.title}
        width={props.width}
        onClose={handleClose}
      >
        <ElForm
          ref={formRef}
          model={searchForm}
          labelWidth="100px"
        >
          <ElRow gutter={20}>
            {props.items.map(renderFormItem)}
          </ElRow>
        </ElForm>
        
        {{
          footer: () => (
            <ElSpace>
              <ElButton onClick={handleClose}>
                取消
              </ElButton>
              <ElButton
                icon={Refresh}
                onClick={handleReset}
              >
                重置
              </ElButton>
              <ElButton
                type="primary"
                icon={Search}
                loading={props.loading}
                onClick={handleSearch}
              >
                搜索
              </ElButton>
            </ElSpace>
          )
        }}
      </ElDialog>
    )
  }
})
