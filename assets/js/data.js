/* ============================================================
   FIVE — Données produits (réelles : five-gloves.com)
   variants = coloris (change la photo principale)
   gallery  = packshots produit (affichés dans le bloc d'achat)
   media    = photos de zoom / lifestyle (affichées après les caractéristiques)
   ============================================================ */

const IMG = 'https://five-gloves.com/wp-content/uploads/';

const PRODUCTS = [
  {
    id: 'rfx-race', name: "RFX Race", cat: 'moto', catLabel: "Racing", price: 450.00, badge: 'best',
    desc: "Le plus avancé des FIVE ADVANCED GLOVES™. Conçu pour la haute performance, le RFX Race offre le plus haut degré de protection, grâce, notamment, à sa triple coque en Carbone Composite Thermoset, un matériau issu de l’aéronautique et de la Formule 1.",
    specs: [{ label: "Grip Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_palm.svg" }, { label: "Knuckles Protect", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/knuckles_protect.svg" }, { label: "Leather Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/leather_palm.svg" }, { label: "Palm Slider", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/palm_slider.svg" }, { label: "Phalange Pads", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/phalange_pads.svg" }, { label: "Velcro Strap", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/velcro_strap.svg" }],
    features: [
      "160 éléments assemblés par paire / 159g de technologie par gant (taille M)",
      "Structure cuir de vache pleine fleur (dessus) pour la résistance / Cuir de chèvre pleine fleur (paume) pour la souplesse",
      "Coques ventilées de protection métacarpo-phalangienne et métacarpienne en TPU renforcées de Carbone Thermoset haute résistance à l’abrasion",
      "Coque de protection de l’hypothénar (« slider » de paume) en carbone",
      "Renfort palmaire en cuir digital",
      "Renforts de l’éminence thénar par patch SuperFabric®",
      "Doublure interne Kevlar®",
      "Coutures externes au niveau des doigts (fil Gütermann)",
      "Coque de protection de l’avant-bras en TPU",
      "Panneaux d’aisance Stretch Kevlar® (dessus)",
      "Double système de fermeture avec patte de réglage sous volet de protection",
      "Lien anti-torsion accordéon entre l’auriculaire et l’annulaire visant à limiter le risque d’écartèlement en cas de chute (une innovation FIVE)",
      "CE KP2"
    ],
    variants: [
      { name: "Black", hex: '#141414', img: IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx-race-black-face.jpg" },
      { name: "Black Red", hex: '#e3071a', img: IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx-race-black-red-face.jpg" },
      { name: "White Black", hex: '#f2f2f2', img: IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx-race-white-black-face.jpg" },
      { name: "White Fluo Yellow", hex: '#d4f000', img: IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx-race-white-fluoyellow-face.jpg" },
      { name: "White Red", hex: '#e3071a', img: IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx-race-white-red-face.jpg" }
    ],
    gallery: [
      IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx-race-black-red-palm.jpg"
    ],
    media: []
  },
  {
    id: 'rfx2-evo', name: "RFX2 Evo", cat: 'moto', catLabel: "Racing", price: 199.90, badge: 'nouveau',
    desc: "Nouvelle génération de notre gant le plus abordable pour accéder au pilotage en compétition sur circuit, le RFX2 EVO est clairement orienté performance. Il opte pour une construction et des matériaux qui lui donnent, malgré un tarif contenu, des attributs de gant de course haut de gamme.",
    specs: [{ label: "Grip Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_palm.svg" }, { label: "Knuckles Protect", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/knuckles_protect.svg" }, { label: "Leather Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/leather_palm.svg" }, { label: "Palm Slider", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/palm_slider.svg" }, { label: "Phalange Pads", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/phalange_pads.svg" }, { label: "Velcro Strap", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/velcro_strap.svg" }],
    features: [
      "Structure supérieure en SyntechSkin™ et nylon stretch",
      "Paume en cuir de chèvre pleine fleur souple",
      "Manchette en nylon stretch",
      "Accordéons d’aisance en cuir de chèvre perforé sur index et majeur",
      "Construction des doigts par coutures extérieures",
      "Fourchettes (entre-doigts) en cuir de chèvre et fond de fourchettes en cuir perforé",
      "Structure du pouce en cuir de chèvre et nylon stretch",
      "Doublure Kevlar® sur le dessus de la main",
      "Renforts en mousse 5mmsur le dessus de la main et 3mm sur les doigts",
      "Renforts en nylon stretch sur l’index et le majeur",
      "Renfort de l’hypothénar en mousse3mm",
      "Renfort de l’hypothénar multicouches en Kevlar® et cuir de chèvre pleine fleur",
      "Protection métacarpo-phalangienne AirGO PROTECH™ ventilée et protection des métacarpes en TPU nids d’abeilles",
      "Coque de protection (slider de paume) de l’hypothénar ERGO PROTECH® à nids d’abeilles",
      "Protection de l’avant-bras grâce à la manchette TPU à nids d’abeilles et Cuff Slider™",
      "Double-système de fermeture par patte velcro au poignet et patte d’ajustement de la manchette thermosoudée sans couture",
      "Lien anti-torsion accordéon entre l’auriculaire et l’annulaire visant à limiter le risque d’écartèlement en cas de chute (innovation FIVE)",
      "Renfort palmaire en Hi-Res Grip™ pour une adhérence optimale aux poignées",
      "CE KP1"
    ],
    variants: [
      { name: "Black Dark Grey", hex: '#4a4a4f', img: IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-dark-grey-face.jpg" },
      { name: "Black Fluo Red", hex: '#ff2d2d', img: IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-fluored-face-2026.jpg" },
      { name: "Black White", hex: '#f2f2f2', img: IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-face-2026.jpg" }
    ],
    gallery: [
      IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-palm-2026.jpg"
    ],
    media: [
      IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus01.jpg",
      IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus02.jpg",
      IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus03.jpg",
      IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus04.jpg",
      IMG + "2025/10/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-portrait.jpg",
      IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-action-02.jpg",
      IMG + "2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-action-03.jpg"
    ]
  },
  {
    id: 'stunt-evo-2', name: "Stunt Evo 2", cat: 'moto', catLabel: "Street", price: 79.90,
    desc: "À l’origine du STUNT, la volonté d’offrir la parfaite synthèse entre un gant de vitesse en cuir, pour la protection, et un gant de cross textile, pour le confort, afin d’évoluer sur asphalte avec un gant court, léger et ultra-protecteur.",
    specs: [{ label: "Knuckles Protect", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/knuckles_protect.svg" }, { label: "Leather Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/leather_palm.svg" }, { label: "Palm Slider", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/palm_slider.svg" }, { label: "Phalange Pads", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/phalange_pads.svg" }, { label: "Touch Screen Index Thumb", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/touch_screen_index_thumb.svg" }, { label: "Velcro Strap", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/velcro_strap.svg" }],
    features: [
      "Structure supérieure en Twill Span extensible",
      "Paume en cuir de chèvre pleine fleur",
      "Protection métacarpo-phalengienne AirGO PROTECH™ ventilée",
      "Protection de l’hypothénar ERGO PROTECH® honeycomb",
      "Protection des doigts en TPR avec prise d’air",
      "Structure du pouce en Softshell pour une finesse et un confort optimum",
      "Fourchettes (entre-doigts) en Nylon stretch ultra-résistant",
      "Poignet ergonomique en néoprène thermoformé avec fermeture velcro intégrée",
      "Système Touch Screen™ sur index et pouce",
      "CE KP1"
    ],
    variants: [
      { name: "Black", hex: '#141414', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-black-face.jpg" },
      { name: "Camo Black Red", hex: '#6f6d49', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-camo-black-red-face.jpg" },
      { name: "Camo Khaki", hex: '#6f6d49', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-camo-khaki-face.jpg" },
      { name: "Camo Sand", hex: '#c8b68a', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-camo-sand-face.jpg" },
      { name: "Fiber Black White", hex: '#f2f2f2', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-fiber-white-face.jpg" },
      { name: "Fluo Yellow", hex: '#d4f000', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-fluoyellow-face.jpg" },
      { name: "Graffiti Glow", hex: '#5a5a5a', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-graffiti-glow-face.jpg" },
      { name: "Night Blue Fluo Yellow", hex: '#d4f000', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-nightblue-fluoyellow-face.jpg" },
      { name: "Red", hex: '#e3071a', img: IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-face.jpg" }
    ],
    gallery: [
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-palm.jpg"
    ],
    media: [
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-focus01.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-focus02.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-focus03.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-focus04.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-portrait.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-action-02.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-action-03.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-action-04.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-action-05.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-PERFORMANCE-stunt-evo2-red-action-06.jpg"
    ]
  },
  {
    id: 'globe-evo', name: "Globe Evo", cat: 'moto', catLabel: "Street", price: 34.90,
    desc: "Notre modèle d’accès visant à répondre aux besoins essentiels des motards urbains et scooteristes en quête d’un gant abordable et fonctionnel. Ce dernier a connu un large succès à travers la planète pour devenir un basique incontournable.",
    specs: [{ label: "Vegan", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/vegan.svg" }, { label: "Knuckles Protect", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/knuckles_protect.svg" }, { label: "Palm Slider", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/palm_slider.svg" }, { label: "Touch Screen Index", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/touch_screen_index.svg" }, { label: "Velcro Strap", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/velcro_strap.svg" }],
    features: [
      "Structure supérieure en polymesh extensible",
      "Paume en cuir synthétique Nash",
      "Protection métacarpo-phalengienne ERGO PROTECH®",
      "Protection de l’hypothénar ERGO PROTECH®",
      "Système Touch Screen™ sur index",
      "Fermeture poignet velcro",
      "Vegan Friendly",
      "CE KP1"
    ],
    variants: [
      { name: "Black", hex: '#141414', img: IMG + "2025/09/FIVE-MOTO-STREET-SPORT-globe-evo-black-face.jpg" },
      { name: "Black Fluo Yellow", hex: '#d4f000', img: IMG + "2025/09/FIVE-MOTO-STREET-SPORT-globe-evo-black-fluoyellow-face.jpg" },
      { name: "Black Red", hex: '#e3071a', img: IMG + "2025/09/FIVE-MOTO-STREET-SPORT-globe-evo-black-red-face.jpg" },
      { name: "Black White", hex: '#f2f2f2', img: IMG + "2025/09/FIVE-MOTO-STREET-SPORT-globe-evo-black-white-face.jpg" }
    ],
    gallery: [
      IMG + "2025/09/FIVE-MOTO-STREET-SPORT-globe-evo-black-white-palm.jpg"
    ],
    media: [
      IMG + "2025/09/FIVE-MOTO-STREET-SPORT-globe-evo-black-white-action-01.jpg",
      IMG + "2025/09/FIVE-MOTO-STREET-SPORT-globe-evo-black-white-action-02.jpg"
    ]
  },
  {
    id: 'xr-pro', name: "XR-Pro", cat: 'velo', catLabel: "VTT All-Ride", price: 39.90,
    desc: "Le XR-PRO est tout simplement le gant porté par Tom Pidcock et Pauline Ferrand-Prévot lors de leurs titres mondiaux (2023) et Olympiques (2024). Avec une paume en cuir de synthèse AX® Suede Cinco agrémentée de perforations laser favorisant l’évacuation de la transpiration et une structure supérieure ultra ventilée en Mesh Stretch. Un gant extrêmement polyvalent, puisque plébiscité par nos riders officiels dans de nombreuses disciplines (XC, freeride…), qui convient à ceux qui ne négligent aucun détail dans leur quête de performance.",
    specs: [{ label: "Vegan", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/vegan.svg" }, { label: "Grip Control", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_control.svg" }, { label: "Grip Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_palm.svg" }, { label: "Skin Effect", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/skin_effect.svg" }, { label: "Touch Screen Index Thumb", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/touch_screen_index_thumb.svg" }, { label: "Velcro Strap", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/velcro_strap.svg" }],
    features: [
      "Structure supérieure en mesh stretch ultra ventilé",
      "Paume en cuir synthétique AX® Suede Cinco",
      "Fourchettes FIVE ERGOFIT™ en 2:2 Mesh",
      "Pouce en mousse micro-éponge pour s’essuyer le front",
      "Système de fermeture par patte nash + velcro avec soufflet de confort Lycra® et languette d’enfilage",
      "Perforations laser sur la paume favorisant l’évacuation de la transpiration",
      "Impression en silicone sur la paume, le pouce, l’index et le majeur pour un meilleur grip au guidon",
      "Système Touch Screen™ sur index et pouce"
    ],
    variants: [
      { name: "Black", hex: '#141414', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-black-face.jpg" },
      { name: "Camo Blue", hex: '#3f4f6b', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-camo-blue-face.jpg" },
      { name: "Camo Khaki Fluo Orange", hex: '#ff7a00', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-camo-khaki-fluoorange-face.jpg" },
      { name: "Black Blue", hex: '#2a4d8f', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-black-blue-face.jpg" },
      { name: "Black Fluo Yellow", hex: '#d4f000', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-black-fluoyellow-face.jpg" },
      { name: "Black Mint", hex: '#3fcaa8', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-black-mint-face.jpg" },
      { name: "Black Red", hex: '#e3071a', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-black-red-face.jpg" }
    ],
    gallery: [
      IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-pro-camo-khaki-fluoorange-palm.jpg"
    ],
    media: []
  },
  {
    id: 'xr-trail', name: "XR-Trail", cat: 'velo', catLabel: "VTT All-Ride", price: 35.90, badge: 'nouveau',
    desc: "Pour enchainer les pistes et sentiers en VTT en toute sérénité, XR TRAIL se veut polyvalent et résistant grâce à sa structure en tissu Twill Span extensible. Sa paume en AX® Suede Cinco et ses impressions silicone sur pouce, index et majeur assure une parfaite maîtrise au guidon. Sa fermeture par patte TPR + Velcro facilite l’ajustement. Une valeur sûre sur tous les terrains.",
    specs: [{ label: "Grip Control", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_control.svg" }, { label: "Skin Effect", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/skin_effect.svg" }, { label: "Touch Screen Index Thumb", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/touch_screen_index_thumb.svg" }, { label: "Velcro Strap", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/velcro_strap.svg" }, { label: "Vented Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/vented_palm.svg" }],
    features: [
      "Structure supérieure en tissu Twill Span extensible",
      "Paume en cuir synthétique AX® Suede Cinco",
      "Pouce en mousse micro-éponge pour s’essuyer le front",
      "Système de fermeture par patte TPR + Velcro avec soufflet de confort Lycra® et languette d’enfilage",
      "Perforations au laser sur la paume favorisant l’évacuation de la transpiration",
      "Impression silicone sur le pouce, l’index et le majeur pour un meilleur grip",
      "Système Touch Screen™ sur index et pouce"
    ],
    variants: [
      { name: "Black", hex: '#141414', img: IMG + "2025/12/FIVE-VELO-MTB-ALLRIDE-xr-trail-black-face.jpg" },
      { name: "Light Blue", hex: '#8fb8d6', img: IMG + "2025/12/FIVE-VELO-MTB-ALLRIDE-xr-trail-lightblue-face.jpg" },
      { name: "Forest Khaki", hex: '#3a4a2c', img: IMG + "2025/12/FIVE-VELO-MTB-ALLRIDE-xr-trail-forestkhaki-face.jpg" }
    ],
    gallery: [
      IMG + "2025/12/FIVE-VELO-MTB-ALLRIDE-xr-trail-forestkhaki-palm.jpg"
    ],
    media: []
  },
  {
    id: 'xr-lite', name: "XR-Lite", cat: 'velo', catLabel: "VTT All-Ride", price: 34.90,
    desc: "Le XR-LITE est un gant VTT qui se caractérise par son poignet élastique en Néoprène™ embossé, sans patte d’attache velcro pour un enfilage rapide, un parfait maintien et une totale liberté de mouvement. Sa structure supérieure en Lycra et sa paume en AX® Suede Cinco micro-perforé en font le modèle polyvalent idéal pour vos sorties loisirs. Les impressions silicone dans la paume assurent un grip maximal optimal au guidon. Enfin, le système Touch Screen™ sur index et pouce permet de naviguer et de zoomer sur votre téléphone ou GPS.",
    specs: [{ label: "Vegan", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/vegan.svg" }, { label: "Grip Control", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_control.svg" }, { label: "Grip Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_palm.svg" }, { label: "Skin Effect", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/skin_effect.svg" }, { label: "Touch Screen Index Thumb", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/touch_screen_index_thumb.svg" }],
    features: [
      "Structure supérieure en Lycra",
      "Paume en cuir synthétique AX® Suede Cinco perforé pour une ventilation optimale",
      "Poignet Néoprène™ embossé pour un ajustement et un confort optimum",
      "Fourchettes FIVE ERGOFIT™ en 2:2 Mesh",
      "Pouce en mousse micro-éponge pour s’essuyer le front",
      "Languette d’enfilage intégrée",
      "Perforations laser sur la paume favorisant l’évacuation de la transpiration",
      "Impression en silicone sur la paume, le pouce, l’index et le majeur pour un meilleur grip au guidon",
      "Système Touch Screen™ sur index et pouce"
    ],
    variants: [
      { name: "Tattoo Black Gold", hex: '#c8a24a', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-lite-tattoo-black-gold-face.jpg" },
      { name: "Tattoo White", hex: '#f2f2f2', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-lite-tattoo-white-face.jpg" },
      { name: "Black White", hex: '#f2f2f2', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-lite-black-white-face.jpg" },
      { name: "Camo Khaki", hex: '#6f6d49', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-lite-camo-khaki-face.jpg" },
      { name: "Stripes Blue", hex: '#2a4d8f', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-lite-stripes-blue-face.jpg" },
      { name: "Stripes Red", hex: '#e3071a', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-lite-stripes-red-face.jpg" },
      { name: "Stripes White", hex: '#f2f2f2', img: IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-lite-stripes-white-face.jpg" }
    ],
    gallery: [
      IMG + "2025/10/FIVE-VELO-MTB-ALLRIDE-xr-lite-stripes-white-palm.jpg"
    ],
    media: []
  },
  {
    id: 'e2-bike', name: "E2 Bike", cat: 'velo', catLabel: "VTT Heavy-Duty", price: 69.90,
    desc: "Le E2 dispose de la double coque FIVE ERGO PROTECH™ en TPR souple visant à ne jamais entraver les mouvements. Matériaux résistants sur la moitié extérieure, plus exposée aux frottements. Le E2 dispose aussi d’une paume en AX® Suede Dyno, avec coussinets de mousse rubber de 2mm et de 3mm au pouce.",
    specs: [{ label: "Vegan", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/vegan.svg" }, { label: "Clear Vision Pad", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/clear_vision_pad.svg" }, { label: "Grip Control", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_control.svg" }, { label: "Grip Palm", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/grip_palm.svg" }, { label: "Knuckles Protect", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/knuckles_protect.svg" }, { label: "Phalange Pads", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/phalange_pads.svg" }, { label: "Touch Screen Index", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/touch_screen_index.svg" }, { label: "Velcro Strap", icon: "https://five-gloves.com/wp-content/themes/five-ukiyo/dist/images/caracteristiques/velcro_strap.svg" }],
    features: [
      "Dessus : Structure mixte, mesh ventilé côté intérieur / nylon 4-way stretch haute résistance côté extérieur.",
      "Paume : AX® Suede DYNO / renfort hypothénar et contact avec les poignées en cuir. Synthétique / renforts mousse rubber 2mm sur la paume / coussinet de mousse rubber 3mm sur le pouce.",
      "Double coque de protection FIVE ERGOPROTECH™ en TPR souple, imperceptible.",
      "Mini coques de protection TPR sur les doigts + renforts mousse rubber 3mm sur annulaire et auriculaire.",
      "Logo de protection 5 TPR Sonic thermo-soudé.",
      "Construction FIVE visant à optimiser l’ajustement et la liberté de mouvement des doigts.",
      "Renfort en cuir synthétique sur la tranche de la main jusqu’au radius.",
      "Impression silicone à l’intérieur des doigts pour un grip optimal aux leviers.",
      "Système de nettoyage de masque Clear Vision Pad™ côté main gauche.",
      "Système Touch Screen™ (index) de manipulation des écrans tactiles.",
      "Fermeture par patte de réglage intégrée à la structure en tissu mesh et velcro."
    ],
    variants: [
      { name: "Black", hex: '#141414', img: IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-black-face.jpg" },
      { name: "Grey Fluo Yellow Navy", hex: '#d4f000', img: IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-grey-fluoyellow-navy-face.jpg" },
      { name: "Orange", hex: '#e8731a', img: IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-orange-face.jpg" },
      { name: "White Black Red", hex: '#e3071a', img: IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-white-black-red-face.jpg" }
    ],
    gallery: [
      IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-white-black-red-palm.jpg"
    ],
    media: [
      IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-white-black-red-focus01.jpg",
      IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-white-black-red-focus02.jpg",
      IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-white-black-red-focus03.jpg",
      IMG + "2025/09/FIVE-MOTO-OFF-ROAD-ENDURO-e2-white-black-red-focus04.jpg"
    ]
  },
  {
    id: 'racing-icon-cap', name: "Racing Icon Cap", cat: 'accessoire', catLabel: "Casquette", price: 29.90,
    desc: "Accessoire FIVE pour compléter ta panoplie. Même exigence que nos gants, pour rouler avec style en toute saison.",
    specs: [],
    features: [],
    variants: [
      { name: "Black / Red", hex: '#141414', img: IMG + "2026/02/FIVE-cap_racing_icon_1.jpg" }
    ],
    gallery: [
      IMG + "2026/02/FIVE-cap_racing_icon_2-e1771604915961.jpg"
    ],
    media: []
  },
  {
    id: 'scrambler-cap', name: "Scrambler Cap", cat: 'accessoire', catLabel: "Casquette", price: 29.90,
    desc: "Accessoire FIVE pour compléter ta panoplie. Même exigence que nos gants, pour rouler avec style en toute saison.",
    specs: [],
    features: [],
    variants: [
      { name: "Black / Orange", hex: '#141414', img: IMG + "2026/02/FIVE-cap_scrambler_1.jpg" }
    ],
    gallery: [
      IMG + "2026/02/FIVE-cap_scrambler_2-e1771604905166.jpg"
    ],
    media: []
  },
  {
    id: 'warm-camo', name: "Warm Camo", cat: 'accessoire', catLabel: "Tour de cou", price: 14.90,
    desc: "Accessoire FIVE pour compléter ta panoplie. Même exigence que nos gants, pour rouler avec style en toute saison.",
    specs: [],
    features: [],
    variants: [
      { name: "Camo", hex: '#6f6d49', img: IMG + "2026/02/FIVE-TOURdeCOU-necktube_warm_camo_focus.jpg" }
    ],
    gallery: [
      IMG + "2026/02/FIVE-TOURdeCOU-necktube_warm_camo_face.jpg"
    ],
    media: []
  },
  {
    id: 'hg-connexion-kit', name: "HG Connexion Kit", cat: 'accessoire', catLabel: "Gants chauffants", price: 49.90,
    desc: "Optez pour le kit de connexion HG optionnel. Il est constitué de câbles permettant de relier directement vos gants chauffants FIVE HG à la prise allume-cigare ou aux cosses de batterie de votre moto.",
    specs: [],
    features: [
      "HG DUAL CHARGER Gants chauffants HG Accessoires / Gants chauffants HG 24,90",
      "HG GLOVE BATTERY Gants chauffants HG Accessoires / Gants chauffants HG 39,90"
    ],
    variants: [
      { name: "Noir", hex: '#141414', img: IMG + "2026/02/FIVE_ACCESSOIRES_HG_connexion_kit-e1771598701910.jpg" }
    ],
    gallery: [],
    media: []
  },
];

const TECHNOS = [
  { title: 'Homologation CE', tag: 'Norme EN 13594:2015',
    desc: 'Chaque gant moto est certifié et testé en laboratoire : résistance à l\'abrasion, à la déchirure et à l\'impact. La protection n\'est pas une option, c\'est la base.',
    icon: '<path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
    img: IMG + '2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus01.jpg' },
  { title: 'Coque réactive', tag: 'Carbone & TPU',
    desc: 'Coques de protection métacarpiennes et slider de paume en carbone et TPU : souples au repos, fermes à l\'impact. L\'énergie d\'une chute est absorbée, pas transmise.',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    img: IMG + '2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus02.jpg' },
  { title: 'Cuir & préhension', tag: 'Cuir de chèvre · Hi-Res Grip™',
    desc: 'Cuir sélectionné, mesh aéré et impression Hi-Res Grip™ sur la paume pour une adhérence parfaite aux poignées. Du toucher, du grip, sur la durée.',
    icon: '<path d="M4 14c4-6 12-6 16 0"/><path d="M4 14c4 6 12 6 16 0"/><circle cx="12" cy="14" r="2"/>',
    img: IMG + '2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus03.jpg' },
  { title: 'Tactile & connecté', tag: 'Touch Screen™',
    desc: 'Index et pouce compatibles écrans tactiles : GPS, intercom, smartphone — tu restes connecté sans jamais retirer tes gants.',
    icon: '<rect x="7" y="3" width="10" height="18" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>',
    img: IMG + '2025/09/FIVE-MOTO-RACING-PERFORMANCE-rfx2-evo-black-white-focus04.jpg' },
];

const MARQUEE_ITEMS = [
  'Livraison offerte dès 80€',
  'Retours gratuits sous 30 jours',
  'Paiement sécurisé 3D Secure',
  'Expédition sous 24h',
  'Conçu en France',
];

/* Catégories moto (univers) — images lifestyle depuis five-gloves.com */
const CATEGORIES = [
  { slug: 'racing',          name: 'Racing',          tag: 'Piste & circuit',   desc: 'Le plus haut niveau de protection pour la piste : coques carbone, cuir pleine fleur et construction pensée pour la vitesse.', img: IMG + '2025/09/CARRASCO-ACTION.jpg' },
  { slug: 'street',          name: 'Street',          tag: 'Roadster & sport',  desc: 'Des gants sport-touring polyvalents, protecteurs et confortables pour avaler la route au quotidien.', img: IMG + '2026/02/FIVE-MOTO-STREET-RSX-RED-ACTION-23.jpg' },
  { slug: 'urban',           name: 'Urban',           tag: 'Ville & quotidien', desc: 'Compacts et discrets, taillés pour la ville et les trajets de tous les jours sans sacrifier la sécurité.', img: IMG + '2025/09/FIVE-MOTO-URBAN-spark-khaki-action01.jpg' },
  { slug: 'custom',          name: 'Custom',          tag: 'Cruiser & vintage', desc: 'Cuir sélectionné et style vintage pour rouler en custom avec allure et caractère.', img: IMG + '2025/09/FIVE-MOTO-CUSTOM-montana-waxed-brown-action04.jpg' },
  { slug: 'trail-adventure', name: 'Trail Adventure', tag: 'Aventure & GT',     desc: 'Robustes et respirants, conçus pour le maxi-trail et les longues échappées, de l\'asphalte au chemin.', img: IMG + '2025/09/FIVE-MOTO-TRAIL-ADVENTURE-tfx1-gtx-grey-grey-red-action01.jpg' },
  { slug: 'touring',         name: 'Touring',         tag: 'Grands trajets',    desc: 'Le confort longue distance : membranes étanches, préhension et protection pour enchaîner les kilomètres.', img: IMG + '2025/09/FIVE-MOTO-TOURING-gt1-evo-gtx-black-action02.jpg' },
  { slug: 'winter',          name: 'Winter',          tag: 'Froid & pluie',     desc: 'Chaleur et étanchéité face au froid et à la pluie, sans perdre en sensibilité.', img: IMG + '2025/09/FIVE-MOTO-WINTER_GTX-wfx-skin-evo-gtx-brown-action02.jpg' },
  { slug: 'heat-technology', name: 'Heat Technology', tag: 'Gants chauffants',  desc: 'La technologie chauffante FIVE pour garder les mains au chaud, même par grand froid.', img: IMG + '2025/09/FIVE-MOTO-HEAT-TECHNOLOGY-hg-prime-evo-gtx-black-action02.jpg' },
  { slug: 'woman',           name: 'Woman',           tag: 'Coupe femme',       desc: 'Des coupes spécifiquement étudiées pour la main féminine, sans compromis sur la protection.', img: IMG + '2025/09/FIVE-MOTO-WOMAN-RACING-rfx-sport-evo-woman-red-action01.jpg' },
  { slug: 'off-road',        name: 'Off-Road',        tag: 'Cross & enduro',    desc: 'Légèreté, grip et liberté de mouvement pour le cross, l\'enduro et le tout-terrain.', img: IMG + '2025/09/FIVE-MOTO-OFF-ROAD-MX-mxf-race-red-action03.jpg' },
];
