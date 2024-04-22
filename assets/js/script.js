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
            currentDateEl.textContent = formattedDate;
            tempEl.textContent = `${data.main.temp}°F`;
            windEl.textContent = `${data.wind.speed}MPH`;
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
            console.log("data getApiForecast", data);
            oneDay.innerHTML = `
            <div>
                Temperature: ${data.list[2].main.temp}°F
                </br>
                Wind: ${data.list[2].wind.speed}MPH
                </br>
                Humidity: ${data.list[2].main.humidity}%
            </div>`
            twoDay.innerHTML = `
            <div>
                Temperature: ${data.list[10].main.temp}°F
                </br>
                Wind: ${data.list[10].wind.speed}MPH
                </br>
                Humidity: ${data.list[10].main.humidity}%
            </div>
            `
            threeDay.innerHTML = `
            <div>
                Temperature: ${data.list[18].main.temp}°F
                </br>
                Wind: ${data.list[18].wind.speed}MPH
                </br>
                Humidity: ${data.list[18].main.humidity}%
            </div>
            `
            fourDay.innerHTML = `
            <div>
                Temperature: ${data.list[26].main.temp}°F
                </br>
                Wind: ${data.list[26].wind.speed}MPH
                </br>
                Humidity: ${data.list[26].main.humidity}%
            </div>
            `
            fiveDay.innerHTML = `
            <div>
                Temperature: ${data.list[34].main.temp}°F
                </br>
                Wind: ${data.list[34].wind.speed}MPH
                </br>
                Humidity: ${data.list[34].main.humidity}%
            </div>
            `
        });
    cityInput.value = ("")

};

// function loadHistory() {
//     const recentSearch = document.getElementById('recent-search');
//     recentSearch.empty();
//     for (let search of searchedCity) {
//         const searchList = document.createElement('div');
//         searchList.textContent = (search);
//         searchList.appendTo(recentSearch);
//     }
// }

function loadHistory() {
    const recentSearch = document.getElementById('recent-search');
    recentSearch.innerHTML = "";
    searchedCity.forEach(search => {
        const searchList = document.createElement('div');
        searchList.textContent = search;
        recentSearch.appendChild(searchList);
    });
}

window.onload = function() {
    loadHistory();
};

searchBtn.addEventListener('click', getApi);
searchBtn.addEventListener('click', getApiForecast);
