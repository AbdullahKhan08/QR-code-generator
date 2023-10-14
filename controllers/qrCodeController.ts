import qrcode from 'qrcode'

export const generateQRCode = async (req: any, res: any) => {
  try {
    const text = req.body.text

    if (!text || text.trim() === '') {
      return res
        .status(400)
        .json({ success: false, message: 'QR code text is required' })
    }

    const qrCodeOptions = {
      width: 300, // Specify the width and height of the generated QR code image
      height: 300,
    }

    const qrCodeBuffer = await qrcode.toBuffer(text, qrCodeOptions)

    res.set('Content-Type', 'image/png')
    res.send(qrCodeBuffer)
  } catch (error) {
    console.error('Error generating QR code:', error)
    res
      .status(500)
      .json({ success: false, message: 'Failed to generate QR code' })
  }
}
