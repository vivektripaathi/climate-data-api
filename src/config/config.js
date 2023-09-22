const sequelize  = require('../models').sequelize;

sequelize
    .authenticate()
    .then(() => console.log('Connected to Database'))
    .catch( error => console.log(`Unable to connect to database : ${error}`))

sequelize
    .sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(error => console.log(`Error synchronizing database: ${error}`));

module.exports = sequelize;