/* ============================================================
   FIVE — Favoris / wishlist partagés (localStorage)
   window.FiveWish + bouton cœur dans le header + délégation.
   ============================================================ */
(function () {
  'use strict';
  const KEY = 'five_wish';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const write = a => localStorage.setItem(KEY, JSON.stringify(a));
  let ids = read();
  const listeners = [];
  const notify = () => listeners.forEach(f => { try { f(); } catch (e) {} });

  /* ---------- Bouton cœur dans le header ---------- */
  const actions = document.querySelector('.header__actions');
  if (actions) {
    const cartBtn = actions.querySelector('.icon-btn--cart');
    const a = document.createElement('a');
    a.className = 'icon-btn icon-btn--wish';
    a.href = 'favoris.html';
    a.setAttribute('aria-label', 'Favoris');
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.2 1.2 4 2.5C10.8 6.2 12 5 14 5c3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/></svg><span class="wish-count" id="wish-count">0</span>';
    actions.insertBefore(a, cartBtn || null);
  }

  function render() {
    document.querySelectorAll('.wish-count').forEach(b => {
      b.textContent = ids.length;
      b.classList.toggle('is-visible', ids.length > 0);
    });
    document.querySelectorAll('[data-wish]').forEach(btn => {
      const on = ids.includes(btn.dataset.wish);
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    notify();
  }

  function toggle(id) {
    const i = ids.indexOf(id);
    if (i >= 0) ids.splice(i, 1); else ids.push(id);
    write(ids); render();
  }

  // délégation : n'importe quel bouton [data-wish] où qu'il soit
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-wish]');
    if (!btn) return;
    e.preventDefault();
    toggle(btn.dataset.wish);
  });

  window.FiveWish = {
    has: id => ids.includes(id),
    toggle,
    ids: () => ids.slice(),
    count: () => ids.length,
    onChange(fn) { listeners.push(fn); },
    render
  };

  render();
})();
