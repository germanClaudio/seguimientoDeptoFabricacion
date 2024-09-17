async function switchFilterTools(filter, Maquinas, designationAndCodeQuery) {
    switch (filter) {
        case 'nullAllAll': {
            var resultados = ['vacio']
        break;
        }
        case 'nullActiveAll': {
            var resultados = await Maquinas.find({
                'status': true,
            })
        break;
        }
        case 'nullInactiveAll': {
            var resultados = await Maquinas.find({
                'status': false
            })
        break;
        }
        //--------------- input w/text ----------
        case 'notNullAllAll': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery
            })
        break;
        }
        case 'notNullActiveAll': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': true }
                ]
            })
            break;
        }
        case 'notNullInactiveAll': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery
            })
            break;
        }
    }
    return resultados
}

module.exports = {
    switchFilterTools
}