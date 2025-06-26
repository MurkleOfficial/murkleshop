
let cart = [];

document.querySelectorAll('button[data-name]').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'), 10);
    cart.push({ name, price });
    updateCart();
  });
});

function updateCart() {
  const list = document.getElementById('cart-list');
  const total = document.getElementById('total');
  list.innerHTML = '';
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price}₽`;
    list.appendChild(li);
    sum += item.price;
  });
  total.textContent = `Итого: ${sum}₽`;
}

function checkout() {
  const user = prompt("Введите свой Telegram (@username):");
  if (!user || !user.startsWith('@')) {
    alert("Пожалуйста, укажите корректный юзернейм через @");
    return;
  }

  const message = cart.map(item => `• ${item.name} — ${item.price}₽`).join('%0A');
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const text = `🛒 Новый заказ от ${user}:%0A${message}%0A%0AИтого: ${total}₽`;

  const token = '7570989620:AAHU8nKxVo9g23_A5s4j4TwcF-02tBgqwiY';
  const chat_id = '8166788823';
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`;

  fetch(url).then(() => {
    alert("Заказ отправлен в Telegram!");
    cart = [];
    updateCart();
  }).catch(() => {
    alert("Ошибка при отправке заказа");
  });
}
