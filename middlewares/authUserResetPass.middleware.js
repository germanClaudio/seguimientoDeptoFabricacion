const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_PRIVATE_KEY; // Clave secreta

// Middleware para verificar el token
function ensureAuthenticated(req, res, next) {
  const token = req.query.token //req.headers['authorization'];
  //console.log('req.query: ', req.query)
  //console.log('req.headers[authorization]: ', req.headers['authorization'])

  if (!token) {
    // return res.status(401).json('Usuario no autorizado'); //errorPages
    const flag = {
      dirNumber: 401
    }
    return res.render('errorPages', {
      flag
    }) 
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Almacena la información del usuario en el objeto de solicitud
    next();

  } catch (error) {
    // res.status(400).json('Token inválido');
    const flag = {
      dirNumber: 498
    }
    return res.render('errorPages', {
      flag
    })   
  }
}

module.exports = { 
    ensureAuthenticated
}