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




/* =========================================================
   3. BUTTON POPUPS
   ========================================================= */
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const modalCloseMap = document.getElementById("modal-close_map");

const modalImage = document.getElementById("modal-image");

// Add event listeners to all buttons with the class "action-btn"
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {

    modalTitle.innerHTML = btn.dataset.title || "";
    modalContent.innerHTML = btn.dataset.content || "";

    if (!btn.dataset.map) {
      modalImage.classList.add("hidden");
    }

    if (btn.dataset.image) {
      modalImage.src = btn.dataset.image;
      modalImage.classList.remove("hidden");
    }

    if (btn.dataset.map) {
      currentMap = 0;
      showMap();
      mapControls.classList.remove("hidden");
      modalImage.classList.remove("hidden");
      document.getElementById("modal-box").classList.add("map-mode");
    } else {
      mapControls.classList.add("hidden");
      document.getElementById("modal-box").classList.remove("map-mode");
    }

    // NEW: handle campus resources navigation
    if (btn.dataset.resources) {
      currentResource = 0;
      showResource();
      resourceControls.classList.remove("hidden");
    } else {
      resourceControls.classList.add("hidden");
    }

    modalOverlay.classList.remove("hidden");
  });
});



/************************************************************ 
    4. CAMPUS RESOURCES infomation display. 
    Contains an array of objects with title and content for each resource when CAMPUS RESOURCES is clicked.
************************************************************/ 
const resourceControls = document.getElementById("resource-controls");
const prevResource = document.getElementById("prev-resource");
const nextResource = document.getElementById("next-resource");

// Variable to track the current map index
let currentResource = 0;

const CampusResources = [
  {
    title: "Dean of IT & IT Professors",
    content: "<strong>Lioyda S. Fairweather.</strong><br><i>Dean of IT</i><br>lfairweather@ivytech.edu <br><br><strong>  Kenyatte V. Simuel</strong><br><i> Cybersecurity, Cloud Technologies, Network Infrastrucuture, IT Support </i><br> ksimuel@ivytech.edu <br><br> Christopher S. Francis </strong><br><i>Infomatics, Software Development, Computer Science, Data Analytics </i><br>cfrancis4@ivytech.edu",
  },
  {
    title: "Academic Advising",
    content: "Your academic advisor will be your guide as you determine which courses to take each semester. <br><br> For more infomation, please email --- or call 000000000 ext 4242  <br>",
  },
  {
    title: "Disability Support Services",
    content: "The office of Disability support provides assistance to studnets who qualify for reasonable accommodations. <br><br> For more infomation, please email --- or call 000000000 ext 4242  <br>",
  },
  {
    title: "Financial Aid",
    content: "Financial aid includes scholarships, grants, work-study and loans - all of which help make college more affordable. <br><br> For more infomation please email --- or call 0000000000 ext 4213",
  },
  {
    title: "Ivy Cares",
    content: "IvyCares assists you with finding additional campus and community support throughout your academic journey <br> for more ",
  }
  
];






/************************************************************
 *   4. MAPS
 *  Contains an array of objects with image and title for each map when MAP is clicked. 
 * ************************************************************/
// variables to control map navigation
const mapControls = document.getElementById("map-controls");
const prevMap = document.getElementById("prev-map");
const nextMap = document.getElementById("next-map");

const maps = [
    {
        image: "buttonResources/map_1.png",
        title: "Main Campus Map"
    },
    {
        image: "buttonResources/map_2.png",
        title: "Ogle Hall"
    }
];


// Variable to track the current map index
let currentMap = 0;


/************************************************************
 *   4. Display campus resources and maps in the modal when the corresponding buttons are clicked.
 * ************************************************************/

// Function to close the modal 
function closeModal() {
  modalOverlay.classList.add("hidden");
  mapControls.classList.add("hidden");
  resourceControls.classList.add("hidden");
}

// Main Close button (bottom of modal)
modalClose.addEventListener("click", closeModal);

// Map Close button (in the arrow row)
if (modalCloseMap) {
  modalCloseMap.addEventListener("click", closeModal);
} else {
  console.warn("modal-close_map button not found in HTML");
}


// Close modal if clicking outside the box
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});


// Function to show the current resource based on currentResource index
function showResource() {
  modalTitle.innerHTML = CampusResources[currentResource].title;
  modalContent.innerHTML = CampusResources[currentResource].content;
}
// Event listeners for navigating through campus resources
nextResource.addEventListener("click", () => {
  currentResource++;
  if (currentResource >= CampusResources.length) {
    currentResource = 0;
  }
  showResource();
});

// Event listener for navigating to the previous campus resource
prevResource.addEventListener("click", () => {
  currentResource--;
  if (currentResource < 0) {
    currentResource = CampusResources.length - 1;
  }
  showResource();
});


// Function to show the current map based on currentMap index
function showMap() {
    modalImage.src = maps[currentMap].image;
    modalTitle.textContent = maps[currentMap].title;
    modalImage.classList.remove("hidden");
}

// Event listeners for navigating through maps
nextMap.addEventListener("click", () => {
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
