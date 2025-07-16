// Navigation
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Hide/Show Navigation on Scroll
  let lastScroll = 0;
  const nav = document.querySelector('.nav-container');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      nav.classList.remove('hidden');
      return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('hidden')) {
      // Scrolling down
      nav.classList.add('hidden');
    } else if (currentScroll < lastScroll && nav.classList.contains('hidden')) {
      // Scrolling up
      nav.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth Scroll for Anchor Links
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

  // Intersection Observer for Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
  });

  // Dark Mode Toggle
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  // Search Functionality
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  
  if (searchInput && searchResults) {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }
      
      searchTimeout = setTimeout(() => {
        // Simulate search results (replace with actual search implementation)
        const results = performSearch(query);
        displaySearchResults(results);
      }, 300);
    });
  }

  // Lazy Loading Images
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // Form Validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!validateForm(form)) {
        e.preventDefault();
      }
    });
  });
});

// Utility Functions
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      
      // Add error message if it doesn't exist
      if (!field.nextElementSibling?.classList.contains('error-message')) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'This field is required';
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
      }
    } else {
      field.classList.remove('error');
      const errorMessage = field.nextElementSibling;
      if (errorMessage?.classList.contains('error-message')) {
        errorMessage.remove();
      }
    }
  });
  
  return isValid;
}

function performSearch(query) {
  // Implement actual search logic here
  // This is a placeholder that returns dummy results
  return [
    { title: 'Feature 1', url: '#feature1' },
    { title: 'Feature 2', url: '#feature2' },
    { title: 'Feature 3', url: '#feature3' }
  ].filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase())
  );
}

function displaySearchResults(results) {
  const searchResults = document.querySelector('.search-results');
  if (!searchResults) return;
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found</div>';
  } else {
    searchResults.innerHTML = results
      .map(result => `
        <a href="${result.url}" class="search-result-item">
          ${result.title}
        </a>
      `)
      .join('');
  }
  
  searchResults.style.display = 'block';
}

// Export functions for use in other modules
export {
  validateForm,
  performSearch,
  displaySearchResults
}; 