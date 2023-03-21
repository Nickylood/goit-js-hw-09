function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId = null;


const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStop.disabled = true;




btnStart.addEventListener('click', () => {
    timerId = setInterval(() => body.style.backgroundColor = getRandomHexColor(), 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStop.disabled = true;
  btnStart.disabled = false;
});

