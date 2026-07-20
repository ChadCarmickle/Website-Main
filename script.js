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

const CampusResources = [
  { 
    label: "Registrar", 
    title: "Office of the Registrar",
    content: "The Office of the Registrar performs a variety of functions at Ivy Tech Community College. At some time during your connection with Ivy Tech, you will probably have contact with the office due to the nature of its responsibilities. Some of the functions of the office are listed below. <br><br>• Changing your demographic information <br>• Credit Hours / Load / Enrollment Status <br>• Student Loan Deferment Requests and Insurance Reporting, <br>• Adding / Dropping Courses <br>• Grading / Improving a Grade  <br>• Grade Point Average (GPA) / Dean's List <br>• Transfer of Credit <br>• Graduation <br>• Transscripts  <br>• Family Education Rights & Privacy Act of 1974, as amended  <br>• Voter Registration ",
    image: null,
    video: null,
    qr: null,
  },
  { 
    label: "Tutoring", 
    title: "Ivy tech<br> Offers free tutoring in the following subjects:",
    content: "",
    image: "/assets/_QR_tutor.png",
    video: null,
    qr: null,
  },
  {
    label: "Academic Advising", 
    title: "Academic Advising at Ivy Tech",
    content: "Academic advising serves to help students set and complete their programs and/or academic goals by building relationships within their student success network. Advising is a collaborative partnership where the student is the primary driver for success and their advisor serves as a navigator to support them through their educational journey. <br><br>Your academic advisor will be your guide as you determine which courses to take each semester. If your goal is to transfer to a four-year college or university, your advisor will help you with that too! <br><br> For more infomation, Scan the QR code!",
    image: "assets/CampusResources/AcademicAdvising.jpg",
    video: null,
    qr: "assets/CampusResources/QR_AcademicAdvising.jpg",
  },
  {
    label: "Disability Services", 
    title: "Disability Support Services",
    content: "As an Ivy Tech student, you have access to a wide variety of resources to meet your individual needs.  If you have a disability, you’ll want to learn more about Disability Support Services (DSS) and how they can support you?  DSS works with students on a case-by-case basis to determine what accommodations meet their specific needs in accordance with the Americans with Disabilities Act. <br> In addition, to ensuring you receive the best possible learning accommodations, DSS serves as an advocate for students with disabilities.  Get started by contacting the DSS office on your home campus or completing an Accommodation Request Form. <br><br> For additional Questions Scan the QR code below.",
    image: "assets/CampusResources/disabilitySupport.jpg",
    video: null,
    qr: "assets/CampusResources/QR_AcademicAdvising.jpg",
  },
  {
    label: "Finnancial Aid", 
    title: "Financial Aid",
    content: "Financial aid is money to help pay for college or career school. Whether your goal is finding a career after graduation or continuing on to a four-year university, getting financial aid can help you pay for college now and finish with little to no debt or a more manageable payment plan. Financial aid includes scholarships, grants, work-study, and loans—all of which help make college more affordable. <br> • Scholarships <br> • Grants <br> • Federal Work-Study <br> • Loans <br><br> For more infomation, Scan the QR code!  ",
    image: "assets/CampusResources/FinnancialAid.jpg",
    video: null,
    qr: "assets/CampusResources/QR_AcademicAdvising.jpg",
  },
  {
    label: "Career Link", 
    title: "Career Link",
    content: "Career Link is a team that provides transformative career development services for Ivy Tech students and alumni as well as a variety of talent connection opportunities and employee training for employers. The pool of resources we offer connects students, employers, alumni, and communities. <br> By focusing on honing the employability skills of our students and the state's workers, we are working to meet the specific skills and training needs of employers in Indiana and neighboring states. ",
    image: "assets/CampusResources/Career.jpg",
    video: null,
    qr: "assets/CampusResources/QR_AcademicAdvising.jpg",
  },  
  {
    label: "IT professors", 
    title: "IT Professors",
    image: "assets/campusResource_ITProf.png",
    video: null,
    qr: null,
  },

  {
    label: "Video Example", 
    title: "Video Example",
    image: null,
    video: "videos/video_1.mp4",
    qr: null,
  }
];

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
   4. PROGRAMS
   ========================================================= */
const ProgramResources = [
  { 
    label: "Advanced Manufacturing", 
    title: "Advanced Manufacturing",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Agriculture", 
    title: "Agriculture",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Automotive", 
    title: "Automotive",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Aviation", 
    title: "Aviation",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Computers & Infomation Technology", 
    title: "Computers & Infomation Technology",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Construction", 
    title: "Construction",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Education", 
    title: "Education",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  
  {
    label: "Engineering", 
    title: "Engineering",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Entrepreneurship", 
    title: "Entrepreneurship",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Fine Arts & Design", 
    title: "Fine Arts & Design",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "General Studies", 
    title: "General Studies",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Healthcare", 
    title: "Healthcare",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Hospitality & Culinary", 
    title: "Hospitality & Culinary",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Law", 
    title: "Law",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },
  {
    label: "Public Safety", 
    title: "Public Safety",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },

  {
    label: "Science & Applied Science", 
    title: "Science & Applied Science",
    content: " ",
    image: null,
    video: null,
    qr: null,
  },

  {
    label: "Science & Applied Science", 
    title: "Science & Applied Science",
    content: " ",
    image: null,
    video: null,
    qr: null,
  }
  
]; 

function buildProgramJumpLinks() {
  programJumpLinks.innerHTML = "";
  ProgramResources.forEach((prog, index) => {
    const btn = document.createElement("button");
    btn.textContent = prog.label || prog.title;
    btn.dataset.index = index;
    btn.addEventListener("click", () => {
      resetModalTimer();
      currentProgram = index;
      showProgram();
    });
    programJumpLinks.appendChild(btn);
  });
}

function showProgram() {
  const program = ProgramResources[currentProgram];
  modalTitle.innerHTML = program.title || "";
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
}

buildProgramJumpLinks();

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

nextProgram.addEventListener("click", () => {
  resetModalTimer();
  currentProgram = (currentProgram + 1) % ProgramResources.length;
  showProgram();
});

prevProgram.addEventListener("click", () => {
  resetModalTimer();
  currentProgram = (currentProgram - 1 + ProgramResources.length) % ProgramResources.length;
  showProgram();
});