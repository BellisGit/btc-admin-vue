export interface TableSelectionOptions {
    type?: string;
    reserveSelection?: boolean;
    selectable?: (row: any, index: number) => boolean;
    selectOnIndeterminate?: boolean;
}
export declare function useTableSelection(options?: TableSelectionOptions): {
    config: {
        type: string;
        reserveSelection: boolean;
        selectable: (row: any, index: number) => boolean;
        selectOnIndeterminate: boolean;
    };
    selection: import('vue').Ref<any[], any[]>;
    isAllSelected: import('vue').Ref<boolean, boolean>;
    isIndeterminate: import('vue').Ref<boolean, boolean>;
    selectedCount: import('vue').ComputedRef<number>;
    hasSelection: import('vue').ComputedRef<boolean>;
    toggleRowSelection: (row: any, selected?: boolean) => void;
    toggleAllSelection: () => void;
    clearSelection: () => void;
    selectAll: () => void;
    setSelection: (rows: any[]) => void;
};
