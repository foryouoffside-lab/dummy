import os
import re

root_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\app\drills"
exclude_dirs = {"fps", ".next", "node_modules"}

report = []

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        if file.endswith("Client.js"):
            # Skip category hubs
            if file in {
                "AcademicDrillsClient.js", "CognitiveHubClient.js", "MemoryClient.js", 
                "MentalFitnessClient.js", "MotorDrillsClient.js", "PhysicalDrillsClient.js", 
                "ProductivityDrillsClient.js", "VisualDrillsClient.js"
            }:
                continue
                
            filepath = os.path.join(root, file)
            rel_path = os.path.relpath(filepath, root_dir)
            
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Check footer elements
                has_all_rights = "All rights reserved" in content
                has_twitter = "twitter.com/skilldrillss" in content or "twitter.com" in content
                has_instagram = "instagram.com/skilldrills.online" in content or "instagram.com" in content
                has_youtube = "youtube.com/@skilldrills.online" in content or "youtube.com" in content
                has_pinterest = "pinterest.com/skilldrills" in content or "pinterest.com" in content
                
                # Check about cards
                # Look for typical keywords: "Who It's For" or "Who It&apos;s For"
                has_who = any(x in content for x in ["Who It's For", "Who It&apos;s For", "Who it's for", "Who it&apos;s for", "Who It’s For"])
                has_skills = any(x in content for x in ["Skills Improved", "skills improved", "Skills improved"])
                has_track = any(x in content for x in ["What You'll Track", "What You&apos;ll Track", "what you'll track", "what you&apos;ll track", "What You’ll Track"])
                has_why = any(x in content for x in ["Why Practice", "Why train", "Why Train", "Why practice", "Why ", "Why"])
                has_how = any(x in content for x in ["How to Practice", "How to practice", "How to Train", "How to train", "How to "])
                
                # Find related drills count
                match = re.search(r'<section\s+[^>]*aria-label=["\'`]Related[^"\'`]*["\'`][^>]*>(.*?)</section>', content, re.DOTALL | re.IGNORECASE)
                
                related_count = 0
                if match:
                    section_content = match.group(1)
                    p1 = re.findall(r'href:\s*["\'`]/drills/([a-zA-Z0-9\-/]+)["\'`]', section_content)
                    p2 = re.findall(r'href\s*=\s*["\'`]/drills/([a-zA-Z0-9\-/]+)["\'`]', section_content)
                    links = p1 + p2
                    clean_links = []
                    for l in links:
                        l_clean = l.lower().strip()
                        if l_clean in {
                            "fps", "cognitive", "mental-fitness", "visual", "motor", "memory", "productivity", "academic", "physical", ""
                        }:
                            continue
                        parts = l_clean.split('/')
                        if len(parts) <= 1:
                            continue
                        clean_links.append(l)
                    related_count = len(clean_links)
                
                report.append({
                    "path": rel_path,
                    "has_all_rights": has_all_rights,
                    "has_twitter": has_twitter,
                    "has_instagram": has_instagram,
                    "has_youtube": has_youtube,
                    "has_pinterest": has_pinterest,
                    "has_who": has_who,
                    "has_skills": has_skills,
                    "has_track": has_track,
                    "has_why": has_why,
                    "has_how": has_how,
                    "related_count": related_count
                })
            except Exception as e:
                print(f"Error reading {rel_path}: {e}")

# Identify missing parts
mismatches = []
for r in report:
    missing = []
    if not r["has_all_rights"]:
        missing.append("Missing copyright info")
    
    # Check if missing ANY social link
    if not (r["has_twitter"] and r["has_instagram"] and r["has_youtube"] and r["has_pinterest"]):
        missing.append("Missing one or more social media links in footer")
        
    # Check if missing ANY card
    missing_cards = []
    if not r["has_who"]: missing_cards.append("Who It's For")
    if not r["has_skills"]: missing_cards.append("Skills Improved")
    if not r["has_track"]: missing_cards.append("What You'll Track")
    if not r["has_why"]: missing_cards.append("Why Practice")
    if not r["has_how"]: missing_cards.append("How to Practice")
    if missing_cards:
        missing.append(f"Missing About section cards: {missing_cards}")
        
    if r["related_count"] != 8:
        missing.append(f"Related drills count is {r['related_count']} instead of 8")
        
    if missing:
        mismatches.append((r["path"], missing))

print(f"Total drills with metadata mismatches: {len(mismatches)}")
for path, missing in mismatches:
    print(f"\nFile: {path}")
    for item in missing:
        print(f"  - {item}")
