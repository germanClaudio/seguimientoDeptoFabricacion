//variable limite maximo de proyectos por Cliente
const varLimMaxProyectoCliente = 99

//variable limite maximo de Ot por Proyecto
const varLimMaxOtProyecto = 99

//variable limite maximo de OCI por Proyecto
const varLimMaxOciProyecto = 99

//variable limite maximo de Columnas Info por Ot
const varLimMaxColData = 20

//variable limite maximo de Revisiones por dato
const varLimMaxRevData = 99

// Manejador de eventos de tablas General y Seguimiento -------------------
const arrBtnHidde = []
for (let i = 0; i<varLimMaxOciProyecto; i++) {
    if (document.getElementById(`tablaGeneral${i}`) ) arrBtnHidde.push(i)
}

function hiddeTableGeneral(k) {
    const tablaGeneral = document.getElementById(`tablaGeneral${k}`)
    const tablaSeguimiento = document.getElementById(`tablaSeguimiento${k}`)
    const btnHiddeTableGeneral = document.getElementById(`btnHiddeTableGeneral${k}`)
    const posBtnHiddeTableGeneral = document.getElementById(`posBtnHiddeTableGeneral${k}`)

    if (tablaGeneral.style.display === 'none') {
        tablaGeneral.style.display = ''
        tablaGeneral.classList.add("col-3")
        tablaSeguimiento.classList.add("col-3")
        btnHiddeTableGeneral.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

        posBtnHiddeTableGeneral.classList.remove("col-1")
        posBtnHiddeTableGeneral.classList.add("col-3")
        btnHiddeTableGeneral.title = 'Ocultar General'

    } else {
        tablaGeneral.style.display = 'none'
        tablaGeneral.classList.remove("col-3")
        tablaSeguimiento.classList.add("col-3")
        btnHiddeTableGeneral.innerHTML = '<i class="fa-solid fa-eye"></i>'
        posBtnHiddeTableGeneral.classList.remove("col-3")
        posBtnHiddeTableGeneral.classList.add("col-1")
        btnHiddeTableGeneral.title = 'Mostrar General'
    }
}

function hiddeTableSeguimiento(k) {
    const tablaSeguimiento = document.getElementById(`tablaSeguimiento${k}`)
    const btnHiddeTableSeguimiento = document.getElementById(`btnHiddeTableSeguimiento${k}`)
    const posBtnHiddeTableSeguimiento = document.getElementById(`posBtnHiddeTableSeguimiento${k}`)

    if (tablaSeguimiento.style.display === 'none') {
        tablaSeguimiento.style.display = ''
        btnHiddeTableSeguimiento.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
        posBtnHiddeTableSeguimiento.classList.remove("col-1")
        posBtnHiddeTableSeguimiento.classList.add("col-3")
        btnHiddeTableSeguimiento.title = 'Ocultar Int/Ext'
    } else {
        tablaSeguimiento.style.display = 'none'
        btnHiddeTableSeguimiento.innerHTML = '<i class="fa-solid fa-eye"></i>'
        posBtnHiddeTableSeguimiento.classList.remove("col-3")
        posBtnHiddeTableSeguimiento.classList.add("col-1")
        btnHiddeTableSeguimiento.title = 'Mostrar Int/Ext'
    }
}

function extractNumbers(str) {
    const numbers = str.match(/\d{1,2}/g) // Extract 1 or 2 digit numbers from the string
    
    if (numbers) {
        if (numbers.length === 2) {
            // If two numbers are found, check if both are numbers
            if (!isNaN(parseInt(numbers[0])) && !isNaN(parseInt(numbers[1]))) return numbers; // Return both numbers as an array
        } else if (numbers.length === 1) {
            // If only one number is found, check if it's a number
            if (!isNaN(parseInt(numbers[0]))) return numbers[0]; // Return the single number
        }
    }
    return null; // Return null if no valid numbers are found
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

// Ocultar tablas cabeceras
if (arrBtnHidde !=[]) {
    let allButtonsHiddeTableGeneral = document.querySelectorAll('button[name="btnHiddeTableGeneral"]')
    let allButtonsHiddeTableSeguimiento = document.querySelectorAll('button[name="btnHiddeTableSeguimiento"]')
    
    allButtonsHiddeTableGeneral.forEach(function(btn){
        btn.id ?
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let kValue = btn.id//event.target.id
                hiddeTableGeneral(extractNumbers(kValue))
            })
        : null
    })

    allButtonsHiddeTableSeguimiento.forEach(function(btn){
        btn.id ?
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let kValue = btn.id//event.target.id
                hiddeTableSeguimiento(extractNumbers(kValue))
            })
        : null
    })
}

// Inicialización de arrays
let checkSelect = document.querySelectorAll('input[name="checkSelect"]'),
    maxOtQuantity = checkSelect ? checkSelect.length : 0,
    ociTotalQty = parseInt(document.getElementById('ociTotalQty').innerText);

let arrayBtnChangeStatusOt = [], arrayBtnUpdateOt = [],
    arrayBtnDeleteOt = [], arrayCheckBoxSelect = [],
    arrayBtnCheckSelectionAll = [], arrayBtnCheckSelecMasive = [],
    arrayCheckBoxNotNull = [], arrayStatusOt = [],
    arrayBtnSearchFuncion = [], arrayBtnSearchSupplier = [],
    arrayBtnSearchFuncionClean = [], arrayBtnSearchSupplierClean = [];

// Función auxiliar para buscar y agregar elementos si existen
const addElementIfExists = (selector, array, attribute = null) => {
    let element = document.getElementById(selector);
    if (element) {
        if (attribute) element.setAttribute(attribute, true);
        array.push(element);
    }
};

// Recorrido de ociTotalQty
for (let m = 0; m < ociTotalQty; m++) {
    addElementIfExists(`btnCheckSelectionAll${m}`, arrayBtnCheckSelectionAll);
    addElementIfExists(`btnCheckSelecMasive${m}`, arrayBtnCheckSelecMasive, 'disabled');
    addElementIfExists(`searchFuncion${m}`, arrayBtnSearchFuncion);
    addElementIfExists(`searchSupplier${m}`, arrayBtnSearchSupplier);

    // Recorrido de maxOtQuantity
    for (let n = 0; n < maxOtQuantity; n++) {
        addElementIfExists(`btnStatusOt${m}_${n}`, arrayBtnChangeStatusOt);
        addElementIfExists(`btnEditOt${m}_${n}`, arrayBtnUpdateOt);
        addElementIfExists(`btnDeleteOt${m}_${n}`, arrayBtnDeleteOt);
        // addElementIfExists(`checkSelect${m}_${n}`, arrayCheckBoxSelect);

        let checkBoxSelect = document.getElementById(`checkSelect${m}_${n}`);
            if (checkBoxSelect) {
                arrayCheckBoxSelect.push(checkBoxSelect);
                if (checkBoxSelect.checked) arrayCheckBoxNotNull.push(checkBoxSelect);
            }
            addElementIfExists(`lastOtStatus${m}_${n}`, arrayStatusOt);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const projectNameHidden = document.getElementById('projectNameHidden').value,
        projectNameTitle = document.getElementById('projectNameTitle'),
        projectUNegocio = document.getElementById('projectUNegocioHidden')

    let colorIconRocket = '00'
    if (projectUNegocio.getAttribute('value') == 'lineas') colorIconRocket = 'ff'
    projectNameTitle.innerHTML = `Proyecto <strong>${projectNameHidden}</strong> <i class="fa-solid fa-rocket fa-sm" style="color: #0000${colorIconRocket};"></i>`
})


// ---- Manejador de eventos para Carouseles --------------------
document.addEventListener('DOMContentLoaded', function (event) {
    let initIndex = event.eventPhase
    const arrayCarousel = []
    for (let i = 0; i<varLimMaxOciProyecto; i++) {
        if (document.getElementById(`carouselExampleControls${i}`)) arrayCarousel.push(i)
    }

    if(arrayCarousel !=[]) {
        for (let i=0; i<arrayCarousel.length; i++) {
            let myCarousel = document.getElementById(`carouselExampleControls${arrayCarousel[i]}`)
            
            myCarousel
                ? initIndex === 2
                    ? myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                    : myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
                : null

            // Detectar cuando el slide cambia
            myCarousel.addEventListener('slid.bs.carousel', function (event) {
                let slideCount = event.relatedTarget.parentElement.children.length
                let currentIndex = event.to

                // Si el slide actual es el último, deshabilita el botón "Next"
                currentIndex === slideCount - 1
                    ? myCarousel.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
                    : myCarousel.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
                
                // Si el slide actual es el primero, deshabilita el botón "Prev"
                currentIndex === 0
                    ? myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                    : myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            })
        }
    }
})

let slidesCarousel = document.getElementsByClassName('carousel-item'),
    btnInferiorCarousel = document.getElementsByName('btnInferiorCarousel')

// Función para dividir un array en subarrays de tamaño especificado
function dividirArrayEnSubarrays(array, tamanoSubarray) {
    const subarrays = []
    for (let i = 0; i < array.length; i += tamanoSubarray) {
        subarrays.push(array.slice(i, i + tamanoSubarray));
    }
    return subarrays
}

const arrayOriginal = Array.from(slidesCarousel),
    arrayOriginalBtn = Array.from(btnInferiorCarousel)

// Dividir el array en subarrays de 12 elementos cada uno
const subarrays = dividirArrayEnSubarrays(arrayOriginal, 12),
    subarrayBtns = dividirArrayEnSubarrays(arrayOriginalBtn, 12);

function activarElemento(subarray, index) {
    if (subarray.length > 0) {
        // Si el índice está dentro del rango, activamos el elemento correspondiente
        const safeIndex = (index >= 0 && index < subarray.length) ? index : 0;
        subarray[safeIndex].classList.add('active');
    }
}

// Convertimos el valor de slideHidden a entero una vez
const slideHidden = document.getElementById('slideHidden')
let slideIndex
slideHidden ? slideIndex = parseInt(slideHidden.value) : null

// Activamos los elementos en ambos conjuntos de subarrays
if(subarrays, subarrayBtns) {
    [subarrays, subarrayBtns].forEach(array => {
        array.forEach(subarray => {
            activarElemento(subarray, slideIndex);
        });
    });
}

// ---------------- Event Add New Ot Row to OCI --------------------
const btnAddNewRow = document.getElementById("btnAddNewRow"),
    buttonOne = document.getElementById('buttonOne')
btnAddNewRow.disabled = true 

buttonOne.addEventListener('click', () => {
    let ariaExpanded = buttonOne.getAttribute('aria-expanded')

    ariaExpanded==='true' ? btnAddNewRow.removeAttribute('disabled') : btnAddNewRow.disabled = true
})

//*********** */
tippy(btnAddNewRow, {
    content: `<strong>Límite máximo de OT 100</strong><br>
                Puedes agregar ${varLimMaxOtProyecto} OT's mas`,
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
        const numberId1 = parseInt(lastChildId.slice(-1)),
            numberId2 = parseInt(lastChildId.slice(-2))
        let numberIdLastChild

        numberId1 >= 0 && numberId2 ? numberIdLastChild = numberId2 : numberIdLastChild = numberId1;
        i = parseInt(numberIdLastChild + 1)
    }

    let otNumberValue = parseInt(document.getElementById('otNumber').value),
        opNumberValue = parseInt(document.getElementById('opNumber').value),
        otPrioValue = parseInt(document.getElementById('otPrio').value),
        otDibujadoValue = parseInt(document.getElementById('otDibujado').value),
        otSymetricoValue = parseInt(document.getElementById('otSymetrico').value),
        otUnidadValue = parseInt(document.getElementById('otUnidad').value),
        otFuncionValue = document.getElementById(`otFuncion${i-1}`).value,
        otLineaCeldaValue = document.getElementById('otLineaCelda').value,
        externoDiseno = document.getElementById(`externoDiseno${i-1}`).value

    const originalDiv = (
            `<div class="row">
                <strong id="itemNumber">Item #${i+1}</strong>
            </div>
            <!-- Prio -->
            <div class="col-auto pe-2">
                <label for="otPrio${i}" id="labelOtPrio${i}">Prio</label>
                <input type="number" name="otPrio${i}" id="otPrio${i}" class="form-control mt-2" min="1" max="999"
                placeholder="Prio OT" value="${otPrioValue + i}">
            </div>
            <!-- OT Numero -->
            <div class="col-auto pe-1">
                <label for="otNumber${i}" id="labelOtNumber${i}">OT#</label>
                <input type="number" name="otNumber${i}" id="otNumber${i}" class="form-control mt-2" min="1" max="19999"
                placeholder="# OT" value="${otNumberValue + i}">
            </div>
            <!-- OP Numero -->
            <div class="col-auto pe-2">
                <label for="opNumber${i}" id="labelOpNumber${i}">OP#</label>
                <input type="number" name="opNumber${i}" id="opNumber${i}" class="form-control mt-2" min="1" max="9999"
                placeholder="# OP" value="${opNumberValue + i * 10}">
            </div>
            <!-- OP Descripcion -->
            <div class="col-auto pe-2">
                <label for="opDescription${i}" id="labelOpDescription${i}">Descripción OP</label>
                <input type="text" name="opDescription${i}" id="opDescription${i}" class="form-control mt-2"
                placeholder="Descripción OP">
            </div>
            <!-- OT Dibujado -->
            <div class="col-auto pe-2">
                <label for="otDibujado${i}" id="labelOtDibujado${i}">Dib</label>
                <input type="number" name="otDibujado${i}" id="otDibujado${i}" class="form-control mt-2" min="0" max="999"
                    value="${otDibujadoValue}">
            </div>
            <!-- OT Symetrico -->
            <div class="col-auto pe-2">
                <label for="otSymetrico${i}" id="labelOtSymetrico${i}">Sym</label>
                <input type="number" name="otSymetrico${i}" id="otSymetrico${i}" class="form-control mt-2" min="0" max="999"
                    value="${otSymetricoValue}">
            </div>
            <!-- OT Unidad -->
            <div class="col-auto pe-2">
                <label for="otUnidad${i}" id="labelOtUnidad${i}">Unidades</label>
                <input type="number" name="otUnidad${i}" id="otUnidad${i}" class="form-control mt-2" min="1" max="9999"
                    value="${otUnidadValue}">
            </div>
            <!-- Funcion -->
            <div class="col-2 me-1">
                <label for="otFuncion${i}" id="labelOtFuncion${i}">Función</label>
                <div class="input-group mb-3">
                    <input type="text" name="otFuncion${i}" id="otFuncion${i}" class="form-control mt-2 position-relative"
                        placeholder="Función" value="${otFuncionValue}" disabled>
                    <button type="button" title="Buscar Función" id="searchFuncion${i}" class="btn btn-sm btn-primary rounded-circle ms-1 mt-3 border shadow position-absolute top-0 start-100 translate-middle">
                        <i class="fa-solid fa-database"></i>
                    </button>
                </div>
            </div>
            <!-- Linea/Celda -->
            <div class="col-2 pe-1">
                <label for="otLineaCelda${i}" id="labelOtLineaCelda${i}">Línea / Celda</label>
                <input type="text" name="otLineaCelda${i}" id="otLineaCelda${i}" class="form-control mt-2"
                    placeholder="Línea/Celda" value="${otLineaCeldaValue}">
            </div>
            <!-- Proveedor -->
            <div class="col-1 pe-1">
                <label for="externoDiseno${i}" id="labelExternoDiseno${i}">Proveedor</label>
                <div class="input-group mb-3">
                    <input type="text" name="externoDiseno${i}" id="externoDiseno${i}" class="form-control mt-2 position-relative"
                        placeholder="Proveedor" value="${externoDiseno}" disabled>
                    <button type="button" title="Buscar Proveedor" id="searchSupplier${i}" class="btn btn-sm btn-primary rounded-circle ms-1 mt-3 border shadow position-absolute top-0 start-100 translate-middle">
                        <i class="fa-solid fa-database"></i>
                    </button>
                </div>
            </div>
            <div class="col-auto mx-auto">
                <div class="d-flex align-items-center justify-content-center">
                    <button title="Eliminar fila" name="btnRemoveRow" type="button" id="btnRemoveRow${i}" value="${i}" class="btn btn-danger rounded-circle m-2 border border-2 shadow">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>    
            </div>`
    )

    // Función para ocultar el botón de remover
    function hideRemoveButton(index) {
        const btnRemoveItem = document.getElementById(`btnRemoveRow${index}`);
        if (btnRemoveItem) btnRemoveItem.style.display = 'none';
    }

    // Lógica principal
    if (i !== 1) hideRemoveButton(i - 1);
    if (i >= varLimMaxOtProyecto) btnAddNewRow.disabled = true;

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'row my-2');
    newDiv.id = `otItemRow${i}`;

    // Configurar el contenido del nuevo div según el valor de i
    i === 1
        ? newDiv.innerHTML = `<hr class="my-2"> ${originalDiv} <hr class="my-2">`
        : newDiv.innerHTML = i === parseInt(varLimMaxOtProyecto+1) ? originalDiv : originalDiv + `<hr class="my-2">`

    parentDiv.appendChild(newDiv)
    const otQty = document.getElementById("otQuantity")
    otQty.value = i+1

    let removeButtons = document.querySelectorAll('button[name="btnRemoveRow"]'),
        lastRemoveButton = removeButtons[removeButtons.length-1]
    
        if (lastRemoveButton) {
            lastRemoveButton.addEventListener("click", (event) => {
                event.preventDefault()
                let idBtnRemoveRow = lastRemoveButton.id
                removeRow(idBtnRemoveRow)
            })
        }
    //*************** ToolTip cantidad de OT a agregar *************** */
    let contentMessage;
    if (i < (varLimMaxOtProyecto-1)) {
        contentMessage = `<strong>Límite máximo de OT (100)</strong><br> 
                        Puedes agregar ${varLimMaxOtProyecto - i} OT's más`;
    } else if (i == (varLimMaxOtProyecto-1)) {
        contentMessage = `<strong>Límite máximo de OT (100)</strong><br> 
                        Puedes agregar 1 OT más`;
    }

    if (i <= (varLimMaxOtProyecto-1)) {
        tippy(btnAddNewRow, {
            content: contentMessage,
            allowHTML: true,
            maxWidth: 350,
            inlinePositioning: true,
            arrow: true,
            animation: 'shift-away',
            theme: 'material',
            interactive: false,
            hideOnClick: true
        });
    }
    //*************************************** */
    // Recorrido de varLimMaxOtProyecto
    for (let m = 0; m < varLimMaxOtProyecto; m++) {
        addElementIfExists(`searchFuncion${m}`, arrayBtnSearchFuncion);
        addElementIfExists(`searchSupplier${m}`, arrayBtnSearchSupplier);
    }

    arrayBtnSearchFuncionClean = [...new Set(arrayBtnSearchFuncion)];
    arrayBtnSearchSupplierClean = [...new Set(arrayBtnSearchSupplier)];

    arrayBtnSearchFuncionClean.forEach(function(element) {
        if (element) {
            element.addEventListener('click', async (event) => {
                let idFuncion = (element.id).replace(/\d+$/, '');
                event.preventDefault();
    
                function obtenerNumeroFinal(element) {
                    let match = element.id.match(/\d+$/);
                    return match ? parseInt(match[0], 10) : null;
                }
                let idPermisoNumero =  obtenerNumeroFinal(element)
                event.stopPropagation();
                event.stopImmediatePropagation();
    
                try {
                    await cargarFuncion(idFuncion, idPermisoNumero);
    
                } catch (error) {
                    const titulo = 'Error al cargar las funciones',
                        message = error,
                        icon = 'error'
                    messageAlertSelection(titulo, message, icon)
                }
            }, { once: true });
        }
    })

    arrayBtnSearchSupplierClean.forEach(function(element) {
        if (element) {
            element.addEventListener('click', async (event) => {
                let idPermiso = (element.id).replace(/\d+$/, '');
                event.preventDefault();
    
                function obtenerNumeroFinal(element) {
                    let match = element.id.match(/\d+$/);
                    return match ? parseInt(match[0], 10) : null;
                }
                let idPermisoNumero =  obtenerNumeroFinal(element)
                event.stopPropagation();
                event.stopImmediatePropagation();
    
                try {
                    await cargarProveedor(idPermiso, idPermisoNumero);
    
                } catch (error) {
                    const titulo = 'Error al cargar los proveedores',
                        message = error,
                        icon = 'error'
                    messageAlertSelection(titulo, message, icon)
                }
            }, { once: true });
        }
    })
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
        let tippyContent = `<strong>Límite máximo de OT (100)</strong><br>
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

    if (i > 1 && i <= varLimMaxOtProyecto) {
        let tippyFormula = ((varLimMaxOtProyecto+1)-i)+1
        tippyLabel(i, tippyFormula)

    } else if (i == 1) {
        let tippyFormula = (varLimMaxOtProyecto+1)-i
        tippyLabel(i, tippyFormula)
    }
}

const formulario = document.getElementById("formNewOtLineas"),
    radios = document.querySelectorAll('[name="ociNumber"]'),
    tituloForm = document.getElementById('tituloForm'),
    projectNameHidden = document.getElementById('projectNameHidden').value,
    projectNumberId = document.getElementById(`projectIdHidden`).value,
    ociNumberK = document.getElementById('ociNumberK'),
    ociNumberHidden = document.getElementById('ociNumberHidden'),
    aliasNameHidden = document.getElementById('ociAliasHidden'),
    clientId = document.getElementById('clientIdHidden')

// ------------- function bucle do/while para encontrar ultima OT ----------
function lastOtNumberFn(i) {
    let n = varLimMaxOciProyecto,
        k = i || varLimMaxOciProyecto

    do {
        let lastOtNumber = document.getElementById(`lastOtNumber${k}_${n}`),
            lastOpNumber = document.getElementById(`lastOpNumber${k}_${n}`)

        if (lastOtNumber && lastOpNumber) {
            let otNumberValue = document.getElementById('otNumber'),
                opNumberValue = document.getElementById('opNumber'),
                lastOtNumberValue = parseInt(document.getElementById(`lastOtNumber${k}_${n}`).innerHTML),
                lastOpNumberValue = parseInt(document.getElementById(`lastOpNumber${k}_${n}`).innerHTML)

            otNumberValue.value = lastOtNumberValue + 1
            opNumberValue.value = lastOpNumberValue + 10
            break;
        }

        // Restar 1 a 'n' y ajustar 'k' si es necesario
        if (n > 0) {
            n--
        } else if (k > 0) {
            k--
            n = varLimMaxOciProyecto // 24
        } else {
            break;
        }
    } while (true)
}

//-------------------- Boton agregar nuevas OT's a OCI ------------------------
function radioSelected(radioSelectedValue, elementoId) {
    // console.log('616- radioSelectedValue: ', radioSelectedValue)
    const radioSelected = document.getElementById(`radioSelectedValue${elementoId}`)
    radioSelected.checked = true
    tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${radioSelected.value}</strong> - Alias: "${radioSelected.getAttribute('value2')}" <br>
        Proyecto: <strong>${projectNameHidden}</strong>`
    
    ociNumberK.value = extractNumbers(elementoId)
    ociNumberHidden.value = radioSelected.value
    //console.log('ociNumberHidden.value', ociNumberHidden.value)
    aliasNameHidden.value = radioSelected.getAttribute('value2')
    lastOtNumberFn(extractNumbers(elementoId))
    formulario.scrollTo({ behavior: 'smooth', block: 'start', left:0, top:0 })

    return (ociNumberHidden.value)
}

let arrayBtnAddOtFormSelected = []
for (let i=0; i<radios.length; i++) {
    let btnAddOtFormSelected = document.getElementById(`btnAddOtFormSelected${i}`)
    if (btnAddOtFormSelected) arrayBtnAddOtFormSelected.push(btnAddOtFormSelected)
}

arrayBtnAddOtFormSelected.forEach(function(elemento) {
    if (elemento) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const radioSelectedValue = elemento.id
            ociNumberHidden.value = radioSelected(radioSelectedValue, elemento.value)
            let radioSelectedAlias = document.getElementById(`radioSelectedValue${elemento.value}`)
            aliasNameHidden.value = radioSelectedAlias.getAttribute('value2')
            lastOtNumberFn(elemento.id)
            formulario.scrollIntoView({ behavior: 'smooth', top:0 })
        })
    }
})

for (let i=0; i<radios.length; i++) {
    radios[i].addEventListener("change", (event) => {
        event.preventDefault()
        let ociSeleccionada = event.target.value
        let ociAliasSeleccionada = event.target.getAttribute('value2')
        tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${ociSeleccionada}</strong> - Alias: <strong>"${ociAliasSeleccionada}"</strong><br>
            Proyecto: <strong>${projectNameHidden}</strong>`
        ociNumberK.value = i
        ociNumberHidden.value = ociSeleccionada
        aliasNameHidden.value =  ociAliasSeleccionada
        lastOtNumberFn(i)
    })
}

//------- Change OT status ----------------
function messageChangeOtStatus(
    payload, 
    ociKNumber, 
    otKNumber
) {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
        Swal.fire({
            title: `Cambio status de OT#${payload.otNumber} ${payload.otDescription}`,
            position: 'center',
            html: `El status de la OT#<strong>${payload.otNumber}</strong> se modificará a
                    <span class="badge rounded-pill bg-${ payload.statusOt==='A' ? 'danger' : 'primary' } text-white">
                    ${ payload.statusOt==='A' ? 'Inactivo' : 'Activo' }
                    </span> y ${ payload.statusOt==='A' ? '<b>no</b>' : '' } podrá ingresar o modificar datos en esta OT.
                    <form id="formChangeStatusOt${payload.idProjectSelected}" action="/api/proyectos/updateStatusOt/${payload.idProjectSelected}" method="post" style="display: none;">
                        <fieldset>
                            <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                            <input type="hidden" name="otKNumberHidden" value="${otKNumber}">
                            <input type="hidden" name="statusOtHidden" value=${ payload.statusOt==='A' ? "Inactivo" : "Activo" }>
                        </fieldset>
                    </form>`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'

        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formChangeStatusOt${payload.idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El status de la OT#<strong>${payload.otNumber}</strong>, se modificó con éxito!`
                })

            } else {
                Swal.fire(
                    `Status de OT#${payload.otNumber} no modificado!`,
                    `El status de la OT#<strong>${payload.otNumber}</strong>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
}

//---- Update OT Data ----------------
function messageUpdateOt(
    payload,
    ociKNumber,
    otKNumber
) {
    // console.log('payload: ', payload)

    let numberKOci = parseInt(ociKNumber),
        numberKOt = parseInt(otKNumber),
        numberItem = parseInt(payload.otItem),
        numberOt = parseInt(payload.otNumber),
        numberOp = parseInt(payload.opNumber),
        numberPrio = parseInt(payload.otPrio),
        numberDibujado = parseInt(payload.otDibujado),
        numberSymetrico = parseInt(payload.otSymetrico),
        numberUnidad = parseInt(payload.otUnidad) || 0,
        checked = 'checked',
        initialFlag = Boolean(false),
        bgColorStatus = 'background-color: #dd555560;'

    if (payload.statusOt !== 'A') checked = ''
    if (!payload.flag) initialFlag = Boolean(true)
    if (payload.statusOt == 'A') bgColorStatus='background-color: #55dd5560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let html = `<form id="formUpdateOt${payload.idProjectSelected}" action="/api/proyectos/updateOt/${payload.idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-3">
                                <label for="numberOtModal" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="number" name="numberOt" id="numberOtModal" class="form-control"
                                    placeholder="Número OT" value="${numberOt}" disabled required>
                            </div>

                            <div class="col-5 my-auto">
                                <input class="form-check-input" type="checkbox" name="confirmationNumberOt" id="confirmationNumberOt" value="true">
                                <label class="form-check-label" for="confirmationNumberOt">Confirmar Cambio N° OT</label>
                            </div>
                            
                            <div class="col-4" style="${bgColorStatus}">
                                <label for="statusOtForm" class="form-label d-flex justify-content-start ms-1">Status OT</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactiva</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOtForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOtForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusOtForm">Activa</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-1">
                                <label for="itemOt" class="form-label d-flex justify-content-start ms-1">Item #</label>
                                <input type="text" name="itemOt" id="itemOt" class="form-control disabled"
                                    value="${numberItem}">
                            </div>
                            <div class="col-auto">
                                <label for="prioOt" class="form-label d-flex justify-content-start ms-1">Prio</label>
                                <input type="number" name="prioOt" id="prioOt" class="form-control" min="0" max="999" value="${numberPrio}"
                                    placeholder="Prio OT">
                            </div>
                            <div class="col-3">
                                <label for="descriptionOt" class="form-label d-flex justify-content-start ms-1">Descripción OT</label>
                                <input type="text" name="descriptionOt" id="descriptionOt" class="form-control"
                                    placeholder="Descripción OT" value="${payload.otDescription}" required>
                            </div>
                            
                            <div class="col-auto">
                                <label for="dibujadoOt" class="form-label d-flex justify-content-start ms-1" >Dib</label>
                                <input type="number" name="dibujadoOt" id="dibujadoOt" class="form-control" min="0" max="999"
                                    value="${numberDibujado}">
                            </div>
                            
                            <div class="col-auto">
                                <label for="symetricoOt" class="form-label d-flex justify-content-start ms-1">Sym</label>
                                <input type="number" name="symetricoOt" id="symetricoOt" class="form-control" min="0" max="999"
                                    value="${numberSymetrico}">
                            </div>
                            
                            <div class="col-auto">
                                <label for="unidadOt" class="form-label d-flex justify-content-start ms-1">Unidades</label>
                                <input type="number" name="unidadOt" id="unidadOt" class="form-control" min="1" max="9999"
                                    value="${numberUnidad}">
                            </div>
                            <div class="col-2">
                                <label for="numeroOp" class="form-label d-flex justify-content-start ms-1">Número OP</label>
                                <input type="number" name="numeroOp" id="numeroOp" class="form-control"
                                    placeholder="Numero Op" value="${numberOp}" required>
                            </div>
                        </div>

                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="funcionOt" class="form-label d-flex justify-content-start ms-1">Función</label>                                
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control position-relative" id="funcionOt" name="funcionOt" placeholder="Función"
                                        aria-label="Funcion" aria-describedby="searchFuncionModal" value="${payload.otFuncion}" disabled>
                                    <button type="button" title="Buscar Función" id="searchFuncionModal" class="btn btn-sm btn-primary rounded-circle ms-1 mt-3 border shadow position-absolute top-0 start-100 translate-middle">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-auto">
                                <label for="lineaCeldaOt" class="form-label d-flex justify-content-start ms-1">Línea / Celda</label>
                                <input type="text" name="lineaCeldaOt" id="lineaCeldaOt" class="form-control"
                                    placeholder="Línea/Celda" value=${payload.otLineaCelda}>
                            </div>
                            <div class="col-4">
                                <label for="supplierOt" class="form-label d-flex justify-content-start ms-1">Proveedor externo</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="supplierOt" name="supplierOt" class="form-control position-relative"
                                        placeholder="Porveedor" value="${payload.otSupplier}" disabled>
                                    <button type="button" title="Buscar Proveedor" id="searchSupplierModal" class="btn btn-sm btn-primary rounded-circle ms-1 mt-3 border shadow position-absolute top-0 start-100 translate-middle">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </div>     
                            </div>                      
                        </div> 
                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                            <input type="hidden" name="otNumberHidden" id="otNumberHidden${numberKOt}" value="${numberOt}">
                    </fieldset>
                </form>`

    if(payload.idProjectSelected && numberOt) {
        Swal.fire({
            title: `Actualizar OT# ${numberOt} - OP# ${numberOp} ${payload.otDescription}`,
            position: 'center',
            html: html,
            width: 1000,
            imageUrl: `${payload.imageOci}`,
            imageWidth: `20%`,
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptarPrimerModal = document.getElementsByClassName('swal2-confirm');
                btnAceptarPrimerModal[0].setAttribute('id','btnAceptarModal')
                btnAceptarPrimerModal[0].style = "cursor: not-allowed;"
                btnAceptarPrimerModal[0].disabled = true;

                //-----Btns Buscar en BBDD la Funcion --------------
                const searchFuncionModal = document.getElementById('searchFuncionModal')
                const searchSupplierModal = document.getElementById('searchSupplierModal')

                async function cargarFuncionModal(idPermiso) {
                    const permisos = {
                        'searchFuncionModal': {
                            permiso: 'funcion',
                            tituloSeguimiento: 'Lista funciones',
                            inputTarget: 'funcionOt'
                        },
                        'searchSupplierModal': {
                            permiso: 'proveedor',
                            tituloSeguimiento: 'Proveedor',
                            inputTarget: 'supplierOt'
                        }
                    };
                    
                    const { permiso, tituloSeguimiento, inputTarget } = permisos[idPermiso] || {};
                
                    if (!permiso || !tituloSeguimiento || !inputTarget) {
                        throw new Error(`Permiso no encontrado para id:', ${idPermiso}`)
                    }
                
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        const url = `../../../api/lineas/searchFunciones`
                        const response = await fetch(url, {
                            method: "GET",
                            headers: myHeaders,
                            mode: 'cors',
                            cache: 'default',
                        });
                        
                        if(!response.ok ){
                            throw new Error(`Error en la solicitud`);
                        }

                        const funciones = await response.json();
                        const arrayFuncionesEspecificas = [], arrayFuncionesAll = [];

                        if (funciones && funciones.length > 0) {
                            funciones.forEach((funcion, i) => {
                                const funcionHTML = `
                                    <label>
                                        <span id="${funcion._id}" class="badge rounded-pill ${funcion.especifica ? 'bg-light' : 'bg-info'} text-dark my-2">
                                            <input id="${i}" class="form-check-input mb-1" type="radio"
                                                name="radioFunciones" value="${funcion.funcion}">
                                            ${funcion.funcion}
                                        </span>
                                    </label>`;
                
                                if (funcion.status) {
                                    funcion.especifica
                                        ? arrayFuncionesEspecificas.push(funcionHTML)
                                        : arrayFuncionesAll.push(funcionHTML);
                                }    
                            });
                
                            const html = `
                                <hr>
                                <label>Funciones Generales</label>
                                <div name='container' class="container">
                                    ${arrayFuncionesAll.join(' ')}
                                </div>
                                <hr>
                                <label>${tituloSeguimiento} (Solo const. Mec)</label>
                                <div name='container' class="container">
                                    ${arrayFuncionesEspecificas.join(' ')}
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

                                    const radios = document.getElementsByName('radioFunciones');
                                    radios.forEach((radio) => {
                                        radio.addEventListener('change', () => {
                                            btnAceptar.style.cursor = "pointer";
                                            btnAceptar.disabled = false;
                                        });
                                    });
                                }
                                
                            }).then((result) => {
                                const radioSelected = document.querySelector('input[name="radioFunciones"]:checked') 
                                if (result.isConfirmed && radioSelected) {
                                    if (idPermiso==='searchFuncionModal') {
                                        payload.otFuncion = radioSelected.value
                                    } else {
                                        payload.otSupplier = radioSelected.value
                                    }
                                    payload.flag = true
                                    // Al cerrar el segundo modal, reabrir el primer modal
                                    messageUpdateOt(payload, ociKNumber, otKNumber);
                                    
                                } else {
                                    const titulo = 'Función no seleccionada',
                                        message = 'No ha seleccionado ninguna función!',
                                        icon = 'warning'
                                    messageAlertSelection(titulo, message, icon)
                                    payload.flag = false
                                    // Al cerrar el segundo modal, reabrir el primer modal
                                    setTimeout(() => {
                                        messageUpdateOt(payload, ociKNumber, otKNumber);
                                    }, 500)
                                }
                            });
                            
                        } else {
                            throw new Error(`No hay funciones que seleccionar`);
                        }
                
                    } catch (error) {
                        const titulo = 'Error',
                            message = `${error}`,
                            icon = 'error'
                        messageAlertSelection(titulo, message, icon)
                    }
                }

                async function cargarProveedorModal(idPermiso) {
                    const permisos = {
                        'searchSupplierModal': {
                            permisoProveedor: 'diseno',
                            tituloSeguimiento: 'Proveedores Diseño',
                            inputTarget: 'supplierOt'
                        },
                        'searchSimulationSupplierModal': {
                            permisoProveedor: 'simulacion',
                            tituloSeguimiento: 'Proveedores Simulación',
                            inputTarget: 'supplierOt'
                        }
                    };
                    
                    const { permisoProveedor, tituloSeguimiento, inputTarget } = permisos[idPermiso] || {};
                
                    if (!permisoProveedor || !tituloSeguimiento || !inputTarget) {
                        throw new Error(`Permiso no encontrado para id:', ${idPermiso}`)
                    }
                
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        const url = `../../../api/proveedores/searchSuppliersAll`
                        const response = await fetch(url, {
                            method: "GET",
                            headers: myHeaders,
                            mode: 'cors',
                            cache: 'default',
                        });
                        
                        if(!response.ok ){
                            throw new Error(`Error en la solicitud`);
                        }
                        
                        const suppliers = await response.json();
                        const arrayProveedoresEspecificos = [], arraySuppliersAll = [];

                        if (suppliers && suppliers.length > 0) {
                            suppliers.forEach((supplier, i) => {
                                const supplierHTML = `
                                    <label>
                                        <span id="${supplier._id}" class="badge rounded-pill ${supplier.type === `${permisoProveedor}` ? 'bg-info text-dark' : 'bg-secondary text-light'}  my-2">
                                            <input id="${i}" class="form-check-input mb-1" type="radio"
                                                name="radioProveedores" value="${supplier.designation}">
                                            ${supplier.designation}
                                        </span>
                                    </label>`;
                
                                if (supplier.status) {
                                    supplier.type === `${permisoProveedor}`
                                        ? arrayProveedoresEspecificos.push(supplierHTML)
                                        : arraySuppliersAll.push(supplierHTML);
                                }    
                            });
                
                            const html = `
                                <hr>
                                <label>${tituloSeguimiento}</label>
                                <div name='container' class="container">
                                    ${arrayProveedoresEspecificos.join(' ')}
                                </div>
                                <hr>
                                <label>Proveedores Simulación</label>
                                <div name='container' class="container">
                                    ${arraySuppliersAll.join(' ')}
                                </div>
                                <hr>`;

                            Swal.fire({
                                title: 'Proveedores',
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

                                    const radios = document.getElementsByName('radioProveedores');
                                    radios.forEach((radio) => {
                                        radio.addEventListener('change', () => {
                                            btnAceptar.style.cursor = "pointer";
                                            btnAceptar.disabled = false;
                                        });
                                    });
                                }
                                
                            }).then((result) => {
                                const radioSelected = document.querySelector('input[name="radioProveedores"]:checked') 
                                if (result.isConfirmed && radioSelected) {
                                    if (idPermiso==='searchSupplierModal') {
                                        payload.otSupplier = radioSelected.value
                                    } else {
                                        payload.otFuncion = radioSelected.value
                                    }
                                    payload.flag = true
                                    // Al cerrar el segundo modal, reabrir el primer modal
                                    messageUpdateOt(payload, ociKNumber, otKNumber);
                                    
                                } else {
                                    const titulo = 'Proveedor no seleccionado',
                                        message = 'No ha seleccionado ningún proveedor!',
                                        icon = 'warning'
                                    messageAlertSelection(titulo, message, icon)
                                    payload.flag = false
                                    // Al cerrar el segundo modal, reabrir el primer modal
                                    setTimeout(() => {
                                        messageUpdateOt(payload, ociKNumber, otKNumber);
                                    }, 500)
                                }
                            });
                            
                        } else {
                            throw new Error(`No hay proveedores que seleccionar`);
                        }
                
                    } catch (error) {
                        const titulo = 'Error',
                            message = `${error}`,
                            icon = 'error'
                        messageAlertSelection(titulo, message, icon)
                    }
                }

                searchFuncionModal.addEventListener('click', async (event) => {
                    // Ocultar temporalmente el primer modal
                    Swal.close();

                    let idFuncion = searchFuncionModal.id
                    event.preventDefault();

                    try {
                        await cargarFuncionModal(idFuncion);

                    } catch (error) {
                        const titulo = 'Error al cargar las funciones',
                            message = error,
                            icon = 'error'
                        messageAlertSelection(titulo, message, icon)
                    }
                });

                searchSupplierModal.addEventListener('click', async (event) => {
                    // Ocultar temporalmente el primer modal
                    Swal.close();

                    let idPermiso = searchSupplierModal.id
                    event.preventDefault();

                    try {
                        await cargarProveedorModal(idPermiso);

                    } catch (error) {
                        const titulo = 'Error al cargar los proveedores',
                            message = error,
                            icon = 'error'
                        messageAlertSelection(titulo, message, icon)
                    }
                });

                if (!initialFlag) {
                    btnAceptarPrimerModal = document.getElementById('btnAceptarModal');
                    btnAceptarPrimerModal.style.cursor = "pointer";
                    btnAceptarPrimerModal.disabled = false;
                }
            }
            
        }).then((result) => {
            if (result.isConfirmed) {
                if (payload.otNumber) {
                    document.getElementById(`funcionOt`).removeAttribute('disabled')
                    document.getElementById(`supplierOt`).removeAttribute('disabled')
                }
                document.getElementById(`formUpdateOt${payload.idProjectSelected}`).submit()
                setTimeout(() => {
                    Toast.fire({
                        icon: 'success',
                        title: `La OT# <b>${numberOt}</b>, se modificó con éxito!`
                    })
                }, 1500)

            } else if (result.dismiss === 'cancel') {
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

    let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            let key = event.key,
                forbiddenChars = /[#"$%?¡¿^/()=!'~`\\*{}\[\]<>@]/;

            if (forbiddenChars.test(key)) {
                event.preventDefault()
                input.classList.add("border", "border-danger", "border-2")

            } else {
                input.classList.remove("border", "border-danger", "border-2")
            }
        })
    })
}

//---- Delete OT ----------------
function messageDeleteOt(
    payload,
    ociKNumber,
    otKNumber
    ) {
        console.log('payload: ', payload)
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `
        <div class="container m-auto">
            La OT#<strong>${payload.otNumber}</strong>, Descripcion: "<b>${payload.otDescription}</b>",
            Status: <span class="badge rounded-pill bg-${ payload.statusOt==='A' ? 'primary' : 'danger' } text-white">
                        ${ payload.statusOt==='A' ? 'Activo' : 'Inactivo' }
                    </span>
            y toda su información interna se eliminará completamente.
            <br>
            <hr>
            Está seguro que desea continuar?
            <form id="formDeleteOt${payload.idProjectSelected}" action="/api/proyectos/deleteOt/${payload.idProjectSelected}" method="post">
                <fieldset>
                    <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                    <input type="hidden" name="otKNumberHidden" value="${otKNumber}">
                </fieldset>
            </form>
        </div>    
                    `
    
    if(payload.idProjectSelected && payload.otNumber) {
        Swal.fire({
            title: `Eliminar OT# ${payload.otNumber} - ${payload.otDescription}`,
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
                document.getElementById(`formDeleteOt${payload.idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OT#<strong>${payload.otNumber}</strong>, se eliminó correctamente!`
                })
            } else {
                Swal.fire(
                    `OT# ${payload.otNumber}`,
                    `La OT#<b>${payload.otNumber}</b>, no se eliminó!`,
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
            text: `La OT#<strong>${payload.otNumber}</strong>, no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

//FIXME:
function updateBtnCheckSelecMasive(idOci) {     
    const spanIds = [
        "spanCheckSelecMasive", "spanCheckSelecMasiveR14", "spanCheckSelecMasiveProc3d",
        "spanCheckSelecMasiveInfo80", "spanCheckSelecMasiveInfo100", "spanCheckSelecMasiveDisPrima",
        "spanCheckSelecMasiveDisSeg", "spanCheckSelecMasiveSim0", "spanCheckSelecMasiveSim1",
        "spanCheckSelecMasiveSim2_3", "spanCheckSelecMasiveSim4Prima", "spanCheckSelecMasiveSim4Seg",
        "spanCheckSelecMasiveSim5"
    ];

    const spans = spanIds.map(id => document.getElementById(`${id}${idOci}`)),
        btnMasive = document.getElementById(`btnCheckSelecMasive${idOci}`),
        btnSelectAll = document.getElementById(`btnCheckSelectionAll${idOci}`),
        cantidadSeleccionados = document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:checked`).length,
        cantidadTotalXTabla = document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:not(:disabled)`).length;

    // Función para actualizar el estado de los spans
    const updateSpans = (value) => {
        spans.forEach(span => span.innerText = value);
    };

    // Condiciones para actualizar los botones
    if (cantidadSeleccionados > 0) {
        if (cantidadSeleccionados === cantidadTotalXTabla) {
            btnSelectAll.title = 'Des-Seleccionar todas las OT';
            btnSelectAll.classList.replace("btn-primary", "btn-danger");
            btnSelectAll.value = 1;
        } else {
            btnSelectAll.title = 'Seleccionar todas las OT';
            btnSelectAll.classList.replace("btn-danger", "btn-primary");
            btnSelectAll.value = 0;
        }

        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (${cantidadSeleccionados}/${cantidadTotalXTabla})`;
        updateSpans(cantidadSeleccionados);

    } else {
        btnSelectAll.title = 'Seleccionar todas las OT';
        btnSelectAll.classList.replace("btn-danger", "btn-primary");
        btnSelectAll.value = 0;

        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (0)`;
        updateSpans(0);
    }
}

arrayBtnChangeStatusOt.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnStatusOt/;

            // Eliminar el texto inicial de la cadena
            let idOtOci = elementoId.replace(regex, ''),
                arrayOciOtSelected = idOtOci.split('_'),
                ociKNumber = parseInt(arrayOciOtSelected[0]),
                otKNumber = parseInt(arrayOciOtSelected[1])

            const payload = {
                idProjectSelected : document.getElementById('projectIdHidden').value,
                otNumber : parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent),
                opNumber : parseInt(document.getElementById(`lastOpNumber${idOtOci}`).textContent),
                statusOt : cleanString(document.getElementById(`lastOtStatus${idOtOci}`).textContent),
                otItem : parseInt(document.getElementById(`lastItemNumber${idOtOci}`).textContent),
                otPrio : parseInt(document.getElementById(`lastPrioNumber${idOtOci}`).textContent),
                otDibujado : parseInt(document.getElementById(`otDibujado${idOtOci}`).textContent),
                otSymetrico : parseInt(document.getElementById(`otSymetrico${idOtOci}`).textContent),
                otUnidad : parseInt(document.getElementById(`otUnidad${idOtOci}`).textContent),
                otDescription : cleanString(document.getElementById(`lastOpDescription${idOtOci}`).textContent),
                otFuncion :  cleanString(document.getElementById(`otFuncion${idOtOci}`).textContent),
                otLineaCelda :  cleanString(document.getElementById(`otLineaCelda${idOtOci}`).textContent),
                otSupplier :  cleanString(document.getElementById(`otSupplier${idOtOci}`).textContent),
                ociImage : document.getElementById(`imageOciHeader${ociKNumber}`).src,
                flag : false
            }
            
            messageChangeOtStatus(
                payload,
                ociKNumber,
                otKNumber
            )
        })
    }
})

arrayBtnUpdateOt.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnEditOt/;

            // Eliminar el texto inicial de la cadena
            let idOtOci = elementoId.replace(regex, ''),
                arrayOciOtSelected = idOtOci.split('_'),
                ociKNumber = parseInt(arrayOciOtSelected[0]),
                otKNumber = parseInt(arrayOciOtSelected[1])

            const payload = {
                idProjectSelected : document.getElementById('projectIdHidden').value,
                otNumber : parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent),
                opNumber : parseInt(document.getElementById(`lastOpNumber${idOtOci}`).textContent),
                statusOt : cleanString(document.getElementById(`lastOtStatus${idOtOci}`).textContent),
                otItem : parseInt(document.getElementById(`lastItemNumber${idOtOci}`).textContent),
                otPrio : parseInt(document.getElementById(`lastPrioNumber${idOtOci}`).textContent),
                otDibujado : parseInt(document.getElementById(`otDibujado${idOtOci}`).textContent),
                otSymetrico : parseInt(document.getElementById(`otSymetrico${idOtOci}`).textContent),
                otUnidad : parseInt(document.getElementById(`otUnidad${idOtOci}`).textContent),
                otDescription : cleanString(document.getElementById(`lastOpDescription${idOtOci}`).textContent),
                otFuncion :  cleanString(document.getElementById(`otFuncion${idOtOci}`).textContent),
                otLineaCelda :  cleanString(document.getElementById(`otLineaCelda${idOtOci}`).textContent),
                otSupplier :  cleanString(document.getElementById(`otSupplier${idOtOci}`).textContent),
                ociImage : document.getElementById(`imageOciHeader${ociKNumber}`).src,
                flag : false
            }

            messageUpdateOt(
                payload,
                ociKNumber,
                otKNumber,
            )
        })
    }
})

arrayBtnDeleteOt.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnDeleteOt/;

            // Eliminar el texto inicial de la cadena
            let idOtOci = elementoId.replace(regex, ''),
                arrayOciOtSelected = idOtOci.split('_'),
                ociKNumber = parseInt(arrayOciOtSelected[0]),
                otKNumber = parseInt(arrayOciOtSelected[1])

            const payload = {
                idProjectSelected : document.getElementById('projectIdHidden').value,
                otNumber : parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent),
                opNumber : parseInt(document.getElementById(`lastOpNumber${idOtOci}`).textContent),
                statusOt : cleanString(document.getElementById(`lastOtStatus${idOtOci}`).textContent),
                otItem : parseInt(document.getElementById(`lastItemNumber${idOtOci}`).textContent),
                otPrio : parseInt(document.getElementById(`lastPrioNumber${idOtOci}`).textContent),
                otDibujado : parseInt(document.getElementById(`otDibujado${idOtOci}`).textContent),
                otSymetrico : parseInt(document.getElementById(`otSymetrico${idOtOci}`).textContent),
                otUnidad : parseInt(document.getElementById(`otUnidad${idOtOci}`).textContent),
                otDescription : cleanString(document.getElementById(`lastOpDescription${idOtOci}`).textContent),
                otFuncion :  cleanString(document.getElementById(`otFuncion${idOtOci}`).textContent),
                otLineaCelda :  cleanString(document.getElementById(`otLineaCelda${idOtOci}`).textContent),
                otSupplier :  cleanString(document.getElementById(`otSupplier${idOtOci}`).textContent),
                ociImage : document.getElementById(`imageOciHeader${ociKNumber}`).src,
                flag : false
            }
            
            messageDeleteOt(
                payload,
                ociKNumber,
                otKNumber
            )
        })
    }
})

arrayCheckBoxSelect.forEach(function(element) {
    element.checked = ''
    element.addEventListener('change', (event) => {
        event.preventDefault()
        const idOtOci = (event.target.id).slice(11)
        
        let rowSelectCheck = []
        if (document.getElementsByName(`rowSelected${idOtOci}`)) rowSelectCheck = Array.from(document.getElementsByName(`rowSelected${idOtOci}`))

        let idOci = extractNumbers(element.id)[0]
        //let idOt = extractNumbers(element.id)[1]

        updateBtnCheckSelecMasive(idOci)

        for (let q=0; q<rowSelectCheck.length; q++) { //12
            rowSelectCheck[q] && rowSelectCheck[q].style.cssText === "height: 7vh;"
                ? rowSelectCheck[q].setAttribute('style', "height: 7vh; background-color: #c4f0fd;")
                : rowSelectCheck[q].setAttribute('style', "height: 7vh;")
        }
    })
})

//FIXME:
arrayBtnCheckSelectionAll.forEach(element => {
    let seleccionados = seleccionarFilas = false;

    if (element) {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const idOci = parseInt(element.id.slice(20)),
                checkboxes = Array.from(document.querySelectorAll(`#tablaGeneral${idOci} tbody input[type="checkbox"]`)),
                spanIds = [
                "spanCheckSelecMasive", "spanCheckSelecMasiveR14", "spanCheckSelecMasiveProc3d",
                "spanCheckSelecMasiveInfo80", "spanCheckSelecMasiveInfo100", "spanCheckSelecMasiveDisPrima",
                "spanCheckSelecMasiveDisSeg", "spanCheckSelecMasiveSim0", "spanCheckSelecMasiveSim1",
                "spanCheckSelecMasiveSim2_3", "spanCheckSelecMasiveSim4Prima", "spanCheckSelecMasiveSim4Seg",
                "spanCheckSelecMasiveSim5" ];
            
            const spans = spanIds.map(id => document.getElementById(`${id}${idOci}`));

            let arrQueryRows = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.id) {
                    const idOciOt = checkbox.id.slice(11),
                        rowsSelectCheck = document.getElementsByName(`rowSelected${idOciOt}`),
                        statusOt = document.getElementById(`lastOtStatus${idOciOt}`);

                    if (rowsSelectCheck && statusOt.innerText === 'A') arrQueryRows.push(rowsSelectCheck)
                }
            });

            const toggleFilas = () => {
                arrQueryRows.forEach(nodeList => {
                    Array.from(nodeList).forEach(row => {
                        row.style = seleccionarFilas ? "height: 7vh;" : "height: 7vh; background-color: #c4f0fd;"; //rgb(196, 240, 253)
                    });
                });
                seleccionarFilas = !seleccionarFilas;
            };

            const toggleCheckboxes = () => {
                checkboxes.forEach(checkbox => {
                    if (!checkbox.disabled) checkbox.checked = !seleccionados;
                });
                seleccionados = !seleccionados;
            };

            const updateSpans = value => {
                spans.forEach(span => {
                    span.innerText = value;
                });
            };

            toggleFilas();
            toggleCheckboxes();

            if (element.classList.contains('btn-primary')) {
                element.classList.replace("btn-primary", "btn-danger");
                element.value = 1;
                element.title = 'Des-Seleccionar todos los ítems';
                updateSpans(arrQueryRows.length);

            } else {
                element.classList.replace("btn-danger", "btn-primary");
                element.title = 'Seleccionar todas las OT';
                updateSpans(0);
            }

            element.value == 0 ? updateSpans(0) : updateSpans(arrQueryRows.length);

            updateBtnCheckSelecMasive(idOci);
        });
    }
});

//-----Btns Buscar en BBDD la Funcion y Proveedor --------------
const userNameBanner = document.getElementById('userNameBanner').innerText

function messageAlertSelection(titulo, message, icon){
    Swal.fire(
        titulo, 
        message, 
        icon);
    return false
}


async function cargarFuncion(idFuncion, idPermisoNumero) {
    const permisos = {
        'searchFuncion': {
            permiso: 'funcion',
            tituloSeguimiento: 'Lista funciones',
            inputTarget: `otFuncion${idPermisoNumero}`
        },
        'searchFuncionModal': {
            permiso: 'funcion',
            tituloSeguimiento: 'Lista funciones',
            inputTarget: `otFuncion${idPermisoNumero}`
        },
        'searchSupplier': {
            permiso: 'proveedor',
            tituloSeguimiento: 'Proveedor',
            inputTarget: `externoDiseno${idPermisoNumero}`
        }
    };
    
    const { permiso, tituloSeguimiento, inputTarget } = permisos[idFuncion] || {};

    if (!permiso || !tituloSeguimiento || !inputTarget) {
        throw new Error(`Función no encontrada para id:', ${idFuncion}`)
    }

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const url = `../../../api/lineas/searchFunciones`
        const response = await fetch(url, {
            method: "GET",
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        });

        if(!response.ok ){
            throw new Error(`Error en la solicitud`);
        }

        const funciones = await response.json()
        let arrayFuncionesEspecificas = [], arrayFuncionesAll = [];

        if (funciones && funciones.length > 0) {
            funciones.forEach((funcion, i) => {
                const funcionHTML = `
                    <label>
                        <span id="${funcion._id}" class="badge rounded-pill ${funcion.especifica ? 'bg-warning' : 'bg-info'} text-dark my-2">
                            <input id="${i}" class="form-check-input mb-1" type="radio"
                                name="radioFunciones" value="${funcion.funcion}">
                            ${funcion.funcion}
                        </span>
                    </label>`;

                if (funcion.status) {
                    funcion.especifica
                        ? arrayFuncionesEspecificas.push(funcionHTML)
                        : arrayFuncionesAll.push(funcionHTML);
                }    
            });

            const html = `
                <hr>
                <label>Funciones Generales</label>
                <div name='container' class="container">
                    ${arrayFuncionesAll.join(' ')}
                </div>
                <hr>
                <label>${tituloSeguimiento} (Solo const. Mec)</label>
                <div name='container' class="container">
                    ${arrayFuncionesEspecificas.join(' ')}
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

                    const radios = document.getElementsByName('radioFunciones');
                    radios.forEach((radio) => {
                        radio.addEventListener('change', () => {
                            btnAceptar.style.cursor = "pointer";
                            btnAceptar.disabled = false;
                        });
                    });
                }

            }).then((result) => {
                const radioSelected = document.querySelector('input[name="radioFunciones"]:checked');
                if (result.isConfirmed && radioSelected) {
                    const inputFuncionSelected = document.getElementById(`${inputTarget}`);
                    inputFuncionSelected.value = radioSelected.value;
                    Swal.close()
                } else {
                    const titulo = 'Función no seleccionada',
                        message = 'No ha seleccionado ninguna función!',
                        icon = 'warning'
                    messageAlertSelection(titulo, message, icon)
                }
            });

        } else {
            throw new Error(`No hay funciones que seleccionar`);
        }

    } catch (error) {
        const titulo = 'Error',
            message = `${error}`,
            icon = 'error'
        messageAlertSelection(titulo, message, icon)
    }
    disabledBtnAceptar()
}

async function cargarProveedor(idPermiso, idPermisoNumero) {
    const permisos = {
        'searchSupplier': {
            permisoProveedor: 'diseno',
            tituloSeguimiento: 'Proveedores Diseño',
            inputTarget: `externoDiseno${idPermisoNumero}`
        },
        'searchSupplierModal': {
            permisoProveedor: 'diseno',
            tituloSeguimiento: 'Proveedores Diseño',
            inputTarget: `externoDiseno${idPermisoNumero}`
        },
        'searchSimulationSupplierModal': {
            permisoProveedor: 'simulacion',
            tituloSeguimiento: 'Proveedores Simulación',
            inputTarget: `externoDiseno${idPermisoNumero}`
        }
    };
    
    const { permisoProveedor, tituloSeguimiento, inputTarget } = permisos[idPermiso] || {};

    if (!permisoProveedor || !tituloSeguimiento || !inputTarget) {
        throw new Error(`Permiso no encontrado para id:', ${idPermiso}`)
    }

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const url = `../../../api/proveedores/searchSuppliersAll`
        const response = await fetch(url, {
            method: "GET",
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        });
        
        if(!response.ok ){
            throw new Error(`Error en la solicitud`);
        }

        const suppliers = await response.json(),
            arrayProveedoresEspecificos = [], arraySuppliersAll = [];

        if (suppliers && suppliers.length > 0) {
            suppliers.forEach((supplier, i) => {
                const supplierHTML = `
                    <label>
                        <span id="${supplier._id}" class="badge rounded-pill ${supplier.type === `${permisoProveedor}` ? 'bg-info text-dark' : 'bg-secondary text-light'} my-2">
                            <input id="${i}" class="form-check-input mb-1" type="radio"
                                name="radioProveedores" value="${supplier.designation}">
                            ${supplier.designation}
                        </span>
                    </label>`;

                if (supplier.status) {
                    supplier.type === `${permisoProveedor}`
                        ? arrayProveedoresEspecificos.push(supplierHTML)
                        : arraySuppliersAll.push(supplierHTML);
                }    
            });

            const html = `<hr>
                            <label>${tituloSeguimiento}</label>
                            <div name='container' class="container">
                                ${arrayProveedoresEspecificos.join(' ')}
                            </div>
                            <hr>
                            <label>Proveedores Simulación</label>
                            <div name='container' class="container">
                                ${arraySuppliersAll.join(' ')}
                            </div>
                        <hr>`;

            Swal.fire({
                title: 'Proveedores',
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

                    const radios = document.getElementsByName('radioProveedores');
                    radios.forEach((radio) => {
                        radio.addEventListener('change', () => {
                            btnAceptar.style.cursor = "pointer";
                            btnAceptar.disabled = false;
                        });
                    });
                }
            }).then((result) => {
                const radioSelected = document.querySelector('input[name="radioProveedores"]:checked');
                if (result.isConfirmed && radioSelected) {
                    const inputSupplierSelected = document.getElementById(`${inputTarget}`);
                    inputSupplierSelected.value = radioSelected.value;
                    Swal.close();
                } else {
                    const titulo = 'Proveedor no seleccionado',
                        message = 'No ha seleccionado ningún proveedor!',
                        icon = 'warning'
                    messageAlertSelection(titulo, message, icon)
                }
            });

        } else {
            throw new Error(`No hay proveedores que seleccionar`);
        }

    } catch (error) {
        const titulo = 'Error',
            message = `${error}`,
            icon = 'error'
        messageAlertSelection(titulo, message, icon)
    }
    disabledBtnAceptar()
}

arrayBtnSearchFuncion.forEach(function(element) {
    if (element) {
        element.addEventListener('click', async (event) => {
            let idFuncion = (element.id).replace(/\d+$/, '');
            event.preventDefault();

            function obtenerNumeroFinal(element) {
                let match = element.id.match(/\d+$/);
                return match ? parseInt(match[0], 10) : null;
            }
            let idPermisoNumero =  obtenerNumeroFinal(element)
            event.stopPropagation();
            event.stopImmediatePropagation();

            try {
                await cargarFuncion(idFuncion, idPermisoNumero);

            } catch (error) {
                const titulo = 'Error al cargar las funciones',
                    message = error,
                    icon = 'error'
                messageAlertSelection(titulo, message, icon)
            }
        }, { once: true });
    }
});

arrayBtnSearchSupplier.forEach(function(element) {
    if (element) {
        element.addEventListener('click', async (event) => {
            let idPermiso = (element.id).replace(/\d+$/, '');
            event.preventDefault();

            function obtenerNumeroFinal(element) {
                let match = element.id.match(/\d+$/);
                return match ? parseInt(match[0], 10) : null;
            }
            let idPermisoNumero =  obtenerNumeroFinal(element)
            event.stopPropagation();
            event.stopImmediatePropagation();

            try {
                await cargarProveedor(idPermiso, idPermisoNumero);

            } catch (error) {
                const titulo = 'Error al cargar los proveedores',
                    message = error,
                    icon = 'error'
                messageAlertSelection(titulo, message, icon)
            }
        }, { once: true });
    }
})
//-----End Btns Buscar en BBDD el Usuario Seguidor de Diseño/Simulación -----------

function messageNewOt(ociNumber, otArray, ociAlias) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    });

    const otText = otArray.length > 1 ? `OT's ${otArray.join(" - ")}` : `OT ${otArray[0]}`,
        confirmMessage = `Se agregará${otArray.length > 1 ? 'n' : ''} ${otText} a la OCI# ${ociNumber} - Alias: ${ociAlias}`,
        successMessage = `${otText}, agregada${otArray.length > 1 ? 's' : ''} con éxito!`,
        errorMessage = `${otText}, no fue${otArray.length > 1 ? 'ron' : ''} agregada${otArray.length > 1 ? 's' : ''} a la OCI# ${ociNumber}`;

    Swal.fire({
        title: 'Ingreso de datos!',
        position: 'center',
        text: confirmMessage,
        icon: 'info',
        showCancelButton: true,
        showConfirmButton: true,
    }).then((result) => {

        if (result.isConfirmed) {
            // Verifica que el formulario existe
            const formNewOt = document.getElementById('formNewOtLineas');
            if (!formNewOt) {
                console.error('Formulario no encontrado');
                return;
            }
            setTimeout(() => {
                document.querySelectorAll('[disabled]').forEach(el => el.removeAttribute('disabled'));
                document.getElementById("formNewOtLineas").submit()
            }, 750)

            setTimeout(() => {
                Toast.fire({
                    icon: 'success',
                    title: successMessage
                });
            }, 750)

        } else {
            Swal.fire(
                'OT no agregada!',
                errorMessage,
                'warning'
            );
        }
    });
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
        // console.log('otArray: ', otArray, otQuantity)
        if (otQuantity > 1) {
            for (let j = 1; j < otQuantity; j++) {
                let otNumberSelected = document.getElementById(`otNumber${j}`).value
                otArray.push(otNumberSelected)
            }
        }
        messageNewOt(ociNumberHiddenValue, otArray, ociAlias)

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `Hubo un error al seleccionar la OCI !`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,
        })
    }
})


//---------- Obtiene la lista de OT ------------
function getOtList(i) {
    const parentDiv = document.getElementById(`tablaGeneral${i}`),
        tableBody = parentDiv.lastElementChild,
        lastChild = parseInt(tableBody.childElementCount),
        k = i

    // Función auxiliar para obtener el texto de un elemento si existe
    const getElementText = id => document.getElementById(id)?.innerText || null;

    // Arrays para almacenar los datos
    let arrayOtNumber = [], arrayOpNumber = [], arrayOtStatus = [], arrayOtItem = [], arrayOtPrio = [], arrayDescripcionOt = [],
    arrayOnumber = [], arrayNnumber = [], arraySelectedCheck = [], arrayONumberSelect = [];
    
    // Configuración de mapeo de IDs a arrays
    const mappings = [
        { prefix: 'lastOtNumber', array: arrayOtNumber, isOt: true  },
        { prefix: 'lastOpNumber', array: arrayOpNumber },
        { prefix: 'lastOtStatus', array: arrayOtStatus },
        { prefix: 'lastOtItem', array: arrayOtItem },
        { prefix: 'lastOtPrio', array: arrayOtPrio },
        { prefix: 'lastOpDescription', array: arrayDescripcionOt },
    ];

    for (let n=0; n < lastChild; n++) {
        mappings.forEach(({ prefix, array, isOt }) => {
            const id = `${prefix}${k}_${n}`,
                text = getElementText(id),
                checkId = `checkSelect${k}_${n}`,
                selectCheck = document.getElementById(checkId);

            selectCheck?.checked ? arraySelectedCheck.push(`${k}_${n}`) : null

            if (text) {
                array.push(text);
                arrayOnumber.push(`${k}_${n}`);
                if (isOt) arrayNnumber.push(`${n}`);
            }
        });
    }

    // Eliminar duplicados y vacíos
    const uniqueSelectedCheck = [...new Set(arraySelectedCheck)],
        uniqueONumberSelect = [...new Set(arrayOnumber)];

    // Encontrar índices de los elementos seleccionados
    const indicesSelected = uniqueSelectedCheck.map(selected => uniqueONumberSelect.indexOf(selected)).filter(index => index !== -1);

    if (uniqueSelectedCheck.length > 0) { 
        return {
            arrayOtNumber,
            arrayOpNumber,
            arrayOtStatus,
            arrayOtItem,
            arrayOtPrio,
            arrayDescripcionOt,
            arrayOnumber,
            arrayNnumber,
            lastChild: uniqueSelectedCheck.length,
            arraySelectedCheck: uniqueSelectedCheck,
            indicesSelected,
            arrayONumberSelect: uniqueONumberSelect
        };

    } else {
        Swal.fire({
            title: `OT no seleccionada`,
            html: 'Debe seleccionar al menos una OT!',
            icon: 'warning',
            width: 400
        });
        return false;
    }
}

//---------- Obtiene los valores de la lista de OT ------------
function getOtListValues(i, idTabla, qInicial, qFinal) {
    const parentDiv = document.getElementById(idTabla),
        tableBody = parentDiv.lastElementChild,
        lastChild = parseInt(tableBody.childElementCount),
        qInicialX = parseInt(qInicial),
        qFinalX = parseInt(qFinal);
    
    let k = i;
    
    const arrays = {
        arrayProcesoR14: [], arrayRevisionProcesoR14: [],
        arrayAprobadoR14: [], arrayRevisionAprobadoR14: [],
        arrayProceso3d: [], arrayRevisionProceso3d: [],
        arrayHorasProceso3d: [], arrayRevisionHorasProceso3d: [],
        arrayAvDiseno: [], arrayRevisionAvDiseno: [],
        arrayAv50Diseno: [], arrayRevisionAv50Diseno: [],
        arrayAv80Diseno: [], arrayRevisionAv80Diseno: [],
        arrayEnvioCliente: [], arrayRevisionEnvioCliente: [],
        arrayRevisionCliente: [], arrayRevisionRevisionCliente: [],
        arrayLdmProvisoria: [], arrayRevisionLdmProvisoria: [],
        arrayAv100Diseno: [], arrayRevisionAv100Diseno: [],
        arrayAprobadoCliente: [], arrayRevisionAprobadoCliente: [],
        arrayLdmAvanceCG: [], arrayRevisionLdmAvanceCG: [],
        arrayLdmAvanceTD2: [], arrayRevisionLdmAvanceTD2: [],
        arrayLdm80: [], arrayRevisionLdm80: [],
        arrayInfoModelo: [], arrayRevisionInfoModelo: [],
        arrayLdm100: [], arrayRevisionLdm100: [],
        arrayInfo100: [], arrayRevisionInfo100: [],
        arraySim0: [], arrayRevisionSim0: [],
        arrayDocuSim0: [], arrayRevisionDocuSim0: [],
        arraySim1: [], arrayRevisionSim1: [],
        arrayVideo: [], arrayRevisionVideo: [],
        arrayInforme: [], arrayRevisionInforme: [],
        arrayPpt: [], arrayRevisionPpt: [],
        arrayS1pOp20: [], arrayRevisionS1pOp20: [],
        arraySim2: [], arrayRevisionSim2: [],
        arrayReporte: [], arrayRevisionReporte: [],
        arrayDfnProdismo: [], arrayRevisionDfnProdismo: [],
        arraySim3: [], arrayRevisionSim3: [],
        arrayMatEnsayo: [], arrayRevisionMatEnsayo: [],
        arrayMasMenos10: [], arrayRevisionMasMenos10: [],
        arrayMpAlternativo: [], arrayRevisionMpAlternativo: [],
        arrayReunionSim: [], arrayRevisionReunionSim: [],
        arrayInformeSim4: [], arrayRevisionInformeSim4: [],
        arrayGeoCopiado1: [], arrayRevisionGeoCopiado1: [],
        arrayGeoCopiado2: [], arrayRevisionGeoCopiado2: [],
        arrayHorasSim: [], arrayRevisionHorasSim: [],
        arrayGrillado: [], arrayRevisionGrillado: [],
        arrayMpEnsayada: [], arrayRevisionMpEnsayada: []
    };
    
    const mapping = {
        0: ['arrayProcesoR14', 'arrayRevisionProcesoR14'],
        1: ['arrayAprobadoR14', 'arrayRevisionAprobadoR14'],
        2: ['arrayProceso3d', 'arrayRevisionProceso3d'],
        3: ['arrayHorasProceso3d', 'arrayRevisionHorasProceso3d'],
        4: ['arrayAvDiseno', 'arrayRevisionAvDiseno'],
        5: ['arrayAv50Diseno', 'arrayRevisionAv50Diseno'],
        6: ['arrayAv80Diseno', 'arrayRevisionAv80Diseno'],
        7: ['arrayEnvioCliente', 'arrayRevisionEnvioCliente'],
        8: ['arrayRevisionCliente', 'arrayRevisionRevisionCliente'],
        9: ['arrayLdmProvisoria', 'arrayRevisionLdmProvisoria'],
        10: ['arrayAv100Diseno', 'arrayRevisionAv100Diseno'],
        11: ['arrayAprobadoCliente', 'arrayRevisionAprobadoCliente'],
        12: ['arrayLdmAvanceCG', 'arrayRevisionLdmAvanceCG'],
        13: ['arrayLdmAvanceTD2', 'arrayRevisionLdmAvanceTD2'],
        14: ['arrayLdm80', 'arrayRevisionLdm80'],
        15: ['arrayInfoModelo', 'arrayRevisionInfoModelo'],
        16: ['arrayLdm100', 'arrayRevisionLdm100'],
        17: ['arrayInfo100', 'arrayRevisionInfo100'],
        18: ['arraySim0', 'arrayRevisionSim0'],
        19: ['arrayDocuSim0', 'arrayRevisionDocuSim0'],
        20: ['arraySim1', 'arrayRevisionSim1'],
        21: ['arrayVideo', 'arrayRevisionVideo'],
        22: ['arrayInforme', 'arrayRevisionInforme'],
        23: ['arrayPpt', 'arrayRevisionPpt'],
        24: ['arrayS1pOp20', 'arrayRevisionS1pOp20'],
        25: ['arraySim2', 'arrayRevisionSim2'],
        26: ['arrayReporte', 'arrayRevisionReporte'],
        27: ['arrayDfnProdismo', 'arrayRevisionDfnProdismo'],
        28: ['arraySim3', 'arrayRevisionSim3'],
        29: ['arrayMatEnsayo', 'arrayRevisionMatEnsayo'],
        30: ['arrayMasMenos10', 'arrayRevisionMasMenos10'],
        31: ['arrayMpAlternativo', 'arrayRevisionMpAlternativo'],
        32: ['arrayReunionSim', 'arrayRevisionReunionSim'],
        33: ['arrayInformeSim4', 'arrayRevisionInformeSim4'],
        34: ['arrayGeoCopiado1', 'arrayRevisionGeoCopiado1'],
        35: ['arrayGeoCopiado2', 'arrayRevisionGeoCopiado2'],
        36: ['arrayHorasSim', 'arrayRevisionHorasSim'],
        37: ['arrayGrillado', 'arrayRevisionGrillado'],
        38: ['arrayMpEnsayada', 'arrayRevisionMpEnsayada']
    };

    for (let n = 0; n < lastChild; n++) {
        for (let q = qInicialX; q < qFinalX; q++) {
            if(document.getElementById(`resHidden${k}_${n}_${q}`)) {
                const otHidden = document.getElementById(`resHidden${k}_${n}_${q}`).value;
                const otRevisionHidden = document.getElementById(`resRevisionHidden${k}_${n}_${q}`).value;
                
                var otRevision = otRevisionHidden.split(",").pop();
                var otInfo = changeValueFromArray(otHidden.split(",")).pop();
            }

            const [infoKey, revisionKey] = mapping[q] || [];
            if (infoKey && revisionKey) {
                arrays[infoKey].push(otInfo);
                arrays[revisionKey].push(otRevision);
            }
        }
    }

    const resultMap = {
        2: ['arrayProcesoR14', 'arrayRevisionProcesoR14', 'arrayAprobadoR14', 'arrayRevisionAprobadoR14'],
        4: ['arrayProceso3d', 'arrayRevisionProceso3d', 'arrayHorasProceso3d', 'arrayRevisionHorasProceso3d'],
        8: ['arrayAvDiseno', 'arrayRevisionAvDiseno', 'arrayAv50Diseno', 'arrayRevisionAv50Diseno', 'arrayAv80Diseno', 'arrayRevisionAv80Diseno', 'arrayEnvioCliente', 'arrayRevisionEnvioCliente'],
        12: ['arrayRevisionCliente', 'arrayRevisionRevisionCliente', 'arrayLdmProvisoria', 'arrayRevisionLdmProvisoria', 'arrayAv100Diseno', 'arrayRevisionAv100Diseno', 'arrayAprobadoCliente', 'arrayRevisionAprobadoCliente'],
        16: ['arrayLdmAvanceCG', 'arrayRevisionLdmAvanceCG', 'arrayLdmAvanceTD2', 'arrayRevisionLdmAvanceTD2', 'arrayLdm80', 'arrayRevisionLdm80', 'arrayInfoModelo', 'arrayRevisionInfoModelo'],
        18: ['arrayLdm100', 'arrayRevisionLdm100', 'arrayInfo100', 'arrayRevisionInfo100'],
        20: ['arraySim0', 'arrayRevisionSim0', 'arrayDocuSim0', 'arrayRevisionDocuSim0'],
        25: ['arraySim1', 'arrayRevisionSim1', 'arrayVideo', 'arrayRevisionVideo', 'arrayInforme', 'arrayRevisionInforme', 'arrayPpt', 'arrayRevisionPpt', 'arrayS1pOp20', 'arrayRevisionS1pOp20'],
        29: ['arraySim2', 'arrayRevisionSim2', 'arrayReporte', 'arrayRevisionReporte', 'arrayDfnProdismo', 'arrayRevisionDfnProdismo', 'arraySim3', 'arrayRevisionSim3'],
        33: ['arrayMatEnsayo', 'arrayRevisionMatEnsayo', 'arrayMasMenos10', 'arrayRevisionMasMenos10', 'arrayMpAlternativo', 'arrayRevisionMpAlternativo', 'arrayReunionSim', 'arrayRevisionReunionSim'],
        37: ['arrayInformeSim4', 'arrayRevisionInformeSim4', 'arrayGeoCopiado1', 'arrayRevisionGeoCopiado1', 'arrayGeoCopiado2', 'arrayRevisionGeoCopiado2', 'arrayHorasSim', 'arrayRevisionHorasSim'],
        39: ['arrayGrillado', 'arrayRevisionGrillado', 'arrayMpEnsayada', 'arrayRevisionMpEnsayada']
    };

    const keysToReturn = resultMap[qFinalX] || [];
    const result = {};
    keysToReturn.forEach(key => result[key] = arrays[key]);

    return result;
}

function changeValueFromArray(arrayFromValues) {
    const valueMap = {
        '': 'S/D',
        'sinDato': 'S/D',
        'noAplica': 'N/A',
        'ok': 'OK',
        'noOk': 'No OK',
        'pendiente': 'Pendiente'
    };

    return arrayFromValues.map(value => valueMap[value] || value);
}

function colorStatusOt(valorStatusOt) {
    let disabled = 'required',
        color = ''
    valorStatusOt==='Activo' ? color = 'success' : color = 'danger'

    return {
        color,
        disabled
    }
}

function optionSelect(option) {
    const options = {
        ok: `<option value="noOk">No OK</option>
            <option value="pendiente">Pendiente</option>
            <option value="noAplica">N/A</option>`
        ,
        noOk: `<option value="ok">OK</option>
                <option value="pendiente">Pendiente</option>
                <option value="noAplica">N/A</option>`
        ,
        pendiente: `<option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="noAplica">N/A</option>`
        ,
        noAplica: `<option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>`
        ,
        default: `<option value="ok">OK</option>
                    <option value="noOk">No OK</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="noAplica">N/A</option>`
    };
    return options[option] || options.default;
}

function switchOptionSelected(switchValue) {
    const optionsMap = {
        "OK": { variableValue: 'ok', optionKey: 'optionOk', getValueArrayDato: 'OK' },
        "No OK": { variableValue: 'noOk', optionKey: 'optionNoOk', getValueArrayDato: 'No OK' },
        "Pendiente": { variableValue: 'pendiente', optionKey: 'optionPendiente', getValueArrayDato: 'Pendiente' },
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

const cabeceraFormulario = `<div class="col-2 my-auto align-self-middle" style="width: 5rem;">
                                <label for="otStatus"><strong>OT Status</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-middle">
                                <label for="otNumber"><strong>OT#</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-middle">
                                <label for="opNumber"><strong>OP#</strong></label>
                            </div>
                            <div class="col my-auto align-self-middle" style="width: 10rem;">
                                <label for="otDescription"><strong>Descripción</strong></label>
                            </div>`

function datosCabeceraFormulario (arrayOtStatus, y, arrayOtNumber, arrayOpNumber, arrayOtDescription) {
    const datosCabecera = 
        `<div class="col-2 my-auto align-self-middle" style="width: 5rem;">
            <span id="${arrayOtStatus}"
                class="badge rounded-pill bg-${(colorStatusOt(arrayOtStatus).color)}
                        text-white">${arrayOtStatus}
            </span>
            <input type="hidden" name="otStatusHidden${y}" value="${arrayOtStatus}">
        </div>
        <div class="col-1 my-auto align-self-middle">
            <span id="${arrayOtNumber}"
                class="badge rounded-pill bg-dark text-white">
                    ${arrayOtNumber}
            </span>
            <input type="hidden" name="otNumberHidden${y}" value="${arrayOtNumber}">
        </div>
        <div class="col-1 my-auto align-self-middle">
            <span class="badge rounded-pill bg-secondary text-white">
                ${arrayOpNumber}
            </span>
        </div>
        <div class="col my-auto align-self-middle overflow-ellipsis" style="width: 10rem;">
            <span class="text-dark">${arrayOtDescription}</span>
        </div>`

    return datosCabecera                    
}

function htmlTitulos(qInicialX, qFinalX){
    const resultMapTitles = {
        0: ['Proceso R14'],
        1: ['Aprobado PM'],
        2: ['Proceso 3D'],
        3: ['Hs Proceso 3D'],
        4: ['Av Diseño'],
        5: ['1° Rev 50%'],
        6: ['2° Rev 80%'],
        7: ['Env a Cliente'],
        8: ['Rev Cliente'],
        9: ['LdM Provisoria'],
        10: ['Av Diseño 100%'],
        11: ['Aprob Cliente'],
        12: ['LdM Avanzada (Cilindros/Guías)'],
        13: ['LdM Avanzada (Tacos D2)'],
        14: ['LdM 80%'],
        15: ['Info Modelo'],
        16: ['LdM 100%'],
        17: ['Info 100%'],
        18: ['Simulación 0'],
        19: ['Doc Simulación 0'],
        20: ['Simulación 1'],
        21: ['Video'],
        22: ['Informe'],
        23: ['PPT'],
        24: ['S1 p/Op20'],
        25: ['Simulación 2'],
        26: ['Reporte'],
        27: ['DFN Prodismo'],
        28: ['Simulación 3'],
        29: ['Material Ensayo'],
        30: ['±10'],
        31: ['Mp Alternativo'],
        32: ['Reunión Simulación'],
        33: ['Informe Sim 4'],
        34: ['Geo Copiado #1'],
        35: ['Geo Copiado #2'],
        36: ['Horas Sim'],
        37: ['Blank Grillado'],
        38: ['Mp Ensayada']
    };

    let htmlTitulos = ''
    for (let q = qInicialX; q < qFinalX; q++) {
        if (resultMapTitles[q]) { // Verifica si existe un título para la clave actual
            resultMapTitles[q].forEach(title => {
                htmlTitulos += `
                    <div class="col my-auto">
                        <span><strong>${title}</strong></span>
                    </div>
                    <div class="col-1 my-auto align-self-start border-start border-dark" style="width: 4vw;">
                        <span><strong>Rev</strong></span>
                    </div>`;
            });
        }
    }
    return htmlTitulos
}

function footerFormularioHidden (projectNumberId, clientId, i, arrayBloqueLength, arrayOtKNumber) {
    let footerFormulario = `<input type="hidden" name="projectIdHidden" value="${projectNumberId}">
                            <input type="hidden" name="clientIdHidden" value="${clientId}">
                            <input type="hidden" name="ociNumberK" value="${parseInt(i)}">
                            <input type="hidden" name="otNumberK" value="${arrayOtKNumber}">
                            <input type="hidden" name="otQuantity" value="${parseInt(arrayOtKNumber.length)}">`

    return footerFormulario                            
}

const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
})

function swalFireAlert(
    titulo,
    html,
    ancho,
    background,
    formulario,
    arrayDeOtNumber,
    arrayDeOpNumber,
    arrayDeOtDescription) {

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
            listItem.textContent = `OT #${arrayDeOtNumber[index]} - OP: ${arrayDeOpNumber[index]} - ${arrayDeOtDescription[index]}`;
            
            resultadoElement.appendChild(listItem);
            resultadoElement.classList.add('listDetailNum')
        })
        
        let htmlLista = resultadoElement.outerHTML,
            outputOk = `La información ${titulo}, fue agregada a las Ot's: ${htmlLista}`,
            outputNok = `La información ${titulo}, no fue agregada a las Ot's: ${htmlLista}`

        if (result.isConfirmed) {
            const formValues = document.getElementById(formulario)
            formValues.submit()

            Toast.fire({
                title: `Información de OT/s #${arrayDeOtNumber.join(" - #")} agregada con éxito!`,
                html: outputOk,
                icon: 'success',
                width: 600
            })

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

//***** addDatoToR14 ******
function addDatoToR14(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloque = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                const dataEnArrayBloque = `
                        <div class="col my-auto">
                            <select id="procesoR14${res.arrayOtNumber[y]}" name="procesoR14${y}" oninput="updateInputsSelect()"
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayProcesoR14[y])).variableValue}" disabled>
                                    ${(switchOptionSelected(getValues.arrayProcesoR14[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayProcesoR14[y])).optionDefined}
                            </select>
                            <input type="hidden" id="procesoR14Hidden${res.arrayOtNumber[y]}"
                            name="procesoR14Hidden${[y]}" value="${(switchOptionSelected(getValues.arrayProcesoR14[y])).variableValue}">
                        </div>
                        <div class="col-1 my-auto" style="width: 4vw;">    
                            <input type="text" id="revisionProcesoR14${res.arrayOtNumber[y]}_readOnly"
                                value="${getValues.arrayRevisionProcesoR14[y]}" class="form-control" style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionProcesoR14${res.arrayOtNumber[y]}"
                                name="revisionProcesoR14${y}" value="${getValues.arrayRevisionProcesoR14[y]}">
                        </div>

                        <div class="col my-auto">
                            <select id="aprobadoR14${res.arrayOtNumber[y]}" name="aprobadoR14${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayAprobadoR14[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayAprobadoR14[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayAprobadoR14[y])).optionDefined}
                            </select>
                            <input type="hidden" id="aprobadoR14Hidden${res.arrayOtNumber[y]}"
                            name="aprobadoR14Hidden${[y]}" value="${(switchOptionSelected(getValues.arrayAprobadoR14[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" id="revisionAprobadoR14${res.arrayOtNumber[y]}_readOnly"
                                value="${getValues.arrayRevisionAprobadoR14[y]}" class="form-control"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionAprobadoR14${res.arrayOtNumber[y]}"
                                name="revisionAprobadoR14${y}" value="${getValues.arrayRevisionAprobadoR14[y]}">    
                        </div>`

                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloque.push(`
                    <div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] && res.arrayOtNumber[y+1] ? arrayBloque.push(`<hr class="my-1">`) : null
            }
        });

        const html = `<form id="formR14Values" action="/api/proyectos/otInfoR14" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloque.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloque.length, arrayOtKNumber )}
                        </fieldset>
                    </form>`

        const titulo = "R14",
        ancho = 870,
        background = '#ffffff',
        formulario = 'formR14Values'

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayOtSelected,
            arrayOpDescriptionSelected,
            arrayOtDescriptionSelected
        )
        disabledBtnAceptar()
    }
}
//***** End addDatoToR14 ******

// Función para actualizar el valor del campo total
function updateTotal(i) {
    let iFromi = parseInt(i)
    if (!isNaN(iFromi)) {
        let res = getOtList(iFromi),
            arrayTotalHorasProceso3d = [],
            inputDisabled = document.getElementById("totalHsProceso3d")
        inputDisabled.removeAttribute('disabled')
        // console.log('res.arrayOtNumber: ', res.arrayOtNumber)    
        for (let y=0; y < res.arrayOtNumber.length; y++) {    
            let input1 = document.getElementById(`hsProceso${res.arrayOtNumber[y]}`)
            input1 ? arrayTotalHorasProceso3d.push(input1.value) : 0
        }
        
        // Usamos el método map para convertir los strings a números enteros
        const arrayDeNumeros = arrayTotalHorasProceso3d.map(str => parseInt(str, 10));

        let total = arrayDeNumeros.reduce(function(acumulador, valorActual) {
            return acumulador + valorActual;
        }, 0);
        // console.log('total: ', total)
        !isNaN(total) ? inputDisabled.value = total : inputDisabled.value = 0;
        inputDisabled.setAttribute('disabled', true)
    }
}
// -----------------------------------------------

//***** addDatoToProceso3d ******
function addDatoToProceso3d(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i),
            getValues = getOtListValues(i, idTabla, qInicial, qFinal),
            arrayBloqueProceso3d = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                const dataEnArrayBloque = `<div class="col my-auto">
                                <select id="proceso3d${res.arrayOtNumber[y]}" name="proceso3d${y}" oninput="updateInputsSelect()"
                                    class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                                    <option selected value="${(switchOptionSelected(getValues.arrayProceso3d[y])).variableValue}" disabled>
                                        ${(switchOptionSelected(getValues.arrayProceso3d[y])).getValueArrayDato}
                                    </option>
                                    ${(switchOptionSelected(getValues.arrayProceso3d[y])).optionDefined}
                                </select>
                                <input type="hidden" id="proceso3dHidden${res.arrayOtNumber[y]}"
                                    name="proceso3dHidden${[y]}" value="${(switchOptionSelected(getValues.arrayProceso3d[y])).variableValue}">
                            </div>
                            <div class="col-1 my-auto" style="width: 4vw;">    
                                <input type="text" value="${getValues.arrayRevisionProceso3d[y]}" class="form-control"
                                    style="text-align: center;" disabled readonly">
                                <input type="hidden" id="revisionProceso3d${res.arrayOtNumber[y]}"
                                    name="revisionProceso3d${y}" value="${getValues.arrayRevisionProceso3d[y]}">
                            </div>

                            <div class="col my-auto">
                                <input value="${parseInt(getValues.arrayHorasProceso3d[y])}" type="number" oninput="updateTotal(${i})"
                                    id="hsProceso${res.arrayOtNumber[y]}" name="horasProceso3d${y}"
                                    class="form-control" min="0" max="9999"
                                    style="text-align: center;" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            </div>
                            <div class="col-1 my-auto" style="width: 4vw;">    
                                <input type="text" value="${getValues.arrayRevisionHorasProceso3d[y]}" class="form-control"
                                    style="text-align: center;" disabled readonly">
                                <input type="hidden" id="revisionHorasProceso3d${res.arrayOtNumber[y]}"
                                    name="revisionHorasProceso3d${y}" value="${getValues.arrayRevisionHorasProceso3d[y]}">
                            </div>`

                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueProceso3d.push(`
                    <div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] && res.arrayOtNumber[y+1] ? arrayBloqueProceso3d.push(`<hr class="my-1">`) : null
            }
        });

        let totalHorasProceso3dActual = document.getElementById(`resHsTotalProceso3d${i}`).innerText
        var inputTotalHorasProceso3d =
            `<div class="row justify-content-end my-1 mx-auto">
                <div class="col-4 my-auto align-self-middle">
                    <span class="badge bg-dark text-white">Total horas Proceso 3D</span>
                </div>
                <div class="col-4 pe-5 me-4 my-auto">
                    <input value="${totalHorasProceso3dActual}" type="number" id="totalHsProceso3d"
                    class="form-control" style="text-align: center;" disabled>
                </div> 
            </div>`
        
        const html = `<form id="formProceso3dValues" action="/api/proyectos/otInfoProceso3d" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloqueProceso3d.join("<br>")}
                            <hr>
                                ${inputTotalHorasProceso3d}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueProceso3d.length, arrayOtKNumber)}
                        </fieldset>
                    </form>`
    
        const titulo = "Proceso 3D",
        formulario = 'formProceso3dValues',
        ancho = 870,
        background = '#efefff'
    
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayOtSelected,
            arrayOpDescriptionSelected,
            arrayOtDescriptionSelected
        )
        disabledBtnAceptar()
    }
}
//***** End addDatoToProceso3d ******

//***** addDatoToDisenoPrimera ******
function addDatoToDisenoPrimera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i),
            getValues = getOtListValues(i, idTabla, qInicial, qFinal),
            arrayBloqueDisenoPrimera = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []
    
        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                let disabledInputRange = ''
                parseInt(getValues.arrayAvDiseno[y]) === 100 ? disabledInputRange = 'disabled' : null

                const dataEnArrayBloque = `
                    <div class="col m-auto">
                        <div class="row justify-content-center">
                            <div class="col-7 my-auto">
                                <input type="text" class="form-control ms-3" min="${parseInt(getValues.arrayAvDiseno[y])}" max="100" step="5"
                                    id="avDisenoDisabled${res.arrayOtNumber[y]}" name="avDisenoDisabled"
                                    value="${getValues.arrayAvDiseno[y]}" style="text-align: center; width: 4.25rem;" disabled>
                            </div>
                            <div class="col my-auto">
                                <strong>%</strong>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col my-auto">
                                <input type="range" class="form-range" min="${parseInt(getValues.arrayAvDiseno[y])}" max="100" step="5"
                                    id="avDiseno${res.arrayOtNumber[y]}" name="avDisenoRange"
                                    value="${getValues.arrayAvDiseno[y]}" oninput="updateInputsText()" ${disabledInputRange}>
                                <input type="hidden" class="form-control" id="avDisenoHidden${res.arrayOtNumber[y]}"
                                    name="avDisenoHidden${[y]}" value="${getValues.arrayAvDiseno[y]}">
                            </div>
                        </div>
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionAvDiseno[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionAvDiseno${res.arrayOtNumber[y]}"
                            name="revisionAvDiseno${[y]}" value="${getValues.arrayRevisionAvDiseno[y]}">
                    </div>
        
                    <div class="col my-auto">
                        <select id="av50Diseno${res.arrayOtNumber[y]}" name="av50Diseno${[y]}" oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            <option selected value="${(switchOptionSelected(getValues.arrayAv50Diseno[y])).variableValue}">
                                ${(switchOptionSelected(getValues.arrayAv50Diseno[y])).getValueArrayDato}
                            </option>
                                ${(switchOptionSelected(getValues.arrayAv50Diseno[y])).optionDefined}
                        </select>
                        <input type="hidden" id="av50DisenoHidden${res.arrayOtNumber[y]}" name="av50DisenoHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayAv50Diseno[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionAv50Diseno[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionAv50Diseno${res.arrayOtNumber[y]}"
                            name="revisionAv50Diseno${[y]}" value="${getValues.arrayRevisionAv50Diseno[y]}">
                    </div>
        
                    <div class="col my-auto">
                        <select id="av80Diseno${res.arrayOtNumber[y]}" name="av80Diseno${[y]}" oninput="updateInputsSelect()"    
                        class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            <option selected value="${(switchOptionSelected(getValues.arrayAv80Diseno[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayAv80Diseno[y])).getValueArrayDato}
                            </option>
                                ${(switchOptionSelected(getValues.arrayAv80Diseno[y])).optionDefined}
                        </select>
                        <input type="hidden" id="av80DisenoHidden${res.arrayOtNumber[y]}" name="av80DisenoHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayAv80Diseno[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionAv80Diseno[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionAv80Diseno${res.arrayOtNumber[y]}"
                            name="revisionAv80Diseno${[y]}" value="${getValues.arrayRevisionAv80Diseno[y]}">
                    </div>
                    <div class="col my-auto">
                        <select id="envioCliente${res.arrayOtNumber[y]}" name="envioCliente${[y]}" oninput="updateInputsSelect()"    
                        class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            <option selected value="${(switchOptionSelected(getValues.arrayEnvioCliente[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayEnvioCliente[y])).getValueArrayDato}
                            </option>
                                ${(switchOptionSelected(getValues.arrayEnvioCliente[y])).optionDefined}
                        </select>
                        <input type="hidden" id="envioClienteHidden${res.arrayOtNumber[y]}" name="envioClienteHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayEnvioCliente[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionEnvioCliente[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionEnvioCliente${res.arrayOtNumber[y]}"
                            name="revisionEnvioCliente${[y]}" value="${getValues.arrayRevisionEnvioCliente[y]}">
                    </div>`
        
                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueDisenoPrimera.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueDisenoPrimera.push(`<hr class="my-1">`) : null
            }
        })
    
        const html = `<form id="formDisenoPrimeraValues" action="/api/proyectos/otInfoAvDisenoPrimera" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto justify-content-center">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloqueDisenoPrimera.join("<br>")}
                                ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueDisenoPrimera.length, arrayOtKNumber)}    
                        </fieldset>
                    </form>`  
    
            const titulo = "Diseño (1° Parte)",
                ancho = 1375,
                background = '#dfefff',
                formulario = 'formDisenoPrimeraValues'
    
            swalFireAlert (
                titulo,
                html,
                ancho,
                background,
                formulario,
                arrayOtSelected,
                arrayOpDescriptionSelected,
                arrayOtDescriptionSelected
            )
            disabledBtnAceptar()
    }
}
//***** End addDatoToDisenoPrimera ******

//***** addDatoToDisenoSegunda ******
function addDatoToDisenoSegunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i),
            getValues = getOtListValues(i, idTabla, qInicial, qFinal),
            arrayBloqueDisenoSegunda = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                let disabledInputRange = ''
                parseInt(getValues.arrayAv100Diseno[y]) === 100 ? disabledInputRange = 'disabled' : null

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="revisionCliente${res.arrayOtNumber[y]}" name="revisionCliente${[y]}" oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            <option selected value="${(switchOptionSelected(getValues.arrayRevisionCliente[y])).variableValue}">
                                ${(switchOptionSelected(getValues.arrayRevisionCliente[y])).getValueArrayDato}
                            </option>
                                ${(switchOptionSelected(getValues.arrayRevisionCliente[y])).optionDefined}
                        </select>
                        <input type="hidden" id="revisionClienteHidden${res.arrayOtNumber[y]}"
                            name="revisionClienteHidden${[y]}" value="${(switchOptionSelected(getValues.arrayRevisionCliente[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionRevisionCliente[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionRevisionCliente${res.arrayOtNumber[y]}"
                            name="revisionRevisionCliente${[y]}" value="${getValues.arrayRevisionRevisionCliente[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="ldmProvisoria${res.arrayOtNumber[y]}" name="ldmProvisoria${[y]}" oninput="updateInputsSelect()"    
                        class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            <option selected value="${(switchOptionSelected(getValues.arrayLdmProvisoria[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayLdmProvisoria[y])).getValueArrayDato}
                            </option>
                                ${(switchOptionSelected(getValues.arrayLdmProvisoria[y])).optionDefined}
                        </select>
                        <input type="hidden" id="ldmProvisoriaHidden${res.arrayOtNumber[y]}"
                            name="ldmProvisoriaHidden${[y]}" value="${(switchOptionSelected(getValues.arrayLdmProvisoria[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionLdmProvisoria[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionLdmProvisoria${res.arrayOtNumber[y]}"
                            name="revisionLdmProvisoria${[y]}" value="${getValues.arrayRevisionLdmProvisoria[y]}">
                    </div>

                    <div class="col m-auto">
                        <div class="row justify-content-center">
                            <div class="col-7 my-auto">
                                <input type="text" class="form-control ms-3" min="${parseInt(getValues.arrayAv100Diseno[y])}" max="100" step="5" id="av100DisenoDisabled${res.arrayOtNumber[y]}"
                                    name="av100DisenoDisabled" value="${getValues.arrayAv100Diseno[y]}"
                                    style="text-align: center; width: 4.25rem;" disabled>
                            </div>
                            <div class="col my-auto">
                                <strong>%</strong>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col my-auto">
                                <input type="range" class="form-range" min="${parseInt(getValues.arrayAv100Diseno[y])}" max="100" step="5" id="av100Diseno${res.arrayOtNumber[y]}"
                                    name="av100DisenoRange" value="${getValues.arrayAv100Diseno[y]}" oninput="updateInputsText();" ${disabledInputRange}>
                                <input type="hidden" class="form-control" id="av100DisenoHidden${res.arrayOtNumber[y]}"
                                    name="av100DisenoHidden${[y]}" value="${getValues.arrayAv100Diseno[y]}">
                            </div>
                        </div>
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionAv100Diseno[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionAv100Diseno${res.arrayOtNumber[y]}"
                            name="revisionAv100Diseno${[y]}" value="${getValues.arrayRevisionAv100Diseno[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="aprobadoCliente${res.arrayOtNumber[y]}" name="aprobadoCliente${[y]}" oninput="updateInputsSelect()"    
                        class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            <option selected value="${(switchOptionSelected(getValues.arrayAprobadoCliente[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayAprobadoCliente[y])).getValueArrayDato}
                            </option>
                                ${(switchOptionSelected(getValues.arrayAprobadoCliente[y])).optionDefined}
                        </select>
                        <input type="hidden" id="aprobadoClienteHidden${res.arrayOtNumber[y]}"
                            name="aprobadoClienteHidden${[y]}" value="${(switchOptionSelected(getValues.arrayAprobadoCliente[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionAprobadoCliente[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionAprobadoCliente${res.arrayOtNumber[y]}"
                            name="revisionAprobadoCliente${[y]}" value="${getValues.arrayRevisionAprobadoCliente[y]}">
                    </div>`

                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : ''
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueDisenoSegunda.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloque}
                </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueDisenoSegunda.push(`<hr class="my-1">`) : null
            }
        });
    
        const html = `<form id="formDisenoSegundaValues" action="/api/proyectos/otInfoAvDisenoSegunda" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto justify-content-center">
                            ${cabeceraFormulario}
                            ${htmlTitulos(qInicial, qFinal)}
                        </div>
                        <hr>
                            ${arrayBloqueDisenoSegunda.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueDisenoSegunda.length, arrayOtKNumber)}    
                    </fieldset>
                </form>`  
    
            const titulo = "Diseño (2° Parte)",
                ancho = 1550,
                background = '#dedede',
                formulario = 'formDisenoSegundaValues'
    
            swalFireAlert (
                titulo,
                html,
                ancho,
                background,
                formulario,
                arrayOtSelected,
                arrayOpDescriptionSelected,
                arrayOtDescriptionSelected
            )
            disabledBtnAceptar()
    }
}
//***** End addDatoToDisenoSegunda ******

//***** addDatoToInfo80 ******
function addDatoToInfo80(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i),
            getValues = getOtListValues(i, idTabla, qInicial, qFinal),
            arrayBloqueInfo80 = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []
    
        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                let disabledInputRangeLdm = '', disabledInputRangeInfo = '' 
                parseInt(getValues.arrayLdm80[y]) === 100 ? disabledInputRangeLdm = 'disabled' : null
                parseInt(getValues.arrayInfoModelo[y]) === 100 ? disabledInputRangeInfo = 'disabled' : null

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="ldmAvanceCG${res.arrayOtNumber[y]}" name="ldmAvanceCG${[y]}" oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            <option selected value="${(switchOptionSelected(getValues.arrayLdmAvanceCG[y])).variableValue}">
                                ${(switchOptionSelected(getValues.arrayLdmAvanceCG[y])).getValueArrayDato}
                            </option>
                                ${(switchOptionSelected(getValues.arrayLdmAvanceCG[y])).optionDefined}
                        </select>
                        <input type="hidden" id="ldmAvanceCGHidden${res.arrayOtNumber[y]}" name="ldmAvanceCGHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayLdmAvanceCG[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionLdmAvanceCG[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionLdmAvanceCG${res.arrayOtNumber[y]}"
                            name="revisionLdmAvanceCG${[y]}" value="${getValues.arrayRevisionLdmAvanceCG[y]}">
                    </div>
        
                    <div class="col my-auto">
                        <select id="ldmAvance2TD${res.arrayOtNumber[y]}" name="ldmAvance2TD${[y]}" oninput="updateInputsSelect()"    
                        class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                            <option selected value="${(switchOptionSelected(getValues.arrayLdmAvanceTD2[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayLdmAvanceTD2[y])).getValueArrayDato}
                            </option>
                                ${(switchOptionSelected(getValues.arrayLdmAvanceTD2[y])).optionDefined}
                        </select>
                        <input type="hidden" id="ldmAvance2TDHidden${res.arrayOtNumber[y]}" name="ldmAvance2TDHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayLdmAvanceTD2[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionLdmAvanceTD2[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionLdmAvance2TD${res.arrayOtNumber[y]}"
                            name="revisionLdmAvance2TD${[y]}" value="${getValues.arrayRevisionLdmAvanceTD2[y]}">
                    </div>
        
                    <div class="col m-auto">
                        <div class="row justify-content-center">
                            <div class="col-7 my-auto">
                                <input type="text" class="form-control ms-3" min="${getValues.arrayLdm80[y]}" max="100" step="5" id="ldm80Disabled${res.arrayOtNumber[y]}"
                                    name="ldm80Disabled" value="${getValues.arrayLdm80[y]}" style="text-align: center; width: 4.25rem;" disabled>
                            </div>
                            <div class="col my-auto">
                                <strong>%</strong>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col my-auto">
                                <input type="range" class="form-range" min="${getValues.arrayLdm80[y]}" max="100" step="5" id="ldm80${res.arrayOtNumber[y]}"
                                    name="ldm80Range" value="${getValues.arrayLdm80[y]}" oninput="updateInputsText()" ${disabledInputRangeLdm}>
                                <input type="hidden" class="form-control" id="ldm80Hidden${res.arrayOtNumber[y]}"
                                    name="ldm80Hidden${[y]}" value="${getValues.arrayLdm80[y]}">
                            </div>
                        </div>
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionLdm80[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revision80Ldm${res.arrayOtNumber[y]}"
                            name="revision80Ldm${[y]}" value="${getValues.arrayRevisionLdm80[y]}">
                    </div>
        
                    <div class="col m-auto">
                        <div class="row justify-content-center">
                            <div class="col-7 my-auto">
                                <input type="text" class="form-control ms-3" min="${getValues.arrayInfoModelo[y]}" max="100" step="5" id="infoModeloDisabled${res.arrayOtNumber[y]}"
                                    name="infoModeloDisabled" value="${getValues.arrayInfoModelo[y]}"
                                    style="text-align: center; width: 4.25rem;" disabled>
                            </div>
                            <div class="col my-auto">
                                <strong>%</strong>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col my-auto">
                                <input type="range" class="form-range" min="${getValues.arrayInfoModelo[y]}" max="100" step="5" id="infoModelo${res.arrayOtNumber[y]}"
                                    name="infoModelo" value="${getValues.arrayInfoModelo[y]}" oninput="updateInputsText()" ${disabledInputRangeInfo}>
                                <input type="hidden" class="form-control" id="infoModeloHidden${res.arrayOtNumber[y]}"
                                    name="infoModeloHidden${[y]}" value="${getValues.arrayLdm80[y]}">
                            </div>
                        </div>
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionInfoModelo[y]}" class="form-control mx-auto"
                            style="text-align: center; width: 3.5rem;" disabled readonly>
                        <input type="hidden" id="revisionInfoModelo${res.arrayOtNumber[y]}"
                            name="revisionInfoModelo${[y]}" value="${getValues.arrayRevisionInfoModelo[y]}">
                    </div>`

                const isInactive = res.arrayOtStatus[y] === 'Inactivo',
                    divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '',
                    divClass = isInactive ? 'pe-none' : ''

                arrayBloqueInfo80.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloque}
                </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueInfo80.push(`<hr class="my-1">`) : null
            }
        });
    
        const html = `<form id="formInfo80Values" action="/api/proyectos/otInfo80" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto justify-content-center">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloqueInfo80.join("<br>")}
                                ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfo80.length, arrayOtKNumber)}    
                        </fieldset>
                    </form>`  
    
            const titulo = "Info 80%",
                ancho = 1650,
                background = '#cedede',
                formulario = 'formInfo80Values'
                
            swalFireAlert (
                titulo,
                html,
                ancho,
                background,
                formulario,
                arrayOtSelected,
                arrayOpDescriptionSelected,
                arrayOtDescriptionSelected
            )
            disabledBtnAceptar()
    }
}
//***** End addDatoToInfo80 ******

//***** addDatoToInfo100 ******
function addDatoToInfo100(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueInfo100 = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []
    
        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                let disabledInputRangeLdm100 = '', disabledInputRangeInfo100 = '' 
                parseInt(getValues.arrayLdm100[y]) === 100 ? disabledInputRangeLdm100 = 'disabled' : null
                parseInt(getValues.arrayInfo100[y]) === 100 ? disabledInputRangeInfo100 = 'disabled' : null

                const dataEnArrayBloque = `
                <div class="col m-auto">
                    <div class="row justify-content-center">
                        <div class="col-7 my-auto ms-5">
                            <input type="text" class="form-control ms-3" min="${getValues.arrayLdm100[y]}" max="100" step="5" id="100ldmDisabled${res.arrayOtNumber[y]}"
                                name="ldm100Disabled" value="${getValues.arrayLdm100[y]}" style="text-align: center; width: 4.25rem;" disabled>
                        </div>
                        <div class="col my-auto">
                            <strong>%</strong>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col my-auto">
                            <input type="range" class="form-range" min="${getValues.arrayLdm100[y]}" max="100" step="5" id="100ldm${res.arrayOtNumber[y]}"
                                name="ldm100Range" value="${getValues.arrayLdm100[y]}" oninput="updateInputsText()" ${disabledInputRangeLdm100}>
                            <input type="hidden" class="form-control" id="100ldmHidden${res.arrayOtNumber[y]}"
                                name="100ldmHidden${[y]}" value="${getValues.arrayLdm100[y]}">
                        </div>
                    </div>
                </div>
                <div class="col-1 my-auto" style="width: 4vw;">    
                    <input type="text" value="${getValues.arrayRevisionLdm100[y]}" class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;" disabled readonly>
                    <input type="hidden" id="revision100Ldm${res.arrayOtNumber[y]}"
                        name="100revisionLdm${[y]}" value="${getValues.arrayRevisionLdm100[y]}">
                </div>

                <div class="col m-auto">
                    <div class="row justify-content-center">
                        <div class="col-7 my-auto ms-5">
                            <input type="text" class="form-control ms-3" min="${getValues.arrayInfo100[y]}" max="100" step="5" id="100infoDisabled${res.arrayOtNumber[y]}"
                                name="info100Disabled" value="${getValues.arrayInfo100[y]}" style="text-align: center; width: 4.25rem;" disabled>
                        </div>
                        <div class="col my-auto">
                            <strong>%</strong>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col my-auto">
                            <input type="range" class="form-range" min="${getValues.arrayInfo100[y]}" max="100" step="5" id="100info${res.arrayOtNumber[y]}"
                                name="info100Range" value="${getValues.arrayInfo100[y]}" oninput="updateInputsText()" ${disabledInputRangeInfo100}>
                            <input type="hidden" class="form-control" id="100infoHidden${res.arrayOtNumber[y]}"
                                name="100infoHidden${[y]}" value="${getValues.arrayLdm100[y]}">
                        </div>
                    </div>
                </div>
                <div class="col-1 my-auto" style="width: 4vw;">    
                    <input type="text" value="${getValues.arrayRevisionInfo100[y]}" class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;" disabled readonly>
                    <input type="hidden" id="revision100Info${res.arrayOtNumber[y]}"
                        name="100revisionInfo${[y]}" value="${getValues.arrayRevisionInfo100[y]}">
                </div>`
    
                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : ''
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueInfo100.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloque}
                </div>`);

                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueInfo100.push(`<hr class="my-1">`) : null
            }
        })
    
        const html = `<form id="formInfo100Values" action="/api/proyectos/otInfo100" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto justify-content-center">
                            ${cabeceraFormulario}
                            ${htmlTitulos(qInicial, qFinal)}
                        </div>
                        <hr>
                            ${arrayBloqueInfo100.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfo100.length, arrayOtKNumber)}    
                    </fieldset>
                </form>`  
    
            const titulo = "Info 100%",
            ancho = 875,
            background = '#fefefe',
            formulario = 'formInfo100Values'
                
            swalFireAlert (
                titulo,
                html,
                ancho,
                background,
                formulario,
                arrayOtSelected,
                arrayOpDescriptionSelected,
                arrayOtDescriptionSelected
            )
            disabledBtnAceptar()
    }
}
//***** End addDatoToInfo100 ******

//***** addDatoToInfoSim0 ******
function addDatoToInfoSim0(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueInfoSim0 = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                const dataEnArrayBloque = `
                        <div class="col my-auto">
                            <select id="0Sim${res.arrayOtNumber[y]}" name="0Sim${y}" oninput="updateInputsSelect()"
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arraySim0[y])).variableValue}" disabled>
                                    ${(switchOptionSelected(getValues.arraySim0[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arraySim0[y])).optionDefined}
                            </select>
                            <input type="hidden" id="0SimHidden${res.arrayOtNumber[y]}" name="0SimHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arraySim0[y])).variableValue}">
                        </div>
                        <div class="col-1 my-auto">    
                            <input type="text" value="${getValues.arrayRevisionSim0[y]}" class="form-control"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revision0Sim${res.arrayOtNumber[y]}"
                                name="revision0Sim${y}" value="${getValues.arrayRevisionSim0[y]}">
                        </div>
        
                        <div class="col my-auto">
                            <select id="docu0Sim${res.arrayOtNumber[y]}" name="docu0Sim${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayDocuSim0[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayDocuSim0[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayDocuSim0[y])).optionDefined}
                            </select>
                            <input type="hidden" id="docu0SimHidden${res.arrayOtNumber[y]}" name="docu0SimHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayDocuSim0[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionDocuSim0[y]}" class="form-control"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionDocu0Sim${res.arrayOtNumber[y]}"
                                name="revisionDocu0Sim${y}" value="${getValues.arrayRevisionDocuSim0[y]}">    
                        </div>`
                
                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : ''
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueInfoSim0.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloque}
                </div>`);

                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] && res.arrayOtNumber[y+1] ? arrayBloqueInfoSim0.push(`<hr class="my-1">`) : null
            }
        })
    
        const html = `<form id="formSim0Values" action="/api/proyectos/otSimulacion0" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloqueInfoSim0.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfoSim0.length, arrayOtKNumber)}
                        </fieldset>
                    </form>`
    
        const titulo = "Simulación 0",
        ancho = 870,
        background = '#ffffff',
        formulario = 'formSim0Values'
        
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayOtSelected,
            arrayOpDescriptionSelected,
            arrayOtDescriptionSelected
        )
        disabledBtnAceptar()
    }
}
//***** End addDatoToInfoSim0 ******

//***** addDatoToInfoSim1 ******
function addDatoToInfoSim1(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        var arrayBloqueInfoSim1 = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []
        
        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                const dataEnArrayBloqueSim1 = `
                        <div class="col my-auto">
                            <select id="1Sim${res.arrayOtNumber[y]}" name="1Sim${y}" oninput="updateInputsSelect()"
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arraySim1[y])).variableValue}" disabled>
                                    ${(switchOptionSelected(getValues.arraySim1[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arraySim1[y])).optionDefined}
                            </select>
                            <input type="hidden" id="1SimHidden${res.arrayOtNumber[y]}" name="1SimHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arraySim1[y])).variableValue}">
                        </div>
                        <div class="col-1 my-auto" style="width: 4vw;">    
                            <input type="text" value="${getValues.arrayRevisionSim1[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revision1Sim${res.arrayOtNumber[y]}"
                                name="revision1Sim${y}" value="${getValues.arrayRevisionSim1[y]}">
                        </div>

                        <div class="col my-auto">
                            <select id="video${res.arrayOtNumber[y]}" name="video${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayVideo[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayVideo[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayVideo[y])).optionDefined}
                            </select>
                            <input type="hidden" id="videoHidden${res.arrayOtNumber[y]}" name="videoHidden${[y]}"
                                value="${(switchOptionSelected(getValues.arrayVideo[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionVideo[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionVideo${res.arrayOtNumber[y]}"
                                name="revisionVideo${y}" value="${getValues.arrayRevisionVideo[y]}">    
                        </div>
                        
                        <div class="col my-auto">
                            <select id="informe${res.arrayOtNumber[y]}" name="informe${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayInforme[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayInforme[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayInforme[y])).optionDefined}
                            </select>
                            <input type="hidden" id="informeHidden${res.arrayOtNumber[y]}"
                                name="informeHidden${[y]}" value="${(switchOptionSelected(getValues.arrayInforme[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionInforme[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionInforme${res.arrayOtNumber[y]}"
                                name="revisionInforme${y}" value="${getValues.arrayRevisionInforme[y]}">    
                        </div>
                        
                        <div class="col my-auto">
                            <select id="ppt${res.arrayOtNumber[y]}" name="ppt${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayPpt[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayPpt[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayPpt[y])).optionDefined}
                            </select>
                            <input type="hidden" id="pptHidden${res.arrayOtNumber[y]}" name="pptHidden${[y]}"
                                value="${(switchOptionSelected(getValues.arrayPpt[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionPpt[y]}"
                                class="form-control mx-auto" style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionPpt${res.arrayOtNumber[y]}"
                                name="revisionPpt${y}" value="${getValues.arrayRevisionPpt[y]}">    
                        </div>
                        
                        <div class="col my-auto">
                            <select id="s1pOp20${res.arrayOtNumber[y]}" name="s1pOp20${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayS1pOp20[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayS1pOp20[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayS1pOp20[y])).optionDefined}
                            </select>
                            <input type="hidden" id="s1pOp20Hidden${res.arrayOtNumber[y]}" name="s1pOp20Hidden${[y]}"
                                value="${(switchOptionSelected(getValues.arrayS1pOp20[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionS1pOp20[y]}" 
                                class="form-control mx-auto" style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionS1p20Op${res.arrayOtNumber[y]}"
                                name="revisionS1p20Op${y}" value="${getValues.arrayRevisionS1pOp20[y]}">    
                        </div>`

                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : ''
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueInfoSim1.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloqueSim1}
                </div>`);

                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] && res.arrayOtNumber[y+1] ? arrayBloqueInfoSim1.push(`<hr class="my-1">`) : null
            }
        });
    
        const html = `<form id="formSim1Values" action="/api/proyectos/otSimulacion1" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>    
                            <hr>
                                ${arrayBloqueInfoSim1.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfoSim1.length, arrayOtKNumber)}
                        </fieldset>
                    </form>`
    
        const titulo = "Simulación 1",
        ancho = 1600,
        background = '#ffffff',
        formulario = 'formSim1Values'
            
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayOtSelected,
            arrayOpDescriptionSelected,
            arrayOtDescriptionSelected
        )
        disabledBtnAceptar()
    }
}
//***** End addDatoToInfoSim1 ******

//***** addDatoToInfoSim2_3 ******
function addDatoToInfoSim2_3(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueInfoSim2_3 = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []
        
        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])

                const dataEnArrayBloqueSim2_3 = `
                        <div class="col my-auto">
                            <select id="2Sim${res.arrayOtNumber[y]}" name="2Sim${y}" oninput="updateInputsSelect()"
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arraySim2[y])).variableValue}" disabled>
                                    ${(switchOptionSelected(getValues.arraySim2[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arraySim2[y])).optionDefined}
                            </select>
                            <input type="hidden" id="2SimHidden${res.arrayOtNumber[y]}" name="2SimHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arraySim2[y])).variableValue}">
                        </div>
                        <div class="col-1 my-auto" style="width: 4vw;">    
                            <input type="text" value="${getValues.arrayRevisionSim2[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revision2Sim${res.arrayOtNumber[y]}"
                                name="revision2Sim${y}" value="${getValues.arrayRevisionSim2[y]}">
                        </div>

                        <div class="col my-auto">
                            <select id="reporte${res.arrayOtNumber[y]}" name="reporte${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayReporte[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayReporte[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayReporte[y])).optionDefined}
                            </select>
                            <input type="hidden" id="reporteHidden${res.arrayOtNumber[y]}" name="reporteHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayReporte[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionReporte[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionReporte${res.arrayOtNumber[y]}"
                                name="revisionReporte${y}" value="${getValues.arrayRevisionReporte[y]}">    
                        </div>
                        
                        <div class="col my-auto">
                            <select id="dfnProdismo${res.arrayOtNumber[y]}" name="dfnProdismo${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayDfnProdismo[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayDfnProdismo[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayDfnProdismo[y])).optionDefined}
                            </select>
                            <input type="hidden" id="dfnProdismoHidden${res.arrayOtNumber[y]}" name="dfnProdismoHidden${[y]}"
                                value="${(switchOptionSelected(getValues.arrayDfnProdismo[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto border-dark border-end border-3" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionDfnProdismo[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionDfnProdismo${res.arrayOtNumber[y]}"
                                name="revisionDfnProdismo${y}" value="${getValues.arrayRevisionDfnProdismo[y]}">    
                        </div>
                        
                        <div class="col my-auto">
                            <select id="3Sim${res.arrayOtNumber[y]}" name="3Sim${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arraySim3[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arraySim3[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arraySim3[y])).optionDefined}
                            </select>
                            <input type="hidden" id="3SimHidden${res.arrayOtNumber[y]}" name="3SimHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arraySim3[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionSim3[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionSim3${res.arrayOtNumber[y]}"
                                name="revisionSim3${y}" value="${getValues.arrayRevisionSim3[y]}">    
                        </div>`
    
                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : ''
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueInfoSim2_3.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloqueSim2_3}
                </div>`);

                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] && res.arrayOtNumber[y+1] ? arrayBloqueInfoSim2_3.push(`<hr class="my-1">`) : null
            }
        })
    
        const html = `<form id="formSim2_3Values" action="/api/proyectos/otSimulacion2_3" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloqueInfoSim2_3.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfoSim2_3.length, arrayOtKNumber)}
                        </fieldset>
                    </form>`
    
        const titulo = "Simulación 2 y 3",
        ancho = 1600,
        background = '#eeeeff',
        formulario = 'formSim2_3Values'
        
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayOtSelected,
            arrayOpDescriptionSelected,
            arrayOtDescriptionSelected
        )
        disabledBtnAceptar()
    }
}
//***** End addDatoToInfoSim2_3 ******

//***** addDatoToInfoSim4 Primera ******
function addDatoToInfoSim4Primera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueInfoSim4Prima = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])
                
                dataEnArrayBloqueSim4Primera = `
                    <div class="col my-auto">
                        <select id="matEnsayo${res.arrayOtNumber[y]}" name="matEnsayo${y}" oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMatEnsayo[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayMatEnsayo[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMatEnsayo[y])).optionDefined}
                        </select>
                        <input type="hidden" id="matEnsayoHidden${res.arrayOtNumber[y]}" name="matEnsayoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayMatEnsayo[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionMatEnsayo[y]}" class="form-control mx-auto"
                            style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionMatEnsayo${res.arrayOtNumber[y]}"
                            name="revisionMatEnsayo${y}" value="${getValues.arrayRevisionMatEnsayo[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="masMenos10${res.arrayOtNumber[y]}" name="masMenos10${y}" oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMasMenos10[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayMasMenos10[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMasMenos10[y])).optionDefined}
                        </select>
                        <input type="hidden" id="masMenos10Hidden${res.arrayOtNumber[y]}" name="masMenos10Hidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayMasMenos10[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionMasMenos10[y]}" class="form-control mx-auto"
                            style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionMas10Menos${res.arrayOtNumber[y]}"
                            name="revisionMas10Menos${y}" value="${getValues.arrayRevisionMasMenos10[y]}">    
                    </div>
                    
                    <div class="col my-auto">
                        <select id="mpAlternativo${res.arrayOtNumber[y]}" name="mpAlternativo${y}" oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMpAlternativo[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayMpAlternativo[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMpAlternativo[y])).optionDefined}
                        </select>
                        <input type="hidden" id="mpAlternativoHidden${res.arrayOtNumber[y]}" name="mpAlternativoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayMpAlternativo[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionMpAlternativo[y]}" class="form-control mx-auto"
                            style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionMpAlternativo${res.arrayOtNumber[y]}"
                            name="revisionMpAlternativo${y}" value="${getValues.arrayRevisionMpAlternativo[y]}">    
                    </div>
                    
                    <div class="col my-auto">
                        <select id="reunionSim${res.arrayOtNumber[y]}" name="reunionSim${y}" oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayReunionSim[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayReunionSim[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayReunionSim[y])).optionDefined}
                        </select>
                        <input type="hidden" id="reunionSimHidden${res.arrayOtNumber[y]}" name="reunionSimHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayReunionSim[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionReunionSim[y]}" class="form-control mx-auto"
                            style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionReunionSim${res.arrayOtNumber[y]}"
                            name="revisionReunionSim${y}" value="${getValues.arrayRevisionReunionSim[y]}">    
                    </div>`

                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : ''
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueInfoSim4Prima.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloqueSim4Primera}
                </div>`);

                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] && res.arrayOtNumber[y+1] ? arrayBloqueInfoSim4Prima.push(`<hr class="my-1">`) : null
            }
        });
    
        const html = `<form id="formSim4PrimeraValues" action="/api/proyectos/otSimulacion4Primera" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloqueInfoSim4Prima.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfoSim4Prima.length, arrayOtKNumber)}
                        </fieldset>
                    </form>`
    
        const titulo = "Simulación 4 (1° Parte)",
        ancho = 1400,
        background = '#ffefff',
        formulario = 'formSim4PrimeraValues'
        
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayOtSelected,
            arrayOpDescriptionSelected,
            arrayOtDescriptionSelected
        )
        disabledBtnAceptar()
    }
}
//***** End addDatoToInfoSim4 Primera ******

// Función para actualizar el valor del campo total
function updateHsSimTotal(i) {
    let iFromi = parseInt(i)
    if (!isNaN(iFromi)) {
        let res = getOtList(iFromi)
        let arrayTotalHorasSim = []
        let inputDisabled = document.getElementById("totalHsSim")
        inputDisabled.removeAttribute('disabled')
        // console.log('res.arrayOtNumber: ', res.arrayOtNumber)    
        for (let y=0; y < res.arrayOtNumber.length; y++) {    
            let input1 = document.getElementById(`horasSim${res.arrayOtNumber[y]}`)
            input1 ? arrayTotalHorasSim.push(input1.value) : 0
        }
        
        // Usamos el método map para convertir los strings a números enteros
        const arrayDeNumeros = arrayTotalHorasSim.map(str => parseInt(str, 10));

        let total = arrayDeNumeros.reduce(function(acumulador, valorActual) {
            return acumulador + valorActual;
        }, 0);

        // console.log('total: ', total)
        !isNaN(total) ? inputDisabled.value = total : inputDisabled.value = 0;
        inputDisabled.setAttribute('disabled', true)
    }
}

//***** addDatoToInfoSim4 Segunda ******
function addDatoToInfoSim4Segunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueInfoSim4Seg = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []
        
        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])
                                                    
                const dataEnArrayBloqueSim4Segunda = `
                        <div class="col my-auto">
                            <select id="informe4Sim${res.arrayOtNumber[y]}" name="informe4Sim${y}" oninput="updateInputsSelect()"
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayInformeSim4[y])).variableValue}" disabled>
                                    ${(switchOptionSelected(getValues.arrayInformeSim4[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayInformeSim4[y])).optionDefined}
                            </select>
                            <input type="hidden" id="informe4SimHidden${res.arrayOtNumber[y]}" name="informe4SimHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayInformeSim4[y])).variableValue}">
                        </div>
                        <div class="col-1 my-auto" style="width: 4vw;">    
                            <input type="text" value="${getValues.arrayRevisionInformeSim4[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionInforme4Sim${res.arrayOtNumber[y]}"
                                name="revisionInforme4Sim${y}" value="${getValues.arrayRevisionInformeSim4[y]}">
                        </div>

                        <div class="col my-auto">
                            <select id="geo1Copiado${res.arrayOtNumber[y]}" name="geo1Copiado${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayGeoCopiado1[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayGeoCopiado1[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayGeoCopiado1[y])).optionDefined}
                            </select>
                            <input type="hidden" id="geo1CopiadoHidden${res.arrayOtNumber[y]}" name="geo1CopiadoHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayGeoCopiado1[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionGeoCopiado1[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionGeo1Copiado${res.arrayOtNumber[y]}"
                                name="revisionGeo1Copiado${y}" value="${getValues.arrayRevisionGeoCopiado1[y]}">    
                        </div>
                        
                        <div class="col my-auto">
                            <select id="geo2Copiado${res.arrayOtNumber[y]}" name="geo2Copiado${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayGeoCopiado2[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayGeoCopiado2[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayGeoCopiado2[y])).optionDefined}
                            </select>
                            <input type="hidden" id="geo2CopiadoHidden${res.arrayOtNumber[y]}" name="geo2CopiadoHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayGeoCopiado2[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionGeoCopiado2[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionGeo2Copiado${res.arrayOtNumber[y]}"
                            name="revisionGeo2Copiado${y}" value="${getValues.arrayRevisionGeoCopiado2[y]}">    
                        </div>
                        
                        <div class="col my-auto">
                            <input value="${parseInt(getValues.arrayHorasSim[y])}" type="number"
                                id="horasSim${res.arrayOtNumber[y]}" name="horasSim${y}" class="form-control" min="0" max="9999"
                                style="text-align: center;" ${colorStatusOt(res.arrayOtStatus[y]).disabled} oninput="updateHsSimTotal(${i})">
                        </div>
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionHorasSim[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionHorasSim${res.arrayOtNumber[y]}"
                                name="revisionHorasSim${y}" value="${getValues.arrayRevisionHorasSim[y]}">    
                        </div>`

                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : ''
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueInfoSim4Seg.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloqueSim4Segunda}
                </div>`);

                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] && res.arrayOtNumber[y+1] ? arrayBloqueInfoSim4Seg.push(`<hr class="my-1">`) : null
            }
        });

        let totalHorasSimActual = document.getElementById(`resHsTotalSim4Segunda${i}`).innerText
        var inputTotalHorasSim = 
            `<div class="row justify-content-end my-1 me-5 mx-auto">
                <div class="col-3 my-auto align-self-middle">
                    <span class="badge bg-dark text-white">Total Horas Simulacion</span>
                </div>
                <div class="col-2 pe-5 me-2 my-auto">
                    <input value="${totalHorasSimActual}" type="number" id="totalHsSim" class="form-control" style="text-align: center;" disabled>
                </div> 
            </div>`

        const html = `<form id="formSim4SegundaValues" action="/api/proyectos/otSimulacion4Segunda" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloqueInfoSim4Seg.join("<br>")}
                            <hr>
                                ${inputTotalHorasSim}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfoSim4Seg.length, arrayOtKNumber)}
                        </fieldset>
                    </form>`
    
        const titulo = "Simulación 4 (2° Parte)",
        ancho = 1400,
        background = '#ffefff',
        formulario = 'formSim4SegundaValues'
    
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayOtSelected,
            arrayOpDescriptionSelected,
            arrayOtDescriptionSelected
        )
        disabledBtnAceptar()
    }
}
//***** End addDatoToInfoSim4 Segunda ******

//***** addDatoToInfoSim5 ******
function addDatoToInfoSim5(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueInfoSim5 = [], arrayOtSelected = [], arrayOpDescriptionSelected = [], arrayOtKNumber=[], arrayOtDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpDescriptionSelected.push(res.arrayOpNumber[y])
                arrayOtDescriptionSelected.push(res.arrayDescripcionOt[y])
                                                    
                const dataEnArrayBloqueSim5 = `
                        <div class="col my-auto">
                            <select id="grillado${res.arrayOtNumber[y]}" name="grillado${y}" oninput="updateInputsSelect()"
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayGrillado[y])).variableValue}" disabled>
                                    ${(switchOptionSelected(getValues.arrayGrillado[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayGrillado[y])).optionDefined}
                            </select>
                            <input type="hidden" id="grilladoHidden${res.arrayOtNumber[y]}" name="grilladoHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayGrillado[y])).variableValue}">
                        </div>
                        <div class="col-1 my-auto" style="width: 4vw;">
                            <input type="text" value="${getValues.arrayRevisionGrillado[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionGrillado${res.arrayOtNumber[y]}"
                                name="revisionGrillado${y}" value="${getValues.arrayRevisionGrillado[y]}">
                        </div>
        
                        <div class="col my-auto">
                            <select id="mpEnsayada${res.arrayOtNumber[y]}" name="mpEnsayada${y}" oninput="updateInputsSelect()" 
                                class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                                <option selected value="${(switchOptionSelected(getValues.arrayMpEnsayada[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayMpEnsayada[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayMpEnsayada[y])).optionDefined}
                            </select>
                            <input type="hidden" id="mpEnsayadaHidden${res.arrayOtNumber[y]}" name="mpEnsayadaHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayMpEnsayada[y])).variableValue}">
                        </div>    
                        <div class="col-1 my-auto" style="width: 4vw;">  
                            <input type="text" value="${getValues.arrayRevisionMpEnsayada[y]}" class="form-control mx-auto"
                                style="text-align: center;" disabled readonly">
                            <input type="hidden" id="revisionMpEnsayada${res.arrayOtNumber[y]}"
                                name="revisionMpEnsayada${y}" value="${getValues.arrayRevisionMpEnsayada[y]}">    
                        </div>`
    
                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : ''
                const divClass = isInactive ? 'pe-none' : ''

                arrayBloqueInfoSim5.push(`<div class="row py-1 mx-auto ${divClass}" ${divStyle}>
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], arrayOtDescriptionSelected[y])}
                    ${dataEnArrayBloqueSim5}
                </div>`);

                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] && res.arrayOtNumber[y+1] ? arrayBloqueInfoSim5.push(`<hr class="my-1">`) : null
            }
        });
        
    
        const html = `<form id="formSim5Values" action="/api/proyectos/otSimulacion5" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                ${htmlTitulos(qInicial, qFinal)}
                            </div>
                            <hr>
                                ${arrayBloqueInfoSim5.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfoSim5.length, arrayOtKNumber)}
                        </fieldset>
                    </form>`
    
        const titulo = "Simulación 5",
        ancho = 870,
        background = '#efefff',
        formulario = 'formSim5Values'
    
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayOtSelected,
            arrayOpDescriptionSelected,
            arrayOtDescriptionSelected
        )
        disabledBtnAceptar()
    }
}
//***** End addDatoToInfoSim5 ******

// Función para actualizar el valor del campo Text
function updateInputsText() {
    let arrayInputsRange = []

    for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
        document.getElementById(`tablaGeneral${i}`) ? arrayInputsRange.push(i) : null
    }
    
    arrayInputsRange !=[] ? allInputsRange = document.querySelectorAll('input[type="range"]') : null

    for (let y=0; y < parseInt(allInputsRange.length)-1; y++) {
        const idInputRange = allInputsRange[y].id//.substring(0, allInputsRange[y].id.length - 4)
        const idInputTextToChange = allInputsRange[y].id.substring(0, allInputsRange[y].id.length - 4) + 'Disabled' + allInputsRange[y].id.substring(allInputsRange[y].id.length - 4)
        const idInputRangeHidden = allInputsRange[y].id.substring(0, allInputsRange[y].id.length - 4) + 'Hidden' + allInputsRange[y].id.substring(allInputsRange[y].id.length - 4)
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
function updateInputsSelect () {
    let arrayInputSelectHidden = [], allInputsSelect = []

    for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
        if (document.getElementById(`tablaGeneral${i}`) ) arrayInputSelectHidden.push(i)
    }
    
    if (arrayInputSelectHidden !=[] ) allInputsSelect = document.querySelectorAll('select')

    let largoArrayInputsSelect = parseInt((allInputsSelect.length)-1)
    for (let y=0; y < largoArrayInputsSelect; y++) {
        const idInputSelectHidden = allInputsSelect[y].id.substring(0, allInputsSelect[y].id.length - 4) + 'Hidden' + allInputsSelect[y].id.substring(allInputsSelect[y].id.length - 4)
        let inputSelectHidden = document.getElementById(`${idInputSelectHidden}`)
        inputSelectHidden ? inputSelectHidden.value = document.getElementById(`${allInputsSelect[y].id}`).value : null
    }
}

function disabledBtnAceptar () {
    let btnAceptarModal = document.getElementsByClassName('swal2-confirm');
    const allInputs = document.querySelectorAll('input[type="text"],input[type="number"],select,textarea,input[type="file"]'),
        allInputsRange = document.querySelectorAll('input[type="range"]'),
        allInputsCheck = document.querySelectorAll('input[type="checkbox"]'),
        allInputsRadio = document.querySelectorAll('input[type="radio"]'),
        checkbox = document.getElementById('confirmationNumberOt'),
        otNumberDisabled = document.getElementById('numberOtModal')

    allInputs.forEach(function(input) {
        input.value ?
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("border-primary", "border-2", "shadow")
                if (btnAceptarModal && btnAceptarModal.length > 0) {
                    btnAceptarModal[0].removeAttribute('disabled')
                    btnAceptarModal[0].style = "cursor: pointer;"
                }
            })    
        : null       
    })

    allInputsRange.forEach(function(input) {
        input.value ?
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("drag__bar")
                if (btnAceptarModal) {
                    btnAceptarModal[0].removeAttribute('disabled')
                    btnAceptarModal[0].style = "cursor: pointer;"
                }
            })    
        : null
    })

    allInputsCheck.forEach(function(input) {
        input.value ?
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.toggle("bg-danger")
                if (btnAceptarModal) {
                    btnAceptarModal[0].removeAttribute('disabled')
                    btnAceptarModal[0].style = "cursor: pointer;"
                }

                checkbox.checked
                    ? otNumberDisabled.removeAttribute('disabled')
                    : otNumberDisabled.setAttribute('disabled', 'true')
            })    
        : null
    })

    allInputsRadio.forEach(function(input) {
        input.value && input.name != 'ociNumber' ?
            input.addEventListener('input', (event) => {
                event.preventDefault()
                if (btnAceptarModal) {
                    btnAceptarModal[0].removeAttribute('disabled')
                    btnAceptarModal[0].style = "cursor: pointer;"
                }
            })    
        : null
    })
}

const arrTables = []
for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    document.getElementById(`tablaGeneral${i}`) ? arrTables.push(i) : null
}

if(arrTables !=[]) {
    let allButtonsFromTables = document.querySelectorAll(`
        button[name="btnR14"],
        button[name="btnProceso3d"],
        button[name="btnDisenoPrimera"],
        button[name="btnDisenoSegunda"],
        button[name="btnInfo80"],
        button[name="btnInfo100"],
        button[name="btn0Sim"],
        button[name="btn1Sim"],
        button[name="btn2_3Sim"],
        button[name="btn4PrimeraSim"],
        button[name="btn4SegundaSim"],
        button[name="btn5Sim"]
    `);

    let arrayTituloTabla = [
        {
            nombreTabla: "tablaR14",
            btnName: "btnR14",
            functionName: addDatoToR14,
            qInicial: 0,
            qFinal: 2
        },
        {
            nombreTabla: "tablaProceso3D",
            btnName: "btnProceso3d",
            functionName: addDatoToProceso3d,
            qInicial: 2,
            qFinal: 4
        },
        {
            nombreTabla: "tablaDisenoPrimera",
            btnName: "btnDisenoPrimera",
            functionName: addDatoToDisenoPrimera,
            qInicial: 4,
            qFinal: 8
        },
        {
            nombreTabla: "tablaDisenoSegunda",
            btnName: "btnDisenoSegunda",
            functionName: addDatoToDisenoSegunda,
            qInicial: 8,
            qFinal: 12
        },
        {
            nombreTabla: "tablaInfo80",
            btnName: "btnInfo80",
            functionName: addDatoToInfo80,
            qInicial: 12,
            qFinal: 16
        },
        {
            nombreTabla: "tablaInfo100",
            btnName: "btnInfo100",
            functionName: addDatoToInfo100,
            qInicial: 16,
            qFinal: 18
        },
        {
            nombreTabla: "tabla0Sim",
            btnName: "btn0Sim",
            functionName: addDatoToInfoSim0,
            qInicial: 18,
            qFinal: 20
        },
        {
            nombreTabla: "tabla1Sim",
            btnName: "btn1Sim",
            functionName: addDatoToInfoSim1,
            qInicial: 20,
            qFinal: 25
        },
        {
            nombreTabla: "tabla2_3Sim",
            btnName: "btn2_3Sim",
            functionName: addDatoToInfoSim2_3,
            qInicial: 25,
            qFinal: 29
        },
        {
            nombreTabla: "tabla4SimPrimera",
            btnName: "btn4PrimeraSim",
            functionName: addDatoToInfoSim4Primera,
            qInicial: 29,
            qFinal: 33
        },
        {
            nombreTabla: "tabla4SimSegunda",
            btnName: "btn4SegundaSim",
            functionName: addDatoToInfoSim4Segunda,
            qInicial: 33,
            qFinal: 37
        },
        {
            nombreTabla: "tabla5Sim",
            btnName: "btn5Sim",
            functionName: addDatoToInfoSim5,
            qInicial: 37,
            qFinal: 39
        },
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
            let forbiddenChars = /["$%?¡¿^/=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                event.preventDefault()
                input.classList.toggle("border", "border-danger", "border-2")
            }
        })
    }) 