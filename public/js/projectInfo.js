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

// Manejador de eventos de tablas General y Seguimiento -------------------
const arrBtnHidde = []
for (let i = 0; i<varLimMaxOciProyecto; i++) { //25
    if (document.getElementById(`tablaGeneral${i}`)) {
        arrBtnHidde.push(i)
    }
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


if(arrBtnHidde !=[]) {
    let allButtonsHiddeTableGeneral = document.querySelectorAll('button[name="btnHiddeTableGeneral"]')
    let allButtonsHiddeTableSeguimiento = document.querySelectorAll('button[name="btnHiddeTableSeguimiento"]')
    
    allButtonsHiddeTableGeneral.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let kValue = btn.id//event.target.id
                hiddeTableGeneral(extractNumbers(kValue))
            })
        }
    })

    allButtonsHiddeTableSeguimiento.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let kValue = btn.id//event.target.id
                hiddeTableSeguimiento(extractNumbers(kValue))
            })
        }    
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const projectNameHidden = document.getElementById('projectNameHidden').value
    const projectNameTitle = document.getElementById('projectNameTitle')
    projectNameTitle.innerHTML = `Proyecto <strong>${projectNameHidden}</strong>`
})


// ---- Manejador de eventos para Carouseles --------------------
document.addEventListener('DOMContentLoaded', function (event) {
    let initIndex = event.eventPhase

    const arrayCarousel = []
    for (let i = 0; i<varLimMaxOciProyecto; i++) {
        if (document.getElementById(`carouselExampleControls${i}`)) {
            arrayCarousel.push(i)
        }
    }
    if(arrayCarousel !=[]) {
        for (let i=0; i<arrayCarousel.length; i++) {
            let myCarousel = document.getElementById(`carouselExampleControls${arrayCarousel[i]}`)
            
            if (myCarousel) {
                if (initIndex === 2) {
                    myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                } else {
                    myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
                }
            }

            // Detectar cuando el slide cambia
            myCarousel.addEventListener('slid.bs.carousel', function (event) {
                let slideCount = event.relatedTarget.parentElement.children.length
                let currentIndex = event.to

                // Si el slide actual es el último, deshabilita el botón "Next"
                if (currentIndex === slideCount - 1) {
                    myCarousel.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
                } else {
                    myCarousel.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
                }
                // Si el slide actual es el primero, deshabilita el botón "Prev"
                if (currentIndex === 0) {
                    myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                } else {
                    myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
                }
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

// Dividir el array en subarrays de 12 elementos cada uno
const subarrays = dividirArrayEnSubarrays(arrayOriginal, 12);
const subarrayBtns = dividirArrayEnSubarrays(arrayOriginalBtn, 12);

subarrays.forEach((subarray) => {    
        if (subarray.length > 0) {
                switch (parseInt(slideHidden.value)) {
                    case 0:
                        subarray[0].classList.add('active')
                        break;
                    case 1:
                        subarray[1].classList.add('active')
                        break;
                    case 2:
                        subarray[2].classList.add('active')
                        break;
                    case 3:
                        subarray[3].classList.add('active')
                        break;
                    case 4:
                        subarray[4].classList.add('active')
                        break;
                    case 5:
                        subarray[5].classList.add('active')
                        break;
                    case 6:
                        subarray[6].classList.add('active')
                        break;
                    case 7:
                        subarray[7].classList.add('active')
                        break;
                    case 8:
                        subarray[8].classList.add('active')
                        break;
                    case 9:
                        subarray[9].classList.add('active')
                        break;
                    case 10:
                        subarray[10].classList.add('active')
                        break;
                    case 11:
                        subarray[11].classList.add('active')
                        break;
                    default:
                        subarray[0].classList.add('active')
                        break;
                }
        }
});

subarrayBtns.forEach((subarray) => {
        if (subarray.length > 0) {
                switch (parseInt(slideHidden.value)) {
                    case 0:
                        subarray[0].classList.add('active')
                        break;
                    case 1:
                        subarray[1].classList.add('active')
                        break;
                    case 2:
                        subarray[2].classList.add('active')
                        break;
                    case 3:
                        subarray[3].classList.add('active')
                        break;
                    case 4:
                        subarray[4].classList.add('active')
                        break;
                    case 5:
                        subarray[5].classList.add('active')
                        break;
                    case 6:
                        subarray[6].classList.add('active')
                        break;
                    case 7:
                        subarray[7].classList.add('active')
                        break;
                    case 8:
                        subarray[8].classList.add('active')
                        break;
                    case 9:
                        subarray[9].classList.add('active')
                        break;
                    case 10:
                        subarray[10].classList.add('active')
                        break;
                    case 11:
                        subarray[11].classList.add('active')
                        break;
                    default:
                        subarray[0].classList.add('active')
                        break;
                }
        }
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
    let i = parentDiv.childElementCount
    const lastChild = parentDiv.children[i - 1]
    const lastChildId = lastChild.id

    if (lastChildId < i || i == 1) {
        i = parentDiv.childElementCount
    } else {
        const numberId1 = parseInt(lastChildId.slice(-1))
        const numberId2 = parseInt(lastChildId.slice(-2))
        let numberIdLastChild

        numberId1 >= 0 && numberId2 ? numberIdLastChild = numberId2 : numberIdLastChild = numberId1;

        i = numberIdLastChild + 1
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
                    <button 
                        name="btnRemoveRow"
                        type="button"
                        id="btnRemoveRow${i}"
                        value="${i}"
                        class="btn btn-danger rounded-circle m-2 boton">
                            <i class="fa-solid fa-trash"></i>
                    </button>
                </div>    
            </div>`
    )

    if (i === 1) {
        originalDiv

    } else if (i !== 1 && i < 9) { //cantidad maxima de OT en conjunto a agregar 10
        originalDiv
        btnRemoveItem = document.getElementById(`btnRemoveRow${i - 1}`)
        btnRemoveItem.style.display = 'none'
    } else {
        btnRemoveItem = document.getElementById(`btnRemoveRow${i - 1}`)
        btnRemoveItem.style.display = 'none'
        btnAddNewRow.disabled = true
    }

    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', "row my-2")
    newDiv.id = `otItemRow${i}`

    if(i === 1) {
        newDiv.innerHTML = `<hr class="my-2">` + originalDiv + `<hr class="my-2">`
    } else if(i === 10) {
        newDiv.innerHTML = originalDiv
    } else {
        newDiv.innerHTML = originalDiv + `<hr class="my-2">`
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
    if (i == 1 || i < 8) {
        tippy(btnAddNewRow, {
            content: `<strong>Límite máximo de OT (10)</strong><br>
                        Puedes agregar ${9-i} OT's mas`,
            allowHTML: true,
            maxWidth: 350,
            inlinePositioning: true,
            arrow: true,
            animation: 'shift-away',
            theme: 'material',
            interactive: false,
            hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
        })
    } else if (i == 8) {
        tippy(btnAddNewRow, {
            content: `<strong>Límite máximo de OT (10)</strong><br>
                        Puedes agregar 1 OT mas`,
            allowHTML: true,
            maxWidth: 350,
            inlinePositioning: true,
            arrow: true,
            animation: 'shift-away',
            theme: 'material',
            interactive: false,
            hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
        })
    }
    //*************************************** */
})

//-------------------------- Remove OT Row ----------------------------------
function removeRow(e) {
    //console.log('e:', e)
    const parentDiv = document.getElementById('div_body')
    let i = parentDiv.childElementCount
    //console.log('i(resta):', i)
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
            if (rowToDelete) {
                rowToDelete.remove()
            }
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
    if (i > 1 && i <= 9) {
        tippy(btnAddNewRow, {
            content: `<strong>Límite máximo de OT (10)</strong><br>
                        Puedes agregar ${(10-i)+1} OT's mas`,
            allowHTML: true,
            maxWidth: 350,
            inlinePositioning: true,
            arrow: true,
            animation: 'shift-away',
            theme: 'material',
            interactive: false,
            hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
        })
    } else if (i == 1) {
        tippy(btnAddNewRow, {
            content: `<strong>Límite máximo de OT (10)</strong><br>
                        Puedes agregar ${10-i} OT's mas`,
            allowHTML: true,
            maxWidth: 350,
            inlinePositioning: true,
            arrow: true,
            animation: 'shift-away', //'scale',
            theme: 'material',
            interactive: false,
            hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
        })
    }
}

const formulario = document.getElementById("formNewOt")
const radios = document.querySelectorAll('[name="ociNumber"]') //formulario.elements["ociNumber"]
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

var arrayBtnAddOtFormSelected = []
for (let i=0; i<radios.length; i++) {
    var btnAddOtFormSelected = document.getElementById(`btnAddOtFormSelected${i}`)
    //console.log('btnAddOtFormSelected', btnAddOtFormSelected)
    if(btnAddOtFormSelected) {
        arrayBtnAddOtFormSelected.push(btnAddOtFormSelected)
    }
}

arrayBtnAddOtFormSelected.forEach(function(elemento) {
    if (elemento) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const radioSelectedValue = elemento.id
            //radioSelected(radioSelectedValue, elemento.value)
            ociNumberHidden.value = radioSelected(radioSelectedValue, elemento.value)
            lastOtNumberFn(elemento.id)
            formulario.scrollIntoView({ behavior: 'smooth', top:0 }) //scrollTo({ behavior: 'smooth', block: 'start' })
        })
    }
})

for (let i = 0; i < radios.length; i++) {
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

//------- Change OT status ----------------
function messageChangeOtStatus(
    statusOt, 
    otNumber, 
    idProjectSelected, 
    ociKNumber, 
    otKNumber,
    otDescription
) {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
        Swal.fire({
            title: `Cambio status de OT#${otNumber} ${otDescription}`,
            position: 'center',
            html: `El status de la OT#<strong>${otNumber}</strong> se modificará a
                    <span class="badge rounded-pill bg-${ statusOt==='Activo' ? 'danger' : 'primary' } text-white">
                    ${ statusOt==='Activo' ? 'Inactivo' : 'Activo' }
                    </span> y ${ statusOt==='Activo' ? 'no' : '' } podrá ingresar o modificar datos en esta OT.
                    <form id="formChangeStatusOt${idProjectSelected}" action="/api/proyectos/updateStatusOt/${idProjectSelected}" method="post" style="display: none;">
                        <fieldset>
                            <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                            <input type="hidden" name="otKNumberHidden" value="${otKNumber}">
                            <input type="hidden" name="statusOtHidden" value="${statusOt}">
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
                document.getElementById(`formChangeStatusOt${idProjectSelected}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El status de la OT#<strong>${otNumber}</strong>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    `Status de OT#${otNumber} no modificado!`,
                    `El status de la OT#<strong>${otNumber}</strong>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
}

//---- Update OT Data ----------------
function messageUpdateOt(
    idProjectSelected,
    ociKNumber,
    otNumber,
    otKNumber,
    opNumber,
    statusOt,
    otDescription,
    otDesign,
    otSimulation,
    otSupplier
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

    var html = `<form id="formUpdateOt${idProjectSelected}" action="/api/proyectos/updateOt/${idProjectSelected}" method="post">
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
                                <label for="designOt" class="form-label d-flex justify-content-start ms-1">Diseño seguido por
                                    <button type="button" id="searchDesignUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="designOt" name="designOt" class="form-control"
                                    placeholder="Diseño seguido por" value="${otDesign}" required>
                            </div>
                            <div class="col-4">
                                <label for="simulationOt" class="form-label d-flex justify-content-start ms-1">Simulación seguida por
                                    <button type="button" id="searchSimulationUserModal" class="btn btn-light rounded-circle ms-1">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </label>
                                <input type="text" id="simulationOt" name="simulationOt" class="form-control"
                                    placeholder="Simulacion seguida por" value="${otSimulation}" required>
                            </div>
                            <div class="col-4">
                                <label for="supplierOt" class="form-label d-flex justify-content-start ms-1">Proveedor externo</label>
                                <input type="text" id="supplierOt" name="supplierOt" class="form-control"
                                    placeholder="Porveedor" value="${otSupplier}" required>
                            </div>                      
                        </div> 

                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                    </fieldset>
                </form>`

    if(idProjectSelected && numberOt) {
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

//---- Delete OT ----------------
function messageDeleteOt(
    statusOt,
    otNumber,
    idProjectSelected,
    ociKNumber,
    otKNumber,
    otDescription
    ) {
        
    const descriptionOt = otDescription.slice(13)

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `
        <div class="container m-auto">
            La OT#<strong>${otNumber}</strong>, Descripcion: "${descriptionOt}",
            Status: <span class="badge rounded-pill bg-${ statusOt==='Activo' ? 'primary' : 'danger' } text-white">
                        ${ statusOt==='Activo' ? 'Activo' : 'Inactivo' }
                    </span>
            y su toda su información interna se eliminará completamente.
            <br>
            <hr>
            Está seguro que desea continuar?
            <form id="formDeleteOt${idProjectSelected}" action="/api/proyectos/deleteOt/${idProjectSelected}" method="post">
                <fieldset>
                    <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                    <input type="hidden" name="otKNumberHidden" value="${otKNumber}">
                </fieldset>
            </form>
        </div>    
                    `
    
    if(idProjectSelected && otNumber) {
        Swal.fire({
            title: `Eliminar OT# ${otNumber} - ${descriptionOt}`,
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
                Toast.fire({
                    icon: 'success',
                    title: `La OT#<strong>${otNumber}</strong>, se eliminó correctamente!`
                })
            } else {
                Swal.fire(
                    `OT# ${otNumber}`,
                    `La OT#<b>${otNumber}</b>, no se eliminó!`,
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
            text: `La OT#<strong>${otNumber}</strong>, no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

//---- Update Masive OT Data ----------------
function messageUpdateMasiveOt(arrayRowsSelected) {
    
    let numberKOci = parseInt(ociKNumber)
    let numnerKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
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

    var html = `<form id="formUpdateMasiveOt${idProjectSelected}" action="/api/proyectos/updateMasiveOt/${idProjectSelected}" method="post">
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

var arrayBtnChangeStatusOt = [],
    arrayBtnUpdateOt = [],
    arrayBtnDeleteOt = [],
    arrayCheckBoxSelect = [],
    arrayBtnCheckSelectionAll = [],
    arrayBtnCheckSelecMasive = []

    for (let m=0; m<ociTotalQty; m++) {
        let btnCheckSelectionAll = document.getElementById(`btnCheckSelectionAll${m}`)
        if (btnCheckSelectionAll) {

            arrayBtnCheckSelectionAll.push(btnCheckSelectionAll)
        }

        let btnCheckSelecMasive = document.getElementById(`btnCheckSelecMasive${m}`)
        if (btnCheckSelecMasive) {
            btnCheckSelecMasive.setAttribute('disabled', true)
            arrayBtnCheckSelecMasive.push(btnCheckSelecMasive)
        }

        for (let n=0; n<maxOtQuantity; n++) {
            let btnChangeStatusOt = document.getElementById(`btnStatusOt${m}_${n}`)
            if (btnChangeStatusOt) {
                arrayBtnChangeStatusOt.push(btnChangeStatusOt)
            }

            let btnUpdateOt = document.getElementById(`btnEditOt${m}_${n}`)
            if (btnUpdateOt) {
                arrayBtnUpdateOt.push(btnUpdateOt)
            }

            let btnDeleteOt = document.getElementById(`btnDeleteOt${m}_${n}`)
            if(btnDeleteOt) {
                arrayBtnDeleteOt.push(btnDeleteOt)
            }

            let checkBoxSelect = document.getElementById(`checkSelect${m}_${n}`)
            if (checkBoxSelect) {
                arrayCheckBoxSelect.push(checkBoxSelect)
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
                    const otSupplier =  document.getElementById(`otSupplier${idOci}_${z}`).textContent
                    const idProjectSelected = document.getElementById('projectIdHidden').value
                    
                    arrayRowsSelected.push({
                        selected, 
                        statusOt, 
                        otNumber, 
                        otDescription, 
                        otDesign, 
                        otSimulation, 
                        otSupplier, 
                        idProjectSelected
                    })
                }
            }
                    
            messageUpdateMasiveOt(arrayRowsSelected)
            
        })
    }
})

arrayBtnChangeStatusOt.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnStatusOt/;

            // Eliminar el texto inicial de la cadena
            var idOtOci = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOtOci.split('_')
            
            const statusOt = document.getElementById(`lastOtStatus${idOtOci}`).textContent
            const otDescription = document.getElementById(`lastOpDescription${idOtOci}`).textContent
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent)
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otKNumber = parseInt(arrayOciOtSelected[1])
            
            messageChangeOtStatus(
                cleanString(statusOt),
                otNumber,
                idProjectSelected,
                ociKNumber,
                otKNumber,
                otDescription
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
            var idOtOci = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOtOci.split('_')

            const idProjectSelected = document.getElementById('projectIdHidden').value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent)
            const otKNumber = parseInt(arrayOciOtSelected[1])       
            const opNumber = parseInt(document.getElementById(`lastOpNumber${idOtOci}`).textContent)
            const statusOt = document.getElementById(`lastOtStatus${idOtOci}`).textContent
            const otDescription = document.getElementById(`lastOpDescription${idOtOci}`).textContent
            const otDesign =  document.getElementById(`otDesign${idOtOci}`).textContent
            const otSimulation =  document.getElementById(`otSimulation${idOtOci}`).textContent
            const otSupplier =  document.getElementById(`otSupplier${idOtOci}`).textContent
            
            messageUpdateOt(
                idProjectSelected,
                ociKNumber,
                otNumber,
                otKNumber,
                opNumber,
                cleanString(statusOt),
                cleanString(otDescription),
                cleanString(otDesign),
                cleanString(otSimulation),
                cleanString(otSupplier)
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
            var idOtOci = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOtOci.split('_')
            
            const statusOt = document.getElementById(`lastOtStatus${idOtOci}`).textContent
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent)
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otKNumber = parseInt(arrayOciOtSelected[1])       
            const otDescription = document.getElementById(`lastOpDescription${idOtOci}`).textContent
            
            messageDeleteOt(
                cleanString(statusOt),
                otNumber,
                idProjectSelected,
                ociKNumber,
                otKNumber,
                otDescription
            )
        })
    }
})

arrayCheckBoxSelect.forEach(function(element) {
    element.checked = ''
    element.addEventListener('change', (event) => {
        event.preventDefault()
        const idOtOci = (event.target.id).slice(11)
        if (document.getElementsByName(`rowSelected${idOtOci}`)) {
            var rowSelectCheck = Array.from(document.getElementsByName(`rowSelected${idOtOci}`))
        }

        let idOci = extractNumbers(element.id)[0]
        //let idOt = extractNumbers(element.id)[1]
        
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
                if(rowsSelectCheck.length > 0) {
                    arrQueryRows.push(rowsSelectCheck)
                }
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


//-----Btns Buscar en BBDD el Usuario Seguidor de Diseño --------------
const searchDesignUser = document.getElementById('searchDesignUser')

searchDesignUser.addEventListener('click', (event) => {
    event.preventDefault()
    function cargarUsuarioDiseno() {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const resquest = new Request("../../../api/usuarios/searchUsers/all", {
            method: "GET",
            headers: myHeaders
          })

            // console.log('resquest: ', resquest)
          
        fetch(resquest)
        .then(response => response.json())
        .then((users) => {

            // console.log('users: ', JSON.stringify(users))

            const arrayUsuariosDiseno = []
            const arrayUsersAll = []

            if (users != {} ) {

                JSON.stringify(users)
                for(let i=0; i<users.usersAll.length; i++) {

                    if(users.usersAll[i].status && users.usersAll[i].permiso ==='diseno') {
                        arrayUsuariosDiseno.push(`
                                        <label>
                                            <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-info text-dark my-2">
                                                <input
                                                    class="form-check-input mb-1"
                                                    type="radio"
                                                    name="radioUsuarios"
                                                    value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}"
                                                    id="${i}">
                                                    ${users.usersAll[i].name} ${users.usersAll[i].lastName}
                                            </span>
                                        </label>`)

                    } else if (users.usersAll[i].status && users.usersAll[i].permiso !=='diseno') {
                        arrayUsersAll.push(`
                                    <label>
                                        <span id="${users.usersAll[i]._id}" class="badge rounded-pill bg-light text-dark my-2">
                                            <input
                                                class="form-check-input mb-1"
                                                type="radio"
                                                name="radioUsuarios"
                                                value="${users.usersAll[i].name}, ${users.usersAll[i].lastName}"
                                                id="${i}">
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
                        focusConfirm: false,
                        confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>',
                        didOpen: ()=> {
                            let btnAceptar = document.getElementsByClassName('swal2-confirm');
                            btnAceptar[0].setAttribute('id','btnAceptarModal')
                            btnAceptar[0].style = "cursor: not-allowed;"
                            btnAceptar[0].disabled = true
                        }
                    }).then((result) => {
                        const radiosToSelect = document.getElementsByName('radioUsuarios')

                        for(let i=0; i<radiosToSelect.length; i++) {
                            const radioSelected = document.getElementById(i)
                            
                            if (radioSelected.checked) {
                                var usuariosSeleccionado = radioSelected.value
                            }
                        }
                        
                        if (result.isConfirmed) {
                            const inputUserSelected = document.getElementById('internoDiseno')
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
                    disabledBtnAceptar()
            } else {
                console.log('Error, no se econtró ningún users')
            }

        })
        .catch(error => {
            throw new Error("Something went wrong on api server!");
        })
    }
    cargarUsuarioDiseno()
})

//-----Btns Buscar en BBDD el Usuario Seguidor de Simulacion --------------
const searchSimulationUser = document.getElementById('searchSimulationUser')
searchSimulationUser.addEventListener('click', (event) => {
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
                        focusConfirm: false,
                        confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>',
                        didOpen: ()=> {
                            let btnAceptar = document.getElementsByClassName('swal2-confirm');
                            btnAceptar[0].setAttribute('id','btnAceptarModal')
                            btnAceptar[0].style = "cursor: not-allowed;"
                            btnAceptar[0].disabled = true
                        }
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
                    disabledBtnAceptar()
        })
        .catch(error => {
        console.error('Error:', error)
        })
      }
      cargarUsuarioSimulacion()
})

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
        console.log('Hubo un error al seleccionar la OCI!!') //Hacer sweetAlert2
    }
})

//---------- Obtiene la lista de OT ------------
function getOtList(i) {
    const parentDiv = document.getElementById(`tablaGeneral${i}`)
    let tableBody = parentDiv.lastElementChild
    const lastChild = parseInt(tableBody.childElementCount)

    let k = i
    let arrayOtNumber = [], arrayOpNumber = [], arrayOtStatus = []
    for (let n=0; n < lastChild; n++) {
        const otNumber = document.getElementById(`lastOtNumber${k}_${n}`).innerText
        const opNumber = document.getElementById(`lastOpNumber${k}_${n}`).innerText
        const otStatus = document.getElementById(`lastOtStatus${k}_${n}`).innerText
        arrayOtNumber.push(otNumber)
        arrayOpNumber.push(opNumber)
        arrayOtStatus.push(otStatus)
    }
    //console.log('arrayOtNumber', arrayOtNumber,)
    return {
        arrayOtNumber,
        arrayOpNumber,
        arrayOtStatus,
        lastChild
    }
}

//---------- Obtiene los valores de la lista de OT ------------
function getOtListValues(i, idTabla, qInicial, qFinal) {
    const parentDiv = document.getElementById(`${idTabla}`)
    let tableBody = parentDiv.lastElementChild
    const lastChild = parseInt(tableBody.childElementCount)

    const qInicialX = parseInt(qInicial)
    const qFinalX = parseInt(qFinal)

    let k = i

    var arrayProcesoR14 = [],
        arrayRevisionProcesoR14 = [],
        arrayAprobadoR14 = [],
        arrayRevisionAprobadoR14 = []
        
    var arrayProceso3d = [],
        arrayRevisionProceso3d = [],
        arrayHorasProceso3d = [],
        arrayRevisionHorasProceso3d = []

    var arrayAvDiseno = [],
        arrayRevisionAvDiseno = [],
        arrayAv50Diseno = [],
        arrayRevisionAv50Diseno = [],
        arrayAv80Diseno = [],
        arrayRevisionAv80Diseno = [],
        arrayEnvioCliente = [],
        arrayRevisionEnvioCliente = []

    var arrayRevisionCliente = [],
        arrayRevisionRevisionCliente = [],
        arrayLdmProvisoria = [],
        arrayRevisionLdmProvisoria = [],
        arrayAv100Diseno = [],
        arrayRevisionAv100Diseno = [],
        arrayAprobadoCliente = [],
        arrayRevisionAprobadoCliente = []

    var arrayLdmAvanceCG = [],
        arrayRevisionLdmAvanceCG = [],
        arrayLdmAvanceTD2 = [],
        arrayRevisionLdmAvanceTD2 = [],
        arrayLdm80 = [],
        arrayRevisionLdm80 = [],
        arrayInfoModelo = [],
        arrayRevisionInfoModelo = []

    var arrayLdm100 = [],
        arrayRevisionLdm100 = [],
        arrayInfo100 = [],
        arrayRevisionInfo100 = []

    var arraySim0 = [],
        arrayRevisionSim0 = [],
        arrayDocuSim0 = [],
        arrayRevisionDocuSim0 = []

    var arraySim1 = [],
        arrayRevisionSim1 = [],
        arrayVideo = [],
        arrayRevisionVideo = [],
        arrayInforme = [],
        arrayRevisionInforme = [],
        arrayPpt = [],
        arrayRevisionPpt = [],
        arrayS1pOp20 = [],
        arrayRevisionS1pOp20 = []

    var arraySim2 = [],
        arrayRevisionSim2 = [],
        arrayReporte = [],
        arrayRevisionReporte = [],
        arrayDfnProdismo = [],
        arrayRevisionDfnProdismo = [],
        arraySim3 = [],
        arrayRevisionSim3 = []

    var arrayMatEnsayo = [],
        arrayRevisionMatEnsayo = [],
        arrayMasMenos10 = [],
        arrayRevisionMasMenos10 = [],
        arrayMpAlternativo = [],
        arrayRevisionMpAlternativo = [],
        arrayReunionSim = [],
        arrayRevisionReunionSim = []

    var arrayInformeSim4 = [],
        arrayRevisionInformeSim4 = [],
        arrayGeoCopiado1 = [],
        arrayRevisionGeoCopiado1 = [],
        arrayGeoCopiado2 = [],
        arrayRevisionGeoCopiado2 = [],
        arrayHorasSim = [],
        arrayRevisionHorasSim = []

    var arrayGrillado = [],
        arrayRevisionGrillado = [],
        arrayMpEnsayada = [],
        arrayRevisionMpEnsayada = []

    for (let n=0; n < lastChild; n++) {
        // console.log('k1:',k,'n1:',n)
            for (let q=qInicialX ; q < qFinalX; q++) {
                // console.log('k2:',k,'n2:',n,'q:',q)
                // console.log('resHidden:',document.getElementById(`resHidden${k}_${n}_${q}`))
                const otHidden = document.getElementById(`resHidden${k}_${n}_${q}`).value
                const arrayFromOtHidden = changeValueFromArray(otHidden.split(","))
                const largoDeArrayOt = parseInt(arrayFromOtHidden.length)
                const otInfo = arrayFromOtHidden[largoDeArrayOt-1]
                
                const otRevisionHidden = document.getElementById(`resRevisionHidden${k}_${n}_${q}`).value
                const arrayFromOtRevisionHidden = otRevisionHidden.split(",")
                const largoDeArrayRevision = parseInt(arrayFromOtRevisionHidden.length)
                const otRevision = arrayFromOtRevisionHidden[largoDeArrayRevision-1]

                switch (q) {
                     //-----------------R14-----------------------
                    case 0: 
                        arrayProcesoR14.push(otInfo)
                        arrayRevisionProcesoR14.push(otRevision)
                    break;
                    case 1: 
                        arrayAprobadoR14.push(otInfo)
                        arrayRevisionAprobadoR14.push(otRevision)
                    break;
                    //----------------Proceso 3D------------------
                    case 2: 
                        arrayProceso3d.push(otInfo)
                        arrayRevisionProceso3d.push(otRevision)
                    break;
                    case 3:
                        arrayHorasProceso3d.push(otInfo)
                        arrayRevisionHorasProceso3d.push(otRevision)
                    break;
                     //-------------Diseño 1° Parte-------------
                    case 4:
                        arrayAvDiseno.push(otInfo)
                        arrayRevisionAvDiseno.push(otRevision)
                    break;
                    case 5:
                        arrayAv50Diseno.push(otInfo)
                        arrayRevisionAv50Diseno.push(otRevision)
                    break;
                    case 6:
                        arrayAv80Diseno.push(otInfo)
                        arrayRevisionAv80Diseno.push(otRevision)
                    break;
                    case 7:
                        arrayEnvioCliente.push(otInfo)
                        arrayRevisionEnvioCliente.push(otRevision)
                    break;
                     //-------------Diseño 2° Parte-------------
                    case 8:
                        arrayRevisionCliente.push(otInfo)
                        arrayRevisionRevisionCliente.push(otRevision)
                    break;
                    case 9:
                        arrayLdmProvisoria.push(otInfo)
                        arrayRevisionLdmProvisoria.push(otRevision)
                    break;
                    case 10:
                        arrayAv100Diseno.push(otInfo)
                        arrayRevisionAv100Diseno.push(otRevision)
                    break;
                    case 11:
                        arrayAprobadoCliente.push(otInfo)
                        arrayRevisionAprobadoCliente.push(otRevision)
                    break;
                     //----------------Info 80%-----------------
                    case 12:
                        arrayLdmAvanceCG.push(otInfo)
                        arrayRevisionLdmAvanceCG.push(otRevision)
                    break;
                    case 13:
                        arrayLdmAvanceTD2.push(otInfo)
                        arrayRevisionLdmAvanceTD2.push(otRevision)
                    break;
                    case 14:
                        arrayLdm80.push(otInfo)
                        arrayRevisionLdm80.push(otRevision)
                    break;
                    case 15:
                        arrayInfoModelo.push(otInfo)
                        arrayRevisionInfoModelo.push(otRevision)
                    break;
                    //----------------Info 100%-----------------
                    case 16:
                        arrayLdm100.push(otInfo)
                        arrayRevisionLdm100.push(otRevision)
                    break;
                    case 17:
                        arrayInfo100.push(otInfo)
                        arrayRevisionInfo100.push(otRevision)
                    break;
                    //----------------Info Sim0----------------
                    case 18:
                        arraySim0.push(otInfo)
                        arrayRevisionSim0.push(otRevision)
                    break;
                    case 19:
                        arrayDocuSim0.push(otInfo)
                        arrayRevisionDocuSim0.push(otRevision)
                    break;
                    //----------------Info Sim1----------------
                    case 20:
                        arraySim1.push(otInfo)
                        arrayRevisionSim1.push(otRevision)
                    break;
                    case 21:
                        arrayVideo.push(otInfo)
                        arrayRevisionVideo.push(otRevision)
                    break;
                    case 22:
                        arrayInforme.push(otInfo)
                        arrayRevisionInforme.push(otRevision)
                    break;
                    case 23:
                        arrayPpt.push(otInfo)
                        arrayRevisionPpt.push(otRevision)
                    break;
                    case 24:
                        arrayS1pOp20.push(otInfo)
                        arrayRevisionS1pOp20.push(otRevision)
                    break;
                    //----------------Info Sim2-3----------------
                    case 25:
                        arraySim2.push(otInfo)
                        arrayRevisionSim2.push(otRevision)
                    break;
                    case 26:
                        arrayReporte.push(otInfo)
                        arrayRevisionReporte.push(otRevision)
                    break;
                    case 27:
                        arrayDfnProdismo.push(otInfo)
                        arrayRevisionDfnProdismo.push(otRevision)
                    break;
                    case 28:
                        arraySim3.push(otInfo)
                        arrayRevisionSim3.push(otRevision)
                    break;
                    //----------------Info Sim4 Primera----------
                    case 29:
                        arrayMatEnsayo.push(otInfo)
                        arrayRevisionMatEnsayo.push(otRevision)
                    break;
                    case 30:
                        arrayMasMenos10.push(otInfo)
                        arrayRevisionMasMenos10.push(otRevision)
                    break;
                    case 31:
                        arrayMpAlternativo.push(otInfo)
                        arrayRevisionMpAlternativo.push(otRevision)
                    break;
                    case 32:
                        arrayReunionSim.push(otInfo)
                        arrayRevisionReunionSim.push(otRevision)
                    break;
                    //----------------Info Sim4 Segunda-----------
                    case 33:
                        arrayInformeSim4.push(otInfo)
                        arrayRevisionInformeSim4.push(otRevision)
                    break;
                    case 34:
                        arrayGeoCopiado1.push(otInfo)
                        arrayRevisionGeoCopiado1.push(otRevision)
                    break;
                    case 35:
                        arrayGeoCopiado2.push(otInfo)
                        arrayRevisionGeoCopiado2.push(otRevision)
                    break;
                    case 36:
                        arrayHorasSim.push(otInfo)
                        arrayRevisionHorasSim.push(otRevision)
                    break;
                    //----------------Info Sim5------------------
                    case 37:
                        arrayGrillado.push(otInfo)
                        arrayRevisionGrillado.push(otRevision)
                    break;
                    case 38:
                        arrayMpEnsayada.push(otInfo)
                        arrayRevisionMpEnsayada.push(otRevision)        
                    default:
                        null
                        break;
                }
            }
    }

    switch (qFinalX) {
        case 2: //------------R14-----------------------
            return {
                arrayProcesoR14,
                arrayRevisionProcesoR14,
                arrayAprobadoR14,
                arrayRevisionAprobadoR14
            }
        case 4: //-----Proceso 3d----------------
            return {
                arrayProceso3d,
                arrayRevisionProceso3d,
                arrayHorasProceso3d,
                arrayRevisionHorasProceso3d
            }
        case 8: //-----Diseno Primera Parte------
            return {
                arrayAvDiseno,
                arrayRevisionAvDiseno,
                arrayAv50Diseno,
                arrayRevisionAv50Diseno,
                arrayAv80Diseno,
                arrayRevisionAv80Diseno,
                arrayEnvioCliente,
                arrayRevisionEnvioCliente
            }
        case 12: //----Diseno Segunda Parte------
            return {
                arrayRevisionCliente,
                arrayRevisionRevisionCliente,
                arrayLdmProvisoria,
                arrayRevisionLdmProvisoria,
                arrayAv100Diseno,
                arrayRevisionAv100Diseno,
                arrayAprobadoCliente,
                arrayRevisionAprobadoCliente
            }
        case 16: //----Info 80%------------------
            return {
                arrayLdmAvanceCG,
                arrayRevisionLdmAvanceCG,
                arrayLdmAvanceTD2,
                arrayRevisionLdmAvanceTD2,
                arrayLdm80,
                arrayRevisionLdm80,
                arrayInfoModelo,
                arrayRevisionInfoModelo
            }
        case 18: //----Info 100%------------------
            return {
                arrayLdm100,
                arrayRevisionLdm100,
                arrayInfo100,
                arrayRevisionInfo100
            }
        case 20: //----Sim 0------------------
            return {
                arraySim0,
                arrayRevisionSim0,
                arrayDocuSim0,
                arrayRevisionDocuSim0
            }
        case 25: //----Sim 1------------------
            return {
                arraySim1,
                arrayRevisionSim1,
                arrayVideo,
                arrayRevisionVideo,
                arrayInforme,
                arrayRevisionInforme,
                arrayPpt,
                arrayRevisionPpt,
                arrayS1pOp20,
                arrayRevisionS1pOp20
            }
        case 29: //----Sim 2_3------------------
        return {
            arraySim2,
            arrayRevisionSim2,
            arrayReporte,
            arrayRevisionReporte,
            arrayDfnProdismo,
            arrayRevisionDfnProdismo,
            arraySim3,
            arrayRevisionSim3
            }
        case 33: //----Sim 4 Primera-------------
        return {
            arrayMatEnsayo,
            arrayRevisionMatEnsayo,
            arrayMasMenos10,
            arrayRevisionMasMenos10,
            arrayMpAlternativo,
            arrayRevisionMpAlternativo,
            arrayReunionSim,
            arrayRevisionReunionSim
            }
        case 37: //----Sim 4 Segunda-------------
        return {
            arrayInformeSim4,
            arrayRevisionInformeSim4,
            arrayGeoCopiado1,
            arrayRevisionGeoCopiado1,
            arrayGeoCopiado2,
            arrayRevisionGeoCopiado2,
            arrayHorasSim,
            arrayRevisionHorasSim
        }
        case 39: //----Sim 5-------------
        return {
            arrayGrillado,
            arrayRevisionGrillado,
            arrayMpEnsayada,
            arrayRevisionMpEnsayada
        }
        default:
            break;
    }
}

function changeValueFromArray(arrayFromValues) {
    
    for (let i = 0; i < arrayFromValues.length; i++) {
        // Modificar valores
        if (arrayFromValues[i] == 'sinDato') {
            arrayFromValues[i] = 'S/D';
        } else if (arrayFromValues[i] == '') {
            arrayFromValues[i] = 'S/D';
        } else if (arrayFromValues[i] == 'noAplica') {
            arrayFromValues[i] = 'N/A';
        } else if (arrayFromValues[i] == 'ok') {
            arrayFromValues[i] = 'OK';
        } else if (arrayFromValues[i] == 'noOk') {
            arrayFromValues[i] = 'No OK';
        } else if (arrayFromValues[i] == 'pendiente') {
            arrayFromValues[i] = 'Pendiente';
        }
    }
    return arrayFromValues
}

function colorStatusOt(valorStatusOt) {
    let disabled = 'required'
    let color = ''
    if (valorStatusOt==='Activo') {
        color = 'success'
    } else {
        color = 'danger'
    }

    return {
        color,
        disabled
    }
}

function optionSelect(option) {
    let optionOk = (`
        <option value="noOk">No OK</option>
        <option value="pendiente">Pendiente</option>
        <option value="noAplica">N/A</option>
    `);

    let optionNoOk = (`
        <option value="ok">OK</option>
        <option value="pendiente">Pendiente</option>
        <option value="noAplica">N/A</option>
    `);

    let optionPendiente = (`
        <option value="ok">OK</option>
        <option value="noOk">No OK</option>
        <option value="noAplica">N/A</option>
    `);

    let optionNoAplica = (`
        <option value="ok">OK</option>
        <option value="noOk">No OK</option>
        <option value="pendiente">Pendiente</option>
    `);

    let optionDefault = (`
        <option value="ok">OK</option>
        <option value="noOk">No OK</option>
        <option value="pendiente">Pendiente</option>
        <option value="noAplica">N/A</option>
    `);

    if (option == "ok") {
        return {
            optionOk
        }
    } else if (option == "noOk") {
        return {
            optionNoOk
        }
    } else if (option == "pendiente") {
        return {
            optionPendiente
        }
    } else if (option == "noAplica") {
        return {
            optionNoAplica
        }
    } else if (option == "sinDato" || option == "") {
        return {
            optionDefault
        }
    } else {
        return {
            optionDefault
        }
    }
}

function switchOptionSelected (switchValue) {
    let variableValue
    let optionDefined
    var getValueArrayDato = ''
    var getValueArrayRevision
    
    if (switchValue == "OK") {
        variableValue = 'ok'
        optionDefined = (optionSelect(variableValue)).optionOk
        getValueArrayDato = switchValue

    } else if (switchValue == 'No OK') {
        variableValue = 'noOk'
        optionDefined = (optionSelect(variableValue)).optionNoOk
        getValueArrayDato = switchValue

    } else if (switchValue == 'Pendiente') {
        variableValue = 'pendiente'
        optionDefined = (optionSelect(variableValue)).optionPendiente
        getValueArrayDato = switchValue

    } else if (switchValue == 'N/A') {
        variableValue = 'noAplica'
        optionDefined = (optionSelect(variableValue)).optionNoAplica
        getValueArrayDato = switchValue

    } else if (switchValue == 'S/D' || switchValue == "") {
        variableValue = 'sinDato'
        optionDefined = (optionSelect(variableValue)).optionDefault
        getValueArrayDato = 'S/D'
        getValueArrayRevision = 0
    }

    return {
        variableValue,
        optionDefined,
        getValueArrayDato,
        getValueArrayRevision
    }
}

const cabeceraFormulario = `<div class="col-2 my-auto align-self-middle" style="width: 5rem;">
                                <label for="otStatus"><strong>OT Status</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-middle">
                                <label for="otNumber"><strong>OT#</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-middle">
                                <label for="opNumber"><strong>OP#</strong></label>
                            </div>`

function datosCabeceraFormulario (
            arrayOtStatus, 
            y, 
            arrayOtNumber, 
            arrayOpNumber
        ) {

    const datosCabecera = `
                        <div class="col-2 my-auto align-self-middle" style="width: 5rem;">
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
                        </div>`

    return datosCabecera                    
}

function footerFormularioHidden (
            projectNumberId, 
            clientId, 
            i, 
            arrayBloqueLength)
    {
    
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

function swalFireAlert (titulo,
                        html,
                        ancho,
                        background,
                        formulario,
                        arrayDeOtNumber)
{

    Swal.fire({
        title: titulo,
        html: html,
        width: parseInt(ancho),
        background: background,
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        // showLoaderOnConfirm: true,
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
        if (result.isConfirmed) {
            const formValues = document.getElementById(formulario)
            formValues.submit()
            Toast.fire({
                icon: 'success',
                title: `Información de OT/s #${arrayDeOtNumber.join(" - #")} agregada con éxito!`
            })
        } else {
            Swal.fire(
                `Info <strong>${titulo}</strong>, no agregada!`,
                `La información ${titulo}, no fue agregada a las OT/s #${arrayDeOtNumber.join(" - #")} !`,
                'warning'
            )
            return false
        }
    })
}    

//***** addDatoToR14 ******
function addDatoToR14(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        // console.log('getValues:', getValues)
        var arrayBloque = []
        for (let y=0; y < res.lastChild; y++) {
                                                    
            const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="procesoR14${res.arrayOtNumber[y]}" name="procesoR14${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayProcesoR14[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayProcesoR14[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayProcesoR14[y])).optionDefined}
                        </select>
                        <input type="hidden" id="procesoR14Hidden${res.arrayOtNumber[y]}"
                        name="procesoR14Hidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayProcesoR14[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto">    
                        <input type="text"
                            value="${getValues.arrayRevisionProcesoR14[y]}"
                            class="form-control"
                            style="text-align: center;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionProcesoR14${res.arrayOtNumber[y]}"
                            name="revisionProcesoR14${y}"
                            value="${getValues.arrayRevisionProcesoR14[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="aprobadoR14${res.arrayOtNumber[y]}" name="aprobadoR14${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayAprobadoR14[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayAprobadoR14[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayAprobadoR14[y])).optionDefined}
                        </select>
                        <input type="hidden" id="aprobadoR14Hidden${res.arrayOtNumber[y]}"
                        name="aprobadoR14Hidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayAprobadoR14[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionAprobadoR14[y]}"
                            class="form-control"
                            style="text-align: center;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionAprobadoR14${res.arrayOtNumber[y]}"
                            name="revisionAprobadoR14${y}"
                            value="${getValues.arrayRevisionAprobadoR14[y]}">    
                    </div>`

            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloque.push(`
                    <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                        
                        ${dataEnArrayBloque}
                    </div>`)

            } else {
                arrayBloque.push(`
                <div class="row my-1 mx-auto">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    
                    ${dataEnArrayBloque}
                </div>`)
            }
        }

        const html = `<form id="formR14Values" action="/api/proyectos/otInfoR14" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col my-auto">
                                    <label for="procesoR14"><strong>Proceso</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionProcesoR14"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="aprobado"><strong>Aprobado PM</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionAprobadoR14"><strong>Rev</strong></label>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloque.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloque.length)}
                        </fieldset>
                    </form>`

        const titulo = "R14"
        const ancho = 870
        const background = '#ffffff'
        const formulario = 'formR14Values'
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
//***** End addDatoToR14 ******

//***** addDatoToProceso3d ******
function addDatoToProceso3d(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        
        var arrayBloqueProceso3d = []
        
        for (let y=0; y < res.lastChild; y++) {
                                                                    //${getValues.arrayProceso3d[y]}
            const dataEnArrayBloque = `
                        <div class="col my-auto">
                            <select id="proceso3d${res.arrayOtNumber[y]}" name="proceso3d${y}"
                                oninput="updateInputsSelect()"
                                class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                                <option selected value="${(switchOptionSelected(getValues.arrayProceso3d[y])).variableValue}" disabled>
                                    ${(switchOptionSelected(getValues.arrayProceso3d[y])).getValueArrayDato}
                                </option>
                                ${(switchOptionSelected(getValues.arrayProceso3d[y])).optionDefined}
                            </select>
                            <input type="hidden" id="proceso3dHidden${res.arrayOtNumber[y]}"
                                name="proceso3dHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayProceso3d[y])).variableValue}">
                        </div>
                        <div class="col-1 my-auto">    
                            <input type="text"
                                value="${getValues.arrayRevisionProceso3d[y]}"
                                class="form-control"
                                style="text-align: center;"
                                disabled readonly">
                            <input type="hidden"
                                id="revisionProceso3d${res.arrayOtNumber[y]}"
                                name="revisionProceso3d${y}"
                                value="${getValues.arrayRevisionProceso3d[y]}">
                        </div>
    
                        <div class="col my-auto">
                            <input value="${parseInt(getValues.arrayHorasProceso3d[y])}" type="number"
                                id="hsProceso${res.arrayOtNumber[y]}" name="horasProceso3d${y}"
                                class="form-control" min="0" max="9999"
                                style="text-align: center;" ${colorStatusOt(res.arrayOtStatus[y]).disabled}
                                oninput="updateTotal(${i})">
                        </div>
                        <div class="col-1 my-auto">    
                            <input type="text"
                                value="${getValues.arrayRevisionHorasProceso3d[y]}"
                                class="form-control"
                                style="text-align: center;"
                                disabled readonly">
                            <input type="hidden"
                                id="revisionHorasProceso3d${res.arrayOtNumber[y]}"
                                name="revisionHorasProceso3d${y}"
                                value="${getValues.arrayRevisionHorasProceso3d[y]}">
                        </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloqueProceso3d.push(`
                    <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
    
                        ${dataEnArrayBloque}
                    </div>     
                `)
    
            } else {
    
                arrayBloqueProceso3d.push(`
                    <div class="row my-1 mx-auto">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
    
                        ${dataEnArrayBloque}
                    </div>`)
            }
    
            let totalHorasProceso3dActual = document.getElementById(`resHsTotalProceso3d${i}`).innerText
            var inputTotalHorasProceso3d = 
                `<div class="row justify-content-end my-1 mx-auto">
                    <div class="col-4 my-auto align-self-middle">
                        <span class="badge bg-dark text-white">Total horas Proceso 3D</span>
                    </div>
                    <div class="col-4 pe-5 me-4 my-auto">
                        <input value="${totalHorasProceso3dActual}"
                        type="number"
                        id="totalHsProceso3d"
                        class="form-control"
                        style="text-align: center;"
                        disabled>
                    </div> 
                </div>`
        }
    
        const html = `
                <form id="formProceso3dValues" action="/api/proyectos/otInfoProceso3d" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <label for="proceso"><strong>Proceso 3D</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionProceso3d"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="hsProceso"><strong>Hs. Proceso 3D</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionHorasProceso3d"><strong>Rev</strong></label>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueProceso3d.join("<br>")}
                        <hr>
                            ${inputTotalHorasProceso3d}
                        <hr>
                        ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueProceso3d.length)}
                    </fieldset>
                </form>`
    
        const titulo = "Proceso 3D"
        const formulario = 'formProceso3dValues'
        const ancho = 870
        const background = '#efefff'
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

// Función para actualizar el valor del campo total
function updateTotal(i) {
    if (i) {
        let res = getOtList(i)
        var arrayTotalHorasProceso3d = []
    
        for (let y=0; y < res.arrayOtNumber.length; y++) {    
            var input1 = document.getElementById(`hsProceso${res.arrayOtNumber[y]}`).value
            if (input1) {
                arrayTotalHorasProceso3d.push(input1)
            }
        }
            // Usamos el método map para convertir los strings a números enteros
            const arrayDeNumeros = arrayTotalHorasProceso3d.map(str => parseInt(str, 10));
            var total = arrayDeNumeros.reduce(function(acumulador, valorActual) {
                return acumulador + valorActual;
            }, 0);
            document.getElementById("totalHsProceso3d").value = isNaN(total) ? '' : total;
    }
}
// ------------------------------------------------  
//***** End addDatoToProceso3d ******

//***** addDatoToDisenoPrimera ******
function addDatoToDisenoPrimera(i, idTabla, qInicial, qFinal) {
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
                        class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
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
                    class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
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
                    class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
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
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloqueDisenoPrimera.push(`
                <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
    
                    ${dataEnArrayBloque}
                </div>     
            `)
            
            } else {
    
                arrayBloqueDisenoPrimera.push(`
                <div class="row my-1 mx-auto justify-content-center">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                
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
    
            const titulo = "Diseño Primera Parte"
            const ancho = 1350
            const background = '#dfefff'
            const formulario = 'formDisenoPrimeraValues'
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
//***** End addDatoToDisenoPrimera ******

//***** addDatoToDisenoSegunda ******
function addDatoToDisenoSegunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
    
        var arrayBloqueDisenoSegunda = []
    
        for (let y=0; y < res.lastChild; y++) {
    
            const dataEnArrayBloque = `
                <div class="col my-auto">
                    <select id="revisionCliente${res.arrayOtNumber[y]}" name="revisionCliente${[y]}"
                        oninput="updateInputsSelect()"
                        class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                        <option selected value="${(switchOptionSelected(getValues.arrayRevisionCliente[y])).variableValue}">
                            ${(switchOptionSelected(getValues.arrayRevisionCliente[y])).getValueArrayDato}
                        </option>
                            ${(switchOptionSelected(getValues.arrayRevisionCliente[y])).optionDefined}
                    </select>
                    <input type="hidden" id="revisionClienteHidden${res.arrayOtNumber[y]}"
                        name="revisionClienteHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayRevisionCliente[y])).variableValue}">
                </div>
                <div class="col-1 my-auto">
                    <input type="text"
                        value="${getValues.arrayRevisionRevisionCliente[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionRevisionCliente${res.arrayOtNumber[y]}"
                        name="revisionRevisionCliente${[y]}"
                        value="${getValues.arrayRevisionRevisionCliente[y]}">
                </div>
    
                <div class="col my-auto">
                    <select id="ldmProvisoria${res.arrayOtNumber[y]}" name="ldmProvisoria${[y]}"
                    oninput="updateInputsSelect()"    
                    class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                        <option selected value="${(switchOptionSelected(getValues.arrayLdmProvisoria[y])).variableValue}" disabled>
                        ${(switchOptionSelected(getValues.arrayLdmProvisoria[y])).getValueArrayDato}
                        </option>
                            ${(switchOptionSelected(getValues.arrayLdmProvisoria[y])).optionDefined}
                    </select>
                    <input type="hidden" id="ldmProvisoriaHidden${res.arrayOtNumber[y]}"
                        name="ldmProvisoriaHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayLdmProvisoria[y])).variableValue}">
                </div>
                <div class="col-1 my-auto">
                    <input type="text"
                        value="${getValues.arrayRevisionLdmProvisoria[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionLdmProvisoria${res.arrayOtNumber[y]}"
                        name="revisionLdmProvisoria${[y]}"
                        value="${getValues.arrayRevisionLdmProvisoria[y]}">
                </div>
    
                <div class="col m-auto">
                    <div class="row justify-content-center">
                        <div class="col-7 my-auto">
                            <input type="text" class="form-control"
                                min="0" max="100" step="5"
                                id="av100DisenoDisabled${res.arrayOtNumber[y]}"
                                name="av100DisenoDisabled"
                                value="${getValues.arrayAv100Diseno[y]}"
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
                                id="av100Diseno${res.arrayOtNumber[y]}"
                                name="av100DisenoRange"
                                value="${getValues.arrayAv100Diseno[y]}"
                                oninput="updateInputsText();">
                            <input type="hidden" class="form-control"
                                id="av100DisenoHidden${res.arrayOtNumber[y]}"
                                name="av100DisenoHidden${[y]}"
                                value="${getValues.arrayAv100Diseno[y]}">
                        </div>
                    </div>
                </div>
                <div class="col-1 my-auto">    
                    <input type="text"
                        value="${getValues.arrayRevisionAv100Diseno[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionAv100Diseno${res.arrayOtNumber[y]}"
                        name="revisionAv100Diseno${[y]}"
                        value="${getValues.arrayRevisionAv100Diseno[y]}">
                </div>
    
                <div class="col my-auto">
                    <select id="aprobadoCliente${res.arrayOtNumber[y]}" name="aprobadoCliente${[y]}"
                    oninput="updateInputsSelect()"    
                    class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                        <option selected value="${(switchOptionSelected(getValues.arrayAprobadoCliente[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayAprobadoCliente[y])).getValueArrayDato}
                        </option>
                            ${(switchOptionSelected(getValues.arrayAprobadoCliente[y])).optionDefined}
                    </select>
                    <input type="hidden" id="aprobadoClienteHidden${res.arrayOtNumber[y]}"
                        name="aprobadoClienteHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayAprobadoCliente[y])).variableValue}">
                </div>
                <div class="col-1 my-auto">    
                    <input type="text"
                        value="${getValues.arrayRevisionAprobadoCliente[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionAprobadoCliente${res.arrayOtNumber[y]}"
                        name="revisionAprobadoCliente${[y]}"
                        value="${getValues.arrayRevisionAprobadoCliente[y]}">
                </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloqueDisenoSegunda.push(`
                <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
    
                    ${dataEnArrayBloque}
                </div>     
            `)
            
            } else {
    
                arrayBloqueDisenoSegunda.push(`
                <div class="row my-1 mx-auto justify-content-center">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                
                    ${dataEnArrayBloque}
                </div>`)
            }
        }
    
        const html = `
                <form id="formDisenoSegundaValues" action="/api/proyectos/otInfoAvDisenoSegunda" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto justify-content-center">
                            ${cabeceraFormulario}
    
                            <div class="col my-auto">
                                <label for="revisionCliente"><strong>Rev. Cliente</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionRevisionCliente"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="ldmProvisoria"><strong>LDM Provisoria</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionLdmProvisoria"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="av100Diseno"><strong>Av. Diseño 100%</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionAv100Diseno"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="aprobadoCliente"><strong>Aprob. Cliente</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionAprobadoCliente"><strong>Rev</strong></label>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueDisenoSegunda}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueDisenoSegunda.length)}    
                    </fieldset>
                </form>`  
    
            const titulo = "Diseño Segunda Parte"
            const ancho = 1350
            const background = '#dedede'
            const formulario = 'formDisenoSegundaValues'
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
//***** End addDatoToDisenoSegunda ******

//***** addDatoToInfo80 ******
function addDatoToInfo80(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
    
        var arrayBloqueInfo80 = []
    
        for (let y=0; y < res.lastChild; y++) {
    
            const dataEnArrayBloque = `
                <div class="col my-auto">
                    <select id="ldmAvanceCG${res.arrayOtNumber[y]}" name="ldmAvanceCG${[y]}"
                        oninput="updateInputsSelect()"
                        class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                        <option selected value="${(switchOptionSelected(getValues.arrayLdmAvanceCG[y])).variableValue}">
                            ${(switchOptionSelected(getValues.arrayLdmAvanceCG[y])).getValueArrayDato}
                        </option>
                            ${(switchOptionSelected(getValues.arrayLdmAvanceCG[y])).optionDefined}
                    </select>
                    <input type="hidden" id="ldmAvanceCGHidden${res.arrayOtNumber[y]}"
                        name="ldmAvanceCGHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayLdmAvanceCG[y])).variableValue}">
                </div>
                <div class="col-1 my-auto">
                    <input type="text"
                        value="${getValues.arrayRevisionLdmAvanceCG[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionLdmAvanceCG${res.arrayOtNumber[y]}"
                        name="revisionLdmAvanceCG${[y]}"
                        value="${getValues.arrayRevisionLdmAvanceCG[y]}">
                </div>
    
                <div class="col my-auto">
                    <select id="ldmAvanceTD2${res.arrayOtNumber[y]}" name="ldmAvanceTD2${[y]}"
                    oninput="updateInputsSelect()"    
                    class="form-select" ${colorStatusOt(res.arrayOtStatus[y]).disabled}>
                        <option selected value="${(switchOptionSelected(getValues.arrayLdmAvanceTD2[y])).variableValue}" disabled>
                        ${(switchOptionSelected(getValues.arrayLdmAvanceTD2[y])).getValueArrayDato}
                        </option>
                            ${(switchOptionSelected(getValues.arrayLdmAvanceTD2[y])).optionDefined}
                    </select>
                    <input type="hidden" id="ldmAvanceTD2Hidden${res.arrayOtNumber[y]}"
                        name="ldmAvanceTD2Hidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayLdmAvanceTD2[y])).variableValue}">
                </div>
                <div class="col-1 my-auto">
                    <input type="text"
                        value="${getValues.arrayRevisionLdmAvanceTD2[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionLdmAvanceTD2${res.arrayOtNumber[y]}"
                        name="revisionLdmAvanceTD2${[y]}"
                        value="${getValues.arrayRevisionLdmAvanceTD2[y]}">
                </div>
    
                <div class="col m-auto">
                    <div class="row justify-content-center">
                        <div class="col-7 my-auto">
                            <input type="text" class="form-control"
                                min="0" max="100" step="5"
                                id="ldm80Disabled${res.arrayOtNumber[y]}"
                                name="ldm80Disabled"
                                value="${getValues.arrayLdm80[y]}"
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
                                id="ldm80${res.arrayOtNumber[y]}"
                                name="ldm80Range"
                                value="${getValues.arrayLdm80[y]}"
                                oninput="updateInputsText()">
                            <input type="hidden" class="form-control"
                                id="ldm80Hidden${res.arrayOtNumber[y]}"
                                name="ldm80Hidden${[y]}"
                                value="${getValues.arrayLdm80[y]}">
                        </div>
                    </div>
                </div>
                <div class="col-1 my-auto">    
                    <input type="text"
                        value="${getValues.arrayRevisionLdm80[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionLdm80${res.arrayOtNumber[y]}"
                        name="revisionLdm80${[y]}"
                        value="${getValues.arrayRevisionLdm80[y]}">
                </div>
    
                <div class="col m-auto">
                    <div class="row justify-content-center">
                        <div class="col-7 my-auto">
                            <input type="text" class="form-control"
                                min="0" max="100" step="5"
                                id="infoModeloDisabled${res.arrayOtNumber[y]}"
                                name="infoModeloDisabled"
                                value="${getValues.arrayInfoModelo[y]}"
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
                                id="infoModelo${res.arrayOtNumber[y]}"
                                name="infoModelo"
                                value="${getValues.arrayInfoModelo[y]}"
                                oninput="updateInputsText()">
                            <input type="hidden" class="form-control"
                                id="infoModeloHidden${res.arrayOtNumber[y]}"
                                name="infoModeloHidden${[y]}"
                                value="${getValues.arrayLdm80[y]}">
                        </div>
                    </div>
                </div>
                <div class="col-1 my-auto">    
                    <input type="text"
                        value="${getValues.arrayRevisionInfoModelo[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionInfoModelo${res.arrayOtNumber[y]}"
                        name="revisionInfoModelo${[y]}"
                        value="${getValues.arrayRevisionInfoModelo[y]}">
                </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloqueInfo80.push(`
                <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
    
                    ${dataEnArrayBloque}
                </div>     
            `)
            
            } else {
    
                arrayBloqueInfo80.push(`
                <div class="row my-1 mx-auto justify-content-center">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                
                    ${dataEnArrayBloque}
                </div>`)
            }
        }
    
        const html = `
                <form id="formInfo80Values" action="/api/proyectos/otInfo80" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto justify-content-center">
                            ${cabeceraFormulario}
    
                            <div class="col my-auto">
                                <label for="ldmAvanceCG"><strong>LDM Avan. (Cilindros/Guias)</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionLdmAvanceCG"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="ldmAvanceTD2"><strong>LDM Avan. (Tacos D2)</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionLdmAvanceTD2"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="ldm80"><strong>LDM 80%</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionLdm80"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="infoModelo"><strong>Info Modelo</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionInfoModelo"><strong>Rev</strong></label>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueInfo80}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfo80.length)}    
                    </fieldset>
                </form>`  
    
            const titulo = "Info 80%"
            const ancho = 1350
            const background = '#cedede'
            const formulario = 'formInfo80Values'
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
//***** End addDatoToInfo80 ******

//***** addDatoToInfo100 ******
function addDatoToInfo100(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
    
        var arrayBloqueInfo100 = []
    
        for (let y=0; y < res.lastChild; y++) {
    
            const dataEnArrayBloque = `
                <div class="col m-auto">
                    <div class="row justify-content-center">
                        <div class="col-7 my-auto ms-5">
                            <input type="text" class="form-control"
                                min="0" max="100" step="5"
                                id="ldm100Disabled${res.arrayOtNumber[y]}"
                                name="ldm100Disabled"
                                value="${getValues.arrayLdm100[y]}"
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
                                id="ldm100${res.arrayOtNumber[y]}"
                                name="ldm100Range"
                                value="${getValues.arrayLdm100[y]}"
                                oninput="updateInputsText()">
                            <input type="hidden" class="form-control"
                                id="ldm100Hidden${res.arrayOtNumber[y]}"
                                name="ldm100Hidden${[y]}"
                                value="${getValues.arrayLdm100[y]}">
                        </div>
                    </div>
                </div>
                <div class="col-1 my-auto">    
                    <input type="text"
                        value="${getValues.arrayRevisionLdm100[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionLdm100${res.arrayOtNumber[y]}"
                        name="revisionLdm100${[y]}"
                        value="${getValues.arrayRevisionLdm100[y]}">
                </div>
    
                <div class="col m-auto">
                    <div class="row justify-content-center">
                        <div class="col-7 my-auto ms-5">
                            <input type="text" class="form-control"
                                min="0" max="100" step="5"
                                id="info100Disabled${res.arrayOtNumber[y]}"
                                name="info100Disabled"
                                value="${getValues.arrayInfo100[y]}"
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
                                id="info100${res.arrayOtNumber[y]}"
                                name="info100"
                                value="${getValues.arrayInfo100[y]}"
                                oninput="updateInputsText()">
                            <input type="hidden" class="form-control"
                                id="info100Hidden${res.arrayOtNumber[y]}"
                                name="info100Hidden${[y]}"
                                value="${getValues.arrayLdm100[y]}">
                        </div>
                    </div>
                </div>
                <div class="col-1 my-auto">    
                    <input type="text"
                        value="${getValues.arrayRevisionInfo100[y]}"
                        class="form-control mx-auto"
                        style="text-align: center; width: 3.5rem;"
                        disabled readonly>
                    <input type="hidden"
                        id="revisionInfo100${res.arrayOtNumber[y]}"
                        name="revisionInfo100${[y]}"
                        value="${getValues.arrayRevisionInfo100[y]}">
                </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloqueInfo100.push(`
                <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
    
                    ${dataEnArrayBloque}
                </div>     
            `)
            
            } else {
    
                arrayBloqueInfo100.push(`
                <div class="row my-1 mx-auto justify-content-center">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                
                    ${dataEnArrayBloque}
                </div>`)
            }
        }
    
        const html = `
                <form id="formInfo100Values" action="/api/proyectos/otInfo100" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto justify-content-center">
                            ${cabeceraFormulario}
    
                            <div class="col my-auto">
                                <label for="ldm100"><strong>LDM 100%</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionLdm100"><strong>Rev</strong></label>
                            </div>
                            <div class="col my-auto">
                                <label for="info100"><strong>Info 100%</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-start">
                                <label for="revisionInfo100"><strong>Rev</strong></label>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueInfo100}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloqueInfo100.length)}    
                    </fieldset>
                </form>`  
    
            const titulo = "Info 100%"
            const ancho = 875
            const background = '#fefefe'
            const formulario = 'formInfo100Values'
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
//***** End addDatoToInfo100 ******

//***** addDatoToInfoSim0 ******
function addDatoToInfoSim0(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        // console.log('getValues:', getValues)
        var arrayBloque = []
        for (let y=0; y < res.lastChild; y++) {
                                                    //${getValues.arraySim0[y]}  // ${getValues.arrayDocuSim0[y]}
            const dataEnArrayBloqueSim0 = `
                    <div class="col my-auto">
                        <select id="0Sim${res.arrayOtNumber[y]}" name="0Sim${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arraySim0[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arraySim0[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arraySim0[y])).optionDefined}
                        </select>
                        <input type="hidden" id="0SimHidden${res.arrayOtNumber[y]}"
                        name="0SimHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arraySim0[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto">    
                        <input type="text"
                            value="${getValues.arrayRevisionSim0[y]}"
                            class="form-control"
                            style="text-align: center;"
                            disabled readonly">
                        <input type="hidden"
                            id="revision0Sim${res.arrayOtNumber[y]}"
                            name="revision0Sim${y}"
                            value="${getValues.arrayRevisionSim0[y]}">
                    </div>
    
                    <div class="col my-auto">
                        <select id="docu0Sim${res.arrayOtNumber[y]}" name="docu0Sim${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayDocuSim0[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayDocuSim0[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayDocuSim0[y])).optionDefined}
                        </select>
                        <input type="hidden" id="docu0SimHidden${res.arrayOtNumber[y]}"
                        name="docu0SimHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayDocuSim0[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionDocuSim0[y]}"
                            class="form-control"
                            style="text-align: center;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionDocu0Sim${res.arrayOtNumber[y]}"
                            name="revisionDocu0Sim${y}"
                            value="${getValues.arrayRevisionDocuSim0[y]}">    
                    </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloque.push(`
                    <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                        
                        ${dataEnArrayBloqueSim0}
                    </div>`)
    
            } else {
                arrayBloque.push(`
                <div class="row my-1 mx-auto">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    
                    ${dataEnArrayBloqueSim0}
                </div>`)
            }
        }
    
        const html = `<form id="formSim0Values" action="/api/proyectos/otSimulacion0" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col my-auto">
                                    <label for="0Sim"><strong>Sim 0</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revision0Sim"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="docu0Sim"><strong>Docum. Sim 0</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionDocu0Sim"><strong>Rev</strong></label>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloque.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloque.length)}
                        </fieldset>
                      </form>`
    
        const titulo = "Simulación 0"
        const ancho = 870
        const background = '#ffffff'
        const formulario = 'formSim0Values'
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
//***** End addDatoToInfoSim0 ******

//***** addDatoToInfoSim1 ******
function addDatoToInfoSim1(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        // console.log('getValues:', getValues)
        var arrayBloque = []
        for (let y=0; y < res.lastChild; y++) {
                                                    //${getValues.arraySim0[y]}  // ${getValues.arrayDocuSim0[y]}
            const dataEnArrayBloqueSim1 = `
                    <div class="col-1 my-auto">
                        <select id="1Sim${res.arrayOtNumber[y]}" name="1Sim${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arraySim1[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arraySim1[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arraySim1[y])).optionDefined}
                        </select>
                        <input type="hidden" id="1SimHidden${res.arrayOtNumber[y]}"
                        name="1SimHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arraySim1[y])).variableValue}">
                    </div>
                    <div class="col my-auto">    
                        <input type="text"
                            value="${getValues.arrayRevisionSim1[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revision1Sim${res.arrayOtNumber[y]}"
                            name="revision1Sim${y}"
                            value="${getValues.arrayRevisionSim1[y]}">
                    </div>
    
                    <div class="col-1 my-auto">
                        <select id="video${res.arrayOtNumber[y]}" name="video${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayVideo[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayVideo[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayVideo[y])).optionDefined}
                        </select>
                        <input type="hidden" id="videoHidden${res.arrayOtNumber[y]}"
                        name="videoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayVideo[y])).variableValue}">
                    </div>    
                    <div class="col my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionVideo[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionVideo${res.arrayOtNumber[y]}"
                            name="revisionVideo${y}"
                            value="${getValues.arrayRevisionVideo[y]}">    
                    </div>
                    
                    <div class="col-1 my-auto">
                        <select id="informe${res.arrayOtNumber[y]}" name="informe${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayInforme[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayInforme[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayInforme[y])).optionDefined}
                        </select>
                        <input type="hidden" id="informeHidden${res.arrayOtNumber[y]}"
                        name="informeHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayInforme[y])).variableValue}">
                    </div>    
                    <div class="col my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionInforme[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionInforme${res.arrayOtNumber[y]}"
                            name="revisionInforme${y}"
                            value="${getValues.arrayRevisionInforme[y]}">    
                    </div>
                    
                    <div class="col-1 my-auto">
                        <select id="ppt${res.arrayOtNumber[y]}" name="ppt${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayPpt[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayPpt[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayPpt[y])).optionDefined}
                        </select>
                        <input type="hidden" id="pptHidden${res.arrayOtNumber[y]}"
                        name="pptHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayPpt[y])).variableValue}">
                    </div>    
                    <div class="col my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionPpt[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionPpt${res.arrayOtNumber[y]}"
                            name="revisionPpt${y}"
                            value="${getValues.arrayRevisionPpt[y]}">    
                    </div>
                    
                    <div class="col-1 my-auto">
                        <select id="s1pOp20${res.arrayOtNumber[y]}" name="s1pOp20${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayS1pOp20[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayS1pOp20[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayS1pOp20[y])).optionDefined}
                        </select>
                        <input type="hidden" id="s1pOp20Hidden${res.arrayOtNumber[y]}"
                        name="s1pOp20Hidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayS1pOp20[y])).variableValue}">
                    </div>    
                    <div class="col my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionS1pOp20[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionS1p20Op${res.arrayOtNumber[y]}"
                            name="revisionS1p20Op${y}"
                            value="${getValues.arrayRevisionS1pOp20[y]}">    
                    </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloque.push(`
                    <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                        
                        ${dataEnArrayBloqueSim1}
                    </div>`)
    
            } else {
                arrayBloque.push(`
                <div class="row my-1 mx-auto">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    
                    ${dataEnArrayBloqueSim1}
                </div>`)
            }
        }
    
        const html = `<form id="formSim1Values" action="/api/proyectos/otSimulacion1" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col-1 my-auto">
                                    <label for="1Sim"><strong>Sim 1</strong></label>
                                </div>
                                <div class="col my-auto align-self-start">
                                    <label for="revision1Sim"><strong>Rev</strong></label>
                                </div>
                                <div class="col-1 my-auto">
                                    <label for="video"><strong>Video</strong> <i class="fa-solid fa-video"></i></label>
                                </div>
                                <div class="col my-auto align-self-start">
                                    <label for="revisionVideo"><strong>Rev</strong></label>
                                </div>
                                <div class="col-1 my-auto">
                                    <label for="informe"><strong>Informe</strong></label>
                                </div>
                                <div class="col my-auto align-self-start">
                                    <label for="revisionInforme"><strong>Rev</strong></label>
                                </div>
                                <div class="col-1 my-auto">
                                    <label for="ppt"><strong>PPT</strong></label>
                                </div>
                                <div class="col my-auto align-self-start">
                                    <label for="revisionPpt"><strong>Rev</strong></label>
                                </div>
                                <div class="col-1 my-auto">
                                    <label for="s1pOp20"><strong>S1 p/Op20</strong></label>
                                </div>
                                <div class="col my-auto align-self-start">
                                    <label for="revisionS1pOp20"><strong>Rev</strong></label>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloque.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloque.length)}
                        </fieldset>
                      </form>`
    
        const titulo = "Simulación 1"
        const ancho = 1650
        const background = '#ffffff'
        const formulario = 'formSim1Values'
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
//***** End addDatoToInfoSim1 ******

//***** addDatoToInfoSim2_3 ******
function addDatoToInfoSim2_3(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        // console.log('getValues:', getValues)
        var arrayBloque = []
        for (let y=0; y < res.lastChild; y++) {
                                                    
            const dataEnArrayBloqueSim2_3 = `
                    <div class="col my-auto">
                        <select id="2Sim${res.arrayOtNumber[y]}" name="2Sim${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arraySim2[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arraySim2[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arraySim2[y])).optionDefined}
                        </select>
                        <input type="hidden" id="2SimHidden${res.arrayOtNumber[y]}"
                        name="2SimHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arraySim2[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto">    
                        <input type="text"
                            value="${getValues.arrayRevisionSim2[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revision2Sim${res.arrayOtNumber[y]}"
                            name="revision2Sim${y}"
                            value="${getValues.arrayRevisionSim2[y]}">
                    </div>
    
                    <div class="col my-auto">
                        <select id="reporte${res.arrayOtNumber[y]}" name="reporte${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayReporte[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayReporte[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayReporte[y])).optionDefined}
                        </select>
                        <input type="hidden" id="reporteHidden${res.arrayOtNumber[y]}"
                        name="reporteHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayReporte[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionReporte[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionReporte${res.arrayOtNumber[y]}"
                            name="revisionReporte${y}"
                            value="${getValues.arrayRevisionReporte[y]}">    
                    </div>
                    
                    <div class="col my-auto">
                        <select id="dfnProdismo${res.arrayOtNumber[y]}" name="dfnProdismo${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayDfnProdismo[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayDfnProdismo[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayDfnProdismo[y])).optionDefined}
                        </select>
                        <input type="hidden" id="dfnProdismoHidden${res.arrayOtNumber[y]}"
                        name="dfnProdismoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayDfnProdismo[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto me-2 border-dark border-end">  
                        <input type="text"
                            value="${getValues.arrayRevisionDfnProdismo[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionDfnProdismo${res.arrayOtNumber[y]}"
                            name="revisionDfnProdismo${y}"
                            value="${getValues.arrayRevisionDfnProdismo[y]}">    
                    </div>
                    
                    <div class="col my-auto ms-2">
                        <select id="3Sim${res.arrayOtNumber[y]}" name="3Sim${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arraySim3[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arraySim3[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arraySim3[y])).optionDefined}
                        </select>
                        <input type="hidden" id="3SimHidden${res.arrayOtNumber[y]}"
                        name="3SimHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arraySim3[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionSim3[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionSim3${res.arrayOtNumber[y]}"
                            name="revisionSim3${y}"
                            value="${getValues.arrayRevisionSim3[y]}">    
                    </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloque.push(`
                    <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                        
                        ${dataEnArrayBloqueSim2_3}
                    </div>`)
    
            } else {
                arrayBloque.push(`
                <div class="row my-1 mx-auto">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    
                    ${dataEnArrayBloqueSim2_3}
                </div>`)
            }
        }
    
        const html = `<form id="formSim2_3Values" action="/api/proyectos/otSimulacion2_3" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col my-auto">
                                    <label for="2Sim"><strong>Sim 2</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revision2Sim"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="reporte"><strong>Reporte</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionReporte"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="dfnProdismo"><strong>DFN Prodismo</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start me-2 border-dark border-end">
                                    <label for="revisionDfnProdismo"><strong>Rev</strong></label>
                                </div>
    
                                <div class="col my-auto ms-2">
                                    <label for="3Sim"><strong>Sim 3</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionPpt"><strong>Rev</strong></label>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloque.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloque.length)}
                        </fieldset>
                      </form>`
    
        const titulo = "Simulación 2 y 3"
        const ancho = 1450
        const background = '#eeeeff'
        const formulario = 'formSim2_3Values'
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
//***** End addDatoToInfoSim2_3 ******

//***** addDatoToInfoSim4 Primera ******
function addDatoToInfoSim4Primera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        // console.log('getValues:', getValues)
        var arrayBloque = []
        for (let y=0; y < res.lastChild; y++) {
                                                    
            const dataEnArrayBloqueSim4Primera = `
                    <div class="col my-auto">
                        <select id="matEnsayo${res.arrayOtNumber[y]}" name="matEnsayo${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMatEnsayo[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayMatEnsayo[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMatEnsayo[y])).optionDefined}
                        </select>
                        <input type="hidden" id="matEnsayoHidden${res.arrayOtNumber[y]}"
                        name="matEnsayoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayMatEnsayo[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto">    
                        <input type="text"
                            value="${getValues.arrayRevisionMatEnsayo[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionMatEnsayo${res.arrayOtNumber[y]}"
                            name="revisionMatEnsayo${y}"
                            value="${getValues.arrayRevisionMatEnsayo[y]}">
                    </div>
    
                    <div class="col my-auto">
                        <select id="masMenos10${res.arrayOtNumber[y]}" name="masMenos10${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMasMenos10[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayMasMenos10[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMasMenos10[y])).optionDefined}
                        </select>
                        <input type="hidden" id="masMenos10Hidden${res.arrayOtNumber[y]}"
                        name="masMenos10Hidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayMasMenos10[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionMasMenos10[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionMas10Menos${res.arrayOtNumber[y]}"
                            name="revisionMas10Menos${y}"
                            value="${getValues.arrayRevisionMasMenos10[y]}">    
                    </div>
                    
                    <div class="col my-auto">
                        <select id="mpAlternativo${res.arrayOtNumber[y]}" name="mpAlternativo${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMpAlternativo[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayMpAlternativo[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMpAlternativo[y])).optionDefined}
                        </select>
                        <input type="hidden" id="mpAlternativoHidden${res.arrayOtNumber[y]}"
                        name="mpAlternativoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayMpAlternativo[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionMpAlternativo[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionMpAlternativo${res.arrayOtNumber[y]}"
                            name="revisionMpAlternativo${y}"
                            value="${getValues.arrayRevisionMpAlternativo[y]}">    
                    </div>
                    
                    <div class="col my-auto ms-2">
                        <select id="reunionSim${res.arrayOtNumber[y]}" name="reunionSim${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayReunionSim[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayReunionSim[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayReunionSim[y])).optionDefined}
                        </select>
                        <input type="hidden" id="reunionSimHidden${res.arrayOtNumber[y]}"
                        name="reunionSimHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayReunionSim[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionReunionSim[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionReunionSim${res.arrayOtNumber[y]}"
                            name="revisionReunionSim${y}"
                            value="${getValues.arrayRevisionReunionSim[y]}">    
                    </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloque.push(`
                    <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                        
                        ${dataEnArrayBloqueSim4Primera}
                    </div>`)
    
            } else {
                arrayBloque.push(`
                <div class="row my-1 mx-auto">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    
                    ${dataEnArrayBloqueSim4Primera}
                </div>`)
            }
        }
    
        const html = `<form id="formSim4PrimeraValues" action="/api/proyectos/otSimulacion4Primera" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col my-auto">
                                    <label for="matEnsayo"><strong>Mat Ensayo</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionMatEnsayo"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="masMenos10"><strong><i class="fa-solid fa-plus-minus"></i>10%</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionMasMenos10"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="mpAlternativo"><strong>MP <i class="fa-solid fa-shapes"></i></strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionMpAlternativo"><strong>Rev</strong></label>
                                </div>
    
                                <div class="col my-auto ms-2">
                                    <label for="reunionSim"><strong>Reunion Sim</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionPpt"><strong>Rev</strong></label>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloque.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloque.length)}
                        </fieldset>
                      </form>`
    
        const titulo = "Simulación 4 (1° Parte)"
        const ancho = 1400
        const background = '#ffefff'
        const formulario = 'formSim4PrimeraValues'
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
//***** End addDatoToInfoSim4 Primera ******

//***** addDatoToInfoSim4 Segunda ******
function addDatoToInfoSim4Segunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        
        var arrayBloque = []
        for (let y=0; y < res.lastChild; y++) {
                                                    
            const dataEnArrayBloqueSim4Segunda = `
                    <div class="col my-auto">
                        <select id="informe4Sim${res.arrayOtNumber[y]}" name="informe4Sim${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayInformeSim4[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayInformeSim4[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayInformeSim4[y])).optionDefined}
                        </select>
                        <input type="hidden" id="informe4SimHidden${res.arrayOtNumber[y]}"
                        name="informe4SimHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayInformeSim4[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto">    
                        <input type="text"
                            value="${getValues.arrayRevisionInformeSim4[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionInforme4Sim${res.arrayOtNumber[y]}"
                            name="revisionInforme4Sim${y}"
                            value="${getValues.arrayRevisionInformeSim4[y]}">
                    </div>
    
                    <div class="col my-auto">
                        <select id="geo1Copiado${res.arrayOtNumber[y]}" name="geo1Copiado${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayGeoCopiado1[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayGeoCopiado1[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayGeoCopiado1[y])).optionDefined}
                        </select>
                        <input type="hidden" id="geo1CopiadoHidden${res.arrayOtNumber[y]}"
                        name="geo1CopiadoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayGeoCopiado1[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionGeoCopiado1[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionGeo1Copiado${res.arrayOtNumber[y]}"
                            name="revisionGeo1Copiado${y}"
                            value="${getValues.arrayRevisionGeoCopiado1[y]}">    
                    </div>
                    
                    <div class="col my-auto">
                        <select id="geo2Copiado${res.arrayOtNumber[y]}" name="geo2Copiado${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayGeoCopiado2[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayGeoCopiado2[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayGeoCopiado2[y])).optionDefined}
                        </select>
                        <input type="hidden" id="geo2CopiadoHidden${res.arrayOtNumber[y]}"
                        name="geo2CopiadoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayGeoCopiado2[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionGeoCopiado2[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionGeo2Copiado${res.arrayOtNumber[y]}"
                            name="revisionGeo2Copiado${y}"
                            value="${getValues.arrayRevisionGeoCopiado2[y]}">    
                    </div>
                    
                    <div class="col my-auto">
                        <input value="${parseInt(getValues.arrayHorasSim[y])}" type="number"
                            id="horasSim${res.arrayOtNumber[y]}" name="horasSim${y}"
                            class="form-control" min="0" max="9999"
                            style="text-align: center;" ${colorStatusOt(res.arrayOtStatus[y]).disabled}
                            oninput="updateHsSimTotal(${i})">
                    </div>
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionHorasSim[y]}"
                            class="form-control mx-auto"
                            style="text-align: center; width: 3.6rem;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionHorasSim${res.arrayOtNumber[y]}"
                            name="revisionHorasSim${y}"
                            value="${getValues.arrayRevisionHorasSim[y]}">    
                    </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloque.push(`
                    <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                        
                        ${dataEnArrayBloqueSim4Segunda}
                    </div>`)
    
            } else {
                arrayBloque.push(`
                <div class="row my-1 mx-auto">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    
                    ${dataEnArrayBloqueSim4Segunda}
                </div>`)
            }
    
            let totalHorasSimActual = document.getElementById(`resHsTotalSim4Segunda${i}`).innerText
            var inputTotalHorasSim = 
                `<div class="row justify-content-end my-1 me-5 mx-auto">
                    <div class="col-3 my-auto align-self-middle">
                        <span class="badge bg-dark text-white">Total Horas Simulacion</span>
                    </div>
                    <div class="col-2 pe-5 me-2 my-auto">
                        <input value="${totalHorasSimActual}"
                        type="number"
                        id="totalHsSim"
                        class="form-control"
                        style="text-align: center;"
                        disabled>
                    </div> 
                </div>`
        }
    
        const html = `<form id="formSim4SegundaValues" action="/api/proyectos/otSimulacion4Segunda" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col my-auto">
                                    <label for="informe4Sim"><strong>Informe</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionInforme4Sim"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="geo1Copiado"><strong>Geo Copiado #1</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionGeoCopiado1"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="geo2Copiado"><strong>Geo Copiado #2</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionGeo2Copiado"><strong>Rev</strong></label>
                                </div>
    
                                <div class="col my-auto ms-2">
                                    <label for="horasSim"><strong>Horas Sim</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionHorasSim"><strong>Rev</strong></label>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloque.join("<br>")}
                            <hr>
                                ${inputTotalHorasSim}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloque.length)}
                        </fieldset>
                      </form>`
    
        const titulo = "Simulación 4 (2° Parte)"
        const ancho = 1400
        const background = '#ffefff'
        const formulario = 'formSim4SegundaValues'
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

// Función para actualizar el valor del campo total
function updateHsSimTotal(i) {
    if (i) {
        let res = getOtList(i)
        var arrayTotalHorasSim = []
    
        for (let y=0; y < res.arrayOtNumber.length; y++) {    
            var input1 = document.getElementById(`horasSim${res.arrayOtNumber[y]}`).value
            if (input1) {
                arrayTotalHorasSim.push(input1)
            }
        }
            // Usamos el método map para convertir los strings a números enteros
            const arrayDeNumeros = arrayTotalHorasSim.map(str => parseInt(str, 10));
            var total = arrayDeNumeros.reduce(function(acumulador, valorActual) {
                return acumulador + valorActual;
            }, 0);
            document.getElementById("totalHsSim").value = isNaN(total) ? '' : total;
    }
}
//***** End addDatoToInfoSim4 Segunda ******

//***** addDatoToInfoSim5 ******
function addDatoToInfoSim5(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        
        var arrayBloque = []
        for (let y=0; y < res.lastChild; y++) {
                                                    
            const dataEnArrayBloqueSim5 = `
                    <div class="col my-auto">
                        <select id="grillado${res.arrayOtNumber[y]}" name="grillado${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayGrillado[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayGrillado[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayGrillado[y])).optionDefined}
                        </select>
                        <input type="hidden" id="grilladoHidden${res.arrayOtNumber[y]}"
                        name="grilladoHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayGrillado[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto">    
                        <input type="text"
                            value="${getValues.arrayRevisionGrillado[y]}"
                            class="form-control mx-auto"
                            style="text-align: center;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionGrillado${res.arrayOtNumber[y]}"
                            name="revisionGrillado${y}"
                            value="${getValues.arrayRevisionGrillado[y]}">
                    </div>
    
                    <div class="col my-auto">
                        <select id="mpEnsayada${res.arrayOtNumber[y]}" name="mpEnsayada${y}"
                            oninput="updateInputsSelect()" 
                            class="form-select" ${(colorStatusOt(res.arrayOtStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayMpEnsayada[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayMpEnsayada[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayMpEnsayada[y])).optionDefined}
                        </select>
                        <input type="hidden" id="mpEnsayadaHidden${res.arrayOtNumber[y]}"
                        name="mpEnsayadaHidden${[y]}"
                        value="${(switchOptionSelected(getValues.arrayMpEnsayada[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto">  
                        <input type="text"
                            value="${getValues.arrayRevisionMpEnsayada[y]}"
                            class="form-control mx-auto"
                            style="text-align: center;"
                            disabled readonly">
                        <input type="hidden"
                            id="revisionMpEnsayada${res.arrayOtNumber[y]}"
                            name="revisionMpEnsayada${y}"
                            value="${getValues.arrayRevisionMpEnsayada[y]}">    
                    </div>`
    
            if (res.arrayOtStatus[y]==='Inactivo') {
                arrayBloque.push(`
                    <div class="row py-1 mx-auto pe-none" contenteditable="false" style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5">
                        ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                        
                        ${dataEnArrayBloqueSim5}
                    </div>`)
    
            } else {
                arrayBloque.push(`
                <div class="row my-1 mx-auto">
                    ${datosCabeceraFormulario (res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y])}
                    
                    ${dataEnArrayBloqueSim5}
                </div>`)
            }
        }
    
        const html = `<form id="formSim5Values" action="/api/proyectos/otSimulacion5" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col my-auto">
                                    <label for="grillado"><strong>Grillado</strong> <i class="fa-solid fa-table-cells fa-lg"></i></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionGrillado"><strong>Rev</strong></label>
                                </div>
                                <div class="col my-auto">
                                    <label for="mpEnsayada"><strong>MP Ensayada</strong></label>
                                </div>
                                <div class="col-1 my-auto align-self-start">
                                    <label for="revisionMpEnsayada"><strong>Rev</strong></label>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloque.join("<br>")}
                            <hr>
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, arrayBloque.length)}
                        </fieldset>
                      </form>`
    
        const titulo = "Simulación 5"
        const ancho = 870
        const background = '#efefff'
        const formulario = 'formSim5Values'
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
//***** End addDatoToInfoSim4 Primera ******

// Función para actualizar el valor del campo Text
function updateInputsText() {
    let arrayInputsRange = []

    for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
        if (document.getElementById(`tablaGeneral${i}`)) {
            arrayInputsRange.push(i)
        }
    }
    
    if (arrayInputsRange !=[]) {
        var allInputsRange = document.querySelectorAll('input[type="range"]')
        // console.log('allInputsRange: ',allInputsRange)
    }

    for (let y=0; y < parseInt(allInputsRange.length)-1; y++) {
        const idInputRange = allInputsRange[y].id//.substring(0, allInputsRange[y].id.length - 4)
        const idInputTextToChange = allInputsRange[y].id.substring(0, allInputsRange[y].id.length - 4) + 'Disabled' + allInputsRange[y].id.substring(allInputsRange[y].id.length - 4)
        const idInputRangeHidden = allInputsRange[y].id.substring(0, allInputsRange[y].id.length - 4) + 'Hidden' + allInputsRange[y].id.substring(allInputsRange[y].id.length - 4)
        // console.log('idInputTextToChange: ',idInputTextToChange)
        // Obtener el valor del slider   
        var valorSlider = document.getElementById(`${idInputRange}`).value

        // Actualizar el campo de texto con el valor del slider
        if (valorSlider) {
            document.getElementById(`${idInputTextToChange}`).value = valorSlider
            document.getElementById(`${idInputRangeHidden}`).value = valorSlider
        }
    }
}

// function getLastestRangeValues() {
//     let arrayInputsRange = []
//     let arrayLastestRangeValues = []

//     for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
//         if (document.getElementById(`tablaGeneral${i}`)) {
//             arrayInputsRange.push(i)
//         }
//     }
    
//     if (arrayInputsRange !=[]) {
//         var allInputsRange = document.querySelectorAll('input[type="range"]')
//     }

//     for (let y=0; y < parseInt(allInputsRange.length)-1; y++) {0
//         const idInputTextToChange = allInputsRange[y].id.substring(0, allInputsRange[y].id.length - 4) + 'Disabled' + allInputsRange[y].id.substring(allInputsRange[y].id.length - 4)

//         // Obtener el input text y su ultimo valor
//         let inputTextLastValue = document.getElementById(`${idInputTextToChange}`)
//         const lastValue = inputTextLastValue.value
//         arrayLastestRangeValues.push(lastValue)
//     }
//     console.log('arrayLastest: ', arrayLastestRangeValues)
//     return arrayLastestRangeValues
// }

// function validateRange(arrayLastestRangeValues) {
//     let arrayInputsRange = []
// console.log('arrayLastestRangeValuesEnValidatedFunction', arrayLastestRangeValues)
//     for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
//         if (document.getElementById(`tablaGeneral${i}`)) {
//             arrayInputsRange.push(i)
//         }
//     }
    
//     if (arrayInputsRange !=[]) {
//         var allInputsRange = document.querySelectorAll('input[type="range"]')
//     }

//     for (let y=0; y < parseInt(allInputsRange.length)-1; y++) {
//         const idInputRange = allInputsRange[y].id//.substring(0, allInputsRange[y].id.length - 4)
//         const idInputTextToChange = allInputsRange[y].id.substring(0, allInputsRange[y].id.length - 4) + 'Disabled' + allInputsRange[y].id.substring(allInputsRange[y].id.length - 4)

//         // Obtener el input text y su ultimo valor
//         let inputTextLastValue = document.getElementById(`${idInputTextToChange}`)
//         // const lastValue = inputTextLastValue.value
//         const lastValue = arrayLastestRangeValues[y]
        
//         // Obtener el slider y su valor
//         let inputRangeValue = document.getElementById(`${idInputRange}`)
//         const rangeValue = inputRangeValue.value
        
//         if (lastValue > rangeValue) {
//             inputRangeValue.value = lastValue; // Restaura el valor previo
//         } else {
//             inputTextLastValue.value = rangeValue; // Actualiza el valor previo
//         }
//     }
// }

// Función para actualizar el valor del campo Text hidden con los Select's
function updateInputsSelect () {
    let arrayInputSelectHidden = []

    for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
        if (document.getElementById(`tablaGeneral${i}`)) {
            arrayInputSelectHidden.push(i)
        }
    }
    
    if (arrayInputSelectHidden !=[]) {
        var allInputsSelect = document.querySelectorAll('select')
    }
//console.log('allInputsSelect:', allInputsSelect)
    let largoArrayInputsSelect = parseInt((allInputsSelect.length)-1)
    for (let y=0; y < largoArrayInputsSelect; y++) {
        const idInputSelectHidden = allInputsSelect[y].id.substring(0, allInputsSelect[y].id.length - 4) + 'Hidden' + allInputsSelect[y].id.substring(allInputsSelect[y].id.length - 4)
        // console.log('id:', idInputSelectHidden)
        var inputSelectHidden = document.getElementById(`${idInputSelectHidden}`)
        // console.log('inputSelectHidden:', inputSelectHidden)
        if (inputSelectHidden) {
            var valorSelect = document.getElementById(`${allInputsSelect[y].id}`).value
            inputSelectHidden.value = valorSelect
            // console.log('inputSelectHidden.value', inputSelectHidden.value)
        }
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
    if (document.getElementById(`tablaGeneral${i}`)) {
        arrTables.push(i)
    }
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

    let arrayTituloTabla =
    [
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

var inputsDeTexto = document.querySelectorAll('input[type="text"]')

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