// Review layer for Prototype B. Injected only into review.html by
// prototypes/build_previews.py, never into the visitor version.
// Highlights statements awaiting Toby's confirmation and lists private
// claim boundaries.
(() => {
  const ITEMS = [
    [1, 'Procurement Intern', 'Caterpillar title: confirm against your official record.'],
    [2, 'I built should-cost analyses for cutting, machining, welding and painting, which helped identify supplier-rate anomalies.', 'From your résumé. Confirm the processes and the anomalies outcome.'],
    [3, 'I coordinated eight inspection-digitization pilots across two suppliers. They tested:', 'From your résumé. What did “coordinated” involve? Shown as pilots only.'],
    [4, 'I developed a risk-based supplier audit framework connecting drawings, PPAP documents and work instructions.', 'From your résumé.'],
    [4, 'I redesigned supplier safety-stock templates with automated checks and risk ratings.', 'From your résumé.'],
    [5, 'The gap is where the questions start', 'My annotation on a generic illustration. Approve the illustration for public use (confidentiality check).'],
    [6, 'Next.js, TypeScript and Supabase, built with Claude Code.', 'From your current site.'],
    [6, 'a bilingual (中文 / English) site for learning scripture stories before reading the full text.', 'From your current site.'],
    [12, 'All people, companies and details are fictional demo data.', 'Demo screenshots: fictional persona and data, not your activity or traction. Crops only; no UI altered.'],
    [7, 'I gave presentations and one-on-one coaching, and tracked students’ goals in Salesforce.', 'From your résumé.'],
    [8, 'Deciding to serve a mission was hard for me and came with many difficulties, but I made that decision.', 'Drafted from your words. Approve the wording of this paragraph.'],
    [9, 'Research Assistant', 'From your site; not on your résumé.'],
    [9, 'Operations Intern', 'Résumé says “E-Commerce Operations Intern”.'],
    [10, 'I learn by asking good questions and building practical tools.', 'My paraphrase of your words for the opening.'],
    [11, 'Outside work, I like trying new sports, traveling, and learning cultures through their food.', 'From your current site.'],
    [11, 'I speak Mandarin and English, and I’m learning Spanish.', 'Languages moved from the opening. Mandarin and Spanish confirmed.'],
    [13, 'supplier visits and should-cost analysis', 'Opening summary of Caterpillar: supplier visits confirmed; should-cost analysis is from your résumé.'],
    [14, 'How to use AI to build a product that solves my own problem.', 'Awaiting one concrete design decision or lesson from you.'],
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
