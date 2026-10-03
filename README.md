# pregnancy-training

Study site with chapter summaries of *Physical Training During Pregnancy: From Theory to Practice* (C. Silva-José, Springer, 2026). Not medical advice.

| Path | What |
|---|---|
| `data/ch1..28.json` | Source of truth: title, summary, points, takeaways, cautions |
| `build.py` | Bundles the JSON into `site/data.js` (asserts 28 chapters) |
| `site/` | Static site (Stitch "Calm Reader" design) |
| `.github/workflows/pages.yml` | Rebuilds `data.js` and deploys `site/` to GitHub Pages on push to `main` |

Edit the JSON, then `python3 build.py`; preview with `python3 -m http.server` in `site/`.
