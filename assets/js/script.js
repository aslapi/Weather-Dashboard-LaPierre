// Find a weather api
// Use different selectors to traverse to get:
// Current weather and future weather
// Temp, humidity, wind speed
// Icon representation for weather (font awesome??)

const apiKey = "1fb76b664132170781b862620191215d";
const searchBtn = document.getElementById('submit');
let searchedCity = JSON.parse(localStorage.getItem("searchHistory")) || [];



// Current weather
function getApi(e) {
    e.preventDefault();
    // const citySearch = "Minneapolis";
    const cityInput = document.getElementById('search');
    const citySearch = cityInput.value;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`;
    let cityHeaderEl = document.getElementById('search-results');
    let weatherIconEl = document.getElementById('weatherIcon');
    // const iconCode = "02n"
    // const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    // console.log("did this work?", iconUrl);

    let tempEl = document.getElementById('temp');
    let windEl = document.getElementById('wind');
    let humidityEl = document.getElementById('humidity');
    let currentDateEl = document.getElementById('currentDate');
    const currentDate = dayjs();
    const formattedDate = currentDate.format('dddd, MMMM D, YYYY');


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
    // const citySearch = document.getElementById('search').value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`;
    const oneDay = document.getElementById('oneDay');
    const twoDay = document.getElementById('twoDay');
    const threeDay = document.getElementById('threeDay');
    const fourDay = document.getElementById('fourDay');
    const fiveDay = document.getElementById('fiveDay');


    fetch(weatherUrl)
        .then(function (response) {
            console.log("response getApiForecast", response);
            return response.json();
        })
        .then(function (data) {
            // Date: ${data.list[2].date}
            console.log("data getApiForecast", data);
            oneDay.innerHTML = `
            <div>
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

// Alternative way to write for loop
// function loadHistory() {
//     const recentSearch = document.getElementById('recent-search');
//     recentSearch.innerHTML = "";
//     searchedCity.forEach(search => {
//         const searchList = document.createElement('div');
//         searchList.textContent = search;
//         recentSearch.appendChild(searchList);
//     });
// }

// Appends search history to the aside div
function loadHistory() {
    const recentSearch = document.getElementById('recent-search');
    recentSearch.innerHTML = "";
    for (search of searchedCity) {
        const searchList = document.createElement('div');
        searchList.textContent = search;
        recentSearch.appendChild(searchList);
    }
}

// window.onload = function() {
//     loadHistory();
// };

searchBtn.addEventListener('click', getApi);
searchBtn.addEventListener('click', getApiForecast);
