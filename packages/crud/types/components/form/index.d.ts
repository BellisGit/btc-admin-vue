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
    disabled: {
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
    rules: {
        type: ObjectConstructor;
        default: () => {};
    };
    showAction: {
        type: BooleanConstructor;
        default: boolean;
    };
    actionConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("reset" | "submit" | "change")[], "reset" | "submit" | "change", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
    rules: {
        type: ObjectConstructor;
        default: () => {};
    };
    showAction: {
        type: BooleanConstructor;
        default: boolean;
    };
    actionConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    onReset?: ((...args: any[]) => any) | undefined;
    onSubmit?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    size: "default" | "small" | "large";
    disabled: boolean;
    loading: boolean;
    items: unknown[];
    form: Record<string, any>;
    inline: boolean;
    labelPosition: "top" | "left" | "right";
    labelWidth: string;
    rules: Record<string, any>;
    showAction: boolean;
    actionConfig: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
