//variable limite maximo de proyectos por Cliente
const varLimMaxProyectoCliente = 25

//variable limite maximo de Ot por Proyecto
const varLimMaxOtProyecto = 50

//variable limite maximo de OCI por Proyecto
const varLimMaxOciProyecto = 25

//variable limite maximo de Columnas Info por Ot
const varLimMaxColData = 20

//variable limite maximo de Revisiones por dato
const varLimMaxRevData = 99

//variable limite maximo de Detalles por OT
const varLimMaxDetallesOT = 99


// Manejador de eventos de tablas General y Detalle -------------------
const arrBtnHidde = []
for (let i = 0; i<varLimMaxOciProyecto; i++) { //25
    document.getElementById(`tablaGeneral${i}`) ? arrBtnHidde.push(i) : null
}

function hiddeTableGeneral(k) {
    const tablaGeneral = document.getElementById(`tablaGeneral${k}`)
    const tablaDetalle = document.getElementById(`tablaDetalle${k}`)
    const btnHiddeTableGeneral = document.getElementById(`btnHiddeTableGeneral${k}`)
    const posBtnHiddeTableGeneral = document.getElementById(`posBtnHiddeTableGeneral${k}`)

    if (tablaGeneral.style.display === 'none') {
        tablaGeneral.style.display = ''
        tablaGeneral.classList.add("col-3")
        tablaDetalle.classList.add("col-2")
        btnHiddeTableGeneral.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

        posBtnHiddeTableGeneral.classList.remove("col-1")
        posBtnHiddeTableGeneral.classList.add("col-3")
        btnHiddeTableGeneral.title = 'Ocultar General'

    } else {
        tablaGeneral.style.display = 'none'
        tablaGeneral.classList.remove("col-3")
        tablaDetalle.classList.add("col-2")
        btnHiddeTableGeneral.innerHTML = '<i class="fa-solid fa-eye"></i>'
        posBtnHiddeTableGeneral.classList.remove("col-3")
        posBtnHiddeTableGeneral.classList.add("col-1")
        btnHiddeTableGeneral.title = 'Mostrar General'
    }
}

function hiddeTableDetalles(k) {
    const tablaDetalle = document.getElementById(`tablaDetalle${k}`)
    const btnHiddeTableDetalle = document.getElementById(`btnHiddeTableDetalle${k}`)
    const posBtnHiddeTableDetalle = document.getElementById(`posBtnHiddeTableDetalle${k}`)

    if (tablaDetalle.style.display === 'none') {
        tablaDetalle.style.display = ''
        btnHiddeTableDetalle.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
        posBtnHiddeTableDetalle.classList.remove("col-1")
        posBtnHiddeTableDetalle.classList.add("col-2")
        btnHiddeTableDetalle.title = 'Ocultar Items'
    } else {
        tablaDetalle.style.display = 'none'
        btnHiddeTableDetalle.innerHTML = '<i class="fa-solid fa-eye"></i>'
        posBtnHiddeTableDetalle.classList.remove("col-2")
        posBtnHiddeTableDetalle.classList.add("col-1")
        btnHiddeTableDetalle.title = 'Mostrar Items'
    }
}

function extractNumbers(str) {
    const numbers = str.match(/\d{1,2}/g) // Extract 1 or 2 digit numbers from the string
    
    if (numbers) {
        if (numbers.length === 2) {
            // If two numbers are found, check if both are numbers
            if (!isNaN(parseInt(numbers[0])) && !isNaN(parseInt(numbers[1]))) {
                return numbers; // Return both numbers as an array
            }
        } else if (numbers.length === 1) {
            // If only one number is found, check if it's a number
            if (!isNaN(parseInt(numbers[0]))) {
                return numbers[0]; // Return the single number
            }
        }
    }
    return null; // Return null if no valid numbers are found
}

// Ocultar tablas cabeceras
if (arrBtnHidde !=[]) {
    let allButtonsHiddeTableGeneral = document.querySelectorAll('button[name="btnHiddeTableGeneral"]')
    let allButtonsHiddeTableDetalle = document.querySelectorAll('button[name="btnHiddeTableDetalle"]')
    
    allButtonsHiddeTableGeneral.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let kValue = btn.id
                hiddeTableGeneral(extractNumbers(kValue))
            })
        }
    })

    allButtonsHiddeTableDetalle.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let kValue = btn.id
                hiddeTableDetalles(extractNumbers(kValue))
            })
        }    
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const projectNameHidden = document.getElementById('projectNameHidden').value
    const projectNameTitle = document.getElementById('projectNameTitle')
    projectNameTitle.innerHTML = `Proyecto <strong>${projectNameHidden}</strong> - Estado de Programación / Mecanizado`
})

// ---- Manejador de eventos para Carouseles --------------------
document.addEventListener('DOMContentLoaded', function (event) {
    let initIndex = event.eventPhase

    const arrayCarousel = []
    for (let i = 0; i<varLimMaxOciProyecto; i++) {
        document.getElementById(`carouselExampleControls${i}`) ? arrayCarousel.push(i) : null
    }
    if(arrayCarousel !=[]) {
        for (let i=0; i<arrayCarousel.length; i++) {
            let myCarousel = document.getElementById(`carouselExampleControls${arrayCarousel[i]}`)
            
            myCarousel ?
                initIndex === 2 ?
                    myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                :
                    myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            : null

            // Detectar cuando el slide cambia
            myCarousel.addEventListener('slid.bs.carousel', function (event) {
                let slideCount = event.relatedTarget.parentElement.children.length
                let currentIndex = event.to

                // Si el slide actual es el último, deshabilita el botón "Next"
                currentIndex === slideCount - 1 ?
                    myCarousel.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
                :
                    myCarousel.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
                
                // Si el slide actual es el primero, deshabilita el botón "Prev"
                currentIndex === 0 ?
                    myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                :
                    myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            })
        }
    }
})

let slidesCarousel = document.getElementsByClassName('carousel-item')
let btnInferiorCarousel = document.getElementsByName('btnInferiorCarousel')

// Función para dividir un array en subarrays de tamaño especificado
function dividirArrayEnSubarrays(array, tamanoSubarray) {
    const subarrays = []
    for (let i = 0; i < array.length; i += tamanoSubarray) {
        subarrays.push(array.slice(i, i + tamanoSubarray));
    }
    return subarrays
}

const arrayOriginal = Array.from(slidesCarousel)
const arrayOriginalBtn = Array.from(btnInferiorCarousel)

// Dividir el array en subarrays de 3 elementos cada uno
const subarrays = dividirArrayEnSubarrays(arrayOriginal, 4); // cant. maxima de slides
const subarrayBtns = dividirArrayEnSubarrays(arrayOriginalBtn, 4); // cant. maxima de slides

function activarElemento(subarray, index) {
    if (subarray.length > 0) {
        // Si el índice está dentro del rango, activamos el elemento correspondiente
        const safeIndex = (index >= 0 && index < subarray.length) ? index : 0;
        subarray[safeIndex].classList.add('active');
    }
}

// Convertimos el valor de slideHidden a entero una vez
const slideIndex = parseInt(slideHidden.value);

// Activamos los elementos en ambos conjuntos de subarrays
[subarrays, subarrayBtns].forEach(array => {
    array.forEach(subarray => {
        activarElemento(subarray, slideIndex);
    });
});

// ---------------- Event Add New Ot Row to OCI --------------------
const btnAddNewRow = document.getElementById("btnAddNewRow")
const buttonOne = document.getElementById('buttonOne')
btnAddNewRow.disabled = true 

buttonOne.addEventListener('click', () => {
    let ariaExpanded = buttonOne.getAttribute('aria-expanded')

    ariaExpanded==='true' ?
        btnAddNewRow.removeAttribute('disabled')
    :
        btnAddNewRow.disabled = true
})

//*********** */
tippy(btnAddNewRow, {
    content: `<strong>Límite máximo de OT 10</strong><br>
                Puedes agregar 9 OT's mas`,
    allowHTML: true,
    maxWidth: 350,
    inlinePositioning: true,
    arrow: true,
    animation: 'shift-away', //'scale',
    theme: 'material',
    interactive: false,
    hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
})
//*********** */

//-------------------------- Add New OT Row --------------------------------
btnAddNewRow.addEventListener('click', () => {

    const parentDiv = document.getElementById('div_body')
    let i = parseInt(parentDiv.childElementCount)
    const lastChild = parentDiv.children[i - 1]
    const lastChildId = lastChild.id

    if (lastChildId < i || i == 1) {
        i = parseInt(parentDiv.childElementCount)
    } else {
        const numberId1 = parseInt(lastChildId.slice(-1))
        const numberId2 = parseInt(lastChildId.slice(-2))
        let numberIdLastChild

        numberId1 >= 0 && numberId2 ? numberIdLastChild = numberId2 : numberIdLastChild = numberId1;

        i = parseInt(numberIdLastChild + 1)
    }

    let otNumberValue = parseInt(document.getElementById('otNumber').value)
    let opNumberValue = parseInt(document.getElementById('opNumber').value)
    const internoDisenoValue = document.getElementById('internoDiseno').value
    const internoSimulacion = document.getElementById('internoSimulacion').value
    const externoDiseno = document.getElementById('externoDiseno').value

    const originalDiv = (
            `<div class="row">
                <strong>#${i+1}</strong>
            </div>
            <div class="col-1">
                <label for="otNumber${i}" id="labelOtNumber${i}">OT#</label>
                <input type="number" name="otNumber${i}" id="otNumber${i}" class="form-control mt-3" min="0" max="9999"
                placeholder="Número OT" value="${otNumberValue + i}">
            </div>
            <div class="col-1">
                <label for="opNumber${i}" id="labelOpNumber${i}">OP#</label>
                <input type="number" name="opNumber${i}" id="opNumber${i}" class="form-control mt-3" min="0" max="9999"
                placeholder="Número OP" value="${opNumberValue + i * 10}">
            </div>
            <div class="col-2">
                <label for="opDescription${i}" id="labelOpDescription${i}">Descripción OP</label>
                <input type="text" name="opDescription${i}" id="opDescription${i}" class="form-control mt-3"
                placeholder="Descripción OP">
            </div>
            <div class="col-1">
                <label for="otStatus${i}" id="labelOtStatus${i}">Status OT</label><br>
                <div class="form-check form-switch d-inline-block mt-2">
                    <input class="form-check-input mt-3" type="checkbox" id="otStatus${i}" aria-checked="true" name="otStatus${i}" style="cursor: pointer;" checked>
                    <label class="form-check-label mt-2" for="otStatus${i}">Activa</label>
                </div>
            </div>
            <div class="col-2">
                <label for="internoDiseno${i}" id="labelInternoDiseno${i}">Diseño seguido por</label>
                <input type="text" name="internoDiseno${i}" id="internoDiseno${i}" class="form-control mt-3"
                placeholder="Diseño" value="${internoDisenoValue}">    
            </div>
            <div class="col-2">
                <label for="internoSimulacion${i}" id="labelInternoSimulacion${i}">Simulación seguida por</label>
                <input type="text" name="internoSimulacion${i}" id="internoSimulacion${i}" class="form-control mt-3"
                placeholder="Simulación" value="${internoSimulacion}">    
            </div>
            <div class="col-2">
                <label for="externoDiseno${i}" id="labelExternoDiseno${i}">Proveedor externo</label>
                <input type="text" name="externoDiseno${i}" id="externoDiseno${i}" class="form-control mt-3"
                placeholder="Proveedor" value="${externoDiseno}">    
            </div>
            <div class="col-1 my-auto">
                <div class="d-flex">
                    <button name="btnRemoveRow" type="button" id="btnRemoveRow${i}" value="${i}" class="btn btn-danger rounded-circle m-2 border border-2 shadow">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>    
            </div>`
    )

    // Función para ocultar el botón de remover
    function hideRemoveButton(index) {
        const btnRemoveItem = document.getElementById(`btnRemoveRow${index}`);
        if (btnRemoveItem) {
            btnRemoveItem.style.display = 'none';
        }
    }

    // Lógica principal
    if (i !== 1) {
        hideRemoveButton(i - 1);
    }

    if (i >= 10) {
        btnAddNewRow.disabled = true;
    }

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'row my-2');
    newDiv.id = `otItemRow${i}`;

    // Configurar el contenido del nuevo div según el valor de i
    if (i === 1) {
        newDiv.innerHTML = `<hr class="my-2"> ${originalDiv} <hr class="my-2">`;
    } else {
        newDiv.innerHTML = i === 10 ? originalDiv : originalDiv + `<hr class="my-2">`;
    }

    parentDiv.appendChild(newDiv)
    const otQty = document.getElementById("otQuantity")
    otQty.value = i+1

    let removeButtons = document.querySelectorAll('button[name="btnRemoveRow"]')
    let lastRemoveButton = removeButtons[removeButtons.length-1]
    
        if (lastRemoveButton) {
            lastRemoveButton.addEventListener("click", (event) => {
                event.preventDefault()
                let idBtnRemoveRow = lastRemoveButton.id
                removeRow(idBtnRemoveRow)
            })
        }

    //*************** ToolTip cantidad de OT a agregar *************** */
    let contentMessage;
    if (i < 8) {
        contentMessage = `<strong>Límite máximo de OT (10)</strong><br> 
                        Puedes agregar ${9 - i} OT's más`;
    } else if (i == 8) {
        contentMessage = `<strong>Límite máximo de OT (10)</strong><br> 
                        Puedes agregar 1 OT más`;
    }

    if (i <= 8) {
        tippy(btnAddNewRow, {
            content: contentMessage,
            allowHTML: true,
            maxWidth: 350,
            inlinePositioning: true,
            arrow: true,
            animation: 'shift-away',
            theme: 'material',
            interactive: false,
            hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
        });
    }
    //*************************************** */
})

//-------------------------- Remove OT Row ----------------------------------
function removeRow(e) {
    const parentDiv = document.getElementById('div_body')
    let i = parentDiv.childElementCount
    
    if (extractNumbers(e) && i > 1) {
        let btnRemoveRow = e
        const numberId1 = parseInt(btnRemoveRow.slice(-1))
        const numberId2 = parseInt(btnRemoveRow.slice(-2))
        let numberIdToDelete

        numberId1 >= 0 && numberId2 ? numberIdToDelete = numberId2 : numberIdToDelete = numberId1;

        function checkString(string) {
            return /^[0-9]*$/.test(string);
        }

        if (checkString(numberIdToDelete)) {
            const rowToDelete = document.getElementById(`otItemRow${numberIdToDelete}`)
            rowToDelete ? rowToDelete.remove() : null

            const otQty = document.getElementById("otQuantity")
            otQty.setAttribute('value', (i - 1))

            if (numberIdToDelete === 1) {
                btnAddNewRow.removeAttribute('disabled')

            } else if (numberIdToDelete !== 1 && numberIdToDelete < 9) {
                btnRemoveItem = document.getElementById(`btnRemoveRow${numberIdToDelete - 1}`)
                btnRemoveItem.style.display = 'inline'
                btnAddNewRow.removeAttribute('disabled')

            } else {
                btnRemoveItem = document.getElementById(`btnRemoveRow${numberIdToDelete - 1}`)
                btnRemoveItem.style.display = 'inline'
                btnAddNewRow.removeAttribute('disabled')
            }
        }
    }

    function tippyLabel(i, tippyFormula) {
        let tippyContent = `<strong>Límite máximo de OT (10)</strong><br>
                            Puedes agregar ${tippyFormula} OT's mas`
        
        tippy(btnAddNewRow, {
            content: tippyContent,
            allowHTML: true,
            maxWidth: 350,
            inlinePositioning: true,
            arrow: true,
            animation: 'shift-away',
            theme: 'material',
            interactive: false,
            hideOnClick: true
        })
    }


    if (i > 1 && i <= 9) {
        let tippyFormula = (10-i)+1
        tippyLabel(i, tippyFormula)

    } else if (i == 1) {
        let tippyFormula = 10-i
        tippyLabel(i, tippyFormula)
    }
}

const formulario = document.getElementById("formNewOt")
const radios = document.querySelectorAll('[name="ociNumber"]')
const tituloForm = document.getElementById('tituloForm')
const projectNameHidden = document.getElementById('projectNameHidden').value
const projectNumberId = document.getElementById(`projectIdHidden`).value
const ociNumberK = document.getElementById('ociNumberK')
const ociNumberHidden = document.getElementById('ociNumberHidden')
const clientId = document.getElementById('clientIdHidden')

// ------------- function bucle do/while para encontrar ultima OT ----------
function lastOtNumberFn(i) {
    let n = varLimMaxOciProyecto
    let k = i || varLimMaxOciProyecto

    do {
        var lastOtNumber = document.getElementById(`lastOtNumber${k}_${n}`)
        var lastOpNumber = document.getElementById(`lastOpNumber${k}_${n}`)

        if (lastOtNumber && lastOpNumber) {
            var otNumberValue = document.getElementById('otNumber')
            var opNumberValue = document.getElementById('opNumber')

            let lastOtNumberValue = parseInt(document.getElementById(`lastOtNumber${k}_${n}`).innerHTML)
            let lastOpNumberValue = parseInt(document.getElementById(`lastOpNumber${k}_${n}`).innerHTML)

            otNumberValue.value = lastOtNumberValue + 1
            opNumberValue.value = lastOpNumberValue + 10
            break;
        }

        // Restar 1 a 'n' y ajustar 'k' si es necesario
        if (n > 0) {
            n--
        } else if (k > 0) {
            k--
            n = 24
        } else {
            break;
        }
    } while (true)
}

//-------------------- Boton agregar nuevas OT's a OCI ------------------------
function radioSelected(radioSelectedValue, elementoId) {
    const radioSelected = document.getElementById(`radioSelectedValue${elementoId}`)
    //console.log('radioSelected.value2: ', radioSelected.getAttribute('value2'))
    radioSelected.checked = true
    tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${radioSelected.value}</strong> - Alias: "${radioSelected.getAttribute('value2')}" <br> Proyecto: "${projectNameHidden}"`
    ociNumberK.value = extractNumbers(elementoId)
    //console.log('ociNumberK', ociNumberK.value)
    ociNumberHidden.value = radioSelected.value
    //console.log('ociNumberHidden.value', ociNumberHidden.value)
    lastOtNumberFn(extractNumbers(elementoId))
    formulario.scrollTo({ behavior: 'smooth', block: 'start', left:0, top:0 }) //.scrollIntoView({ behavior: 'smooth', block: 'start' })

    return (ociNumberHidden.value)
}

let arrayBtnAddOtFormSelected = []
for (let i=0; i<radios.length; i++) {
    let btnAddOtFormSelected = document.getElementById(`btnAddOtFormSelected${i}`)
    btnAddOtFormSelected ? arrayBtnAddOtFormSelected.push(btnAddOtFormSelected) : null
}

arrayBtnAddOtFormSelected.forEach(function(elemento) {
    if (elemento) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const radioSelectedValue = elemento.id
            ociNumberHidden.value = radioSelected(radioSelectedValue, elemento.value)
            lastOtNumberFn(elemento.id)
            formulario.scrollIntoView({ behavior: 'smooth', top:0 }) //scrollTo({ behavior: 'smooth', block: 'start' })
        })
    }
})

for (let i=0; i<radios.length; i++) {
    radios[i].addEventListener("change", (event) => {
        event.preventDefault()
        let ociSeleccionada = event.target.value
        let ociAliasSeleccionada = event.target.getAttribute('value2')
        //console.log('ociAliasSeleccionada:', ociAliasSeleccionada.getAttribute('value2'))
        tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${ociSeleccionada}</strong> - Alias: "${ociAliasSeleccionada}" <br> Proyecto: ${projectNameHidden}`
        ociNumberK.value = i
        ociNumberHidden.value = ociSeleccionada
        lastOtNumberFn(i)
    })
}

//------- Change ítem OT status ----------------
function messageChangeOtDetalleStatus(
    statusOtDetalle, 
    otNumber, 
    idProjectSelected, 
    ociKNumber, 
    otKNumber,
    // otDescription,
    // idDetalle,
    otDetalleKNumber,
    otDetalle,
    otDetalleDescripcion
) {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

        Swal.fire({
            title: `Cambio status de ítem OT#${otNumber}.${otDetalle.trim()}-${otDetalleDescripcion.trim()}`,
            position: 'center',
            html: `El status del ítem OT#<strong>${otNumber}.${otDetalle.trim()}</strong> se modificará a
                    <span class="badge rounded-pill bg-${ statusOtDetalle==='Activo' ? 'danger' : 'primary' } text-white">
                    ${ statusOtDetalle==='Activo' ? 'Inactivo' : 'Activo' }
                    </span> y ${ statusOtDetalle==='Activo' ? 'no' : '' } podrá ingresar o modificar datos en este Item.<br>
                    ¿Desea continuar?
                    <form id="formChangeStatusOtDetalle${idProjectSelected}" action="/api/proyectos/updateStatusOtDetalle/${idProjectSelected}" method="post" style="display: none;">
                        <fieldset>
                            <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                            <input type="hidden" name="otKNumberHidden" value="${otKNumber}">
                            <input type="hidden" name="otDetalleKNumberHidden" value="${otDetalleKNumber}">
                            <input type="hidden" name="statusOtDetalleHidden" value="${statusOtDetalle}">
                        </fieldset>
                    </form>
                    `,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'

        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formChangeStatusOtDetalle${idProjectSelected}`).submit()
                setTimeout(() => {
                    Toast.fire({
                        icon: 'success',
                        title: `El status del ítem OT#<strong>${otNumber}.${otDetalle.trim()}</strong>, se modificó con éxito!`
                    })
                }, 2000)

            } else {
                Swal.fire(
                    `Status del ítem OT#<strong>${otNumber}.${otDetalle.trim()}</strong> no modificado!`,
                    `El status del ítem OT#${otNumber}.${otDetalle.trim()}, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
}

//---- Update Detalle OT Data ----------------
function messageUpdateOtDetalle(
    statusOtDetalle,
    otNumber,
    idProjectSelected,
    ociKNumber,
    otKNumber,
    otDescription,
    idDetalle,
    otDetalleKNumber,
    opNumber,
    otDetalle,
    otDescripcionDetalle
    ) {
    
    let numberKOci = parseInt(ociKNumber)
    let numberKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let numberKDetail = parseInt(otDetalleKNumber)
    let numberOp = parseInt(opNumber)
    let checked = 'checked'
    statusOtDetalle=='Activo' ? checked : checked = ''

    let bgColorStatus
    statusOtDetalle=='Activo' ? bgColorStatus='background-color: #55dd5560;' : bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let html = `<form id="formUpdateOtDetail${idProjectSelected}" action="/api/proyectos/updateOtDetail/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-3">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="number" name="numberOt" class="form-control"
                                    placeholder="Número OT" value="${numberOt}" disabled>
                            </div>
                            
                            <div class="col-5" style="${bgColorStatus}">
                                <label for="statusOt" class="form-label d-flex justify-content-start ms-1">Status Item</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactivo</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOtDetalleForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOtDetalleForm" style="cursor: pointer;" disabled ${checked}>
                                        <label class="form-check-label" for="statusOtDetalle">Activo</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-7">
                                <label for="descriptionOt" class="form-label d-flex justify-content-start ms-1">Descripción OT</label>
                                <input type="text" name="descriptionOt" class="form-control"
                                    placeholder="Descripción OT" value="${otDescription}" disabled>
                            </div>
                            <div class="col-4">
                                <label for="numeroOp" class="form-label d-flex justify-content-start ms-1">Número OP</label>
                                <input type="number" name="numeroOp" class="form-control"
                                    placeholder="Numero Op" value="${numberOp}" disabled>
                            </div>
                        </div>
                        <hr>
                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="detalleOt" class="form-label d-flex justify-content-start align-items-center ms-1 mb-2">
                                    Ítem Numero
                                </label>
                                <input type="text" id="detalleOt" name="detalleOt" class="form-control"
                                    placeholder="Ítem numero" value="${otDetalle.trim()}" required>
                            </div>
                            <div class="col-7">
                                <label for="otDescripcionDetalle" class="form-label d-flex justify-content-start align-items-center ms-1 mb-2">
                                    Descripción ítem
                                </label>
                                <input type="text" id="otDescripcionDetalle" name="otDescripcionDetalle" class="form-control"
                                    placeholder="Descripcion ítem" value="${otDescripcionDetalle}" required>
                            </div>                   
                        </div> 
                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                            <input type="hidden" name="otDetailKNumberHidden" id="otDetailKNumberHidden${numberKDetail}" value="${numberKDetail}">
                            <input type="hidden" name="otDetailIdHidden" id="otDetailIdHidden${idDetalle}" value="${idDetalle}">
                            <input type="hidden" name="_csrf" value="<%= csrfToken %>">
                    </fieldset>
                </form>`

    const htmlTitle = `Actualizar ítem #${otDetalle.trim()} - ${otDescripcionDetalle}
                        de OT${numberOt} - ${otDescription}`

    if(idProjectSelected && numberOt) {
        Swal.fire({
            title: htmlTitle,
            position: 'center',
            html: html,
            width: 750,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateOtDetail${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El ítem #<b>${otDetalle.trim()}</b>, se modificó con éxito!`
                })

            } else {
                Swal.fire(
                    'Ítem no modificado!',
                    `El ítem #<b>${otDetalle.trim()}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
        disabledBtnAceptar()

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El ítem #<b>${otDetalle.trim()}</b> no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    var inputsDeTexto = document.querySelectorAll('input[type="text"]')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('input', function(event) { //keydown
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /[#"$%?¡¿^/()=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.add("border")
                input.classList.add("border-danger")
                input.classList.add("border-2")
            } else {
                input.classList.remove("border")
                input.classList.remove("border-danger")
                input.classList.remove("border-2")
            }
        })
    })
}

//TODO://---- Add Details to OT ----------------
function messageAddDetalleOt(
    idProjectSelected,
    ociKNumber,
    otNumber,
    otKNumber,
    opNumber,
    statusOt,
    otDescription,
    otDesign,
    otSimulation,
    detalleIdSelected
) {
    
    let numberKOci = parseInt(ociKNumber)
    let numberKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let numberOp = parseInt(opNumber)
    let checked = 'checked'
    statusOt=='Activo' ? checked : checked = ''

    let bgColorStatus
    statusOt=='Activo' ? bgColorStatus='background-color: #55dd5560;'
                        : 
                        bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let html = `<form id="formUpdateOt${idProjectSelected}" action="/api/proyectos/updateOt/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="number" name="numberOt" class="form-control"
                                    placeholder="Número OT" value="${numberOt}" required>
                            </div>
                            
                            <div class="col-5" style="${bgColorStatus}">
                                <label for="statusOt" class="form-label d-flex justify-content-start ms-1">Status OT</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactiva</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOtForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOtForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusOt">Activa</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row mb-3 mx-1 px-1">
                            <div class="col-8">
                                <label for="descriptionOt" class="form-label d-flex justify-content-start ms-1">Descripción OT</label>
                                <input type="text" name="descriptionOt" class="form-control"
                                    placeholder="Descripción OT" value="${otDescription}" required>
                            </div>
                            <div class="col-4">
                                <label for="numeroOp" class="form-label d-flex justify-content-start ms-1">Número OP</label>
                                <input type="number" name="numeroOp" class="form-control"
                                    placeholder="Numero Op" value="${numberOp}" required>
                            </div>
                        </div>

                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="designOt" class="form-label d-flex justify-content-start align-items-center ms-1 mb-2">Diseño seguido por
                                    <button type="button" id="searchDesignUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="designOt" name="designOt" class="form-control"
                                    placeholder="Diseño seguido por" value="${otDesign}" required>
                            </div>
                            <div class="col-4">
                                <label for="simulationOt" class="form-label d-flex justify-content-start align-items-center ms-1 mb-2">Simulación seguida por
                                    <button type="button" id="searchSimulationUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="simulationOt" name="simulationOt" class="form-control"
                                    placeholder="Simulacion seguida por" value="${otSimulation}" required>
                            </div>                   
                        </div> 

                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                            <input type="hidden" name="detalleIdHidden" id="detalleIdHidden${numberKOt}" value="${detalleIdSelected}">
                    </fieldset>
                </form>`

    if (idProjectSelected && numberOt && detalleIdSelected) {
        Swal.fire({
            title: `Actualizar OT# ${numberOt} - ${otDescription}`,
            position: 'center',
            html: html,
            width: 950,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateOt${idProjectSelected}`).submit()
                setTimeout(() => {
                    Toast.fire({
                        icon: 'success',
                        title: `La OT# <b>${numberOt}</b>, se modificó con éxito!`
                    })
                }, 2000)

            } else {
                Swal.fire(
                    'OT no modificada!',
                    `La OT# <b>${numberOt}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
        disabledBtnAceptar()

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `La OT# ${numberOt} no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    var inputsDeTexto = document.querySelectorAll('input[type="text"]')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /[#"$%?¡¿^/()=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.add("border")
                input.classList.add("border-danger")
                input.classList.add("border-2")
            } else {
                input.classList.remove("border")
                input.classList.remove("border-danger")
                input.classList.remove("border-2")
            }
        })
    })

    // //******************** to be done ********************
    //-----Btns Buscar en BBDD el Usuario Seguidor de Diseño --------------
    const searchDesignUserModal = document.getElementById('searchDesignUserModal')
    searchDesignUserModal.addEventListener('click', (event) => {
    event.preventDefault()

    function cargarUsuarioDiseno() {
        fetch('../../../api/usuarios/searchUsers/simulacion')
            .then(response => response.json())
            .then(users => {
            const arrayUsuariosDiseno = []
            const arrayUsersAll = []

            for(let i=0; i<users.usersAll.length; i++) {

                if(users.usersAll[i].status && users.usersAll[i].permiso ==='diseno') {
                    arrayUsuariosDiseno.push(`
                                    <label>
                                        <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-info text-dark my-2">
                                            <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                            ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                        </span>
                                    </label>`)

                } else if (users.usersAll[i].status && users.usersAll[i].permiso !=='diseno') {
                    arrayUsersAll.push(`
                                <label>
                                    <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-light text-dark my-2">
                                        <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                        ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                    </span>
                                </label>`)
                }
            }
            
            const html = `
                    <hr>
                        <label>Usuarios Diseño</label>
                        <div name='container' class="container">
                            ${arrayUsuariosDiseno.join(' ')}
                        </div>
                    <hr>
                        <label>Usuarios</label>
                        <div name='container' class="container">
                            ${arrayUsersAll.join(' ')}
                        </div>
                    <hr>`

                    Swal.fire({
                        title: 'Usuarios',
                        html: html,
                        width: 450,
                        background: "#eee",
                        allowOutsideClick: false,
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm:false,
                        cancelButtonText: 'Volver <i class="fa-solid fa-back"></i>',
                        confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>'    
                    
                    }).then((secondResult) => {
                        const radiosToSelect = document.getElementsByName('radioUsuarios')

                        for(let i=0; i<radiosToSelect.length; i++) {
                            const radioSelected = document.getElementById(i)
                            
                            if (radioSelected.checked) {
                                var usuariosSeleccionado = radioSelected.value
                            }
                        }
                        
                        if (secondResult.isConfirmed) {
                            //const inputUserSelected = document.getElementById('designOt')
                            //inputUserSelected.value = usuariosSeleccionado
                            
                        } else if (secondResult.dismiss === Swal.DismissReason.cancel) {
                            event.preventDefault()
                            return messageUpdateOt()
                        }

                        else {
                            Swal.fire(
                                'Usuario no seleccionado!',
                                `No ha seleccionado ningún usuario!`,
                                'warning'
                            )
                            return false
                        }
                    })
        })
        .catch(error => {
        console.error('Error:', error)
        })
        }
        cargarUsuarioDiseno()
    })

    //-----Btns Buscar en BBDD el Usuario Seguidor de Simulacion --------------
    const searchSimulationUserModal = document.getElementById('searchSimulationUserModal')
    searchSimulationUserModal.addEventListener('click', (event) => {
    event.preventDefault()

    function cargarUsuarioSimulacion() {
        fetch('../../../api/usuarios/searchUsers/all')
            .then(response => response.json())
            .then(users => {
            const arrayUsuariosSimulacion = []
            const arrayUsersAll = []

            for(let i=0; i<users.usersAll.length; i++) {

                if(users.usersAll[i].status && users.usersAll[i].permiso ==='simulacion') {
                    arrayUsuariosSimulacion.push(`
                                    <label>
                                        <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-warning text-dark my-2">
                                            <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                            ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                        </span>
                                    </label>`)

                } else if (users.usersAll[i].status && users.usersAll[i].permiso !=='simulacion') {
                    arrayUsersAll.push(`
                                <label>
                                    <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-light text-dark my-2">
                                        <input class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}" id="${i}">
                                        ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                    </span>
                                </label>`)
                }
            }
            
            const html = `
                    <hr>
                        <label>Usuarios Simulación</label>
                        <div name='container' class="container">
                            ${arrayUsuariosSimulacion.join(' ')}
                        </div>
                    <hr>
                        <label>Usuarios</label>
                        <div name='container' class="container">
                            ${arrayUsersAll.join(' ')}
                        </div>
                    <hr>`

                    Swal.fire({
                        title: 'Usuarios',
                        html: html,
                        width: 450,
                        background: "#eee",
                        allowOutsideClick: false,
                        showCloseButton: true,
                        confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>'    
                    }).then((result) => {
                        const radiosToSelect = document.getElementsByName('radioUsuarios')

                        for(let i=0; i<radiosToSelect.length; i++) {
                            const radioSelected = document.getElementById(i)
                            
                            if (radioSelected.checked) {
                                var usuariosSeleccionado = radioSelected.value
                            }
                        }
                        
                        if (result.isConfirmed) {
                            const inputUserSelected = document.getElementById('internoSimulacion')
                            inputUserSelected.value = usuariosSeleccionado
                        
                        } else {
                            Swal.fire(
                                'Usuario no seleccionado!',
                                `No ha seleccionado ningún usuario!`,
                                'warning'
                            )
                            return false
                        }
                    })
        })
        .catch(error => {
        console.error('Error:', error)
        })
        }
        cargarUsuarioSimulacion()
    })
    // ****************** End To be done *******************************
}

//TODO://---- Delete Detalle de OT ----------------
function messageDeleteOtDetalle(
    statusOtDetalle,
    otNumber,
    idProjectSelected,
    ociKNumber,
    otKNumber,
    otDetalleKNumber,
    // otDescription,
    idDetalleSelected,
    otDetalle,
    otDetalleDescripcion,
    ) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `
        <div class="container m-auto">
            El ítem #<strong>${otNumber}.${otDetalle.trim()}</strong>, Descripcion: "${otDetalleDescripcion.trim()}",
            Status: <span class="badge rounded-pill bg-${ statusOtDetalle==='Activo' ? 'primary' : 'danger' } text-white">
                        ${ statusOtDetalle==='Activo' ? 'Activo' : 'Inactivo' }
                    </span>
            y su toda su información interna se eliminará completamente.
            <br>
            <hr>
            ¿Está seguro que desea continuar?
            <form id="formDeleteOtDetalle${idProjectSelected}" action="/api/proyectos/deleteOtDetalle/${idProjectSelected}" method="post">
                <fieldset>
                    <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                    <input type="hidden" name="otKNumberHidden" value="${otKNumber}">
                    <input type="hidden" name="otDetalleKNumber" value="${otDetalleKNumber}">
                    <input type="hidden" name="detalleIdNumber" value="${idDetalleSelected}">
                </fieldset>
            </form>
        </div>    
                    `
    
    if(idProjectSelected && otNumber) {
        Swal.fire({
            title: `Eliminar ítem #${otNumber}.${otDetalle.trim()} - ${otDetalleDescripcion.trim()}`,
            position: 'center',
            html: htmlForm,
            icon: 'question',
            width: 650,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            focusConfirm: false,
            confirmButtonText: 'Eliminar <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formDeleteOt${idProjectSelected}`).submit()
                setTimeout(() => {
                    Toast.fire({
                        icon: 'success',
                        title: `El ítem #<strong>${otNumber}.${otDetalle.trim()}</strong>, se eliminó correctamente!`
                    })
                }, 2000)
            } else {
                Swal.fire(
                    `Ítem #${otNumber}.${otDetalle.trim()}`,
                    `El ítem #<b>${otNumber}.${otDetalle.trim()}</b>, no se eliminó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El ítem #<strong>${otNumber}.${otDetalle.trim()}</strong>, no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

//TODO: function
//---- Update Masive OT Data ----------------
function messageUpdateMasiveOt(arrayRowsSelected) {
    
    let numberKOci = parseInt(ociKNumber)
    let numnerKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let checked = 'checked'
    statusOt=='Activo' ? checked : checked = ''

    let bgColorStatus
    statusOt=='Activo' ? bgColorStatus='background-color: #55dd5560;' : bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let html = `<form id="formUpdateMasiveOt${idProjectSelected}" action="/api/proyectos/updateMasiveOt/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="number" name="numberOt" class="form-control"
                                    placeholder="Número OT" value="${numberOt}" required>
                            </div>
                            
                            <div class="col-5" style="${bgColorStatus}">
                                <label for="statusOt" class="form-label d-flex justify-content-start ms-1">Status OT</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactiva</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOtForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOtForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusOt">Activa</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row mb-3 mx-1 px-1">
                            <div class="col">
                                <label for="descriptionOt" class="form-label d-flex justify-content-start ms-1">Descripción OT</label>
                                <input type="text" name="descriptionOt" class="form-control"
                                    placeholder="Descripción OT" value="${otDescription}" required>
                            </div>                            
                        </div>

                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="designOt" class="form-label d-flex justify-content-start ms-1">Diseño seguido por
                                    <button type="button" title="Buscar Diseñador" id="searchDesignUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="designOt" name="designOt" class="form-control"
                                    placeholder="Diseño seguido por" value="${otDesign}" required>
                            </div>
                            <div class="col-4">
                                <label for="simulationOt" class="form-label d-flex justify-content-start ms-1">Simulación seguida por
                                    <button type="button" title="Buscar Simulador" id="searchSimulationUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="simulationOt" name="simulationOt" class="form-control"
                                    placeholder="Simulacion seguida por" value="${otSimulation}" required>
                            </div>
                            <div class="col-4">
                                <label for="supplierOt" class="form-label d-flex justify-content-start ms-1">Proveedor externo</label>
                                <input type="text" id="supplierOt" name="supplierOt" class="form-control"
                                    placeholder="Descripción OT" value="${otSupplier}" required>
                            </div>                      
                        </div> 

                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numnerKOt}" value="${numnerKOt}">
                    </fieldset>
                </form>`

    if(idProjectSelected && numberOt) {
        Swal.fire({
            title: `Actualizar OT# ${numberOt}`,
            position: 'center',
            html: html,
            width: 950,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateOt${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OT# <b>${numberOt}</b>, se modificó con éxito!`
                })

            } else {
                Swal.fire(
                    'OT no modificada!',
                    `La OT# <b>${numberOt}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `La OT# ${numberOt} no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

let checkSelect = document.querySelectorAll('input[name="checkSelect"]')
let maxOtQuantity
checkSelect ? maxOtQuantity = parseInt(checkSelect.length) : maxOtQuantity=0
let ociTotalQty = parseInt(document.getElementById('ociTotalQty').innerText)

let arrayBtnChangeStatusOtDetalle = [],
    arrayBtnUpdateOtDetalle = [],
    arrayBtnDeleteOtDetalle = [],
    arrayCheckBoxSelect = [],
    arrayBtnCheckSelectionAll = [],
    arrayBtnCheckSelecMasive = [],
    arrayBtnAddDetallesOt = []

    for (let m=0; m<ociTotalQty; m++) {
        let btnCheckSelectionAll = document.getElementById(`btnCheckSelectionAll${m}`)
        btnCheckSelectionAll ? arrayBtnCheckSelectionAll.push(btnCheckSelectionAll) : null

        let btnCheckSelecMasive = document.getElementById(`btnCheckSelecMasive${m}`)
        if (btnCheckSelecMasive) {
            btnCheckSelecMasive.setAttribute('disabled', true)
            arrayBtnCheckSelecMasive.push(btnCheckSelecMasive)
        }

        for (let n=0; n<maxOtQuantity; n++) {
            for (let o=0; o<varLimMaxDetallesOT; o++) {
                let btnChangeStatusOtDetalle = document.getElementById(`btnStatusOtDetalle${m}_${n}_${o}`)
                btnChangeStatusOtDetalle ? arrayBtnChangeStatusOtDetalle.push(btnChangeStatusOtDetalle) : null

                let btnDeleteOtDetalle = document.getElementById(`btnDeleteOtDetalle${m}_${n}_${o}`)
                btnDeleteOtDetalle ? arrayBtnDeleteOtDetalle.push(btnDeleteOtDetalle) : null

                let checkBoxSelect = document.getElementById(`checkSelect${m}_${n}_${o}`)
                checkBoxSelect ? arrayCheckBoxSelect.push(checkBoxSelect) : null

                let btnUpdateOtDetalle = document.getElementById(`btnEditOtDetalle${m}_${n}_${o}`)
                btnUpdateOtDetalle ? arrayBtnUpdateOtDetalle.push(btnUpdateOtDetalle) : null

                let btnAddDetallesOt = document.getElementById(`btnAddDetallesFormSelected${m}_${n}_${o}`)
                btnAddDetallesOt ? arrayBtnAddDetallesOt.push(btnAddDetallesOt) : null
            }
        }
    }
    
function cleanString(cadena) {
    // Eliminar espacios en blanco al principio y al final
    let cadenaSinEspaciosInit = cadena.trim()
    // Eliminar etiquetas HTML
    let cadenaSinEtiquetas = cadenaSinEspaciosInit.replace(/<[^>]*>/g, '')
    // Eliminar espacios en blanco al principio y al final
    let cadenaSinEspaciosEnd = cadenaSinEtiquetas.trim()
    return cadenaSinEspaciosEnd
}

//TODO: 
function updateBtnCheckSelecMasive(idOci) {     
    let btnMasive = document.getElementById(`btnCheckSelecMasive${idOci}`)
    let btnSelectAll = document.getElementById(`btnCheckSelectionAll${idOci}`)
    const cantidadSeleccionados = parseInt(document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:checked`).length)
    const cantidadTotalXTabla = parseInt(document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:not(:disabled)`).length)
    
    if (cantidadSeleccionados > 0) {
        if (cantidadSeleccionados === cantidadTotalXTabla) {
            btnSelectAll.innerHTML = 'Des-Seleccionar todos <i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            btnSelectAll.title = 'Des-Seleccionar todas las OT'
            btnSelectAll.classList.remove("btn-primary")
            btnSelectAll.classList.add("btn-danger")
        } else {
            btnSelectAll.innerHTML = 'Seleccionar todos <i class="fa-solid fa-check-double" aria-hidden="true"></i>'
            btnSelectAll.title = 'Seleccionar todas las OT'
            btnSelectAll.classList.add("btn-primary")
            btnSelectAll.classList.remove("btn-danger")
        }

        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (${cantidadSeleccionados}/${cantidadTotalXTabla})`
        btnMasive.disabled = false
    
    } else {
        btnSelectAll.innerHTML = 'Seleccionar todos <i class="fa-solid fa-check-double" aria-hidden="true"></i>'
        btnSelectAll.title = 'Seleccionar todas las OT'
        btnSelectAll.classList.add("btn-primary")
        btnSelectAll.classList.remove("btn-danger")

        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (0)`
        btnMasive.disabled = true
    }
}  

arrayBtnCheckSelecMasive.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const idOci = elemento.id.slice(19)
            var arrayRowsSelected = []
            for (let z=0; varLimMaxOtProyecto > z; z++) {
                let selected = document.getElementById(`checkSelect${idOci}_${z}`)
    
                if (selected && selected.checked) {
                    const statusOt = cleanString(document.getElementById(`lastOtStatus${idOci}_${z}`).textContent)
                    const otNumber = parseInt(document.getElementById(`lastOtNumber${idOci}_${z}`).textContent)
                    const otDescription = document.getElementById(`lastOpDescription${idOci}_${z}`).textContent
                    const otDesign =  document.getElementById(`otDesign${idOci}_${z}`).textContent
                    const otSimulation =  document.getElementById(`otSimulation${idOci}_${z}`).textContent
                    const idProjectSelected = document.getElementById('projectIdHidden').value
                    
                    arrayRowsSelected.push({
                        selected, 
                        statusOt, 
                        otNumber, 
                        otDescription, 
                        otDesign, 
                        otSimulation,
                        idProjectSelected
                    })
                }
            }
                    
            messageUpdateMasiveOt(arrayRowsSelected)
            
        })
    }
})

arrayBtnAddDetallesOt.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnAddDetallesFormSelected/;

            // Eliminar el texto inicial de la cadena
            var idOtOciDet = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOtOciDet.split('_')

            const idProjectSelected = document.getElementById('projectIdHidden').value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOciDet}`).textContent)
            const otKNumber = parseInt(arrayOciOtSelected[1])       
            const opNumber = parseInt(document.getElementById(`lastOpNumber${idOtOciDet}`).textContent)
            const statusOt = document.getElementById(`lastOtStatus${idOtOciDet}`).textContent
            const otDescription = document.getElementById(`lastOpDescription${idOtOciDet}`).textContent
            const otDetail =  document.getElementById(`otDesign${idOtOciDet}`).textContent
            const detailDescription =  document.getElementById(`otSimulation${idOtOciDet}`).textContent
            const detailIdSelected = document.getElementById(`detalleIdHidden${idOtOciDet}`).textContent
            
            messageAddDetalleOt(
                idProjectSelected,
                ociKNumber,
                otNumber,
                otKNumber,
                opNumber,
                cleanString(statusOt),
                cleanString(otDescription),
                cleanString(otDetail),
                cleanString(detailDescription),
                detailIdSelected
            )
        })
    }
})

arrayBtnChangeStatusOtDetalle.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnStatusOtDetalle/;

            // Eliminar el texto inicial de la cadena
            let idOtOciDet = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOtOciDet.split('_')

            const statusOtDetalle = document.getElementById(`lastOtDetalleStatus${idOtOciDet}`).textContent
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOciDet}`).textContent)
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const idDetalleSelected = document.getElementById(`detalleIdHidden${idOtOciDet}`).value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otKNumber = parseInt(arrayOciOtSelected[1])
            const otDetalleKNumber = parseInt(arrayOciOtSelected[2])
            const otDetalle =  document.getElementById(`numeroDetalle${idOtOciDet}`).textContent
            const otDetalleDescripcion =  document.getElementById(`descripcionDetalle${idOtOciDet}`).textContent
            
            messageChangeOtDetalleStatus(
                cleanString(statusOtDetalle),
                otNumber,
                idProjectSelected,
                ociKNumber,
                otKNumber,
                idDetalleSelected,
                otDetalleKNumber,
                cleanString(otDetalle),
                cleanString(otDetalleDescripcion)
            )
        })
    }
})

arrayBtnUpdateOtDetalle.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnEditOtDetalle/;

            // Eliminar el texto inicial de la cadena
            var idOtOciDet = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOtOciDet.split('_')

            const idProjectSelected = document.getElementById('projectIdHidden').value
            const idDetalleSelected = document.getElementById(`detalleIdHidden${idOtOciDet}`).value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOciDet}`).textContent)
            const otKNumber = parseInt(arrayOciOtSelected[1])
            const otDetalleKNumber = parseInt(arrayOciOtSelected[2])
            const opNumber = parseInt(document.getElementById(`lastOpNumber${idOtOciDet}`).textContent)
            const statusOtDetalle = document.getElementById(`lastOtDetalleStatus${idOtOciDet}`).textContent
            const otDescription = document.getElementById(`lastOpDescription${idOtOciDet}`).textContent
            const otDetalle =  document.getElementById(`numeroDetalle${idOtOciDet}`).textContent
            const otDetalleDescripcion =  document.getElementById(`descripcionDetalle${idOtOciDet}`).textContent
            
            messageUpdateOtDetalle(
                cleanString(statusOtDetalle),
                otNumber,
                idProjectSelected,
                ociKNumber,
                otKNumber,
                cleanString(otDescription),
                idDetalleSelected,
                otDetalleKNumber,
                opNumber,
                cleanString(otDetalle),
                cleanString(otDetalleDescripcion),
            )
        })
    }
})

arrayBtnDeleteOtDetalle.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnDeleteOtDetalle/;

            // Eliminar el texto inicial de la cadena
            var idOtOciDet = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOtOciDet.split('_')
            
            const statusOtDetalle = document.getElementById(`lastOtDetalleStatus${idOtOciDet}`).textContent
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOciDet}`).textContent)
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const idDetalleSelected = document.getElementById(`detalleIdHidden${idOtOciDet}`).value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otKNumber = parseInt(arrayOciOtSelected[1])   
            const otDetalleKNumber = parseInt(arrayOciOtSelected[2])    
            const otDescription = document.getElementById(`lastOpDescription${idOtOciDet}`).textContent
            const otDetalle =  document.getElementById(`numeroDetalle${idOtOciDet}`).textContent
            const otDetalleDescripcion =  document.getElementById(`descripcionDetalle${idOtOciDet}`).textContent

            messageDeleteOtDetalle(
                cleanString(statusOtDetalle),
                otNumber,
                idProjectSelected,
                ociKNumber,
                otKNumber,
                otDetalleKNumber,
                cleanString(otDescription),
                idDetalleSelected,
                cleanString(otDetalle),
                cleanString(otDetalleDescripcion),
            )
        })
    }
})

arrayCheckBoxSelect.forEach(function(element) {
    element.checked = ''
    element.addEventListener('change', (event) => {
        event.preventDefault()
        const idOtOciDet = (event.target.id).slice(11)
        if (document.getElementsByName(`rowSelected${idOtOciDet}`)) {
            var rowSelectCheck = Array.from(document.getElementsByName(`rowSelected${idOtOciDet}`))
        }

        let idOci = extractNumbers(element.id)[0]
        // let idOt = extractNumbers(element.id)[1]
        // let idDet = extractNumbers(element.id)[2]
        
        updateBtnCheckSelecMasive(idOci)

        for (let q=0; q<rowSelectCheck.length; q++) { //12
            if (rowSelectCheck[q] && rowSelectCheck[q].style.cssText == "height: 7vh;") {
                rowSelectCheck[q].setAttribute('style', "height: 7vh; background-color: #c4f0fd;")
            } else {
                rowSelectCheck[q].setAttribute('style', "height: 7vh;")
            }
        }
    })
})

let seleccionados = false
let seleccionarFilas = false
arrayBtnCheckSelectionAll.forEach(function(element) {
    if (element) {
        element.addEventListener('click', (event) => {
            event.preventDefault()
            const idOci = parseInt((element.id).slice(20))
            let checkboxes = Array.from(document.querySelectorAll(`#tablaGeneral${idOci} tbody input[type="checkbox"]`))
            
            var arrQueryRows=[]
            for(let q=0; q<varLimMaxOtProyecto; q++) {
                let rowsSelectCheck = document.getElementsByName(`rowSelected${idOci}_${q}`)
                rowsSelectCheck.length > 0 ? arrQueryRows.push(rowsSelectCheck) : null
            }

            // funcion selecciona todas las filas
            function seleccionarTodasFilas() {
                arrQueryRows.forEach(nodeList => {
                    Array.from(nodeList).forEach(element => {
                        !seleccionarFilas ? element.style = "height: 7vh; background-color: rgb(196, 240, 253);" : element.style = "height: 7vh;"                    
                    })
                })
                seleccionarFilas = !seleccionarFilas
            }
            seleccionarTodasFilas()
            
            // funcion selecciona todos los checkbox
            function seleccionarTodos() {
                checkboxes.forEach(function(checkbox) {
                    if (!checkbox.disabled) {
                        !seleccionados ? checkbox.checked = true : checkbox.checked = false
                    }
                })
                seleccionados = !seleccionados
            }
            seleccionarTodos()

            element.classList[1] == 'btn-primary' ? 
                (element.classList.remove("btn-primary"),
                element.classList.add("btn-danger"))
                :
                (element.classList.remove("btn-danger"),
                element.classList.add("btn-primary"))

            element.title == 'Seleccionar todas las OT' ?
                element.title = 'Des-Seleccionar todas las OT'
                :
                element.title = 'Seleccionar todas las OT'

            element.innerHTML == 'Des-Seleccionar todos <i class="fa-solid fa-xmark" aria-hidden="true"></i>' ?
                element.innerHTML = 'Seleccionar todos <i class="fa-solid fa-check-double" aria-hidden="true"></i>' 
                :
                element.innerHTML = 'Des-Seleccionar todos <i class="fa-solid fa-xmark" aria-hidden="true"></i>'

            updateBtnCheckSelecMasive(idOci)
        })
    }    
})

//-----Btns Buscar en BBDD el Usuario Seguidor de Diseño/Simulación --------------
const searchDesignUser = document.getElementById('searchDesignUser')
const searchSimulationUser = document.getElementById('searchSimulationUser')
const userNameBanner = document.getElementById('userNameBanner').innerText

function messageAlertUser(titulo, message, icon){
    Swal.fire(
        titulo, 
        message, 
        icon);
    return false
}

async function cargarUsuario(idPermiso) {
    const permisos = {
        'searchDesignUser': {
            permisoUsuario: 'diseno',
            tituloSeguimiento: 'Seguimiento Diseño',
            inputTarget: 'internoDiseno'
        },
        'searchDesignUserModal': {
            permisoUsuario: 'diseno',
            tituloSeguimiento: 'Seguimiento Diseño',
            inputTarget: 'internoDiseno'
        },
        'searchSimulationUser': {
            permisoUsuario: 'simulacion',
            tituloSeguimiento: 'Seguimiento Simulación',
            inputTarget: 'internoSimulacion'
        }
    };
    
    const { permisoUsuario, tituloSeguimiento, inputTarget } = permisos[idPermiso] || {};

    if (!permisoUsuario || !tituloSeguimiento || !inputTarget) {
        throw new Error(`Permiso no encontrado para id:', ${idPermiso}`)
    }

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const url = `../../../api/usuarios/searchUsers/${userNameBanner}`
        const response = await fetch(url, {
            method: "GET",
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        });
        
        if(!response.ok ){
            throw new Error(`Error en la solicitud`);
        }

        const users = await response.json();
        const arrayUsuariosEspecificos = [];
        const arrayUsersAll = [];

        if (users && users.length > 0) {
            users.forEach((user, i) => {
                const userHTML = `
                    <label>
                        <span id="${user._id}" class="badge rounded-pill ${user.permiso === `${permisoUsuario}` ? 'bg-info' : 'bg-light'} text-dark my-2">
                            <input id="${i}" class="form-check-input mb-1" type="radio"
                                name="radioUsuarios" value="${user.name}, ${user.lastName}">
                            ${user.name} ${user.lastName}
                        </span>
                    </label>`;

                if (user.status) {
                    user.permiso === `${permisoUsuario}` ? arrayUsuariosEspecificos.push(userHTML) : arrayUsersAll.push(userHTML);
                }    
            });

            const html = `
                <hr>
                <label>${tituloSeguimiento}</label>
                <div name='container' class="container">
                    ${arrayUsuariosEspecificos.join(' ')}
                </div>
                <hr>
                <label>Usuarios</label>
                <div name='container' class="container">
                    ${arrayUsersAll.join(' ')}
                </div>
                <hr>`;

            Swal.fire({
                title: tituloSeguimiento,
                html: html,
                width: 450,
                background: "#eee",
                allowOutsideClick: false,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>',
                didOpen: () => {
                    const btnAceptar = document.querySelector('.swal2-confirm');
                    btnAceptar.setAttribute('id', 'btnAceptarModal');
                    btnAceptar.style.cursor = "not-allowed";
                    btnAceptar.disabled = true;

                    const radios = document.getElementsByName('radioUsuarios');
                    radios.forEach((radio) => {
                        radio.addEventListener('change', () => {
                            btnAceptar.style.cursor = "pointer";
                            btnAceptar.disabled = false;
                        });
                    });
                }
            }).then((result) => {
                const radioSelected = document.querySelector('input[name="radioUsuarios"]:checked');
                if (result.isConfirmed && radioSelected) {
                    const inputUserSelected = document.getElementById(`${inputTarget}`);
                    inputUserSelected.value = radioSelected.value;

                } else {
                    const titulo = 'Usuario no seleccionado'
                    const message = 'No ha seleccionado ningún usuario!'
                    const icon = 'warning'
                    messageAlertUser(titulo, message, icon)
                }
            });

        } else {
            throw new Error(`No hay usuarios que seleccionar`);
        }

    } catch (error) {
        const titulo = 'Error'
        const message = `${error}`
        const icon = 'error'
        messageAlertUser(titulo, message, icon)
    }
    disabledBtnAceptar()
}

searchDesignUser.addEventListener('click', async (event) => {
    let idPermiso = searchDesignUser.id
    event.preventDefault();
    try {
        await cargarUsuario(idPermiso);
    } catch (error) {
        const titulo = 'Error al cargar los usuarios'
        const message = error
        const icon = 'error'
        messageAlertUser(titulo, message, icon)
    }
});

searchSimulationUser.addEventListener('click', async (event) => {
    let idPermiso = searchSimulationUser.id
    event.preventDefault();
    try {
        await cargarUsuario(idPermiso);
    } catch (error) {
        const titulo = 'Error al cargar los usuarios'
        const message = error
        const icon = 'error'
        messageAlertUser(titulo, message, icon)
    }
});


function messageNewOt(ociNumber, otArray, ociAlias) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    if (otArray.length > 1) {
        Swal.fire({
            title: 'Ingreso de datos!',
            position: 'center',
            text: `Se agregarán las OT's ${otArray.join(" - ")}, a la OCI# ${ociNumber} - Alias: ${ociAlias}` ,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewOt').submit()
                Toast.fire({
                    icon: 'success',
                    title: `OT's ${otArray.join(" - ")}, agregadas con éxito!`
                })
            } else {
                Swal.fire(
                    'OTs no agregadas!',
                    `Las OT's ${otArray.join(" - ")}, no fueron agregadas a la OCI# ${ociNumber}`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Ingreso de datos!',
            position: 'center',
            text: `Se agregará la OT ${otArray}, a la OCI# ${ociNumber} - Alias: ${ociAlias}`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewOt').submit()
                Toast.fire({
                    icon: 'success',
                    title: `OT ${otArray.join(" - ")}, agregada con éxito!`
                })
            } else {
                Swal.fire(
                    'OT no agregada!',
                    `La OT ${otArray}, no fue agregada a la OCI# ${ociNumber} - Alias: ${ociAlias}`,
                    'warning'
                )
                return false
            }
        })
    }
}

const btnCreateNewOt = document.getElementById('btnNewOt')
btnCreateNewOt.addEventListener('click', (event) => {
    event.preventDefault()
    let ociNumberHiddenValue = parseInt(document.getElementById('ociNumberHidden').value)
    //console.log('ociNumberHiddenValue:', ociNumberHiddenValue)
    if (ociNumberHiddenValue) {
        const otQuantity = parseInt(document.getElementById('otQuantity').value)
        let otArray = [document.getElementById(`otNumber`).value]
        let ociAlias = document.getElementById('ociAliasHidden').value
        if (otQuantity > 1) {
            for (let j = 1; j < otQuantity; j++) {
                let otNumberSelected = document.getElementById(`otNumber${j}`).value
                otArray.push(otNumberSelected)
            }
        }
        messageNewOt(ociNumberHiddenValue, otArray, ociAlias)

    } else {
        //TODO: Hacer sweetAlert2
        console.log('Hubo un error al seleccionar la OCI!!')
    }
})

//---------- Obtiene la lista de OT e Items ------------
function getOtList(i) {
    const parentDiv = document.getElementById(`tablaGeneral${i}`)
    let tableBody = parentDiv.lastElementChild
    const lastChild = parseInt(tableBody.childElementCount)
    let k = i

    // Función auxiliar para obtener el texto de un elemento si existe
    function getElementText(id) {
        const element = document.getElementById(id);
        return element ? element.innerText : null;
    }

    // Arrays para almacenar los datos
    let arrayOtNumber = [], arrayOpNumber = [], arrayOtDetalleStatus = [], arrayOtDetalle = [], arrayDescripcionDetalle = [], arrayOnumber = [], arrayDetalleId = [];

    // Configuración de mapeo de IDs a arrays
    const mappings = [
        { prefix: 'lastOtNumber', array: arrayOtNumber },
        { prefix: 'lastOpNumber', array: arrayOpNumber },
        { prefix: 'lastOtDetalleStatus', array: arrayOtDetalleStatus },
        { prefix: 'numeroDetalle', array: arrayOtDetalle, isDetalle: true },
        { prefix: 'descripcionDetalle', array: arrayDescripcionDetalle },
        { prefix: 'detalleIdHidden', array: arrayDetalleId }
    ];

    for (let n = 0; n < lastChild; n++) {
        for (let o = 0; o < lastChild; o++) {
            mappings.forEach(mapping => {
                const id = `${mapping.prefix}${k}_${n}_${o}`;
                const text = getElementText(id);
                
                if (text !== null) {
                    mapping.array.push(text);

                    // Si es un detalle, agregar también a arrayOnumber
                    if (mapping.isDetalle) {
                        arrayOnumber.push(`${k}_${n}_${o}`);
                    }
                }
            });
        }
    }
    // console.log('arrayOtNumber:', arrayOtNumber, 'arrayOtDetalle:', arrayOtDetalle,
    //             'arrayDescripcionDetalle:', arrayDescripcionDetalle, 'arrayOnumber:', arrayOnumber, 'arrayDetalleId', arrayDetalleId)
    return {
        arrayOtNumber,
        arrayOpNumber,
        arrayOtDetalleStatus,
        arrayOtDetalle,
        arrayDescripcionDetalle,
        arrayOnumber,
        arrayDetalleId,
        lastChild
    }
}

//---------- Obtiene los valores de la lista de OT ------------
function getOtListValues(i, idTabla, qInicial, qFinal) {
    const parentDiv = document.getElementById(idTabla);
    const tableBody = parentDiv.lastElementChild;
    const lastChild = parseInt(tableBody.childElementCount);

    const qInicialX = parseInt(qInicial);
    const qFinalX = parseInt(qFinal);
    let k = i;
    
    const arrays = {
        arrayMecanizado2dCompleto: [], arrayRevisionMecanizado2dCompleto: [],
        arrayMecanizado3dPrefinal: [], arrayRevisionMecanizado3dPrefinal: [],
        arrayMecanizado3dFinal: [], arrayRevisionMecanizado3dFinal: [],
        arrayBancoArmado: [], arrayRevisionBancoArmado: [],
        arrayRt: [], arrayEstadoRt: [], arrayRevisionRt: [],
        arrayPreparacionGeo: [], arrayEstadoPreparacionGeo: [], arrayRevisionPreparacionGeo: [],
        arrayPrograma2d: [], arrayEstadoPrograma2d: [], arrayRevisionPrograma2d: [],
        arrayPrograma3d2F: [], arrayEstadoPrograma3d2F: [], arrayRevisionPrograma3d2F: [],
        arrayPrograma3d4F: [], arrayEstadoPrograma3d4F: [], arrayRevisionPrograma3d4F: [],
        arrayNotasProgramacion: [], arrayRevisionNotasProgramacion: [],
        arrayFCero: [], arrayRevisionFCero: [],
        arrayFUno: [], arrayRevisionFUno: [],
        arrayFDos: [], arrayRevisionFDos: [],
        arrayFTres: [], arrayRevisionFTres: [],
        arrayFCuatro: [], arrayRevisionFCuatro: [],
        arrayFCinco: [], arrayRevisionFCinco: [],
        arrayNotasMecanizado: [], arrayRevisionNotasMecanizado: [],
    };
    
    const mapping = {
        0: ['arrayMecanizado2dCompleto', 'arrayRevisionMecanizado2dCompleto'],
        1: ['arrayMecanizado3dPrefinal', 'arrayRevisionMecanizado3dPrefinal'],
        2: ['arrayMecanizado3dFinal' , 'arrayRevisionMecanizado3dFinal'],
        3: ['arrayBancoArmado', 'arrayRevisionBancoArmado'],
        4: ['arrayRt','arrayRevisionRt', 'arrayEstadoRt'],
        5: ['arrayPreparacionGeo','arrayRevisionPreparacionGeo', 'arrayEstadoPreparacionGeo'],
        6: ['arrayPrograma2d','arrayRevisionPrograma2d', 'arrayEstadoPrograma2d'],
        7: ['arrayPrograma3d2F','arrayRevisionPrograma3d2F', 'arrayEstadoPrograma3d2F'],
        8: ['arrayPrograma3d4F','arrayRevisionPrograma3d4F', 'arrayEstadoPrograma3d4F'],
        9: ['arrayNotasProgramacion', 'arrayRevisionNotasProgramacion'],
        10: ['arrayFCero', 'arrayRevisionFCero', 'arrayEstadoFCero'],
        11: ['arrayFUno', 'arrayRevisionFUno', 'arrayEstadoFUno'],
        12: ['arrayFDos', 'arrayRevisionFDos', 'arrayEstadoFDos'],
        13: ['arrayFTres', 'arrayRevisionFTres', 'arrayEstadoFTres'],
        14: ['arrayFCuatro', 'arrayRevisionFCuatro', 'arrayEstadoFCuatro'],
        15: ['arrayFCinco', 'arrayRevisionFCinco', 'arrayEstadoFCinco'],
        16: ['arrayNotasMecanizado', 'arrayRevisionNotasMecanizado']
    };

    for (let n = 0; n < lastChild; n++) {
        for (let q = qInicialX; q < qFinalX; q++) {
            for (let o = 0; o < lastChild; o++) {
                let estadoDetalleHidden
                let otHidden
                let otRevisionHidden

                if (document.getElementById(`resHidden${k}_${n}_${o}_${q}`) && !document.getElementById(`resEstadoHidden${k}_${n}_${o}_${q}`)) {
                    otHidden = document.getElementById(`resHidden${k}_${n}_${o}_${q}`).value;
                    otRevisionHidden = document.getElementById(`resRevisionHidden${k}_${n}_${o}_${q}`).value;
                    
                    var otRevision = otRevisionHidden.split(",").pop();
                    var otInfo = changeValueFromArray(otHidden.split(",")).pop();

                    const [infoKey, revisionKey] = mapping[q] || [];
                    if (infoKey && revisionKey) {
                        arrays[infoKey].push(otInfo);
                        arrays[revisionKey].push(otRevision);
                    }

                } else if (document.getElementById(`resDatoHidden${k}_${n}_${o}_${q}`) && document.getElementById(`resEstadoHidden${k}_${n}_${o}_${q}`)) {
                    otHidden = document.getElementById(`resDatoHidden${k}_${n}_${o}_${q}`).value;
                    document.getElementById(`resEstadoHidden${k}_${n}_${o}_${q}`) ? estadoDetalleHidden = document.getElementById(`resEstadoHidden${k}_${n}_${o}_${q}`).value : null
                    otRevisionHidden = document.getElementById(`resRevisionHidden${k}_${n}_${o}_${q}`).value;

                    var estadoInfo = changeValueEstadoFromArray(estadoDetalleHidden.split(",")).pop();
                    var otRevision = otRevisionHidden.split(",").pop();
                    var otInfo = changeValueFromArray(otHidden.split(",")).pop();
                    

                } else if (document.getElementById(`resDatoHidden${k}_${n}_${o}_${q}`) && !document.getElementById(`resEstadoHidden${k}_${n}_${o}_${q}`)) {
                    otHidden = document.getElementById(`resDatoHidden${k}_${n}_${o}_${q}`).value;
                    otRevisionHidden = document.getElementById(`resRevisionHidden${k}_${n}_${o}_${q}`).value;
                    
                    var otRevision = otRevisionHidden.split(",").pop();
                    var otInfo = changeValueFromArray(otHidden.split(",")).pop();
                }

                const [infoKey, revisionKey, estadoKey] = mapping[q] || [];
                if (infoKey && estadoKey && revisionKey) {
                    arrays[infoKey].push(otInfo);
                    arrays[estadoKey].push(estadoInfo)
                    arrays[revisionKey].push(otRevision);
                } else {
                    arrays[infoKey].push(otInfo);
                    arrays[revisionKey].push(otRevision);
                }
            }
        }
    }

    const resultMap = {
        4: ['arrayMecanizado2dCompleto', 'arrayRevisionMecanizado2dCompleto', 'arrayMecanizado3dPrefinal', 'arrayRevisionMecanizado3dPrefinal', 'arrayMecanizado3dFinal', 'arrayRevisionMecanizado3dFinal', 'arrayBancoArmado', 'arrayRevisionBancoArmado'],
        7: ['arrayRt', 'arrayRevisionRt', 'arrayEstadoRt', 'arrayPreparacionGeo', 'arrayRevisionPreparacionGeo', 'arrayEstadoPreparacionGeo', 'arrayPrograma2d', 'arrayRevisionPrograma2d', 'arrayEstadoPrograma2d'],
        10: ['arrayPrograma3d2F', 'arrayRevisionPrograma3d2F', 'arrayEstadoPrograma3d2F', 'arrayPrograma3d4F', 'arrayRevisionPrograma3d4F', 'arrayEstadoPrograma3d4F', 'arrayNotasProgramacion', 'arrayRevisionNotasProgramacion'],
        17: ['arrayFCero', 'arrayRevisionFCero', 'arrayFUno', 'arrayRevisionFUno', 'arrayFDos', 'arrayRevisionFDos', 'arrayFTres', 'arrayRevisionFTres', 'arrayFCuatro', 'arrayRevisionFCuatro', 'arrayFCinco', 'arrayRevisionFCinco', 'arrayNotasMecanizado', 'arrayRevisionNotasMecanizado']
    };

    const keysToReturn = resultMap[qFinalX] || [];
    const result = {};
    keysToReturn.forEach(key => result[key] = arrays[key]);
    // console.log('result: ', result)
    return result;
}

function changeValueFromArray(arrayFromValues) {
    const valueMap = {
        '': 'S/D',
        'sinDato': 'S/D',
        'noAplica': 'N/A',
        'prodismo': 'PRODISMO',
        'terceros': 'TERCEROS',
        'china': 'CHINA'
    };
    return arrayFromValues.map(value => valueMap[value] || value);
}

function changeValueEstadoFromArray(arrayFromEstadoValues) {
    const valueEstadoMap = {
        '': 'S/D',
        'sinDato': 'S/D',
        'noAplica': '<i class="fa-solid fa-ban"></i>',
        'terminado': '<i class="fa-solid fa-circle-check" style="color: #b09b12;"></i>',
        'enProceso': '<i class="fa-solid fa-arrows-spin" style="color: #008f3;"></i>',
        'suspendido': '<i class="fa-solid fa-circle-xmark" style="color: #c40000;"></i>'
    };
    return arrayFromEstadoValues.map(value => valueEstadoMap[value] || value);
}

function colorStatusOt(valorStatusOt) {
    let disabled = 'required'
    let color = ''
    valorStatusOt==='Activo' ? color = 'success' : color = 'danger'

    return {
        color,
        disabled
    }
}

// ------------- Estado selected -------------------
function estadoSelect(option) {
    const options = {
        enProceso: `
            <option value="terminado"><i class="fa-solid fa-circle-check" style="color: #00bf30;"></i></option>
            <option value="suspendido"><i class="fa-solid fa-circle-xmark" style="color: #c40000;"></i></option>
            <option value="noAplica"><i class="fa-solid fa-ban"></i></option>
        `,
        terminado: `
            <option value="enProceso"><i class="fa-solid fa-arrows-spin" style="color: #FFD43B;"></i></option>
            <option value="suspendido"><i class="fa-solid fa-circle-xmark" style="color: #c40000;"></i></option>
            <option value="noAplica"><i class="fa-solid fa-ban"></i></option>
        `,
        suspendido: `
            <option value="terminado"><i class="fa-solid fa-circle-check" style="color: #00bf30;"></i></option>
            <option value="enProceso"><i class="fa-solid fa-arrows-spin" style="color: #FFD43B;"></i></option>
            <option value="noAplica"><i class="fa-solid fa-ban"></i></option>
        `,
        noAplica: `
            <option value="terminado"><i class="fa-solid fa-circle-check" style="color: #00bf30;"></i></option>
            <option value="enProceso"><i class="fa-solid fa-arrows-spin" style="color: #FFD43B;"></i></option>
            <option value="suspendido"><i class="fa-solid fa-circle-xmark" style="color: #c40000;"></i></option>
        `,
        default: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="suspendido">Suspendido</option>
            <option value="noAplica">N/A</option>
        `
    };

    return options[option] || options.default;
}

function switchEstadoSelected(switchValue) {
    const optionsMap = {
        'enProceso': { variableValue: 'enProceso', optionKey: 'optionEnProceso', getValueArrayDato: 'En Proceso'},
        'termiando': { variableValue: 'terminado', optionKey: 'optionTerminado', getValueArrayDato: 'Terminado'},
        'suspendido': { variableValue: 'suspendido', optionKey: 'optionSuspendido', getValueArrayDato: 'Suspendido'},
        'N/A': { variableValue: 'noAplica', optionKey: 'optionNoAplica', getValueArrayDato: 'N/A'},
        "S/D": { variableValue: 'sinDato', optionKey: 'optionDefault', getValueArrayDato: 'S/D', getValueArrayRevision: 0 },
        "": { variableValue: 'sinDato', optionKey: 'optionDefault', getValueArrayDato: 'S/D', getValueArrayRevision: 0 }
    };

    // Configuración predeterminada si switchValue no coincide con ninguna clave
    const defaultOption = { variableValue: '', optionKey: '', getValueArrayDato: '', getValueArrayRevision: undefined };

    // Selecciona la opción adecuada o la opción predeterminada
    const selectedOption = optionsMap[switchValue] || defaultOption;

    // Obtiene la opción definida llamando a optionEstadoSelect  
    const optionDefined = estadoSelect(selectedOption.variableValue);

    return {
        variableValue: selectedOption.variableValue,
        optionDefined,
        getValueArrayDato: selectedOption.getValueArrayDato,
        getValueArrayRevision: selectedOption.getValueArrayRevision
    };
}

// ------------- Option selected -------------------
function optionSelect(option) {
    const options = {
        prodismo: `
            <option value="terceros">Terceros</option>
            <option value="china">CHINA</option>
            <option value="noAplica">N/A</option>
        `,
        china: `
            <option value="prodismo">PRODISMO</option>
            <option value="terceros">Terceros</option>
            <option value="noAplica">N/A</option>
        `,
        terceros: `
            <option value="prodismo">PRODISMO</option>
            <option value="china">CHINA</option>
            <option value="noAplica">N/A</option>
        `,
        noAplica: `
            <option value="prodismo">PRODISMO</option>
            <option value="terceros">Terceros</option>
            <option value="china">CHINA</option>
        `,
        default: `
            <option value="prodismo">PRODISMO</option>
            <option value="terceros">Terceros</option>
            <option value="china">CHINA</option>
            <option value="noAplica">N/A</option>
        `
    };

    return options[option] || options.default;
}

function switchOptionSelected(switchValue) {
    const optionsMap = {
        "PRODISMO": { variableValue: 'prodismo', optionKey: 'optionProdismo', getValueArrayDato: 'PRODISMO' },
        "TERCEROS": { variableValue: 'terceros', optionKey: 'optionTerceros', getValueArrayDato: 'TERCEROS' },
        "CHINA": { variableValue: 'china', optionKey: 'optionChina', getValueArrayDato: 'CHINA' },
        "N/A": { variableValue: 'noAplica', optionKey: 'optionNoAplica', getValueArrayDato: 'N/A' },
        "S/D": { variableValue: 'sinDato', optionKey: 'optionDefault', getValueArrayDato: 'S/D', getValueArrayRevision: 0 },
        "": { variableValue: 'sinDato', optionKey: 'optionDefault', getValueArrayDato: 'S/D', getValueArrayRevision: 0 }
    };

    // Configuración predeterminada si switchValue no coincide con ninguna clave
    const defaultOption = { variableValue: '', optionKey: '', getValueArrayDato: '', getValueArrayRevision: undefined };

    // Selecciona la opción adecuada o la opción predeterminada
    const selectedOption = optionsMap[switchValue] || defaultOption;

    // Obtiene la opción definida llamando a optionSelect  
    const optionDefined = optionSelect(selectedOption.variableValue);

    return {
        variableValue: selectedOption.variableValue,
        optionDefined,
        getValueArrayDato: selectedOption.getValueArrayDato,
        getValueArrayRevision: selectedOption.getValueArrayRevision
    };
}

const cabeceraFormulario = `
    <div class="col-1 my-auto align-self-center" style="width: 4vw;">
    <span><strong>OT#</strong></span>
    </div>
    <div class="col-1 my-auto align-self-center" style="width: 4vw;">
    <span><strong>OP#</strong></span>
    </div>
    <div class="col-1 my-auto align-self-center" style="width: 5vw;">
        <span><strong>Item Status</strong></span>
    </div>
    <div class="col-1 my-auto align-self-center" style="width: 5vw;">
        <span><strong># Item</strong></span>
    </div>
    <div class="col-1 my-auto align-self-center" style="width: 10vw;">
        <span><strong>Descripción</strong></span>
    </div>`

function datosCabeceraFormulario (
            arrayOtDetalleStatus, 
            y, 
            arrayOtNumber, 
            arrayOpNumber,
            arrayOtDetalle,
            arrayDescripcionDetalle,
            arrayOnumber,
            arrayDetalleId
    ) {

    const datosCabecera = 
        `<div class="col-1 my-auto align-self-center" style="width: 4vw;">
            <span id="${arrayOtNumber}" class="badge rounded-pill bg-dark text-white">${arrayOtNumber}</span>
            <input type="hidden" name="otNumberHidden${y}" value="${arrayOtNumber}">
        </div>
        <div class="col-1 my-auto align-self-center" style="width: 4vw;">
            <span class="badge rounded-pill bg-secondary text-white">${arrayOpNumber}</span>
        </div>
        <div class="col-1 my-auto align-self-center" style="width: 5vw;">
            <span id="${arrayOtDetalleStatus}" class="badge rounded-pill bg-${(colorStatusOt(arrayOtDetalleStatus).color)} text-white">${arrayOtDetalleStatus}</span>
            <input type="hidden" name="otStatusHidden${y}" value="${arrayOtDetalleStatus}">
        </div>
        <div class="col-1 my-auto align-self-center" style="width: 5vw;">
            <span class="badge rounded-pill bg-primary text-white">${arrayOtDetalle}</span>
            <input type="hidden" name="detalleNumberHidden${arrayOnumber}" value="${arrayOtNumber}_${arrayOtDetalle}">
        </div>
        <div class="col-1 my-auto align-self-center justify-content-start" style="width: 10vw;">
            <span class="badge bg-light text-dark">${arrayDescripcionDetalle}</span>
            <input type="hidden" name="detalleIdHidden${arrayOnumber}" value="${arrayDetalleId}">
        </div>`

    return datosCabecera                    
}

function footerFormularioHidden (projectNumberId, clientId, i, arrayBloqueLength) {
    let footerFormulario = `<input type="hidden" name="projectIdHidden" value="${projectNumberId}">
                            <input type="hidden" name="clientIdHidden" value="${clientId}">
                            <input type="hidden" name="ociNumberK" value="${parseInt(i)}"> 
                            <input type="hidden" name="otQuantity" value="${parseInt(arrayBloqueLength)}">`

    return footerFormulario                            
}

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: false,
})

function swalFireAlert (
    titulo,
    html,
    ancho,
    background,
    formulario,
    arrayDeOtNumber,
    arrayDeDetalleNumber,
    arrayDeDetalleDescription) {

    Swal.fire({
        title: titulo,
        html: html,
        width: parseInt(ancho),
        background: background,
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        focusConfirm: false,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
        didOpen: ()=> {
            let btnAceptar = document.getElementsByClassName('swal2-confirm');
            btnAceptar[0].setAttribute('id','btnAceptarModal')
            btnAceptar[0].style = "cursor: not-allowed;"
            btnAceptar[0].disabled = true
        }

    }).then((result) => {
        const resultadoElement = document.createElement('ul');
        
        arrayDeOtNumber.forEach((value, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('listItemDetailNumber')
            listItem.textContent = `Item: #${value}.${arrayDeDetalleNumber[index]} - ${arrayDeDetalleDescription[index]}`;
            
            resultadoElement.appendChild(listItem);
            resultadoElement.classList.add('listDetailNum')
        })
        
        let htmlLista = resultadoElement.outerHTML;
        let outputOk = `La información ${titulo}, fue agregada a los ítems: ${htmlLista}`
        let outputNok = `La información ${titulo}, no fue agregada a los ítems: ${htmlLista}`
        
        if (result.isConfirmed) {
            const formValues = document.getElementById(formulario)
            formValues.submit()
            setTimeout(() => {
                Toast.fire({
                    title: `Información <strong>${titulo}</strong>, agregada con éxito!`,
                    html: outputOk,
                    icon: 'success',
                    width: 600
                })
            }, 2000)

        } else {                
            Swal.fire({
                title: `Información <strong>${titulo}</strong>, no agregada!`,
                html: outputNok,
                icon: 'warning',
                width: 600
            })
            return false
        }
    })
}

//********* Agregar ítems a OT seleccionada *********** */
let arrayBtnAddDetallesOtFormSelected = []
for (let i=0; i<radios.length; i++) {
    let btnAddDetallesOtFormSelected = document.getElementById(`btnAddDetallesFormSelected${i}`)
    // console.log('btnAddDetallesOtFormSelected', btnAddDetallesOtFormSelected)
    btnAddDetallesOtFormSelected ? arrayBtnAddDetallesOtFormSelected.push(btnAddDetallesOtFormSelected) : null
}

//TODO: Rediseñar esta function
arrayBtnAddDetallesOtFormSelected.forEach(function(elemento) {
    if (elemento) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const radioSelectedValue = elemento.id
            ociNumberHidden.value = radioSelected(radioSelectedValue, elemento.value)
            lastOtNumberFn(elemento.id)
            formulario.scrollIntoView({ behavior: 'smooth', top:0 }) //scrollTo({ behavior: 'smooth', block: 'start' })
        })
    }
})

//TODO: Rediseñar esta function 
function messageAddDetallesToOt(ociNumber, otArray, ociAlias) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    if (otArray.length > 1) {
        Swal.fire({
            title: 'Ingreso de datos!',
            position: 'center',
            text: `Se agregarán las OT's ${otArray.join(" - ")}, a la OCI# ${ociNumber} - Alias: ${ociAlias}` ,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewOt').submit()
                Toast.fire({
                    icon: 'success',
                    title: `OT's ${otArray.join(" - ")}, agregadas con éxito!`
                })
            } else {
                Swal.fire(
                    'OTs no agregadas!',
                    `Las OT's ${otArray.join(" - ")}, no fueron agregadas a la OCI# ${ociNumber}`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Ingreso de datos!',
            position: 'center',
            text: `Se agregará la OT ${otArray}, a la OCI# ${ociNumber} - Alias: ${ociAlias}`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formNewOt').submit()
                Toast.fire({
                    icon: 'success',
                    title: `OT ${otArray.join(" - ")}, agregada con éxito!`
                })
            } else {
                Swal.fire(
                    'OT no agregada!',
                    `La OT ${otArray}, no fue agregada a la OCI# ${ociNumber} - Alias: ${ociAlias}`,
                    'warning'
                )
                return false
            }
        })
    }
}

//TODO: Rediseñar esta function 
//******Agregar ítems a OT *********/
const btnCreateAddDetallesToOt = document.getElementById('idAddDetalles')
btnCreateAddDetallesToOt.addEventListener('click', (event) => {
    event.preventDefault()
    let ociNumberHiddenValue = parseInt(document.getElementById('ociNumberHidden').value)
    //let otNumberHiddenValue = parseInt(document.getElementById('otNumberHidden').value)
    //console.log('ociNumberHiddenValue:', ociNumberHiddenValue)
    if (ociNumberHiddenValue) {
        const otQuantity = parseInt(document.getElementById('otQuantity').value)
        let otArray = [document.getElementById(`otNumber`).value]
        let ociAlias = document.getElementById('ociAliasHidden').value
        if (otQuantity > 1) {
            for (let j = 1; j < otQuantity; j++) {
                let otNumberSelected = document.getElementById(`otNumber${j}`).value
                otArray.push(otNumberSelected)
            }
        }
        messageAddDetallesToOt(ociNumberHiddenValue, otArray, ociAlias)

    } else {
        //TODO: Hacer sweetAlert2
        console.log('Hubo un error al seleccionar la OCI!!')
    }
})

//***** addDatoToDistribucion ******
function addDatoToOtDistribucion(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueDistribucion = []

        for (let y=0; y < res.lastChild; y++) {
            const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="mecanizado2dCompleto${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="mecanizado2dCompleto${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMecanizado2dCompleto[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayMecanizado2dCompleto[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMecanizado2dCompleto[y])).optionDefined}
                        </select>
                        <input type="hidden" id="mecanizado2dCompletoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="mecanizado2dCompletoHidden${[y]}" value="${(switchOptionSelected(getValues.arrayMecanizado2dCompleto[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionMecanizado2dCompleto[y]}" name="revisionMecanizado2dCompleto${y}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionMecanizado2dCompleto${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionMecanizado2dCompleto${y}" value="${getValues.arrayRevisionMecanizado2dCompleto[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="mecanizado3dPrefinal${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="mecanizado3dPrefinal${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMecanizado3dPrefinal[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayMecanizado3dPrefinal[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMecanizado3dPrefinal[y])).optionDefined}
                        </select>
                        <input type="hidden" id="mecanizado3dPrefinalHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="mecanizado3dPrefinalHidden${[y]}" value="${(switchOptionSelected(getValues.arrayMecanizado3dPrefinal[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionMecanizado3dPrefinal[y]}" name="revisionMecanizado3dPrefinal${y}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionMecanizado3dPrefinal${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionMecanizado3dPrefinal${y}" value="${getValues.arrayRevisionMecanizado3dPrefinal[y]}">    
                    </div>

                    <div class="col my-auto">
                        <select id="mecanizado3dFinal${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="mecanizado3dFinal${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMecanizado3dFinal[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayMecanizado3dFinal[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMecanizado3dFinal[y])).optionDefined}
                        </select>
                        <input type="hidden" id="mecanizado3dFinalHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="mecanizado3dFinalHidden${[y]}" value="${(switchOptionSelected(getValues.arrayMecanizado3dFinal[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionMecanizado3dFinal[y]}" name="revisionMecanizado3dFinal${y}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionMecanizado3dFinal${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionMecanizado3dFinal${y}" value="${getValues.arrayRevisionMecanizado3dFinal[y]}">    
                    </div>

                    <div class="col my-auto">
                        <select id="bancoArmado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="bancoArmado${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayBancoArmado[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayBancoArmado[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayBancoArmado[y])).optionDefined}
                        </select>
                        <input type="hidden" id="bancoArmadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="bancoArmadoHidden${[y]}" value="${(switchOptionSelected(getValues.arrayBancoArmado[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionBancoArmado[y]}" name="revisionBancoArmado${y}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionBancoArmado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionBancoArmado${y}" value="${getValues.arrayRevisionBancoArmado[y]}">    
                    </div>`

                    const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                    const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                    const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                    
                    arrayBloqueDistribucion.push(`
                        <div class="row mx-auto ${divClass}" ${divStyle}>
                            ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                            ${dataEnArrayBloque}
                        </div>`);
                    
                    res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueDistribucion.push(`<hr class="my-1">`) : null 
        }

        const html = `<form id="formDistribucionValues" action="/api/programas/otDistribucion" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col my-auto">
                                    <span><strong>Mec. 2d Completo</strong></span>
                                </div>
                                <div class="col-1 my-auto align-self-start border-end border-dark" style="width: 4vw;">
                                    <span><strong>Rev</strong></span>
                                </div>
                                <div class="col my-auto">
                                    <span><strong>Mec. 3d Prefinal</strong></span>
                                </div>
                                <div class="col-1 my-auto align-self-start border-end border-dark" style="width: 4vw;">
                                    <span><strong>Rev</strong></span>
                                </div>
                                <div class="col my-auto">
                                    <span><strong>Mec. 3d Final</strong></span>
                                </div>
                                <div class="col-1 my-auto align-self-start border-end border-dark" style="width: 4vw;">
                                    <span><strong>Rev</strong></span>
                                </div>
                                <div class="col my-auto">
                                    <span><strong>Banco-Armado</strong></span>
                                </div>
                                <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                    <span><strong>Rev</strong></span>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloqueDistribucion.join(`<br>`)}
                                ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueDistribucion.length)}
                        </fieldset>
                    </form>`

        const titulo = "Distribución"
        const ancho = 1550
        const background = '#dfffff'
        const formulario = 'formDistribucionValues'
        const arrayDeOtNumber = res.arrayOtNumber
        const arrayDeDetalleNumber = res.arrayOtDetalle
        const arrayDeDetalleDescription = res.arrayDescripcionDetalle

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

async function cargarUsuarioPcpCad(res) {
    try {
        const url = `../../../api/usuarios/searchUsers/${userNameBanner}`
        await fetch(url, {method: "GET", mode: 'cors', cache: 'default'})
            .then(response => response.json())
            .then(data => {
                cargarOpcionesEnSelect(data, res);
            })
            .catch(error => new Error(`Error en la solicitud: ${error}`));

    } catch (error) {
        const titulo = 'Error'
        const message = `${error}`
        const icon = 'error'
        messageAlertUser(titulo, message, icon)
    }

    // Función para cargar las opciones en el select
    function cargarOpcionesEnSelect(datos, res) {
        const selectElements = [
            document.getElementById(`rt${res}`),
            document.getElementById(`preparacionGeo${res}`),
            document.getElementById(`programa2d${res}`),
            document.getElementById(`programa3d2F${res}`),
            document.getElementById(`programa3d4F${res}`)
        ];
        
    
        // Itera sobre el array de datos
        datos.forEach(dato => {
            // Itera sobre cada select para agregar una nueva opción
            selectElements.forEach(selectElement => {
                if (selectElement) {
                    const option = document.createElement('option');
                    option.value = dato._id;  // Asigna el valor de la opción (puede ser un ID u otro identificador)
                    option.textContent = `${dato.name}, ${dato.lastName}`;  // Asigna el texto visible en la opción (puede ser el nombre u otro dato)
                    
                    if (dato.permiso === 'cadCam' || dato.permiso === 'mecanizado') {
                        selectElement.appendChild(option);
                    }
                }
                
            });
        });
    }
}

//***** addDatoToOtProgramacionPrimera ******
function addDatoToOtProgramacionPrimera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)

        let arrayBloqueProgramacionPrimera = []
        for (let y=0; y < res.lastChild; y++) {
            let getUsersNames = cargarUsuarioPcpCad(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
            const dataEnArrayBloque = `
                <div class="col my-auto">
                    <select id="rt${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="rt${y}"
                        class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                        <option selected value="${getValues.arrayRt[y]}" disabled>
                            ${getValues.arrayRt[y]}
                        </option>
                            ${getUsersNames}
                    </select>
                    <input type="hidden" id="rtHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="rtHidden${[y]}" value="${(switchOptionSelected(getValues.arrayRt[y])).variableValue}">
                </div>

                <div class="col my-auto" style="width: 7vw;">
                    <select id="estadoRt${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoRt${y}"
                        oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                        <option selected value="${(switchEstadoSelected(getValues.arrayEstadoRt[y])).variableValue}" disabled>
                            ${(switchEstadoSelected(getValues.arrayEstadoRt[y])).getValueArrayDato}
                        </option>
                        ${(switchEstadoSelected(getValues.arrayEstadoRt[y])).optionDefined}
                    </select>
                    <input type="hidden" id="estadoRtHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                    name="estadoRtHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoRt[y])).variableValue}">
                </div>
                
                <div class="col-1 my-auto" style="width: 4vw;">
                    <input type="text" value="${getValues.arrayRevisionRt[y]}"
                        class="form-control" style="text-align: center;" disabled readonly">
                    <input type="hidden" id="revisionRt${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="revisionRt${y}" value="${getValues.arrayRevisionRt[y]}">
                </div>

                <div class="col my-auto">
                    <select id="preparacionGeo${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="preparacionGeo${y}"
                        class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                        <option selected value="${getValues.arrayPreparacionGeo[y]}" disabled>
                            ${getValues.arrayPreparacionGeo[y]}
                        </option>
                            ${getUsersNames}
                    </select>
                    <input type="hidden" id="preparacionGeoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="preparacionGeoHidden${[y]}" value="${(switchOptionSelected(getValues.arrayPreparacionGeo[y])).variableValue}">
                </div>

                <div class="col my-auto" style="width: 7vw;">
                    <select id="estadoPreparacionGeo${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoPreparacionGeo${y}"
                        oninput="updateInputsSelect()"
                        class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                        <option selected value="${(switchEstadoSelected(getValues.arrayEstadoPreparacionGeo[y])).variableValue}" disabled>
                            ${(switchEstadoSelected(getValues.arrayEstadoPreparacionGeo[y])).getValueArrayDato}
                        </option>
                        ${(switchEstadoSelected(getValues.arrayEstadoPreparacionGeo[y])).optionDefined}
                    </select>
                    <input type="hidden" id="estadoPreparacionGeoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                    name="estadoPreparacionGeoHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoPreparacionGeo[y])).variableValue}">
                </div>
                
                <div class="col-1 my-auto" style="width: 4vw;">
                    <input type="text" value="${getValues.arrayRevisionPreparacionGeo[y]}"
                        class="form-control" style="text-align: center;" disabled readonly">
                    <input type="hidden" id="revisionPreparacionGeo${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="revisionPreparacionGeo${y}" value="${getValues.arrayRevisionPreparacionGeo[y]}">
                </div>

                <div class="col my-auto">
                    <select id="programa2d${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="programa2d${y}"
                        class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                        <option selected value="${getValues.arrayPrograma2d[y]}" disabled>
                            ${getValues.arrayPrograma2d[y]}
                        </option>
                            ${getUsersNames}
                    </select>
                    <input type="hidden" id="programa2dHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="programa2dHidden${[y]}" value="${(switchOptionSelected(getValues.arrayPrograma2d[y])).variableValue}">
                </div>

                <div class="col my-auto" style="width: 7vw;">
                    <select id="estadoPrograma2d${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoPrograma2d${y}"
                        oninput="updateInputsSelect()"
                        class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                        <option selected value="${(switchEstadoSelected(getValues.arrayEstadoPrograma2d[y])).variableValue}" disabled>
                            ${(switchEstadoSelected(getValues.arrayEstadoPrograma2d[y])).getValueArrayDato}
                        </option>
                        ${(switchEstadoSelected(getValues.arrayEstadoPrograma2d[y])).optionDefined}
                    </select>
                    <input type="hidden" id="estadoPrograma2dHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                    name="estadoPrograma2dHidden${[y]}"
                    value="${(switchEstadoSelected(getValues.arrayEstadoPrograma2d[y])).variableValue}">
                </div>
                
                <div class="col-1 my-auto" style="width: 4vw;">
                    <input type="text" value="${getValues.arrayRevisionPrograma2d[y]}"
                        class="form-control" style="text-align: center;" disabled readonly">
                    <input type="hidden" id="revisionPrograma2d${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="revisionPrograma2d${y}" value="${getValues.arrayRevisionPrograma2d[y]}">
                </div>
                `

            const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
            const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
            const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
            
            arrayBloqueProgramacionPrimera.push(`
                <div class="row mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                    ${dataEnArrayBloque}
                </div>`);
            
            res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueProgramacionPrimera.push(`<hr class="my-1">`) : null 
        
        }
    
        const html = `
                <form id="formProgramacionPrimeraValues" action="/api/proyectos/otInfoProgramacionPrimera" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>Req. Tec.</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Prep. GEO</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Programas 2D</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueProgramacionPrimera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueProgramacionPrimera.length)}
                    </fieldset>
                </form>`
    
        const titulo = "Programación (1° Parte)"
        const formulario = 'formProgramacionPrimeraValues'
        const ancho = 1850
        const background = '#efefef'
        const arrayDeOtNumber = res.arrayOtNumber
        const arrayDeDetalleNumber = res.arrayOtDetalle
        const arrayDeDetalleDescription = res.arrayDescripcionDetalle
    
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToOtProgramacionSegunda ******
function addDatoToOtProgramacionSegunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)

        let arrayBloqueProgramacionSegunda = []
        for (let y=0; y < res.lastChild; y++) {
            let getUsersNames = cargarUsuarioPcpCad(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])

            const dataEnArrayBloque = `
                <div class="col my-auto">
                    <select id="programa3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="programa3d2F${y}"
                        class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                        <option selected value="${getValues.arrayPrograma3d2F[y]}" disabled>
                            ${getValues.arrayPrograma3d2F[y]}
                        </option>
                            ${getUsersNames}
                    </select>
                    <input type="hidden" id="programa3d2FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="programa3d2FHidden${[y]}" value="${(switchOptionSelected(getValues.arrayPrograma3d2F[y])).variableValue}">
                </div>

                <div class="col-1 my-auto" style="width: 9vw;">
                    <select id="estadoPrograma3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoPrograma3d2F${y}"
                        oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                        <option selected value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).variableValue}" disabled>
                            ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).getValueArrayDato}
                        </option>
                        ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).optionDefined}
                    </select>
                    <input type="hidden" id="estadoPrograma3d2FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                    name="estadoPrograma3d2FHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).variableValue}">

                </div>
                
                <div class="col-1 my-auto" style="width: 4vw;">
                    <input type="text" value="${getValues.arrayRevisionPrograma3d2F[y]}"
                        class="form-control" style="text-align: center;" disabled readonly">
                    <input type="hidden" id="revisionPrograma3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="revisionPrograma3d2F${y}" value="${getValues.arrayRevisionPrograma3d2F[y]}">
                </div>

                <div class="col my-auto">
                    <select id="programa3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="programa3d4F${y}"
                        class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                        <option selected value="${getValues.arrayPrograma3d4F[y]}" disabled>
                            ${getValues.arrayPrograma3d4F[y]}
                        </option>
                            ${getUsersNames}
                    </select>
                    <input type="hidden" id="programa3d4FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="programa3d4FHidden${[y]}" value="${(switchOptionSelected(getValues.arrayPrograma3d4F[y])).variableValue}">
                </div>

                <div class="col-1 my-auto" style="width: 9vw;">
                    <select id="estadoPrograma3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoPrograma3d4F${y}"
                        oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                        <option selected value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).variableValue}" disabled>
                            ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).getValueArrayDato}
                        </option>
                        ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).optionDefined}
                    </select>
                    <input type="hidden" id="estadoPrograma3d4FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                    name="estadoPrograma3d4FHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).variableValue}">
                </div>
                
                <div class="col-1 my-auto" style="width: 4vw;">
                    <input type="text" value="${getValues.arrayRevisionPrograma3d4F[y]}"
                        class="form-control" style="text-align: center;" disabled readonly">
                    <input type="hidden" id="revisionPrograma3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="revisionPrograma3d4F${y}" value="${getValues.arrayRevisionPrograma3d4F[y]}">
                </div>

                <div class="col-1 my-auto" style="width: 13vw;">
                    <textarea class="form-control" id="notasProgramacion${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasProgramacion${y}" rows="1">${getValues.arrayNotasProgramacion[y].trim()}</textarea>
                    <input type="hidden" id="notasProgramacionHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="notasProgramacionHidden${[y]}" value="${getValues.arrayNotasProgramacion[y]}">
                </div>
                
                <div class="col-1 my-auto" style="width: 4vw;">
                    <input type="text" value="${getValues.arrayRevisionNotasProgramacion[y]}"
                        class="form-control" style="text-align: center;" disabled readonly">
                    <input type="hidden" id="revisionNotasProgramacion${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="revisionNotasProgramacion${y}" value="${getValues.arrayRevisionNotasProgramacion[y]}">
                </div>
                `

            const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
            const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
            const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
            
            arrayBloqueProgramacionSegunda.push(`
                <div class="row mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                    ${dataEnArrayBloque}
                </div>`);
            
            res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueProgramacionSegunda.push(`<hr class="my-1">`) : null 
        
        }
    
        const html = `
                <form id="formProgramacionSegundaValues" action="/api/proyectos/otInfoProgramacionSegunda" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>Programa 3d F2</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Programa 3d F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueProgramacionSegunda.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueProgramacionSegunda.length)}
                    </fieldset>
                </form>`
    
        const titulo = "Programación (2° Parte)"
        const formulario = 'formProgramacionSegundaValues'
        const ancho = 1850
        const background = '#efefef'
        const arrayDeOtNumber = res.arrayOtNumber
        const arrayDeDetalleNumber = res.arrayOtDetalle
        const arrayDeDetalleDescription = res.arrayDescripcionDetalle
    
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//TODO: function
//***** addDatoToMecanizado ******
function addDatoToMecanizado(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
    
        var arrayBloqueDisenoPrimera = []
    
        for (let y=0; y < res.lastChild; y++) {
    
            const dataEnArrayBloque = `
                <div class="col m-auto">
                    <div class="row justify-content-center">
                        <div class="col-7 my-auto">
                            <input type="text" class="form-control"
                                min="0" max="100" step="5"
                                id="avDisenoDisabled${res.arrayOtNumber[y]}"
                                name="avDisenoDisabled"
                                value="${getValues.arrayAvDiseno[y]}"
                                style="text-align: center; width: 4.25rem;"
                                disabled>
                        </div>
                        <div class="col my-auto">
                            <strong>%</strong>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col my-auto">
                            <input type="range" class="form-range"
                                min="0" max="100" step="5"
                                id="avDiseno${res.arrayOtNumber[y]}"
                                name="avDisenoRange"
                                value="${getValues.arrayAvDiseno[y]}"
                                oninput="updateInputsText()">
                            <input type="hidden" class="form-control"
                                id="avDisenoHidden${res.arrayOtNumber[y]}"
                                name="avDisenoHidden${[y]}"
                                value="${getValues.arrayAvDiseno[y]}">
                        </div>
                    </div>
                </div>
                <div class="col-1 my-auto">    
                    <input type="text"
                        value="${getValues.arrayRevisionAvDiseno[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionAvDiseno${res.arrayOtNumber[y]}"
                        name="revisionAvDiseno${[y]}"
                        value="${getValues.arrayRevisionAvDiseno[y]}">
                </div>

                <div class="col my-auto">
                    <select id="av50Diseno${res.arrayOtNumber[y]}" name="av50Diseno${[y]}"
                        oninput="updateInputsSelect()"
                        class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                        <option selected value="${(switchOptionSelected(getValues.arrayAv50Diseno[y])).variableValue}">
                            ${(switchOptionSelected(getValues.arrayAv50Diseno[y])).getValueArrayDato}
                        </option>
                            ${(switchOptionSelected(getValues.arrayAv50Diseno[y])).optionDefined}
                    </select>
                    <input type="hidden" id="av50DisenoHidden${res.arrayOtNumber[y]}"
                        name="av50DisenoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayAv50Diseno[y])).variableValue}">
                </div>
                <div class="col-1 my-auto">
                    <input type="text"
                        value="${getValues.arrayRevisionAv50Diseno[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionAv50Diseno${res.arrayOtNumber[y]}"
                        name="revisionAv50Diseno${[y]}"
                        value="${getValues.arrayRevisionAv50Diseno[y]}">
                </div>

                <div class="col my-auto">
                    <select id="av80Diseno${res.arrayOtNumber[y]}" name="av80Diseno${[y]}"
                    oninput="updateInputsSelect()"    
                    class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                        <option selected value="${(switchOptionSelected(getValues.arrayAv80Diseno[y])).variableValue}" disabled>
                        ${(switchOptionSelected(getValues.arrayAv80Diseno[y])).getValueArrayDato}
                        </option>
                            ${(switchOptionSelected(getValues.arrayAv80Diseno[y])).optionDefined}
                    </select>
                    <input type="hidden" id="av80DisenoHidden${res.arrayOtNumber[y]}"
                        name="av80DisenoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayAv80Diseno[y])).variableValue}">
                </div>
                <div class="col-1 my-auto">
                    <input type="text"
                        value="${getValues.arrayRevisionAv80Diseno[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionAv80Diseno${res.arrayOtNumber[y]}"
                        name="revisionAv80Diseno${[y]}"
                        value="${getValues.arrayRevisionAv80Diseno[y]}">
                </div>

                <div class="col my-auto">
                    <select id="envioCliente${res.arrayOtNumber[y]}" name="envioCliente${[y]}"
                    oninput="updateInputsSelect()"    
                    class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                        <option selected value="${(switchOptionSelected(getValues.arrayEnvioCliente[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayEnvioCliente[y])).getValueArrayDato}
                        </option>
                            ${(switchOptionSelected(getValues.arrayEnvioCliente[y])).optionDefined}
                    </select>
                    <input type="hidden" id="envioClienteHidden${res.arrayOtNumber[y]}"
                        name="envioClienteHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayEnvioCliente[y])).variableValue}">
                </div>
                <div class="col-1 my-auto">    
                    <input type="text"
                        value="${getValues.arrayRevisionEnvioCliente[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionEnvioCliente${res.arrayOtNumber[y]}"
                        name="revisionEnvioCliente${[y]}"
                        value="${getValues.arrayRevisionEnvioCliente[y]}">
                </div>`
    
            if (res.arrayOtDetalleStatus[y]==='Inactivo') {
                arrayBloqueDisenoPrimera.push(`
                <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                    ${datosCabeceraFormulario (res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    ${dataEnArrayBloque}
                </div>     
            `)
            
            } else {
    
                arrayBloqueDisenoPrimera.push(`
                <div class="row my-1 mx-auto justify-content-center">
                    ${datosCabeceraFormulario (res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    ${dataEnArrayBloque}
                </div>`)
            }
        }
    
        const html = `
                <form id="formDisenoPrimeraValues" action="/api/proyectos/otInfoAvDisenoPrimera" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto justify-content-center">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <label for="avDiseno"><strong>Av. Diseño</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionAvDiseno"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="primerRev50"><strong>1° Rev 50%</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionPrimerRev50"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="segundaRev80"><strong>2° Rev 80%</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionSegundaRev80"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="envCliente"><strong>Env a Cliente</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionEnvCliente"><strong>Rev</strong></label>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueDisenoPrimera}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueDisenoPrimera.length)}    
                    </fieldset>
                </form>`  
    
            const titulo = "Mecanizado (1° Parte)"
            const ancho = 1350
            const background = '#dfefff'
            const formulario = 'formMecanizadoPrimeraValues'
            const arrayDeOtNumber = res.arrayOtNumber
    
            swalFireAlert (
                titulo,
                html,
                ancho,
                background,
                formulario,
                arrayDeOtNumber
            )
            disabledBtnAceptar()
    }
}

// Función para actualizar el valor del campo Text
function updateInputsText() {
    let arrayInputsRange = []
    let allInputsRange = []
    
    for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
        document.getElementById(`tablaGeneral${i}`) ? arrayInputsRange.push(i) : null
    }
    
    arrayInputsRange !=[] ? allInputsRange = document.querySelectorAll('input[type="range"]') : null
    // console.log('allInputsRange: ',allInputsRange)

    for (let y=0; y < parseInt(allInputsRange.length)-1; y++) {
        const idInputRange = allInputsRange[y].id  //.substring(0, allInputsRange[y].id.length - 9)
        const idInputTextToChange = idInputRange.substring(0, idInputRange.length - 9) + 'Disabled' + idInputRange.substring(idInputRange.length - 9)
        const idInputRangeHidden = idInputRange.substring(0, idInputRange.length - 9) + 'Hidden' + idInputRange.substring(idInputRange.length - 9)
        
        // Obtener el valor del slider   
        let valorSlider = document.getElementById(`${idInputRange}`).value

        // Actualizar el campo de texto con el valor del slider
        if (valorSlider) {
            document.getElementById(`${idInputTextToChange}`).value = valorSlider
            document.getElementById(`${idInputRangeHidden}`).value = valorSlider
        }
    }
}

// Función para actualizar el valor del campo Text hidden con los Select's
function updateInputsSelect() {
    let arrayInputSelectHidden = []
    let allInputsSelect = [] 

    for (let i=0; i<varLimMaxOciProyecto; i++) { //variable limite maximo de OCI por proyecto
        document.getElementById(`tablaGeneral${i}`) ? arrayInputSelectHidden.push(i) : null
    }

    arrayInputSelectHidden !=[] ? allInputsSelect = document.querySelectorAll('select') : null

    let largoArrayInputsSelect = parseInt((allInputsSelect.length)-1)
    for (let y=0; y < largoArrayInputsSelect; y++) {
        const idInputSelectHidden = allInputsSelect[y].id.substring(0, allInputsSelect[y].id.length - 9) + 'Hidden' + allInputsSelect[y].id.substring(allInputsSelect[y].id.length - 9)
        // console.log('id:', idInputSelectHidden)
        let inputSelectHidden = document.getElementById(`${idInputSelectHidden}`)
        // console.log('inputSelectHidden:', inputSelectHidden)
        inputSelectHidden ? inputSelectHidden.value = document.getElementById(`${allInputsSelect[y].id}`).value : null
        // console.log('inputSelectHidden.value', inputSelectHidden.value)
    }
}

function disabledBtnAceptar () {
    let btnAceptarModal = document.getElementsByClassName('swal2-confirm');
    const allInputs = document.querySelectorAll('input[type="text"],input[type="number"],select,textarea')
    const allInputsRange = document.querySelectorAll('input[type="range"]')
    const allInputsCheck = document.querySelectorAll('input[type="checkbox"]')
    const allInputsRadio = document.querySelectorAll('input[type="radio"]')

    allInputs.forEach(function(input) {
        if (input.value) {
            input.addEventListener('change', (event) => {
                console.log('input.value: ', input.value)
                event.preventDefault()
                input.classList.add("border-primary")
                input.classList.add("border-2")
                input.classList.add("shadow")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            })    
        }        
    })

    allInputsRange.forEach(function(input) {
        if (input.value) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("drag__bar")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            })    
        }        
    })

    allInputsCheck.forEach(function(input) {
        if (input.value) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.toggle("bg-danger")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            })    
        }        
    })

    allInputsRadio.forEach(function(input) {
        if (input.value) {
            input.addEventListener('input', (event) => {
                event.preventDefault()
                if (btnAceptarModal) {
                    btnAceptarModal[0].removeAttribute('disabled')
                    btnAceptarModal[0].style = "cursor: pointer;"
                }
            })    
        }        
    })
}

const arrTables = []
for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    document.getElementById(`tablaGeneral${i}`) ? arrTables.push(i) : null
}

if (arrTables !=[]) {
    let allButtonsFromTables = document.querySelectorAll(`
        button[name="btnOtDistribucion"],
        button[name="btnOtProgramacionPrimera"],
        button[name="btnOtProgramacionSegunda"],
        button[name="btnMecanizadoPrimeraParte"]
    `);

    let arrayTituloTabla =
    [
        {
            nombreTabla: "tablaOtDistribucion",
            btnName: "btnOtDistribucion",
            functionName: addDatoToOtDistribucion,
            qInicial: 0,
            qFinal: 4
        },
        {
            nombreTabla: "tablaOtProgramacionPrimera",
            btnName: "btnOtProgramacionPrimera",
            functionName: addDatoToOtProgramacionPrimera,
            qInicial: 4,
            qFinal: 7
        },
        {
            nombreTabla: "tablaOtProgramacionSegunda",
            btnName: "btnOtProgramacionSegunda",
            functionName: addDatoToOtProgramacionSegunda,
            qInicial: 7,
            qFinal: 10
        },
        {
            nombreTabla: "tablaMecanizado",
            btnName: "btnMecanziado",
            functionName: addDatoToMecanizado,
            qInicial: 10,
            qFinal: 17
        }
    ]

    allButtonsFromTables.forEach(function(btn){
        if (btn.value && btn.name){
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let index = arrayTituloTabla.findIndex(element => element.btnName === btn.name);
                const kValue = btn.value
                let nombreTabla = document.getElementById(`${arrayTituloTabla[index].nombreTabla}${kValue}`)
                const idTabla = nombreTabla.id
                const qInicial = arrayTituloTabla[index].qInicial
                const qFinal = arrayTituloTabla[index].qFinal
                arrayTituloTabla[index].functionName(kValue, idTabla, qInicial, qFinal)
                event.stopPropagation()
            })
        }
    })
}

let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /["$%?¡¿^/()=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.toggle("border")
                input.classList.toggle("border-danger")
                input.classList.toggle("border-2")
            }
        })
    })