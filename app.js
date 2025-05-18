import { categories, products } from './data.js';

document.addEventListener('DOMContentLoaded', function () {
  const categoriesContainer = document.querySelector('#categories');
  const productList = document.querySelector('#product-list');
  const productCategoryTitle = document.querySelector(
    '#product-category-title'
  );
  const itemsSelectedContainer = document.querySelector('.items_selected');
  const totalPriceElement = document.querySelector('#total-price');
  const inputNumber = document.querySelector('.inputNumber');

  const overviewPage = document.querySelector('.overview_page');
  const submitOrderButton = document.querySelector(
    'button[data-i18n="confirm_order"]'
  );
  const printButton = document.querySelector(
    'button[data-i18n="imprimer_ticket"]'
  );

  printButton.addEventListener('click', (e) => {
    e.stopPropagation();
    printTicket();
  });

  overviewPage.addEventListener('click', (e) => {
    overviewPage.style.display = 'none'; // Hidden the overview page
    document.body.classList.remove('no-scroll');
  });
  submitOrderButton.addEventListener('click', () => {
    if (Object.keys(cart).length > 0) {
      displayOverviewPage();
    } else {
      alert('Your cart is empty!');
    }
  });

  function displayOverviewPage() {
    overviewPage.style.display = 'flex'; // Show the overview page
    document.body.classList.add('no-scroll');
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
    const cartContainer = overviewPage.querySelector('.cart_container');
    cartContainer.innerHTML = '<h1>Ma commande</h1>';
    let totalAmount = 0; // Initialize total amount

    Object.values(cart).forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item_selected';

      const quantitySpan = document.createElement('span');
      quantitySpan.className = 'item_quantity';
      quantitySpan.textContent = `${item.quantity} X`;

      const nameSpan = document.createElement('span');
      nameSpan.className = 'item_name';
      nameSpan.textContent = item.name[document.documentElement.lang];

      const priceSpan = document.createElement('span');
      priceSpan.className = 'item_price';
      priceSpan.textContent = `${item.price * item.quantity} DH`;

      itemDiv.appendChild(quantitySpan);
      itemDiv.appendChild(nameSpan);
      itemDiv.appendChild(priceSpan);
      cartContainer.appendChild(itemDiv);

      totalAmount += item.price * item.quantity;
    });

    // Add total amount to the cart container
    const totalAmountDiv = document.createElement('div');
    totalAmountDiv.className = 'total_amount';
    totalAmountDiv.textContent = `Total de commande: ${totalAmount} DH`;
    cartContainer.appendChild(totalAmountDiv);
  }

  let cart = {};
  function updateCategories(lang) {
    categoriesContainer.innerHTML = ''; // Clear existing categories
    categories.forEach((category) => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'product';
      const categoryImg = document.createElement('img');
      categoryImg.src = category.img;
      categoryImg.alt = category.name[lang];
      categoryImg.addEventListener('click', (e) => {
        e.preventDefault();
        categoriesContainer
          .querySelectorAll('a')
          .forEach((link) => link.classList.remove('clicked'));
        link.classList.add('clicked'); // Add active class to the clicked link
        displayProducts(category.id, lang);
      });
      categoryDiv.appendChild(categoryImg);
      productList.appendChild(categoryDiv);

      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('data-i18n', category.id);
      link.textContent = category.name[lang];
      link.addEventListener('click', (e) => {
        e.preventDefault();
        categoriesContainer
          .querySelectorAll('a')
          .forEach((link) => link.classList.remove('clicked')); // Remove active class from all lin
        link.classList.add('clicked'); // Add active class to the clicked link
        displayProducts(category.id, lang);
      }); // Add event listener to the lin
      categoriesContainer.appendChild(link);
    });
  }

  function displayProducts(categoryId, lang) {
    productList.innerHTML = ''; // Clear existing products
    productCategoryTitle.textContent = categories.find(
      (category) => category.id === categoryId
    ).name[lang];
    const categoryProducts = products[categoryId];
    categoryProducts.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      const productImg = document.createElement('img');
      productImg.src = product.img;
      productImg.alt = product.name[lang];
      productImg.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(product, lang);
      });
      productDiv.appendChild(productImg);
      productList.appendChild(productDiv);
    });
  }

  function addToCart(product, lang) {
    if (cart[product.id]) {
      cart[product.id].quantity += 1;
    } else {
      cart[product.id] = { ...product, quantity: 1 };
    }
    updateCartDisplay(lang);
  }

  function updateCartDisplay(lang) {
    itemsSelectedContainer.innerHTML = '';
    let totalPrice = 0; // Clear existing items
    Object.values(cart).forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item_selected';
      const itemName = document.createElement('span');
      itemName.className = 'item_name';
      itemName.textContent = item.name[lang];
      const quantityDiv = document.createElement('div');
      quantityDiv.className = 'quantity';
      const decrementButton = document.createElement('button');
      decrementButton.textContent = '-';
      decrementButton.onclick = () => changeQuantity(item.id, -1, lang);
      const quantitySpan = document.createElement('span');
      quantitySpan.id = `quantity-${item.id}`;
      quantitySpan.textContent = item.quantity;
      const incrementButton = document.createElement('button');
      incrementButton.textContent = '+';
      incrementButton.onclick = () => changeQuantity(item.id, 1, lang);
      const itemPrice = document.createElement('span');
      itemPrice.className = 'item_price';
      itemPrice.textContent = `${item.price * item.quantity} `;
      const currency = document.createElement('span');
      currency.setAttribute('data-i18n', 'mad');
      currency.textContent = translations[lang]['mad']; // Use the translation for the currency
      itemPrice.appendChild(currency);

      const removeItemButton = document.createElement('span');
      removeItemButton.className = 'remove_item';
      removeItemButton.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" fill="#a1092f"></path> </g></svg>`;
      removeItemButton.onclick = () => removeItem(item.id, lang);

      totalPrice += item.price * item.quantity;

      quantityDiv.appendChild(decrementButton);
      quantityDiv.appendChild(quantitySpan);
      quantityDiv.appendChild(incrementButton);
      itemDiv.appendChild(itemName);
      itemDiv.appendChild(quantityDiv);
      itemDiv.appendChild(itemPrice);
      itemDiv.appendChild(removeItemButton);
      itemsSelectedContainer.appendChild(itemDiv);
    });
    totalPriceElement.textContent = `${totalPrice} DH`;
  }

  function ShowItemsInCart(lang) {
    itemsSelectedContainer.innerHTML = '';
    let totalPrice = 0; // Clear existing items
    Object.values(cart).forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item_selected';
      const itemName = document.createElement('span');
      itemName.className = 'item_name';
      itemName.textContent = item.name[lang];
      const quantityDiv = document.createElement('div');
      quantityDiv.className = 'quantity';
      const decrementButton = document.createElement('button');
      decrementButton.textContent = '-';
      decrementButton.onclick = () => changeQuantity(item.id, -1, lang);
      const quantitySpan = document.createElement('span');
      quantitySpan.id = `quantity-${item.id}`;
      quantitySpan.textContent = item.quantity;
      const incrementButton = document.createElement('button');
      incrementButton.textContent = '+';
      incrementButton.onclick = () => changeQuantity(item.id, 1, lang);
      const itemPrice = document.createElement('span');
      itemPrice.className = 'item_price';
      itemPrice.textContent = `${item.price * item.quantity} DH`;

      totalPrice += item.price * item.quantity;

      quantityDiv.appendChild(decrementButton);
      quantityDiv.appendChild(quantitySpan);
      quantityDiv.appendChild(incrementButton);
      itemDiv.appendChild(itemName);
      itemDiv.appendChild(quantityDiv);
      itemDiv.appendChild(itemPrice);
      itemsSelectedContainer.appendChild(itemDiv);
    });
    totalPriceElement.textContent = `${totalPrice} DH`;
  }

  function changeQuantity(productId, change, lang) {
    if (cart[productId]) {
      cart[productId].quantity += change;
      if (cart[productId].quantity <= 0) {
        delete cart[productId];
      }
      updateCartDisplay(lang);
    }
  }

  function removeItem(productId, lang) {
    delete cart[productId];
    updateCartDisplay(lang);

    if (cartIsEmpty()) {
      showEmptyCartMessage(lang);
    }
  }

  function showEmptyCartMessage(lang) {
    itemsSelectedContainer.innerHTML = '';
    // Display message if cart is empty
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Votre panier est vide.';
    emptyMessage.setAttribute('data-i18n', 'cart_vide');
    itemsSelectedContainer.appendChild(emptyMessage);
  }

  const cartIsEmpty = () => {
    return Object.keys(cart).length === 0;
  };

  // Initialize categories with the default language
  updateCategories(document.documentElement.lang || 'fr');
});
