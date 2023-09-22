module.exports = (err, req, res, next) => {

    console.log(err);

    if (err.name === 'ValidationError') {
        // validation error
        return res.status(403).json({
            "success" : false,
            "error" : err.message.replace(/\\/g, '').replace(/"/g, '')
        })
    }

    if(err.name === 'Not Found'){
        // Data not found error
        return res.status(404).json({
            "success" : false,
            "error" : err.message
        });
    }

    return res.status(500).json({
        // default to 500 server error;
        "success" : false,
        "error" : "Internal Server Error"
    });
}

