(function() {
    'use strict';

    angular
        .module('app')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = ['$http', '$q', 'keys'];

    /* @ngInject */
    function weatherFactory($http, $q, keys) {
        var apiKey = keys.weather;
        var baseURL = "http://api.openweathermap.org/data/2.5/weather";

        var service = {
            getWeather: getWeather
        };

        return service;

        function getWeather(city) {
            var query = '?q=' + city + '&appid=' + apiKey + '&units=imperial';
            var requestURL = baseURL + query;

            var defer = $q.defer();

            $http({
              method: 'GET',
              url: requestURL
            }).then(function(response) {

                if (response.data.cod == "404") {
                    defer.reject("Could not find city!");
                } else if (response.data.cod != "200") {
                    defer.reject("Could not retrieve data.");
                }

                defer.resolve(response.data);
              }, function(response) {
                defer.reject("Could not connect to server.");
              }
            );

            return defer.promise;
        }

    }

})();
