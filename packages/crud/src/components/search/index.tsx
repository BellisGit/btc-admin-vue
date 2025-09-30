import { defineComponent, ref, reactive, computed, inject } from 'vue'
import { ElForm, ElFormItem, ElButton, ElRow, ElCol, ElSpace } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'
import { useSearchPlugins } from './helper/plugins'
import { crudProvideKey } from '../../provide'

export default defineComponent({
  name: 'BtcSearch',
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
    inline: {
      type: Boolean,
      default: true
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
    showSearch: {
      type: Boolean,
      default: true
    },
    showReset: {
      type: Boolean,
      default: true
    },
    searchText: {
      type: String,
      default: '搜索'
    },
    resetText: {
      type: String,
      default: '重置'
    },
    colSpan: {
      type: Number,
      default: 6
    }
  },
  emits: ['search', 'reset', 'change'],
  setup(props, { emit, slots }) {
    const formRef = ref()
    const crud = inject(crudProvideKey)
    
    const searchForm = reactive({ ...props.form })
    const { installAll } = useSearchPlugins()

    // 搜索
    const handleSearch = () => {
      emit('search', searchForm)
      if (crud?.searchSubmit) {
        crud.searchSubmit(searchForm)
      }
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
      if (crud?.resetSearch) {
        crud.resetSearch()
      }
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
            {slots[`search-${prop}`]?.({ 
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

    // 渲染操作按钮
    const renderAction = () => {
      return (
        <ElCol span={props.colSpan}>
          <ElFormItem>
            <ElSpace>
              {props.showSearch && (
                <ElButton
                  type="primary"
                  icon={Search}
                  loading={props.loading}
                  onClick={handleSearch}
                >
                  {props.searchText}
                </ElButton>
              )}
              {props.showReset && (
                <ElButton
                  icon={Refresh}
                  onClick={handleReset}
                >
                  {props.resetText}
                </ElButton>
              )}
              {slots.action?.()}
            </ElSpace>
          </ElFormItem>
        </ElCol>
      )
    }

    return () => (
      <ElForm
        ref={formRef}
        model={searchForm}
        inline={props.inline}
        labelPosition={props.labelPosition}
        labelWidth={props.labelWidth}
        size={props.size}
      >
        <ElRow gutter={20}>
          {props.items.map(renderFormItem)}
          {renderAction()}
        </ElRow>
      </ElForm>
    )
  }
})
