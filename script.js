// Main JavaScript file for Portfolio & Blog Website
// Author: John Doe
// Enhanced interactive features and animations

class PortfolioWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupTypewriter();
        this.setupProjectFilters();
        this.setupThemeToggle();
        this.setupContactForm();
        this.setupNewsletterForm();
        this.setupProgressBars();
        this.setupParticles();
        this.setupScrollToTop();
        this.setupLazyLoading();
        this.setupCookieConsent();
    }

    // Enhanced Navigation with scroll effects
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });

        // Mobile menu toggle
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Active navigation highlighting
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Smooth scroll effects and reveal animations
    setupScrollEffects() {
        // Smooth scrolling for anchor links
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

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.portfolio-item, .blog-card, .skill-category, .timeline-item, .education-item, .value-item').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Enhanced animations and micro-interactions
    setupAnimations() {
        // Hover effects for portfolio items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Skill tag animations
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
            });

            tag.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });

        // Button ripple effect
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Typewriter effect for hero section
    setupTypewriter() {
        const typewriterElement = document.querySelector('.typewriter-text');
        if (!typewriterElement) return;

        const texts = [
            'Full Stack Developer',
            'UI/UX Designer',
            'Content Creator',
            'Problem Solver'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        typeWriter();
    }

    // Project filtering system
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Dark/Light theme toggle
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Animate the toggle
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    // Enhanced contact form with validation
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('input, textarea, select');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                this.submitForm(contactForm);
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');

        // Remove existing error
        this.clearFieldError(field);

        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
        }

        if (!isValid) {
            fieldGroup.classList.add('error');
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            fieldGroup.appendChild(errorElement);
        }

        return isValid;
    }

    clearFieldError(field) {
        const fieldGroup = field.closest('.form-group');
        fieldGroup.classList.remove('error');
        const errorMessage = fieldGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    async submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();

        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }

    // Newsletter subscription
    setupNewsletterForm() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');

        newsletterForms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = form.querySelector('input[type="email"]').value;
                const button = form.querySelector('button');
                const originalText = button.textContent;

                button.textContent = 'Subscribing...';
                button.disabled = true;

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    this.showNotification(`Successfully subscribed with ${email}!`, 'success');
                    form.reset();

                } catch (error) {
                    this.showNotification('Subscription failed. Please try again.', 'error');
                } finally {
                    button.textContent = originalText;
                    button.disabled = false;
                }
            });
        });
    }

    // Animated progress bars for skills
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.getAttribute('data-percentage');

                    progressBar.style.width = percentage + '%';

                    // Animate counter
                    const counter = progressBar.querySelector('.progress-counter');
                    if (counter) {
                        this.animateCounter(counter, 0, parseInt(percentage), 1000);
                    }
                }
            });
        });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + '%';

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Particle animation background
    setupParticles() {
        const particleContainer = document.querySelector('.particles');
        if (!particleContainer) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particleContainer.appendChild(particle);
        }
    }

    // Scroll to top button
    setupScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Lazy loading for images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Cookie consent banner
    setupCookieConsent() {
        if (localStorage.getItem('cookieConsent')) return;

        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>This website uses cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button class="btn btn-small cookie-accept">Accept</button>
                    <button class="btn btn-small btn-outline cookie-decline">Decline</button>
                </div>
            </div>
        `;

        document.body.appendChild(cookieBanner);

        // Handle cookie consent
        cookieBanner.querySelector('.cookie-accept').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.remove();
        });

        cookieBanner.querySelector('.cookie-decline').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.remove();
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Format date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Animate element
    animateElement: (element, animation, duration = 1000) => {
        element.style.animation = `${animation} ${duration}ms ease-in-out`;

        return new Promise(resolve => {
            setTimeout(() => {
                element.style.animation = '';
                resolve();
            }, duration);
        });
    }
};

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioWebsite();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioWebsite, utils };
}
