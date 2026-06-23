/* =====================================================
   MyCalistung -- Interactive Script
   Features: navbar scroll, reveal, FAQ, counter,
             confetti, sparkle on click, tilt cards,
             floating bubble colors, mock card pulse
===================================================== */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

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
      const suffix = target >= 1000 ? '+' : target === 98 ? '%' : '+';
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
const CONFETTI_COLORS = ['#7C3AED','#EC4899','#FBBF24','#10B981','#3B82F6','#F97316','#EF4444','#A855F7'];

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

// ===== SPARKLE ON CLICK (anywhere) =====
const SPARKLE_COLORS = ['#7C3AED','#EC4899','#FBBF24','#10B981','#3B82F6','#F97316'];
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

// ===== 3D TILT ON MOCK CARDS =====
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.06)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== ANIMATED GRADIENT BUBBLE COLORS =====
const bubbles = document.querySelectorAll('.bubble');
const bubbleColors = ['#7C3AED','#EC4899','#FBBF24','#10B981','#3B82F6','#F97316'];
bubbles.forEach((b, i) => {
  b.style.background = bubbleColors[i % bubbleColors.length];
});

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
    icon.style.transform = 'scale(1.3) rotate(' + (dir * 20) + 'deg)';
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = '';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
