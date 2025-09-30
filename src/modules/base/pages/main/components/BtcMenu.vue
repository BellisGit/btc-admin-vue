<template>
  <div class="btc-menu">
    <el-menu
      :default-active="activeMenu"
      :collapse="app.isFold"
      :unique-opened="true"
      :router="true"
      class="btc-menu__el-menu"
    >
      <template v-for="item in menuList" :key="item.path">
        <BtcMenuItem :item="item" />
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBase } from '/$/base';
import { useBtc } from '/@/btc';
import BtcMenuItem from './BtcMenuItem.vue';

defineOptions({
  name: 'BtcMenu'
});

interface Props {
  keyWord?: string;
}

const props = withDefaults(defineProps<Props>(), {
  keyWord: ''
});

const { app } = useBase();
const { router } = useBtc();

// 当前激活的菜单
const activeMenu = computed(() => {
  return router.currentRoute.value.path;
});

// 菜单列表
const menuList = computed(() => {
  // 暂时返回静态菜单，后续可以从后端获取
  return [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '首页',
        icon: 'home'
      }
    },
    {
      path: '/demo',
      name: 'Demo',
      meta: {
        title: '演示',
        icon: 'demo'
      },
      children: [
        {
          path: '/demo/crud',
          name: 'DemoCrud',
          meta: {
            title: 'CRUD 演示',
            icon: 'table'
          }
        },
        {
          path: '/demo/components',
          name: 'DemoComponents',
          meta: {
            title: '组件演示',
            icon: 'component'
          }
        }
      ]
    },
    {
      path: '/system',
      name: 'System',
      meta: {
        title: '系统管理',
        icon: 'system'
      },
      children: [
        {
          path: '/system/user',
          name: 'SystemUser',
          meta: {
            title: '用户管理',
            icon: 'user'
          }
        },
        {
          path: '/system/role',
          name: 'SystemRole',
          meta: {
            title: '角色管理',
            icon: 'role'
          }
        },
        {
          path: '/system/menu',
          name: 'SystemMenu',
          meta: {
            title: '菜单管理',
            icon: 'menu'
          }
        }
      ]
    }
  ];
});
</script>

<style lang="scss" scoped>
.btc-menu {
  &__el-menu {
    border-right: none;
    background-color: transparent;
  }
}
</style>
