import express from 'express'
import { generateQRCode } from '../controllers/qrCodeController'

const router = express.Router()

export default router.post('/generate', generateQRCode)
