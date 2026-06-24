// =========================================================
// MyCalistung -- Script v3 (Mobile Optimized)
// =========================================================

// ===== AUTO COLORIZE LOGO =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.brand-logo').forEach(logo => {
    if (logo.querySelector('span')) return;
    const text = logo.textContent.trim();
    logo.textContent = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'l' + i;
      logo.appendChild(span);
    });
  });
});

// ===== BROWSER BACK NAVIGATION =====
// Track navigation history for mobile back button
let navigationHistory = [];
let currentSection = 'home';

// Get all sections
const sections = ['home', 'masalah', 'solusi', 'fitur', 'testimoni', 'harga', 'faq'];

// Handle smooth scroll with history
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      // Add to history if different from current
      if (targetId !== currentSection) {
        navigationHistory.push(currentSection);
        currentSection = targetId;
      }
      
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Handle browser back button
window.addEventListener('popstate', (e) => {
  if (navigationHistory.length > 0) {
    const previousSection = navigationHistory.pop();
    const target = document.getElementById(previousSection);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      currentSection = previousSection;
    }
  }
});

// Update URL hash on scroll (for back button support)
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (currentSection !== sectionId) {
            navigationHistory.push(currentSection);
            currentSection = sectionId;
            // Update URL without reloading
            if (history.replaceState) {
              history.replaceState(null, null, `#${sectionId}`);
            }
          }
        }
      }
    });
  }, 100);
}, { passive: true });

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== REVEAL ON SCROLL =====
document.documentElement.classList.add('js-reveal-active');
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('in'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach((el) => {
  const parent = el.parentElement;
  const siblings = parent ? [...parent.querySelectorAll('.reveal')] : [];
  const idx = siblings.indexOf(el);
  if (idx > 0) el.dataset.delay = idx * 80;
  revealObserver.observe(el);
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open', !isOpen);
  });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = target === 98 ? '%' : '+';
      const duration = 1800;
      const step = Math.ceil(duration / target);
      let current = 0;
      const timer = setInterval(() => {
        current += Math.max(1, Math.floor(target / 60));
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString('id-ID') + suffix;
      }, step > 30 ? step : 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

// ===== CONFETTI BURST =====
const CONFETTI_COLORS = ['#FF6B5B', '#FFC857', '#3FA982', '#4D9DD6', '#2B2250'];
function launchConfetti(x, y) {
  for (let i = 0; i < 36; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = Math.random() * 10 + 6;
    piece.style.cssText = [
      'left:' + (x + (Math.random() - 0.5) * 200) + 'px',
      'top:' + y + 'px',
      'width:' + size + 'px',
      'height:' + size + 'px',
      'background:' + CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px'),
      'animation-duration:' + (Math.random() * 0.8 + 0.9) + 's',
      'animation-delay:' + (Math.random() * 0.3) + 's'
    ].join(';');
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}
document.querySelectorAll('.confetti-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    launchConfetti(rect.left + rect.width / 2, rect.top);
  });
});

// ===== SPARKLE ON CLICK =====
const SPARKLE_COLORS = ['#FF6B5B', '#FFC857', '#3FA982', '#4D9DD6'];
document.addEventListener('click', (e) => {
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle-dot';
    const angle = (i / 6) * 2 * Math.PI;
    const dist = 28 + Math.random() * 20;
    dot.style.cssText = [
      'left:' + (e.clientX + Math.cos(angle) * dist) + 'px',
      'top:' + (e.clientY + Math.sin(angle) * dist) + 'px',
      'background:' + SPARKLE_COLORS[i % SPARKLE_COLORS.length],
      'animation-duration:' + (0.5 + Math.random() * 0.3) + 's'
    ].join(';');
    document.body.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  }
});

// ===== 3D TILT ON CARDS (Desktop only) =====
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;
      card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.04)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== HERO MOCK CARD CLICK BOUNCE =====
document.querySelectorAll('.mock-card').forEach(card => {
  card.addEventListener('click', () => {
    card.style.transform = 'scale(.9)';
    setTimeout(() => { card.style.transform = ''; }, 200);
  });
});

// ===== ICON ROW -- random wiggle on hover =====
document.querySelectorAll('.icon-row span').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    const dir = Math.random() > 0.5 ? 1 : -1;
    icon.style.transform = 'scale(1.25) rotate(' + (dir * 18) + 'deg)';
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = '';
  });
});

// ===== TESTIMONIALS CAROUSEL (Mobile Optimized) =====
(() => {
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  let index = 0;
  let autoplayTimer = null;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Lihat testimoni ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function update() {
    currentTranslate = -index * 100;
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
    restartAutoplay();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function restartAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, 2000);
  }

  // Pause autoplay on hover (desktop)
  track.addEventListener('mouseenter', () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
  });

  track.addEventListener('mouseleave', () => {
    restartAutoplay();
  });

  // Touch/Drag support for mobile
  track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
    if (autoplayTimer) clearInterval(autoplayTimer);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const diff = e.clientX - startX;
    const containerWidth = track.parentElement.offsetWidth;
    const percentDiff = (diff / containerWidth) * 100;
    track.style.transform = `translateX(${currentTranslate + percentDiff}%)`;
  });

  track.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 40) {
      diff < 0 ? next() : prev();
    } else {
      update();
    }
    restartAutoplay();
  });

  track.addEventListener('pointerleave', () => {
    if (isDragging) {
      isDragging = false;
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
      update();
      restartAutoplay();
    }
  });

  // Initialize
  update();
  restartAutoplay();
})();
