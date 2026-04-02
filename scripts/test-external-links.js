import fetch from 'node-fetch';

// External links to test
const externalLinks = [
  // CDN links
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  
  // API links
  'https://randomuser.me/api/portraits/men/1.jpg',
  
  // Service links
  'https://vercel.com/new?template=https://github.com/vercel/vercel/tree/main/examples/create-react-app',
  'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=xingfang.wang%40gmail.com&item_name=Support%20KillSubscription&currency_code=USD',
  
  // Other links
  'https://schema.org'
];

// Test link function
async function testLink(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      timeout: 10000 // 10 second timeout
    });
    
    console.log(`✅ ${url} - ${response.status} ${response.statusText}`);
    return response.status === 200;
  } catch (error) {
    console.log(`❌ ${url} - ${error.message}`);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('Testing external links...\n');
  
  const results = await Promise.all(externalLinks.map(testLink));
  
  console.log('\nTest Summary:');
  console.log(`Total links: ${externalLinks.length}`);
  console.log(`Successful: ${results.filter(result => result).length}`);
  console.log(`Failed: ${results.filter(result => !result).length}`);
}

// Execute tests
runTests();
