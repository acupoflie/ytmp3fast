const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')
const mysql = require('mysql2')

const server = app.listen(process.env.PORT, () => {
    console.log('server has started')
})

const db = mysql.createConnection({
    host: "sql110.ezyro.com",
    user: "ezyro_37100528",
    password: "a04e56b9ac1",
    database: "ezyro_37100528_songs",
    port: "3306"
}).promise()

