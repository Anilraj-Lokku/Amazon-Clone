const renderProducts = (products) => {
  const productsHTML = products.map((product) => `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">${product.name}</div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>
      <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
      <div class="product-quantity-container">
        <select>
          ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
        </select>
      </div>
      <div class="product-spacer"></div>
      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `).join('');

  document.querySelector('.js-products-grid').innerHTML = productsHTML;
};

renderProducts(products);

document.querySelector('.js-products-grid').addEventListener('click', (event) => {
  if (event.target.classList.contains('js-add-to-cart')) {
    const productId = event.target.dataset.productId;
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ productId, quantity: 1 });
    }

    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.js-cart-quantity').textContent = cartQuantity;
  }
});
