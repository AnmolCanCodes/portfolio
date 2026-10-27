# Environment Variables Setup

To run this portfolio, you need to set up the following environment variables:

## 1. GitHub Token (Required for GitHub stats)

**How to get a GitHub token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Site")
4. Select the `public_repo` scope (this gives read access to public repositories)
5. Click "Generate token"
6. Copy the token (you won't see it again!)

**How to add it:**
Create a `.env` file in the project root with:
```
GITHUB_TOKEN=your_actual_token_here
```

## 2. Site URL (Optional)

This overrides the URL in `portfolio.config.ts`. If you want to use a different URL for deployment:

```
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
```

## Complete .env file example:

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://anmolgupta.is-a.dev
```

## Notes:

- The `.env` file is already in `.gitignore`, so your token won't be committed
- Never share your GitHub token publicly
- If you're deploying to Vercel, add these as environment variables in the project settings
- The GitHub token is needed for fetching your GitHub stats, repository information, and contribution graphs

---

# Additional Features Setup

## Guestbook (Giscus)

The guestbook is powered by **Giscus**, which uses GitHub Discussions as a backend. To enable it:

1. **Install the Giscus app:**
   - Go to https://github.com/apps/giscus
   - Click "Install" and select your `AnmolCanCodes/portfolio` repository
   - Grant necessary permissions

2. **Get your Giscus configuration:**
   - Visit https://giscus.app
   - Enter your repository: `AnmolCanCodes/portfolio`
   - Choose your preferred settings (page ↔️ discussions mapping, theme, etc.)
   - Copy the generated `repoId` and `categoryId`

3. **Update portfolio.config.ts:**
   ```typescript
   giscus: {
     repo: "AnmolCanCodes/portfolio" as `${string}/${string}`,
     repoId: "your-repo-id-here",  // From giscus.app
     category: "Announcements",     // Or your chosen category
     categoryId: "your-category-id-here",  // From giscus.app
   },
   ```

4. **Leave `repoId` empty to hide the guestbook:**
   ```typescript
   giscus: {
     repo: "AnmolCanCodes/portfolio" as `${string}/${string}`,
     repoId: "",  // Empty = guestbook hidden
     category: "Announcements",
     categoryId: "",
   },
   ```

**Why guestbook might not work:**
- Giscus app not installed on your repository
- Incorrect `repoId` or `categoryId`
- GitHub token missing from `.env` (the app needs it to fetch discussions)

---

## Spotify Integration

The music section displays albums and a "Now Playing" track. Here's how to set it up:

### 1. Add Your Music to `src/data/music.json`

**Structure:**
```json
{
  "scenes": [
    {
      "scene": "Your Genre Name",
      "artists": ["Artist 1", "Artist 2", "Artist 3"]
    }
  ],
  "nowPlaying": {
    "trackId": "spotify-track-id",
    "title": "Track Name",
    "artist": "Artist Name"
  },
  "albums": [
    {
      "id": "unique-id",
      "artist": "Artist Name",
      "year": 2024,
      "scene": "Your Genre Name",
      "title": "Album Title",
      "cover": "/music/cover-image.webp"
    }
  ]
}
```

### 2. Get Spotify Track/Album IDs

**For a track:**
1. Go to Spotify → Right-click on a track → Share → Copy link to track
2. The link looks like: `https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT`
3. The ID is: `4cOdK2wGLETKBW3PvgPWqT` (the part after `/track/`)

**For an album:**
1. Go to Spotify → Right-click on an album → Share → Copy link to album
2. The link looks like: `https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3`
3. The ID is: `1DFixLWuPvgPWqT` (the part after `/album/`)

### 3. Download Album Covers

After adding albums to `music.json`, run:
```bash
npm run refresh-music
```

This script:
- Fetches album metadata from Spotify
- Downloads the cover image
- Saves it to `/public/music/`
- Updates the `cover` field in `music.json`

**Requirements:**
- You need a Spotify Developer account to use the API
- Get API credentials from https://developer.spotify.com/dashboard
- Add Spotify credentials to `.env`:
  ```env
  SPOTIFY_CLIENT_ID=your_client_id
  SPOTIFY_CLIENT_SECRET=your_client_secret
  ```

### 4. Manual Setup (Without Spotify API)

If you don't want to use the Spotify API:

1. Manually download album covers from Spotify or other sources
2. Save them to `/public/music/` folder
3. Update `music.json` with the correct cover paths:
   ```json
   {
     "id": "my-album",
     "artist": "Artist Name",
     "year": 2024,
     "scene": "Genre",
     "title": "Album Title",
     "cover": "/music/my-album-cover.webp"  // Your downloaded file
   }
   ```

### 5. Set "Now Playing" Track

Update the `nowPlaying` section in `music.json`:
```json
"nowPlaying": {
  "trackId": "4cOdK2wGLETKBW3PvgPWqT",  // Spotify track ID
  "title": "Your Favorite Song",
  "artist": "Artist Name"
}
```

This embeds a Spotify player showing that track.

---

## Summary Checklist

- [ ] GitHub token added to `.env`
- [ ] Giscus app installed on repository (for guestbook)
- [ ] Giscus config updated in `portfolio.config.ts` (for guestbook)
- [ ] Music data added to `src/data/music.json` (for Spotify)
- [ ] Album covers downloaded to `/public/music/` (for Spotify)
- [ ] Run `npm run refresh-music` if using Spotify API (for Spotify)
