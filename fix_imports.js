const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/sangmesh/Desktop/global-drill-system-nextjs - Copy/app/drills/memory';

function processFile(filePath) {
    if (!filePath.endsWith('Client.js')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // find import { ... } from 'lucide-react'
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/;
    const match = content.match(importRegex);
    
    if (match) {
        const requiredImports = ['Hash', 'Search', 'Brain', 'ArrowRight', 'Share2', 'Copy', 'Trophy', 'Lightbulb', 'Info', 'Activity'];
        let currentImports = match[1].split(',').map(s => s.trim()).filter(s => s);
        
        let changed = false;
        for (const req of requiredImports) {
            if (!currentImports.includes(req)) {
                currentImports.push(req);
                changed = true;
            }
        }
        
        if (changed) {
            const newImportStr = `import { ${currentImports.join(', ')} } from 'lucide-react'`;
            content = content.replace(importRegex, newImportStr);
            fs.writeFileSync(filePath, content);
            console.log('Updated imports in', filePath);
        }
    }
}

function traverseDir(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
        const fullPath = path.join(currentDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

traverseDir(dir);
console.log('Finished updating imports.');
