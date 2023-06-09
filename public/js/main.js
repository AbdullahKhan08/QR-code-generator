function displayErrorMessage(message) {
  const errorMessageContainer = document.getElementById('error-message')
  errorMessageContainer.textContent = message
  errorMessageContainer.style.display = 'block'

  errorMessageContainer.classList.add('error-message')
}
function displaySuccessMessage(message) {
  const successMessageContainer = document.getElementById('success-message')
  successMessageContainer.textContent = message

  successMessageContainer.style.display = 'block'
  successMessageContainer.classList.add('success-message')
}

function hideErrorMessage() {
  const errorMessageContainer = document.getElementById('error-message')
  errorMessageContainer.style.display = 'none'
}
function hidesuccessMessage() {
  const successMessageContainer = document.getElementById('success-message')
  successMessageContainer.style.display = 'none'
}

function removeCopyBtn() {
  const copyButton = document.getElementById('copyButton')
  const downloadButton = document.getElementById('downloadButton')
  if (copyButton) {
    copyButton.remove()
  }
  if (downloadButton) {
    downloadButton.remove()
  }
}

document.getElementById('resetBtn').addEventListener('click', () => {
  const qrCodeContainer = document.getElementById('qrCodeContainer')
  qrCodeContainer.innerHTML = ''
  removeCopyBtn()
  hidesuccessMessage()
  hideErrorMessage()
})

document.getElementById('qrCodeForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const qrCodeContainer = document.getElementById('qrCodeContainer')
  qrCodeContainer.innerHTML = ''
  hidesuccessMessage()
  hideErrorMessage()
  removeCopyBtn()

  const text = document.getElementById('text').value.trim()

  if (text === '') {
    displayErrorMessage('Please enter text for the QR code!')
    return
  }

  hideErrorMessage()

  try {
    const response = await fetch('/api/qrCode/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (response.ok) {
      const blob = await response.blob()
      const qrCodeUrl = URL.createObjectURL(blob)

      displayQRCode(qrCodeUrl)
    } else {
      const data = await response.json()
      console.error('QR code generation failed:', data.message)
      displayErrorMessage('QR code generation failed. Please try again later!')
    }
  } catch (error) {
    console.error('QR code generation failed:', error)
    displayErrorMessage('QR code generation failed. Please try again later!')
  }
})

// displaying qr code
function displayQRCode(url) {
  const qrCodeContainer = document.getElementById('qrCodeContainer')
  qrCodeContainer.innerHTML = ''
  const textInput = document.getElementById('text')
  const qrCodeImage = document.createElement('img')
  qrCodeImage.id = 'qrCodeImg'
  qrCodeImage.src = url
  qrCodeContainer.appendChild(qrCodeImage)
  textInput.value = ''

  displaySuccessMessage('QR code generated successfully!')

  const copyButton = document.createElement('button')
  const dynamicButtons = document.getElementById('dynamic-buttons')
  copyButton.id = 'copyButton'
  copyButton.textContent = 'Copy QR Code'
  copyButton.addEventListener('click', copyQRCode)

  dynamicButtons.appendChild(copyButton)
  copyButton.classList.add('copyBtn')

  const downloadLink = document.createElement('a')
  const downloadButton = document.createElement('button')

  downloadLink.id = 'downloadButton'
  downloadButton.id = 'downloadButton'
  downloadLink.textContent = 'Download QR Code'
  downloadLink.href = url
  downloadLink.download = 'qrcode.png'
  downloadLink.classList.add('visible')
  downloadButton.appendChild(downloadLink)
  dynamicButtons.appendChild(downloadButton)
  downloadButton.classList.add('downloadBtn')

  setTimeout(hidesuccessMessage, 4000)
}

downloadButton.addEventListener('click', () => {
  displaySuccessMessage('QR code downloaded successfully!')
  setTimeout(hidesuccessMessage, 4000)
})

// QR code copying functionality

function copyQRCode() {
  const qrCodeImage = document.getElementById('qrCodeImg')

  // Create a temporary canvas element
  const tempCanvas = document.createElement('canvas')
  const tempContext = tempCanvas.getContext('2d')

  // Set the canvas size to match the image size
  tempCanvas.width = qrCodeImage.width
  tempCanvas.height = qrCodeImage.height

  // Draw the image on the canvas
  tempContext.drawImage(qrCodeImage, 0, 0)

  // Copy the canvas data to clipboard
  tempCanvas.toBlob((blob) => {
    const item = new ClipboardItem({ 'image/png': blob })

    navigator.clipboard
      .write([item])
      .then(() => {
        // Show a success message

        displaySuccessMessage('QR code copied to clipboard!')
        setTimeout(hidesuccessMessage, 4000)
      })
      .catch((error) => {
        console.error('Copying to clipboard failed:', error)
        displayErrorMessage('Copying to clipboard failed!')
      })
  }, 'image/png')
}
