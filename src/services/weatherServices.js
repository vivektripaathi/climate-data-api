const dao = require('../dao');

module.exports = {
    saveWeather : async(weatherData) => {
        try {
            const weather = await dao.weatherDao.saveWeather(weatherData);
            if (weather) return { "success": true, "data" : { "id" : weather.id }}
        } catch (error) {
            return "Unable to save weather"
        }
    },

    getAllWeathers : async(weatherData) => {
        try{
            const allWeathers = await dao.weatherDao.getAllWeathers();
            if(!allWeathers.length > 0) return { name : 'Not Found', message : "No weather data available!"};
            if(allWeathers) return { "success": true, "data" : allWeathers};
        }catch (error) {
            return "Unable to get weather";
        }
    },

    getWeatherByArea: async (area_code) => {
        try{
            const weathers = await dao.weatherDao.getWeatherByArea(area_code);
            if (!weathers.length > 0) return {name : 'Not Found', message : `No weather data available for area code : ${area_code}!`};
            if (weathers) return { "success": true, "data" : weathers}
        }catch (error) {
            return `Unable to get weather for area code : ${area_code}`
        }
    },

    getWeatherByAreaAndClimate : async (area_code, climate) => {
        try {
            const weathers = await dao.weatherDao.getWeatherByAreaAndClimate(area_code, climate);
            if (!weathers.length > 0) return {name : 'Not Found', message : `No weather data available for area code : ${area_code} and climate : ${climate}!`};
            if(weathers) return { "success" : true, "data": weathers}
        }catch (error) {
            return `Unable to get weather for area code : ${area_code} and climate : ${climate}`
        }
    },

    calculateDelta : async (toWeathers, fromWeathers, field) => {
        try{
            const toClimateAvg = ( toWeathers.reduce((accumulator, weather) => accumulator + weather[field], 0) ) / toWeathers.length;
            const fromClimateAvg = ( fromWeathers.reduce((accumulator, weather) => accumulator + weather[field], 0) ) / fromWeathers.length;
            return toClimateAvg - fromClimateAvg;
        }catch (error) {
            return `Error calculating ${field}_delta`
        }
    }, 

    calculateClimateChangeIndex : async (temperature_delta, humidity_delta, rain_chances_delta) => {
        try{
            return (temperature_delta * humidity_delta) /rain_chances_delta;
        }
        catch (error){
            return "Error calculating climate_change_index";
        }
    }
}