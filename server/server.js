const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')

const server = app.listen(process.env.PORT, () => {
    console.log('server has started')
})