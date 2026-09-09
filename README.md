# QuetzaLib-WEB

Landing page for [QuetzaLib](https://github.com/ZYDRAXYL/QuetzaLib-APP), the
Flutter Android app that scans a book's ISBN barcode, looks up its
metadata, and adds it to a personal library stored locally on-device.

Plain static HTML/CSS/JS — no build step. `index.html` is the page,
`assets/` holds its styles, the app icon/logo artwork (`assets/img/`,
sourced from the app repo), and a small script that pulls the latest
release tag/APK from the GitHub Releases API for the download button.

## Deployment

`.github/workflows/deploy-pages.yml` deploys this site to GitHub Pages on
every push to `main` (or manually via "Run workflow" in the Actions tab).
It uses the standard `actions/configure-pages` →
`actions/upload-pages-artifact` → `actions/deploy-pages` flow, so no
separate `gh-pages` branch is needed.

To turn on Pages for this repo (one-time): **Settings → Pages → Build and
deployment → Source: GitHub Actions**.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
