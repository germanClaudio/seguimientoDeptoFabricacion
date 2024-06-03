function catchErrors(err, req, res, next) {
    console.log('..catchError: ', err)
    let errorInfo = errorInformation(err.dirNumber)
    
    return res.render('errorPages', {
        err,
        errorInfo
    })
}
                
function errorInformation(dirNumber, error){
    const errorInfo = {
        msgErr: error,
        flag: dirNumber
    }
    return errorInfo
}

module.exports = catchErrors