declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    visible: {
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    rules: {
        type: ObjectConstructor;
        default: () => {};
    };
    append: {
        type: BooleanConstructor;
        default: boolean;
    };
    showAction: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveButtonText: {
        type: StringConstructor;
        default: string;
    };
    closeButtonText: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("reset" | "submit" | "change" | "update:visible")[], "reset" | "submit" | "change" | "update:visible", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    visible: {
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    rules: {
        type: ObjectConstructor;
        default: () => {};
    };
    append: {
        type: BooleanConstructor;
        default: boolean;
    };
    showAction: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveButtonText: {
        type: StringConstructor;
        default: string;
    };
    closeButtonText: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onReset?: ((...args: any[]) => any) | undefined;
    onSubmit?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    loading: boolean;
    saveButtonText: string;
    closeButtonText: string;
    items: unknown[];
    form: Record<string, any>;
    rules: Record<string, any>;
    showAction: boolean;
    title: string;
    width: string;
    visible: boolean;
    append: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
