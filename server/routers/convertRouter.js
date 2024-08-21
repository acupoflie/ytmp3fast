const express = require('express')
const convertController = require('../controllers/convertController')

const router = express.Router()

router.route('/convert').post(convertController.convert)

router.route('/serve/:filename').get(convertController.serve)

module.exports=router