import { categories, products, options } from './data.js';
// import { printTicket } from './printServer.js';

document.addEventListener('DOMContentLoaded', function () {
  let cart = {};
  let orderNumber = 1;
  const categoriesContainer = document.querySelector('#categories');
  const productList = document.querySelector('#product-list');
  const itemsSelectedContainer = document.querySelector('.items_selected');
  const totalPriceElement = document.querySelector('#total-price');
  const overviewPage = document.querySelector('.overview_page');
  const overviewPageGaufres = document.querySelector('.overview_page_gaufres');
  const overviewPageGaufresMix = document.querySelector(
    '.overview_page_gaufres_mix'
  );
  const submitOrderButton = document.querySelector(
    'button[data-i18n="confirm_order"]'
  );
  const printButton = document.querySelector(
    'button[data-i18n="imprimer_ticket"]'
  );

  document.querySelectorAll('#navLink_lang').forEach((link) =>
    link.addEventListener('click', () => {
      const link = document.querySelectorAll('#categories a');
      link.forEach((link) => link.classList.remove('clicked'));
      link[0].classList.add('clicked');
      displayProducts(
        categories[0].id,
        document.documentElement.lang,
        categories[0].epuise
      );
    })
  );

  printButton.addEventListener('click', async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch('http://localhost:3000/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          orderType:
            document.body.getAttribute('data-commande-type') || 'Not selected',
          items: Object.values(cart),
          totalPrice: Object.values(cart).reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log('Print successful');
      } else {
        console.error('Print failed:', result.error);
      }
    } catch (err) {
      console.error('Error calling print API:', err);
    }
  });

  overviewPage.addEventListener('click', (e) => {
    overviewPage.style.display = 'none'; // Hidden the overview page
    document.body.classList.remove('no-scroll');
  });
  overviewPageGaufres.addEventListener('click', (e) => {
    overviewPageGaufres.style.display = 'none';
    document.body.classList.remove('no-scroll');
  });
  overviewPageGaufresMix.addEventListener('click', (e) => {
    overviewPageGaufresMix.style.display = 'none';
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
    let totalAmount = 0; // Initialize total amount

    const cartContainer = overviewPage.querySelector('.cart_container');
    cartContainer.innerHTML = '<h1>Ma commande</h1>';
    const orderHeading = document.createElement('h2');
    orderHeading.className = 'order_number';
    orderHeading.textContent = `Votre Nº d'ordre: ${orderNumber}`;
    cartContainer.appendChild(orderHeading);

    // Add user's choice below 'Ma commande'
    const commandeType = document.body.getAttribute('data-commande-type');
    const userChoice = commandeType || 'Not selected';
    const choiceElement = document.createElement('p');
    choiceElement.className = 'user_choice';
    choiceElement.textContent = `Choix: ${userChoice}`;
    cartContainer.appendChild(choiceElement);

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
        displayProducts(category.id, lang, category.epuise);
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
        displayProducts(category.id, lang, category.epuise);
      }); // Add event listener to the lin
      categoriesContainer.appendChild(link);
    });
  }

  function displayProducts(categoryId, lang, epuise = 1) {
    productList.innerHTML = ''; // Clear existing products
    // productCategoryTitle.textContent = categories.find(
    //   (category) => category.id === categoryId
    // ).name[lang];
    const categoryProducts = products[categoryId];
    categoryProducts.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      const productImg = document.createElement('img');
      productImg.src = product.img;
      productImg.alt = product.name[lang];

      if (epuise === 0) {
        productImg.style.opacity = '0.5';
        const outOfStockBadge = document.createElement('div');
        outOfStockBadge.textContent = 'Épuisé';
        outOfStockBadge.className = 'out-of-stock-overlay';
        productDiv.appendChild(outOfStockBadge);
      }

      productImg.addEventListener('click', (e) => {
        e.preventDefault();
        if (epuise === 0) return;
        if (categoryId === 'gaufres' && epuise !== 0) {
          if (product.id === 'gaufre-mixte' && epuise !== 0) {
            showPopup(product, lang, true); // Pass a flag for mix
          } else {
            showPopup(product, lang, false);
          }
        } else if (categoryId === 'churros_sucres') {
          handleChurrosSucresClick(product, lang);
        } else {
          addToCart(product, lang);
        }
      });
      productDiv.appendChild(productImg);
      productList.appendChild(productDiv);
    });
  }

  function showPopup(product, lang, isMix) {
    const popup = isMix
      ? document.querySelector('.overview_page_gaufres_mix')
      : document.querySelector('.overview_page_gaufres');
    popup.style.display = 'flex';

    const popupContent = popup.querySelector('.popup_container');
    const closeIcon = popup.querySelector('.popup_container .closeIcon');

    popupContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    closeIcon.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    const supplementOptionsContainer = popup.querySelector(
      '.popup-content_gaufres'
    );
    supplementOptionsContainer.innerHTML = ''; // Clear existing options

    // Dynamically create supplement options
    options.gaufres.forEach((optData) => {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('option');
      optionDiv.dataset.price = optData.price;
      optionDiv.dataset.epuise = optData.epuise;

      if (optData.epuise === 0) {
        optionDiv.classList.add('outOfStock');
      }

      const span = document.createElement('span');
      span.textContent = optData.name[lang];
      optionDiv.appendChild(span);

      if (optData.price > 0) {
        optionDiv.innerHTML += ` +${optData.price}dh`;
      }

      supplementOptionsContainer.appendChild(optionDiv);
    });

    const supplementOptions = popup.querySelectorAll(
      '.popup-content_gaufres .option'
    );
    const choiceOptions = popup.querySelectorAll(
      '.popup-content_gaufres_choix .option'
    );
    const choiceError = popup.querySelector('.choice-error');

    // Clear previous selections
    supplementOptions.forEach((opt) => opt.classList.remove('selected'));
    choiceOptions.forEach((opt) => opt.classList.remove('selected'));

    supplementOptions.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log(
          '🚀 ~ option.addEventListener ~ option.epuise:',
          option.epuise
        );

        if (option.epuise === '0') {
          return; // Prevent selection if out of stock
        }
        const name = option.textContent.trim().toLowerCase();
        if (name.includes('sans')) {
          // Check for 'sans' in any language
          // Deselect all if 'Sans' is selected
          supplementOptions.forEach((opt) => opt.classList.remove('selected'));
          option.classList.add('selected');
        } else {
          // If 'Sans' was selected, deselect it
          supplementOptions.forEach((opt) => {
            if (opt.textContent.trim().toLowerCase().includes('sans')) {
              opt.classList.remove('selected');
            }
          });
          option.classList.toggle('selected');
        }
      });
    });

    choiceOptions.forEach((option) => {
      option.onclick = (e) => {
        e.stopPropagation();
        const selectedChoices = Array.from(choiceOptions).filter((opt) =>
          opt.classList.contains('selected')
        );

        if (
          selectedChoices.length < 2 ||
          option.classList.contains('selected')
        ) {
          option.classList.toggle('selected');
        }
        // ✅ Clear error if one or two are selected
        const updatedChoices = Array.from(choiceOptions).filter((opt) =>
          opt.classList.contains('selected')
        );
        if (updatedChoices.length > 0 && updatedChoices.length <= 2) {
          choiceError.style.display = 'none';
          choiceOptions.forEach((opt) => (opt.style.border = ''));
        }
      };
    });

    let oldButton = popup.querySelector('.validate_gauffre');
    let newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);

    newButton.addEventListener(
      'click',
      (function (currentProduct) {
        return function () {
          const selectedSupplement = Array.from(supplementOptions).filter(
            (opt) => opt.classList.contains('selected')
          );

          const selectedChoices = Array.from(choiceOptions).filter((opt) =>
            opt.classList.contains('selected')
          );

          if (
            isMix &&
            (selectedChoices.length === 0 || selectedChoices.length > 2)
          ) {
            choiceError.style.display = 'block';
            choiceOptions.forEach((opt) => {
              if (!opt.classList.contains('selected')) {
                opt.style.border = '1px solid red';
              }
            });
            return; // Prevent closing the popup
          }

          let additionalPrice = 0;
          let optionNames = [];

          selectedSupplement.forEach((supplement) => {
            if (supplement.dataset.epuise === '0') {
              return; // Skip out of stock items when calculating price and adding to cart
            }
            const span = supplement.querySelector('span');
            const name = span
              ? span.textContent.trim()
              : supplement.textContent.trim();

            if (!name.toLowerCase().includes('sans')) {
              additionalPrice += parseInt(supplement.dataset.price);
              optionNames.push(name);
            }
          });

          selectedChoices.forEach((selectedChoice) => {
            additionalPrice += parseInt(selectedChoice.dataset.price);
            optionNames.push(selectedChoice.textContent.trim());
          });

          const optionKey = optionNames
            .join('-')
            .toLowerCase()
            .replace(/\s+/g, '');
          const uniqueId = `${currentProduct.id}-${optionKey || 'default'}`;

          const productClone = {
            ...currentProduct,
            id: uniqueId,
            price: currentProduct.price + additionalPrice,
            name: {
              ...currentProduct.name,
              [lang]: `${currentProduct.name[lang]} ${
                optionNames.length > 0 ? `${optionNames.join(' ')}` : ''
              }`,
            },
          };

          addToCart(productClone, lang);
          popup.style.display = 'none';
          supplementOptions.forEach((option) => {
            const newOption = option.cloneNode(true);
            option.parentNode.replaceChild(newOption, option);
          });

          choiceOptions.forEach((opt) => opt.classList.remove('selected'));
          choiceError.style.display = 'none';
          choiceOptions.forEach((opt) => (opt.style.border = ''));
        };
      })(product)
    );
  }

  function handleChurrosSucresClick(product, lang) {
    const popup = document.querySelector('.overview_page_churros_sucres');
    const popupContent = document.querySelector(
      '.overview_page_churros_sucres .popup_container'
    );
    const closeIcon = document.querySelector(
      '.overview_page_churros_sucres .popup_container .closeIcon'
    );

    closeIcon.addEventListener('click', () => {
      popup.style.display = 'none';
    });
    popup.addEventListener('click', () => {
      popup.style.display = 'none';
    });
    popupContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    popup.style.display = 'flex';

    const supplementOptions = popup.querySelectorAll(
      '.popup-content_gaufres .option'
    );

    supplementOptions.forEach((opt) => opt.classList.remove('selected'));

    supplementOptions.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        supplementOptions.forEach((opt) => opt.classList.remove('selected'));
        option.classList.add('selected');
      });
    });

    const oldButton = popup.querySelector('.validate_gauffre');
    const newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);

    newButton.addEventListener('click', () => {
      const selectedOption = Array.from(supplementOptions).find((opt) =>
        opt.classList.contains('selected')
      );

      const optionKey = selectedOption.textContent.trim().toLowerCase();
      const uniqueId = `${product.id}-${optionKey || 'default'}`;

      const clone = {
        ...product,
        id: uniqueId,
        name: {
          ...product.name,
        },
      };

      if (
        selectedOption &&
        selectedOption.textContent.trim() === 'Sans Sucre'
      ) {
        clone.name[lang] = `${product.name[lang]} (Sans Sucre)`;
      }

      addToCart(clone, lang);
      popup.style.display = 'none';
      supplementOptions.forEach((opt) => opt.classList.remove('selected'));
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
      removeItemButton.innerHTML = `<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" fill="#a1092f"></path> </g></svg>`;
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

  function displayCheckedMark() {
    const contentOfPage = document.querySelector(
      '.overview_page .popup_container'
    );
    const overviewPage = document.createElement('div');
    overviewPage.className = 'overview_page_checked';
    overviewPage.style.display = 'flex';
    const checkedMark = document.createElement('video');
    checkedMark.src = 'images/checkedMark1.webm';
    checkedMark.className = 'checked';
    checkedMark.style.width = '300px';
    checkedMark.autoplay = true;
    checkedMark.loop = false;
    checkedMark.muted = true;
    checkedMark.playsInline = true;
    overviewPage.appendChild(checkedMark);
    contentOfPage.appendChild(overviewPage);

    setTimeout(() => {
      overviewPage.style.display = 'none';
      checkedMark.src = '';
    }, 4000);
  }

  // Initialize categories with the default language
  updateCategories(document.documentElement.lang || 'fr');
});
