document.addEventListener("DOMContentLoaded", () => {
    const limitProducts = (container_identifier, item_identifier, limit) => {
        document.querySelectorAll(container_identifier).forEach(container => {
            let shown = 0;
            container.querySelectorAll(item_identifier).forEach((product) => {
                if (shown < limit) {
                    shown++;
                } else {
                    product.style.display = "none";
                }
            })
        });
    }

    limitProducts('.products-tab', '.product-item', 12);
    limitProducts('.category-products-examples', '.product-item', 2);
    limitProducts('.categories-container', '.category-box', 2);
});

