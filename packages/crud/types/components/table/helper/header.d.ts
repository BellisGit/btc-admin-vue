export interface TableColumn {
    prop: string;
    label: string;
    width?: string | number;
    minWidth?: string | number;
    fixed?: boolean | string;
    sortable?: boolean | string;
    resizable?: boolean;
    showOverflowTooltip?: boolean;
    align?: string;
    headerAlign?: string;
    className?: string;
    labelClassName?: string;
    formatter?: (row: any, column: any, cellValue: any, index: number) => any;
    render?: (row: any, column: any, cellValue: any, index: number) => any;
    children?: TableColumn[];
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    columns: {
        type: () => TableColumn[];
        default: () => never[];
    };
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
}>, () => import("vue/jsx-runtime").JSX.Element[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    columns: {
        type: () => TableColumn[];
        default: () => never[];
    };
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
}>> & Readonly<{}>, {
    data: unknown[];
    columns: TableColumn[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
