async function switchFilterConsumibles(Consumibles, designationAndCodeQuery) {
    let query = {};
    
    // Procesar $or si existe
    if (designationAndCodeQuery.$or && Array.isArray(designationAndCodeQuery.$or)) {
        designationAndCodeQuery.$or = designationAndCodeQuery.$or.filter(Boolean);
        if (designationAndCodeQuery.$or.length > 0) {
            query.$or = designationAndCodeQuery.$or;
        }
    }

    // Definir valores válidos para type
    const types = ['epp', 'ropa', 'consumiblesLineas', 'consumiblesAjuste', 'consumiblesMeca', 'otros']
    const typesStock = ['unico', 'talle', 'numero']

    // Procesar campo status
    if (designationAndCodeQuery.status !== 'todos' && typeof designationAndCodeQuery.status === 'boolean') {
        query.status = designationAndCodeQuery.status;
    }

    // Procesar campo type
    if (designationAndCodeQuery.type !== 'todos' && types.includes(designationAndCodeQuery.type)) {
        query.type = designationAndCodeQuery.type;
    }

    // Procesar campo type Stock
    if (designationAndCodeQuery.typeStock !== 'todos' && typesStock.includes(designationAndCodeQuery.typeStock)) {
        query.typeStock = designationAndCodeQuery.typeStock;
    }
    console.log('query: ', query)
    console.log('designationAndCodeQuery: ', designationAndCodeQuery)
    // Procesar campo stock
    if (designationAndCodeQuery.stock !== 'todos' && typeof designationAndCodeQuery.stock === 'boolean') {
        if (designationAndCodeQuery.stock === true) {
            query.stock = { $gt : 0 }
        } else if(designationAndCodeQuery.stock === false) {
            query.stock = 0
        } else {
            console.error("Valor inválido para stock:", designationAndCodeQuery.stock);
        }
    }
    
    // Ejecutar consulta
    const resultados = Object.keys(query).length > 0
        ? await Consumibles.find(query)
        : ['vacio'];

    return resultados;
}

module.exports = {
    switchFilterConsumibles
}