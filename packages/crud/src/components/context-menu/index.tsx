import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

export interface ContextMenuItem {
  label: string
  icon?: string
  disabled?: boolean
  divided?: boolean
  onClick?: (row: any, index: number) => void
}

export default defineComponent({
  name: 'BtcContextMenu',
  props: {
    items: {
      type: Array as () => ContextMenuItem[],
      default: () => []
    },
    trigger: {
      type: String as () => 'click' | 'focus' | 'contextmenu' | 'hover',
      default: 'contextmenu'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  emits: ['command'],
  setup(props, { emit, slots }) {
    const dropdownRef = ref()
    const visible = ref(false)

    const handleCommand = (command: string, row: any, index: number) => {
      const item = props.items.find(item => item.label === command)
      if (item?.onClick) {
        item.onClick(row, index)
      }
      emit('command', command, row, index)
    }

    const handleContextMenu = (event: MouseEvent, row: any, index: number) => {
      event.preventDefault()
      event.stopPropagation()
      
      if (dropdownRef.value) {
        dropdownRef.value.handleOpen()
      }
    }

    const renderMenuItem = (item: ContextMenuItem, index: number) => {
      return (
        <ElDropdownItem
          key={index}
          command={item.label}
          disabled={item.disabled}
          divided={item.divided}
        >
          {item.icon && <i class={item.icon} />}
          {item.label}
        </ElDropdownItem>
      )
    }

    return () => (
      <ElDropdown
        ref={dropdownRef}
        trigger={props.trigger}
        placement={props.placement}
        hideOnClick={props.hideOnClick}
        onCommand={(command: string) => handleCommand(command, null, -1)}
      >
        {{
          default: () => slots.default?.(),
          dropdown: () => (
            <ElDropdownMenu>
              {props.items.map(renderMenuItem)}
            </ElDropdownMenu>
          )
        }}
      </ElDropdown>
    )
  }
})
