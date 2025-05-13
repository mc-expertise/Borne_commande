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
    my_menu: 'قائمةي',
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
  // const html = document.querySelector('html');

  // if (lang === 'ar') {
  //   html.setAttribute('dir', 'rtl');
  // } else {
  //   html.removeAttribute('dir');
  // }
}

document.addEventListener('DOMContentLoaded', () => {
  setLang(''); // ou "ar" pour l'arabe
});
