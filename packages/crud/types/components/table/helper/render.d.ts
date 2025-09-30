export interface RenderOptions {
    type?: string;
    props?: Record<string, any>;
    children?: any;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    render: {
        type: FunctionConstructor;
        required: true;
    };
    row: {
        type: ObjectConstructor;
        required: true;
    };
    column: {
        type: ObjectConstructor;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
    value: {
        type: (StringConstructor | ObjectConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor)[];
        default: undefined;
    };
}>, () => any, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    render: {
        type: FunctionConstructor;
        required: true;
    };
    row: {
        type: ObjectConstructor;
        required: true;
    };
    column: {
        type: ObjectConstructor;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
    value: {
        type: (StringConstructor | ObjectConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor)[];
        default: undefined;
    };
}>> & Readonly<{}>, {
    value: string | number | boolean | Record<string, any> | unknown[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
