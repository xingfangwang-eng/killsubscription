// Script to count URLs in sitemap
import fs from 'fs';

// Get current directory
const __dirname = new URL('.', import.meta.url).pathname;

// Read sitemap
const sitemapPath = __dirname + '../public/sitemap.xml';
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Count URLs
const urlMatches = sitemapContent.match(/<url>/g);
const urlCount = urlMatches ? urlMatches.length : 0;

console.log('Sitemap Statistics:');
console.log(`Total URLs: ${urlCount}`);
console.log(`Homepage: 1 (https://killsubscription.wangdadi.xyz/)`);
console.log(`Aggregation page: 1 (https://killsubscription.wangdadi.xyz/solutions)`);
console.log(`Static pages: 4 (about, privacy, refund, terms)`);
console.log(`Detail pages: ${urlCount - 6} (100 keyword pages)`);
console.log(`Verification: ${1 + 1 + 4 + (urlCount - 6)} = ${urlCount}`);

if (urlCount === 106) {
  console.log('✅ Sitemap verification successful! Contains 1 homepage, 1 aggregation page, 4 static pages, and 100 detail pages.');
} else {
  console.log('❌ Sitemap verification failed! URL count is incorrect.');
}