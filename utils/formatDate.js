const date = require('date-and-time')

function formatDate() {
    const dayNow = new Date()
    const rightNow = date.format(dayNow, 'DD-MM-YYYY HH:mm:ss')
    return rightNow.toString()
  }

module.exports = 
  formatDate