async function switchFilterClients(filter, Clientes, nameAndCodeQuery) {
    let query = {};
    
    // Procesar $or si existe (búsqueda por nombre o código)
    if (nameAndCodeQuery && Array.isArray(nameAndCodeQuery)) {
        nameAndCodeQuery.$or = nameAndCodeQuery.filter(Boolean);
        if (nameAndCodeQuery.$or.length > 0) query.$or = nameAndCodeQuery.$or;
    }

    // Procesar campo status (activo/inactivo)
    if (filter[1] === 'Active') {
        query.status = true;
    } else if (filter[1] === 'Inactive') {
        query.status = false;
    }

    // Procesar campo proyectos (With/Without)
    if (filter[2] === 'With') {                
        // Si hay un tipo específico (Matrices/Lineas), escribimos el $or
        if (filter[3] === 'Matrices') {
            query = {
                ...query,
                project: { $gt: 0 }
            };
            
        } else if (filter[3] === 'Lineas') {
            query = {
                ...query,
                projectLineas: { $gt: 0 }
            };

        } else {
            // Modificación clave aquí: Usamos $or para project O projectLineas
            query.$or = [
                { project: { $gt: 0 } },
                { projectLineas: { $gt: 0 } }
            ];
        }

    } else if (filter[2] === 'Without') {
        query.project = 0;
        query.projectLineas = 0;
    }
    
    // Ejecutar consulta o devolver vacío si no hay filtros
    const resultados = Object.keys(query).length > 0
        ? await Clientes.find(query)
        : ['vacio'];

    return resultados;
}

module.exports = {
    switchFilterClients
}