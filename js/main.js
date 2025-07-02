// ========================================
// MAIN.JS - LAURE JONG WEBSITE
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // 1. ELEMENTOS DEL DOM
  // ========================================
  const navbar = document.getElementById("navbar");
  const contactForm = document.getElementById("contactForm");
  const benefitsSection = document.querySelector(".benefits-section");

  // ========================================
  // 2. NAVBAR SCROLL EFFECT
  // ========================================
  function initNavbar() {
    if (!navbar) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ========================================
  // 3. SMOOTH SCROLLING
  // ========================================
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
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
      window.open(
        instagramUrl,
        "_blank",
        "width=400,height=600,scrollbars=yes,resizable=yes"
      );
    }

    // Instagram badges
    document.querySelectorAll(".instagram-badge").forEach((badge) => {
      badge.addEventListener("click", function (e) {
        e.stopPropagation();
        const card = this.closest(".coaching-card, .intervention-card");
        const instagramUrl = card.getAttribute("data-instagram-url");
        if (instagramUrl) {
          const cardTitle = card.querySelector("h3").textContent;
          trackInstagramClick(cardTitle);
          openInstagram(instagramUrl);
        }
      });

      // Hover effects
      badge.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px) scale(1.03)";
      });

      badge.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // Play buttons
    document.querySelectorAll(".play-button").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const card = this.closest(".coaching-card, .intervention-card");
        const instagramUrl = card.getAttribute("data-instagram-url");
        if (instagramUrl) {
          const cardTitle = card.querySelector("h3").textContent;
          trackInstagramClick(cardTitle);
          openInstagram(instagramUrl);
        }
      });
    });

    // Card hover effects
    document
      .querySelectorAll(".coaching-card, .intervention-card")
      .forEach((card) => {
        card.addEventListener("mouseenter", function () {
          const overlay = this.querySelector(".video-overlay");
          if (overlay && window.innerWidth > 768) {
            overlay.style.opacity = "1";
          }
        });

        card.addEventListener("mouseleave", function () {
          const overlay = this.querySelector(".video-overlay");
          if (overlay && window.innerWidth > 768) {
            overlay.style.opacity = "0";
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
      rootMargin: "0px 0px -50px 0px",
    };

    // Observer para elementos generales - RE-EJECUTABLE Y MÁS LENTO
    const generalObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("animate");
          entry.target.offsetHeight;
          setTimeout(() => {
            entry.target.classList.add("animate");
          }, 300);
        } else {
          entry.target.classList.remove("animate");
        }
      });
    }, observerOptions);

    // Observer para cards con animación escalonada - RE-EJECUTABLE Y MÁS LENTO
    const cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionCards = entry.target
            .closest("section")
            .querySelectorAll(".coaching-card, .intervention-card");
          sectionCards.forEach((card) => card.classList.remove("animate"));

          entry.target.offsetHeight;

          sectionCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate");
            }, 500 + index * 400);
          });
        } else {
          const sectionCards = entry.target
            .closest("section")
            ?.querySelectorAll(".coaching-card, .intervention-card");
          if (sectionCards) {
            sectionCards.forEach((card) => card.classList.remove("animate"));
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll(".section-header").forEach((el) => {
      generalObserver.observe(el);
    });

    document
      .querySelectorAll("#coaching, #intervenciones")
      .forEach((section) => {
        cardObserver.observe(section);
      });
  }

  // ========================================
  // 7. BENEFITS SECTION ANIMATION RE-EJECUTABLE
  // ========================================
  function initBenefitsAnimation() {
    if (!benefitsSection) return;

    const benefitsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const leftCards = document.querySelectorAll(
              ".benefits-left .benefit-card"
            );
            const rightCards = document.querySelectorAll(
              ".benefits-right .benefit-card"
            );

            [...leftCards, ...rightCards].forEach((card) => {
              card.classList.remove("animate");
            });

            entry.target.offsetHeight;

            const sequence = [
              { card: leftCards[0], delay: 500 },
              { card: rightCards[0], delay: 1200 },
              { card: leftCards[1], delay: 1900 },
              { card: rightCards[1], delay: 2600 },
              { card: leftCards[2], delay: 3300 },
              { card: rightCards[2], delay: 4000 },
            ];

            sequence.forEach(({ card, delay }) => {
              if (card) {
                setTimeout(() => {
                  card.classList.add("animate");
                }, delay);
              }
            });
          } else {
            const allCards = document.querySelectorAll(".benefit-card");
            allCards.forEach((card) => card.classList.remove("animate"));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -150px 0px",
      }
    );

    benefitsObserver.observe(benefitsSection);
  }

  // ========================================
  // 8. TESTIMONIALS CAROUSEL
  // ========================================
  function initTestimonialsCarousel() {
    class TestimonialsCarousel {
      constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll(".testimonial-slide");
        this.dots = document.querySelectorAll(".dot");
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.progressInterval = null;
        this.isPaused = false;
        this.progressDuration = 6000;

        if (this.slides.length === 0) {
          return;
        }

        this.init();
      }

      init() {
        this.bindEvents();
        this.startAutoPlay();
      }

      bindEvents() {
        this.dots.forEach((dot, index) => {
          dot.addEventListener("click", () => {
            this.goToSlide(index);
            this.resetAutoPlay();
          });
        });

        const prevBtn = document.querySelector(".prev-btn");
        const nextBtn = document.querySelector(".next-btn");
        const pauseBtn = document.querySelector(".pause-btn");

        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            this.prevSlide();
            this.resetAutoPlay();
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            this.nextSlide();
            this.resetAutoPlay();
          });
        }

        if (pauseBtn) {
          pauseBtn.addEventListener("click", () => {
            this.togglePause();
          });
        }

        const carousel = document.querySelector(".testimonials-carousel");
        if (carousel) {
          carousel.addEventListener("mouseenter", () => {
            this.pauseAutoPlay();
          });

          carousel.addEventListener("mouseleave", () => {
            if (!this.isPaused) {
              this.startAutoPlay();
            }
          });
        }
      }

      goToSlide(index) {
        this.slides[this.currentSlide].classList.remove("active");
        this.dots[this.currentSlide].classList.remove("active");

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add("active");
        this.dots[this.currentSlide].classList.add("active");

        this.resetProgress();
      }

      nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
      }

      prevSlide() {
        const prevIndex =
          (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
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
        const pauseBtn = document.querySelector(".pause-btn");

        if (this.isPaused) {
          this.isPaused = false;
          this.startAutoPlay();
          pauseBtn.textContent = "⏸";
        } else {
          this.isPaused = true;
          this.pauseAutoPlay();
          pauseBtn.textContent = "▶";
        }
      }

      updateProgress() {
        const progressFill = document.querySelector(".progress-fill");
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
          progressFill.style.width = progress + "%";
        }, 100);
      }

      resetProgress() {
        const progressFill = document.querySelector(".progress-fill");
        if (!progressFill) return;

        if (this.progressInterval) {
          clearInterval(this.progressInterval);
          this.progressInterval = null;
        }

        progressFill.style.width = "0%";

        if (!this.isPaused && this.autoPlayInterval) {
          setTimeout(() => {
            this.updateProgress();
          }, 50);
        }
      }
    }

    if (document.querySelector(".testimonials-carousel")) {
      new TestimonialsCarousel();
    }
  }

  // ========================================
  // 9. CONTACT FORM CON FORMSPREE Y VALIDACIONES
  // ========================================
  function initContactForm() {
    if (!contactForm) return;

    const successMessage = document.getElementById("successMessage");

    contactForm.addEventListener("submit", function (e) {
      document
        .querySelectorAll(".form-group, .checkbox-group, .radio-section")
        .forEach((group) => {
          group.classList.remove("error");
        });

      let isValid = true;

      const nombre = document.getElementById("nombre");
      const telefono = document.getElementById("telefono");
      const email = document.getElementById("email");
      const horario = document.querySelector('input[name="horario"]:checked');
      const privacidad = document.getElementById("privacidad");

      if (nombre && nombre.value.trim().length < 2) {
        nombre.closest(".form-group").classList.add("error");
        isValid = false;
      }

      if (telefono && telefono.value.trim().length < 9) {
        telefono.closest(".form-group").classList.add("error");
        isValid = false;
      }
      if (telefono && telefono.value.trim()) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,15}$/;
        if (!phoneRegex.test(telefono.value.trim())) {
          telefono.closest(".form-group").classList.add("error");
          isValid = false;
        }
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          email.closest(".form-group").classList.add("error");
          isValid = false;
        }
      }
      if (!horario) {
        document.querySelector(".radio-section").classList.add("error");
        isValid = false;
      }

      if (privacidad && !privacidad.checked) {
        privacidad.closest(".checkbox-group").classList.add("error");
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
        return false;
      }

      const submitBtn = document.querySelector(".btn-submit");
      const originalText = submitBtn.querySelector("span").textContent;

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
      submitBtn.querySelector("span").textContent = "Enviando...";

      setTimeout(() => {
        contactForm.style.display = "none";
        if (successMessage) {
          successMessage.classList.add("show");
          successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = "block";
          if (successMessage) {
            successMessage.classList.remove("show");
          }

          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
          submitBtn.querySelector("span").textContent = originalText;
        }, 8000);
      }, 2000);
    });

    const inputs = contactForm.querySelectorAll(
      "input[required], textarea[required]"
    );
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        const group = this.closest(
          ".form-group, .checkbox-group, .radio-section"
        );
        if (group && group.classList.contains("error")) {
          group.classList.remove("error");
        }

        if (this.type === "tel") {
          const cursorPosition = this.selectionStart;
          const oldValue = this.value;
          this.value = this.value.replace(/[^0-9\+\-\s\(\)]/g, "");

          if (oldValue !== this.value) {
            this.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
          }
        }
      });
    });

    function validateField(field) {
      const group = field.closest(
        ".form-group, .checkbox-group, .radio-section"
      );
      group.classList.remove("error");

      if (field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value.trim() && !emailRegex.test(field.value.trim())) {
          group.classList.add("error");
        }
      } else if (field.type === "tel") {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,15}$/;
        if (field.value.trim() && !phoneRegex.test(field.value.trim())) {
          group.classList.add("error");
        }
      } else if (field.hasAttribute("minlength")) {
        if (
          field.value.trim().length < parseInt(field.getAttribute("minlength"))
        ) {
          group.classList.add("error");
        }
      }
    }

    const formInputs = document.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.style.transform = "translateY(-1px)";
      });

      input.addEventListener("blur", function () {
        this.parentElement.style.transform = "translateY(0)";
        validateField(this);
      });
    });
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
    initMobileMenu();
  }

  initAll();
});

// ========================================
// 11. UTILITY FUNCTIONS (GLOBAL) - MEJORADAS
// ========================================
window.LaureJongWebsite = {
  triggerAnimations: function () {
    document
      .querySelectorAll(
        ".coaching-card, .intervention-card, .testimonial-card, .benefit-card, .section-header"
      )
      .forEach((el) => {
        el.classList.remove("animate");
      });

    document.body.offsetHeight;

    setTimeout(() => {
      document
        .querySelectorAll(
          ".coaching-card, .intervention-card, .testimonial-card, .benefit-card, .section-header"
        )
        .forEach((el) => {
          el.classList.add("animate");
        });
    }, 100);
  },

  resetAnimations: function () {
    document
      .querySelectorAll(
        ".coaching-card, .intervention-card, .testimonial-card, .benefit-card, .section-header"
      )
      .forEach((el) => {
        el.classList.remove("animate");
      });
  },

  testFormValidation: function () {
    const form = document.getElementById("contactForm");
    if (form) {
      const event = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
    }
  },
};

// ========================================
// 12. FUNCIONES DE MODAL
// ========================================
function openModal(modalType) {
  const modal = document.getElementById(modalType + "Modal");
  if (modal) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalType) {
  const modal = document.getElementById(modalType + "Modal");
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal.show");
    if (openModal) {
      openModal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// ========================================
// FUNCIONES PARA MODALES DE SERVICIOS
// ========================================

function openServiceModal(modalType) {
  const modal = document.getElementById(modalType + "Modal");
  if (modal) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

function closeServiceModal(modalType) {
  const modal = document.getElementById(modalType + "Modal");
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("service-modal")) {
    e.target.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const openServiceModal = document.querySelector(".service-modal.show");
    if (openServiceModal) {
      openServiceModal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }
});

// ========================================
// MODIFICAR LA FUNCIÓN initHeroTabs() EXISTENTE
// ========================================

function initHeroTabs() {
  document.querySelectorAll(".hero-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".hero-tab").forEach((t) => {
        t.classList.remove("active");
      });

      this.classList.add("active");

      const tabName = this.getAttribute("data-tab");

      if (tabName === "coaching") {
        openServiceModal("coaching");
      } else if (tabName === "intervenciones") {
        openServiceModal("intervenciones");
      }
    });
  });
}

// ========================================
// FUNCIÓN DE TRACKING PARA EMAILS (OPCIONAL)
// ========================================
//function trackEmailClick(serviceType) {
// console.log(`📧 Email enviado desde modal: ${serviceType}`);

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
//}

// ========================================
// GESTIÓN DE COOKIES - JAVASCRIPT
// ========================================

const COOKIE_CONFIG = {
  banner: "cookieBanner",
  preferences: "cookiePreferences",
  settingsBtn: "cookieSettingsBtn",
  consentCookie: "cookie_consent",
  preferencesCookie: "cookie_preferences",
  expiryDays: 365,
};

// Estado actual
let cookieConsent = {
  essential: true,
  functional: false,
  timestamp: null,
};

// ========================================
// INICIALIZACIÓN
// ========================================
function initCookieSystem() {
  const existingConsent = getCookie(COOKIE_CONFIG.consentCookie);

  if (!existingConsent) {
    showCookieBanner();
  } else {
    loadCookiePreferences();
    showCookieSettingsButton();
  }
}

// ========================================
// MOSTRAR / OCULTAR ELEMENTOS
// ========================================
function showCookieBanner() {
  document.getElementById(COOKIE_CONFIG.banner)?.classList.add("show");
}

function hideCookieBanner() {
  document.getElementById(COOKIE_CONFIG.banner)?.classList.remove("show");
}

function showCookiePreferences() {
  const pref = document.getElementById(COOKIE_CONFIG.preferences);
  if (pref) {
    document.getElementById("functional-cookies").checked =
      cookieConsent.functional;
    pref.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

function closeCookiePreferences() {
  const pref = document.getElementById(COOKIE_CONFIG.preferences);
  if (pref) {
    pref.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

function showCookieSettingsButton() {
  document.getElementById(COOKIE_CONFIG.settingsBtn)?.classList.add("show");
}

// ========================================
// ACCIONES
// ========================================
function acceptAllCookies() {
  cookieConsent = {
    essential: true,
    functional: true,
    timestamp: new Date().toISOString(),
  };
  saveConsentAndClose();
}

function acceptEssentialOnly() {
  cookieConsent = {
    essential: true,
    functional: false,
    timestamp: new Date().toISOString(),
  };
  saveConsentAndClose();
}

function savePreferences() {
  cookieConsent = {
    essential: true,
    functional: document.getElementById("functional-cookies").checked,
    timestamp: new Date().toISOString(),
  };
  saveConsentAndClose();
}

function saveConsentAndClose() {
  setCookie(COOKIE_CONFIG.consentCookie, "true", COOKIE_CONFIG.expiryDays);
  setCookie(
    COOKIE_CONFIG.preferencesCookie,
    JSON.stringify(cookieConsent),
    COOKIE_CONFIG.expiryDays
  );

  hideCookieBanner();
  closeCookiePreferences();
  showCookieSettingsButton();

  applyCookieSettings();
}

// ========================================
// APLICAR CONFIGURACIÓN
// ========================================
function applyCookieSettings() {
  if (cookieConsent.functional) {
    enableFunctionalCookies();
  } else {
    disableFunctionalCookies();
  }
}

function disableFunctionalCookies() {
  deleteCookie("functional_preferences");
}

// ========================================
// CARGAR PREFERENCIAS
// ========================================
function loadCookiePreferences() {
  const saved = getCookie(COOKIE_CONFIG.preferencesCookie);
  if (saved) {
    try {
      cookieConsent = JSON.parse(saved);
      applyCookieSettings();
    } catch (e) {
      deleteCookie(COOKIE_CONFIG.consentCookie);
      deleteCookie(COOKIE_CONFIG.preferencesCookie);
    }
  }
}

// ========================================
// COOKIES UTILITIES
// ========================================
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name) {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] || null
  );
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// ========================================
// EVENTOS
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  initCookieSystem();

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cookie-preferences")) {
      closeCookiePreferences();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCookiePreferences();
    }
  });
});

// DEBUG
window.CookieManager = {
  showBanner: showCookieBanner,
  showPreferences: showCookiePreferences,
  getCurrentConsent: () => cookieConsent,
  resetConsent: () => {
    deleteCookie(COOKIE_CONFIG.consentCookie);
    deleteCookie(COOKIE_CONFIG.preferencesCookie);
    location.reload();
  },
};

// ========================================
// MENÚ HAMBURGUESA - JAVASCRIPT
// ========================================

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!hamburger || !mobileMenu) {
    return;
  }

  hamburger.addEventListener("click", function () {
    toggleMobileMenu();
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      closeMobileMenu();

      setTimeout(() => {
        const target = this.getAttribute("href");
        if (target.startsWith("#")) {
          const element = document.querySelector(target);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }, 300);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  mobileMenu.addEventListener("click", function (e) {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  window.addEventListener("orientationchange", function () {
    if (mobileMenu.classList.contains("active")) {
      setTimeout(() => {
        closeMobileMenu();
      }, 100);
    }
  });
}

function toggleMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  const isOpen = mobileMenu.classList.contains("active");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.classList.add("active");
  mobileMenu.classList.add("active");
  document.body.classList.add("mobile-menu-open");

  hamburger.setAttribute("aria-expanded", "true");
  hamburger.setAttribute("aria-label", "Cerrar menú");

  setTimeout(() => {
    const firstLink = mobileMenu.querySelector(".mobile-link");
    if (firstLink) {
      firstLink.focus();
    }
  }, 400);
}

function closeMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  document.body.classList.remove("mobile-menu-open");

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Abrir menú");
}

// ========================================
// UTILIDADES PARA DEBUGGING
// ========================================
window.MobileMenu = {
  open: openMobileMenu,
  close: closeMobileMenu,
  toggle: toggleMobileMenu,
  isOpen: () => {
    const mobileMenu = document.getElementById("mobileMenu");
    return mobileMenu ? mobileMenu.classList.contains("active") : false;
  },
};

let currentVideoSlide = 0;
const videoSlides = document.querySelectorAll(".video-slide");
const videoDots = document.querySelectorAll(".video-dot");
const totalVideoSlides = videoSlides.length;

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetTab = this.getAttribute("data-tab");

    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".testimonials-content")
      .forEach((c) => c.classList.remove("active"));

    this.classList.add("active");
    const targetContent = document.getElementById(`${targetTab}-testimonials`);
    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});

function showVideoSlide(index) {
  videoSlides.forEach((slide) => slide.classList.remove("active"));
  videoDots.forEach((dot) => dot.classList.remove("active"));

  if (videoSlides[index]) {
    videoSlides[index].classList.add("active");
  }
  if (videoDots[index]) {
    videoDots[index].classList.add("active");
  }
}

function nextVideoSlide() {
  currentVideoSlide = (currentVideoSlide + 1) % totalVideoSlides;
  showVideoSlide(currentVideoSlide);
}

function prevVideoSlide() {
  currentVideoSlide =
    (currentVideoSlide - 1 + totalVideoSlides) % totalVideoSlides;
  showVideoSlide(currentVideoSlide);
}

videoDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentVideoSlide = index;
    showVideoSlide(currentVideoSlide);
  });
});

document
  .querySelector(".video-prev-btn")
  ?.addEventListener("click", prevVideoSlide);
document
  .querySelector(".video-next-btn")
  ?.addEventListener("click", nextVideoSlide);

function openYouTubeVideo(videoId) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  window.open(youtubeUrl, "_blank");
}
