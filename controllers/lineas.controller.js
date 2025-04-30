const LineasService = require("../services/lineas.service.js"),
    {catchError400_5, catchError500 } = require('../utils/catchErrors.js')

class LineasController {  
    constructor(){
        this.lineas = new LineasService()
    }

    getAllFunciones = async (req, res, next) => {
        try {
            const funciones = await this.lineas.getAllFunciones()
            !funciones ? catchError400_5(req, res, next) : null
            res.send(funciones)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }
}

module.exports = { LineasController }