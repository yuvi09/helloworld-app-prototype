let currentIndex = 0;
let currentTestimonial = 0;

function showItem(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    const totalItems = document.querySelectorAll('.carousel-item').length;
    if (index < 0) {
        currentIndex = totalItems - 1;
    } else if (index >= totalItems) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

function nextItem() {
    showItem(currentIndex + 1);
}

function prevItem() {
    showItem(currentIndex - 1);
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;

    testimonials.forEach((testimonial, idx) => {
        testimonial.classList.remove('active');
        if (idx === index) {
            testimonial.classList.add('active');
        }
    });

    currentTestimonial = index;
}

function nextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;

    const nextIndex = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(nextIndex);
}

function prevTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;

    const prevIndex = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(prevIndex);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle carousel initialization
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        showItem(0); // Only activate JavaScript-controlled carousel on desktop
    }

    // Initialize testimonials
    showTestimonial(0);

    // Initialize image slider
    const sliderContainer = document.querySelector('.slider-container');
    const afterImage = document.querySelector('.slider-image.after');
    const sliderHandle = document.querySelector('.slider-handle');

    if (sliderContainer && afterImage && sliderHandle) {
        sliderContainer.addEventListener('mousemove', (e) => {
            const rect = sliderContainer.getBoundingClientRect();
            const xPos = e.clientX - rect.left;
            const width = rect.width;

            // Calculate the percentage position of the slider
            const percentage = Math.max(0, Math.min(1, xPos / width));

            // Adjust the clip-path of the after image
            afterImage.style.clipPath = `inset(0 ${100 - percentage * 100}% 0 0)`;

            // Position the handle
            sliderHandle.style.left = `${percentage * 100}%`;
        });

        sliderContainer.addEventListener('mouseleave', () => {
            // Reset to the middle when the mouse leaves the container
            afterImage.style.clipPath = `inset(0 50% 0 0)`;
            sliderHandle.style.left = '50%';
        });
    }
});