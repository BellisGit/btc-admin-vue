export interface FilterOption {
    label: string;
    value: any;
    children?: FilterOption[];
}
export interface FilterItem {
    prop: string;
    label: string;
    type: 'select' | 'cascader' | 'date' | 'daterange' | 'input';
    options?: FilterOption[];
    placeholder?: string;
    clearable?: boolean;
    multiple?: boolean;
    filterable?: boolean;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    items: {
        type: () => FilterItem[];
        default: () => never[];
    };
    modelValue: {
        type: ObjectConstructor;
        default: () => {};
    };
    size: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    items: {
        type: () => FilterItem[];
        default: () => never[];
    };
    modelValue: {
        type: ObjectConstructor;
        default: () => {};
    };
    size: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    size: string;
    items: FilterItem[];
    modelValue: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
