/* ============================================================
   FIVE — Compte / authentification (prototype, localStorage)
   window.FiveAuth : session, profil, adresses. + état du bouton
   « Mon compte » dans le header, partagé sur toutes les pages.
   NB : prototype — mots de passe stockés en clair côté client.
   ============================================================ */
(function () {
  'use strict';

  const K_USERS = 'five_users';
  const K_SESSION = 'five_session';

  const read = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) || fb; } catch (e) { return fb; } };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const norm = s => String(s || '').trim().toLowerCase();
  const uid = () => 'a' + Math.random().toString(36).slice(2, 9);

  let users = read(K_USERS, []);      // [{ firstname, lastname, email, password, phone, addresses:[], createdAt }]
  let session = read(K_SESSION, null); // email de l'utilisateur connecté (ou null)

  /* ---------- Compte de démonstration (prototype) ----------
     Identifiants pré-remplis dans le formulaire de connexion.
     Le compte, ses adresses et quelques commandes sont créés
     automatiquement au premier chargement pour peupler la démo. */
  const DEMO = { email: 'pilote@five-gloves.com', password: 'five1234' };

  function seedDemo() {
    if (users.length) return; // ne crée le compte démo qu'une seule fois
    const addr1 = { id: uid(), label: 'Domicile', firstname: 'Jean', lastname: 'Pilote', address: '12 rue du Circuit', zip: '31000', city: 'Toulouse', country: 'France', phone: '06 12 34 56 78', default: true };
    const addr2 = { id: uid(), label: 'Bureau', firstname: 'Jean', lastname: 'Pilote', address: '5 avenue des Pistes', zip: '31200', city: 'Toulouse', country: 'France', phone: '', default: false };
    users.push({
      id: uid(), firstname: 'Jean', lastname: 'Pilote',
      email: DEMO.email, password: DEMO.password, phone: '06 12 34 56 78',
      addresses: [addr1, addr2],
      createdAt: new Date(Date.now() - 210 * 864e5).toISOString()
    });
    write(K_USERS, users);
    seedOrders(addr1);
  }

  function seedOrders(addr) {
    // commandes fictives basées sur le catalogue réel (si data.js est chargé)
    if (typeof PRODUCTS === 'undefined' || !PRODUCTS.length) return;
    let existing = read('five_orders', []);
    if (existing.some(o => String(o.email).toLowerCase() === DEMO.email)) return;

    const mkItem = (p, qty, size) => ({
      id: p.id, name: p.name, price: p.price, qty: qty,
      img: (p.variants && p.variants[0] ? p.variants[0].img : ''),
      variant: (p.variants && p.variants[0] ? (p.variants[0].name || '') : ''),
      size: size || 'M'
    });
    const mkOrder = (num, daysAgo, status, items) => {
      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
      const shipping = subtotal >= 80 ? 0 : 5.90;
      return {
        num, date: new Date(Date.now() - daysAgo * 864e5).toISOString(), status,
        email: DEMO.email, firstname: 'Jean', lastname: 'Pilote',
        items, subtotal, shipping, total: subtotal + shipping,
        shipMode: 'standard', payMethod: 'card',
        address: { firstname: addr.firstname, lastname: addr.lastname, address: addr.address, zip: addr.zip, city: addr.city, country: addr.country, phone: addr.phone }
      };
    };

    const P = PRODUCTS;
    const orders = [];
    orders.push(mkOrder('FIVE-728341', 12, 'En cours de livraison', [mkItem(P[0], 1, 'L'), mkItem(P[2] || P[1] || P[0], 1, 'M')]));
    orders.push(mkOrder('FIVE-591207', 48, 'Livrée', [mkItem(P[1] || P[0], 2, 'M')]));
    orders.push(mkOrder('FIVE-403118', 96, 'Livrée', [mkItem(P[3] || P[0], 1, 'S')]));
    write('five_orders', existing.concat(orders));
  }

  seedDemo();
  // garantit les commandes de démo dès qu'une page charge le catalogue
  (function ensureDemoOrders() {
    const demoUser = users.find(u => norm(u.email) === DEMO.email);
    if (!demoUser) return;
    const addr = (demoUser.addresses || []).find(a => a.default) || (demoUser.addresses || [])[0];
    if (addr) seedOrders(addr);
  })();

  const listeners = [];
  const notify = () => { renderHeader(); listeners.forEach(f => { try { f(); } catch (e) {} }); };

  const findUser = email => users.find(u => norm(u.email) === norm(email)) || null;

  /* renvoie une copie du profil courant, sans le mot de passe */
  function current() {
    if (!session) return null;
    const u = findUser(session);
    if (!u) return null;
    const { password, ...safe } = u;
    return JSON.parse(JSON.stringify(safe));
  }
  const isLoggedIn = () => !!current();

  /* ---------- Inscription / connexion ---------- */
  function register(data) {
    const email = norm(data.email);
    if (!data.firstname || !data.firstname.trim()) return { ok: false, error: 'Merci d\'indiquer ton prénom.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Adresse e-mail invalide.' };
    if (!data.password || data.password.length < 6) return { ok: false, error: 'Le mot de passe doit faire au moins 6 caractères.' };
    if (findUser(email)) return { ok: false, error: 'Un compte existe déjà avec cet e-mail.' };

    const user = {
      id: uid(),
      firstname: data.firstname.trim(),
      lastname: (data.lastname || '').trim(),
      email: email,
      password: data.password,
      phone: (data.phone || '').trim(),
      addresses: [],
      createdAt: new Date().toISOString()
    };
    users.push(user);
    write(K_USERS, users);
    session = email; write(K_SESSION, session);
    notify();
    return { ok: true };
  }

  function login(data) {
    const u = findUser(data.email);
    if (!u || u.password !== data.password) return { ok: false, error: 'E-mail ou mot de passe incorrect.' };
    session = norm(data.email); write(K_SESSION, session);
    notify();
    return { ok: true };
  }

  function logout() { session = null; write(K_SESSION, session); notify(); }

  /* ---------- Profil ---------- */
  function updateProfile(patch) {
    const u = findUser(session);
    if (!u) return { ok: false, error: 'Non connecté.' };
    if (patch.email !== undefined) {
      const ne = norm(patch.email);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ne)) return { ok: false, error: 'Adresse e-mail invalide.' };
      const clash = findUser(ne);
      if (clash && clash !== u) return { ok: false, error: 'Cet e-mail est déjà utilisé.' };
      u.email = ne; session = ne; write(K_SESSION, session);
    }
    if (patch.firstname !== undefined) u.firstname = patch.firstname.trim();
    if (patch.lastname !== undefined) u.lastname = patch.lastname.trim();
    if (patch.phone !== undefined) u.phone = patch.phone.trim();
    write(K_USERS, users); notify();
    return { ok: true };
  }

  function changePassword(oldPw, newPw) {
    const u = findUser(session);
    if (!u) return { ok: false, error: 'Non connecté.' };
    if (u.password !== oldPw) return { ok: false, error: 'Mot de passe actuel incorrect.' };
    if (!newPw || newPw.length < 6) return { ok: false, error: 'Le nouveau mot de passe doit faire au moins 6 caractères.' };
    u.password = newPw; write(K_USERS, users);
    return { ok: true };
  }

  /* ---------- Adresses ---------- */
  function addresses() { const u = findUser(session); return u ? JSON.parse(JSON.stringify(u.addresses || [])) : []; }

  function saveAddress(addr) {
    const u = findUser(session);
    if (!u) return { ok: false, error: 'Non connecté.' };
    u.addresses = u.addresses || [];
    if (addr.id) {
      const ex = u.addresses.find(a => a.id === addr.id);
      if (ex) Object.assign(ex, addr);
    } else {
      addr.id = uid();
      if (!u.addresses.length) addr.default = true;
      u.addresses.push(addr);
    }
    if (addr.default) u.addresses.forEach(a => { a.default = a.id === addr.id; });
    write(K_USERS, users); notify();
    return { ok: true, id: addr.id };
  }

  function removeAddress(id) {
    const u = findUser(session);
    if (!u) return;
    const wasDefault = (u.addresses.find(a => a.id === id) || {}).default;
    u.addresses = u.addresses.filter(a => a.id !== id);
    if (wasDefault && u.addresses[0]) u.addresses[0].default = true;
    write(K_USERS, users); notify();
  }

  function setDefaultAddress(id) {
    const u = findUser(session);
    if (!u) return;
    u.addresses.forEach(a => { a.default = a.id === id; });
    write(K_USERS, users); notify();
  }

  /* ---------- Bouton « Mon compte » du header ---------- */
  function renderHeader() {
    const on = isLoggedIn();
    document.querySelectorAll('.icon-btn[aria-label="Mon compte"], .account-btn').forEach(btn => {
      btn.classList.add('icon-btn--account');
      btn.classList.toggle('is-auth', on);
      const u = current();
      btn.setAttribute('title', on ? ('Mon compte — ' + u.firstname) : 'Se connecter');
    });
  }

  // clic sur le bouton compte → page compte (peu importe la page)
  document.addEventListener('click', e => {
    const b = e.target.closest('.icon-btn[aria-label="Mon compte"], .account-btn');
    if (!b) return;
    e.preventDefault();
    window.location.href = 'compte.html';
  });

  /* ---------- API publique ---------- */
  window.FiveAuth = {
    register, login, logout,
    current, isLoggedIn,
    updateProfile, changePassword,
    addresses, saveAddress, removeAddress, setDefaultAddress,
    onChange(fn) { listeners.push(fn); },
    render: renderHeader,
    DEMO: { email: DEMO.email, password: DEMO.password }
  };

  renderHeader();
})();
