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
