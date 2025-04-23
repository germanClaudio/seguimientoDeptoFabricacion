async function switchFilterProjects(filter, Proyectos, nameAndCodeQuery) {
    let query = {};
    
    // Procesar $or si existe (búsqueda por nombre, descripción o código)
    if (nameAndCodeQuery && Array.isArray(nameAndCodeQuery)) {
        nameAndCodeQuery.$or = nameAndCodeQuery.filter(Boolean);
        if (filter[0] !== 'null') {
            if (nameAndCodeQuery.$or.length > 0) query.$or = nameAndCodeQuery.$or;
        }
    }

    // Procesar campo status (activo/inactivo)
    if (filter[1] === 'Active') {
        query['project.statusProject'] = true;

    } else if (filter[1] === 'Inactive') {
        query['project.statusProject'] = false;
    }

    // Si hay un tipo específico (Matrices/Lineas), escribimos el $or
    if (filter[2] === 'Matrices') {
        query.uNegocio = filter[2].toLowerCase();
        
        // Filtrar por nivel del proyecto si se especifica
        if (filter[3] !== 'All') {
            let level = filter[3].toLowerCase();
            if (level === 'ariesgo') level = 'aRiesgo';
            if (level === 'paracotizar') level = 'paraCotizar';
            if (level === 'ganados') level = 'ganado';

            query['project.levelProject'] = level;
        }
        
    } else if (filter[2] === 'Lineas') {
        query.uNegocio = filter[2].toLowerCase();
        query['project.levelProject'] = 'ganado';

    } else {
        query['project.levelProject'] = 'ganado';
    }

// console.log('query: ', query)

    // Ejecutar consulta o devolver vacío si no hay filtros
    const resultados = Object.keys(query).length > 0
        ? await Proyectos.find(query).sort({ prioProject: -1 })
        : ['vacio'];

    return resultados;
}

module.exports = {
    switchFilterProjects
}