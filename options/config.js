const options = {
  mongoDB: {
    connection: {
      URL: process.env.MONGO_URL_CONNECT_PROD
    },
  },

  filePath: {
    path: './DB/productos.json',
    pathMsg: './DB/messages.json'
  },

  HOST: process.env.HOST || 'localhost',
}

  const sessionTime = {
    expirateTime: 10 * 60 * 1000  //10 minutes 10 * 60 * 1000
  }

  module.exports = {
    options,
    sessionTime
  }