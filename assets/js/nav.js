/* ============================================================
   FIVE — Méga-menu de navigation (desktop)
   Colonnes lisibles + grand visuel qui réagit au survol.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const U = 'https://five-gloves.com/wp-content/uploads/';
  const cat = s => `categorie.html?cat=${s}`;
  const gloss = q => `glossaire.html?q=${encodeURIComponent(q)}`;
  const glossCat = c => `glossaire.html?cat=${c}`;
  const L = (label, href, img) => ({ label, href: href || '#', img: img || null });

  const IMG = {
    racing: U + '2025/09/CARRASCO-ACTION.jpg',
    street: U + '2026/02/FIVE-MOTO-STREET-RSX-RED-ACTION-23.jpg',
    urban: U + '2025/09/FIVE-MOTO-URBAN-spark-khaki-action01.jpg',
    custom: U + '2025/09/FIVE-MOTO-CUSTOM-montana-waxed-brown-action04.jpg',
    trail: U + '2025/09/FIVE-MOTO-TRAIL-ADVENTURE-tfx1-gtx-grey-grey-red-action01.jpg',
    touring: U + '2025/09/FIVE-MOTO-TOURING-gt1-evo-gtx-black-action02.jpg',
    winter: U + '2025/09/FIVE-MOTO-WINTER_GTX-wfx-skin-evo-gtx-brown-action02.jpg',
    heat: U + '2025/09/FIVE-MOTO-HEAT-TECHNOLOGY-hg-prime-evo-gtx-black-action02.jpg',
    woman: U + '2025/09/FIVE-MOTO-WOMAN-RACING-rfx-sport-evo-woman-red-action01.jpg',
    offroad: U + '2025/09/FIVE-MOTO-OFF-ROAD-MX-mxf-race-red-action03.jpg',
    veloMtb: U + '2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-action-01.jpg',
    veloWinter: U + '2025/10/FIVE-VELO-FALL-WINTER-COLD-LONG-mistral-infinium-focus-03.jpg',
    veloWp: U + '2025/10/FIVE-VELO-FALL-WINTER-EXTREME-COLD-hg-stoke-wp-action-03.jpg',
    veloRoad: U + '2025/10/FIVE-VELO-ROAD-PERFORMANCE-rc3-action-04.jpg',
    veloBmx: U + '2025/10/FIVE-VELO-BMX-race-pro-action-02.jpg',
    veloStreet: U + '2025/10/FIVE-VELO-STREET-URBAN-soho-action-04.jpg',
    rsx: U + '2026/02/FIVE-MOTO-STREET-SPORT-rsx-red-focus-01.jpg',
    tucson: U + '2026/02/FIVE-MOTO-CUSTOM-tucson-dark-brown-focus-01.jpg',
    drytech: U + '2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus02.jpg',
    goretex: U + '2025/09/FIVE-MOTO-TOURING-gt1-evo-gtx-black-action02.jpg'
  };

  const MENUS = {
    moto: {
      preview: { img: IMG.rsx, tag: 'Nouveauté 2026', label: 'RSX', href: cat('street') },
      groups: [
        { title: 'Disciplines', wide: true, items: [
          L('Racing', cat('racing'), IMG.racing), L('Street', cat('street'), IMG.street),
          L('Urban', cat('urban'), IMG.urban), L('Custom', cat('custom'), IMG.custom),
          L('Trail Adventure', cat('trail-adventure'), IMG.trail), L('Touring', cat('touring'), IMG.touring),
          L('Winter', cat('winter'), IMG.winter), L('Heat technology', cat('heat-technology'), IMG.heat),
          L('Woman', cat('woman'), IMG.woman), L('Off-road', cat('off-road'), IMG.offroad)
        ] },
        { title: 'Public', items: [L('Homme'), L('Femme'), L('Enfant')] },
        { title: 'Saison', items: [L('Hiver'), L('Été'), L('Mi-Saison')] },
        { title: 'Technologies', wide: true, items: [
          L('Kevlar'), L('Chauffants'), L('Étanches'), L('Gore-Tex'), L('Primaloft'), L('Thermo+ Concept'),
          L('5_DryTech™'), L('5_WarmTech™'), L('Vintage'), L('Coqués'), L('Ventilés'), L('Tactiles'), L('Cuir')
        ] }
      ]
    },
    velo: {
      preview: { img: IMG.veloWinter, tag: 'Sélection hiver', label: 'Mistral Infinium', href: cat('fall-winter') },
      groups: [
        { title: 'Disciplines', items: [
          L('Shorty road', cat('shorty-road'), IMG.veloRoad), L('MTB', cat('mtb'), IMG.veloMtb), L('BMX', cat('bmx'), IMG.veloBmx),
          L('Street urban', cat('street-urban'), IMG.veloStreet), L('Fall / winter', cat('fall-winter'), IMG.veloWinter)
        ] },
        { title: 'Public', items: [L('Homme'), L('Femme'), L('Enfant')] },
        { title: 'Saison', items: [L('Hiver'), L('Été')] },
        { title: 'Usages & matières', wide: true, items: [
          L('Gravel'), L('Ville'), L('Vélo Électrique'), L('Chauffants'), L('Gore-Tex'),
          L('Primaloft'), L('Imperméables'), L('Néoprène'), L('Cuir')
        ] }
      ]
    },
    techno: {
      preview: { img: IMG.drytech, tag: 'Documentation', label: 'Le glossaire technique', href: 'glossaire.html' },
      groups: [
        { title: 'Glossaire technique', wide: true, items: [
          L('Tout le glossaire', 'glossaire.html', IMG.drytech),
          L('Protection KEVLAR®', gloss('kevlar'), IMG.drytech), L('Protection D3O®', gloss('d3o'), IMG.drytech),
          L('Membrane GORE-TEX®', gloss('gore-tex'), IMG.goretex), L('Isolation Primaloft®', gloss('primaloft'), IMG.veloWinter),
          L('Thermo+ Concept', gloss('thermo'), IMG.winter), L('Membrane 5_DryTech™', gloss('drytech'), IMG.drytech),
          L('Isolation 5_WarmTech™', gloss('warmtech'), IMG.veloWp), L('Gants Chauffants FIVE HG', gloss('heating'), IMG.heat)
        ] },
        { title: 'Par famille', items: [
          L('Membranes & étanchéité', glossCat('membrane'), IMG.goretex),
          L('Isolation & chaleur', glossCat('chaud'), IMG.winter),
          L('Protection', glossCat('protec'), IMG.racing),
          L('Matières', glossCat('matiere'), IMG.custom),
          L('Confort & ergonomie', glossCat('confort'), IMG.rsx),
          L('Innovations FIVE', glossCat('five'), IMG.drytech)
        ] }
      ]
    },
    guide: {
      preview: { img: IMG.racing, tag: 'Le choix des pilotes', label: 'Comprendre la gamme', href: 'index.html#categories' },
      groups: [
        { title: 'Five, la marque', items: [
          L('Comprendre la gamme Moto', 'index.html#categories', IMG.racing),
          L('Bien choisir ses gants moto', '#', IMG.touring),
          L('Comprendre la gamme Vélo', 'index.html#terrain', IMG.veloMtb),
          L('Bien choisir ses gants vélo', '#', IMG.veloWp),
          L('Bien choisir sa taille', '#', IMG.rsx),
          L('Entretenir ses gants', '#', IMG.custom)
        ] }
      ]
    }
  };

  const LABEL_TO_MENU = { 'gants moto': 'moto', 'gants vélo': 'velo', 'technologies': 'techno', 'guide': 'guide' };

  const header = $('#header');
  const navLinks = $$('#primary-nav .nav__list a');
  if (!header || !navLinks.length) return;

  /* ---------- Construction ---------- */
  const groupHTML = g => `
    <div class="mega__group${g.wide ? ' mega__group--wide' : ''}">
      <p class="mega__gtitle">${g.title}</p>
      <ul class="mega__list">
        ${g.items.map(l => `<li><a href="${l.href}"${l.img ? ` data-img="${l.img}" data-label="${l.label}"` : ''}>${l.label}</a></li>`).join('')}
      </ul>
    </div>`;
  const panelHTML = (key, m) => `
    <div class="mega" data-mega="${key}">
      <div class="container mega__inner">
        <div class="mega__cols">${m.groups.map(groupHTML).join('')}</div>
        <a class="mega__preview" data-default-img="${m.preview.img}" data-default-label="${m.preview.label}" href="${m.preview.href}">
          <img src="${m.preview.img}" alt="${m.preview.label}" loading="lazy" referrerpolicy="no-referrer" />
          <span class="mega__preview-body">
            <span class="mega__preview-tag">${m.preview.tag}</span>
            <span class="mega__preview-label">${m.preview.label}</span>
            <span class="mega__preview-go">Découvrir <span class="arrow">→</span></span>
          </span>
        </a>
      </div>
    </div>`;

  const wrap = document.createElement('div');
  wrap.className = 'nav-mega';
  wrap.innerHTML = Object.keys(MENUS).map(k => panelHTML(k, MENUS[k])).join('');
  header.appendChild(wrap);
  const panels = {};
  $$('.mega', wrap).forEach(p => { panels[p.dataset.mega] = p; });

  /* ---------- Preview dynamique ---------- */
  function resetPreview(panel) {
    const prev = $('.mega__preview', panel);
    setPreview(panel, prev.dataset.defaultImg, prev.dataset.defaultLabel);
  }
  function setPreview(panel, img, label) {
    const prev = $('.mega__preview', panel);
    const imgEl = $('img', prev);
    if (imgEl.getAttribute('src') === img) { $('.mega__preview-label', prev).textContent = label; return; }
    prev.classList.add('is-swapping');
    const n = new Image(); n.referrerPolicy = 'no-referrer';
    n.onload = () => { imgEl.src = img; prev.classList.remove('is-swapping'); };
    n.src = img;
    $('.mega__preview-label', prev).textContent = label;
  }
  $$('.mega').forEach(panel => {
    $$('.mega__list a[data-img]', panel).forEach(a => {
      a.addEventListener('mouseenter', () => setPreview(panel, a.dataset.img, a.dataset.label));
    });
    $('.mega__cols', panel).addEventListener('mouseleave', () => resetPreview(panel));
  });

  /* ---------- Ouverture / fermeture (hover) ---------- */
  let closeTimer, current = null;
  function open(key) {
    if (!panels[key]) return;
    clearTimeout(closeTimer);
    // un seul panneau actif à la fois (synchro) -> pas de superposition
    Object.keys(panels).forEach(k => panels[k].classList.toggle('is-active', k === key));
    resetPreview(panels[key]);
    wrap.classList.add('is-open');
    header.classList.add('is-mega-open');
    current = key;
  }
  function close() {
    wrap.classList.remove('is-open');
    header.classList.remove('is-mega-open');
    current = null;
  }
  const scheduleClose = () => { closeTimer = setTimeout(close, 130); };
  const cancelClose = () => clearTimeout(closeTimer);

  const mobileAccordions = [];
  navLinks.forEach(a => {
    const key = LABEL_TO_MENU[a.textContent.trim().toLowerCase()];
    if (!key) return;
    a.dataset.menu = key;
    const li = a.parentElement;
    li.addEventListener('mouseenter', () => open(key));
    li.addEventListener('mouseleave', scheduleClose);

    /* ---------- Accordéon mobile (tiroir burger) ---------- */
    li.classList.add('nav-item--has-sub');
    const panelId = 'mobile-sub-' + key;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', panelId);
    toggle.setAttribute('aria-label', 'Afficher le sous-menu ' + a.textContent.trim());
    toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
    li.appendChild(toggle);

    const panel = document.createElement('div');
    panel.className = 'nav-sub';
    panel.id = panelId;
    panel.innerHTML = `<div class="nav-sub__inner">${MENUS[key].groups.map(g => `
      <div class="nav-sub__group">
        <p class="nav-sub__title">${g.title}</p>
        <ul>${g.items.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}</ul>
      </div>`).join('')}</div>`;
    li.appendChild(panel);

    mobileAccordions.push({ li, toggle });
    toggle.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const wasOpen = li.classList.contains('is-open');
      mobileAccordions.forEach(x => { x.li.classList.remove('is-open'); x.toggle.setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { li.classList.add('is-open'); toggle.setAttribute('aria-expanded', 'true'); }
    });
  });
  wrap.addEventListener('mouseenter', cancelClose);
  wrap.addEventListener('mouseleave', scheduleClose);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
