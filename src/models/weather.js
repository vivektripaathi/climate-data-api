const models = require(".");

module.exports = (sequelize, DataTypes) => {
    const weather = sequelize.define('weather', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        climate: {
            type: DataTypes.STRING
        },
        area_code: {
            type: DataTypes.INTEGER
        },
        temperature: {
            type: DataTypes.INTEGER
        },
        humidity: {
            type: DataTypes.INTEGER
        },
        chances_of_rain: {
            type: DataTypes.INTEGER
        },
    },
    {
        timestamps: false, // Disable createdAt and updatedAt
    });
    return weather;
};
