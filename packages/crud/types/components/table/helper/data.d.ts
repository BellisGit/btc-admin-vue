export interface TableDataOptions {
    data?: any[];
    loading?: boolean;
    total?: number;
    page?: number;
    size?: number;
}
export declare function useTableData(options?: TableDataOptions): {
    data: import('vue').Ref<any[], any[]>;
    loading: import('vue').Ref<boolean, boolean>;
    total: import('vue').Ref<number, number>;
    page: import('vue').Ref<number, number>;
    size: import('vue').Ref<number, number>;
    isEmpty: import('vue').ComputedRef<boolean>;
    hasData: import('vue').ComputedRef<boolean>;
    setData: (newData: any[]) => void;
    addData: (item: any) => void;
    updateData: (index: number, item: any) => void;
    removeData: (index: number) => void;
    clearData: () => void;
    setLoading: (state: boolean) => void;
    setTotal: (totalCount: number) => void;
    setPage: (pageNum: number) => void;
    setSize: (pageSize: number) => void;
};
