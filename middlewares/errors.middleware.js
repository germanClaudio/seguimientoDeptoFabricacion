function catchErrors(err, req, res, next) {

    if(err.data) {
        var errorInfo = {
            msgErr: err,
            errorData: err.data,
            flag: err.dirNumber,
        }
    } else {
        var errorInfo = {
            msgErr: err,
            flag: err.dirNumber,
        }
    }
    
    return res.render('errorPages', {
        err,
        errorInfo
    })
}

module.exports = catchErrors