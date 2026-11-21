#!/usr/bin/env python3
"""Generate Prototype B variants and self-contained preview files.

Usage: python3 prototypes/build_previews.py [OUT_DIR]

Writes, next to prototypes/b/index.html:
  opening-alt.html  same page, alternative (portrait-led) opening
  review.html       same page plus the review layer (highlights, claim notes)
If OUT_DIR is given, also writes single-file previews there (CSS, fonts and the
portrait inlined) that open without a web server.
"""
import base64, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
B = ROOT / "prototypes" / "b"
FONTS = ROOT / "prototypes" / "fonts"

def swap_hero(html: str) -> str:
    alt = (B / "hero-alt.html").read_text()
    return re.sub(r"<!-- HERO:START -->.*?<!-- HERO:END -->", "<!-- HERO:START (alternative) -->\n" + alt + "<!-- HERO:END -->", html, flags=re.S)

def add_review(html: str) -> str:
    html = html.replace("<title>", "<title>REVIEW · ", 1)
    html = html.replace('<link rel="stylesheet" href="style.css">', '<link rel="stylesheet" href="style.css">\n  <link rel="stylesheet" href="review.css">')
    return html.replace("</body>", '  <script src="review.js"></script>\n</body>')

def data_uri(path: pathlib.Path, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()

def inline(html: str) -> str:
    css = (B / "style.css").read_text()
    css = re.sub(r'url\("\.\./fonts/([^"]+)"\)', lambda m: f'url("{data_uri(FONTS / m.group(1), "font/woff2")}")', css)
    html = re.sub(r'\s*<link rel="preload"[^>]+>', "", html)
    html = html.replace('<link rel="stylesheet" href="style.css">', f"<style>{css}</style>")
    if 'href="review.css"' in html:
        html = html.replace('<link rel="stylesheet" href="review.css">', f"<style>{(B / 'review.css').read_text()}</style>")
        html = html.replace('<script src="review.js"></script>', f"<script>{(B / 'review.js').read_text()}</script>")
    portrait = data_uri(ROOT / "assets/img/toby-zheng-portrait.webp", "image/webp")
    html = html.replace("../../assets/img/toby-zheng-portrait.webp", portrait)
    return html.replace("../../assets/Yitong-Zheng-Resume.pdf", "https://yitongz.com/assets/Yitong-Zheng-Resume.pdf")

def main():
    base = (B / "index.html").read_text()
    variants = {"index.html": base, "opening-alt.html": swap_hero(base), "review.html": add_review(base)}
    for name in ("opening-alt.html", "review.html"):
        (B / name).write_text(variants[name])
    if len(sys.argv) > 1:
        out = pathlib.Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
        names = {"index.html": "toby-b-preview.html", "opening-alt.html": "toby-b-opening-alt-preview.html", "review.html": "toby-b-REVIEW-preview.html"}
        for k, v in variants.items():
            (out / names[k]).write_text(inline(v))
            print(out / names[k])

if __name__ == "__main__":
    main()
