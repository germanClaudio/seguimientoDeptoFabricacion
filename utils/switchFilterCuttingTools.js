// async function switchFilterCuttingTools(filter, Herramientas, designationAndCodeQuery) {
//     switch (filter) {
//         case 'nullAllAll': {
//             var resultados = ['vacio']
//         break;
//         }
//         case 'nullAllToricas': {
//             var resultados = await Herramientas.find({
//                 'type': 'toricas'
//             })
//         break;
//         }
//         case 'nullAllPlanas': {
//             var resultados = await Herramientas.find({
//                 'type': 'planas'
//             })
//         break;
//         }
//         case 'nullAllEsfericas': {
//             var resultados = await Herramientas.find({
//                 'type': 'esfericas'
//             })
//         break;
//         }
//         case 'nullAllFinal': {
//             var resultados = await Herramientas.find({
//                 'type': 'final'
//             })
//         break;
//         }
//         case 'nullAllAltoAvance': {
//             var resultados = await Herramientas.find({
//                 'type': 'altoAvance'
//             })
//         break;
//         }
//         case 'nullAllOther': {
//             var resultados = await Herramientas.find({
//                 'type': 'otras'
//             })
//         break;
//         }
//         case 'nullActiveAll': {
//             var resultados = await Herramientas.find({
//                 'status': true,
//             })
//         break;
//         }
//         case 'nullActiveToricas': {
//             var resultados = await Herramientas.find({
//                 'status': true,
//                 'type': 'toricas'
//             })
//         break;
//         }
//         case 'nullActivePlanas': {
//             var resultados = await Herramientas.find({
//                 'status': true,
//                 'type': 'planas',
//             })
//         break;
//         }
//         case 'nullActiveEsfericas': {
//             var resultados = await Herramientas.find({
//                 'status': true,
//                 'type': 'esfericas',
//             })
//         break;
//         }
//         case 'nullActiveFinal': {
//             var resultados = await Herramientas.find({
//                 'status': true,
//                 'type': 'final',
//             })
//         break;
//         }
//         case 'nullActiveAltoAvance': {
//             var resultados = await Herramientas.find({
//                 'status': true,
//                 'type': 'altoAvance',
//             })
//         break;
//         }
//         case 'nullActiveOther': {
//             var resultados = await Herramientas.find({
//                 'status': true,
//                 'type': 'otras',
//             })
//         break;
//         }
//         case 'nullInactiveAll': {
//             var resultados = await Herramientas.find({
//                 'status': false
//             })
//         break;
//         }
//         case 'nullInactiveToricas': {
//             var resultados = await Herramientas.find({
//                 'status': false,
//                 'type': 'toricas'
//             })
//         break;
//         }
//         case 'nullInactiveEsfericas': {
//             var resultados = await Herramientas.find({
//                 'status': false,
//                 'type': 'esfericas'
//             })
//         break;
//         }
//         case 'nullInactivePlanas': {
//             var resultados = await Herramientas.find({
//                 'status': false,
//                 'type': 'planas'
//             })
//         break;
//         }
//         case 'nullInactiveFinal': {
//             var resultados = await Herramientas.find({
//                 'status': false,
//                 'type': 'final'
//             })
//         break;
//         }
//         case 'nullInactiveAltoAvance': {
//             var resultados = await Herramientas.find({
//                 'status': false,
//                 'type': 'altoAvance'
//             })
//         break;
//         }
//         case 'nullInactiveOther': {
//             var resultados = await Herramientas.find({
//                 'status': false,
//                 'type': 'otras'
//             })
//         break;
//         }
//         //--------------- input w/text ----------
//         case 'notNullAllAll': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery
//             })
//         break;
//         }
//         case 'notNullAllToricas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'type': 'toricas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullAllPlanas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'type': 'planas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullAllEsfericas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'type': 'esfericas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullAllFinal': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'type': 'final' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullAllAltoAvance': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'type': 'altoAvance' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullAllOther': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'type': 'otras' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullActiveAll': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': true }
//                 ]
//             })
//             break;
//         }
//         case 'notNullActiveToricas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': true },
//                     { 'type': 'toricas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullActivePlanas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': true },
//                     { 'type': 'planas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullActiveEsfericas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': true },
//                     { 'type': 'esfericas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullActiveFinal': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': true },
//                     { 'type': 'final' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullActiveAltoAvance': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': true },
//                     { 'type': 'altoAvance' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullActiveOther': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': true },
//                     { 'type': 'otras' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullInactiveAll': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': false }
//                 ]
//             })
//             break;
//         }
//         case 'notNullInactiveToricas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': false },
//                     { 'type': 'toricas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullInactivePlanas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': false },
//                     { 'type': 'planas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullInactiveEsfericas': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': false },
//                     { 'type': 'esfericas' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullInactiveFinal': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': false },
//                     { 'type': 'final' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullInactiveAltoAvance': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': false },
//                     { 'type': 'altoAvance' }
//                 ]
//             })
//             break;
//         }
//         case 'notNullInactiveOther': {
//             var resultados = await Herramientas.find({
//                 $or: designationAndCodeQuery,
//                 $and: [
//                     { 'status': false },
//                     { 'type': 'otras' }
//                 ]
//             })
//             break;
//         }
//     }
//     return resultados
// }

async function switchFilterCuttingTools(filter, Herramientas, designationAndCodeQuery) {
    const filtersMap = {
        // Casos con filtro null y tipo
        'nullAllAll': { resultados: ['vacio'] },
        'nullAllToricas': { type: 'toricas' },
        'nullAllPlanas': { type: 'planas' },
        'nullAllEsfericas': { type: 'esfericas' },
        'nullAllFinal': { type: 'final' },
        'nullAllAltoAvance': { type: 'altoAvance' },
        'nullAllOther': { type: 'otras' },

        // Casos con filtro null y estado
        'nullActiveAll': { status: true },
        'nullInactiveAll': { status: false },
        'nullActiveToricas': { status: true, type: 'toricas' },
        'nullInactiveToricas': { status: false, type: 'toricas' },
        'nullActivePlanas': { status: true, type: 'planas' },
        'nullInactivePlanas': { status: false, type: 'planas' },
        'nullActiveEsfericas': { status: true, type: 'esfericas' },
        'nullInactiveEsfericas': { status: false, type: 'esfericas' },
        'nullActiveFinal': { status: true, type: 'final' },
        'nullInactiveFinal': { status: false, type: 'final' },
        'nullActiveAltoAvance': { status: true, type: 'altoAvance' },
        'nullInactiveAltoAvance': { status: false, type: 'altoAvance' },
        'nullActiveOther': { status: true, type: 'otras' },
        'nullInactiveOther': { status: false, type: 'otras' },

        // Casos con query no null
        'notNullAllAll': { $or: designationAndCodeQuery },
        'notNullAllToricas': { $or: designationAndCodeQuery, type: 'toricas' },
        'notNullAllPlanas': { $or: designationAndCodeQuery, type: 'planas' },
        'notNullAllEsfericas': { $or: designationAndCodeQuery, type: 'esfericas' },
        'notNullAllFinal': { $or: designationAndCodeQuery, type: 'final' },
        'notNullAllAltoAvance': { $or: designationAndCodeQuery, type: 'altoAvance' },
        'notNullAllOther': { $or: designationAndCodeQuery, type: 'otras' },
        'notNullActiveAll': { $or: designationAndCodeQuery, status: true },
        'notNullInactiveAll': { $or: designationAndCodeQuery, status: false },
        'notNullActiveToricas': { $or: designationAndCodeQuery, status: true, type: 'toricas' },
        'notNullInactiveToricas': { $or: designationAndCodeQuery, status: false, type: 'toricas' },
        'notNullActivePlanas': { $or: designationAndCodeQuery, status: true, type: 'planas' },
        'notNullInactivePlanas': { $or: designationAndCodeQuery, status: false, type: 'planas' },
        'notNullActiveEsfericas': { $or: designationAndCodeQuery, status: true, type: 'esfericas' },
        'notNullInactiveEsfericas': { $or: designationAndCodeQuery, status: false, type: 'esfericas' },
        'notNullActiveFinal': { $or: designationAndCodeQuery, status: true, type: 'final' },
        'notNullInactiveFinal': { $or: designationAndCodeQuery, status: false, type: 'final' },
        'notNullActiveAltoAvance': { $or: designationAndCodeQuery, status: true, type: 'altoAvance' },
        'notNullInactiveAltoAvance': { $or: designationAndCodeQuery, status: false, type: 'altoAvance' },
        'notNullActiveOther': { $or: designationAndCodeQuery, status: true, type: 'otras' },
        'notNullInactiveOther': { $or: designationAndCodeQuery, status: false, type: 'otras' },
    };

    const query = filtersMap[filter];

    if (!query) {
        throw new Error('Filtro no válido');
    }

    if (query.resultados) {
        return query.resultados;
    }

    return await Herramientas.find(query);
}

module.exports = {
    switchFilterCuttingTools
}