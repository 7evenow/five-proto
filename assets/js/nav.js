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
    veloMtb: U + '2025/10/FIVE-VELO-MTB-HEAVYDUTY-enduro-air-evo-action-05.jpg',
    veloWinter: U + '2025/10/FIVE-VELO-FALL-WINTER-COLD-LONG-mistral-infinium-focus-03.jpg',
    veloWp: U + '2025/10/FIVE-VELO-FALL-WINTER-EXTREME-COLD-warm-evo-wp-focus-03.jpg',
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
      preview: { img: IMG.veloWinter, tag: 'Sélection hiver', label: 'Mistral Infinium', href: '#' },
      groups: [
        { title: 'Disciplines', items: [
          L('Shorty road', '#', IMG.veloMtb), L('MTB', '#', IMG.veloMtb), L('BMX', '#', IMG.veloMtb),
          L('Street urban', '#', IMG.veloWp), L('Fall / winter', '#', IMG.veloWinter)
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
      preview: { img: IMG.drytech, tag: 'Technologie', label: 'Membrane 5_DryTech™', href: '#' },
      groups: [
        { title: 'Glossaire technique', wide: true, items: [
          L('Protection KEVLAR®', '#', IMG.drytech), L('Protection D3O®', '#', IMG.drytech),
          L('Membrane GORE-TEX®', '#', IMG.goretex), L('Isolation Primaloft®', '#', IMG.veloWinter),
          L('Thermo+ Concept', '#', IMG.winter), L('Membrane 5_DryTech™', '#', IMG.drytech),
          L('Isolation 5_WarmTech™', '#', IMG.veloWp), L('Gants Chauffants FIVE HG', '#', IMG.heat),
          L('FIVE Stunt Evo2', '#', IMG.rsx)
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

  navLinks.forEach(a => {
    const key = LABEL_TO_MENU[a.textContent.trim().toLowerCase()];
    if (!key) return;
    a.dataset.menu = key;
    const li = a.parentElement;
    li.addEventListener('mouseenter', () => open(key));
    li.addEventListener('mouseleave', scheduleClose);
  });
  wrap.addEventListener('mouseenter', cancelClose);
  wrap.addEventListener('mouseleave', scheduleClose);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
