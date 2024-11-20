async function switchFilterTools(filter, Proveedores, designationAndCodeQuery) {
    switch (filter) {
        case 'nullAllAll': {
            var resultados = ['vacio']
        break;
        }
        case 'nullAllDiseno': {
            var resultados = await Proveedores.find({
                'type': 'diseno'
            })
        break;
        }
        case 'nullAllSimulacion': {
            var resultados = await Proveedores.find({
                'type': 'simulacion'
            })
        break;
        }
        case 'nullAllOther': {
            var resultados = await Proveedores.find({
                'type': 'otras'
            })
        break;
        }
        case 'nullActiveAll': {
            var resultados = await Proveedores.find({
                'status': true,
            })
        break;
        }
        case 'nullActiveDiseno': {
            var resultados = await Proveedores.find({
                'status': true,
                'type': 'diseno'
            })
        break;
        }
        case 'nullActiveSimulacion': {
            var resultados = await Proveedores.find({
                'status': true,
                'type': 'simulacion',
            })
        break;
        }
        case 'nullActiveOther': {
            var resultados = await Proveedores.find({
                'status': true,
                'type': 'otras',
            })
        break;
        }
        case 'nullInactiveAll': {
            var resultados = await Proveedores.find({
                'status': false
            })
        break;
        }
        case 'nullInactiveDiseno': {
            var resultados = await Proveedores.find({
                'status': false,
                'type': 'diseno'
            })
        break;
        }
        case 'nullInactiveSimulacion': {
            var resultados = await Proveedores.find({
                'status': false,
                'type': 'simulacion'
            })
        break;
        }
        case 'nullInactiveOther': {
            var resultados = await Proveedores.find({
                'status': false,
                'type': 'otras'
            })
        break;
        }
        //--------------- input w/text ----------
        case 'notNullAllAll': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery
            })
        break;
        }
        case 'notNullAllDiseno': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'type': 'diseno' }
                ]
            })
            break;
        }
        case 'notNullAllSimulacion': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'type': 'simulacion' }
                ]
            })
            break;
        }
        case 'notNullAllOther': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'type': 'otras' }
                ]
            })
            break;
        }
        case 'notNullActiveAll': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': true }
                ]
            })
            break;
        }
        case 'notNullActiveDiseno': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': true },
                    { 'type': 'diseno' }
                ]
            })
            break;
        }
        case 'notNullActiveSimulacion': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': true },
                    { 'type': 'simulacion' }
                ]
            })
            break;
        }
        case 'notNullActiveOther': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': true },
                    { 'type': 'otras' }
                ]
            })
            break;
        }
        case 'notNullInactiveAll': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': false }
                ]
            })
            break;
        }
        case 'notNullInactiveDiseno': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': false },
                    { 'type': 'diseno' }
                ]
            })
            break;
        }
        case 'notNullInactiveSimulacion': {
            var resultados = await Proveedores.find({
                $or: designationAndCodeQuery,
                $and: [
                    { 'status': false },
                    { 'type': 'simulacion' }
                ]
            })
            break;
        }
        case 'notNullInactiveOther': {
            var resultados = await Proveedores.find({
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
    switchFilterTools
}