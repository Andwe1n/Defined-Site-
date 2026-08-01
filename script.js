/* ── script.js — Defined landing page ── */

// ─── Navbar scroll state ──────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Hamburger / mobile menu ──────────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── Action tabs ─────────────────────────────────────────────────────────────
const tabs   = document.querySelectorAll('.atab');
const panels = document.querySelectorAll('.action-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const targetId = 'tab-' + tab.dataset.tab;
    const panel = document.getElementById(targetId);
    if (panel) panel.classList.add('active');
  });
});

// ─── Scroll-reveal ───────────────────────────────────────────────────────────
const revealSelectors = [
  '.what-section .section-label',
  '.what-section .section-title',
  '.what-section .section-desc',
  '.pillar',
  '.features-section .section-label',
  '.features-section .section-title',
  '.feature-card',
  '.actions-section .section-label',
  '.actions-section .section-title',
  '.actions-section .section-desc',
  '.action-tabs-wrap',
  '.utilities-section .section-label',
  '.utilities-section .section-title',
  '.util-card',
  '.setup-section .section-label',
  '.setup-section .section-title',
  '.step',
  '.cta-section .section-label',
  '.cta-title',
  '.cta-desc',
  '.cta-btns',
];

const revealEls = revealSelectors.flatMap(sel =>
  Array.from(document.querySelectorAll(sel))
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Stagger grid items
document.querySelectorAll('.pillar').forEach((el, i) => {
  el.style.transitionDelay = `${i * 75}ms`;
});
document.querySelectorAll('.feature-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 70}ms`;
});
document.querySelectorAll('.util-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
document.querySelectorAll('.step').forEach((el, i) => {
  el.style.transitionDelay = `${i * 100}ms`;
});

// ─── Smooth scroll for anchor links ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
