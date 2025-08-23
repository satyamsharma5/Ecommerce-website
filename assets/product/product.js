fetch("data/products_with_images.json")
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById("products");
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Failed to load products:", error);
  });
