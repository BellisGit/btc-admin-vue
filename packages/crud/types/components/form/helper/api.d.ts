export interface FormApiOptions {
    add?: (data: any) => Promise<any>;
    update?: (data: any) => Promise<any>;
    info?: (id: any) => Promise<any>;
}
export declare function useFormApi(options?: FormApiOptions): {
    loading: import('vue').Ref<boolean, boolean>;
    form: import('vue').Ref<{}, {}>;
    append: import('vue').Ref<boolean, boolean>;
    add: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    info: (id: any) => Promise<any>;
    reset: () => void;
};
