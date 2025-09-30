export declare const format: {
    [key: string]: any;
};
declare const formHook: {
    bind(data: any): void;
    submit(data: any): void;
};
export declare function registerFormHook(name: string, fn: any): void;
export default formHook;
