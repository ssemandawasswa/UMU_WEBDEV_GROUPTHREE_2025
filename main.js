document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? 'flex' : 'none';
      // simple toggle for demo
      nav.style.display = !expanded ? 'flex' : 'none';
    });
  }

  // Smooth scroll for in-page anchors (if any)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Gallery lightbox (for wildlife.html)
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const thumbs = document.querySelectorAll('.gallery-item');
  if (lightbox && thumbs.length) {
    thumbs.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;
          lightbox.setAttribute('aria-hidden', 'false');
          lightbox.style.display = 'flex';
        }
      });
    });
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn?.addEventListener('click', () => {
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.style.display = 'none';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.style.display = 'none';
      }
    });
  }

  // Simple image slider logic for tours.html
  const sliderTrack = document.getElementById('slider-track');
  if (sliderTrack) {
    let index = 0;
    const slides = sliderTrack.querySelectorAll('img');
    const total = slides.length;
    const move = (i) => {
      sliderTrack.style.transform = `translateX(-${i * 100}%)`;
    };
    document.getElementById('nextSlide').addEventListener('click', () => {
      index = (index + 1) % total;
      move(index);
    });
    document.getElementById('prevSlide').addEventListener('click', () => {
      index = (index - 1 + total) % total;
      move(index);
    });
    // Auto-rotate (optional)
    // setInterval(() => { index = (index + 1) % total; move(index); }, 5000);
  }

  // Contact form validation (contact.html)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const consent = document.getElementById('consent');
      let valid = true;

      // Clear errors
      ['name','email','message','consent'].forEach(id => {
        const el = document.getElementById(id + 'Error');
        if (el) el.textContent = '';
      });

      if (!name.value.trim()) {
        document.getElementById('nameError').textContent = 'Please enter your name.';
        valid = false;
      }
      if (!email.value.includes('@')) {
        document.getElementById('emailError').textContent = 'Please provide a valid email.';
        valid = false;
      }
      if (message.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Tell us a bit more (min 10 chars).';
        valid = false;
      }
      if (!consent.checked) {
        document.getElementById('consentError').textContent = 'Please consent to be contacted.';
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      } else {
        // Simple friendly confirmation
        e.preventDefault();
        alert('Thank you! Your inquiry has been received. We will contact you soon.');
        form.reset();
      }
    });
  }

  // Light keyboard navigation for gallery thumbs (optional)
  document.querySelectorAll('.gallery-item').forEach((el) => {
    el.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        el.click();
      }
    });
  });
});
