
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    start: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
refs.start.disabled = true;
let selectedDate = null;
let currentDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        currentDate = new Date();
        selectedDate = selectedDates[0];
        
        if (selectedDate > currentDate) {
            refs.start.disabled = false;
        } else {
            Notify.failure('Please choose a date in the future');
        }

   },
};

refs.start.addEventListener('click', () => {
    refs.start.disabled = true;
    intervalId = setInterval(() => {
        currentDate = new Date();
       
       const differenceTime = selectedDate - currentDate;
       if (differenceTime < 0) {
           clearInterval(intervalId);
       } else {
           const resultTime = convertMs(differenceTime);
           refs.days.textContent = addLeadingZero(resultTime.days);
           refs.hours.textContent = addLeadingZero(resultTime.hours);
           refs.minutes.textContent = addLeadingZero(resultTime.minutes);
           refs.seconds.textContent = addLeadingZero(resultTime.seconds);
       }
   }, 1000);
});

flatpickr(refs.input, options);

function addLeadingZero(value) {
    return String(value).padStart(2, 0)
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};