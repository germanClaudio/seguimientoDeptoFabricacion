const socket = io.connect(),
    offset = -3 * 60 * 60 * 1000

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
socket.on('ordersUsers', ( arrUsers ) => {
    let cadena = document.getElementById('mostrarUserName').innerText,
        indice = cadena.indexOf(","),
        name = cadena.substring(0,indice),
        index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let userAdmin = arrUsers[index].admin,
            usuario = arrUsers[index]
            
        // Emitir el evento 'sendUser' con el parámetro user
        socket.emit('sendUser', usuario, userAdmin );
    }
})

socket.on('ordersAllByUserId', (data) => {
    const { allOrders, ordersByUser, allUsers, userAdmin } = data;

    userAdmin ? renderOrdenesAdmin(allOrders, allUsers) : renderOrdenesUser(ordersByUser)

})

const renderOrdenesAdmin = (arrOrders) => {
    const arrayOrders = arrOrders
    if (arrOrders.length > 0) {
        const html = arrayOrders.map((element) => {
            let prodArr = []
            function loopProductId() {
                for (i=0; i < element.items.length; i++) {
                    prodArr.push(element.items[i].consumibleId)
                }
                return prodArr.length//join('\n')
            }

            let qtyArr = [], qtyArrNumber = []
            function loopQuantity() {
                for (i=0; i < element.items.length; i++) {
                    qtyArr.push(element.items[i].quantity)
                    qtyArrNumber.push(element.items[i].quantity)
                }
                return qtyArr.join(' - ') //('\n')
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
                let checkDisabled = ''
                if (!element.active) {
                    btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-dolly"></i></button>
                                        <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-regular fa-trash-can"></i></button>`
                    checkDisabled = `disabled`

                } else if (btnPrepared && !btnDelivered) {
                    btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button id="btnDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-dolly"></i></button>
                                        <button id="${element._id}" name="btnDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-regular fa-trash-can"></i></button>`
                
                } else {
                    btnConfiguration = `<button id="btnPrepareOrder_${element._id}" name="btnPrepareOrder" type="button" class="btn btn-warning btn-sm" title="Preparar Orden ...${idChain}"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button id="btnDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-dolly"></i></i></button>
                                        <button id="${element._id}" name="btnDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-regular fa-trash-can"></i></button>`
                }

                let utcDate = new Date(element.timestamp),
                    utcDateModified = new Date(element.modifiedOn),
                    localDate = new Date(utcDate.getTime() + offset),
                    localDateModified = new Date(utcDateModified.getTime() + offset),
                    formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                    formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                    element.timestamp === element.modifiedOn ? formattedDateModified = '-' : null

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
        document.getElementById('mostrarOrdenes').innerHTML = html

        const ordersActiveQty = []
        for(let u=0; u<arrayOrders.length; u++) {
            arrayOrders[u].visible ? ordersActiveQty.push(u) : null
        }

        const htmlOrderList = 
            ( `<caption id="capOrderList">Cantidad de Ordenes: ${parseInt(ordersActiveQty.length)}</caption><br>
                <caption id="capDeleteOrderList">Cantidad de Ordenes Eliminadas: ${parseInt(arrayOrders.length - ordersActiveQty.length)}</caption>`)

        document.getElementById('capOrdersList').innerHTML = htmlOrderList

    } else {
        const html = (`<tr>
                            <td colspan="10">
                                <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                                    src='../../src/images/clean_table_graphic.png' width="auto" height="auto">
                            </td>
                        </tr>`)

        document.getElementById('mostrarOrdenes').innerHTML = html   
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('ordenesTable').style.display = 'block';


    // ---- mensaje confirmacion Preparar Order -----------
    function messagePrepareOrder(idOrden, userInformation, date) {
        const idChain = idOrden.substring(19)
        const htmlForm =
            `La solicitud <strong>...${idChain}</strong>, con fecha <b>${date}</b>,<br>
                pasará a estado <span class="badge rounded-pill bg-warning text-dark">Preparado</span><br>
                para el usuario: <b>${userInformation}</b><br>
                <form id="formPrepareOrder" action="/api/ordenes/prepare/${idOrden}" method="post">
                    <fieldset>
                        <input type="hidden" id="screen" name="screen" value="0">
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
                        <input type="hidden" id="screen" name="screen" value="0">
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
        const idChain = idOrden.substring(19)
        const htmlForm =
            `La solicitud con fecha <b>${date}</b>, se eliminará completamente<br>
                para el usuario: <strong>${userInformation}</strong> y usted.<br>
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
            confirmButtonText: 'Eliminarlo! <i class="fa-regular fa-trash-can"></i>',
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
}

const renderOrdenesUser = (arrOrders) => {
    const arrayOrders = arrOrders
    if (arrOrders.length > 0) {
        const html = arrayOrders.map((element) => {
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

                    element.timestamp === element.modifiedOn ? formattedDateModified = '-' : null

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
        document.getElementById('mostrarOrdenes').innerHTML = html

    } else {
        const html = (`<tr>
                        <td colspan="9">
                            <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                                src='../../src/images/clean_table_graphic.png' width="auto" height="auto">
                        </td>
                    </tr>`)
        document.getElementById('mostrarOrdenes').innerHTML = html   
    }

    const ordersActiveQty = [], ordersPreparedQty = []
    for(let u=0; u<arrayOrders.length; u++) {
        arrayOrders[u].visible && !arrayOrders[u].active ? ordersActiveQty.push(u) : null
        arrayOrders[u].visible && arrayOrders[u].prepared ? ordersPreparedQty.push(u) : null
    }

    const htmlOrderList = 
        ( `<caption id="capOrderList">Cantidad de Ordenes Totales: ${parseInt(arrayOrders.length)}</caption><br>
            <caption id="capPreparedList">Cantidad de Ordenes Preparadas: ${parseInt(ordersPreparedQty.length)}</caption><br>
            <caption id="capDeleteOrderList">Cantidad de Ordenes Entregadas: ${parseInt(ordersActiveQty.length)}</caption>`)

    document.getElementById('capOrdersList').innerHTML = htmlOrderList

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('ordenesTable').style.display = 'block';

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
}