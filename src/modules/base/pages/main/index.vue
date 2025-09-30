<template>
  <div class="btc-main-layout" :class="{ 'is-collapse': app.isFold, 'is-full': app.isFull }">
    <div class="btc-main-layout__mask" @click="() => app.fold(true)"></div>

    <div class="btc-main-layout__left">
      <BtcSidebar />
    </div>

    <div class="btc-main-layout__right">
      <BtcTopbar />
      <BtcBreadcrumb />
      <BtcViews />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBase } from '/$/base';
import BtcTopbar from './components/BtcTopbar.vue';
import BtcSidebar from './components/BtcSidebar.vue';
import BtcBreadcrumb from './components/BtcBreadcrumb.vue';
import BtcViews from './components/BtcViews.vue';

defineOptions({
  name: 'BtcMainLayout'
});

const { app } = useBase();
</script>

<style lang="scss" scoped>
.btc-main-layout {
  display: flex;
  background-color: var(--el-bg-color);
  height: 100%;
  width: 100%;
  overflow: hidden;

  &__left {
    overflow: hidden;
    height: 100%;
    width: 255px;
    transition: left 0.2s;
  }

  &__right {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: calc(100% - 255px);
  }

  &__mask {
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    z-index: 999;
  }

  @media only screen and (max-width: 768px) {
    .btc-main-layout__left {
      position: absolute;
      left: 0;
      z-index: 9999;
      transition:
        transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
        box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    }

    .btc-main-layout__right {
      width: 100%;
    }

    &.is-collapse {
      .btc-main-layout__left {
        transform: translateX(-100%);
      }

      .btc-main-layout__mask {
        display: none;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .btc-main-layout__left,
    .btc-main-layout__right {
      transition: width 0.2s ease-in-out;
    }

    .btc-main-layout__mask {
      display: none;
    }

    &.is-collapse {
      .btc-main-layout__left {
        width: 67px;
      }

      .btc-main-layout__right {
        width: calc(100% - 67px);
      }
    }
  }

  &.is-full {
    .btc-main-layout__left {
      width: 0;
    }

    .btc-main-layout__right {
      width: 100%;

      :deep(.btc-topbar),
      :deep(.btc-breadcrumb) {
        padding: 0;
        height: 0;
        overflow: hidden;
      }
    }
  }
}
</style>