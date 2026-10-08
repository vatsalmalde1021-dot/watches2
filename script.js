/* =========================
   script.js
   ========================= */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Aurelius Classic",
        category: "classic",
        price: 249,
        oldPrice: 299,
        badge: "BESTSELLER",
        rating: 5,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
        description:
            "A refined classic timepiece featuring a sophisticated design and timeless appeal."
    },

    {
        id: 2,
        name: "Chronograph X",
        category: "sport",
        price: 329,
        oldPrice: 399,
        badge: "SALE",
        rating: 5,
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=85",
        description:
            "A bold chronograph designed for active lifestyles and modern adventures."
    },

    {
        id: 3,
        name: "Regal Gold",
        category: "luxury",
        price: 599,
        oldPrice: 699,
        badge: "PREMIUM",
        rating: 5,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85",
        description:
            "An elegant luxury watch with a sophisticated silhouette for special occasions."
    },

    {
        id: 4,
        name: "Urban Steel",
        category: "classic",
        price: 279,
        oldPrice: 329,
        badge: "NEW",
        rating: 4,
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85",
        description:
            "A modern steel timepiece combining everyday versatility with clean design."
    },

    {
        id: 5,
        name: "Explorer Pro",
        category: "sport",
        price: 389,
        oldPrice: 449,
        badge: "POPULAR",
        rating: 5,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=85",
        description:
            "Built for exploration with a durable design made for demanding environments."
    },

    {
        id: 6,
        name: "Executive Black",
        category: "luxury",
        price: 749,
        oldPrice: 849,
        badge: "LUXURY",
        rating: 5,
        image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=900&q=85",
        description:
            "A premium black timepiece designed to make a sophisticated statement."
    },

    {
        id: 7,
        name: "Pulse Smart",
        category: "smart",
        price: 219,
        oldPrice: 269,
        badge: "SMART",
        rating: 4,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=85",
        description:
            "A contemporary smartwatch-inspired design for connected everyday living."
    },

    {
        id: 8,
        name: "Heritage Automatic",
        category: "classic",
        price: 459,
        oldPrice: 529,
        badge: "NEW",
        rating: 5,
        image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=85",
        description:
            "A heritage-inspired automatic watch that celebrates traditional watchmaking."
    }

];


/* ================= STATE ================= */

let cart = [];

let wishlist = [];

let currentFilter = "all";

let currentSlide = 0;


/* ================= DOM ================= */

const productsContainer =
    document.getElementById("products");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const wishCount =
    document.getElementById("wishCount");

const searchInput =
    document.getElementById("searchInput");

const toast =
    document.getElementById("toast");


/* ================= INITIALIZE ================= */

document.addEventListener("DOMContentLoaded", () => {

    renderProducts();

    updateCart();

    updateWishlist();

    document.getElementById("year").textContent =
        new Date().getFullYear();

    startSlider();

});


/* ================= RENDER PRODUCTS ================= */

function renderProducts() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();


    const filteredProducts =
        products.filter(product => {

            const matchesCategory =
                currentFilter === "all" ||
                product.category === currentFilter;

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm) ||
                product.category
                    .toLowerCase()
                    .includes(searchTerm);

            return matchesCategory && matchesSearch;

        });


    if (filteredProducts.length === 0) {

        productsContainer.innerHTML = `
            <div class="no-products">
                <h3>No watches found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    productsContainer.innerHTML =
        filteredProducts.map(product => {

            const isWishlisted =
                wishlist.includes(product.id);


            return `

                <article class="product-card">

                    <div class="product-image">

                        <span class="product-badge">
                            ${product.badge}
                        </span>

                        <button
                            class="wishlist ${isWishlisted ? "active" : ""}"
                            onclick="toggleProductWishlist(${product.id})"
                            aria-label="Add to wishlist">

                            ${isWishlisted ? "♥" : "♡"}

                        </button>


                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                            onclick="openProduct(${product.id})">

                    </div>


                    <div class="product-info">

                        <div class="product-category">
                            ${product.category}
                        </div>

                        <h3>
                            ${product.name}
                        </h3>

                        <div class="stars">
                            ${getStars(product.rating)}
                        </div>

                        <div class="price">
                            $${product.price}
                            <span class="old-price">
                                $${product.oldPrice}
                            </span>
                        </div>

                        <button
                            class="add-cart"
                            onclick="addToCart(${product.id})">

                            Add to Cart

                        </button>

                    </div>

                </article>

            `;

        }).join("");

}


/* ================= STARS ================= */

function getStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars +=
            i <= rating ? "★" : "☆";

    }

    return stars;
}


/* ================= FILTER ================= */

function filterProducts(category, button) {

    currentFilter = category;


    document
        .querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");

    renderProducts();

}


/* ================= SEARCH ================= */

function searchProducts() {

    renderProducts();

}


/* ================= CART ================= */

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    if (!product) return;


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    showToast(`${product.name} added to cart`);

}


function updateCart() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent = totalItems;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "$0";

        return;
    }


    cartItems.innerHTML =
        cart.map(item => `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        $${item.price} × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})">

                    ×

                </button>

            </div>

        `).join("");


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}


function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    updateCart();

}


/* ================= CART PANEL ================= */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("open");

    document
        .getElementById("overlay")
        .classList.add("active");

}


function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("open");

    document
        .getElementById("overlay")
        .classList.remove("active");

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;
    }


    showToast(
        "Checkout system ready — connect your payment gateway."
    );

}


/* ================= WISHLIST ================= */

function toggleProductWishlist(productId) {

    if (wishlist.includes(productId)) {

        wishlist =
            wishlist.filter(
                id => id !== productId
            );

        showToast("Removed from wishlist");

    } else {

        wishlist.push(productId);

        showToast("Added to wishlist");

    }


    updateWishlist();

    renderProducts();

}


function updateWishlist() {

    wishCount.textContent =
        wishlist.length;

}


function toggleWishlist() {

    if (wishlist.length === 0) {

        showToast("Your wishlist is empty");

        return;
    }


    const firstWishlistItem =
        products.find(
            product =>
                wishlist.includes(product.id)
        );


    if (firstWishlistItem) {

        openProduct(firstWishlistItem.id);

    }

}


/* ================= PRODUCT MODAL ================= */

function openProduct(productId) {

    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) return;


    document.getElementById("modalImage").src =
        product.image;

    document.getElementById("modalImage").alt =
        product.name;

    document.getElementById("modalCategory").textContent =
        product.category;

    document.getElementById("modalName").textContent =
        product.name;

    document.getElementById("modalPrice").innerHTML =
        `$${product.price}
         <span class="old-price">
            $${product.oldPrice}
         </span>`;

    document.getElementById("modalDescription").textContent =
        product.description;


    document.getElementById("modalCartButton").onclick =
        () => {

            addToCart(product.id);

            closeModal();

        };


    document
        .getElementById("productModal")
        .classList.add("active");

}


function closeModal() {

    document
        .getElementById("productModal")
        .classList.remove("active");

}


document
    .getElementById("productModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeModal();

        }

    });


/* ================= HERO SLIDER ================= */

const slides =
    document.querySelectorAll(".slide");

const dots =
    document.querySelectorAll(".dot");


function goToSlide(index) {

    slides[currentSlide].classList.remove("active");

    dots[currentSlide].classList.remove("active");


    currentSlide = index;


    slides[currentSlide].classList.add("active");

    dots[currentSlide].classList.add("active");

}


function nextSlide() {

    const next =
        (currentSlide + 1) % slides.length;

    goToSlide(next);

}


function startSlider() {

    setInterval(
        nextSlide,
        5000
    );

}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    document
        .getElementById("navLinks")
        .classList.toggle("open");

}


document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            document
                .getElementById("navLinks")
                .classList.remove("open");

        });

    });


/* ================= NEWSLETTER ================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("newsletterEmail")
                .value.trim();


        if (!email) {

            showToast("Please enter your email");

            return;

        }


        showToast(
            "Thanks for subscribing!"
        );


        this.reset();

    });


/* ================= TOAST ================= */

let toastTimer;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* ================= KEYBOARD SUPPORT ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

        closeCart();

    }

});