const ContainerUsers = require('../daos/usuarios/UsuariosDaoFactory.js')
const containerUser = ContainerUsers.getDaoUsers()

const checkAuthentication = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/api/auth/login")
    }

    if (req.params.userName) {
        res.locals.userInfo = await containerUser.getUserByUsername(req.params.userName)
        res.locals.username = res.locals.userInfo.username
        next();
        
    } else {
        res.locals.username = req.session.username
        res.locals.userInfo = await containerUser.getUserByUsername(res.locals.username) || await containerUser.getUserByUsername(req.session.username)
        next();
    }
}

module.exports = {
    checkAuthentication
}