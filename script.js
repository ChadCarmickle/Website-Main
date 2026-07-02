
/* =========================================================
   1. CLOCK
   ========================================================= */
function updateClock() {
  const now = new Date();

  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = now.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  timeEl.textContent = timeString;
  dateEl.textContent = dateString;
}

setInterval(updateClock, 1000);
updateClock();

/* =========================================================
   2. SLIDESHOW
   ========================================================= */

const images = [
  "Courses/IvyTechCourseInfo_1.webp",
  "Courses/IvyTechCourseInfo_2.webp",
  "Courses/IvyTechCourseInfo_3.webp",
  "Courses/IvyTechCourseInfo_4.webp",
  "Courses/IvyTechCourseInfo_5.webp",
  "Courses/IvyTechCourseInfo_6.webp",
  "Courses/IvyTechCourseInfo_7.webp",
  "Courses/IvyTechCourseInfo_8.webp",
  "Courses/IvyTechCourseInfo_9.webp",
  "Courses/IvyTechCourseInfo_10.webp",
  "Courses/IvyTechCourseInfo_11.webp",
  "Courses/IvyTechCourseInfo_12.webp",
  "Courses/IvyTechCourseInfo_13.webp",
  "Courses/IvyTechCourseInfo_14.webp",
  "Courses/IvyTechCourseInfo_15.webp",
  "Courses/IvyTechCourseInfo_16.webp"
];

const SLIDE_INTERVAL_MS = 6000; // time each image is shown

const slideshowEl = document.getElementById("slideshow");
let currentSlide = 0;

function buildSlideshow() {
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Slide ${index + 1}`;
    if (index === 0) img.classList.add("active");
    slideshowEl.appendChild(img);
  });
}

function showNextSlide() {
  const slides = slideshowEl.querySelectorAll("img");
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

buildSlideshow();
setInterval(showNextSlide, SLIDE_INTERVAL_MS);

/* =========================================================
   3. BUTTON POPUPS
   ========================================================= */
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.title || "Info";
    modalContent.textContent = btn.dataset.content || "";
    modalOverlay.classList.remove("hidden");
  });
});

function closeModal() {
  modalOverlay.classList.add("hidden");
}

modalClose.addEventListener("click", closeModal);

// Close modal if clicking outside the box
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});