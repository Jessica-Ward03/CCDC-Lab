document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.getElementById("timer");
  const start40Button = document.getElementById("start40Button");
  const start60Button = document.getElementById("start60Button");
  const resetButton = document.getElementById("resetButton");

  let timerInterval;
  let startTime = localStorage.getItem("timerStartTime");
  let targetDuration = localStorage.getItem("timerDuration");

  // If timer was already started before
  if (startTime && targetDuration) {
    startTime = parseInt(startTime);
    targetDuration = parseInt(targetDuration);
    startTimer();
    hideStartButtons();
  }

  // Start 40-minute timer
  start40Button.addEventListener("click", () => {
    if (!localStorage.getItem("timerStartTime")) {
      startTime = Date.now();
      targetDuration = 40 * 60 * 1000; // 40 minutes
      localStorage.setItem("timerStartTime", startTime);
      localStorage.setItem("timerDuration", targetDuration);
      hideStartButtons();
      startTimer();
    }
  });

  // Start 60-minute timer
  start60Button.addEventListener("click", () => {
    if (!localStorage.getItem("timerStartTime")) {
      startTime = Date.now();
      targetDuration = 60 * 60 * 1000; // 1 hour
      localStorage.setItem("timerStartTime", startTime);
      localStorage.setItem("timerDuration", targetDuration);
      hideStartButtons();
      startTimer();
    }
  });

  // Reset button
  resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    localStorage.removeItem("timerStartTime");
    localStorage.removeItem("timerDuration");
    startTime = null;
    targetDuration = null;
    timerElement.textContent = "00:00:00";
    showStartButtons();
  });

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const hours = Math.floor(elapsed / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
      const seconds = Math.floor((elapsed / 1000) % 60);

      timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

      if (elapsed >= targetDuration) {
        clearInterval(timerInterval);
        timerElement.textContent += " (Time’s up!)";
        localStorage.removeItem("timerStartTime");
        localStorage.removeItem("timerDuration");
        showStartButtons();
      }
    }, 1000);
  }

  function pad(num) {
    return num.toString().padStart(2, "0");
  }

  function hideStartButtons() {
    start40Button.style.display = "none";
    start60Button.style.display = "none";
  }

  function showStartButtons() {
    start40Button.style.display = "inline-block";
    start60Button.style.display = "inline-block";
  }
});