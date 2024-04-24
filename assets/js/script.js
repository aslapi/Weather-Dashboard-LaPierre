const apiKey = "1fb76b664132170781b862620191215d";
const searchBtn = document.getElementById('submit');
let searchedCity = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Current weather
function getApi(e) {
    e.preventDefault();
    const cityInput = document.getElementById('search');
    const citySearch = cityInput.value;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`;
    let cityHeaderEl = document.getElementById('search-results');
    let weatherIconEl = document.getElementById('weatherIcon');
    let tempEl = document.getElementById('temp');
    let windEl = document.getElementById('wind');
    let humidityEl = document.getElementById('humidity');
    let currentDateEl = document.getElementById('currentDate');
    const currentDate = dayjs();
    const formattedDate = currentDate.format('dddd, MMMM D, YYYY');

    // Current weather fetch
    fetch(weatherUrl)
        .then(function (response) {
            console.log("response getApi", response);
            return response.json();
        })
        .then(function (data) {
            console.log("data getApi", data);
            cityHeaderEl.textContent = `${data.name}`;
            weatherIconEl.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            currentDateEl.textContent = formattedDate;
            tempEl.textContent = `${data.main.temp}°F`;
            windEl.textContent = `${data.wind.speed}mph`;
            humidityEl.textContent = `${data.main.humidity}%`;
            searchedCity.unshift(data.name);
            localStorage.setItem("searchHistory", JSON.stringify(searchedCity));
            loadHistory();
        });
};

// 5 Day Forecast
function getApiForecast(e) {
    e.preventDefault();
    const cityInput = document.getElementById('search');
    const citySearch = cityInput.value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`;
    const oneDay = document.getElementById('oneDay');
    const twoDay = document.getElementById('twoDay');
    const threeDay = document.getElementById('threeDay');
    const fourDay = document.getElementById('fourDay');
    const fiveDay = document.getElementById('fiveDay');

    // Displays next five days in 5 day forecast cards
    const currentDate = dayjs();
    const nextFive = [];

    for (let i = 1; i <= 5; i++) {
        const nextDay = currentDate.add(i, 'day');
        nextFive.push(nextDay.format('MM/DD/YYYY'));
    }

    // 5 day forecast fetch
    fetch(weatherUrl)
        .then(function (response) {
            console.log("response getApiForecast", response);
            return response.json();
        })
        .then(function (data) {
            console.log("data getApiForecast", data);
            // Five day forecast HTML created
            oneDay.innerHTML = `
            <div>
                <h5> ${nextFive[0]}</h5>
                <img src="https://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png" alt="Weather Icon">
                </br>
                <b>Temperature:</b> ${data.list[2].main.temp}°F
                </br>
                <b>Wind:</b> ${data.list[2].wind.speed}mph
                </br>
                <b>Humidity:</b> ${data.list[2].main.humidity}%
            </div>`
            twoDay.innerHTML = `
            <div>
                <h5> ${nextFive[1]}</h5>
                <img src="https://openweathermap.org/img/w/${data.list[10].weather[0].icon}.png" alt="Weather Icon">
                <b>Temperature:</b> ${data.list[10].main.temp}°F
                </br>
                <b>Wind:</b> ${data.list[10].wind.speed}mph
                </br>
                <b>Humidity:</b> ${data.list[10].main.humidity}%
            </div>
            `
            threeDay.innerHTML = `
            <div>
                <h5> ${nextFive[2]}</h5>   
                <img src="https://openweathermap.org/img/w/${data.list[18].weather[0].icon}.png" alt="Weather Icon">
                <b>Temperature:</b> ${data.list[18].main.temp}°F
                </br>
                <b>Wind:</b> ${data.list[18].wind.speed}mph
                </br>
                <b>Humidity:</b> ${data.list[18].main.humidity}%
            </div>
            `
            fourDay.innerHTML = `
            <div>
                <h5> ${nextFive[3]}</h5>
                <img src="https://openweathermap.org/img/w/${data.list[26].weather[0].icon}.png" alt="Weather Icon">
                <b>Temperature:</b> ${data.list[26].main.temp}°F
                </br>
                <b>Wind:</b> ${data.list[26].wind.speed}mph
                </br>
                <b>Humidity:</b> ${data.list[26].main.humidity}%
            </div>
            `
            fiveDay.innerHTML = `
            <div>
                <h5> ${nextFive[4]}</h5>
                <img src="https://openweathermap.org/img/w/${data.list[34].weather[0].icon}.png" alt="Weather Icon">
                <b>Temperature:</b> ${data.list[34].main.temp}°F
                </br>
                <b>Wind:</b> ${data.list[34].wind.speed}mph
                </br>
                <b>Humidity:</b> ${data.list[34].main.humidity}%
            </div>
            `
        });
    cityInput.value = ("")

};

// Appends search history to the aside div
function loadHistory() {
    const recentSearch = document.getElementById('recent-search');
    recentSearch.innerHTML = "";
    for (search of searchedCity) {
        const searchList = document.createElement('div');
        searchList.textContent = search;
        searchList.classList.add('search-item'); // Add a class for styling
        searchList.addEventListener('click', (function(search) {
            return function() {
                console.log('Clicked:', search);
                document.getElementById('search').value = search;
                getApi(new Event('click'));
                getApiForecast(new Event('click'));
            };
        })(search));
        recentSearch.appendChild(searchList);
    }
}

// When the website loads the history will display
window.onload = function() {
    loadHistory();
};

// Listens for when the submit button is clicked, gets APIs for the current weather and the five day forecast
searchBtn.addEventListener('click', getApi);
searchBtn.addEventListener('click', getApiForecast);
