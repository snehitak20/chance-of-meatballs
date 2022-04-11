// Global Variables 
var apiKey = "d68f0c0e0b753d63f2e0524f28465816";
var cities = [];
var today = moment().format('L');




// Dashboard with form inputs
    // Can enter CITIES to get the weather 

// WEATHER FORECAST
    // CURRENT WEATHER: city name, date, icon of weather conditions, temperature, humidity, wind speed, UV index 
        function currentWeather (city) {
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}";

            $.ajax ({
                url: queryURL,
                method: "GET"
            })
            .then(function(cityResponse) {
                console.log(cityResponse);

                $("#currentWeather").css("display", "block");
                $("cityDetail").empty();

                var iconCode = cityResponse.weather[0].icon;
                var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

                var currentCity = $(
                    `<h2 id="currentCity"> ${cityResponse.name} ${today} <img src="${iconURL}" alt="${cityResponse.weather[0].description}" /></h2>
                     <p>Temperature: ${cityResponse.main.temp} °F</p>
                     <p>Humidity: ${cityResponse.main.humidity}\%</p>
                     <p>Wind Speed: ${cityResponse.wind.speed} MPH</p>
                    `);

                $("#cityDetail").append(currentCity);

                // UV index: color-coded for favorable, moderate, severe 
                var lat = cityResponse.coord.lat;
                var lon = cityResponse.coord.lon;
                var uvIQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}";

                $.ajax({
                    url: uvIQueryURL,
                    method: "GET"
                })
                .then(function(uvIResponse){
                    console.log(uvIResponse);

                    var uvIndex = uvIResponse.value;
                    var uvIndexp = $(`<p>UV Index: <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span></p>`);

                    $("#cityDetail").append(uvIndexp);

                    if (uvIndex >= 0 && uvIndex <= 2) {
                        $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
                    }
                    else if (uvIndex >= 3 && uvIndex <= 5) {
                        $("#uvIndexColor").css("background-color", "#FFF300");
                    }
                    else if (uvIndex >= 6 && uvIndex <= 7) {
                        $("#uvIndexColor").css("background-color", "#F18B00");
                    }
                    else if (uvIndex >= 8 && uvIndex <= 10) {
                        $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
                    } else {
                        $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white"); 
                    };
                }); 
            });
        }
    
    
      
    // FUTURE WEATHER: 5-day forecast--> date, icon of weather, temperature, humidity

// Click on city from search history--> can see the search history again
    // Use localStorage