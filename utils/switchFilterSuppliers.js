async function switchFilterSuppliers(filter, Proveedores, designationAndCodeQuery) {
    let resultados;

    // Descomponer el filtro en sus partes
    const [queryType, status, type] = filter.match(/(null|notNull)(Active|Inactive|All)(Diseno|Simulacion|Other|All)/).slice(1);

    // Construir la consulta base
    const query = {};

    if (queryType === 'notNull') {
        query.$or = designationAndCodeQuery;
    }

    if (status === 'Active') {
        query.status = true;
    } else if (status === 'Inactive') {
        query.status = false;
    }

    if (type !== 'All') {
        query.type = type.toLowerCase();
    }

    // Realizar la consulta o asignar un valor por defecto
    resultados = Object.keys(query).length > 0
        ? await Proveedores.find(query)
        : ['vacio'];

    return resultados;
}


module.exports = {
    switchFilterSuppliers
}