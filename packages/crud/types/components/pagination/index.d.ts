declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    total: {
        type: NumberConstructor;
        default: number;
    };
    page: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
        default: number;
    };
    pageSizes: {
        type: () => number[];
        default: () => number[];
    };
    layout: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: BooleanConstructor;
        default: boolean;
    };
    small: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideOnSinglePage: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("change" | "update:page" | "update:size")[], "change" | "update:page" | "update:size", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    total: {
        type: NumberConstructor;
        default: number;
    };
    page: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
        default: number;
    };
    pageSizes: {
        type: () => number[];
        default: () => number[];
    };
    layout: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: BooleanConstructor;
        default: boolean;
    };
    small: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideOnSinglePage: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:page"?: ((...args: any[]) => any) | undefined;
    "onUpdate:size"?: ((...args: any[]) => any) | undefined;
}>, {
    small: boolean;
    size: number;
    disabled: boolean;
    layout: string;
    total: number;
    page: number;
    pageSizes: number[];
    background: boolean;
    hideOnSinglePage: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
