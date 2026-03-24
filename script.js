/* ============================================================
   SLIDESHOW
   ============================================================ */

let slideIndex = 1;
let slideTimeout;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    clearTimeout(slideTimeout);
    slideIndex += n;
    showSlides(slideIndex);
    autoSlides();
}

function autoSlides() {
    slideTimeout = setTimeout(() => {
        plusSlides(1);
    }, 5005);
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    autoSlides();
});



/* ============================================================
   RECHERCHE (sans PHP → version locale)
   ============================================================ */

function searchAnime(event) {
    event.preventDefault();

    const input = document.getElementById("searchInput").value.toLowerCase();

    const redirections = {
        "one piece": "onepiece.html",
        "onepiece": "onepiece.html",
        "solo leveling": "sololeveling.html",
        "solo": "sololeveling.html",
        "naruto": "naruto.html",
        "mha": "mha.html",
        "my hero academia": "mha.html",
        "attack on titan": "titan.html",
        "snk": "titan.html",
        "aot": "titan.html",
        "demon slayer": "demonslayer.html",
        "bleach": "bleach.html",
        "jujutsu kaisen": "jujutsu-kaisen.html"
    };

    if (redirections[input]) {
        window.location.href = redirections[input];
    } else {
        alert("Aucun résultat trouvé.");
    }
}



/* ============================================================
   PANIER – LocalStorage
   ============================================================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* --- Mise à jour du badge panier (navbar) --- */
function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    const totalItems = cart.reduce((t, item) => t + item.quantity, 0);

    if (totalItems > 0) {
        badge.style.display = "inline-block";
        badge.textContent = totalItems;
    } else {
        badge.style.display = "none";
    }
}
updateCartCount();



/* ============================================================
   Ajouter un produit au panier depuis la page d'accueil
   ============================================================ */

document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".card");
        const title = card.querySelector(".title").textContent.trim();
        const price = parseFloat(card.querySelector(".price").textContent.replace("€", "").replace(",", "."));
        const img = card.querySelector("img").src;

        let item = cart.find(p => p.title === title);

        if (item) {
            item.quantity++;
        } else {
            cart.push({
                title: title,
                price: price,
                img: img,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        window.location.href = "panier.html";
    });
});
