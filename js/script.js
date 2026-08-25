let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= CART COUNT =================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    let totalItems = 0;

    cart.forEach(product => {

        totalItems += product.quantity || 1;

    });

    cartCount.textContent = totalItems;
}


// ================= ADD TO CART =================

function addToCart(product) {

    const existingProduct =
        cart.find(item => item.id === product.id);

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Product added to cart!");

    showCart();
}


// ================= SHOW CART =================

function showCart() {

    const cartContainer =
        document.getElementById("cart-container");

    const cartTotal =
        document.getElementById("cart-total");

    if (!cartContainer) {
        return;
    }

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<p>Your cart is empty.</p>";

        if (cartTotal) {
            cartTotal.innerHTML = "";
        }

        updateCartCount();

        return;
    }

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        const quantity =
            product.quantity || 1;

        const itemTotal =
            product.price * quantity;

        total += itemTotal;

        const item =
            document.createElement("div");

        item.className =
            "text-center mx-auto my-4";

        item.style.maxWidth = "500px";

        item.innerHTML = `

            <div
                class="d-flex flex-column align-items-center"
            >

                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                    width="120"
                    class="mx-auto mb-3"
                    style="object-fit: contain;"
                >

                <h2>
                    ${product.title}
                </h2>

                <p>
                    Price: $${product.price}
                </p>

                <p>
                    Quantity: ${quantity}
                </p>

                <div class="mb-3">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        -
                    </button>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

                <button
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

                <p>
                    Product Total:
                    $${itemTotal.toFixed(2)}
                </p>

            </div>
        `;

        cartContainer.appendChild(item);
    });


    if (cartTotal) {

        cartTotal.innerHTML = `

            <div class="text-center">

                <h2>
                    Total: $${total.toFixed(2)}
                </h2>

                <button onclick="checkout()">
                    Checkout
                </button>

            </div>

        `;
    }

    updateCartCount();
}


// ================= INCREASE QUANTITY =================

function increaseQuantity(index) {

    cart[index].quantity += 1;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showCart();
}


// ================= DECREASE QUANTITY =================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showCart();
}


// ================= REMOVE PRODUCT =================

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showCart();
}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href =
        "checkout.html";
}


// ================= CHECKOUT FORM =================

const checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "fullName"
                ).value;

            alert(
                "Thank you " +
                name +
                "! Your order has been placed successfully."
            );

            localStorage.removeItem("cart");

            cart = [];

            updateCartCount();

            window.location.href =
                "order-success.html";

        }
    );
}


// ================= HOME CATEGORY =================

function goToCategory(category) {

    window.location.href =
        `products.html?category=${category}`;
}


// ================= START =================

updateCartCount();

showCart();