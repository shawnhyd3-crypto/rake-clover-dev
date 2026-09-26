// Rake & Clover Landscaping - main.js
document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation
    var navToggle = document.querySelector('.nav-toggle');
    var navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var open = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Header rule appears once the page scrolls
    var header = document.querySelector('.header');
    function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Lead-intent proxy: fire Lead in Meta + generate_lead in GA4 on quote CTA clicks.
    // The Jobber work-request form is a cross-origin iframe, so submits can't be
    // observed directly. Dedup: at most once per page load.
    document.querySelectorAll('a[href$="#quote"]').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.__rcLeadFired) return;
            window.__rcLeadFired = true;
            if (typeof fbq === 'function') { fbq('track', 'Lead'); }
            if (typeof gtag === 'function') {
                gtag('event', 'generate_lead', { 'currency': 'CAD', 'value': 50.0 });
            }
        });
    });
});
