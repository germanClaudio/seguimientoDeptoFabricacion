const errorMsg = require("./errorMsgToUser.js")

function catchError500(error, res) {
    const dirNumber = 500
    let errorInfo = errorInformation(dirNumber)
    
    return res.render('errorPages', {
        error,
        errorInfo
    })
}

function catchError400(error, res) {
    const dirNumber = 400
    let errorInfo = errorInformation(dirNumber)
    
    return res.render('errorPages', {
        error,
        errorInfo
    })
}

function catchError403(error, res) {
    const dirNumber = 400
    let errorInfo = errorInformation(dirNumber)
    
    return res.render('errorPages', {
        error,
        errorInfo
    })
}

function catchError404(error, res) {
    const dirNumber = 404
    let errorInfo = errorInformation(dirNumber)
    
    return res.render('errorPages', {
        error,
        errorInfo
    })
}


function errorInformation(dirNumber){
    const errorInfo = {
        errorNumber: errorMsg.lineNumber,
        errorFunction: errorMsg.functionName,
        errorFilePath: errorMsg.filePath,
        status: false,
        msg: 'controllerError',
        flag: dirNumber
    }
    return errorInfo
}

module.exports = {
    catchError500,
    catchError400,
    catchError403,
    catchError404
}