(function () {
  'use strict';

  /* Roster dérivé de la source unique RIDERS (data.js), filtré par famille */
  const MOTO = (typeof RIDERS !== 'undefined') ? RIDERS.filter(r => r.family === 'moto') : [];
  const VELO = (typeof RIDERS !== 'undefined') ? RIDERS.filter(r => r.family === 'velo') : [];

  function mkCard(a, i) {
    const exIg = a.instagram !== '#';
    const exFb = a.facebook !== '#';
    return `
      <article class="tpg-card" style="--i:${i}" role="listitem" tabindex="0">
        <a class="tpg-card__media-link" href="pilote.html?id=${a.id}" aria-label="Voir le profil de ${a.name}">
          <img class="tpg-card__img" src="${a.img}" alt="${a.name}" loading="lazy" referrerpolicy="no-referrer" />
        </a>
        <span class="tpg-card__idx">${String(i + 1).padStart(2, '0')}</span>
        <div class="tpg-card__content">
          <span class="tpg-card__tag">${a.country} · ${a.discipline}</span>
          <a class="tpg-card__name" href="pilote.html?id=${a.id}">${a.name}</a>
          <div class="tpg-card__reveal">
            <ul class="tpg-card__achievements">
              ${a.achievements.map(t => `<li>${t}</li>`).join('')}
            </ul>
            <div class="tpg-card__foot">
              <a href="${a.gloveId ? 'produit.html?id=' + a.gloveId : 'produit.html'}" class="tpg-card__glove">
                <span class="tpg-card__glove-label">Son gant</span>
                <span class="tpg-card__glove-name">${a.glove} <span class="arrow">→</span></span>
              </a>
              <div class="tpg-card__socials">
                <a href="${a.instagram}" aria-label="Instagram de ${a.name}"${exIg ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                  <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                </a>
                <a href="${a.facebook}" aria-label="Facebook de ${a.name}"${exFb ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                  <svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>`;
  }

  const grid = document.getElementById('tpg-grid');
  const tabs = document.querySelectorAll('.tpg-tab');
  const countNumEl = document.getElementById('tpg-count-num');
  const countLblEl = document.getElementById('tpg-count-lbl');

  let current = 'moto';

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });

  function render(tab) {
    const data = tab === 'moto' ? MOTO : VELO;
    grid.innerHTML = data.map(mkCard).join('');
    if (countNumEl) countNumEl.textContent = data.length;
    if (countLblEl) countLblEl.textContent = tab === 'moto' ? 'pilotes moto' : 'riders vélo';
    grid.querySelectorAll('.tpg-card').forEach(el => io.observe(el));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.tab === current) return;
      current = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('is-active', t === tab));
      grid.classList.add('is-fading');
      setTimeout(() => { render(current); grid.classList.remove('is-fading'); }, 180);
    });
  });

  render('moto');
})();
