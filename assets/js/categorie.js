/* ============================================================
   FIVE — Page catégorie générique (?cat=<slug>)
   Proto : produits dupliqués, regroupés par sous-gamme.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const euro = n => Number(n).toFixed(2).replace('.', ',') + ' €';

  /* ---------- Header + nav mobile + toast ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const burger = $('#burger'), nav = $('#primary-nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  const toastEl = $('#toast'); let toastTimer;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('is-visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2600); }
  $$('[data-action="search"]').forEach(b => b.addEventListener('click', () => toast('Recherche — à venir')));

  /* ---------- Catégorie ---------- */
  const slug = new URLSearchParams(location.search).get('cat');
  const idx = Math.max(0, CATEGORIES.findIndex(c => c.slug === slug));
  const cat = CATEGORIES[idx];

  document.title = `FIVE — ${cat.name}`;
  $('#bc-cat').textContent = cat.name;
  $('#cat-tag').textContent = 'Gants moto · ' + cat.tag;
  $('#cat-name').textContent = cat.name;
  $('#cat-desc').textContent = cat.desc || '';
  const heroImg = $('#cat-hero-img');
  heroImg.src = cat.img; heroImg.alt = `FIVE — ${cat.name}`;

  /* ---------- Sidebar : filtres (proto) + gammes ---------- */
  const FILTERS = [
    { name: 'Couleurs', open: true, options: ['Noir', 'Rouge', 'Blanc', 'Fluo', 'Camo', 'Cuir'] },
    { name: 'Tailles', options: ['XS', 'S', 'M', 'L', 'XL', '2XL'] },
    { name: 'Propriétés', options: ['Coqués', 'Ventilés', 'Tactiles', 'Cuir', 'Vintage'] },
    { name: 'Technologies', options: ['Kevlar', 'Gore-Tex', 'Primaloft', '5_DryTech™', '5_WarmTech™', 'Chauffants'] },
    { name: 'Certifications', options: ['CE KP1', 'CE KP2'] }
  ];
  $('#cat-sidebar').innerHTML = `
    <div class="cat-side-block">
      <p class="cat-side-label">Filtres</p>
      ${FILTERS.map(f => `
        <div class="filter-acc${f.open ? ' is-open' : ''}">
          <button class="filter-acc__head" data-acc>${f.name}
            <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="filter-acc__body">
            ${f.options.map(o => `<label class="filter-opt"><input type="checkbox" /><span>${o}</span></label>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    <nav class="cat-side-block cat-ranges" aria-label="Gammes">
      <p class="cat-side-label">Gammes</p>
      <ul>${CATEGORIES.map(c => `<li><a href="categorie.html?cat=${c.slug}"${c.slug === cat.slug ? ' class="is-active" aria-current="page"' : ''}>${c.name}</a></li>`).join('')}</ul>
    </nav>`;

  $('#cat-sidebar').addEventListener('click', e => {
    const h = e.target.closest('[data-acc]');
    if (h) h.parentElement.classList.toggle('is-open');
  });

  /* ---------- Produits (dupliqués, regroupés par sous-gamme) ---------- */
  const rot = idx % PRODUCTS.length;
  const rotated = PRODUCTS.slice(rot).concat(PRODUCTS.slice(0, rot));
  let base = [];
  while (base.length < 12) base = base.concat(rotated);
  base = base.slice(0, 12).sort((a, b) => b.price - a.price);

  const groups = [
    { label: 'Performance', items: base.slice(0, 5) },
    { label: 'Sport', items: base.slice(5, 9) },
    { label: 'Essentiels', items: base.slice(9, 12) }
  ].filter(g => g.items.length);

  const badgeHTML = b => {
    if (!b) return '';
    const map = { nouveau: ['Nouveau', ''], best: ['Best', 'badge--best'], promo: ['Promo', 'badge--promo'] };
    const [label, cls] = map[b] || [b, ''];
    return `<span class="badge ${cls}">${label}</span>`;
  };
  function cardHTML(p, groupLabel) {
    const max = 6;
    const shown = p.variants.slice(0, max);
    const extra = p.variants.length - shown.length;
    const swatches = shown.map((v, i) =>
      `<button class="swatch${i === 0 ? ' is-active' : ''}" style="background:${v.hex}" data-img="${v.img}" aria-label="${v.name}" title="${v.name}"></button>`).join('')
      + (extra > 0 ? `<span class="swatch-more">+${extra}</span>` : '');
    return `<article class="card" data-cat="${p.cat}">
      <div class="card__media">
        ${badgeHTML(p.badge)}
        <button class="wishlist" aria-label="Ajouter aux favoris" aria-pressed="false">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.2 1.2 4 2.5C10.8 6.2 12 5 14 5c3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/></svg>
        </button>
        <a class="card__media-link" href="produit.html?id=${p.id}" aria-label="Voir ${p.name}">
          <img class="card__img" src="${p.variants[0].img}" alt="FIVE ${p.name}" loading="lazy" referrerpolicy="no-referrer" />
        </a>
      </div>
      <div class="card__body">
        <h3 class="card__name"><a href="produit.html?id=${p.id}">${p.name}</a></h3>
        <p class="card__path">Gants moto · ${cat.name} · ${groupLabel}</p>
        <p class="card__coloris">${p.variants.length} coloris</p>
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

  // chips (Tout + sous-gammes)
  $('#cat-chips').innerHTML =
    `<button class="cat-chip is-active" data-g="all">Tout <span>${base.length}</span></button>` +
    groups.map((g, i) => `<button class="cat-chip" data-g="${i}">${g.label} <span>${g.items.length}</span></button>`).join('');

  // sections groupées
  $('#cat-groups').innerHTML = groups.map((g, i) => `
    <section class="cat-group" data-g="${i}">
      <header class="cat-group__head"><h2><strong>${cat.name}</strong> ${g.label}</h2></header>
      <div class="product-grid">${g.items.map(p => cardHTML(p, g.label)).join('')}</div>
    </section>`).join('');

  // filtre par chip
  $('#cat-chips').addEventListener('click', e => {
    const b = e.target.closest('.cat-chip'); if (!b) return;
    $$('.cat-chip').forEach(x => x.classList.remove('is-active'));
    b.classList.add('is-active');
    const g = b.dataset.g;
    $$('.cat-group').forEach(sec => { sec.hidden = (g !== 'all' && sec.dataset.g !== g); });
  });

  /* ---------- Interactions cartes ---------- */
  $('#cat-groups').addEventListener('click', e => {
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
    const wish = e.target.closest('.wishlist');
    if (wish) { const on = wish.classList.toggle('is-active'); wish.setAttribute('aria-pressed', String(on)); return; }
    const sw = e.target.closest('.swatch');
    if (sw) {
      const img = sw.closest('.card').querySelector('.card__img');
      if (sw.dataset.img && img && img.src !== sw.dataset.img) {
        img.classList.add('is-swapping');
        const next = new Image();
        next.onload = () => { img.src = sw.dataset.img; img.classList.remove('is-swapping'); };
        next.referrerPolicy = 'no-referrer';
        next.src = sw.dataset.img;
      }
      sw.closest('.swatches').querySelectorAll('.swatch').forEach(s => s.classList.remove('is-active'));
      sw.classList.add('is-active');
    }
  });
})();
