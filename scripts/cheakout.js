
// Render cart items and total price on checkout page
function renderCheckoutCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;
  if (cartList) {
    cartList.innerHTML = "";
    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ₹${item.price}`;
      cartList.appendChild(li);
      total += Number(item.price);
    });
  }
  if (cartTotal) cartTotal.textContent = `₹${total}`;
}
document.addEventListener("DOMContentLoaded", renderCheckoutCart);

// Payment method dynamic UI
document.addEventListener("DOMContentLoaded", function() {
  const upiOptions = document.getElementById("upi-options");
  const upiIdInput = document.getElementById("upi-id-input");
  const paymentRadios = document.querySelectorAll('input[name="payment-method"]');
  const upiOptionRadios = document.getElementsByName("upi-option");

  function updatePaymentUI() {
    const selected = document.querySelector('input[name="payment-method"]:checked').value;
    document.getElementById("card-details").style.display = selected === "card" ? "block" : "none";
    upiOptions.style.display = selected === "upi" ? "block" : "none";
    upiIdInput.style.display = "none";
    document.getElementById("upi-details").style.display = "none";
    document.getElementById("cod-details").style.display = selected === "cod" ? "block" : "none";
    if (selected === "upi") {
      // Reset UPI option selection
      upiOptionRadios.forEach(r => r.checked = false);
    }
  }
  paymentRadios.forEach(radio => {
    radio.addEventListener("change", updatePaymentUI);
  });

  if (upiOptionRadios.length) {
    upiOptionRadios.forEach(radio => {
      radio.addEventListener("change", function() {
        if (radio.value === "upi-id") {
          upiIdInput.style.display = "block";
        } else {
          upiIdInput.style.display = "none";
        }
      });
    });
  }
  updatePaymentUI();
});

// Handle checkout form submit
document.getElementById("checkout-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const payment = document.querySelector('input[name="payment-method"]:checked').value;
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  // Save order details for success page
  localStorage.setItem("lastOrder", JSON.stringify({ name, address, payment, cartItems, total }));
  // Clear cart
  localStorage.removeItem("cart");
  window.location.href = "order-success.html";
});
