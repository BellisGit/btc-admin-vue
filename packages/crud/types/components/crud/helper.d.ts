import { Mitt } from '../../utils/mitt';
interface Options {
    mitt: Mitt;
    config: any;
    crud: any;
}
export declare function useHelper({ config, crud, mitt }: Options): {
    refresh: (params?: any) => Promise<void>;
    add: (row?: any) => Promise<void>;
    edit: (row: any) => Promise<void>;
    del: (row: any) => Promise<void>;
    view: (row: any) => Promise<void>;
    save: () => Promise<void>;
    close: () => void;
    resetSearch: () => void;
    searchSubmit: (params?: any) => void;
    pageChange: (page: number) => void;
    sizeChange: (size: number) => void;
    selectionChange: (selection: any[]) => void;
    batchDelete: () => Promise<void>;
    getPermission: (key: "page" | "list" | "info" | "update" | "add" | "delete") => boolean;
    paramsReplace: (params: any) => any;
};
export {};
