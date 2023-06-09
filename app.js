const express = require('express')

const app = express()
const path = require('path')
const qrCodeRoutes = require('./routes/qrCode')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
require('dotenv').config()

const PORT = process.env.PORT || 3000

// middlewares

app.use(express.json())
app.use(express.static('./public'))

// routes
app.use('/api/qrCode', qrCodeRoutes)

// not found middleware
app.use(notFound)

const start = async () => {
  try {
    await connectDB('mongodb://localhost:27017/QR-code')
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
