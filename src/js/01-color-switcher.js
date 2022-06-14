const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
stopBtnRef.disabled = true;
let timerId = null;

startBtnRef.addEventListener('click', startChangeColorBody);
stopBtnRef.addEventListener('click', stopChangeColorBody);

function startChangeColorBody() {
  timerId = setInterval(() => {
    bodyRef.style.background = getRandomHexColor();
  }, 1000);
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
}

function stopChangeColorBody() {
  clearInterval(timerId);
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
