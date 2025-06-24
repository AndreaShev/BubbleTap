const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let intervalId = null;
let time = 0;
let gameTime = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    gameTime = time;
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  clearInterval(intervalId);
  intervalId = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    time--;
    setTime(time);
  }
}

function setTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function finishGame() {
  clearInterval(intervalId);
  timeEl.parentNode.classList.add('hide');
  
  const scoreElement = document.createElement('h1');
  scoreElement.innerHTML = `Cчет: <span class="primary">${score}</span>`;
  
  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'Начать игру снова';
  restartBtn.classList.add('start');
  restartBtn.id = 'restart';
  
  // Добавляем кнопку "Завершить игру"
  const endBtn = document.createElement('button');
  endBtn.textContent = 'Завершить игру';
  endBtn.classList.add('start', 'end-btn');
  endBtn.id = 'end';
  
  // Контейнер для кнопок
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');
  buttonsContainer.append(restartBtn, endBtn);
  
  board.innerHTML = '';
  board.append(scoreElement);
  board.append(buttonsContainer);
  
  restartBtn.addEventListener('click', resetGame);
  
  // Обработчик для кнопки завершения игры
  endBtn.addEventListener('click', () => {
    // Сбрасываем состояние игры
    score = 0;
    board.innerHTML = '';
    timeEl.parentNode.classList.remove('hide');
    
    // Возвращаемся на стартовый экран
    screens.forEach(screen => screen.classList.remove('up'));
  });
}

function resetGame() {
  score = 0;
  board.innerHTML = '';
  timeEl.parentNode.classList.remove('hide');
  time = gameTime;
  setTime(time);
  startGame();
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = Math.random() * (width - size);
  const y = Math.random() * (height - size);
  
  circle.classList.add('circle');
  Object.assign(circle.style, {
    width: `${size}px`,
    height: `${size}px`,
    top: `${y}px`,
    left: `${x}px`,
    backgroundColor: getRandomColor(),
    transform: 'scale(0)'
  });
  
  board.append(circle);
  
  requestAnimationFrame(() => {
    circle.style.transform = 'scale(1)';
    circle.style.transition = 'transform 0.3s ease-out';
  });
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 50) + 50;
  const lightness = Math.floor(Math.random() * 50) + 25;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// автокликер
function winTheGame() {
function kill() {
const circle = document.querySelector('.circle')
if (circle) {
circle.click()
}
}
setInterval(kill, 42)
}