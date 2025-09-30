declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    tabs: {
        type: () => any[];
        default: () => never[];
    };
    activeTab: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: () => "card" | "border-card";
        default: string;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    addable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("tab-click" | "tab-remove" | "tab-add")[], "tab-click" | "tab-remove" | "tab-add", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    tabs: {
        type: () => any[];
        default: () => never[];
    };
    activeTab: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: () => "card" | "border-card";
        default: string;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    addable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onTab-click"?: ((...args: any[]) => any) | undefined;
    "onTab-remove"?: ((...args: any[]) => any) | undefined;
    "onTab-add"?: ((...args: any[]) => any) | undefined;
}>, {
    type: "card" | "border-card";
    tabs: any[];
    activeTab: string;
    position: string;
    closable: boolean;
    addable: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
