// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize expand/collapse functionality
    initializeExpandButtons();
    
    // Initialize smooth scrolling for navigation
    initializeSmoothScrolling();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize header scroll effects
    initializeHeaderEffects();
});

// Expand/Collapse functionality for service plans
function initializeExpandButtons() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            const buttonText = this.querySelector('.btn-text');
            const buttonIcon = this.querySelector('.btn-icon');
            
            if (!targetSection) return;
            
            // Toggle expanded state
            const isExpanded = targetSection.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse
                collapseSection(targetSection, this, buttonText, buttonIcon);
            } else {
                // Expand
                expandSection(targetSection, this, buttonText, buttonIcon);
            }
        });
    });
}

function expandSection(targetSection, button, buttonText, buttonIcon) {
    // Add expanded class to trigger CSS transitions
    targetSection.classList.add('expanded');
    button.classList.add('expanded');
    
    // Update button text and icon
    const serviceName = targetSection.id.includes('coxlogic') ? 'Hide Details' : 'Hide Plans';
    buttonText.textContent = serviceName;
    
    // Add staggered animation to plan cards
    const planCards = targetSection.querySelectorAll('.plan-card');
    planCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    // Scroll to the expanded section with a slight delay
    setTimeout(() => {
        const serviceCard = targetSection.closest('.service-card');
        const headerOffset = 100;
        const elementPosition = serviceCard.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }, 200);
}

function collapseSection(targetSection, button, buttonText, buttonIcon) {
    // Remove expanded class to trigger CSS transitions
    targetSection.classList.remove('expanded');
    button.classList.remove('expanded');
    
    // Update button text and icon
    const serviceName = targetSection.id.includes('coxlogic') ? 'View Details' : 'View All Plans';
    buttonText.textContent = serviceName;
    
    // Reset animation delays
    const planCards = targetSection.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.style.animationDelay = '';
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero CTA smooth scroll
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const headerOffset = 80;
                const elementPosition = servicesSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            const submitButton = this.querySelector('.btn');
            
            // Simple validation
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' 
            ? 'background: rgba(0, 255, 0, 0.1); border: 1px solid rgba(0, 255, 0, 0.3); color: #00ff00;'
            : 'background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); color: #ff4444;'
        }
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#form-message-styles')) {
        const style = document.createElement('style');
        style.id = 'form-message-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Insert message after the form
    const contactForm = document.querySelector('.contact-form');
    contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 5000);
}

// Header scroll effects
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add backdrop blur when scrolled
        if (scrollTop > 50) {
            header.style.background = 'rgba(15, 15, 15, 0.98)';
            header.style.backdropFilter = 'blur(30px)';
        } else {
            header.style.background = 'rgba(15, 15, 15, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add intersection observer for scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure CSS is loaded
    setTimeout(initializeScrollAnimations, 100);
});

// Add some interactive effects for plan cards
function initializePlanCardEffects() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale effect
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
}

// Initialize plan card effects after a short delay
setTimeout(initializePlanCardEffects, 500);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close expanded sections
    if (e.key === 'Escape') {
        const expandedSections = document.querySelectorAll('.service-plans.expanded');
        expandedSections.forEach(section => {
            const button = document.querySelector(`[data-target="${section.id}"]`);
            if (button) {
                button.click();
            }
        });
    }
});

// Add focus management for accessibility
function initializeAccessibility() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Performance optimization: debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based animations or effects can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);