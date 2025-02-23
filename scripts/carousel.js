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

// ... existing code ...

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing carousel and testimonial initialization ...

    // Initialize image slider
    const sliderContainer = document.querySelector('.slider-container');
    const afterImage = document.querySelector('.slider-image.after');
    const sliderHandle = document.querySelector('.slider-handle');

    if (sliderContainer && afterImage && sliderHandle) {
        // Mouse events
        const handleSlide = (e) => {
            const rect = sliderContainer.getBoundingClientRect();
            let x = e.clientX || (e.touches && e.touches[0].clientX);
            x = x - rect.left;
            const width = rect.width;
        
            // Calculate the percentage position of the slider (constrain between 0 and 100)
            const percentage = Math.min(Math.max(0, x / width), 1);
        
            // Adjust the clip-path of the after image (changed direction)
            afterImage.style.clipPath = `inset(0 0 0 ${percentage * 100}%)`;
        
            // Position the handle
            sliderHandle.style.left = `${percentage * 100}%`;
        };
        
        // // Update the reset position as well
        // sliderContainer.addEventListener('mouseleave', () => {
        //     afterImage.style.clipPath = `inset(0 0 0 50%)`;
        //     sliderHandle.style.left = '50%';
        // });

        // Mouse events
        sliderContainer.addEventListener('mousemove', handleSlide);
        sliderContainer.addEventListener('touchmove', handleSlide);

        // Prevent default touch behavior to avoid scrolling while sliding
        sliderContainer.addEventListener('touchstart', (e) => e.preventDefault());
        sliderContainer.addEventListener('touchmove', (e) => e.preventDefault());
    }
});