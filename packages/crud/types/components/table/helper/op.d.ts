export interface TableOpOptions {
    buttons?: any[];
    width?: string | number;
    fixed?: boolean | string;
    align?: string;
    label?: string;
}
export declare function useTableOp(options?: TableOpOptions): {
    config: {
        buttons: any[];
        width: string | number;
        fixed: boolean | string;
        align: string;
        label: string;
    };
    addButton: (button: any) => void;
    removeButton: (index: number) => void;
    clearButtons: () => void;
};
