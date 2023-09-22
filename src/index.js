const express = require('express');
const app = express();
const router = express.Router();
const errorHandler = require('./helpers/error-handler')

require('./config/config')

// Middleware
app.use(express.json());

// Routes
require('./routes')(router);
app.use('/api', router);

// Error Handler
app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
});

app.listen(3000, ()=>{
    console.log('PORT : 3000')
});