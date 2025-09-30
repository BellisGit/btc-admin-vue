import { useAppStore } from './app';
import { useUserStore } from './user';
import { useMenuStore } from './menu';

export function useStore() {
  return {
    app: useAppStore(),
    user: useUserStore(),
    menu: useMenuStore()
  };
}

export * from './app';
export * from './user';
export * from './menu';
