import { defineComponent, computed } from 'vue'
import { ElTableColumn } from 'element-plus'

export interface TableColumn {
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  fixed?: boolean | string
  sortable?: boolean | string
  resizable?: boolean
  showOverflowTooltip?: boolean
  align?: string
  headerAlign?: string
  className?: string
  labelClassName?: string
  formatter?: (row: any, column: any, cellValue: any, index: number) => any
  render?: (row: any, column: any, cellValue: any, index: number) => any
  children?: TableColumn[]
}

export default defineComponent({
  name: 'BtcTableHeader',
  props: {
    columns: {
      type: Array as () => TableColumn[],
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { slots }) {
    const renderColumn = (column: TableColumn) => {
      const { prop, label, width, minWidth, fixed, sortable, resizable, showOverflowTooltip, align, headerAlign, className, labelClassName, formatter, render, children } = column

      if (children && children.length > 0) {
        return (
          <ElTableColumn
            label={label}
            align={align}
            headerAlign={headerAlign}
            className={className}
            labelClassName={labelClassName}
          >
            {children.map(renderColumn)}
          </ElTableColumn>
        )
      }

      return (
        <ElTableColumn
          prop={prop}
          label={label}
          width={width}
          minWidth={minWidth}
          fixed={fixed}
          sortable={sortable}
          resizable={resizable}
          showOverflowTooltip={showOverflowTooltip}
          align={align}
          headerAlign={headerAlign}
          className={className}
          labelClassName={labelClassName}
          formatter={formatter}
        >
          {{
            default: ({ row, column, $index }: any) => {
              if (render) {
                return render(row, column, row[prop], $index)
              }
              if (slots[`column-${prop}`]) {
                return (slots as any)[`column-${prop}`]({ row, column, $index, value: row[prop] })
              }
              return row[prop]
            }
          }}
        </ElTableColumn>
      )
    }

    return () => props.columns.map(renderColumn)
  }
})
