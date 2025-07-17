// Contact Page JavaScript

// Formspree Configuration is now loaded from formspree-config.js
// Access it via window.FORMSPREE_CONFIG

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page JavaScript loaded');
    
    // Initialize all contact page functionality
    initContactForm();
    initFAQ();
    initAnimations();
    initSocialLinks();
    
    // Also try FAQ again after a short delay to ensure DOM is fully ready
    setTimeout(initFAQ, 100);
});

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) {
        console.log('Contact form not found');
        return;
    }
    
    console.log('Initializing contact form...');
    
    // Set the _next field to current page
    const nextField = form.querySelector('input[name="_next"]');
    if (nextField) {
        nextField.value = window.location.href;
    }
    
    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Submit form directly to Formspree
            const formData = new FormData(form);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                console.log('Form submitted successfully');
                showSuccessMessage();
                form.reset();
            } else {
                // Error
                console.error('Form submission failed:', response.status);
                showErrorMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Form Validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const fields = [
        { id: 'name', label: 'Name', required: true },
        { id: 'email', label: 'Email', required: true, type: 'email' },
        { id: 'subject', label: 'Subject', required: true },
        { id: 'message', label: 'Message', required: true }
    ];
    
    let isValid = true;
    
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!validateField(input, field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input, fieldConfig = {}) {
    const value = input.value.trim();
    const errorElement = document.getElementById(input.id + 'Error');
    
    // Clear previous error
    clearFieldError(input);
    
    // Required field validation
    if (fieldConfig.required && !value) {
        showFieldError(input, `${fieldConfig.label || 'This field'} is required`);
        return false;
    }
    
    // Email validation
    if (fieldConfig.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Message length validation
    if (input.id === 'message' && value.length < 10) {
        showFieldError(input, 'Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

function showFieldError(input, message) {
    const errorElement = document.getElementById(input.id + 'Error');
    input.classList.add('error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearFieldError(input) {
    const errorElement = document.getElementById(input.id + 'Error');
    input.classList.remove('error');
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Form Submission with Formspree
async function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    
    // Get configuration
    const config = window.FORMSPREE_CONFIG || {
        endpoint: 'https://formspree.io/f/xdkzbovn',
        additionalFields: {
            '_subject': 'New Contact Form Submission - Robin',
            '_next': window.location.href
        },
        error: {
            default: 'Something went wrong. Please try again or email us directly at chirpwithrobin@gmail.com'
        }
    };
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Get form data
        const formData = new FormData(form);
        
        // Add additional fields from configuration
        if (config.additionalFields) {
            Object.entries(config.additionalFields).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }
        
        // Submit to Formspree
        const response = await fetch(config.endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            console.log('Form submitted successfully to Formspree');
        } else {
            throw new Error('Form submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        const errorMessage = config.error?.default || 'Something went wrong. Please try again or email us directly at chirpwithrobin@gmail.com';
        showErrorMessage(errorMessage);
    } finally {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Hide form
    form.style.display = 'none';
    
    // Show success message
    successMessage.classList.add('show');
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage(message) {
    // Create a temporary error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 300px;
        font-size: 0.9rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 5000);
}

// FAQ Functionality - Using exact same code as getting-started page
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found', faqItems.length, 'FAQ items');
    
    faqItems.forEach(function(item, index) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            console.log('Setting up FAQ item', index + 1);
            
            // Function to toggle FAQ item
            function toggleFAQ() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items first
                faqItems.forEach(function(otherItem) {
                    otherItem.classList.remove('active');
                });
                
                // If this item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    console.log('FAQ item opened:', index + 1);
                }
            }
            
            // Add click event to the question
            question.addEventListener('click', toggleFAQ);
            
            // Add click event to the toggle arrow as well
            toggle.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent double triggering
                toggleFAQ();
            });
            
            // Make it keyboard accessible
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ();
                }
            });
            
            console.log('FAQ item', index + 1, 'setup complete');
        } else {
            console.error('FAQ item', index + 1, 'missing elements:', {
                question: !!question,
                answer: !!answer,
                toggle: !!toggle
            });
        }
    });
}

// Animations
function initAnimations() {
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
    const animateElements = document.querySelectorAll('.form-container, .contact-info, .faq-item');
    animateElements.forEach(el => observer.observe(el));
    
    // Add animation classes to CSS
    addAnimationStyles();
}

function addAnimationStyles() {
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .form-container, .contact-info, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .form-container.animate-in, .contact-info.animate-in, .faq-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .faq-item:nth-child(1) { transition-delay: 0.1s; }
        .faq-item:nth-child(2) { transition-delay: 0.2s; }
        .faq-item:nth-child(3) { transition-delay: 0.3s; }
        .faq-item:nth-child(4) { transition-delay: 0.4s; }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Social Media Links (placeholder for now)
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add your social media URLs here
            const socialType = link.classList.contains('instagram') ? 'Instagram' : 'LinkedIn';
            alert(`${socialType} link will be added soon!`);
        });
    });
}

// Utility Functions
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

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        // Add ARIA labels and descriptions
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.setAttribute('aria-labelledby', label.id || input.id + '-label');
            }
        });
    }
});

// Export functions for potential external use
window.ContactForm = {
    validateForm,
    submitForm,
    showSuccessMessage,
    showErrorMessage,
    initFAQ,
    FORMSPREE_CONFIG
}; 