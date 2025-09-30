export interface TableSortOptions {
    defaultSort?: {
        prop: string;
        order: 'ascending' | 'descending';
    };
    sortMethod?: (a: any, b: any) => number;
    sortBy?: string | string[] | ((row: any, index: number) => any);
    sortOrders?: ('ascending' | 'descending' | null)[];
}
export declare function useTableSort(options?: TableSortOptions): {
    config: {
        defaultSort: {
            prop: string;
            order: "ascending" | "descending";
        } | null;
        sortMethod: ((a: any, b: any) => number) | null;
        sortBy: string | string[] | ((row: any, index: number) => any) | null;
        sortOrders: (string | null)[];
    };
    currentSort: import('vue').Ref<{
        prop: string;
        order: "ascending" | "descending" | null;
    } | null, {
        prop: string;
        order: "ascending" | "descending" | null;
    } | {
        prop: string;
        order: "ascending" | "descending" | null;
    } | null>;
    setSort: (prop: string, order: "ascending" | "descending" | null) => void;
    clearSort: () => void;
    sortData: (data: any[], prop: string, order: "ascending" | "descending") => any[];
};
