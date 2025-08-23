// cart.js

window.onload = function () {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceSpan = document.getElementById("total-price");

  if (cartContainer) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is currently empty.</p>";
      if (totalPriceSpan) totalPriceSpan.textContent = "0";
    } else {
      cartContainer.innerHTML = "";
      cartItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <h4>${item.name}</h4>
          <p>Price: ₹${item.price}</p>
        `;
        cartContainer.appendChild(itemDiv);
        total += Number(item.price);
      });
      if (totalPriceSpan) totalPriceSpan.textContent = total;
    }
  } else {
    console.warn("🟡 'cart-items' container not found on this page. Skipping cart rendering.");
  }
};
