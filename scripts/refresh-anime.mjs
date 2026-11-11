import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const animeJsonPath = path.join(projectRoot, 'src', 'data', 'anime.json');

// AniList GraphQL API endpoint
const ANILIST_API = 'https://graphql.anilist.co';

// GraphQL query to fetch anime details
const ANIME_QUERY = `
  query ($search: String) {
    Page(perPage: 1) {
      media(search: $search, type: ANIME) {
        id
        title { romaji english native }
        description
        genres
        averageScore
        studios { nodes { name } }
        episodes
        duration
        siteUrl
        coverImage { large medium }
      }
    }
  }
`;

async function fetchAnimeDetails(title) {
  try {
    const response = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: ANIME_QUERY,
        variables: { search: title }
      })
    });

    const data = await response.json();
    const media = data?.data?.Page?.media?.[0];

    if (!media) {
      console.log(`⚠️  No results found for: ${title}`);
      return null;
    }

    return {
      synopsis: media.description?.replace(/<[^>]*>/g, '') || '', // Remove HTML tags
      genres: media.genres || [],
      score: media.averageScore || null,
      studio: media.studios?.nodes?.[0]?.name || null,
      runtime: media.duration || null,
      url: media.siteUrl || null,
    };
  } catch (error) {
    console.error(`❌ Error fetching ${title}:`, error.message);
    return null;
  }
}

async function refreshAnimeData() {
  console.log('🔄 Fetching anime data from AniList...\n');

  // Read current anime.json
  const animeJson = await readFile(animeJsonPath, 'utf-8');
  const animeList = JSON.parse(animeJson);

  let updatedCount = 0;

  // Process each anime
  for (const anime of animeList) {
    console.log(`📺 Fetching: ${anime.title}`);
    const details = await fetchAnimeDetails(anime.title);

    if (details) {
      // Merge AniList data with existing data
      Object.assign(anime, details);
      updatedCount++;
      console.log(`✅ Updated: ${anime.title}\n`);
    }

    // Rate limiting: AniList allows ~90 requests per minute
    await new Promise(resolve => setTimeout(resolve, 700));
  }

  // Write updated data back
  await writeFile(animeJsonPath, JSON.stringify(animeList, null, 2), 'utf-8');
  console.log(`\n✨ Done! Updated ${updatedCount} anime entries.`);
  console.log(`📁 File: ${path.relative(projectRoot, animeJsonPath)}`);
}

refreshAnimeData().catch(console.error);
