declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    shadow: {
        type: () => "always" | "never" | "hover";
        default: string;
    };
    bodyStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    headerStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    shadow: {
        type: () => "always" | "never" | "hover";
        default: string;
    };
    bodyStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    headerStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    title: string;
    shadow: "always" | "never" | "hover";
    bodyStyle: Record<string, any>;
    headerStyle: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
