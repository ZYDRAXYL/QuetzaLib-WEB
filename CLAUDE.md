# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

QuetzaLib-WEB is the static marketing/landing page for **QuetzaLib**, a
Flutter Android app (source lives in the separate
[QuetzaLib-APP](https://github.com/ZYDRAXYL/QuetzaLib-APP) repo) that scans a
book's ISBN barcode, looks up its metadata, and adds it to a personal library
stored locally on-device. This repo contains **no Flutter/Dart code** — it is
plain static HTML/CSS/JS with no build step, no package manager, and no
dependencies.

## Structure

- `index.html` — the entire single-page site (header, hero, features,
  tech-stack, download, footer sections).
- `assets/css/styles.css` — all styling, using CSS custom properties defined
  on `:root` for the light palette, overridden under
  `@media (prefers-color-scheme: dark)` for dark mode. No CSS framework.
- `assets/js/app.js` — one small IIFE that calls the GitHub Releases API
  (`api.github.com/repos/ZYDRAXYL/QuetzaLib-APP/releases/latest`) to rewrite
  the download buttons' href/label with the actual latest release tag and
  APK asset, and to show release size/date. If the API call fails (rate
  limit, offline), it fails silently — the static links already point at
  `/releases/latest`, which redirects correctly on their own, so there is no
  fallback UI to maintain.
- `assets/img/` — app icon and logo artwork, sourced from the app repo.
- `.github/workflows/deploy-pages.yml` — deploys the whole repo to GitHub
  Pages on every push to `main` (or manually via "Run workflow"), using the
  standard `actions/configure-pages` → `actions/upload-pages-artifact` →
  `actions/deploy-pages` flow. No `gh-pages` branch is used.

## Working locally

There is no build/lint/test tooling in this repo. To preview changes:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Edit `index.html`, `assets/css/styles.css`, or `assets/js/app.js` directly and
reload the browser — changes are live immediately, nothing needs compiling.

## Conventions to preserve

- Keep it a **single flat page**: don't introduce a bundler, framework, or
  build step for what is intentionally plain static HTML/CSS/JS.
- New colors go through the CSS custom properties in `:root` (and their
  dark-mode counterparts under `@media (prefers-color-scheme: dark)`) rather
  than hardcoded hex values inline in rules.
- `assets/js/app.js` intentionally degrades silently on API failure — any
  change to the release-fetching logic should keep the static
  `/releases/latest` links working as the no-JS/no-API fallback.
- This site's content (feature list, tech stack) describes the QuetzaLib
  Android app; keep it in sync with the app repo's actual capabilities
  rather than treating this as independent copy.
- All links to the app's source, releases, and license point at
  `ZYDRAXYL/QuetzaLib-APP` (a separate GitHub repo from this one).
