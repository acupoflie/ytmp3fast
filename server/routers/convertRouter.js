const express = require('express')
const convertController = require('../controllers/convertController')

const router = express.Router()

router.route('/').post(convertController.convert)

module.exports=router