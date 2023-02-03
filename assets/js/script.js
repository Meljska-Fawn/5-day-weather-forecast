// container below search where city names are displayed
let cityContainer = document.getElementById('city-names');
// search button
let searchButton = document.getElementById('search-button');
let cityInputEl = document.querySelector('#city-input');
let currentWeatherEl = document.getElementById('current-weather');
let headerEl = document.getElementById('fiveday-header');
let searchHistoryEl = document.getElementById('search-history');

var APIKey = "af6fe5609e13717cb920c672710093bd";


function weatherForecast() {

    function getCoordinates() {
        var cityName = cityInputEl.value.trim();
        var requestCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + APIKey;

        fetch(requestCity)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)

                let lat = data[0].lat;
                console.log(lat);
                let lon = data[0].lon;
                console.log(lon);

                getWeather(lat, lon);

            });
    }

    function getWeather(lat, lon) {

        currentWeatherEl.classList.remove("d-none");
        headerEl.classList.remove("d-none");


        var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&limit=5&appid=' + APIKey;

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                var cityName = document.createElement('h3');
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
                icon.setAttribute('width', 100);
                icon.setAttribute('height', 100);

                temp.textContent = "Temp: " + convertTemp(data.list[0].main.temp) + " ºF";
                wind.textContent = "Wind: " + data.list[0].wind.speed + " mph";
                humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";


                currentWeatherEl.append(cityName);
                currentWeatherEl.append(date);
                currentWeatherEl.append(icon);
                currentWeatherEl.append(temp);
                currentWeatherEl.append(wind);
                currentWeatherEl.append(humidity);
            });
    }

    function convertTemp(k) {
        return Math.floor((k - 273) * 1.8 + 32);
    }

    searchButton.addEventListener('click', getCoordinates);
}

weatherForecast();
