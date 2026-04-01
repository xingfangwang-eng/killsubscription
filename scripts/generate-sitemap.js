import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取关键词数据
const keywordsPath = path.join(__dirname, '../data/keywords.json');
const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));

// 生成当前日期作为 lastmod
const now = new Date();
const lastmod = now.toISOString().split('T')[0];

// 生成 sitemap XML
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // 添加首页
  sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.0</priority>
  </url>
`;

  // 添加聚合页
  sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/solutions</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.9</priority>
  </url>
`;

  // 添加静态页面
  sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/about</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>
`;

  sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/privacy</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>
`;

  sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/refund</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>
`;

  sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/terms</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>
`;

  // 添加每个详情页
  keywords.forEach(keyword => {
    sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/${keyword.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  // 写入文件
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log('Sitemap generated successfully at:', outputPath);
};

// 执行生成
generateSitemap();
