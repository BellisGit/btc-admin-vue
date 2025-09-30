export interface FormPlugin {
    name: string;
    install: (form: any) => void;
}
export interface FormPluginsOptions {
    plugins?: FormPlugin[];
}
export declare function useFormPlugins(options?: FormPluginsOptions): {
    plugins: import('vue').Ref<{
        name: string;
        install: (form: any) => void;
    }[], FormPlugin[] | {
        name: string;
        install: (form: any) => void;
    }[]>;
    installed: Record<string, boolean>;
    install: (plugin: FormPlugin, form: any) => void;
    installAll: (form: any) => void;
    addPlugin: (plugin: FormPlugin) => void;
    removePlugin: (name: string) => void;
};
