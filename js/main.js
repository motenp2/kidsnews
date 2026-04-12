/* === THE KID REPORTER — Main JavaScript === */

// ----------------------------------------
// Dark/Light mode toggle
// ----------------------------------------
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root   = document.documentElement;

  // Read system preference, default to light
  let currentTheme = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      toggle.innerHTML = theme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  applyTheme(currentTheme);

  if (toggle) {
    toggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }
})();

// ----------------------------------------
// Live date in masthead
// ----------------------------------------
(function () {
  const el = document.getElementById('js-date');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
})();

// ----------------------------------------
// Sticky header hide-on-scroll
// ----------------------------------------
(function () {
  const header = document.querySelector('.masthead');
  if (!header) return;
  let lastY = 0;
  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (y > lastY && y > 120) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    if (y > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastY = y;
  }, { passive: true });
})();

// ----------------------------------------
// Article card image lazy loading
// ----------------------------------------
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const observer   = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach(function (img) { observer.observe(img); });
}

// ----------------------------------------
// Smooth scroll for anchor links
// ----------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
