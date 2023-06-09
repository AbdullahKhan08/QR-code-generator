const mongoose = require('mongoose')

const qrCodeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// schema into model

const QRCode = mongoose.model('QRCode', qrCodeSchema)

module.exports = QRCode
