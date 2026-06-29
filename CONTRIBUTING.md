# Contributing to FoilSuite

## Running locally

```bash
cd foilsuite
npm install
npm run dev       # http://localhost:4321
npm run build     # static build to dist/
```

## What to contribute

- **Blog posts** — security deep dives, CTF write-ups, forensics tutorials. Add a new `.astro` file under `src/pages/blog/` following the existing post structure, then add it to the posts array in `src/pages/blog/index.astro`, `src/pages/blog/rss.xml.ts`, and `src/pages/sitemap.xml.ts`.
- **FoilLab challenges** — new challenges go in `src/pages/lab/challenges/`. Add the challenge metadata to `src/data/challenges.ts` first.
- **Bug fixes and UI improvements** — open an issue first for significant changes.

## Submitting changes

1. Fork the repo and create a branch from `main`.
2. Make your changes and run `npm run build` to verify it builds cleanly.
3. Open a pull request with a short description of what changed and why.

## Challenge submissions

To propose a new FoilLab challenge, open a GitHub issue with the `foillab` label using [this template](https://github.com/nikolap994/foilsuite/issues/new?labels=foillab&title=[CHALLENGE]+Your+Title+Here).

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
