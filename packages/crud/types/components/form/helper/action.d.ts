export interface FormActionOptions {
    saveButtonText?: string;
    closeButtonText?: string;
    justify?: string;
    buttons?: string[];
    hidden?: boolean;
}
export declare function useFormAction(options?: FormActionOptions): {
    config: {
        saveButtonText: string;
        closeButtonText: string;
        justify: string;
        buttons: string[];
        hidden: boolean;
    };
    loading: import('vue').Ref<boolean, boolean>;
    save: (callback?: () => Promise<void>) => Promise<void>;
    close: (callback?: () => void) => void;
};
