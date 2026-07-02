/* ============================================================
   FIVE — Recherche produits (overlay, live)
   Déclenché par [data-action="search"]. Nécessite PRODUCTS (data.js).
   ============================================================ */
(function () {
  'use strict';
  if (typeof PRODUCTS === 'undefined') return;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const euro = n => Number(n).toFixed(2).replace('.', ',') + ' €';
  const CAT = { moto: 'Gants moto', velo: 'Gants vélo', accessoire: 'Accessoires' };
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-backdrop" data-search-close></div>
    <div class="search-panel" role="dialog" aria-label="Recherche" aria-modal="true">
      <div class="container">
        <div class="search-bar">
          <svg class="search-bar__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
          <input type="search" id="search-input" placeholder="Rechercher un gant, une gamme…" autocomplete="off" aria-label="Rechercher" />
          <button class="search-close" data-search-close aria-label="Fermer">✕</button>
        </div>
        <p class="search-hint" id="search-hint">Suggestions</p>
        <div class="search-results" id="search-results"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const input = $('#search-input', overlay);
  const results = $('#search-results', overlay);
  const hint = $('#search-hint', overlay);

  const cardHTML = p => `
    <a class="search-item" href="produit.html?id=${p.id}">
      <span class="search-item__media"><img src="${p.variants[0].img}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" /></span>
      <span class="search-item__info">
        <span class="search-item__name">${p.name}</span>
        <span class="search-item__cat">${p.catLabel} · ${CAT[p.cat] || ''}</span>
      </span>
      <span class="search-item__price">${euro(p.price)}</span>
    </a>`;

  function search(q) {
    q = norm(q.trim());
    if (!q) {
      hint.textContent = 'Suggestions';
      results.innerHTML = PRODUCTS.slice(0, 4).map(cardHTML).join('');
      return;
    }
    const hits = PRODUCTS.filter(p => {
      const hay = norm([p.name, p.catLabel, CAT[p.cat] || '', p.cat, ...(p.variants || []).map(v => v.name)].join(' '));
      return q.split(/\s+/).every(w => hay.includes(w));
    });
    hint.textContent = hits.length ? `${hits.length} résultat${hits.length > 1 ? 's' : ''}` : 'Aucun résultat';
    results.innerHTML = hits.length
      ? hits.map(cardHTML).join('')
      : `<p class="search-empty">Rien pour « ${q} ». Essaie « racing », « xr », « cap »…</p>`;
  }

  let open = false;
  function openSearch() {
    open = true; overlay.classList.add('is-open'); document.body.style.overflow = 'hidden';
    search(input.value || '');
    setTimeout(() => input.focus(), 60);
  }
  function closeSearch() { open = false; overlay.classList.remove('is-open'); document.body.style.overflow = ''; }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-action="search"]')) { e.preventDefault(); openSearch(); return; }
    if (e.target.closest('[data-search-close]')) closeSearch();
  });
  input.addEventListener('input', () => search(input.value));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeSearch(); });
})();
