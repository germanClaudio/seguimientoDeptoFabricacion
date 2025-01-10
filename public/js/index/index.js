const socket = io.connect()

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0'),
        MM = String(date.getMonth() + 1).padStart(2, '0'),
        YY = date.getFullYear(),
        hh = String(date.getHours()).padStart(2, '0'),
        mm = String(date.getMinutes()).padStart(2, '0'),
        ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', yellow = 'warning', black = 'dark', white = 'light',
        active = 'Activo', inactive = 'Inactivo', info = 'info',
        epp = 'EPP', insertos = 'Insertos', consumibleAjuste = 'Consumible Ajuste', consumibleMeca = 'Consumible Mecanizado', otros = 'Otros'
let html, stock

const typeConfigurations = {
    epp: { optionType: yellow, showType: epp, textColor: black },
    insertos: { optionType: grey, showType: insertos, textColor: white },
    consumiblesAjuste: { optionType: blue, showType: consumibleAjuste, textColor: white },
    consumiblesMeca: { optionType: black, showType: consumibleMeca, textColor: white },
    otros: { optionType: green, showType: otros, textColor: white }
};

// Configuración por defecto
const defaultConfig = { optionType: info, showType: 'Otro', textColor: black };


// -------------- Show All Clients ----------------
socket.on('clientsAll', async (arrClients) => {
    renderClient (await arrClients)
})

const addClient = () => {
        const newCliente = {
            creator: {
                uname: document.getElementById('unameHidden').value
            },
            name: document.getElementById('name').value,
            code: document.getElementById('code').value,
            logo: document.getElementById('logo').value,
            project: document.getElementById('project').value,
            status: Boolean(true),
            timestamp: formatDate(new Date())
        }
        
    socket.emit('newCliente', newCliente
    )
    return false
}

const renderClient = (arrClient) => {
    
    const html = arrClient.map((element) => {
        let disabled = 'disabled', result = 'S/P', text = "Activo",
            green = 'success', red = 'danger', grey = 'secondary', black = 'dark', blue = 'primary'
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
            return (`<div class="col-lg-3 col-md-4 col-sm-6 mx-auto">
                        <div class="card shadow-lg rounded-3 mx-auto my-4" style="width: 15rem; height: 25rem;">
                            <img src="${element.logo}" class="card-img-top mx-auto px-5 pt-2" alt="Logo Cliente" style="min-height: 10rem; object-fit: contain;">
                            <div class="card-body">
                                <h6 class="card-title"><strong>${element.name}</strong></h6>
                                <p class="card-text">Codigo: ${element.code}<br>
                                                        <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                                        Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}</span>
                                </p>
                                <div class="card-footer card-footer-client">
                                    <a class="btn mx-auto text-light w-75 my-1 small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}" style="background-color: #1d1d1d;">
                                        <i class="icon-rocket"></i>
                                            Proyectos
                                    </a>        
                                    <a class="btn mx-auto text-light w-75 my-1 small" type="submit" href="/api/clientes/select/${element._id}" style="background-color: #272787;">
                                        <i class="fa-solid fa-info-circle"></i>
                                            Cliente
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>`)
        
        } else {
            return (`<div class="col-lg-3 col-md-4 col-sm-6 mx-auto">
                        <div class="card shadow-lg rounded-3 mx-auto my-4 pe-none" contenteditable="false" style="width: 15rem; height: 25rem; background-color: #00000060; opacity: 0.5" title="Consulte a SuperAdmin">
                            <img src="${element.logo}" class="card-img-top mx-auto px-5 pt-2" alt="Logo Cliente" style="min-height: 10rem; object-fit: contain;">
                            <div class="card-body">
                                <h6 class="card-title"><strong>${element.name}</strong></h6>
                                <p class="card-text">Codigo: ${element.code}<br>
                                                        <span class="badge rounded-pill bg-${colorStatus}">${text}</span><br>
                                                        Proyectos: <span class="badge rounded-pill bg-${colorResult}">${result}</span>
                                </p>
                                <div class="card-footer card-footer-client disabled" style="background-color: #aabbaa25">
                                    <a class="btn mx-auto text-light w-75 my-1 small ${disabled}" type="submit" href="/api/clientes/projects/${element._id}" style="background-color: #1d1d1d;">
                                        <i class="icon-rocket"></i>
                                            Proyectos
                                    </a>        
                                    <a class="btn mx-auto text-light w-75 my-1 small ${disabled}" type="submit" href="/api/clientes/select/${element._id}" style="background-color: #272787;">
                                        <i class="fa-solid fa-info-circle"></i>
                                            Cliente
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>`
            )
        }
    }).join(" ");
    document.getElementById('mostrarClientes').innerHTML = html
}


// -------------- Show All Consumibles ----------------
socket.on('consumiblesAll', async (arrConsumibles) => {
    renderConsumible (await arrConsumibles)
})

const renderConsumible = (arrConsumible) => {
    const html = arrConsumible.map((element) => {
        let disabled = '',
            optionStatus = element.status ? green : (red, disabled = 'disabled'),
            optionStock = element.stock>0 ? black : (red, disabled = 'disabled')
            
        // Obtener configuración según el tipo o usar la configuración por defecto
        const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

        let showStatus = element.status ? active : inactive

        if (element.visible) {
            return (
                `<div class="col-lg-3 col-md-4 col-sm-6 mx-auto">
                    <div class="card shadow-lg rounded-3 mx-auto my-4" style="width: 15rem; height: 25rem;">
                        <img src="${element.imageConsumible}" class="card-img-top mx-auto px-5 pt-2" alt="Imagen Consumible" style="min-height: 10rem; object-fit: contain;">
                        <div class="card-body">
                            <h6 class="card-title"><strong>${element.designation}</strong></h6>
                            <p class="card-text">
                                Código: ${element.code}<br>
                                Tipo: <span class="badge bg-${optionType} text-${textColor}"> ${showType}</span><br>
                                Status: <span class="badge rounded-pill bg-${optionStatus}">${showStatus}</span><br>
                                Stock: <span class="badge rounded-pill bg-${optionStock} text-light">${element.stock}</span>
                            </p>
                            <div class="card-footer card-footer-client">
                                <a class="btn mx-auto text-light my-1 small ${disabled}" type="submit" href="/api/consumibles/update/${element._id}" style="background-color: #1d1d1d;">
                                    <i class="icon-basket"></i> Info Consumible
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`)
        }
    }).join(" ");

    document.getElementById('mostrarConsumibles').innerHTML = html
}

