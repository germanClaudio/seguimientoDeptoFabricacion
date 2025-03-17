const socket = io.connect(),
    offset = -3 * 60 * 60 * 1000;

let currentPage = 1;
let itemsPerPage = 10; // Valor por defecto
let consumiblesGlobales = [];
const maxVisiblePages = 3;

let URL_GOOGLE_STORE_IMAGESCONSUMIBLES,
    imagenLazy = '../../src/images/upload/ConsumiblesImages/loader.gif';

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMAGESCONSUMIBLES = config.URL_GOOGLE_STORE_IMAGESCONSUMIBLES
    })
    .catch(error => console.error('Error fetching config:', error));

// Variables globales
const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', yellow = 'warning', black = 'dark', white = 'light',
        active = 'Activo', inactive = 'Inactivo', info = 'info',
        epp = 'EPP', consumibleAjuste = 'Consumible Ajuste', consumibleMeca = 'Consumible Mecanizado', consumibleLineas = 'Consumible Lineas', ropa = "Ropa", otros = 'Otros'
let html, stockTr

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

//-------------------------------------
// Mostrar el spinner y ocultar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('consumiblesTable').style.display = 'none';
});

//  ----------- Consumibles list ----------------
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
let size, stock, total, totalStock = 0, disabled = ''
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
    if (texto.length > 40) {
        return texto.slice(0, 37) + "...";
    }
    return texto;
}

function cortarTextoLong(texto) {
    if (texto.length > 70) {
        return texto.slice(0, 67) + "...";
    }
    return texto;
}

// Función para generar los controles de paginación
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

// Función para cambiar el número de filas por página
let selectedItemsPerPage = 10; // Valor por defecto

const cambiarItemsPorPagina = (nuevoItemsPerPage) => {
    selectedItemsPerPage = nuevoItemsPerPage; // Guardar la selección del usuario
    itemsPerPage = nuevoItemsPerPage;
    currentPage = 1; // Reiniciar a la primera página
    renderConsumiblesAdmin(consumiblesGlobales);
};

const agregarSelectItemsPorPagina = () => {
    // Crear el HTML del select y la leyenda
    let selectHTML = `
        Mostrando 
        <select class="form-select small w-auto mx-2" id="itemsPerPageSelect" onchange="cambiarItemsPorPagina(parseInt(this.value))">
            <option value="10" ${selectedItemsPerPage === 10 ? 'selected' : ''}>10</option>
            <option value="25" ${selectedItemsPerPage === 25 ? 'selected' : ''}>25</option>
            <option value="50" ${selectedItemsPerPage === 50 ? 'selected' : ''}>50</option>
            <option value="100" ${selectedItemsPerPage === 100 ? 'selected' : ''}>100</option>
            <option value="${consumiblesGlobales.length}" ${selectedItemsPerPage === consumiblesGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        consumibles de ${consumiblesGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationConsumibles');
    const existingSelectContainer = document.getElementById('selectContainer');

    // Verificar si el contenedor de paginación existe
    if (paginationContainer) {
        // Si ya existe un contenedor para el select, actualizamos su contenido
        if (existingSelectContainer) {
            existingSelectContainer.innerHTML = selectHTML;
        } else {
            // Si no existe, creamos un nuevo contenedor y lo insertamos
            const selectContainer = document.createElement('div');
            selectContainer.id = 'selectContainer';
            selectContainer.classList.add('row', 'align-items-center', 'justify-content-center')
            selectContainer.innerHTML = selectHTML;
            paginationContainer.insertAdjacentHTML('beforebegin', selectContainer.outerHTML);
        }
    } else {
        console.error("El contenedor de paginación no existe en el DOM.");
    }
};


// --------------- Render ADMIN ----------------------------
// Llamar a la función para agregar el select después de renderizar la tabla
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
            processStock(element);

            let optionStatus = element.status ? green : red,
                optionStock = totalStock > 0 ? black : red
            
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            let showStatus = element.status ? active : inactive,
                idChain = element._id.substring(19),
                tipoTalle = 'U',
                background = 'dark',
                disabled = '',
                disabledRow = ''
            
            if (element.tipoTalle === 'talle') {
                tipoTalle = 'T'
                background = 'danger'
                disabled = 'disabled'

            } else if (element.tipoTalle === 'numero') {
                tipoTalle = 'N'
                background = 'primary'
                disabled = 'disabled'
            }

            let characteristicsTrim = cortarTexto(element.characteristics),
                designationTrim = cortarTextoLong(element.designation);

            let utcDate = new Date(element.timestamp),
                utcDateModified = new Date(element.modifiedOn),
                localDate = new Date(utcDate.getTime() + offset),
                localDateModified = new Date(utcDateModified.getTime() + offset),
                formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                formattedDate === formattedDateModified ? formattedDateModified = '-' : null

            if (element.favorito === 5) {
                redHeart = `<i class="fa-solid fa-heart position-absolute top-0 start-100 text-primary" 
                                style="font-size: 1.5em; z-index: 100 ;transform: translate(-125%, 40%) !important;">
                            </i>`
            }

            if (element.visible) {
                totalStock > 0 ? stockTr = `<tr id="consumibleRow_${element._id}">` : stockTr =`<tr id="consumibleRow_${element._id}" class="row-highlight-stockCero">`
                return (`${stockTr}
                                <td class="text-center" id="checkSelect_${element._id}" name="checkSelect"><input class="form-check-input border border-2 border-primary shadow-lg rounded" type="checkbox" value="" id="inputCheckConsumible_${element._id}" name="inputCheckConsumible" ${disabledRow}></td>
                                <td class="text-center" id="codigo_${element._id}"><strong>${element.code}</strong></td>
                                <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}">${showType}</span></td>
                                <td class="text-center" id="designation_${element._id}"><strong>${designationTrim}</strong></td>
                                <td class="text-center" id="characteristics_${element._id}">${characteristicsTrim}</td>
                                <td class="text-center position-relative" id="imagenConsumible_${element._id}">
                                    ${element.imageConsumible ? `<img id="imagen_${element._id}" class="imgLazyLoad img-fluid rounded-3 py-2" alt="Imagen" data-src="${element.imageConsumible}"
                                                                src='${imagenLazy}' width="125px" height="125px" loading="lazy">` : '<div class="img-placeholder"></div>'}
                                                                ${redHeart}
                                </td>
                                <td class="text-center" id="tipoTalle_${element._id}"><span class="badge bg-${background} text-light">${tipoTalle}</span></td>
                                <td class="text-center" id="limMaxUser_${element._id}"><span class="badge bg-danger text-light">${element.limMaxUser}</span></td>
                                <td class="text-center" id="stock_${element._id}"><span id="spanStock_${element._id} name="stock" class="badge bg-${optionStock} text-light">${totalStock}</span></td>
                                <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                                    <div class="d-block align-items-center text-center">
                                        <a href="/api/carts/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Consumible ${designationTrim}"><i class="fa-solid fa-cart-shopping"></i></a>
                                        <button id="${element._id}" name="btnDeleteConsumible" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Consumible ${designationTrim}"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </td>
                            </tr>`)
            }
        }).join(" ");
        htmlPagination = generarControlesPaginacion();
    
    } else {
        html = (`<tr>
                    <td colspan="15">
                        <img class="img-fluid rounded-2 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarConsumibles').innerHTML = html    
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('consumiblesTable').style.display = 'block';
    
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);

    const consumiblesActiveQty = []
        for(let u=0; u<consumiblesGlobales.length; u++) {
            consumiblesGlobales[u].visible ? consumiblesActiveQty.push(u) : null
        }

        const htmlConsumibleList = 
            ( `<caption id="capConsumiblesList">Cantidad de Consumibles: ${parseInt(consumiblesActiveQty.length)}</caption><br>
            <caption id="capDeleteConsumiblesList">Cantidad de Consumibles Eliminados: ${parseInt(consumiblesGlobales.length - consumiblesActiveQty.length)}</caption>`)

        document.getElementById('capConsumiblesList').innerHTML = htmlConsumibleList
    
    // Remover clases de animación después de completar
    setTimeout(() => {
        container.classList.remove('transition-in', direction);
    }, 400);

    //------------- LazyLoad Images ------------------
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            setTimeout(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src; // Sustituye data-src por src
                        img.onload = () => img.classList.add("loaded");
                        img.removeAttribute("data-src"); // Limpia el atributo
                        observer.unobserve(img); // Deja de observar esta imagen
                    }
                });
            }, 500);
        });
        lazyImages.forEach(img => observer.observe(img));
        
    } else {
        // Fallback para navegadores sin IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ---- mensaje confirmacion eliminar Consumible -----------
    function messageDeleteConsumible(id, designation, code) {
        const htmlForm =
            `El consumible ${designation} - Código: ${code}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteConsumible" action="/api/consumibles/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Eliminar Consumible <b>${designation}</b> - ${code}?`,
            position: 'center',
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Eliminarlo! <i class="fa-solid fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formDeleteConsumible").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminado!',
                        `El consumible ${designation}, ha sido eliminado exitosamente.`,
                        'success'
                    )
                }, 500)
            } else {
                Swal.fire(
                    'No eliminado!',
                    `El consumible ${designation}, no ha sido eliminado.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteConsumible"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idConsumible = btn.id,
                    designation = document.getElementById(`designation_${idConsumible}`).innerText,
                    code = document.getElementById(`codigo_${idConsumible}`).innerText,
                    type = document.getElementById(`tipo_${idConsumible}`).innerText

                idConsumible && designation && code && type ? messageDeleteConsumible(idConsumible, designation, code) : null
            })
        }
    })

    // Llamar a la función para agregar el select después de renderizar la tabla
    agregarSelectItemsPorPagina();
};



// Función para generar los controles de paginación
const generarControlesPaginacionUser = () => {
    const totalPages = Math.ceil(consumiblesGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderConsumiblesUser(consumiblesGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderConsumiblesUser(consumiblesGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderConsumiblesUser(consumiblesGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderConsumiblesUser(consumiblesGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderConsumiblesUser(consumiblesGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div>';
    return paginationHTML;
};

const cambiarItemsPorPaginaUser = (nuevoItemsPerPage) => {
    selectedItemsPerPage = nuevoItemsPerPage; // Guardar la selección del usuario
    itemsPerPage = nuevoItemsPerPage;
    currentPage = 1; // Reiniciar a la primera página
    renderConsumiblesUser(consumiblesGlobales);
};

const agregarSelectItemsPorPaginaUser = () => {
    // Crear el HTML del select y la leyenda
    let selectHTML = `
        Mostrando 
        <select class="form-select small w-auto mx-2" id="itemsPerPageSelect" onchange="cambiarItemsPorPaginaUser(parseInt(this.value))">
            <option value="10" ${selectedItemsPerPage === 10 ? 'selected' : ''}>10</option>
            <option value="25" ${selectedItemsPerPage === 25 ? 'selected' : ''}>25</option>
            <option value="50" ${selectedItemsPerPage === 50 ? 'selected' : ''}>50</option>
            <option value="100" ${selectedItemsPerPage === 100 ? 'selected' : ''}>100</option>
            <option value="${consumiblesGlobales.length}" ${selectedItemsPerPage === consumiblesGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        consumibles de ${consumiblesGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationConsumibles');
    const existingSelectContainer = document.getElementById('selectContainer');

    // Verificar si el contenedor de paginación existe
    if (paginationContainer) {
        // Si ya existe un contenedor para el select, actualizamos su contenido
        if (existingSelectContainer) {
            existingSelectContainer.innerHTML = selectHTML;
        } else {
            // Si no existe, creamos un nuevo contenedor y lo insertamos
            const selectContainer = document.createElement('div');
            selectContainer.id = 'selectContainer';
            selectContainer.classList.add('row', 'align-items-center', 'justify-content-center')
            selectContainer.innerHTML = selectHTML;
            paginationContainer.insertAdjacentHTML('beforebegin', selectContainer.outerHTML);
        }
    } else {
        console.error("El contenedor de paginación no existe en el DOM.");
    }
};

// ----------------- Render USER -----------------------------
// Llamar a la función para agregar el select después de renderizar la tabla
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
            processStock(element);

            let optionStatus = element.status ? green : red,
                optionStock = totalStock > 0 ? black : red
            
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            let showStatus = element.status ? active : inactive,
                idChain = element._id.substring(19),
                tipoTalle = 'U',
                background = 'dark',
                disabled = '',
                disabledRow = ''
            
            if (element.tipoTalle === 'talle') {
                tipoTalle = 'T'
                background = 'danger'
                disabled = 'disabled'

            } else if (element.tipoTalle === 'numero') {
                tipoTalle = 'N'
                background = 'primary'
                disabled = 'disabled'
            }

            let characteristicsTrim = cortarTexto(element.characteristics),
                designationTrim = cortarTextoLong(element.designation);

            let utcDate = new Date(element.timestamp),
                utcDateModified = new Date(element.modifiedOn),
                localDate = new Date(utcDate.getTime() + offset),
                localDateModified = new Date(utcDateModified.getTime() + offset),
                formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                formattedDate === formattedDateModified ? formattedDateModified = '-' : null

            if (element.favorito === 5) {
                redHeart = `<i class="fa-solid fa-heart position-absolute top-0 start-100 text-primary" 
                                style="font-size: 1.5em; z-index: 100 ;transform: translate(-225%, 40%) !important;">
                            </i>`
            }

            if (element.visible) {
                totalStock > 0 ? stockTr = `<tr id="consumibleRow_${element._id}">` : stockTr =`<tr id="consumibleRow_${element._id}" class="row-highlight-stockCero">`
                return (`${stockTr}
                            <td class="text-center" id="checkSelect_${element._id}" name="checkSelect"><input class="form-check-input border border-2 border-primary shadow-lg rounded" type="checkbox" value="" id="inputCheckConsumible_${element._id}" name="inputCheckConsumible" ${disabledRow}></td>
                            <td class="text-center" id="codigo_${element._id}"><strong>${element.code}</strong></td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${designationTrim}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${characteristicsTrim}</td>
                            <td class="text-center position-relative" id="imagenConsumible_${element._id}">
                                ${element.imageConsumible ? `<img id="imagen_${element._id}" class="imgLazyLoad img-fluid rounded-3 py-2" alt="Imagen" data-src="${element.imageConsumible}"
                                                            src='${imagenLazy}' width="125px" height="125px" loading="lazy">` : '<div class="img-placeholder"></div>'}
                                                            ${redHeart}
                            </td>
                            <td class="text-center" id="tipoTalle_${element._id}"><span class="badge bg-${background} text-light">${tipoTalle}</span></td>
                            <td class="text-center" id="limMaxUser_${element._id}"><span class="badge bg-danger text-light">${element.limMaxUser}</span></td>
                            <td class="text-center" id="stock_${element._id}"><span class="badge bg-${optionStock} text-light">${totalStock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center mx-1">
                                    <a href="/api/carts/add/${element._id}" class="btn btn-primary btn-sm me-1" title="Añadir ${designationTrim} al carrito"><i class="fa-solid fa-cart-plus"></i></a>
                                    <button type="button" class="btn btn-danger btn-sm ms-1 disabled" title="Solo Admin puede modificar esto"><i class="fa-solid fa-info-circle"></i></button>
                                </div>
                            </td>
                        </tr>`)
            }
        }).join(" ");
        htmlPagination = generarControlesPaginacionUser();
    
    } else {
        html = (`<tr>
                    <td colspan="15">
                        <img class="img-fluid rounded-2 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarConsumibles').innerHTML = html    
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('consumiblesTable').style.display = 'block';
    
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);

    const consumiblesActiveQty = []
        for(let u=0; u<consumiblesGlobales.length; u++) {
            consumiblesGlobales[u].visible ? consumiblesActiveQty.push(u) : null
        }

        const htmlConsumibleList = 
            ( `<caption id="capConsumiblesList">Cantidad de Consumibles: ${parseInt(consumiblesActiveQty.length)}</caption>`)

        document.getElementById('capConsumiblesList').innerHTML = htmlConsumibleList
    
    // Remover clases de animación después de completar
    setTimeout(() => {
        container.classList.remove('transition-in', direction);
    }, 400);

    //------------- LazyLoad Images ------------------
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            setTimeout(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src; // Sustituye data-src por src
                        img.onload = () => img.classList.add("loaded");
                        img.removeAttribute("data-src"); // Limpia el atributo
                        observer.unobserve(img); // Deja de observar esta imagen
                    }
                });
            }, 500);
        });
        lazyImages.forEach(img => observer.observe(img));
        
    } else {
        // Fallback para navegadores sin IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Llamar a la función para agregar el select después de renderizar la tabla
    agregarSelectItemsPorPaginaUser();
};

let inpuntDeNumeros = document.querySelectorAll('input[type="number"]')
    inpuntDeNumeros.forEach(function(input) {
        input.addEventListener('input', function(event) {
            // Obtener el valor actual del input
            let value = input.value,
                key = event.key;

            // Expresión regular para números enteros de hasta cinco cifras (0 a 99999)
            const regexp = /^[0-9]{1,5}$/;

            // Verificar si el valor cumple con la expresión regular
            if (!regexp.test(value)) {
                // Remover el último carácter si no cumple con la expresión regular
                input.value = value.slice(0, -1);
                input.classList.add("border", "border-danger", "border-2");
            } else {
                input.classList.remove("border", "border-danger", "border-2");
            }
        })
    })

//------------- Rows & Cards selected ------------------
document.addEventListener("DOMContentLoaded", () => {
    const tableId = "consumiblesTable",
        table = document.getElementById(tableId),
        cardsContainer = document.getElementById("showConsumiblesSearch"),
        btnCheckSelectionAll = document.getElementById("btnCheckSelectionAll"),
        spanCheckSelecMasive = document.getElementById("spanCheckSelecMasive");

    // Función para inicializar eventos en checkboxes de filas
    function initializeRowCheckboxes() {
        const rowCheckboxes = table.querySelectorAll('input[type="checkbox"]');
        rowCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                syncCheckboxWithCard(checkbox);
                updateSelectionState();
                updateRowStyle(checkbox);
            });
        });
    }

    // Función para inicializar eventos en checkboxes de cards
    function initializeCardCheckboxes() {
        const cardCheckboxes = cardsContainer.querySelectorAll('input.form-check-input');
        cardCheckboxes.forEach((checkbox) => {
            if (!checkbox.dataset.initialized) {
                checkbox.dataset.initialized = true;
                checkbox.addEventListener("change", () => {
                    syncCheckboxWithRow(checkbox);
                    updateSelectionState();
                });
            }
        });
    }

    // Sincronizar checkbox de fila con card correspondiente
    function syncCheckboxWithCard(rowCheckbox) {
        const extractIdNumber = (id) => id.split('_').pop()
        let idInputCard = extractIdNumber(rowCheckbox.id)
        const cardCheckbox = cardsContainer.querySelector(`#inputCheckConsumibleCard_${idInputCard}`);
        if (cardCheckbox) {
            if (rowCheckbox.checked) {
                cardCheckbox.checked = true;
                cardCheckbox.disabled = true; // Deshabilitar para evitar duplicados
            } else {
                cardCheckbox.checked = false;
                cardCheckbox.disabled = false; // Habilitar nuevamente
            }
            updateCardStyle(cardCheckbox);
            updateRowStyle(rowCheckbox);
        }
    }

    // Sincronizar checkbox de card con fila correspondiente
    function syncCheckboxWithRow(cardCheckbox) {
        const extractIdNumber = (id) => id.split('_').pop()
        let idInputRow = extractIdNumber(cardCheckbox.id)
        const rowCheckbox = table.querySelector(`#inputCheckConsumible_${idInputRow}`)
        if (rowCheckbox) {
            if (cardCheckbox.checked) {
                rowCheckbox.checked = true;
                rowCheckbox.disabled = true; // Deshabilitar para evitar duplicados
            } else {
                rowCheckbox.checked = false;
                rowCheckbox.disabled = false; // Habilitar nuevamente
            }
            updateRowStyle(rowCheckbox);
            updateCardStyle(cardCheckbox);
        }
    }

    // Actualizar estilo de las filas al cambiar el estado del checkbox
    function updateRowStyle(rowCheckbox) {
        const row = rowCheckbox.closest("tr");
        // console.log('row: ', row)
        if (rowCheckbox.checked) {
            row.classList.add("row-highlight");
            row.classList.remove("row-highlight-stockCero");
        } else {
            row.classList.remove("row-highlight");
        }
    }

    // Actualizar estilo de las cards al cambiar el estado del checkbox
    function updateCardStyle(cardCheckbox) {
        const card = cardCheckbox.closest("div[id^='cardSelected_']");
        if (cardCheckbox.checked) {
            card.classList.add("cardSelected");
            card.classList.remove("shadow-lg");
        } else {
            card.classList.remove("cardSelected");
            card.classList.add("shadow-lg");
        }
    }

    // Actualizar contador y estado del botón masivo
    function updateSelectionState() {
        const selectedRowCheckboxes = table.querySelectorAll('input[type="checkbox"]:checked');
        // const selectedCardCheckboxes = cardsContainer.querySelectorAll('input.form-check-input:checked')
        let totalSelected = selectedRowCheckboxes.length //+ selectedCardCheckboxes.length;

        spanCheckSelecMasive.textContent = totalSelected;
        btnCheckSelectionAll.disabled = totalSelected === 0;
        spanCheckSelecMasive.classList.toggle("bg-danger", totalSelected === 0);
        spanCheckSelecMasive.classList.toggle("bg-success", totalSelected > 0);
    }

    // Configurar MutationObservers
    const rowObserver = new MutationObserver(() => {
        initializeRowCheckboxes();
    });

    const cardObserver = new MutationObserver(() => {
        initializeCardCheckboxes();
    });

    rowObserver.observe(table, { childList: true, subtree: true });
    cardObserver.observe(cardsContainer, { childList: true, subtree: true });

    // Inicializar eventos al cargar
    initializeRowCheckboxes();
    initializeCardCheckboxes();

    // Botón de SweetAlert2
    btnCheckSelectionAll.addEventListener("click", () => {
        const extractIdNumber = (id) => id.split('_').pop(); // Función para extraer el número del ID
    
        // Función para forzar la carga de una imagen
        function loadImage(imageElement) {
            return new Promise((resolve, reject) => {
                if (imageElement.src) {
                    resolve(imageElement.src);
                } else {
                    imageElement.src = imageElement.dataset.src;
                    imageElement.onload = () => resolve(imageElement.src);
                    imageElement.onerror = () => reject(new Error('Error al cargar la imagen'));
                }
            });
        }

        let selectedCheckboxes = Array.from(cardsContainer.querySelectorAll('input.form-check-input:checked'))
            .concat(Array.from(table.querySelectorAll('input[type="checkbox"]:checked')))
            .reduce((accumulator, checkbox) => {
                const row = checkbox.closest("tr"),
                    card = checkbox.closest("div[id^='cardSelected_']"),
                    idNumber = extractIdNumber(checkbox.id); // Extrae el número del ID

                // Verifica si el ID (número) ya fue procesado
                if (accumulator.some(item => item.idNumber === idNumber)) {
                    return accumulator; // No agregar duplicados
                }
    
                // Agrega al acumulador según corresponda (row o card)
                let imageConsumible = null;
                if (row) {

                    const imgElement = row.querySelector(`[id^="imagen_"]`);
                    if (imgElement) {
                        try {
                            imageConsumible = loadImage(imgElement);
                        } catch (error) {
                        console.error('Error al cargar la imagen:', error);
                        }
                    }

                    accumulator.push({
                        idNumber: idNumber,
                        id: checkbox.id,
                        codigo: row.querySelector(`[id^="codigo_"]`).textContent.trim(),
                        tipo: row.querySelector(`[id^="tipo_"]`).textContent.trim(),
                        descripcion: row.querySelector(`[id^="designation_"]`).textContent.trim(),
                        imageConsumible: row.querySelector(`[id^="imagen_"]`).src.trim(),
                        stock: row.querySelector(`[id^="stock_"] span`).textContent.trim(),
                        limMaxUser: row.querySelector(`[id^="limMaxUser_"]`).textContent.trim(),
                        favorito: row.querySelector(`[id^="redHeart_"]`)
                    });

                } else if (card) {
                    const imgElement = card.querySelector("img");
                    if (imgElement) {
                        try {
                            imageConsumible = loadImage(imgElement);
                        } catch (error) {
                            console.error('Error al cargar la imagen:', error);
                        }
                    }

                    accumulator.push({
                        idNumber: idNumber,
                        id: checkbox.id,
                        codigo: card.querySelector(`[id^="cardCodigo_"]`).textContent.trim(),
                        tipo: card.querySelector(`[id^="cardTipo_"]`).textContent.trim(),
                        descripcion: card.querySelector(`[id^="cardDesignation_"]`).textContent.trim(),
                        imageConsumible: card.querySelector(`[id^="imageConsumible_"]`).src.trim(),
                        stock: card.querySelector(`[id^="cardStock_"]`).textContent.trim(),
                        limMaxUser: card.querySelector(`[id^="limMaxUser_"]`).value.trim(),
                        favorito: card.querySelector(`[id^="redHeart_"]`)
                    });

                }
                return accumulator;
            }, []);

        // Generar SweetAlert2 con los datos seleccionados
        const tableHtml = `
            <form id="formQuantityValues" action="/api/carts/addMulti/" method="post">
                <fieldset>
                    <table id="quantityConsumiblesTable" class="table align-middle" style="font-size: 11pt";>
                        <thead>
                            <tr>
                                <th style="width:15vw" class="text-center">Código</th>
                                <th style="width:12vw" class="text-center">Tipo</th>
                                <th style="width:38vw" class="text-center">Designación</th>
                                <th style="width:17vw" class="text-center">Imagen</th>
                                <th style="width:14vw" class="text-center">Cantidad</th>
                                <th style="width:4vw" class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${selectedCheckboxes.map((data) =>
                                `<tr id="tr_${extractIdNumber(data.id)}">
                                    <td><strong>${data.codigo}</strong></td>
                                    <td><span class="common-style ${data.tipo.replace(/\s+/g, "").toLowerCase()}">${data.tipo}</span></td>
                                    <td>${data.descripcion}</td>
                                    <td class="text-center position-relative">
                                        ${data.imageConsumible ? 
                                            `<img id="imagen_${extractIdNumber(data.id)}" class="img-fluid rounded-3 py-2" alt="Imagen Producto"
                                            src='${data.imageConsumible}' width="100px" height="100px">`
                                            : '<div class="img-placeholder"></div>'}

                                        ${data.favorito ?    
                                            `<i id="redHeart_${extractIdNumber(data.id)}" class="fa-solid fa-heart position-absolute top-0 start-100 text-primary" 
                                                style="font-size: 1.5em; z-index: 100 ;transform: translate(-200%, 40%) !important;">
                                            </i>`
                                            : '' }
                                    </td>
                                    <td>${data.limMaxUser > 1 ? 
                                        `<input type="number" name="inputQuantityNumber_${extractIdNumber(data.id)}"
                                            class="form-control border-2 border-success shadow-lg" value="1" data-id="${data.id}" min="1" max="${data.limMaxUser}">`
                                        :
                                        `<input type="number" name="inputQuantityNumber_${extractIdNumber(data.id)}"
                                            class="form-control shadow-lg" value="1" data-id="${data.id}" min="1" max="${data.limMaxUser}">`}
                                        
                                        <input type="hidden" name="idItemHidden_${extractIdNumber(data.id)}" value="${extractIdNumber(data.id)}" style="display: none;">
                                        <input type="hidden" name="limMaxUser_${extractIdNumber(data.id)}" value="${data.limMaxUser}" style="display: none;">
                                    </td>
                                    <td><button name="btnRemoveRow" type="button" id="btnRemoveRow_${extractIdNumber(data.id)}" class="btn btn-danger rounded-circle m-2 border border-2 shadow">
                                        <i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>`).join("")}
                        </tbody>
                    </table>
                </fieldset>
            </form>`;

        Swal.fire({
            title: "Añadir Múltiples Consumibles",
            html: tableHtml,
            confirmButtonText: 'Añadir al Carrito <i class="fa-solid fa-cart-plus"></i>',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
            cancelButtonColor: '#d33',
            width: 1100,
            position: "center"

        }).then((result) => {
            const formQuantityValues = document.getElementById('formQuantityValues')
            if (result.isConfirmed) {
                formQuantityValues.submit()

                setTimeout(() => {
                    Swal.fire({
                        title: `Ítems añadidos!`,
                        html: 'Los ítems fueron añadidos al carrito con éxito',
                        icon: 'success',
                        width: 500
                    })
                }, 500)

            } else {
                Swal.fire({
                    title: `Ítems no añadidos!`,
                    html: 'Los ítems no fueron añadidos al carrito',
                    icon: 'warning',
                    width: 500
                })
                selectedCheckboxes = []
                return false
            }
        });

        
        document.querySelectorAll("[id^='btnRemoveRow_']").forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault()
                const id = event.target.closest("button").id.split("_")[1];
                id ? removeRow(id) : null
            });
        });

        //---------------- Remove item Row ---------------------------
        function removeRow(idButton, ) {
            let removeButtons = document.querySelectorAll('button[name="btnRemoveRow"]')       
            const rowToDelete = document.getElementById(`tr_${idButton}`)

            if (parseInt(removeButtons.length) > 1) {
                rowToDelete ? rowToDelete.remove() : null
                
            } else {
                Swal.close()
                Swal.fire({
                    title: `Ítems no añadidos!`,
                    html: 'Los ítems no fueron añadidos al carrito',
                    icon: 'warning',
                    width: 500
                })
                return false
            }
        }
    });

});