const { climateChange } = require('../controllers/weather');
const models = require('../models');
module.exports = {
    saveWeather : async (weatherData) => {
        return await models.weather.create(weatherData);
    },
    getAllWeathers : async () => {
        return await models.weather.findAll();
    },
    getWeatherByArea : async(area_code) => {
        return await models.weather.findAll({ where : {area_code}});
    },
    getWeatherByAreaAndClimate : async(area_code, climate) => {
        return await models.weather.findAll({ where : {area_code, climate}});
    }
}