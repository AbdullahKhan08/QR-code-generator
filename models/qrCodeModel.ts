import mongoose from 'mongoose'

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

export const QRCode = mongoose.model('QRCode', qrCodeSchema)
