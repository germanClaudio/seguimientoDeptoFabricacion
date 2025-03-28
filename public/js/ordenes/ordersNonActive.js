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


socket.on('ordersUsers', ( arrUsers ) => {
    let cadena = document.getElementById('mostrarUserName').innerText,
        indice = cadena.indexOf(","),
        name = cadena.substring(0,indice),
        index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let userAdmin = arrUsers[index].admin,
            usuario = arrUsers[index]
            
        // Emitir el evento 'sendUser' con el parámetro user
        socket.emit('sendUserNonActive', usuario, userAdmin );
    }
})

socket.on('ordersNonActive', (data) => {
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

// ------------------------- Render Admin ---------------------------------
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
                                        <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-car"></i></button>
                                        <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-regular fa-trash-can"></i></button>`
                } else if (btnPreprared && !btnDelivered) {
                    btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button id="btnDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-car"></i></button>
                                        <button id="${element._id}" name="btnDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-regular fa-trash-can"></i></button>`
                } else {
                    btnConfiguration = `<button id="btnPrepareOrder_${element._id}" name="btnPrepareOrder" type="button" class="btn btn-warning btn-sm" title="Preparar Orden ...${idChain}"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button id="btnDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-car"></i></button>
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

// ---------------------- Render Users -----------------------------
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
                return prodArr.length  //join('\n')
            }

            let qtyArr = [], qtyArrNumber = []
            function loopQuantity() {
                for (i=0; i < element.items.length; i++) {
                    qtyArr.push(element.items[i].quantity)
                    qtyArrNumber.push(element.items[i].quantity)
                }
                return qtyArr.join(' - ')  //('\n')
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
        const html = (`<tr>
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

    const ordersActiveQty = []
    for(let u=0; u<ordenesGlobales.length; u++) {
        ordenesGlobales[u].visible && !ordenesGlobales[u].active ? ordersActiveQty.push(u) : null
    }

    const htmlOrderList = 
        ( `<caption id="capDeleteOrderList">Cantidad de Ordenes Entregadas: ${parseInt(ordersActiveQty.length)}</caption>`)

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
    agregarSelectItemsPorPaginaUser();
}

//------------- Rows & Cards selected ------------------
document.addEventListener("DOMContentLoaded", () => {
    const tableId = "ordenesTable",
        table = document.getElementById(tableId),
        cardsContainer = document.getElementById("showOrdenesSearch"),
        btnCheckSelectionAll = document.getElementById("btnCheckSelectionAll"),
        spanCheckSelecMasive = document.getElementById("spanCheckSelecMasive"),
        btnCheckSelectionDownload = document.getElementById("btnCheckSelectionDownload"),
        spanCheckSelecMasiveDownload = document.getElementById("spanCheckSelecMasiveDownload");

    // Función para extraer ID
    const extractIdNumber = (id) => id ? id.split('_').pop() : '';

    // Función para actualizar estilos CORREGIDA
    function updateSelectionStyle(checkbox, isTable = true) {
        const element = checkbox.closest(isTable ? "tr" : "div[id^='cardRow_']");
        if (!element) return;

        const orderId = extractIdNumber(checkbox.id);
        const originalColor = element.dataset.originalColor || '';

        if (checkbox.checked) {
            element.style.boxShadow = '0 0 0 2px #0d6efd';
            element.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
        } else {
            element.style.boxShadow = '';
            element.style.backgroundColor = originalColor;
            
            // Restaurar color original si está definido en dataset
            if (element.dataset.originalColor) {
                element.style.backgroundColor = element.dataset.originalColor;
            }
        }

        // Sincronizar con el otro componente
        const targetPrefix = isTable ? "cardCheckOrder_" : "inputCheckOrder_";
        const targetCheckbox = document.getElementById(`${targetPrefix}${orderId}`);
        
        if (targetCheckbox) {
            targetCheckbox.checked = checkbox.checked;
            const targetElement = targetCheckbox.closest(isTable ? "div[id^='cardRow_']" : "tr");
            if (targetElement) {
                if (checkbox.checked) {
                    targetElement.style.boxShadow = '0 0 0 2px #0d6efd';
                    targetElement.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
                } else {
                    targetElement.style.boxShadow = '';
                    // Restaurar color original para cards
                    if (targetElement.dataset.originalColor) {
                        targetElement.style.backgroundColor = targetElement.dataset.originalColor;
                    }
                }
            }
        }
    }

    // Función para sincronizar selección
    function syncSelection(sourceCheckbox, isTable = true) {
        const orderId = extractIdNumber(sourceCheckbox.id);
        const targetPrefix = isTable ? "cardCheckOrder_" : "inputCheckOrder_";
        const targetCheckbox = document.getElementById(`${targetPrefix}${orderId}`);
        
        if (targetCheckbox) {
            targetCheckbox.checked = sourceCheckbox.checked;
            updateSelectionStyle(targetCheckbox, !isTable);
        }
        
        updateGlobalSelectionState();
    }

    // Función para actualizar estado global CORREGIDA
    function updateGlobalSelectionState() {
        // Usamos un Set para almacenar IDs únicos de órdenes seleccionadas
        const selectedOrders = new Set();
        
        // Agregar IDs de checkboxes seleccionados en la tabla
        document.querySelectorAll('#ordenesTable input[type="checkbox"]:checked').forEach(checkbox => {
            selectedOrders.add(extractIdNumber(checkbox.id));
        });
        
        // Agregar IDs de checkboxes seleccionados en las cards
        document.querySelectorAll('.order-checkbox:checked').forEach(checkbox => {
            selectedOrders.add(extractIdNumber(checkbox.id));
        });

        const totalSelected = selectedOrders.size; // Tamaño del Set = selecciones únicas

        [btnCheckSelectionAll, btnCheckSelectionDownload].forEach(btn => {
            if (btn) btn.disabled = totalSelected === 0;
        });

        [spanCheckSelecMasive, spanCheckSelecMasiveDownload].forEach(span => {
            if (span) {
                span.textContent = totalSelected;
                span.classList.toggle("bg-danger", totalSelected === 0);
                span.classList.toggle("bg-success", totalSelected > 0);
            }
        });
    }

    // Función para inicializar checkboxes
    function initializeCheckboxes(container, isTable = true) {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.dataset.initialized) {
                checkbox.dataset.initialized = "true";
                checkbox.addEventListener("change", () => {
                    syncSelection(checkbox, isTable);
                    updateSelectionStyle(checkbox, isTable);
                });
            }
        });
    }

    // Observers para cambios dinámicos
    const tableObserver = new MutationObserver(() => initializeCheckboxes(table, true));
    const cardsObserver = new MutationObserver(() => initializeCheckboxes(cardsContainer, false));

    if (table) tableObserver.observe(table, { childList: true, subtree: true });
    if (cardsContainer) cardsObserver.observe(cardsContainer, { childList: true, subtree: true });

    // Inicialización
    if (table) initializeCheckboxes(table, true);
    if (cardsContainer) initializeCheckboxes(cardsContainer, false);

    // Función para manejar la descarga masiva (mantenida igual)
    if (btnCheckSelectionDownload) {
        btnCheckSelectionDownload.addEventListener("click", handleMassiveDownload);
    }

    // async function handleMassiveDownload() {
    //     const selectedOrders = getSelectedOrdersData();
        
    //     if (selectedOrders.length === 0) {
    //         Swal.fire('Error', 'No hay órdenes seleccionadas', 'error');
    //         return;
    //     }

    //     const groupedOrders = groupOrdersByUser(selectedOrders);
    //     const modalHtml = generateOrdersModalHtml(groupedOrders);

    //     const { isConfirmed } = await Swal.fire({
    //         title: "Descargar Resumen Múltiples Ordenes",
    //         html: modalHtml,
    //         confirmButtonText: 'Descargar Resumen <i class="fa-solid fa-download"></i>',
    //         confirmButtonColor: '#3085d6',
    //         showCancelButton: true,
    //         showCloseButton: true,
    //         cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
    //         cancelButtonColor: '#d33',
    //         width: 1220,
    //         position: "center"
    //     });

    //     if (isConfirmed) {
    //         submitOrdersForm(groupedOrders);
    //     }
    // }
    // Modifica la función handleMassiveDownload para asignar los event listeners después de generar el modal
    
    async function handleMassiveDownload() {
        const selectedOrders = getSelectedOrdersData();
        
        if (selectedOrders.length === 0) {
            Swal.fire('Error', 'No hay órdenes seleccionadas', 'error');
            return;
        }

        const groupedOrders = groupOrdersByUser(selectedOrders);
        const modalHtml = generateOrdersModalHtml(groupedOrders);

        const { isConfirmed } = await Swal.fire({
            title: "Descargar Resumen Múltiples Ordenes",
            html: modalHtml,
            confirmButtonText: 'Descargar Resumen <i class="fa-solid fa-download"></i>',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
            cancelButtonColor: '#d33',
            width: 1220,
            position: "center",
            didOpen: () => {
                // Asignar event listeners aquí, después de que el modal se abre
                document.querySelectorAll("[id^='btnRemoveRow_']").forEach(button => {
                    button.addEventListener("click", (event) => {
                        event.preventDefault();
                        const id = event.target.closest("button").id.split("_")[1];
                        id && removeRow(id);
                    });
                });
                
                document.querySelectorAll("[name='btnRemoveUser']").forEach(button => {
                    button.addEventListener("click", (event) => {
                        event.preventDefault();
                        const user = event.target.closest("button").id.split("_")[1];
                        removeUserOrders(user);
                    });
                });
            }
        });

        if (isConfirmed) {
            submitOrdersForm(groupedOrders);
        }
    }

    function getSelectedOrdersData() {
        return Array.from(table.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => {
                const row = checkbox.closest("tr");
                return row ? {
                    id: checkbox.id,
                    codigo: row.querySelector('[id^="invoice_"]')?.textContent.trim(),
                    status: row.querySelector('[id^="status_"]')?.textContent.trim(),
                    solicitadaPor: row.querySelector('[id^="userInformation_"]')?.textContent.trim(),
                    fecha: row.querySelector('[id^="date_"]')?.textContent.trim(),
                    productos: row.querySelector('[id^="productos_"]')?.textContent.trim(),
                    items: row.querySelector('[id^="items_"]')?.textContent.trim()
                } : null;
            })
            .filter(Boolean);
    }

    function groupOrdersByUser(orders) {
        return orders.reduce((acc, order) => {
            const user = order.solicitadaPor;
            if (!acc[user]) acc[user] = [];
            acc[user].push(order);
            return acc;
        }, {});
    }

    function generateOrdersModalHtml(groupedOrders) {
        const tableHeaders = `
            <tr>
                <th style="width:32vw" class="text-center">Orden N°</th>
                <th style="width:7vw" class="text-center">Status</th>
                <th style="width:20vw" class="text-center">Solicitada por</th>
                <th style="width:26vw" class="text-center">Fecha</th>
                <th style="width:16vw" class="text-center">Prod./Items</th>
                <th style="width:4vw" class="text-center"></th>
            </tr>`;

        const tableBody = Object.entries(groupedOrders).map(([user, orders]) => {
            const userRows = orders.map(order => `
                <tr id="tr_${extractIdNumber(order.id)}">
                    <td><strong>...${order.codigo.substring(19)}</strong></td>
                    <td><span class="common-style ${order.status.replace(/\s+/g, "").toLowerCase()}">${order.status}</span></td>
                    <td>${order.solicitadaPor}</td>
                    <td>${order.fecha}</td>
                    <td>${order.productos} / ${order.items}
                        <input type="hidden" name="idOrdenHidden_${extractIdNumber(order.id)}" value="${extractIdNumber(order.id)}">
                    </td>
                    <td>
                        <button name="btnRemoveRow" title="Remover Orden ${extractIdNumber(order.id)}" 
                                type="button" id="btnRemoveRow_${extractIdNumber(order.id)}" 
                                class="btn btn-danger rounded-circle m-2 border border-2 shadow">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join("");

            return `
                <tr class="user-header-row" id="user-header-${user.replace(/[\s-]/g, '').toLowerCase()}">
                    <td colspan="6" class="bg-light">
                        <strong>Usuario: ${user}</strong>
                        <input type="hidden" name="user-header-${user.replace(/[\s-]/g, '').toLowerCase()}" 
                                value="${user.replace(/[\s-]/g, '').toLowerCase()}">
                        <button name="btnRemoveUser" type="button" title="Remover Usuario ${user}" 
                                id="btnRemoveUser_${user.replace(/[\s-]/g, '').toLowerCase()}" 
                                class="btn btn-delete-user float-end">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
                ${userRows}
            `;
        }).join("");

        return `
            <form id="formResumenOrdenes" action="/api/ordenes/resumenMulti/" method="post">
                <fieldset>
                    <table id="resumenOrdenesTable" class="table align-middle" style="font-size: 11pt">
                        <thead>${tableHeaders}</thead>
                        <tbody>${tableBody}</tbody>
                    </table>
                </fieldset>
            </form>`;
    }

    function submitOrdersForm(groupedOrders) {
        const form = document.getElementById('formResumenOrdenes');
        if (form) {
            form.submit();
            setTimeout(() => {
                Swal.fire({
                    title: `Resumen Ordenes descargado!`,
                    html: 'El resumen de órdenes fue descargado con éxito',
                    icon: 'success',
                    width: 500
                });
            }, 500);
        }
    }

    // Funciones para manejar eliminación en el modal (mantenidas igual)
    // function removeModal() {
    //     const removeButtons = document.querySelectorAll('button[name="btnRemoveRow"]'),
    //         removeUsers = document.querySelectorAll('button[name="btnRemoveUser"]');
        
    //     if (removeButtons.length < 1 || removeUsers.length < 1) {
    //         Swal.close();
    //         Swal.fire({
    //             title: `Resumen de Órdenes no descargado!`,
    //             html: 'El resumen de órdenes no fue descargado',
    //             icon: 'warning',
    //             width: 500
    //         });
    //         return false;
    //     }
    // }

    // Función removeModal mejorada
    function removeModal() {
        const remainingRows = document.querySelectorAll('#resumenOrdenesTable tbody tr:not(.user-header-row)');
        if (remainingRows.length === 0) {
            Swal.close();
            Swal.fire({
                title: `Resumen de Órdenes no descargado!`,
                html: 'No quedan órdenes seleccionadas para descargar',
                icon: 'warning',
                width: 500
            });
            return false;
        }
        return true;
    }

    document.querySelectorAll("[id^='btnRemoveRow_']").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault()
            console.log('button: ', button)
            const id = event.target.closest("button").id.split("_")[1];
            id ? removeRow(id) : null
        });
    });
    
    // function removeRow(idButton) {
    //     const rowToDelete = document.getElementById(`tr_${idButton}`);
    //     if (rowToDelete) {
    //         const userHeader = rowToDelete.previousElementSibling;
    //         rowToDelete.remove();
            
    //         if (userHeader?.classList.contains("user-header-row")) {
    //             const nextRow = userHeader.nextElementSibling;
    //             if (!nextRow || nextRow.classList.contains("user-header-row")) {
    //                 userHeader.remove();
    //             }
    //         }
    //     }
    //     removeModal();
    // }

    // Función removeRow mejorada
    
    function removeRow(idButton) {
        const rowToDelete = document.getElementById(`tr_${idButton}`);
        if (!rowToDelete) return;

        const userHeader = findPreviousUserHeader(rowToDelete);
        rowToDelete.remove();
        
        // Verificar si quedan filas para este usuario
        if (userHeader) {
            const nextRow = userHeader.nextElementSibling;
            if (!nextRow || nextRow.classList.contains("user-header-row")) {
                userHeader.remove();
            }
        }
        
        removeModal();
    }
    
    // Asignar eventos a los botones de eliminar usuario
    document.querySelectorAll("[name='btnRemoveUser']").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const user = event.target.closest("button").id.split("_")[1].replace(/-/g, "");
            removeUserOrders(user);
        });
    });

    // Función auxiliar para encontrar el encabezado de usuario
    function findPreviousUserHeader(row) {
        let prev = row.previousElementSibling;
        while (prev) {
            if (prev.classList.contains("user-header-row")) {
                return prev;
            }
            prev = prev.previousElementSibling;
        }
        return null;
    }
    
    // function removeUserOrders(user) {
    //     const userHeader = document.getElementById(`user-header-${user.replace(/[\s-]/g, '').toLowerCase().trim()}`);
    //     if (userHeader) {
    //         let nextRow = userHeader.nextElementSibling;
    //         while (nextRow && !nextRow.classList.contains("user-header-row")) {
    //             const temp = nextRow.nextElementSibling;
    //             nextRow.remove();
    //             nextRow = temp;
    //         }
    //         userHeader.remove();
    //     }
    //     removeModal();
    // }

    // Función removeUserOrders mejorada
    function removeUserOrders(user) {
        const normalizedUser = user.replace(/[\s-]/g, '').toLowerCase().trim();
        const userHeader = document.getElementById(`user-header-${normalizedUser}`);
        if (!userHeader) return;

        // Eliminar todas las filas de este usuario
        let nextRow = userHeader.nextElementSibling;
        while (nextRow && !nextRow.classList.contains("user-header-row")) {
            const temp = nextRow.nextElementSibling;
            nextRow.remove();
            nextRow = temp;
        }
        
        userHeader.remove();
        removeModal();
    }
});
