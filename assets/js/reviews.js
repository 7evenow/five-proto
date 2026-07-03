/* ============================================================
   FIVE — Avis clients (localStorage, seed de démo)
   window.FiveReviews : summary / get / add / mount / starsHTML.
   Avis pré-remplis par produit pour crédibiliser le prototype.
   ============================================================ */
(function () {
  'use strict';

  const KEY = 'five_reviews';
  const SEED_FLAG = 'five_reviews_seeded';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const write = o => localStorage.setItem(KEY, JSON.stringify(o));
  const uid = () => 'r' + Math.random().toString(36).slice(2, 9);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const fmtDate = iso => { const d = new Date(iso); return isNaN(d) ? '' : d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); };

  let store = read();
  const listeners = [];
  const notify = () => listeners.forEach(f => { try { f(); } catch (e) {} });

  /* ---------- Seed de démonstration ---------- */
  const POOL = [
    { name: 'Julien M.', rating: 5, title: 'Parfait sur circuit', body: 'Grip impeccable et zéro point de pression après 2 h de roulage. La coque inspire confiance dès le premier virage.', days: 8 },
    { name: 'Camille R.', rating: 5, title: 'Confort immédiat', body: 'Aucun temps d\'adaptation, ils tombent parfaitement. Et l\'écran tactile fonctionne vraiment.', days: 15 },
    { name: 'Thomas B.', rating: 4, title: 'Très bon rapport qualité/prix', body: 'Finitions au top. J\'enlève une étoile car un peu justes sur les doigts au début, ça se détend vite.', days: 23 },
    { name: 'Sarah L.', rating: 5, title: 'Mes préférés', body: 'Troisième paire de Five, toujours la même qualité. Cuir souple dès la première sortie.', days: 30 },
    { name: 'Kevin P.', rating: 4, title: 'Solides', body: 'Bonne protection, portés tout l\'été. La ventilation pourrait être un poil meilleure par grosse chaleur.', days: 41 },
    { name: 'Antoine G.', rating: 5, title: 'Rien à redire', body: 'Homologués CE, légers, précis sur les commandes. Je recommande les yeux fermés.', days: 52 },
    { name: 'Marie D.', rating: 3, title: 'Bien mais taille petit', body: 'Produit de qualité mais prends une taille au-dessus : le M taille comme un S ailleurs.', days: 60 },
    { name: 'Lucas F.', rating: 5, title: 'Le grip parfait', body: 'Sensations directes sur les poignées, aucune gêne. Parfait pour le VTT engagé.', days: 68 },
    { name: 'Nicolas V.', rating: 4, title: 'Fiable', body: 'Rien à dire sur la protection. Le serrage tient bien en place toute la journée.', days: 77 },
    { name: 'Émilie T.', rating: 5, title: 'Qualité au rendez-vous', body: 'Coutures nickel, matière premium. On sent le savoir-faire à chaque détail.', days: 90 },
    { name: 'Hugo M.', rating: 5, title: 'Adopté', body: 'Portés sous la pluie, la main reste au sec plus longtemps que prévu. Top.', days: 104 },
    { name: 'Paul R.', rating: 4, title: 'Confortables', body: 'Bon maintien, belle finition. Un léger temps de chauffe pour assouplir le cuir.', days: 120 }
  ];

  function generate(i) {
    const count = 3 + (i % 4);           // 3 à 6 avis
    const start = (i * 5) % POOL.length;
    const arr = [];
    for (let k = 0; k < count; k++) {
      const r = POOL[(start + k) % POOL.length];
      arr.push({ id: uid(), name: r.name, rating: r.rating, title: r.title, body: r.body, date: new Date(Date.now() - r.days * 864e5).toISOString(), verified: true });
    }
    return arr;
  }

  function seed() {
    if (localStorage.getItem(SEED_FLAG)) return;
    if (typeof PRODUCTS === 'undefined' || !PRODUCTS.length) return;
    PRODUCTS.slice(0, 12).forEach((p, i) => { if (!store[p.id]) store[p.id] = generate(i); });
    write(store);
    localStorage.setItem(SEED_FLAG, '1');
  }
  seed();

  /* ---------- Données ---------- */
  const get = pid => (store[pid] || []).slice();

  function summary(pid) {
    const list = store[pid] || [];
    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;
    list.forEach(r => { breakdown[r.rating] = (breakdown[r.rating] || 0) + 1; sum += r.rating; });
    return { count: list.length, avg: list.length ? sum / list.length : 0, breakdown };
  }

  function add(pid, data) {
    const rating = Math.max(1, Math.min(5, parseInt(data.rating, 10) || 0));
    if (!rating) return { ok: false, error: 'Merci de choisir une note.' };
    if (!data.body || !data.body.trim()) return { ok: false, error: 'Merci d\'écrire quelques mots.' };
    store[pid] = store[pid] || [];
    store[pid].unshift({
      id: uid(),
      name: (data.name || '').trim() || 'Client Five',
      rating: rating,
      title: (data.title || '').trim(),
      body: data.body.trim(),
      date: new Date().toISOString(),
      verified: false
    });
    write(store); notify();
    return { ok: true };
  }

  /* ---------- Rendu ---------- */
  function starsHTML(rating) {
    const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
    return `<span class="rev-stars" aria-label="${(Math.round(rating * 10) / 10)} sur 5"><span class="rev-stars__fill" style="width:${pct}%"></span></span>`;
  }

  function cardHTML(r) {
    return `
      <article class="rev-item">
        <div class="rev-item__head">
          ${starsHTML(r.rating)}
          ${r.title ? `<h3 class="rev-item__title">${esc(r.title)}</h3>` : ''}
        </div>
        <p class="rev-item__body">${esc(r.body)}</p>
        <p class="rev-item__meta">
          <strong>${esc(r.name)}</strong>
          <span>· ${fmtDate(r.date)}</span>
          ${r.verified ? '<span class="rev-item__verified">✓ Achat vérifié</span>' : ''}
        </p>
      </article>`;
  }

  function formHTML() {
    let name = '';
    if (window.FiveAuth && window.FiveAuth.isLoggedIn()) {
      const u = window.FiveAuth.current();
      name = u.firstname + (u.lastname ? ' ' + u.lastname[0] + '.' : '');
    }
    return `
      <form class="rev-form" id="rev-form">
        <p class="rev-form__label">Ta note</p>
        <div class="rev-star-pick" id="rev-star-pick" role="radiogroup" aria-label="Note">
          ${[1, 2, 3, 4, 5].map(n => `<button type="button" class="rev-star" data-star="${n}" aria-label="${n} étoile${n > 1 ? 's' : ''}">★</button>`).join('')}
        </div>
        <div class="acc-field"><label for="rev-title">Titre</label><input id="rev-title" name="title" placeholder="Résume ton avis" /></div>
        <div class="acc-field"><label for="rev-body">Ton avis</label><textarea id="rev-body" name="body" rows="3" placeholder="Qu'as-tu pensé de ce produit ?" required></textarea></div>
        <div class="acc-field"><label for="rev-name">Ton nom</label><input id="rev-name" name="name" value="${esc(name)}" placeholder="Prénom" /></div>
        <p class="acc-error" id="rev-error" role="alert"></p>
        <div class="rev-form__actions">
          <button type="submit" class="btn btn--red btn--mini">Publier mon avis</button>
          <button type="button" class="btn btn--ghost-dark btn--mini" id="rev-cancel">Annuler</button>
        </div>
      </form>`;
  }

  function mount(pid, root) {
    if (!root) return;

    function render() {
      const s = summary(pid);
      const list = get(pid);
      root.innerHTML = `
        <header class="section-head reveal">
          <p class="overline overline--dark">Ils ont adopté</p>
          <h2 class="section-title">Avis clients</h2>
        </header>
        <div class="rev-layout">
          <aside class="rev-summary">
            <div class="rev-summary__score">${(Math.round(s.avg * 10) / 10).toString().replace('.', ',')}</div>
            ${starsHTML(s.avg)}
            <p class="rev-summary__count">${s.count} avis</p>
            <div class="rev-bars">
              ${[5, 4, 3, 2, 1].map(n => {
                const c = s.breakdown[n] || 0;
                const pct = s.count ? Math.round(c / s.count * 100) : 0;
                return `<div class="rev-bar"><span class="rev-bar__lbl">${n}★</span><span class="rev-bar__track"><span class="rev-bar__fill" style="width:${pct}%"></span></span><span class="rev-bar__n">${c}</span></div>`;
              }).join('')}
            </div>
            <button class="btn btn--dark btn--mini rev-summary__cta" id="rev-open">Écrire un avis</button>
          </aside>
          <div class="rev-main">
            <div class="rev-form-slot" id="rev-form-slot" hidden></div>
            <div class="rev-list">${list.length ? list.map(cardHTML).join('') : '<p class="rev-empty">Sois le premier à donner ton avis sur ce produit.</p>'}</div>
          </div>
        </div>`;
      wire();
    }

    function wire() {
      const slot = root.querySelector('#rev-form-slot');
      const openBtn = root.querySelector('#rev-open');

      openBtn.addEventListener('click', () => {
        if (!slot.hidden) { slot.hidden = true; slot.innerHTML = ''; return; }
        slot.innerHTML = formHTML();
        slot.hidden = false;
        slot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        let picked = 0;
        const stars = [...slot.querySelectorAll('.rev-star')];
        const paint = n => stars.forEach((b, i) => b.classList.toggle('is-on', i < n));
        stars.forEach((b, i) => {
          b.addEventListener('mouseenter', () => paint(i + 1));
          b.addEventListener('click', () => { picked = i + 1; paint(picked); });
        });
        slot.querySelector('#rev-star-pick').addEventListener('mouseleave', () => paint(picked));

        slot.querySelector('#rev-cancel').addEventListener('click', () => { slot.hidden = true; slot.innerHTML = ''; });
        slot.querySelector('#rev-form').addEventListener('submit', ev => {
          ev.preventDefault();
          const err = slot.querySelector('#rev-error');
          const r = add(pid, {
            rating: picked,
            title: slot.querySelector('#rev-title').value,
            body: slot.querySelector('#rev-body').value,
            name: slot.querySelector('#rev-name').value
          });
          if (!r.ok) { err.textContent = r.error; return; }
          render(); // re-render (le formulaire se referme)
        });
      });
    }

    render();
  }

  window.FiveReviews = { get, summary, add, mount, starsHTML, onChange(fn) { listeners.push(fn); } };
})();
