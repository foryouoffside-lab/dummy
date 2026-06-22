const fs = require('fs');
const path = require('path');

const drillsDir = path.join(__dirname, '..', 'app', 'drills');

function toTitleCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function generateTitle(drillName, categoryName) {
  const base = `${drillName} Test`;
  const catBase = categoryName.includes('FPS') ? 'FPS Aim Trainer' : `${categoryName} Training`;
  let title = `${base} - Free ${catBase}`;
  
  if (title.length < 40) {
     title = `${drillName} Trainer - Free ${catBase}`;
  }
  
  if (title.length > 60) {
    title = `${drillName} - Free ${catBase}`.substring(0, 60);
    title = title.replace(/[\s-]+$/, '');
  }
  
  return title + " | SkillDrills";
}

function generateDescription(drillName, categoryName) {
  return `Improve your skills with our free ${drillName} trainer. Designed for optimal ${categoryName.toLowerCase()} practice. Play instantly in your browser, no sign-up required.`;
}

function generateKeywords(drillName, categoryName, subCategoryName) {
  return [
    `${drillName.toLowerCase()} drill`,
    `${drillName.toLowerCase()} trainer`,
    `${drillName.toLowerCase()} practice online`,
    `free ${drillName.toLowerCase()} game`,
    `${categoryName.toLowerCase()} training`,
    `${subCategoryName.toLowerCase()} practice`,
    `improve ${subCategoryName.toLowerCase()}`,
    `browser ${categoryName.toLowerCase()} test`,
    `skilldrills ${drillName.toLowerCase()}`,
    `free online ${categoryName.toLowerCase()} drill`,
    `${drillName.toLowerCase()} speed test`,
    `${drillName.toLowerCase()} cognitive exercise`,
    `play ${drillName.toLowerCase()} free`
  ];
}

function processFile(filePath) {
  const relativePath = path.relative(drillsDir, filePath);
  const parts = relativePath.split(path.sep);
  
  if (parts.length < 2 || parts[parts.length - 1] !== 'page.js') return;
  
  const categoryStr = parts[0];
  let subCategoryStr = categoryStr;
  let drillStr = parts[parts.length - 2];

  if (parts.length > 3) {
    subCategoryStr = parts[1];
  } else if (parts.length === 3) {
    subCategoryStr = parts[1]; 
  }
  
  const categoryName = categoryStr === 'fps' ? 'FPS' : toTitleCase(categoryStr);
  const subCategoryName = toTitleCase(subCategoryStr);
  const drillName = toTitleCase(drillStr);
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if it doesn't have metadata (like layout files)
  if (!content.includes('export const metadata')) return;

  const title = generateTitle(drillName, categoryName);
  const description = generateDescription(drillName, categoryName);
  const keywords = generateKeywords(drillName, categoryName, subCategoryName);
  const canonicalUrl = `https://skilldrills.online/drills/${parts.slice(0, -1).join('/')}`.replace(/\\/g, '/');

  const formattedKeywords = JSON.stringify(keywords, null, 4).replace(/"/g, "'").split('\\n').join('\n    ');
  
  const metadataBlock = `export const metadata = {
  title: '${title.replace(/'/g, "\\'")}',
  description: '${description.replace(/'/g, "\\'")}',
  keywords: ${formattedKeywords},
  openGraph: {
    title: '${title.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    type: 'article',
    url: '${canonicalUrl}',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: '${drillName.replace(/'/g, "\\'")} Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: '${canonicalUrl}',
  },
};`;

  const startIndex = content.indexOf('export const metadata');
  if (startIndex !== -1) {
    const endStr = '};';
    const endIndex = content.indexOf(endStr, startIndex);
    if (endIndex !== -1) {
      content = content.substring(0, startIndex) + metadataBlock + content.substring(endIndex + endStr.length);
    }
  }

  const newBreadcrumbListItems = [];
  newBreadcrumbListItems.push(`{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" }`);
  newBreadcrumbListItems.push(`{ "@type": "ListItem", "position": 2, "name": "${categoryName} Drills", "item": "https://skilldrills.online/drills/${categoryStr}" }`);
  
  if (parts.length > 3) {
    newBreadcrumbListItems.push(`{ "@type": "ListItem", "position": 3, "name": "${subCategoryName}", "item": "https://skilldrills.online/drills/${categoryStr}/${subCategoryStr}" }`);
    newBreadcrumbListItems.push(`{ "@type": "ListItem", "position": 4, "name": "${drillName}" }`);
  } else {
    newBreadcrumbListItems.push(`{ "@type": "ListItem", "position": 3, "name": "${drillName}" }`);
  }

  // Use actual newlines here
  const breadcrumbReplacement = `"@type": "BreadcrumbList",
            "itemListElement": [
              ${newBreadcrumbListItems.join(',\n              ')}
            ]`;

  const webAppReplacement = `"@type": "WebApplication",
            "name": "${drillName} Trainer",
            "url": "${canonicalUrl}",
            "description": "${description.replace(/"/g, '\\"')}",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "isAccessibleForFree": true`;

  const faqReplacement = `"@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the ${drillName} drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The ${drillName} drill is a free interactive trainer designed to improve your ${subCategoryName.toLowerCase()} and overall ${categoryName.toLowerCase()} skills."
                }
              },
              {
                "@type": "Question",
                "name": "Is the ${drillName} trainer free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, it is completely free to play directly in your browser. No sign-up or registration is required."
                }
              },
              {
                "@type": "Question",
                "name": "How does this improve ${categoryName.toLowerCase()}?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "By consistently practicing the ${drillName} exercise, you build muscle memory and cognitive speed, directly translating to better performance in relevant tasks."
                }
              }
            ]`;

  content = content.replace(/"@type":\s*"BreadcrumbList"[\s\S]*?\]/, breadcrumbReplacement);
  content = content.replace(/"@type":\s*"WebApplication"[\s\S]*?"isAccessibleForFree":\s*(true|false)/, webAppReplacement);
  content = content.replace(/"@type":\s*"FAQPage"[\s\S]*?\]/, faqReplacement);

  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

walkDir(drillsDir);
console.log('Finished updating SEO metadata and JSON-LD schemas.');
