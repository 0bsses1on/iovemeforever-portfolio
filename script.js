/* ============================================
   ЛЕПЕСТКИ САКУРЫ
   ============================================ */
(function createSakuraPetals() {
  const container = document.getElementById('petals');
  if (!container) return;

  const petalSVG = `
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2 C 25 8, 35 12, 35 20 C 35 28, 28 35, 20 38 C 12 35, 5 28, 5 20 C 5 12, 15 8, 20 2 Z" 
            fill="currentColor"/>
    </svg>
  `;

  const petalColors = ['#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#fce4ec'];
  const PETAL_COUNT = 30;

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 14 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 15;
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];

    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.left = left + '%';
    petal.style.color = color;
    petal.style.animation = `petalFall ${duration}s linear ${delay}s infinite`;

    petal.innerHTML = petalSVG;
    container.appendChild(petal);
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    createPetal();
  }

  container.style.opacity = '0';
  container.style.transition = 'opacity 2s ease';
  setTimeout(() => {
    container.style.opacity = '0.6';
  }, 300);
})();

/* ============================================
   АНИМАЦИЯ СЧЁТЧИКОВ
   ============================================ */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Запуск анимации при загрузке
window.addEventListener('load', () => {
  setTimeout(animateCounters, 500);
});

/* ============================================
   FAQ АККОРДЕОН
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const icon = item.querySelector('.faq-icon');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-icon').textContent = '+';
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        icon.textContent = '−';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ============================================
     ФОРМА ЗАЯВКИ
     ============================================ */
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('.submit-btn');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Отправляем...';
      statusEl.textContent = '';
      statusEl.className = 'form-status';

      const data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim()
      };

      setTimeout(() => {
        statusEl.textContent = '✓ Заявка отправлена! Свяжусь с вами в течение дня.';
        statusEl.classList.add('success');
        form.reset();
        btn.disabled = false;
        btn.textContent = originalText;
      }, 1200);
    });
  }
});