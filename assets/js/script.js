let searchButton = document.getElementById('search-button');
let cityInputEl = document.querySelector('#city-input');
let currentWeatherEl = document.getElementById('current-weather');
let fivedayForecastEl = document.querySelectorAll(".forecast");
let headerEl = document.getElementById('fiveday-header');
let searchHistoryEl = document.getElementById('search-history');
let clearHistoryBtn = document.getElementById('clear-button');
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
let APIKey = "af6fe5609e13717cb920c672710093bd";

function weatherForecast() {

    function getCoordinates(cityName) {

        var requestCity = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + APIKey;

        fetch(requestCity)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let lat = data[0].lat;
                let lon = data[0].lon;

                getWeather(lat, lon);
            });
    }

    function getWeather(lat, lon) {

        currentWeatherEl.textContent = "";

        currentWeatherEl.classList.remove("d-none");
        headerEl.classList.remove("d-none");

        var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&limit=5&appid=' + APIKey;

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Current forecast
                var cityName = document.createElement('h2');
                var date = document.createElement('h3');
                var icon = document.createElement('img');
                var temp = document.createElement('p');
                var wind = document.createElement('p');
                var humidity = document.createElement('p');

                cityName.textContent = data.city.name;

                const currentDay = new Date(data.list[0].dt_txt);
                const day = currentDay.getDate() - 1;
                const month = currentDay.getMonth() + 1;
                const year = currentDay.getFullYear();
                date.textContent = month + "/" + day + "/" + year;

                let iconImg = data.list[0].weather[0].icon;
                icon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconImg + "@2x.png");
                icon.setAttribute('width', 100, 'height', 100);

                temp.textContent = "Temp: " + convertTemp(data.list[0].main.temp) + " ºF";
                wind.textContent = "Wind: " + data.list[0].wind.speed + " mph";
                humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";

                currentWeatherEl.append(cityName, date, icon, temp, wind, humidity);

                // 5-Day forecast

                for (i = 0; i < fivedayForecastEl.length; i++) {

                    fivedayForecastEl[i].textContent = "";

                    let convertDay = i * 8 + 4;

                    var finalDate = document.createElement('h4');
                    const forecastDate = new Date(data.list[convertDay].dt_txt);
                    const forecastDay = forecastDate.getDate();
                    const forecastMonth = forecastDate.getMonth() + 1;
                    const forecastYear = forecastDate.getFullYear();
                    finalDate.textContent = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    finalDate.setAttribute("class", "pt-2 text-center");

                    var forecastIcon = document.createElement('img');
                    let forecastIconImg = data.list[convertDay].weather[0].icon;
                    forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastIconImg + "@2x.png");
                    forecastIcon.setAttribute('width', 75, 'height', 75, "class", "align-items-center");

                    var forecastTemp = document.createElement('p');
                    var forecastWind = document.createElement('p');
                    var forecastHumidity = document.createElement('p');

                    forecastTemp.textContent = "Temp: " + convertTemp(data.list[convertDay].main.temp) + " ºF";
                    forecastWind.textContent = "Wind: " + data.list[convertDay].wind.speed + " mph";
                    forecastHumidity.textContent = "Humidity: " + data.list[convertDay].main.humidity + "%";

                    fivedayForecastEl[i].append(finalDate, forecastIcon, forecastTemp, forecastWind, forecastHumidity);
                }
            });
    }

    function convertTemp(k) {
        return Math.floor((k - 273) * 1.8 + 32);
    }

    searchButton.addEventListener('click', function () {
        var cityName = cityInputEl.value.trim();
        getCoordinates(cityName);

        if (!searchHistory.includes(cityName)) {
            searchHistory.push(cityName);
            localStorage.setItem("search", JSON.stringify(searchHistory));
        }
        displayHistory();
    })

    clearHistoryBtn.addEventListener("click", function () {
        localStorage.clear();
        displayHistory(searchHistory = []);
    })

    function displayHistory() {
        searchHistoryEl.textContent = "";

        for (i = 0; i < searchHistory.length; i++) {
            let historyEl = document.createElement("input");

            historyEl.setAttribute("type", "text");
            historyEl.setAttribute("readonly", true);
            historyEl.setAttribute("class", "form-control d-block bg-white my-2");
            historyEl.setAttribute("value", searchHistory[i]);

            historyEl.addEventListener("click", function () {
                getCoordinates(historyEl.value);
            })

            searchHistoryEl.append(historyEl);
        }
    }
}

weatherForecast();
