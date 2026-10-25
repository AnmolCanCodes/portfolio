# Agent Prompt v2: Finish Anmol's Portfolio

## 0. FOLDER RULES (read first, obey always)

- **The ONLY folder you may edit is `portfolio`** (my site, repo `AnmolCanCodes/portfolio`).
- **`paras-portfolio` is READ-ONLY reference.** My friend's site. You may open and read files there to see how his banner animation, layout and components work. You must **never** create, edit, delete, rename, format or run install/build/lint commands inside it.
- Before **every** write or shell command, confirm your working directory is `portfolio` (`pwd`) and, for the first command, that `git remote -v` shows `AnmolCanCodes/portfolio`. If the path contains `paras-portfolio`, STOP and do not write.
- If you want to reuse something from `paras-portfolio`, copy it into `portfolio` and adapt it there.
- Live reference: https://parascodes.is-a.dev

## 1. Source of truth

`portfolio/portfolio.config.ts` is **final and complete**. Treat everything in it as intentional.

- **Do not ask me about anything already in the config.**
- **Handles I left out (Codeforces, CodeChef, etc.) are left out on purpose.** Hide those profiles, stat cards and links gracefully. Do not ask for them, do not add placeholders, do not keep Paras's.
- Same for empty fields (`googleSiteVerification`, booking link): intentional, hide the feature.
- The one exception is a **type error**: my config has a dangling comment where `bookingLink` should be. If the code reads `portfolio.bookingLink`, add `bookingLink: ""` and nothing else. Do not change any other value or text in the config (including typos) unless I ask.

## 2. Goal

Make `portfolio` look and behave like Paras's site, but with my identity and content. Read `SETUP.md`, `AGENTS.md`, `CLAUDE.md` in `portfolio` first. All content is data: edit `portfolio.config.ts`, `src/data/*`, `public/*`. Touch components only for the banner animation and resume "Coming soon" below.

Rules: never invent facts, run `npm run typecheck` after each file, finish with `npm run typecheck && npm run lint && npm run build` (inside `portfolio` only).

## 3. Tasks (inside `portfolio` only)

1. **Audit** `public/` and `src/data/`: I already added project images, anime and movie images, banner, avatar and music folders. List what exists, then wire it into the data files. Check project screenshots are 1.6 aspect and report any that aren't (don't crop without asking).
2. **Media by extension**: build `anime.json` and `music.json` from the files I added (titles from filenames). Ask only if a title can't be read from a filename or a required field (e.g. Spotify track URL) is missing.
3. **Banner animation**: flamingo + tree + drifting leaves like Paras's, with colors extracted from **my avatar**. Study his implementation in `paras-portfolio` (read-only), then build it in `portfolio`. Works in light/dark, respects `prefers-reduced-motion`, CSS/SVG only, no layout shift. Show me the palette and plan before building.
4. **Resume**: `resume` is `""` for now, so the resume button shows **"Coming soon"** (toast or disabled-style, no navigation, no 404). If a path is set later, link to the PDF normally. Check hero, contact buttons and command palette.
5. **Experience**: I'll write it myself. Set the array to empty in `src/data/experienceData.ts`, make the empty state look intentional, and tell me the field shape.
6. **Projects**: AI Customer Support Copilot (`AnmolCanCodes/AI-Customer-Support-Copilot`), GlowUp Local (`AnmolCanCodes/GlowUp-Local`), Campus Care. Use my project images. Write descriptions from the repos' READMEs where readable.
7. **Clean out Paras's data** from `portfolio`: name, handles, email, giscus IDs, resume PDF, bios, stats snapshot values, and his experience/projects/skills/education/hackathons/highlights/blog. Then `grep -ri "paras" .` inside `portfolio` should be clean.

## 4. What you may ask me (one batch, only these)

Ask only for content that is not in the config and cannot be derived:
- Project details you can't get from the repos (live links, key features)
- Education and certificates
- Hackathon results
- Skill groups (propose first, I confirm)
- Env keys to set (tell me names and where; never ask me to paste secrets)

Everything else: decide sensibly, or leave the section empty.

## 5. Definition of done

- [ ] No file changed in `paras-portfolio` (`git status` there is clean)
- [ ] typecheck, lint, build pass in `portfolio`
- [ ] Banner animation uses my avatar colors, both themes, reduced motion respected
- [ ] Resume click shows "Coming soon"
- [ ] Missing handles hidden without errors
- [ ] Experience renders a clean empty state
- [ ] Final summary: files changed, what is empty, what I must do myself