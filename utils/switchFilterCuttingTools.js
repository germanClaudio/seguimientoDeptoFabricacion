async function switchFilterCuttingTools(filter, Herramientas, designationAndCodeQuery) {
    // Definir mapas para las categorías y tipos de herramientas
    const types = ['toricas', 'planas', 'esfericas', 'final', 'altoAvance', 'otras'],
        diameters = [16, 20, 32, 50, 52, 63, 80, 100, 125],
        type = designationAndCodeQuery.type || 'all',
        diam = designationAndCodeQuery.diam || 'all',
    
    // Mapear el filtro a los criterios de consulta
    [designation, status] = filter.split(/(?=[A-Z])/).map((x) => x.toLowerCase()),
    query = {};
    
    // Construcción dinámica de la consulta
    designation !== 'null' ? query.$or = designationAndCodeQuery : null
    status !== 'all' ? query.status = status === 'active' : null
    type !== 'all' ? query.type = types.includes(type) ? type : undefined : null
    
    let index
    diam !== 'all' ?
        ( index = diameters.indexOf(parseInt(diam)),
        query.diam = { $in: [diameters[index]] } ) : null
    
    // Realizar la consulta y manejar casos especiales
    const resultados = Object.keys(query).length > 0 
        ? await Herramientas.find(query)
        : ['vacio'];

    return resultados;
}

module.exports = {
    switchFilterCuttingTools
}