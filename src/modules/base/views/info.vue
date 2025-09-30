<template>
  <div class="btc-user-info">
    <el-card class="btc-user-card">
      <template #header>
        <div class="btc-card-header">
          <span>个人中心</span>
        </div>
      </template>
      
      <div class="btc-user-content">
        <div class="btc-user-avatar">
          <btc-avatar
            :src="userInfo.avatar"
            :size="80"
            :placeholder="userInfo.nickname?.charAt(0) || 'U'"
          />
        </div>
        
        <div class="btc-user-details">
          <h3>{{ userInfo.nickname || userInfo.username }}</h3>
          <p class="btc-user-email">{{ userInfo.email }}</p>
          <p class="btc-user-phone">{{ userInfo.phone }}</p>
          
          <div class="btc-user-roles">
            <el-tag
              v-for="role in userInfo.roles"
              :key="role"
              type="primary"
              size="small"
              class="btc-role-tag"
            >
              {{ role }}
            </el-tag>
          </div>
        </div>
      </div>
      
      <div class="btc-user-actions">
        <el-button type="primary" @click="editProfile">编辑资料</el-button>
        <el-button @click="changePassword">修改密码</el-button>
        <el-button type="danger" @click="logout">退出登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();

const userInfo = computed(() => userStore.info);

const editProfile = () => {
  ElMessage.info('编辑资料功能开发中...');
};

const changePassword = () => {
  ElMessage.info('修改密码功能开发中...');
};

const logout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    
    userStore.logout();
    ElMessage.success('退出成功');
    router.push('/auth');
  } catch {
    // 用户取消
  }
};
</script>

<style lang="scss" scoped>
.btc-user-info {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.btc-user-card {
  .btc-card-header {
    font-size: 18px;
    font-weight: 500;
  }
}

.btc-user-content {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.btc-user-avatar {
  margin-right: 24px;
}

.btc-user-details {
  flex: 1;
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    color: var(--el-text-color-primary);
  }
  
  p {
    margin: 4px 0;
    color: var(--el-text-color-regular);
  }
}

.btc-user-roles {
  margin-top: 12px;
  
  .btc-role-tag {
    margin-right: 8px;
    margin-bottom: 4px;
  }
}

.btc-user-actions {
  text-align: center;
  
  .el-button + .el-button {
    margin-left: 12px;
  }
}
</style>
