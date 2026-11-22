/* Screenshot viewer (progressive enhancement). Without JS, each image link opens the full screenshot. */
(() => {
  const dlg = document.querySelector('.viewer'); if (!dlg || !dlg.showModal) return;
  const img = dlg.querySelector('img'), cap = dlg.querySelector('.viewer-cap'), size = dlg.querySelector('.viewer-size'), open = dlg.querySelector('.viewer-open');
  let opener = null;
  const setActual = on => { dlg.classList.toggle('is-actual', on); size.setAttribute('aria-pressed', on); size.textContent = on ? 'Fit to screen' : 'Actual size'; };
  document.querySelectorAll('a.zoom').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); opener = a;
    img.src = a.href; img.width = a.dataset.w; img.height = a.dataset.h;
    img.alt = (a.querySelector('img') || {}).alt || ''; cap.textContent = a.dataset.caption; open.href = a.href;
    setActual(false); dlg.showModal(); dlg.querySelector('.viewer-close').focus();
  }));
  size.addEventListener('click', () => { const on = !dlg.classList.contains('is-actual'); setActual(on);
    if (on) { const st = dlg.querySelector('.viewer-stage'); st.scrollLeft = (st.scrollWidth - st.clientWidth) / 2; } });
  dlg.querySelector('.viewer-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.classList.contains('viewer-stage')) dlg.close(); });
  dlg.addEventListener('close', () => { img.removeAttribute('src'); if (opener) opener.focus(); });
})();

/* Story timeline (progressive enhancement). Without JS the path is fully drawn and every chapter is readable. */
(() => {
  const list = document.querySelector('[data-timeline]'); if (!list) return;
  const chapters = [...list.querySelectorAll('.chapter')];
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  // 1. Path progress follows the reader's position (no autonomous motion); full path when motion is reduced.
  let ticking = false;
  const update = () => {
    ticking = false;
    const r = list.getBoundingClientRect(), mid = innerHeight * 0.55;
    const p = still.matches ? 1 : Math.min(1, Math.max(0, (mid - r.top) / r.height));
    list.style.setProperty('--progress', p.toFixed(3));
    // 2. Current chapter: the last one whose marker has passed the reading line.
    let current = -1;
    chapters.forEach((c, i) => { if (c.getBoundingClientRect().top < mid) current = i; });
    chapters.forEach((c, i) => { c.classList.toggle('is-current', i === current); c.classList.toggle('is-past', i < current); });
  };
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', request, { passive: true }); addEventListener('resize', request);
  still.addEventListener('change', request); update();
  // 3. Desktop only: a photo frame leans gently toward the cursor. Text and controls never move.
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  list.querySelectorAll('.ch-photo').forEach(fig => {
    const img = fig.querySelector('img');
    fig.addEventListener('pointermove', e => {
      if (!fine.matches || still.matches) return;
      const b = fig.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
      img.style.transform = `translate(${(x * 6).toFixed(1)}px, ${(y * 6).toFixed(1)}px)`;
    });
    fig.addEventListener('pointerleave', () => { img.style.transform = ''; });
  });
})();
