// BTC CRUD 类型声明文件

// Vue 相关类型
declare namespace Vue {
  interface Ref<T = any> {
    value: T;
  }
  type Emit = (name: any, ...args: any[]) => void;
}

// Element Plus 相关类型
declare namespace ElementPlus {
  type Size = "large" | "default" | "small";
  type Align = "left" | "center" | "right";
  type ButtonType = "default" | "text" | "primary" | "success" | "warning" | "info" | "danger";
  type FormLabelPosition = "left" | "right" | "top";
  type AlertType = "error" | "primary" | "success" | "warning" | "info";
  type ShadowType = "always" | "never" | "hover";
  type TabType = "card" | "border-card";
  type TriggerType = "click" | "focus" | "contextmenu" | "hover";
}

// CRUD 相关类型
declare namespace BtcCrud {
  // 基础接口
  interface BaseComponent {
    name?: string;
    disabled?: boolean;
    loading?: boolean;
  }

  // 按钮组件
  interface ButtonProps extends BaseComponent {
    text?: string;
    icon?: string | object;
    size?: ElementPlus.Size;
    type?: ElementPlus.ButtonType;
  }

  // 表单组件
  interface FormProps extends BaseComponent {
    items?: FormItem[];
    form?: Record<string, any>;
    inline?: boolean;
    labelPosition?: ElementPlus.FormLabelPosition;
    labelWidth?: string;
    size?: ElementPlus.Size;
    rules?: Record<string, any>;
    showAction?: boolean;
    actionConfig?: ActionConfig;
  }

  interface FormItem {
    prop: string;
    label: string;
    component?: any;
    span?: number;
    disabled?: boolean;
    [key: string]: any;
  }

  interface ActionConfig {
    saveButtonText?: string;
    closeButtonText?: string;
    justify?: string;
    buttons?: string[];
    hidden?: boolean;
  }

  // 表格组件
  interface TableProps extends BaseComponent {
    data?: any[];
    columns?: TableColumn[];
    height?: string | number;
    maxHeight?: string | number;
    stripe?: boolean;
    border?: boolean;
    size?: ElementPlus.Size;
    showHeader?: boolean;
    highlightCurrentRow?: boolean;
    rowKey?: string;
    emptyText?: string;
    showSelection?: boolean;
    selection?: any[];
    showOperation?: boolean;
    operationWidth?: string | number;
    operationButtons?: string[];
  }

  interface TableColumn {
    prop: string;
    label: string;
    width?: string | number;
    minWidth?: string | number;
    fixed?: boolean | string;
    sortable?: boolean | string;
    resizable?: boolean;
    showOverflowTooltip?: boolean;
    align?: ElementPlus.Align;
    headerAlign?: ElementPlus.Align;
    className?: string;
    labelClassName?: string;
    formatter?: (row: any, column: any, cellValue: any, index: number) => any;
    render?: (row: any, column: any, cellValue: any, index: number) => any;
    children?: TableColumn[];
  }

  // 搜索组件
  interface SearchProps extends BaseComponent {
    items?: FormItem[];
    form?: Record<string, any>;
    inline?: boolean;
    labelPosition?: ElementPlus.FormLabelPosition;
    labelWidth?: string;
    size?: ElementPlus.Size;
    showSearch?: boolean;
    showReset?: boolean;
    searchText?: string;
    resetText?: string;
    colSpan?: number;
  }

  // 分页组件
  interface PaginationProps extends BaseComponent {
    total?: number;
    page?: number;
    size?: number;
    pageSizes?: number[];
    layout?: string;
    background?: boolean;
    small?: boolean;
    hideOnSinglePage?: boolean;
  }

  // 对话框组件
  interface DialogProps extends BaseComponent {
    visible?: boolean;
    title?: string;
    width?: string;
    height?: string;
    top?: string;
    modal?: boolean;
    lockScroll?: boolean;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    showClose?: boolean;
    beforeClose?: (done: () => void) => void;
    center?: boolean;
    destroyOnClose?: boolean;
    draggable?: boolean;
    fullscreen?: boolean;
  }

  // 表单卡片组件
  interface FormCardProps extends BaseComponent {
    title?: string;
    shadow?: ElementPlus.ShadowType;
    bodyStyle?: Record<string, any>;
    headerStyle?: Record<string, any>;
  }

  // 表单标签页组件
  interface FormTabsProps extends BaseComponent {
    tabs?: FormTab[];
    activeTab?: string;
    type?: ElementPlus.TabType;
    position?: string;
    closable?: boolean;
    addable?: boolean;
  }

  interface FormTab {
    label: string;
    name: string;
    items?: FormItem[];
    disabled?: boolean;
  }

  // 错误消息组件
  interface ErrorMessageProps extends BaseComponent {
    error?: string | Error | object;
    title?: string;
    type?: ElementPlus.AlertType;
    showIcon?: boolean;
    closable?: boolean;
    center?: boolean;
    description?: string;
  }

  // 过滤器组件
  interface FilterProps extends BaseComponent {
    items?: FilterItem[];
    modelValue?: Record<string, any>;
    size?: ElementPlus.Size;
  }

  interface FilterItem {
    prop: string;
    label: string;
    type: 'select' | 'cascader' | 'date' | 'daterange' | 'input';
    options?: FilterOption[];
    placeholder?: string;
    clearable?: boolean;
    multiple?: boolean;
    filterable?: boolean;
  }

  interface FilterOption {
    label: string;
    value: any;
    children?: FilterOption[];
  }

  // 右键菜单组件
  interface ContextMenuProps extends BaseComponent {
    items?: ContextMenuItem[];
    trigger?: ElementPlus.TriggerType;
    placement?: string;
    hideOnClick?: boolean;
  }

  interface ContextMenuItem {
    label: string;
    icon?: string;
    disabled?: boolean;
    divided?: boolean;
    onClick?: (row: any, index: number) => void;
  }

  // CRUD Hook 选项
  interface CrudHookOptions {
    service: any;
    permission?: Record<string, string>;
    beforeRefresh?: (params: any) => any;
    afterRefresh?: (data: any) => any;
    beforeAdd?: (form: any) => any;
    afterAdd?: (data: any) => any;
    beforeUpdate?: (form: any) => any;
    afterUpdate?: (data: any) => any;
    beforeDelete?: (ids: any[]) => any;
    afterDelete?: (data: any) => any;
  }

  // CRUD 提供者接口
  interface CrudProvide {
    crud: any;
    refresh: () => void;
    add: (row?: any) => void;
    edit: (row: any) => void;
    del: (row: any) => void;
    view: (row: any) => void;
    save: () => void;
    close: () => void;
    resetSearch: () => void;
    searchSubmit: (params?: any) => void;
    pageChange: (page: number) => void;
    sizeChange: (size: number) => void;
    selectionChange: (selection: any[]) => void;
    batchDelete: () => void;
    selection: any;
    upsert: any;
    append: any;
    form: any;
    formLoading: any;
    loading: any;
    data: any;
    total: any;
    page: any;
    size: any;
    search: any;
  }
}

// 导出所有组件类型
export declare const BtcAddBtn: any;
export declare const BtcRefreshBtn: any;
export declare const BtcMultiDeleteBtn: any;
export declare const BtcFlex1: any;
export declare const BtcRow: any;
export declare const BtcForm: any;
export declare const BtcFormCard: any;
export declare const BtcFormTabs: any;
export declare const BtcTable: any;
export declare const BtcSearch: any;
export declare const BtcSearchKey: any;
export declare const BtcAdvBtn: any;
export declare const BtcAdvSearch: any;
export declare const BtcDialog: any;
export declare const BtcUpsert: any;
export declare const BtcContextMenu: any;
export declare const BtcPagination: any;
export declare const BtcFilter: any;
export declare const BtcErrorMessage: any;
export declare const BtcCrud: any;

// 导出 Hooks
export declare function useCrud(options: BtcCrud.CrudHookOptions): any;
export declare function useBtcCrud(options: any, cb?: (app: any) => void): any;
export declare function useBtcTable(options: any, cb?: (table: any) => void): any;
export declare function useBtcForm(cb?: (app: any) => void): any;
export declare function useBtcSearch(options: any): any;
export declare function useBtcUpsert(options: any): any;
export declare function useBtcAdvSearch(options: any): any;
export declare function useBtcDialog(options: any): any;
export declare function useCore(): any;
export declare function useConfig(): any;
export declare function useBrowser(): any;
export declare function useRefs(): any;
export declare function useProxy(ctx: any): any;
export declare function useElApi(keys: string[], el: any): any;

// 导出工具函数
export declare const emitter: any;
export declare function install(app: any, options?: any): any;

// 默认导出
declare const _default: {
  install: typeof install;
};
export default _default;
