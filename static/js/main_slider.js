const slides = document.querySelectorAll('[data-slide-index]');
let currentSlide = 0;
const totalSlides = slides.length;
const intervalTime = 4000;

const showSlide = (index) => {
    slides.forEach((slide, i) => {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
        if(i === index) {
            slide.classList.add('opacity-100');
            slide.classList.remove('opacity-0');
        }
    });
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
};

const prevSlide = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
};

let slideInterval = setInterval(nextSlide, intervalTime);

document.getElementById('nextSlide').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});
document.getElementById('prevSlide').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
}
