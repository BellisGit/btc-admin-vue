import { defineComponent, ref, reactive, computed } from 'vue'
import { ElSelect, ElOption, ElCascader, ElDatePicker, ElInput } from 'element-plus'

export interface FilterOption {
  label: string
  value: any
  children?: FilterOption[]
}

export interface FilterItem {
  prop: string
  label: string
  type: 'select' | 'cascader' | 'date' | 'daterange' | 'input'
  options?: FilterOption[]
  placeholder?: string
  clearable?: boolean
  multiple?: boolean
  filterable?: boolean
}

export default defineComponent({
  name: 'BtcFilter',
  props: {
    items: {
      type: Array as () => FilterItem[],
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => ({})
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const filterData = reactive({ ...props.modelValue })

    const handleChange = (value: any, prop: string) => {
      filterData[prop] = value
      emit('update:modelValue', { ...filterData })
      emit('change', value, prop, filterData)
    }

    const renderFilterItem = (item: FilterItem) => {
      const { prop, label, type, options = [], placeholder, clearable = true, multiple = false, filterable = false } = item

      switch (type) {
        case 'select':
          return (
            <ElSelect
              modelValue={filterData[prop]}
              placeholder={placeholder || `请选择${label}`}
              clearable={clearable}
              multiple={multiple}
              filterable={filterable}
              onUpdate:modelValue={(value: any) => handleChange(value, prop)}
            >
              {options.map(option => (
                <ElOption
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </ElSelect>
          )

        case 'cascader':
          return (
            <ElCascader
              modelValue={filterData[prop]}
              options={options as any}
              placeholder={placeholder || `请选择${label}`}
              clearable={clearable}
              onUpdate:modelValue={(value: any) => handleChange(value, prop)}
            />
          )

        case 'date':
          return (
            <ElDatePicker
              modelValue={filterData[prop]}
              type="date"
              placeholder={placeholder || `请选择${label}`}
              clearable={clearable}
              onUpdate:modelValue={(value: any) => handleChange(value, prop)}
            />
          )

        case 'daterange':
          return (
            <ElDatePicker
              modelValue={filterData[prop]}
              type="daterange"
              placeholder={placeholder || `请选择${label}`}
              clearable={clearable}
              onUpdate:modelValue={(value: any) => handleChange(value, prop)}
            />
          )

        case 'input':
          return (
            <ElInput
              modelValue={filterData[prop]}
              placeholder={placeholder || `请输入${label}`}
              clearable={clearable}
              onUpdate:modelValue={(value: any) => handleChange(value, prop)}
            />
          )

        default:
          return slots[`filter-${prop}`]?.({ 
            value: filterData[prop], 
            onChange: (value: any) => handleChange(value, prop),
            item 
          })
      }
    }

    return () => (
      <div class="btc-filter">
        {props.items.map(item => (
          <div key={item.prop} class="btc-filter-item">
            <label class="btc-filter-label">{item.label}:</label>
            <div class="btc-filter-control">
              {renderFilterItem(item)}
            </div>
          </div>
        ))}
      </div>
    )
  }
})
