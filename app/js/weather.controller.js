(function() {
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['weatherFactory', 'toastr'];

    /* @ngInject */
    function WeatherController(weatherFactory, toastr) {
        var vm = this;
        vm.cityInfo = {};
        vm.weatherInfo = [];
        vm.getWeather = getWeather;
        vm.searchCity = searchCity;
        vm.inputCity = "";
        vm.searchHistory = [];
        vm.topCities = ["San Diego", "New York", "Washington D.C.", "London", "Tokyo"];



        activate();

        function activate() {
            getWeather("San Diego");
        }

        function getWeather(city) {
            weatherFactory.getWeather(city).then(
                function(data){
                    // update cityInfo array
                    vm.cityInfo = {
                        city : data.name,
                        weather: data.weather[0].description,
                        iconUrl: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                        coordinates : "Coordinates: " + data.coord.lat + ", " + data.coord.lon
                    };

                    // update weatherInfo array
                    var main = data.main;
                    vm.weatherInfo = [
                        {label: "Temperature", value: main.temp + " F"},
                        {label: "Humidity", value: main.humidity + "%"},
                        {label: "Pressure", value: main.pressure},
                        {label: "Low Temperature", value: main.temp_max + " F"},
                        {label: "High Temperature", value: main.temp_min + " F"},
                        {label: "Wind Speed", value: data.wind.speed + " mph"},
                    ];

                    vm.searchHistory.push({
                        city : data.name,
                        time : Date.now()
                    });

                }, function(errorMsg) {
                    toastr.error(errorMsg, "Error");
                }
            );
        }

        function searchCity() {
            //TODO: add validation
            getWeather(vm.inputCity);
            vm.inputCity = "";
        }

    }
})();
