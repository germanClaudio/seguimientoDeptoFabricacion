async function switchFilterCuttingTools(Herramientas, designationAndCodeQuery) {
    let query = {};

    // Procesar $or si existe
    if (designationAndCodeQuery.$or && Array.isArray(designationAndCodeQuery.$or)) {
        designationAndCodeQuery.$or = designationAndCodeQuery.$or.filter(Boolean);
        if (designationAndCodeQuery.$or.length > 0) {
            query.$or = designationAndCodeQuery.$or;
        }
    }

    // Definir valores válidos para type, diam, y largo
    const types = ['TOR', 'PLA', 'ESF'],
        diameters = [2, 3, 4, 6, 10, 16, 20, 32, 50, 52, 63, 80, 100, 125],
        lenghts = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

    // Procesar campo status
    if (designationAndCodeQuery.status && designationAndCodeQuery.status !== 'todas') {
        if (typeof designationAndCodeQuery.status === 'boolean') {
            query.status = designationAndCodeQuery.status;
        } else {
            console.error("Valor inválido para status:", designationAndCodeQuery.status);
        }
    }

    // Procesar campo type
    if (designationAndCodeQuery.type && types.includes(designationAndCodeQuery.type)) {
        query.type = designationAndCodeQuery.type;
    }

    // Procesar campo diam
    if (designationAndCodeQuery.diam && diameters.includes(designationAndCodeQuery.diam)) {
        query.diam = designationAndCodeQuery.diam; // No es necesario usar $in si solo hay un valor
    }

    // Procesar campo largo
    if (designationAndCodeQuery.largo && lenghts.includes(designationAndCodeQuery.largo)) {
        query.largo = {
                        $gte: parseInt(designationAndCodeQuery.largo - 49),
                        $lte: designationAndCodeQuery.largo
                    }
    }
    console.log('query: ', query)

    // Ejecutar consulta
    const resultados = Object.keys(query).length > 0
        ? await Herramientas.find(query)
        : ['vacio'];

    return resultados;
}

module.exports = {
    switchFilterCuttingTools
}