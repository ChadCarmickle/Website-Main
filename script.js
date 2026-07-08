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

const courseImages = [
  "courses/IvyTechCourseInfo_1.webp",
  "courses/IvyTechCourseInfo_2.webp",
  "courses/IvyTechCourseInfo_3.webp",
  "courses/IvyTechCourseInfo_4.webp",
  "courses/IvyTechCourseInfo_5.webp",
  "courses/IvyTechCourseInfo_6.webp",
  "courses/IvyTechCourseInfo_7.webp",
  "courses/IvyTechCourseInfo_8.webp",
  "courses/IvyTechCourseInfo_9.webp",
  "courses/IvyTechCourseInfo_10.webp",
  "courses/IvyTechCourseInfo_11.webp",
  "courses/IvyTechCourseInfo_12.webp",
  "courses/IvyTechCourseInfo_13.webp",
  "courses/IvyTechCourseInfo_14.webp",
  "courses/IvyTechCourseInfo_15.webp",
  "courses/IvyTechCourseInfo_16.webp",
  "courses/IvyTechCourseInfo_17.webp",
  "courses/IvyTechCourseInfo_18.webp",
  "courses/IvyTechCourseInfo_19.webp",
  "courses/IvyTechCourseInfo_20.webp",
  "courses/IvyTechCourseInfo_21.webp",
  "courses/IvyTechCourseInfo_22.webp",
  "courses/IvyTechCourseInfo_23.webp",
  "courses/IvyTechCourseInfo_24.webp",
  "courses/IvyTechCourseInfo_25.webp",
  "courses/IvyTechCourseInfo_26.webp",
  "courses/IvyTechCourseInfo_27.webp",
  "courses/IvyTechCourseInfo_28.webp",
  "courses/IvyTechCourseInfo_29.webp",
  "courses/IvyTechCourseInfo_30.webp",
  "courses/IvyTechCourseInfo_31.webp",
  "courses/IvyTechCourseInfo_32.webp",
  "courses/IvyTechCourseInfo_33.webp"
];

const eventImages = [
  "events/event_1.png",
  "events/event_2.png",
  "events/event_3.png",
  "events/event_4.png",
]

const SLIDE_INTERVAL_MS = 5000; // 5 seconds per slide. 
const COURSES_PER_BATCH = 3; // Number of course images to show between event images
const AUTO_RESUME_DELAY = 120000; // 2 minutes in milliseconds

const slideshowEl = document.getElementById("slideshow");
let currentSlide = 0;
let allSlides = [];
let slideshowInterval = null;
let resumeTimeout = null;
let isPlaying = true;

// Build the interleaved slideshow array
function buildInterleavedSlideshow() {
  allSlides = [];
  const totalBatches = Math.ceil(courseImages.length / COURSES_PER_BATCH);
  
  for (let i = 0; i < totalBatches; i++) {
    eventImages.forEach(src => allSlides.push(src));
    const start = i * COURSES_PER_BATCH;
    const batch = courseImages.slice(start, start + COURSES_PER_BATCH);
    allSlides.push(...batch);
  }
  
  eventImages.forEach(src => allSlides.push(src));

  slideshowEl.innerHTML = '';
  
  allSlides.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Slide ${index + 1}`;
    if (index === 0) img.classList.add("active");
    slideshowEl.appendChild(img);
  });
}

// Show a specific slide by index
function showSlide(index) {
  const slides = slideshowEl.querySelectorAll("img");
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function startAutoPlay() {
  if (slideshowInterval) clearInterval(slideshowInterval);
  slideshowInterval = setInterval(showNextSlide, SLIDE_INTERVAL_MS);
}

function stopAutoPlay() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}

// Schedule auto-resume after a period of inactivity
function scheduleAutoResume() {
  if (resumeTimeout) clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => {
    isPlaying = true;
    const toggleBtn = document.getElementById("toggle-play");
    if (toggleBtn) toggleBtn.textContent = "⏸";
    startAutoPlay();
  }, AUTO_RESUME_DELAY);
}

// Initialize the slideshow
buildInterleavedSlideshow();
startAutoPlay();

// === Sideshow Button Controls ===
document.getElementById("next-slide").addEventListener("click", () => {
  showNextSlide();
  if (isPlaying) startAutoPlay();
});

document.getElementById("prev-slide").addEventListener("click", () => {
  showSlide(currentSlide - 1);
  if (isPlaying) startAutoPlay();
});

// Toggle play/pause functionality
const toggleBtn = document.getElementById("toggle-play");
toggleBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  
  if (isPlaying) {
    toggleBtn.textContent = "⏸ Pause";
    stopAutoPlay();           // Clear any existing interval
    startAutoPlay();          // Resume immediately
    if (resumeTimeout) clearTimeout(resumeTimeout);
  } else {
    toggleBtn.textContent = "▶";
    stopAutoPlay();
    scheduleAutoResume();     // Auto resume after 2 minutes
  }
});



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

let canvas = document.querySelector('canvas'),
	c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
let w = canvas.width;
let	h = canvas.height;

const mouse = {
  x: w / 2,
  y: h / 2 
}

let shadows = '#000000'
const gravity = 0.005
const friction = 0.99
const particleCount = 100
const angleIncreament = Math.PI * 2  / particleCount
const power = 7
const range = 25
let color = 30

// =====================================================

// addEventListener('mousemove', (event) => {
//   mouse.x = event.clientX
//   mouse.y = event.clientY
// })

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
	w = canvas.width
	h = canvas.height

	init()
})

addEventListener('click', (event) => {
	mouse.x = event.clientX
	mouse.y = event.clientY

	fireWork({x: mouse.x, y: mouse.y})
	// init(color)
})

// =====================================================

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function fireWork(mouse, col = color) {
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle(
			mouse.x, 
			mouse.y, 
			2, 
			`hsla(
				${randomIntFromRange(col, col + range)}, 
				${randomIntFromRange(70, 80)}%, 
				${randomIntFromRange(55, 65)}%, 
				50%
			)`, 
			{
				x: Math.cos(particleCount * i) * Math.random() * power, 
				y: Math.sin(particleCount * i) * Math.random() * power
			}
		));
	}
}

// =====================================================
