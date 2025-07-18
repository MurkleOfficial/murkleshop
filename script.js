let cart = [];

function addToCart(name, price) {
  const item = { name, price };
  cart.push(item);
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const total = document.getElementById("total");
  cartList.innerHTML = "";
  let sum = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price}₽`;
    const del = document.createElement("button");
    del.textContent = "✕";
    del.onclick = () => {
      cart.splice(index, 1);
      renderCart();
    };
    li.appendChild(del);
    cartList.appendChild(li);
    sum += item.price;
  });

  total.textContent = `Итого: ${sum}₽`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Корзина пуста.");
    return;
  }

  const username = prompt("Введите свой Telegram юзернейм:");
  if (!username) return;

  let message = `🛍 Новый заказ от @${username}\n\n`;
  cart.forEach(item => {
    message += `• ${item.name} — ${item.price}₽\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `\nИтого: ${total}₽`;

  fetch(`https://api.telegram.org/bot7570989620:AAHU8nKxVo9g23_A5s4j4TwcF-02tBgqwiY/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: 8166788823,
      text: message
    })
  })
  .then(response => {
    if (response.ok) {
      alert("Заказ отправлен! Мы скоро свяжемся с вами.");
      cart = [];
      renderCart();
    } else {
      alert("Ошибка при отправке заказа. Попробуйте позже.");
    }
  });
}
