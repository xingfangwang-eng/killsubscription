// 验证首页页脚链接的脚本
import http from 'http';

const links = [
  'http://localhost:3001/terms',
  'http://localhost:3001/privacy',
  'http://localhost:3001/refund',
  'http://localhost:3001/about'
];

function verifyLink(link) {
  return new Promise((resolve, reject) => {
    const url = new URL(link);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    const req = http.request(options, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ link, status: res.statusCode, success: true });
      } else {
        resolve({ link, status: res.statusCode, success: false });
      }
    });

    req.on('error', (error) => {
      console.error(`Error for ${link}:`, error);
      reject({ link, error: error.message });
    });

    req.end();
  });
}

async function verifyLinks() {
  console.log('开始验证首页页脚链接...');
  
  for (const link of links) {
    try {
      const result = await verifyLink(link);
      if (result.success) {
        console.log(`✅ ${result.link} - 成功 (${result.status})`);
      } else {
        console.log(`❌ ${result.link} - 失败 (${result.status})`);
      }
    } catch (error) {
      console.log(`❌ ${error.link} - 错误: ${error.error}`);
    }
  }
  
  console.log('验证完成！');
}

verifyLinks();