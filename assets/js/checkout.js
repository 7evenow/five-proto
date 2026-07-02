/* ============================================================
   FIVE — Tunnel de commande (checkout)
   Utilise window.FiveCart (cart.js). Paiement simulé.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const euro = n => Number(n).toFixed(2).replace('.', ',') + ' €';
  const FREE_FROM = 80, SHIP_STD = 5.90, SHIP_EXP = 9.90;

  const toastEl = $('#toast'); let tt;
  const toast = m => { toastEl.textContent = m; toastEl.classList.add('is-visible'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('is-visible'), 2600); };

  const layout = $('#co-layout');
  const form = $('#co-form');
  const summary = $('#co-summary');

  const cart = window.FiveCart;
  let items = cart.items();

  /* ---------- Panier vide ---------- */
  if (!items.length) {
    layout.innerHTML = `<div class="co-empty">
      <p class="co-empty__title">Ton panier est vide</p>
      <p>Impossible de passer commande sans article.</p>
      <a class="btn btn--red" href="index.html#nouveautes">Découvrir les gants <span class="arrow">→</span></a>
    </div>`;
    return;
  }

  /* ---------- Livraison / totaux ---------- */
  const sub = () => cart.subtotal();
  const shipMode = () => (form.ship && form.ship.value) || 'standard';
  const shipCost = () => shipMode() === 'express' ? SHIP_EXP : (sub() >= FREE_FROM ? 0 : SHIP_STD);
  const total = () => sub() + shipCost();

  function renderSummary() {
    summary.innerHTML = `
      <h2 class="co-summary__title">Récapitulatif</h2>
      <div class="co-summary__items">
        ${items.map(it => `
          <div class="co-line">
            <span class="co-line__media"><img src="${it.img}" alt="${it.name}" referrerpolicy="no-referrer" /><span class="co-line__qty">${it.qty}</span></span>
            <span class="co-line__info"><span class="co-line__name">${it.name}</span><span class="co-line__meta">${[it.variant, it.size && it.size !== '—' ? it.size : ''].filter(Boolean).join(' · ')}</span></span>
            <span class="co-line__price">${euro(it.price * it.qty)}</span>
          </div>`).join('')}
      </div>
      <div class="co-summary__rows">
        <div class="summary-row"><span>Sous-total</span><span>${euro(sub())}</span></div>
        <div class="summary-row"><span>Livraison</span><span>${shipCost() ? euro(shipCost()) : 'Offerte'}</span></div>
        <div class="summary-total"><span>Total</span><strong>${euro(total())}</strong></div>
      </div>`;
    // prix du mode standard dans le sélecteur
    const stdEl = $('[data-ship-standard]');
    if (stdEl) stdEl.textContent = sub() >= FREE_FROM ? 'Offerte' : euro(SHIP_STD);
    const btnTotal = $('#co-submit-total');
    if (btnTotal) btnTotal.textContent = '· ' + euro(total());
  }
  renderSummary();

  /* ---------- Sélecteur de livraison ---------- */
  $('#co-ship').addEventListener('change', e => {
    $$('.co-ship__opt').forEach(o => o.classList.toggle('is-active', o.contains(e.target) && e.target.checked));
    renderSummary();
  });
  // état initial actif correct
  $$('.co-ship__opt').forEach(o => o.classList.toggle('is-active', $('input', o).checked));

  /* ---------- Méthode de paiement ---------- */
  const cardBox = $('#co-card'), paypalNote = $('#co-paypal');
  let payMethod = 'card';
  $('#co-pay-methods').addEventListener('click', e => {
    const b = e.target.closest('.co-pay-method'); if (!b) return;
    payMethod = b.dataset.pay;
    $$('.co-pay-method').forEach(x => x.classList.toggle('is-active', x === b));
    cardBox.hidden = payMethod !== 'card';
    paypalNote.hidden = payMethod !== 'paypal';
  });

  /* ---------- Formatage carte ---------- */
  const cardNum = $('#co-cardnum'), exp = $('#co-exp'), cvc = $('#co-cvc');
  cardNum.addEventListener('input', () => {
    let v = cardNum.value.replace(/\D/g, '').slice(0, 16);
    cardNum.value = v.replace(/(.{4})/g, '$1 ').trim();
  });
  exp.addEventListener('input', () => {
    let v = exp.value.replace(/\D/g, '').slice(0, 4);
    exp.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v;
  });
  cvc.addEventListener('input', () => { cvc.value = cvc.value.replace(/\D/g, '').slice(0, 4); });

  /* ---------- Pré-remplissage (test) ---------- */
  const fillBtn = $('#co-fill');
  if (fillBtn) fillBtn.addEventListener('click', () => {
    const set = (name, v) => { const f = form.elements[name]; if (f) f.value = v; };
    set('email', 'pilote.test@five-gloves.com');
    set('firstname', 'Jean'); set('lastname', 'Pilote');
    set('address', '12 rue du Circuit'); set('zip', '31000'); set('city', 'Toulouse');
    set('phone', '06 12 34 56 78');
    if (form.country) form.country.value = 'France';
    cardNum.value = '4242 4242 4242 4242';   // carte de test Stripe
    exp.value = '12/34'; cvc.value = '123';
    const cn = $('#co-cardname'); if (cn) cn.value = 'JEAN PILOTE';
    $$('.is-invalid', form).forEach(el => el.classList.remove('is-invalid'));
    err.textContent = '';
    toast('Champs pré-remplis (test)');
  });

  /* ---------- Validation + soumission ---------- */
  const err = $('#co-error');
  function fail(msg, field) {
    err.textContent = msg;
    if (field) { field.classList.add('is-invalid'); field.focus(); }
    field && field.addEventListener('input', () => field.classList.remove('is-invalid'), { once: true });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    err.textContent = '';
    const req = ['email', 'firstname', 'lastname', 'address', 'zip', 'city'];
    for (const name of req) {
      const f = form.elements[name];
      if (!f.value.trim()) return fail('Merci de compléter tous les champs de livraison.', f);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) return fail('Adresse e-mail invalide.', form.email);
    if (payMethod === 'card') {
      if (cardNum.value.replace(/\s/g, '').length < 13) return fail('Numéro de carte invalide.', cardNum);
      if (!/^\d{2}\/\d{2}$/.test(exp.value)) return fail('Date d\'expiration invalide (MM/AA).', exp);
      if (cvc.value.length < 3) return fail('Code CVC invalide.', cvc);
    }

    // simulation de paiement
    const btn = $('#co-submit');
    btn.disabled = true; btn.textContent = 'Paiement en cours…';
    setTimeout(() => {
      const firstname = form.firstname.value.trim();
      const email = form.email.value.trim();
      const num = 'FIVE-' + Math.floor(100000 + Math.random() * 900000);
      const paid = total();

      $('#co-confirm-name').textContent = firstname;
      $('#co-confirm-num').textContent = '#' + num;
      $('#co-confirm-email').textContent = email;
      $('#co-confirm-total').textContent = 'Montant réglé : ' + euro(paid);

      cart.clear();
      layout.hidden = true;
      $('#co-confirm').hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  });
})();
