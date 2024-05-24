let clientNotFound = "../../../src/images/upload/LogoClientImages/dead-emoji-face.jpg"
let allClientsFound = "../../../src/images/upload/LogoClientImages/indiceAbajo.jpeg"

// -------------- Show Searched Clients ----------------
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

        const htmlSearchClientNull = 
        (`<div class="col mx-auto">
            <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4 my-auto px-1">
                        <img src="${clientNotFound}"
                            max-width="170vw" class="img-fluid rounded p-1"
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
        
        const htmlSearchClientNull = 
        (`<div class="col mx-auto">
            <div class="shadow-lg card rounded-2 mx-auto" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4 my-auto px-1">
                        <img src="${allClientsFound}"
                            max-width="170vw" class="img-fluid rounded p-1"
                            alt="Cliente no encontrado">
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

        return (`
            <div class="col mx-auto">
                <div class="card mx-auto rounded-2 shadow-lg" style="max-width: 540px;">
                    <div class="row align-items-center">
                        <div class="col-md-4 text-center">
                            <img src="${element.logo}"
                                max-width="160vw" class="img-fluid rounded p-3 mx-auto"
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
                                                <i class="fa-solid fa-diagram-project my-auto"></i>
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
    }).join(" ");

        document.getElementById('showClientSearch').innerHTML = htmlSearchClient
    }
}