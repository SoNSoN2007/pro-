// Add this JavaScript for slider functionality
document.addEventListener('DOMContentLoaded', function() {
    class Slider {
        constructor(container, options = {}) {
            this.container = container;
            this.cards = container.querySelector('.coach-cards');
            this.slides = container.querySelectorAll('.coach-card');
            this.prevBtn = container.querySelector('.prev');
            this.nextBtn = container.querySelector('.next');
            this.dots = [...document.querySelectorAll('.slider-dots .dot')];

            this.currentIndex = 0;
            this.slidesPerView = options.visibleCards || this.getSlidesPerView();
            this.maxSlide = Math.max(0, this.slides.length - this.slidesPerView);
            this.autoplayDelay = options.autoplayInterval || 5000;
            this.isAnimating = false;

            this.init();
        }

        init() {
            this.updateSlides();
            this.setupEventListeners();
            this.startAutoplay();
            this.updateDots();
            this.animateInitialCards();

            // Add card index for staggered animations
            this.slides.forEach((slide, index) => {
                slide.style.setProperty('--card-index', index);
            });
        }

        animateInitialCards() {
            // Create a staggered entrance animation similar to welcome page
            Array.from(this.slides).forEach((card, index) => {
                // Set initial state
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';

                // Animate in with delay based on index
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 200); // Stagger the animation
            });
        }

        getSlidesPerView() {
            return window.innerWidth > 1024 ? 3 :
                window.innerWidth > 768 ? 2 : 1;
        }

        updateSlides() {
            // Calculate the percentage to move based on current index and visible slides
            const offset = -this.currentIndex * (100 / this.slidesPerView);
            this.cards.style.transform = `translateX(${offset}%)`;

            this.slides.forEach((slide, index) => {
                const isActive = index >= this.currentIndex &&
                    index < this.currentIndex + this.slidesPerView;
                const distance = Math.abs(index - this.currentIndex);

                // Smoother transition with better timing
                slide.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${distance * 0.08}s`;

                // Enhanced visual effects for active vs inactive slides
                slide.style.opacity = isActive ? '1' : '0.5';
                slide.style.transform = isActive ? 'scale(1)' : 'scale(0.95)';
                slide.style.filter = isActive ? 'blur(0)' : 'blur(2px)';

                // Add a subtle shadow effect to active slides
                slide.style.boxShadow = isActive ?
                    '0 10px 20px rgba(0, 0, 0, 0.15)' :
                    '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        }

        updateDots() {
            this.dots.forEach((dot, index) => {
                // Enhanced dot animation similar to welcome page
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                    dot.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    dot.style.transform = 'scale(1.2)';
                } else {
                    dot.classList.remove('active');
                    dot.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    dot.style.transform = 'scale(1)';
                }
            });
        }

        setupEventListeners() {
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            // Touch events
            let touchStartX = 0;
            this.container.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                this.stopAutoplay();
            });

            this.container.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) this.next();
                    else this.prev();
                }
                this.startAutoplay();
            });

            // Pause on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());

            // Handle resize
            window.addEventListener('resize', () => {
                this.slidesPerView = this.getSlidesPerView();
                this.maxSlide = Math.max(0, this.slides.length - this.slidesPerView);
                this.currentIndex = Math.min(this.currentIndex, this.maxSlide);
                this.updateSlides();
            });
        }

        prev() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            this.animateSlide('prev');

            // The currentIndex is now updated inside animateSlide
            // Release animation lock after animation completes
            setTimeout(() => this.isAnimating = false, 800);
        }

        next() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            this.animateSlide('next');

            // The currentIndex is now updated inside animateSlide
            // Release animation lock after animation completes
            setTimeout(() => this.isAnimating = false, 800);
        }

        goToSlide(index) {
            if (this.isAnimating || index === this.currentIndex) return;
            this.isAnimating = true;

            // Determine direction for animation
            const direction = index > this.currentIndex ? 'next' : 'prev';

            // Use the same staggered animation as prev/next
            const cards = Array.from(this.slides);
            const duration = 400;

            // First phase: animate cards away
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.transform = direction === 'next' ?
                        'scale(0.95) translateX(-30px)' :
                        'scale(0.95) translateX(30px)';
                    card.style.opacity = '0.5';
                    card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
                }, i * 50);
            });

            // Second phase: update position and animate cards back
            setTimeout(() => {
                this.currentIndex = Math.min(this.maxSlide, Math.max(0, index));
                this.updateSlides();
                this.updateDots();

                // Animate cards back with staggered timing
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.style.transform = 'scale(1) translateX(0)';
                        card.style.opacity = '1';
                    }, i * 50);
                });
            }, duration);

            setTimeout(() => this.isAnimating = false, 800);
        }

        startAutoplay() {
            this.stopAutoplay();
            this.autoplayInterval = setInterval(() => {
                // If we're at the last slide, we'll still call next() since our animateSlide method
                // now handles the looping behavior automatically
                this.next();
            }, this.autoplayDelay);
        }

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }

        animateSlide(direction) {
            // Use staggered animation similar to welcome page
            const cards = Array.from(this.slides);
            const duration = 400;

            // First phase: animate cards away with staggered timing
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = direction === 'next' ?
                        'scale(0.95) translateX(-30px)' :
                        'scale(0.95) translateX(30px)';
                    card.style.opacity = '0.5';
                    card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
                }, index * 50); // Staggered timing
            });

            // Second phase: update position and animate cards back
            setTimeout(() => {
                // Let the normal slide update happen with looping behavior
                if (direction === 'next') {
                    // If we're at the last slide and going next, loop to the first slide
                    if (this.currentIndex >= this.maxSlide) {
                        this.currentIndex = 0;
                    } else {
                        this.currentIndex += 1;
                    }
                } else {
                    // If we're at the first slide and going prev, loop to the last slide
                    if (this.currentIndex <= 0) {
                        this.currentIndex = this.maxSlide;
                    } else {
                        this.currentIndex -= 1;
                    }
                }

                this.updateSlides();
                this.updateDots();

                // Then animate cards back with staggered timing
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transform = 'scale(1) translateX(0)';
                        card.style.opacity = '1';
                    }, index * 50);
                });
            }, duration);
        }
    }

    // Initialize the slider with improved configuration
    const slider = new Slider(document.querySelector('.coaches-slider'), {
        autoplayInterval: 5000,
        visibleCards: window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());

            // Validate form
            if (validateForm(formValues)) {
                // Show success message
                showMessage('Thank you! We will contact you soon.', 'success');
                this.reset();
            }
        });
    }

    function validateForm(data) {
        // Basic validation
        if (!data.name || data.name.length < 2) {
            showMessage('Please enter a valid name', 'error');
            return false;
        }

        if (!data.email || !data.email.includes('@')) {
            showMessage('Please enter a valid email', 'error');
            return false;
        }

        if (!data.phone || data.phone.length < 10) {
            showMessage('Please enter a valid phone number', 'error');
            return false;
        }

        if (!data.message || data.message.length < 10) {
            showMessage('Please enter a message (min 10 characters)', 'error');
            return false;
        }

        return true;
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(messageDiv, form);

        setTimeout(() => messageDiv.remove(), 5000);
    }
});