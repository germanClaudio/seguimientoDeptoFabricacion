const date = require('date-and-time')

function formatDateInvoice() {
    const dayNow = new Date(),
      rightNow = date.format(dayNow, 'DD-MM-YYYY_HH-mm-ss')
    return rightNow.toString()
  }

module.exports = 
  formatDateInvoice