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

document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {

    modalTitle.textContent = btn.dataset.title || "";
    modalContent.innerHTML  = btn.dataset.content || "";
    
    // Hide image initially for non-map
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
      document.getElementById("modal-box").classList.add("map-mode");   // ← added
    }
    else {
      mapControls.classList.add("hidden");
      document.getElementById("modal-box").classList.remove("map-mode");  // ← added
    }

    modalOverlay.classList.remove("hidden");
  });
});


const mapControls = document.getElementById("map-controls");
const prevMap = document.getElementById("prev-map");
const nextMap = document.getElementById("next-map");

let currentMap = 0;

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


function closeModal() {
  modalOverlay.classList.add("hidden");
  mapControls.classList.add("hidden");     // Hide map controls too
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


function showMap() {
    modalImage.src = maps[currentMap].image;
    modalTitle.textContent = maps[currentMap].title;
    modalImage.classList.remove("hidden");
}

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
