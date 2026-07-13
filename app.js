// ==========================================
// Gallery Detailed Metadata
// ==========================================
const GALLERY_DATA = [
  {
    image: "/assets/real_egg_skillets.jpg",
    title: "frying pan skillet magnets",
    desc: "handcrafted mini skillet clay magnets with sunny-side-up eggs. coated in a glossy, glass-like uv resin finish. set includes one single-yolk skillet and one double-yolk skillet. size: 2.2 inches."
  },
  {
    image: "/assets/real_bread_egg.jpg",
    title: "happy toast & egg set",
    desc: "a matching set of smiling clay magnets shaped like toasted bread and a sunny-side-up egg. hand-sculpted and painted with friendly café expressions. size: 1.8 inches each."
  },
  {
    image: "/assets/bear_picnic_dish.jpg",
    title: "teddy bear picnic dish",
    desc: "a whimsical hand-formed clay jewelry plate featuring a tiny teddy bear sitting on a checkered pink picnic blanket next to miniature chocolate donuts and a frosted cake. sealed with a durable gloss coat. size: 4.5 inches."
  },
  {
    image: "/assets/PHOTO-2026-07-06-15-18-31.jpg",
    title: "snoopy & egg keychain",
    desc: "a delightful hand-sculpted clay snoopy wearing a red collar, coupled with a sunny-side-up egg charm. finished in high-gloss UV resin and attached to a gold-tone key clasp."
  },
  {
    image: "/assets/PHOTO-2026-07-06-15-39-53 2.jpg",
    title: "capybara & tomato keychain",
    desc: "a cozy, hand-formed clay capybara paired with a tiny red tomato charm. glazed with a high-shine protective coat and equipped with a heavy-duty gold keyring clip."
  },
  {
    image: "/assets/PHOTO-2026-07-06-15-39-53.jpg",
    title: "french fries & drumstick magnets",
    desc: "a smiling pair of clay magnets shaped like classic french fries in a red cup and a brown chicken drumstick. hand-painted and sealed with glossy glaze. size: 1.8 inches."
  },
  {
    image: "/assets/PHOTO-2026-07-06-15-39-54.jpg",
    title: "woven macrame keychain",
    desc: "a chevron-patterned friendship keychain woven carefully with soft blue, yellow, and green cotton threads. perfect accessory for bags and keyrings."
  },
  {
    image: "/assets/keychain1.jpg",
    title: "pawprint & clover keychain",
    desc: "a triple-charm gold keychain featuring a hand-sculpted white and pink puppy pawprint, a bright pink bow, and a lucky green four-leaf clover charm. finished in a high-gloss protective glaze."
  },
  {
    image: "/assets/keychain2.jpg",
    title: "star & sunflower keychain",
    desc: "a whimsical four-charm keychain with a glittering deep blue planet, a light blue star custom-painted with 'Egg', a glossy orange citrus slice, and a vibrant yellow sunflower charm."
  }
];

// ==========================================
// Scroll Reveal Animations
// ==========================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Stop checking once revealed
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// Lightbox Gallery Slider
// ==========================================
let currentImgIndex = 0;

function initLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  const mainImg = document.getElementById("lightbox-main-img");
  const titleText = document.getElementById("lightbox-title-text");
  const descText = document.getElementById("lightbox-desc-text");
  
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");
  
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!lightbox || !mainImg || !titleText || !descText) return;

  // Open Lightbox
  const openLightbox = (index) => {
    currentImgIndex = parseInt(index);
    updateLightboxContent();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  // Close Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scroll
  };

  // Update image & text content
  const updateLightboxContent = () => {
    const data = GALLERY_DATA[currentImgIndex];
    if (data) {
      mainImg.src = data.image;
      mainImg.alt = data.title;
      titleText.innerText = data.title;
      descText.innerText = data.desc;
    }
  };

  // Navigation Logic
  const showPrev = (e) => {
    if (e) e.stopPropagation();
    currentImgIndex = (currentImgIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    updateLightboxContent();
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    currentImgIndex = (currentImgIndex + 1) % GALLERY_DATA.length;
    updateLightboxContent();
  };

  // Event Listeners
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const idx = item.getAttribute("data-index");
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (nextBtn) nextBtn.addEventListener("click", showNext);

  // Close when clicking overlay backdrop
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation shortcuts
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showPrev();
    } else if (e.key === "ArrowRight") {
      showNext();
    }
  });
}

// ==========================================
// Smooth Anchor Scroll
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// Initialize all features on load
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initLightbox();
  initSmoothScroll();
});
