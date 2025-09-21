const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', startOnClick);
btnStop.addEventListener('click', stopOnClick);

let timerId;

function startOnClick() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function stopOnClick() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
}
