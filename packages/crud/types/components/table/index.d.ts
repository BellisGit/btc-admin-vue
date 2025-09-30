declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    columns: {
        type: () => any[];
        default: () => never[];
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    maxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    stripe: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: () => "default" | "small" | "large";
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    highlightCurrentRow: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowKey: {
        type: StringConstructor;
        default: string;
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
    showSelection: {
        type: BooleanConstructor;
        default: boolean;
    };
    selection: {
        type: ArrayConstructor;
        default: () => never[];
    };
    showOperation: {
        type: BooleanConstructor;
        default: boolean;
    };
    operationWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    operationButtons: {
        type: ArrayConstructor;
        default: () => string[];
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("selection-change" | "row-click" | "row-dblclick" | "sort-change" | "current-change")[], "selection-change" | "row-click" | "row-dblclick" | "sort-change" | "current-change", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    columns: {
        type: () => any[];
        default: () => never[];
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    maxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    stripe: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: () => "default" | "small" | "large";
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    highlightCurrentRow: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowKey: {
        type: StringConstructor;
        default: string;
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
    showSelection: {
        type: BooleanConstructor;
        default: boolean;
    };
    selection: {
        type: ArrayConstructor;
        default: () => never[];
    };
    showOperation: {
        type: BooleanConstructor;
        default: boolean;
    };
    operationWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    operationButtons: {
        type: ArrayConstructor;
        default: () => string[];
    };
}>> & Readonly<{
    "onSelection-change"?: ((...args: any[]) => any) | undefined;
    "onRow-click"?: ((...args: any[]) => any) | undefined;
    "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
    "onSort-change"?: ((...args: any[]) => any) | undefined;
    "onCurrent-change"?: ((...args: any[]) => any) | undefined;
}>, {
    size: "default" | "small" | "large";
    loading: boolean;
    selection: unknown[];
    data: unknown[];
    columns: any[];
    rowKey: string;
    highlightCurrentRow: boolean;
    height: string | number;
    maxHeight: string | number;
    stripe: boolean;
    border: boolean;
    showHeader: boolean;
    emptyText: string;
    showSelection: boolean;
    showOperation: boolean;
    operationWidth: string | number;
    operationButtons: unknown[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
