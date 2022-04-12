// Global Variables 
var cityInputEl = document.getElementById("city-input");
var cityFormEl = document.getElementById("city-form");
var searchEl = document.getElementById("search-button");
var searchHistoryEl = document.getElementById("current-container");
var forecastContainerEl = document.getElementById("forecast-container");

var keyAPI = "d68f0c0e0b753d63f2e0524f28465816";
var cities = [];






// Dashboard with form inputs
    // Can enter CITIES to get the weather 
    var loadCities = function(){
        var citiesLoad = localStorage.getItem("cities");
        if(!citiesLoad) {
            return false;
        }

        citiesLoad = JSON.parse(citiesLoad);
        for (var i = 0; i < citiesLoad.length; i++) {
            displaySearchCities(citiesLoad[i])
            cities.push(citiesLoad[i])
        }
    }

    var savedCities = function(){
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    var displaySearchedCities = function(city) {
        var cityCardEl = document.createElement("div");
        cityCardEl.setAttribute("class", "card");
        var cityCardNameEl = document.createElement("div");
        cityCardNameEl.setAttribute("class", "card-body searched-city");
        cityCardNameEl.textContent = city;
        
        cityCardEl.appendChild(cityCardNameEl)
    
        cityCardEl.addEventListener("click", function () {
            getCityData(city)
        });
    
        searchHistoryEl.appendChild(cityCardEl)
    
    }
    

// WEATHER FORECAST
    // CURRENT WEATHER: city name, date, icon of weather conditions, temperature, humidity, wind speed, UV index
    var currentData = function(city, data) {
        var currentTemp = Math.round(data.current.temp);
        var humidity = Math.round(data.current.humidity);
        var windSpeed = data.current.wind_speed;
        var uvIndex = data.current.uvi;
        var iconCurrent = data.current.weather[0].icon;

        currentContainerEl.textContent = ""
        currentContainerEl.setAttribute("class", "m-3 border col-10 text-center")
        var divCityHeader = document.createElement("div")
        var headerCityDate = document.createElement("h2");
        var currentdate = moment().format("L");
        var imageIcon = document.createElement("img");
        imageIcon.setAttribute('src', "") 
        imageIcon.setAttribute('src', "https://openweathermap.org/img/wn/" + iconCurrent + "@2x.png")
        headerCityDate.textContent = city + "   (" + currentdate + ")";

        divCityHeader.appendChild(headerCityDate)
        divCityHeader.appendChild(imageIcon)
        currentContainerEl.appendChild(divCityHeader)

        var divCurrent = document.createElement("div")
        var tempEl = document.createElement("p");
        var humidityEl = document.createElement("p");
        var windSpeedEl = document.createElement("p");
        var uvIndexEl = document.createElement ("p");
        var uvIndexColorEl = document.createElement("span")
        uvIndexColorEl.textContent = uvIndex
            if (uvIndex <= 4) {
                uvIndexColorEl.setAttribute("class", "bg-success text-white p-2")
            } else if (uvIndex <= 8) {
                uvIndexColorEl.setAttribute("class","bg-warning text-black p-2")
            } else {
                uvIndexColorEl.setAttribute("class", "bg-danger text-white p-2")
            }
    

        tempEl.textContent = "Temperature: " + currentTemp + "°F";
        humidityEl.textContent = "Humidity: " + humidity + "%";
        windSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";
        uvIndexEl.textContent = "UV Index: ";

        uvIndexEl.appendChild(uvIndexColorEl)

        //append elements to section
        divCurrent.appendChild(tempEl);
        divCurrent.appendChild(humidityEl);
        divCurrent.appendChild(windSpeedEl);
        divCurrent.appendChild(uvIndexEl);

        currentContainerEl.appendChild(divCurrent);
    };

    var displayForecastData = function(data) {
        console.log(data)
        //input header and clear data - header is outside main forecast container 
        forecastContainerEl.textContent = "";
        var forecastHeaderEl = document.getElementById("five-day");
        forecastHeaderEl.textContent = "5-Day Forecast:"
    
        //for loop for five day forecast
        for (var i=1; i < 6; i++) {
            var tempForecast = Math.round(data.daily[i].temp.day);
            var humidityForecast = data.daily[i].humidity;
            var iconForecast = data.daily[i].weather[0].icon;
        
        //create card elements and data elements for weather data
        var cardEl = document.createElement("div");
        cardEl.setAttribute("class","card col-xl-2 col-md-5 col-sm-10 mx-3 my-2 bg-primary text-white text-center");

        var cardBodyEl = document.createElement("div");
        cardBodyEl.setAttribute("class","card-body");

        var cardDateEl = document.createElement("h6");
        cardDateEl.textContent = moment().add(i, 'days').format("L");

        var cardIconEl = document.createElement("img");
        cardIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + iconForecast + "@2x.png")

        var cardTempEl = document.createElement("p");
        cardTempEl.setAttribute("class", "card-text");
        cardTempEl.textContent = "Temperature:  " + tempForecast + "°F";

        var cardHumidEl = document.createElement("p")
        cardHumidEl.setAttribute("class", "card-text");
        cardHumidEl.textContent = "Humidity:  " + humidityForecast + "%";
    
        //append children to card body
        cardBodyEl.appendChild(cardDateEl)
        cardBodyEl.appendChild(cardIconEl)
        cardBodyEl.appendChild(cardTempEl)
        cardBodyEl.appendChild(cardHumidEl)
    
        //append body to card and then container element
        cardEl.appendChild(cardBodyEl);
        forecastContainerEl.appendChild(cardEl);
    
        //reset form after data displays
        cityFormEl.reset()

    }
};
    



    // FUTURE WEATHER: 5-day forecast--> date, icon of weather, temperature, humidity
    

// Click on city from search history--> can see the search history again
    // Use localStorage

     