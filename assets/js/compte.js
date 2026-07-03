/* ============================================================
   FIVE — Page « Mon compte »
   Bascule connexion/inscription ↔ tableau de bord.
   Utilise window.FiveAuth (auth.js) + FiveWish + les commandes
   persistées (five_orders) par checkout.js.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const euro = n => Number(n || 0).toFixed(2).replace('.', ',') + ' €';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  function fmtDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  const Auth = window.FiveAuth;

  /* ---------- header : scroll, burger, toast ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const burger = $('#burger'), nav = $('#primary-nav');
  if (burger) burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  const toastEl = $('#toast'); let tt;
  const toast = m => { toastEl.textContent = m; toastEl.classList.add('is-visible'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('is-visible'), 2600); };

  /* ---------- commandes de l'utilisateur ---------- */
  function myOrders() {
    let all = [];
    try { all = JSON.parse(localStorage.getItem('five_orders')) || []; } catch (e) { all = []; }
    const u = Auth.current();
    if (!u) return [];
    return all.filter(o => String(o.email || '').toLowerCase() === u.email.toLowerCase());
  }

  const authView = $('#acc-auth');
  const dashView = $('#acc-dash');

  /* ============================================================
     VUE AUTH
     ============================================================ */
  function setError(el, msg) { el.textContent = msg || ''; }

  /* pré-remplissage des identifiants de démo (prototype) */
  if (Auth.DEMO) {
    const le = $('#login-email'), lp = $('#login-pw');
    if (le && !le.value) le.value = Auth.DEMO.email;
    if (lp && !lp.value) lp.value = Auth.DEMO.password;
  }

  $('#login-form').addEventListener('submit', e => {
    e.preventDefault();
    const err = $('#login-error');
    const r = Auth.login({ email: $('#login-email').value, password: $('#login-pw').value });
    if (!r.ok) { setError(err, r.error); return; }
    setError(err, '');
    toast('Content de te revoir !');
    sync();
  });

  $('#register-form').addEventListener('submit', e => {
    e.preventDefault();
    const err = $('#register-error');
    const r = Auth.register({
      firstname: $('#reg-fn').value,
      lastname: $('#reg-ln').value,
      email: $('#reg-email').value,
      password: $('#reg-pw').value
    });
    if (!r.ok) { setError(err, r.error); return; }
    setError(err, '');
    toast('Compte créé — bienvenue chez Five !');
    sync();
  });

  $('#forgot-link').addEventListener('click', e => {
    e.preventDefault();
    toast('Un e-mail de réinitialisation t\'a été envoyé (démo).');
  });

  /* ============================================================
     VUE DASHBOARD
     ============================================================ */
  const panelBtns = $$('.acc-menu__item[data-panel]');
  const HASHES = { overview: 'tableau-de-bord', orders: 'commandes', addresses: 'adresses', profile: 'infos' };
  const BY_HASH = Object.fromEntries(Object.entries(HASHES).map(([k, v]) => [v, k]));

  function activate(name) {
    if (!$('#panel-' + name)) name = 'overview';
    panelBtns.forEach(b => b.classList.toggle('is-active', b.dataset.panel === name));
    $$('.acc-panel').forEach(p => p.classList.toggle('is-active', p.id === 'panel-' + name));
    if (HASHES[name]) history.replaceState(null, '', '#' + HASHES[name]);
    if (name === 'orders') renderOrders();
    if (name === 'addresses') renderAddresses();
    if (name === 'profile') renderProfile();
    if (name === 'overview') renderOverview();
  }

  panelBtns.forEach(b => b.addEventListener('click', () => activate(b.dataset.panel)));
  $('#logout-btn').addEventListener('click', () => { Auth.logout(); toast('Tu es déconnecté.'); sync(); });

  /* ---------- identité (sidebar) ---------- */
  function renderIdentity() {
    const u = Auth.current(); if (!u) return;
    $('#acc-avatar').textContent = (u.firstname[0] || 'F').toUpperCase();
    $('#acc-name').textContent = u.firstname + (u.lastname ? ' ' + u.lastname : '');
    $('#acc-email').textContent = u.email;
    const orders = myOrders();
    $('#badge-orders').textContent = orders.length || '';
    $('#badge-addresses').textContent = (u.addresses || []).length || '';
    $('#badge-wish').textContent = (window.FiveWish ? window.FiveWish.count() : 0) || '';
  }

  /* ---------- panneau : tableau de bord ---------- */
  function renderOverview() {
    const u = Auth.current(); if (!u) return;
    const orders = myOrders();
    const spent = orders.reduce((s, o) => s + (o.total || 0), 0);
    const wish = window.FiveWish ? window.FiveWish.count() : 0;
    const last = orders[0];

    $('#panel-overview').innerHTML = `
      <div class="acc-panel__head">
        <h2 class="acc-panel__title">Bonjour ${esc(u.firstname)} 👋</h2>
        <p class="acc-panel__sub">Voici un aperçu de ton activité Five.</p>
      </div>
      <div class="acc-stats">
        <div class="acc-stat"><span class="acc-stat__num">${orders.length}</span><span class="acc-stat__lbl">Commande${orders.length > 1 ? 's' : ''}</span></div>
        <div class="acc-stat"><span class="acc-stat__num">${euro(spent)}</span><span class="acc-stat__lbl">Total dépensé</span></div>
        <div class="acc-stat"><span class="acc-stat__num">${wish}</span><span class="acc-stat__lbl">Favori${wish > 1 ? 's' : ''}</span></div>
        <div class="acc-stat"><span class="acc-stat__num">${(u.addresses || []).length}</span><span class="acc-stat__lbl">Adresse${(u.addresses || []).length > 1 ? 's' : ''}</span></div>
      </div>

      <div class="acc-overview__cards">
        <div class="acc-mini">
          <h3 class="acc-mini__title">Dernière commande</h3>
          ${last ? `
            <div class="acc-order-mini">
              <div class="acc-order-mini__top">
                <strong>#${esc(last.num)}</strong>
                <span class="acc-tag acc-tag--ok">${esc(last.status || 'Confirmée')}</span>
              </div>
              <p class="acc-order-mini__meta">${fmtDate(last.date)} · ${last.items.reduce((s, i) => s + i.qty, 0)} article(s) · ${euro(last.total)}</p>
              <button class="acc-link acc-link--btn" data-goto="orders">Voir le détail →</button>
            </div>` : `
            <p class="acc-mini__empty">Aucune commande pour l'instant.</p>
            <a href="index.html#nouveautes" class="btn btn--red btn--mini">Découvrir les gants <span class="arrow">→</span></a>`}
        </div>

        <div class="acc-mini">
          <h3 class="acc-mini__title">Adresse de livraison</h3>
          ${defaultAddressHTML(u)}
        </div>
      </div>`;

    $$('[data-goto]', $('#panel-overview')).forEach(b => b.addEventListener('click', () => activate(b.dataset.goto)));
    const editAddr = $('[data-goto-addr]', $('#panel-overview'));
    if (editAddr) editAddr.addEventListener('click', () => activate('addresses'));
  }

  function defaultAddressHTML(u) {
    const list = u.addresses || [];
    const a = list.find(x => x.default) || list[0];
    if (!a) return `
      <p class="acc-mini__empty">Aucune adresse enregistrée.</p>
      <button class="btn btn--dark btn--mini" data-goto-addr>Ajouter une adresse</button>`;
    return `
      <address class="acc-addr-inline">
        <strong>${esc(a.firstname)} ${esc(a.lastname)}</strong><br>
        ${esc(a.address)}<br>
        ${esc(a.zip)} ${esc(a.city)}<br>
        ${esc(a.country || 'France')}
      </address>
      <button class="acc-link acc-link--btn" data-goto-addr>Gérer mes adresses →</button>`;
  }

  /* ---------- panneau : commandes ---------- */
  function orderCardHTML(o) {
    const qty = o.items.reduce((s, i) => s + i.qty, 0);
    const thumbs = o.items.slice(0, 4).map(i =>
      `<span class="acc-order__thumb"><img src="${esc(i.img)}" alt="${esc(i.name)}" referrerpolicy="no-referrer" /></span>`).join('')
      + (o.items.length > 4 ? `<span class="acc-order__more">+${o.items.length - 4}</span>` : '');
    return `
      <article class="acc-order">
        <header class="acc-order__head">
          <div>
            <span class="acc-order__num">#${esc(o.num)}</span>
            <span class="acc-order__date">${fmtDate(o.date)}</span>
          </div>
          <span class="acc-tag acc-tag--ok">${esc(o.status || 'Confirmée')}</span>
        </header>
        <div class="acc-order__body">
          <div class="acc-order__thumbs">${thumbs}</div>
          <div class="acc-order__totals">
            <span>${qty} article${qty > 1 ? 's' : ''}</span>
            <strong>${euro(o.total)}</strong>
          </div>
        </div>
        <button class="acc-order__toggle" aria-expanded="false">Détail de la commande</button>
        <div class="acc-order__detail" hidden>
          ${o.items.map(i => `
            <div class="acc-order__line">
              <span class="acc-order__line-media"><img src="${esc(i.img)}" alt="${esc(i.name)}" referrerpolicy="no-referrer" /></span>
              <span class="acc-order__line-info">
                <span class="acc-order__line-name">${esc(i.name)}</span>
                <span class="acc-order__line-meta">${[i.variant, i.size && i.size !== '—' ? 'Taille ' + i.size : ''].filter(Boolean).map(esc).join(' · ')} · ×${i.qty}</span>
              </span>
              <span class="acc-order__line-price">${euro(i.price * i.qty)}</span>
            </div>`).join('')}
          <div class="acc-order__recap">
            <div class="summary-row"><span>Sous-total</span><span>${euro(o.subtotal)}</span></div>
            <div class="summary-row"><span>Livraison</span><span>${o.shipping ? euro(o.shipping) : 'Offerte'}</span></div>
            <div class="summary-total"><span>Total</span><strong>${euro(o.total)}</strong></div>
          </div>
          ${o.address ? `<p class="acc-order__ship">Livré à : ${esc(o.address.firstname || '')} ${esc(o.address.lastname || '')}, ${esc(o.address.address || '')}, ${esc(o.address.zip || '')} ${esc(o.address.city || '')}</p>` : ''}
        </div>
      </article>`;
  }

  function renderOrders() {
    const orders = myOrders();
    const el = $('#panel-orders');
    el.innerHTML = `
      <div class="acc-panel__head">
        <h2 class="acc-panel__title">Mes commandes</h2>
        <p class="acc-panel__sub">${orders.length ? orders.length + ' commande' + (orders.length > 1 ? 's' : '') : 'Historique de tes achats'}</p>
      </div>
      ${orders.length ? `<div class="acc-orders">${orders.map(orderCardHTML).join('')}</div>` : `
        <div class="acc-empty">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
          <p class="acc-empty__title">Aucune commande pour l'instant</p>
          <p>Tes futures commandes s'afficheront ici.</p>
          <a href="index.html#nouveautes" class="btn btn--red">Découvrir les gants <span class="arrow">→</span></a>
        </div>`}`;

    $$('.acc-order__toggle', el).forEach(btn => btn.addEventListener('click', () => {
      const d = btn.nextElementSibling;
      const open = d.hidden;
      d.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.classList.toggle('is-open', open);
    }));
  }

  /* ---------- panneau : adresses ---------- */
  let editingId = null;

  function addressFormHTML(a) {
    a = a || {};
    return `
      <form class="acc-addr-form" id="addr-form">
        <div class="acc-field"><label for="af-label">Nom de l'adresse</label><input id="af-label" name="label" placeholder="Domicile, Bureau…" value="${esc(a.label || '')}" /></div>
        <div class="acc-row">
          <div class="acc-field"><label for="af-fn">Prénom</label><input id="af-fn" name="firstname" autocomplete="given-name" value="${esc(a.firstname || '')}" required /></div>
          <div class="acc-field"><label for="af-ln">Nom</label><input id="af-ln" name="lastname" autocomplete="family-name" value="${esc(a.lastname || '')}" required /></div>
        </div>
        <div class="acc-field"><label for="af-addr">Adresse</label><input id="af-addr" name="address" autocomplete="street-address" value="${esc(a.address || '')}" required /></div>
        <div class="acc-row">
          <div class="acc-field acc-field--sm"><label for="af-zip">Code postal</label><input id="af-zip" name="zip" inputmode="numeric" value="${esc(a.zip || '')}" required /></div>
          <div class="acc-field"><label for="af-city">Ville</label><input id="af-city" name="city" value="${esc(a.city || '')}" required /></div>
        </div>
        <div class="acc-row">
          <div class="acc-field"><label for="af-country">Pays</label>
            <select id="af-country" name="country">
              ${['France', 'Belgique', 'Suisse', 'Luxembourg'].map(c => `<option${(a.country || 'France') === c ? ' selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="acc-field"><label for="af-phone">Téléphone</label><input id="af-phone" name="phone" inputmode="tel" value="${esc(a.phone || '')}" /></div>
        </div>
        <label class="acc-check"><input type="checkbox" id="af-default" ${a.default ? 'checked' : ''} /> <span>Adresse de livraison par défaut</span></label>
        <p class="acc-error" id="addr-error" role="alert"></p>
        <div class="acc-addr-form__actions">
          <button type="submit" class="btn btn--red btn--mini">${a.id ? 'Enregistrer' : 'Ajouter l\'adresse'}</button>
          <button type="button" class="btn btn--ghost-dark btn--mini" id="addr-cancel">Annuler</button>
        </div>
      </form>`;
  }

  function renderAddresses() {
    const u = Auth.current(); if (!u) return;
    const list = u.addresses || [];
    const el = $('#panel-addresses');
    el.innerHTML = `
      <div class="acc-panel__head acc-panel__head--row">
        <div>
          <h2 class="acc-panel__title">Mes adresses</h2>
          <p class="acc-panel__sub">Gère tes adresses de livraison</p>
        </div>
        <button class="btn btn--dark btn--mini" id="addr-add">+ Ajouter</button>
      </div>
      <div class="acc-addr-list">
        ${list.length ? list.map(a => `
          <article class="acc-addr-card${a.default ? ' is-default' : ''}">
            ${a.default ? '<span class="acc-addr-card__badge">Par défaut</span>' : ''}
            <p class="acc-addr-card__label">${esc(a.label || 'Adresse')}</p>
            <address>
              <strong>${esc(a.firstname)} ${esc(a.lastname)}</strong><br>
              ${esc(a.address)}<br>
              ${esc(a.zip)} ${esc(a.city)}<br>
              ${esc(a.country || 'France')}${a.phone ? '<br>' + esc(a.phone) : ''}
            </address>
            <div class="acc-addr-card__actions">
              <button class="acc-link acc-link--btn" data-edit="${a.id}">Modifier</button>
              ${!a.default ? `<button class="acc-link acc-link--btn" data-default="${a.id}">Définir par défaut</button>` : ''}
              <button class="acc-link acc-link--btn acc-link--danger" data-remove="${a.id}">Supprimer</button>
            </div>
          </article>`).join('') : `
          <div class="acc-empty acc-empty--sm">
            <p class="acc-empty__title">Aucune adresse</p>
            <p>Ajoute une adresse pour accélérer tes commandes.</p>
          </div>`}
      </div>
      <div class="acc-addr-slot" id="addr-slot" hidden></div>`;

    const slot = $('#addr-slot', el);

    function openForm(addr) {
      editingId = addr ? addr.id : null;
      slot.innerHTML = addressFormHTML(addr);
      slot.hidden = false;
      slot.scrollIntoView({ behavior: 'smooth', block: 'center' });
      $('#addr-cancel', slot).addEventListener('click', () => { slot.hidden = true; slot.innerHTML = ''; editingId = null; });
      $('#addr-form', slot).addEventListener('submit', ev => {
        ev.preventDefault();
        const f = ev.target;
        const req = ['firstname', 'lastname', 'address', 'zip', 'city'];
        for (const n of req) { if (!f.elements[n].value.trim()) { $('#addr-error', slot).textContent = 'Merci de compléter tous les champs requis.'; f.elements[n].focus(); return; } }
        const data = {
          id: editingId || undefined,
          label: f.elements.label.value.trim() || 'Adresse',
          firstname: f.elements.firstname.value.trim(),
          lastname: f.elements.lastname.value.trim(),
          address: f.elements.address.value.trim(),
          zip: f.elements.zip.value.trim(),
          city: f.elements.city.value.trim(),
          country: f.elements.country.value,
          phone: f.elements.phone.value.trim(),
          default: $('#af-default', slot).checked
        };
        Auth.saveAddress(data);
        editingId = null;
        toast(data.id ? 'Adresse mise à jour.' : 'Adresse ajoutée.');
        renderAddresses();
      });
    }

    $('#addr-add', el).addEventListener('click', () => openForm(null));
    $$('[data-edit]', el).forEach(b => b.addEventListener('click', () => openForm(list.find(a => a.id === b.dataset.edit))));
    $$('[data-default]', el).forEach(b => b.addEventListener('click', () => { Auth.setDefaultAddress(b.dataset.default); renderAddresses(); }));
    $$('[data-remove]', el).forEach(b => b.addEventListener('click', () => {
      if (confirm('Supprimer cette adresse ?')) { Auth.removeAddress(b.dataset.remove); toast('Adresse supprimée.'); renderAddresses(); }
    }));
  }

  /* ---------- panneau : informations ---------- */
  function renderProfile() {
    const u = Auth.current(); if (!u) return;
    const el = $('#panel-profile');
    el.innerHTML = `
      <div class="acc-panel__head">
        <h2 class="acc-panel__title">Mes informations</h2>
        <p class="acc-panel__sub">Membre depuis le ${fmtDate(u.createdAt)}</p>
      </div>

      <form class="acc-profile-form" id="profile-form">
        <div class="acc-row">
          <div class="acc-field"><label for="pf-fn">Prénom</label><input id="pf-fn" name="firstname" value="${esc(u.firstname)}" required /></div>
          <div class="acc-field"><label for="pf-ln">Nom</label><input id="pf-ln" name="lastname" value="${esc(u.lastname || '')}" /></div>
        </div>
        <div class="acc-row">
          <div class="acc-field"><label for="pf-email">E-mail</label><input type="email" id="pf-email" name="email" value="${esc(u.email)}" required /></div>
          <div class="acc-field"><label for="pf-phone">Téléphone</label><input id="pf-phone" name="phone" inputmode="tel" value="${esc(u.phone || '')}" /></div>
        </div>
        <p class="acc-error" id="profile-error" role="alert"></p>
        <button type="submit" class="btn btn--red btn--mini">Enregistrer</button>
      </form>

      <hr class="acc-sep" />

      <form class="acc-profile-form" id="password-form">
        <h3 class="acc-subtitle">Changer mon mot de passe</h3>
        <div class="acc-field"><label for="pf-old">Mot de passe actuel</label><input type="password" id="pf-old" autocomplete="current-password" /></div>
        <div class="acc-row">
          <div class="acc-field"><label for="pf-new">Nouveau mot de passe</label><input type="password" id="pf-new" autocomplete="new-password" /></div>
          <div class="acc-field"><label for="pf-new2">Confirmer</label><input type="password" id="pf-new2" autocomplete="new-password" /></div>
        </div>
        <p class="acc-error" id="password-error" role="alert"></p>
        <button type="submit" class="btn btn--dark btn--mini">Mettre à jour</button>
      </form>`;

    $('#profile-form', el).addEventListener('submit', ev => {
      ev.preventDefault();
      const err = $('#profile-error', el);
      const r = Auth.updateProfile({
        firstname: $('#pf-fn', el).value,
        lastname: $('#pf-ln', el).value,
        email: $('#pf-email', el).value,
        phone: $('#pf-phone', el).value
      });
      if (!r.ok) { err.textContent = r.error; return; }
      err.textContent = ''; toast('Informations enregistrées.');
    });

    $('#password-form', el).addEventListener('submit', ev => {
      ev.preventDefault();
      const err = $('#password-error', el);
      const nw = $('#pf-new', el).value, nw2 = $('#pf-new2', el).value;
      if (nw !== nw2) { err.textContent = 'Les deux mots de passe ne correspondent pas.'; return; }
      const r = Auth.changePassword($('#pf-old', el).value, nw);
      if (!r.ok) { err.textContent = r.error; return; }
      err.textContent = ''; ev.target.reset(); toast('Mot de passe mis à jour.');
    });
  }

  /* ============================================================
     SYNCHRO VUE ↔ session
     ============================================================ */
  function sync() {
    const on = Auth.isLoggedIn();
    authView.hidden = on;
    dashView.hidden = !on;
    if (on) {
      renderIdentity();
      const name = BY_HASH[(location.hash || '').replace('#', '')] || 'overview';
      activate(name);
    }
  }

  window.FiveWish && window.FiveWish.onChange(() => { if (Auth.isLoggedIn()) renderIdentity(); });
  Auth.onChange(() => { /* header géré par auth.js ; ici on rafraîchit les badges si connecté */ if (Auth.isLoggedIn()) renderIdentity(); });

  sync();
})();
