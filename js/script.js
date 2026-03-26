document.addEventListener('DOMContentLoaded', () => {
  /* TYPEWRITER EFFECT FOR H1 & H2 */
  const h1 = document.querySelector('h1');
  const h2Elements = document.querySelectorAll(':not(.site-header) > h2, .section > h2');

  // Interactiv background layers
  function setupBackgroundLayers() {
    // Le canvas matrix est conservé dans le code pour future utilisation,
    // mais n'est pas créé dans le DOM tant qu'on ne l'active pas explicitement.
    if (!document.getElementById('particles')) {
      const particlesLayer = document.createElement('div');
      particlesLayer.id = 'particles';
      document.body.prepend(particlesLayer);
    }
  }

  function initMatrixEffect() {
    // Matrix fallback : gardé dans le fichier mais désactivé par défaut
    const canvas = document.getElementById('matrix');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    let columns = 0;
    let drops = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }).fill(1);
    }

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(10, 15, 31, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00aaff';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return setInterval(draw, 33);
  }

  function loadTsParticles() {
    return new Promise((resolve, reject) => {
      if (window.tsParticles) {
        resolve();
        return;
      }

      const existing = document.querySelector('script[src*="tsparticles"]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Failed loading tsParticles')));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed loading tsParticles'));
      document.head.appendChild(script);
    });
  }

  function initParticleNetwork() {
    if (!window.tsParticles || !document.getElementById('particles')) return;

    window.tsParticles.load('particles', {
      background: { color: 'transparent' },
      particles: {
        number: { value: 80, density: { enable: true, area: 900 } },
        color: { value: '#00cfff' },       // cyan doux
        shape: { type: 'circle' },
        opacity: { value: 0.4 },           // moins visible
        size: { value: 2.2, random: true },
        links: {
          enable: true,
          distance: 150,
          color: '#00cfff',
          opacity: 0.25,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          random: false,
          straight: false,
          outModes: { default: 'bounce' }
        }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: ['repulse', 'push'] },
          resize: true
        },
        modes: {
          grab: { distance: 160, links: { opacity: 1 } },
          repulse: { distance: 220, duration: 0.65 },
          push: { quantity: 4 }
        }
      },
      detectRetina: true
    });
  }

  setupBackgroundLayers();
  // Matrix effect désactivé pour l'instant (le code reste dans le fichier)
  // const matrixInterval = initMatrixEffect();
  loadTsParticles().then(initParticleNetwork).catch((err) => console.warn(err));

  if (h1) {
    const originalText = h1.textContent;
    h1.textContent = '';
    h1.classList.add('typewriter');
    h1.classList.add('active');
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < originalText.length) {
        h1.textContent += originalText[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
        h1.style.borderRight = 'none';
      }
    }, 50);
  }

  /* SCROLL REVEAL ANIMATION */
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger, .card, .project-card, .cert-card, .about-card, .contact-card, .info-card');
  
  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    element.classList.add('reveal');
    revealOnScroll.observe(element);
  });

  /* ADD STAGGER EFFECT TO GRIDS */
  const grids = document.querySelectorAll('.projects-grid, .certifications-grid, .cards-section, .about-grid, .contact-grid');
  grids.forEach(grid => {
    grid.classList.add('reveal-stagger');
    revealOnScroll.observe(grid);
  });

  /* CODE TYPING EFFECT */
  const codeOutlet = document.getElementById('codeType');
  const codeLines = [
    'class Developer:',
    '    def __init__(self):',
    '        self.name = "Hugo Demangeat"',
    '        self.role = "BTS SIO SLAM"',
    '        self.city = "Perpignan, FR"',
    '        self.skills = ["HTML/CSS", "JavaScript", "Python", "SQL"]',
    '\n    def available(self):',
    '        return True  # stage 🚀',
  ];
  let lineIndex = 0;
  let charIndex = 0;

  function codeWrite() {
    if (!codeOutlet) return;
    if (lineIndex >= codeLines.length) return;

    const current = codeLines[lineIndex];
    codeOutlet.textContent = codeLines.slice(0, lineIndex).join('\n') + (lineIndex ? '\n' : '') + current.slice(0, charIndex);
    if (charIndex < current.length) {
      charIndex++;
      setTimeout(codeWrite, 45);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(codeWrite, 250);
    }
  }
  codeWrite();

  /* CATEGORY FILTERS */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCategories = document.querySelectorAll('.cert-category');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter categories
        certCategories.forEach(category => {
          const categoryData = category.getAttribute('data-category');
          if (filter === 'all' || categoryData === filter) {
            category.style.display = 'block';
            setTimeout(() => category.classList.add('active'), 10);
          } else {
            category.classList.remove('active');
            setTimeout(() => category.style.display = 'none', 300);
          }
        });
      });
    });
  }

  /* CAROUSEL FUNCTIONALITY */
  const aboutCarouselTrack = document.querySelector('.carousel-about .carousel-track');
  const aboutPrevBtn = document.querySelector('.carousel-about .carousel-btn.prev');
  const aboutNextBtn = document.querySelector('.carousel-about .carousel-btn.next');
  let indexSlide = 0;

  if (aboutCarouselTrack && aboutPrevBtn && aboutNextBtn) {
    const slides = aboutCarouselTrack.querySelectorAll('.project-card');

    aboutNextBtn.addEventListener('click', () => {
      indexSlide = Math.min(indexSlide + 1, slides.length - 1);
      aboutCarouselTrack.style.transform = `translateX(-${indexSlide * (slides[0].offsetWidth + 16)}px)`;
    });

    aboutPrevBtn.addEventListener('click', () => {
      indexSlide = Math.max(indexSlide - 1, 0);
      aboutCarouselTrack.style.transform = `translateX(-${indexSlide * (slides[0].offsetWidth + 16)}px)`;
    });

    setInterval(() => {
      indexSlide = (indexSlide + 1) % slides.length;
      aboutCarouselTrack.style.transform = `translateX(-${indexSlide * (slides[0].offsetWidth + 16)}px)`;
    }, 5000);

    window.addEventListener('resize', () => {
      indexSlide = 0;
      aboutCarouselTrack.style.transform = 'translateX(0)';
    });
  }

  /* CONTACT FORM */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.textContent = 'Message envoyé (simulation) — merci !';
      setTimeout(() => (status.textContent = ''), 3500);
      form.reset();
    });
  }
});
