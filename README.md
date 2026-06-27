# Foil Suite

Landing site for the [Foil](https://github.com/nikolap994) security tools suite — built with Astro.

> "Foil" — to foil an attack. A protective layer between you and the threat.

## Projects

| | Project | Description | Status |
|---|---------|-------------|--------|
| <img src="public/icons/foilguard-128.png" width="24"> | [FoilGuard](https://github.com/nikolap994/foilguard) | Browser extension detecting typosquatting, homoglyph attacks, and newly registered domains | Phase 1 · Active |
| <img src="public/icons/foillab-128.png" width="24"> | [FoilLab](https://github.com/nikolap994/foillab) | Weekly network/IoT CTF challenge platform with write-ups | Phase 2 · Building |
| <img src="public/icons/foilvault-128.png" width="24"> | [FoilVault](https://github.com/nikolap994/foilvault) | Zero-knowledge browser password manager with FoilGuard autofill protection | Phase 3 · Planned |

## Stack

- [Astro](https://astro.build) — static site generator
- Vanilla CSS — no framework
- Deployed via [Netlify](https://netlify.com) / GitHub Pages

## Development

```bash
npm install
npm run dev      # localhost:4321
npm run build    # output → dist/
npm run preview  # preview the build
```

## Structure

```
src/
├── layouts/
│   └── Layout.astro   # base HTML shell, global CSS variables
└── pages/
    └── index.astro    # single-page site
public/
└── icons/             # foilsuite + all project PNG icons
```
