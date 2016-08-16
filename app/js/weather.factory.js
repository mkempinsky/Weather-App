(function() {
    'use strict';

    angular
        .module('app')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = ['$http'];

    /* @ngInject */
    function weatherFactory($http) {
        var apiKey = "c13a0d41d0cf164d3fda182b7265864c";
        var baseURL = "http://api.openweathermap.org/data/2.5/weather";

        var service = {
            getWeather: getWeather
        };

        return service;

        function getWeather(city) {
            var query = '?q=' + city + '&appid=' + apiKey + '&units=imperial';
            var requestURL = baseURL + query;
            return $http({
              method: 'GET',
              url: requestURL
            }).then(function(response) {
                return response.data;
              }, function(response) {
                return "Could not connect to server.";
              });
        }

    }

})();
