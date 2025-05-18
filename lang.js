const translations = {
  fr: {
    start_order: 'Commander',
    back: 'Retour',
    your_order: 'Votre commande',
    name_or_number: 'Nom ou Numéro :',
    confirm_order: 'Valider la commande',
    thank_you: 'Merci pour votre commande !',
    order_received: 'Votre commande a été enregistrée.',
    new_order: 'Nouvelle commande',
    my_menu: 'Mon menu',
    imprimer_ticket: 'Imprimer le ticket',
    total: 'Total',
    cart_vide: 'Le panier est vide',
    mad: 'DH',
    gaufres: 'Gaufres',
    churros_sucres: 'Churros sucrés',
    churros_sales: 'Churros salés',
    dessert: 'Dessert',
    backToMenu: 'Revenir au menu',
    categories: 'Choisir une catégorie',
    changer_langue: 'Changer langue',
  },
  ar: {
    start_order: 'اطلب الآن',
    back: 'رجوع',
    your_order: 'طلبك',
    name_or_number: 'الاسم أو الرقم:',
    confirm_order: 'تأكيد الطلب',
    thank_you: 'شكراً لطلبك!',
    order_received: 'تم تسجيل طلبك.',
    new_order: 'طلب جديد',
    my_menu: 'القائمة',
    imprimer_ticket: 'طباعة التذكرة',
    total: 'المجموع',
    cart_vide: 'السلة فارغة',
    mad: 'د.ج',
    gaufres: 'وافيل',
    churros_sucres: 'تشوروز حلو',
    churros_sales: 'تشوروز مالح',
    dessert: 'حلويات',
    backToMenu: 'العودة إلى القائمة',
    categories: 'اختر فئة',
    changer_langue: 'تغيير اللغة',
  },
};

let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;

  if (!currentLang) {
    document.getElementById('langPage').classList.remove('hidden');
    document.querySelector('.main_section').classList.add('hidden');
  } else {
    document.getElementById('langPage').classList.add('hidden');
    document.querySelector('.main_section').classList.remove('hidden');
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.innerText = translations[lang][key] || key;
  });

  const yourOrder = document.querySelector('[data-i18n="your_order"]');
  const contentMenu = document.querySelector('.container_items_selected');
  const totalCommande = document.querySelector('.total_commande');
  const titleCategory = document.getElementById('product-category-title');

  if (lang === 'ar') {
    contentMenu.setAttribute('dir', 'rtl');
    yourOrder.setAttribute('dir', 'rtl');
    titleCategory.setAttribute('dir', 'rtl');
    totalCommande.style.flexDirection = 'row-reverse';
  } else {
    contentMenu.removeAttribute('dir');
    yourOrder.removeAttribute('dir');
    titleCategory.removeAttribute('dir');
    totalCommande.style.flexDirection = 'row';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setLang(''); // ou "ar" pour l'arabe
});
