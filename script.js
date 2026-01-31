// Mobile Menu Toggle with Animation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Function to toggle menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close menu function
function closeMobileMenu() {
    navMenu.classList.remove('active');
    body.style.overflow = '';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// Hamburger click handler
if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu on window resize if it's open and screen becomes large
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Prevent body scroll when menu is open on mobile
if (window.innerWidth <= 768) {
    navMenu.addEventListener('touchmove', (e) => {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Smooth Scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            
            // Calculate offset based on screen size
            const offset = window.innerWidth <= 768 ? 70 : 80;
            const offsetTop = target.offsetTop - offset;
            
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll with enhanced effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        navbar.style.transform = currentScroll > lastScroll && currentScroll > 500 ? 'translateY(-100%)' : 'translateY(0)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Form Submission Handler with modern feedback
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Get submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Simple validation
    if (name && email && message) {
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual form submission)
        setTimeout(() => {
            // Show success message
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Create custom success notification
            showNotification(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`, 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    } else {
        showNotification('Please fill in all required fields.', 'error');
    }
});

// Custom Notification Function (mobile-friendly)
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.textContent = message;
    
    // Mobile-responsive positioning
    const isMobile = window.innerWidth <= 768;
    const topPosition = isMobile ? '20px' : '100px';
    const rightPosition = isMobile ? '20px' : '20px';
    const leftPosition = isMobile ? '20px' : 'auto';
    const maxWidth = isMobile ? 'calc(100% - 40px)' : '400px';
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: ${topPosition};
        right: ${rightPosition};
        left: ${leftPosition};
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
        color: white;
        padding: ${isMobile ? '1rem 1.5rem' : '1.25rem 2rem'};
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        max-width: ${maxWidth};
        font-size: ${isMobile ? '0.9rem' : '1rem'};
        animation: slideInRight 0.4s ease;
        backdrop-filter: blur(10px);
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// Add notification animations to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for Scroll Animations (Enhanced)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal-active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Apply reveal animation to elements
const revealElements = [
    ...document.querySelectorAll('.product-card'),
    ...document.querySelectorAll('.design-card'),
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.about-content'),
    ...document.querySelectorAll('.contact-content')
];

revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Parallax effect for hero section (disabled on mobile for performance)
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Add hover effect for product cards with tilt (desktop only)
const productCards = document.querySelectorAll('.product-card');

if (window.innerWidth > 768) {
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Image Loading Effect - Ensure images are visible
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    
    // Check if image is already loaded (cached)
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
    
    img.addEventListener('error', function() {
        console.error('Image failed to load:', this.src);
        this.style.opacity = '0.5';
        this.style.border = '2px dashed #ccc';
        this.parentElement.style.background = '#f5f5f5';
    });
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add cursor trail effect (subtle and modern)
const createCursorTrail = () => {
    let trail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { // Only on desktop
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: rgba(44, 95, 45, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 4}px;
                top: ${e.clientY - 4}px;
                transition: all 0.5s ease;
            `;
            
            document.body.appendChild(dot);
            trail.push(dot);
            
            if (trail.length > maxTrailLength) {
                const oldDot = trail.shift();
                oldDot.style.opacity = '0';
                setTimeout(() => oldDot.remove(), 500);
            }
            
            setTimeout(() => {
                dot.style.opacity = '0';
                dot.style.transform = 'scale(0)';
            }, 100);
        }
    });
};

// Uncomment to enable cursor trail effect
// createCursorTrail();

// Add counter animation for stats (if you want to add stats section later)
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Add smooth reveal on page load for hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(40px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

console.log('✨ Sagun Glass & Furniture - Website Loaded Successfully');
