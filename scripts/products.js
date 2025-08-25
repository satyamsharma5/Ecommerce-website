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
let allProducts = [];
let filteredProducts = [];

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  if (products.length === 0) {
    container.innerHTML = `<p style='color: red; font-size:1.2em; text-align:center;'>No results found.</p>`;
    return;
  }
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
}

function handleSearch() {
  const query = document.getElementById("search-bar").value.trim().toLowerCase();
  filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (p.description && p.description.toLowerCase().includes(query))
  );
  renderProducts(filteredProducts);
}

function handleSort(order) {
  if (order === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (order === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  renderProducts(filteredProducts);
}

fetch("data/products.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load products.json");
    }
    return response.json();
  })
  .then(products => {
    allProducts = products;
    filteredProducts = [...allProducts];
    renderProducts(filteredProducts);
    // Search bar event
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.addEventListener("input", handleSearch);
    }
    // Add sort dropdown
    const header = document.querySelector(".products-section h2");
    if (header && !document.getElementById("sort-select")) {
      const sortSelect = document.createElement("select");
      sortSelect.id = "sort-select";
      sortSelect.style.marginLeft = "16px";
      sortSelect.innerHTML = `
        <option value="">Sort by</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      `;
      sortSelect.addEventListener("change", function() {
        handleSort(this.value);
      });
      header.appendChild(sortSelect);
    }
  })
  .catch(error => {
    console.error("❌ Error loading products:", error);
    const container = document.getElementById("products");
    if (container) {
      container.innerHTML = `<p style='color: red;'>Failed to load products. Check console for details.</p>`;
    }
  });
