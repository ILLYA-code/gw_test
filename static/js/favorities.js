document.addEventListener("DOMContentLoaded", () => {
    const FAVORITES_KEY = "gw_favorites";
    let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    const favButtons = document.querySelectorAll(".fav-btn");

    function saveFavorites() {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }

    function updateUI() {
        favButtons.forEach(btn => {
            const productId = btn.dataset.id;
            const img = btn.querySelector(".fav-icon");

            if (favorites.includes(productId)) {
                img.src = "/static/images/filled-dark-heart.png";
            } else {
                img.src = "/static/images/item-fav-heart.png"; 
            }
        });
    }

    favButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.dataset.id;

            if (favorites.includes(productId)) {
                favorites = favorites.filter(id => id !== productId);
            } else {
                favorites.push(productId);
            }

            saveFavorites();
            updateUI();
        });
    });

    updateUI();
});
