const express = require('express')
const convertController = require('../controllers/convertController')

const router = express.Router()

router.route('/:id').get(convertController.convert)

module.exports=router