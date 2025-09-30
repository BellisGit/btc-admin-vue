import { App } from 'vue';
export * from './components';
export * from './hooks';
export * from './utils';
export * from './locale';
export * from './test/service';
export declare function install(app: App, options?: any): {
    name: string;
};
declare const _default: {
    install: typeof install;
};
export default _default;
