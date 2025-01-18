function catchErrors(err, req, res, next) {
    let errorInfo = {}
    if(err.data) {
        errorInfo = {
            msgErr: err,
            errorData: err.data,
            flag: err.dirNumber,
        }

    } else {
        errorInfo = {
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