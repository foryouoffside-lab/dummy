import os
import subprocess

BASE = r"c:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"

# Revert all modified files using git
try:
    os.chdir(BASE)
    result = subprocess.run(
        ["git", "checkout", "--", "app/drills/cognitive/", "app/drills/academic/", 
         "app/drills/memory/", "app/drills/motor/", "app/drills/physical/",
         "app/drills/productivity/", "app/drills/visual/", "app/drills/mental-fitness/",
         "app/drills/fps/"],
        capture_output=True, text=True, shell=True
    )
    print("Git checkout output:", result.stdout)
    print("Git checkout stderr:", result.stderr)
    print("Reverted all modified drill files")
except Exception as e:
    print(f"Git revert failed: {e}")
    print("Trying git reset...")
    subprocess.run(["git", "reset", "--hard"], shell=True, cwd=BASE)