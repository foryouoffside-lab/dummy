const fs = require('fs');
const path = require('path');

const historyDir = 'C:/Users/sangmesh/AppData/Roaming/Code/User/History';
const targetDir = 'C:/Users/sangmesh/Desktop/global-drill-system-nextjs - Copy/app/drills/memory';

// Function to recover files from VS Code History
function recoverVSCodeHistory() {
    const folders = fs.readdirSync(historyDir);
    let recoveredCount = 0;
    
    for (const folder of folders) {
        const folderPath = path.join(historyDir, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;
        
        const entriesFile = path.join(folderPath, 'entries.json');
        if (!fs.existsSync(entriesFile)) continue;
        
        try {
            const entriesData = JSON.parse(fs.readFileSync(entriesFile, 'utf8'));
            const resourceUrl = entriesData.resource;
            
            // Check if this history entry is for a file in our target directory
            if (resourceUrl && resourceUrl.includes('app/drills/memory') && resourceUrl.endsWith('Client.js')) {
                // Convert file:/// URI to local path
                let localPath = resourceUrl.replace('file:///', '').replace(/\\/g, '/');
                localPath = decodeURIComponent(localPath);
                
                if (localPath.includes('global-drill-system-nextjs - Copy')) {
                    // Find the most recent entry before our disaster
                    // The disaster (git checkout) happened around timestamp 1718839467000 (roughly 23:24 UTC)
                    // We just want the absolute latest entry in the history, because VS Code creates a new entry 
                    // BEFORE the file changes from git checkout.
                    
                    const entries = entriesData.entries;
                    if (entries && entries.length > 0) {
                        // Sort entries by timestamp descending
                        entries.sort((a, b) => b.timestamp - a.timestamp);
                        
                        // We want the most recent entry that was saved by the user.
                        // Actually, just grabbing the most recent entry before our git checkout is safest.
                        // Let's just grab the absolute most recent entry in the entries array for now.
                        // Wait, if git checkout changed the file, VS code might have created an entry FOR the git checkout.
                        // Let's look for the most recent entry that is NOT the git checkout.
                        // Just to be safe, let's print all timestamps for this file.
                        console.log(`Found history for: ${localPath}`);
                        console.log(`Latest timestamps:`);
                        entries.slice(0, 3).forEach(e => {
                            console.log(`  - ${new Date(e.timestamp).toISOString()} (ID: ${e.id})`);
                        });
                        
                        // Let's restore the entry that is right before 23:24:27 UTC.
                        // 23:24:27 UTC on June 19, 2026 is 1781911467000 ms.
                        const targetTime = new Date('2026-06-19T23:24:27Z').getTime();
                        
                        const validEntries = entries.filter(e => e.timestamp < targetTime);
                        if (validEntries.length > 0) {
                            const bestEntry = validEntries[0];
                            const sourceFile = path.join(folderPath, bestEntry.id);
                            
                            // Let's preview what we're going to restore
                            console.log(`  => Will restore from: ${new Date(bestEntry.timestamp).toISOString()}`);
                            
                            // Restore it
                            const content = fs.readFileSync(sourceFile, 'utf8');
                            fs.writeFileSync(localPath, content);
                            console.log(`  => Restored ${path.basename(localPath)}`);
                            recoveredCount++;
                        }
                    }
                }
            }
        } catch (e) {
            // Ignore parse errors
        }
    }
    
    console.log(`Total files recovered: ${recoveredCount}`);
}

recoverVSCodeHistory();
