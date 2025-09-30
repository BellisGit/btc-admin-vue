declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    form: {
        type: ObjectConstructor;
        default: () => {};
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelPosition: {
        type: () => "left" | "right" | "top";
        default: string;
    };
    labelWidth: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: () => "default" | "small" | "large";
        default: string;
    };
    showSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    showReset: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchText: {
        type: StringConstructor;
        default: string;
    };
    resetText: {
        type: StringConstructor;
        default: string;
    };
    colSpan: {
        type: NumberConstructor;
        default: number;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("reset" | "change" | "search")[], "reset" | "change" | "search", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    form: {
        type: ObjectConstructor;
        default: () => {};
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelPosition: {
        type: () => "left" | "right" | "top";
        default: string;
    };
    labelWidth: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: () => "default" | "small" | "large";
        default: string;
    };
    showSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    showReset: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchText: {
        type: StringConstructor;
        default: string;
    };
    resetText: {
        type: StringConstructor;
        default: string;
    };
    colSpan: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    onReset?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onSearch?: ((...args: any[]) => any) | undefined;
}>, {
    size: "default" | "small" | "large";
    loading: boolean;
    items: unknown[];
    form: Record<string, any>;
    inline: boolean;
    labelPosition: "top" | "left" | "right";
    labelWidth: string;
    showSearch: boolean;
    showReset: boolean;
    searchText: string;
    resetText: string;
    colSpan: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
