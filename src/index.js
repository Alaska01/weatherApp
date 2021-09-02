import './style.css';

const api = {
  mykey: '02e1cd5bf4b503f7aaf9f2e799172b16',
  base: 'https://api.openweathermap.org/data/2.5/',
};
const notificationElement = document.querySelector('.notification');
const btnEl = document.querySelector('.btn-button');
let temperatureC = 15;
let temperatureF;
const searchbox = document.querySelector('.search-box');
const body = document.querySelector('body');
let dir = './images/';

const dateBuilder = (d) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const displayResults = (weather) => {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name} ${weather.sys.country}`;
  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)} °C`;
  temperatureC = Math.round(weather.main.temp);
  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerHTML = weather.weather[0].main;
  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)} °C / ${Math.round(weather.main.temp_max)} °C`;

  const bg = () => {
    const imgCount = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
    if (imgCount.includes(`${weather.weather[0].icon}`)) {
      dir = './images/';
      dir = `${dir}${weather.weather[0].icon}.png`;
      body.style.background = `url(${dir})`;
    }
  };
  bg();
};

const getResults = (query) => {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.mykey}`)
    .then((weather) => weather.json()).then(displayResults);
};

const setQuery = (evt) => {
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
};

searchbox.addEventListener('keypress', setQuery);

btnEl.addEventListener('click', () => {
  document.querySelector('.btn');
  temperatureF = Math.round((temperatureC) * (9 / 5)) + 32;
  const tempHold = document.querySelector('.temp');
  if (tempHold.innerText === `${temperatureC} °C`) {
    tempHold.innerText = `${Math.round((temperatureC) * (9 / 5)) + 32} F`;
  } else if ((tempHold.innerText === `${temperatureF} F`)) {
    tempHold.innerText = `${temperatureC + 273} °K`;
  } else if ((tempHold.innerText === `${temperatureC + 273} °K`)) {
    tempHold.innerText = `${temperatureC} °C`;
  }
});

// called to give a default city with current data
getResults('gboko');