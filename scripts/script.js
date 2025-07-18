
const cart = [];
const cartList = document.getElementById('cart-list');
const totalDisplay = document.getElementById('total');

function updateCart() {
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price}₽`;
    cartList.appendChild(li);
    total += item.price;
  });
  totalDisplay.textContent = `Итого: ${total}₽`;
}

function checkout() {
  if (cart.length === 0) return alert("Корзина пуста!");
  alert("Оформление пока недоступно. Следите за обновлениями!");
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.product');
    const name = parent.getAttribute('data-name');
    const price = parseInt(parent.getAttribute('data-price'));
    cart.push({ name, price });
    updateCart();
  });
});
