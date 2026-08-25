const productContainer = document.getElementById("product-container");

let allProducts = [];


// ================= LOAD PRODUCTS =================

fetch("https://dummyjson.com/products?limit=200")
    .then(response => response.json())
    .then(data => {

        allProducts = data.products;

        displayProducts(allProducts);

    })
    .catch(error => {

        console.log("Error:", error);

        productContainer.innerHTML =
            "<p>Products could not be loaded.</p>";
    });


// ================= DISPLAY PRODUCTS =================

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.innerHTML = `

            <img
                src="${product.thumbnail}"
                alt="${product.title}"
            >

            <h2>${product.title}</h2>

            <p>
                Price: $${product.price}
            </p>

            <p>
                ${product.description}
            </p>

            <button class="add-cart-btn">
                Add to Cart 🛒
            </button>

            <button class="wishlist-btn">
                Add to Wishlist ❤️
            </button>

            <button class="details-btn">
                View Details 👀
            </button>
        `;


        // ADD TO CART

        const cartButton =
            productCard.querySelector(".add-cart-btn");

        cartButton.addEventListener(
            "click",
            function () {

                addToCart(product);

            }
        );


        // WISHLIST

        const wishlistButton =
            productCard.querySelector(".wishlist-btn");

        wishlistButton.addEventListener(
            "click",
            function () {

                if (typeof addToWishlist === "function") {

                    addToWishlist(product);

                } else {

                    alert(
                        "Wishlist is not loaded yet."
                    );
                }

            }
        );


        // VIEW DETAILS

        const detailsButton =
            productCard.querySelector(".details-btn");

        detailsButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "product-details.html?id=" +
                    product.id;

            }
        );


        productContainer.appendChild(productCard);

    });
}


// ================= SEARCH =================

function searchProducts() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filteredProducts =
        allProducts.filter(product =>

            product.title
                .toLowerCase()
                .includes(searchText)

        );


    displayProducts(filteredProducts);
}


// ================= CATEGORY =================

function filterByCategory() {

    const category =
        document
            .getElementById("categoryFilter")
            .value;


    if (category === "all") {

        displayProducts(allProducts);

        return;
    }


    const filteredProducts =
        allProducts.filter(product =>

            product.category === category

        );


    displayProducts(filteredProducts);
}