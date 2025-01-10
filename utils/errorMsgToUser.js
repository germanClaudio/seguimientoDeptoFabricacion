function getErrorLineNumber(error) {
    
    if (error.route) {
        const functionName = error.route.stack[2].name,
            filePath = error.originalUrl,
            errorMsg = error.message,
            usuario = error.res.locals.username
        
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