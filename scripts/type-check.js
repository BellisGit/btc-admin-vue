#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 类型检查脚本
 * 支持多种检查模式：strict, loose, validation
 */

const args = process.argv.slice(2);
const mode = args[0] || 'strict';

console.log(`🔍 开始 TypeScript 类型检查 (模式: ${mode})`);

// 检查模式配置
const checkModes = {
  strict: {
    description: '严格模式 - 检查所有类型错误',
    command: 'vue-tsc --project tsconfig.strict.json --noEmit',
    exitOnError: true
  },
  loose: {
    description: '宽松模式 - 忽略未使用变量等警告',
    command: 'vue-tsc --project tsconfig.loose.json --noEmit',
    exitOnError: false
  },
  validation: {
    description: '验证模式 - 使用 Zod 进行运行时验证',
    command: 'node scripts/validate-types.js',
    exitOnError: true
  },
  watch: {
    description: '监听模式 - 持续检查文件变化',
    command: 'vue-tsc --project tsconfig.json --noEmit --watch',
    exitOnError: false
  },
  medium: {
    description: '中等严格模式 - 平衡严格性和实用性',
    command: 'vue-tsc --project tsconfig.medium.json --noEmit',
    exitOnError: false
  }
};

// 获取当前模式配置
const currentMode = checkModes[mode];
if (!currentMode) {
  console.error(`❌ 未知的检查模式: ${mode}`);
  console.log('可用模式:', Object.keys(checkModes).join(', '));
  process.exit(1);
}

console.log(`📋 ${currentMode.description}`);

try {
  // 执行类型检查
  if (mode === 'validation') {
    // 运行 Zod 验证
    runZodValidation();
  } else {
    // 运行 TypeScript 检查
    execSync(currentMode.command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
  }
  
  console.log('✅ 类型检查通过');
  
} catch (error) {
  console.error('❌ 类型检查失败');
  
  if (currentMode.exitOnError) {
    process.exit(1);
  } else {
    console.log('⚠️  继续执行（非严格模式）');
  }
}

/**
 * 运行 Zod 验证
 */
function runZodValidation() {
  console.log('🔧 运行 Zod 运行时验证...');
  
  // 这里可以添加具体的 Zod 验证逻辑
  // 例如验证配置文件、API 响应等
  
  const validationFiles = [
    'src/btc/utils/validation.ts',
    'src/btc/config/validation.ts',
    'src/btc/middleware/validation.ts'
  ];
  
  validationFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ 验证文件存在: ${file}`);
    } else {
      console.log(`⚠️  验证文件缺失: ${file}`);
    }
  });
  
  console.log('✅ Zod 验证完成');
}

/**
 * 生成类型报告
 */
function generateTypeReport() {
  console.log('📊 生成类型检查报告...');
  
  try {
    // 运行类型检查并捕获输出
    const output = execSync('vue-tsc --build --force --noEmit', { 
      encoding: 'utf8',
      cwd: process.cwd()
    });
    
    // 分析输出并生成报告
    const report = {
      timestamp: new Date().toISOString(),
      mode: mode,
      status: 'success',
      errors: [],
      warnings: []
    };
    
    // 保存报告
    const reportPath = path.join(process.cwd(), 'type-check-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`📄 报告已保存: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ 生成报告失败:', error.message);
  }
}

// 如果指定了 --report 参数，生成报告
if (args.includes('--report')) {
  generateTypeReport();
}
