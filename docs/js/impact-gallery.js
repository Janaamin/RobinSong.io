// Impact Gallery & Modal Logic

document.addEventListener('DOMContentLoaded', function () {
    // --- Section Fade-in Animation ---
    const sections = document.querySelectorAll('#main-content section, .launch-event, .modern-card');
    const revealOnScroll = () => {
        const trigger = window.innerHeight * 0.92;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < trigger) {
                section.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- Gallery Carousel ---
    const gallery = document.querySelector('.event-gallery');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    let currentIndex = 0;

    function showGalleryItem(idx) {
        currentIndex = idx;
        gallery.scrollTo({
            left: galleryItems[idx].offsetLeft,
            behavior: 'smooth'
        });
        indicators.forEach((ind, i) => ind.classList.toggle('active', i === idx));
    }

    prevBtn && prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) showGalleryItem(currentIndex - 1);
    });
    nextBtn && nextBtn.addEventListener('click', () => {
        if (currentIndex < galleryItems.length - 1) showGalleryItem(currentIndex + 1);
    });
    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => showGalleryItem(i));
    });
    // Sync scroll with indicators
    gallery && gallery.addEventListener('scroll', () => {
        let idx = galleryItems.findIndex(item => {
            const rect = item.getBoundingClientRect();
            return rect.left >= gallery.getBoundingClientRect().left - 5;
        });
        if (idx !== -1 && idx !== currentIndex) {
            showGalleryItem(idx);
        }
    });
    // Initial state
    showGalleryItem(0);

    // --- Modal Logic ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    let modalIndex = 0;

    function openModal(idx) {
        modalIndex = idx;
        const img = galleryItems[idx].querySelector('img');
        modalImg.src = img.src;
        modalCaption.textContent = galleryItems[idx].querySelector('.caption').textContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    function showModalImg(idx) {
        modalIndex = idx;
        const img = galleryItems[idx].querySelector('img');
        modalImg.src = img.src;
        modalCaption.textContent = galleryItems[idx].querySelector('.caption').textContent;
    }
    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openModal(i));
    });
    modalClose && modalClose.addEventListener('click', closeModal);
    modalPrev && modalPrev.addEventListener('click', () => {
        if (modalIndex > 0) showModalImg(modalIndex - 1);
    });
    modalNext && modalNext.addEventListener('click', () => {
        if (modalIndex < galleryItems.length - 1) showModalImg(modalIndex + 1);
    });
    window.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft' && modalIndex > 0) showModalImg(modalIndex - 1);
            if (e.key === 'ArrowRight' && modalIndex < galleryItems.length - 1) showModalImg(modalIndex + 1);
        }
    });
    modal && modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Thumbnail Gallery 'See More' Logic ---
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            thumbs.forEach(thumb => {
                if (thumb.dataset.hidden === 'true') {
                    thumb.style.display = 'inline-block';
                }
            });
            seeMoreBtn.style.display = 'none';
        });
        // Hide thumbs with data-hidden by default
        thumbs.forEach(thumb => {
            if (thumb.dataset.hidden === 'true') {
                thumb.style.display = 'none';
            }
        });
    }
    // Clicking a thumb opens modal at corresponding gallery image if exists
    thumbs.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            // Try to match thumb src to gallery image src
            const idx = galleryItems.findIndex(item => item.querySelector('img').src.includes(thumb.src.split('/').pop()));
            if (idx !== -1) openModal(idx);
            else {
                // If not in main gallery, just show thumb in modal
                modalImg.src = thumb.src;
                modalCaption.textContent = thumb.alt;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // --- Animated Stat Counters ---
    function animateStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const end = parseInt(stat.getAttribute('data-count'), 10);
            let start = 0;
            if (stat.dataset.animated) return;
            stat.dataset.animated = 'true';
            const duration = 1200;
            const step = Math.max(1, Math.floor(end / (duration / 16)));
            function update() {
                start += step;
                if (start >= end) {
                    stat.textContent = end;
                } else {
                    stat.textContent = start;
                    requestAnimationFrame(update);
                }
            }
            update();
        });
    }
    // Trigger stat animation on scroll into view
    let statsAnimated = false;
    function checkStatsInView() {
        const statsSection = document.querySelector('.impact-stats');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (!statsAnimated && rect.top < window.innerHeight * 0.85) {
            animateStatCounters();
            statsAnimated = true;
        }
    }
    window.addEventListener('scroll', checkStatsInView);
    checkStatsInView();

    // --- Testimonial Carousel ---
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const prevTestimonial = document.querySelector('.testimonial-prev');
    const nextTestimonial = document.querySelector('.testimonial-next');
    let testimonialIndex = 0;
    function showTestimonial(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        testimonialIndex = idx;
    }
    prevTestimonial && prevTestimonial.addEventListener('click', () => {
        showTestimonial((testimonialIndex - 1 + slides.length) % slides.length);
    });
    nextTestimonial && nextTestimonial.addEventListener('click', () => {
        showTestimonial((testimonialIndex + 1) % slides.length);
    });
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (document.activeElement === prevTestimonial || document.activeElement === nextTestimonial) {
            if (e.key === 'ArrowLeft') prevTestimonial.click();
            if (e.key === 'ArrowRight') nextTestimonial.click();
        }
    });
    // Initial state
    showTestimonial(0);

    // --- Modern Launch Gallery Carousel & Modal (scoped to avoid redeclaration)
    (function () {
        document.addEventListener('DOMContentLoaded', function () {
            // Gallery Carousel
            const galleryTrack = document.querySelector('.gallery-track');
            const slides = Array.from(document.querySelectorAll('.gallery-slide'));
            const prevBtn = document.querySelector('.gallery-nav-btn.prev');
            const nextBtn = document.querySelector('.gallery-nav-btn.next');
            const indicatorsContainer = document.querySelector('.gallery-indicators');
            const viewAllBtn = document.getElementById('viewAllGallery');
            const modal = document.getElementById('galleryModal');
            const closeModalBtn = document.getElementById('closeGalleryModal');
            const modalImages = Array.from(document.querySelectorAll('.modal-grid img'));
            
            let currentSlide = 0;
            let autoScrollInterval;
            const AUTO_SCROLL_DELAY = 5000;

            // Initialize gallery
            function initGallery() {
                if (!slides.length) return;
                
                createIndicators();
                updateSlide();
                startAutoScroll();
                setupEventListeners();
            }

            // Create indicator dots
            function createIndicators() {
                indicatorsContainer.innerHTML = '';
                slides.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = 'indicator' + (index === 0 ? ' active' : '');
                    dot.setAttribute('tabindex', '0');
                    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                    dot.addEventListener('click', () => goToSlide(index));
                    dot.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            goToSlide(index);
                        }
                    });
                    indicatorsContainer.appendChild(dot);
                });
            }

            // Update slide display
            function updateSlide() {
                slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === currentSlide);
                });
                
                // Update indicators
                const indicators = Array.from(indicatorsContainer.children);
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            }

            // Navigate to specific slide
            function goToSlide(index) {
                currentSlide = index;
                updateSlide();
                startAutoScroll(); // Reset auto-scroll timer
            }

            // Next slide
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlide();
            }

            // Previous slide
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlide();
            }

            // Auto-scroll functionality
            function startAutoScroll() {
                stopAutoScroll();
                autoScrollInterval = setInterval(nextSlide, AUTO_SCROLL_DELAY);
            }

            function stopAutoScroll() {
                if (autoScrollInterval) {
                    clearInterval(autoScrollInterval);
                }
            }

            // Modal functionality
            function openModal() {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                modal.focus();
            }

            function closeModal() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Setup event listeners
            function setupEventListeners() {
                // Navigation buttons
                prevBtn.addEventListener('click', () => {
                    prevSlide();
                    startAutoScroll();
                });
                
                nextBtn.addEventListener('click', () => {
                    nextSlide();
                    startAutoScroll();
                });

                // Pause auto-scroll on hover/focus
                galleryTrack.addEventListener('mouseenter', stopAutoScroll);
                galleryTrack.addEventListener('mouseleave', startAutoScroll);
                galleryTrack.addEventListener('focusin', stopAutoScroll);
                galleryTrack.addEventListener('focusout', startAutoScroll);

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (document.activeElement.closest('.gallery-carousel')) {
                        if (e.key === 'ArrowLeft') {
                            prevSlide();
                            startAutoScroll();
                        } else if (e.key === 'ArrowRight') {
                            nextSlide();
                            startAutoScroll();
                        }
                    }
                });

                // Modal events
                viewAllBtn.addEventListener('click', openModal);
                closeModalBtn.addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });

                // Close modal with Escape key
                document.addEventListener('keydown', (e) => {
                    if (modal.classList.contains('active') && e.key === 'Escape') {
                        closeModal();
                    }
                });

                // Click modal images to open in new tab
                modalImages.forEach(img => {
                    img.addEventListener('click', () => {
                        window.open(img.src, '_blank');
                    });
                });
            }

            // Initialize the gallery
            initGallery();
        });
    })();

    // --- Simple Single-Image Carousel Logic ---
    const simpleCarouselImages = [
        { src: 'assets/launch pics/launch2.jpg', caption: 'Meet The Robin Team!' },
        { src: 'assets/launch pics/launch1.jpg', caption: 'Group photo with the Robin team and attendees' },
        { src: 'assets/launch pics/launch4.jpg', caption: 'The Robin Team with Donna' },
        { src: 'assets/launch pics/launch9.jpg', caption: 'Robin Team with Dr. Song & Dr. Bruce Maxim' },
        { src: 'assets/launch pics/launch7.jpg', caption: 'Robin Team with Provost Gabriella' },
        { src: 'assets/launch pics/launch3.jpg', caption: 'Robin Team with Dean Kridli' },
        { src: 'assets/launch pics/launch8.jpg', caption: 'With Dr. Sirja Das & Dr. Zheng Song' },
        { src: 'assets/launch pics/launch10.jpg', caption: 'Attendees of the Launch' },
        { src: 'assets/launch pics/launch5.jpg', caption: 'Q&A Session' },
        { src: 'assets/launch pics/launch6.jpg', caption: 'Group Photo at EIC' },
        { src: 'assets/launch pics/launch11.jpg', caption: 'Candid moments at the event' },
        { src: 'assets/launch pics/launch12.jpg', caption: 'Celebrating Robin\'s launch' }
    ];

    function setupSimpleCarousel() {
        const imgEl = document.querySelector('.carousel-image');
        const captionEl = document.querySelector('.carousel-caption');
        const leftArrow = document.querySelector('.carousel-arrow.left');
        const rightArrow = document.querySelector('.carousel-arrow.right');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        let current = 0;

        function render() {
            imgEl.src = simpleCarouselImages[current].src;
            imgEl.alt = simpleCarouselImages[current].caption;
            captionEl.textContent = simpleCarouselImages[current].caption;
            indicatorsContainer.innerHTML = '';
            simpleCarouselImages.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = 'indicator' + (i === current ? ' active' : '');
                dot.addEventListener('click', () => goTo(i));
                indicatorsContainer.appendChild(dot);
            });
        }
        function goTo(idx) {
            current = (idx + simpleCarouselImages.length) % simpleCarouselImages.length;
            render();
        }
        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }
        leftArrow.addEventListener('click', prev);
        rightArrow.addEventListener('click', next);
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        });
        render();
    }

    setupSimpleCarousel();

    // --- Creative Featured Gallery Logic ---
    const mainImg = document.getElementById('creative-featured-img');
    const mainCaption = document.getElementById('creative-featured-caption');
    const creativeThumbs = document.querySelectorAll('.creative-thumb');
    if (mainImg && mainCaption && creativeThumbs.length) {
        creativeThumbs.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Remove active from all
                creativeThumbs.forEach(t => t.classList.remove('active'));
                // Set active
                this.classList.add('active');
                // Animate out
                mainImg.style.opacity = '0.2';
                setTimeout(() => {
                    mainImg.src = this.dataset.img;
                    mainImg.alt = this.dataset.caption;
                    mainCaption.textContent = this.dataset.caption;
                    mainImg.style.opacity = '1';
                }, 180);
            });
        });
        // Set first thumb as active
        creativeThumbs[0].classList.add('active');
    }

    // Bento Box Modal Logic
    const bentoModal = document.getElementById('bentoModal');
    const bentoModalImg = document.getElementById('bentoModalImg');
    const bentoClose = document.querySelector('.bento-close');
    document.querySelectorAll('.bento-card img').forEach(img => {
        img.addEventListener('click', function(e) {
            bentoModal.classList.add('active');
            bentoModalImg.src = this.src;
            bentoModalImg.alt = this.alt;
            document.body.style.overflow = 'hidden';
        });
    });
    bentoClose.addEventListener('click', function() {
        bentoModal.classList.remove('active');
        bentoModalImg.src = '';
        document.body.style.overflow = '';
    });
    bentoModal.addEventListener('click', function(e) {
        if (e.target === bentoModal) {
            bentoModal.classList.remove('active');
            bentoModalImg.src = '';
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (bentoModal.classList.contains('active') && e.key === 'Escape') {
            bentoModal.classList.remove('active');
            bentoModalImg.src = '';
            document.body.style.overflow = '';
        }
    });
});

// Modern Gallery Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.gallery-carousel');
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
    
    console.log('Found carousel with', slides.length, 'slides');
    
    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds
    const totalSlides = slides.length;

    // Initialize carousel
    function initCarousel() {
        console.log('Initializing carousel...');
        updateSlide();
        updateProgressBar();
        startAutoPlay();
        addEventListeners();
        
        // Force the first slide to be visible
        if (slides.length > 0) {
            slides[0].classList.add('active');
            slides[0].style.opacity = '1';
            slides[0].style.transform = 'translateX(0) scale(1)';
            slides[0].style.filter = 'blur(0)';
            slides[0].style.zIndex = '2';
        }
    }

    // Update slide display
    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0) scale(1)';
                slide.style.filter = 'blur(0)';
                slide.style.zIndex = '2';
            } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
                slide.classList.add('prev');
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(-100%) scale(0.95)';
                slide.style.filter = 'blur(2px)';
                slide.style.zIndex = '1';
            } else {
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(100%) scale(0.95)';
                slide.style.filter = 'blur(2px)';
                slide.style.zIndex = '1';
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
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
        resetAutoPlay();
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
        nextBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });

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
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
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
                goToSlide(targetSlide);
            });
        }
    }

    // Initialize the carousel
    initCarousel();
});

// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('galleryModal');
    const viewAllBtn = document.getElementById('viewAllGallery');
    const closeBtn = document.getElementById('closeGalleryModal');

    if (!modal || !viewAllBtn || !closeBtn) return;

    // Open modal
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation to modal images
        const modalImages = modal.querySelectorAll('.modal-image-item');
        modalImages.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset modal images
        const modalImages = modal.querySelectorAll('.modal-image-item');
        modalImages.forEach(item => {
            item.style.transition = '';
            item.style.opacity = '';
            item.style.transform = '';
        });
    }

    closeBtn.addEventListener('click', closeModal);

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Add click handlers to modal images for potential lightbox functionality
    const modalImageItems = modal.querySelectorAll('.modal-image-item');
    modalImageItems.forEach(item => {
        item.addEventListener('click', () => {
            // Optional: Add lightbox functionality here
            // For now, just add a subtle scale effect
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
        });
    });
});

// Smooth scroll to gallery section when clicking "View All Photos"
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.getElementById('viewAllGallery');
    const gallerySection = document.querySelector('.modern-launch-gallery');
    
    if (viewAllBtn && gallerySection) {
        viewAllBtn.addEventListener('click', (e) => {
            // Smooth scroll to gallery section before opening modal
            gallerySection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        });
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image-container img, .modal-image-item img');
    
    console.log('Found', images.length, 'images to load');
    
    images.forEach((img, index) => {
        console.log('Loading image', index + 1, ':', img.src);
        
        // Add loading state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.4s ease';
        
        img.addEventListener('load', () => {
            console.log('Image loaded successfully:', img.src);
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            console.error('Image failed to load:', img.src);
            // Handle image loading errors
            img.style.opacity = '0.5';
            img.style.filter = 'grayscale(100%)';
            
            // Add fallback text
            const fallback = document.createElement('div');
            fallback.textContent = 'Image not available';
            fallback.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #666;
                font-size: 1rem;
                z-index: 2;
            `;
            img.parentNode.appendChild(fallback);
        });
    });
});

// Add intersection observer for performance
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.gallery-carousel');
    if (!carousel) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Carousel is visible, ensure it's initialized
                entry.target.style.visibility = 'visible';
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(carousel);
}); 