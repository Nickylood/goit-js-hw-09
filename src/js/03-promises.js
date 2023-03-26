import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchElements = element => document.querySelector(element);
const form = searchElements('.form');
const step = searchElements('[name="step"]');
const amount = searchElements('[name="amount"]');
const delay = searchElements('[name="delay"]');


function createPromise(position, delayNumber) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve ({position, delayNumber});
      } else {
        reject ({position, delayNumber});
      }
    }, delayNumber);
  })
}

function stepAmountDelayPromise(e) {
  e.preventDefault();

  
}
