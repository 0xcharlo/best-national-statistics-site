# best-national-statistics-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/0xcharlo/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/0xcharlo/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat — a national statistics site for Indonesia: economy, population, trade and regions, from the official releases. Eight headline indicators, ten years of growth, inflation and unemployment with a year picker and chart toggles, an age pyramid you can switch between shares and millions, export products and partners, and fifteen provinces ranked, searchable and sortable. Every figure names its source and year. The site is static files that run offline in a desktop or phone browser and make no network requests.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080.

## Layout

- `app/` — the site itself: `index.html`, `style.css`, `main.js` (hash router and controls), `views.js` (one function per page), `charts.js` (dependency-free SVG charts), `data.js` (all figures, each with source and year)
- `screenshots/` — four renders of the site in Chromium (overview, economy, regions, phone overview)
- `main.ts` — the entrypoint: copies `app/` and `screenshots/` to `/output` and writes `dossier.json`
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `shots.json` — which views the screenshots were taken of

## Check it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=7n8phv37&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
