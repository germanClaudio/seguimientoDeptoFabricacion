const socket = io.connect(),
    offset = -3 * 60 * 60 * 1000;

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0'),
        MM = String(date.getMonth() + 1).padStart(2, '0'),
        YY = date.getFullYear(),
        hh = String(date.getHours()).padStart(2, '0'),
        mm = String(date.getMinutes()).padStart(2, '0'),
        ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

// Variables globales
const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', yellow = 'warning', black = 'dark', white = 'light',
        active = 'Activo', inactive = 'Inactivo', info = 'info',
        epp = 'EPP', consumibleAjuste = 'Consumible Ajuste', consumibleMeca = 'Consumible Mecanizado', consumibleLineas = 'Consumible Líneas', ropa = "Ropa", otros = 'Otros'

let currentPage = 1;
const itemsPerPage = 6;
let clientesGlobales= [];
let consumiblesGlobales= [];
const maxVisiblePages = 3; // Máximo de números visibles alrededor de la página actual

const typeConfigurations = {
    epp: { optionType: yellow, showType: epp, textColor: black },
    consumiblesLineas: { optionType: grey, showType: consumibleLineas, textColor: white },
    consumiblesAjuste: { optionType: blue, showType: consumibleAjuste, textColor: white },
    consumiblesMeca: { optionType: black, showType: consumibleMeca, textColor: white },
    ropa: { optionType: green, showType: ropa, textColor: white },
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

const generarControlesPaginacionClientes = () => {
    const totalPages = Math.ceil(clientesGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;

    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderClient(clientesGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderClient(clientesGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderClient(clientesGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderClient(clientesGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderClient(clientesGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div></div>';
    return paginationHTML;
};

const renderClient = async (arrClient, page = 1, direction = 'none') => {
        clientesGlobales = arrClient;
        currentPage = page;
        
        const container = document.getElementById('mostrarClientes');
        const pagination = document.getElementById('pagination');
        container.classList.add('transition-out', direction);
        
        // Esperar a que termine la animación de salida
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = arrClient.slice(startIndex, endIndex);
    
        let html = '', htmlPagination = '';
        
        if (paginatedItems.length > 0) {
            html = paginatedItems.map((element) => {
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
                return (`<div class="col">
                            <div class="card shadow-lg rounded-3 my-2 mx-4 fixed-card">
                                <img src="${element.logo}" class="card-img-top mx-auto px-2 pt-2" alt="Logo Cliente" style="min-height: 10rem; object-fit: contain;">
                                <div class="card-body d-flex flex-column">
                                    <h7 class="card-title"><strong>${element.name}</strong></h7>
                                    <p class="card-text flex-grow-1">Codigo: ${element.code}<br>
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
                return (`<div class="col">
                            <div class="card shadow-lg rounded-3 my-2 mx-4 fixed-card pe-none" contenteditable="false" style="background-color: #00000060; opacity: 0.5" title="Consulte a SuperAdmin">
                                <img src="${element.logo}" class="card-img-top mx-auto px-2 pt-2" alt="Logo Cliente" style="min-height: 10rem; object-fit: contain;">
                                <div class="card-body d-flex flex-column">
                                    <h6 class="card-title"><strong>${element.name}</strong></h6>
                                    <p class="card-text flex-grow-1">Codigo: ${element.code}<br>
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

        htmlPagination = generarControlesPaginacionClientes();
    }
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);
    
    // Remover clases de animación después de completar
    setTimeout(() => {
        container.classList.remove('transition-in', direction);
    }, 500);
}


// -------------- Show All Consumibles ----------------
socket.on('consumiblesAll', (arrConsumibles, arrUsers) => {
    let cadena = document.getElementById('mostrarUserName').innerText,
        indice = cadena.indexOf(","),
        name = cadena.substring(0,indice),
        index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin,
            userId = arrUsers[index]._id
        user ? renderConsumiblesAdmin(arrConsumibles) : renderConsumiblesUser(arrConsumibles)
    }   
})

// Función para extraer y mostrar los datos del campo stock
let size, total, totalStock = 0, disabled = ''
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

function cortarTexto(texto) {
    if (texto.length > 35) {
        return texto.slice(0, 28) + "...";
    }
    return texto;
}

const generarControlesPaginacion = () => {
    const totalPages = Math.ceil(consumiblesGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderConsumiblesAdmin(consumiblesGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderConsumiblesAdmin(consumiblesGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderConsumiblesAdmin(consumiblesGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderConsumiblesAdmin(consumiblesGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderConsumiblesAdmin(consumiblesGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div>';
    return paginationHTML;
};

// ------------------------------ ADMIN'S ---------------------------------
const renderConsumiblesAdmin = async (arrConsumibles, page = 1, direction = 'none') => {
        consumiblesGlobales = arrConsumibles;
        currentPage = page;
        
        const container = document.getElementById('mostrarConsumibles');
        const pagination = document.getElementById('paginationConsumibles');
        container.classList.add('transition-out', direction);
        
        // Esperar a que termine la animación de salida
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = arrConsumibles.slice(startIndex, endIndex);
    
        let html = '', htmlPagination = '', redHeart = '';
        
        if (paginatedItems.length > 0) {
            html = paginatedItems.map((element) => {

            // Procesar cada elemento
            processStock(element)

            let optionStatus = element.status ? green : red,
                optionStock = totalStock > 0 ? black : red
                disabled = totalStock > 0 ? '' : 'disabled'
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            let showStatus = element.status ? active : inactive,
                // idChain = element._id.substring(19),
                tipoTalle = 'U',
                background = 'dark'
            
            if (element.tipoTalle === 'talle') {
                tipoTalle = 'T'
                background = 'danger'

            } else if (element.tipoTalle === 'numero') {
                tipoTalle = 'N'
                background = 'primary'
            }

            let designationTrim = cortarTexto(element.designation);

            if (element.favorito === 5) {
                redHeart = `<i class="fa-solid fa-heart position-absolute top-0 start-100 text-primary" 
                                style="font-size: 1.8em; z-index: 100 ;transform: translate(-150%, 50%) !important;">
                            </i>`
            }

            if (element.visible) {
                return (
                    `<div class="col mb-4">
                        <div class="card shadow-lg rounded-3 my-2 mx-4 fixed-card h-100 position-relative">
                            <img src="${element.imageConsumible}" class="card-img-top mx-auto px-2 pt-2" alt="Imagen Consumible" style="min-height: 10rem; object-fit: contain;">
                            <div class="card-body d-flex flex-column">
                                <p class="card-title"><strong>${designationTrim}</strong></p>
                                <p class="card-text flex-grow-1">
                                    Código: ${element.code}<br>
                                    <span class="badge bg-${optionType} text-${textColor}"> ${showType}</span><br>
                                    <span class="badge rounded-pill bg-${optionStatus}">${showStatus}</span><br>
                                    Tipo Stock: <span class="badge bg-${background} text-light">${tipoTalle}</span> / 
                                    Stock: <span class="badge rounded-pill bg-${optionStock} text-light">${totalStock}</span>
                                </p>
                                <div class="card-footer card-footer-client">
                                    <a class="btn mx-auto text-light my-1 small ${disabled}" type="submit" href="/api/consumibles/${element._id}" style="background-color: #1d1d1d;">
                                        <i class="icon-basket"></i> Info Consumible
                                    </a>
                                </div>
                            </div>
                            ${redHeart}
                        </div>
                    </div>`)
            }
            }).join(" ");
            htmlPagination = generarControlesPaginacion();
        }
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);
    
    // Remover clases de animación después de completar
    setTimeout(() => {
        container.classList.remove('transition-in', direction);
    }, 500);
}

//-------------- USUARIOS ------------------
const renderConsumiblesUser = async (arrConsumibles, page = 1, direction = 'none') => {
    consumiblesGlobales = arrConsumibles;
    currentPage = page;
    
    const container = document.getElementById('mostrarConsumibles');
    const pagination = document.getElementById('paginationConsumibles');
    container.classList.add('transition-out', direction);
    
    // Esperar a que termine la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = arrConsumibles.slice(startIndex, endIndex);

    let html = '', htmlPagination = '', redHeart = '';
    
    if (paginatedItems.length > 0) {
        html = paginatedItems.map((element) => {

        // Procesar cada elemento
        processStock(element)

        let optionStatus = element.status ? green : red,
            optionStock = totalStock > 0 ? black : red
            disabled = totalStock > 0 ? '' : 'disabled'
        // Obtener configuración según el tipo o usar la configuración por defecto
        const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

        let showStatus = element.status ? active : inactive,
            // idChain = element._id.substring(19),
            tipoTalle = 'U',
            background = 'dark'
        
        if (element.tipoTalle === 'talle') {
            tipoTalle = 'T'
            background = 'danger'

        } else if (element.tipoTalle === 'numero') {
            tipoTalle = 'N'
            background = 'primary'
        }

        let designationTrim = cortarTexto(element.designation);

        if (element.favorito === 5) {
            redHeart = `<i class="fa-solid fa-heart position-absolute top-0 start-100 text-primary" 
                            style="font-size: 1.8em; z-index: 100 ;transform: translate(-150%, 50%) !important;">
                        </i>`
        }

        if (element.visible) {
            return (
                `<div class="col mb-4">
                    <div class="card shadow-lg rounded-3 my-2 mx-4 fixed-card h-100 position-relative">
                        <img src="${element.imageConsumible}" class="card-img-top mx-auto px-2 pt-2" alt="Imagen Consumible" style="min-height: 10rem; object-fit: contain;">
                        <div class="card-body d-flex flex-column">
                            <p class="card-title"><strong>${designationTrim}</strong></p>
                            <p class="card-text flex-grow-1">
                                Código: ${element.code}<br>
                                <span class="badge bg-${optionType} text-${textColor}"> ${showType}</span><br>
                                <span class="badge rounded-pill bg-${optionStatus}">${showStatus}</span><br>
                                Tipo Stock: <span class="badge bg-${background} text-light">${tipoTalle}</span> / 
                                Stock: <span class="badge rounded-pill bg-${optionStock} text-light">${totalStock}</span>
                            </p>
                            <div class="card-footer card-footer-client">
                                <a class="btn mx-auto text-light my-1 small ${disabled}" type="submit" href="/api/carts/add/${element._id}" style="background-color: #1d1d1d;">
                                    <i class="icon-basket"></i> Info Consumible
                                </a>
                            </div>
                        </div>
                        ${redHeart}
                    </div>
                </div>`)
        }
        }).join(" ");

        htmlPagination = generarControlesPaginacion();
    }
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);

    // Remover clases de animación después de completar
    setTimeout(() => {
        container.classList.remove('transition-in', direction);
    }, 500);
}

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('dashboard-container');
    const container2 = document.getElementById('dashboard-container2');
    const container3 = document.getElementById('dashboard-container3');
    const container4 = document.getElementById('dashboard-container4');
    

    Swapy.createSwapy(container, {
        animation: 'dynamic'
    });

    Swapy.createSwapy(container2, {
        animation: 'dynamic'
    });

    Swapy.createSwapy(container3, {
        animation: 'dynamic'
    });

    Swapy.createSwapy(container4, {
        animation: 'dynamic'
    });
    

    // Variable para rastrear si se está arrastrando una tarjeta
    let isDragging = false;

    // Evento cuando comienza el arrastre
    container.addEventListener('swapy:dragstart', () => {
        isDragging = true;
    });

    // Evento cuando termina el arrastre
    container.addEventListener('swapy:dragend', () => {
        isDragging = false;
    });

    // Prevenir el clic en los enlaces si se está arrastrando
    const cardLinks = document.querySelectorAll('.card-link');
    cardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (isDragging) {
                event.preventDefault(); // Evita que el enlace se active
            }
        });
    });
});