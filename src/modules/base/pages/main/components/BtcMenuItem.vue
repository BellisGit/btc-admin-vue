<template>
  <template v-if="!item.meta?.hidden">
    <!-- 有子菜单 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :index="item.path"
      :popper-append-to-body="false"
    >
      <template #title>
        <btc-svg :name="item.meta?.icon || 'menu'" />
        <span>{{ item.meta?.title || item.name }}</span>
      </template>

      <BtcMenuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </el-sub-menu>

    <!-- 无子菜单 -->
    <el-menu-item
      v-else
      :index="item.path"
      @click="handleClick"
    >
      <btc-svg :name="item.meta?.icon || 'menu'" />
      <template #title>
        <span>{{ item.meta?.title || item.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useBtc } from '/@/btc';

defineOptions({
  name: 'BtcMenuItem'
});

interface MenuItem {
  path: string;
  name: string;
  meta?: {
    title?: string;
    icon?: string;
    hidden?: boolean;
  };
  children?: MenuItem[];
}

interface Props {
  item: MenuItem;
}

const props = defineProps<Props>();

const { router } = useBtc();

// 处理菜单点击
const handleClick = () => {
  if (props.item.path) {
    router.push(props.item.path);
  }
};
</script>

<style lang="scss" scoped>
// 菜单项样式在父组件中定义
</style>
