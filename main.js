/* ===========================
   NAV — scroll state
=========================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===========================
   MOBILE MENU
=========================== */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  if (!el.classList.contains('reveal--delay-1') &&
      !el.classList.contains('reveal--delay-2') &&
      !el.classList.contains('reveal--delay-3')) {
    const siblings = el.parentElement.querySelectorAll('.reveal:not([class*="delay"])');
    const idx = Array.from(siblings).indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${idx * 0.1}s`;
  }
  revealObserver.observe(el);
});

/* ===========================
   FAQ ACCORDION
=========================== */
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq__answer');
    const isOpen = btn.classList.contains('active');

    document.querySelectorAll('.faq__question.active').forEach(active => {
      active.classList.remove('active');
      active.parentElement.querySelector('.faq__answer').classList.remove('open');
    });

    if (!isOpen) {
      btn.classList.add('active');
      answer.classList.add('open');
    }
  });
});

/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById('contactForm');
const feedback = document.getElementById('contactFeedback');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const body = new URLSearchParams(formData);

    feedback.textContent = '';
    feedback.classList.remove('error');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.');
      }

      feedback.textContent = 'Mensaje enviado. Gracias, te respondo en menos de 24 horas.';
      form.reset();
    } catch (error) {
      feedback.textContent = 'Hubo un error al enviar. Prueba de nuevo o escríbeme directamente a contacto@pawzn.com.';
      feedback.classList.add('error');
    } finally {
      btn.textContent = 'Enviar mensaje';
      btn.disabled = false;
    }
  });
}

/* ===========================
   SMOOTH ANCHOR SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===========================
   HERO ENTRANCE
=========================== */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});
