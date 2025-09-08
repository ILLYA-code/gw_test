document.addEventListener("DOMContentLoaded", () => {
    const viewWholeTab_btn = document.getElementById('view-whole-tab-btn');
    const buttons = document.querySelectorAll('.category-btn');

    const viewWholeTab_btn_text = 'Переглянути всі';
    const engToUkrTabProperties = {
        new: 'новинки',
        sale: 'знижки',
        top: 'топ продажу',
    }

    const pagesArr = {
        new: document.getElementById('new-page'),
        sale: document.getElementById('sale-page'),
        top: document.getElementById('top-page')
    };

    const hideAllPages = () => {
        Object.values(pagesArr).forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('grid');
        });
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => {
                b.classList.remove('text-black', 'underline', 'font-bold');
                b.classList.add('text-gray-400');
            });
            btn.classList.add('text-black', 'underline', 'font-bold');
            btn.classList.remove('text-gray-400');

            hideAllPages();
            const tab = btn.dataset.tab;
            
            if (pagesArr[tab]) {
                pagesArr[tab].classList.remove('hidden');
                pagesArr[tab].classList.add('grid');
            }

            viewWholeTab_btn.innerText = `${viewWholeTab_btn_text} ${engToUkrTabProperties[tab]}`;

        });
    });

    buttons[1].click();
});