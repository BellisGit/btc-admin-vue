import { defineComponent, computed, inject } from 'vue'
import { ElPagination } from 'element-plus'
import { crudProvideKey } from '../../provide'

export default defineComponent({
  name: 'BtcPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array as () => number[],
      default: () => [10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:page', 'update:size', 'change'],
  setup(props, { emit }) {
    const crud = inject(crudProvideKey)

    const currentPage = computed({
      get: () => props.page,
      set: (value) => {
        emit('update:page', value)
        emit('change', { page: value, size: props.size })
        if (crud?.pageChange) {
          crud.pageChange(value)
        }
      }
    })

    const currentSize = computed({
      get: () => props.size,
      set: (value) => {
        emit('update:size', value)
        emit('change', { page: 1, size: value })
        if (crud?.sizeChange) {
          crud.sizeChange(value)
        }
      }
    })

    return () => (
      <ElPagination
        v-model:currentPage={currentPage.value}
        v-model:pageSize={currentSize.value}
        total={props.total}
        pageSizes={props.pageSizes}
        layout={props.layout}
        background={props.background}
        small={props.small}
        disabled={props.disabled}
        hideOnSinglePage={props.hideOnSinglePage}
      />
    )
  }
})
