const ContainerUsers = require('../daos/usuarios/UsuariosDaoFactory.js')
const containerUser = ContainerUsers.getDaoUsers()

const authUserMiddleware = async (req, res, next) => {
    
    res.locals.username = req.session.username
    res.locals.userInfo = await containerUser.getUserByUsername(req.session.username)
            
    let username = res.locals.username
    let userInfo = res.locals.userInfo

    if (!req.session?.username || !req.session?.admin) {
        return res.render('notAuthorizated', {
            username,
            userInfo
        })     
    } 
    next();
}


module.exports = { 
    authUserMiddleware
}