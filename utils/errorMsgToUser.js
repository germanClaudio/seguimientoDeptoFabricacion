function getErrorLineNumber(error) {
    
    if (error.route) {
        const functionName = error.route.stack[2].name
        const filePath = error.originalUrl
        const errorMsg = error.message
        const usuario = error.res.locals.username
        
        return {
            functionName,
            filePath,
            errorMsg,
            usuario
        }

    } else {
        return null;
    }
    
}

module.exports = 
    getErrorLineNumber