// Loading Animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Wait for DOM to be fully loaded before setting up all interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe menu cards for individual animations
    document.querySelectorAll('.menu-card, .special-card, .gallery-item').forEach(card => {
        observer.observe(card);
    });

    // Reviews Slider Class
    class ReviewsSlider {
        constructor() {
            this.slider = document.querySelector('.reviews-slider');
            this.slides = document.querySelectorAll('.review-card');
            this.dots = document.querySelectorAll('.dot');
            this.currentSlide = 0;
            this.slideInterval = null;

            if (this.slider && this.slides.length > 0) {
                this.init();
            }
        }

        init() {
            this.showSlide(0);
            this.startAutoSlide();
            this.addEventListeners();
        }

        showSlide(index) {
            this.slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            this.currentSlide = index;
        }

        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(nextIndex);
        }

        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prevIndex);
        }

        startAutoSlide() {
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        }

        stopAutoSlide() {
            clearInterval(this.slideInterval);
        }

        addEventListeners() {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.showSlide(index);
                    this.stopAutoSlide();
                    this.startAutoSlide();
                });
            });

            if (this.slider) {
                this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
                this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
            }
        }
    }

    // Initialize Reviews Slider
    const reviewsSlider = new ReviewsSlider();

    // Form Input Animations
    document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Reservation Form Submission
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const inputs = this.querySelectorAll('input, select');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff6b6b';
                    isValid = false;
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });

            if (isValid) {
                const submitBtn = this.querySelector('button');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you for your reservation! We will contact you soon.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('focused');
                    });
                }, 2000);
            }
        });
    }

    // Menu Card Hover Effects
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(1deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Gallery Item Hover Effects with Zoom
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1.2)';
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });

    // Order Now Button - WORKING FIX
    const orderBtn = document.getElementById('order-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add staggered animation delays to menu cards
    document.querySelectorAll('.menu-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add staggered animation delays to gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });

}); // End DOMContentLoaded

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.5}px)`;
    }
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;

    if (header) {
        if (scrolled > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = 'none';
        }
    }
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.5}px)`;
    }
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;

    if (header) {
        if (scrolled > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = 'none';
        }
    }
});