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

// WEATHER FORECAST
    // CURRENT WEATHER: city name, date, icon of weather conditions, temperature, humidity, wind speed, UV index 
        

    // FUTURE WEATHER: 5-day forecast--> date, icon of weather, temperature, humidity
    

// Click on city from search history--> can see the search history again
    // Use localStorage

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
    