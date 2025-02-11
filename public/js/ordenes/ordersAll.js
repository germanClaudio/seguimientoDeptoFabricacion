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

// Mostrar el spinner y ocultar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('ordenesTable').style.display = 'none';
});

// ---------- Orders historial ----------------
socket.on('ordersAll', (arrOrders, arrUsers) => {
    let cadena = document.getElementById('mostrarUserName').innerText,
        indice = cadena.indexOf(","),
        name = cadena.substring(0,indice),
        index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin,
            userId = arrUsers[index]._id
            // console.log('user: ', user)
        user ? renderOrdenesAdmin(arrOrders, userId) : renderOrdenesUser(arrOrders)
    }
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
                let checkDisabled = ''
                if (!element.active) {
                    btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-car"></i></button>
                                        <button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-regular fa-trash-can"></i></button>`
                    checkDisabled = `disabled`

                } else if (btnPreprared && !btnDelivered) {
                    btnConfiguration = `<button type="button" class="btn btn-secondary btn-sm disabled"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button id="btnDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-car"></i></button>
                                        <button id="${element._id}" name="btnDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-regular fa-trash-can"></i></button>`
                
                } else {
                    btnConfiguration = `<button id="btnPrepareOrder_${element._id}" name="btnPrepareOrder" type="button" class="btn btn-warning btn-sm" title="Preparar Orden ...${idChain}"><i class="fa-solid fa-truck-fast"></i></button>
                                        <button id="btnDeliverOrder_${element._id}" name="btnDeliverOrder" type="button" class="btn btn-success btn-sm" title="Entregar Orden ...${idChain}"><i class="fa-solid fa-car"></i></button>
                                        <button id="${element._id}" name="btnDeleteOrder" type="button" class="btn btn-danger btn-sm" title="Eliminar Orden ...${idChain}"><i class="fa-regular fa-trash-can"></i></button>`
                }

                return (`<tr>
                            <td class="text-center" id="checkSelect_${element._id}" name="checkSelect"><input class="form-check-input border border-2 border-primary shadow-lg rounded" type="checkbox" value="" id="inputCheckOrder_${element._id}" name="inputCheckOrder" ${checkDisabled}></td>
                            <th scope="row" class="text-center py-3"><strong>...${idChain}</strong></th>
                            <td class="text-center py-3" id="productos_${element._id}"><strong>${loopProductId()}</strong></td>
                            <td class="text-center py-3" id="items_${element._id}">${loopQuantity()} <strong>(${resultado})</strong></td>
                            <td class="text-center py-3" id="invoice_${element._id}" name="invoiceNumber">${element.invoice_nr}</td>
                            <td class="text-center py-3" id="userInformation_${element._id}"><strong>${element.shipping[0].name} ${element.shipping[0].lastName} - ${element.shipping[0].legajoIdUser}</strong></td>
                            <td class="text-center py-3" id="date_${element._id}">${element.modifiedOn}</td>
                            <td class="text-center py-3" id="status_${element._id}"><span class="badge rounded-pill bg-${optionStatus} text-${textStatus}">${showStatus}</span></td>
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
                            <td colspan="8">
                                <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                                    src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                            </td>
                        </tr>`)

        document.getElementById('mostrarOrdenes').innerHTML = html   
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('ordenesTable').style.display = 'block';
    
    // const htmlOrderList = 
    //     ( `<caption id="capOrdersList">Total Orders List ${arrayOrders.length}</caption>`)

    // document.getElementById('capOrdersList').innerHTML = htmlOrderList

    // ---- mensaje confirmacion eliminar Order -----------
    function messageDeleteOrder(idOrden, userInformation, date) {
        const htmlForm =
            `La solicitud con fecha <b>${date}</b>, se eliminará completamente<br>
                para el usuario: <strong>${userInformation}</strong> y usted.<br>
                <strong>Esta acción no se puede deshacer!<strong><br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteOrder" action="/api/ordenes/delete/${idOrden}" method="get">
                    <fieldset>
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
                        codigo: card.querySelector(`[id^="cardCodigo_"]`).textContent.trim(),
                        status: card.querySelector(`[id^="cardStatus_"]`).textContent.trim(),
                        solicitadaPor: card.querySelector(`[id^="cardUserInformation_"]`).textContent.trim(),
                        fecha: card.querySelector(`[id^="date_"]`).textContent.trim(),
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

        // Generar SweetAlert2 con los datos seleccionados
        const tableHtml = `
            <form id="formModifyStatus" action="/api/ordenes/modifyMulti/" method="post">
                <fieldset>
                    <table id="statusOrdenesTable" class="table align-middle" style="font-size: 11pt";>
                        <thead>
                            <tr>
                                <th style="width:32vw" class="text-center">Orden N°</th>
                                <th style="width:7vw" class="text-center">Status</th>
                                <th style="width:20vw" class="text-center">Solicitada por</th>
                                <th style="width:26vw" class="text-center">Fecha</th>
                                <th style="width:16vw" class="text-center">Prod./Items</th>
                                <th style="width:4vw" class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${selectedCheckboxes.map((data) =>
                                `<tr id="tr_${extractIdNumber(data.id)}">
                                    <td><strong>...${data.codigo.substring(19)}</strong></td>
                                    <td><span class="common-style ${data.status.replace(/\s+/g, "").toLowerCase()}">${data.status}</span></td>
                                    <td>${data.solicitadaPor}</td>
                                    <td>${data.fecha}</td>
                                    <td>${data.productos} / ${data.items}
                                        <input type="hidden" name="idOrdenHidden_${extractIdNumber(data.id)}" value="${extractIdNumber(data.id)}" style="display: none;"></td>
                                    <td><button name="btnRemoveRow" type="button" id="btnRemoveRow_${extractIdNumber(data.id)}" class="btn btn-danger rounded-circle m-2 border border-2 shadow">
                                        <i class="fa-solid fa-trash"></i></button></td>
                                </tr>`).join("")}
                        </tbody>
                    </table>
                </fieldset>
            </form>`;

        Swal.fire({
            title: "Modificar Status Múltiples Ordenes",
            html: tableHtml,
            confirmButtonText: 'Modificar Ordenes <i class="fa-solid fa-cart-plus"></i>',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
            cancelButtonColor: '#d33',
            width: 1210,
            position: "center"

        }).then((result) => {
            const formQuantityValues = document.getElementById('formQuantityValues')
            if (result.isConfirmed) {
                formQuantityValues.submit()

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
                    html: 'Las ordenes no fueron modificadas',
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
                    html: 'Las ordenes no fueron modificadas',
                    icon: 'warning',
                    width: 500
                })
                return false
            }
        }
    });
});