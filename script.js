/* =========================================================
   1. CLOCK
   ========================================================= */
function updateClock() {
  const now = new Date();

  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  const timeString = now.toLocaleTimeString([], {
    hour: "numeric",
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
   2. BUTTON POPUPS
   ========================================================= */
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");

const modalImage = document.getElementById("modal-image");

// Add event listeners to all buttons with the class "action-btn"
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {

    // Reset modal every time
    modalTitle.innerHTML = "";
    modalContent.innerHTML = "";
    modalImage.src = "";
    modalImage.classList.add("hidden");

    modalTitle.innerHTML = btn.dataset.title || "";
    modalContent.innerHTML = btn.dataset.content || "";


    // Handle images (Tutoring QR code)
    if (btn.dataset.image) {
      modalImage.src = btn.dataset.image;
      modalImage.classList.remove("hidden");
    }


  // Hide all special controls first
  mapControls.classList.add("hidden");
  resourceControls.classList.add("hidden");
  generalModalControls.classList.remove("hidden");


  // Handle Map
  if (btn.dataset.map) {
    currentMap = 0;
    showMap();

    mapControls.classList.remove("hidden");
    generalModalControls.classList.add("hidden");

    document.getElementById("modal-box").classList.add("map-mode");
  }


  // Handle Resources
  else if (btn.dataset.resources) {
    currentResource = 0;
    showResource();

    resourceControls.classList.remove("hidden");
    generalModalControls.classList.add("hidden");

    document.getElementById("modal-box").classList.remove("map-mode");
  }


  // Handle Normal Popups (Announcements / Tutoring)
  else {
    document.getElementById("modal-box").classList.remove("map-mode");
  }


    modalOverlay.classList.remove("hidden");

    resetModalTimer();
  });
});
/************************************************************ 
    3. CAMPUS RESOURCES information display. 
    Contains an array of objects with title and content for each resource when CAMPUS RESOURCES is clicked.
************************************************************/ 
const resourceControls = document.getElementById("resource-controls");
const prevResource = document.getElementById("prev-resource");
const nextResource = document.getElementById("next-resource");

// Tracks the currently displayed campus resource
let currentResource = 0;

const CampusResources = [
  {
    title: "IT Professors",
    image: "assets/campusResource_ITProf.png",
    video: null,
  },
  {
    title: "Academic Advising",
    content: "Your academic advisor will be your guide as you determine which courses to take each semester. <br><br> For more information, please email --- or call 000000000 ext 4242  <br>",
    image: null,
    video: "videos/video_2.mp4",
  },
  {
    title: "Disability Support Services",
    content: "The office of Disability support provides assistance to students who qualify for reasonable accommodations. <br><br> For more information, please email --- or call 000000000 ext 4242  <br>",
    image: null,
    video: "videos/video_3.mp4",
  },
  {
    title: "Financial Aid",
    content: "Financial aid includes scholarships, grants, work-study and loans - all of which help make college more affordable. <br><br> For more information please email --- or call 0000000000 ext 4213",
    image: null,
    video: "videos/video_4.mp4",
  },
  {
    title: "Ivy Cares",
    content: "IvyCares assists you with finding additional campus and community support throughout your academic journey <br> for more ",
    image: null,
    video: null,
  }
  
];






/************************************************************
 *   4. MAPS
 *  Contains an array of objects with image and title for each map when MAP is clicked. 
 * ************************************************************/
// variables to control map navigation

// Variables used for the idle timeout. 
const modalCloseResource = document.getElementById("modal-close-resource");
const modalCloseMap = document.getElementById("modal-close-map");
const modalClose = document.getElementById("modal-close");
const generalModalControls = document.getElementById("general-modal-controls");

// Varibles used to ineract with map. 
const mapControls = document.getElementById("map-controls");
const prevMap = document.getElementById("prev-map");
const nextMap = document.getElementById("next-map");

const maps = [
    {
        image: "assets/map_1.png",
        title: "Main Campus Map"
    },
    {
        image: "assets/map_2.png",
        title: "Ogle Hall"
    }
];


// Variable to track the current map index
let currentMap = 0;




// =========================================================
// MODAL IDLE TIMER
// Automatically closes modal after inactivity
// =========================================================



// Reset timer whenever user interacts with modal
modalOverlay.addEventListener("mousemove", resetModalTimer);
modalOverlay.addEventListener("touchstart", resetModalTimer);
modalOverlay.addEventListener("click", resetModalTimer);
modalOverlay.addEventListener("keydown", resetModalTimer);

const MODAL_IDLE_TIME = 40; // seconds

let modalTimer = null;
let modalCountdown = MODAL_IDLE_TIME;


function resetModalTimer() {

  // Stop existing timer
  if (modalTimer) {
    clearInterval(modalTimer);
  }

  modalCountdown = MODAL_IDLE_TIME;

  // Hide countdown after interaction
  document.querySelectorAll(".idle-countdown")
    .forEach(counter => {
      counter.textContent = "";
      counter.classList.add("hidden");
    });


  modalTimer = setInterval(() => {

    modalCountdown--;

    updateModalCountdown();


    if (modalCountdown <= 0) {

      clearInterval(modalTimer);
      closeModal();

    }

  }, 1000);
}

function updateModalCountdown() {

  document.querySelectorAll(".idle-countdown")
    .forEach(counter => {

      if (modalCountdown <= 30) {

        counter.textContent = `(${modalCountdown}s)`;
        counter.classList.remove("hidden");

      } else {

        counter.textContent = "";
        counter.classList.add("hidden");

      }

    });

}

function stopModalTimer() {

  if (modalTimer) {
    clearInterval(modalTimer);
    modalTimer = null;
  }

}


/************************************************************
 *   5. Display campus resources and maps in the modal when the corresponding buttons are clicked.
 * ************************************************************/

function closeModal() {

  stopModalTimer();

  modalOverlay.classList.add("hidden");

  mapControls.classList.add("hidden");
  resourceControls.classList.add("hidden");

  generalModalControls.classList.remove("hidden");

  const closeVideo = document.getElementById("resource-video");
  if (closeVideo) {
    closeVideo.pause();
    closeVideo.currentTime = 0;
  }
}

// Main Close button (bottom of modal)
if (modalCloseResource) {
    modalCloseResource.addEventListener("click", closeModal);
}

if (modalCloseMap) {
    modalCloseMap.addEventListener("click", closeModal);
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

// Close modal if clicking outside the box
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});


function showResource() {

    const resource = CampusResources[currentResource];

    modalTitle.innerHTML = resource.title || "";
    modalContent.innerHTML = resource.content || "";


    const resourceImage = document.getElementById("resource-image");

    const video = document.getElementById("resource-video");
    const videoSource = document.getElementById("resource-video-source");


    // Reset everything
    resourceImage.classList.add("hidden");

    video.classList.add("hidden");
    video.pause();
    video.currentTime = 0;


    // Show IMAGE
    if (resource.image) {

        resourceImage.src = resource.image;
        resourceImage.classList.remove("hidden");

    }


    // Show VIDEO
    else if (resource.video) {

        videoSource.src = resource.video;
        video.load();

        video.classList.remove("hidden");

    }

}


// Event listeners for navigating through campus resources
nextResource.addEventListener("click", () => {
  resetModalTimer();
  currentResource++;
  if (currentResource >= CampusResources.length) {
    currentResource = 0;
  }
  showResource();
});

// Event listener for navigating to the previous campus resource
prevResource.addEventListener("click", () => {
  resetModalTimer();
  currentResource--;
  if (currentResource < 0) {
    currentResource = CampusResources.length - 1;
  }
  showResource();
});


// Function to show the current map based on currentMap index
function showMap() {
    resetModalTimer();
    modalImage.src = maps[currentMap].image;
    modalTitle.textContent = maps[currentMap].title;
    modalImage.classList.remove("hidden");
}

// Event listeners for navigating through maps
nextMap.addEventListener("click", () => {
  resetModalTimer();
  currentMap++;
  if (currentMap >= maps.length) {
    currentMap = 0;
  }
  showMap();
});

prevMap.addEventListener("click", () => {
  currentMap--;
  if (currentMap < 0) {
    currentMap = maps.length - 1;
  }
  showMap();
});



// =====================================================