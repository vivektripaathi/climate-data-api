const Services = require('../services')
const Validations = require('../validations');

module.exports = {

    saveWeather : async(req, res, next) => {
        try {
            // Validating the payload
            const { error } = await Validations.weather.newWeather(req.body);
            if (error) return next(error);

            // Saving the weather to database
            const savedWeather = await Services.weatherServices.saveWeather(req.body)
            if(savedWeather.success)res.status(200).json(savedWeather)
            else return next(savedWeather);
        } catch (error) {
            return next(error);
        }
    },

    getAllWeathers : async(req, res, next) => {
        try{
            // Fetching all weather from database
            const allWeathers = await Services.weatherServices.getAllWeathers();
            if(allWeathers.success)res.status(200).json(allWeathers);
            else return next(allWeathers);
        } catch (error) {
            return next(error);
        }
    },

    getWeatherByArea : async(req, res, next) => {
        const { area_code } = req.params;
        try{
            // Fetching weather from database by area code
            const weathers = await Services.weatherServices.getWeatherByArea(area_code);
            if(weathers.success) res.status(200).json(weathers);
            else return next(weathers);
        } catch (error) {
            return next(error);
        }
    },

    climateChange : async(req, res, next) => {
        const { from_climate, to_climate, area_code} = req.body;
        try {
            // Validating the request
            const { error } = await Validations.weather.climateChange(req.body);
            // console.log(error);
            if (error) return next(error);

            // Fetching weather data for 'From Climate'
            const fromClimateWeather = await Services.weatherServices.getWeatherByAreaAndClimate(area_code, from_climate)
            if(!fromClimateWeather.success) return next(fromClimateWeather);

            // Fetching weather data for 'From Climate'
            const toClimateWeather = await Services.weatherServices.getWeatherByAreaAndClimate(area_code, to_climate)
            if(!toClimateWeather.success) return next(toClimateWeather);

            // Calculating temperature_delta
            const temperature_delta = await Services.weatherServices.calculateDelta(toClimateWeather.data, fromClimateWeather.data, 'temperature');

            // Calculating humidity_delta
            const humidity_delta = await Services.weatherServices.calculateDelta(toClimateWeather.data, fromClimateWeather.data, 'humidity');

            // Calculating rain_chances_delta
            const rain_chances_delta = await Services.weatherServices.calculateDelta(toClimateWeather.data, fromClimateWeather.data, 'chances_of_rain');
            
            // Calculating climate_change_index
            const climate_change_index = await Services.weatherServices.calculateClimateChangeIndex(temperature_delta, humidity_delta, rain_chances_delta);

            res.json({climate_delta : `${from_climate} -> ${to_climate}` ,temperature_delta, humidity_delta, rain_chances_delta, climate_change_index});
        } catch (error) {
            return next(error);
        }
    }
}