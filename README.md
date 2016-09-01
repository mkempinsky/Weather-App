# Weather App
### Webpage to display current weather in various locations

This weather app uses [OpenWeatherMap](http://openweathermap.org/api) to get current weather information for searched cities.

### Technologies Used:
- HTML
- CSS
    + Bootstrap CSS
- Javascript
    + AngularJS
- Gulp
- [OpenWeatherMap API](http://openweathermap.org/api)


Use of OpenWeatherMap requires an API key, which the app expects to access as "keys.weather". Users can sign up for a free or paid OpenWeatherMap account [here](https://home.openweathermap.org/users/sign_up).

After cloning and supplying an API key, run `bower install`, `npm install` and then `gulp serve` to run on localhost. Serving defaults to port 8080, which is configurable in the gulpfile in the 'connect' task.
