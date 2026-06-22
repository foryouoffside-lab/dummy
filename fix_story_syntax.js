const fs = require('fs');
const file = 'C:/Users/sangmesh/Desktop/global-drill-system-nextjs - Copy/app/drills/memory/long-term-memory/story-recall/StoryRecallClient.js';
let content = fs.readFileSync(file, 'utf8');

// Fix the extra wrapper issue
content = content.replace(/\{!isFullscreen && \(\s*\{\/\* ABOUT, FAQ & RELATED DRILLS \*\/\}/g, '{/* ABOUT, FAQ & RELATED DRILLS */}');
content = content.replace(/<\/>\s*\)\}\s*\)\}\s*<\/div>/g, '</>\n      )}\n      </div>');

fs.writeFileSync(file, content);
console.log('Fixed syntax error in StoryRecallClient.js');
