// Review layer for Prototype B. Injected only into review.html by
// prototypes/build_previews.py, never into the visitor version.
// Highlights statements awaiting Toby's confirmation and lists private
// claim boundaries.
(() => {
  const ITEMS = [
    [5, 'The gap is where the questions start', 'Your edits applied; approve the illustration as shown.'],
    [6, 'Next.js, TypeScript and Supabase, built with Claude Code.', 'From your old site; not yet confirmed.'],
    [12, 'All people, companies and details are fictional demo data.', 'Demo screenshots: fictional persona and data, not your activity or traction. Crops only; no UI altered.'],
    [10, 'I learn by asking good questions and building practical tools.', 'My paraphrase of your words for the opening.'],
    [11, 'Outside work, I like trying new sports, traveling, and learning cultures through their food.', 'From your old site.'],
  ];
  const BOUNDARIES = [
    '$550K+ omitted until scope is confirmed (identified, validated or realized; one-time or annual; your share).',
    '$10M+, 40%, 50% and the SWORN engagement figure excluded.',
    'Pilots described as pilots only. No claim that any tool was rolled out at scale.',
    'CELS / Sandbox / PengPal omitted until you approve wording for your involvement.',
    'Professor kept unnamed. No quotes from anyone.',
    'CoffeeChat screenshots are the public demo: the demo persona, contacts, conversations and counts are fictional and not presented as your activity, users or results. No live-AI claim is made from them.',
  ];
  const mark = (phrase, n, note) => {
    const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const i = node.nodeValue.indexOf(phrase);
      if (i < 0 || node.parentElement.closest('mark')) continue;
      const r = document.createRange(); r.setStart(node, i); r.setEnd(node, i + phrase.length);
      const m = document.createElement('mark'); m.className = 'rv'; m.dataset.n = n; m.title = note;
      r.surroundContents(m); return true;
    }
    console.warn('Review phrase not found:', phrase); return false;
  };
  ITEMS.forEach(([n, p, note]) => mark(p, n, note));
  document.querySelectorAll('details').forEach(d => d.open = true);

  const bar = document.createElement('aside');
  bar.className = 'rv-bar';
  bar.setAttribute('aria-label', 'Review notes');
  const seen = new Set();
  bar.innerHTML = '<p><b>Review version.</b> Not for visitors. Highlighted text needs your confirmation; all expanders are open.</p>' +
    '<ol>' + ITEMS.filter(([n]) => !seen.has(n) && seen.add(n)).map(([n, , note]) => `<li value="${n}">${note}</li>`).join('') + '</ol>' +
    '<p><b>Private claim boundaries</b></p><ul>' + BOUNDARIES.map(b => `<li>${b}</li>`).join('') + '</ul>';
  document.body.prepend(bar);
})();
