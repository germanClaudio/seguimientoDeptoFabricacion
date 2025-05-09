async function switchFilterOrdenesByUser(Ordenes, searchQuery) {
    let query = {};
    // console.log('X - searchQuery: ', searchQuery)

    // 1. Filtrar por texto en el campo "descripcion" (si queryOrdenes no está vacío)
    if (searchQuery['$and']) {
        query.items = searchQuery['$and'][0].items
    }

    // 2. Filtrar por legajoId
    query.shipping = { $elemMatch: { legajoIdUser: searchQuery.username.legajoId } }

    // 3. Filtrar por status
    if (searchQuery.directiva !== 'todas') {
        searchQuery.active ? query.active = Boolean(true) : query.active = Boolean(false)
        searchQuery.prepared ? query.prepared = Boolean(true) : query.prepared = Boolean(false)
    }

    // 4. Filtrar por rango de fechas (fechaCreacion debe estar entre fechaInicio y fechaFin)
    const diferenciaMs = new Date(searchQuery.timestamp['$lte']) - new Date(searchQuery.timestamp['$gte']);

    // Convertir la diferencia de milisegundos a días
    const milisegundosPorDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const diferenciaDias = (diferenciaMs / milisegundosPorDia); //Math.floor

    //console.log(`La diferencia en días es: ${diferenciaDias}`);

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular fecha de 60 días atrás
    const fecha60DiasAtras = new Date(fechaActual);
    fecha60DiasAtras.setDate(fechaActual.getDate() - 60);

    if (diferenciaDias <= 60) {
        // Si la diferencia es 60 días o menos, usar las fechas proporcionadas
        query.modifiedOn = {
            $gte: new Date(searchQuery.timestamp['$gte']),
            $lte: new Date(searchQuery.timestamp['$lte'])
        };
        
        // Validación adicional para asegurar que no exceda los 60 días
        const fechaFin = new Date(searchQuery.timestamp['$lte']);
        const fechaInicio = new Date(searchQuery.timestamp['$gte']);
        
        if ((fechaFin - fechaInicio) / milisegundosPorDia > 60) {
            query.modifiedOn = {
                $gte: fecha60DiasAtras,
                $lte: fechaActual
            };
        }

    } else {
        // Si la diferencia es mayor a 60 días, usar los últimos 60 días
        query.modifiedOn = {
            $gte: fecha60DiasAtras,
            $lte: fechaActual
        };
    }

    // 5. Filtrar siempre las ordenes visibles
    query.visible = Boolean(true)
    
    // console.log('3- query-SwitchFilter: ', query)
    // console.log('3.1- Object.query: ', Object.keys(query).length)

    // Ejecutar consulta
    const resultados = Object.keys(query).length > 2
        ? await Ordenes.find(query)
        : ['vacio'];

    return resultados;
}

async function switchFilterOrdenes(Ordenes, searchQuery) {
    let query = {};
    // console.log('X - searchQuery: ', searchQuery)

    // Procesar $or si existe
    if (searchQuery.$or && Array.isArray(searchQuery.$or)) {
        searchQuery.$or = searchQuery.$or.filter(Boolean);
        if (searchQuery.$or.length > 0) {
            query.$or = searchQuery.$or;
        }
    }

    // 3. Filtrar por status
    if (searchQuery.directiva !== 'todas') {
        if (searchQuery.directiva !== 'activasPreparadas') {
            searchQuery.active ? query.active = Boolean(true) : query.active = Boolean(false)
            searchQuery.prepared ? query.prepared = Boolean(true) : query.prepared = Boolean(false)
        } else {
            searchQuery.active ? query.active = Boolean(true) : query.active = Boolean(false)
        }
    }

    // 4. Filtrar por rango de fechas (fechaCreacion debe estar entre fechaInicio y fechaFin)
    const diferenciaMs = new Date(searchQuery.timestamp['$lte']) - new Date(searchQuery.timestamp['$gte']);

    // Convertir la diferencia de milisegundos a días
    const milisegundosPorDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const diferenciaDias = (diferenciaMs / milisegundosPorDia);

    // console.log(`La diferencia en días es: ${diferenciaDias}`);

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular fecha de 60 días atrás
    const fecha60DiasAtras = new Date(fechaActual);
    fecha60DiasAtras.setDate(fechaActual.getDate() - 60);

    if (diferenciaDias <= 60) {
        // Si la diferencia es 60 días o menos, usar las fechas proporcionadas
        query.modifiedOn = {
            $gte: new Date(searchQuery.timestamp['$gte']),
            $lte: new Date(searchQuery.timestamp['$lte'])
        };
        
        // Validación adicional para asegurar que no exceda los 60 días
        const fechaFin = new Date(searchQuery.timestamp['$lte']);
        const fechaInicio = new Date(searchQuery.timestamp['$gte']);
        
        if ((fechaFin - fechaInicio) / milisegundosPorDia > 60) {
            query.modifiedOn = {
                $gte: fecha60DiasAtras,
                $lte: fechaActual
            };
        }

    } else {
        // Si la diferencia es mayor a 60 días, usar los últimos 60 días
        query.modifiedOn = {
            $gte: fecha60DiasAtras,
            $lte: fechaActual
        };
    }

    // 5. Filtrar siempre las ordenes visibles
    query.visible = Boolean(true)
    
    // console.log('3- query-SwitchFilter: ', query)
    // console.log('3.1- Object.query: ', Object.keys(query).length)
    
    // Ejecutar consulta
    const resultados = Object.keys(query).length > 0
        ? await Ordenes.find(query)
        : ['vacio'];

    return resultados;
}

async function switchFilterItemsConsumidos(Ordenes, searchQuery) {
    let query = {};
    // console.log('X - searchQuery: ', searchQuery)

    // 4. Filtrar por rango de fechas (fechaCreacion debe estar entre fechaInicio y fechaFin)
    const diferenciaMs = new Date(searchQuery.timestamp['$lte']) - new Date(searchQuery.timestamp['$gte']);

    // Convertir la diferencia de milisegundos a días
    const milisegundosPorDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const diferenciaDias = (diferenciaMs / milisegundosPorDia);

    // console.log(`La diferencia en días es: ${diferenciaDias}`);

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular fecha de 90 días atrás
    const fecha90DiasAtras = new Date(fechaActual);
    fecha90DiasAtras.setDate(fechaActual.getDate() - 90);

    if (diferenciaDias <= 90) {
        // Si la diferencia es 60 días o menos, usar las fechas proporcionadas
        query.modifiedOn = {
            $gte: new Date(searchQuery.timestamp['$gte']),
            $lte: new Date(searchQuery.timestamp['$lte'])
        };
        
        // Validación adicional para asegurar que no exceda los 90 días
        const fechaFin = new Date(searchQuery.timestamp['$lte']);
        const fechaInicio = new Date(searchQuery.timestamp['$gte']);
        
        if ((fechaFin - fechaInicio) / milisegundosPorDia > 90) {
            query.modifiedOn = {
                $gte: fecha90DiasAtras,
                $lte: fechaActual
            };
        }

    } else {
        // Si la diferencia es mayor a 60 días, usar los últimos 60 días
        query.modifiedOn = {
            $gte: fecha90DiasAtras,
            $lte: fechaActual
        };
    }

    // console.log('3- query-SwitchFilter: ', query)
    // console.log('3.1- Object.query: ', Object.keys(query).length)

    let finalQuery = 
    [
        {
            $match: {
                visible: true,
                active: false,
                modifiedOn: query.modifiedOn,
                "shipping.legajoIdUser": searchQuery.username.legajoId  // Filtro por usuario
            }
        },
        {
            $unwind: "$items"  // Descompone el array de items
        },
        {
            $project: {
                legajoIdUser: { $arrayElemAt: ["$shipping.legajoIdUser", 0] },
                name: { $arrayElemAt: ["$shipping.name", 0] },
                lastName: { $arrayElemAt: ["$shipping.lastName", 0] },
                consumibleId: "$items.consumibleId",
                designation: "$items.designation",
                type: "$items.type",
                quantity: "$items.quantity",
                modifiedOn: 1  // Incluye el campo modifiedOn en el resultado
            }
        },
        {
            $group: {
                _id: "$legajoIdUser",
                userData: {
                    $push: {
                        name: "$name",
                        lastName: "$lastName"
                    }
                },
                items: {
                    $push: {
                        consumibleId: "$consumibleId",
                        designation: "$designation",
                        type: "$type",
                        quantity: "$quantity",
                        modifiedOn: "$modifiedOn"  // Opcional: Agrupa las fechas si las necesitas
                    }
                }
            }
        },
        {
            $sort: { "_id": 1 }
        }
    ]
    //end query
    //console.log('FinalQuery: ', finalQuery)
    
    // Ejecutar consulta
    const resultados = Object.keys(query).length > 0
        ? await Ordenes.aggregate(finalQuery)
        : ['vacio'];

    return resultados;
}

module.exports = {
    switchFilterOrdenesByUser,
    switchFilterOrdenes,
    switchFilterItemsConsumidos
}