export interface TableRowOptions {
    rowKey?: string;
    rowClassName?: string | ((row: any, index: number) => string);
    rowStyle?: Record<string, any> | ((row: any, index: number) => Record<string, any>);
    highlightCurrentRow?: boolean;
    currentRowKey?: string | number;
}
export declare function useTableRow(options?: TableRowOptions): {
    config: {
        rowKey: string;
        rowClassName: string | ((row: any, index: number) => string);
        rowStyle: Record<string, any> | ((row: any, index: number) => Record<string, any>);
        highlightCurrentRow: boolean;
        currentRowKey: string | number;
    };
    currentRow: import('vue').Ref<any, any>;
    setCurrentRow: (row: any) => void;
    getRowKey: (row: any) => any;
    getRowClassName: (row: any, index: number) => string;
    getRowStyle: (row: any, index: number) => any;
};
