/* ============================================================
   Keity Moraes — Portfólio · interações
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ----- Ano atual no footer ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Navbar: sombra ao rolar ----- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----- Menu mobile ----- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    })
  );

  /* ----- Reveal on scroll ----- */
  const revealEls = document.querySelectorAll(
    '.section__head, .about__text, .about__card, .skill-card, .project, .tl-item, .contact, .hero__inner'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // pequeno stagger para grupos
        const delay = entry.target.closest('.skills, .projects')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 90
          : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ----- Contador de estatísticas ----- */
  const counters = document.querySelectorAll('.stat__num');
  const animateCount = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterIO.observe(c));

  /* ----- Spotlight nos skill cards ----- */
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ----- Scroll suave (fallback p/ navegadores sem CSS smooth) ----- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ----- Destaque do link ativo na navbar ----- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a');
  const spyIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a =>
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : ''
        );
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => spyIO.observe(s));
});
