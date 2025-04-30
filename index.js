// Animation configuration
const animationConfig = {
  scroll: {
    duration: 1.2,
    ease: "power3.inOut",
    offsetY: 70,
  },
  float: {
    duration: 3,
    delay: "-2s, -4s",
  },
};

// Loading screen
window.addEventListener("load", function () {
  setTimeout(function () {
    const loading = document.getElementById("loading");
    loading.style.opacity = "0";
    setTimeout(() => (loading.style.display = "none"), 500);
  }, 1000);
});

// Initialize animations
document.addEventListener("DOMContentLoaded", function () {
  // AOS initialization
  if (document.querySelector("[data-aos]")) {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
      mirror: true,
      startEvent: "DOMContentLoaded",
    });
  }

  // GSAP animations
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Animate skill progress bars
    gsap.utils.toArray(".skill-progress").forEach((progressBar) => {
      const percent = progressBar.dataset.percent;
      ScrollTrigger.create({
        trigger: progressBar,
        start: "top center+=100",
        onEnter: () => {
          gsap.to(progressBar, {
            width: percent,
            duration: 1.5,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    // Configure ScrollTrigger
    ScrollTrigger.addEventListener("refreshInit", () => {
      ScrollTrigger.refresh(true);
    });

    window.addEventListener(
      "resize",
      debounce(() => {
        ScrollTrigger.refresh();
      }, 100)
    );
  }

  // Initialize mobile menu
  initMobileMenu();

  // Initialize scroll behaviors
  initScrollBehaviors();

  // Initialize download button
  initDownloadButton();
});

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const menuPanel = document.querySelector(".menu-panel");
  const overlay = document.querySelector(".overlay");
  const body = document.body;
  const menuBtn = document.querySelector(".menu-btn");

  const toggleMenu = () => {
    const isOpen = menuToggle.checked;
    menuPanel.classList.toggle("active", isOpen);
    overlay.classList.toggle("active", isOpen);
    body.style.overflow = isOpen ? "hidden" : "";
    menuBtn.setAttribute("aria-expanded", isOpen);

    // Refresh ScrollTrigger when menu closes
    if (!isOpen && typeof ScrollTrigger !== "undefined") {
      setTimeout(ScrollTrigger.refresh, 300);
    }
  };

  menuToggle.addEventListener("change", toggleMenu);
  overlay.addEventListener("click", () => {
    menuToggle.checked = false;
    toggleMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.checked) {
      menuToggle.checked = false;
      toggleMenu();
    }
  });

  // Features notification
  document
    .querySelector('.menu-item[style*="color: #3a86ff"]')
    ?.addEventListener("click", (e) => {
      if (window.innerWidth < 992) {
        menuToggle.checked = false;
        toggleMenu();
      }
      e.preventDefault();
      alert(
        "New Features Added:\n\n• Dark Mode Support\n• PDF Download Option\n• Project Filtering"
      );
    });

  // Navbar scroll behavior
  window.addEventListener(
    "scroll",
    debounce(() => {
      document
        .querySelector(".navbar")
        .classList.toggle("scrolled", window.scrollY > 50);
    }, 10)
  );
}

// Scroll behaviors
function initScrollBehaviors() {
  // Smooth scroll for navigation
  const smoothScroll = (target) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.href = target;
    } else if (typeof gsap !== "undefined") {
      gsap.to(window, {
        duration: animationConfig.scroll.duration,
        scrollTo: { y: target, offsetY: animationConfig.scroll.offsetY },
        ease: animationConfig.scroll.ease,
      });
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (anchor.getAttribute("href") !== "#") {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute("href"));
      });
    }
  });

  // Go to top button
  const goTopBtn = document.getElementById("goTop");
  const educationSection = document.getElementById("education-skills");

  if (goTopBtn && educationSection) {
    ScrollTrigger.create({
      trigger: educationSection,
      start: "top center",
      onEnter: () => goTopBtn.classList.remove("hidden"),
      onLeaveBack: () => goTopBtn.classList.add("hidden"),
    });

    goTopBtn.addEventListener("click", () => {
      smoothScroll("#intro");
    });

    // Position adjustment near footer
    window.addEventListener("scroll", debounce(adjustGoTopPosition, 10));
    window.addEventListener("resize", debounce(adjustGoTopPosition, 100));
    adjustGoTopPosition();
  }
}

function adjustGoTopPosition() {
  const footer = document.querySelector("footer");
  const goTopBtn = document.getElementById("goTop");

  if (!footer || !goTopBtn) return;

  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  const safetyMargin = 20;
  const defaultBottom = 20;

  goTopBtn.style.bottom =
    footerTop < windowHeight
      ? `${Math.min(windowHeight - footerTop + safetyMargin, 120)}px`
      : `${defaultBottom}px`;
}

// Download button functionality
function initDownloadButton() {
  const texts = ["Resume", "CV", "Download"];
  let index = 0;
  const cyclingText = document.getElementById("cyclingText");
  let textCycleInterval = null;

  function cycleText() {
    cyclingText.style.opacity = 0;
    setTimeout(() => {
      index = (index + 1) % texts.length;
      cyclingText.textContent = texts[index];
      cyclingText.style.opacity = 1;
    }, 300);
  }

  function startTextCycle() {
    stopTextCycle();
    textCycleInterval = setInterval(cycleText, 2000);
  }

  function stopTextCycle() {
    if (textCycleInterval) clearInterval(textCycleInterval);
  }

  function toggleOptions() {
    const options = document.getElementById("downloadOptions");
    const isOpening = options.style.display !== "block";

    options.style.display = isOpening ? "block" : "none";

    if (isOpening) {
      stopTextCycle();
      cyclingText.textContent = "Download";
      cyclingText.style.opacity = 1;
    } else {
      startTextCycle();
    }
  }

  // Event listeners
  document
    .querySelector(".download-btn")
    ?.addEventListener("click", toggleOptions);

  document.addEventListener("click", function (event) {
    const options = document.getElementById("downloadOptions");
    const btn = document.querySelector(".download-btn");

    if (
      options &&
      btn &&
      !btn.contains(event.target) &&
      !options.contains(event.target)
    ) {
      options.style.display = "none";
      startTextCycle();
    }
  });

  // Auto-positioning near footer
  window.addEventListener("scroll", debounce(adjustDownloadPosition, 10));
  window.addEventListener("resize", debounce(adjustDownloadPosition, 100));
  adjustDownloadPosition();

  // Start cycling
  startTextCycle();
}

function adjustDownloadPosition() {
  const footer = document.querySelector("footer");
  const downloadWrapper = document.getElementById("downloadWrapper");

  if (!footer || !downloadWrapper) return;

  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  const safetyMargin = 20;

  downloadWrapper.style.bottom =
    footerTop < windowHeight
      ? `${Math.min(windowHeight - footerTop + safetyMargin, 130)}px`
      : "20px";
}

// File download function
function downloadFile(fileName) {
  if (!["resume.pdf", "cv.pdf"].includes(fileName)) return;

  const filePath = `/downloads/${fileName}`;
  const link = document.createElement("a");
  link.href = filePath;
  link.download = fileName;
  link.target = "_blank";

  const btn = document.querySelector(".download-btn");
  if (btn) btn.style.background = "rgba(0, 255, 100, 0.3)";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    if (btn) btn.style.background = "rgba(255, 255, 255, 0.1)";
    document.getElementById("downloadOptions").style.display = "none";
  }, 500);
}

// Utility functions
function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.killAll();
  const downloadBtn = document.querySelector(".download-btn");
  if (downloadBtn) downloadBtn.onclick = null;
});
// Simple AOS initialization
document.addEventListener("DOMContentLoaded", function () {
  const aosElements = document.querySelectorAll("[data-aos]");

  const animateOnScroll = () => {
    aosElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.75) {
        const delay = element.dataset.aosDelay || 0;
        setTimeout(() => {
          element.classList.add("aos-animate");
        }, delay);
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});
// DOM Elements
const slider = document.getElementById("slider");
const projectInfo = document.getElementById("project-info");
const projectTitle = document.getElementById("project-title");
const projectName = projectTitle.querySelector(".project-name");
const techStack = projectTitle.querySelector(".tech-stack");
const dotsContainer = document.getElementById("dots-container");
const exploreBtn = document.getElementById("explore-btn");

// State
let currentIndex = 0;
let projects = [];
let cards = [];

// Sample projects (fallback if JSON fails)
// Sample projects (fallback if JSON fails)
const sampleProjects = [
  {
    id: 1,
    name: "Task Manager",
    stack: "Vue.js, Firebase",
    mediaType: "images",
    mediaUrl: "https://via.placeholder.com/600x400/667eea/ffffff?text=Task+App",
    projectUrl: "#",
  },
  {
    id: 2,
    name: "E-Commerce Platform",
    stack: "React, Node.js",
    mediaType: "images",
    mediaUrl:
      "https://via.placeholder.com/600x400/f093fb/ffffff?text=E-Commerce",
    projectUrl: "#",
  },
  {
    id: 3,
    name: "Hospital management system",
    stack: "React, php",
    mediaType: "images",
    mediaUrl:
      "https://via.placeholder.com/600x400/4facfe/ffffff?text=Hospital+System",
    projectUrl: "#",
  },
  {
    id: 4,
    name: "Weather Dashboard",
    stack: "JavaScript, API",
    mediaType: "image",
    mediaUrl:
      "https://via.placeholder.com/600x400/30cfd0/ffffff?text=Weather+App",
    projectUrl: "#",
  },
  {
    id: 5,
    name: "Fitness Tracker",
    stack: "React Native, MongoDB",
    mediaType: "image",
    mediaUrl:
      "https://via.placeholder.com/600x400/764ba2/ffffff?text=Fitness+App",
    projectUrl: "#",
  },
];

// Load projects from JSON
async function loadProjects() {
  try {
    const response = await fetch("./projects.json");
    projects = await response.json();
  } catch (error) {
    console.warn("Using sample projects (JSON failed to load)");
    projects = sampleProjects;
  } finally {
    initSlider();
  }
}

// Initialize slider with projects
function initSlider() {
  slider.innerHTML = "";

  // Create cards (using YOUR EXACT previous card styling)
  projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "card";

    // Media container (hidden by default - only shows number like before)
    card.innerHTML = `
       ${
         project.mediaType === "video"
           ? `<video autoplay loop muted playsinline>
           <source src="${project.mediaUrl}" type="video/mp4">
         </video>`
           : `<img src="${project.mediaUrl}" alt="${project.name}" loading="lazy">`
       }
   `;

    slider.appendChild(card);
  });

  cards = slider.querySelectorAll(".card");
  createDots();
  updateCards();
  updateProjectInfo();

  // Start with info visible
  setTimeout(() => {
    projectInfo.classList.add("active");
  }, 100);
  // Add this AFTER your card creation code (inside initSlider())
  function adjustMediaAspectRatio() {
    document.querySelectorAll(".card").forEach((card) => {
      const media = card.querySelector("img, video");
      if (!media) return;

      // Fallback for unusual aspect ratios (e.g., vertical videos)
      const isPortrait = media.naturalWidth < media.naturalHeight;

      if (isPortrait) {
        media.style.width = "auto";
        media.style.height = "100%";
      } else {
        media.style.width = "100%";
        media.style.height = "auto";
      }
    });
  }

  // Call it after media loads
  window.addEventListener("load", adjustMediaAspectRatio);
}

// Rest of your EXACT previous JavaScript
function createDots() {
  dotsContainer.innerHTML = "";
  projects.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (index === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => navigateToIndex(index));
    dotsContainer.appendChild(dot);
  });
}

function updateProjectInfo() {
  projectInfo.classList.remove("active");

  setTimeout(() => {
    const project = projects[currentIndex];
    projectName.textContent = project.name;
    techStack.textContent = project.stack ? `{${project.stack}}` : "";
    exploreBtn.onclick = () => window.open(project.projectUrl, "_blank");

    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    projectInfo.classList.add("active");
  }, 300);
}

function navigateToIndex(index) {
  currentIndex = index;
  updateCards();
  updateProjectInfo();
}

function updateCards() {
  cards.forEach((card, index) => {
    card.classList.remove("main-card", "left-card", "right-card");

    if (index === currentIndex) {
      card.classList.add("main-card");
    } else if (
      index ===
      (currentIndex - 1 + projects.length) % projects.length
    ) {
      card.classList.add("left-card");
    } else if (index === (currentIndex + 1) % projects.length) {
      card.classList.add("right-card");
    }
  });
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + projects.length) % projects.length;
  updateCards();
  updateProjectInfo();
}

// Event listeners
document.querySelector(".right").addEventListener("click", () => navigate(1));
document.querySelector(".left").addEventListener("click", () => navigate(-1));

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") navigate(-1);
  if (e.key === "ArrowRight") navigate(1);
});

// Touch sliding
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

slider.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchStartX - touchEndX > swipeThreshold) {
    navigate(1);
  } else if (touchEndX - touchStartX > swipeThreshold) {
    navigate(-1);
  }
}

// Initialize
loadProjects();
