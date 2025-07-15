// Modern Impact Carousel & Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Impact page loaded');
    
    // Initialize all carousels and functionality
    initImageCarousel();
    initTestimonialCarousel();
    initStatCounters();
});

// Image Carousel Functionality
function initImageCarousel() {
    console.log('Initializing image carousel');
    
    const carousel = document.querySelector('.modern-carousel');
    if (!carousel) {
        console.log('Carousel not found');
        return;
    }

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const progressBar = carousel.querySelector('.carousel-progress-bar');
    const currentSlideText = carousel.querySelector('.current-slide');
    const totalSlidesText = carousel.querySelector('.total-slides');

    // Modal elements
    const modal = document.getElementById('imageModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalImage = document.getElementById('modalImage');
    const closeModal = modal.querySelector('.close-modal');
    const modalPrevBtn = modal.querySelector('.modal-nav-btn.prev-btn');
    const modalNextBtn = modal.querySelector('.modal-nav-btn.next-btn');
    const modalCurrent = document.getElementById('modalCurrent');
    const modalTotal = document.getElementById('modalTotal');
    
    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 2000; // 2 seconds
    const totalSlides = slides.length;

    console.log('Found', totalSlides, 'slides');

    // Set total slides text
    if (totalSlidesText) {
        totalSlidesText.textContent = totalSlides;
    }

    // Initialize carousel
    function initCarousel() {
        console.log('Initializing carousel with', totalSlides, 'slides');
        console.log('Current slide:', currentSlide);
        updateSlide();
        updateProgressBar();
        startAutoPlay();
        addEventListeners();
        initModal();
    }

    // Initialize modal functionality
    function initModal() {
        // Set total count
        modalTotal.textContent = totalSlides;
        
        // Add click listeners to all images
        const imageContainers = carousel.querySelectorAll('.image-container');
        imageContainers.forEach((container, index) => {
            container.addEventListener('click', () => {
                console.log('Opening modal for slide', index);
                openModal(index);
            });
        });
        
        // Close modal events
        closeModal.addEventListener('click', closeModalFunc);
        // Close when clicking outside modal-content
        modal.addEventListener('click', (e) => {
            if (e.target === modal || !modalContent.contains(e.target)) closeModalFunc();
        });
        
        // Modal navigation
        modalPrevBtn.addEventListener('click', () => {
            const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            updateModalImage(newIndex);
        });
        
        modalNextBtn.addEventListener('click', () => {
            const newIndex = (currentSlide + 1) % totalSlides;
            updateModalImage(newIndex);
        });
        
        // Keyboard navigation for modal
        document.addEventListener('keydown', handleModalKeydown);
    }
    
    // Handle keyboard navigation for modal
    function handleModalKeydown(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModalFunc();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                updateModalImage(newIndex);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const newIndex = (currentSlide + 1) % totalSlides;
                updateModalImage(newIndex);
            }
        }
    }
    
    // Open modal
    function openModal(slideIndex) {
        console.log('Opening modal for slide index:', slideIndex);
        currentSlide = slideIndex;
        updateModalImage(slideIndex);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Close modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Update modal image
    function updateModalImage(slideIndex) {
        console.log('Updating modal image for slide index:', slideIndex);
        currentSlide = slideIndex;
        const slide = slides[slideIndex];
        const img = slide.querySelector('.carousel-image');
        
        if (img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalCurrent.textContent = slideIndex + 1;
            
            // Update carousel to match modal
            updateSlide();
            updateProgressBar();
        } else {
            console.error('Image not found for slide index:', slideIndex);
        }
    }

    // Update slide display
    function updateSlide() {
        // Update active states for styling - show only current slide
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Update current slide text
        if (currentSlideText) {
            currentSlideText.textContent = currentSlide + 1;
        }
    }

    // Update progress bar
    function updateProgressBar() {
        if (progressBar) {
            const progress = ((currentSlide + 1) / totalSlides) * 100;
            progressBar.style.width = progress + '%';
        }
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        updateProgressBar();
        resetAutoPlay();
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
        updateProgressBar();
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
        updateProgressBar();
        resetAutoPlay();
    }

    // Auto-play functionality
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Add event listeners
    function addEventListeners() {
        // Navigation buttons
        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
        nextBtn?.addEventListener('click', (e => {
            e.preventDefault();
            nextSlide();
        }));

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(index);
            });
        });

        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        let isDragging = false;

        carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        });

        carousel.addEventListener('touchmove', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });

        carousel.addEventListener('touchend', (e) => {
            if (isDragging) {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
                isDragging = false;
                startAutoPlay();
            }
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left
                } else {
                    prevSlide(); // Swipe right
                }
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display !== 'block') {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                }
            }
        });

        // Progress bar click navigation
        const progressContainer = carousel.querySelector('.carousel-progress');
        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const progressWidth = rect.width;
                const clickPercentage = clickX / progressWidth;
                const targetSlide = Math.floor(clickPercentage * totalSlides);
                goToSlide(Math.min(targetSlide, totalSlides - 1));
            });
        }
    }

    // Initialize the carousel
    initCarousel();
}

// Testimonial Carousel Functionality
function initTestimonialCarousel() {
    console.log('Initializing testimonial carousel');
    
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    if (!testimonialCarousel) {
        console.log('Testimonial carousel not found');
        return;
    }

    const slides = testimonialCarousel.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-advance testimonials
    setInterval(nextSlide, 6000);

    // Initialize first slide
    showSlide(0);
}

// Animated Stat Counters
function initStatCounters() {
    console.log('Initializing stat counters');
    
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                if (!stat.dataset.animated) {
                    animateCounter(stat);
                    stat.dataset.animated = 'true';
                }
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function update() {
        current += step;
        if (current >= target) {
            element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
    }

    update();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .carousel-slide {
        transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        z-index: 1;
        pointer-events: none;
    }
    .carousel-slide.active {
        opacity: 1;
        z-index: 2;
        pointer-events: auto;
    }
    .carousel-slide.prev, .carousel-slide.next {
        opacity: 0;
        z-index: 1;
        pointer-events: none;
    }

    .testimonial-slide {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);

// Featured Gallery (Awards) - Interactive Thumbnails
const featuredImg = document.getElementById('featured-award-img');
const featuredCaption = document.getElementById('featured-award-caption');
const thumbs = document.querySelectorAll('.featured-thumbnails .thumb');
if (featuredImg && featuredCaption && thumbs.length) {
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active from all
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Swap image and caption
            featuredImg.src = this.dataset.img;
            featuredImg.alt = this.querySelector('img').alt;
            featuredCaption.textContent = this.dataset.caption;
  });
}); 
    // Set first thumb as active on load
    thumbs[0].classList.add('active');
}

console.log('Impact page JavaScript loaded successfully'); 