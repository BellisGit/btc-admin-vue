const fs = require('fs');
const path = require('path');

// 修复映射 - 所有已知的编码问题
const replacements = [
  // 注释
  ['<!-- 右上角登录链�?-->', '<!-- 右上角登录链接 -->'],
  ['<!-- 第一步：验证手机号表单（手机�?验证码） -->', '<!-- 第一步：验证手机号表单（手机号+验证码） -->'],
  ['<!-- 第二步：设置新密码表�?-->', '<!-- 第二步：设置新密码表单 -->'],
  ['<!-- 每个步骤的按�?-->', '<!-- 每个步骤的按钮 -->'],
  ['<!-- 二维码登�?-->', '<!-- 二维码登录 -->'],
  ['<!-- 第一步：选择供应�?-->', '<!-- 第一步：选择供应商 -->'],
  ['<!-- 搜索�?-->', '<!-- 搜索框 -->'],
  ['<!-- 供应商列�?-->', '<!-- 供应商列表 -->'],
  ['<!-- 忘记密码组件 - 只在密码登录时显�?-->', '<!-- 忘记密码组件 - 只在密码登录时显示 -->'],
  ['<!-- 忘记密码占位空间 - 手机号登录时显示，保持布局一�?-->', '<!-- 忘记密码占位空间 - 手机号登录时显示，保持布局一致 -->'],
  ['<!-- 动态表单内�?-->', '<!-- 动态表单内容 -->'],
  ['<!-- 第三方登�?- 只在非二维码登录模式下显�?-->', '<!-- 第三方登录 - 只在非二维码登录模式下显示 -->'],
  ['<!-- 协议文本 - 只在非二维码登录模式下显�?-->', '<!-- 协议文本 - 只在非二维码登录模式下显示 -->'],
  
  // 单独的文本
  ["'返回登录�?'", "'返回登录'"],
  ["'获取验证�?'", "'获取验证码'"],
  ['上一�?', '上一步'],
  ['下一�?', '下一步'],
  ["'手机号登�?'", "'手机号登录'"],
  ["'刷新二维�?'", "'刷新二维码'"],
  
  // 完整字符串
  ['请输入新密码，确保密码安全可�?', '请输入新密码，确保密码安全可靠'],
  ["'通过手机号验证身�?'", "'通过手机号验证身份'"],
  ["'请完成当前步�?'", "'请完成当前步骤'"],
  
  // placeholder
  ['placeholder="请输入企业邮�?', 'placeholder="请输入企业邮箱"'],
  ['placeholder="请输入登录账�?', 'placeholder="请输入登录账号"'],
  ['placeholder="请输入登录密�?', 'placeholder="请输入登录密码"'],
  ['placeholder="请再次输入密�?', 'placeholder="请再次输入密码"'],
  ['placeholder="请输入真实姓�?', 'placeholder="请输入真实姓名"'],
  ['placeholder="请输入手机号�?', 'placeholder="请输入手机号码"'],
  ['placeholder="请输入企业名�?', 'placeholder="请输入企业名称"'],
  ['placeholder="请输入法人代表姓�?', 'placeholder="请输入法人代表姓名"'],
  ['placeholder="请输入联系电�?', 'placeholder="请输入联系电话"'],
  
  // 注释内的函数说明
  ["// 二维码登�?", "// 二维码登录\n"],
  ["* 二维码登录相关工具函�?", "* 二维码登录相关工具函数"],
  ["* 二维码登录状�?", "* 二维码登录状态"],
  ["* 创建二维码登录状�?", "* 创建二维码登录状态"],
  ["* @returns 二维码登录状态对�?", "* @returns 二维码登录状态对象"],
  ["* 生成二维�?", "* 生成二维码"],
  ["* @param state 二维码状�?", "* @param state 二维码状态"],
  ["* @returns 生成二维码函�?", "* @returns 生成二维码函数"],
  ["* 轮询二维码状�?", "* 轮询二维码状态"],
  ["* @param onStatusChange 状态变化回�?", "* @param onStatusChange 状态变化回调"],
  ["* 创建二维码登录处理函�?", "* 创建二维码登录处理函数"],
  ["* @returns 二维码登录处理函�?", "* @returns 二维码登录处理函数"],
  ["* 创建短信发送处理函�?", "* 创建短信发送处理函数"],
  ["* @returns 短信发送处理对�?", "* @returns 短信发送处理对象"],
  
  // ElMessage
  ["'二维码生成失�?'", "'二维码生成失败'"],
  ["'二维码生成失败，请重�?'", "'二维码生成失败，请重试'"],
  ["'微信登录功能暂未开�?'", "'微信登录功能暂未开启'"],
  ["'APP登录功能暂未开�?'", "'APP登录功能暂未开启'"],
  ["callback(new Error('请输入正确的手机�?)", "callback(new Error('请输入正确的手机号')"],
  
  // description
  ["description: '连接一切的互联网服�?'", "description: '连接一切的互联网服务'"],
  ["description: '全球领先的人工智能公�?'", "description: '全球领先的人工智能公司'"],
  ["description: '全球化的互联网技术公�?'", "description: '全球化的互联网技术公司'"],
  ["description: '中国领先的生活服务电子商务平�?'", "description: '中国领先的生活服务电子商务平台'"],
  
  // 变量注释
  ["// 过滤后的供应商列�?", "// 过滤后的供应商列表\n"],
  ["// 选择供应�?", "// 选择供应商\n"],
  ["// 处理供应商搜�?", "// 处理供应商搜索\n"],
  ["// 搜索逻辑已在 computed 中处�?", "// 搜索逻辑已在 computed 中处理"],
  ["// 处理下一�?", "// 处理下一步\n"],
  ["// 处理上一�?", "// 处理上一步\n"],
  ["// 计算属�?", "// 计算属性\n"],
  
  // 按钮文本
  ["prevButtonText: '上一�?'", "prevButtonText: '上一步'"],
  ["nextButtonText: '下一�?'", "nextButtonText: '下一步'"],
  
  // CSS 注释
  ["height: 40px; /* 与忘记密码组件保持相同高�?*/", "height: 40px; /* 与忘记密码组件保持相同高度 */"],
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let fixCount = 0;
    
    replacements.forEach(([from, to]) => {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        modified = true;
        fixCount++;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return fixCount;
    }
    return 0;
  } catch (e) {
    console.error(`Error fixing ${filePath}:`, e.message);
    return 0;
  }
}

function scanAndFix(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      results.push(...scanAndFix(fullPath));
    } else if (item.name.endsWith('.ts') || item.name.endsWith('.vue') || item.name.endsWith('.scss')) {
      const fixCount = fixFile(fullPath);
      if (fixCount > 0) {
        results.push({
          file: fullPath.replace(/\\/g, '/'),
          fixCount
        });
      }
    }
  }

  return results;
}

const authDir = './src/modules/base/pages/auth';
console.log('开始批量修复剩余编码问题...\n');

const fixed = scanAndFix(authDir);

console.log('=== 修复完成 ===');
console.log(`成功修复: ${fixed.length} 个文件\n`);

let totalFixes = 0;
fixed.forEach((item, index) => {
  const relativePath = item.file.replace('./src/modules/base/pages/auth/', '');
  console.log(`${index + 1}. ${relativePath} (${item.fixCount} 处修复)`);
  totalFixes += item.fixCount;
});

console.log(`\n总计修复: ${totalFixes} 处编码问题`);
