async function switchFilterClients(filter, Clientes, nameAndCodeQuery) {
    switch (filter) {
        case 'nullAllAll': {
            var resultados = ['vacio']
        break;
        }
        case 'nullAllWith': {
            var resultados = await Clientes.find({
                'project': { $gt: 0 } // Proyectos mayores que 0
            })
        break;
        }
        case 'nullAllWithout': {
            var resultados = await Clientes.find({
                'project': { $eq: 0 }
            })
        break;    
        }
        case 'nullActiveAll': {
            var resultados = await Clientes.find({
                'status': true,
            })
            break;
        }
        case 'nullActiveWith': {
            var resultados = await Clientes.find({
                'status': true,
                'project': { $gt: 0 }
            })
            break;
        }
        case 'nullActiveWithout': {
            var resultados = await Clientes.find({
                'status': true,
                'project': { $eq: 0 } 
                
            })
            break;
        }
        case 'nullInactiveAll': {
            var resultados = await Clientes.find({
                'status': false
            })
            break;
        }
        case 'nullInactiveWith': {
            var resultados = await Clientes.find({
                'status': false,
                'project': { $gt: 0 }
            })
            break;
        }
        case 'nullInactiveWithout': {
            var resultados = await Clientes.find({
                'status': false,
                'project': { $eq: 0 }
            })
            break;
        }
        //--------------- input w/text ----------
        case 'notNullAllAll': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery
            })
            break;
        }
        case 'notNullAllWith': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery,
                $and: [
                    { 'project': { $gt: 0 } }
                ]
            })
            break;
        }
        case 'notNullAllWithout': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery,
                $and: [
                    { 'project': { $eq: 0 } }
                ]
            })
            break;
        }
        case 'notNullActiveAll': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery,
                $and: [
                    { 'status': true }
                ]
            })
            break;
        }
        case 'notNullActiveWith': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery,
                $and: [
                    { 'status': true },
                    { 'project': { $gt: 0 } }
                ]
            })
            break;
        }
        case 'notNullActiveWithout': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery,
                $and: [
                    { 'status': true },
                    { 'project': { $eq: 0 } }
                ]
            })
            break;
        }
        case 'notNullInactiveAll': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery
            })
            break;
        }
        case 'notNullInactiveWith': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery,
                $and: [
                    { 'status': false },
                    { 'project': { $gt: 0 } }
                ]
            })
            break;
        }
        case 'notNullInactiveWithout': {
            var resultados = await Clientes.find({
                $or: nameAndCodeQuery,
                $and: [
                    { 'status': false },
                    { 'project': { $eq: 0 } }
                ]
            })
            break;
        }
    }
    return resultados
}

module.exports = {
    switchFilterClients
}