/* =========================================================
   analytics.js - Smart Board Analytics Logger
   ========================================================= */

const ANALYTICS_VERSION = "1.5";

let eventLog = [];
let sessionStart = new Date().toISOString();

// Load previous logs from localStorage
function loadLogs() {
  const saved = localStorage.getItem("smartboard_analytics");
  if (saved) {
    try {
      eventLog = JSON.parse(saved);
    } catch (e) {
      eventLog = [];
    }
  }
}

// Save logs to localStorage
function saveLogs() {
  localStorage.setItem("smartboard_analytics", JSON.stringify(eventLog));
}



const ACTION_CATEGORIES = {
  slideshow_next:    "Slideshow",
  slideshow_prev:    "Slideshow",
  slideshow_toggle:  "Slideshow",
  swipe:             "Slideshow",
  announcement_view: "Announcements",
  resource_view:     "Campus Resources",
  map_view:          "Map",
  program_view:      "Programs",
  program_back:      "Programs",
  modal_close:       "Exit pop-up"
};

function getCategory(action, details) {
  if (action === "button_click") return details.button || "Other";
  return ACTION_CATEGORIES[action] || "Other";
}

// Main logging function — now tags each event with its category up front
function logEvent(action, details = {}) {
  const now = new Date();
  const event = {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    action,
    category: getCategory(action, details),
    ...details
  };

  eventLog.push(event);
  saveLogs();
  console.log(`[Analytics] ${action}`, details);
}


// Builds the readable, grouped report you sketched out —
// a banner per category, a count, then each event underneath.
function buildReport() {
  const groups = {};
  eventLog.forEach(evt => {
    (groups[evt.category] ||= []).push(evt);
  });

  let out = "";
  Object.keys(groups).forEach(category => {
    out += `\n/* =========================================================\n`;
    out += `   ${category.toUpperCase()}\n`;
    out += `   ========================================================= */\n`;
    out += `Amount: ${groups[category].length}\n\n`;

    groups[category].forEach(evt => {
      const detail = evt.label || evt.title || evt.program || evt.button || "";
      out += `  ${evt.date} ${evt.time}  ${detail}\n`;
    });
  });

  return out;
}


// Export logs
function exportAnalytics(auto = false) {
  if (eventLog.length === 0) return;

  const reportStr = buildReport();
  const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportStr);
  const exportFileDefaultName = `smartboard-analytics-${new Date().toISOString().slice(0,10)}-${Date.now()}.txt`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();

  console.log(`[Analytics] Exported ${eventLog.length} events ${auto ? '(auto on close)' : ''}`);

  eventLog = [];
  saveLogs();
}

// ====================== SECRET EXPORT TRIGGER ======================

function setupSecretExportTrigger() {
  const clockContainer = document.getElementById("clock-container");
  let tapCount = 0;
  let lastTapTime = 0;
  let holdTimer = null;

  clockContainer.addEventListener("click", (e) => {
    const now = Date.now();
    if (now - lastTapTime > 800) tapCount = 1;
    else tapCount++;
    lastTapTime = now;

    if (tapCount >= 5) {
      tapCount = 0;
      triggerExport();
    }
  });

  const startHold = () => holdTimer = setTimeout(() => triggerExport(), 5000);
  const cancelHold = () => { if (holdTimer) clearTimeout(holdTimer); };

  clockContainer.addEventListener("mousedown", startHold);
  clockContainer.addEventListener("mouseup", cancelHold);
  clockContainer.addEventListener("mouseleave", cancelHold);
  clockContainer.addEventListener("touchstart", startHold);
  clockContainer.addEventListener("touchend", cancelHold);
}

function triggerExport() {
  exportAnalytics();
  
  const clock = document.getElementById("clock-container");
  const originalBg = clock.style.backgroundColor;
  clock.style.transition = "background-color 0.3s";
  clock.style.backgroundColor = "#fa5903";
  setTimeout(() => clock.style.backgroundColor = originalBg || "rgb(22, 110, 86)", 800);
}

// Initialize
loadLogs();
setupSecretExportTrigger();

console.log(`✅ Smart Board Analytics v${ANALYTICS_VERSION} initialized.`);
console.log(`   • Tap clock 5 times or hold 5s → manual export`);

// Expose API
window.analytics = {
  logEvent,
  exportAnalytics,
  getLogCount: () => eventLog.length
};