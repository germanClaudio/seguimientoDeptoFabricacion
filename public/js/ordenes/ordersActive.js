const socket = io.connect(),
    offset = -3 * 60 * 60 * 1000

let currentPage = 1;
let itemsPerPage = 10; // Valor por defecto
let ordenesGlobales = [];
const maxVisiblePages = 3;

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0'),
        MM = String(date.getMonth() + 1).padStart(2, '0'),
        YY = date.getFullYear(),
        hh = String(date.getHours()).padStart(2, '0'),
        mm = String(date.getMinutes()).padStart(2, '0'),
        ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

// Mostrar el spinner y ocultar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('ordenesTable').style.display = 'none';
});

// ---------- Orders historial ----------------
// socket.on('ordersActive', (arrOrders, arrUsers) => {
//     let cadena = document.getElementById('mostrarUserName').innerText,
//         indice = cadena.indexOf(","),
//         name = cadena.substring(0,indice),
//         index = arrUsers.findIndex(el=> el.name == name.trim())

//     if(index !== -1) {
//         let user = arrUsers[index].admin,
//             userId = arrUsers[index]._id
//             // console.log('user: ', user)
//         user ? renderOrdenesAdmin(arrOrders, userId) : renderOrdenesUser(arrOrders)
//     }
// })

socket.on('ordersUsers', ( arrUsers ) => {
    let cadena = document.getElementById('mostrarUserName').innerText,
        indice = cadena.indexOf(","),
        name = cadena.substring(0,indice),
        index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let userAdmin = arrUsers[index].admin,
            usuario = arrUsers[index]
            
        // Emitir el evento 'sendUser' con el parámetro user
        socket.emit('sendUserActive', usuario, userAdmin );
    }
})

socket.on('ordersActive', (data) => {
    const { allOrders, ordersByUser, allUsers, userAdmin } = data;

    userAdmin ? renderOrdenesAdmin(allOrders) : renderOrdenesUser(ordersByUser)

})

// Función para generar los controles de paginación
const generarControlesPaginacion = () => {
    const totalPages = Math.ceil(ordenesGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderOrdenesAdmin(ordenesGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderOrdenesAdmin(ordenesGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderOrdenesAdmin(ordenesGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderOrdenesAdmin(ordenesGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderOrdenesAdmin(ordenesGlobales, ${currentPage + 1}, 'left')">
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
    renderOrdenesAdmin(ordenesGlobales);
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
            <option value="${ordenesGlobales.length}" ${selectedItemsPerPage === ordenesGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        ordenes de ${ordenesGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationOrdenes');
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

// ---------------------- Rende Admin ----------------------------
const renderOrdenesAdmin = async (arrOrders, page = 1, direction = 'none') => {
    ordenesGlobales = arrOrders;
    currentPage = page;

    const container = document.getElementById('mostrarOrdenes');
    const pagination = document.getElementById('paginationOrdenes');
    container.classList.add('transition-out', direction);
    
    // Esperar a que termine la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = ordenesGlobales.slice(startIndex, endIndex);
    
    let html = '', htmlPagination = '';

    if (paginatedItems.length > 0) {
        html = paginatedItems.map((element) => {
            let prodArr = []
            function loopProductId() {
                for (i=0; i < element.items.length; i++) {
                    prodArr.push(element.items[i].consumibleId)
                }
                return prodArr.length
            }

            let qtyArr = [], qtyArrNumber = []
            function loopQuantity() {
                for (i=0; i < element.items.length; i++) {
                    qtyArr.push(element.items[i].quantity)
                    qtyArrNumber.push(element.items[i].quantity)
                }
                return qtyArr.join(' - ')
            }

            for (i=0; i < element.items.length; i++) {
                qtyArrNumber.push(element.items[i].quantity)
            }

            function sumarArray(arr) {
                return arr.reduce((suma, valorActual) => suma + valorActual, 0);
            }
            
            const resultado = sumarArray(qtyArrNumber),
                green = 'success', red = 'danger', yellow = 'warning', black = 'dark', withe = 'light';

            let optionStatus = red,
                showStatus = 'No Entregado',
                textStatus = withe,
                btnPreprared = Boolean(false),
                btnDelivered = Boolean(false),
                btnDeleted = Boolean(false),
                btnConfiguration = '',
                idChain = element._id.substring(19)
            
            element.active ?
                element.prepared ? (optionStatus = yellow, showStatus = 'Preparado', btnPreprared = Boolean(true), textStatus = black) : null
            :
                (optionStatus = green, showStatus = 'Entregado', btnPreprared = Boolean(true), btnDeleted = Boolean(false))
            

            if (element.visible) {
                if (!element.active) {
                    btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-dolly"></i></button>
                                        <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-regular fa-trash-can"></i></button>`
                } else if (btnPreprared && !btnDelivered) {
                    btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button id="btnDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-dolly"></i></button>
                                        <button id="${element._id}" name="btnDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-regular fa-trash-can"></i></button>`
                } else {
                    btnConfiguration = `<button id="btnPrepareOrder_${element._id}" name="btnPrepareOrder" type="button" class="btn btn-warning btn-sm" title="Preparar Orden ...${idChain}"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button id="btnDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-dolly"></i></button>
                                        <button id="${element._id}" name="btnDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-regular fa-trash-can"></i></button>`
                }

                let utcDate = new Date(element.timestamp),
                    utcDateModified = new Date(element.modifiedOn),
                    localDate = new Date(utcDate.getTime() + offset),
                    localDateModified = new Date(utcDateModified.getTime() + offset),
                    formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                    formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                    formattedDate === formattedDateModified ? formattedDateModified = '-' : null

                return (`<tr>
                            <td class="text-center" id="checkSelect_${element._id}" name="checkSelect"><input class="form-check-input border border-2 border-primary shadow-lg rounded" type="checkbox" value="" id="inputCheckOrder_${element._id}" name="inputCheckOrder"></td>
                            <th scope="row" class="text-center py-3"><strong>...${idChain}</strong></th>
                            <td class="text-center py-3" id="productos_${element._id}"><strong>${loopProductId()}</strong></td>
                            <td class="text-center py-3" id="items_${element._id}">${loopQuantity()} <strong>(${resultado})</strong></td>
                            <td class="text-center py-3" id="invoice_${element._id}" name="invoiceNumber">${element.invoice_nr}</td>
                            <td class="text-center py-3" id="userInformation_${element._id}"><strong>${element.shipping[0].name} ${element.shipping[0].lastName} - ${element.shipping[0].legajoIdUser}</strong></td>
                            <td class="text-center py-3" id="date_${element._id}">${formattedDate}</td>
                            <td class="text-center py-3" id="status_${element._id}"><span class="badge rounded-pill bg-${optionStatus} text-${textStatus}">${showStatus}</span></td>
                            <td class="text-center py-3" id="dateModified_${element._id}">${formattedDateModified}</td>
                            <td class="text-center py-3">
                                <div class="d-block align-items-center text-center">
                                    <button id="btnDownloadOrder_${element._id}" name="btnDownloadOrder" type="button" class="btn btn-primary btn-sm" title="Descargar pdf Orden ...${idChain}"><i class="fa-solid fa-download"></i></button>
                                    ${btnConfiguration}
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

                document.getElementById('mostrarOrdenes').innerHTML = html
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('ordenesTable').style.display = 'block';

    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);

    const ordersActiveQty = []
    for(let u=0; u<ordenesGlobales.length; u++) {
        ordenesGlobales[u].visible ? ordersActiveQty.push(u) : null
    }

    const htmlOrderList = 
        ( `<caption id="capOrderList">Cantidad de Ordenes: ${parseInt(ordersActiveQty.length)}</caption><br>
        <caption id="capDeleteOrderList">Cantidad de Ordenes Eliminadas: ${parseInt(ordenesGlobales.length - ordersActiveQty.length)}</caption>`)

    document.getElementById('capOrdersList').innerHTML = htmlOrderList

    // Remover clases de animación después de completar
    setTimeout(() => {
        container.classList.remove('transition-in', direction);
    }, 400);

    // ---- mensaje confirmacion Preparar Order -----------
    function messagePrepareOrder(idOrden, userInformation, date) {
        const idChain = idOrden.substring(19)
        const htmlForm =
            `La solicitud <strong>...${idChain}</strong>, con fecha <b>${date}</b>,<br>
                pasará a estado <span class="badge rounded-pill bg-warning text-dark">Preparado</span><br>
                para el usuario: <b>${userInformation}</b><br>
                <form id="formPrepareOrder" action="/api/ordenes/prepare/${idOrden}" method="post">
                    <fieldset>
                        <input type="hidden" id="screen" name="screen" value="1">
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Preparar Orden Id#...${idChain}?`,
            position: 'center',
            width: 600,
            html: htmlForm,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Prepararla! <i class="fa-solid fa-truck-fast"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formPrepareOrder").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Preparada!',
                        `La Orden Id#<b>...${idChain}</b>, ha sido preparada exitosamente.`,
                        'success'
                    )
                }, 600)
            } else {
                Swal.fire(
                    'No preparada!',
                    `La Orden Id#<b>...${idChain}</b>, no ha sido preparada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeListPrepare = document.querySelectorAll('button[name="btnPrepareOrder"]')
    nodeListPrepare.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idOrden = btn.id.split('_'),
                    userInformation = document.getElementById(`userInformation_${idOrden[1]}`).innerText,
                    date = document.getElementById(`date_${idOrden[1]}`).innerText

                idOrden[1] && userInformation && date ? messagePrepareOrder(idOrden[1], userInformation, date) : null
            })
        }
    })

    // ---- mensaje confirmacion Entregar Order -----------
    function messageDeliverOrder(idOrden, userInformation, date) {
        const idChain = idOrden.substring(19)
        const htmlForm =
            `La solicitud <strong>...${idChain}</strong>, con fecha <b>${date}</b>,<br>
                pasará a estado <span class="badge rounded-pill bg-success text-light">Entregado</span><br>
                para el usuario: <b>${userInformation}</b><br>
                <form id="formDeliverOrder" action="/api/ordenes/deliver/${idOrden}" method="post">
                    <fieldset>
                        <input type="hidden" id="screen" name="screen" value="1">
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Entregar Orden Id#...${idChain}?`,
            position: 'center',
            width: 600,
            html: htmlForm,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Entregarla! <i class="fa-solid fa-dolly"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formDeliverOrder").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Entregada!',
                        `La Orden Id#<b>...${idChain}</b>, ha sido entregada exitosamente.`,
                        'success'
                    )
                }, 600)
            } else {
                Swal.fire(
                    'No entregada!',
                    `La Orden Id#<b>...${idChain}</b>, no ha sido entregada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeListDeliver = document.querySelectorAll('button[name="btnDeliverOrder"]')
    nodeListDeliver.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idOrden = btn.id.split('_'),
                    userInformation = document.getElementById(`userInformation_${idOrden[1]}`).innerText,
                    date = document.getElementById(`date_${idOrden[1]}`).innerText

                idOrden[1] && userInformation && date ? messageDeliverOrder(idOrden[1], userInformation, date) : null
            })
        }
    })

    // ---- mensaje confirmacion eliminar Order -----------
    function messageDeleteOrder(idOrden, userInformation, date) {
        const htmlForm =
            `La solicitud con fecha <b>${date}</b>, se eliminará completamente<br>
                para el usuario: <strong>${userInformation}</strong> y usted.<br>
                <strong>Esta acción no se puede deshacer!<strong><br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteOrder" action="/api/ordenes/delete/${idOrden}" method="post">
                    <fieldset>
                    <input type="hidden" id="screen" name="screen" value="1">
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Eliminar Orden Id# ${idOrden}?`,
            position: 'center',
            width: 750,
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Eliminarlo! <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formDeleteOrder").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminado!',
                        `La Orden Id# <b>${idOrden}</b>, ha sido eliminada exitosamente.`,
                        'success'
                    )
                }, 600)
            } else {
                Swal.fire(
                    'No eliminada!',
                    `La Orden Id# <b>${idOrden}</b>, no ha sido eliminada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteOrder"]')
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

    // ---- Descargar PDF Order -----------
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
    
    const nodeBtnDownloadList = document.querySelectorAll('button[name="btnDownloadOrder"]')
    nodeBtnDownloadList.forEach(function(btn){
            if (btn.id) {
                btn.addEventListener("click", (event) => {
                    event.preventDefault()
                    const tdNodeList = document.querySelectorAll('td[name="invoiceNumber"]')
                    tdNodeList.forEach(function(td){
                        const invoiceId = document.getElementById(`invoice_${btn.id.substring(17)}`)
                        if (td.innerHTML === invoiceId.innerText) {
                            const idInvoice = td.innerHTML.toString()
                            td.innerHTML ? downloadPdf(idInvoice) : null
                        }
                    })
                })
            }
    })

    // Llamar a la función para agregar el select después de renderizar la tabla
    agregarSelectItemsPorPagina();
}


// Función para generar los controles de paginación
const generarControlesPaginacionUser = () => {
    const totalPages = Math.ceil(ordenesGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderOrdenesUser(ordenesGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderOrdenesUser(ordenesGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderOrdenesUser(ordenesGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderOrdenesUser(ordenesGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderOrdenesUser(ordenesGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div>';
    return paginationHTML;
};


const cambiarItemsPorPaginaUser = (nuevoItemsPerPage) => {
    selectedItemsPerPage = nuevoItemsPerPage; // Guardar la selección del usuario
    itemsPerPage = nuevoItemsPerPage;
    currentPage = 1; // Reiniciar a la primera página
    renderOrdenesUser(ordenesGlobales);
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
            <option value="${ordenesGlobales.length}" ${selectedItemsPerPage === ordenesGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        ordenes de ${ordenesGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationOrdenes');
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

// --------------------- Render User --------------------------
const renderOrdenesUser = async (arrOrders, page = 1, direction = 'none') => {
    ordenesGlobales = arrOrders;
    currentPage = page;
    console.log('ordenesGlobales: ', ordenesGlobales)
    const container = document.getElementById('mostrarOrdenes');
    const pagination = document.getElementById('paginationOrdenes');
    container.classList.add('transition-out', direction);
    
    // Esperar a que termine la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = ordenesGlobales.slice(startIndex, endIndex);
    
    let html = '', htmlPagination = '';

    if (paginatedItems.length > 0) {
        html = ordenesGlobales.map((element) => {
            let prodArr = []
            function loopProductId() {
                for (i=0; i < element.items.length; i++) {
                    prodArr.push(element.items[i].consumibleId)
                }
                return prodArr.length
            }

            let qtyArr = [], qtyArrNumber = []
            function loopQuantity() {
                for (i=0; i < element.items.length; i++) {
                    qtyArr.push(element.items[i].quantity)
                    qtyArrNumber.push(element.items[i].quantity)
                }
                return qtyArr.join(' - ')
            }

            for (i=0; i < element.items.length; i++) {
                qtyArrNumber.push(element.items[i].quantity)
            }

            function sumarArray(arr) {
                return arr.reduce((suma, valorActual) => suma + valorActual, 0);
            }
            
            const resultado = sumarArray(qtyArrNumber),
                green = 'success', red = 'danger', yellow = 'warning', black = 'dark', withe = 'light';
            
            let optionStatus = red,
                showStatus = 'No Entregado',
                textStatus = withe,
                btnPrepared = Boolean(false),
                btnDelivered = Boolean(false),
                btnDeleted = Boolean(false),
                btnConfiguration = '',
                idChain = element._id.substring(19)
            
            element.active ?
                element.prepared ? (optionStatus = yellow, showStatus = 'Preparado', btnPrepared = Boolean(true), textStatus = black) : null
            :
                (optionStatus = green, showStatus = 'Entregado', btnPrepared = Boolean(true), btnDeleted = Boolean(false))
            
            if (element.visible) {
                let checkDisabled = `disabled`
                !element.active || (btnPrepared && !btnDelivered)
                ? btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-regular fa-trash-can"></i></button>`
                : btnConfiguration = `<button id="${element._id}" name="btnDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-regular fa-trash-can"></i></button>`

                let utcDate = new Date(element.timestamp),
                    utcDateModified = new Date(element.modifiedOn),
                    localDate = new Date(utcDate.getTime() + offset),
                    localDateModified = new Date(utcDateModified.getTime() + offset),
                    formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                    formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                    formattedDate === formattedDateModified ? formattedDateModified = '-' : null

                return (`<tr>
                            <td class="text-center" id="checkSelect_${element._id}" name="checkSelect"><input class="form-check-input border border-2 border-primary shadow-lg rounded" type="checkbox" value="" id="inputCheckOrder_${element._id}" name="inputCheckOrder" ${checkDisabled}></td>
                            <th scope="row" class="text-center py-3"><strong>...${idChain}</strong></th>
                            <td class="text-center py-3" id="productos_${element._id}"><strong>${loopProductId()}</strong></td>
                            <td class="text-center py-3" id="items_${element._id}">${loopQuantity()} <strong>(${resultado})</strong></td>
                            <td class="text-center py-3" id="invoice_${element._id}" name="invoiceNumber">${element.invoice_nr}</td>
                            <td class="text-center py-3" id="userInformation_${element._id}"><strong>${element.shipping[0].name} ${element.shipping[0].lastName} - ${element.shipping[0].legajoIdUser}</strong></td>
                            <td class="text-center py-3" id="date_${element._id}">${formattedDate}</td>
                            <td class="text-center py-3" id="status_${element._id}"><span class="badge rounded-pill bg-${optionStatus} text-${textStatus}">${showStatus}</span></td>
                            <td class="text-center py-3" id="dateModified_${element._id}">${formattedDateModified}</td>
                            <td class="text-center py-3">
                                <div class="d-block align-items-center text-center">
                                    <button id="btnDownloadOrder_${element._id}" name="btnDownloadOrder" type="button" class="btn btn-primary btn-sm" title="Descargar pdf Orden ...${idChain}"><i class="fa-solid fa-download"></i></button>
                                    ${btnConfiguration}
                                </div>
                            </td>
                        </tr>`)
            }
        }).join(" ");
        htmlPagination = generarControlesPaginacion();

    } else {
        html = (`<tr>
                    <td colspan="10">
                        <img class="img-fluid rounded-3 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarOrdenes').innerHTML = html   
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('ordenesTable').style.display = 'block';
    
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);

    const ordersPreparedQty = []
    for(let u=0; u<ordenesGlobales.length; u++) {
        ordenesGlobales[u].visible && ordenesGlobales[u].prepared ? ordersPreparedQty.push(u) : null
    }

    const htmlOrderList = 
        ( `<caption id="capOrderList">Cantidad de Ordenes Totales: ${parseInt(ordenesGlobales.length)}</caption><br>
            <caption id="capPreparedList">Cantidad de Ordenes Preparadas: ${parseInt(ordersPreparedQty.length)}</caption><br>
        `)

    document.getElementById('capOrdersList').innerHTML = htmlOrderList


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
            confirmButtonText: 'Eliminarla! <i class="fa-regular fa-trash-can"></i>',
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

    const nodeList = document.querySelectorAll('button[name="btnDeleteOrder"]')
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

    // ---- Descargar PDF Order -----------
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
    
    const nodeBtnDownloadList = document.querySelectorAll('button[name="btnDownloadOrder"]')
    nodeBtnDownloadList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const tdNodeList = document.querySelectorAll('td[name="invoiceNumber"]')
                tdNodeList.forEach(function(td){
                    const invoiceId = document.getElementById(`invoice_${btn.id.substring(17)}`)
                    if (td.innerHTML === invoiceId.innerText) {
                        const idInvoice = td.innerHTML.toString()
                        td.innerHTML ? downloadPdf(idInvoice) : null
                    }
                })
            })
        }
    })

    // Llamar a la función para agregar el select después de renderizar la tabla
    agregarSelectItemsPorPagina();
}

//------------- Rows & Cards selected ------------------
document.addEventListener("DOMContentLoaded", () => {
    const tableId = "ordenesTable",
        table = document.getElementById(tableId),
        cardsContainer = document.getElementById("showOrdenesSearch"),
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
        const cardCheckbox = cardsContainer.querySelector(`#inputCheckOrdenCard_${idInputCard}`);
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
        const rowCheckbox = table.querySelector(`#inputCheckOrder_${idInputRow}`)
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
        rowCheckbox.checked ? row.classList.add("row-highlight") : row.classList.remove("row-highlight")
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

        if (btnCheckSelectionAll) {
            btnCheckSelectionAll.disabled = totalSelected === 0
            spanCheckSelecMasive.textContent = totalSelected
            spanCheckSelecMasive.classList.toggle("bg-danger", totalSelected === 0)
            spanCheckSelecMasive.classList.toggle("bg-success", totalSelected > 0)
        }
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

    // Botón de SweetAlert2 Modificar Status
    if(btnCheckSelectionAll) {
        btnCheckSelectionAll.addEventListener("click", () => {
            const extractIdNumber = (id) => id.split('_').pop(); // Función para extraer el número del ID
    
            const selectedCheckboxes = Array.from(table.querySelectorAll('input[type="checkbox"]:checked'))
                .concat(Array.from(cardsContainer.querySelectorAll('input.form-check-input:checked')))
                .reduce((accumulator, checkbox) => {
                    const row = checkbox.closest("tr"),
                        card = checkbox.closest("div[id^='cardSelected_']"),
                        idNumber = extractIdNumber(checkbox.id); // Extrae el número del ID
    
                    // Verifica si el ID (número) ya fue procesado
                    if (accumulator.some(item => item.idNumber === idNumber)) {
                        return accumulator; // No agregar duplicados
                    }
    
                    // Agrega al acumulador según corresponda (row o card)
                    if (card) {
                        accumulator.push({
                            idNumber: idNumber,
                            id: checkbox.id,
                            codigo: card.querySelector(`[id^="cardInvoice_"]`).textContent.trim(),
                            status: card.querySelector(`[id^="cardStatus_"]`).textContent.trim(),
                            solicitadaPor: card.querySelector(`[id^="cardUserInformation_"]`).textContent.trim(),
                            fecha: card.querySelector(`[id^="cardDate_"]`).textContent.trim(),
                            productos: card.querySelector(`[id^="cardProductos_"]`).textContent.trim(),
                            items: row.querySelector(`[id^="cardItems_"]`).textContent.trim(),
                        });
    
                    } else if (row) {
                        accumulator.push({
                            idNumber: idNumber,
                            id: checkbox.id,
                            codigo: row.querySelector(`[id^="invoice_"]`).textContent.trim(),
                            status: row.querySelector(`[id^="status_"]`).textContent.trim(),
                            solicitadaPor: row.querySelector(`[id^="userInformation_"]`).textContent.trim(),
                            fecha: row.querySelector(`[id^="date_"]`).textContent.trim(),
                            productos: row.querySelector(`[id^="productos_"]`).textContent.trim(),
                            items: row.querySelector(`[id^="items_"]`).textContent.trim(),
                        });
                    }
                    return accumulator;
                }, []);

                const trTable = `<tr>
                                    <th style="width:22vw" class="text-center">Solicitud N°</th>
                                    <th style="width:5vw" class="text-center">Status</th>
                                    <th style="width:16vw" class="text-center">Solicitada por</th>
                                    <th style="width:19vw" class="text-center">Fecha</th>
                                    <th style="width:18vw" class="text-center">Prod./Items</th>
                                    <th style="width:16vw" class="text-center">Nuevo Status</th>
                                    <th style="width:4vw" class="text-center"></th>
                                </tr>`

                function showSelectOptions(statusOptions) {
                    console.log('statusOptions: ', statusOptions)
                    let selectOptionsStatus = ''
                    statusOptions === 'noentregado'
                    ? selectOptionsStatus = `<option selected disabled value="${statusOptions}">No Entregado</option>
                                            <option value="preparado">Preparado</option>
                                            <option value="entregado">Entregado</option>`

                    : selectOptionsStatus = `<option selected disabled value="${statusOptions}">Preparado</option>
                                            <option value="entregado">Entregado</option>
                                            <option value="${statusOptions}">No Entregado</option>`
                    
                    return selectOptionsStatus
                }

                const tableBody = `${selectedCheckboxes.map((data) =>
                    `<tr id="tr_${extractIdNumber(data.id)}">
                        <td><strong>...${data.codigo.substring(19)}</strong></td>
                        <td><span class="common-style ${data.status.replace(/\s+/g, "").toLowerCase()}">${data.status}</span></td>
                        <td>${data.solicitadaPor}</td>
                        <td>${data.fecha}</td>
                        <td>${data.productos} / ${data.items}
                            <input type="hidden" name="idOrdenHidden_${extractIdNumber(data.id)}" value="${extractIdNumber(data.id)}" style="display: none;"></td>
                        <td>
                            <select id="newOrdenSatus_${extractIdNumber(data.id)}" name="newOrdenSatus" class="form-select" required>
                                ${ showSelectOptions(data.status.replace(/\s+/g, "").toLowerCase()) }
                            </select>
                        </td>
                        <td><button name="btnRemoveRow" type="button" id="btnRemoveRow_${extractIdNumber(data.id)}" class="btn btn-danger rounded-circle m-2 border border-2 shadow">
                            <i class="fa-solid fa-trash"></i></button></td>
                    </tr>`).join("")}`
    
            // Generar SweetAlert2 con los datos seleccionados
            const tableHtml = `
                <form id="formModifyStatus" action="/api/ordenes/modifyMulti/" method="post">
                    <fieldset>
                        <table id="statusOrdenesTable" class="table align-middle" style="font-size: 11pt";>
                            <thead>
                                ${trTable}
                            </thead>
                            <tbody>
                                ${tableBody}
                            </tbody>
                        </table>
                    </fieldset>
                </form>`;
    
            Swal.fire({
                title: "Modificar Status Múltiples Ordenes",
                html: tableHtml,
                confirmButtonText: 'Modificar Ordenes <i class="fa-regular fa-pen-to-square"></i>',
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
                showCloseButton: true,
                cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
                cancelButtonColor: '#d33',
                width: 1500,
                position: "center"
    
            }).then((result) => {
                const formModifyStatus = document.getElementById('formModifyStatus')
                if (result.isConfirmed) {
                    formModifyStatus.submit()
    
                    setTimeout(() => {
                        Swal.fire({
                            title: `Ordenes modificadas!`,
                            html: 'Las ordenes fueron modificadas con éxito',
                            icon: 'success',
                            width: 500
                        })
                    }, 500)
    
                } else {
                    Swal.fire({
                        title: `Ordenes no modificadas!`,
                        html: 'El status de las ordenes no fue modificado.',
                        icon: 'warning',
                        width: 500
                    })
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
                        title: `Ordenes no modificadas!`,
                        html: 'El status de las ordenes no fue modificado.',
                        icon: 'warning',
                        width: 500
                    })
                    return false
                }
            }
        });
    }
});