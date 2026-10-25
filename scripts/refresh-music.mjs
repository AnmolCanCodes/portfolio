import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const musicDir = path.join(projectRoot, 'public', 'music');
const outputFile = path.join(projectRoot, 'src', 'data', 'music.json');

const titleFromFilename = (file) => {
  const name = path.basename(file, path.extname(file));
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getAlbumList = async () => {
  const files = await readdir(musicDir);
  const covers = files.filter((file) => /\.(webp|png|jpg|jpeg)$/i.test(file));

  return covers.map((file) => ({
    id: file.replace(/\.[^/.]+$/, '').toLowerCase(),
    artist: 'Artist pending',
    year: new Date().getFullYear(),
    scene: 'General',
    title: titleFromFilename(file),
    cover: `/music/${file}`,
  }));
};

const buildMusicData = async () => {
  const albums = await getAlbumList();
  const payload = {
    scenes: [{ scene: 'General', artists: ['Artist pending'] }],
    nowPlaying: {
      trackId: 'placeholder-track',
      title: 'Now playing',
      artist: 'Artist pending',
    },
    albums,
  };

  await writeFile(outputFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${albums.length} music entries to ${path.relative(projectRoot, outputFile)}`);
};

try {
  await buildMusicData();
} catch (error) {
  console.error('Failed to refresh music data:', error);
  process.exitCode = 1;
}
