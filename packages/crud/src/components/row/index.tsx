import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtcRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: [Number, String],
      default: 0
    },
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    },
    wrap: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    return () => {
      const Tag = props.tag as any
      const style = {
        marginLeft: `-${props.gutter}px`,
        marginRight: `-${props.gutter}px`
      }

      const classes = [
        'btc-row',
        `btc-row--${props.justify}`,
        `btc-row--${props.align}`,
        {
          'btc-row--nowrap': !props.wrap
        }
      ]

      return (
        <Tag class={classes} style={style}>
          {slots.default?.()}
        </Tag>
      )
    }
  }
})
