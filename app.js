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
  const numberSpans = document.querySelectorAll('.number span');

  numberSpans.forEach((span) => {
    span.addEventListener('click', () => {
      inputNumber.value += span.dataset.number;
    });
  });

  let cart = {};
  function updateCategories(lang) {
    categoriesContainer.innerHTML = ''; // Clear existing categories
    categories.forEach((category) => {
      const link = document.createElement('a');
      link.href = '#';
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
    console.log('🚀 ~ cart:', cart);
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

  // Initialize categories with the default language
  updateCategories(document.documentElement.lang || 'fr');
});
