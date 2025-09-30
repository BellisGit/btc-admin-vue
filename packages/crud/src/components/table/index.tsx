import { defineComponent, ref, computed, watch, inject } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElSpace } from 'element-plus'
import { Edit, Delete, View } from '@element-plus/icons-vue'
import { useTableData, useTableHeight, useTableRow, useTableSelection, useTableSort, useTableOp } from './helper'
import BtcTableHeader from './helper/header'
import { crudProvideKey } from '../../provide'

export default defineComponent({
  name: 'BtcTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array as () => any[],
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: undefined
    },
    maxHeight: {
      type: [String, Number],
      default: undefined
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as () => 'default' | 'small' | 'large',
      default: 'default'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Array,
      default: () => []
    },
    showOperation: {
      type: Boolean,
      default: true
    },
    operationWidth: {
      type: [String, Number],
      default: 150
    },
    operationButtons: {
      type: Array,
      default: () => ['edit', 'delete']
    }
  },
  emits: ['selection-change', 'row-click', 'row-dblclick', 'sort-change', 'current-change'],
  setup(props, { emit, slots }) {
    const tableRef = ref()
    const crud = inject(crudProvideKey)

    // 使用 helper hooks
    const { data: tableData, loading: tableLoading, setData } = useTableData({
      data: props.data,
      loading: props.loading
    })
    const { tableHeight } = useTableHeight({
      height: props.height,
      maxHeight: props.maxHeight
    })
    const { config: rowConfig, currentRow, setCurrentRow } = useTableRow({
      rowKey: props.rowKey,
      highlightCurrentRow: props.highlightCurrentRow
    })
    const { selection, toggleRowSelection, clearSelection } = useTableSelection()
    const { currentSort, setSort } = useTableSort()
    const { config: opConfig } = useTableOp({
      width: props.operationWidth
    })

    // 监听数据变化
    watch(() => props.data, (newData) => {
      setData(newData)
    }, { immediate: true })

    // 选择变化
    const handleSelectionChange = (selection: any[]) => {
      emit('selection-change', selection)
      if (crud?.selectionChange) {
        crud.selectionChange(selection)
      }
    }

    // 行点击
    const handleRowClick = (row: any) => {
      emit('row-click', row)
      setCurrentRow(row)
    }

    // 行双击
    const handleRowDblclick = (row: any) => {
      emit('row-dblclick', row)
    }

    // 排序变化
    const handleSortChange = ({ prop, order }: any) => {
      emit('sort-change', { prop, order })
      setSort(prop, order)
    }

    // 当前行变化
    const handleCurrentChange = (currentRow: any) => {
      emit('current-change', currentRow)
      setCurrentRow(currentRow)
    }

    // 渲染操作列
    const renderOperationColumn = () => {
      if (!props.showOperation) return null

      return (
        <ElTableColumn
          label={opConfig.label}
          width={opConfig.width}
          fixed={opConfig.fixed}
          align={opConfig.align}
        >
          {{
            default: ({ row }: any) => (
              <ElSpace>
                {props.operationButtons.includes('view') && (
                  <ElButton
                    type="primary"
                    size="small"
                    icon={View}
                    onClick={() => crud?.view?.(row)}
                  >
                    查看
                  </ElButton>
                )}
                {props.operationButtons.includes('edit') && (
                  <ElButton
                    type="primary"
                    size="small"
                    icon={Edit}
                    onClick={() => crud?.edit?.(row)}
                  >
                    编辑
                  </ElButton>
                )}
                {props.operationButtons.includes('delete') && (
                  <ElButton
                    type="danger"
                    size="small"
                    icon={Delete}
                    onClick={() => crud?.del?.(row)}
                  >
                    删除
                  </ElButton>
                )}
                {slots.operation?.({ row })}
              </ElSpace>
            )
          }}
        </ElTableColumn>
      )
    }

    return () => (
      <ElTable
        ref={tableRef}
        data={tableData.value}
        v-loading={tableLoading.value}
        height={tableHeight.value}
        maxHeight={props.maxHeight}
        stripe={props.stripe}
        border={props.border}
        size={props.size}
        showHeader={props.showHeader}
        highlightCurrentRow={props.highlightCurrentRow}
        rowKey={props.rowKey}
        emptyText={props.emptyText}
        onSelection-change={handleSelectionChange}
        onRow-click={handleRowClick}
        onRow-dblclick={handleRowDblclick}
        onSort-change={handleSortChange}
        onCurrent-change={handleCurrentChange}
      >
        {props.showSelection && (
          <ElTableColumn type="selection" width="55" />
        )}
        
        <BtcTableHeader columns={props.columns} data={tableData.value} />
        
        {renderOperationColumn()}
        
        {slots.default?.()}
      </ElTable>
    )
  }
})
