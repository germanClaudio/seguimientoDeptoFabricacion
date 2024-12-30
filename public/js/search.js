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
                                                        <i class="fa-regular fa-pen-to-square"></i>
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
                                                        <i class="fa-regular fa-pen-to-square"></i>
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
        stockConsumibles = document.getElementById('stockConsumible').value
        
    statusConsumibles != 'todas' ? statusConsumibles === 'activos' ? statusConsumibles = true : statusConsumibles = false : null
        
    socket.emit('searchConsumibleAll', {
        queryConsumibles,
        statusConsumibles,
        typeConsumibles,
        stockConsumibles
    })
    return false
}

const renderSearchedConsumibles = (arrConsumiblesSearch) => {
    document.getElementById('showCountConsumiblesSearch').innerHTML = ''

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
                                <h5 class="card-title">Consumible no encontrado</h5>
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
                                <h5 class="card-title">Todos los Consumibles</h5>
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
                insertos: { label: 'Insertos', class: 'secondary', text: 'light' },
                consumiblesAjuste: { label: 'Consumibles Ajuste', class: 'primary', text: 'light' },
                consumiblesMeca: { label: 'Consumibles Mecanizado', class: 'success', text: 'light' },
                otros: { label: 'Otros', class: 'info', text: 'dark' }
            };
            let color = '';
        
            // Determinar valores dinámicos
            const optionStatus = statusClasses[element.status] || 'danger',
                { label: showType, class: optionType, text: optionText } = typeMapping[element.type] || typeMapping.default,
                showStatus = element.status ? 'Activo' : 'Inactivo',
                optionStock = element.stock > 0 ? 'dark' : 'danger',
                disabled = element.visible ? '' : 'disabled';
        
                element.stock === 0 ? color = 'background-color: #ca000030' : color
            // Retornar el HTML generado
            return (`
                <div class="col mx-auto">
                    <div class="card mx-auto rounded-2 shadow-lg" id="cardSelected_${element._id}" style="max-width: 540px; ${color}">
                        <div class="row align-items-center">
                            <div class="col-md-4 text-center">
                                <img src="${element.imageConsumible}" style="max-width=170px; object-fit: contain;"
                                    class="img-fluid rounded p-2 mx-auto ms-2" alt="Consumibles">
                                <input class="form-check-input border border-2 border-primary shadow-lg rounded mt-auto" type="checkbox" value=""
                                    id="inputCheckConsumibleCard_${element._id}" name="inputCheckConsumibleCard">
                            </div>
                            <div class="col-md-8 border-start">
                                <div class="card-body">
                                    <h6 id="cardDesignation_${element._id}" class="card-title"><strong>${element.designation}</strong></h6>
                                    Código: <span id="cardCodigo_${element._id}" class="my-1"><strong>${element.code}</strong></span><br>
                                    Tipo: <span id="cardTipo_${element._id}" class="badge rounded-pill bg-${optionType} text-${optionText} my-1">${showType}</span><br>
                                    Status: <span class="badge rounded-pill bg-${optionStatus} my-1">${showStatus}</span><br>
                                    Stock: <span id="cardStock_${element._id}" class="badge bg-${optionStock} text-light">${element.stock}</span><br>
                                </div>
                                <div class="card-footer px-2">
                                    <div class="row">
                                        <div class="col m-auto">
                                            <a class="btn text-light small" ${disabled} type="submit" href="/api/consumibles/${element._id}"
                                                style="background-color: #272787; font-size: .85rem; width: auto;">
                                                <i class="fa-solid fa-info-circle"></i> Info Consumible
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