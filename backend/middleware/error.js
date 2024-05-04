const ErrorHander = require('../utils/ErrorHander')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    //Wrong Mongodb Id
    if (err.name === 'CastError') {
        const message = `Resource not found. Inavalid ${err.path}`
        err = new ErrorHander(message, 400)
    }

    //Duplicate Mongo Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} error`
        err = new ErrorHander(message, 400)
    }

    //Error Jwt
    if (err.name === 'JsonWebTokenError') {
        const message = 'Json web token is Invalid, Try again'
        err = new ErrorHander(message, 400)
    }

    //Jwt Expire error
    if (err.name === 'TokenExpiredError') {
        const message = 'Json web token is Expired, Try again'
        err = new ErrorHander(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}