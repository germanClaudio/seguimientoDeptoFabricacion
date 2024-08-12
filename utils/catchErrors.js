function catchError400(req, res, next) {
    const err = new Error('No existen Proyectos Cargados')
    err.dirNumber = 400
    return next(err)
}

function catchError400_1(req, res, next) {
    const err = new Error('Debe ingresar al menos una OCI')
    err.dirNumber = 400
    return next(err)
}

function catchError400_2(req, res, next) {
    const err = new Error('Ya existe un Proyecto con estos datos.')
    err.dirNumber = 400;
    return next(err);
}

function catchError400_3(req, res, next) {
    const err = new Error('Datos inválidos')
    err.dirNumber = 400;
    return next(err);
}

function catchError400_4(err, req, res, next) {
    // const err = new Error('Error al cargar imagen/es o imagen/es inválidas!')
    err.dirNumber = 400;
    return next(err);
}

function catchError401(req, res, next) {
    const err = new Error('Cliente no encontrado!')
    err.dirNumber = 401
    return next(err)
}

function catchError401_1(req, res, next) {
    const err = new Error('Proyecto no encontrado!')
    err.dirNumber = 401
    return next(err)
}

function catchError401_2(req, res, next) {
    const err = new Error('OCI no encontrada!')
    err.dirNumber = 401
    return next(err)
}

function catchError401_3(req, res, next) {
    const err = new Error('Usuario Desconocido!')
    err.dirNumber = 401
    return next(err)
}

function catchError401_4(req, res, next) {
    const err = new Error('Proyecto, OCI u OT no encontrada')
    err.dirNumber = 401
    return next(err)
}

function catchError403(req, res, next) {
    const err = new Error('Invalid CSRF token');
    err.dirNumber = 403;
    return next(err);
}

function catchError500(err, req, res, next) {
    err.dirNumber = 500
    return next(err)
}

module.exports = {
    catchError400,
    catchError400_1,
    catchError400_2,
    catchError400_3,
    catchError400_4,
    catchError401,
    catchError401_1,
    catchError401_2,
    catchError401_3,
    catchError401_4,
    catchError403,
    catchError500
}