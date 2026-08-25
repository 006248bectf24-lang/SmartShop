const detailsContainer =
    document.getElementById("product-details");


const urlParams =
    new URLSearchParams(window.location.search);


const productId =
    urlParams.get("id");


if (!productId) {

    detailsContainer.innerHTML = `
        <p>Product not found.</p>
    `;

} else {

    fetch(
        `https://dummyjson.com/products/${productId}`
    )

        .then(response => response.json())

        .then(product => {

            detailsContainer.innerHTML = `

                <div class="product-detail-card">

                    <img
                        src="${product.thumbnail}"
                        alt="${product.title}"
                    >

                    <div>

                        <h2>
                            ${product.title}
                        </h2>

                        <p>
                            ${product.description}
                        </p>

                        <h3>
                            Price: $${product.price}
                        </h3>

                        <p>
                            ⭐ Rating:
                            ${product.rating}
                        </p>

                        <p>
                            📦 Stock:
                            ${product.stock}
                        </p>

                        <p>
                            🏷️ Brand:
                            ${product.brand || "N/A"}
                        </p>

                        <p>
                            📂 Category:
                            ${product.category}
                        </p>

                        <button
                            id="detailsAddButton"
                        >
                            Add to Cart 🛒
                        </button>

                    </div>

                </div>

            `;


            const addButton =
                document.getElementById(
                    "detailsAddButton"
                );


            addButton.addEventListener(
                "click",
                function () {

                    addToCart(product);

                }
            );

        })

        .catch(error => {

            console.log(error);

            detailsContainer.innerHTML = `
                <p>
                    Unable to load product details.
                </p>
            `;

        });
}