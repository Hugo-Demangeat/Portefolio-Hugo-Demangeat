document.addEventListener("DOMContentLoaded", () => {
  const codeOutlet = document.getElementById("codeType");
  const codeLines = [
    "class Developer:",
    "    def __init__(self):",
    "        self.name = \"Hugo Demangeat\"",
    "        self.role = \"BTS SIO SLAM\"",
    "        self.city = \"Perpignan, FR\"",
    "        self.skills = [\"HTML/CSS\", \"JavaScript\", \"Python\", \"SQL\"]",
    "\n    def available(self):",
    "        return True  # stage 🚀",
  ];
  let lineIndex = 0;
  let charIndex = 0;

  function codeWrite() {
    if (!codeOutlet) return;
    if (lineIndex >= codeLines.length) return;

    const current = codeLines[lineIndex];
    codeOutlet.textContent = codeLines.slice(0, lineIndex).join("\n") + (lineIndex ? "\n" : "") + current.slice(0, charIndex);
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

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light-mode");
      if (isLight) {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "🌙";
        themeToggle.title = "Activer le mode jour";
      } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
        themeToggle.title = "Activer le mode nuit";
      }

      document.body.classList.add("sunrise");
      setTimeout(() => document.body.classList.remove("sunrise"), 2800);

      document.body.style.transition = "background 1.2s ease, color 1.2s ease";
      document.querySelectorAll(".card, .about-card, .project-card, .contact-card").forEach(el => {
        el.style.transition = "background 1.2s ease, color 1.2s ease, border-color 1.2s ease";
      });
    });
    document.body.classList.add("dark-mode");
  }

  const aboutCarouselTrack = document.querySelector(".carousel-about .carousel-track");
  const aboutPrevBtn = document.querySelector(".carousel-about .carousel-btn.prev");
  const aboutNextBtn = document.querySelector(".carousel-about .carousel-btn.next");
  let indexSlide = 0;

  if (aboutCarouselTrack && aboutPrevBtn && aboutNextBtn) {
    const slides = aboutCarouselTrack.querySelectorAll(".project-card");
    function updateSlide() {
      const width = aboutCarouselTrack.offsetWidth;
      indexSlide = (indexSlide + slides.length) % slides.length;
      aboutCarouselTrack.style.transform = `translateX(-${indexSlide * (width / 1.3)}px)`;
    }

    aboutNextBtn.addEventListener("click", () => {
      indexSlide = Math.min(indexSlide + 1, slides.length - 1);
      aboutCarouselTrack.style.transform = `translateX(-${indexSlide * (slides[0].offsetWidth + 16)}px)`;
    });
    aboutPrevBtn.addEventListener("click", () => {
      indexSlide = Math.max(indexSlide - 1, 0);
      aboutCarouselTrack.style.transform = `translateX(-${indexSlide * (slides[0].offsetWidth + 16)}px)`;
    });

    setInterval(() => {
      indexSlide = (indexSlide + 1) % slides.length;
      aboutCarouselTrack.style.transform = `translateX(-${indexSlide * (slides[0].offsetWidth + 16)}px)`;
    }, 5000);

    window.addEventListener("resize", () => {
      indexSlide = 0;
      aboutCarouselTrack.style.transform = "translateX(0)";
    });
  }

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "Message envoyé (simulation) — merci !";
      setTimeout(() => (status.textContent = ""), 3500);
      form.reset();
    });
  }
});
