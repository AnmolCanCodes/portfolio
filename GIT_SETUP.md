# Git Push Fix Guide

## The Problem

GitHub rejects pushes when:
1. Files are too large (>100MB per file limit)
2. Repository exceeds GitHub's size limits
3. There are large binary files in the history

## Current Status

Your repository has some issues:
- Deleted public images (ai-repo-intelligence.png, ai-support-copilot.png, pricezen.png)
- Large folders: `public/Experienc-image/` (1.1M), `public/anime-movies/` (2.1M)
- Modified files that need to be committed

## Solution Steps

### Step 1: Clean up the repository

```bash
# Navigate to portfolio directory
cd /home/anmol/Desktop/portfolio

# Remove large folders from git tracking (but keep them locally)
git rm -r --cached public/Experienc-image/
git rm -r --cached public/project-image/

# Remove deleted files from git
git rm public/ai-repo-intelligence.png
git rm public/ai-support-copilot.png
git rm public/pricezen.png
git rm public/experience/Hacktoverfest.png
git rm public/experience/indie-fs.png
```

### Step 2: Add modified files

```bash
# Add all changes
git add src/app/page.tsx
git add src/components/BannerParticles.tsx
git add src/components/DsaStats.tsx
git add src/components/RightNavbar.tsx
git add src/data/experienceData.ts
git add src/data/music.json
git add src/data/projectsData.ts
git add .gitignore
```

### Step 3: Add documentation files (optional)

```bash
git add SETUP_ENV.md
git add CHANGES_SUMMARY.md
git add FIXES_SUMMARY.md
```

### Step 4: Commit changes

```bash
git commit -m "$(cat <<'EOF'
Update portfolio with personal information and fixes

- Updated personal information in portfolio.config.ts
- Added 3 projects: PriceZen, AI Support Copilot, AI Repo Intelligence
- Removed Hackathons and Highlights sections from homepage
- Removed Codeforces and CodeChef stats (LeetCode only)
- Fixed duplicate React key errors in projects
- Updated leaf animation to cherry blossom pink
- Fixed Spotify "On Repeat" to show real track
- Updated music data with correct artists
- Cleaned up large image folders from git
- Added environment setup documentation

Generated with [Devin](https://devin.ai)

Co-Authored-By: Devin <158243242+devin-ai-integration[bot]@users.noreply.github.com>
EOF
)"
```

### Step 5: Push to GitHub

```bash
git push origin main
```

## If Push Still Fails

### Option A: Use Git LFS (Large File Storage)

If you have large files you want to keep:

```bash
# Install git-lfs
sudo apt-get install git-lfs  # Linux
# or: brew install git-lfs  # Mac

# Initialize git-lfs
git lfs install

# Track large files
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.webp"
git lfs track "*.jpeg"

# Add and commit
git add .gitattributes
git commit -m "Add git-lfs tracking for images"
git push origin main
```

### Option B: Reduce Repository Size

If the repository is too large:

```bash
# Check repository size
du -sh .git

# Remove large files from history (CAUTION: destructive)
git filter-branch --tree-filter 'rm -rf public/Experienc-image public/project-image' --prune-empty HEAD

# Cleanup
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (CAUTION: rewrites history)
git push origin main --force
```

### Option C: Create a New Repository

If all else fails:

```bash
# Backup current repo
cd ..
cp -r portfolio portfolio-backup

# Go back to portfolio
cd portfolio

# Remove .git folder to start fresh
rm -rf .git

# Initialize new git
git init
git add .
git commit -m "Initial commit with updated portfolio"

# Add remote (replace with your new repo)
git remote add origin https://github.com/AnmolCanCodes/portfolio-new.git
git push -u origin main
```

## Recommended Approach

I recommend **Option A (Git LFS)** if you want to keep your images, or just **remove the large folders** using Step 1 if you don't need them in the repository.

The images in `public/` should work fine locally without being in git - you can add them to `.gitignore` and they'll still work when you deploy.

## For Deployment

When deploying to Vercel or other platforms:
- The platform will build from your git repository
- Images in `public/` folder will be included in the build
- You don't need to commit images to git for them to work in production
- They just need to exist in the folder when you deploy

## Quick Fix (Recommended)

Try this simple approach first:

```bash
cd /home/anmol/Desktop/portfolio

# Clean git tracking of large folders
git rm -r --cached public/Experienc-image/
git rm -r --cached public/project-image/

# Stage current changes
git add -A

# Commit
git commit -m "Clean up large folders and update portfolio"

# Push
git push origin main
```

This removes the large folders from git history while keeping them locally, and should fix the push issue.
