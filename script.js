/************************************************
 *  Navigation: Show and Hide Technique Sections
 ************************************************/
const btnWimHof = document.getElementById('btnWimHof');
const btn478 = document.getElementById('btn478');
const btnBox = document.getElementById('btnBox');
const btnEqual = document.getElementById('btnEqual');

const wimHofSection = document.getElementById('wimHofSection');
const fourSevenEightSection = document.getElementById('fourSevenEightSection');
const boxSection = document.getElementById('boxSection');
const equalSection = document.getElementById('equalSection');

const navButtons = [btnWimHof, btn478, btnBox, btnEqual];
const sections = [wimHofSection, fourSevenEightSection, boxSection, equalSection];

navButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // Remove "active" class from all buttons and hide all sections
    navButtons.forEach(b => b.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    // Add "active" to the clicked button and its corresponding section
    btn.classList.add('active');
    sections[index].classList.add('active');
  });
});

/************************************************
 *              Wim Hof Technique
 ************************************************/
let wimHofInterval;
const wimHofTimerDisplay = document.getElementById('wimHofTimer');
const wimHofCircle = document.getElementById('wimHofCircle');
const startWimHofBtn = document.getElementById('startWimHof');
const stopWimHofBtn = document.getElementById('stopWimHof');

let wimHofTime = 0; 
let wimHofStep = 0; 

function startWimHof() {
  stopWimHof(); // Ensure any existing interval is cleared
  wimHofTime = 0;
  wimHofStep = 0;
  wimHofInterval = setInterval(wimHofCycle, 1000);
}

function stopWimHof() {
  clearInterval(wimHofInterval);
  wimHofTimerDisplay.textContent = "00:00";
  wimHofCircle.textContent = "Hold";
  wimHofCircle.classList.remove('breathing');
}

function wimHofCycle() {
  wimHofTime++;
  // Simplified approach:
  // 30 seconds of "active breathing", 15 seconds of "hold"

  if (wimHofStep === 0) {
    // Active Breathing
    wimHofCircle.classList.add('breathing');
    wimHofCircle.textContent = "Breathe";
    wimHofTimerDisplay.textContent = formatTime(wimHofTime);
    if (wimHofTime >= 30) {
      // Move to hold
      wimHofStep = 1;
      wimHofTime = 0;
    }
  } else if (wimHofStep === 1) {
    // Hold
    wimHofCircle.classList.remove('breathing');
    wimHofCircle.textContent = "Hold";
    wimHofTimerDisplay.textContent = formatTime(wimHofTime);
    if (wimHofTime >= 15) {
      // End cycle
      stopWimHof();
    }
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

startWimHofBtn.addEventListener('click', startWimHof);
stopWimHofBtn.addEventListener('click', stopWimHof);

/************************************************
 *             4-7-8 Technique
 ************************************************/
let fourSevenEightInterval;
const fourSevenEightTimer = document.getElementById('fourSevenEightTimer');
const fourSevenEightCircle = document.getElementById('fourSevenEightCircle');
const start478Btn = document.getElementById('start478');
const stop478Btn = document.getElementById('stop478');

let cycle478Time = 0;
// Single cycle: 4s inhale -> 7s hold -> 8s exhale = 19s total

function start478() {
  stop478();
  cycle478Time = 0;
  fourSevenEightInterval = setInterval(fourSevenEightCycle, 1000);
}

function stop478() {
  clearInterval(fourSevenEightInterval);
  fourSevenEightTimer.textContent = "Inhale";
  fourSevenEightCircle.textContent = "Relax";
  fourSevenEightCircle.classList.remove('breathing');
}

function fourSevenEightCycle() {
  cycle478Time++;

  // Inhale for 4s
  if (cycle478Time <= 4) {
    fourSevenEightTimer.textContent = `Inhale: ${cycle478Time}s`;
    fourSevenEightCircle.classList.add('breathing');
    fourSevenEightCircle.textContent = "IN";
  }
  // Hold for next 7s -> seconds 5-11
  else if (cycle478Time <= 11) {
    fourSevenEightTimer.textContent = `Hold: ${cycle478Time - 4}s`;
    fourSevenEightCircle.classList.remove('breathing');
    fourSevenEightCircle.textContent = "HOLD";
  }
  // Exhale for next 8s -> seconds 12-19
  else if (cycle478Time <= 19) {
    fourSevenEightTimer.textContent = `Exhale: ${cycle478Time - 11}s`;
    fourSevenEightCircle.classList.add('breathing');
    fourSevenEightCircle.textContent = "OUT";
  }

  // After 19s, reset cycle
  if (cycle478Time === 19) {
    cycle478Time = 0;
  }
}

start478Btn.addEventListener('click', start478);
stop478Btn.addEventListener('click', stop478);

/************************************************
 *            Box Breathing (4-4-4-4)
 ************************************************/
let boxInterval;
const boxTimer = document.getElementById('boxTimer');
const boxCircle = document.getElementById('boxCircle');
const startBoxBtn = document.getElementById('startBox');
const stopBoxBtn = document.getElementById('stopBox');

let boxTime = 0;
// 16s cycle: 4s inhale, 4s hold, 4s exhale, 4s hold

function startBox() {
  stopBox();
  boxTime = 0;
  boxInterval = setInterval(boxCycle, 1000);
}

function stopBox() {
  clearInterval(boxInterval);
  boxTimer.textContent = "Inhale";
  boxCircle.textContent = "Box";
  boxCircle.classList.remove('breathing');
}

function boxCycle() {
  boxTime++;

  // Inhale 0-3
  if (boxTime <= 4) {
    boxTimer.textContent = `Inhale: ${boxTime}s`;
    boxCircle.classList.add('breathing');
    boxCircle.textContent = "IN";
  }
  // Hold 5-8
  else if (boxTime <= 8) {
    boxTimer.textContent = `Hold: ${boxTime - 4}s`;
    boxCircle.classList.remove('breathing');
    boxCircle.textContent = "HOLD";
  }
  // Exhale 9-12
  else if (boxTime <= 12) {
    boxTimer.textContent = `Exhale: ${boxTime - 8}s`;
    boxCircle.classList.add('breathing');
    boxCircle.textContent = "OUT";
  }
  // Hold 13-16
  else if (boxTime <= 16) {
    boxTimer.textContent = `Hold: ${boxTime - 12}s`;
    boxCircle.classList.remove('breathing');
    boxCircle.textContent = "HOLD";
  }

  // Reset
  if (boxTime === 16) {
    boxTime = 0;
  }
}

startBoxBtn.addEventListener('click', startBox);
stopBoxBtn.addEventListener('click', stopBox);

/************************************************
 *             Equal Breathing (5-5)
 ************************************************/
let equalInterval;
const equalTimer = document.getElementById('equalTimer');
const equalCircle = document.getElementById('equalCircle');
const startEqualBtn = document.getElementById('startEqual');
const stopEqualBtn = document.getElementById('stopEqual');

let equalTime = 0;
// We'll do 5s in, 5s out, 10s total.

function startEqual() {
  stopEqual();
  equalTime = 0;
  equalInterval = setInterval(equalCycle, 1000);
}

function stopEqual() {
  clearInterval(equalInterval);
  equalTimer.textContent = "Inhale";
  equalCircle.textContent = "Equal";
  equalCircle.classList.remove('breathing');
}

function equalCycle() {
  equalTime++;

  if (equalTime <= 5) {
    equalTimer.textContent = `Inhale: ${equalTime}s`;
    equalCircle.classList.add('breathing');
    equalCircle.textContent = "IN";
  } else if (equalTime <= 10) {
    equalTimer.textContent = `Exhale: ${equalTime - 5}s`;
    equalCircle.classList.add('breathing');
    equalCircle.textContent = "OUT";
  }

  if (equalTime === 10) {
    equalTime = 0;
  }
}

startEqualBtn.addEventListener('click', startEqual);
stopEqualBtn.addEventListener('click', stopEqual);
