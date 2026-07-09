/* =========================================================
   2. SLIDESHOW
   ========================================================= */

// Image paths for courses (Software Dev, Cybersecurity, Networking, etc.) 
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

// Event paths for events (Open House, Career Fair, etc.)
const eventImages = [
  "events/event_1.png",
  "events/event_2.png",
  "events/event_3.png",
  "events/event_4.png"
]
// Advertisement paths for ads (tutoring available, reminder to graduate, etc.)
const ads = [
  "ad_1.jpg"
]

// Video paths for videos. 
const videos = [
  "videos/video_1.mp4"
]


const SLIDE_INTERVAL_MS = 7000; // 5 seconds per slide. 
const COURSES_PER_BATCH = 3; // Number of course images to show between event images
const AUTO_RESUME_DELAY = 120000; // 2 minutes in milliseconds
const NEWS_BANNER = false; // Set to true to enable news alerts. 

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

let fadeTimeout = null;
const FADE_DURATION = 500;   // how long each fade takes
const GAP_DURATION = 800;    // how long the blank gap lasts — bump this up

function showSlide(index) {
  const slides = slideshowEl.querySelectorAll("img");
  if (slides.length === 0) return;

  if (fadeTimeout) clearTimeout(fadeTimeout);

  const previousSlide = currentSlide;
  currentSlide = (index + slides.length) % slides.length;

  // Fade out current slide
  slides[previousSlide].classList.remove("active");

  fadeTimeout = setTimeout(() => {
    const nextImg = slides[currentSlide];

    // Force the browser to register opacity:0 before we animate to 1
    nextImg.classList.remove("active"); // just in case
    void nextImg.offsetWidth;           // force reflow

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextImg.classList.add("active");
      });
    });
  }, GAP_DURATION);
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