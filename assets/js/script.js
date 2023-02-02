// container below search where city names are displayed
let cityContainer = document.getElementById('city-names');
// search button
let searchButton = document.getElementById('search-button');
let cityInputEl = document.querySelector('#city-input');
let currentWeatherEl = document.getElementById('current-weather');
// let currentCityEl = document.getElementById('city-name');
// let currentDateEl = document.getElementById('current-date');
// let currentTempEl = document.getElementById('temp');
// let weatherIconEl = document.getElementById('weather-icon');
// let currentWindEl = document.getElementById('wind');
// let currentHumidityEl = document.getElementById('humidity');
let headerEl = document.getElementById('fiveday-header');

var APIKey = "af6fe5609e13717cb920c672710093bd";
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function weatherForecast() {
    var cityName = cityInputEl.value.trim();

    var requestCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + APIKey;

    fetch(requestCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            for (var i = 0; i < data.length; i++) {

                let lat = data[i].lat;
                console.log(lat);
                let lon = data[i].lon;
                console.log(lon);

                var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&limit=5&appid=' + APIKey;

                fetch(requestUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);

                        for (var i = 0; i < data.length; i++) {

                            var cityName = document.createElement('h3');
                            var date = document.createElement('h3');
                            var icon = document.createElement('p');
                            var temp = document.createElement('p');
                            var wind = document.createElement('p');
                            var humidity = document.createElement('p');

                            cityName.textContent = data[i].city.name;
                            date.textContent = data[i].list.dt_txt;
                            icon.textContent = data[i].list.weather.icon;
                            temp.textContent = data[i].list.main.temp;
                            wind.textContent = data[i].list.wind.speed;
                            humidity.textContent = data[i].list.main.humidity;

                            currentWeatherEl.append(cityName);
                            currentWeatherEl.append(date);
                            currentWeatherEl.append(icon);
                            currentWeatherEl.append(temp);
                            currentWeatherEl.append(wind);
                            currentWeatherEl.append(humidity);
                        }
                    });
            }
        });

}

searchButton.addEventListener('click', weatherForecast);

function getApi() {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&limit=5&appid=' + APIKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Use the console to examine the response
            console.log(data);
            // TODO: Loop through the data and generate your HTML
            // for (var i = 0; i < data.length; i++) {
            //     var cityName = document.createElement('h3');
            //     var date = document.createElement('h3');
            //     var icon = document.createElement('p');
            //     var temp = document.createElement('p');
            //     var wind = document.createElement('p');
            //     var humidity = document.createElement('p');
            //     cityName.textContent = data[i].list.city.name;
            //     date.textContent = data[i].list.dt_txt;
            //     icon.textContent = data[i].list.weather.icon;
            //     temp.textContent = data[i].list.main.temp;
            //     wind.textContent = data[i].list.wind.speed;
            //     humidity.textContent = data[i].list.main.humidity;
            //     cityContainer.append(cityName);
            //     userContainer.append(date);
            //     userContainer.append(icon);
            //     userContainer.append(temp);
            //     userContainer.append(wind);
            //     userContainer.append(humidity);
            // }
        });
}

// fetchButton.addEventListener('submit', formSubmitHandler);