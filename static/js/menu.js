let submenusContainer = document.getElementById('submenu-container');
let subMenuElement = document.getElementById('submenu');
let secondarySubMenuElement = document.getElementById('secondary-submenu');

// для генерації рандомної кількості пунктів меню
const getRandomInt = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
}

let hidingTimeout;

let lastActiveMenuItem;
let lastActiveSubMenuItem;

const hideMenu = () => {
    submenusContainer.classList.remove('grid');
    submenusContainer.classList.add('hidden');
    subMenuElement.innerHTML = '';
    secondarySubMenuElement.innerHTML = '';
}

document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
        subMenuElement.innerHTML = '';
        secondarySubMenuElement.innerHTML = '';
        if (hidingTimeout) {
            clearTimeout(hidingTimeout);
        }

        lastActiveMenuItem = item;
        const rect = item.getBoundingClientRect();
        submenusContainer.classList.remove('hidden');
        submenusContainer.classList.add('grid');
        generateSubMenuItems();
        submenusContainer.style.left = rect.left + 'px';
        submenusContainer.style.top = rect.bottom + 'px';
    })
});

document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('mouseleave', () => {
        hidingTimeout = setTimeout(() => {
            hideMenu();
        }, 50);
    })
});

submenusContainer.addEventListener('mouseenter', () => {
    if (hidingTimeout) {
        clearTimeout(hidingTimeout);
    }
});

submenusContainer.addEventListener('mouseleave', () => {
    hidingTimeout = setTimeout(() => {
        hideMenu();
    }, 50);
})

const generateSubMenuItems = () => {
    let subMenuItems = getRandomInt(1, 6);
    for(let i = 0; i < subMenuItems; i++) {
        let newMenuItem = document.createElement('div');
        newMenuItem.classList.add(
            'font-bold',
            'text-[14px]',
            'py-[8px]',
            'px-[12px]',
            'cursor-pointer',
            'flex',
            'items-center',
            'gap-[10px]',
            'hover:bg-[#F4F4F4]'
        );

        let textDiv = document.createElement('div');
        textDiv.innerText = `Test item ${i+1}`;
        let arrowDiv = document.createElement('div');
        let arrowImg = document.createElement('img');
        arrowImg.src = "/static/images/arrow.png";
        arrowImg.alt = 'arrow';
        arrowImg.style.width = '3px';
        arrowImg.style.height = '6px';
        arrowDiv.appendChild(arrowImg);
        newMenuItem.appendChild(textDiv);
        newMenuItem.appendChild(arrowDiv);
        subMenuElement.appendChild(newMenuItem);

        newMenuItem.addEventListener('mouseenter', () => {
            secondarySubMenuElement.innerHTML = '';
            generateSecondarySubMenuItems(i+1);
        });
    }
}

const generateSecondarySubMenuItems = (currentSubMenuItem) => {
    let secondarySubMenuItems = getRandomInt(1, 6);
    for(let i = 0; i < secondarySubMenuItems; i++) {
        let newItem = document.createElement('div');
        newItem.classList.add(
            'text-[14px]',
            'py-[8px]',
            'px-[12px]',
            'hover:bg-[#F4F4F4]',
            'cursor-pointer',
        );
        newItem.innerText = `Test menu ${currentSubMenuItem}.${i+1}`;
        secondarySubMenuElement.appendChild(newItem);
    }
}
