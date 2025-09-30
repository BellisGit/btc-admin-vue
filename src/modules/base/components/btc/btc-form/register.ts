import type { App } from 'vue';
import { BtcForm, BtcFormItem } from './index';

// 全局注册 btc-form 组件
export function registerBtcForm(app: App) {
  app.component('BtcForm', BtcForm);
  app.component('BtcFormItem', BtcFormItem);
}

// 导出组件
export { BtcForm, BtcFormItem };
