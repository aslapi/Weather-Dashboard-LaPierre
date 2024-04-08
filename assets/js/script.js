// Find a weather api
// Use different selectors to traverse to get:
// Current weather and future weather
// Temp, humidity, wind speed
// Icon representation for weather (font awesome??)

const weatherUrl = 'https://www.api.weatherapi.com/v1/current.json?key=782415be1aa6495db2b125628240704&q=Minneapolis'

// Search history???
function getApi() {

    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}




//     "Authorization" : "782415be1aa6495db2b125628240704";