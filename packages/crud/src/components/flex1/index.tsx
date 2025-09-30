import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtcFlex1',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, { slots }) {
    return () => {
      const Tag = props.tag as any
      return (
        <Tag class="btc-flex-1">
          {slots.default?.()}
        </Tag>
      )
    }
  }
})
