declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    text: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: () => import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    };
    size: {
        type: () => "default" | "small" | "large";
        default: string;
    };
    type: {
        type: () => "default" | "text" | "primary" | "success" | "warning" | "info" | "danger";
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "click"[], "click", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    text: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: () => import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    };
    size: {
        type: () => "default" | "small" | "large";
        default: string;
    };
    type: {
        type: () => "default" | "text" | "primary" | "success" | "warning" | "info" | "danger";
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    text: string;
    type: "default" | "text" | "primary" | "success" | "warning" | "info" | "danger";
    icon: string | Record<string, any>;
    size: "default" | "small" | "large";
    disabled: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
