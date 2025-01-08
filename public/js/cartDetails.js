function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0'),
        MM = String(date.getMonth() + 1).padStart(2, '0'),
        YY = date.getFullYear(),
        hh = String(date.getHours()).padStart(2, '0'),
        mm = String(date.getMinutes()).padStart(2, '0'),
        ss = String(date.getSeconds()).padStart(2, '0');
    return DD + "-" + MM + "-" + YY + " " + hh + ":" + mm + ":" + ss
}

let flag = false

document.addEventListener("DOMContentLoaded", () => {
    // Incrementar valor del producto
    document.querySelectorAll("[id^='btnIncrement_']").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.target.closest("button").id.split("_")[1];
            id ? incrementValue(id) : null
        });
    });

    // Decrementar valor del producto
    document.querySelectorAll("[id^='btnDecrement_']").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.target.closest("button").id.split("_")[1];
            id ? decrementValue(id) : null
        });
    });

    // Eliminar producto del carrito
    let arrayBtnDelete = []
    document.querySelectorAll("[id^='btnDeleteItem_']").forEach(button => {
        arrayBtnDelete.push(button)
        button.addEventListener("click", (event) => {
            const id = event.target.closest("button").id.split("_")[1];
            id ? deleteItem(id) : null
        });
    });
    arrayBtnDelete.length === 1 ? arrayBtnDelete[0].setAttribute('disabled', true) : null

    document.querySelectorAll("[id^='stockDisponibleNumber_']").forEach(span => {
        const id = span.id.split("_")[1];
        if (parseInt(span.textContent) <= 10) {
            let leyendaStock = document.getElementById(`stockDisponibleWarning_${id}`)
            span.classList.remove('bg-success')
            span.classList.add('bg-danger')
            leyendaStock.style.display = 'block'
        }
    });

    // Seguir Seleccionando Productos
    btnSeguirSeleccionando = document.getElementById("seguirSeleccionando")
    if (btnSeguirSeleccionando) {
        btnSeguirSeleccionando.addEventListener("click", (event) => {
            let arrayConsumiblesId = [], arrayQuantities = []
            
            const consumiblesId = document.getElementsByName('consumibleId'),
                quantities = document.getElementsByName('quantity'),
                cartId = document.getElementById('cartId').value
            
            consumiblesId.forEach(id =>{
                arrayConsumiblesId.push(id.value)
            })
    
            quantities.forEach(id =>{
                arrayQuantities.push(id.value)
            })
                
            let html = `El carrito fue actualizado y sus cambios no se han guardado aún...<br>
                    Está seguro que desea continuar?
                    <form id="formSaveCart" action="/api/carts/updateCart/${cartId}" method="post">
                        <input type="hidden" name="consumiblesId" value="${arrayConsumiblesId}">
                        <input type="hidden" name="quantities" value="${arrayQuantities}">
                    </form>`
    
            if (flag) {
                Swal.fire({
                    title: `Seguir seleccionando sin guardar?`,
                    position: 'center',
                    html: html,
                    icon: 'warning',
                    showCancelButton: true,
                    showCloseButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Actualizar Carrito! <i class="fa-solid fa-save"></i>',
                    cancelButtonText: 'No guardar cambios <i class="fa-solid fa-cart-shopping fa-rotate-by" style="--fa-rotate-angle: 45deg;"></i>'
        
                }).then((result) => {
                    if (result.isConfirmed) {
                        const submitAction = document.getElementById("formSaveCart")
                        submitAction.submit()
                        Swal.fire(
                            'Actualizado!',
                            `El carrito, se actualizó exitosamente.`,
                            'success'
                        )
        
                    } else if (result.isDenied) {
                        Swal.close()
    
                    } else {
                        Swal.fire(
                            'No guardado!',
                            `El carrito no se ha actualizado`,
                            'info'
                            )
                        window.location.href = '/api/auth/indexToolShop';
                    }
                })
    
            } else {
                window.location.href = '/api/auth/indexToolShop';
            }
        });
    }
});

// Función para incrementar cantidad
function incrementValue(consumibleId) {
    if (consumibleId) {
        const quantityInput = document.getElementById(`quantity_${consumibleId}`),
            quantitySpan = document.getElementById(`itemQuantity_${consumibleId}`),
            btnDecrement = document.getElementById(`btnDecrement_${consumibleId}`),
            btnIncrement = document.getElementById(`btnIncrement_${consumibleId}`),
            stockDisponibleItem = parseInt(document.getElementById(`stock_${consumibleId}`).value)
        
        let stockDiponible10 = Math.floor(stockDisponibleItem / 10),
            currentQuantity = parseInt(quantityInput.value, 10);

        if (stockDisponibleItem >= 10) {
            if (parseInt(currentQuantity) === parseInt(stockDiponible10)) {
                btnIncrement.setAttribute('disabled', true)
                currentQuantity
                Swal.fire({
                    title: 'Advertencia',
                    position: 'center',
                    timer: 4000,
                    timerProgressBar: true,
                    text: `Lo sentimos, NO puede solicitar mas del 10% del stock disponible!`,
                    icon: 'warning',
                    showCancelButton: false,
                    showConfirmButton: true,
                })
    
            } else {
                btnIncrement.removeAttribute('disabled')
                currentQuantity++;
            }

        } else {
            if (parseInt(currentQuantity) === stockDisponibleItem) {
                btnIncrement.setAttribute('disabled', true)
                currentQuantity
                Swal.fire({
                    title: 'Advertencia',
                    position: 'center',
                    timer: 4000,
                    timerProgressBar: true,
                    text: `Lo sentimos, stock disponible del ítem insuficiente!`,
                    icon: 'warning',
                    showCancelButton: false,
                    showConfirmButton: true,
                })
    
            } else {
                btnIncrement.removeAttribute('disabled')
                currentQuantity++;
            }
        }
        quantityInput.value = currentQuantity;
        quantitySpan.textContent = currentQuantity;

        currentQuantity>1 ? btnDecrement.removeAttribute('disabled') : btnDecrement.setAttribute('disabled', true)
        
        updateSummary(consumibleId);
    }
}

// Función para decrementar cantidad
function decrementValue(consumibleId) {
    if (consumibleId) {
        const quantityInput = document.getElementById(`quantity_${consumibleId}`),
            quantitySpan = document.getElementById(`itemQuantity_${consumibleId}`),
            btnDecrement = document.getElementById(`btnDecrement_${consumibleId}`),
            btnIncrement = document.getElementById(`btnIncrement_${consumibleId}`),
            stockDisponibleItem = parseInt(document.getElementById(`stock_${consumibleId}`).value)

        let stockDiponible10 = Math.floor(stockDisponibleItem / 10),
            currentQuantity = parseInt(quantityInput.value, 10);

        if (currentQuantity > 1) {
            currentQuantity--;

            quantityInput.value = currentQuantity;
            quantitySpan.textContent = currentQuantity;

            currentQuantity>1
            ? btnDecrement.removeAttribute('disabled')
            : btnDecrement.setAttribute('disabled', true)
            
            if (stockDisponibleItem >= 10) {
                currentQuantity<stockDiponible10
                ? btnIncrement.removeAttribute('disabled')
                : btnIncrement.setAttribute('disabled', true)
            
            } else {
                currentQuantity<stockDisponibleItem
                ? btnIncrement.removeAttribute('disabled')
                : btnIncrement.setAttribute('disabled', true)
            }

            updateSummary(consumibleId);
        }
    }
}

// Función para eliminar ítem
function deleteItem(consumibleId) {
    if (consumibleId) {
        const itemElement = document.getElementById(`btnDeleteItem_${consumibleId}`).closest("li");
        itemElement.remove();

        updateSummary();
    }
}

// Actualizar resumen del carrito (cantidad de productos y hora)
function updateSummary() {
    const totalItemsBadge = document.getElementById('totalItems'),
        totalProducts = document.getElementById('totalProducts'),
        quantities = document.querySelectorAll("[id^='quantity_']");

    let totalQuantity = 0
    quantities.forEach(input => {
        totalQuantity += parseInt(input.value, 10);
    });

    totalItemsBadge.textContent = totalQuantity;
    totalProducts.innerHTML = `<strong>${quantities.length} Producto/s</strong><br>
    Cantidad Total de Ítems: <span id="totalItems" class="badge badge-pill bg-success"> ${totalQuantity} </span>`;
    
    // Actualizar fecha y hora
    const dateSpan = document.getElementById('fecha'),
        currentDateTime = formatDate(new Date());
    dateSpan.innerHTML = `<strong>Fecha y hora:</strong><br>${currentDateTime}`;

    let btnDeleteItem = document.querySelectorAll("[id^='btnDeleteItem_']")
    quantities.length === 1 ? btnDeleteItem[0].setAttribute('disabled', true) : null
    flag = true
}

// Vaciar Carrito
const btnEmptyCart = document.getElementById('emptyCart');
if(btnEmptyCart) {
    btnEmptyCart.addEventListener('click', (event) => {
        event.preventDefault();
        const cartUrl = btnEmptyCart.href,
            html = `El carrito será vaciado...<br>Está seguro que desea continuar?`;

        Swal.fire({
            title: 'Vaciar Carrito?',
            position: 'center',
            html: html,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vaciar Carrito! <i class="fa-solid fa-cart-shopping fa-rotate-by" style="--fa-rotate-angle: 45deg;"></i>',
            cancelButtonText: 'Cancelar <i class="fa-regular fa-rectangle-xmark"></i>'
        
        }).then((result) => {
            result.isConfirmed ? window.location.href = cartUrl : Swal.close()
        });
    });
}

// Generar PO de carrito
const btnGenerateOrder = document.getElementById('generateOrder')
if (btnGenerateOrder) {
    btnGenerateOrder.addEventListener('clic', (event) => {
    
    });
}