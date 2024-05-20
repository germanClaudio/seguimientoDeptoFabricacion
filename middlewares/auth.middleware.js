const authMiddleware = (req, res, next) => {
    //console.log('req.session?.admin:', req.session?.admin)
    const flag = true
    if (!req.session?.username || !req.session?.admin) {
        
        return res.render('index', { userInfo, username, visits, flag })
    } 
    next();
}

module.exports = { 
    authMiddleware
}