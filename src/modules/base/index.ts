import { useStore } from './store';

export function useBase() {
  return {
    ...useStore()
  };
}

export * from './utils';
export * from './store';
export * from './composables/useBase';
// export * from './types';
