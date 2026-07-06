/* ============================================================
   FIVE — Fiche pilote (générique, pilotée par ?id=)
   Utilise RIDERS (data.js) : palmarès réel, gant utilisé, réseaux.
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

  /* ---------- Pilote ---------- */
  const params = new URLSearchParams(location.search);
  const rider = RIDERS.find(r => r.id === params.get('id')) || RIDERS[0];
  const familyLabel = rider.family === 'velo' ? 'Rider Vélo' : 'Pilote Moto';

  const COUNTRY_NAMES = {
    FRA: 'France', CHE: 'Suisse', DEU: 'Allemagne', ESP: 'Espagne', ITA: 'Italie',
    GBR: 'Royaume-Uni', BEL: 'Belgique', NOR: 'Norvège', ARG: 'Argentine',
    SVK: 'Slovaquie', CZE: 'République Tchèque'
  };
  const countryName = COUNTRY_NAMES[rider.country] || rider.country;

  document.title = `FIVE — ${rider.name}`;
  $('#rp-bg').src = rider.img;
  $('#rp-bg').alt = rider.name;
  $('#rp-bc-name').textContent = rider.name;
  $('#rp-tag').textContent = `${rider.country} · ${rider.discipline}`;
  $('#rp-name').textContent = rider.name;
  $('#rp-badge').textContent = familyLabel;
  $('#rp-intro').textContent = `${rider.name} évolue en ${rider.discipline}${countryName ? ' sous les couleurs de ' + countryName : ''}, et défend les couleurs FIVE au plus haut niveau international.`;

  /* ---------- Palmarès ---------- */
  $('#rp-achievements').innerHTML = rider.achievements.map(t => `<li>${t}</li>`).join('');

  /* ---------- Son gant FIVE — spotlight plein écran ---------- */
  const product = rider.gloveId ? PRODUCTS.find(p => p.id === rider.gloveId) : null;
  const spot = $('#rp-spot');

  if (product) {
    // galerie complète : coloris principal + packshots + photos de zoom, dédupliquées
    const gallery = [product.variants[0].img, ...(product.gallery || []), ...(product.media || [])]
      .filter((src, i, arr) => src && arr.indexOf(src) === i)
      .slice(0, 6);
    let current = gallery[0];

    spot.innerHTML = `
      <div class="container rp-spot__inner">
        <div class="rp-spot__media">
          <div class="rp-spot__glow" aria-hidden="true"></div>
          <a class="rp-spot__main" href="produit.html?id=${product.id}" id="rp-glove-main">
            <img src="${current}" alt="FIVE ${product.name}" loading="lazy" referrerpolicy="no-referrer" />
          </a>
          ${gallery.length > 1 ? `<div class="rp-spot__thumbs" id="rp-glove-thumbs">
            ${gallery.map((src, i) => `<button class="rp-glove-thumb${i === 0 ? ' is-active' : ''}" data-src="${src}" aria-label="Photo ${i + 1}">
              <img src="${src}" alt="" loading="lazy" referrerpolicy="no-referrer" />
            </button>`).join('')}
          </div>` : ''}
        </div>
        <div class="rp-spot__info">
          <p class="overline">Son gant FIVE</p>
          <h2 class="rp-spot__name"><a href="produit.html?id=${product.id}">${product.name}</a></h2>
          <p class="rp-spot__price">${euro(product.price)}</p>
          ${(product.specs && product.specs.length) ? `<div class="specs-row rp-spot__specs">
            ${product.specs.slice(0, 4).map(s => `<span class="spec"><img src="${s.icon}" alt="" loading="lazy" referrerpolicy="no-referrer" /><span>${s.label}</span></span>`).join('')}
          </div>` : ''}
          <div class="rp-spot__actions">
            <button class="btn btn--red" id="rp-glove-add">Ajouter au panier</button>
            <a href="produit.html?id=${product.id}" class="btn btn--ghost">Voir la fiche complète <span class="arrow">→</span></a>
          </div>
        </div>
      </div>`;

    // vignettes : changent la photo principale (fondu)
    const mainImg = $('#rp-glove-main img');
    $$('.rp-glove-thumb', spot).forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.dataset.src;
        if (src === current) return;
        current = src;
        mainImg.classList.add('is-swapping');
        const next = new Image();
        next.referrerPolicy = 'no-referrer';
        next.onload = () => { mainImg.src = src; mainImg.classList.remove('is-swapping'); };
        next.src = src;
        $$('.rp-glove-thumb', spot).forEach(b => b.classList.toggle('is-active', b === btn));
      });
    });

    // ajout direct au panier (coloris principal, taille M par défaut)
    $('#rp-glove-add').addEventListener('click', () => {
      window.FiveCart.add({
        id: product.id, name: product.name, price: product.price,
        img: product.variants[0].img, variant: product.variants[0].name, size: 'M'
      });
    });
  } else {
    spot.innerHTML = `
      <div class="container rp-spot__inner rp-spot__inner--fallback">
        <div class="rp-spot__info">
          <p class="overline">Son gant FIVE</p>
          <h2 class="rp-spot__name">${rider.glove}</h2>
          <p class="rp-spot__fallback">Modèle porté en compétition. Retrouve l'esprit de ce gant dans notre collection.</p>
          <div class="rp-spot__actions">
            <a href="index.html#nouveautes" class="btn btn--red">Découvrir la collection <span class="arrow">→</span></a>
          </div>
        </div>
      </div>`;
  }

  /* ---------- Réseaux ---------- */
  const socials = [];
  if (rider.instagram && rider.instagram !== '#') socials.push({ label: 'Instagram', href: rider.instagram, icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>' });
  if (rider.facebook && rider.facebook !== '#') socials.push({ label: 'Facebook', href: rider.facebook, icon: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1z"/>' });
  const socialsWrap = $('#rp-socials');
  if (socials.length) {
    socialsWrap.innerHTML = socials.map(s => `
      <a href="${s.href}" target="_blank" rel="noopener noreferrer" class="rp-social">
        <svg viewBox="0 0 24 24">${s.icon}</svg> ${s.label}
      </a>`).join('');
  } else {
    socialsWrap.hidden = true;
  }

  /* ---------- Autres pilotes (même famille) ---------- */
  const others = RIDERS.filter(r => r.family === rider.family && r.id !== rider.id).slice(0, 3);
  $('#rp-others-tag').textContent = rider.family === 'velo' ? 'Même discipline · Vélo' : 'Même discipline · Moto';
  $('#rp-others-grid').innerHTML = others.map((a, i) => `
    <article class="tpg-card" style="--i:${i}" role="listitem" tabindex="0">
      <a class="tpg-card__media-link" href="pilote.html?id=${a.id}" aria-label="Voir le profil de ${a.name}">
        <img class="tpg-card__img" src="${a.img}" alt="${a.name}" loading="lazy" referrerpolicy="no-referrer" />
      </a>
      <div class="tpg-card__content">
        <span class="tpg-card__tag">${a.country} · ${a.discipline}</span>
        <a class="tpg-card__name" href="pilote.html?id=${a.id}">${a.name}</a>
        <div class="tpg-card__reveal">
          <ul class="tpg-card__achievements">${a.achievements.slice(0, 2).map(t => `<li>${t}</li>`).join('')}</ul>
          <div class="tpg-card__foot">
            <a href="${a.gloveId ? 'produit.html?id=' + a.gloveId : 'produit.html'}" class="tpg-card__glove">
              <span class="tpg-card__glove-label">Son gant</span>
              <span class="tpg-card__glove-name">${a.glove} <span class="arrow">→</span></span>
            </a>
          </div>
        </div>
      </div>
    </article>`).join('');
  $$('.tpg-card', $('#rp-others-grid')).forEach(el => el.classList.add('is-in'));

  window.scrollTo(0, 0);
})();
