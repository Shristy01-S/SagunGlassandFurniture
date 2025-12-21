// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // Show success message
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Observe section headers
document.querySelectorAll('.section-header').forEach(header => {
    observer.observe(header);
});

// Add loading effect for images - make visible by default
document.querySelectorAll('img').forEach(img => {
    // Set images to be visible by default
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.5s ease';
    
    // If image loads successfully, ensure it's visible
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // If image fails to load, log error but keep visible
    img.addEventListener('error', function() {
        console.error('Image failed to load:', this.src);
        // Try alternative path if main path fails
        const currentSrc = this.src;
        if (!currentSrc.includes('placeholder')) {
            this.style.border = '2px dashed #ccc';
            this.alt = this.alt + ' (Image not found)';
        }
    });
});

