declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: () => "default" | "small" | "large";
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSearchButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchButtonText: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("clear" | "search" | "update:value")[], "clear" | "search" | "update:value", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: () => "default" | "small" | "large";
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSearchButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchButtonText: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onSearch?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}>, {
    size: "default" | "small" | "large";
    value: string;
    placeholder: string;
    clearable: boolean;
    showSearchButton: boolean;
    searchButtonText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
