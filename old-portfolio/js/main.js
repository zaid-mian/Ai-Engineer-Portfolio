/* ═══════════════════════════════════════════
   AI ENGINEER PORTFOLIO — MAIN JAVASCRIPT
   ═══════════════════════════════════════════ */

'use strict';

/* ────────────────────────────────────────
   LOADER
──────────────────────────────────────── */
(function initLoader() {
  const wrapper = document.getElementById('loaderWrapper');
  const bar = document.getElementById('loaderBar');
  const text = document.getElementById('loaderText');
  const messages = [
    'Initializing AI modules...',
    'Loading neural networks...',
    'Calibrating models...',
    'Rendering portfolio...',
    'Ready!'
  ];
  let progress = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';

    const newMsgIdx = Math.floor((progress / 100) * (messages.length - 1));
    if (newMsgIdx !== msgIdx) {
      msgIdx = newMsgIdx;
      text.textContent = messages[msgIdx];
    }

    if (progress >= 100) {
      clearInterval(interval);
      text.textContent = 'Ready!';
      setTimeout(() => {
        wrapper.classList.add('done');
        document.body.style.overflow = '';
        initAll();
      }, 500);
    }
  }, 120);

  document.body.style.overflow = 'hidden';
})();

/* ────────────────────────────────────────
   INIT ALL
──────────────────────────────────────── */
function initAll() {
  initCursor();
  initNavbar();
  initHamburger();
  initParticles();
  initTyped();
  initHeroCanvas();
  initCounters();
  initScrollReveal();
  initSkillBars();
  initSkillTabs();
  initProjectFilters();
  initContactForm();
  initBackToTop();
  initNavHighlight();
  initVanillaTilt();
  initNameHover();
  initSmoothScroll();
}

/* ────────────────────────────────────────
   CUSTOM CURSOR
──────────────────────────────────────── */
function initCursor() {
  const outer = document.getElementById('cursorOuter');
  const inner = document.getElementById('cursorInner');
  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    inner.style.left = mouseX + 'px';
    inner.style.top = mouseY + 'px';
  });

  // Smooth outer cursor
  function animateCursor() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;
    outer.style.left = outerX + 'px';
    outer.style.top = outerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .service-card, .project-card, .cert-card, .tag, .filter-btn, .skill-tab');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      outer.classList.add('hovered');
      inner.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      outer.classList.remove('hovered');
      inner.classList.remove('hovered');
    });
  });
}

/* ────────────────────────────────────────
   NAVBAR
──────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ────────────────────────────────────────
   NAV ACTIVE HIGHLIGHT ON SCROLL
──────────────────────────────────────── */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ────────────────────────────────────────
   PARTICLES.JS
──────────────────────────────────────── */
function initParticles() {
  if (typeof particlesJS === 'undefined') return;
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: ['#6c63ff', '#00d4ff', '#ff6b9d'] },
      shape: { type: 'circle' },
      opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false } },
      size: { value: 2.5, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
      line_linked: {
        enable: true,
        distance: 140,
        color: '#6c63ff',
        opacity: 0.12,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.3 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

/* ────────────────────────────────────────
   TYPED.JS
──────────────────────────────────────── */
function initTyped() {
  if (typeof Typed === 'undefined') return;
  new Typed('#typedText', {
    strings: [
      'AI Engineer',
      'ML Researcher',
      'Deep Learning Expert',
      'NLP Specialist',
      'Gen AI Builder',
      'MLOps Engineer'
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 2200,
    loop: true,
    smartBackspace: true
  });
}

/* ────────────────────────────────────────
   HERO CANVAS (Neural Network Animation)
──────────────────────────────────────── */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Nodes
  const NODE_COUNT = 40;
  const nodes = [];

  class Node {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2.5 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() < 0.5 ? '108, 99, 255' : '0, 212, 255';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push(new Node());
  }

  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const alpha = (1 - dist / 180) * 0.15;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => { n.update(); n.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}

/* ────────────────────────────────────────
   COUNTER ANIMATION
──────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  let triggered = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current);
        }, 40);
      });
    }
  }, { threshold: 0.5 });

  const heroSection = document.getElementById('home');
  if (heroSection) observer.observe(heroSection);
}

/* ────────────────────────────────────────
   SCROLL REVEAL (IntersectionObserver)
──────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position in parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        let idx = 0;
        siblings.forEach((sib, n) => { if (sib === entry.target) idx = n; });
        const dataDelay = parseFloat(entry.target.dataset.delay || 0);
        const delay = dataDelay > 0 ? dataDelay * 1000 : idx * 80;

        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ────────────────────────────────────────
   SKILL BARS ANIMATION
──────────────────────────────────────── */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* ────────────────────────────────────────
   SKILL TABS FILTER
──────────────────────────────────────── */
function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;
      cards.forEach((card, idx) => {
        const matches = category === 'all' || card.dataset.category === category;
        if (matches) {
          card.classList.remove('hidden');
          card.style.animationDelay = (idx * 0.05) + 's';
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });

      // Re-animate skill bars for visible cards
      setTimeout(() => {
        document.querySelectorAll('.skill-card:not(.hidden) .skill-bar').forEach(bar => {
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
          }, 100);
        });
      }, 50);
    });
  });
}

/* ────────────────────────────────────────
   PROJECT FILTER
──────────────────────────────────────── */
function initProjectFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        if (matches) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '';
            card.style.transform = '';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ────────────────────────────────────────
   CONTACT FORM
──────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const btnSpan = btn.querySelector('span');
    const btnIcon = btn.querySelector('i');
    const btnLoader = btn.querySelector('.btn-loader');

    // Disable button + show loader
    btn.disabled = true;
    btnSpan.style.opacity = '0';
    btnIcon.style.display = 'none';
    btnLoader.style.display = 'flex';

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Restore button
    btn.disabled = false;
    btnSpan.style.opacity = '';
    btnIcon.style.display = '';
    btnLoader.style.display = 'none';

    // Show success
    successMsg.classList.add('show');
    form.reset();

    setTimeout(() => successMsg.classList.remove('show'), 5000);
  });

  // Input focus animation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
    input.addEventListener('blur', () => input.parentElement.classList.remove('focused'));
  });
}

/* ────────────────────────────────────────
   BACK TO TOP
──────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ────────────────────────────────────────
   VANILLA TILT
──────────────────────────────────────── */
function initVanillaTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  const elements = document.querySelectorAll('[data-tilt]');
  VanillaTilt.init(elements);
}

/* ────────────────────────────────────────
   NAME HOVER ANIMATION
──────────────────────────────────────── */
function initNameHover() {
  const chars = document.querySelectorAll('.name-char');
  chars.forEach(char => {
    char.addEventListener('mouseenter', () => {
      char.style.transform = 'translateY(-10px)';
      char.style.color = 'var(--accent-2)';
      setTimeout(() => {
        char.style.transform = '';
        char.style.color = '';
      }, 500);
    });
  });
}

/* ────────────────────────────────────────
   SMOOTH SCROLL
──────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72');
        const y = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

/* ────────────────────────────────────────
   GSAP SCROLL ANIMATIONS (if loaded)
──────────────────────────────────────── */
window.addEventListener('load', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero elements entrance
    gsap.fromTo('.hero-badge', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-desc', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 0.6, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-stats', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-actions', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 1.0, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-socials', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 1.1, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-image-wrapper', 
      { opacity: 0, scale: 0.85, x: 40 }, 
      { opacity: 1, scale: 1, x: 0, duration: 1.0, delay: 0.5, ease: 'power3.out' }
    );

    // Parallax orbs
    gsap.to('.orb-1', {
      scrollTrigger: { trigger: '.hero', scrub: 1 },
      y: -120, ease: 'none'
    });
    gsap.to('.orb-2', {
      scrollTrigger: { trigger: '.hero', scrub: 1.5 },
      y: -80, ease: 'none'
    });

    // Section transitions
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        }
      );
    });

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true }
        }
      );
    });

    // Cert cards
    gsap.utils.toArray('.cert-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5,
          delay: i * 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        }
      );
    });
  }
});

/* ────────────────────────────────────────
   SECTION BG GRADIENT SHIFT ON SCROLL
──────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const hue = Math.round(scrollPct * 40);
  document.documentElement.style.setProperty('--accent', `hsl(${250 + hue}, 100%, 69%)`);
}, { passive: true });

/* ────────────────────────────────────────
   MAGNETIC BUTTON EFFECT
──────────────────────────────────────── */
document.querySelectorAll('.btn-primary, .btn-outline, .btn-submit, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ────────────────────────────────────────
   SECTION TAG GLOW ON HOVER
──────────────────────────────────────── */
document.querySelectorAll('.section-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.3)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = '';
  });
});

/* ────────────────────────────────────────
   CARD GLOW ON HOVER
──────────────────────────────────────── */
document.querySelectorAll('.service-card, .project-card, .cert-card, .timeline-content').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', x + '%');
    card.style.setProperty('--glow-y', y + '%');
  });
});

/* ────────────────────────────────────────
   PREFERS REDUCED MOTION
──────────────────────────────────────── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.ring, .orb, .orbit-icon, .floating-card').forEach(el => {
    el.style.animation = 'none';
  });
}

console.log('%c AI Engineer Portfolio ', 
  'background: linear-gradient(135deg, #6c63ff, #00d4ff); color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;'
);
console.log('%c Built with ❤️ + AI ', 
  'color: #6c63ff; font-size: 12px;'
);
