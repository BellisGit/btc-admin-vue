export interface TablePlugin {
    name: string;
    install: (table: any) => void;
}
export interface TablePluginsOptions {
    plugins?: TablePlugin[];
}
export declare function useTablePlugins(options?: TablePluginsOptions): {
    plugins: import('vue').Ref<{
        name: string;
        install: (table: any) => void;
    }[], TablePlugin[] | {
        name: string;
        install: (table: any) => void;
    }[]>;
    installed: Record<string, boolean>;
    install: (plugin: TablePlugin, table: any) => void;
    installAll: (table: any) => void;
    addPlugin: (plugin: TablePlugin) => void;
    removePlugin: (name: string) => void;
};
