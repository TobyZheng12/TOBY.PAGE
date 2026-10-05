(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const navButton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('[data-header]');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${next} theme`);
  };
  updateThemeLabel();

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateThemeLabel();
  });

  const closeNavigation = () => {
    nav?.classList.remove('is-open');
    navButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  navButton?.addEventListener('click', () => {
    const isOpen = navButton.getAttribute('aria-expanded') === 'true';
    navButton.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeNavigation(); });

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  document.querySelector('[data-year]').textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.site-nav a')];
    const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        if (link.getAttribute('href') === `#${visible.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -65%', threshold: [0, .2, .5] });
    sections.forEach((section) => observer.observe(section));
  }
})();
