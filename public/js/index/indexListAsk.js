const socket = io.connect(),
    offset = -3 * 60 * 60 * 1000;

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

// -------------- Show All Consumibles ----------------
socket.on('consumiblesAll', async (arrConsumibles) => {
    renderConsumible (await arrConsumibles)
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
            onclick="if(!this.classList.contains('disabled')) renderConsumible(consumiblesGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderConsumible(consumiblesGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderConsumible(consumiblesGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderConsumible(consumiblesGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderConsumible(consumiblesGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div>';
    return paginationHTML;
};

const renderConsumible = async (arrConsumibles, page = 1, direction = 'none') => {
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
                                    <i class="icon-basket"></i> Añadir al Carrito
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

// const renderConsumible = (arrConsumible) => {
//     const html = arrConsumible.map((element) => {
//         let disabled = '', styleBckgrd = "background-color: #00000060; opacity: 0.5", classBckgrd = 'footer_disabled'
//             footerTextDisabled = '<span class="badge bg-danger text-light mt-3 p-2 mx-auto"><strong>Sin Stock</strong> <i class="fa-regular fa-face-sad-tear fa-xl"></i></span>',
//             footerText = `<a class="btn mx-auto text-light mt-3 small ${disabled}" type="submit" href="/api/carts/add/${element._id}" style="background-color: #1d1d1d;">
//                                 Añadir al Carrito <i class="icon-basket"></i>
//                         </a>`
//         let optionStatus, optionStock = ''
//         element.status ? optionStatus = green : (optionStatus = red, disabled = 'disabled')
//         element.stock>0 ? (optionStock = black, footerText, footerTextDisabled='', classBckgrd = '', styleBckgrd = '') : (optionStock = red, disabled = 'disabled', footerTextDisabled, footerText='', styleBckgrd, classBckgrd)
            
//         // Obtener configuración según el tipo o usar la configuración por defecto
//         const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

//         let showStatus = element.status ? active : inactive

//         if (element.visible) {
//             return (
//                 `<div class="col">
//                     <div class="card shadow-lg rounded-3 mx-auto my-3" style="width: 15rem; height: 25rem; ${styleBckgrd}" ${disabled}>
//                         <img src="${element.imageConsumible}" class="card-img-top mx-auto px-5 pt-2" alt="Imagen Consumible" style="min-height: 10rem; object-fit: contain;">
//                         <div class="card-body">
//                             <h6 class="card-title"><strong>${element.designation}</strong></h6>
//                             <p class="card-text my-1">Código: ${element.code}</p>
//                             <p class="card-text my-1">Tipo: <span class="badge bg-${optionType} text-${textColor}">${showType}</span></p>
//                             <p class="card-text my-1">Status: <span class="badge rounded-pill bg-${optionStatus}">${showStatus}</span></p>
//                             <p class="card-text my-1">Stock: <span class="badge rounded-pill bg-${optionStock} text-light">${element.stock}</span></p>
//                             <div class="card-footer card-footer-client ${classBckgrd}">
//                                 ${footerText}${footerTextDisabled}
//                             </div>
//                         </div>
//                     </div>
//                 </div>`)
//         } 
//     }).join(" ");

//     document.getElementById('mostrarConsumibles').innerHTML = html
// }