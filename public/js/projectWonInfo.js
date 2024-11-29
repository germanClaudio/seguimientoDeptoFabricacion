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

function extractTreeNumbers(str) {
    // Usamos una expresión regular para extraer todos los números de la cadena
    const numbers = str.match(/\d+/g);

    if (numbers) {
        // Si encontramos al menos 3 números, devolvemos los últimos 3
        if (numbers.length >= 3) {
            return numbers.slice(-3); // Devolvemos los últimos tres números
        }
        // Si hay menos de 3 números, devolvemos todos los que haya
        return numbers;
    }

    return null; // Si no hay números, devolvemos null
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

// Inicialización de arrays
let checkSelect = document.querySelectorAll('input[name="checkSelect"]');
let maxOtQuantity = checkSelect ? checkSelect.length : 0;
let ociTotalQty = parseInt(document.getElementById('ociTotalQty').innerText);

let arrayBtnChangeStatusOtDetalle = [], arrayBtnUpdateOtDetalle = [],
    arrayBtnDeleteOtDetalle = [], arrayCheckBoxSelect = [],
    arrayBtnCheckSelectionAll = [], arrayBtnCheckSelecMasive = [],
    arrayBtnAddDetallesOt = [], arrayRowsOtDetalles = [],
    arrayBtnAddDetallesOtFromFile = [], arrayBtnAddDetallesModal = [],
    arrayCheckBoxNotNull = [], arrayStatusDetail = [], arrayStatusOt = [],
    arrayBtnSearchDesignerUser = [], arrayBtnSearchSimulationUser = [], arrayBtnSearchSupplier = [],
    arrayBtnSearchDesignerUserClean = [], arrayBtnSearchSimulationUserClean = [], arrayBtnSearchSupplierClean = [];


// Función auxiliar para buscar y agregar un elemento a un array si existe
const addElementIfExists = (selector, array, attribute = null) => {
    let element = document.getElementById(selector);
    if (element && !array.includes(element)) {
        if (attribute) element.setAttribute(attribute, true);
        array.push(element);
    }
};
    
// Recorrido de ociTotalQty
for (let m = 0; m < ociTotalQty; m++) {
    addElementIfExists(`btnCheckSelectionAll${m}`, arrayBtnCheckSelectionAll);
    addElementIfExists(`btnCheckSelecMasive${m}`, arrayBtnCheckSelecMasive, 'disabled');
    addElementIfExists(`btnAddDetallesFromExcelFile${m}`, arrayBtnAddDetallesOtFromFile);
    addElementIfExists('idAddDetallesModal', arrayBtnAddDetallesModal);
    addElementIfExists(`searchDesignUser${m}`, arrayBtnSearchDesignerUser);
    addElementIfExists(`searchSimulationUser${m}`, arrayBtnSearchSimulationUser);
    addElementIfExists(`searchSupplier${m}`, arrayBtnSearchSupplier);

    // Recorrido de maxOtQuantity
    for (let n = 0; n < maxOtQuantity; n++) {
        addElementIfExists(`btnAddDetallesFormSelected${m}_${n}`, arrayBtnAddDetallesOt);

        // Recorrido de varLimMaxDetallesOT
        for (let o = 0; o < varLimMaxDetallesOT; o++) {
            addElementIfExists(`btnStatusOtDetalle${m}_${n}_${o}`, arrayBtnChangeStatusOtDetalle);
            addElementIfExists(`btnDeleteOtDetalle${m}_${n}_${o}`, arrayBtnDeleteOtDetalle);
            addElementIfExists(`btnEditOtDetalle${m}_${n}_${o}`, arrayBtnUpdateOtDetalle);
            addElementIfExists(`rowSelected${m}_${n}_${o}`, arrayRowsOtDetalles);

            let checkBoxSelect = document.getElementById(`checkSelect${m}_${n}_${o}`);
            if (checkBoxSelect) {
                arrayCheckBoxSelect.push(checkBoxSelect);
                if (checkBoxSelect.checked) arrayCheckBoxNotNull.push(checkBoxSelect);
            }

            addElementIfExists(`statusDetalle${m}_${n}_${o}`, arrayStatusDetail);
            addElementIfExists(`lastOtStatus${m}_${n}_${o}`, arrayStatusOt);
        }
    }
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
const subarrays = dividirArrayEnSubarrays(arrayOriginal, 5); // cant. maxima de slides
const subarrayBtns = dividirArrayEnSubarrays(arrayOriginalBtn, 5); // cant. maxima de slides

function activarElemento(subarray, index) {
    if (subarray.length > 0) {
        // Si el índice está dentro del rango, activamos el elemento correspondiente
        const safeIndex = (index >= 0 && index < subarray.length) ? index : 0;
        subarray[safeIndex].classList.add('active');
    }
}

// Convertimos el valor de slideHidden a entero una vez
const slideHiddenId = document.getElementById('slideHidden')
let slideIndex = 0
if (slideHiddenId) {
    slideIndex = parseInt(slideHidden.value);
    
    // Activamos los elementos en ambos conjuntos de subarrays
    [subarrays, subarrayBtns].forEach(array => {
        array.forEach(subarray => {
            activarElemento(subarray, slideIndex);
        });
    });
}


// ---------------- Event Add New Ot Row to OCI --------------------
const btnAddNewRow = document.getElementById("btnAddNewRow")
const buttonOne = document.getElementById('buttonOne')
btnAddNewRow.disabled = true 

buttonOne.addEventListener('click', () => {
    let ariaExpanded = buttonOne.getAttribute('aria-expanded')
    ariaExpanded==='true' ? btnAddNewRow.removeAttribute('disabled') : btnAddNewRow.disabled = true
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
    const internoDisenoValue = document.getElementById(`internoDiseno${i-1}`).value
    const internoSimulacion = document.getElementById(`internoSimulacion${i-1}`).value
    const externoDiseno = document.getElementById(`externoDiseno${i-1}`).value

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
                <div class="input-group mb-3">
                    <input type="text" name="internoDiseno${i}" id="internoDiseno${i}" class="form-control mt-3 position-relative"
                    placeholder="Diseño" value="${internoDisenoValue}" disabled>  
                    <button type="button" title="Buscar Diseñador" id="searchDesignUser${i}" class="btn btn-sm btn-primary rounded-circle ms-1 mt-3 border shadow position-absolute top-0 start-100 translate-middle">
                        <i class="fa-solid fa-database"></i>
                    </button>
                </div>
            </div>

            <div class="col-2">
                <label for="internoSimulacion${i}" id="labelInternoSimulacion${i}">Simulación seguida por</label>
                <div class="input-group mb-3">
                    <input type="text" name="internoSimulacion${i}" id="internoSimulacion${i}" class="form-control mt-3 position-relative"
                    placeholder="Simulación" value="${internoSimulacion}" disabled>
                    <button type="button" title="Buscar Simulador" id="searchSimulationUser${i}" class="btn btn-sm btn-primary rounded-circle ms-1 mt-3 border shadow position-absolute top-0 start-100 translate-middle">
                        <i class="fa-solid fa-database"></i>
                    </button>
                </div>
            </div>

            <div class="col-2">
                <label for="externoDiseno${i}" id="labelExternoDiseno${i}">Proveedor externo</label>
                <div class="input-group mb-3">
                    <input type="text" name="externoDiseno${i}" id="externoDiseno${i}" class="form-control mt-3 position-relative"
                    placeholder="Proveedor" value="${externoDiseno}" disabled>
                    <button type="button" title="Buscar Proveedor" id="searchSupplier${i}" class="btn btn-sm btn-primary rounded-circle ms-1 mt-3 border shadow position-absolute top-0 start-100 translate-middle">
                        <i class="fa-solid fa-database"></i>
                    </button>
                </div>  
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
    if (i !== 1) hideRemoveButton(i - 1);
    if (i >= 10) btnAddNewRow.disabled = true;

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'row my-2');
    newDiv.id = `otItemRow${i}`;

    // Configurar el contenido del nuevo div según el valor de i
    i === 1 ?
        newDiv.innerHTML = `<hr class="my-2"> ${originalDiv} <hr class="my-2">`
    :
        newDiv.innerHTML = i === 10 ? originalDiv : originalDiv + `<hr class="my-2">`
    
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
    // Recorrido de varLimMaxOtProyecto
    for (let m = 0; m < varLimMaxOtProyecto; m++) {
        addElementIfExists(`searchDesignUser${m}`, arrayBtnSearchDesignerUser);
        addElementIfExists(`searchSimulationUser${m}`, arrayBtnSearchSimulationUser);
        addElementIfExists(`searchSupplier${m}`, arrayBtnSearchSupplier);
    }

    arrayBtnSearchDesignerUserClean = [...new Set(arrayBtnSearchDesignerUser)];
    arrayBtnSearchSimulationUserClean = [...new Set(arrayBtnSearchSimulationUser)];
    arrayBtnSearchSupplierClean = [...new Set(arrayBtnSearchSupplier)];

    arrayBtnSearchDesignerUserClean.forEach(function(element) {
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
                    await cargarUsuario(idPermiso, idPermisoNumero);

                } catch (error) {
                    const titulo = 'Error al cargar los usuarios'
                    const message = error
                    const icon = 'error'
                    messageAlertUser(titulo, message, icon)
                }
            }, { once: true });
        }
    });

    arrayBtnSearchSimulationUserClean.forEach(function(element) {
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
                    await cargarUsuario(idPermiso, idPermisoNumero);
    
                } catch (error) {
                    const titulo = 'Error al cargar los usuarios'
                    const message = error
                    const icon = 'error'
                    messageAlertUser(titulo, message, icon)
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
                    const titulo = 'Error al cargar los proveedores'
                    const message = error
                    const icon = 'error'
                    messageAlertUser(titulo, message, icon)
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
    //console.log('radioSelectedValue: ', radioSelectedValue)
    const radioSelected = document.getElementById(`radioSelectedValue${elementoId}`)
    radioSelected.checked = true
    tituloForm.innerHTML = `Agregar Nueva/s OT's a OCI #<strong>${radioSelected.value}</strong> - Alias: "${radioSelected.getAttribute('value2')}" <br> Proyecto: "${projectNameHidden}"`
    ociNumberK.value = extractNumbers(elementoId)
    //console.log('ociNumberK', ociNumberK.value)
    ociNumberHidden.value = radioSelected.value
    //console.log('ociNumberHidden.value', ociNumberHidden.value)
    lastOtNumberFn(extractNumbers(elementoId))
    formulario.scrollTo({ behavior: 'smooth', block: 'start', left:0, top:0 });

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

//---- Add Details to OT ----------------
function messageAddDetalleOt(
    idProjectSelected,
    clientId,
    ociKNumber,
    ociNumber,
    otNumber,
    otKNumber,
    opNumber,
    statusOtDetalle,
    otDescription
) {
    let numberKOci = parseInt(ociKNumber)
    let numberOci = parseInt(ociNumber)
    let numberKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
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

    let html = `<form id="formAddOtDetalle${idProjectSelected}" action="/api/programas/addDetalleToOt/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-3">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">Número OCI</label>
                                <input type="text" class="form-control" value="${numberOci}" disabled>
                            </div>
                            <div class="col-3">
                                <label for="detalleOt" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="text" name="numberOtDetalle" class="form-control" value="${numberOt}" disabled>
                            </div>
                            <div class="col-2">
                                <label for="numeroOp" class="form-label d-flex justify-content-start ms-1">Número OP</label>
                                <input type="number" name="numeroOp" class="form-control" value="${numberOp}" disabled>
                            </div>
                            <div class="col">
                                <label for="numeroOp" class="form-label d-flex justify-content-start ms-1">Descripción OP</label>
                                <input type="text" class="form-control" value="${otDescription}" disabled>
                            </div>
                        </div>

                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="detalleOt" class="form-label d-flex justify-content-start ms-1">Número Ítem</label>
                                <div class="d-flex">
                                    <input type="text" name="numberOt" class="form-control text-end" value="${numberOt}" disabled>
                                    <span class="dot-separator mx-1 mt-2"><b>.</b></span>
                                    <input type="text" name="numberOtDetalle" id="numeroOtDetalle" class="form-control" placeholder="Número Ítem" value="" required>
                                </div>
                            </div>
                            <div class="col-5">
                                <label for="descriptionDetalle" class="form-label d-flex justify-content-start ms-1">Descripción Ítem</label>
                                <input type="text" name="descriptionDetalle" class="form-control" placeholder="Descripción Ítem" value="" required>
                            </div>                            
                            <div class="col-3" style="${bgColorStatus}">
                                <label for="statusDetalleForm" class="form-label d-flex justify-content-start ms-1">Status Ítem</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactivo</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusDetalleForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusDetalleForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusDetalleForm">Activo</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="clientIdHidden" value="${clientId}">
                        <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                        <input type="hidden" name="ociNumberHidden" id="ociNumberHidden${numberKOci}" value="${numberOci}">
                        <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                        <input type="hidden" name="otNumberHidden" id="otNumberHidden${numberKOt}" value="${numberOt}">
                        <input type="hidden" name="otQuantityHidden" id="otQuantityHidden${numberKOt}" value="1">
                    </fieldset>
                </form>`

    if (idProjectSelected && numberOt) {
        Swal.fire({
            title: `Agregar ítem a OT#${numberOt}. - OP#${numberOp} - ${otDescription}`,
            position: 'center',
            html: html,
            width: 1100,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Guardar <i class="fa-regular fa-save"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }
        }).then((result) => {
            let numeroOtDetalle = document.getElementById('numeroOtDetalle').value
            if (result.isConfirmed) {
                document.getElementById(`formAddOtDetalle${idProjectSelected}`).submit()
                
                Toast.fire({
                    icon: 'success',
                    title: `El ítem #<b>${numberOt}.${numeroOtDetalle}</b>, se creó con éxito!`
                })

            } else {
                numeroOtDetalle ?
                    Swal.fire(
                        `Ítem #<b>${numberOt}.${numeroOtDetalle}</b> no se creó!`,
                        `El ítem #${numberOt}.${numeroOtDetalle}, no se creó correctamente!`,
                        'warning'
                    )
                :
                    Swal.fire(
                        `Ítem #<b>${numberOt}</b> no se creó!`,
                        `El ítem de la OT#${numberOt}, no se creó correctamente!`,
                        'warning'
                    )
                return false
            }
        })
        disabledBtnAceptar()

    } else {
        let numeroOtDetalle = document.getElementById('numeroOtDetalle').value
        numeroOtDetalle ?
            Swal.fire({
                title: 'Error',
                position: 'center',
                timer: 3500,
                text: `El ítem #<b>${numberOt}.${numeroOtDetalle}</b> no se creó correctamente!`,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
            })
            :
            Swal.fire({
                title: 'Error',
                position: 'center',
                timer: 3500,
                text: `El ítem de la OT#<b>${numberOt}</b> no se creó correctamente!`,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
            })
    }

    let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    let inputNumeroOtDetalle = document.getElementById('numeroOtDetalle')
    let swal2Title = document.getElementById('swal2-title')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /[#"$%?¡¿^/=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.add("border", "border-danger", "border-2")
            } else {
                input.classList.remove("border", "border-danger", "border-2")
            }
        })

        input.addEventListener('input', function(event) {
            swal2Title.innerText = `Agregar ítem a OT#${numberOt}.${inputNumeroOtDetalle.value} - OP#${numberOp} - ${otDescription}`
        })
    })
}

//---- Add Details to OT from head Green btn----------------
function messageModalAddDetallesOt(idProjectSelected, clientId,  arrayIdOciOt, arrayIdOciOtDet, kNumberOci) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let ociNumber = []    
    for(let ood = 0; arrayIdOciOtDet.length>ood; ood++) {
        const kNumberOci = arrayIdOciOtDet[ood][0]
        let arrayValueBtn
        document.getElementById(`btnAddDetallesFormSelected${arrayIdOciOt[ood]}`) ?
        arrayValueBtn = (document.getElementById(`btnAddDetallesFormSelected${arrayIdOciOt[ood]}`).value).split(',') : null

        ociNumber.push({number: parseInt(document.getElementById(`ociNumber${kNumberOci}`).textContent), 
                    alias: document.getElementById(`ociAlias${kNumberOci}`).textContent,
                    numero: document.getElementById(`lastOtNumber${arrayIdOciOtDet[ood]}`) ?
                            parseInt(document.getElementById(`lastOtNumber${arrayIdOciOtDet[ood]}`).textContent) :
                            parseInt(document.getElementById(`btnAddDetallesFormSelected${arrayIdOciOt[ood]}`).name),
                    descripcion: document.getElementById(`lastOpDescription${arrayIdOciOtDet[ood]}`) ? 
                                document.getElementById(`lastOpDescription${arrayIdOciOtDet[ood]}`).textContent : arrayValueBtn[3],
                    numeroOp: document.getElementById(`lastOpNumber${arrayIdOciOtDet[ood]}`) ?
                                parseInt(document.getElementById(`lastOpNumber${arrayIdOciOtDet[ood]}`).textContent) :  arrayValueBtn[1],
                    statusOp: document.getElementById(`statusDetalle${arrayIdOciOtDet[ood]}`) ?
                            document.getElementById(`statusDetalle${arrayIdOciOtDet[ood]}`).textContent : arrayValueBtn[2] ? statusOt = 'Activo' : statusOt = 'Inactivo' })
    }

    // Crear un array para los resultados filtrados y un Set para números únicos
    const numerosUnicos = new Set();
    const arrayFiltrado = [];

    // Recorrer el array de objetos
    ociNumber.forEach(obj => {
        if (!numerosUnicos.has(obj.number)) {
            // Si el número no ha sido agregado, lo añadimos
            numerosUnicos.add(obj.number)
            arrayFiltrado.push(obj);
        }
    });
    
    let html = `<form id="formModalAddOtDetalle${idProjectSelected}" action="/api/programas/addDetalleToOt/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-3">
                                <label for="numberOci" class="form-label d-flex justify-content-start ms-1">Seleccione Número OCI - Alias</label>
                                <div id="containerNumberOci"></div>
                            </div>
                            <div class="col-3 my-auto">
                                <i class="fa-solid fa-right-long fa-beat fa-xl" style="color: #0000ff;"></i>
                            </div>    
                            <div class="col-6">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">#OT - Descripción - #Op - Status</label>
                                <div id="containerNumberOt"></div>
                            </div>    
                        </div>

                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="detalleOt" class="form-label d-flex justify-content-start ms-1">Número OT . Número Ítem</label>
                                <div class="d-flex">
                                    <input id="inputNumberOtDisabled" type="text" name="numberOt" class="form-control text-end" placeholder="Número OT" value="" disabled>
                                    <span class="dot-separator mx-1 mt-2"><b>.</b></span>
                                    <input type="text" name="numberOtDetalle" id="numeroOtDetalle" class="form-control" placeholder="Número Ítem" value="" required disabled>
                                </div>
                            </div>
                            <div class="col-5">
                                <label for="descriptionDetalle" class="form-label d-flex justify-content-start ms-1">Descripción Ítem</label>
                                <input type="text" id="descriptionDetalle" name="descriptionDetalle" class="form-control" placeholder="Descripción Ítem" value="" required disabled>
                            </div>                            
                            <div class="col-3" style="background-color: #55dd5560;">
                                <label for="statusDetalleForm" class="form-label d-flex justify-content-start ms-1">Status Ítem</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactivo</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusDetalleForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusDetalleForm" style="cursor: pointer;" checked>
                                        <label class="form-check-label" for="statusDetalleForm">Activo</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="clientIdHidden" value="${clientId}">
                        <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden" value="">
                        <input type="hidden" name="otKNumberHidden" id="otKNumberHidden" value="">
                    </fieldset>
                </form>`

    if (idProjectSelected) {
        Swal.fire({
            title: `Agregar ítem #`,
            position: 'center',
            html: html,
            width: 1100,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Guardar <i class="fa-regular fa-save"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }

        }).then((result) => {
            let numeroOtDetalle = document.getElementById('numeroOtDetalle').value
            let numeroOt = document.getElementById('inputNumberOtDisabled').value
            if (result.isConfirmed) {
                document.getElementById(`formModalAddOtDetalle${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El ítem #<b>${numeroOt}.${numeroOtDetalle}</b>, se creó con éxito!`
                })
                
            } else {
                numeroOtDetalle ?
                    Swal.fire(
                        `Ítem #<b>${numeroOt}.${numeroOtDetalle}</b> no se creó!`,
                        `El ítem #${numeroOt}.${numeroOtDetalle}, no se creó correctamente!`,
                        'warning'
                    )
                :
                    Swal.fire(
                        `Ítem #<b>${numeroOt}</b> no se creó!`,
                        `El ítem de la OT#${numeroOt}, no se creó correctamente!`,
                        'warning'
                    )
                return false
            }
        })
        disabledBtnAceptar()

    } else {
        let numeroOtDetalle = document.getElementById('numeroOtDetalle').value
        numeroOtDetalle ?
            Swal.fire({
                title: 'Error',
                position: 'center',
                timer: 3500,
                text: `El ítem #<b>${numeroOt}.${numeroOtDetalle}</b> no se creó correctamente!`,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
            })
            :
            Swal.fire({
                title: 'Error',
                position: 'center',
                timer: 3500,
                text: `El ítem de la OT#<b>${numberOt}</b> no se creó correctamente!`,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
            })
    }

    const selectOciNumber = document.createElement('select');
    selectOciNumber.classList.add('form-select')
    selectOciNumber.setAttribute('id', 'ociSelect')
    selectOciNumber.setAttribute('name', 'ociSelect')

    // Crear la primera opción "Seleccione una OCI"
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Seleccione una OCI';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectOciNumber.appendChild(defaultOption);

    //*******-------------------------------------------****** */
    const selectOtNumber = document.createElement('select');
    selectOtNumber.classList.add('form-select')
    selectOtNumber.setAttribute('id', 'otSelect')
    selectOtNumber.setAttribute('name', 'otSelect')
    selectOtNumber.setAttribute('disabled', true)

    let inputNumeroOtDetalle = document.getElementById('numeroOtDetalle')
    let swal2Title = document.getElementById('swal2-title')

    let inputNumberOtDisabled = document.getElementById('inputNumberOtDisabled')
    let inputDescriptionOtDisabled = document.getElementById('descriptionDetalle')
    let inputNumberDetailDisabled = document.getElementById('numeroOtDetalle')
    //******-------------------------------------------******* */
    
    arrayFiltrado.forEach((dato) => {
        const option = document.createElement('option');
        option.value = dato.number;
        option.text = `#${dato.number} - ${dato.alias}`;

        selectOciNumber.appendChild(option);
    });
    document.getElementById('containerNumberOci').appendChild(selectOciNumber);


    const ociSelected = document.getElementById('ociSelect')
    const ociKNumberHidden = document.getElementById('ociKNumberHidden')
    ociSelected.addEventListener('change', function(event) {
        const arrayOtFiltrado = [];
        const arrayOtReFiltrado = []; 
        const numerosUnicos = new Set();

        // Obtener el valor seleccionado en el select1
        const itemSelected = ociSelected.value;
        ociKNumberHidden.value = parseInt(event.target.selectedIndex-1);

        inputNumberOtDisabled.value = ""
        inputNumberOtDisabled.disbled = true
        inputNumeroOtDetalle.value = ""
        inputNumeroOtDetalle.disabled = true
        inputDescriptionOtDisabled.value = ""
        inputDescriptionOtDisabled.disabled = true
        swal2Title.innerText = `Agregar ítem #`

        // Limpiar el select de OT
        selectOtNumber.innerHTML = '<option selected value="" disabled>Seleccione una OT</option>';

        if (itemSelected) {
            selectOtNumber.disabled = false;

            ociNumber.forEach(obj => {
                obj.number == itemSelected ? arrayOtFiltrado.push(obj) : null
            });

            arrayOtFiltrado.forEach(obj => {
                if (!numerosUnicos.has(obj.numero)) {
                    numerosUnicos.add(obj.numero)
                    arrayOtReFiltrado.push(obj)
                }
            });

            arrayOtReFiltrado.forEach((dato) => {
                const optionOt = document.createElement('option');
                optionOt.value = dato.numero;
                optionOt.text = `#${dato.numero} - ${dato.descripcion} - ${dato.numeroOp} - ${dato.statusOp}`;
                selectOtNumber.appendChild(optionOt);
            });
            const selectOtChild = document.getElementById('containerNumberOt')
            selectOtChild.appendChild(selectOtNumber);

            let inputSelect = document.getElementById('otSelect')
            let otKNumberHidden = document.getElementById('otKNumberHidden')
            inputSelect.addEventListener('change', function(event) {
                otKNumberHidden.value = parseInt(event.target.selectedIndex-1);

                inputDescriptionOtDisabled.disabled = false
                inputNumberDetailDisabled.disabled = false 
                inputNumberOtDisabled.value = event.target.value
                swal2Title.innerText = `Agregar ítem #${inputNumberOtDisabled.value}.${inputNumeroOtDetalle.value}`
            })

        } else {
            selectOciNumber.disabled = true;
        }
    })

    let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /[#"$%?¡¿^/=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.add("border", "border-danger", "border-2")
            
            } else {
                input.classList.remove("border", "border-danger", "border-2")
            }
        })

        input.addEventListener('input', function(event) {
            swal2Title.innerText = `Agregar ítem #${document.getElementById('inputNumberOtDisabled').value}.${inputNumeroOtDetalle.value}`
        })
    })
}

//---- Add Details to OT from Btn from Excel file----------------
function messageModalAddDetallesOtFromFile(idProjectSelected, clientId, idOciOtDet, arrayIdOciOt, kNumberOci) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let ociNumber = []    
    for(let ood = 0; idOciOtDet.length>ood; ood++) {
        const kNumberOci = idOciOtDet[ood][0]
        let arrayValueBtn
        document.getElementById(`btnAddDetallesFormSelected${arrayIdOciOt[ood]}`) ?
        arrayValueBtn = (document.getElementById(`btnAddDetallesFormSelected${arrayIdOciOt[ood]}`).value).split(',') : null

        ociNumber.push({number: parseInt(document.getElementById(`ociNumber${kNumberOci}`).textContent), 
                    alias: document.getElementById(`ociAlias${kNumberOci}`).textContent,
                    numero: document.getElementById(`lastOtNumber${idOciOtDet[ood]}`) ?
                            parseInt(document.getElementById(`lastOtNumber${idOciOtDet[ood]}`).textContent) :
                            parseInt(document.getElementById(`btnAddDetallesFormSelected${arrayIdOciOt[ood]}`).name),
                    descripcion: document.getElementById(`lastOpDescription${idOciOtDet[ood]}`) ? 
                                document.getElementById(`lastOpDescription${idOciOtDet[ood]}`).textContent : arrayValueBtn[3],
                    numeroOp: document.getElementById(`lastOpNumber${idOciOtDet[ood]}`) ?
                                parseInt(document.getElementById(`lastOpNumber${idOciOtDet[ood]}`).textContent) :  arrayValueBtn[1],
                    statusOp: document.getElementById(`statusDetalle${idOciOtDet[ood]}`) ?
                            document.getElementById(`statusDetalle${idOciOtDet[ood]}`).textContent : arrayValueBtn[2] ? statusOt = 'Activo' : statusOt = 'Inactivo' })
    }

    // Crear un array para los resultados filtrados y un Set para números únicos
    const numerosUnicos = new Set();
    const arrayFiltrado = [];

    // Recorrer el array de objetos
    ociNumber.forEach(obj => {
        if (!numerosUnicos.has(obj.number)) {
            // Si el número no ha sido agregado, lo añadimos
            numerosUnicos.add(obj.number)
            arrayFiltrado.push(obj);
        }
    });

    let html = `<form id="formModalAddOtDetalleFromFile${idProjectSelected}" action="/api/programas/addModalOtDetalleFromFile/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="numberOci" class="form-label d-flex justify-content-start ms-1">Número OCI - Alias</label>
                                <div id="containerNumberOci"></div>
                            </div>
                            <div class="col-2 my-auto">
                                <i class="fa-solid fa-right-long fa-beat fa-xl" style="color: #0000ff;"></i>
                            </div>
                            <div class="col-6">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">#OT - Descripción - #Op - Status</label>
                                <div id="containerNumberOt"></div>
                            </div>
                        </div>

                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col">
                                <label for="inputExcel" class="form-label d-flex justify-content-start ms-1">Seleccione archivo Excel LdM con ítems a importar</label>
                                <input type="file" id="inputExcel" accept=".xlsx, .xls" class="form-control" placeholder="Lista de Materiales" value="" required disabled>
                            </div>
                        </div>

                        <!-- Campo para mostrar cuántas filas se agregarán -->
                        <p>Total de ítem importados: <span class="badge rounded-pill bg-dark text-white my-1" id="rowCount">0</span></p>

                        <div id="formContainer" class="row justify-content-between mb-3 mx-1 px-1"></div>

                        <input type="hidden" name="clientIdHidden" value="${clientId}">
                        <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden" value="${kNumberOci}">
                        <input type="hidden" name="ociNumberHiddenFile" id="ociNumberHiddenFile" value="">
                        <input type="hidden" name="otKNumberHidden" id="otKNumberHidden" value="">
                        <input type="hidden" name="otNumberHidden" id="otNumberHidden" value="">
                        <input type="hidden" name="rowCountDetailsQty" id="rowCountDetailsQty" value="">
                    </fieldset>
                </form>`

    if (idProjectSelected) {
        Swal.fire({
            title: `Agregar ítems desde archivo Excel`,
            position: 'center',
            html: html,
            width: 850,
            icon: 'info',
            showCancelButton: true,
            showCloseButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Guardar <i class="fa-regular fa-save"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }

        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formModalAddOtDetalleFromFile${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `Los ítems, se crearon con éxito!`
                })

            } else {
                Swal.fire(
                    `Los ítems no se crearon!`,
                    `Los ítems, no se crearon correctamente!`,
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
            text: `Los ítems no se crearon correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    const selectOciNumber = document.createElement('select');
    selectOciNumber.classList.add('form-select')
    selectOciNumber.setAttribute('id', 'ociSelect')
    selectOciNumber.setAttribute('disabled', true)

    //*******-------------------------------------------****** */
    const selectOtNumber = document.createElement('select');
    selectOtNumber.classList.add('form-select')
    selectOtNumber.setAttribute('id', 'otSelect')
    selectOtNumber.setAttribute('disabled', true)

    let inputExcelDisabled = document.getElementById('inputExcel')
    //******-------------------------------------------******* */
    
    arrayFiltrado.forEach((dato, index) => {
        const option = document.createElement('option');
        option.value = dato.number;
        option.text = `#${dato.number} - ${dato.alias}`;
        
        index === parseInt(kNumberOci) ? option.selected = true : null // Seleccionar el primer dato por defecto

        selectOciNumber.appendChild(option);
    });
    document.getElementById('containerNumberOci').appendChild(selectOciNumber);


    const ociSelected = document.getElementById('ociSelect')    
    if (ociSelected) {
        const arrayOtFiltrado = [], arrayOtReFiltrado = [];
        const numerosUnicosOt = new Set();

        // Obtener el valor seleccionado en el select1
        const itemSelected = ociSelected.value;

        // Limpiar el select de OT
        selectOtNumber.innerHTML = '<option selected value="" disabled>Seleccione una OT</option>';

        if (itemSelected) {
            selectOtNumber.disabled = false;

            ociNumber.forEach(obj => {
                obj.number == itemSelected ? arrayOtFiltrado.push(obj) : null
            });

            arrayOtFiltrado.forEach(obj => {
                if (!numerosUnicosOt.has(obj.numero)) {
                    numerosUnicosOt.add(obj.numero)
                    arrayOtReFiltrado.push(obj)
                }
            });

            arrayOtReFiltrado.forEach((dato) => {
                const optionOt = document.createElement('option');
                optionOt.value = dato.numero;
                optionOt.text = `#${dato.numero} - ${dato.descripcion} - ${dato.numeroOp} - ${dato.statusOp}`;
                selectOtNumber.appendChild(optionOt);
            });
            const selectOtChild = document.getElementById('containerNumberOt')
            selectOtChild.appendChild(selectOtNumber);

            let inputSelect = document.getElementById('otSelect')
            let otKNumberHidden = document.getElementById('otKNumberHidden')
            let otNumberHidden = document.getElementById('otNumberHidden')
            let ociNumberHidden = document.getElementById('ociNumberHiddenFile')
            ociNumberHidden.value = itemSelected
            //console.log('ociNumberHiddenFile: ', ociNumberHidden)

            inputSelect.addEventListener('change', function(event) {
                inputExcelDisabled.disabled = false
                otKNumberHidden.value = parseInt(event.target.selectedIndex-1);
                otNumberHidden.value = parseInt(event.target.value);
            })

        } else {
            selectOciNumber.disabled = true;
        }
    }

    const formContainer = document.getElementById('formContainer');
        const rowCount = document.getElementById('rowCount');
        let itemIndex = 1;

        document.getElementById('inputExcel').addEventListener('change', function(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Suponemos que los datos están en la primera hoja
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convertir la hoja de Excel a JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                // Eliminar la fila de encabezados
                const rows = jsonData.slice(5);

                // Limpiar el contenedor de formulario si ya había algo
                formContainer.innerHTML = ""; 
                itemIndex = 1; // Reiniciar el enumerador

                // Procesar cada fila del Excel
                rows.forEach((row, index) => {
                    const item = row[0];       // Primera columna (Detalle)
                    const descripcion = row[1];   // Segunda columna (Descripción)
                    let detalleNumber

                    if (item && descripcion) {
                        if (isNaN(parseInt(item))) {  // Verificar si el item no es un número
                            detalleNumber = parseInt(item.split('-')[0]);

                            // Si el detalleNumber es NaN y el item empieza con "M"
                            isNaN(detalleNumber) && item.startsWith("M") ? agregarFilaFormulario(item, descripcion) : null

                        } else {
                            // Si es un número válido, se asigna directamente a detalleNumber
                            detalleNumber = parseInt(item);
                        }

                        // Verificar que el número esté en el rango 1000-1399
                        detalleNumber >= 1000 && detalleNumber <= 1399 ? agregarFilaFormulario(item, descripcion) : null
                    }
                });

                // Actualizar el contador de filas totales
                rowCount.textContent = itemIndex - 1;
                document.getElementById('rowCountDetailsQty').value = itemIndex - 1
            };

            // Leer el archivo como binario
            reader.readAsArrayBuffer(file);

            let btnAceptarModal = document.getElementsByClassName('swal2-confirm');
            btnAceptarModal[0].removeAttribute('disabled')
            btnAceptarModal[0].style = "cursor: pointer;"
        });

        function capitalizarPrimeraLetra(str) {
            return str
                .toLowerCase() // Convertimos todo el string a minúsculas
                .split(' ') // Separamos las palabras por espacios
                .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)) // Capitalizamos la primera letra de cada palabra
                .join(' '); // Volvemos a unir las palabras en un string
        }

        function agregarFilaFormulario(item, descripcion) {
            // Crear fila para los inputs
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'align-items-center', 'mb-2');
            rowDiv.setAttribute('data-index', itemIndex);

            // Enumerador
            const enumeradorDiv = document.createElement('div');
            enumeradorDiv.classList.add('col-1');
            enumeradorDiv.textContent = `#${itemIndex}`;

            // Input de Detalle
            const detalleDiv = document.createElement('div');
            detalleDiv.classList.add('col-3');
            const detalleInput = document.createElement('input');
            detalleInput.type = 'text';
            detalleInput.name = `numberOtDetalle${itemIndex}`;
            detalleInput.id = `numberOtDetalle${itemIndex}`;
            detalleInput.value = item;
            detalleInput.classList.add('form-control');
            detalleInput.required = true;
            detalleDiv.appendChild(detalleInput);

            // Input de Descripción
            const descripcionDiv = document.createElement('div');
            descripcionDiv.classList.add('col-6');
            const descripcionInput = document.createElement('input');
            descripcionInput.type = 'text';
            descripcionInput.name = `descriptionDetalle${itemIndex}`;
            descripcionInput.id = `descriptionDetalle${itemIndex}`;
            descripcionInput.value = capitalizarPrimeraLetra(descripcion);//descripcion;
            descripcionInput.classList.add('form-control');
            descripcionInput.required = true;
            descripcionDiv.appendChild(descripcionInput);

            // Botón de eliminar
            const deleteDiv = document.createElement('div');
            deleteDiv.classList.add('col', 'text-center');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-outline-danger');
            deleteButton.innerHTML = '<i class="fa-regular fa-circle-xmark fa-xl"></i>'
            deleteButton.onclick = function() {
                eliminarFila(rowDiv);
            };
            deleteDiv.appendChild(deleteButton);

            // Añadir todos los elementos a la fila
            rowDiv.appendChild(enumeradorDiv);
            rowDiv.appendChild(detalleDiv);
            rowDiv.appendChild(descripcionDiv);
            rowDiv.appendChild(deleteDiv);

            // Añadir la fila al contenedor de formulario
            formContainer.appendChild(rowDiv);

            // Incrementar el índice
            itemIndex++;
        }

        function eliminarFila(rowDiv) {
            rowDiv.remove();  // Eliminar la fila
            actualizarEnumeradores();  // Actualizar los enumeradores y el contador
        }

        function actualizarEnumeradores() {
            // Volver a enumerar las filas y actualizar el contador total
            const rows = document.querySelectorAll('#formContainer .row');
            rows.forEach((row, index) => {
                row.querySelector('.col-1').textContent = `#${index + 1}`;
                row.setAttribute('data-index', index + 1);
            });
            itemIndex = rows.length + 1;
            rowCount.textContent = rows.length;  // Actualizar contador de filas
            document.getElementById('rowCountDetailsQty').value = rows.length

            if(rows.length === 0) {
                let btnAceptarModal = document.getElementsByClassName('swal2-confirm');
                btnAceptarModal[0].setAttribute('disabled', true)
                btnAceptarModal[0].style = "cursor: not-allowed;;"
            }
        }
}

//---- Update Detalle OT Data ----------------
function messageUpdateOtDetalle(
    idProjectSelected,
    ociKNumber,
    ociNumber,
    otNumber,
    otKNumber,
    opNumber,
    statusOtDetalle,
    otDescription,
    otDetalle,
    detailKNumber,
    otDescripcionDetalle,
    detalleIdSelected
    ) {
    
    let numberKOci = parseInt(ociKNumber)
    let numberOci = parseInt(ociNumber)
    let numberKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let numberKDetail = parseInt(detailKNumber)
    let numberOp = parseInt(opNumber)
    let checked = 'checked'
    statusOtDetalle==='Activo' ? checked : checked = ''

    let bgColorStatus
    statusOtDetalle==='Activo' ? bgColorStatus='background-color: #55dd5560;' : bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let html = `<form id="formUpdateOtDetail${idProjectSelected}" action="/api/programas/updateOtDetail/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-3">
                                <label for="numberOci" class="form-label d-flex justify-content-start ms-1">Número OCI</label>
                                <input type="number" name="numberOci" class="form-control" value="${numberOci}" disabled>
                            </div>
                            <div class="col-3">
                                <label for="numberOt" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="number" name="numberOt" class="form-control" value="${numberOt}" disabled>
                            </div>
                            
                            <div class="col-5" style="${bgColorStatus}">
                                <label for="statusOt" class="form-label d-flex justify-content-start ms-1">Status Ítem</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactivo</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOtDetalleForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOtDetalleForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusOtDetalle">Activo</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-7">
                                <label for="descriptionOt" class="form-label d-flex justify-content-start ms-1">Descripción OT</label>
                                <input type="text" name="descriptionOt" class="form-control" placeholder="Descripción OT" value="${otDescription}" disabled>
                            </div>
                            <div class="col-4">
                                <label for="numeroOp" class="form-label d-flex justify-content-start ms-1">Número OP</label>
                                <input type="number" name="numeroOp" class="form-control" placeholder="Numero Op" value="${numberOp}" disabled>
                            </div>
                        </div>
                        <hr>
                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="detalleOt" class="form-label d-flex justify-content-start align-items-center ms-1 mb-2">Ítem Número</label>
                                <input type="text" id="detalleOt" name="detalleOt" class="form-control" placeholder="Ítem número" value="${otDetalle.trim()}" required>
                            </div>
                            <div class="col-7">
                                <label for="otDescripcionDetalle" class="form-label d-flex justify-content-start align-items-center ms-1 mb-2">Descripción ítem</label>
                                <input type="text" id="otDescripcionDetalle" name="otDescripcionDetalle" class="form-control" placeholder="Descripción ítem" value="${otDescripcionDetalle}" required>
                            </div>                   
                        </div>
                            <input type="hidden" name="clientIdHidden" value="${clientId.value}">
                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                            <input type="hidden" name="detalleKNumberHidden" id="detalleKNumberHidden${numberKDetail}" value="${numberKDetail}">
                            <input type="hidden" name="detalleIdHidden" id="detalleIdHidden${otDetalle}" value="${detalleIdSelected}">
                    </fieldset>
                </form>`

    const htmlTitle = `Actualizar ítem #${numberOt}.${otDetalle.trim()} - ${otDescripcionDetalle}`

    if(idProjectSelected && numberOt && detalleIdSelected) {
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
                    title: `El ítem #<b>${numberOt}.${otDetalle.trim()}</b>, se modificó con éxito!`
                })

            } else {
                Swal.fire(
                    `Ítem #${numberOt}.${otDetalle.trim()} no modificado!`,
                    `El ítem #${numberOt}.${otDetalle.trim()}</b>, no se modificó!`,
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
            text: `El ítem #<b>${numberOt}.${otDetalle.trim()}</b> no se actualizó correctamente!`,
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
            let forbiddenChars = /[#"$%?¡¿^/=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.add("border", "border-danger", "border-2")
            } else {
                input.classList.remove("border", "border-danger", "border-2")
            }
        })
    })
}

//------- Change ítem OT status ----------------
function messageChangeOtDetalleStatus(
    idProjectSelected,
    ociKNumber,
    otNumber,
    otKNumber,
    statusOtDetalle, 
    otDetalle,
    detailKNumber,
    otDetalleDescripcion,
    detalleIdSelected
) {
    let numberKOci = parseInt(ociKNumber)
    let numberKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let numberKDetail = parseInt(detailKNumber)
    let checked = 'checked'
    statusOtDetalle==='Activo' ? checked : checked = ''
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

        Swal.fire({
            title: `Cambio status de ítem OT#${numberOt}.${otDetalle.trim()} - ${otDetalleDescripcion.trim()}`,
            position: 'center',
            html: `El status del ítem #<b>${numberOt}.${otDetalle.trim()}</b> se modificará a
                    <span class="badge rounded-pill bg-${ statusOtDetalle==='Activo' ? 'danger' : 'primary' } text-white">
                    ${ statusOtDetalle==='Activo' ? 'Inactivo' : 'Activo' }
                    </span> y ${ statusOtDetalle==='Activo' ? 'no' : '' } podrá ingresar o modificar datos en este Ítem.<br>
                    ¿Desea continuar?
                    <form id="formChangeStatusOtDetalle${idProjectSelected}" action="/api/programas/updateStatusOtDetalle/${idProjectSelected}" method="post" style="display: none;">
                        <fieldset>
                            <input type="hidden" name="clientIdHidden" value="${clientId.value}">
                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                            <input type="hidden" name="detalleKNumberHidden" id="detalleKNumberHidden${numberKDetail}" value="${numberKDetail}">
                            <input type="hidden" name="statusOtDetalleForm" id="statusOtDetalleHidden${numberKDetail}" value="${statusOtDetalle}">
                            <input type="hidden" name="detalleIdHidden" id="detalleIdHidden${otDetalle}" value="${detalleIdSelected}">
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
                Toast.fire({
                    icon: 'success',
                    title: `El status del ítem OT#<b>${numberOt}.${otDetalle.trim()}</b>, se modificó con éxito!`
                })

            } else {
                Swal.fire(
                    `Status del ítem #<b>${numberOt}.${otDetalle.trim()}</b> no modificado!`,
                    `El status del ítem #${numberOt}.${otDetalle.trim()}, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
}

//---- Delete Detalle de OT ----------------
function messageDeleteOtDetalle(
    idProjectSelected,
    ociKNumber,
    otNumber,
    otKNumber,
    statusOtDetalle, 
    otDetalle,
    detailKNumber,
    otDetalleDescripcion,
    detalleIdSelected
    ) {

    let numberKOci = parseInt(ociKNumber)
    let numberKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let numberKDetail = parseInt(detailKNumber)
    let checked = 'checked'
    statusOtDetalle==='Activo' ? checked : checked = ''

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `
        <div class="container m-auto">
            El ítem #<strong>${numberOt}.${otDetalle.trim()}</strong>, Descripcion: "${otDetalleDescripcion.trim()}",
            Status: <span class="badge rounded-pill bg-${ statusOtDetalle==='Activo' ? 'primary' : 'danger' } text-white">
                        ${ statusOtDetalle==='Activo' ? 'Activo' : 'Inactivo' }
                    </span>
            y toda su información interna se eliminará completamente.
            <br>
            <hr>
            ¿Está seguro que desea continuar?
            <form id="formDeleteOtDetalle${idProjectSelected}" action="/api/programas/deleteOtDetalle/${idProjectSelected}" method="post">
                <fieldset>
                    <input type="hidden" name="clientIdHidden" value="${clientId.value}">
                    <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                    <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                    <input type="hidden" name="detalleKNumberHidden" id="detalleKNumberHidden${numberKDetail}" value="${numberKDetail}">
                    <input type="hidden" name="detalleIdHidden" id="detalleIdHidden${otDetalle}" value="${detalleIdSelected}">
                </fieldset>
            </form>
        </div>`
    
    if(idProjectSelected && numberOt) {
        Swal.fire({
            title: `Eliminar ítem #${numberOt}.${otDetalle.trim()} - ${otDetalleDescripcion.trim()}`,
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
                document.getElementById(`formDeleteOtDetalle${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El ítem #<strong>${numberOt}.${otDetalle.trim()}</strong>, se eliminó correctamente!`
                })

            } else {
                Swal.fire(
                    `Ítem #${numberOt}.${otDetalle.trim()} no eliminado!`,
                    `El ítem #<b>${numberOt}.${otDetalle.trim()}</b>, no se eliminó!`,
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
            text: `El ítem #<b>${otNumber}.${otDetalle.trim()}</b>, no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

function updateBtnCheckSelecMasive(idOci) {     
    const spansIds = [
        `spanCheckSelecMasive`, `spanCheckSelecMasiveDistribution`, 
        `spanCheckSelecMasiveProgPrima`, `spanCheckSelecMasiveProgSeg`,
        `spanCheckSelecMasiveMecaPrima`, `spanCheckSelecMasiveMecaSeg`
    ];

    const spans = spansIds.map(id => document.getElementById(`${id}${idOci}`));
    let newSpans = spans.filter(value => value !== null)

    const btnMasive = document.getElementById(`btnCheckSelecMasive${idOci}`);
    const btnSelectAll = document.getElementById(`btnCheckSelectionAll${idOci}`);

    const cantidadSeleccionados = document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:checked`).length;
    const cantidadTotalXTabla = document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:not(:disabled)`).length;

    const updateSpans = (value) => {
        newSpans.forEach(span => span.innerText = value);
    };

    const updateBtnSelectAll = (title, addClass, removeClass, value) => {
        btnSelectAll.title = title;
        btnSelectAll.classList.replace(removeClass, addClass);
        btnSelectAll.value = value;
    };

    if (cantidadSeleccionados > 0) {
        cantidadSeleccionados === cantidadTotalXTabla ?
            updateBtnSelectAll('Des-Seleccionar todos los ítems', 'btn-danger', 'btn-primary', 1)
        :
            updateBtnSelectAll('Seleccionar todos los ítems', 'btn-primary', 'btn-danger', 0)

        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (${cantidadSeleccionados}/${cantidadTotalXTabla})`;
        updateSpans(cantidadSeleccionados);

    } else {
        updateBtnSelectAll('Seleccionar todos los ítems', 'btn-primary', 'btn-danger', 0);
        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (0)`;
        updateSpans(0);
    }
}

arrayBtnAddDetallesOt.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnAddDetallesFormSelected/;
            // Eliminar el texto inicial de la cadena
            let idOciOt = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOciOt.split('_')

            let regexRows = /^rowSelected/;
            // Seleccionar todos los <tr> cuyos id comienzan con "rowSelected"
            let rows = document.querySelectorAll(`tr[id^="rowSelected${idOciOt}"]`);

            let filteredRowsNodes = Array.from(rows).filter(function(row) {
                return row.id.includes(idOciOt);
            });

            let idOciOtDet, otNumber, opNumber, statusOt, otDescription
            if (filteredRowsNodes[filteredRowsNodes.length-1]) {
                idOciOtDet = filteredRowsNodes[filteredRowsNodes.length-1].id.replace(regexRows, '')
                otNumber = parseInt(document.getElementById(`lastOtNumber${idOciOtDet}`).textContent)
                opNumber = parseInt(document.getElementById(`lastOpNumber${idOciOtDet}`).textContent)
                statusOt = document.getElementById(`statusDetalle${idOciOtDet}`).textContent
                otDescription = document.getElementById(`lastOpDescription${idOciOtDet}`).textContent
            
            } else {
                otNumber = parseInt(document.getElementById(`btnAddDetallesFormSelected${idOciOt}`).name)
                let arrayValueBtn = (document.getElementById(`btnAddDetallesFormSelected${idOciOt}`).value).split(',')
                opNumber = arrayValueBtn[1]
                arrayValueBtn[2] ? statusOt = 'Activo' : statusOt = 'Inactivo'
                otDescription = arrayValueBtn[3]
            }
            
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const clientId = document.getElementById(`clientIdHidden`).value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const ociNumber = parseInt(document.getElementById(`ociNumber${ociKNumber}`).textContent)
            const otKNumber = parseInt(arrayOciOtSelected[1])

            console.log(idProjectSelected, ociKNumber, ociNumber, otNumber, otKNumber, opNumber, statusOt, otDescription)

            messageAddDetalleOt(
                idProjectSelected,
                clientId,
                ociKNumber,
                ociNumber,
                otNumber,
                otKNumber,
                opNumber,
                cleanString(statusOt),
                cleanString(otDescription),
            )
        })
    }
})

arrayBtnAddDetallesOtFromFile.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnAddDetallesFromExcelFile/;
            let idOci = elementoId.replace(regex, '')

            let regexRows = /^rowSelected/;
            let regexBtns = /^btnAddDetallesFormSelected/;
            let arrayIdOciOt = [], arrayIdOciOtDet = [], kNumberOci = []

            let rows = document.querySelectorAll('tr[id^="rowSelected"]');
            let filteredRowsNodes = Array.from(rows).filter(function(row) {
                return row.id;
            });

            let btnsAddOtNumber = document.querySelectorAll('button[id^="btnAddDetallesFormSelected"]');
            let filteredBtnsNodes = Array.from(btnsAddOtNumber).filter(function(btn) {
                return btn.id;
            });

            for (s=0; filteredBtnsNodes.length > s; s++) {
                arrayIdOciOtDet.push(filteredBtnsNodes[s].id.replace(regexBtns, '')+'_0')
                arrayIdOciOt.push(filteredBtnsNodes[s].id.replace(regexBtns, ''))
            }
            
            for (r=0; filteredRowsNodes.length > r; r++) {
                arrayIdOciOtDet.push(filteredRowsNodes[r].id.replace(regexRows, ''))
            }
            
            kNumberOci = idOci //[...new Set(idOciOtDet.map(item => item.charAt(0)))];
            let idOciOtDet = [...new Set(arrayIdOciOtDet)];

            const idProjectSelected = document.getElementById('projectIdHidden').value
            const clientId = document.getElementById(`clientIdHidden`).value

            messageModalAddDetallesOtFromFile(
                idProjectSelected,
                clientId,
                idOciOtDet,
                arrayIdOciOt,
                kNumberOci
            )
        })
    }
})

arrayBtnAddDetallesModal.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            
            let regexRows = /^rowSelected/;
            let regexBtns = /^btnAddDetallesFormSelected/;
            let arrayIdOciOt = [], arrayIdOciOtDet = [], kNumberOci = []
    
            let rows = document.querySelectorAll('tr[id^="rowSelected"]');
            let filteredRowsNodes = Array.from(rows).filter(function(row) {
                return row.id;
            });
    
            let btnsAddOtNumber = document.querySelectorAll('button[id^="btnAddDetallesFormSelected"]');
            let filteredBtnsNodes = Array.from(btnsAddOtNumber).filter(function(btn) {
                return btn.id;
            });
    
            for (s=0; filteredBtnsNodes.length > s; s++) {
                arrayIdOciOtDet.push(filteredBtnsNodes[s].id.replace(regexBtns, '')+'_0')
                arrayIdOciOt.push(filteredBtnsNodes[s].id.replace(regexBtns, ''))
            }
            
            for (r=0; filteredRowsNodes.length > r; r++) {
                arrayIdOciOtDet.push(filteredRowsNodes[r].id.replace(regexRows, ''))
            }
    
            kNumberOci = [...new Set(arrayIdOciOtDet.map(item => item.charAt(0)))]
    
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const clientId = document.getElementById(`clientIdHidden`).value
    
            messageModalAddDetallesOt(
                idProjectSelected,
                clientId,
                arrayIdOciOt,
                arrayIdOciOtDet,
                kNumberOci,
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
            let idOciOt = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOciOt.split('_')

            let regexRows = /^rowSelected/;
            // Seleccionar todos los <tr> cuyos id comienzan con "rowSelected"
            let rows = document.querySelectorAll(`tr[id^="rowSelected${idOciOt}"]`);

            let filteredRowsNodes = Array.from(rows).filter(function(row) {
                return row.id.includes(idOciOt);
            });
            // console.log('filteredRowsNodes: ', filteredRowsNodes)
            let idOciOtDet = filteredRowsNodes[filteredRowsNodes.length-1].id.replace(regexRows, '')
            
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const ociNumber = document.getElementById(`ociNumber${ociKNumber}`).textContent
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOciOtDet}`).textContent)
            const otKNumber = parseInt(arrayOciOtSelected[1])       
            const opNumber = parseInt(document.getElementById(`lastOpNumber${idOciOtDet}`).textContent)
            const statusOt = document.getElementById(`statusDetalle${idOciOtDet}`).textContent
            const opDescription = document.getElementById(`lastOpDescription${idOciOtDet}`).textContent
            const otDetail =  document.getElementById(`numeroDetalle${idOciOtDet}`).textContent
            const detailKNumber = parseInt(arrayOciOtSelected[2])
            const detailDescription =  document.getElementById(`descripcionDetalle${idOciOtDet}`).textContent
            const detailIdSelected = document.getElementById(`detalleIdHidden${idOciOtDet}`).textContent
            
            messageUpdateOtDetalle(
                idProjectSelected,
                ociKNumber,
                ociNumber,
                otNumber,
                otKNumber,
                opNumber,
                cleanString(statusOt),
                cleanString(opDescription),
                cleanString(otDetail),
                detailKNumber,
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
            let idOciOt = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOciOt.split('_')

            let regexRows = /^rowSelected/;
            // Seleccionar todos los <tr> cuyos id comienzan con "rowSelected"
            let rows = document.querySelectorAll(`tr[id^="rowSelected${idOciOt}"]`);

            let filteredRowsNodes = Array.from(rows).filter(function(row) {
                return row.id.includes(idOciOt);
            });

            let idOciOtDet = filteredRowsNodes[filteredRowsNodes.length-1].id.replace(regexRows, '')
            
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOciOtDet}`).textContent)
            const otKNumber = parseInt(arrayOciOtSelected[1])       
            const statusOt = document.getElementById(`statusDetalle${idOciOtDet}`).textContent
            const otDetail =  document.getElementById(`numeroDetalle${idOciOtDet}`).textContent
            const detailKNumber = parseInt(arrayOciOtSelected[2])
            const detailDescription =  document.getElementById(`descripcionDetalle${idOciOtDet}`).textContent
            const detailIdSelected = document.getElementById(`detalleIdHidden${idOciOtDet}`).textContent
            
            messageChangeOtDetalleStatus(
                idProjectSelected,
                ociKNumber,
                otNumber,
                otKNumber,
                cleanString(statusOt),
                cleanString(otDetail),
                detailKNumber,
                cleanString(detailDescription),
                detailIdSelected
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
            let idOciOt = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOciOt.split('_')

            let regexRows = /^rowSelected/;
            // Seleccionar todos los <tr> cuyos id comienzan con "rowSelected"
            let rows = document.querySelectorAll(`tr[id^="rowSelected${idOciOt}"]`);

            let filteredRowsNodes = Array.from(rows).filter(function(row) {
                return row.id.includes(idOciOt);
            });
            // console.log('filteredRowsNodes: ', filteredRowsNodes)
            let idOciOtDet = filteredRowsNodes[filteredRowsNodes.length-1].id.replace(regexRows, '')
            
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOciOtDet}`).textContent)
            const otKNumber = parseInt(arrayOciOtSelected[1])       
            const statusDetalle = document.getElementById(`statusDetalle${idOciOtDet}`).textContent
            const otDetail =  document.getElementById(`numeroDetalle${idOciOtDet}`).textContent
            const detailKNumber = parseInt(arrayOciOtSelected[2])
            const detailDescription =  document.getElementById(`descripcionDetalle${idOciOtDet}`).textContent
            const detailIdSelected = document.getElementById(`detalleIdHidden${idOciOtDet}`).textContent
            
            messageDeleteOtDetalle(
                idProjectSelected,
                ociKNumber,
                otNumber,
                otKNumber,
                cleanString(statusDetalle),
                cleanString(otDetail),
                detailKNumber,
                cleanString(detailDescription),
                detailIdSelected
            )
        })
    }
})

arrayCheckBoxSelect.forEach(function(element) {
    element.checked = ''
    element.addEventListener('change', (event) => {
        event.preventDefault()
        const idOtOciDet = (event.target.id).slice(11)
        // console.log('idOtOciDet:' , idOtOciDet)
        let rowSelectCheck
        document.getElementsByName(`rowSelected${idOtOciDet}`) ?
            rowSelectCheck = Array.from(document.getElementsByName(`rowSelected${idOtOciDet}`)) : null

        let idOci = extractTreeNumbers(element.id)[0]
        // let idOt = extractTreeNumbers(element.id)[1]
        // let idDet = extractTreeNumbers(element.id)[2]

        updateBtnCheckSelecMasive(idOci)

        for (let q=0; q<rowSelectCheck.length; q++) { //7
            rowSelectCheck[q] && rowSelectCheck[q].style.cssText === "height: 5vh;" ?
                rowSelectCheck[q].setAttribute('style', "height: 5vh; background-color: #c4f0fd;")
            :
                rowSelectCheck[q].setAttribute('style', "height: 5vh;")
        }
    })
})

arrayBtnCheckSelectionAll.forEach(function(element) {
    let seleccionados = false;
    let seleccionarFilas = false;

    if (element) {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const idOci = parseInt(element.id.slice(20));
            const checkboxes = Array.from(document.querySelectorAll(`#tablaGeneral${idOci} tbody input[type="checkbox"]`));
            const spanIds = [
                `spanCheckSelecMasive`, `spanCheckSelecMasiveDistribution`, 
                `spanCheckSelecMasiveProgPrima`, `spanCheckSelecMasiveProgSeg`, 
                `spanCheckSelecMasiveMecaPrima`, `spanCheckSelecMasiveMecaSeg`
            ];
            const spans = spanIds.map(id => document.getElementById(`${id}${idOci}` ));
            let newSpans = spans.filter(value => value !== null)

            let arrQueryRows = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.id) {
                    const idOtOciDet = checkbox.id.slice(11);
                    const rowsSelectCheck = document.getElementsByName(`rowSelected${idOtOciDet}`);
                    const statusDetalle = document.getElementById(`statusDetalle${idOtOciDet}`);
                    const statusOt = document.getElementById(`lastOtDetalleStatus${idOtOciDet}`);

                    if (rowsSelectCheck && statusDetalle.innerText === 'Activo' && statusOt.innerText === 'Activo') {
                        arrQueryRows.push(rowsSelectCheck);
                    }
                }
            });

            // Función para seleccionar/des-seleccionar todas las filas
            const seleccionarTodasFilas = () => {
                arrQueryRows.forEach(nodeList => {
                    nodeList.forEach(element => {
                        element.style = seleccionarFilas ? "height: 5vh;" : "height: 5vh; background-color: rgb(196, 240, 253);";
                    });
                });
                seleccionarFilas = !seleccionarFilas;
            };
            seleccionarTodasFilas();

            // Función para seleccionar/des-seleccionar todos los checkboxes
            const seleccionarTodos = () => {
                checkboxes.forEach(checkbox => {
                    if (!checkbox.disabled) {
                        checkbox.checked = !seleccionados;
                    }
                });
                seleccionados = !seleccionados;
            };
            seleccionarTodos();

            // Actualizar clases y valores del botón
            const toggleButtonState = (isPrimary) => {
                if (isPrimary) {
                    element.classList.replace("btn-primary", "btn-danger");
                    element.value = 1;
                    element.title = 'Des-Seleccionar todos los ítems';
                } else {
                    element.classList.replace("btn-danger", "btn-primary");
                    element.value = 0;
                    element.title = 'Seleccionar todos los ítems';
                }
            };
            toggleButtonState(element.classList.contains("btn-primary"));

            // Actualizar valores de los spans
            const updateSpans = (value) => {
                newSpans.forEach(span => span.innerText = value);
            };
            updateSpans(arrQueryRows.length);

            updateBtnCheckSelecMasive(idOci);
        });
    }
});

//-----Btns Buscar en BBDD el Usuario Seguidor de Diseño/Simulación --------------
const userNameBanner = document.getElementById('userNameBanner').innerText

function messageAlertUser(titulo, message, icon){
    Swal.fire(
        titulo, 
        message, 
        icon);
    return false
}

async function cargarUsuario(idPermiso, idPermisoNumero) {
    const permisos = {
        'searchDesignUser': {
            permisoUsuario: 'diseno',
            tituloSeguimiento: 'Seguimiento Diseño',
            inputTarget: `internoDiseno${idPermisoNumero}`
        },
        'searchDesignUserModal': {
            permisoUsuario: 'diseno',
            tituloSeguimiento: 'Seguimiento Diseño',
            inputTarget: `internoDiseno${idPermisoNumero}`
        },
        'searchSimulationUser': {
            permisoUsuario: 'simulacion',
            tituloSeguimiento: 'Seguimiento Simulación',
            inputTarget: `internoSimulacion${idPermisoNumero}`
        },
        'searchSimulationUserModal': {
            permisoUsuario: 'simulacion',
            tituloSeguimiento: 'Seguimiento Simulación',
            inputTarget: `internoSimulacion${idPermisoNumero}`
        },
        'searchSupplier': {
            permisoUsuario: 'proveedor',
            tituloSeguimiento: 'Proveedor',
            inputTarget: `externoDiseno${idPermisoNumero}`
        },
        'searchSupplierModal': {
            permisoUsuario: 'proveedor',
            tituloSeguimiento: 'Proveedor',
            inputTarget: `externoDiseno${idPermisoNumero}`
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
                            <input id="${i}" class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${user.name} ${user.lastName}">
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
                <label>Otros Usuarios</label>
                <div name='container' class="container">
                    ${arrayUsersAll.join(' ')}
                </div>
                <hr>`;

            Swal.fire({
                title: tituloSeguimiento,
                html: html,
                width: 550,
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

        const suppliers = await response.json();
        const arrayProveedoresEspecificos = [], arraySuppliersAll = [];

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
                    supplier.type === `${permisoProveedor}` ? arrayProveedoresEspecificos.push(supplierHTML) : arraySuppliersAll.push(supplierHTML);
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
                const radioSelected = document.querySelector('input[name="radioProveedores"]:checked');
                if (result.isConfirmed && radioSelected) {
                    const inputSupplierSelected = document.getElementById(`${inputTarget}`);
                    inputSupplierSelected.value = radioSelected.value;

                } else {
                    const titulo = 'Proveedor no seleccionado'
                    const message = 'No ha seleccionado ningún proveedor!'
                    const icon = 'warning'
                    messageAlertUser(titulo, message, icon)
                }
            });

        } else {
            throw new Error(`No hay proveedores que seleccionar`);
        }

    } catch (error) {
        const titulo = 'Error'
        const message = `${error}`
        const icon = 'error'
        messageAlertUser(titulo, message, icon)
    }
    disabledBtnAceptar()
}

arrayBtnSearchDesignerUser.forEach(function(element) {
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
                await cargarUsuario(idPermiso, idPermisoNumero);

            } catch (error) {
                const titulo = 'Error al cargar los usuarios'
                const message = error
                const icon = 'error'
                messageAlertUser(titulo, message, icon)
            }
        }, { once: true });
    }
});

arrayBtnSearchSimulationUser.forEach(function(element) {
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
                await cargarUsuario(idPermiso, idPermisoNumero);

            } catch (error) {
                const titulo = 'Error al cargar los usuarios'
                const message = error
                const icon = 'error'
                messageAlertUser(titulo, message, icon)
            }
        }, { once: true });
    }
})

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
                const titulo = 'Error al cargar los proveedores'
                const message = error
                const icon = 'error'
                messageAlertUser(titulo, message, icon)
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
                for (let i=0; otArray.length>i; i++) {
                    if (otArray[i]) {
                        document.getElementById(`internoDiseno${i}`).removeAttribute('disabled')
                        document.getElementById(`internoSimulacion${i}`).removeAttribute('disabled')
                        document.getElementById(`externoDiseno${i}`).removeAttribute('disabled')
                    }
                }
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
        Swal.fire(
            'Error',
            `Hubo un error al seleccionar la OCI!`,
            'error'
        )
        return false
    }
})

//---------- Obtiene la lista de OT e Items ------------
function getOtList(i) {
    const parentDiv = document.getElementById(`tablaGeneral${i}`);
    const tableBody = parentDiv.lastElementChild;
    const lastChild = tableBody.childElementCount;
    const k = i;

    // Función auxiliar para obtener el texto de un elemento si existe
    const getElementText = id => document.getElementById(id)?.innerText || null;

    // Arrays para almacenar los datos
    const arrayOtNumber = [], arrayOpNumber = [], arrayOtDetalleStatus = [], arrayOtDetalle = [], 
        arrayDescripcionDetalle = [], arrayOnumber = [], arrayNnumber = [], arrayDetalleId = [], arraySelectedCheck = [], arrayONumberSelect = [];

    // Configuración de mapeo de IDs a arrays
    const mappings = [
        { prefix: 'lastOtNumber', array: arrayOtNumber, isOt: true },
        { prefix: 'lastOpNumber', array: arrayOpNumber },
        { prefix: 'statusDetalle', array: arrayOtDetalleStatus },
        { prefix: 'numeroDetalle', array: arrayOtDetalle, isDetalle: true },
        { prefix: 'descripcionDetalle', array: arrayDescripcionDetalle },
        { prefix: 'detalleIdHidden', array: arrayDetalleId },
    ];

    for (let n = 0; n < lastChild; n++) {
        for (let o = 0; o < lastChild; o++) {
            mappings.forEach(({ prefix, array, isDetalle, isOt }) => {
                const id = `${prefix}${k}_${n}_${o}`;
                const text = getElementText(id);
                const checkId = `checkSelect${k}_${n}_${o}`;
                const selectCheck = document.getElementById(checkId);

                selectCheck?.checked ? arraySelectedCheck.push(`${k}_${n}_${o}`) : null

                if (text) {
                    array.push(text);
                    if (isDetalle) arrayOnumber.push(`${k}_${n}_${o}`);
                    if (isOt) arrayNnumber.push(`${n}`);
                }
            });
        }
    }

    // Eliminar duplicados y vacíos
    const uniqueSelectedCheck = [...new Set(arraySelectedCheck)];
    const uniqueONumberSelect = [...new Set(arrayOnumber)];

    // Encontrar índices de los elementos seleccionados
    const indicesSelected = uniqueSelectedCheck.map(selected => uniqueONumberSelect.indexOf(selected)).filter(index => index !== -1);

    if (uniqueSelectedCheck.length > 0) {
        return {
            arrayOtNumber,
            arrayOpNumber,
            arrayOtDetalleStatus,
            arrayOtDetalle,
            arrayDescripcionDetalle,
            arrayOnumber,
            arrayNnumber,
            arrayDetalleId,
            lastChild: uniqueSelectedCheck.length,
            arraySelectedCheck: uniqueSelectedCheck,
            indicesSelected,
            arrayONumberSelect: uniqueONumberSelect
        };

    } else {
        Swal.fire({
            title: `Detalle no seleccionado`,
            html: 'Debe seleccionar al menos un detalle!',
            icon: 'warning',
            width: 400
        });
        return false;
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
        arrayFCero: [], arrayEstadoFCero: [], arrayRevisionFCero: [],
        arrayFUno: [], arrayEstadoFUno: [], arrayRevisionFUno: [],
        arrayFDos: [], arrayEstadoFDos: [], arrayRevisionFDos: [],
        arrayFTres: [], arrayEstadoFTres: [], arrayRevisionFTres: [],
        arrayFCuatro: [], arrayEstadoFCuatro: [], arrayRevisionFCuatro: [],
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
        15: ['arrayNotasMecanizado', 'arrayRevisionNotasMecanizado']
    };

    for (let n = 0; n < lastChild; n++) {
        for (let o = 0; o < lastChild; o++) {
            for (let q = qInicialX; q < qFinalX; q++) {
                const resHidden = document.getElementById(`resHidden${k}_${n}_${o}_${q}`);
                const resDatoHidden = document.getElementById(`resDatoHidden${k}_${n}_${o}_${q}`);
                const resEstadoHidden = document.getElementById(`resEstadoHidden${k}_${n}_${o}_${q}`);
                const resRevisionHidden = document.getElementById(`resRevisionHidden${k}_${n}_${o}_${q}`);
                
                let otHidden, otRevisionHidden, estadoDetalleHidden, otInfo, otRevision, estadoInfo;
                let flag = 0;
    
                if (resHidden && !resEstadoHidden) {
                    otHidden = resHidden.value;
                    otRevisionHidden = resRevisionHidden.value;
                    otRevision = otRevisionHidden.split(",").pop();
                    otInfo = changeValueFromArray(otHidden.split(",")).pop();

                } else if (resDatoHidden && resEstadoHidden) {
                    otHidden = resDatoHidden.value;
                    estadoDetalleHidden = resEstadoHidden.value;
                    otRevisionHidden = resRevisionHidden.value;
                    estadoInfo = changeValueEstadoFromArray(estadoDetalleHidden.split(",")).pop();
                    otRevision = otRevisionHidden.split(",").pop();
                    otInfo = changeValueFromArray(otHidden.split(",")).pop();
                    flag = 1;

                } else if (resDatoHidden && !resEstadoHidden) {
                    otHidden = resDatoHidden.value;
                    otRevisionHidden = resRevisionHidden.value;
                    otRevision = otRevisionHidden.split(",").pop();
                    otInfo = changeValueFromArray(otHidden.split(",")).pop();
                
                } else {
                    flag = 2;
                }

                const [infoKey, revisionKey, estadoKey] = mapping[q] || [];
                
                if (flag === 1 && infoKey && estadoKey && revisionKey && otHidden && estadoInfo && otRevision) {
                    arrays[infoKey].push(otInfo);
                    arrays[estadoKey].push(estadoInfo);
                    arrays[revisionKey].push(otRevision);

                } else if (flag === 0 && infoKey && revisionKey && otHidden && otRevision) {
                    arrays[infoKey].push(otInfo);
                    arrays[revisionKey].push(otRevision);
                }
            }
        }
    }
    // console.log('arrays: ', arrays)

    const resultMap = {
        4: ['arrayMecanizado2dCompleto', 'arrayRevisionMecanizado2dCompleto', 'arrayMecanizado3dPrefinal', 'arrayRevisionMecanizado3dPrefinal', 'arrayMecanizado3dFinal', 'arrayRevisionMecanizado3dFinal', 'arrayBancoArmado', 'arrayRevisionBancoArmado'],
        7: ['arrayRt', 'arrayRevisionRt', 'arrayEstadoRt', 'arrayPreparacionGeo', 'arrayRevisionPreparacionGeo', 'arrayEstadoPreparacionGeo', 'arrayPrograma2d', 'arrayRevisionPrograma2d', 'arrayEstadoPrograma2d'],
        10: ['arrayPrograma3d2F', 'arrayRevisionPrograma3d2F', 'arrayEstadoPrograma3d2F', 'arrayPrograma3d4F', 'arrayRevisionPrograma3d4F', 'arrayEstadoPrograma3d4F', 'arrayNotasProgramacion', 'arrayRevisionNotasProgramacion'],
        13: ['arrayFCero', 'arrayRevisionFCero', 'arrayEstadoFCero', 'arrayFUno', 'arrayRevisionFUno', 'arrayEstadoFUno', 'arrayFDos', 'arrayRevisionFDos', 'arrayEstadoFDos' ],
        16: ['arrayFTres', 'arrayRevisionFTres', 'arrayEstadoFTres', 'arrayFCuatro', 'arrayRevisionFCuatro', 'arrayEstadoFCuatro', 'arrayNotasMecanizado', 'arrayRevisionNotasMecanizado']
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
        'prodismo': 'PRODISMO',
        'terceros': 'TERCEROS',
        'china': 'CHINA'
    };
    return arrayFromValues.map(value => valueMap[value] || value);
}

function changeValueEstadoFromArray(arrayFromEstadoValues) { //'<i class="fa-solid fa-ban"></i>', '<i class="fa-solid fa-circle-check" style="color: #b09b12;"></i>','<i class="fa-solid fa-arrows-spin" style="color: #008f3;"></i>'
    const valueEstadoMap = {
        'noAplica': 'N/A',
        'terminado': 'Terminado',
        'enProceso': 'En Proceso',
        'suspendido': 'Suspendido',
        'sinDato': 'S/D',
        '': 'S/D'
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
            <option value="terminado">Terminado</option>
            <option value="suspendido">Suspendido</option>
            <option value="noAplica">N/A</option>
        `,
        terminado: `
            <option value="enProceso">En Proceso</option>
            <option value="suspendido">Suspendido</option>
            <option value="noAplica">N/A</option>
        `,
        suspendido: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="noAplica">N/A</option>
        `,
        noAplica: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="suspendido">Suspendido</option>
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
        'En Proceso': { variableValue: 'enProceso', optionKey: 'optionEnProceso', getValueArrayDato: 'En Proceso'},
        'Terminado': { variableValue: 'terminado', optionKey: 'optionTerminado', getValueArrayDato: 'Terminado'},
        'Suspendido': { variableValue: 'suspendido', optionKey: 'optionSuspendido', getValueArrayDato: 'Suspendido'},
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
        sinDato: `
            <option value="prodismo">PRODISMO</option>
            <option value="terceros">Terceros</option>
            <option value="china">CHINA</option>
            <option value="noAplica">N/A</option>
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
    const defaultOption = { variableValue: 'sinDato', optionKey: 'optionDefault', getValueArrayDato: 'S/D', getValueArrayRevision: 0 };

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

function footerFormularioHidden (projectNumberId, clientId, i, arrayBloqueLength, arrayOtKNumber, detallesLength, arrayKNumberDetalles) {
    let footerFormulario = `<input type="hidden" name="projectIdHidden" value="${projectNumberId}">
                            <input type="hidden" name="clientIdHidden" value="${clientId}">
                            <input type="hidden" name="ociNumberK" value="${parseInt(i)}">
                            <input type="hidden" name="otQuantity" value="${parseInt(arrayBloqueLength)}">
                            <input type="hidden" name="otNumberK" value="${arrayOtKNumber}">
                            <input type="hidden" name="detallesQuantity" value="${parseInt(arrayKNumberDetalles.length)}">
                            <input type="hidden" name="totalDetallesQuantity" value="${parseInt(detallesLength)}">
                            <input type="hidden" name="detalleNumberK" value="${arrayKNumberDetalles}">`

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

            Toast.fire({
                title: `Información <strong>${titulo}</strong>, agregada con éxito!`,
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


//***** addDatoToDistribucion ******
function addDatoToOtDistribucion(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueDistribucion = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected); // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])

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
                const divClass = isInactive ? 'pe-none' : ''
                
                arrayBloqueDistribucion.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueDistribucion.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formDistribucionValues" action="/api/programas/infoOtDistribucion/${projectNumberId}" method="post" style="font-size: 10pt">
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
                                ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                        </fieldset>
                    </form>`

        const titulo = "Distribución"
        const ancho = 1600
        const background = '#eeeeee'
        const formulario = 'formDistribucionValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

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
                    option.textContent = `${dato.name} ${dato.lastName}`;  // Asigna el texto visible en la opción (puede ser el nombre u otro dato)
                    
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
        let arrayBloqueProgramacionPrimera = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getUsersNames = cargarUsuarioPcpCad(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])

                let hiddenSelectedRt, hiddenSelectedPreparacionGeo, hiddenSelectedPrograma2d
                getValues.arrayRt[y] != 'S/D' ? hiddenSelectedRt = getValues.arrayRt[y] : hiddenSelectedRt = (switchOptionSelected(getValues.arrayRt[y])).variableValue
                getValues.arrayPreparacionGeo[y] != 'S/D' ? hiddenSelectedPreparacionGeo = getValues.arrayPreparacionGeo[y] : hiddenSelectedPreparacionGeo = (switchOptionSelected(getValues.arrayPreparacionGeo[y])).variableValue
                getValues.arrayPrograma2d[y] != 'S/D' ? hiddenSelectedPrograma2d = getValues.arrayPrograma2d[y] : hiddenSelectedPrograma2d = (switchOptionSelected(getValues.arrayPrograma2d[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="rt${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="rt${y}"
                            oninput="updateInputsSelect()" class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayRt[y]}" disabled>
                                ${getValues.arrayRt[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="rtHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="rtHidden${[y]}" value="${hiddenSelectedRt}">
                    </div>

                    <div class="col my-auto" style="width: 6vw;">
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
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayPreparacionGeo[y]}" disabled>
                                ${getValues.arrayPreparacionGeo[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="preparacionGeoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="preparacionGeoHidden${[y]}" value="${hiddenSelectedPreparacionGeo}">
                    </div>

                    <div class="col my-auto" style="width: 6vw;">
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
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayPrograma2d[y]}" disabled>
                                ${getValues.arrayPrograma2d[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="programa2dHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="programa2dHidden${[y]}" value="${hiddenSelectedPrograma2d}">
                    </div>

                    <div class="col my-auto" style="width: 6vw;">
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
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueProgramacionPrimera.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueProgramacionPrimera.push(`<hr class="my-1">`) : null 
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });
    
        const html = `<form id="formProgramacionPrimeraValues" action="/api/programas/otInfoProgramacionPrimera/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>Req. Tec.</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 6vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Prep. GEO</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 6vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Programas 2D</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 6vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueProgramacionPrimera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`
    
        const titulo = "Programación (1° Parte)"
        const formulario = 'formProgramacionPrimeraValues'
        const ancho = 1880
        const background = '#efefef'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected
    
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
        let arrayBloqueProgramacionSegunda = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getUsersNames = cargarUsuarioPcpCad(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])

                let hiddenSelectedPrograma3d2F, hiddenSelectedPrograma3d4F
                getValues.arrayPrograma3d2F[y] != 'S/D' ? hiddenSelectedPrograma3d2F = getValues.arrayPrograma3d2F[y] : hiddenSelectedPrograma3d2F = (switchOptionSelected(getValues.arrayPrograma3d2F[y])).variableValue
                getValues.arrayPrograma3d4F[y] != 'S/D' ? hiddenSelectedPrograma3d4F = getValues.arrayPrograma3d4F[y] : hiddenSelectedPrograma3d4F = (switchOptionSelected(getValues.arrayPrograma3d4F[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="programa3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="programa3d2F${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayPrograma3d2F[y]}" disabled>
                                ${getValues.arrayPrograma3d2F[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="programa3d2FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="programa3d2FHidden${[y]}" value="${hiddenSelectedPrograma3d2F}">
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
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayPrograma3d4F[y]}" disabled>
                                ${getValues.arrayPrograma3d4F[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="programa3d4FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="programa3d4FHidden${[y]}" value="${hiddenSelectedPrograma3d4F}">
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
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasProgramacion${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasProgramacion${y}" rows="1">${getValues.arrayNotasProgramacion[y].trim()}</textarea>
                        <input type="hidden" id="notasProgramacionHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasProgramacionHidden${[y]}" value="${getValues.arrayNotasProgramacion[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasProgramacion[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasProgramacion${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasProgramacion${y}" value="${getValues.arrayRevisionNotasProgramacion[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueProgramacionSegunda.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueProgramacionSegunda.push(`<hr class="my-1">`) : null 
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });
    
        const html = `<form id="formProgramacionSegundaValues" action="/api/programas/otInfoProgramacionSegunda/${projectNumberId}" method="post" style="font-size: 10pt">
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
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Programación (2° Parte)"
        const formulario = 'formProgramacionSegundaValues'
        const ancho = 1880
        const background = '#efefef'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected
    
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

async function cargarMaquina(res) {
    try {
        const url = `../../../api/maquinas/searchTools/all`
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
            document.getElementById(`fCero${res}`),
            document.getElementById(`fUno${res}`),
            document.getElementById(`fDos${res}`),
            document.getElementById(`fTres${res}`),
            document.getElementById(`fCuatro${res}`)
        ];

        // Itera sobre el array de datos
        datos.forEach(dato => {
            // Itera sobre cada select para agregar una nueva opción
            selectElements.forEach(selectElement => {
                if (selectElement) {
                    const option = document.createElement('option');
                    option.value = dato._id;  // Asigna el valor de la opción (puede ser un ID u otro identificador)
                    option.textContent = `${dato.designation}`;  // Asigna el texto visible en la opción (puede ser el nombre u otro dato)

                    dato.status && dato.type != 'prensa' ? selectElement.appendChild(option) : null
                }
            });
        });
    }
}

//***** addDatoToMecanizadoPrimera ******
function addDatoToMecanizadoPrimera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueMecanizadoPrimera = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
                
                let hiddenSelectedFCero, hiddenSelectedFUno, hiddenSelectedFDos
                getValues.arrayFCero[y] != 'S/D' ? hiddenSelectedFCero = getValues.arrayFCero[y] : hiddenSelectedFCero = (switchOptionSelected(getValues.arrayFCero[y])).variableValue
                getValues.arrayFUno[y] != 'S/D' ? hiddenSelectedFUno = getValues.arrayFUno[y] : hiddenSelectedFUno = (switchOptionSelected(getValues.arrayFUno[y])).variableValue
                getValues.arrayFDos[y] != 'S/D' ? hiddenSelectedFDos = getValues.arrayFDos[y] : hiddenSelectedFDos = (switchOptionSelected(getValues.arrayFDos[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fCero${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCero${y}"
                            oninput="updateInputsSelect()" class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCero[y]}" disabled>
                                ${getValues.arrayFCero[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCeroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCeroHidden${[y]}" value="${hiddenSelectedFCero}">
                    </div>

                    <div class="col my-auto" style="width: 7vw;">
                        <select id="estadoFCero${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCero${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCero[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCero[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCero[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCeroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCeroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCero[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCero[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCero${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCero${y}" value="${getValues.arrayRevisionFCero[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fUno${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fUno${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFUno[y]}" disabled>
                                ${getValues.arrayFUno[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fUnoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fUnoHidden${[y]}" value="${hiddenSelectedFUno}">
                    </div>

                    <div class="col my-auto" style="width: 7vw;">
                        <select id="estadoFUno${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFUno${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFUno[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFUno[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFUno[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFUnoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFUnoHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFUno[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFUno[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFUno${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFUno${y}" value="${getValues.arrayRevisionFUno[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fDos${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fDos${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFDos[y]}" disabled>
                                ${getValues.arrayFDos[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fDosHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fDosHidden${[y]}" value="${hiddenSelectedFDos}">
                    </div>

                    <div class="col my-auto" style="width: 7vw;">
                        <select id="estadoFDos${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFDos${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFDos[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFDos[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFDos[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFDosHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFDosHidden${[y]}"
                        value="${(switchEstadoSelected(getValues.arrayEstadoFDos[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFDos[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFDos${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFDos${y}" value="${getValues.arrayRevisionFDos[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueMecanizadoPrimera.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueMecanizadoPrimera.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formMecanizadoPrimeraValues" action="/api/programas/otInfoMecanizadoPrimera/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F0</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F1</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F2</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueMecanizadoPrimera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (1° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formMecanizadoPrimeraValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

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

//***** addDatoToMecanizadoSegunda ******
function addDatoToMecanizadoSegunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueMecanizadoSegunda = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueMecanizadoSegunda.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueMecanizadoSegunda.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formMecanizadoSegundaValues" action="/api/programas/otInfoMecanizadoSegunda/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
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
                            ${arrayBloqueMecanizadoSegunda.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formMecanizadoSegundaValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

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

// Función para actualizar el valor del campo Text
function updateInputsText() {
    let arrayInputsRange = [], allInputsRange = []
    
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
        const idInputSelectHidden = allInputsSelect[y].id
        
        // Función para insertar "Hidden" en la posición correcta
        function insertarHidden(str) {
            // Buscar el número 9506 u otro patrón que comience con un número
            return str.replace(/(.*)(\d{4})(_.*)/, "$1Hidden$2$3");
        }
        const resultIdInputSelectHidden = insertarHidden(idInputSelectHidden);
        
        let inputSelectHidden = document.getElementById(`${resultIdInputSelectHidden}`)
        inputSelectHidden ? inputSelectHidden.value = document.getElementById(`${allInputsSelect[y].id}`).value : null
    }
}

// Función para actualizar el valor del campo Textarea
function updateInputsTextarea() {
    let arrayInputsTeaxArea = [], allInputsTextarea = []
    
    for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
        document.getElementById(`tablaGeneral${i}`) ? arrayInputsTeaxArea.push(i) : null
    }
    
    arrayInputsTeaxArea !=[] ? allInputsTextarea = document.querySelectorAll('textarea') : null
    //console.log('allInputsTextarea: ',allInputsTextarea)

    allInputsTextarea.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /["¡¿^!'~`\\*{}\[\]<>@,]/;
    
            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.toggle("border", "border-danger", "border-2")
                // input.classList.toggle("border-danger")
                // input.classList.toggle("border-2")
            }
        })
    })

    for (let y=0; y < parseInt(allInputsTextarea.length)-1; y++) {
        const idInputTextarea = allInputsTextarea[y].id
        const idInputTextareaHidden = idInputTextarea.substring(0, idInputTextarea.length - 9) + 'Hidden' + idInputTextarea.substring(idInputTextarea.length - 9)

        // Obtener el valor del textarea   
        let valorTextarea = document.getElementById(`${idInputTextarea}`).value
        // Actualizar el campo de texto con el valor del textarea
        if (valorTextarea) {
            document.getElementById(`${idInputTextareaHidden}`).value = valorTextarea
        }
    }
}

// Función para habilitar el btn aceptar de los models
function disabledBtnAceptar() {
    let btnAceptarModal = document.getElementsByClassName('swal2-confirm');
    const allInputs = document.querySelectorAll('input[type="text"], input[type="number"], select, textarea')
    const allInputsRange = document.querySelectorAll('input[type="range"]')
    const allInputsCheck = document.querySelectorAll('input[type="checkbox"]')
    const allInputsRadio = document.querySelectorAll('input[type="radio"]')

    allInputs.forEach(function(input) {
        if (input) {
            input.addEventListener('input', (event) => {
                // console.log('event', event)
                event.preventDefault()
                input.classList.add('border-primary', 'border-2', 'shadow')
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
        if (input.value && input.name != 'ociNumber') {
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
        button[name="btnOtMecanizadoPrimera"],
        button[name="btnOtMecanizadoSegunda"]
    `);

    let arrayTituloTabla = [
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
            nombreTabla: "tablaOtMecanizadoPrimera",
            btnName: "btnOtMecanizadoPrimera",
            functionName: addDatoToMecanizadoPrimera,
            qInicial: 10,
            qFinal: 13
        },
        {
            nombreTabla: "tablaOtMecanizadoSegunda",
            btnName: "btnOtMecanizadoSegunda",
            functionName: addDatoToMecanizadoSegunda,
            qInicial: 13,
            qFinal: 16
        }
    ]

    allButtonsFromTables.forEach(function(btn) {
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
            input.classList.toggle("border", "border-danger", "border-2")
        }
    })
})

let inputsDeTextarea = document.querySelectorAll('textarea')
inputsDeTextarea.forEach(function(input) {
    input.addEventListener('keydown', function(event) {
        // Obtener el código de la tecla presionada
        let key = event.key;

        // Lista de caracteres especiales prohibidos
        let forbiddenChars = /["¡¿^!'~`\\*{}\[\]<>@,]/;

        // Verificar si la tecla presionada es un carácter especial
        if (forbiddenChars.test(key)) {
            // Cancelar el evento para evitar que se ingrese el carácter
            event.preventDefault()
            input.classList.toggle("border", "border-danger", "border-2")
            // input.classList.toggle("border-danger")
            // input.classList.toggle("border-2")
        }
    })
})