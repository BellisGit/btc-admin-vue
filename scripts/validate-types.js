#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Zod 类型验证脚本
 * 使用 Zod 进行运行时类型验证
 */

console.log('🔧 开始 Zod 运行时类型验证...');

// 验证文件列表
const validationFiles = [
  'src/btc/utils/validation.ts',
  'src/btc/config/validation.ts',
  'src/btc/middleware/validation.ts',
  'src/btc/examples/validation-example.ts'
];

// 检查验证文件是否存在
function checkValidationFiles() {
  console.log('📁 检查验证文件...');
  
  let allFilesExist = true;
  
  validationFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - 文件不存在`);
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

// 验证 TypeScript 编译
function validateTypeScriptCompilation() {
  console.log('\n🔨 验证 TypeScript 编译...');
  
  try {
    // 只检查验证相关的文件
    const filesToCheck = validationFiles.join(' ');
    execSync(`npx tsc --noEmit ${filesToCheck}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ TypeScript 编译验证通过');
    return true;
  } catch (error) {
    console.error('❌ TypeScript 编译验证失败');
    return false;
  }
}

// 运行 Zod 示例
function runZodExamples() {
  console.log('\n🚀 运行 Zod 验证示例...');
  
  try {
    // 编译并运行示例文件
    const exampleFile = path.join(process.cwd(), 'src/btc/examples/validation-example.ts');
    
    if (fs.existsSync(exampleFile)) {
      // 使用 ts-node 运行 TypeScript 文件
      execSync(`npx ts-node ${exampleFile}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      console.log('✅ Zod 示例运行成功');
      return true;
    } else {
      console.log('⚠️  示例文件不存在，跳过示例运行');
      return true;
    }
  } catch (error) {
    console.error('❌ Zod 示例运行失败:', error.message);
    return false;
  }
}

// 验证 Zod 模式定义
function validateZodSchemas() {
  console.log('\n📋 验证 Zod 模式定义...');
  
  const validationUtilsPath = path.join(process.cwd(), 'src/btc/utils/validation.ts');
  
  if (!fs.existsSync(validationUtilsPath)) {
    console.error('❌ 验证工具文件不存在');
    return false;
  }
  
  try {
    // 读取文件内容并检查关键模式
    const content = fs.readFileSync(validationUtilsPath, 'utf8');
    
    const requiredSchemas = [
      'UserSchema',
      'LoginRequestSchema',
      'MenuItemSchema',
      'ServiceSchema',
      'ResponseSchema',
      'PaginationSchema'
    ];
    
    let allSchemasFound = true;
    
    requiredSchemas.forEach(schema => {
      if (content.includes(schema)) {
        console.log(`✅ ${schema} 已定义`);
      } else {
        console.log(`❌ ${schema} 未定义`);
        allSchemasFound = false;
      }
    });
    
    return allSchemasFound;
  } catch (error) {
    console.error('❌ 读取验证文件失败:', error.message);
    return false;
  }
}

// 生成验证报告
function generateValidationReport() {
  console.log('\n📊 生成验证报告...');
  
  const report = {
    timestamp: new Date().toISOString(),
    type: 'zod-validation',
    results: {
      filesExist: checkValidationFiles(),
      typescriptCompilation: validateTypeScriptCompilation(),
      zodSchemas: validateZodSchemas(),
      examples: runZodExamples()
    }
  };
  
  // 计算总体状态
  const allPassed = Object.values(report.results).every(result => result === true);
  report.status = allPassed ? 'success' : 'failed';
  
  // 保存报告
  const reportPath = path.join(process.cwd(), 'zod-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`📄 验证报告已保存: ${reportPath}`);
  console.log(`📈 总体状态: ${report.status === 'success' ? '✅ 通过' : '❌ 失败'}`);
  
  return allPassed;
}

// 主函数
function main() {
  console.log('🎯 Zod 类型验证开始\n');
  
  const allPassed = generateValidationReport();
  
  if (allPassed) {
    console.log('\n🎉 所有验证通过！');
    process.exit(0);
  } else {
    console.log('\n💥 验证失败，请检查上述错误');
    process.exit(1);
  }
}

// 运行主函数
main();
