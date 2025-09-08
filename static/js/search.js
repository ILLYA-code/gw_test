document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search-input");
    const resultsBox = document.getElementById("search-results");
    
    let activeIndex = 0;
    let items = resultsBox.querySelectorAll(".search-item");

    let timer = null;

    const showResults = () => {
        resultsBox.classList.remove('hidden-search-results');
        resultsBox.classList.add('showed-search-results');
        activeIndex = 0;
        items = resultsBox.querySelectorAll(".search-item");
    };

    const hideResults = () => {
        resultsBox.classList.remove('showed-search-results');
        resultsBox.classList.add('hidden-search-results');
    };

    input.addEventListener("input", () => {
        clearTimeout(timer);
        const query = input.value.trim();

        if (!query) {
            hideResults();
            resultsBox.innerHTML = "";
            return;
        }

        timer = setTimeout(() => {
            fetch(`/search?query=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(products => {
                    if (!products.length) {
                        resultsBox.innerHTML = "<p class='text-gray-500'>Нічого не знайдено</p>";
                        showResults();
                        return;
                    }

                    let html = products.slice(0, 5).map((p, idx) => `
                        <div class="search-item flex items-center gap-4 p-2.5 cursor-pointer transition-colors duration-200 ease-in-out ${idx === 0 ? 'bg-[#d9d9d9]' : ''}" data-id="${p.id}">
                            <img src="${p.image}?v=${p.id}" alt="${p.name}" class="w-[60px] h-[70px] object-cover" />
                            <div class="flex flex-col justify-between h-[70px]">
                                <span class="text-[14px]">${p.name}</span>
                                <div class="flex items-center gap-2">
                                    <span class="text-black text-[17px]">${p.price} UAH</span>
                                    ${p.price_without_discount > p.price 
                                        ? `<span class="line-through text-gray-400">${p.price_without_discount} UAH</span>` 
                                        : ""}
                                </div>
                                <span class="text-[10px] text-[#747474]">
                                    ${p.available ? "В наявності" : "Немає в наявності"}
                                </span>
                            </div>
                        </div>
                    `).join("");

                    html += `
                        <button class="w-full h-10 text-[14px] mt-4 flex justify-center items-center border border-[#545454] rounded-[3px]">
                            Переглянути всі результати
                        </button>
                    `;

                    resultsBox.innerHTML = html;
                    showResults();

                    items.forEach((el, i) => {
                        el.addEventListener("mouseenter", () => {
                            activeIndex = i;
                            updateActive();
                        });
                        el.addEventListener("click", () => {
                            console.log("Clicked product id:", el.dataset.id);
                        });
                    });
                })
                .catch(err => console.error(err));
        }, 300);
    });

    const rect = input.getBoundingClientRect();
    resultsBox.style.top = `${rect.bottom + window.scrollY}px`;
    resultsBox.style.left = `${rect.left + window.scrollX}px`;

    document.addEventListener("click", (e) => {
        if (!resultsBox.contains(e.target) && e.target !== input) {
            hideResults();
        }
    });

    const updateActive = () => {
        items.forEach((el, i) => {
            if (i === activeIndex) {
                el.classList.add("bg-[#d9d9d9]");
            } else {
                el.classList.remove("bg-[#d9d9d9]");
            }
        });
    };

    input.addEventListener("keydown", (e) => {
        if (!items.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % items.length;
            updateActive();
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateActive();
        }
        if (e.key === "Enter") {
            e.preventDefault();
            const selected = items[activeIndex];
            if (selected) {
                console.log("Selected product id:", selected.dataset.id);
            }
        }
    });
});
