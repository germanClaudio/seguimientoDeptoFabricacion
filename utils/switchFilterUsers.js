async function switchFilterUsers(filter, Usuarios, nameAndOthersQueries) {
    // Caso especial que devuelve ['vacio']
    if (filter === 'filterFor--todos-todos-todos-todos-todos' || filter === 'default') {
        return ['vacio'];
    }

    // Desestructurar el filtro para obtener los parámetros
    const [_, status, admin, area, uNegocio, permiso] = filter.split('-').slice(1);

    // Construir el objeto query dinámicamente
    const queryObj = {};

    // Agregar condiciones según los parámetros
    if (status !== 'todos') queryObj.status = status === 'true';

    if (admin !== 'todos') queryObj.admin = admin === 'true';

    if (area !== 'todos') queryObj.area = area;

    if (permiso !== 'todos') queryObj.permiso = permiso;

    if (uNegocio !== 'todos') queryObj.uNegocio = uNegocio;

    // Casos especiales para búsquedas con texto
    if (filter.includes('noEmptyString')) queryObj.$or = nameAndOthersQueries;

    // Caso especial para búsqueda numérica
    if (filter === 'filterFor-noEmptyNumber-todos-todos-todos-todos') {
        return await Usuarios.aggregate(nameAndOthersQueries);
    }

    // Ejecutar la consulta
    return await Usuarios.find(queryObj);
}

module.exports = {
    switchFilterUsers
}