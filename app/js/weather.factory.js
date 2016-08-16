(function() {
    'use strict';

    angular
        .module('app')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function weatherFactory($http, $q) {
        var apiKey = "c13a0d41d0cf164d3fda182b7265864c";
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
