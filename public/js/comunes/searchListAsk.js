let clientNotFound = "../../../src/images/upload/LogoClientImages/dead-emoji-face.jpg",
    allClientsFound = "../../../src/images/upload/LogoClientImages/indiceAbajo.jpeg"

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
            
            // Determinar valores dinámicos
            const optionStatus = statusClasses[element.status] || 'danger',
                { label: showType, class: optionType, text: optionText } = typeMapping[element.type] || typeMapping.default,
                showStatus = element.status ? 'Activo' : 'Inactivo',
                optionStock = element.stock > 0 ? 'dark' : 'danger',
                disabled = element.visible ? '' : 'disabled';
        
            // Retornar el HTML generado

            if (element.stock === 0) {
                return (`
                    <div class="col mx-auto">
                        <div class="card mx-auto rounded-2 shadow-lg" id="cardSelected_${element._id}" style="max-width: 540px; background-color: #ca000030">
                            <div class="row align-items-center">
                                <div class="col-md-4 text-center">
                                    <img src="${element.imageConsumible}" style="max-width=170px; object-fit: contain;"
                                        class="img-fluid rounded p-2 mx-auto ms-2" alt="Consumibles">
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
                                                <span class="badge rounded-pill bg-danger m-1">Sin stock disponible! <i class="fa-regular fa-face-sad-tear"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);

            } else {
                return (`
                    <div class="col mx-auto">
                        <div class="card mx-auto rounded-2 shadow-lg" id="cardSelected_${element._id}" style="max-width: 540px;">
                            <div class="row align-items-center">
                                <div class="col-md-4 text-center">
                                    <img src="${element.imageConsumible}" style="max-width=170px; object-fit: contain;"
                                        class="img-fluid rounded p-2 mx-auto ms-2" alt="Consumibles">
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
                                                <a class="btn text-light small" ${disabled} type="submit" href="/api/carts/add/${element._id}"
                                                    style="background-color: #272787; font-size: .85rem; width: auto;">
                                                    Añadir al <i class="fa-solid fa-cart-plus fa-xl"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
            }
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