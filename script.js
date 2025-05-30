// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Smooth Scrolling for Navigation Links (simplified since NavigationScrollSpy handles navigation)
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle non-navigation anchor links (like scroll down button)
        document.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, this.observerOptions);

        // Observe project cards and other elements
        document.querySelectorAll('.project-card, .contact-section, .section-title').forEach(el => {
            observer.observe(el);
        });
    }
}

// Header Scroll Effect
class HeaderScrollEffect {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            this.header.style.backgroundColor = 'var(--bg-primary)';
            this.header.style.boxShadow = '0 2px 20px var(--shadow-light)';
        } else {
            this.header.style.backgroundColor = 'var(--bg-primary)';
            this.header.style.boxShadow = 'none';
        }

        this.lastScrollY = currentScrollY;
    }
}

// Form Handling (for future contact form)
class ContactForm {
    constructor() {
        this.form = document.querySelector('#contact-form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        
        // Add your form submission logic here
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message
        this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        this.form.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Mobile Menu Toggle (for responsive navigation)
class MobileMenu {
    constructor() {
        this.createMobileMenuToggle();
        this.init();
    }

    createMobileMenuToggle() {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-toggle';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Insert at the beginning of nav for top-left position
        nav.insertAdjacentElement('afterbegin', mobileMenuBtn);
        
        this.mobileMenuBtn = mobileMenuBtn;
        this.navLinks = navLinks;
    }

    init() {
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close menu when clicking on links
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && this.navLinks.classList.contains('mobile-open')) {
                this.closeMobileMenu();
            }
        });

        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
        this.handleResize();
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks.classList.contains('mobile-open')) {
                this.closeMobileMenu();
                this.mobileMenuBtn.focus();
            }
        });
    }

    toggleMobileMenu() {
        const isOpen = this.navLinks.classList.toggle('mobile-open');
        const icon = this.mobileMenuBtn.querySelector('i');
        
        if (isOpen) {
            icon.className = 'fas fa-times';
            this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
            // Focus first link for accessibility
            const firstLink = this.navLinks.querySelector('a');
            if (firstLink) firstLink.focus();
        } else {
            icon.className = 'fas fa-bars';
            this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    closeMobileMenu() {
        this.navLinks.classList.remove('mobile-open');
        this.mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    handleResize() {
        if (window.innerWidth <= 768) {
            // Mobile view - show hamburger
            this.mobileMenuBtn.style.display = 'flex';
        } else {
            // Desktop view - hide hamburger and close menu
            this.mobileMenuBtn.style.display = 'none';
            this.closeMobileMenu();
        }
    }
}

// Typing Animation for Hero Text
// Projects Carousel Functionality
class ProjectsCarousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.indicatorsContainer = document.getElementById('carousel-indicators');
        this.cards = document.querySelectorAll('.projects-carousel .project-card');
        this.currentIndex = 0;
        this.cardsToShow = this.getCardsToShow();
        this.totalSlides = Math.ceil(this.cards.length / this.cardsToShow);
        this.init();
    }

    init() {
        this.createIndicators();
        this.updateCarousel();
        this.addEventListeners();
        window.addEventListener('resize', () => this.handleResize());
    }

    getCardsToShow() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }

    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }    addEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add swipe buttons for mobile
        if (window.innerWidth <= 768) {
            const swipeHelp = document.createElement('div');
            swipeHelp.className = 'swipe-help';
            swipeHelp.innerHTML = '<div class="arrow-left">←</div><div class="arrow-right">→</div>';
            this.track.parentElement.appendChild(swipeHelp);
        }
    }

    updateCarousel() {
        const cardWidth = this.track.children[0].offsetWidth + 32; // 32px for gap
        const translateX = -this.currentIndex * cardWidth * this.cardsToShow;
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        // Update button states
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex === this.totalSlides - 1 ? '0.5' : '1';
    }

    nextSlide() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    handleResize() {
        const newCardsToShow = this.getCardsToShow();
        if (newCardsToShow !== this.cardsToShow) {
            this.cardsToShow = newCardsToShow;
            this.totalSlides = Math.ceil(this.cards.length / this.cardsToShow);
            this.currentIndex = Math.min(this.currentIndex, this.totalSlides - 1);
            this.createIndicators();
            this.updateCarousel();
        }
    }
}

// Tech Stack Animation
class TechStackAnimation {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const techItems = entry.target.querySelectorAll('.tech-item');
                    techItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Initially hide tech items
        document.querySelectorAll('.tech-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Observe tech categories
        document.querySelectorAll('.tech-category').forEach(category => {
            observer.observe(category);
        });
    }
}

// Responsive Utilities and Mobile Optimizations
class ResponsiveManager {
    constructor() {
        this.init();
    }

    init() {
        this.handleViewportHeight();
        this.addTouchSupport();
        this.optimizeForMobile();
        
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleViewportHeight();
                this.updateLayout();
            }, 100);
        });

        // Debounced resize handler
        window.addEventListener('resize', debounce(() => {
            this.handleViewportHeight();
            this.updateLayout();
        }, 250));
    }

    // Fix iOS viewport height issues
    handleViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }    // Touch support removed for simplicity
    addTouchSupport() {
        // Basic mobile optimizations only
        document.addEventListener('touchstart', () => {}, { passive: true });
    }

    // Mobile-specific optimizations
    optimizeForMobile() {
        // Reduce animations on mobile for better performance
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
            
            // Disable CSS animations for better performance on older devices
            const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
            if (isLowEndDevice) {
                document.body.classList.add('low-end-device');
            }
        }

        // Add hover effect alternatives for touch devices
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }
    }

    updateLayout() {
        // Trigger any layout updates needed on resize
        const event = new CustomEvent('layoutUpdate');
        document.dispatchEvent(event);
    }
}

// End of ResponsiveManager class

// Enhanced Mobile Menu with better accessibility
class EnhancedMobileMenu extends MobileMenu {
    constructor() {
        super();
        this.addKeyboardNavigation();
        this.improveAccessibility();
    }

    addKeyboardNavigation() {
        // Tab navigation within mobile menu
        this.navLinks.addEventListener('keydown', (e) => {
            const links = Array.from(this.navLinks.querySelectorAll('a'));
            const currentIndex = links.indexOf(document.activeElement);
            
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
                    links[prevIndex].focus();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
                    links[nextIndex].focus();
                    break;
            }
        });
    }

    improveAccessibility() {
        // Add ARIA labels and improve screen reader support
        this.navLinks.setAttribute('role', 'menu');
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.setAttribute('role', 'menuitem');
        });
        
        // Announce menu state changes
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        this.announcer = announcer;
    }

    toggleMobileMenu() {
        super.toggleMobileMenu();
        
        // Announce state change for screen readers
        const isOpen = this.navLinks.classList.contains('mobile-open');
        this.announcer.textContent = isOpen ? 'Navigation menu opened' : 'Navigation menu closed';
    }
}

// Navigation Active State Manager with Scroll Spy
class NavigationScrollSpy {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        this.sections = [];
        this.currentActiveLink = null;
        this.init();
    }

    init() {
        // Get all sections that correspond to navigation links
        this.navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const section = document.getElementById(targetId);
            if (section) {
                this.sections.push({
                    element: section,
                    id: targetId,
                    link: link
                });
            }
        });

        // Set up intersection observer
        this.setupIntersectionObserver();
        
        // Handle manual navigation clicks
        this.setupNavigationClicks();
        
        // Set initial active state
        this.updateActiveNavigation();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% visible from top
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionData = this.sections.find(s => s.element === entry.target);
                if (sectionData) {
                    if (entry.isIntersecting) {
                        this.setActiveNavigation(sectionData.link);
                    }
                }
            });
        }, options);

        // Observe all sections
        this.sections.forEach(section => {
            this.observer.observe(section.element);
        });
    }

    setupNavigationClicks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                this.clearActiveStates();
                
                // Add active class to clicked link
                link.classList.add('active');
                this.currentActiveLink = link;
                
                // Smooth scroll to target
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-links');
                if (mobileMenu && mobileMenu.classList.contains('mobile-open')) {
                    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.click();
                    }
                }
            });
        });
    }

    setActiveNavigation(activeLink) {
        if (this.currentActiveLink === activeLink) return;
        
        this.clearActiveStates();
        activeLink.classList.add('active');
        this.currentActiveLink = activeLink;
    }

    clearActiveStates() {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    updateActiveNavigation() {
        // Set initial active state based on current scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            const rect = section.element.getBoundingClientRect();
            const offsetTop = rect.top + scrollTop;
            
            if (scrollTop >= offsetTop - 100) {
                this.setActiveNavigation(section.link);
                break;
            }
        }
        
        // If no section is found, activate the first one (Home)
        if (!this.currentActiveLink && this.navLinks.length > 0) {
            this.setActiveNavigation(this.navLinks[0]);
        }
    }

    // Method to manually set active state (useful for external calls)
    activateSection(sectionId) {
        const targetLink = Array.from(this.navLinks).find(link => 
            link.getAttribute('href') === `#${sectionId}`
        );
        if (targetLink) {
            this.setActiveNavigation(targetLink);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    new ThemeManager();
    new SmoothScroll();
    new NavigationScrollSpy(); // Add navigation scroll spy
    new AnimationObserver();
    new HeaderScrollEffect();
    new ContactForm();
    new TechStackAnimation();
    
    // Initialize responsive and mobile components
    new ResponsiveManager();
    new EnhancedMobileMenu();
      // Initialize carousel
    const projectsCarousel = new ProjectsCarousel();

    // Initialize Typed.js for typing animation
    var typingEffect = new Typed(".typedText", {
        strings: ["AI/ML Engineer", "Data Scientist", "MLOps Engineer"],
        loop: true,
        typeSpeed: 30,    // Typing speed (lower = faster)
        backSpeed: 23,    // Backspacing speed
        backDelay: 600    // Delay before backspacing
    });

    // Add CSS for mobile menu
    const mobileMenuStyles = `
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            padding: 0.5rem;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .mobile-menu-toggle:hover {
            border-color: var(--accent-primary);
            color: var(--accent-primary);
        }

        @media (max-width: 768px) {
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--bg-primary);
                border-top: 1px solid var(--border-color);
                flex-direction: column;
                padding: 1rem 2rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px var(--shadow-medium);
            }

            .nav-links.mobile-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }

            .mobile-menu-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
            }
        }

        .form-message {
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            font-weight: 500;
        }

        .form-message.success {
            background-color: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }

        .form-message.error {
            background-color: #fee2e2;
            color: #991b1b;
            border: 1px solid #fca5a5;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileMenuStyles;
    document.head.appendChild(styleSheet);
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
