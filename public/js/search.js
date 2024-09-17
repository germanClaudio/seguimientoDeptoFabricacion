let clientNotFound = "../../../src/images/upload/LogoClientImages/dead-emoji-face.jpg"
let allClientsFound = "../../../src/images/upload/LogoClientImages/indiceAbajo.jpeg"

// -------------- Show Searched Clients Index page----------------
socket.on('searchClientsAll', async (arrClientSearch) => {
    renderSearchedClients (await arrClientSearch)
})

const searchClient = () => {
    const query = document.getElementById('query').value
    const status = document.getElementById('status').value
    const proyectosRadio = document.getElementsByName('projects')
    
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
            let disabled = 'disabled'
            let green = 'success'
            let red = 'danger'
            let text = "Activo"
            let grey = 'secondary'
            let blue = 'primary'
            let result = 'S/P'
            colorResult = grey

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
    const query = document.getElementById('query').value
    const status = document.getElementById('status').value
    const proyectosRadio = document.getElementsByName('projects')
    
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
            let disabled = 'disabled';
            let green = 'success';
            let red = 'danger';
            let text = "Activo";
            let grey = 'secondary';
            let blue = 'primary';
            let result = 'S/P';
            let colorResult = grey;

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
            const statusKey = element.status ? 'true' : 'false';
            const projectKey = element.project > 0 ? 'true' : 'false';

            const configValues = config[statusKey][projectKey];

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

        document.getElementById('showClientSearch').innerHTML = htmlSearchNewClient
    }
}


//*******************************************************/
// -------------- Show Searched Users ----------------
socket.on('searchUsersAll', async (arrUsersSearch) => {
    renderSearchedUsers (await arrUsersSearch)
})

const searchUsers = () => {
    const queryUser = document.getElementById('queryUsers').value
    let statusUser = document.getElementById('statusUser').value
    let rolUser = document.getElementById('rolUser').value
    const areaUser = document.getElementById('areaUser').value
    const permisoUser = document.getElementById('permisoUser').value

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
            console.log('element', element)
            let disabled = 'disabled'
            let green = 'success'
            let red = 'danger'
            let grey = 'secondary'
            let blue = 'primary'
            let cian = 'info'
            let yellow = 'warning'
            let white = 'light'
            let black = 'dark'

            const active = 'Activo'
            const inactive = 'Inactivo'
            const admin = 'Admin'
            const user = 'User'

            let optionStatus = element.status ? green : red
            let optionAdmin = element.admin ? black : grey
            let optionPermiso = element.permiso ? grey : red
            let optionArea = element.area ? cian : green
            let showStatus = element.status ? active : inactive
            let showAdmin = element.admin ? admin : user

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

        document.getElementById('showUsersSearch').innerHTML = htmlSearchUsers
    }
}

//*******************************************************/
// -------------- Show Searched Tools ----------------
socket.on('searchToolsAll', async (arrToolSearch) => {
    renderSearchedTools (await arrToolSearch)
})

const searchTools = () => {
    const queryTool = document.getElementById('queryTools').value
    let statusTool = document.getElementById('statusTool').value

    statusTool != 'todas' ?
        statusTool === 'activas' ? statusTool = true : statusTool = false
    : null
        
    socket.emit('searchMaquinaAll', {
        queryTool,
        statusTool
    })
    return false
}

const renderSearchedTools = (arrToolSearch) => {
    if(arrToolSearch.length === 0) {
        const htmlSearchToolNull = (
            `<div class="col mx-auto">
                <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto px-1">
                            <img src="${clientNotFound}"
                                style="max-width=170vw; object-fit: contain;"
                                class="img-fluid rounded p-1"
                                alt="Maquina no encontrada">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Maquina no encontrada</h5>
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
            let disabled = 'disabled'
            let green = 'success'
            let red = 'danger'

            const active = 'Activo'
            const inactive = 'Mantenimiento'
            
            let optionStatus = element.status ? green : red
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
        document.getElementById('showToolsSearch').innerHTML = htmlSearchTools
    }
}