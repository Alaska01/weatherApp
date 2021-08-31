/* eslint-disable no-unused-vars */
import DoISuportIt from './style.css';

const api = {
  mykey: '02e1cd5bf4b503f7aaf9f2e799172b16',
  base: 'https://api.openweathermap.org/data/2.5/',
};
const notificationElement = document.querySelector('.notification');
const btnEl = document.querySelector('.btn');
const btnUnitValue = document.querySelector('.btn p .toggle');
const tempChange = document.querySelector('.btn p .change');
let temperatureC = 15;

const searchbox = document.querySelector('.search-box');
/* eslint-disable no-use-before-define */
searchbox.addEventListener('keypress', setQuery);
function setQuery(evt) {
  if (evt.keyCode === 13) {
    if (searchbox.value !== '') {
      notificationElement.style.display = 'none';
      getResults(searchbox.value);
    } else {
      notificationElement.style.display = 'block';
      notificationElement.innerHTML = '<p>City Location cannot be empty</p>';
      notificationElement.style.display = 'flex';
    }
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.mykey}`)
    .then((weather) => weather.json()).then(displayResults);
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name} ${weather.sys.country}`;
  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;
  temperatureC = Math.round(weather.main.temp);
  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerHTML = weather.weather[0].main;
  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)} °C / ${Math.round(weather.main.temp_max)} °C`;
}

function dateBuilder(d) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

btnEl.addEventListener('click', () => {
  if (btnUnitValue.innerText === 'C') {
    tempChange.innerText = Math.round((temperatureC * (9 / 5)) + 32);
    btnUnitValue.innerText = 'F';
  } else {
    tempChange.innerText = temperatureC;
    btnUnitValue.innerText = 'C';
  }
});
