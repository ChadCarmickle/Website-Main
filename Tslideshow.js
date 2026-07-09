
/* =========================================================
   2. SLIDESHOW
   ========================================================= */

// Image paths for courses
const courseImages = [
  "courses/IvyTechCourseInfo_1.webp", "courses/IvyTechCourseInfo_2.webp",
  "courses/IvyTechCourseInfo_3.webp", "courses/IvyTechCourseInfo_4.webp",
  "courses/IvyTechCourseInfo_5.webp", "courses/IvyTechCourseInfo_6.webp",
  "courses/IvyTechCourseInfo_7.webp", "courses/IvyTechCourseInfo_8.webp",
  "courses/IvyTechCourseInfo_9.webp", "courses/IvyTechCourseInfo_10.webp",
  "courses/IvyTechCourseInfo_11.webp", "courses/IvyTechCourseInfo_12.webp",
  "courses/IvyTechCourseInfo_13.webp", "courses/IvyTechCourseInfo_14.webp",
  "courses/IvyTechCourseInfo_15.webp", "courses/IvyTechCourseInfo_16.webp",
  "courses/IvyTechCourseInfo_17.webp", "courses/IvyTechCourseInfo_18.webp",
  "courses/IvyTechCourseInfo_19.webp", "courses/IvyTechCourseInfo_20.webp",
  "courses/IvyTechCourseInfo_21.webp", "courses/IvyTechCourseInfo_22.webp",
  "courses/IvyTechCourseInfo_23.webp", "courses/IvyTechCourseInfo_24.webp",
  "courses/IvyTechCourseInfo_25.webp", "courses/IvyTechCourseInfo_26.webp",
  "courses/IvyTechCourseInfo_27.webp", "courses/IvyTechCourseInfo_28.webp",
  "courses/IvyTechCourseInfo_29.webp", "courses/IvyTechCourseInfo_30.webp",
  "courses/IvyTechCourseInfo_31.webp", "courses/IvyTechCourseInfo_32.webp",
  "courses/IvyTechCourseInfo_33.webp"
];

// Event paths
const eventImages = [
  "events/event_1.png", "events/event_2.png",
  "events/event_3.png", "events/event_4.png"
];

// Ads
const ads = ["ads/ad_1.jpg"];

// Video
const videos = ["videos/video_1.mp4"];



// preload images and videos to avoid flickering
const imageCache = new Map();
const videoCache = new Map();

function preloadImages() {

    const images = [
        ...courseImages,
        ...eventImages,
        ...ads
    ];

    return Promise.all(images.map(src => {

        return new Promise(resolve => {

            const img = new Image();

            img.onload = () => {

                imageCache.set(src, img);
                console.log("Loaded:", src);
                resolve();

            };

            img.onerror = () => {

                console.warn("Couldn't load:", src);
                resolve();

            };

            img.src = src;

        });

    }));

}


function preloadVideos() {

    return Promise.all(videos.map(src => {

        return new Promise(resolve => {

            const video = document.createElement("video");

            video.src = src;
            video.preload = "auto";
            video.muted = true;
            video.playsInline = true;

            video.addEventListener("canplaythrough", () => {

                videoCache.set(src, video);

                console.log("Video cached:", src);

                resolve();

            }, { once: true });

            video.onerror = () => {

                console.warn("Video failed:", src);

                resolve();

            };

            video.load();

        });

    }));

}




const SLIDE_INTERVAL_MS = 2000;
const COURSES_PER_BATCH = 1;
const AUTO_RESUME_DELAY = 120000;

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov"];
function isVideoSrc(src) {
  return VIDEO_EXTENSIONS.some(ext => src.toLowerCase().endsWith(ext));
}

const slideshowEl = document.getElementById("slideshow");
let currentSlide = 0;
let allSlides = [];
let isPlaying = true;

let advanceTimeoutId = null;
let pendingVideoEl = null;
let pendingVideoEndedHandler = null;
let resumeTimeout = null;

/*
function buildInterleavedSlideshow() {
  allSlides = [];
  let courseCursor = 0;
const totalCourseCycles = Math.ceil(courseImages.length / COURSES_PER_BATCH);
  function pushCourseBatch() {
    if (courseImages.length === 0) return;
    for (let i = 0; i < COURSES_PER_BATCH; i++) {
      allSlides.push(courseImages[courseCursor % courseImages.length]);
      courseCursor++;
    }
  }

  function pushIfAny(arr) {
    if (arr.length > 0) allSlides.push(...arr);
  }

  for (let cycle = 0; cycle < totalCourseCycles; cycle++) {
    pushIfAny(eventImages);
    pushCourseBatch();
    pushIfAny(videos);
    pushCourseBatch();
    pushIfAny(ads);
    pushCourseBatch();
  }

  slideshowEl.innerHTML = '';

allSlides.forEach((src, index) => {

    let el;

    if (isVideoSrc(src)) {

        const cachedVideo = videoCache.get(src);

        el = cachedVideo.cloneNode(true);

        el.controls = false;
        el.muted = true;
        el.playsInline = true;
        el.preload = "auto";

        el.style.objectFit = "cover";
        el.style.objectPosition = "center";
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.display = "block";
        el.style.pointerEvents = "none";

    } else {

        el = document.createElement("img");

        el.src = src;
        el.alt = `Slide ${index + 1}`;

    }

    if (index === 0)
        el.classList.add("active");

    slideshowEl.appendChild(el);

});

}   // <-- THIS closes buildInterleavedSlideshow()
*/ 
function buildInterleavedSlideshow() {

    allSlides = [];

    let courseCursor = 0;


    function addCourse() {

        if (courseImages.length === 0)
            return;


        allSlides.push(
            courseImages[courseCursor % courseImages.length]
        );


        courseCursor++;

    }


    function addArray(arr) {

        if (arr.length > 0) {

            allSlides.push(...arr);

        }

    }



    // Number of cycles needed to show every course once
    const totalCycles = Math.ceil(
        courseImages.length / 3
    );



    for (let cycle = 0; cycle < totalCycles; cycle++) {


        // events
        addArray(eventImages);



        // course 1
        addCourse();



        // video
        addArray(videos);



        // course 2
        addCourse();



        // ad
        addArray(ads);



        // course 3
        addCourse();


    }



    console.log("Slides created:", allSlides);



    slideshowEl.innerHTML = "";



    allSlides.forEach((src,index)=>{


        let el;



        if(isVideoSrc(src)){


            const cachedVideo = videoCache.get(src);



            if(cachedVideo){

                el = cachedVideo.cloneNode(true);

            }
            else {

                el=document.createElement("video");
                el.src=src;

            }


            el.controls=false;
            el.muted=true;
            el.playsInline=true;
            el.preload="auto";


            el.style.objectFit="cover";
            el.style.width="100%";
            el.style.height="100%";
            el.style.display="block";
            el.style.pointerEvents="none";


        }
        else {


            el=document.createElement("img");


            const cachedImage=imageCache.get(src);


            if(cachedImage){

                el.src=cachedImage.src;

            }
            else{

                el.src=src;

            }


            el.alt=`Slide ${index+1}`;


        }



        if(index===0){

            el.classList.add("active");

        }



        slideshowEl.appendChild(el);


    });


}


let fadeTimeout = null;
const GAP_DURATION = 800;

function getSlides() {
  return slideshowEl.querySelectorAll("img, video");
}

function playVideo(videoEl) {

    videoEl.pause();

    videoEl.currentTime = 0;

    videoEl.muted = true;

    videoEl.play()
        .then(() => {

            console.log("Playing:", videoEl.src);

            setTimeout(() => {

                videoEl.muted = false;

            },300);

        })
        .catch(err => {

            console.error(err);

        });

}


function clearPendingAdvance() {
  if (advanceTimeoutId) clearTimeout(advanceTimeoutId);
  if (pendingVideoEl && pendingVideoEndedHandler) {
    pendingVideoEl.removeEventListener("ended", pendingVideoEndedHandler);
  }
  pendingVideoEl = null;
  pendingVideoEndedHandler = null;
}

function scheduleAdvance() {
  clearPendingAdvance();
  if (!isPlaying) return;

  const slides = getSlides();
  const activeEl = slides[currentSlide];
  if (!activeEl) return;

if (activeEl.tagName === "VIDEO") {

    pendingVideoEl = activeEl;

    pendingVideoEndedHandler = () => {

        clearPendingAdvance();
        showNextSlide();

    };

    activeEl.addEventListener(
        "ended",
        pendingVideoEndedHandler,
        { once: true }
    );

} else {

    advanceTimeoutId = setTimeout(() => {

        showNextSlide();

    }, SLIDE_INTERVAL_MS);

}

}


function showSlide(index) {
  const slides = getSlides();
  if (slides.length === 0) return;

  clearPendingAdvance();
  if (fadeTimeout) clearTimeout(fadeTimeout);

  const previousSlide = currentSlide;
  currentSlide = (index + slides.length) % slides.length;
  if (currentSlide < 0 || currentSlide >= slides.length) currentSlide = 0;

  slides[previousSlide].classList.remove("active");

  const prevEl = slides[previousSlide];
  if (prevEl.tagName === "VIDEO") {
    prevEl.pause();
    prevEl.currentTime = 0;
    prevEl.muted = true;
  }

  fadeTimeout = setTimeout(() => {
    const nextEl = slides[currentSlide];
    nextEl.classList.remove("active");
    void nextEl.offsetWidth;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextEl.classList.add("active");
        if (nextEl.tagName === "VIDEO") {
          nextEl.pause();
          nextEl.currentTime = 0;
          playVideo(nextEl);
        }
        scheduleAdvance();
      });
    });
  }, GAP_DURATION);
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function startAutoPlay() {
  isPlaying = true;
  scheduleAdvance();
}

function stopAutoPlay() {
  clearPendingAdvance();
}

Promise.all([
    preloadImages(),
    preloadVideos()
]).then(() => {

    console.log("Everything is cached.");

    buildInterleavedSlideshow();

    startAutoPlay();

});

// Controls
document.getElementById("next-slide").addEventListener("click", showNextSlide);
document.getElementById("prev-slide").addEventListener("click", () => showSlide(currentSlide - 1));

const toggleBtn = document.getElementById("toggle-play");
toggleBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    toggleBtn.textContent = "⏸";
    startAutoPlay();
  } else {
    toggleBtn.textContent = "▶";
    stopAutoPlay();
    const slides = getSlides();
    const active = slides[currentSlide];
    if (active && active.tagName === "VIDEO") active.pause();
  }
});