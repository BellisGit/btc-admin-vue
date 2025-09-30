import { defineComponent, computed } from 'vue'
import { ElDialog } from 'element-plus'

export default defineComponent({
  name: 'BtcDialog',
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
    height: {
      type: String,
      default: 'auto'
    },
    top: {
      type: String,
      default: '15vh'
    },
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    beforeClose: {
      type: Function,
      default: undefined
    },
    center: {
      type: Boolean,
      default: false
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible', 'open', 'opened', 'close', 'closed'],
  setup(props, { emit, slots }) {
    const isVisible = computed({
      get: () => props.visible,
      set: (value) => emit('update:visible', value)
    })

    const handleOpen = () => {
      emit('open')
    }

    const handleOpened = () => {
      emit('opened')
    }

    const handleClose = () => {
      emit('close')
    }

    const handleClosed = () => {
      emit('closed')
    }

    return () => (
      <ElDialog
        v-model={isVisible.value}
        title={props.title}
        width={props.width}
        {...(props.height && { height: props.height })}
        top={props.top}
        modal={props.modal}
        lockScroll={props.lockScroll}
        closeOnClickModal={props.closeOnClickModal}
        closeOnPressEscape={props.closeOnPressEscape}
        showClose={props.showClose}
        beforeClose={props.beforeClose as any}
        center={props.center}
        destroyOnClose={props.destroyOnClose}
        draggable={props.draggable}
        fullscreen={props.fullscreen}
        onOpen={handleOpen}
        onOpened={handleOpened}
        onClose={handleClose}
        onClosed={handleClosed}
      >
        {{
          header: () => props.title ? <span>{props.title}</span> : slots.header?.(),
          default: () => slots.default?.(),
          footer: () => slots.footer?.()
        }}
      </ElDialog>
    )
  }
})
