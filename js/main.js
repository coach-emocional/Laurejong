// ========================================
// MAIN.JS - LAURE JONG WEBSITE
// Código JavaScript limpio y optimizado
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Laure Jong Website - JavaScript iniciando...');

    // ========================================
    // 1. ELEMENTOS DEL DOM
    // ========================================
    const navbar = document.getElementById('navbar');
    const contactForm = document.getElementById('contactForm');
    const benefitsSection = document.querySelector('.benefits-section');

    // ========================================
    // 2. NAVBAR SCROLL EFFECT
    // ========================================
    function initNavbar() {
        if (!navbar) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // 3. SMOOTH SCROLLING
    // ========================================
    function initSmoothScrolling() {
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
    }

    // ========================================
    // 5. INSTAGRAM FUNCTIONALITY
    // ========================================
    function initInstagram() {
        function openInstagram(instagramUrl) {
            window.open(instagramUrl, '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes');
        }

        function trackInstagramClick(cardType) {
            console.log(`📱 Click en Instagram desde: ${cardType}`);
        }

        // Instagram badges
        document.querySelectorAll('.instagram-badge').forEach(badge => {
            badge.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.coaching-card, .intervention-card');
                const instagramUrl = card.getAttribute('data-instagram-url');
                if (instagramUrl) {
                    const cardTitle = card.querySelector('h3').textContent;
                    trackInstagramClick(cardTitle);
                    openInstagram(instagramUrl);
                }
            });

            // Hover effects
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.03)';
            });

            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Play buttons
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.coaching-card, .intervention-card');
                const instagramUrl = card.getAttribute('data-instagram-url');
                if (instagramUrl) {
                    const cardTitle = card.querySelector('h3').textContent;
                    trackInstagramClick(cardTitle);
                    openInstagram(instagramUrl);
                }
            });
        });

        // Card hover effects
        document.querySelectorAll('.coaching-card, .intervention-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const overlay = this.querySelector('.video-overlay');
                if (overlay && window.innerWidth > 768) {
                    overlay.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const overlay = this.querySelector('.video-overlay');
                if (overlay && window.innerWidth > 768) {
                    overlay.style.opacity = '0';
                }
            });
        });
    }

    // ========================================
    // 6. SCROLL ANIMATIONS RE-EJECUTABLES (MÁS LENTAS)
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Observer para elementos generales - RE-EJECUTABLE Y MÁS LENTO
        const generalObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // REMOVER clase antes de agregar para re-ejecutar
                    entry.target.classList.remove('animate');
                    // Force reflow
                    entry.target.offsetHeight;
                    // Agregar clase con delay más lento
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 300); // Delay más lento
                } else {
                    // Opcional: remover cuando sale del viewport
                    entry.target.classList.remove('animate');
                }
            });
        }, observerOptions);

        // Observer para cards con animación escalonada - RE-EJECUTABLE Y MÁS LENTO
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Resetear todas las cards de esta sección
                    const sectionCards = entry.target.closest('section').querySelectorAll('.coaching-card, .intervention-card');
                    sectionCards.forEach(card => card.classList.remove('animate'));
                    
                    // Force reflow
                    entry.target.offsetHeight;
                    
                    // Re-aplicar con delays MÁS LENTOS
                    sectionCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, 500 + (index * 400)); // Delay inicial 500ms + 400ms entre cards (era 200ms)
                    });
                } else {
                    // Opcional: remover cuando sale del viewport
                    const sectionCards = entry.target.closest('section')?.querySelectorAll('.coaching-card, .intervention-card');
                    if (sectionCards) {
                        sectionCards.forEach(card => card.classList.remove('animate'));
                    }
                }
            });
        }, observerOptions);

        // Observar elementos generales
        document.querySelectorAll('.section-header').forEach(el => {
            generalObserver.observe(el);
        });

        // Observar secciones que contienen cards
        document.querySelectorAll('#coaching, #intervenciones').forEach(section => {
            cardObserver.observe(section);
        });
    }

    // ========================================
    // 7. BENEFITS SECTION ANIMATION RE-EJECUTABLE
    // ========================================
    function initBenefitsAnimation() {
        if (!benefitsSection) return;

        const benefitsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('🌿 Activando animación de beneficios...');
                    
                    const leftCards = document.querySelectorAll('.benefits-left .benefit-card');
                    const rightCards = document.querySelectorAll('.benefits-right .benefit-card');
                    
                    // RESETEAR todas las cards primero
                    [...leftCards, ...rightCards].forEach(card => {
                        card.classList.remove('animate');
                    });
                    
                    // Force reflow
                    entry.target.offsetHeight;
                    
                    // Tu secuencia original
                    const sequence = [
                        { card: leftCards[0], delay: 500 },
                        { card: rightCards[0], delay: 1200 },
                        { card: leftCards[1], delay: 1900 },
                        { card: rightCards[1], delay: 2600 },
                        { card: leftCards[2], delay: 3300 },
                        { card: rightCards[2], delay: 4000 }
                    ];
                    
                    sequence.forEach(({ card, delay }) => {
                        if (card) {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, delay);
                        }
                    });
                } else {
                    // Opcional: resetear cuando sale del viewport
                    const allCards = document.querySelectorAll('.benefit-card');
                    allCards.forEach(card => card.classList.remove('animate'));
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -150px 0px'
        });

        // NO UNOBSERVE - esto permite re-ejecución
        benefitsObserver.observe(benefitsSection);
    }

    // ========================================
    // 8. TESTIMONIALS CAROUSEL
    // ========================================
    function initTestimonialsCarousel() {
        class TestimonialsCarousel {
            constructor() {
                this.currentSlide = 0;
                this.slides = document.querySelectorAll('.testimonial-slide');
                this.dots = document.querySelectorAll('.dot');
                this.totalSlides = this.slides.length;
                this.autoPlayInterval = null;
                this.progressInterval = null;
                this.isPaused = false;
                this.progressDuration = 6000;
                
                if (this.slides.length === 0) {
                    console.log('⚠️ No se encontraron testimonios');
                    return;
                }
                
                this.init();
            }

            init() {
                this.bindEvents();
                this.startAutoPlay();
            }

            bindEvents() {
                // Dots navigation
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        this.goToSlide(index);
                        this.resetAutoPlay();
                    });
                });

                // Control buttons
                const prevBtn = document.querySelector('.prev-btn');
                const nextBtn = document.querySelector('.next-btn');
                const pauseBtn = document.querySelector('.pause-btn');

                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        this.prevSlide();
                        this.resetAutoPlay();
                    });
                }

                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        this.nextSlide();
                        this.resetAutoPlay();
                    });
                }

                if (pauseBtn) {
                    pauseBtn.addEventListener('click', () => {
                        this.togglePause();
                    });
                }

                // Pause on hover
                const carousel = document.querySelector('.testimonials-carousel');
                if (carousel) {
                    carousel.addEventListener('mouseenter', () => {
                        this.pauseAutoPlay();
                    });

                    carousel.addEventListener('mouseleave', () => {
                        if (!this.isPaused) {
                            this.startAutoPlay();
                        }
                    });
                }
            }

            goToSlide(index) {
                this.slides[this.currentSlide].classList.remove('active');
                this.dots[this.currentSlide].classList.remove('active');

                this.currentSlide = index;

                this.slides[this.currentSlide].classList.add('active');
                this.dots[this.currentSlide].classList.add('active');

                this.resetProgress();
            }

            nextSlide() {
                const nextIndex = (this.currentSlide + 1) % this.totalSlides;
                this.goToSlide(nextIndex);
            }

            prevSlide() {
                const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.goToSlide(prevIndex);
            }

            startAutoPlay() {
                this.pauseAutoPlay();
                
                this.autoPlayInterval = setInterval(() => {
                    this.nextSlide();
                }, this.progressDuration);
                
                this.updateProgress();
            }

            pauseAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
                if (this.progressInterval) {
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                }
            }

            resetAutoPlay() {
                this.pauseAutoPlay();
                if (!this.isPaused) {
                    this.startAutoPlay();
                }
            }

            togglePause() {
                const pauseBtn = document.querySelector('.pause-btn');
                
                if (this.isPaused) {
                    this.isPaused = false;
                    this.startAutoPlay();
                    pauseBtn.textContent = '⏸';
                } else {
                    this.isPaused = true;
                    this.pauseAutoPlay();
                    pauseBtn.textContent = '▶';
                }
            }

            updateProgress() {
                const progressFill = document.querySelector('.progress-fill');
                if (!progressFill) return;

                let progress = 0;
                const increment = 100 / (this.progressDuration / 100);

                if (this.progressInterval) {
                    clearInterval(this.progressInterval);
                }

                this.progressInterval = setInterval(() => {
                    progress += increment;
                    if (progress >= 100) {
                        progress = 0;
                    }
                    progressFill.style.width = progress + '%';
                }, 100);
            }

            resetProgress() {
                const progressFill = document.querySelector('.progress-fill');
                if (!progressFill) return;

                if (this.progressInterval) {
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                }
                
                progressFill.style.width = '0%';
                
                if (!this.isPaused && this.autoPlayInterval) {
                    setTimeout(() => {
                        this.updateProgress();
                    }, 50);
                }
            }
        }

        // Solo inicializar si existen testimonios
        if (document.querySelector('.testimonials-carousel')) {
            new TestimonialsCarousel();
            console.log('✅ Testimonials Carousel inicializado');
        }
    }

    // ========================================
    // 9. CONTACT FORM CON FORMSPREE Y VALIDACIONES
    // ========================================
    function initContactForm() {
        if (!contactForm) return;

        const successMessage = document.getElementById('successMessage');

        // Envío del formulario con Formspree
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Limpiar errores previos
            document.querySelectorAll('.form-group, .checkbox-group, .radio-section').forEach(group => {
                group.classList.remove('error');
            });
            
            // Validación del formulario
            let isValid = true;
            
            const nombre = document.getElementById('nombre');
            const telefono = document.getElementById('telefono');
            const email = document.getElementById('email');
            const horario = document.querySelector('input[name="horario"]:checked');
            const privacidad = document.getElementById('privacidad');
            
            // Validar nombre
            if (nombre && nombre.value.trim().length < 2) {
                nombre.closest('.form-group').classList.add('error');
                isValid = false;
            }
            
            // Validar teléfono - longitud y formato
            if (telefono && telefono.value.trim().length < 9) {
                telefono.closest('.form-group').classList.add('error');
                isValid = false;
            }
            
            // Validación específica del teléfono con regex
            if (telefono && telefono.value.trim()) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,15}$/;
                if (!phoneRegex.test(telefono.value.trim())) {
                    telefono.closest('.form-group').classList.add('error');
                    isValid = false;
                }
            }
            
            // Validar email
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    email.closest('.form-group').classList.add('error');
                    isValid = false;
                }
            }
            
            // Validar horario seleccionado
            if (!horario) {
                document.querySelector('.radio-section').classList.add('error');
                isValid = false;
            }
            
            // Validar checkbox de privacidad
            if (privacidad && !privacidad.checked) {
                privacidad.closest('.checkbox-group').classList.add('error');
                isValid = false;
            }
            
            if (!isValid) {
                console.log('❌ Formulario inválido');
                return false;
            }
            
            // Mostrar estado de carga
            const submitBtn = document.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('span').textContent;
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Enviando...';
            
            try {
                // Enviar formulario a Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Éxito - mostrar mensaje y limpiar formulario
                    console.log('✅ Formulario enviado correctamente');
                    contactForm.style.display = 'none';
                    if (successMessage) {
                        successMessage.classList.add('show');
                        
                        // Scroll al mensaje de éxito
                        successMessage.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                    
                    // Reset después de 8 segundos
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.style.display = 'block';
                        if (successMessage) {
                            successMessage.classList.remove('show');
                        }
                    }, 8000);
                    
                } else {
                    throw new Error('Error en el envío');
                }
                
            } catch (error) {
                console.error('❌ Error al enviar formulario:', error);
                alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
            } finally {
                // Restaurar botón
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
            }
        });

        // Validación en tiempo real con filtrado de caracteres
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const group = this.closest('.form-group, .checkbox-group, .radio-section');
                if (group && group.classList.contains('error')) {
                    group.classList.remove('error');
                }
                
                // Filtrar caracteres no válidos en teléfono en tiempo real
                if (this.type === 'tel') {
                    const cursorPosition = this.selectionStart;
                    const oldValue = this.value;
                    this.value = this.value.replace(/[^0-9\+\-\s\(\)]/g, '');
                    
                    // Restaurar posición del cursor si se eliminaron caracteres
                    if (oldValue !== this.value) {
                        this.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                    }
                }
            });
        });

        // Función de validación individual de campos
        function validateField(field) {
            const group = field.closest('.form-group, .checkbox-group, .radio-section');
            group.classList.remove('error');
            
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value.trim() && !emailRegex.test(field.value.trim())) {
                    group.classList.add('error');
                }
            } else if (field.type === 'tel') {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,15}$/;
                if (field.value.trim() && !phoneRegex.test(field.value.trim())) {
                    group.classList.add('error');
                }
            } else if (field.hasAttribute('minlength')) {
                if (field.value.trim().length < parseInt(field.getAttribute('minlength'))) {
                    group.classList.add('error');
                }
            }
        }

        // Efectos visuales en focus
        const formInputs = document.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-1px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
                // Validar campo al perder el foco
                validateField(this);
            });
        });

        console.log('✅ Contact Form inicializado con Formspree');
    }

    // ========================================
    // 10. INICIALIZAR TODO
    // ========================================
    function initAll() {
        initNavbar();
        initSmoothScrolling();
        initHeroTabs();
        initInstagram();
        initScrollAnimations();
        initBenefitsAnimation();
        initTestimonialsCarousel();
        initContactForm();

        console.log('✅ Todo inicializado correctamente');
        console.log('📊 Elementos encontrados:', {
            'Navbar': navbar ? '✅' : '❌',
            'Hero tabs': document.querySelectorAll('.hero-tab').length,
            'Coaching cards': document.querySelectorAll('.coaching-card').length,
            'Intervention cards': document.querySelectorAll('.intervention-card').length,
            'Testimonial slides': document.querySelectorAll('.testimonial-slide').length,
            'Contact form': contactForm ? '✅' : '❌',
            'Benefits section': benefitsSection ? '✅' : '❌'
        });
    }

    // ¡Inicializar todo!
    initAll();
});

// ========================================
// 11. UTILITY FUNCTIONS (GLOBAL) - MEJORADAS
// ========================================
window.LaureJongWebsite = {
    // Debug functions
    triggerAnimations: function() {
        // Resetear primero
        document.querySelectorAll('.coaching-card, .intervention-card, .testimonial-card, .benefit-card, .section-header').forEach(el => {
            el.classList.remove('animate');
        });
        
        // Force reflow
        document.body.offsetHeight;
        
        // Reactivar
        setTimeout(() => {
            document.querySelectorAll('.coaching-card, .intervention-card, .testimonial-card, .benefit-card, .section-header').forEach(el => {
                el.classList.add('animate');
            });
        }, 100);
        
        console.log('🎬 Animaciones activadas manualmente');
    },
    
    resetAnimations: function() {
        document.querySelectorAll('.coaching-card, .intervention-card, .testimonial-card, .benefit-card, .section-header').forEach(el => {
            el.classList.remove('animate');
        });
        console.log('🔄 Animaciones reseteadas');
    },

    // Debug form validation
    testFormValidation: function() {
        const form = document.getElementById('contactForm');
        if (form) {
            console.log('📝 Testear validación del formulario...');
            const event = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(event);
        }
    }
};

// ========================================
// 12. FUNCIONES DE MODAL
// ========================================
function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            openModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
});

// Smooth scroll para enlaces del footer
document.addEventListener('DOMContentLoaded', function() {
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
});

// ========================================
// FUNCIONES PARA MODALES DE SERVICIOS
// ========================================

function openServiceModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Analytics tracking (opcional)
        console.log(`🎯 Modal abierto: ${modalType}`);
        
        // Si tienes Google Analytics o similar, puedes trackear aquí:
        // gtag('event', 'modal_open', { modal_type: modalType });
    }
}

function closeServiceModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        console.log(`❌ Modal cerrado: ${modalType}`);
    }
}

// Cerrar modales al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('service-modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modales con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openServiceModal = document.querySelector('.service-modal.show');
        if (openServiceModal) {
            openServiceModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
});

// ========================================
// MODIFICAR LA FUNCIÓN initHeroTabs() EXISTENTE
// ========================================

// Reemplaza tu función initHeroTabs() existente con esta versión actualizada:
function initHeroTabs() {
    document.querySelectorAll('.hero-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            document.querySelectorAll('.hero-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Get tab type and open corresponding modal
            const tabName = this.getAttribute('data-tab');
            
            if (tabName === 'coaching') {
                openServiceModal('coaching');
            } else if (tabName === 'intervenciones') {
                openServiceModal('intervenciones');
            }
            
            console.log(`🎯 Hero tab clickeado: ${tabName}`);
        });
    });
}

// ========================================
// FUNCIÓN DE TRACKING PARA EMAILS (OPCIONAL)
// ========================================
function trackEmailClick(serviceType) {
    console.log(`📧 Email enviado desde modal: ${serviceType}`);
    
    // Aquí puedes añadir tracking adicional:
    // - Google Analytics
    // - Facebook Pixel
    // - Otros sistemas de análisis
    
    // Ejemplo para Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'email_click', {
    //         service_type: serviceType,
    //         event_category: 'lead_generation'
    //     });
    // }
}

// ========================================
// GESTIÓN DE COOKIES - JAVASCRIPT
// ========================================

// Configuración de cookies
const COOKIE_CONFIG = {
    banner: 'cookieBanner',
    preferences: 'cookiePreferences',
    settingsBtn: 'cookieSettingsBtn',
    consentCookie: 'cookie_consent',
    preferencesCookie: 'cookie_preferences',
    expiryDays: 365
};

// Estado de las cookies
let cookieConsent = {
    essential: true,    // Siempre true
    analytics: false,
    functional: false,
    timestamp: null
};

// ========================================
// INICIALIZACIÓN DEL SISTEMA DE COOKIES
// ========================================
function initCookieSystem() {
    // Verificar si ya hay consentimiento
    const existingConsent = getCookie(COOKIE_CONFIG.consentCookie);
    
    if (!existingConsent) {
        // Mostrar banner si no hay consentimiento
        showCookieBanner();
    } else {
        // Cargar preferencias existentes
        loadCookiePreferences();
        showCookieSettingsButton();
    }
    
    console.log('🍪 Sistema de cookies inicializado');
}

// ========================================
// MOSTRAR/OCULTAR ELEMENTOS
// ========================================
function showCookieBanner() {
    const banner = document.getElementById(COOKIE_CONFIG.banner);
    if (banner) {
        banner.classList.add('show');
    }
}

function hideCookieBanner() {
    const banner = document.getElementById(COOKIE_CONFIG.banner);
    if (banner) {
        banner.classList.remove('show');
    }
}

function showCookiePreferences() {
    const preferences = document.getElementById(COOKIE_CONFIG.preferences);
    if (preferences) {
        // Cargar estado actual de las checkboxes
        document.getElementById('analytics-cookies').checked = cookieConsent.analytics;
        document.getElementById('functional-cookies').checked = cookieConsent.functional;
        
        preferences.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeCookiePreferences() {
    const preferences = document.getElementById(COOKIE_CONFIG.preferences);
    if (preferences) {
        preferences.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function showCookieSettingsButton() {
    const settingsBtn = document.getElementById(COOKIE_CONFIG.settingsBtn);
    if (settingsBtn) {
        settingsBtn.classList.add('show');
    }
}

// ========================================
// ACCIONES DE CONSENTIMIENTO
// ========================================
function acceptAllCookies() {
    cookieConsent = {
        essential: true,
        analytics: true,
        functional: true,
        timestamp: new Date().toISOString()
    };
    
    saveConsentAndClose();
    console.log('✅ Todas las cookies aceptadas');
}

function acceptEssentialOnly() {
    cookieConsent = {
        essential: true,
        analytics: false,
        functional: false,
        timestamp: new Date().toISOString()
    };
    
    saveConsentAndClose();
    console.log('🔒 Solo cookies esenciales aceptadas');
}

function savePreferences() {
    const analyticsChecked = document.getElementById('analytics-cookies').checked;
    const functionalChecked = document.getElementById('functional-cookies').checked;
    
    cookieConsent = {
        essential: true,
        analytics: analyticsChecked,
        functional: functionalChecked,
        timestamp: new Date().toISOString()
    };
    
    saveConsentAndClose();
    console.log('⚙️ Preferencias guardadas:', cookieConsent);
}

function saveConsentAndClose() {
    // Guardar consentimiento
    setCookie(COOKIE_CONFIG.consentCookie, 'true', COOKIE_CONFIG.expiryDays);
    setCookie(COOKIE_CONFIG.preferencesCookie, JSON.stringify(cookieConsent), COOKIE_CONFIG.expiryDays);
    
    // Cerrar elementos
    hideCookieBanner();
    closeCookiePreferences();
    showCookieSettingsButton();
    
    // Aplicar configuración
    applyCookieSettings();
}

// ========================================
// APLICAR CONFIGURACIÓN DE COOKIES
// ========================================
function applyCookieSettings() {
    // Cookies analíticas (Google Analytics)
    if (cookieConsent.analytics) {
        enableAnalytics();
    } else {
        disableAnalytics();
    }
    
    // Cookies funcionales
    if (cookieConsent.functional) {
        enableFunctionalCookies();
    } else {
        disableFunctionalCookies();
    }
    
    console.log('🔧 Configuración de cookies aplicada');
}

function enableAnalytics() {
    // Aquí puedes añadir Google Analytics cuando lo necesites
    console.log('📊 Analytics habilitado');
    
    // Ejemplo para cuando añadas Google Analytics:
    /*
    window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments);
    };
    gtag('consent', 'update', {
        'analytics_storage': 'granted'
    });
    */
}

function disableAnalytics() {
    console.log('🚫 Analytics deshabilitado');
    
    // Ejemplo para Google Analytics:
    /*
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
    */
}

function enableFunctionalCookies() {
    console.log('⚡ Cookies funcionales habilitadas');
    // Aquí puedes habilitar funcionalidades adicionales
}

function disableFunctionalCookies() {
    console.log('🔒 Cookies funcionales deshabilitadas');
    // Limpiar cookies funcionales si existen
    deleteCookie('functional_preferences');
}

// ========================================
// CARGAR PREFERENCIAS EXISTENTES
// ========================================
function loadCookiePreferences() {
    const savedPreferences = getCookie(COOKIE_CONFIG.preferencesCookie);
    
    if (savedPreferences) {
        try {
            cookieConsent = JSON.parse(savedPreferences);
            applyCookieSettings();
            console.log('📋 Preferencias cargadas:', cookieConsent);
        } catch (error) {
            console.error('❌ Error al cargar preferencias:', error);
            // Reset si hay error
            deleteCookie(COOKIE_CONFIG.consentCookie);
            deleteCookie(COOKIE_CONFIG.preferencesCookie);
        }
    }
}

// ========================================
// UTILIDADES PARA COOKIES
// ========================================
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// ========================================
// EVENTOS DEL DOM
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de cookies
    initCookieSystem();
    
    // Cerrar panel al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cookie-preferences')) {
            closeCookiePreferences();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCookiePreferences();
        }
    });
});

// ========================================
// FUNCIONES GLOBALES PARA DEBUGGING
// ========================================
window.CookieManager = {
    showBanner: showCookieBanner,
    showPreferences: showCookiePreferences,
    getCurrentConsent: () => cookieConsent,
    resetConsent: () => {
        deleteCookie(COOKIE_CONFIG.consentCookie);
        deleteCookie(COOKIE_CONFIG.preferencesCookie);
        location.reload();
    }
};

// ========================================
// MENÚ HAMBURGUESA - JAVASCRIPT
// ========================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!hamburger || !mobileMenu) {
        console.log('⚠️ Elementos del menú móvil no encontrados');
        return;
    }

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        toggleMobileMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Permitir navegación normal
            closeMobileMenu();
            
            // Pequeño delay para smooth scroll
            setTimeout(() => {
                const target = this.getAttribute('href');
                if (target.startsWith('#')) {
                    const element = document.querySelector(target);
                    if (element) {
                        element.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }
            }, 300);
        });
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Cerrar al hacer clic fuera del menú
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    // Manejar cambio de orientación en móvil
    window.addEventListener('orientationchange', function() {
        if (mobileMenu.classList.contains('active')) {
            setTimeout(() => {
                closeMobileMenu();
            }, 100);
        }
    });

    console.log('📱 Menú móvil inicializado');
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    const isOpen = mobileMenu.classList.contains('active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Activar clases
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('mobile-menu-open');
    
    // Actualizar aria-expanded
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú');
    
    // Enfocar el primer enlace para accesibilidad
    setTimeout(() => {
        const firstLink = mobileMenu.querySelector('.mobile-link');
        if (firstLink) {
            firstLink.focus();
        }
    }, 400);
    
    console.log('📱 Menú móvil abierto');
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Desactivar clases
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
    
    // Actualizar aria-expanded
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú');
    
    console.log('📱 Menú móvil cerrado');
}

// ========================================
// INTEGRAR CON EL SISTEMA EXISTENTE
// ========================================

// Modificar la función initAll() existente para incluir el menú móvil
// Añadir esta línea a tu función initAll():
// initMobileMenu();

// O si prefieres, añadir al DOMContentLoaded existente:
document.addEventListener('DOMContentLoaded', function() {
    // ... tu código existente ...
    initMobileMenu();
});

// ========================================
// UTILIDADES PARA DEBUGGING
// ========================================
window.MobileMenu = {
    open: openMobileMenu,
    close: closeMobileMenu,
    toggle: toggleMobileMenu,
    isOpen: () => {
        const mobileMenu = document.getElementById('mobileMenu');
        return mobileMenu ? mobileMenu.classList.contains('active') : false;
    }
};

 let currentVideoSlide = 0;
        const videoSlides = document.querySelectorAll('.video-slide');
        const videoDots = document.querySelectorAll('.video-dot');
        const totalVideoSlides = videoSlides.length;

        // Funcionalidad de tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active from all
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.testimonials-content').forEach(c => c.classList.remove('active'));
                
                // Add active to current
                this.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-testimonials`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                console.log(`📂 Cambiado a tab: ${targetTab}`);
            });
        });

        // Funciones del carousel de videos
        function showVideoSlide(index) {
            videoSlides.forEach(slide => slide.classList.remove('active'));
            videoDots.forEach(dot => dot.classList.remove('active'));
            
            if (videoSlides[index]) {
                videoSlides[index].classList.add('active');
            }
            if (videoDots[index]) {
                videoDots[index].classList.add('active');
            }
        }

        function nextVideoSlide() {
            currentVideoSlide = (currentVideoSlide + 1) % totalVideoSlides;
            showVideoSlide(currentVideoSlide);
        }

        function prevVideoSlide() {
            currentVideoSlide = (currentVideoSlide - 1 + totalVideoSlides) % totalVideoSlides;
            showVideoSlide(currentVideoSlide);
        }

        // Event listeners para navegación
        videoDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentVideoSlide = index;
                showVideoSlide(currentVideoSlide);
            });
        });

        document.querySelector('.video-prev-btn')?.addEventListener('click', prevVideoSlide);
        document.querySelector('.video-next-btn')?.addEventListener('click', nextVideoSlide);

        // Función para abrir YouTube
        function openYouTubeVideo(videoId) {
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
            window.open(youtubeUrl, '_blank');
            console.log(`▶️ Abriendo video de YouTube: ${videoId}`);
        }

        console.log('🎥 Sistema de videos inicializado correctamente');
        console.log(`📊 Total de slides: ${totalVideoSlides}`);