# CLAUDE.md

Personal portfolio for Yitong (Toby) Zheng, served at https://yitongz.com/ by GitHub Pages from `main`.

- **Branches:** `main` holds only the published site (homepage, `legacy/`, assets), served by GitHub Pages from its root. This branch holds the sources: `prototypes/b/` (homepage design source), `resume/` (résumé source), `docs/` (brief). Tag `pre-redesign-2026-11-21` = site before the redesign.
- **Stack:** plain HTML, CSS and JS with no build step. Main page `index.html`, styles `css/styles.css`, behavior `js/scripts.js`.
- **Preview:** `python3 -m http.server 8000` from the repo root. Check at 1440px and 375px wide, in light and dark themes.
- **Prototype B:** `prototypes/b/` (`style.css`, `index.html`); regenerate `opening-alt.html`, `review.html` and previews with `python3 prototypes/build_previews.py [OUT_DIR]`.
- **Résumé draft:** `resume/resume.html`; build draft + review PDFs with `node resume/build.js OUT_DIR`. Never overwrite `assets/Yitong-Zheng-Resume.pdf` until Toby approves the draft.
- **Brief:** read `docs/brief.md` before changing any copy. It holds the audience, the story, the **approved facts**, the résumé discrepancy checklist and the success criteria.

## Rules

- The repo is **public**. Never commit private conversations, other people's contact details, supplier names or confidential employer material.
- Only publish claims listed in `docs/brief.md` §3a (§3b needs Toby's confirmation first). Keep "opportunities identified", "validated savings" and "realized savings" distinct. Unconfirmed figures stay out.
- Use private quotes as testimonials only with Toby's explicit approval.
- Write evergreen copy: absolute dates, never "currently", "now" or "this semester". Toby is on a mission Dec 2026 – Dec 2028 and can't maintain the site.
- Keep headline results visible without hover or a click. Use `<details>` for optional depth.
- Removing files (e.g. `archive/`) or changing the public résumé or contact details is a separate decision: propose it first.
- Update `sitemap.xml` `lastmod` when changing public pages.
- Deployment ships production files only: never review pages, `prototypes/`, `resume/` sources, `docs/` notes or confirmation highlights. Push or deploy only with Toby’s explicit authorization.
