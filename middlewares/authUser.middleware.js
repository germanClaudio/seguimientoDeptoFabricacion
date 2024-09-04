const ContainerUsers = require('../daos/usuarios/UsuariosDaoFactory.js')
const containerUser = ContainerUsers.getDaoUsers()

const authUserMiddleware = async (req, res, next) => {
    if (req.params.userName) {
        res.locals.username = req.params.userName
        res.locals.userInfo = await containerUser.getUserByUsername(req.params.userName)
        next();

    } else {
        res.locals.username = req.session.username
        res.locals.userInfo = await containerUser.getUserByUsername(req.session.username) || await containerUser.getUserByUsername(res.locals.username) 
                
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
}

module.exports = { 
    authUserMiddleware
}