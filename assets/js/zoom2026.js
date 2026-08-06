/* ============================================================
   FIVE — Zoom nouveautés moto 2026
   Barre de progression, rail de navigation, révélations,
   sélecteurs de vues et parallaxe légère du bandeau héro.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();

  const burger = $('#burger'), nav = $('#primary-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- 2. Barre de progression ---------- */
  const bar = $('#zm-progress-bar');
  function progress() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    if (bar) bar.style.width = Math.min(100, Math.max(0, p)).toFixed(2) + '%';
  }

  /* ---------- 3. Parallaxe du bandeau héro ---------- */
  const stripItems = $$('.zm-strip__item');
  function parallax() {
    if (reduced || !stripItems.length) return;
    const y = window.scrollY;
    stripItems.forEach((el, i) => {
      const depth = (i % 2 === 0 ? 0.06 : 0.12);
      el.style.setProperty('--shift', (-y * depth).toFixed(1) + 'px');
    });
  }

  /* ---------- 4. Rail : visibilité + section active ---------- */
  const rail = $('#zm-rail');
  const railLinks = $$('#zm-rail a');
  const sections = railLinks.map(a => $('#' + a.dataset.target)).filter(Boolean);
  const intro = $('.zm-intro');

  function spy() {
    if (!rail || !sections.length) return;
    const introBottom = intro ? intro.getBoundingClientRect().bottom : 0;
    const compare = $('.zm-compare');
    const compareTop = compare ? compare.getBoundingClientRect().top : Infinity;
    rail.classList.toggle('is-visible', introBottom < 120 && compareTop > window.innerHeight * 0.5);

    const line = window.innerHeight * 0.42;
    let active = 0;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) active = i; });
    railLinks.forEach((a, i) => a.classList.toggle('is-active', i === active));
  }

  /* ---------- 5. Boucle de scroll ---------- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); progress(); parallax(); spy(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', () => { progress(); spy(); }, { passive: true });
  progress(); spy();

  /* ---------- 6. Révélation au scroll ---------- */
  const revealables = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- 7. Sélecteurs de vues (coloris / détails) ---------- */
  $$('.zm-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = $('#' + btn.dataset.for);
      if (!target) return;
      const group = btn.closest('.zm-swatches');
      $$('.zm-swatch', group).forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const next = new Image();
      next.onload = () => {
        target.style.opacity = '0';
        setTimeout(() => { target.src = btn.dataset.img; target.style.opacity = '1'; }, 160);
      };
      next.src = btn.dataset.img;
    });
  });

  /* ---------- 8. Bandes de détails : molette horizontale ---------- */
  $$('[data-focus] .zm-focus__track').forEach(track => {
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = track.scrollWidth - track.clientWidth;
      if ((e.deltaY < 0 && track.scrollLeft <= 0) || (e.deltaY > 0 && track.scrollLeft >= max - 1)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }, { passive: false });
  });
})();
