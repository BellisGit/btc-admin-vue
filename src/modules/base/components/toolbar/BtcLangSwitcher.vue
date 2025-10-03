<template>
  <div class="btc-lang-switch">
    <el-dropdown trigger="click" @command="handleCommand">
      <div class="btc-comm__icon">
        <btc-svg name="i18n-lang" />
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languages"
            :key="item.value"
            :command="item.value"
          >
            <div
              class="btc-lang-switch__item"
              :class="{ active: currentLang === item.value }"
            >
              <span class="btc-lang-switch__item-label">{{ item.label }}</span>
              <span class="btc-lang-switch__item-dot"></span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'BtcLangSwitcher'
});

const { locale } = useI18n();

const languages = ref([
  { label: '简体中文', value: 'zh-cn' },
  { label: 'English', value: 'en' }
]);

const currentLang = computed(() => locale.value);

function handleCommand(lang: string) {
  locale.value = lang;
  localStorage.setItem('locale', lang);
}
</script>

<style lang="scss" scoped>
.btc-lang-switch {
  &__item {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-label {
      font-size: 12px;
    }

    &.active {
      .btc-lang-switch__item-label {
        color: var(--el-color-primary);
      }

      .btc-lang-switch__item-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--el-color-primary);
      }
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>


