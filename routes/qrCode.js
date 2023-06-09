const express = require('express')
const qrCodeController = require('../controllers/qrCodeController')

const router = express.Router()

router.post('/generate', qrCodeController.generateQRCode)

module.exports = router
