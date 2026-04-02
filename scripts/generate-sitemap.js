import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read keyword data
const keywordsPath = path.join(__dirname, '../data/keywords.json');
const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));

// Generate current date as lastmod
const now = new Date();
const lastmod = now.toISOString().split('T')[0];

// Generate sitemap XML
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add homepage
  sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.0</priority>
  </url>
`;

  // Add aggregation page
  sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/solutions</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.9</priority>
  </url>
`;

  // Add static pages
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

  // Add each detail page
  keywords.forEach(keyword => {
    sitemap += `  <url>
    <loc>https://killsubscription.wangdadi.xyz/${keyword.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  // Write file
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log('Sitemap generated successfully at:', outputPath);
};

// Execute generation
generateSitemap();
