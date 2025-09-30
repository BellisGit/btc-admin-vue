import { defineComponent, ref, computed } from 'vue'
import { ElInput, ElButton, ElSpace } from 'element-plus'
import { Search, Close } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'BtcSearchKey',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    },
    size: {
      type: String as () => 'default' | 'small' | 'large',
      default: 'default'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    showSearchButton: {
      type: Boolean,
      default: true
    },
    searchButtonText: {
      type: String,
      default: '搜索'
    }
  },
  emits: ['update:value', 'search', 'clear'],
  setup(props, { emit, slots }) {
    const inputRef = ref()
    const searchValue = ref(props.value)

    const handleInput = (value: string) => {
      searchValue.value = value
      emit('update:value', value)
    }

    const handleSearch = () => {
      emit('search', searchValue.value)
    }

    const handleClear = () => {
      searchValue.value = ''
      emit('update:value', '')
      emit('clear')
    }

    const handleKeyup = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSearch()
      }
    }

    return () => (
      <ElSpace>
        <ElInput
          ref={inputRef}
          modelValue={searchValue.value}
          placeholder={props.placeholder}
          size={props.size}
          clearable={props.clearable}
          onUpdate:modelValue={handleInput}
          {...({ onKeyup: handleKeyup })}
          onClear={handleClear}
        >
          {{
            append: () => props.showSearchButton ? (
              <ElButton
                type="primary"
                icon={Search}
                onClick={handleSearch}
              >
                {props.searchButtonText}
              </ElButton>
            ) : null
          }}
        </ElInput>
        {slots.default?.()}
      </ElSpace>
    )
  }
})
