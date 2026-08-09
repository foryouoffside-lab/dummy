const fs = require('fs');
const path = require('path');

const drillsDir = path.join(__dirname, '..', 'app', 'drills');

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (file === 'page.js' || file === 'page.tsx') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allPages = walkDir(drillsDir);

const drillRoutes = [];
const categoryPages = new Set(['/', '/drills/cognitive', '/drills/fps', '/drills/memory', '/drills/motor', '/drills/physical', '/drills/visual', '/drills/visual-tracking']);

allPages.forEach(filePath => {
  const relativePath = path.relative(drillsDir, filePath);
  const parts = relativePath.split(path.sep);
  
  // Exclude category hubs if they just have a page.js or page.tsx, although we will add them manually
  const pageFile = parts[parts.length - 1];
  const isPageFile = pageFile === 'page.js' || pageFile === 'page.tsx';

  if (parts.length === 1 && isPageFile) {
    // This is /drills/page.js or page.tsx
    categoryPages.add('/drills');
    return;
  }
  if (parts.length === 2 && isPageFile) {
    // This is /drills/category/page.js or page.tsx
    categoryPages.add(`/drills/${parts[0]}`);
    return;
  }
  
  if (isPageFile) {
    const route = `/drills/${parts.slice(0, -1).join('/')}`.replace(/\\/g, '/');
    const category = parts[0];
    
    let priority = 0.85;
    if (category === 'fps') priority = 1.0;
    else if (category === 'motor' || category === 'physical') priority = 0.9;
    
    drillRoutes.push({
      path: route,
      category: category,
      priority: priority
    });
  }
});

let sitemapCode = `// app/sitemap.js
// Dynamic XML Sitemap - Auto-generated
// Auto-submitted to Google Search Console for indexing

const BASE_URL = 'https://skilldrills.online';

const categoryPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
`;

Array.from(categoryPages).forEach(catPath => {
  if (catPath === '/') return;
  sitemapCode += `  { path: '${catPath}', priority: 0.9, changefreq: 'weekly' },\n`;
});

sitemapCode += `];

const drillRoutes = [
`;

drillRoutes.forEach(route => {
  sitemapCode += `  { path: '${route.path}', category: '${route.category}', priority: ${route.priority} },\n`;
});

sitemapCode += `];

export default async function sitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  const categoryEntries = categoryPages.map((page) => ({
    url: \`\${BASE_URL}\${page.path}\`,
    lastModified: today,
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
  
  const drillEntries = drillRoutes.map((drill) => ({
    url: \`\${BASE_URL}\${drill.path}\`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: drill.priority,
  }));
  
  return [...categoryEntries, ...drillEntries];
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'app', 'sitemap.js'), sitemapCode, 'utf8');
console.log(`Rebuilt sitemap with ${categoryPages.size + drillRoutes.length} URLs.`);
