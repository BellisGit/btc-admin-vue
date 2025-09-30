import { defineComponent, h } from 'vue'

export interface RenderOptions {
  type?: string
  props?: Record<string, any>
  children?: any
}

export default defineComponent({
  name: 'BtcTableRender',
  props: {
    render: {
      type: Function,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: undefined
    }
  },
  setup(props) {
    return () => {
      const { render, row, column, index, value } = props
      return render(row, column, value, index)
    }
  }
})
