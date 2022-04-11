// Global Variables 
var apiKey = "d68f0c0e0b753d63f2e0524f28465816";
var cities = [];
var today = moment().format('L');




// Dashboard with form inputs
    // Can enter CITIES to get the weather 

// WEATHER FORECAST
    // CURRENT WEATHER: city name, date, icon of weather conditions, temperature, humidity, wind speed, UV index 
        function currentWeather (city) {
            var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';

            $.ajax ({
                url: queryURL,
                method: "GET"
            })
            .then(function(cityResponse) {
                console.log(cityResponse);

                $("#currentWeather").css("display", "block");
                $("cityDetails").empty();

                var iconCode = cityResponse.weather[0].icon;
                var iconURL = 'https://openweathermap.org/img/w/${iconCode}.png';
            })
        }
    
    
         // UV index: color-coded for favorable, moderate, severe 
    // FUTURE WEATHER: 5-day forecast--> date, icon of weather, temperature, humidity

// Click on city from search history--> can see the search history again
    // Use localStorage