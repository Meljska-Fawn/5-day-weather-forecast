// container below search where city names are displayed
var cityContainer = document.getElementById('city-names');
// search button
var fetchButton = document.getElementById('fetch-button');
var APIKey = "af6fe5609e13717cb920c672710093bd";

function getCityname() {
    let cityInputEl = document.querySelector('#city-input');
    var cityName = cityInputEl.value.trim();
    //   var userCity = user input  
    var requestCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + APIKey;

    fetch(requestCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            for (var i = 0; i < data.length; i++) {
                var createTableRow = document.createElement('tr');
                var tableData = document.createElement('td');
                var button = document.createElement('button');

                button.textContent = data[i].name;

                lat = data[i].lat;
                console.log(lat);
                lon = data[i].lon;
                console.log(lon);

                tableData.appendChild(button);
                createTableRow.appendChild(tableData);
                cityContainer.appendChild(createTableRow);
            }
        });

    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&limit=5&appid=' + APIKey;

    fetch(requestUrl)
        .then(function (response) {
                return response.json();
        })
        .then(function (data) {
        console.log(data);
    });

}

fetchButton.addEventListener('click', getCityname);
// today's date
// var today = dayjs();
// $('#date').text(today.format('MMM D, YYYY'));

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
// fetchButton.addEventListener('click', getApi);
// fetchButton.addEventListener('submit', formSubmitHandler);