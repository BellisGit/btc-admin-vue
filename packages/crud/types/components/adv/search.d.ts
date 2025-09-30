declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
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
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    colSpan: {
        type: NumberConstructor;
        default: number;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("reset" | "change" | "search" | "update:visible")[], "reset" | "change" | "search" | "update:visible", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
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
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
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
    "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    onSearch?: ((...args: any[]) => any) | undefined;
}>, {
    loading: boolean;
    items: unknown[];
    form: Record<string, any>;
    title: string;
    width: string;
    visible: boolean;
    colSpan: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
