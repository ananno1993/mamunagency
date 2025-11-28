// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dotsContainer = document.querySelector('.slider-dots');

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(n) {
    showSlide(n);
}

// Slider Navigation
document.querySelector('.slider-nav.next').addEventListener('click', nextSlide);
document.querySelector('.slider-nav.prev').addEventListener('click', prevSlide);

// Auto-advance slider
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .live-meet-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Submission
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Form validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you within 24 hours.`);
    
    // Reset form
    feedbackForm.reset();
});

// Function to show contact options for booking
function showBookingContactOptions() {
    const whatsappNumber = '8801984388286';
    const telegramUsername = 'ProviderMamunAhmed87';
    
    if (confirm('Choose your preferred contact method:\n\nClick OK for WhatsApp\nClick Cancel for Telegram')) {
        // User chose WhatsApp
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    } else {
        // User chose Telegram
        window.open(`https://t.me/${telegramUsername}`, '_blank');
    }
}

// Book Now Button Functionality
const bookNowButtons = document.querySelectorAll('.btn-primary');
bookNowButtons.forEach(button => {
    const buttonText = button.textContent.trim().toLowerCase();
    if (buttonText.includes('book now') || buttonText.includes('বুক করুন')) {
        button.addEventListener('click', () => {
            showBookingContactOptions();
        });
    } else if (buttonText.includes('download')) {
        button.addEventListener('click', () => {
            // Simulate download action
            alert('Thank you for your interest! Download will begin shortly.\n\nFor actual implementation, this would redirect to your app store links.');
        });
    }
});

// See How It Works Button
const howItWorksButtons = document.querySelectorAll('.btn-secondary');
howItWorksButtons.forEach(button => {
    if (button.textContent.includes('How It Works')) {
        button.addEventListener('click', () => {
            // Scroll to features section
            const featuresSection = document.getElementById('features');
            const offset = 80;
            const targetPosition = featuresSection.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
});

// Floating Buttons Animation
const floatingButtons = document.querySelectorAll('.floating-btn');
floatingButtons.forEach((btn, index) => {
    setTimeout(() => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateX(100px)';
        btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateX(0)';
        }, 100);
    }, index * 100);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter Animation for Statistics (if you want to add stats section)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Initialize tooltips for floating buttons
floatingButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        const tooltip = btn.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
        }
    });
    
    btn.addEventListener('mouseleave', () => {
        const tooltip = btn.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent default behavior for demo links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Easter egg: Console message
console.log('%c💘 Welcome to MatchVibe!', 'color: #ff3366; font-size: 20px; font-weight: bold;');
console.log('%cWe hope you find your perfect match! 💕', 'color: #6c5ce7; font-size: 14px;');

// Add touch swipe support for mobile slider
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CUSTOMER LOGIN & PREMIUM ACCESS
// ============================================

// Customer Database (synced with admin panel)
const CUSTOMERS_DB = [
    {
        id: 'CUST001',
        name: 'Ayesha Rahman',
        email: 'ayesha@example.com',
        phone: '+880 1712-345678',
        isPremium: true,
        joinDate: '2024-01-15'
    },
    {
        id: 'CUST002',
        name: 'Fatima Khan',
        email: 'fatima@example.com',
        phone: '+880 1798-765432',
        isPremium: false,
        joinDate: '2024-02-20'
    }
];

// Check if user is already logged in
function checkCustomerLogin() {
    const loggedInCustomerId = sessionStorage.getItem('customerLoggedIn');
    if (loggedInCustomerId) {
        const customer = CUSTOMERS_DB.find(c => c.id === loggedInCustomerId);
        if (customer) {
            showPremiumAccess(customer);
            updateLoginButton(customer);
        }
    }
}

// Show login modal
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

// Close login modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Handle customer login form
document.getElementById('customerLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customerId = document.getElementById('customerIdInput').value.trim().toUpperCase();
    const customer = CUSTOMERS_DB.find(c => c.id === customerId);
    
    if (customer) {
        // Store login session
        sessionStorage.setItem('customerLoggedIn', customer.id);
        
        // Close login modal
        closeLoginModal();
        
        // Show premium access
        showPremiumAccess(customer);
        
        // Update login button
        updateLoginButton(customer);
        
        // Show success message
        alert(`Welcome back, ${customer.name}!`);
        
        // Scroll to premium section
        setTimeout(() => {
            document.getElementById('premium-access').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    } else {
        alert('Invalid Customer ID. Please check and try again.\n\nDemo IDs:\nCUST001 (Premium)\nCUST002 (Regular)');
    }
    
    // Clear form
    this.reset();
});

// Update login button to show logout
function updateLoginButton(customer) {
    const loginLink = document.querySelector('.admin-link');
    loginLink.innerHTML = `<i class="fas fa-user-circle"></i> ${customer.name}`;
    loginLink.onclick = function() {
        handleCustomerLogout();
        return false;
    };
}

// Handle customer logout
function handleCustomerLogout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('customerLoggedIn');
        location.reload();
    }
}

// Show premium access section
function showPremiumAccess(customer) {
    const premiumSection = document.getElementById('premium-access');
    const premiumContent = document.getElementById('premiumContent');
    
    premiumSection.style.display = 'block';
    
    if (customer.isPremium) {
        // Premium user content
        premiumContent.innerHTML = `
            <div class="premium-unlocked">
                <div class="premium-badge">
                    <i class="fas fa-crown"></i>
                </div>
                <h2>Welcome, ${customer.name}!</h2>
                <p class="premium-subtitle">You have Premium Access - Enjoy exclusive VIP features</p>
                
                <div class="premium-features-grid">
                    <div class="premium-feature">
                        <i class="fas fa-video"></i>
                        <h3>HD Video Calls</h3>
                        <p>Crystal clear video quality</p>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-calendar-check"></i>
                        <h3>Priority Booking</h3>
                        <p>Book ahead of others</p>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-percent"></i>
                        <h3>Exclusive Discounts</h3>
                        <p>Save up to 30%</p>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-headset"></i>
                        <h3>VIP Support</h3>
                        <p>24/7 dedicated assistance</p>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-star"></i>
                        <h3>Exclusive Access</h3>
                        <p>Premium models only</p>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-gift"></i>
                        <h3>Special Offers</h3>
                        <p>Monthly surprises</p>
                    </div>
                </div>
                
                <div class="premium-stats">
                    <div class="stat">
                        <h3>500+</h3>
                        <p>VIP Members</p>
                    </div>
                    <div class="stat">
                        <h3>∞</h3>
                        <p>Unlimited Access</p>
                    </div>
                    <div class="stat">
                        <h3>24/7</h3>
                        <p>VIP Support</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <p style="color: #7f8c8d;">Member since: ${customer.joinDate}</p>
                    <p style="color: #7f8c8d;">Customer ID: ${customer.id}</p>
                </div>
            </div>
        `;
    } else {
        // Regular user content
        premiumContent.innerHTML = `
            <div class="premium-locked">
                <div class="lock-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h2>Hello, ${customer.name}</h2>
                <p class="lock-subtitle">Upgrade to Premium to unlock exclusive VIP features</p>
                
                <div class="locked-features">
                    <div class="locked-feature">
                        <i class="fas fa-times-circle"></i>
                        <span>HD Video Calls - Locked</span>
                    </div>
                    <div class="locked-feature">
                        <i class="fas fa-times-circle"></i>
                        <span>Priority Booking - Locked</span>
                    </div>
                    <div class="locked-feature">
                        <i class="fas fa-times-circle"></i>
                        <span>Exclusive Discounts - Locked</span>
                    </div>
                    <div class="locked-feature">
                        <i class="fas fa-times-circle"></i>
                        <span>VIP Support - Locked</span>
                    </div>
                    <div class="locked-feature">
                        <i class="fas fa-times-circle"></i>
                        <span>Premium Models - Locked</span>
                    </div>
                    <div class="locked-feature">
                        <i class="fas fa-times-circle"></i>
                        <span>Special Offers - Locked</span>
                    </div>
                </div>
                
                <div class="upgrade-cta">
                    <button class="btn btn-primary btn-large" onclick="contactForUpgrade()">
                        <i class="fas fa-crown"></i> Upgrade to Premium Now!
                    </button>
                    <p class="cta-note">Join thousands of satisfied VIP members</p>
                </div>
                
                <div style="margin-top: 30px;">
                    <p style="color: #7f8c8d;">Member since: ${customer.joinDate}</p>
                    <p style="color: #7f8c8d;">Customer ID: ${customer.id}</p>
                </div>
            </div>
        `;
    }
}

// Contact for upgrade
function contactForUpgrade() {
    alert('To upgrade to Premium membership, please contact us:\n\nWhatsApp: +880 1712-345678\nEmail: bookings@mamunagency.com\n\nWe will process your upgrade within 24 hours!');
}

// Close modal when clicking outside
document.getElementById('loginModal').addEventListener('click', function(e) {
    if (e.target.id === 'loginModal') {
        closeLoginModal();
    }
});

// Initialize customer login check on page load
checkCustomerLogin();

// ============================================
// THEME TOGGLE & LANGUAGE SWITCHER
// ============================================

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const floatingThemeToggle = document.getElementById('floatingThemeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (floatingThemeToggle) {
        floatingThemeToggle.innerHTML = '<i class="fas fa-sun"></i><span class="tooltip">Toggle Theme</span>';
    }
}

// Function to toggle theme
function toggleTheme() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (floatingThemeToggle) {
            floatingThemeToggle.innerHTML = '<i class="fas fa-sun"></i><span class="tooltip">Toggle Theme</span>';
        }
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        if (floatingThemeToggle) {
            floatingThemeToggle.innerHTML = '<i class="fas fa-moon"></i><span class="tooltip">Toggle Theme</span>';
        }
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('click', toggleTheme);
if (floatingThemeToggle) {
    floatingThemeToggle.addEventListener('click', toggleTheme);
}

// Language Translations
const translations = {
    en: {
        // Navbar
        home: 'Home',
        services: 'Services',
        ourModels: 'Our Models',
        booking: 'Booking',
        reviews: 'Reviews',
        contact: 'Contact',
        login: 'Login',
        
        // Hero Section
        heroHeadline1: 'Premium Companion Services',
        heroSubheadline1: 'Experience unforgettable moments with our elite companions. Choose incall at our luxury locations or outcall to your desired destination.',
        heroHeadline2: 'Incall & Outcall Available',
        heroSubheadline2: 'Meet at our discreet luxury locations or enjoy outcall services at your hotel or residence.',
        heroHeadline3: 'Verified. Professional. Discreet.',
        heroSubheadline3: 'All our companions are verified professionals committed to providing exceptional experiences.',
        bookNow: 'Book Now',
        viewOurModels: 'View Our Models',
        
        // Features
        featuresTitle: 'Our Services',
        featuresSubtitle: 'Choose from our range of professional services tailored to your preferences and comfort.',
        audioCall: 'Audio Call',
        audioCallDesc: 'Connect with our companions through secure voice calls. Experience engaging conversations before meeting.',
        audioCallBenefit: 'Private & Secure:',
        audioCallBenefitText: 'Enjoy intimate conversations in complete privacy.',
        videoCall: 'Video Call',
        videoCallDesc: 'Experience face-to-face interaction through high-quality video calls with our verified companions.',
        videoCallBenefit: 'HD Quality:',
        videoCallBenefitText: 'Crystal clear video for personal connection.',
        inCallService: 'InCall Service',
        inCallDesc: 'Visit our luxurious, discreet locations for a premium experience in a comfortable private setting.',
        inCallBenefit: 'Luxury Locations:',
        inCallBenefitText: 'Premium apartments in prime areas.',
        outCallService: 'OutCall Service',
        outCallDesc: 'Our companions come to your preferred location - hotel, residence, or private venue of your choice.',
        outCallBenefit: 'Your Place:',
        outCallBenefitText: 'Complete privacy and convenience on your terms.',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        
        // Booking Section
        bookingTitle: 'Flexible Booking Options',
        bookingSubtitle: 'Choose the service that best suits your needs - meet at our luxurious locations or enjoy the privacy of your own space.',
        bookingMainTitle: 'Incall & Outcall Services',
        bookingMainSubtitle: 'Your Choice, Your Comfort',
        inCallTitle: 'Incall Service',
        inCallText: 'Visit our discreet, luxurious apartments located in premium areas. Enjoy a private, comfortable environment with complete amenities.',
        outCallTitle: 'Outcall Service',
        outCallText: 'Our companions come to your location - hotel, residence, or venue of choice. Enjoy complete privacy and convenience on your terms.',
        flexibleDuration: 'Flexible Duration',
        flexibleDurationText: 'Book by the hour, evening, overnight, or for extended companionship. We accommodate your schedule and preferences.',
        bookingCTATitle: 'Professional, Discreet, Unforgettable',
        bookingCTAText: 'Whether you choose incall at our elegant locations or prefer the privacy of outcall service, we ensure complete discretion and exceptional service. Your comfort and satisfaction are our top priorities.',
        
        // Other Services
        premiumServicesTitle: 'Premium Services & Features',
        verifiedCompanions: 'Verified Companions',
        verifiedCompanionsText: 'All our companions undergo thorough verification including ID checks, health screenings, and professional training to ensure the highest standards of service.',
        completeDiscretion: 'Complete Discretion',
        completeDiscretionText: 'Your privacy is paramount. We maintain strict confidentiality, secure payment methods, and discreet communication channels for all bookings.',
        conciergeService: 'Concierge Service',
        conciergeServiceText: 'Our dedicated team assists with booking, special requests, and ensures every detail is perfect. Available 24/7 for your convenience.',
        easyBooking: 'Easy Booking',
        easyBookingText: 'Simple online booking system with instant confirmation. Choose your preferred companion, service type, duration, and time - all with just a few clicks.',
        
        // Models Section
        modelsTitle: 'Our Elite Models',
        modelsSubtitle: 'Browse our exclusive collection of verified, professional companions',
        yearsOld: 'years',
        premium: 'Premium',
        vip: 'VIP',
        international: 'International',
        
        // Testimonials
        testimonialsTitle: 'Client Experiences',
        testimonial1: 'Absolutely exceptional service. The incall location was luxurious and discreet, and my companion was professional, charming, and attentive. Will definitely be booking again.',
        testimonial2: 'I needed a companion for a business dinner and the outcall service was perfect. She was elegant, intelligent, and made a great impression. The booking process was seamless and completely confidential.',
        testimonial3: 'The level of professionalism is outstanding. From the initial inquiry to the actual meeting, everything was handled with care and discretion. Highly recommend their VIP escort service.',
        verifiedClient: 'Verified Client',
        
        // Contact
        contactTitle: 'Book Your Experience Today',
        contactSubtitle: 'Have questions about our services, want to make a booking, or need assistance? Our discreet concierge team is available 24/7.',
        emailBooking: 'Email Booking',
        emailResponse: 'Confidential response within 2 hours',
        directLine: 'Direct Line',
        available247: 'Available 24/7 for bookings',
        officeLocation: 'Office Location',
        discreteLocations: 'Discreet locations available',
        contactForAddress: 'Contact us for address details',
        requestBooking: 'Request a Booking',
        yourName: 'Your Name',
        yourEmail: 'Your Email',
        selectServiceType: 'Select Service Type',
        incallBooking: 'Incall Booking',
        outcallBooking: 'Outcall Booking',
        vipService: 'VIP Service',
        generalInquiry: 'General Inquiry',
        preferredDateTime: 'Preferred date, time, and any special requests',
        submitRequest: 'Submit Request',
        
        // Footer
        company: 'Company',
        aboutUs: 'About Us',
        careers: 'Careers',
        press: 'Press',
        legal: 'Legal',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        safety: 'Safety Guidelines',
        resources: 'Resources',
        helpCenter: 'Help Center',
        blog: 'Blog',
        dateCoachingTips: 'Date Coaching Tips',
        connectWithUs: 'Connect With Us',
        footerText: '© 2025 Mamun Agency. All Rights Reserved. 18+ Only. Professional Companionship Services.',
        
        // Floating Buttons
        chatWhatsApp: 'Chat with us on WhatsApp',
        messageFacebook: 'Message us on Facebook',
        joinTelegram: 'Join our Telegram Channel',
        
        // Login Modal
        customerLogin: 'Customer Login',
        loginMessage: 'Enter your Customer ID to access premium features',
        enterCustomerID: 'Enter Customer ID',
        dontHaveAccount: "Don't have an account? Contact us to register.",
        adminPanel: 'Admin Panel'
    },
    bn: {
        // Navbar
        home: 'হোম',
        services: 'সেবাসমূহ',
        ourModels: 'আমাদের মডেল',
        booking: 'বুকিং করুন',
        reviews: 'রিভিউ',
        contact: 'যোগাযোগ',
        login: 'লগইন',
        
        // Hero Section
        heroHeadline1: 'প্রিমিয়াম কম্প্যানিয়ন সার্ভিস',
        heroSubheadline1: 'আপনাদের এলিট পছন্দের বন্ধুদের সাথে অবিস্মরণীয় মুহূর্ত উপভোগ করুন। আপনাদের পছন্দের লাক্সারি লোকেশনে ইনকল অথবা আপনার পছন্দের স্থানে আউটকল সার্ভিস নিন।',
        heroHeadline2: 'ইনকল এবং আউটকল সার্ভিস',
        heroSubheadline2: 'আপনাদের গোপনীয় লাক্সারি লোকেশনে মিলিত হন অথবা আপনার হোটেল কিংবা বাসায় আউটকল সার্ভিস নিন।',
        heroHeadline3: 'ভেরিফাইড। প্রফেশনাল। ডিসক্রিট।',
        heroSubheadline3: 'আপনাদের সকল পছন্দের বন্ধু ভেরিফাইড প্রফেশনাল যারা আপনাকে সেরা সেবা দিতে প্রস্তুত।',
        bookNow: 'এখনই বুক করুন',
        viewOurModels: 'মডেল দেখুন',
        
        // Features
        featuresTitle: 'আমাদের সার্ভিস',
        featuresSubtitle: 'আপনার পছন্দ অনুযায়ী প্রফেশনাল সার্ভিস বেছে নিন।',
        audioCall: 'অডিও কল',
        audioCallDesc: 'সিকিউর ভয়েস কলের মাধ্যমে আপনাদের পছন্দের বন্ধুদের সাথে কথা বলুন। দেখা করার আগে ভালো কথোপকথন উপভোগ করুন।',
        audioCallBenefit: 'প্রাইভেট এবং সিকিউর:',
        audioCallBenefitText: 'সম্পূর্ণ গোপনীয়তায় আন্তরিক কথোপকথন করুন।',
        videoCall: 'ভিডিও কল',
        videoCallDesc: 'আপনাদের পছন্দের ভেরিফাইড বন্ধুদের সাথে হাই কোয়ালিটি ভিডিও কলে মুখোমুখি কথা বলুন।',
        videoCallBenefit: 'এইচডি কোয়ালিটি:',
        videoCallBenefitText: 'ক্রিস্টাল ক্লিয়ার ভিডিওতে পার্সোনাল কানেকশন।',
        inCallService: 'ইনকল সার্ভিস',
        inCallDesc: 'আমাদের লাক্সারি এবং প্রাইভেট লোকেশনে এসে প্রিমিয়াম এক্সপেরিয়েন্স নিন।',
        inCallBenefit: 'লাক্সারি লোকেশন:',
        inCallBenefitText: 'সিটির প্রাইম এরিয়ায় প্রিমিয়াম অ্যাপার্টমেন্ট।',
        outCallService: 'আউটকল সার্ভিস',
        outCallDesc: 'আপনাদের পছন্দের বন্ধুরা আপনার পছন্দের স্থানে আসবে - হোটেল, বাসা বা আপনার চয়েস করা যেকোনো জায়গায়।',
        outCallBenefit: 'আপনার পছন্দের স্থান:',
        outCallBenefitText: 'সম্পূর্ণ প্রাইভেসি এবং কমফোর্ট আপনার শর্তে।',
        whatsapp: 'হোয়াটসঅ্যাপ',
        telegram: 'টেলিগ্রাম',
        
        // Booking Section
        bookingTitle: 'ফ্লেক্সিবল বুকিং অপশন',
        bookingSubtitle: 'আপনার পছন্দ অনুযায়ী সার্ভিস নিন - আপনাদের লাক্সারি লোকেশনে আসুন অথবা আপনার নিজের জায়গায় প্রাইভেসি উপভোগ করুন।',
        bookingMainTitle: 'ইনকল এবং আউটকল সার্ভিস',
        bookingMainSubtitle: 'আপনার চয়েস, আপনার কমফোর্ট',
        inCallTitle: 'ইনকল সার্ভিস',
        inCallText: 'সিটির প্রাইম এরিয়ায় আপনাদের প্রাইভেট লাক্সারি অ্যাপার্টমেন্ট ভিজিট করুন। সব ধরনের সুবিধা সহ একটি কমফোর্টেবল পরিবেশ উপভোগ করুন।',
        outCallTitle: 'আউটকল সার্ভিস',
        outCallText: 'আপনাদের পছন্দের বন্ধুরা আপনার পছন্দের জায়গায় আসবে - হোটেল, বাসা বা আপনার চয়েস করা স্থান। সম্পূর্ণ প্রাইভেসি এবং কমফোর্ট আপনার শর্তে।',
        flexibleDuration: 'ফ্লেক্সিবল ডিউরেশন',
        flexibleDurationText: 'ঘন্টা, সন্ধ্যা, পুরো রাত বা এক্সটেন্ডেড টাইম - যেভাবে চান বুক করুন। আমরা আপনার সময় এবং পছন্দ অনুযায়ী সার্ভিস দিই।',
        bookingCTATitle: 'প্রফেশনাল, ডিসক্রিট, মেমোরেবল',
        bookingCTAText: 'আপনি আপনাদের এলিগেন্ট লোকেশনে ইনকল নিন বা আউটকল সার্ভিসের প্রাইভেসি পছন্দ করুন - আপনারা সম্পূর্ণ গোপনীয়তা এবং সেরা সার্ভিস পাবেন। আপনার সন্তুষ্টি আপনাদের প্রথম প্রায়োরিটি।',
        
        // Other Services
        premiumServicesTitle: 'প্রিমিয়াম সার্ভিস এবং ফিচার',
        verifiedCompanions: 'ভেরিফাইড পছন্দের বন্ধু',
        verifiedCompanionsText: 'আপনাদের সব পছন্দের বন্ধু আইডি চেক, হেলথ চেক এবং প্রফেশনাল ট্রেনিং সহ সম্পূর্ণ ভেরিফিকেশনের মধ্য দিয়ে যায় যাতে আপনি সেরা সার্ভিস পান।',
        completeDiscretion: 'সম্পূর্ণ ডিসক্রিশন',
        completeDiscretionText: 'আপনার প্রাইভেসি আপনাদের কাছে সবচেয়ে গুরুত্বপূর্ণ। সব বুকিংয়ে আপনারা স্ট্রিক্ট কনফিডেনশিয়ালিটি, সিকিউর পেমেন্ট এবং প্রাইভেট কমিউনিকেশন পাবেন।',
        conciergeService: 'কনসিয়ার্জ সার্ভিস',
        conciergeServiceText: 'আপনাদের ডেডিকেটেড টিম বুকিং এবং স্পেশাল রিকোয়েস্টে সাহায্য করবে। প্রতিটি ডিটেইলস পারফেক্ট করতে আপনারা ২৪/৭ সার্ভিস পাবেন।',
        easyBooking: 'সহজ বুকিং',
        easyBookingText: 'ইন্সট্যান্ট কনফার্মেশন সহ সহজ অনলাইন বুকিং সিস্টেম। আপনার পছন্দের বন্ধু, সার্ভিস টাইপ, ডিউরেশন এবং টাইম বেছে নিন - সব কিছু কয়েক ক্লিকেই।',
        
        // Models Section
        modelsTitle: 'আমাদের এলিট মডেল',
        modelsSubtitle: 'আপনাদের এক্সক্লুসিভ ভেরিফাইড প্রফেশনাল পছন্দের বন্ধু কালেকশন ব্রাউজ করুন',
        yearsOld: 'বছর',
        premium: 'প্রিমিয়াম',
        vip: 'ভিআইপি',
        international: 'ইন্টারন্যাশনাল',
        
        // Testimonials
        testimonialsTitle: 'ক্লায়েন্টদের রিভিউ',
        testimonial1: 'একদম দারুণ সার্ভিস। ইনকল লোকেশন লাক্সারিয়াস এবং প্রাইভেট ছিল, আর আমার পছন্দের বন্ধু প্রফেশনাল, চার্মিং এবং খুবই অ্যাটেনটিভ ছিল। অবশ্যই আবার বুক করব।',
        testimonial2: 'আমার একটা বিজনেস ডিনারের জন্য পছন্দের বন্ধু দরকার ছিল এবং আউটকল সার্ভিস পারফেক্ট ছিল। তিনি এলিগেন্ট, ইন্টেলিজেন্ট এবং গ্রেট ইম্প্রেশন তৈরি করেছিলেন। বুকিং প্রসেস স্মুথ এবং সম্পূর্ণ কনফিডেনশিয়াল ছিল।',
        testimonial3: 'প্রফেশনালিজমের লেভেল অসাধারণ। প্রথম যোগাযোগ থেকে শুরু করে মিটিং পর্যন্ত সবকিছু অনেক কেয়ার এবং ডিসক্রিশনের সাথে হ্যান্ডেল করা হয়েছে। তাদের ভিআইপি এসকর্ট সার্ভিস হাইলি রেকমেন্ডেড।',
        verifiedClient: 'ভেরিফাইড ক্লায়েন্ট',
        
        // Contact
        contactTitle: 'আজই আপনার এক্সপেরিয়েন্স বুক করুন',
        contactSubtitle: 'আমাদের সার্ভিস নিয়ে প্রশ্ন আছে, বুকিং করতে চান বা সাহায্য দরকার? আমাদের কনসিয়ার্জ টিম ২৪/৭ এভেইলেবল।',
        emailBooking: 'ইমেইল বুকিং',
        emailResponse: '২ ঘণ্টার মধ্যে রিপ্লাই',
        directLine: 'ডাইরেক্ট লাইন',
        available247: 'বুকিংয়ের জন্য ২৪/৭ এভেইলেবল',
        officeLocation: 'অফিস লোকেশন',
        discreteLocations: 'প্রাইভেট লোকেশন এভেইলেবল',
        contactForAddress: 'অ্যাড্রেস ডিটেইলস জানতে যোগাযোগ করুন',
        requestBooking: 'বুকিং রিকোয়েস্ট করুন',
        yourName: 'আপনার নাম',
        yourEmail: 'আপনার ইমেইল',
        selectServiceType: 'সার্ভিস টাইপ সিলেক্ট করুন',
        incallBooking: 'ইনকল বুকিং',
        outcallBooking: 'আউটকল বুকিং',
        vipService: 'ভিআইপি সার্ভিস',
        generalInquiry: 'জেনারেল ইনকোয়ারি',
        preferredDateTime: 'পছন্দের তারিখ, সময় এবং স্পেশাল রিকোয়েস্ট',
        submitRequest: 'রিকোয়েস্ট সাবমিট করুন',
        
        // Footer
        company: 'কোম্পানি',
        aboutUs: 'আমাদের সম্পর্কে',
        careers: 'ক্যারিয়ার',
        press: 'প্রেস',
        legal: 'লিগাল',
        terms: 'টার্মস অফ সার্ভিস',
        privacy: 'প্রাইভেসি পলিসি',
        safety: 'সেফটি গাইডলাইন',
        resources: 'রিসোর্স',
        helpCenter: 'হেল্প সেন্টার',
        blog: 'ব্লগ',
        dateCoachingTips: 'ডেট কোচিং টিপস',
        connectWithUs: 'আমাদের সাথে কানেক্ট করুন',
        footerText: '© ২০২৫ মামুন এজেন্সি। সমস্ত অধিকার সংরক্ষিত। ১৮+ শুধুমাত্র। প্রফেশনাল পছন্দের বন্ধু সার্ভিস।',
        
        // Floating Buttons
        chatWhatsApp: 'হোয়াটসঅ্যাপে চ্যাট করুন',
        messageFacebook: 'ফেসবুকে মেসেজ করুন',
        joinTelegram: 'টেলিগ্রাম চ্যানেলে জয়েন করুন',
        
        // Login Modal
        customerLogin: 'কাস্টমার লগইন',
        loginMessage: 'প্রিমিয়াম ফিচার অ্যাক্সেস করতে আপনার কাস্টমার আইডি দিন',
        enterCustomerID: 'কাস্টমার আইডি লিখুন',
        dontHaveAccount: 'অ্যাকাউন্ট নেই? রেজিস্ট্রেশনের জন্য আমাদের সাথে যোগাযোগ করুন।',
        adminPanel: 'অ্যাডমিন প্যানেল'
    }
};

// Language Toggle
const languageToggle = document.getElementById('languageToggle');
const floatingLanguageToggle = document.getElementById('floatingLanguageToggle');

// Check if mobile device
const isMobile = window.innerWidth <= 768;

// Set default language: Bengali on mobile, saved preference on desktop
let currentLanguage = localStorage.getItem('language');
if (!currentLanguage) {
    currentLanguage = isMobile ? 'bn' : 'en';
}

// Apply saved language on page load
if (currentLanguage === 'bn') {
    languageToggle.querySelector('.lang-text').textContent = 'EN';
    if (floatingLanguageToggle) {
        floatingLanguageToggle.querySelector('.lang-text').textContent = 'EN';
    }
    applyLanguage('bn');
} else {
    languageToggle.querySelector('.lang-text').textContent = 'BN';
    if (floatingLanguageToggle) {
        floatingLanguageToggle.querySelector('.lang-text').textContent = 'BN';
    }
    applyLanguage('en');
}

// Function to toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'bn' : 'en';
    localStorage.setItem('language', currentLanguage);
    
    if (currentLanguage === 'bn') {
        languageToggle.querySelector('.lang-text').textContent = 'EN';
        if (floatingLanguageToggle) {
            floatingLanguageToggle.querySelector('.lang-text').textContent = 'EN';
        }
    } else {
        languageToggle.querySelector('.lang-text').textContent = 'BN';
        if (floatingLanguageToggle) {
            floatingLanguageToggle.querySelector('.lang-text').textContent = 'BN';
        }
    }
    
    applyLanguage(currentLanguage);
}

languageToggle.addEventListener('click', toggleLanguage);
if (floatingLanguageToggle) {
    floatingLanguageToggle.addEventListener('click', toggleLanguage);
}

// Apply language to elements with data attributes
function applyLanguage(lang) {
    // Update navigation menu items
    document.querySelectorAll('[data-lang-en]').forEach(element => {
        if (lang === 'bn' && element.hasAttribute('data-lang-bn')) {
            element.textContent = element.getAttribute('data-lang-bn');
        } else if (element.hasAttribute('data-lang-en')) {
            element.textContent = element.getAttribute('data-lang-en');
        }
    });
    
    // Update other text elements
    const trans = translations[lang];
    
    // Hero section - all slides
    const slides = document.querySelectorAll('.slide');
    if (slides.length >= 3) {
        // Slide 1
        const headline1 = slides[0].querySelector('.hero-headline');
        const subheadline1 = slides[0].querySelector('.hero-subheadline');
        if (headline1) headline1.textContent = trans.heroHeadline1;
        if (subheadline1) subheadline1.textContent = trans.heroSubheadline1;
        
        // Slide 2
        const headline2 = slides[1].querySelector('.hero-headline');
        const subheadline2 = slides[1].querySelector('.hero-subheadline');
        if (headline2) headline2.textContent = trans.heroHeadline2;
        if (subheadline2) subheadline2.textContent = trans.heroSubheadline2;
        
        // Slide 3
        const headline3 = slides[2].querySelector('.hero-headline');
        const subheadline3 = slides[2].querySelector('.hero-subheadline');
        if (headline3) headline3.textContent = trans.heroHeadline3;
        if (subheadline3) subheadline3.textContent = trans.heroSubheadline3;
    }
    
    // Update all "Book Now" and "View Our Models" buttons
    document.querySelectorAll('.cta-buttons .btn-primary').forEach(btn => {
        const icon = btn.querySelector('i');
        btn.innerHTML = icon ? icon.outerHTML + ' ' + trans.bookNow : trans.bookNow;
    });
    document.querySelectorAll('.cta-buttons .btn-secondary').forEach(btn => {
        const icon = btn.querySelector('i');
        btn.innerHTML = icon ? icon.outerHTML + ' ' + trans.viewOurModels : trans.viewOurModels;
    });
    
    // Features section
    const featuresTitle = document.querySelector('#features .section-header h2');
    const featuresSubtitle = document.querySelector('#features .section-header p');
    if (featuresTitle) featuresTitle.textContent = trans.featuresTitle;
    if (featuresSubtitle) featuresSubtitle.textContent = trans.featuresSubtitle;
    
    // Feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length >= 4) {
        // Audio Call
        const audioTitle = featureCards[0].querySelector('h3');
        const audioDesc = featureCards[0].querySelector('.feature-description');
        const audioBenefit = featureCards[0].querySelector('.feature-benefit strong');
        const audioBenefitText = featureCards[0].querySelector('.feature-benefit');
        if (audioTitle) audioTitle.textContent = trans.audioCall;
        if (audioDesc) audioDesc.textContent = trans.audioCallDesc;
        if (audioBenefit) audioBenefit.textContent = trans.audioCallBenefit;
        if (audioBenefitText) {
            audioBenefitText.innerHTML = '<strong>' + trans.audioCallBenefit + '</strong> ' + trans.audioCallBenefitText;
        }
        
        // Video Call
        const videoTitle = featureCards[1].querySelector('h3');
        const videoDesc = featureCards[1].querySelector('.feature-description');
        const videoBenefit = featureCards[1].querySelector('.feature-benefit strong');
        const videoBenefitText = featureCards[1].querySelector('.feature-benefit');
        if (videoTitle) videoTitle.textContent = trans.videoCall;
        if (videoDesc) videoDesc.textContent = trans.videoCallDesc;
        if (videoBenefit) videoBenefit.textContent = trans.videoCallBenefit;
        if (videoBenefitText) {
            videoBenefitText.innerHTML = '<strong>' + trans.videoCallBenefit + '</strong> ' + trans.videoCallBenefitText;
        }
        
        // InCall Service
        const incallTitle = featureCards[2].querySelector('h3');
        const incallDesc = featureCards[2].querySelector('.feature-description');
        const incallBenefit = featureCards[2].querySelector('.feature-benefit strong');
        const incallBenefitText = featureCards[2].querySelector('.feature-benefit');
        if (incallTitle) incallTitle.textContent = trans.inCallService;
        if (incallDesc) incallDesc.textContent = trans.inCallDesc;
        if (incallBenefit) incallBenefit.textContent = trans.inCallBenefit;
        if (incallBenefitText) {
            incallBenefitText.innerHTML = '<strong>' + trans.inCallBenefit + '</strong> ' + trans.inCallBenefitText;
        }
        
        // OutCall Service
        const outcallTitle = featureCards[3].querySelector('h3');
        const outcallDesc = featureCards[3].querySelector('.feature-description');
        const outcallBenefit = featureCards[3].querySelector('.feature-benefit strong');
        const outcallBenefitText = featureCards[3].querySelector('.feature-benefit');
        if (outcallTitle) outcallTitle.textContent = trans.outCallService;
        if (outcallDesc) outcallDesc.textContent = trans.outCallDesc;
        if (outcallBenefit) outcallBenefit.textContent = trans.outCallBenefit;
        if (outcallBenefitText) {
            outcallBenefitText.innerHTML = '<strong>' + trans.outCallBenefit + '</strong> ' + trans.outCallBenefitText;
        }
    }
    
    // Booking section
    const bookingTitle = document.querySelector('#live-meet .section-header h2');
    const bookingSubtitle = document.querySelector('#live-meet .section-header p');
    if (bookingTitle) bookingTitle.textContent = trans.bookingTitle;
    if (bookingSubtitle) bookingSubtitle.textContent = trans.bookingSubtitle;
    
    const bookingMainTitle = document.querySelector('.live-meet-details h3');
    const bookingMainSubtitle = document.querySelector('.live-meet-details .subtitle');
    if (bookingMainTitle) bookingMainTitle.textContent = trans.bookingMainTitle;
    if (bookingMainSubtitle) bookingMainSubtitle.textContent = trans.bookingMainSubtitle;
    
    // Booking items
    const liveMeetItems = document.querySelectorAll('.live-meet-item');
    if (liveMeetItems.length >= 3) {
        const item1Title = liveMeetItems[0].querySelector('h4');
        const item1Text = liveMeetItems[0].querySelector('p');
        if (item1Title) item1Title.textContent = trans.inCallTitle;
        if (item1Text) item1Text.textContent = trans.inCallText;
        
        const item2Title = liveMeetItems[1].querySelector('h4');
        const item2Text = liveMeetItems[1].querySelector('p');
        if (item2Title) item2Title.textContent = trans.outCallTitle;
        if (item2Text) item2Text.textContent = trans.outCallText;
        
        const item3Title = liveMeetItems[2].querySelector('h4');
        const item3Text = liveMeetItems[2].querySelector('p');
        if (item3Title) item3Title.textContent = trans.flexibleDuration;
        if (item3Text) item3Text.textContent = trans.flexibleDurationText;
    }
    
    const bookingCTATitle = document.querySelector('.live-meet-cta h4');
    const bookingCTAText = document.querySelector('.live-meet-cta p');
    if (bookingCTATitle) bookingCTATitle.textContent = trans.bookingCTATitle;
    if (bookingCTAText) bookingCTAText.textContent = trans.bookingCTAText;
    
    // Premium Services section
    const premiumServicesTitle = document.querySelector('#services .section-header h2');
    if (premiumServicesTitle) premiumServicesTitle.textContent = trans.premiumServicesTitle;
    
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length >= 4) {
        const s1Title = serviceCards[0].querySelector('h3');
        const s1Text = serviceCards[0].querySelector('p');
        if (s1Title) s1Title.textContent = trans.verifiedCompanions;
        if (s1Text) s1Text.textContent = trans.verifiedCompanionsText;
        
        const s2Title = serviceCards[1].querySelector('h3');
        const s2Text = serviceCards[1].querySelector('p');
        if (s2Title) s2Title.textContent = trans.completeDiscretion;
        if (s2Text) s2Text.textContent = trans.completeDiscretionText;
        
        const s3Title = serviceCards[2].querySelector('h3');
        const s3Text = serviceCards[2].querySelector('p');
        if (s3Title) s3Title.textContent = trans.conciergeService;
        if (s3Text) s3Text.textContent = trans.conciergeServiceText;
        
        const s4Title = serviceCards[3].querySelector('h3');
        const s4Text = serviceCards[3].querySelector('p');
        if (s4Title) s4Title.textContent = trans.easyBooking;
        if (s4Text) s4Text.textContent = trans.easyBookingText;
    }
    
    // Models section
    const modelsTitle = document.querySelector('#models .section-header h2');
    const modelsSubtitle = document.querySelector('#models .section-header p');
    if (modelsTitle) modelsTitle.textContent = trans.modelsTitle;
    if (modelsSubtitle) modelsSubtitle.textContent = trans.modelsSubtitle;
    
    // Testimonials section
    const testimonialsTitle = document.querySelector('#testimonials .section-header h2');
    if (testimonialsTitle) testimonialsTitle.textContent = trans.testimonialsTitle;
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length >= 3) {
        const t1Text = testimonialCards[0].querySelector('.testimonial-text');
        const t1AuthorInfo = testimonialCards[0].querySelector('.author-info p');
        if (t1Text) t1Text.textContent = trans.testimonial1;
        if (t1AuthorInfo) t1AuthorInfo.textContent = trans.verifiedClient;
        
        const t2Text = testimonialCards[1].querySelector('.testimonial-text');
        const t2AuthorInfo = testimonialCards[1].querySelector('.author-info p');
        if (t2Text) t2Text.textContent = trans.testimonial2;
        if (t2AuthorInfo) t2AuthorInfo.textContent = trans.verifiedClient;
        
        const t3Text = testimonialCards[2].querySelector('.testimonial-text');
        const t3AuthorInfo = testimonialCards[2].querySelector('.author-info p');
        if (t3Text) t3Text.textContent = trans.testimonial3;
        if (t3AuthorInfo) t3AuthorInfo.textContent = trans.verifiedClient;
    }
    
    // Contact section
    const contactTitle = document.querySelector('#contact .section-header h2');
    const contactSubtitle = document.querySelector('#contact .section-header p');
    if (contactTitle) contactTitle.textContent = trans.contactTitle;
    if (contactSubtitle) contactSubtitle.textContent = trans.contactSubtitle;
    
    // Contact items
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems.length >= 3) {
        const c1Title = contactItems[0].querySelector('h4');
        const c1Span = contactItems[0].querySelector('span');
        if (c1Title) c1Title.textContent = trans.emailBooking;
        if (c1Span) c1Span.textContent = trans.emailResponse;
        
        const c2Title = contactItems[1].querySelector('h4');
        const c2Span = contactItems[1].querySelector('span');
        if (c2Title) c2Title.textContent = trans.directLine;
        if (c2Span) c2Span.textContent = trans.available247;
        
        const c3Title = contactItems[2].querySelector('h4');
        const c3P = contactItems[2].querySelector('p');
        const c3Span = contactItems[2].querySelector('span');
        if (c3Title) c3Title.textContent = trans.officeLocation;
        if (c3P) c3P.textContent = trans.discreteLocations;
        if (c3Span) c3Span.textContent = trans.contactForAddress;
    }
    
    // Contact form
    const formTitle = document.querySelector('.contact-form h3');
    if (formTitle) formTitle.textContent = trans.requestBooking;
    
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const subjectSelect = document.querySelector('#subject');
    const messageTextarea = document.querySelector('#message');
    const submitBtn = document.querySelector('#feedbackForm .btn-primary');
    
    if (nameInput) nameInput.placeholder = trans.yourName;
    if (emailInput) emailInput.placeholder = trans.yourEmail;
    if (messageTextarea) messageTextarea.placeholder = trans.preferredDateTime;
    
    if (subjectSelect) {
        const options = subjectSelect.querySelectorAll('option');
        if (options.length >= 5) {
            options[0].textContent = trans.selectServiceType;
            options[1].textContent = trans.incallBooking;
            options[2].textContent = trans.outcallBooking;
            options[3].textContent = trans.vipService;
            options[4].textContent = trans.generalInquiry;
        }
    }
    
    if (submitBtn) {
        const icon = submitBtn.querySelector('i');
        submitBtn.innerHTML = icon ? icon.outerHTML + ' ' + trans.submitRequest : trans.submitRequest;
    }
    
    // Footer sections
    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections.length >= 4) {
        const f1Title = footerSections[0].querySelector('h4');
        if (f1Title) f1Title.textContent = trans.company;
        const f1Links = footerSections[0].querySelectorAll('a');
        if (f1Links.length >= 3) {
            f1Links[0].textContent = trans.aboutUs;
            f1Links[1].textContent = trans.careers;
            f1Links[2].textContent = trans.press;
        }
        
        const f2Title = footerSections[1].querySelector('h4');
        if (f2Title) f2Title.textContent = trans.legal;
        const f2Links = footerSections[1].querySelectorAll('a');
        if (f2Links.length >= 3) {
            f2Links[0].textContent = trans.terms;
            f2Links[1].textContent = trans.privacy;
            f2Links[2].textContent = trans.safety;
        }
        
        const f3Title = footerSections[2].querySelector('h4');
        if (f3Title) f3Title.textContent = trans.resources;
        const f3Links = footerSections[2].querySelectorAll('a');
        if (f3Links.length >= 3) {
            f3Links[0].textContent = trans.helpCenter;
            f3Links[1].textContent = trans.blog;
            f3Links[2].textContent = trans.dateCoachingTips;
        }
        
        const f4Title = footerSections[3].querySelector('h4');
        if (f4Title) f4Title.textContent = trans.connectWithUs;
    }
    
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) footerText.textContent = trans.footerText;
    
    // Floating buttons tooltips
    const floatingBtns = document.querySelectorAll('.floating-btn');
    if (floatingBtns.length >= 3) {
        const whatsappTooltip = floatingBtns[0].querySelector('.tooltip');
        const messengerTooltip = floatingBtns[1].querySelector('.tooltip');
        const telegramTooltip = floatingBtns[2].querySelector('.tooltip');
        if (whatsappTooltip) whatsappTooltip.textContent = trans.chatWhatsApp;
        if (messengerTooltip) messengerTooltip.textContent = trans.messageFacebook;
        if (telegramTooltip) telegramTooltip.textContent = trans.joinTelegram;
    }
    
    // Login modal
    const modalTitle = document.querySelector('#modal-title');
    const modalMessage = document.querySelector('#modal-message');
    const customerIdInput = document.querySelector('#customerIdInput');
    const loginBtn = document.querySelector('#customerLoginForm .btn-primary');
    const dontHaveAccountText = document.querySelector('#loginModal p:nth-of-type(1)');
    const adminPanelLink = document.querySelector('#loginModal p:nth-of-type(2) a');
    
    if (modalTitle) modalTitle.textContent = trans.customerLogin;
    if (modalMessage) modalMessage.textContent = trans.loginMessage;
    if (customerIdInput) customerIdInput.placeholder = trans.enterCustomerID;
    if (loginBtn) {
        const icon = loginBtn.querySelector('i');
        loginBtn.innerHTML = icon ? icon.outerHTML + ' ' + trans.login : trans.login;
    }
    if (dontHaveAccountText && dontHaveAccountText.textContent.includes("Don't have")) {
        dontHaveAccountText.textContent = trans.dontHaveAccount;
    }
    if (adminPanelLink) adminPanelLink.textContent = trans.adminPanel;
}

