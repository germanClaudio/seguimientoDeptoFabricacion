let clientNotFound = "../../../src/images/upload/LogoClientImages/dead-emoji-face.jpg",
    allClientsFound = "../../../src/images/upload/LogoClientImages/indiceAbajo.jpeg"

// -------------- Show Searched Clients Index page----------------
socket.on('searchClientsAll', async (arrClientSearch) => {
    renderSearchedClients (await arrClientSearch)
})

const searchClient = () => {
    const query = document.getElementById('query').value,
        status = document.getElementById('status').value,
        proyectosRadio = document.getElementsByName('projects')
    
    for (let i=0; i<proyectosRadio.length; i++) {
        if (proyectosRadio[i].checked) {
            var proyectos = proyectosRadio[i].value
        }
    }

    socket.emit('searchClienteAll', {
        query,
        status,
        proyectos
    })
    return false
}

const renderSearchedClients = (arrClientSearch) => {
    if(arrClientSearch.length === 0) {
        const htmlSearchClientNull = (
            `<div class="col mx-auto">
                <div class="card rounded-2 mx-auto shadow-lg" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Cliente no encontrado">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Cliente no encontrado</h5>
                                <p class="card-text">Lo siento, no pudimos encontrar el cliente</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showClientSearch').innerHTML = htmlSearchClientNull
    
    } else if (arrClientSearch.length === 1 && arrClientSearch[0] === 'vacio') {
        const htmlSearchClientNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Todos los Clientes">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Todos los clientes</h5>
                                <p class="card-text">Todos los clientes están listados en las tarjetas de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente o haga scroll hacia abajo
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showClientSearch').innerHTML = htmlSearchClientNull

    } else {
        const htmlSearchClient = arrClientSearch.map((element) => {
            let disabled = 'disabled', text = "Activo", result = 'S/P',
                green = 'success', red = 'danger', grey = 'secondary', blue = 'primary', colorResult = grey

            if ( element.status === true && element.project > 0 ) {
                disabled = ''
                colorStatus = green
                colorResult = red
                result = element.project
            } else if ( element.status === true && element.project === 0 ) {
                colorStatus = green
                colorResult = grey
            } else if ( element.status === false && element.project > 0 ) {
                disabled = ''
                colorStatus = red
                colorResult = blue
                result = element.project
                text = "Inactivo"
            } else if ( element.status === false && element.project === 0 ) {
                colorStatus = red
                text = "Inactivo"
            }

            if(element.visible) {
                return (`
                    <div class="col mx-auto">
                        <div class="card mx-auto rounded-2 shadow-lg" style="max-width: 540px;">
                            <div class="row align-items-center">
                                <div class="col-md-4 text-center">
                                    <img src="${element.logo}"
                                        style="max-width=160vw; object-fit: contain;"
                                        class="img-fluid rounded p-3 mx-auto"
                                        alt="Logo Cliente">
                                </div>
                                <div class="col-md-8 border-start">
                                    <div class="card-body">
                                        <h5 class="card-title"><strong>${element.name}</strong></h5>
                                        <p class="card-text">Codigo: ${element.code}<br></p>
                                        <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                            Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}
                                        </span>
                                    </div>
                                    <div class="card-footer px-2">
                                        <div class="row">
                                            <div class="col m-auto">
                                                <a class="btn text-light small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}"
                                                    style="background-color: #1d1d1d; font-size: .85rem; width: 8em;">
                                                        <i class="icon-rocket"></i>
                                                            Proyectos
                                                </a>        
                                            </div>
                                            <div class="col m-auto">
                                                <a class="btn text-light small" type="submit" href="/api/clientes/select/${element._id}"
                                                    style="background-color: #272787; font-size: .85rem; width: 8em;">
                                                        <i class="fa-solid fa-info-circle"></i>
                                                            Cliente
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                )

            } else {
                return (`
                    <div class="col mx-auto">
                        <div class="card mx-auto rounded-2 shadow-lg pe-none" contenteditable="false" style="max-width: 540px; background-color: #00000060; opacity: 0.5" title="Consulte a SuperAdmin">
                            <div class="row align-items-center">
                                <div class="col-md-4 text-center">
                                    <img src="${element.logo}"
                                        style="max-width=160vw; object-fit: contain;"
                                        class="img-fluid rounded p-3 mx-auto"
                                        alt="Logo Cliente">
                                </div>
                                <div class="col-md-8 border-start">
                                    <div class="card-body">
                                        <h5 class="card-title"><strong>${element.name}</strong></h5>
                                        <p class="card-text">Codigo: ${element.code}<br></p>
                                        <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                            Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}
                                        </span>
                                    </div>
                                    <div class="card-footer px-2">
                                        <div class="row">
                                            <div class="col m-auto">
                                                <a class="btn text-light small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}"
                                                    style="background-color: #1d1d1d; font-size: .85rem; width: 8em;">
                                                        <i class="icon-rocket"></i>
                                                            Proyectos
                                                </a>        
                                            </div>
                                            <div class="col m-auto">
                                                <a class="btn text-light small ${disabled}" type="submit" href="/api/clientes/select/${element._id}"
                                                    style="background-color: #272787; font-size: .85rem; width: 8em;">
                                                        <i class="fa-solid fa-info-circle"></i>
                                                            Cliente
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                )
            }
        }).join(" ");
        document.getElementById('showClientSearch').innerHTML = htmlSearchClient
    }
}

// -------------- Show Searched Clients AddNewClient page----------------
socket.on('searchClientsNew', async (arrClientNewSearch) => {
    renderSearchedNewClients (await arrClientNewSearch)
})

const searchClientNew = () => {
    const query = document.getElementById('query').value,
        status = document.getElementById('status').value,
        proyectosRadio = document.getElementsByName('projects')
    
    for (let i=0; i<proyectosRadio.length; i++) {
        if (proyectosRadio[i].checked) {
            var proyectos = proyectosRadio[i].value
        }
    }

    socket.emit('searchClienteNew', {
        query,
        status,
        proyectos
    })
    return false
}

const renderSearchedNewClients = (arrClientNewSearch) => {
    document.getElementById('showCountClientSearch').innerHTML = ''
    
    if(arrClientNewSearch.length === 0) {
        const htmlSearchClientNewNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Cliente no encontrado">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Cliente no encontrado</h5>
                                <p class="card-text">Lo siento, no pudimos encontrar el cliente</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showClientSearch').innerHTML = htmlSearchClientNewNull

    } else if (arrClientNewSearch.length === 1 && arrClientNewSearch[0] === 'vacio') {    
        const htmlSearchClientNewNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Todos los Clientes">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Todos los clientes</h5>
                                <p class="card-text">Todos los clientes están listados en la tabla de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente o haga scroll hacia abajo
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showClientSearch').innerHTML = htmlSearchClientNewNull

    } else {
        const htmlSearchNewClient = arrClientNewSearch.map((element) => {
            // Definir los valores por defecto
            let disabled = 'disabled', text = "Activo", result = 'S/P',
                green = 'success', red = 'danger', grey = 'secondary', blue = 'primary', colorResult = grey

            const config = {
                true: {
                    true: { disabled: '', colorStatus: green, colorResult: red, result: element.project },
                    false: { colorStatus: green, colorResult: grey }
                },
                false: {
                    true: { disabled: '', colorStatus: red, colorResult: blue, result: element.project, text: 'Inactivo' },
                    false: { colorStatus: red, text: 'Inactivo' }
                }
            };

            // Verificar las condiciones y asignar los valores correspondientes
            const statusKey = element.status ? 'true' : 'false',
                projectKey = element.project > 0 ? 'true' : 'false',
                configValues = config[statusKey][projectKey];

            // Asignar los valores desde el objeto de configuración
            disabled = configValues.disabled !== undefined ? configValues.disabled : disabled;
            colorStatus = configValues.colorStatus || colorStatus;
            colorResult = configValues.colorResult || colorResult;
            result = configValues.result !== undefined ? configValues.result : result;
            text = configValues.text || text;

            if (element.visible) {
                return (`
                    <div class="col mx-auto">
                        <div class="card mx-auto rounded-2 shadow-lg" style="max-width: 540px;">
                            <div class="row align-items-center">
                                <div class="col-md-4 text-center">
                                    <img src="${element.logo}"
                                        style="max-width=160vw; object-fit: contain;"
                                        class="img-fluid rounded p-3 mx-auto"
                                        alt="Logo Cliente">
                                </div>
                                <div class="col-md-8 border-start">
                                    <div class="card-body">
                                        <h5 class="card-title"><strong>${element.name}</strong></h5>
                                        <p class="card-text">Codigo: ${element.code}<br></p>
                                        <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                            Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}
                                        </span>
                                    </div>
                                    <div class="card-footer px-2">
                                        <div class="row">
                                            <div class="col m-auto">
                                                <a class="btn text-light small" type="submit" href="/api/clientes/select/${element._id}"
                                                    style="background-color: #6c757d; font-size: .85rem; width: 4em;" title="Editar cliente ${element.name}">
                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                </a>
                                            </div>
                                            <div class="col m-auto">
                                                <a class="btn text-light small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}"
                                                    style="background-color: #0d6efd; font-size: .85rem; width: 4em;" title="Ver proyectos cliente ${element.name}">
                                                        <i class="icon-rocket"></i>
                                                </a>        
                                            </div>
                                            
                                            <div class="col m-auto">
                                                <a class="btn text-light small" type="submit" href="/api/clientes/${element._id}"
                                                    style="background-color: #272787; font-size: .85rem; width: 4em;" title="Ver Info cliente ${element.name}">
                                                        <i class="fa-solid fa-info-circle"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                )

            } else {
                return (`
                    <div class="col mx-auto">
                        <div class="card mx-auto rounded-2 shadow-lg pe-none" contenteditable="false" style="max-width: 540px; background-color: #00000060; opacity: 0.5" title="Consulte a SuperAdmin"">
                            <div class="row align-items-center">
                                <div class="col-md-4 text-center">
                                    <img src="${element.logo}"
                                        style="max-width=160vw; object-fit: contain;"
                                        class="img-fluid rounded p-3 mx-auto"
                                        alt="Logo Cliente">
                                </div>
                                <div class="col-md-8 border-start">
                                    <div class="card-body">
                                        <h5 class="card-title"><strong>${element.name}</strong></h5>
                                        <p class="card-text">Codigo: ${element.code}<br></p>
                                        <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                            Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}
                                        </span>
                                    </div>
                                    <div class="card-footer px-2">
                                        <div class="row">
                                            <div class="col m-auto">
                                                <a class="btn text-light small ${disabled}" type="submit" href="/api/clientes/select/${element._id}"
                                                    style="background-color: #6c757d; font-size: .85rem; width: 4em;" title="Editar cliente ${element.name}">
                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                </a>
                                            </div>
                                            <div class="col m-auto">
                                                <a class="btn text-light small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}"
                                                    style="background-color: #0d6efd; font-size: .85rem; width: 4em;" title="Ver proyectos cliente ${element.name}">
                                                        <i class="icon-rocket"></i>
                                                </a>        
                                            </div>
                                            
                                            <div class="col m-auto">
                                                <a class="btn text-light small ${disabled}" type="submit" href="/api/clientes/${element._id}"
                                                    style="background-color: #272787; font-size: .85rem; width: 4em;" title="Ver Info cliente ${element.name}">
                                                        <i class="fa-solid fa-info-circle"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                )
            }
            
        }).join(" ");

        let mensaje = ''
        arrClientNewSearch.length ===1
        ? mensaje = `Se encontró <strong>${arrClientNewSearch.length}</strong> resultado.`
        : mensaje = `Se encontraron <strong>${arrClientNewSearch.length}</strong> resultados.`
        
        const htmlResultados = `<div class="row align-items-center">
                                    <div class="col mx-auto">
                                        <span class="my-1">${mensaje}</span>
                                    </div>
                                </div>`

        document.getElementById('showCountClientSearch').innerHTML = htmlResultados

        document.getElementById('showClientSearch').innerHTML = htmlSearchNewClient
    }
}

//*******************************************************/
// -------------- Show Searched Users ----------------
socket.on('searchUsersAll', async (arrUsersSearch) => {
    renderSearchedUsers (await arrUsersSearch)
})

const searchUsers = () => {
    let statusUser = document.getElementById('statusUser').value,
        rolUser = document.getElementById('rolUser').value
    const queryUser = document.getElementById('queryUsers').value,
        areaUser = document.getElementById('areaUser').value,
        permisoUser = document.getElementById('permisoUser').value

    if (statusUser != 'todos') {
        statusUser === 'activos' ? statusUser = true : statusUser = false
    }
    if (rolUser != 'todos') {
        rolUser === 'administradores' ? rolUser = true : rolUser = false
    }
    
    socket.emit('searchUsuarioAll', {
        queryUser,
        statusUser,
        rolUser,
        areaUser,
        permisoUser,
    })
    return false
}

const renderSearchedUsers = (arrUsersSearch) => {
    document.getElementById('showCountUsersSearch').innerHTML = ''

    if(arrUsersSearch.length === 0) {
        const htmlSearchUserNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Usuario no encontrado">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Usuario no encontrado</h5>
                                <p class="card-text">Lo siento, no pudimos encontrar el Usuario</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre, apellido, email o # legajo diferente.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        
        const showUser = document.getElementById('showUsersSearch')
        showUser ? showUser.innerHTML = htmlSearchUserNull : null

    } else if (arrUsersSearch.length === 1 && arrUsersSearch[0] === 'vacio') {     
        const htmlSearchUsersNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Todos los Usuarios">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Todos los Usuarios</h5>
                                <p class="card-text">Todos los Usuarios están listados en la tabla de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre, apellido, email, legajo o username diferente o haga scroll hacia abajo
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        document.getElementById('showUsersSearch').innerHTML = htmlSearchUsersNull

    } else {
        const htmlSearchUsers = arrUsersSearch.map((element) => {
            let disabled = 'disabled', green = 'success', red = 'danger', grey = 'secondary', blue = 'primary',
                cian = 'info', yellow = 'warning', white = 'light', black = 'dark'

            const active = 'Activo', inactive = 'Inactivo', admin = 'Admin', user = 'User'

            let optionStatus = element.status ? green : red,
                optionAdmin = element.admin ? black : grey,
                optionPermiso = element.permiso ? grey : red,
                optionArea = element.area ? cian : green,
                showStatus = element.status ? active : inactive,
                showAdmin = element.admin ? admin : user

            const areaMap = {
                'ingenieria': { show: 'Ingeniería', option: cian },
                'fabricacion': { show: 'Fabricación', option: yellow },
                'administracion': { show: 'Administración', option: yellow },
                'proyectos': { show: 'Proyectos', option: yellow },
                'default': { show: 'Todas', option: green }
            };

            const permisoMap = {
                'diseno': { show: 'Diseño', option: cian },
                'simulacion': { show: 'Simulación', option: yellow },
                'disenoSimulacion': { show: 'Diseño/Simulación', option: red },
                'cadCam': { show: 'Cad-Cam', option: grey },
                'projectManager': { show: 'Project Manager', option: black },
                'mecanizado': { show: 'Mecanizado', option: yellow },
                'ajuste': { show: 'Ajuste', option: red },
                'default': { show: 'Todos', option: blue }
            };

            let showArea = areaMap[element.area]?.show || areaMap['default'].show;
            optionArea = areaMap[element.area]?.option || areaMap['default'].option;

            let showPermiso = permisoMap[element.permiso]?.show || permisoMap['default'].show;
            optionPermiso = permisoMap[element.permiso]?.option || permisoMap['default'].option;

            let superAdmin = element.superAdmin 
                ? '<i class="fa-solid fa-crown fa-rotate-by fa-xl" title="SuperAdmin" style="color: #a89c0d; --fa-rotate-angle: 20deg;"></i>' 
                : null;

            element.visible && !element.superAdmin ? disabled = '' : null

            return (`
                <div class="col mx-auto">
                    <div class="card mx-auto rounded-2 shadow-lg" style="max-width: 540px;">
                        <div class="row align-items-center">
                            <div class="col-md-4 text-center">
                                <img src="${element.avatar}"
                                    style="max-width=160vw; object-fit: contain;"
                                    class="img-fluid rounded p-3 mx-auto"
                                    alt="Avatar Usuario">
                            </div>
                            <div class="col-md-8 border-start">
                                <div class="card-body">
                                    <h6 class="card-title"><strong>${element.name} ${element.lastName}</strong></h6>
                                    <h7 class="card-title">Legajo #<strong>${element.legajoId}</strong></h7> 
                                    <p class="card-text mb-1">Em@il: ${element.email}</p>
                                    <p class="card-text mb-1">Username: ${element.username}</p>
                                    Status: <span class="badge rounded-pill bg-${optionStatus} my-1">${showStatus}</span><br>
                                    Rol: <span class="badge rounded-pill bg-${optionAdmin} my-1">${showAdmin}
                                            <span class="position-absolute top-0 start-100 translate-middle">
                                                ${superAdmin}
                                            </span>
                                        </span><br>
                                    Area: <span class="badge rounded-pill bg-${optionArea} my-1">${showArea}</span><br>
                                    Permisos: <span class="badge rounded-pill bg-${optionPermiso}">${showPermiso}</span>
                                </div>
                                <div class="card-footer px-2">
                                    <div class="row">
                                        <div class="col m-auto">
                                            <a class="btn text-light small" ${disabled} type="submit" href="/api/usuarios/${element._id}"
                                                style="background-color: #272787; font-size: .85rem; width: 15em;">
                                                    <i class="fa-solid fa-info-circle"></i>
                                                        Info Usuario
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            )
        }).join(" ");

        let mensaje = ''
        arrUsersSearch.length ===1
        ? mensaje = `Se encontró <strong>${arrUsersSearch.length}</strong> resultado.`
        : mensaje = `Se encontraron <strong>${arrUsersSearch.length}</strong> resultados.`
        
        const htmlResultados = `<div class="row align-items-center">
                                    <div class="col mx-auto">
                                        <span class="my-1">${mensaje}</span>
                                    </div>
                                </div>`

        document.getElementById('showCountUsersSearch').innerHTML = htmlResultados

        document.getElementById('showUsersSearch').innerHTML = htmlSearchUsers
    }
}

//*******************************************************/
// -------------- Show Searched Suppliers ----------------
socket.on('searchSuppliersAll', async (arrSupplierSearch) => {
    renderSearchedSuppliers (await arrSupplierSearch)
})

const searchSuppliers = () => {
    let querySupplier = document.getElementById('querySuppliers').value,
        statusSupplier = document.getElementById('statusSupplier').value,
        typeSupplier = document.getElementById('typeSupplier').value

    statusSupplier != 'todas' ? statusSupplier === 'activos' ? statusSupplier = true : statusSupplier = false : null
        
    socket.emit('searchProveedorAll', {
        querySupplier,
        statusSupplier,
        typeSupplier
    })
    return false
}

const renderSearchedSuppliers = (arrSupplierSearch) => {
    document.getElementById('showCountSuppliersSearch').innerHTML = ''
    
    if(arrSupplierSearch.length === 0) {
        const htmlSearchSupplierNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Proveedor no encontrado">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Proveedor no encontrado</h5>
                                <p class="card-text">Lo siento, no pudimos encontrar el Proveedor</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        
        const showSupplier = document.getElementById('showSuppliersSearch')
        showSupplier ? showSupplier.innerHTML = htmlSearchSupplierNull : null

    } else if (arrSupplierSearch.length === 1 && arrSupplierSearch[0] === 'vacio') {     
        const htmlSearchSuppliersNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Todas las Proveedores">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Todas las Proveedores</h5>
                                <p class="card-text">Todas las Proveedors están listadas en la tabla de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente o haga scroll hacia abajo
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showSuppliersSearch').innerHTML = htmlSearchSuppliersNull

    } else {
        const htmlSearchSuppliers = arrSupplierSearch.map((element) => {
            let disabled = 'disabled', green = 'success', red = 'danger', info = 'info', blue = 'primary', grey = 'secondary'
            const active = 'Activo', inactive = 'Mantenimiento'
            const cnc = 'CNC', press = 'Prensa', other = 'Otras'
            
            let optionStatus = element.status ? green : red,
                showType, optionType
            
            if (element.type === 'cnc') {
                optionType = info
                showType = cnc
            } else if (element.type === 'prensa') {
                optionType = grey
                showType = press
            } else {
                optionType = blue
                showType = other
            }

            let showStatus = element.status ? active : inactive
            element.visible ? disabled = '' : null

            return (`
                <div class="col mx-auto">
                    <div class="card mx-auto rounded-2 shadow-lg" style="max-width: 540px;">
                        <div class="row align-items-center">
                            <div class="col-md-4 text-center">
                                <img src="${element.imageSupplier}"
                                    style="max-width=160vw; object-fit: contain;"
                                    class="img-fluid rounded p-3 mx-auto"
                                    alt="Proveedor">
                            </div>
                            <div class="col-md-8 border-start">
                                <div class="card-body">
                                    <h6 class="card-title"><strong>${element.designation}</strong></h6>
                                    <h7 class="card-title">Código #<strong>${element.code}</strong></h7><br>
                                    Tipo: <span class="badge rounded-pill bg-${optionType} my-1">${showType}</span><br>
                                    Status: <span class="badge rounded-pill bg-${optionStatus} my-1">${showStatus}</span><br>
                                </div>
                                <div class="card-footer px-2">
                                    <div class="row">
                                        <div class="col m-auto">
                                            <a class="btn text-light small" ${disabled} type="submit" href="/api/maquinas/${element._id}"
                                                style="background-color: #272787; font-size: .85rem; width: 15em;">
                                                    <i class="fa-solid fa-info-circle"></i> Info Proveedor
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            )
        }).join(" ");

        let mensaje = ''
        arrSupplierSearch.length ===1
        ? mensaje = `Se encontró <strong>${arrSupplierSearch.length}</strong> resultado.`
        : mensaje = `Se encontraron <strong>${arrSupplierSearch.length}</strong> resultados.`
        
        const htmlResultados = `<div class="row align-items-center">
                                    <div class="col mx-auto">
                                        <span class="my-1">${mensaje}</span>
                                    </div>
                                </div>`

        document.getElementById('showCountSuppliersSearch').innerHTML = htmlResultados
        document.getElementById('showSuppliersSearch').innerHTML = htmlSearchSuppliers
    }
}

//*******************************************************/
// -------------- Show Searched Tools ----------------
socket.on('searchToolsAll', async (arrToolSearch) => {
    renderSearchedTools (await arrToolSearch)
})

const searchTools = () => {
    const queryTool = document.getElementById('queryTools').value
    let statusTool = document.getElementById('statusTool').value,
        typeTool = document.getElementById('typeTool').value

    statusTool != 'todas' ? statusTool === 'activas' ? statusTool = true : statusTool = false : null
        
    socket.emit('searchMaquinaAll', {
        queryTool,
        statusTool,
        typeTool
    })
    return false
}

const renderSearchedTools = (arrToolSearch) => {
    document.getElementById('showCountToolsSearch').innerHTML = ''
    
    if(arrToolSearch.length === 0) {
        const htmlSearchToolNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Máquina no encontrada">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Máquina no encontrada</h5>
                                <p class="card-text">Lo siento, no pudimos encontrar la Maquina</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        
        const showTool = document.getElementById('showToolsSearch')
        showTool ? showTool.innerHTML = htmlSearchToolNull : null

    } else if (arrToolSearch.length === 1 && arrToolSearch[0] === 'vacio') {     
        const htmlSearchToolsNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Todas las Maquinas">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Todas las Maquinas</h5>
                                <p class="card-text">Todas las Maquinas están listadas en la tabla de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente o haga scroll hacia abajo
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showToolsSearch').innerHTML = htmlSearchToolsNull

    } else {
        const htmlSearchTools = arrToolSearch.map((element) => {
            let disabled = 'disabled', green = 'success', red = 'danger', info = 'info', blue = 'primary', grey = 'secondary'
            const active = 'Activo', inactive = 'Mantenimiento'
            const cnc = 'CNC', press = 'Prensa', other = 'Otras'
            
            let optionStatus = element.status ? green : red,
                showType, optionType
            
            if (element.type === 'cnc') {
                optionType = info
                showType = cnc
            } else if (element.type === 'prensa') {
                optionType = grey
                showType = press
            } else {
                optionType = blue
                showType = other
            }

            let showStatus = element.status ? active : inactive
            element.visible ? disabled = '' : null

            return (`
                <div class="col mx-auto">
                    <div class="card mx-auto rounded-2 shadow-lg" style="max-width: 540px;">
                        <div class="row align-items-center">
                            <div class="col-md-4 text-center">
                                <img src="${element.imageTool}"
                                    style="max-width=160vw; object-fit: contain;"
                                    class="img-fluid rounded p-3 mx-auto"
                                    alt="Maquina">
                            </div>
                            <div class="col-md-8 border-start">
                                <div class="card-body">
                                    <h6 class="card-title"><strong>${element.designation}</strong></h6>
                                    <h7 class="card-title">Código #<strong>${element.code}</strong></h7><br>
                                    Tipo: <span class="badge rounded-pill bg-${optionType} my-1">${showType}</span><br>
                                    Status: <span class="badge rounded-pill bg-${optionStatus} my-1">${showStatus}</span><br>
                                </div>
                                <div class="card-footer px-2">
                                    <div class="row">
                                        <div class="col m-auto">
                                            <a class="btn text-light small" ${disabled} type="submit" href="/api/maquinas/${element._id}"
                                                style="background-color: #272787; font-size: .85rem; width: 15em;">
                                                    <i class="fa-solid fa-info-circle"></i> Info Maquina
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            )
        }).join(" ");

        let mensaje = ''
        arrToolSearch.length ===1
        ? mensaje = `Se encontró <strong>${arrToolSearch.length}</strong> resultado.`
        : mensaje = `Se encontraron <strong>${arrToolSearch.length}</strong> resultados.`
        
        const htmlResultados = `<div class="row align-items-center">
                                    <div class="col mx-auto">
                                        <span class="my-1">${mensaje}</span>
                                    </div>
                                </div>`

        document.getElementById('showCountToolsSearch').innerHTML = htmlResultados
        document.getElementById('showToolsSearch').innerHTML = htmlSearchTools
    }
}


//*******************************************************/
// -------------- Show Searched CuttingTools ----------------
socket.on('searchCuttingToolsAll', async (arrCuttingToolSearch) => {
    renderSearchedCuttingTool (await arrCuttingToolSearch)
})

const searchCuttingTools = () => {
    let queryCuttingTool = document.getElementById('queryCuttingTools').value,
        statusCuttingTool = document.getElementById('statusCuttingTool').value,
        typeCuttingTool = document.getElementById('typeCuttingTool').value,
        diamCuttingTool = document.getElementById('diamCuttingTool').value
        largoCuttingTool = document.getElementById('largoCuttingTool').value

    statusCuttingTool != 'todas' ? statusCuttingTool === 'activas' ? statusCuttingTool = true : statusCuttingTool = false : null
        
    socket.emit('searchHerramientaAll', {
        queryCuttingTool,
        statusCuttingTool,
        typeCuttingTool,
        diamCuttingTool,
        largoCuttingTool,
    })
    return false
}

const renderSearchedCuttingTool = (arrCuttingToolSearch) => {
    document.getElementById('showCountCuttingToolsSearch').innerHTML = ''

    if(!arrCuttingToolSearch) {
        const htmlSearchCuttingToolNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Herramienta no encontrada">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Herramienta no encontrada</h5>
                                <p class="card-text">Lo siento, no pudimos encontrar la Herramienta</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con una designación, tipo o código diferente.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        
        const showCuttingTool = document.getElementById('showCuttingToolsSearch')
        showCuttingTool ? showCuttingTool.innerHTML = htmlSearchCuttingToolNull : null

    } else if (arrCuttingToolSearch.length === 1 && arrCuttingToolSearch[0] === 'vacio') {     
        const htmlSearchCuttingToolsNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Todas las Herramientas">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Todas las Herramientas</h5>
                                <p class="card-text">Todas las Herramientas están listadas en la tabla de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente o haga scroll hacia abajo
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showCuttingToolsSearch').innerHTML = htmlSearchCuttingToolsNull

    } else {
        const htmlSearchCuttingTools = arrCuttingToolSearch.map((element) => {
            const statusClasses = { true: 'success', false: 'danger' };
            const typeMapping = {
                TOR: { label: 'Toricas', class: 'warning', text: 'dark' },
                PLA: { label: 'Planas', class: 'secondary', text: 'light' },
                ESF: { label: 'Esfericas', class: 'primary', text: 'light' }
            };
            const diamMapping = {
                16: 16, 20: 20, 25: 25, 32: 32, 50: 50, 52: 52, 63: 63, 80: 80, 100: 100, 125: 125,
                default: 0,
            };

            const largoMapping = {
                15: 15, 20: 20, 25: 25, 30: 30, 40: 40, 45: 45, 50: 50, 57: 57, 60: 60, 63: 63, 65: 65, 66: 66, 68: 68, 70: 70, 75: 75, 76: 76, 77: 77, 78: 78, 81: 81, 86: 86, 88: 88, 89: 89, 90: 90, 91: 91, 94: 94, 96: 96, 97: 97, 98: 98,
                100: 100, 102: 102, 107: 107, 108: 108, 110: 110, 111: 111, 113: 113, 116: 116, 119: 119, 120: 120, 121: 121, 123: 123, 125: 125, 128: 128, 130: 130, 131: 131, 132: 132, 138: 138, 140: 140, 142: 142, 143: 143, 144: 144, 146: 146, 147: 147, 148: 148,
                150: 150, 152: 152, 154: 154, 155: 155, 158: 158, 163: 163, 164: 164, 165: 165, 170: 170, 173: 173, 175: 175, 176: 176, 177: 177, 180: 180, 182: 182, 183: 183, 186: 186, 188: 188, 191: 191, 192: 192, 196: 196, 197: 197, 198: 198,
                200: 200, 204: 204, 210: 210, 214: 214, 216: 216, 217: 217, 220: 220, 221: 221, 223: 223, 225: 225, 226: 226, 230: 230, 231: 231, 233: 233, 238: 238, 241: 241, 248: 248, 254: 254, 264: 264, 265: 265, 269: 269, 270: 270, 276: 276, 277: 277, 286: 286, 291: 291, 296: 296,
                300: 300, 302: 302, 210: 310, 311: 311, 321: 321, 330: 330, 331: 331, 341: 341, 342: 342, 343: 343, 350: 350, 351: 351, 376: 376, 377: 377, 386: 386, 391: 391, 394: 394, 400:400, 442: 442, 450: 450, 500:500,
                default: 0,
            };
        
            // Determinar valores dinámicos
            const optionStatus = statusClasses[element.status] || 'danger',
                { label: showType, class: optionType, text: optionText } = typeMapping[element.type] || typeMapping.default,
                showDiam = diamMapping[element.diam] || diamMapping.default,
                showLargo = largoMapping[element.largo] || largoMapping.default,
                showStatus = element.status ? 'Activo' : 'Inactiva',
                optionStock = element.stock > 0 ? 'dark' : 'danger',
                disabled = element.visible ? '' : 'disabled';
        
            // Retornar el HTML generado
            return (`
                <div class="col mx-auto">
                    <div class="card mx-auto rounded-2 shadow-lg" style="max-width: 540px;">
                        <div class="row align-items-center">
                            <div class="col-md-4 text-center">
                                <img src="${element.imageCuttingTool}" style="max-width=170vw; object-fit: contain;"
                                    class="img-fluid rounded p-2 mx-auto" alt="Herramienta">
                            </div>
                            <div class="col-md-8 border-start">
                                <div class="card-body">
                                    <h6 class="card-title"><strong>${element.designation}</strong></h6>
                                    Código: <span class="my-1"><strong>${element.code}</strong></span><br>
                                    Tipo: <span class="badge rounded-pill bg-${optionType} text-${optionText} my-1">${showType}</span><br>
                                    Diámetro: <span class="my-1">${showDiam}mm.</span><br>
                                    Largo: <span class="my-1">${showLargo}mm.</span><br>
                                    Status: <span class="badge rounded-pill bg-${optionStatus} my-1">${showStatus}</span><br>
                                    Stock: <span class="badge bg-${optionStock} text-light">${element.stock}</span><br>
                                    </div>
                                <div class="card-footer px-2">
                                    <div class="row">
                                        <div class="col m-auto">
                                            <a class="btn text-light small" ${disabled} type="submit" href="/api/herramientas/${element._id}"
                                                style="background-color: #272787; font-size: .85rem; width: auto;">
                                                <i class="fa-solid fa-info-circle"></i> Info Herramienta
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }).join(" ");

        let mensaje = ''
        arrCuttingToolSearch.length ===1
        ? mensaje = `Se encontró <strong>${arrCuttingToolSearch.length}</strong> resultado.`
        : mensaje = `Se encontraron <strong>${arrCuttingToolSearch.length}</strong> resultados.`
        
        const htmlResultados = `<div class="row align-items-center">
                                    <div class="col mx-auto">
                                        <span class="my-1">${mensaje}</span>
                                    </div>
                                </div>`

        document.getElementById('showCuttingToolsSearch').innerHTML = htmlSearchCuttingTools
        document.getElementById('showCountCuttingToolsSearch').innerHTML = htmlResultados
    }
}

//*******************************************************/
// -------------- Show Searched Consumibles ----------------
socket.on('searchConsumiblesAll', async (arrConsumiblesSearch) => {
    renderSearchedConsumibles (await arrConsumiblesSearch)
})

const searchConsumibles = () => {
    let queryConsumibles = document.getElementById('queryConsumibles').value,
        statusConsumibles = document.getElementById('statusConsumible').value,
        typeConsumibles = document.getElementById('typeConsumible').value,
        talleConsumibles = document.getElementById('talleConsumible').value,
        stockConsumibles = document.getElementById('stockConsumible').value;
        
    statusConsumibles != 'todos' ? statusConsumibles === 'activos' ? statusConsumibles = true : statusConsumibles = false : null
    
    socket.emit('searchConsumibleAll', {
        queryConsumibles,
        statusConsumibles,
        typeConsumibles,
        talleConsumibles,
        stockConsumibles
    })
    return false
}

const renderSearchedConsumibles = (arrConsumiblesSearch) => {
    document.getElementById('showCountConsumiblesSearch').innerHTML = ''

    let userRol = (document.getElementById('mostrarRolUser').innerText).trim().toLowerCase();

    if(!arrConsumiblesSearch) {
        const htmlSearchConsumiblesNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}" style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1" alt="Consumible no encontrado">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h6 class="card-title-noEllipsis">Consumible no encontrado</h6>
                                <p class="card-text">Lo siento, no pudimos encontrar el consumible</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con una designación, tipo o código diferente.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        
        const showConsumibles = document.getElementById('showConsumiblesSearch')
        showConsumibles ? showConsumibles.innerHTML = htmlSearchConsumiblesNull : null

    } else if (arrConsumiblesSearch.length === 1 && arrConsumiblesSearch[0] === 'vacio') {     
        const htmlSearchConsumiblesNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}" style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1" alt="Todos los Consumibles o EPP">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title-noEllipsis">Todos los Consumibles</h5>
                                <p class="card-text">Todos los Consumibles o EPP están listados en la tabla de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre o código diferente o haga scroll hacia abajo
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showConsumiblesSearch').innerHTML = htmlSearchConsumiblesNull

    } else {
        const htmlSearchConsumibles = arrConsumiblesSearch.map((element) => {
            const statusClasses = { true: 'success', false: 'danger' },
                typeMapping = {
                epp: { label: 'EPP', class: 'warning', text: 'dark' },
                ropa: { label: 'Ropa', class: 'success', text: 'light' },
                consumiblesLineas: { label: 'Consumibles Líneas', class: 'secondary', text: 'light' },
                consumiblesAjuste: { label: 'Consumibles Ajuste', class: 'primary', text: 'light' },
                consumiblesMeca: { label: 'Consumibles Mecanizado', class: 'dark', text: 'light' },
                otros: { label: 'Otros', class: 'info', text: 'dark' }
            };
            let color = '', redHeart = '';

            // Función para extraer y mostrar los datos del campo stock
            let size, total, totalStock = 0
            function processStock(element) {
                if (Object.keys(element.stock).length > 1) { // Si hay múltiples talles
                    Object.entries(element.stock).forEach(([size, stock]) => {
                        return size, stock
                    });
                    totalStock = Object.values(element.stock).reduce((total, stock) => total + stock, 0);
                    return totalStock

                } else { // Si no hay talles (solo un valor)
                    size = Object.keys(element.stock)[0];
                    stock = parseInt(element.stock[size]);
                    totalStock = stock
                    return size, stock, totalStock
                }
            }

            // Procesar cada elemento
            processStock(element)
            
            // Determinar valores dinámicos
            const optionStatus = statusClasses[element.status] || 'danger',
                { label: showType, class: optionType, text: optionText } = typeMapping[element.type] || typeMapping.default,
                showStatus = element.status ? 'Activo' : 'Inactivo',
                optionStock = totalStock > 0 ? 'dark' : 'danger',
                disabled = element.visible ? '' : 'disabled';
        
            let tipoTalle = 'U',
                background = 'dark',
                disabledStockNull = '',
                disabledInputCardCheck = '';
            
            if (element.tipoTalle === 'talle') {
                tipoTalle = 'T'
                background = 'danger'
                userRol !== 'user' ? disabledInputCardCheck = 'disabled' : null 

            } else if (element.tipoTalle === 'numero') {
                tipoTalle = 'N'
                background = 'primary'
                userRol !== 'user' ? disabledInputCardCheck = 'disabled' : null
            }

            totalStock === 0 ? (color = 'background-color:rgba(215, 0, 0, 0.36)', disabledStockNull = 'disabled') : color
            totalStock === 0 && userRol === 'user' ? disabledInputCardCheck = 'disabled' : null

            if (element.favorito === 5) {
                redHeart = `<i class="fa-solid fa-heart position-absolute top-0 start-0 text-primary" 
                                style="font-size: 1.7em; z-index: 100 ;transform: translate(150%, 50%) !important;">
                            </i>`
            }

            // Retornar el HTML generado
            return (`
                <div class="col mx-auto">
                    <div class="card mx-auto rounded-2 shadow-lg h-100 d-flex flex-column position-relative" id="cardSelected_${element._id}" style="${color}">
                        <div class="row g-0 flex-grow-1">
                            
                            <div class="col-md-4 text-center d-flex align-items-center">
                                <div class="card-body">
                                    <img id="imageConsumible_${element._id}" src="${element.imageConsumible}" 
                                        style="max-width:170px; object-fit: contain;"
                                        class="img-fluid rounded p-3" alt="Consumibles">
                                    <br>
                                    <input class="form-check-input border border-2 border-primary shadow-lg rounded mt-2" 
                                        type="checkbox" id="inputCheckConsumibleCard_${element._id}" ${disabledInputCardCheck}>
                                </div>
                            </div>

                            <div class="col-md-8">
                                <div class="card-body h-100 d-block flex-column">
                                    <p id="cardDesignation_${element._id}" class="card-title"><strong>${element.designation}</strong></p>
                                    Código: <span id="cardCodigo_${element._id}" class="my-1"><strong>${element.code}</strong></span><br>
                                    <span id="cardTipo_${element._id}" class="badge rounded-pill bg-${optionType} text-${optionText} my-1">
                                        ${showType}
                                    </span>
                                    <br>
                                    <span class="badge rounded-pill bg-${optionStatus} my-1">
                                        ${showStatus}
                                    </span>
                                    <br>
                                    Tipo Stock: <span class="badge bg-${background} text-light">${tipoTalle}</span> /
                                    Stock: <span id="cardStock_${element._id}" class="badge bg-${optionStock} text-light">${totalStock}</span>
                                    <div class="mt-auto"></div>
                                    <input id="limMaxUser_${element._id}" class="d-none" type="hidden" value="${element.limMaxUser}">
                                </div>
                            </div>
                        </div>

                        <div class="card-footer px-2 mt-auto">
                            <div class="row">
                                <div class="col m-auto me-1">
                                    <a class="btn text-light small ${disabledStockNull}" ${disabled}
                                        style="background-color:rgb(17, 115, 0); font-size: .85rem;"
                                        href="/api/carts/add/${element._id}">
                                        Añadir al <i class="fa-solid fa-cart-plus"></i>
                                    </a>
                                </div>
                                <div class="col m-auto ms-1">
                                    <a class="btn text-light small" ${disabled}
                                        style="background-color: #272787; font-size: .85rem;"
                                        href="/api/consumibles/${element._id}">
                                        Ver Info <i class="fa-solid fa-circle-info"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        ${redHeart}
                    </div>
                </div>`);
        }).join(" ");

        let mensaje = ''
        arrConsumiblesSearch.length ===1
        ? mensaje = `Se encontró <strong>${arrConsumiblesSearch.length}</strong> resultado.`
        : mensaje = `Se encontraron <strong>${arrConsumiblesSearch.length}</strong> resultados.`
        
        const htmlResultados = `<div class="row align-items-center">
                                    <div class="col mx-auto">
                                        <span class="my-1">${mensaje}</span>
                                    </div>
                                </div>`

        document.getElementById('showConsumiblesSearch').innerHTML = htmlSearchConsumibles
        document.getElementById('showCountConsumiblesSearch').innerHTML = htmlResultados
    }
}


//*******************************************************/
// -------------- Show Searched Ordenes ----------------
socket.on('searchOrdenesAll', async (arrOrdenesSearch) => {
    renderSearchedOrdenes (await arrOrdenesSearch)
})

const searchOrdenes = () => {
    let queryOrdenes = document.getElementById('queryOrdenes').value,
        statusOrdenes = document.getElementById('statusOrdenes').value,
        solicitadasOrdenes = document.getElementById('queryUsuarios').value,
        fechaInicioOrdenes = document.getElementById('queryFechaDesde').value,
        fechaFinOrdenes = document.getElementById('queryFechaHasta').value
        
    statusOrdenes != 'todas'
        ? statusOrdenes != 'activas'
            ? statusOrdenes != 'preparadas'
                ? statusOrdenes = true
                : statusOrdenes = false
            : null
        : null
        
    socket.emit('searchOrdenAll', {
        queryOrdenes,
        statusOrdenes,
        solicitadasOrdenes,
        fechaInicioOrdenes,
        fechaFinOrdenes
    })
    return false
}

const renderSearchedOrdenes = (arrOrdenesSearch) => {
    document.getElementById('showCountOrdenesSearch').innerHTML = ''

    if(!arrOrdenesSearch) {
        const htmlSearchOrdenesNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}" style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1" alt="Orden no encontrada">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Orden no encontrada</h5>
                                <p class="card-text">Lo siento, no pudimos encontrar la orden</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con una descripción, tipo o código diferente.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        
        const showOrdenes = document.getElementById('showOrdenesSearch')
        showOrdenes ? showOrdenes.innerHTML = htmlSearchOrdenesNull : null

    } else if (arrOrdenesSearch.length === 1 && arrOrdenesSearch[0] === 'vacio') {     
        const htmlSearchOrdenesNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}" style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1" alt="Todas las Ordenes">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Todas las Ordenes</h5>
                                <p class="card-text">Todas las Ordenes están listadas en la tabla de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre, status o fechas diferentes o haga scroll hacia abajo
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showOrdenesSearch').innerHTML = htmlSearchOrdenesNull

    } else {
        const htmlSearchOrdenes = arrOrdenesSearch.map((element) => {
            const statusClasses = { true: 'danger', false: 'success' },
                typeMapping = {
                activas: { label: 'No Entregado', class: 'danger', text: 'light' },
                inactivas: { label: 'Entregado', class: 'success', text: 'light' },
                preparadas: { label: 'Preparado', class: 'warning', text: 'dark' },
                default: { label: 'Eliminado', class: 'primary', text: 'dark' }
            };
            let color = '';
        
            // Determinar valores dinámicos
            const optionStatus = statusClasses[element.status] || 'success',
                { label: showType, class: optionType, text: optionText } = typeMapping[element.type] || typeMapping.default,
                showStatus = element.status ? 'No Entregado' : 'Entregado',
                disabled = element.visible ? '' : 'disabled';
        
                !element.status ? color = 'background-color:rgba(39, 181, 0, 0.19)' : color

            let btnPreprared = Boolean(false),
                btnDelivered = Boolean(false),
                btnConfiguration = ''

            element.active ?
                element.prepared ? btnPreprared = Boolean(true) : null
            :
                btnPreprared = Boolean(true)

            if (!element.active) {
                btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                    <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-car"></i></button>
                                    <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-trash-can"></i></button>`
            } else if (btnPreprared && !btnDelivered) {
                btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                    <button id="btnCardDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-car"></i></button>
                                    <button id="${element._id}" name="btnCardDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-solid fa-trash-can"></i></button>`
            } else {
                btnConfiguration = `<button id="btnCardPrepareOrder_${element._id}" name="btnPrepareOrder" type="button" class="btn btn-warning btn-sm" title="Preparar Orden ...${idChain}"><i class="fa-solid fa-truck-fast"></i></button>
                                    <button id="btnCardDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-car"></i></button>
                                    <button id="${element._id}" name="btnCardDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-solid fa-trash-can"></i></button>`
            }
            // Retornar el HTML generado
            return (`
                <div class="col mx-auto">
                    <div class="card mx-auto rounded-2 shadow-lg" id="cardSelected_${element._id}" style="max-width: 540px; ${color}">
                        <div class="row align-items-center">
                            <div class="col-md-4 text-center">
                                <button id="cardDownloadOrder_${element._id}" name="cardDownloadOrder" type="button"
                                    class="btn btn-primary btn-sm p-2 mx-auto ms-2" title="Descargar pdf Orden"><i class="fa-solid fa-download"></i>
                                </button>
                                <input class="form-check-input border border-2 border-primary shadow-lg rounded mt-auto" type="checkbox" value=""
                                    id="inputCheckOrdenCard_${element._id}" name="inputCheckOrdenCard">
                            </div>
                            <div class="col-md-8 border-start">
                                <div class="card-body">
                                    <h6 id="cardDesignation_${element._id}" class="card-title"><strong>${element.invoice_nr}</strong></h6>
                                    Código: <span id="cardCodigo_${element._id}" class="my-1"><strong>${element.code}</strong></span><br>
                                    Status: <span class="badge rounded-pill bg-${optionStatus} my-1">${showStatus}</span><br>
                                    Solicitado por: <span id="cardSolicitado_${element._id}" class="badge rounded-pill bg-${optionType} text-${optionText} my-1">${showType}</span><br>
                                    Stock: <span id="cardStock_${element._id}" class="badge bg-${optionStock} text-light">${element.stock}</span><br>
                                </div>
                                <div class="card-footer px-2">
                                    <div class="row">
                                        <div class="col m-auto align-items-center text-center">
                                            ${btnConfiguration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }).join(" ");

        let mensaje = ''
        arrOrdenesSearch.length ===1
        ? mensaje = `Se encontró <strong>${arrOrdenesSearch.length}</strong> resultado.`
        : mensaje = `Se encontraron <strong>${arrOrdenesSearch.length}</strong> resultados.`
        
        const htmlResultados = `<div class="row align-items-center">
                                    <div class="col mx-auto">
                                        <span class="my-1">${mensaje}</span>
                                    </div>
                                </div>`

        document.getElementById('showOrdenesSearch').innerHTML = htmlSearchOrdenes
        document.getElementById('showCountOrdenesSearch').innerHTML = htmlResultados
    }

    function downloadPdf(orderNumber) {
        const pdfUrl = `https://storage.googleapis.com/imagenesproyectosingenieria/upload/PdfOrders/Invoice_${orderNumber}.pdf`;
    
        // Open the PDF in a new tab
        const newWindow = window.open(pdfUrl, '_blank');
    
        // Optional: Focus the new window (if supported by the browser)
        if (newWindow) {
            newWindow.focus();
        } else {
            // Fallback for browsers that block pop-ups
            alert('Por favor, autorice los pop-ups en este sitio para visualizar el PDF.');
        }
    }
    
    const nodeCardDownloadList = document.querySelectorAll('button[name="cardDownloadOrder"]')
    nodeCardDownloadList.forEach(function(card){
            if (card.id) {
                card.addEventListener("click", (event) => {
                    event.preventDefault()
                    const tdNodeList = document.querySelectorAll('td[name="invoiceNumber"]')
                    tdNodeList.forEach(function(td){
                        const invoiceId = document.getElementById(`invoice_${card.id.substring(17)}`)
                        if (td.innerHTML === invoiceId.innerText) {
                            const idInvoice = td.innerHTML.toString()
                            td.innerHTML ? downloadPdf(idInvoice) : null
                        }
                    })
                })
            }
        })

    const nodeList = document.querySelectorAll('button[name="btnCardDeleteOrder"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idOrden = btn.id,
                    userInformation = document.getElementById(`userInformation_${idOrden}`).innerText,
                    date = document.getElementById(`date_${idOrden}`).innerText

                idOrden && userInformation && date ? messageDeleteOrder(idOrden, userInformation, date) : null
            })
        }
    })
}


// -------------- Show Searched Ordenes by User ----------------
socket.on('searchOrdenesAllUser', async (arrOrdenesSearch) => {
    renderSearchedOrdenesUser (await arrOrdenesSearch)
})

const searchOrdenesUser = () => {
    let queryOrdenes = document.getElementById('queryOrdenes').value,
        statusOrdenes = document.getElementById('statusOrdenes').value,
        solicitadasOrdenes = document.getElementById('userNameBanner').innerText,
        fechaInicioOrdenes = document.getElementById('queryFechaDesde').value,
        fechaFinOrdenes = document.getElementById('queryFechaHasta').value

        
    socket.emit('searchOrdenAllUser', {
        queryOrdenes,
        statusOrdenes,
        solicitadasOrdenes,
        fechaInicioOrdenes,
        fechaFinOrdenes
    })
    return false
}

const renderSearchedOrdenesUser = (arrOrdenesSearch) => {
    document.getElementById('showCountOrdenesSearch').innerHTML = ''

    if(!arrOrdenesSearch) {
        const htmlSearchOrdenesNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}" style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1" alt="Orden no encontrada">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Orden no encontrada</h5>
                                <p class="card-text">Lo siento, no pudimos encontrar la orden</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con fechas, tipo o código diferente.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        
        const showOrdenes = document.getElementById('showOrdenesSearch')
        showOrdenes ? showOrdenes.innerHTML = htmlSearchOrdenesNull : null

    } else if (arrOrdenesSearch.length === 1 && arrOrdenesSearch[0] === 'vacio') {     
        const htmlSearchOrdenesNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 640px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${allClientsFound}" style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1" alt="Todas las Ordenes">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Todas las Ordenes</h5>
                                <p class="card-text">Todas las Ordenes están listadas en la tabla de abajo</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        Pruebe nuevamente con un nombre, status o fechas diferentes o haga scroll hacia abajo.
                                        La diferencia entre fechas no debe exeder los 30 días.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
        document.getElementById('showOrdenesSearch').innerHTML = htmlSearchOrdenesNull

    } else {
        const htmlSearchOrdenes = arrOrdenesSearch.map((element) => {
            const typeMapping = {
                prepared: { label: 'Preparado', class: 'warning', text: 'dark' },
                delivered: { label: 'Entregado', class: 'success', text: 'light' },
                notDelivered: { label: 'No Entregado', class: 'danger', text: 'light' },
                default: { label: 'Eliminado', class: 'primary', text: 'dark' }
            };
            
            // Determinar valores dinámicos
            let showType, optionType, optionText, color = '';
        
            if (element.prepared) {
                showType = typeMapping.prepared.label;
                optionType = typeMapping.prepared.class;
                optionText = typeMapping.prepared.text;
            } else if (!element.active) {
                showType = typeMapping.delivered.label;
                optionType = typeMapping.delivered.class;
                optionText = typeMapping.delivered.text;
            } else if (element.active && !element.prepared) {
                showType = typeMapping.notDelivered.label;
                optionType = typeMapping.notDelivered.class;
                optionText = typeMapping.notDelivered.text;
            } else {
                showType = typeMapping.default.label;
                optionType = typeMapping.default.class;
                optionText = typeMapping.default.text;
            }
        
            !element.active ? color = 'background-color:rgba(39, 181, 0, 0.19)' : color = 'background-color:rgba(181, 0, 0, 0.19)';
            element.prepared ? color = 'background-color:rgba(181, 172, 0, 0.19)' : null

            let btnConfiguration = '',
                idChain = element._id.substring(19);
        
            element.active
            ? element.prepared
                ? btnPreprared = Boolean(true) : null
            : btnPreprared = Boolean(true);
        
            !element.active
            ? btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-trash-can"></i></button>`
            : btnConfiguration = `<button id="${element._id}" name="btnCardDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-solid fa-trash-can"></i></button>`;
        
            let utcDate = new Date(element.timestamp),
                localDate = new Date(utcDate.getTime() + offset),
                formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0];
        
            // Retornar el HTML generado
            return (`
                <div class="col mx-auto">
                    <div class="card mx-auto rounded-2 shadow-lg" id="cardSelected_${element._id}" style="max-width: 540px; ${color}">
                        <div class="row align-items-center">
                            <div class="col-md-auto mx-auto">
                                <div class="card-body">
                                    <h6 id="cardDesignation_${element._id}" class="card-title"><strong>...${idChain}</strong></h6>
                                    # Solicitud: <span id="cardCodigo_${element._id}" class="my-1"><strong>${element.invoice_nr}</strong></span><br>
                                    Status: <span class="badge rounded-pill bg-${optionType} my-1">${showType}</span><br>
                                    Fecha solicitud: ${formattedDate}<br>
                                    Solicitado por: <strong>${element.shipping[0].name} ${element.shipping[0].lastName} - ${element.shipping[0].legajoIdUser}</strong><br>
                                </div>
                                <div class="card-footer px-2">
                                    <div class="row">
                                        <div class="col m-auto align-items-center text-center">
                                            <button id="cardDownloadOrder_${element._id}" name="cardDownloadOrder" type="button" class="btn btn-primary btn-sm" title="Descargar pdf Orden ...${idChain}"><i class="fa-solid fa-download"></i></button>
                                            ${btnConfiguration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }).join(" ");

        let mensaje = ''
        arrOrdenesSearch.length ===1
        ? mensaje = `Se encontró <strong>${arrOrdenesSearch.length}</strong> resultado.`
        : mensaje = `Se encontraron <strong>${arrOrdenesSearch.length}</strong> resultados.`
        
        const htmlResultados = `<div class="row align-items-center">
                                    <div class="col mx-auto">
                                        <span class="my-1">${mensaje}</span>
                                    </div>
                                </div>`

        document.getElementById('showOrdenesSearch').innerHTML = htmlSearchOrdenes
        document.getElementById('showCountOrdenesSearch').innerHTML = htmlResultados
    }

    function downloadPdf(orderNumber) {
        const pdfUrl = `https://storage.googleapis.com/imagenesproyectosingenieria/upload/PdfOrders/Invoice_${orderNumber}.pdf`;
    
        // Open the PDF in a new tab
        const newWindow = window.open(pdfUrl, '_blank');
    
        // Optional: Focus the new window (if supported by the browser)
        if (newWindow) {
            newWindow.focus();
        } else {
            // Fallback for browsers that block pop-ups
            //TODO: Swal
            alert('Por favor, autorice los pop-ups en este sitio para visualizar el PDF.');
        }
    }
    
    const nodeCardDownloadList = document.querySelectorAll('button[name="cardDownloadOrder"]')
    nodeCardDownloadList.forEach(function(btn){
            if (btn.id) {
                btn.addEventListener("click", (event) => {
                    event.preventDefault()
                    const tdNodeList = document.querySelectorAll('td[name="invoiceNumber"]')
                    tdNodeList.forEach(function(td){
                        const invoiceId = document.getElementById(`invoice_${btn.id.substring(18)}`)
                        if (td.innerHTML === invoiceId.innerText) {
                            const idInvoice = td.innerHTML.toString()
                            td.innerHTML ? downloadPdf(idInvoice) : null
                        }
                    })
                })
            }
        })

    // ---- mensaje confirmacion eliminar Order -----------
    function messageDeleteOrder(idOrden, userInformation, date) {
        const idChain = idOrden.substring(19)
        const htmlForm =
            `La solicitud con fecha <b>${date}</b>, se eliminará completamente<br>
                para el <strong>Administrador de pañol</strong> y usted.<br>
                <strong>Esta acción no se puede deshacer!<strong><br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteOrder" action="/api/ordenes/delete/${idOrden}" method="post">
                    <fieldset>
                        <input type="hidden" id="screen" name="screen" value="0">
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Eliminar Orden Id#...${idChain}?`,
            position: 'center',
            width: 700,
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Eliminarlo! <i class="fa-solid fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formDeleteOrder").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminado!',
                        `La Orden Id#<b>...${idChain}</b>, ha sido eliminada exitosamente.`,
                        'success'
                    )
                }, 600)
            } else {
                Swal.fire(
                    'No eliminada!',
                    `La Orden Id#<b>...${idChain}</b>, no ha sido eliminada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnCardDeleteOrder"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idOrden = btn.id,
                    userInformation = document.getElementById(`userInformation_${idOrden}`).innerText,
                    date = document.getElementById(`date_${idOrden}`).innerText

                idOrden && userInformation && date ? messageDeleteOrder(idOrden, userInformation, date) : null
            })
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const fechaInicioInput = document.getElementById('queryFechaDesde');
    const fechaFinInput = document.getElementById('queryFechaHasta');

    // Fecha mínima permitida: 1/1/2025
    const fechaMinimaPermitida = new Date('2025-01-01');

    // Deshabilitar fechas anteriores al 1/1/2025 en ambos campos
    fechaInicioInput ? fechaInicioInput.min = fechaMinimaPermitida.toISOString().split('T')[0] : null;
    fechaFinInput ? fechaFinInput.min = fechaMinimaPermitida.toISOString().split('T')[0] : null;

    if (fechaInicioInput && fechaFinInput) {
        // Punto #1: Si se selecciona una fecha inicial, deshabilitar fechas anteriores en el campo de fecha final
        fechaInicioInput.addEventListener('change', () => {
            if (fechaInicioInput.value) {
                fechaFinInput.min = fechaInicioInput.value; // Fecha final no puede ser anterior a la fecha inicial
            } else {
                fechaFinInput.min = fechaMinimaPermitida.toISOString().split('T')[0]; // Restablecer al mínimo permitido
            }
        });

        // Punto #2: Si se selecciona una fecha final, deshabilitar fechas posteriores en el campo de fecha inicial
        fechaFinInput.addEventListener('change', () => {
            if (fechaFinInput.value) {
                fechaInicioInput.max = fechaFinInput.value; // Fecha inicial no puede ser posterior a la fecha final
            } else {
                fechaInicioInput.removeAttribute('max'); // Restablecer sin límite máximo
            }
        });

        // Punto #3: Validar que la fecha final no sea anterior a la fecha inicial
        const validarFechas = () => {
            if (fechaInicioInput.value && fechaFinInput.value) {
                const fechaInicio = new Date(fechaInicioInput.value);
                const fechaFin = new Date(fechaFinInput.value);

                if (fechaFin < fechaInicio) {
                    alert('La fecha final no puede ser anterior a la fecha inicial.');
                    fechaFinInput.value = ''; // Limpiar el campo de fecha final
                }
            }
        };

        fechaInicioInput.addEventListener('change', validarFechas);
        fechaFinInput.addEventListener('change', validarFechas);

        // - Si se borra la fecha inicial, restablecer el mínimo de la fecha final al 1/1/2025
        fechaInicioInput.addEventListener('input', () => {
            if (!fechaInicioInput.value) {
                fechaFinInput.min = fechaMinimaPermitida.toISOString().split('T')[0];
            }
        });

        // - Si se borra la fecha final, restablecer el máximo de la fecha inicial
        fechaFinInput.addEventListener('input', () => {
            if (!fechaFinInput.value) {
                fechaInicioInput.removeAttribute('max');
            }
        });
    }
});
//TODO:
// const deleteFilters = document.getElementById('deleteFilters')
//     console.log('deleteFilters: ', deleteFilters)
//     deleteFilters.addEventListener('clic', () => {
//         document.getElementById('showCountOrdenesSearch').innerHTML = ''
//         document.getElementById('showOrdenesSearch').innerHTML = ''
//         console.log('document.getElementById', document.getElementById('showCountOrdenesSearch'))
//     })