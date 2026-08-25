let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


// ================= WISHLIST COUNT =================

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById("wishlist-count");

    if (!wishlistCount) {
        return;
    }

    wishlistCount.textContent =
        wishlist.length;
}


// ================= ADD TO WISHLIST =================

function addToWishlist(product) {

    const alreadyExists =
        wishlist.some(
            item => item.id === product.id
        );

    if (alreadyExists) {

        alert("Product is already in your wishlist!");

        return;
    }

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();

    alert("Product added to wishlist ❤️");
}


// ================= SHOW WISHLIST =================

function showWishlist() {

    const container =
        document.getElementById(
            "wishlist-container"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = `
            <p class="text-center">
                Your wishlist is empty ❤️
            </p>
        `;

        updateWishlistCount();

        return;
    }


    wishlist.forEach(
        (product, index) => {

            const card =
                document.createElement("div");


            // CENTER THE WHOLE PRODUCT CARD

            card.className =
                "text-center mx-auto my-4 p-4";


            card.style.maxWidth =
                "400px";


            card.innerHTML = `

                <div
                    class="d-flex flex-column align-items-center"
                >

                    <!-- PRODUCT IMAGE -->

                    <img
                        src="${product.thumbnail}"
                        alt="${product.title}"
                        width="180"
                        class="mx-auto mb-3"
                        style="object-fit: contain;"
                    >


                    <!-- PRODUCT NAME -->

                    <h2>
                        ${product.title}
                    </h2>


                    <!-- PRICE -->

                    <p>
                        Price: $${product.price}
                    </p>


                    <!-- ADD TO CART -->

                    <button
                        onclick="wishlistAddToCart(${index})"
                        class="mb-2"
                    >
                        Add to Cart 🛒
                    </button>


                    <!-- REMOVE -->

                    <button
                        onclick="removeFromWishlist(${index})"
                    >
                        Remove ❤️
                    </button>

                </div>

            `;

            container.appendChild(card);
        }
    );


    updateWishlistCount();
}


// ================= ADD WISHLIST ITEM TO CART =================

function wishlistAddToCart(index) {

    const product =
        wishlist[index];

    addToCart(product);
}


// ================= REMOVE FROM WISHLIST =================

function removeFromWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();

    showWishlist();
}


// ================= START =================

updateWishlistCount();

showWishlist();