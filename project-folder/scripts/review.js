// list of items (name, price, image) 
const items = [
  {id: "haribos", name: "Gummy Bears", price: 2.99, image: "images/haribos.jpg" },
  {id: "skittles", name: "Skittles", price: 1.99, image: "images/skittles.jpg" },
  {id: "m&m", name: "M&M's", price: 1.99, image: "images/M&M's.jpg" },
  {id: "snickers", name: "Snickers", price: 1.25, image: "images/snickers.jpg" }

];

const cart = {};

const $ = id => document.getElementById(id);

// Maintain the contents of items for sale and the shopping cart in their own variables,
// not just as html elements on the page. Stored in items-list container.
function renderItems() {
  $("items-list").innerHTML = items.map(item => `
    <div class="item">
      <img src = "${item.image}" alt = "${item.name}">
      <p> <strong> ${item.name} </strong> </p>
      <p> $${item.price.toFixed(2)} </p>
      <button onclick = "addToCart('${item.id}')"> Add to Cart </button>
    </div>
  `).join('');
}

// add to cart button
function addToCart(id) {
  cart[id] = cart[id] || { ...items.find(i => i.id === id), quantity: 0 };
  cart[id].quantity++;
  renderCart();
}

// remove items frm the cart
function removeFromCart(id) {
  if (cart[id]) {
    cart[id].quantity--;
    if (cart[id].quantity <= 0) delete cart[id];
    renderCart();
  }
}

// add to cart total, and its functionality
function renderCart() {
  let total = 0;
  $("cart-contents").innerHTML = Object.values(cart).map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    // handles functionality with total of removing items from the cart
    return `
      <div class="cart-item">
        <p> ${item.name} x ${item.quantity} — $${itemTotal.toFixed(2)} </p>
        <button onclick = "removeFromCart('${item.id}')"> Remove One </button>
      </div>
    `;
  }).join('');
  $("total-price").textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", renderItems);
