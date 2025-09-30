import { Mitt } from '../utils/mitt';
export declare function useCore(): {
    crud: any;
    mitt: Mitt;
};
export declare function useConfig(): any;
export declare function useBrowser(): any;
export declare function useRefs(): {
    refs: {
        [key: string]: any;
    };
    setRefs: (name: string) => (el: any) => void;
};
export declare function useProxy(ctx: any): any;
export declare function useElApi(keys: string[], el: any): any;
export * from './crud';
