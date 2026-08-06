/* ============================================================
   FIVE — Glossaire technique
   Recherche instantanée, filtres par famille, compteurs.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Header ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = $('#burger'), nav = $('#primary-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- Glossaire ---------- */
  const input = $('#gl-input');
  const clear = $('#gl-clear');
  const pills = $$('.gl-filters .filter');
  const cards = $$('.gl-card');
  const nEl = $('#gl-n');
  const totalEl = $('#gl-total');
  const empty = $('#gl-empty');
  if (!input || !cards.length) return;

  let cat = 'all';

  const DIACRITICS = /[\u0300-\u036f]/g;
  const norm = s => s.toLowerCase().normalize('NFD').replace(DIACRITICS, '');

  // index de recherche : mots-clés + titre + définition
  cards.forEach(c => { c._hay = norm((c.dataset.term || '') + ' ' + c.textContent); });
  if (totalEl) totalEl.textContent = cards.length;

  function render() {
    const q = norm(input.value.trim());
    let n = 0;
    cards.forEach(c => {
      const okCat = cat === 'all' || (' ' + c.dataset.cat + ' ').indexOf(' ' + cat + ' ') > -1;
      const okTxt = !q || c._hay.indexOf(q) > -1;
      const show = okCat && okTxt;
      c.hidden = !show;
      if (show) n++;
    });
    nEl.textContent = n;
    empty.hidden = n > 0;
    clear.hidden = !input.value;
  }

  input.addEventListener('input', render);
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape' && input.value) { input.value = ''; render(); }
  });

  clear.addEventListener('click', () => { input.value = ''; input.focus(); render(); });

  pills.forEach(p => {
    p.addEventListener('click', () => {
      pills.forEach(x => x.classList.remove('is-active'));
      p.classList.add('is-active');
      cat = p.dataset.cat;
      render();
      const bar = $('#gl-bar');
      if (bar && bar.getBoundingClientRect().top < 0) {
        window.scrollTo({ top: bar.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // raccourci clavier : « / » place le curseur dans la recherche
  document.addEventListener('keydown', e => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    e.preventDefault();
    input.focus();
  });

  /* ---------- État initial depuis l'URL (?q= / ?cat=) ---------- */
  const params = new URLSearchParams(location.search);
  const urlQ = params.get('q');
  const urlCat = params.get('cat');

  if (urlQ) input.value = urlQ;
  if (urlCat) {
    const pill = pills.find(p => p.dataset.cat === urlCat);
    if (pill) {
      pills.forEach(x => x.classList.remove('is-active'));
      pill.classList.add('is-active');
      cat = urlCat;
    }
  }

  render();

  if (urlQ || urlCat) {
    const bar = $('#gl-bar');
    if (bar) window.scrollTo({ top: bar.offsetTop - 70, behavior: 'smooth' });
  }
})();
