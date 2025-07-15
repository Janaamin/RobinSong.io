document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    const logo = document.querySelector('.logo');
    
    // Remove any existing active classes
    navLinks.forEach(link => link.classList.remove('active'));
    if (logo) logo.classList.remove('active');
    
    // Check if we're on the index/home page
    const isIndexPage = currentPath.endsWith('/') || currentPath.endsWith('/index.html');
    
    if (isIndexPage) {
        // On index page, highlight the logo
        if (logo) logo.classList.add('active');
    } else {
        // On other pages, highlight the corresponding nav link
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.endsWith(linkPath)) {
                link.classList.add('active');
            }
        });
    }

    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    if(heroContent) observer.observe(heroContent);
    if(heroVisual) observer.observe(heroVisual);
});

// Permission Page Functionality
// Permission Accordion
function setupSingleOpenAccordion(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        const header = item.querySelector(':scope > .permission-header, :scope > .faq-question');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all
                items.forEach(other => other.classList.remove('active'));
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Permission Accordions (only one open, toggle close)
    const permissionAccordions = document.querySelectorAll('.permission-accordion');
    permissionAccordions.forEach(accordion => {
        const header = accordion.querySelector('.permission-header');
        header.addEventListener('click', () => {
            const isActive = accordion.classList.contains('active');
            // Close all
            permissionAccordions.forEach(other => other.classList.remove('active'));
            // Toggle current
            if (!isActive) {
                accordion.classList.add('active');
            }
        });
    });

    // FAQ Accordions (only one open, toggle close)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            faqItems.forEach(other => other.classList.remove('active'));
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Dialog controls (unchanged)
    const dialogs = document.querySelectorAll('.permission-dialog');
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            dialogs.forEach(d => d.classList.remove('show'));
            document.getElementById(btn.dataset.dialog).classList.add('show');
        });
    });
}); 

// PDF Preview Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const pdfModal = document.getElementById('pdfPreviewModal');
    const closePdfModal = document.getElementById('closePdfModal');
    const pdfPreviewFrame = document.getElementById('pdfPreviewFrame');
    const modalTitle = document.getElementById('modalTitle');
    const fullPdfLink = document.getElementById('fullPdfLink');
    
    // Paper titles for the modal
    const paperTitles = {
        'EIT': 'Robin: An Intelligent Bird Observation Application for the Visually Impaired and K‑12 Education',
        'SMC': 'A Spatiotemporal Machine Learning Framework for Ecologically‑Informed Bird Sighting Prediction'
    };
    
    // Paper PDF paths
    const paperPaths = {
        'EIT': 'assets/papers/EIT.pdf',
        'SMC': 'assets/papers/SMC.pdf'
    };
    
    // Add click event listeners to preview buttons
    document.querySelectorAll('.preview-link').forEach(button => {
        button.addEventListener('click', function() {
            const paperType = this.getAttribute('data-paper');
            const title = paperTitles[paperType];
            const pdfPath = paperPaths[paperType];
            
            // Update modal content
            modalTitle.textContent = title;
            pdfPreviewFrame.src = pdfPath + '#toolbar=0&navpanes=0&scrollbar=0';
            fullPdfLink.href = pdfPath;
            
            // Show modal
            pdfModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking the close button
    closePdfModal.addEventListener('click', function() {
        pdfModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        pdfPreviewFrame.src = '';
    });
    
    // Close modal when clicking outside the modal content
    pdfModal.addEventListener('click', function(e) {
        if (e.target === pdfModal) {
            pdfModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            pdfPreviewFrame.src = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pdfModal.style.display === 'block') {
            pdfModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            pdfPreviewFrame.src = '';
        }
    });
});

// Bento Box Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const bentoModal = document.getElementById('bentoModal');
    const bentoClose = document.querySelector('.bento-close');
    const bentoModalImg = document.getElementById('bentoModalImg');
    
    // Add click event listeners to all bento card images
    document.querySelectorAll('.bento-card img').forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.src;
            const imgAlt = this.alt;
            
            // Update modal content
            bentoModalImg.src = imgSrc;
            bentoModalImg.alt = imgAlt;
            
            // Show modal
            bentoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking the close button
    bentoClose.addEventListener('click', function() {
        bentoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the modal content
    bentoModal.addEventListener('click', function(e) {
        if (e.target === bentoModal) {
            bentoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bentoModal.style.display === 'block') {
            bentoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 