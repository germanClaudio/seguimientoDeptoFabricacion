const { Router } = require('express')

const routerCookies = Router()

routerCookies.get('/', (req, res) => {
    // let cookieVal = null;

    // if (req.cookies['nombre']) {
    //     // check the new style cookie first
    //     cookieVal = req.cookies['nombre']
    // } else if (req.cookies['nombre-legacy']) {
    //     // otherwise fall back to the legacy cookie
    //     cookieVal = req.cookies['nombre-legacy']
    // }

    const { signedCookies } =  req     // cookies 
    // console.log(req.cookies)
    res.status(200).json({signedCookies})
    // res.end()
})


routerCookies.get('/set', (req, res) => {
    const { cookies } =  req
    res.cookie('nombre','German', { signed: true }, { sameSite: 'none', secure: true })
    // console.log(req.cookies)
    // res.cookie('nombre-legacy', 'German', { secure: true })
    res.status(200).json({
        message: 'Cookie seteada',
        succes: true
    })
    // res.end()
})

routerCookies.get('/setEx', (req, res) => {
    const { cookies } =  req
    res.cookie('apellido','Montalbetti', { 
        // signed: true,
        maxAge: 30000 
    })
    // console.log(req.cookies)
    res.status(200).json({
        message: 'Cookie seteada',
        succes: true
    })
})

routerCookies.get('/borrar', (req, res) => {
    const { cookies } =  req
    res.clearCookie('nombre')
    // console.log(req.cookies)
    res.status(200).json({
        message: 'Cookie borrada',
        succes: true
    })
})

module.exports = routerCookies