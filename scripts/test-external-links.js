import fetch from 'node-fetch';

// 要测试的外部链接
const externalLinks = [
  // CDN 链接
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  
  // API 链接
  'https://randomuser.me/api/portraits/men/1.jpg',
  
  // 服务链接
  'https://vercel.com/new?template=https://github.com/vercel/vercel/tree/main/examples/create-react-app',
  'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=xingfang.wang%40gmail.com&item_name=Support%20KillSubscription&currency_code=USD',
  
  // 其他链接
  'https://schema.org'
];

// 测试链接函数
async function testLink(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      timeout: 10000 // 10秒超时
    });
    
    console.log(`✅ ${url} - ${response.status} ${response.statusText}`);
    return response.status === 200;
  } catch (error) {
    console.log(`❌ ${url} - ${error.message}`);
    return false;
  }
}

// 运行所有测试
async function runTests() {
  console.log('Testing external links...\n');
  
  const results = await Promise.all(externalLinks.map(testLink));
  
  console.log('\nTest Summary:');
  console.log(`Total links: ${externalLinks.length}`);
  console.log(`Successful: ${results.filter(result => result).length}`);
  console.log(`Failed: ${results.filter(result => !result).length}`);
}

// 执行测试
runTests();
