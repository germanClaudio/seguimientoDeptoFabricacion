async function switchFilterOrdenesByUser(Ordenes, searchQuery) {
    let query = {};
    console.log('X - searchQuery: ', searchQuery)

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

    console.log(`La diferencia en días es: ${diferenciaDias}`);

    if (diferenciaDias < 30) {
        query.timestamp = {
            $gte: new Date(searchQuery.timestamp['$gte']), // Mayor o igual que fechaInicio
            $lte: new Date(searchQuery.timestamp['$lte'])     // Menor o igual que fechaFin
        };
    }

    // 5. Filtrar siempre las ordenes visibles
    query.visible = Boolean(true)
    
    console.log('3- query-SwitchFilter: ', query)
    console.log('3.1- Object.query: ', Object.keys(query).length)

    // Ejecutar consulta
    const resultados = Object.keys(query).length > 2
        ? await Ordenes.find(query)
        : ['vacio'];

    return resultados;
}

async function switchFilterOrdenes(Ordenes, searchQuery) {
    let query = {};
    
    // Procesar $or si existe
    if (searchQuery.$or && Array.isArray(searchQuery.$or)) {
        searchQuery.$or = searchQuery.$or.filter(Boolean);
        if (searchQuery.$or.length > 0) {
            query.$or = searchQuery.$or;
        }
    }

    // Procesar campo status
    query.status = searchQuery.status;
    
    // Procesar campo Date Inicio
    searchQuery.fechaIncio !== null
    ? query.fechaInicio = searchQuery.fechaIncio
    : query.fechaInicio = new Date()
    
    // Procesar campo Date Fin
    query.fechaFin = searchQuery.fechaFin
    
    // Ejecutar consulta
    const resultados = Object.keys(query).length > 0
        ? await Ordenes.find(query)
        : ['vacio'];

    return resultados;
}

module.exports = {
    switchFilterOrdenesByUser,
    switchFilterOrdenes
}