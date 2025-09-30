export interface SearchPlugin {
    name: string;
    install: (search: any) => void;
}
export interface SearchPluginsOptions {
    plugins?: SearchPlugin[];
}
export declare function useSearchPlugins(options?: SearchPluginsOptions): {
    plugins: import('vue').Ref<{
        name: string;
        install: (search: any) => void;
    }[], SearchPlugin[] | {
        name: string;
        install: (search: any) => void;
    }[]>;
    installed: Record<string, boolean>;
    install: (plugin: SearchPlugin, search: any) => void;
    installAll: (search: any) => void;
    addPlugin: (plugin: SearchPlugin) => void;
    removePlugin: (name: string) => void;
};
