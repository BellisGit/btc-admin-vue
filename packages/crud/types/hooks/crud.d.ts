import { Ref } from 'vue';
export declare function useCrud(options?: any, cb?: (app: any) => void): Ref<any, any>;
export declare function useUpsert<T = any>(options?: any): Ref<any, any>;
export declare function useTable<T = any>(options?: any, cb?: (table: any) => void): Ref<any, any>;
export declare function useForm<T = any>(cb?: (app: any) => void): Ref<any, any>;
export declare function useAdvSearch<T = any>(options?: any): Ref<any, any>;
export declare function useSearch<T = any>(options?: any): Ref<any, any>;
export declare function useDialog(options?: {
    onFullscreen(visible: boolean): void;
}): any;
