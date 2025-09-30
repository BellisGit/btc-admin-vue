declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    error: {
        type: (StringConstructor | ObjectConstructor | ErrorConstructor)[];
        default: null;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: () => "error" | "primary" | "success" | "warning" | "info";
        default: string;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element | null, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "close"[], "close", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    error: {
        type: (StringConstructor | ObjectConstructor | ErrorConstructor)[];
        default: null;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: () => "error" | "primary" | "success" | "warning" | "info";
        default: string;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    type: "primary" | "success" | "warning" | "info" | "error";
    error: string | Record<string, any> | Error;
    center: boolean;
    title: string;
    closable: boolean;
    showIcon: boolean;
    description: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
