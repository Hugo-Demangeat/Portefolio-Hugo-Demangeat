document.addEventListener('DOMContentLoaded', () => {
  /* TYPEWRITER EFFECT FOR H1 & H2 */
  const h1 = document.querySelector('h1');
  const h2Elements = document.querySelectorAll(':not(.site-header) > h2, .section > h2');
  
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
