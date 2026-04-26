let cart = JSON.parse(localStorage.getItem('blink182_cart')) || [];
const saveCart = () => {
    localStorage.setItem('blink182_cart', JSON.stringify(cart));
};
const buttons = document.querySelectorAll('.add-to-cart');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        const product = event.target.closest('.product');

        const name = product.dataset.name;
        const price = product.dataset.price;
        console.log(name, price);

        const item = {
            name: name,
            price: Number(price)
        };
        cart.push(item);
        saveCart();
        console.log(cart);
        updateCart();
    });
});

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    cartList.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name + ' - ' + item.price;

        cartList.appendChild(li);

        total += item.price;
    });

    totalElement.textContent = 'Итого: ' + total;
}

document.getElementById('clear-cart').addEventListener('click', function() {
    cart = [];
    saveCart();
    updateCart();
});

document.getElementById('checkout').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Корзина пуста');
    } else {
        alert('Оплата выполнена');
        cart = [];
        saveCart();
        updateCart();
    }
});

const filter = document.getElementById('filter');

filter.addEventListener('change', function() {
    const value = filter.value;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        if (value === 'all' || product.dataset.category === value) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

updateCart();