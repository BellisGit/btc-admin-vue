<template>
  <div class="btc-topbar">
    <div class="btc-comm__icon btc-topbar__fold-btn" @click="app.fold()">
      <btc-svg name="fold" v-if="app.isFold" />
      <btc-svg name="expand" v-else />
    </div>

    <div class="flex1"></div>

    <!-- 工具栏 -->
    <ul class="btc-topbar__tools">
      <li v-for="(item, index) in toolbarComponents" :key="index">
        <component :is="item.component" />
      </li>
      <!-- 语言切换 -->
      <li>
        <BtcLangSwitcher />
      </li>
    </ul>

    <!-- 用户信息 -->
    <template v-if="user.info || user.token">
      <el-dropdown
        hide-on-click
        popper-class="btc-topbar__user-popper"
        :popper-options="{}"
        @command="onCommand"
      >
        <div class="btc-topbar__user">
          <el-text class="btc-topbar__user-name">{{ userDisplayName }}</el-text>
          <el-avatar :size="26" :src="userAvatar" :icon="UserFilled" />
        </div>

        <template #dropdown>
          <div class="user">
            <el-avatar :size="34" :src="userAvatar" :icon="UserFilled" />

            <div class="det">
              <el-text size="small" tag="p">{{ userDisplayName }}</el-text>
              <el-text size="small" type="info">{{ userDisplayEmail }}</el-text>
            </div>
          </div>

          <el-dropdown-menu>
            <el-dropdown-item command="my">
              <btc-svg name="my" />
              <span>{{ t('个人信息') }}</span>
            </el-dropdown-item>
            <el-dropdown-item command="exit">
              <btc-svg name="exit" />
              <span>{{ t('退出登录') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw, onMounted, reactive } from 'vue';
import { isFunction, orderBy } from 'lodash-es';
import { useBase } from '/$/base';
import { useBtc } from '/@/btc';
import { ElMessageBox } from 'element-plus';
import { UserFilled } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import BtcLangSwitcher from '../../../components/toolbar/BtcLangSwitcher.vue';
import { module } from '/@/btc';

defineOptions({
  name: 'BtcTopbar'
});

const { router, service } = useBtc();
const { user, app } = useBase();
const { t } = useI18n();

// 用户显示信息
const userDisplayName = computed(() => {
  if (user.info?.name) return user.info.name;
  if (user.info?.nickName) return user.info.nickName;
  if (user.info?.username) return user.info.username;
  return '管理员';
});

const userDisplayEmail = computed(() => {
  if (user.info?.email) return user.info.email;
  return 'admin@btc-saas.com';
});

const userAvatar = computed(() => {
  if (user.info?.headImg) return user.info.headImg;
  if (user.info?.avatarUrl) return user.info.avatarUrl;
  // 使用 logo 作为默认头像
  return '/icons/android-chrome-192x192.png';
});

// 处理命令
async function onCommand(name: string) {
  switch (name) {
    case 'my':
      router.push('/my/info');
      break;
    case 'exit':
      ElMessageBox.confirm(t('确定退出登录吗?'), t('提示'), {
        type: 'warning'
      })
        .then(async () => {
          // 调用登出接口
          try {
            await service.base.comm.logout();
          } catch (error) {
            console.warn('登出接口调用失败:', error);
          }
          user.logout();
          router.push('/login');
        })
        .catch(() => null);
      break;
  }
}

// 工具栏
const toolbar = reactive({
  list: [] as any[],

  async init() {
    // 从模块系统中获取工具栏组件
    const toolbarComponents = [];
    
    for (const m of module.list) {
      if (m.enable !== false && m.toolbar) {
        const { component, order = 0 } = m.toolbar;
        
        if (component) {
          try {
            const comp = await (isFunction(component) ? component() : component);
            const componentInstance = comp.default || comp;
            
            toolbarComponents.push({
              component: markRaw(componentInstance),
              order
            });
          } catch (error) {
            console.warn(`Failed to load toolbar component from module ${m.name}:`, error);
          }
        }
      }
    }
    
    // 按 order 排序
    this.list = orderBy(toolbarComponents, 'order', 'desc');
  }
});

// 工具栏组件
const toolbarComponents = computed(() => {
  return toolbar.list;
});

onMounted(() => {
  toolbar.init();
});
</script>

<style lang="scss" scoped>
.btc-topbar {
  display: flex;
  align-items: center;
  height: 46px;
  padding: 0 10px;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-extra-light);
  box-sizing: border-box;
  transition: height 0.2s ease-in-out;

  .flex1 {
    flex: 1;
  }

  &__tools {
    display: flex;
    align-items: center;
    margin-right: 10px;
    gap: 8px;

    & > li {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      height: 26px;
      cursor: pointer;
      
      // 确保每个 li 内的组件都有正确的间距
      > * {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }

  &__user {
    display: flex;
    align-items: center;
    outline: none;
    cursor: pointer;
    white-space: nowrap;
    padding: 5px 5px 5px 10px;
    border-radius: 6px;

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }

  &__fold-btn {
    margin-right: 10px;
  }

  &__user-name {
    margin-right: 10px;
  }

  :deep(.btc-comm__icon) {
    &:hover {
      border-color: var(--el-color-primary);
      background-color: transparent;
    }
  }

  // 响应式设计
  @media only screen and (max-width: 768px) {
    padding: 0 8px;
    
    &__tools {
      margin-right: 8px;
      
      & > li {
        margin-left: 8px;
      }
    }
    
    &__user {
      padding: 4px 4px 4px 8px;
      
      .el-text {
        display: none; // 在小屏幕上隐藏用户名
      }
    }
  }
}
</style>

<style lang="scss">
.btc-topbar__user-popper {
  .el-dropdown-menu__item {
    padding: 6px 12px;
    font-size: 12px;
  }

  .user {
    display: flex;
    align-items: center;
    padding: 10px 10px;
    width: 200px;
    border-bottom: 1px solid var(--el-color-info-light-9);

    .det {
      margin-left: 10px;
      flex: 1;
      font-size: 12px;
    }
  }

  .btc-svg {
    margin-right: 8px;
    font-size: 16px;
  }
}
</style>
