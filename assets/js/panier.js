/* ============================================================
   FIVE — Page panier (utilise window.FiveCart de cart.js)
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const euro = n => Number(n).toFixed(2).replace('.', ',') + ' €';
  const FREE_FROM = 80, SHIPPING = 5.90;

  /* ---------- Header au scroll + nav mobile ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const burger = $('#burger'), nav = $('#primary-nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2600);
  }
  $$('[data-action="search"]').forEach(b => b.addEventListener('click', () => toast('Recherche — à venir')));

  const grid = $('#cart-grid'), empty = $('#cart-empty');
  const itemsWrap = $('#cart-items'), summary = $('#cart-summary'), headcount = $('#cart-headcount');

  function render() {
    const cart = window.FiveCart;
    const items = cart.items();
    const qty = items.reduce((s, i) => s + i.qty, 0);

    if (!items.length) {
      grid.hidden = true; empty.hidden = false; headcount.textContent = '';
      return;
    }
    grid.hidden = false; empty.hidden = true;
    headcount.textContent = `${qty} article${qty > 1 ? 's' : ''}`;

    itemsWrap.innerHTML = items.map(it => `
      <article class="cart-row" data-k="${cart.key(it)}">
        <a class="cart-row__media" href="produit.html?id=${it.id}">
          <img src="${it.img}" alt="${it.name}" referrerpolicy="no-referrer" />
        </a>
        <div class="cart-row__info">
          <a class="cart-row__name" href="produit.html?id=${it.id}">${it.name}</a>
          <p class="cart-row__meta">${[it.variant, it.size && it.size !== '—' ? 'Taille ' + it.size : ''].filter(Boolean).join(' · ')}</p>
          <p class="cart-row__unit">${euro(it.price)} / unité</p>
          <button class="cart-row__rm" data-rm>Retirer</button>
        </div>
        <div class="cart-row__qty">
          <button data-dec aria-label="Diminuer">−</button>
          <span>${it.qty}</span>
          <button data-inc aria-label="Augmenter">+</button>
        </div>
        <div class="cart-row__price">${euro(it.price * it.qty)}</div>
      </article>`).join('');

    const sub = cart.subtotal();
    const ship = sub >= FREE_FROM ? 0 : SHIPPING;
    summary.innerHTML = `
      <h2 class="cart-summary__title">Récapitulatif</h2>
      <div class="summary-row"><span>Sous-total</span><span>${euro(sub)}</span></div>
      <div class="summary-row"><span>Livraison</span><span>${ship ? euro(ship) : 'Offerte'}</span></div>
      ${sub < FREE_FROM ? `<p class="summary-hint">Plus que <strong>${euro(FREE_FROM - sub)}</strong> pour la livraison offerte.</p>` : ''}
      <div class="summary-total"><span>Total</span><strong>${euro(sub + ship)}</strong></div>
      <button class="btn btn--red summary-cta" data-checkout>Passer commande <span class="arrow">→</span></button>
      <a href="index.html#nouveautes" class="summary-continue">← Continuer mes achats</a>
      <ul class="summary-perks">
        <li>Paiement sécurisé 3D Secure</li>
        <li>Retours gratuits sous 30 jours</li>
        <li>Expédition sous 24h</li>
      </ul>`;
  }

  // délégation : quantité + suppression
  itemsWrap.addEventListener('click', e => {
    const row = e.target.closest('.cart-row'); if (!row) return;
    const k = row.dataset.k;
    const it = window.FiveCart.items().find(i => window.FiveCart.key(i) === k);
    if (!it) return;
    if (e.target.closest('[data-inc]')) window.FiveCart.setQty(k, it.qty + 1);
    else if (e.target.closest('[data-dec]')) window.FiveCart.setQty(k, it.qty - 1);
    else if (e.target.closest('[data-rm]')) window.FiveCart.removeLine(k);
  });

  // checkout (délégué car le résumé est re-rendu)
  summary.addEventListener('click', e => {
    if (e.target.closest('[data-checkout]')) toast('Paiement — à venir 🏁');
  });

  window.FiveCart.onChange(render);
  render();
})();
