/* ============================================================
   FIVE — Fiche produit (générique, pilotée par ?id=)
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const euro = n => n.toFixed(2).replace('.', ',') + ' €';

  /* ---------- Header au scroll + nav mobile ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

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

  /* ---------- Panier (partagé avec l'accueil) ---------- */
  let cartItems = parseInt(localStorage.getItem('five_cart') || '0', 10);
  const cartCount = $('#cart-count');
  function renderCart() {
    cartCount.textContent = cartItems;
    cartCount.classList.toggle('is-visible', cartItems > 0);
  }
  renderCart();

  /* ---------- Sélection du produit ---------- */
  const params = new URLSearchParams(location.search);
  const product = PRODUCTS.find(p => p.id === params.get('id')) || PRODUCTS[0];

  const CAT_LABEL = { moto: 'Gants Moto', velo: 'Gants Vélo', accessoire: 'Accessoires' };
  const isAccessoire = product.cat === 'accessoire';
  const SIZES = isAccessoire ? ['Unique'] : ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  let currentVariant = product.variants[0];
  let currentSize = isAccessoire ? 'Unique' : null;
  let qty = 1;

  /* ---------- Remplissage statique ---------- */
  document.title = `FIVE — ${product.name}`;
  $('#bc-cat').textContent = CAT_LABEL[product.cat] || 'Catégorie';
  $('#p-cat').textContent = product.catLabel;
  $('#bc-name').textContent = product.name;
  $('#p-name').textContent = product.name;
  $('#p-price').textContent = euro(product.price);
  $('#p-desc').textContent = product.desc || '';

  const badgeEl = $('#p-badge');
  const badgeMap = { nouveau: ['Nouveau', ''], best: ['Best', 'badge--best'], promo: ['Promo', 'badge--promo'] };
  if (product.badge && badgeMap[product.badge]) {
    badgeEl.textContent = badgeMap[product.badge][0];
    badgeEl.className = 'badge ' + badgeMap[product.badge][1];
    badgeEl.hidden = false;
  }

  // badges sous le prix (CE / coupe pour les gants)
  const tags = isAccessoire ? ['Taille unique'] : ['Homologué CE', 'Coupe ajustée', 'Écran tactile'];
  $('#p-tags').innerHTML = tags.map(t => `<span class="tag">${t}</span>`).join('');

  /* ---------- Galerie ----------
     Photo principale (en haut) = le coloris sélectionné (change avec le sélecteur).
     En dessous = photos de mise en avant partagées (gallery), en grand,
     identiques quel que soit le coloris. */
  const extras = product.gallery || [];
  const mainImg = $('#main-img');

  mainImg.src = currentVariant.img;
  mainImg.alt = `FIVE ${product.name} — ${currentVariant.name}`;
  $('#p-color-name').textContent = currentVariant.name;

  // packshots produit sous la principale (dans le bloc d'achat)
  $('#gallery-extra').innerHTML = extras.map(src =>
    `<figure class="gallery__cell"><img src="${src}" alt="${product.name}" loading="lazy" referrerpolicy="no-referrer" /></figure>`).join('');

  // photos de zoom / lifestyle (après les caractéristiques)
  const media = product.media || [];
  if (media.length) {
    $('#media-grid').innerHTML = media.map(src =>
      `<figure class="media__cell reveal"><img src="${src}" alt="FIVE ${product.name}" loading="lazy" referrerpolicy="no-referrer" /></figure>`).join('');
  } else {
    $('#media').hidden = true;
  }

  function selectColor(v) {
    currentVariant = v;
    $('#p-color-name').textContent = v.name;
    $$('#p-swatches .swatch').forEach(s => s.classList.toggle('is-active', s.dataset.id === v.img));
    if (mainImg.getAttribute('src') === v.img) return;
    mainImg.classList.add('is-swapping');
    const next = new Image();
    next.referrerPolicy = 'no-referrer';
    next.onload = () => { mainImg.src = v.img; mainImg.alt = `FIVE ${product.name} — ${v.name}`; mainImg.classList.remove('is-swapping'); };
    next.src = v.img;
  }

  // swatches (sélecteur de couleur)
  $('#p-swatches').innerHTML = product.variants.map((v, i) =>
    `<button class="swatch${i === 0 ? ' is-active' : ''}" style="background:${v.hex}" data-id="${v.img}" aria-label="${v.name}" title="${v.name}"></button>`).join('');
  // masquer le sélecteur s'il n'y a qu'un coloris
  if (product.variants.length < 2) $('#p-swatches').closest('.product__opt').hidden = true;

  // tailles
  $('#p-sizes').innerHTML = SIZES.map((s, i) => `<button class="size${isAccessoire && i === 0 ? ' is-active' : ''}" data-size="${s}">${s}</button>`).join('');

  /* ---------- Specs (pictos officiels FIVE) ---------- */
  const specs = product.specs || [];
  if (specs.length) {
    $('#p-specs').innerHTML = specs.map(s =>
      `<span class="spec"><img src="${s.icon}" alt="" loading="lazy" referrerpolicy="no-referrer" /><span>${s.label}</span></span>`).join('');
  } else {
    $('#p-specs').hidden = true;
  }

  /* ---------- Caractéristiques (liste) ---------- */
  const feats = product.features || [];
  if (feats.length) {
    $('#p-features').innerHTML = feats.map(f => `<li>${f}</li>`).join('');
  } else {
    $('#p-features').hidden = true;
  }
  if (!specs.length && !feats.length) $('#pdetails').hidden = true;

  /* ---------- Interactions ---------- */
  const variantByImg = img => product.variants.find(v => v.img === img);

  $('#p-swatches').addEventListener('click', e => {
    const s = e.target.closest('.swatch'); if (!s) return;
    selectColor(variantByImg(s.dataset.id));
  });
  $('#p-sizes').addEventListener('click', e => {
    const b = e.target.closest('.size'); if (!b) return;
    $$('#p-sizes .size').forEach(x => x.classList.remove('is-active'));
    b.classList.add('is-active');
    currentSize = b.dataset.size;
  });
  $('.qty').addEventListener('click', e => {
    const b = e.target.closest('[data-q]'); if (!b) return;
    qty = Math.max(1, qty + parseInt(b.dataset.q, 10));
    $('#qty').textContent = qty;
  });
  $('#p-wish').addEventListener('click', () => {
    const on = $('#p-wish').classList.toggle('is-active');
    $('#p-wish').setAttribute('aria-pressed', String(on));
    toast(on ? 'Ajouté aux favoris' : 'Retiré des favoris');
  });
  $('#add-cart').addEventListener('click', () => {
    if (!currentSize) {
      toast('Choisis une taille');
      $('#p-sizes').classList.add('shake');
      setTimeout(() => $('#p-sizes').classList.remove('shake'), 500);
      return;
    }
    cartItems += qty;
    localStorage.setItem('five_cart', cartItems);
    renderCart();
    cartCount.style.animation = 'none'; void cartCount.offsetWidth; cartCount.style.animation = '';
    toast(`${product.name} (${currentVariant.name}, ${currentSize}) ×${qty} ajouté au panier`);
  });

  $$('[data-action]').forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.action;
    if (a === 'search') toast('Recherche — à venir');
    if (a === 'cart') toast(cartItems ? `${cartItems} article(s) dans le panier` : 'Ton panier est vide');
  }));

  /* ---------- Technologies ---------- */
  $('#techno-grid').innerHTML = TECHNOS.map(t => `
    <div class="tech-item">
      <div class="tech-item__icon"><svg viewBox="0 0 24 24">${t.icon}</svg></div>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
    </div>`).join('');

  /* ---------- Produits similaires ---------- */
  const related = PRODUCTS.filter(p => p.id !== product.id)
    .sort((a, b) => (b.cat === product.cat) - (a.cat === product.cat))
    .slice(0, 4);
  $('#related').innerHTML = related.map(p => `
    <a class="card card--link" href="produit.html?id=${p.id}">
      <div class="card__media">
        <img class="card__img" src="${p.variants[0].img}" alt="FIVE ${p.name}" loading="lazy" referrerpolicy="no-referrer" />
      </div>
      <div class="card__body">
        <span class="card__cat">${p.catLabel}</span>
        <h3 class="card__name">${p.name}</h3>
        <div class="card__foot"><span class="price">${euro(p.price)}</span></div>
      </div>
    </a>`).join('');

  /* ---------- Reveal au scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  window.scrollTo(0, 0);
})();
