let workTime = 25 * 60; // 25 min
let breakTime = 5 * 60; // 5 min
let timeLeft = workTime;
let isRunning = false;
let timer;
let onBreak = false;

const progressCircle = document.getElementById('progress');
const timeDisplay = document.getElementById('time');
const statusDisplay = document.getElementById('status');

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (timeLeft / (onBreak ? breakTime : workTime)) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

function switchMode() {
  onBreak = !onBreak;
  timeLeft = onBreak ? breakTime : workTime;
  statusDisplay.textContent = onBreak ? 'Break' : 'Work';
  updateDisplay();
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        switchMode();
        alert(onBreak ? "Break time! Relax." : "Work time! Focus.");
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  onBreak = false;
  timeLeft = workTime;
  statusDisplay.textContent = 'Work';
  updateDisplay();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

updateDisplay();


const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTask');
const list = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
  if(input.value.trim() === "") return;

  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
  });

  const span = document.createElement('span');
  span.textContent = input.value;

  const delBtn = document.createElement('button');
  delBtn.textContent = 'X';
  delBtn.className = 'deleteBtn';
  delBtn.addEventListener('click', () => li.remove());

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);

list.insertBefore(li, list.firstChild);
  input.value = '';
});
