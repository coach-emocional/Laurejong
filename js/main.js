 // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        // Form validation and submission (Formspree compatible)
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            // Clear previous errors
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            let isValid = true;
            
            // Validate nombre
            const nombre = document.getElementById('nombre');
            if (nombre.value.trim().length < 2) {
                nombre.closest('.form-group').classList.add('error');
                isValid = false;
            }
            
            // Validate apellidos
            const apellidos = document.getElementById('apellidos');
            if (apellidos.value.trim().length < 2) {
                apellidos.closest('.form-group').classList.add('error');
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.closest('.form-group').classList.add('error');
                isValid = false;
            }
            
            // Validate privacy checkbox
            const privacidad = document.getElementById('privacidad');
            if (!privacidad.checked) {
                privacidad.closest('.form-group').classList.add('error');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
                return false;
            }
            
            // Show loading state if validation passes
            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Formspree will handle the actual submission
            // The form will redirect to the _next URL or show Formspree's default thank you page
        });

        // Smooth scrolling for navigation links
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

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all elements that should animate
        document.addEventListener('DOMContentLoaded', function() {
            const animateElements = document.querySelectorAll('.section-header, .coaching-card, .intervention-card, .why-text, .why-image');
            
            animateElements.forEach(el => {
                observer.observe(el);
            });
        });

        // Tab functionality for hero tabs
        document.querySelectorAll('.hero-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.hero-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Scroll to corresponding section
                const tabName = this.getAttribute('data-tab');
                const targetSection = document.getElementById(tabName);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Staggered animation for cards
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.coaching-card, .intervention-card');
            
            const cardObserver = new IntersectionObserver(function(entries) {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, index * 100); // 100ms delay between each card
                    }
                });
            }, observerOptions);

            cards.forEach(card => {
                cardObserver.observe(card);
            });
        });