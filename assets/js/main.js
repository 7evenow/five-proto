/* ============================================================
   FIVE — Logique d'interface
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const euro = n => n.toFixed(2).replace('.', ',') + ' €';

  /* ---------- 1. Header au scroll ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 2. Nav mobile ---------- */
  const burger = $('#burger');
  const nav = $('#primary-nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('#primary-nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  /* ---------- 3. Marquee (boucle continue) ---------- */
  const track = $('#marquee-track');
  if (track) {
    const block = MARQUEE_ITEMS.map(t => `<span class="marquee__item">${t}</span>`).join('');
    track.innerHTML = block + block; // dupliqué pour une boucle sans couture
  }

  /* ---------- 4. Panier (persisté entre les pages) ---------- */
  let cartItems = parseInt(localStorage.getItem('five_cart') || '0', 10);
  const cartCount = $('#cart-count');
  function renderCart() {
    cartCount.textContent = cartItems;
    cartCount.classList.toggle('is-visible', cartItems > 0);
  }
  renderCart();
  function addToCart(name) {
    cartItems++;
    localStorage.setItem('five_cart', cartItems);
    renderCart();
    cartCount.style.animation = 'none';
    void cartCount.offsetWidth;
    cartCount.style.animation = '';
    toast(`${name} ajouté au panier`);
  }

  /* ---------- 5. Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2600);
  }

  /* ---------- 6. Rendu produits ---------- */
  const grid = $('#product-grid');
  function badgeHTML(b) {
    if (!b) return '';
    const map = { nouveau: ['Nouveau', ''], best: ['Best', 'badge--best'], promo: ['Promo', 'badge--promo'] };
    const [label, cls] = map[b] || [b, ''];
    return `<span class="badge ${cls}">${label}</span>`;
  }
  function cardHTML(p) {
    const max = 6;
    const shown = p.variants.slice(0, max);
    const extra = p.variants.length - shown.length;
    const swatches = shown.map((v, i) =>
      `<button class="swatch${i === 0 ? ' is-active' : ''}" style="background:${v.hex}" data-img="${v.img}" aria-label="${v.name}" title="${v.name}"></button>`).join('')
      + (extra > 0 ? `<span class="swatch-more">+${extra}</span>` : '');
    const price = p.oldPrice
      ? `<span class="price">${euro(p.price)}<small>${euro(p.oldPrice)}</small></span>`
      : `<span class="price">${euro(p.price)}</span>`;
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
        <span class="card__cat">${p.catLabel}</span>
        <h3 class="card__name"><a href="produit.html?id=${p.id}">${p.name}</a></h3>
        <div class="swatches">${swatches}</div>
        <div class="card__foot">
          ${price}
          <button class="add-btn" aria-label="Ajouter ${p.name} au panier" data-name="${p.name}">+</button>
        </div>
      </div>
    </article>`;
  }
  if (grid) {
    grid.innerHTML = PRODUCTS.map(cardHTML).join('');
    // délégation : add-to-cart + wishlist
    grid.addEventListener('click', e => {
      const add = e.target.closest('.add-btn');
      if (add) { addToCart(add.dataset.name); return; }
      const wish = e.target.closest('.wishlist');
      if (wish) {
        const on = wish.classList.toggle('is-active');
        wish.setAttribute('aria-pressed', String(on));
      }
      const sw = e.target.closest('.swatch');
      if (sw) {
        const cardEl = sw.closest('.card');
        const img = cardEl.querySelector('.card__img');
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
  }

  /* ---------- 7. Filtres ---------- */
  $$('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const f = btn.dataset.filter;
      $$('.card', grid).forEach(card => {
        card.classList.toggle('is-hidden', f !== 'all' && card.dataset.cat !== f);
      });
    });
  });

  /* ---------- 7b. Catégories moto — carrousel infini à contrôles ---------- */
  const catGrid = $('#category-grid');
  if (catGrid && typeof CATEGORIES !== 'undefined') {
    const N = CATEGORIES.length;
    const cardHTML = (c, i) => `
      <a class="category-card" href="#nouveautes" aria-label="${c.name}">
        <img src="${c.img}" alt="FIVE — ${c.name}" loading="lazy" referrerpolicy="no-referrer" />
        <span class="category-card__num">${String(i + 1).padStart(2, '0')}</span>
        <div class="category-card__body">
          <span class="category-card__tag">${c.tag}</span>
          <h3>${c.name}</h3>
          <span class="category-card__go">Découvrir <span class="arrow">→</span></span>
        </div>
      </a>`;
    // 3 copies → boucle infinie (on reste toujours dans la copie du milieu)
    let html = '';
    for (let r = 0; r < 3; r++) html += CATEGORIES.map(cardHTML).join('');
    catGrid.innerHTML = html;

    const cards = $$('.category-card', catGrid);
    const prev = $('#cat-prev'), next = $('#cat-next'), dotsWrap = $('#cat-dots');
    const GAP = 18;
    const stepW = () => cards[0].getBoundingClientRect().width + GAP; // largeur d'une carte
    const setW  = () => stepW() * N;                                  // largeur d'une copie

    dotsWrap.innerHTML = CATEGORIES.map((c, i) =>
      `<button class="cat-dot" data-i="${i}" role="tab" aria-label="Aller à ${c.name}"></button>`).join('');
    const dots = $$('.cat-dot', dotsWrap);

    const rel = () => { const s = setW(); return ((catGrid.scrollLeft % s) + s) % s; };
    function syncDots() {
      const idx = Math.round(rel() / stepW()) % N;
      dots.forEach((d, k) => d.classList.toggle('is-active', k === idx));
    }
    // ré-ancrage instantané dans la copie du milieu (saut invisible : copies identiques)
    function recenter() {
      const s = setW();
      const target = s + rel();
      if (Math.abs(target - catGrid.scrollLeft) > 1) {
        const prevBehavior = catGrid.style.scrollBehavior;
        catGrid.style.scrollBehavior = 'auto';
        catGrid.scrollLeft = target;
        catGrid.style.scrollBehavior = prevBehavior;
      }
    }

    prev.addEventListener('click', () => catGrid.scrollBy({ left: -stepW(), behavior: 'smooth' }));
    next.addEventListener('click', () => catGrid.scrollBy({ left:  stepW(), behavior: 'smooth' }));
    dots.forEach(d => d.addEventListener('click', () => {
      const delta = ((+d.dataset.i) - (Math.round(rel() / stepW()) % N));
      catGrid.scrollBy({ left: delta * stepW(), behavior: 'smooth' });
    }));

    let raf, settle;
    catGrid.addEventListener('scroll', () => {
      cancelAnimationFrame(raf); raf = requestAnimationFrame(syncDots);
      clearTimeout(settle); settle = setTimeout(recenter, 150);
    }, { passive: true });
    window.addEventListener('resize', () => { recenter(); syncDots(); });

    // position de départ = début de la copie du milieu
    requestAnimationFrame(() => { catGrid.scrollLeft = setW(); syncDots(); });
  }

  /* ---------- 8. Technologies — explorateur interactif ---------- */
  const techList = $('#tech-list'), techVisual = $('#tech-visual');
  if (techList && techVisual) {
    const pad = n => String(n).padStart(2, '0');
    techList.innerHTML = TECHNOS.map((t, i) => `
      <button class="tech-item${i === 0 ? ' is-active' : ''}" data-i="${i}" role="tab" aria-selected="${i === 0}">
        <span class="tech-item__num">${pad(i + 1)}</span>
        <span class="tech-item__head">
          <span class="tech-item__icon"><svg viewBox="0 0 24 24">${t.icon}</svg></span>
          <span class="tech-item__title">
            <h3>${t.title}</h3>
            <span class="tech-item__tag">${t.tag}</span>
          </span>
        </span>
      </button>`).join('');

    techVisual.innerHTML = TECHNOS.map((t, i) => `
      <figure class="tech-shot${i === 0 ? ' is-active' : ''}" data-i="${i}">
        <img src="${t.img}" alt="${t.title}" loading="lazy" referrerpolicy="no-referrer" />
      </figure>`).join('') +
      `<div class="tech-visual__caption" id="tech-caption"></div>`;

    const items = $$('.tech-item', techList);
    const shots = $$('.tech-shot', techVisual);
    const caption = $('#tech-caption');
    const setActive = i => {
      items.forEach((el, k) => { el.classList.toggle('is-active', k === i); el.setAttribute('aria-selected', k === i); });
      shots.forEach((el, k) => el.classList.toggle('is-active', k === i));
      caption.classList.remove('is-in');
      caption.innerHTML = `<span class="cap-num">${pad(i + 1)} / ${pad(TECHNOS.length)}</span><p>${TECHNOS[i].desc}</p>`;
      requestAnimationFrame(() => caption.classList.add('is-in'));
    };
    items.forEach((el, i) => {
      el.addEventListener('mouseenter', () => setActive(i));
      el.addEventListener('click', () => setActive(i));
      el.addEventListener('focus', () => setActive(i));
    });
    setActive(0);
  }

  /* ---------- 8b. Cartes terrain : split interactif + vidéo ---------- */
  const tGrid = $('.terrain__grid');
  const tCards = $$('.terrain-card');
  const vidStart = card => { const v = $('.terrain-card__video', card); return v ? (parseFloat(v.dataset.start) || 0) : 0; };

  tCards.forEach(card => {
    const vid = $('.terrain-card__video', card);
    const start = vidStart(card);
    if (vid && start) vid.addEventListener('loadedmetadata', () => { if (vid.currentTime < start) vid.currentTime = start; }, { once: true });

    // bascule directe d'une carte à l'autre (pas de retour à l'état neutre entre les deux)
    card.addEventListener('mouseenter', () => {
      tCards.forEach(c => {
        const active = c === card;
        c.classList.toggle('is-active', active);
        c.classList.toggle('is-dim', !active);
        const v = $('.terrain-card__video', c);
        if (!v) return;
        if (active) {
          if (v.readyState >= 1) { try { v.currentTime = vidStart(c); } catch (e) {} }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    });
  });

  // reset uniquement quand on quitte toute la section
  if (tGrid) tGrid.addEventListener('mouseleave', () => {
    tCards.forEach(c => {
      c.classList.remove('is-active', 'is-dim');
      const v = $('.terrain-card__video', c);
      if (v) { v.pause(); v.currentTime = vidStart(c); }
    });
  });

  /* ---------- 9. Reveal au scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- 10. Compteurs stats ---------- */
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isFloat = !Number.isInteger(target);
      const dur = 1400; const start = performance.now();
      const fmtSuffix = suffix === '%' ? '<span class="pct">%</span>' : suffix === '/5' ? '<span class="pct">/5</span>' : suffix;
      (function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        el.innerHTML = (isFloat ? val.toFixed(1) : Math.round(val)) + fmtSuffix;
        if (t < 1) requestAnimationFrame(tick);
      })(start);
      statsObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('.stat__num').forEach(el => statsObs.observe(el));

  /* ---------- 11. Newsletter ---------- */
  const form = $('#newsletter-form');
  const msg = $('#newsletter-msg');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.email;
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (!ok) {
        msg.textContent = 'Adresse e-mail invalide.';
        msg.classList.remove('is-ok');
        return;
      }
      msg.textContent = 'Bienvenue dans la course ! 🏁';
      msg.classList.add('is-ok');
      form.reset();
    });
  }

  /* ---------- 12. Search / cart placeholders ---------- */
  $$('[data-action]').forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.action;
    if (a === 'search') toast('Recherche — à venir');
    if (a === 'cart') toast(cartItems ? `${cartItems} article(s) dans le panier` : 'Ton panier est vide');
  }));

})();
