# Portfolio Setup Summary

## ✅ Changes Made

### 1. Port Configuration
- **Fixed:** Port is **3000** (not 36683 - that's just the browser preview proxy)
- **Added:** `allowedDevOrigins: ['127.0.0.1']` to `next.config.ts` for browser preview support

### 2. Personal Information
- **Updated:** `portfolio.config.ts` with your details (already correct)
- **Updated:** `projectsData.ts` with your 3 projects:
  - PriceZen
  - AI Support Copilot
  - AI Repo Intelligence

### 3. Codeforces & CodeChef
- **Commented out:** Removed codeforces and codechef from `portfolio.config.ts`
- **Added:** Future-proof comments for when you want to add them back
- **Note:** Only LeetCode and GitHub are now active

### 4. Environment Variables
- **Created:** `.env` file with your GitHub token
- **Created:** `SETUP_ENV.md` with detailed instructions for:
  - GitHub token setup
  - Guestbook (Giscus) configuration
  - Spotify integration

### 5. Hackathon/Highlights Removal
- **Commented out:** All hackathon entries in `hackathonsData.ts`
- **Commented out:** All highlight entries in `highlightsData.ts`
- **Commented out:** Hacktoberfest experience in `experienceData.ts`
- **Reason:** These were sample/template data - add your own when available

### 6. Image Paths
- **Fixed:** Experience image paths from `/Experience-image/` to `/experience/`
- **Note:** Banner images are correct (banner-light.jpg and banner-dark.jpg exist)

### 7. Leaf Animation
- **Verified:** Already set to blossom pink colors:
  - Soft pink: `#fbcfe8`
  - Vibrant pink: `#f472b6`

### 8. GitHub Graph
- **Status:** Should now work with your GitHub token in `.env`
- **Note:** If it still doesn't show, check the browser console for API errors

---

## ⚠️ Known Issues & Solutions

### Offline Page Showing Wrong Project
**Cause:** This is likely a browser cache issue, not a service worker (no service worker files found).

**Solution:**
1. Clear browser cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. Hard refresh: Ctrl+F5 (or Cmd+Shift+R on Mac)
3. Open incognito/private window to test

### GitHub Graph Not Showing
**Status:** Should work now with the token.

**If still not working:**
1. Check `.env` file has `GITHUB_TOKEN=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`
2. Check browser console (F12) for API errors
3. Verify token has `public_repo` scope at https://github.com/settings/tokens

### Guestbook Not Working
**Status:** Needs Giscus setup.

**Solution:** See `SETUP_ENV.md` for detailed steps:
1. Install Giscus app on your repository
2. Get repoId and categoryId from https://giscus.app
3. Update `portfolio.config.ts` with the values

### Spotify Not Working
**Status:** Need to configure music data.

**Solution:** See `SETUP_ENV.md` for detailed steps:
1. Edit `src/data/music.json` with your music
2. Download album covers to `/public/music/`
3. Optionally set up Spotify API credentials

---

## 📝 Next Steps

### To Make Guestbook Work:
1. Go to https://github.com/apps/giscus and install on `AnmolCanCodes/portfolio`
2. Visit https://giscus.app, enter your repo, get `repoId` and `categoryId`
3. Update `portfolio.config.ts` giscus section with those values

### To Make Spotify Work:
1. Edit `src/data/music.json` with your favorite albums/artists
2. Download album covers manually to `/public/music/` folder
3. Update the `cover` paths in `music.json` to match your files
4. Set `nowPlaying` trackId to a Spotify track ID

### To Add Your Resume:
1. Place your resume PDF in `/public/` folder (e.g., `/public/anmol_resume.pdf`)
2. The path in `portfolio.config.ts` is already set to `/anmol_resume.pdf`
3. Just make sure the file exists with that name

### To Add Codeforces/CodeChef Later:
1. Uncomment the lines in `portfolio.config.ts`
2. Add your usernames:
   ```typescript
   codeforces: "your_username",
   codechef: "your_username",
   ```

---

## 🚀 Running the Site

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Site runs at: http://localhost:3000
```

---

## 📁 Key Files

- `portfolio.config.ts` - Main configuration (name, handles, socials)
- `src/data/projectsData.ts` - Your projects
- `src/data/experienceData.ts` - Work experience
- `src/data/highlightsData.ts` - Achievements/awards
- `src/data/hackathonsData.ts` - Hackathon participation
- `src/data/music.json` - Music/Spotify data
- `.env` - Environment variables (GitHub token, etc.)
- `SETUP_ENV.md` - Detailed setup instructions

---

## 🎨 Customization

### To Change Theme Colors:
Edit `src/app/globals.css` - the color variables at the top.

### To Change Leaf Animation Colors:
Edit `src/components/BannerParticles.tsx` - lines 53-56:
```typescript
tCtx.fillStyle = "#fbcfe8"; // Change soft pink color
tCtx.strokeStyle = "#f472b6"; // Change vibrant pink color
```

### To Add More Projects:
Edit `src/data/projectsData.ts` - add new objects to the `projectsData` array.

---

## 🌐 Deployment

When ready to deploy:

1. **Vercel (Recommended):**
   - Connect your GitHub repo to Vercel
   - Add environment variables in Vercel dashboard:
     - `GITHUB_TOKEN` = your GitHub token
     - `NEXT_PUBLIC_SITE_URL` = your deployed URL
   - Deploy

2. **Other Platforms:**
   - Follow platform-specific deployment steps
   - Don't forget to add the `.env` variables to the platform's environment settings

---

## 📞 Support

If you encounter issues:
1. Check the browser console (F12) for errors
2. Review `SETUP_ENV.md` for detailed setup instructions
3. Ensure all image paths in data files exist in `/public/` folder
4. Verify GitHub token has correct permissions

---

**Last Updated:** October 27, 2026
