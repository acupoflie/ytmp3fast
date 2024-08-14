const express = require('express')
const convertController = require('../controllers/convertController')

const router = express.Router()

router.route('/').get(convertController.convert)

module.exports=router