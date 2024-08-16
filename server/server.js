const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')
const mysql = require('mysql2')

const server = app.listen(process.env.PORT, () => {
    console.log('server has started')
})
