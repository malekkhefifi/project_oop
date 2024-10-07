class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(new ShoppingCartItem(product, 1));
        }
        this.updateCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateCart();
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.product.name} - ${item.quantity} pcs - Total: ${item.getTotalPrice().toFixed(2)} €`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => this.removeItem(item.product.id);
            itemElement.appendChild(removeButton);
            cartItemsContainer.appendChild(itemElement);
        });

        document.getElementById('total-price').textContent = `Total: ${this.getTotalPrice().toFixed(2)} €`;
        document.getElementById('cart-count').textContent = this.getTotalItems();
    }
}

// Instantiate the shopping cart
const shoppingCart = new ShoppingCart();

// Event listeners for adding products to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productId = parseInt(productElement.dataset.id);
        const productName = productElement.dataset.name;
        const productPrice = parseFloat(productElement.dataset.price);

        const product = new Product(productId, productName, productPrice);
        shoppingCart.addItem(product);
    });
});
