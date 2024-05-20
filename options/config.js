const options = {
    mysql1: {
    client: 'mysql1',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'products'
    }
  },

  mysql: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'c2221765_planIng',
      password : '35Fibawese',
      database : 'c2221765_planIng'
    }
  },

  
  // mongoDB: {
  //   connection: {
  //     URL: "mongodb+srv://germanClaudio:germanclaudio@cluster0.oqkw9q9.mongodb.net/ecommerce?retryWrites=true&w=majority", //mongodb://localhost:27017/ecommerce  127.0.0.1   mongodb+srv://germanClaudio:<password>@cluster0.oqkw9q9.mongodb.net/?retryWrites=true&w=majority
  //   },
  // },

  mongoDB: {
    connection: {
      URL: "mongodb+srv://gmontalbetti:4lq4hbqcuub9ti0f@cluster-prodismoing.esbs6pe.mongodb.net/"
    },
  },

  filePath: {
    path: './DB/productos.json',
    pathMsg: './DB/messages.json'
  },

  // sqlite: {
  //   client: 'sqlite3',
  //   connection: {
  //   filePath: './DB/messages.json'
  //   },
  //   useNullAsDefault: true
  // },
  
  HOST: process.env.HOST || 'localhost',
}

  const sessionTime = {
    expirateTime: 10 * 60 * 1000  //10 minutes 10 * 60 * 1000
  }

  module.exports = {
    options,
    sessionTime
  }