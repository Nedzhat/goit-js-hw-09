import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputDateRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const spanDaysRef = document.querySelector('span[data-days]');
const spanHoursRef = document.querySelector('span[data-hours]');
const spanMinutesRef = document.querySelector('span[data-minutes]');
const spanSecondsRef = document.querySelector('span[data-seconds]');

startBtnRef.disabled = true;

startBtnRef.addEventListener('click', setTimeFromUser);

let nowDate = new Date();
let selectedDatesForUser;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDatesForUser = selectedDates[0];
    console.log(selectedDates[0]);
    dateTimeFromUser(selectedDatesForUser, nowDate);
  },
};

flatpickr(inputDateRef, options);

function dateTimeFromUser() {
  if (selectedDatesForUser > nowDate ? true : false) {
    startBtnRef.disabled = false;
  } else {
    Report.failure('ERROR', 'PLEASE CHOOSE A DATE IN THE FUTURE', 'OKAY');
  }
}

function setTimeFromUser() {
  startBtnRef.disabled = true;
  timerId = setInterval(
    () => {
      nowDate = new Date();
      const { days, hours, minutes, seconds } = convertMs(
        selectedDatesForUser - nowDate
      );
      spanDaysRef.textContent = addLeadingZero(days);
      spanHoursRef.textContent = addLeadingZero(hours);
      spanMinutesRef.textContent = addLeadingZero(minutes);
      spanSecondsRef.textContent = addLeadingZero(seconds);

      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timerId);
      }
    },
    1000,
    spanDaysRef,
    spanHoursRef,
    spanMinutesRef,
    spanSecondsRef
  );
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, 0);
  }
  return value;
}

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
}
