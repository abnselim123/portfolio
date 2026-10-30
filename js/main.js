/**
 * MOHAMED ALI - PORTFOLIO INTERACTIVITY & SCRIPTS
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypingEffect();
    initHeaderScroll();
    initScrollProgress();
    initScrollSpy();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initCurrentYear();
    initResponsiveHelpers();
});

/* ==========================================================================
   1. Theme Management (Dark & Light Mode)
   ========================================================================== */
const THEME_STORAGE_KEY = 'mohamed_portfolio_theme';
const body = document.body;

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
    updateThemeIcon();
}

function toggleTheme() {
    const isLight = body.classList.toggle('light-theme');
    if (isLight) {
        body.classList.remove('dark-theme');
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (!icon) return;

    if (body.classList.contains('light-theme')) {
        icon.className = 'fa-solid fa-sun';
        btn.setAttribute('title', 'Switch to Dark Mode');
    } else {
        icon.className = 'fa-solid fa-moon';
        btn.setAttribute('title', 'Switch to Light Mode');
    }
}

/* ==========================================================================
   2. Typing Animation Effect in Hero
   ========================================================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        'scalable .NET applications',
        'robust RESTful Web APIs',
        'SQL Server & EF Core databases',
        'clean C# MVC architectures',
        'responsive modern web UI'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseDelay = 1800;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ==========================================================================
   3. Header Scroll Glassmorphism
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY >= 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ==========================================================================
   4. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

/* ==========================================================================
   5. Mobile Navigation Menu Toggle
   ========================================================================== */
function toggleMenu() {
    const navLinks = document.getElementById('links');
    const backdrop = document.getElementById('menuBackdrop');
    if (!navLinks) return;

    const isOpen = navLinks.classList.toggle('active');
    if (backdrop) {
        backdrop.classList.toggle('active', isOpen);
    }
    document.body.classList.toggle('menu-open', isOpen);

    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMenuOnNav() {
    const navLinks = document.getElementById('links');
    const backdrop = document.getElementById('menuBackdrop');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   6. ScrollSpy (Active Navigation Link Highlighting)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   7. Project Category Filter
   ========================================================================== */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ==========================================================================
   8. Click-to-Copy Helper with Floating Toast
   ========================================================================== */
let toastTimeout;
function copyText(text, message = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('copyToast');
        const toastMsg = document.getElementById('toastMsg');
        if (!toast) return;

        if (toastMsg) toastMsg.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2600);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

/* ==========================================================================
   9. Async Contact Form Handler (Formspree)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (!form || !statusDiv || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Update button state
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        statusDiv.style.display = 'none';
        statusDiv.className = 'form-status-alert';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method || 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                statusDiv.className = 'form-status-alert success';
                statusDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I'll get back to you soon.`;
                statusDiv.style.display = 'block';
                form.reset();
            } else {
                const data = await response.json();
                statusDiv.className = 'form-status-alert error';
                statusDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! Something went wrong. Please reach out via WhatsApp or email directly.'}`;
                statusDiv.style.display = 'block';
            }
        } catch (error) {
            statusDiv.className = 'form-status-alert error';
            statusDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Network error. Please email me directly at <a href="mailto:abnselim123@gmail.com" style="text-decoration: underline; color: inherit;">abnselim123@gmail.com</a>.`;
            statusDiv.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

/* ==========================================================================
   10. Back to Top Button
   ========================================================================== */
function initBackToTop() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    }, { passive: true });

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   11. Dynamic Year in Footer
   ========================================================================== */
function initCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* ==========================================================================
   12. Responsive Helpers (Keyboard & Window Resize Handling)
   ========================================================================== */
function initResponsiveHelpers() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenuOnNav();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            closeMenuOnNav();
        }
    }, { passive: true });
}

