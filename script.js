document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu-icon');
  const nav = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');
  const backToTopBtn = document.getElementById('backToTop');

  // Mobile menu toggle
  if (menu) {
    menu.addEventListener('click', () => {
      nav.classList.toggle('open');
      menu.classList.toggle('bx-x');
    });
  }

  // Close mobile nav when link is clicked
  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menu.classList.remove('bx-x');
      }
    });
  });

  // Scroll to section with smooth behavior
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Back to top button visibility and smoothness
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.pointerEvents = 'none';
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 160;
      const id = section.getAttribute('id');
      const link = document.querySelector('.navbar a[href="#' + id + '"]');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  });

  // Scroll reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add reveal class to elements that should animate on scroll
  document.querySelectorAll('.education-box, .about-content, .btn-box.btns').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skills-content .progress .bar span');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'none';
        setTimeout(() => {
          entry.target.style.animation = '';
        }, 10);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (e.target.id === 'backToTop') return; // Skip for back-to-top
      
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add parallax effect to background on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const about = document.querySelector('.about');
    if (about) {
      about.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
  });
});
