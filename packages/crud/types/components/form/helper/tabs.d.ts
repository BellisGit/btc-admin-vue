export interface FormTab {
    label: string;
    name: string;
    items: any[];
    disabled?: boolean;
}
export interface FormTabsOptions {
    tabs?: FormTab[];
    activeTab?: string;
    type?: string;
    position?: string;
}
export declare function useFormTabs(options?: FormTabsOptions): {
    tabs: import('vue').Ref<{
        label: string;
        name: string;
        items: any[];
        disabled?: boolean | undefined;
    }[], FormTab[] | {
        label: string;
        name: string;
        items: any[];
        disabled?: boolean | undefined;
    }[]>;
    activeTab: import('vue').Ref<string, string>;
    type: import('vue').Ref<string, string>;
    position: import('vue').Ref<string, string>;
    currentTab: import('vue').ComputedRef<{
        label: string;
        name: string;
        items: any[];
        disabled?: boolean | undefined;
    } | undefined>;
    currentItems: import('vue').ComputedRef<any[]>;
    addTab: (tab: FormTab) => void;
    removeTab: (name: string) => void;
    setActiveTab: (name: string) => void;
};
