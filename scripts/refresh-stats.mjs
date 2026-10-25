import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputFile = path.join(projectRoot, 'src', 'data', 'stats-snapshot.json');

const payload = {
  github: {
    username: 'AnmolCanCodes',
    followers: null,
    stars: null,
    commits: null,
  },
  leetcode: {
    username: 'CodessWAnmol',
    rating: null,
    easy: null,
    medium: null,
    hard: null,
  },
  codeforces: null,
  codechef: null,
};

try {
  await writeFile(outputFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote stats snapshot to ${path.relative(projectRoot, outputFile)}`);
} catch (error) {
  console.error('Failed to refresh stats snapshot:', error);
  process.exitCode = 1;
}
