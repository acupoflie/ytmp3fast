// CORE MODULES
const express = require('express')
const app = express()

app.use(express.json())

// FOR HANDLING ERRORS
const globalErrorHandler = require('./controllers/errorController')
const CustomError = require('./utils/CustomError')

// ROUTERS
const convertRouter = require('./routers/convertRouter')

app.use('/api', convertRouter)

// USING ERROR HANDLERS
app.use('*', (req, res, next) => {
    next(new CustomError('Requested to invalid link', 404))
})
app.use(globalErrorHandler)

module.exports=app