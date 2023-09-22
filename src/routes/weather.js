const Controllers = require('../controllers');

module.exports = (router) => {
    router.post('/weather',Controllers.weather.saveWeather);
    router.get('/weather', Controllers.weather.getAllWeathers);
    router.get('/weather/:area_code', Controllers.weather.getWeatherByArea);
    router.post('/weather/climate-change', Controllers.weather.climateChange);
}