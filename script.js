/* =========================================================
   1. CLOCK
   ========================================================= */
function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  const timeString = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const dateString = now.toLocaleDateString([], { 
    weekday: "long", year: "numeric", month: "long", day: "numeric" 
  });

  timeEl.textContent = timeString;
  dateEl.textContent = dateString;
}

setInterval(updateClock, 1000);
updateClock();

/* =========================================================
   2. MODAL SETUP & BUTTONS
   ========================================================= */
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalImage = document.getElementById("modal-image");

const resourceControls = document.getElementById("resource-controls");
const programControls = document.getElementById("program-controls");
const mapControls = document.getElementById("map-controls");
const generalModalControls = document.getElementById("general-modal-controls");

const resourceJumpLinks = document.getElementById("resource-jump-links");
const programJumpLinks = document.getElementById("program-jump-links");

const modalCloseResource = document.getElementById("modal-close-resource");
const modalCloseProgram = document.getElementById("modal-close-program");
const modalCloseMap = document.getElementById("modal-close-map");
const modalClose = document.getElementById("modal-close");

const prevResource = document.getElementById("prev-resource");
const nextResource = document.getElementById("next-resource");
const prevProgram = document.getElementById("prev-program");
const nextProgram = document.getElementById("next-program");
const prevMap = document.getElementById("prev-map");
const nextMap = document.getElementById("next-map");

// Global state
let currentResource = 0;
let currentProgram = 0;
let currentMap = 0;

// Button handler
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnType = btn.textContent.trim() || btn.dataset.title || "Unknown";
    window.analytics.logEvent("button_click", { button: btnType, dataset: { ...btn.dataset } });

    // Reset modal
    modalTitle.innerHTML = btn.dataset.title || "";
    modalContent.innerHTML = btn.dataset.content || "";
    modalImage.classList.add("hidden");

    if (btn.dataset.image) {
      modalImage.src = btn.dataset.image;
      modalImage.classList.remove("hidden");
    }

    // Hide all special controls
    mapControls.classList.add("hidden");
    resourceControls.classList.add("hidden");
    programControls.classList.add("hidden");
    generalModalControls.classList.remove("hidden");

    // Show the correct mode
    if (btn.dataset.map) {
      currentMap = 0;
      showMap();
      mapControls.classList.remove("hidden");
      generalModalControls.classList.add("hidden");
      document.getElementById("modal-box").classList.add("map-mode");
    } else if (btn.dataset.resources) {
      currentResource = 0;
      showResource();
      resourceControls.classList.remove("hidden");
      generalModalControls.classList.add("hidden");
      document.getElementById("modal-box").classList.remove("map-mode");
    } else if (btn.dataset.programs) {
      currentProgram = 0;
      showProgram();
      programControls.classList.remove("hidden");
      generalModalControls.classList.add("hidden");
      document.getElementById("modal-box").classList.remove("map-mode");
    } else {
      document.getElementById("modal-box").classList.remove("map-mode");
    }

    // THIS WAS MISSING — SHOW THE MODAL
    modalOverlay.classList.remove("hidden");
    resetModalTimer();   // Start idle timer
  });
});

/* =========================================================
   3. CAMPUS RESOURCES
   ========================================================= */
// Tracks the currently displayed campus resource

function buildResourceJumpLinks() {
  resourceJumpLinks.innerHTML = "";
  CampusResources.forEach((resource, index) => {
    const btn = document.createElement("button");
    btn.textContent = resource.label || resource.title;
    btn.dataset.index = index;
    btn.addEventListener("click", () => {
      resetModalTimer();
      currentResource = index;
      showResource();
    });
    resourceJumpLinks.appendChild(btn);
  });
}

buildResourceJumpLinks();

/* =========================================================
   4. PROGRAMS (field -> program drill-down)
   ========================================================= */
const programBack = document.getElementById("program-back");

// null = showing the field grid. A number = index into ProgramFields.
let currentFieldIndex = null;

function getCurrentPrograms() {
  if (currentFieldIndex === null) return [];
  return ProgramFields[currentFieldIndex].programs || [];
}

// Called when Programs button is first clicked (from script.js's main handler)
function showProgram() {
  currentFieldIndex = null;
  currentProgram = 0;
  renderFieldGrid();
}

function renderFieldGrid() {
  modalTitle.innerHTML = ' <strong style="font-size: 24px;">Ivy tech Offers over 70+ Programs <br> Desngined for Indiana Jobs!</strong>'; 
  modalContent.innerHTML = "<i> Tap the subjects below to view each category. </i>"; 
  document.getElementById("program-image").classList.add("hidden");
  document.getElementById("program-video").classList.add("hidden");
  document.getElementById("program-qr").classList.add("hidden");
  document.getElementById("program-video-wrap").classList.add("empty");

  document.getElementById("prev-program").classList.add("hidden");
  document.getElementById("next-program").classList.add("hidden");
  programBack.classList.add("hidden");

  programJumpLinks.innerHTML = "";
  ProgramFields.forEach((field, index) => {
    const btn = document.createElement("button");
    btn.textContent = field.label;
    btn.dataset.index = index;
    btn.addEventListener("click", () => {
      resetModalTimer();
      window.analytics.logEvent("program_field_select", { field: field.label });
      openField(index);
    });
    programJumpLinks.appendChild(btn);
  });
}

function openField(fieldIndex) {
  currentFieldIndex = fieldIndex;
  currentProgram = 0;

  const programs = getCurrentPrograms();

  if (programs.length === 0) {
    modalTitle.innerHTML = ProgramFields[fieldIndex].label;
    modalContent.innerHTML = "Programs for this field are coming soon.";
    document.getElementById("program-image").classList.add("hidden");
    document.getElementById("program-video").classList.add("hidden");
    document.getElementById("program-qr").classList.add("hidden");
    document.getElementById("program-video-wrap").classList.add("empty");
    document.getElementById("prev-program").classList.add("hidden");
    document.getElementById("next-program").classList.add("hidden");
    programJumpLinks.innerHTML = "";
    programBack.classList.remove("hidden");
    return;
  }

  // Skip straight to the detail view if there's only one program
  renderProgramJumpLinks();
  renderProgramDetail();
  programBack.classList.remove("hidden");

  const showArrows = programs.length > 1;
  document.getElementById("prev-program").classList.toggle("hidden", !showArrows);
  document.getElementById("next-program").classList.toggle("hidden", !showArrows);
}

function renderProgramJumpLinks() {
  const programs = getCurrentPrograms();
  programJumpLinks.innerHTML = "";
  programs.forEach((prog, index) => {
    const btn = document.createElement("button");
    btn.textContent = prog.label || prog.title;
    btn.dataset.index = index;
    btn.addEventListener("click", () => {
      resetModalTimer();
      currentProgram = index;
      renderProgramDetail();
    });
    programJumpLinks.appendChild(btn);
  });
}

function renderProgramDetail() {
  const programs = getCurrentPrograms();
  const program = programs[currentProgram];
  if (!program) return;

  const fieldLabel = ProgramFields[currentFieldIndex].label;
  modalTitle.innerHTML = `${fieldLabel} <br><span style="font-size:0.6em;opacity:0.8;">${program.title || ""}</span>`;
  modalContent.innerHTML = program.content || "";

  const progImage = document.getElementById("program-image");
  const progVideo = document.getElementById("program-video");
  const progVideoSource = document.getElementById("program-video-source");
  const progQr = document.getElementById("program-qr");
  const videoWrap = document.getElementById("program-video-wrap");

  progImage.classList.add("hidden");
  progVideo.classList.add("hidden");
  progQr.classList.add("hidden");
  progVideo.pause();
  progVideo.currentTime = 0;

  if (program.image) {
    progImage.src = program.image;
    progImage.classList.remove("hidden");
  } else if (program.video) {
    progVideoSource.src = program.video;
    progVideo.load();
    progVideo.classList.remove("hidden");
  }

  if (program.qr) {
    progQr.src = program.qr;
    progQr.classList.remove("hidden");
  }

  videoWrap.classList.toggle("empty", !Boolean(program.image || program.video || program.qr));

  programJumpLinks.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active-resource", Number(btn.dataset.index) === currentProgram);
  });

  window.analytics.logEvent("program_view", {
    field: fieldLabel,
    program: program.label || program.title || "Unknown"
  });
}

// Back button: from program detail/list -> back to field grid
programBack.addEventListener("click", () => {
  resetModalTimer();
  window.analytics.logEvent("program_back", {});
  currentFieldIndex = null;
  currentProgram = 0;
  renderFieldGrid();
});

// Prev/Next now cycle within the CURRENT field's programs only
nextProgram.addEventListener("click", () => {
  resetModalTimer();
  const programs = getCurrentPrograms();
  if (programs.length === 0) return;
  currentProgram = (currentProgram + 1) % programs.length;
  renderProgramDetail();
});

prevProgram.addEventListener("click", () => {
  resetModalTimer();
  const programs = getCurrentPrograms();
  if (programs.length === 0) return;
  currentProgram = (currentProgram - 1 + programs.length) % programs.length;
  renderProgramDetail();
});

/* =========================================================
   5. MAPS
   ========================================================= */
const maps = [
  { image: "assets/map_1.png", title: "Main Campus Map" },
  { image: "assets/map_2.png", title: "Ogle Hall" }
];


/* =========================================================
   6. IDLE TIMER + DISPLAY FUNCTIONS
   ========================================================= */
modalOverlay.addEventListener("mousemove", resetModalTimer);
modalOverlay.addEventListener("touchstart", resetModalTimer);
modalOverlay.addEventListener("click", resetModalTimer);
modalOverlay.addEventListener("keydown", resetModalTimer);

const MODAL_IDLE_TIME = 40;
let modalTimer = null;
let modalCountdown = MODAL_IDLE_TIME;

function resetModalTimer() {
  if (modalTimer) clearInterval(modalTimer);
  modalCountdown = MODAL_IDLE_TIME;

  document.querySelectorAll(".idle-countdown").forEach(counter => {
    counter.textContent = "";
    counter.classList.add("hidden");
  });

  modalTimer = setInterval(() => {
    modalCountdown--;
    updateModalCountdown();

    if (modalCountdown <= 0) {
      clearInterval(modalTimer);
      closeModal();
      window.analytics.logEvent("modal_close", { reason: "idle_timeout", seconds: MODAL_IDLE_TIME });
    }
  }, 1000);
}

function updateModalCountdown() {
  document.querySelectorAll(".idle-countdown").forEach(counter => {
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





/* =========================================================
   6. MODAL DISPLAY FUNCTIONS
   ========================================================= */
   function closeModal() {
  currentFieldIndex = null;
  currentProgram = 0;
  stopModalTimer();
  modalOverlay.classList.add("hidden");
  
  // Hide all special controls
  mapControls.classList.add("hidden");
  resourceControls.classList.add("hidden");
  programControls.classList.add("hidden");
  
  generalModalControls.classList.remove("hidden");

  // Stop any playing videos
  const resourceVideo = document.getElementById("resource-video");
  if (resourceVideo) {
    resourceVideo.pause();
    resourceVideo.currentTime = 0;
  }

  const programVideo = document.getElementById("program-video");
  if (programVideo) {
    programVideo.pause();
    programVideo.currentTime = 0;
  }

  window.analytics.logEvent("modal_close", { reason: "manual" });
}

// Close buttons listener (one single clean listener)
[modalCloseResource, modalCloseProgram, modalCloseMap, modalClose].forEach(btn => {
  if (btn) btn.addEventListener("click", closeModal);
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

function showResource() {
  const resource = CampusResources[currentResource];
  modalTitle.innerHTML = resource.title || "";
  modalContent.innerHTML = resource.content || "";

  const resourceImage = document.getElementById("resource-image");
  const resourceQr = document.getElementById("resource-qr");
  const video = document.getElementById("resource-video");
  const videoSource = document.getElementById("resource-video-source");
  const videoWrap = document.getElementById("resource-video-wrap");

  resourceImage.classList.add("hidden");
  resourceQr.classList.add("hidden");
  video.classList.add("hidden");
  video.pause();
  video.currentTime = 0;

  if (resource.image) {
    resourceImage.src = resource.image;
    resourceImage.classList.remove("hidden");
  } else if (resource.video) {
    videoSource.src = resource.video;
    video.load();
    video.classList.remove("hidden");
  }

  if (resource.qr) {
    resourceQr.src = resource.qr;
    resourceQr.classList.remove("hidden");
  }

  const hasMedia = Boolean(resource.image || resource.video || resource.qr);
  videoWrap.classList.toggle("empty", !hasMedia);

  resourceJumpLinks.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active-resource", Number(btn.dataset.index) === currentResource);
  });

  window.analytics.logEvent("resource_view", {
    index: currentResource,
    label: resource.label || resource.title || "Unknown"
  });
}

function showMap() {
  modalImage.src = maps[currentMap].image;
  modalTitle.textContent = maps[currentMap].title;
  modalImage.classList.remove("hidden");

  window.analytics.logEvent("map_view", {
    index: currentMap,
    title: maps[currentMap].title
  });
}

// Navigation listeners 
nextResource.addEventListener("click", () => {
  resetModalTimer();
  currentResource = (currentResource + 1) % CampusResources.length;
  showResource();
});

prevResource.addEventListener("click", () => {
  resetModalTimer();
  currentResource = (currentResource - 1 + CampusResources.length) % CampusResources.length;
  showResource();
});

nextMap.addEventListener("click", () => {
  resetModalTimer();
  currentMap = (currentMap + 1) % maps.length;
  showMap();
});

prevMap.addEventListener("click", () => {
  resetModalTimer();
  currentMap = (currentMap - 1 + maps.length) % maps.length;
  showMap();
});
