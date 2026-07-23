/* =========================================================
   analytics.js - Smart Board Analytics Logger
   ========================================================= */

// ====================== MODE TOGGLE ======================
// Set to true while developing/testing so you get a confirmation
// before the page closes (handy so you don't lose test data).

// Set to false before deploying to the live smart board — the
// export still fires, but nothing blocks the window from closing.
const DEV_MODE = true;



const ANALYTICS_VERSION = "1.3";

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

// Main logging function
function logEvent(action, details = {}) {
  const now = new Date();
  const event = {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    action: action,
    ...details
  };

  eventLog.push(event);
  saveLogs();
  console.log(`[Analytics] ${action}`, details);
}


// Export logs
function exportAnalytics(auto = false) {
  if (eventLog.length === 0) return;

  const dataStr = JSON.stringify(eventLog, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportFileDefaultName = `smartboard-analytics-${new Date().toISOString().slice(0,10)}-${Date.now()}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();

  console.log(`[Analytics] Exported ${eventLog.length} events ${auto ? '(auto on close)' : ''}`);

  // Clear the log now that it's safely exported, so it doesn't keep growing forever
  eventLog = [];
  saveLogs();

}

// ====================== AUTO BACKUP ON CLOSE ======================

function setupAutoBackupOnClose() {
  window.addEventListener("beforeunload", (event) => {
    if (eventLog.length === 0) return;

    exportAnalytics(true); // fire off the auto backup regardless of mode

    if (DEV_MODE) {
      // Native "leave site?" confirmation — dev/testing only
      event.preventDefault();
      event.returnValue = "Closing this application. Analytics data will be saved.";
    }
  });
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
setupAutoBackupOnClose();

console.log(`✅ Smart Board Analytics v${ANALYTICS_VERSION} initialized.`);
console.log(`   • Tap clock 5 times or hold 5s → manual export`);
console.log(`   • Closing the program → auto backup (data stays until you reopen)`);

// Expose API
window.analytics = {
  logEvent,
  exportAnalytics,
  getLogCount: () => eventLog.length
};