(function () {
  'use strict';

  const CDN = 'https://five-gloves.com/wp-content/smush-webp/';

  const MOTO = [
    {
      name: 'Dominique Aegerter',
      country: 'CHE', discipline: 'World Supersport',
      achievements: ['Champion du monde SSP 2021 & 2022', '24 victoires en World Supersport', 'Pilote expérimenté WorldSBK'],
      img: CDN + '2026/03/AEGERTER-ACTION_2026-1024x512.jpg.webp',
      glove: 'RFX1 EVO', gloveHref: 'produit.html',
      instagram: 'https://www.instagram.com/DomiAegerter77/', facebook: '#'
    },
    {
      name: 'Thibault Benistant',
      country: 'FRA', discipline: 'Motocross MXGP',
      achievements: ['Champion du monde MX2 2022', 'Champion Europe EMX250 2020', 'Champion Europe EMX125 2018'],
      img: CDN + '2026/03/BENISTANT-PORTRAIT_2026-1024x512.jpg.webp',
      glove: 'MXF Race', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Ana Carrasco',
      country: 'ESP', discipline: 'World Supersport 300',
      achievements: ['1re femme championne du monde moto — SSP300 2018', 'Multiple victoires World Supersport 300', 'Icône du sport moto international'],
      img: CDN + '2025/09/CARRASCO-ACTION-1024x512.jpg.webp',
      glove: 'RFX1 EVO Woman', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Mano Faure',
      country: 'FRA', discipline: 'EMX250 / MXGP',
      achievements: ['Champion du monde Junior MX 2025', 'Révélation MXGP saison 2024/25'],
      img: CDN + '2025/09/FAURE-ACTION-1024x512.jpg.webp',
      glove: 'MXF Race', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Marvin Fritz',
      country: 'DEU', discipline: 'Endurance EWC',
      achievements: ['Champion du monde Endurance 2023 & 2025', 'Vainqueur 24h du Mans 2025'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/09/Fritz-action.jpg',
      glove: 'RFX1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Karel Hanika',
      country: 'CZE', discipline: 'Endurance EWC',
      achievements: ['Champion du monde Endurance 2023 & 2025', 'Vainqueur 24h du Mans 2025'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/09/Hanika-action.jpg',
      glove: 'RFX1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Peter Hickman',
      country: 'GBR', discipline: 'Tourist Trophy',
      achievements: ['14× vainqueur du Tourist Trophy', 'Record absolu du tour — 217.989 mph', 'Référence absolue de l\'Isle of Man'],
      img: CDN + '2025/09/HICKMAN-PORTRAIT-1024x512.jpg.webp',
      glove: 'RFX Race', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Steve Holcombe',
      country: 'GBR', discipline: 'EnduroGP',
      achievements: ['9× Champion du monde Enduro', 'Domination GP Enduro 2017–2020'],
      img: 'https://five-gloves.com/wp-content/uploads/2026/03/HOLCOMBE-ACTION_2026.jpg',
      glove: 'E2', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Kevin Horgmo',
      country: 'NOR', discipline: 'MXGP',
      achievements: ['Vice-champion EMX250 2021', 'Champion de France MX1 2025', 'Pilote MXGP Factory'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/09/Horgmo-action.jpg',
      glove: 'MXF Race', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Loïc Larrieu',
      country: 'FRA', discipline: 'EnduroGP',
      achievements: ['Champion du monde Enduro 2019', '8× Champion de France Enduro'],
      img: CDN + '2025/09/LARRIEU-ACTION-1024x512.jpg.webp',
      glove: 'MXF1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Andrea Locatelli',
      country: 'ITA', discipline: 'World Superbike',
      achievements: ['Champion Supersport 2020', 'Équipe Pata Yamaha WorldSBK', '12 victoires WorldSBK'],
      img: CDN + '2026/03/LOCATELLI-PORTRAIT_2026-1024x512.jpg.webp',
      glove: 'RFX1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Sam Lowes',
      country: 'GBR', discipline: 'World Superbike',
      achievements: ['Champion Supersport 2013', 'Multiple podiums WorldSBK', 'Expérience MotoGP & Moto2'],
      img: 'https://five-gloves.com/wp-content/uploads/2026/03/LOWES-ACTION_B_2026.jpg',
      glove: 'RFX1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Lucas Mahias',
      country: 'FRA', discipline: 'World Supersport',
      achievements: ['Champion du monde Endurance 2016', 'Champion Supersport 2017', 'Multiple victoires internationales'],
      img: 'https://five-gloves.com/wp-content/uploads/2026/03/MAHIAS-ACTION_2026.jpg',
      glove: 'RFX Race', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Leandro Mercado',
      country: 'ARG', discipline: 'Endurance EWC',
      achievements: ['Champion AMA Supersport 2009', 'Pilote endurance international confirmé'],
      img: 'https://five-gloves.com/wp-content/uploads/2026/03/LERCADO-ACTION_2026.jpg',
      glove: 'RFX1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Zach Pichon',
      country: 'FRA', discipline: 'EnduroGP',
      achievements: ['Champion du monde Junior Enduro 2022', 'Champion de France Enduro 2024'],
      img: CDN + '2025/09/PICHON-ACTION-1024x512.jpg.webp',
      glove: 'MXF Race', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Scott Redding',
      country: 'GBR', discipline: 'British Superbike',
      achievements: ['Vice-champion WorldSBK 2020', 'Champion British SBK 2019', 'Expérience MotoGP'],
      img: CDN + '2025/09/REDDING-ACTION-1024x512.jpg.webp',
      glove: 'RFX1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Marc-Reiner Schmidt',
      country: 'DEU', discipline: 'Supermoto S1GP',
      achievements: ['4× Champion du monde Supermoto', 'Référence absolue du Supermoto mondial'],
      img: 'https://five-gloves.com/wp-content/uploads/2026/03/SCHMIDT-ACTION_2026.jpg',
      glove: 'RFX1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Amandine Verstappen',
      country: 'BEL', discipline: 'Motocross Women',
      achievements: ['Championne du monde Sand 2024', '8× Championne de France MX Women'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/09/Verstappen-action.jpg',
      glove: 'MXF1 EVO', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    }
  ];

  const VELO = [
    {
      name: 'Sylvain André',
      country: 'FRA', discipline: 'BMX Racing',
      achievements: ['Champion du Monde BMX 2019, 2022 & 2023', 'Médaillé olympique Tokyo & Paris', '3× Champion d\'Europe BMX'],
      img: CDN + '2025/09/ANDRE_PORTRAIT-1024x512.jpg.webp',
      glove: 'Race Pro', gloveHref: 'produit.html',
      instagram: 'https://www.instagram.com/sylvainandrebmx/', facebook: '#'
    },
    {
      name: 'Zoé Claessens',
      country: 'CHE', discipline: 'BMX World Cup',
      achievements: ['Médaille de bronze olympique Paris 2024', 'Championne d\'Europe BMX 2024'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/09/CLAESSENS_ACTION.jpg',
      glove: 'Race Pro', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Thibaut Daprela',
      country: 'FRA', discipline: 'Downhill VTT',
      achievements: ['Vainqueur Coupe du Monde DH Junior 2018 & 2019', 'Champion de France DH 2024', 'Top DH mondial élite'],
      img: CDN + '2025/09/DAPRELA_PORTRAIT-1024x512.jpg.webp',
      glove: 'Race Pro', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Noa Filippi',
      country: 'FRA', discipline: 'VTT Cross-Country',
      achievements: ['Champion d\'Europe U17 XCO & XCC 2024', 'Pépite du cross-country français'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/09/FILIPPI_ACTION.jpg',
      glove: 'XR-Pro', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Thomas Genon',
      country: 'BEL', discipline: 'Freeride MTB',
      achievements: ['7× médaillé Crankworx', 'Vainqueur Freeride World Tour', 'Rider Five depuis 2014'],
      img: CDN + '2025/09/GENON_PORTRAIT-1024x512.jpg.webp',
      glove: 'XR-Pro', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Sabina Kosarkova',
      country: 'SVK', discipline: 'BMX Pumptrack',
      achievements: ['Championne du monde Pumptrack 2024 & 2025', '5× vainqueur Crankworx'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/11/KOSARKOVA_ACTION_02.jpg',
      glove: 'Race Pro', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    },
    {
      name: 'Adrien Loron',
      country: 'FRA', discipline: 'Urban Downhill',
      achievements: ['King of Crankworx', 'Vice-champion 4X 2021', 'Spécialiste Urban Downhill'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/11/LORON_ACTION_02.jpg',
      glove: 'Enduro Air Evo', gloveHref: 'produit.html',
      instagram: 'https://www.instagram.com/adrienloron/', facebook: '#'
    },
    {
      name: 'Lucas Rodriguez',
      country: 'FRA', discipline: 'VTT Cross-Country',
      achievements: ['Champion de France U17 XCO & XCR 2025', 'Future référence du cross-country'],
      img: 'https://five-gloves.com/wp-content/uploads/2025/11/RODRIGUEZ_ACTION.jpg',
      glove: 'XR-Ride', gloveHref: 'produit.html',
      instagram: '#', facebook: '#'
    }
  ];

  function mkCard(a, i) {
    const exIg = a.instagram !== '#';
    const exFb = a.facebook !== '#';
    return `
      <article class="tpg-card" style="--i:${i}" role="listitem" tabindex="0">
        <img class="tpg-card__img" src="${a.img}" alt="${a.name}" loading="lazy" referrerpolicy="no-referrer" />
        <span class="tpg-card__idx">${String(i + 1).padStart(2, '0')}</span>
        <div class="tpg-card__content">
          <span class="tpg-card__tag">${a.country} · ${a.discipline}</span>
          <span class="tpg-card__name">${a.name}</span>
          <div class="tpg-card__reveal">
            <ul class="tpg-card__achievements">
              ${a.achievements.map(t => `<li>${t}</li>`).join('')}
            </ul>
            <div class="tpg-card__foot">
              <a href="${a.gloveHref}" class="tpg-card__glove">
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
