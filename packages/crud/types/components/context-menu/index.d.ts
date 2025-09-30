export interface ContextMenuItem {
    label: string;
    icon?: string;
    disabled?: boolean;
    divided?: boolean;
    onClick?: (row: any, index: number) => void;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    items: {
        type: () => ContextMenuItem[];
        default: () => never[];
    };
    trigger: {
        type: () => "click" | "focus" | "contextmenu" | "hover";
        default: string;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    hideOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "command"[], "command", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    items: {
        type: () => ContextMenuItem[];
        default: () => never[];
    };
    trigger: {
        type: () => "click" | "focus" | "contextmenu" | "hover";
        default: string;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    hideOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onCommand?: ((...args: any[]) => any) | undefined;
}>, {
    placement: string;
    items: ContextMenuItem[];
    trigger: "hover" | "click" | "focus" | "contextmenu";
    hideOnClick: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
