const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const msg = document.getElementById("msg");
const progressBar = document.getElementById("progressBar");
const percentageText = document.getElementById("percentageText");

let currentProgress = 20;
let yesClicked = false;

// Slowly grow progress from 20% to 23%
const growInterval = setInterval(() => {
  if (!yesClicked && currentProgress < 23) {
    currentProgress += 0.01;
    progressBar.style.width = currentProgress + "%";
    percentageText.textContent = Math.round(currentProgress) + "%";
  } else if (yesClicked && currentProgress < 27) {
    currentProgress += 0.1;
    progressBar.style.width = currentProgress + "%";
    percentageText.textContent = Math.round(currentProgress) + "%";
  }
  
  if (yesClicked && currentProgress >= 27) {
    clearInterval(growInterval);
  }
}, 100);

// When Yes is clicked
yesBtn.addEventListener("click", () => {
  msg.textContent = "Yay! 💕 I'm so happy! 🎉";
  noBtn.style.display = "none";
  yesClicked = true;
  
  // Hide the question, buttons, and message
  document.querySelector(".question").style.display = "none";
  document.querySelector(".button-container").style.display = "none";
  msg.style.display = "none";
  
  // Show celebration content (image + message)
  const celebrationContent = document.getElementById("celebrationContent");
  celebrationContent.style.display = "flex";
  
  // Create confetti
  createConfetti();
});

// Confetti function
function createConfetti() {
  const colors = ['#ff6b9d', '#ffc0cb', '#ff8fab', '#ffb6c1', '#ff69b4', '#ffd700', '#ffaa00'];
  
  // Initial burst
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      createSingleConfetti(colors);
    }, i * 30);
  }
  
  // Keep creating confetti continuously
  setInterval(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createSingleConfetti(colors);
      }, i * 100);
    }
  }, 300);
}

function createSingleConfetti(colors) {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
  document.body.appendChild(confetti);
  
  // Remove confetti after animation
  setTimeout(() => confetti.remove(), 5000);
}

// Make the No button move away from the mouse like a repelling magnet
let noBtnPosition = null;

document.addEventListener("mousemove", (e) => {
  if (noBtn.style.display === "none") return;
  
  // Get the no button position
  const rect = noBtn.getBoundingClientRect();
  
  // Initialize position if not set
  if (!noBtnPosition) {
    noBtnPosition = {
      x: rect.left,
      y: rect.top
    };
    noBtn.style.position = "fixed";
    noBtn.style.left = noBtnPosition.x + "px";
    noBtn.style.top = noBtnPosition.y + "px";
    noBtn.style.zIndex = "9999";
    noBtn.style.transition = "all 0.15s ease-out";
  }
  
  // Calculate center of button
  const btnCenterX = parseFloat(noBtn.style.left) + rect.width / 2;
  const btnCenterY = parseFloat(noBtn.style.top) + rect.height / 2;
  
  // Calculate distance from mouse to button center
  const deltaX = e.clientX - btnCenterX;
  const deltaY = e.clientY - btnCenterY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // If mouse is close (within 200px), push button away
  if (distance < 200) {
    const angle = Math.atan2(deltaY, deltaX);
    const force = (200 - distance) * 2;
    
    // Calculate new position (opposite direction from mouse)
    let newX = parseFloat(noBtn.style.left) - Math.cos(angle) * force;
    let newY = parseFloat(noBtn.style.top) - Math.sin(angle) * force;
    
    // Keep within screen bounds
    newX = Math.max(10, Math.min(window.innerWidth - rect.width - 10, newX));
    newY = Math.max(10, Math.min(window.innerHeight - rect.height - 10, newY));
    
    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
  }
});