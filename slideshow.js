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

const SLIDE_INTERVAL_MS = 7000; // 7 seconds per slide. 
const COURSES_PER_BATCH = 3; // Number of course images to show between event images
const AUTO_RESUME_DELAY = 120000; // 2 minutes in milliseconds


const NEWS_BANNER = false; // Set to true to enable news alerts. 
const NEWS_BANNER_Text = "Display an Alert Message."; 
const NEWS_BANNER_Color = "red"; 


// Set bar colors
document.getElementById("alert-bar-top").style.backgroundColor = NEWS_BANNER_Color;
document.getElementById("alert-bar-bot").style.backgroundColor = NEWS_BANNER_Color;

// Update every alert text
document.querySelectorAll(".AlertBar_Text").forEach(element => {
    element.textContent = NEWS_BANNER_Text;
});


function updateAlertBars() {
  const alertBars = document.querySelectorAll(".alert-bar");
  alertBars.forEach((bar) => {
    bar.style.display = NEWS_BANNER ? "block" : "none";

  });
}

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
  
  // Add initial events
  eventImages.forEach(src => allSlides.push(src));
  
  for (let i = 0; i < totalBatches; i++) {
    const start = i * COURSES_PER_BATCH;
    const batch = courseImages.slice(start, start + COURSES_PER_BATCH);
    allSlides.push(...batch);
    // Add event after each batch of courses
    if (i < totalBatches - 1) {
      eventImages.forEach(src => allSlides.push(src));
    }
  }
  
  // Add final events
  eventImages.forEach(src => allSlides.push(src));

  slideshowEl.innerHTML = '';
  
  allSlides.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Slide ${index + 1}`;
    if (index === 0) img.classList.add("active");
    slideshowEl.appendChild(img);
  });
  
  console.log("Built", allSlides.length, "slides");
}


let fadeTimeout = null;
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
updateAlertBars();


// === Slideshow Button Controls ===
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
    toggleBtn.textContent = "⏸";
    stopAutoPlay();           // Clear any existing interval
    startAutoPlay();          // Resume immediately
    if (resumeTimeout) clearTimeout(resumeTimeout);
  } else {
    toggleBtn.textContent = "▶";
    stopAutoPlay();
    scheduleAutoResume();     // Auto resume after 2 minutes
  }
});


// =========================================================
// SWIPE GESTURE CONTROLS
// Lets a finger-swipe on the slideshow move to the next/previous
// slide, the same way the ❮ / ❯ buttons do.
// =========================================================
const slideshowContainer = document.getElementById("slideshow-container");
const SWIPE_THRESHOLD = 50; // minimum horizontal distance (px) to count as a swipe

let touchStartX = 0;
let touchStartY = 0;

slideshowContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

slideshowContainer.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Ignore swipes that are more vertical than horizontal (likely scrolling, not paging)
  if (Math.abs(deltaX) < Math.abs(deltaY)) return;
  if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

if (deltaX < 0) {

  // Swipe left = next slide
  flashSwipeArrow("left");
  showNextSlide();

} else {

  // Swipe right = previous slide
  flashSwipeArrow("right");
  showSlide(currentSlide - 1);

}

  if (isPlaying) startAutoPlay(); // reset the autoplay timer, same as the button controls
}, { passive: true });


// =====================================================
// SWIPE VISUAL FEEDBACK
// Flashes the matching arrow button when a swipe occurs.
// =====================================================

function flashSwipeArrow(direction) {

  const button = direction === "left"
    ? document.getElementById("next-slide")
    : document.getElementById("prev-slide");

  if (!button) return;

  // Restart animation if triggered quickly multiple times
  button.classList.remove("swipe-feedback");

  void button.offsetWidth;

  button.classList.add("swipe-feedback");

  setTimeout(() => {
    button.classList.remove("swipe-feedback");
  }, 400);
}