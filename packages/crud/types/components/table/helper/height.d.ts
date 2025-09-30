export interface TableHeightOptions {
    autoHeight?: boolean;
    height?: string | number;
    maxHeight?: string | number;
    minHeight?: string | number;
}
export declare function useTableHeight(options?: TableHeightOptions): {
    containerRef: import('vue').Ref<HTMLElement | undefined, HTMLElement | undefined>;
    tableRef: import('vue').Ref<any, any>;
    containerHeight: import('vue').Ref<number, number>;
    headerHeight: import('vue').Ref<number, number>;
    footerHeight: import('vue').Ref<number, number>;
    tableHeight: import('vue').ComputedRef<string | undefined>;
    updateHeight: () => void;
};
