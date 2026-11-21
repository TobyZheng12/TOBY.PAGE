// Builds the résumé draft PDFs from resume/resume.html.
// Usage: node resume/build.js [OUT_DIR]   (default OUT_DIR: resume/out)
// Never touches assets/Yitong-Zheng-Resume.pdf.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
(async () => {
  const src = path.resolve(__dirname, 'resume.html');
  const out = path.resolve(process.argv[2] || path.join(__dirname, 'out'));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const [name, review] of [['Yitong-Zheng-Resume-DRAFT.pdf', false], ['Yitong-Zheng-Resume-REVIEW.pdf', true]]) {
    const page = await browser.newPage();
    await page.goto('file://' + src);
    if (review) await page.evaluate(() => document.body.classList.add('review'));
    await page.evaluate(() => document.fonts.ready);
    // Review copy prints at 96% so the flag badges don't push the résumé onto a second page.
    await page.pdf({ path: path.join(out, name), format: 'Letter', printBackground: true, preferCSSPageSize: true, scale: review ? 0.96 : 1 });
    await page.close();
    console.log(path.join(out, name));
  }
  await browser.close();
})();
