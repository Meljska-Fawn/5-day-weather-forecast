// container below search where city names are displayed
let cityContainer = document.getElementById('city-names');
// search button
let searchButton = document.getElementById('search-button');
let cityInputEl = document.querySelector('#city-input');
let currentWeatherEl = document.getElementById('current-weather');
let headerEl = document.getElementById('fiveday-header');

var APIKey = "af6fe5609e13717cb920c672710093bd";


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

                cityCoordinates(lat, lon);
            }
        });

    function cityCoordinates(lat, lon) {
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
                    temp.textContent = "Temp:" + data[i].list.main.temp + " &#176F";
                    wind.textContent = "Wind:" + data[i].list.wind.speed + " mph";
                    humidity.textContent = "Humidity:" + data[i].list.main.humidity + "%";

                    console.log(data[i].city.name);
                    console.log(icon.textContent);
                    console.log(temp.textContent);
                    console.log(wind.textContent);
                    console.log(humidity.textContent);

                    currentWeatherEl.append(cityName);
                    currentWeatherEl.append(date);
                    currentWeatherEl.append(icon);
                    currentWeatherEl.append(temp);
                    currentWeatherEl.append(wind);
                    currentWeatherEl.append(humidity);
                }
            });
    }

}

searchButton.addEventListener('click', weatherForecast);
