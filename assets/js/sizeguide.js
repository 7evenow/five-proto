/* ============================================================
   FIVE — Guide des tailles (modale partagée)
   Déclenché par tout élément [data-action="sizeguide"].
   ============================================================ */
(function () {
  'use strict';

  const ROWS = [
    { size: 'XS', palm: '16 – 17', len: '16 – 17', fr: '6' },
    { size: 'S', palm: '18 – 19', len: '17 – 18', fr: '7' },
    { size: 'M', palm: '20 – 21', len: '18 – 19', fr: '8' },
    { size: 'L', palm: '22 – 23', len: '19 – 20', fr: '9' },
    { size: 'XL', palm: '24 – 25', len: '20 – 21', fr: '10' },
    { size: '2XL', palm: '26 – 27', len: '21 – 22', fr: '11' }
  ];

  const modal = document.createElement('div');
  modal.className = 'sg-modal';
  modal.innerHTML = `
    <div class="sg-backdrop" data-sg-close></div>
    <div class="sg-panel" role="dialog" aria-modal="true" aria-label="Guide des tailles">
      <button class="sg-close" data-sg-close aria-label="Fermer">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <p class="overline overline--dark">Trouve ta taille</p>
      <h2 class="sg-title">Guide des tailles</h2>
      <p class="sg-intro">Mesure ta main droite (ou ta main forte) pour identifier la taille idéale. En cas d'hésitation entre deux tailles, choisis la plus grande pour le confort, la plus petite pour un grip précis.</p>

      <div class="sg-steps">
        <div class="sg-step">
          <span class="sg-step__num">1</span>
          <div>
            <strong>Tour de paume</strong>
            <p>Enroule un mètre ruban autour de la paume, à la base des doigts, sans inclure le pouce.</p>
          </div>
        </div>
        <div class="sg-step">
          <span class="sg-step__num">2</span>
          <div>
            <strong>Longueur de main</strong>
            <p>Mesure du pli du poignet jusqu'au bout du majeur, main à plat.</p>
          </div>
        </div>
      </div>

      <div class="sg-table-wrap">
        <table class="sg-table">
          <thead>
            <tr><th>Taille</th><th>Tour de paume (cm)</th><th>Longueur main (cm)</th><th>Pointure FR</th></tr>
          </thead>
          <tbody>
            ${ROWS.map(r => `<tr><td class="sg-table__size">${r.size}</td><td>${r.palm}</td><td>${r.len}</td><td>${r.fr}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>

      <p class="sg-note">Les gants vélo suivent la même grille. Pour les modèles à taille unique (accessoires), aucun choix de taille n'est nécessaire.</p>
    </div>`;
  document.body.appendChild(modal);

  let open = false;
  function openModal() { open = true; modal.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { open = false; modal.classList.remove('is-open'); document.body.style.overflow = ''; }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-action="sizeguide"]')) { e.preventDefault(); openModal(); return; }
    if (e.target.closest('[data-sg-close]')) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeModal(); });
})();
