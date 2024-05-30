const errorMsg = require("../utils/errorMsgToUser.js")

const ContainerUsers = require('../daos/usuarios/UsuariosDaoFactory.js')
const containerUser = ContainerUsers.getDaoUsers()

function errorInformation(error, dirNumber, errorMsgs){
    const errorInfo = {
        errorFunction: errorMsg(error).functionName,
        errorFilePath: errorMsg(error).filePath,
        msgErr: error.message,
        user: errorMsg(error).usuario,
        status: false,
        flag: dirNumber
    }
    return errorInfo
}

catchError = async (error, res, next) => { 

    const errorMsgs = `Ya existe un Usuario con este # de Legajo o # Legajo inválido!!`
    let dirNumber = 400
    let errorInfo = errorInformation(error, dirNumber, errorMsgs)

    return res.status(dirNumber).render('errorPages', {
        error,
        errorInfo
    })
}

module.exports = {
    catchError
}