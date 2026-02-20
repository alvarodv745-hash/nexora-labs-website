/* ============================================================
   NEXORA LABS — Main JavaScript
   Version: 1.0
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. MOBILE NAV TOGGLE
    // ============================================================
    const navToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('is-open');
            navToggle.classList.toggle('is-active');
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('is-open');
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================================
    // 2. SCROLL FADE-IN (Intersection Observer)
    // ============================================================
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        fadeElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all elements immediately
        fadeElements.forEach(el => el.classList.add('is-visible'));
    }

    // ============================================================
    // 3. ACTIVE NAV STATE
    // ============================================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinkElements = document.querySelectorAll('.nav__link');

    navLinkElements.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('nav__link--active');

        if (href === currentPage) {
            link.classList.add('nav__link--active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('nav__link--active');
        }
    });

    // ============================================================
    // 4. CONTACT FORM VALIDATION
    // ============================================================
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset all errors
            form.querySelectorAll('.form__group').forEach(group => {
                group.classList.remove('form__group--error');
            });

            // Required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                const group = field.closest('.form__group');
                const value = field.value.trim();

                if (!value) {
                    group.classList.add('form__group--error');
                    isValid = false;
                }

                // Email validation
                if (field.type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        group.classList.add('form__group--error');
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                // Success state
                const submitBtn = form.querySelector('.btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Enviado ✓';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';

                // Reset after 3 seconds (replace with actual form submission)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    form.reset();
                }, 3000);
            }
        });

        // Remove error state on input
        form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.closest('.form__group').classList.remove('form__group--error');
            });
        });
    }

});
