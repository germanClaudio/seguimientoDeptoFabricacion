async function switchFilterConsumibles(filter, Maquinas, designationAndCodeQuery) {
    switch (filter) {
        case 'nullAllAll': {
            var resultados = ['vacio']
        break;
        }
        case 'nullAllCnc': {
            var resultados = await Maquinas.find({
                'type': 'cnc'
            })
        break;
        }
        case 'nullAllPress': {
            var resultados = await Maquinas.find({
                'type': 'prensa'
            })
        break;
        }
        case 'nullAllOther': {
            var resultados = await Maquinas.find({
                'type': 'otras'
            })
        break;
        }
        case 'nullActiveAll': {
            var resultados = await Maquinas.find({
                'status': true,
            })
        break;
        }
        case 'nullActiveCnc': {
            var resultados = await Maquinas.find({
                'status': true,
                'type': 'cnc'
            })
        break;
        }
        case 'nullActivePress': {
            var resultados = await Maquinas.find({
                'status': true,
                'type': 'prensa',
            })
        break;
        }
        case 'nullActiveOther': {
            var resultados = await Maquinas.find({
                'status': true,
                'type': 'otras',
            })
        break;
        }
        case 'nullInactiveAll': {
            var resultados = await Maquinas.find({
                'status': false
            })
        break;
        }
        case 'nullInactiveCnc': {
            var resultados = await Maquinas.find({
                'status': false,
                'type': 'cnc'
            })
        break;
        }
        case 'nullInactivePress': {
            var resultados = await Maquinas.find({
                'status': false,
                'type': 'prensa'
            })
        break;
        }
        case 'nullInactiveOther': {
            var resultados = await Maquinas.find({
                'status': false,
                'type': 'otras'
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
        case 'notNullAllCnc': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'type': 'cnc' }
                ]
            })
            break;
        }
        case 'notNullAllPress': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'type': 'prensa' }
                ]
            })
            break;
        }
        case 'notNullAllOther': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'type': 'otras' }
                ]
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
        case 'notNullActiveCnc': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': true },
                    { 'type': 'cnc' }
                ]
            })
            break;
        }
        case 'notNullActivePress': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': true },
                    { 'type': 'prensa' }
                ]
            })
            break;
        }
        case 'notNullActiveOther': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': true },
                    { 'type': 'otras' }
                ]
            })
            break;
        }
        case 'notNullInactiveAll': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': false }
                ]
            })
            break;
        }
        case 'notNullInactiveCnc': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': false },
                    { 'type': 'cnc' }
                ]
            })
            break;
        }
        case 'notNullInactivePress': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': false },
                    { 'type': 'prensa' }
                ]
            })
            break;
        }
        case 'notNullInactiveOther': {
            var resultados = await Maquinas.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': false },
                    { 'type': 'otras' }
                ]
            })
            break;
        }
    }
    return resultados
}

module.exports = {
    switchFilterConsumibles
}