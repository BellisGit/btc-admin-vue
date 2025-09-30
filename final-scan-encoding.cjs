const fs = require('fs');
const path = require('path');

function scanFiles(dir, baseDir = dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      results.push(...scanFiles(fullPath, baseDir));
    } else if (item.name.endsWith('.ts') || item.name.endsWith('.vue') || item.name.endsWith('.scss')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        // 查找所有包含乱码的行
        const lines = content.split('\n');
        const issues = [];
        
        lines.forEach((line, index) => {
          // 查找 � 字符或其他常见编码问题
          if (line.includes('�') || 
              line.match(/['"].*[\ufffd].*['"]/) ||
              line.match(/\/\/.*[\ufffd]/) ||
              line.match(/\?\s*$/) && line.match(/[\u4e00-\u9fa5]/) ||
              line.match(/['"].*\?\s*$/)) {
            issues.push({
              line: index + 1,
              content: line.trim().substring(0, 100)
            });
          }
        });
        
        if (issues.length > 0) {
          const relativePath = fullPath.replace(baseDir, '').replace(/\\/g, '/').replace(/^\//, '');
          results.push({
            file: relativePath,
            fullPath: fullPath.replace(/\\/g, '/'),
            issueCount: issues.length,
            issues: issues
          });
        }
      } catch (e) {
        // 忽略
      }
    }
  }

  return results;
}

const authDir = './src/modules/base/pages/auth';
const files = scanFiles(authDir, authDir);

console.log('=== 剩余编码问题 ===');
console.log(`总计: ${files.length} 个文件\n`);

if (files.length === 0) {
  console.log('✅ 没有发现编码问题！');
} else {
  files.forEach((item, index) => {
    console.log(`${index + 1}. ${item.file} (${item.issueCount} 个问题)`);
    item.issues.forEach(issue => {
      console.log(`   第${issue.line}行: ${issue.content}`);
    });
    console.log('');
  });
}
