/**
 * @file ComponentOverview Storybook 故事
 * @description 组件总览的 Storybook 故事文件
 */

import type { Meta, StoryObj } from '@storybook/vue3'
import ComponentOverview from './ComponentOverview.vue'

const meta: Meta<typeof ComponentOverview> = {
  title: 'Components/ComponentOverview',
  component: ComponentOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '组件总览页面，提供组件的搜索、筛选、查看和管理功能'
      }
    }
  },
  argTypes: {
    // 这里可以添加组件的 props 类型定义
  }
}

export default meta
type Story = StoryObj<typeof ComponentOverview>

/**
 * 默认状态
 */
export const Default: Story = {
  name: '默认状态',
  parameters: {
    docs: {
      description: {
        story: '组件总览的默认显示状态，展示所有组件'
      }
    }
  }
}

/**
 * 项目级组件筛选
 */
export const ProjectComponents: Story = {
  name: '项目级组件',
  parameters: {
    docs: {
      description: {
        story: '筛选显示项目级组件'
      }
    }
  },
  args: {
    // 可以通过 args 传递初始状态
  }
}

/**
 * 模块级组件筛选
 */
export const ModuleComponents: Story = {
  name: '模块级组件',
  parameters: {
    docs: {
      description: {
        story: '筛选显示模块级组件'
      }
    }
  }
}

/**
 * 页面级组件筛选
 */
export const PageComponents: Story = {
  name: '页面级组件',
  parameters: {
    docs: {
      description: {
        story: '筛选显示页面级组件'
      }
    }
  }
}

/**
 * 基础组件筛选
 */
export const BaseComponents: Story = {
  name: '基础组件',
  parameters: {
    docs: {
      description: {
        story: '筛选显示基础组件'
      }
    }
  }
}

/**
 * 复合组件筛选
 */
export const CompositeComponents: Story = {
  name: '复合组件',
  parameters: {
    docs: {
      description: {
        story: '筛选显示复合组件'
      }
    }
  }
}

/**
 * 业务组件筛选
 */
export const BusinessComponents: Story = {
  name: '业务组件',
  parameters: {
    docs: {
      description: {
        story: '筛选显示业务组件'
      }
    }
  }
}

/**
 * 搜索状态
 */
export const WithSearch: Story = {
  name: '搜索状态',
  parameters: {
    docs: {
      description: {
        story: '显示搜索功能的使用状态'
      }
    }
  }
}

/**
 * 移动端视图
 */
export const Mobile: Story = {
  name: '移动端视图',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: '移动端设备上的显示效果'
      }
    }
  }
}

/**
 * 平板端视图
 */
export const Tablet: Story = {
  name: '平板端视图',
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: '平板设备上的显示效果'
      }
    }
  }
}

/**
 * 暗色主题
 */
export const DarkTheme: Story = {
  name: '暗色主题',
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    docs: {
      description: {
        story: '暗色主题下的显示效果'
      }
    }
  }
}

/**
 * 高对比度主题
 */
export const HighContrast: Story = {
  name: '高对比度主题',
  parameters: {
    backgrounds: {
      default: 'high-contrast'
    },
    docs: {
      description: {
        story: '高对比度主题下的显示效果'
      }
    }
  }
}
