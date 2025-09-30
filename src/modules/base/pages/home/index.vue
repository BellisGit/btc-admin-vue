<template>
  <div class="btc-home">
    <div class="btc-home__header">
      <h1 class="btc-home__title">欢迎使用 BTC SaaS</h1>
      <p class="btc-home__subtitle">基于 Cool-Admin-Vue 架构的企业级 SaaS 应用</p>
    </div>

    <div class="btc-home__content">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="card in featureCards" :key="card.title">
          <el-card class="btc-home__card" shadow="hover">
            <div class="btc-home__card-icon">
              <btc-svg :name="card.icon" :size="32" />
            </div>
            <h3 class="btc-home__card-title">{{ card.title }}</h3>
            <p class="btc-home__card-desc">{{ card.description }}</p>
            <el-button type="primary" text @click="handleCardClick(card)">
              {{ card.actionText }}
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="btc-home__footer">
      <el-divider />
      <div class="btc-home__info">
        <p>© 2024 BTC SaaS. All rights reserved.</p>
        <p>基于 Cool-Admin-Vue 构建</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBtc } from '/@/btc';
import { useBase } from '/$/base';

defineOptions({
  name: 'BtcHome'
});

const { router } = useBtc();
const { app } = useBase();

// 功能卡片数据
const featureCards = [
  {
    title: '用户管理',
    description: '管理系统用户，包括用户信息、权限分配等',
    icon: 'user',
    actionText: '进入管理',
    path: '/system/user'
  },
  {
    title: '角色管理',
    description: '管理系统角色，配置角色权限和菜单访问',
    icon: 'role',
    actionText: '进入管理',
    path: '/system/role'
  },
  {
    title: '菜单管理',
    description: '管理系统菜单，配置菜单结构和权限',
    icon: 'menu',
    actionText: '进入管理',
    path: '/system/menu'
  },
  {
    title: 'CRUD 演示',
    description: '查看 CRUD 组件的使用示例和功能演示',
    icon: 'table',
    actionText: '查看演示',
    path: '/demo/crud'
  },
  {
    title: '组件演示',
    description: '查看各种组件的使用示例和功能演示',
    icon: 'component',
    actionText: '查看演示',
    path: '/demo/components'
  },
  {
    title: '系统设置',
    description: '配置系统参数、主题设置等系统级配置',
    icon: 'setting',
    actionText: '进入设置',
    path: '/system/settings'
  }
];

// 处理卡片点击
const handleCardClick = (card: any) => {
  if (card.path) {
    router.push(card.path);
  }
};
</script>

<style lang="scss" scoped>
.btc-home {
  &__header {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 0;
    background: linear-gradient(135deg, var(--el-color-primary-light-9) 0%, var(--el-color-primary-light-8) 100%);
    border-radius: 12px;
  }

  &__title {
    font-size: 32px;
    font-weight: 600;
    color: var(--el-color-primary);
    margin: 0 0 16px 0;
  }

  &__subtitle {
    font-size: 16px;
    color: var(--el-text-color-regular);
    margin: 0;
  }

  &__content {
    margin-bottom: 40px;
  }

  &__card {
    height: 100%;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid var(--el-border-color-light);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .el-card__body {
      padding: 24px;
    }
  }

  &__card-icon {
    margin-bottom: 16px;
    color: var(--el-color-primary);
  }

  &__card-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0 0 12px 0;
  }

  &__card-desc {
    font-size: 14px;
    color: var(--el-text-color-regular);
    line-height: 1.6;
    margin: 0 0 20px 0;
    min-height: 44px;
  }

  &__footer {
    text-align: center;
  }

  &__info {
    p {
      margin: 8px 0;
      color: var(--el-text-color-regular);
      font-size: 14px;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .btc-home {
    &__header {
      padding: 20px 0;
    }

    &__title {
      font-size: 24px;
    }

    &__subtitle {
      font-size: 14px;
    }

    &__card {
      margin-bottom: 16px;
    }
  }
}
</style>
