// Formspree Configuration File
// This file contains all Formspree-related settings for the Robin website

const FORMSPREE_CONFIG = {
    // Your Formspree endpoint (replace with your actual endpoint)
    endpoint: 'https://formspree.io/f/xpwrbqqz',
    
    // Optional: Redirect URL after successful submission
    // Set to null to stay on the same page
    redirect: null,
    
    // Email subject for form submissions
    subject: 'New Contact Form Submission - Robin',
    
    // Additional form fields to include
    additionalFields: {
        '_subject': 'New Contact Form Submission - Robin',
        '_next': window.location.href, // Stay on same page
        '_captcha': false, // Disable captcha (Formspree handles spam protection)
        // Add both email addresses to ensure delivery
        '_replyto': 'chirpwithrobin@gmail.com'
    },
    
    // Success message settings
    success: {
        title: 'Message Sent Successfully!',
        message: 'Thank you for reaching out. We\'ll get back to you within 24 hours.',
        showForm: false // Hide form after successful submission
    },
    
    // Error message settings
    error: {
        default: 'Something went wrong. Please try again or email us directly at chirpwithrobin@gmail.com',
        network: 'Network error. Please check your connection and try again.',
        validation: 'Please check your form and try again.'
    },
    
    // Form validation settings
    validation: {
        minMessageLength: 10,
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        requiredFields: ['name', 'email', 'subject', 'message']
    },
    
    // Loading state settings
    loading: {
        text: 'Sending Message...',
        duration: 2000 // Minimum loading time in milliseconds
    },
    
    // Email delivery settings
    emailDelivery: {
        primaryEmail: 'chirpwithrobin@gmail.com',
        secondaryEmail: 'janaamin@umich.edu',
        // Formspree will send to all verified emails in your account
        verifiedEmails: [
            'chirpwithrobin@gmail.com',
            'janaamin@umich.edu'
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FORMSPREE_CONFIG;
} else {
    window.FORMSPREE_CONFIG = FORMSPREE_CONFIG;
} 