# Toby Zheng — Portfolio

Personal portfolio for Yitong (Toby) Zheng at https://yitongz.com/. Plain HTML, CSS and JavaScript, published by GitHub Pages from the root of `main` with no build step.

## What is published

- `index.html`, `css/styles.css`, `js/scripts.js`: the current homepage.
- `assets/`: résumé PDF, fonts (SIL Open Font License, licenses in `assets/fonts/`), portrait and project screenshots.
- `legacy/`: the previous design (November 2026), kept for reference, `noindex` and not in the sitemap.

Design sources, review pages, the résumé source and project notes live on the `claude/zen-faraday-t8e6ca` branch, not on `main`, so they are never published.

## Local preview

Run `python3 -m http.server 8000` from the repository root, then open `http://localhost:8000`.

## Maintenance

- Replace `assets/Yitong-Zheng-Resume.pdf` when the résumé is updated.
- Update `sitemap.xml` when adding public pages. Keep `legacy/` out of it.
- Rollback: commit `0e29661` is the site as it was before the November 2026 redesign (`git revert` the launch commit to restore it).
