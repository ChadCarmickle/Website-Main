/* =========================================================
   1. CLOCK
   ========================================================= */
function updateClock() {
  const now = new Date();

  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
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

const modalImage = document.getElementById("modal-image");

document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.title || "test";
    modalContent.textContent = btn.dataset.content || "";

    if (btn.dataset.image) {
      modalImage.src = btn.dataset.image;
      modalImage.alt = btn.dataset.title || "";
      modalImage.classList.remove("hidden");
    } else {
      modalImage.removeAttribute("src");
      modalImage.classList.add("hidden");
    }

    modalOverlay.classList.remove("hidden");
  });
});


/*
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.title || "Need Help with Tutoring?";
    modalContent.textContent = btn.dataset.content || "";
    modalOverlay.classList.remove("hidden");
  });
});
*/ 
function closeModal() {
  modalOverlay.classList.add("hidden");
}

modalClose.addEventListener("click", closeModal);

// Close modal if clicking outside the box
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

let canvas = document.querySelector('canvas'),
	c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
let w = canvas.width;
let	h = canvas.height;

const mouse = {
  x: w / 2,
  y: h / 2 
}

let shadows = '#000000'
const gravity = 0.005
const friction = 0.99
const particleCount = 100
const angleIncreament = Math.PI * 2  / particleCount
const power = 7
const range = 25
let color = 30

// =====================================================

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
	w = canvas.width
	h = canvas.height

	init()
})

addEventListener('click', (event) => {
	mouse.x = event.clientX
	mouse.y = event.clientY

	fireWork({x: mouse.x, y: mouse.y})
	// init(color)
})

// =====================================================

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function fireWork(mouse, col = color) {
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle(
			mouse.x, 
			mouse.y, 
			2, 
			`hsla(
				${randomIntFromRange(col, col + range)}, 
				${randomIntFromRange(70, 80)}%, 
				${randomIntFromRange(55, 65)}%, 
				50%
			)`, 
			{
				x: Math.cos(particleCount * i) * Math.random() * power, 
				y: Math.sin(particleCount * i) * Math.random() * power
			}
		));
	}
}

// =====================================================
