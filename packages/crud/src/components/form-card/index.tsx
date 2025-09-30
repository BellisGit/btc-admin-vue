import { defineComponent } from 'vue'
import { ElCard } from 'element-plus'

export default defineComponent({
  name: 'BtcFormCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    shadow: {
      type: String as () => 'always' | 'never' | 'hover',
      default: 'always'
    },
    bodyStyle: {
      type: Object,
      default: () => ({})
    },
    headerStyle: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    return () => (
      <ElCard
        shadow={props.shadow}
        bodyStyle={props.bodyStyle}
        {...(props.headerStyle && { headerStyle: props.headerStyle })}
      >
        {{
          header: () => props.title ? <span>{props.title}</span> : slots.header?.(),
          default: () => slots.default?.(),
          footer: () => slots.footer?.()
        }}
      </ElCard>
    )
  }
})
