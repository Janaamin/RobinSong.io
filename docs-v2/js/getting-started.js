// Getting Started Page JavaScript - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    console.log('Getting Started page loaded');
    
    // Enhanced Step Card Interactions
    function initStepCards() {
        const stepCards = document.querySelectorAll('.step-card');
        
        stepCards.forEach((card, index) => {
            // Add staggered animation on load
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Simple FAQ Accordion Functionality - More Robust Version
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
    
    // Initialize all functionality
    initStepCards();
    initFAQ();
    
    // Also try FAQ again after a short delay to ensure DOM is fully ready
    setTimeout(initFAQ, 100);

    // Permission Modal Functionality
    const microphoneModal = document.getElementById('microphoneModal');
    const locationModal = document.getElementById('locationModal');
    const closeMicrophoneModal = document.getElementById('closeMicrophoneModal');
    const closeLocationModal = document.getElementById('closeLocationModal');
    const permissionStatusButtons = document.querySelectorAll('.permission-status[data-permission]');
    
    // Open modal when clicking on permission status badges
    permissionStatusButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const permissionType = button.getAttribute('data-permission');
            
            if (permissionType === 'microphone') {
                // Show microphone modal
                microphoneModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else if (permissionType === 'location') {
                // Show location modal
                locationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close microphone modal
    closeMicrophoneModal.addEventListener('click', function() {
        closeModal(microphoneModal);
    });
    
    // Close location modal
    closeLocationModal.addEventListener('click', function() {
        closeModal(locationModal);
    });
    
    // Close modals when clicking overlay
    microphoneModal.addEventListener('click', function(e) {
        if (e.target === microphoneModal || e.target.classList.contains('modal-overlay')) {
            closeModal(microphoneModal);
        }
    });
    
    locationModal.addEventListener('click', function(e) {
        if (e.target === locationModal || e.target.classList.contains('modal-overlay')) {
            closeModal(locationModal);
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (microphoneModal.classList.contains('active')) {
                closeModal(microphoneModal);
            } else if (locationModal.classList.contains('active')) {
                closeModal(locationModal);
            }
        }
    });
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add interactive effects to permission dialog buttons
    const dialogButtons = document.querySelectorAll('.btn-secondary, .btn-primary');
    
    dialogButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Add click feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            // Show feedback message
            const isAllow = btn.classList.contains('btn-primary');
            const message = isAllow ? 'Permission granted!' : 'Permission denied';
            
            // Create temporary feedback
            const feedback = document.createElement('div');
            feedback.textContent = message;
            feedback.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: ${isAllow ? 'var(--primary-color)' : '#ef4444'};
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 600;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            // Add to modal content
            const modalContent = btn.closest('.modal-content');
            modalContent.appendChild(feedback);
            
            // Animate in
            setTimeout(() => {
                feedback.style.opacity = '1';
            }, 10);
            
            // Remove after delay
            setTimeout(() => {
                feedback.style.opacity = '0';
                setTimeout(() => {
                    if (feedback.parentNode) {
                        feedback.parentNode.removeChild(feedback);
                    }
                }, 300);
            }, 1500);
        });
    });

    // Test FAQ functionality after page load
    setTimeout(function() {
        console.log('Testing FAQ functionality...');
        const firstFaqItem = document.querySelector('.faq-item');
        const firstFaqQuestion = document.querySelector('.faq-question');
        
        if (firstFaqItem && firstFaqQuestion) {
            console.log('First FAQ item found:', firstFaqItem);
            console.log('First FAQ question found:', firstFaqQuestion);
            
            // Test click
            console.log('Testing click on first FAQ item...');
            firstFaqQuestion.click();
            
            setTimeout(function() {
                const isActive = firstFaqItem.classList.contains('active');
                console.log('After test click, FAQ item is active:', isActive);
                
                // Test closing
                console.log('Testing close...');
                firstFaqQuestion.click();
                
                setTimeout(function() {
                    const isStillActive = firstFaqItem.classList.contains('active');
                    console.log('After close test, FAQ item is active:', isStillActive);
                }, 100);
            }, 100);
        } else {
            console.error('Could not find FAQ elements for testing');
        }
    }, 1000);

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for step cards
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add click effects for permission cards
    const permissionCards = document.querySelectorAll('.permission-card');
    
    permissionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a subtle click effect
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });

    // Initialize tooltips for permission status badges
    const statusBadges = document.querySelectorAll('.permission-status');
    
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            const status = badge.textContent.toLowerCase();
            let tooltipText = '';
            
            if (status === 'required') {
                tooltipText = 'This permission is essential for Robin to function properly';
            } else if (status === 'optional') {
                tooltipText = 'This permission enhances features but is not required';
            }
            
            if (tooltipText) {
                badge.setAttribute('title', tooltipText);
            }
        });
    });

    // Add loading animation for video container
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.style.opacity = '0';
        videoContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            videoContainer.style.transition = 'all 0.6s ease';
            videoContainer.style.opacity = '1';
            videoContainer.style.transform = 'translateY(0)';
        }, 300);
    }

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.step-card, .permission-card, .faq-item, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Add statistics counter animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = stat.getAttribute('data-final') || stat.textContent;
            const isNumber = /^\d+/.test(finalValue);
            if (isNumber) {
                const targetNumber = parseInt(finalValue);
                let currentNumber = 0;
                const increment = targetNumber / 50;
                // Reset to zero before animating
                stat.textContent = '0' + finalValue.replace(/^\d+/, '');
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        currentNumber = targetNumber;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(currentNumber) + finalValue.replace(/^\d+/, '');
                }, 30);
            }
        });
    }
    // Trigger stats animation every time CTA section is visible
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        ctaObserver.observe(ctaSection);
    }
}); 