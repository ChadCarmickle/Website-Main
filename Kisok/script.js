/* =========================================================
   1. CLOCK AND DATE DISPLAY
   ========================================================= */

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

function updateClock() {
    const now = new Date();

    timeEl.textContent = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

    dateEl.textContent = now.toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Initialize and update the clock
updateClock();
setInterval(updateClock, 1000);

/* =========================================================
   2. MODAL SETUP & BUTTONS
   ========================================================= */

// Cached DOM elements
const modalBox = document.getElementById("modal-box");
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
const programBack = document.getElementById("program-back");

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
let currentAnnouncement = 0;
let currentModalMode = null;  // 'announcements', 'resources', 'map', etc.
let currentResourcePage = 1;

// Main navigation button handlers
const actionButtons = document.querySelectorAll(".action-btn");

actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const btnType = btn.textContent.trim()
            || btn.dataset.title
            || "Unknown";

        window.analytics.logEvent("button_click", {
            button: btnType
        });

        // Reset modal content and layout
        modalTitle.innerHTML = btn.dataset.title || "";
        modalContent.innerHTML = btn.dataset.content || "";
        modalImage.classList.add("hidden");

        modalBox.classList.remove(
            "map-mode",
            "resource-mode",
            "program-mode"
        );

        if (btn.dataset.image) {
            modalImage.src = btn.dataset.image;
            modalImage.classList.remove("hidden");
        }

        // Reset navigation controls
        mapControls.classList.add("hidden");
        resourceControls.classList.add("hidden");
        programControls.classList.add("hidden");
        generalModalControls.classList.remove("hidden");

        // Select the appropriate modal mode
        if (btn.dataset.map) {
            currentMap = 0;
            currentModalMode = "map";

            showMap();
            mapControls.classList.remove("hidden");

        } else if (btn.dataset.resources) {
            currentResource = 0;
            currentResourcePage = 1;
            currentModalMode = "resources";

            modalBox.classList.add("resource-mode");

            buildResourceJumpLinks();
            showResource();

            resourceControls.classList.remove("hidden");

        } else if (btn.dataset.programs) {
            currentModalMode = "programs";

            modalBox.classList.add("program-mode");

            showProgram();
            programControls.classList.remove("hidden");

        } else if (btn.dataset.announcements) {
            currentAnnouncement = 0;
            currentModalMode = "announcements";

            buildAnnouncementJumpLinks();
            showAnnouncement();

            resourceControls.classList.remove("hidden");

        } else {
            currentModalMode = null;
        }

        // Hide general controls when using specialized navigation
        if (currentModalMode !== null) {
            generalModalControls.classList.add("hidden");
        }

        // Display the modal and initialize its idle timer
        modalOverlay.classList.remove("hidden");
        resetModalTimer();
    });
});

/* =========================================================
   SHARED MEDIA HANDLING
   ========================================================= */

function renderMedia(item, prefix) {
    const image = document.getElementById(`${prefix}-image`);
    const video = document.getElementById(`${prefix}-video`);
    const videoSource = document.getElementById(`${prefix}-video-source`);
    const qr = document.getElementById(`${prefix}-qr`);
    const videoWrap = document.getElementById(`${prefix}-video-wrap`);

    // Reset previous media
    image.classList.add("hidden");
    video.classList.add("hidden");
    qr.classList.add("hidden");

    video.pause();
    video.currentTime = 0;

    // Display an image or video
    if (item.image) {
        image.src = item.image;
        image.classList.remove("hidden");

    } else if (item.video) {
        videoSource.src = item.video;
        video.load();
        video.classList.remove("hidden");
    }

    // Display the optional QR code
    if (item.qr) {
        qr.src = item.qr;
        qr.classList.remove("hidden");
    }

    // Collapse the media container when empty
    const hasMedia = Boolean(item.image || item.video || item.qr);

    videoWrap.classList.toggle("empty", !hasMedia);
}

/* =========================================================
   SHARED NAVIGATION BUTTON GENERATOR
   ========================================================= */

function buildJumpLinks(container, items, onSelect) {
    container.innerHTML = "";

    items.forEach((item, index) => {
        const btn = document.createElement("button");

        btn.textContent = item.label || item.title;
        btn.dataset.index = index;

        btn.addEventListener("click", () => {
            resetModalTimer();
            onSelect(index);
        });

        container.appendChild(btn);
    });
}

// Highlight the selected navigation button
function highlightActiveButton(container, activeIndex) {
    container.querySelectorAll("button").forEach(btn => {
        btn.classList.toggle(
            "active-resource",
            Number(btn.dataset.index) === activeIndex
        );
    });
}

/* =========================================================
   3. ANNOUNCEMENTS
   ========================================================= */

function showAnnouncement() {
    const ann = Announcements[currentAnnouncement];

    if (!ann) return;

    modalTitle.innerHTML = ann.title || "Announcement";
    modalContent.innerHTML = ann.content || "";

    renderMedia(ann, "resource");

    highlightActiveButton(resourceJumpLinks, currentAnnouncement);

    window.analytics.logEvent("announcement_view", {
        index: currentAnnouncement,
        label: ann.label || ann.title || "Unknown"
    });
}

// Generate announcement navigation buttons
function buildAnnouncementJumpLinks() {
    buildJumpLinks(
        resourceJumpLinks,
        Announcements,
        index => {
            currentAnnouncement = index;
            showAnnouncement();
        }
    );
}

/* =========================================================
   4. CAMPUS RESOURCES
   ========================================================= */

// Get the currently selected resource page
function getActiveResources() {
    return currentResourcePage === 1
        ? CampusResources
        : MoreResources;
}

// Generate Student Services navigation buttons
function buildResourceJumpLinks() {
    buildJumpLinks(
        resourceJumpLinks,
        getActiveResources(),
        index => {
            currentResource = index;
            showResource();
        }
    );

    // Add a back button on the second page
    if (currentResourcePage === 2) {
        const backBtn = document.createElement("button");

        backBtn.textContent = "Back to Student Services";

        backBtn.addEventListener("click", () => {
            resetModalTimer();

            window.analytics.logEvent("resource_view", {
                label: "Back to Student Services"
            });

            currentResourcePage = 1;
            currentResource = 0;

            buildResourceJumpLinks();
            showResource();
        });

        resourceJumpLinks.appendChild(backBtn);
    }
}

/* =========================================================
   5. PROGRAMS (School Fields + Program Details)
   ========================================================= */

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

// School selection icons
const SCHOOL_ICONS = [
    // Advanced Manufacturing
    '<path d="M3 21V10l6 4V9l6 4V3h4l2 18z"/><path d="M7 17v1m5-1v1m5-1v1"/>',

    // Business
    '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 13h18M10 13v2h4v-2"/>',

    // Information Technology
    '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M12 17v4M7 21h10"/>',

    // Arts, Sciences and Education
    '<path d="m2 10 10-6 10 6-10 6zM6 13v5c4 3 8 3 12 0v-5M22 10v8"/>',

    // Entrepreneurship
    '<path d="M9 18h6M10 22h4M9 15c0-3-4-3-4-8a7 7 0 0 1 14 0c0 5-4 5-4 8z"/>',

    // Health Sciences
    '<path d="M20 4a5 5 0 0 0-8 2 5 5 0 0 0-8-2c-5 5 2 12 8 17 6-5 13-12 8-17z"/><path d="M3 12h5l2-4 4 8 2-4h5"/>',

    // Culinary Arts and Hospitality
    '<path d="M6 14a5 5 0 1 1 2-9 5 5 0 0 1 8 0 5 5 0 1 1 2 9v7H6zM6 17h12"/>',

    // Nursing
    '<path d="M4 3v7a5 5 0 0 0 10 0V3M9 15v2a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="11" r="3"/>',

    // Public Affairs and Social Services
    '<path d="m2 8 10-6 10 6zM4 21h16M6 10v8M12 10v8M18 10v8M3 18h18"/>'
];

// Render the field selection grid
function renderFieldGrid() {

  // Activate the school selection grid
  programJumpLinks.classList.add("school-grid");
  modalTitle.innerHTML = '<span class="programs-heading">Explore Our Programs</span><span class="programs-subheading">70+ Programs Designed for Indiana Jobs!</span>';
  modalContent.innerHTML = "<i>Select a school below to explore available programs.</i>";

    renderMedia({}, "program");

  prevProgram.classList.add("hidden");
  nextProgram.classList.add("hidden");
  programBack.classList.add("hidden");

  programJumpLinks.innerHTML = "";
  ProgramFields.forEach((field, index) => {
      const btn = document.createElement("button");
      btn.innerHTML = `
      <svg class="school-icon"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true">
            ${SCHOOL_ICONS[index] || SCHOOL_ICONS[2]}
        </svg>

        <span>${field.label}</span>
      `;

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
  // preserve the original grid layout for the program jump links, but remove the "school-grid" class
  programJumpLinks.classList.remove("school-grid");
  currentFieldIndex = fieldIndex;
  currentProgram = 0;

  const programs = getCurrentPrograms();

  if (programs.length === 0) {
    modalTitle.innerHTML = ProgramFields[fieldIndex].label;
    modalContent.innerHTML = "Programs for this field are coming soon.";
    renderMedia({}, "program");

    prevProgram.classList.add("hidden");
    nextProgram.classList.add("hidden");
    programJumpLinks.innerHTML = "";
    programBack.classList.remove("hidden");
    return;
  }

  // Skip straight to the detail view if there's only one program
  renderProgramJumpLinks();
  renderProgramDetail();
  programBack.classList.remove("hidden");

  const showArrows = programs.length > 1;
  prevProgram.classList.toggle("hidden", !showArrows);
  nextProgram.classList.toggle("hidden", !showArrows);
}

function renderProgramJumpLinks() {
    buildJumpLinks(
        programJumpLinks,
        getCurrentPrograms(),
        index => {
            currentProgram = index;
            renderProgramDetail();
        }
    );
}

function renderProgramDetail() {
  const programs = getCurrentPrograms();
  const program = programs[currentProgram];
  if (!program) return;

  const fieldLabel = ProgramFields[currentFieldIndex].label;
  modalTitle.innerHTML = `${fieldLabel} <br><span style="font-size:0.6em;opacity:0.8;">${program.title || ""}</span>`;
  modalContent.innerHTML = program.content || "";

  renderMedia(program, "program");

  highlightActiveButton(programJumpLinks, currentProgram);

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

/* =========================================================
   6. MAPS
   ========================================================= */
const maps = [
  { image: "assets/map_1.png", title: "Pfau Hall" },
  { image: "assets/map_2.png", title: "Ogle Hall" }
];


/* =========================================================
   7. IDLE TIMER + DISPLAY FUNCTIONS
   ========================================================= */
const MODAL_IDLE_TIME = 120;
const COUNTDOWN_WARNING = 30;

let modalTimer = null;
let modalCountdown = MODAL_IDLE_TIME;

const countdownElements =
    modalOverlay.querySelectorAll(".idle-countdown");

// Reset the timer when interacting with an open modal
["mousemove", "touchstart", "click", "keydown"].forEach(event => {
    modalOverlay.addEventListener(event, resetModalTimer);
});

function resetModalTimer() {
    // Do not start a timer when the modal is closed
    if (modalOverlay.classList.contains("hidden")) return;

    clearInterval(modalTimer);

    modalCountdown = MODAL_IDLE_TIME;
    updateModalCountdown();

    modalTimer = setInterval(() => {
        modalCountdown--;

        updateModalCountdown();

        if (modalCountdown <= 0) {
            closeModal("idle_timeout");
        }
    }, 1000);
}

function updateModalCountdown() {
    const showCountdown =
        modalCountdown <= COUNTDOWN_WARNING &&
        modalCountdown > 0;

    countdownElements.forEach(counter => {
        counter.textContent = showCountdown
            ? `(${modalCountdown}s)`
            : "";

        counter.classList.toggle("hidden", !showCountdown);
    });
}

function stopModalTimer() {
    clearInterval(modalTimer);
    modalTimer = null;

    modalCountdown = MODAL_IDLE_TIME;
    updateModalCountdown();
}
const IDLE_NUDGE_DELAY = 10000; // 10 seconds
let nudgeTimer = null;

function startNudgeTimer() {
    clearTimeout(nudgeTimer);

    nudgeTimer = setTimeout(() => {

        // Only bounce when no popup is open
        if (modalOverlay.classList.contains("hidden")) {

            actionButtons.forEach(btn => {

                // Reset the animation
                btn.classList.remove("idle-nudge");

                // Force browser reflow
                void btn.offsetWidth;

                // Restart animation
                btn.classList.add("idle-nudge");
            });

            console.log("[Kiosk] Idle bounce triggered");
        }

        // Schedule the next bounce
        startNudgeTimer();

    }, IDLE_NUDGE_DELAY);
}

function resetNudge() {
    actionButtons.forEach(btn => {
        btn.classList.remove("idle-nudge");
    });

    startNudgeTimer();
}

// Restart timer on user interaction
["click", "touchstart", "mousemove"].forEach(evt => {
    document.addEventListener(evt, resetNudge, { passive: true });
});

// Start timer on page load
startNudgeTimer();

/* =========================================================
   8. MODAL DISPLAY FUNCTIONS
   ========================================================= */
function closeModal(reason = "manual") {
    // Prevent duplicate closure events
    if (modalOverlay.classList.contains("hidden")) return;

    modalBox.classList.remove("program-mode", "resource-mode");

    // Reset navigation state
    currentFieldIndex = null;
    currentProgram = 0;
    currentAnnouncement = 0;
    currentModalMode = null;

    stopModalTimer();

    // Reset modal visibility and controls
    modalOverlay.classList.add("hidden");
    mapControls.classList.add("hidden");
    resourceControls.classList.add("hidden");
    programControls.classList.add("hidden");
    generalModalControls.classList.remove("hidden");

    // Stop and reset all modal media
    renderMedia({}, "resource");
    renderMedia({}, "program");

    // Record a single closure event
    const details = { reason };

    if (reason === "idle_timeout") {
        details.seconds = MODAL_IDLE_TIME;
    }

    window.analytics.logEvent("modal_close", details);
}

// Close button handlers
[
    modalCloseResource,
    modalCloseProgram,
    modalCloseMap,
    modalClose
].forEach(btn => {
    if (btn) {
        btn.addEventListener("click", () => closeModal());
    }
});

// Close when clicking outside the popup
modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

function showResource() {

    const resource = getActiveResources()[currentResource];

    if (!resource) return;

       // Open the second Student Services page
    if (resource.submenu) {
        window.analytics.logEvent("resource_view", {
            index: currentResource,
            label: resource.label || "More Resources"
        });

        currentResourcePage = 2;
        currentResource = 0;

        buildResourceJumpLinks();
        showResource();

        return;
    }

    modalTitle.innerHTML = resource.title || "";
    modalContent.innerHTML = resource.content || "";

  renderMedia(resource, "resource");
  highlightActiveButton(resourceJumpLinks, currentResource);

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
/* =========================================================
   9. NAVIGATION CONTROLS
   ========================================================= */

// Calculate the next index with wraparound
function wrapIndex(index, direction, length) {
    return (index + direction + length) % length;
}

// Navigate Announcements or Student Services
function navigateResource(direction) {
    resetModalTimer();

    if (currentModalMode === "announcements") {
        if (!Announcements.length) return;

        currentAnnouncement = wrapIndex(
            currentAnnouncement,
            direction,
            Announcements.length
        );

        showAnnouncement();

    } else if (currentModalMode === "resources") {
        const resources = getActiveResources();

        if (!resources.length) return;

        currentResource = wrapIndex(
            currentResource,
            direction,
            resources.length
        );

        showResource();
    }
}

// Navigate programs within a school
function navigateProgram(direction) {
    resetModalTimer();

    const programs = getCurrentPrograms();

    if (!programs.length) return;

    currentProgram = wrapIndex(
        currentProgram,
        direction,
        programs.length
    );

    renderProgramDetail();
}

// Navigate campus maps
function navigateMap(direction) {
    resetModalTimer();

    if (!maps.length) return;

    currentMap = wrapIndex(
        currentMap,
        direction,
        maps.length
    );

    showMap();
}

// Register navigation button handlers
nextResource.addEventListener("click", () => navigateResource(1));
prevResource.addEventListener("click", () => navigateResource(-1));

nextProgram.addEventListener("click", () => navigateProgram(1));
prevProgram.addEventListener("click", () => navigateProgram(-1));

nextMap.addEventListener("click", () => navigateMap(1));
prevMap.addEventListener("click", () => navigateMap(-1));

