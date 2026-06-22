const fs = require('fs');
const file = 'C:/Users/sangmesh/Desktop/global-drill-system-nextjs - Copy/app/drills/memory/long-term-memory/story-recall/StoryRecallClient.js';
let content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');

// 1. Find the new global footer (it has 'GLOBAL FOOTER')
const globalFooterIdx = lines.findIndex(l => l.includes('{/* GLOBAL FOOTER */}'));

if (globalFooterIdx !== -1) {
    // 2. Find the end of it (the next </footer>)
    let endFooterIdx = -1;
    for (let i = globalFooterIdx; i < lines.length; i++) {
        if (lines[i].includes('</footer>')) {
            endFooterIdx = i;
            break;
        }
    }
    
    // 3. Find where StatCard begins
    const statCardIdx = lines.findIndex(l => l.includes('function StatCard'));
    
    if (endFooterIdx !== -1 && statCardIdx !== -1) {
        // Keep everything up to the </footer>, then add the closing wrappers, then append StatCard onwards.
        const firstPart = lines.slice(0, endFooterIdx + 1);
        const middlePart = [
            '        </>',
            '      )}',
            '      </div>',
            '    </div>',
            '  );',
            '}',
            ''
        ];
        const lastPart = lines.slice(statCardIdx);
        
        const finalLines = [...firstPart, ...middlePart, ...lastPart];
        fs.writeFileSync(file, finalLines.join('\n'));
        console.log('Fixed StoryRecallClient.js successfully.');
    } else {
        console.log('Could not find endFooterIdx or statCardIdx');
    }
} else {
    console.log('Could not find GLOBAL FOOTER in StoryRecallClient.js');
}
