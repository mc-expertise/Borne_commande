export const categories = [
  {
    id: 'gaufres',
    name: { fr: 'Gaufres', ar: 'وافيل' },
    img: 'images/gaufres_categ.png',
  },
  {
    id: 'churros_sucres',
    name: { fr: 'Churros Sucrés', ar: 'تشوروز حلو' },
    img: 'images/churros_categ.png',
  },
  {
    id: 'churros_sales',
    name: { fr: 'Churros Salés', ar: 'تشوروز مالح' },
    img: 'images/churros_sales_categ.png',
  },
  {
    id: 'tiramisú',
    name: { fr: 'Tiramisú', ar: 'حلويات' },
    img: 'images/tiramisu_categ.png',
  },
];

export const options = {
  gaufres: [
    { name: { fr: 'Sans', ar: 'بدون' }, price: 0, epuise: 1 },
    { name: { fr: 'Banane', ar: 'موز' }, price: 3, epuise: 1 },
    { name: { fr: 'Sweeties', ar: 'سويتيز' }, price: 1, epuise: 1 },
  ],
};

export const products = {
  gaufres: [
    {
      id: 'gaufre-chocolat',
      name: { fr: 'Gaufre Chocolat', ar: 'وافيل شوكولاتة' },
      price: 12,
      img: 'images/gaufre_chocolat.png',
      epuise: 1,
    },
    {
      id: 'gaufre-citron',
      name: { fr: 'Gaufre Citron', ar: 'وافيل ليمون' },
      price: 12,
      img: 'images/gaufre_citron.png',
      epuise: 1,
    },
    {
      id: 'gaufre-framboise',
      name: { fr: 'Gaufre Framboise', ar: 'وافيل توت' },
      price: 12,
      img: 'images/gaufre_framboise.png',
      epuise: 1,
    },
    {
      id: 'gaufre-caramel',
      name: { fr: 'Gaufre Caramel', ar: 'وافيل كراميل' },
      price: 12,
      img: 'images/gaufre_caramel.png',
      epuise: 0,
    },
    {
      id: 'gaufre-mixte',
      name: { fr: 'Gaufre Mixte', ar: 'وافيل مختلط (اختيارين)' },
      price: 12,
      img: 'images/gauffre_mixte.png',
      epuise: 1,
    },
  ],
  churros_sucres: [
    {
      id: 'churros-chocolat',
      name: { fr: 'Churros Chocolat', ar: 'تشوروز شوكولاتة' },
      price: 7,
      img: 'images/churros_chocolat.png',
      epuise: 0,
    },
    {
      id: 'churros-caramel',
      name: { fr: 'Churros Caramel', ar: 'تشوروز كراميل' },
      price: 7,
      img: 'images/churros_caramel.png',
      epuise: 1,
    },
    {
      id: 'churros-nature',
      name: { fr: 'Churros Nature', ar: 'تشوروز كراميل' },
      price: 7,
      img: 'images/churros_nature.png',
      epuise: 1,
    },
  ],
  churros_sales: [
    {
      id: 'dinde-fumee-9',
      name: { fr: 'Dinde Fumée 9 Uts', ar: 'ديك رومي مدخن 9 وحدات' },
      price: 16,
      img: 'images/churros_dinde_fumee_9.png',
      epuise: 1,
    },
    {
      id: 'dinde-fumee-5',
      name: { fr: 'Dinde Fumée 5 Uts', ar: 'ديك رومي مدخن 5 وحدات' },
      price: 10,
      img: 'images/churros_dinde_fumee_5.png',
      epuise: 0,
    },
    {
      id: 'fromage-herbes-9',
      name: { fr: 'Fromage aux Herbes 9 Uts', ar: 'جبن بالأعشاب 9 وحدات' },
      price: 14,
      img: 'images/churros_fromage_9.png',
      epuise: 1,
    },
    {
      id: 'fromage-herbes-6',
      name: { fr: 'Fromage aux Herbes 6 Uts', ar: 'جبن بالأعشاب 6 وحدات' },
      price: 10,
      img: 'images/churros_fromage_6.png',
      epuise: 1,
    },
  ],
  tiramisú: [
    {
      id: 'tiramisu-cafe',
      name: { fr: 'tiramisú Café', ar: 'تيراميسو قهوة' },
      price: 16,
      img: 'images/tiramisu_cafe.png',
      epuise: 1,
    },
    {
      id: 'tiramisu-citron',
      name: { fr: 'tiramisú Citron', ar: 'تيراميسو ليمون' },
      price: 16,
      img: 'images/tiramisu_citron.png',
      epuise: 0,
    },
  ],
};
