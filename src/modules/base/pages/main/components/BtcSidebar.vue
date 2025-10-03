<template>
  <div
    class="btc-sidebar"
    :class="{
      'is-collapse': app.isFold
    }"
  >
    <div class="btc-sidebar__logo">
      <img src="/icons/android-chrome-192x192.png" alt="BTC SaaS" />
      <span v-if="!app.isFold || browser.isMini">{{ app.info.name }}</span>
    </div>

    <div class="btc-sidebar__search">
      <el-input
        v-model="keyWord"
        :placeholder="t('搜索菜单')"
        clearable
        @focus="app.fold(false)"
      >
        <template #prefix>
          <btc-svg name="search" :size="16" />
        </template>
      </el-input>
    </div>

    <div class="btc-sidebar__container">
      <el-scrollbar>
        <BtcMenu :keyWord="keyWord" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBase } from '/$/base';
import { useBtc } from '/@/btc';
import { useI18n } from 'vue-i18n';
import BtcMenu from './BtcMenu.vue';
import { ref } from 'vue';

defineOptions({
  name: 'BtcSidebar'
});

const { browser } = useBtc();
const { app } = useBase();
const { t } = useI18n();

const keyWord = ref('');
</script>

<style lang="scss" scoped>
.btc-sidebar {
  $slider-menu-height: 50px;
  --slider-bg-color: #2c3147;
  --slider-text-color: #e5eaf3;

  height: 100%;
  background-color: var(--slider-bg-color);
  border-right: 1px solid var(--el-border-color-extra-light);
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 66px;
    padding: 0 21px;
    user-select: none;

    img {
      height: 24px;
      width: 24px;
    }

    span {
      color: var(--slider-text-color);
      font-weight: bold;
      font-size: 20px;
      margin-left: 10px;
      white-space: nowrap;
      letter-spacing: 1px;
    }
  }

  &__search {
    margin: 0 10px 10px 10px;
    overflow: hidden;
    border-radius: 6px;

    :deep(.el-input__wrapper) {
      background-color: rgba(200, 200, 200, 0.1);
      box-shadow: none;
      height: 36px;
      padding: 0 14px;

      .el-input__inner {
        color: var(--slider-text-color);
      }
    }
  }

  &__container {
    height: calc(100% - 112px);
  }

  &__menu {
    user-select: none;

    .b-menu__badge {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $slider-menu-height;
      font-size: 10px;
      height: 14px;
      min-width: 14px;
      padding: 0 3px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: bold;
      color: #fff;
      transition: background-color 0.3s;
    }

    :deep(.el-menu) {
      width: 100%;
      border-right: 0;
      background-color: transparent;
    }

    :deep(.el-menu--popup) {
      border-radius: 6px;
      padding: 5px;
    }

    :deep(.el-menu--popup-container) {
      padding: 0;
    }

    :deep(.el-menu--popup .el-menu-item),
    :deep(.el-menu--popup .el-sub-menu__title) {
      height: $slider-menu-height;
      border-radius: 6px;

      &:hover {
        background-color: var(--el-fill-color-light);
      }
    }

    :deep(.el-menu:not(.el-menu--popup)) {
      --el-menu-base-level-padding: 23px;
    }

    :deep(.el-menu:not(.el-menu--popup) .el-menu-item),
    :deep(.el-menu:not(.el-menu--popup) .el-sub-menu__title) {
      height: $slider-menu-height;
      color: var(--slider-text-color);

      .btc-svg {
        flex-shrink: 0;
      }

      &.is-active,
      &:hover {
        background-color: var(--el-fill-color-light);
        color: var(--el-text-color-primary);
      }

      &.is-active {
        background-color: var(--el-color-primary);
        color: #fff;
      }
    }
  }

  &.is-collapse {
    .btc-sidebar__search {
      :deep(.el-input__inner) {
        opacity: 0;
      }
    }

    .btc-sidebar__menu {
      :deep(.el-sub-menu) {
        &.is-active {
          background-color: var(--el-fill-color-light);
        }
      }
    }
  }
}
</style>
