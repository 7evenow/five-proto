/* ============================================================
   FIVE — Page favoris (utilise FiveWish + FiveCart)
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const euro = n => Number(n).toFixed(2).replace('.', ',') + ' €';

  /* header scroll + nav mobile + toast */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const burger = $('#burger'), nav = $('#primary-nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  const toastEl = $('#toast'); let tt;
  const toast = m => { toastEl.textContent = m; toastEl.classList.add('is-visible'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('is-visible'), 2600); };

  const grid = $('#fav-grid'), empty = $('#fav-empty'), headcount = $('#fav-headcount');

  const badgeHTML = b => {
    if (!b) return '';
    const map = { nouveau: ['Nouveau', ''], best: ['Best', 'badge--best'], promo: ['Promo', 'badge--promo'] };
    const [label, cls] = map[b] || [b, ''];
    return `<span class="badge ${cls}">${label}</span>`;
  };
  function cardHTML(p) {
    const shown = p.variants.slice(0, 6);
    const extra = p.variants.length - shown.length;
    const swatches = shown.map((v, i) =>
      `<button class="swatch${i === 0 ? ' is-active' : ''}" style="background:${v.hex}" data-img="${v.img}" aria-label="${v.name}" title="${v.name}"></button>`).join('')
      + (extra > 0 ? `<span class="swatch-more">+${extra}</span>` : '');
    return `<article class="card" data-cat="${p.cat}">
      <div class="card__media">
        ${badgeHTML(p.badge)}
        <button class="wishlist is-active" data-wish="${p.id}" aria-label="Retirer des favoris" aria-pressed="true">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.2 1.2 4 2.5C10.8 6.2 12 5 14 5c3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/></svg>
        </button>
        <a class="card__media-link" href="produit.html?id=${p.id}" aria-label="Voir ${p.name}">
          <img class="card__img" src="${p.variants[0].img}" alt="FIVE ${p.name}" loading="lazy" referrerpolicy="no-referrer" />
        </a>
      </div>
      <div class="card__body">
        <span class="card__cat">${p.catLabel}</span>
        <h3 class="card__name"><a href="produit.html?id=${p.id}">${p.name}</a></h3>
        <div class="swatches">${swatches}</div>
        <div class="card__foot">
          <span class="price">${euro(p.price)}</span>
          <button class="add-btn" aria-label="Ajouter ${p.name} au panier"
            data-id="${p.id}" data-name="${p.name}" data-price="${p.price}"
            data-img="${p.variants[0].img}" data-size="${p.cat === 'accessoire' ? 'Unique' : 'M'}">+</button>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const ids = window.FiveWish.ids();
    const list = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    headcount.textContent = list.length ? `${list.length} article${list.length > 1 ? 's' : ''}` : '';
    if (!list.length) { grid.hidden = true; empty.hidden = false; return; }
    grid.hidden = false; empty.hidden = true;
    grid.innerHTML = list.map(cardHTML).join('');
  }

  // interactions (add-to-cart + coloris). Le cœur est géré par wishlist.js (délégation).
  grid.addEventListener('click', e => {
    const add = e.target.closest('.add-btn');
    if (add) {
      const card = add.closest('.card');
      const sw = card.querySelector('.swatch.is-active') || card.querySelector('.swatch');
      window.FiveCart.add({
        id: add.dataset.id, name: add.dataset.name, price: parseFloat(add.dataset.price),
        img: sw ? sw.dataset.img : add.dataset.img,
        variant: sw ? (sw.getAttribute('title') || '') : '',
        size: add.dataset.size
      });
      return;
    }
    const sw = e.target.closest('.swatch');
    if (sw) {
      const img = sw.closest('.card').querySelector('.card__img');
      if (sw.dataset.img && img && img.src !== sw.dataset.img) {
        img.classList.add('is-swapping');
        const n = new Image(); n.onload = () => { img.src = sw.dataset.img; img.classList.remove('is-swapping'); };
        n.referrerPolicy = 'no-referrer'; n.src = sw.dataset.img;
      }
      sw.closest('.swatches').querySelectorAll('.swatch').forEach(s => s.classList.remove('is-active'));
      sw.classList.add('is-active');
    }
  });

  // re-render quand on retire un favori (cœur)
  window.FiveWish.onChange(() => {
    const shown = $$('.card', grid).length;
    if (window.FiveWish.count() !== shown) render();
  });

  render();
})();
