const Joi = require('joi');

module.exports = {
    newWeather : weatherData => {
        const schema = Joi.object({
            climate : Joi.string().required().valid('hot', 'humid', 'rainy', 'cold'),
            area_code : Joi.number().min(100).max(1000).required(),
            temperature : Joi.number().required(),
            humidity : Joi.number().required(),
            chances_of_rain : Joi.number().required()
        });
        return schema.validate(weatherData);
    },
    climateChange : requestObj => {
        const customValidation = (value, helpers) => {
            // Custom validator for validating to climate
            if(!['hot', 'humid', 'rainy', 'cold'].includes(value)) return helpers.error('any.only');
            return requestObj;
        }
        const schema = Joi.object({
            from_climate : Joi.string().required().valid('hot', 'humid', 'rainy', 'cold'),
            to_climate : Joi.string().required().invalid(Joi.ref('from_climate')).custom(customValidation, 'customValidation').messages({ 
                'any.only' : "to_climate must be one of [hot, humid, rainy, cold]" , 
                'any.invalid' : 'from_climate and to_climate must not be same',
            }),
            area_code : Joi.number().min(100).max(1000).required()
        });
        return schema.validate(requestObj);
    }
}
