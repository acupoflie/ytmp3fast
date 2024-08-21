const CustomError = require('../utils/CustomError')

const devError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stackTrace: err.stack,
        error: err
    })
}

const prodError = (err, res) => {
    if(err.isOperational) { 
        res.status(statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong."
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    devError(err, res)
}