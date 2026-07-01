/* ============================================================
   FIVE — Panier partagé (tiroir latéral + stockage localStorage)
   Exposé globalement via window.FiveCart
   ============================================================ */
(function () {
  'use strict';

  const KEY = 'five_cart_v2';
  const euro = n => Number(n).toFixed(2).replace('.', ',') + ' €';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const write = a => localStorage.setItem(KEY, JSON.stringify(a));
  const lineKey = it => [it.id, it.variant || '', it.size || ''].join('|');

  let items = read();
  const listeners = [];

  /* ---------- Tiroir (injecté dans le body) ---------- */
  const drawer = document.createElement('div');
  drawer.className = 'cart-drawer';
  drawer.innerHTML = `
    <div class="cart-drawer__backdrop" data-cart-close></div>
    <aside class="cart-panel" role="dialog" aria-label="Panier" aria-modal="true">
      <header class="cart-panel__head">
        <h2>Ton panier <span class="cart-panel__count" id="cart-panel-count"></span></h2>
        <button class="cart-panel__close" data-cart-close aria-label="Fermer le panier">
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>
      <div class="cart-panel__items" id="cart-panel-items"></div>
      <footer class="cart-panel__foot" id="cart-panel-foot"></footer>
    </aside>`;
  document.body.appendChild(drawer);

  const $items = drawer.querySelector('#cart-panel-items');
  const $foot = drawer.querySelector('#cart-panel-foot');
  const $count = drawer.querySelector('#cart-panel-count');

  const totalQty = () => items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = () => items.reduce((s, i) => s + i.price * i.qty, 0);

  function renderBadge() {
    const n = totalQty();
    document.querySelectorAll('#cart-count').forEach(b => {
      b.textContent = n;
      b.classList.toggle('is-visible', n > 0);
    });
  }

  function render() {
    renderBadge();
    $count.textContent = totalQty() ? `(${totalQty()})` : '';
    if (!items.length) {
      $items.innerHTML = `<div class="cart-empty"><p>Ton panier est vide.</p><a href="index.html#nouveautes" class="btn btn--red" data-cart-close>Découvrir les gants</a></div>`;
      $foot.innerHTML = '';
      notify();
      return;
    }
    $items.innerHTML = items.map(it => `
      <div class="cart-line" data-k="${lineKey(it)}">
        <div class="cart-line__media"><img src="${it.img}" alt="${it.name}" referrerpolicy="no-referrer" /></div>
        <div class="cart-line__info">
          <p class="cart-line__name">${it.name}</p>
          <p class="cart-line__meta">${[it.variant, it.size && it.size !== '—' ? 'Taille ' + it.size : ''].filter(Boolean).join(' · ')}</p>
          <div class="cart-line__qty">
            <button data-cart-dec aria-label="Diminuer">−</button>
            <span>${it.qty}</span>
            <button data-cart-inc aria-label="Augmenter">+</button>
          </div>
        </div>
        <div class="cart-line__right">
          <span class="cart-line__price">${euro(it.price * it.qty)}</span>
          <button class="cart-line__rm" data-cart-remove aria-label="Retirer">Retirer</button>
        </div>
      </div>`).join('');
    $foot.innerHTML = `
      <div class="cart-total"><span>Sous-total</span><strong>${euro(totalPrice())}</strong></div>
      <p class="cart-note">Livraison calculée à l'étape suivante.</p>
      <a href="panier.html" class="btn btn--ghost cart-btn">Voir le panier</a>
      <button class="btn btn--red cart-btn" data-cart-checkout>Commander</button>`;
    notify();
  }

  function notify() { listeners.forEach(fn => { try { fn(); } catch (e) {} }); }

  function open() { drawer.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function close() { drawer.classList.remove('is-open'); document.body.style.overflow = ''; }

  /* ---------- Interactions ---------- */
  drawer.addEventListener('click', e => {
    if (e.target.closest('[data-cart-close]')) { close(); return; }
    if (e.target.closest('[data-cart-checkout]')) { window.location.href = 'panier.html'; return; }
    const line = e.target.closest('.cart-line');
    if (!line) return;
    const k = line.dataset.k;
    const it = items.find(i => lineKey(i) === k);
    if (!it) return;
    if (e.target.closest('[data-cart-inc]')) it.qty++;
    else if (e.target.closest('[data-cart-dec]')) it.qty--;
    else if (e.target.closest('[data-cart-remove]')) it.qty = 0;
    else return;
    if (it.qty <= 0) items = items.filter(i => i !== it);
    write(items); render();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // ouvrir le tiroir depuis les boutons panier du header
  document.addEventListener('click', e => {
    if (e.target.closest('[data-action="cart"]')) { e.preventDefault(); open(); }
  });

  /* ---------- API publique ---------- */
  window.FiveCart = {
    add(item) {
      const it = Object.assign({ qty: 1 }, item);
      it.qty = it.qty || 1;
      const k = lineKey(it);
      const ex = items.find(i => lineKey(i) === k);
      if (ex) ex.qty += it.qty; else items.push(it);
      write(items); render(); open();
    },
    setQty(key, qty) {
      const it = items.find(i => lineKey(i) === key);
      if (!it) return;
      it.qty = qty;
      if (it.qty <= 0) items = items.filter(i => i !== it);
      write(items); render();
    },
    removeLine(key) { items = items.filter(i => lineKey(i) !== key); write(items); render(); },
    items: () => items.map(i => Object.assign({}, i)),
    key: lineKey,
    subtotal: totalPrice,
    count: totalQty,
    open, close, render,
    onChange(fn) { listeners.push(fn); }
  };

  render();
})();
