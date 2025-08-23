// Add product to cart and update cart count
function addToCart(productName) {
  fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.name === productName);
      if (!product) return alert('Product not found!');
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
      // Update cart count badge if present
      if (window.updateCartCount) window.updateCartCount();
      const badge = document.getElementById('cart-count');
      if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'inline-block' : 'none';
      }
    });
}
// products.js
fetch("data/products.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load products.json");
    }
    return response.json();
  })
  .then(products => {
    const container = document.getElementById("products");
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="assets/products/${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("❌ Error loading products:", error);
    const container = document.getElementById("products");
    if (container) {
      container.innerHTML = `<p style='color: red;'>Failed to load products. Check console for details.</p>`;
    }
  });
