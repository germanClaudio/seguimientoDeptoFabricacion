let arrBtnAnteriorInfo100 = []
let arrBtnSiguienteInfo100 = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente100Info${i}_${p}_${q}`)) {
                arrBtnAnteriorInfo100.push(i)
                arrBtnSiguienteInfo100.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorInfo100 !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior100Info"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorInfo100(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo100
            })
        }
    })
}

if(arrBtnSiguienteInfo100 !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente100Info"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteInfo100(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo100
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoInfo100(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    res100Ldm,
    res100Info) {
    
    // console.log('kValue', kValue)
    
    if (res100Ldm) {
        let spanLdm100 = document.getElementById(`res100Ldm${kValue}`)
        let spanRevisionLdm100 = document.getElementById(`resRevision100Ldm${kValue}`)
        spanLdm100.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionLdm100.innerText = parseInt(indiceAMostrar+1)
    } else if (res100Info) {
        let spanInfo100 = document.getElementById(`res100Info${kValue}`)
        let spanRevisionInfo100 = document.getElementById(`resRevision100Info${kValue}`)
        spanInfo100.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionInfo100.innerText = parseInt(indiceAMostrar+1)
    }
    

    let btnAnteriorInfo100 = document.getElementById(`btnAnterior100Info${kValue}`)
    let btnSiguienteInfo100 = document.getElementById(`btnSiguiente100Info${kValue}`)
    let containerBtnAnteriorSiguienteInfo100 = document.getElementById(`btnAnteriorSiguiente100Info${kValue}`)
    
    function colorSpanInfo100(spanElementInfo100) {
        let resultColor
        let resultTextColor
        spanElementInfo100.classList.remove("bg-success")
        spanElementInfo100.classList.remove("bg-danger")
        spanElementInfo100.classList.remove("bg-warning")
        spanElementInfo100.classList.remove("bg-secondary")
        spanElementInfo100.classList.remove("bg-info")
        spanElementInfo100.classList.remove("text-white")
        spanElementInfo100.classList.remove("text-dark")

        if (spanElementInfo100.innerText == "OK") {
           resultColor = spanElementInfo100.classList.add("bg-success")
           resultTextColor = spanElementInfo100.classList.add("text-white")
        } else if (spanElementInfo100.innerText == "No OK") {
           resultColor = spanElementInfo100.classList.add("bg-danger")
           resultTextColor = spanElementInfo100.classList.add("text-white")
        } else if (spanElementInfo100.innerText == "S/D") {
           resultColor = spanElementInfo100.classList.add("bg-secondary")
           resultTextColor = spanElementInfo100.classList.add("text-white")
        } else if (spanElementInfo100.innerText == "Pendiente") {
           resultColor = spanElementInfo100.classList.add("bg-warning")
           resultTextColor = spanElementInfo100.classList.add("text-dark")
        } else if (spanElementInfo100.innerText == "N/A") {
            resultColor = spanElementInfo100.classList.add("bg-info")
            resultTextColor = spanElementInfo100.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadasInfo100 (containerBtnAnteriorSiguienteInfo100) {
        containerBtnAnteriorSiguienteInfo100.classList.add("bg-secondary")
        containerBtnAnteriorSiguienteInfo100.classList.add("bg-gradient")
        containerBtnAnteriorSiguienteInfo100.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadasInfo100 (containerBtnAnteriorSiguienteInfo100) {
        containerBtnAnteriorSiguienteInfo100.classList.remove("bg-secondary")
        containerBtnAnteriorSiguienteInfo100.classList.remove("bg-gradient")
        containerBtnAnteriorSiguienteInfo100.classList.remove("bg-opacity-25")
    }
    
    let spanElementInfo100
    if (res100Ldm) {
        spanElementInfo100 = res100Ldm
    } else if (res100Info) {
        spanElementInfo100 = res100Info
    }
    
    if (indiceAMostrar == 0) {
        colorSpanInfo100(spanElementInfo100)
        btnAnteriorInfo100.disabled = 'true'
        btnSiguienteInfo100.removeAttribute('disabled')
        agregarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteInfo100)
    } else if (indiceAMostrar == arrayFromValues.length-1) {
        colorSpanInfo100(spanElementInfo100)
        btnAnteriorInfo100.removeAttribute('disabled')
        btnSiguienteInfo100.disabled = true
        eliminarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteInfo100)
    } else {
        colorSpanInfo100(spanElementInfo100)
        btnAnteriorInfo100.removeAttribute('disabled')
        btnSiguienteInfo100.removeAttribute('disabled')
        agregarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteInfo100)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorInfo100(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let res100Ldm = document.getElementById(`res100Ldm${kValue}`)
    let res100Info = document.getElementById(`res100Info${kValue}`)

    mostrarElementoInfo100(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        res100Ldm,
        res100Info)
    }

// Función para mostrar el elemento siguiente
function mostrarSiguienteInfo100(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let res100Ldm = document.getElementById(`res100Ldm${kValue}`)
    let res100Info = document.getElementById(`res100Info${kValue}`)

    mostrarElementoInfo100(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        res100Ldm,
        res100Info
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** Ldm100 + Info100 ***** */
let spanResInfo100 = Array.from(document.querySelectorAll('span[name="resRevision100Ldm"],span[name="resRevision100Info"]'))


spanResInfo100.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevision100Ldm':
                regex = /^resRevision100Ldm/;
            break;
            case 'resRevision100Info':
                regex = /^resRevision100Info/;
            break;
            default:
                break;
        }

        // Eliminar el texto inicial de la cadena
        var idFinalInputs = idSpotSelected.replace(regex, '');
        
        let inputSpotIndex = document.getElementById(`resIndexHidden${idFinalInputs}`).value
        let inputSpotRevision = document.getElementById(`resRevisionHidden${idFinalInputs}`).value
        let inputSpotCreador = document.getElementById(`arrResCreadorHidden${idFinalInputs}`).value
        let inputSpotModificador = document.getElementById(`arrResModificadorHidden${idFinalInputs}`).value
        let inputSpotFecha = document.getElementById(`arrResFechaHidden${idFinalInputs}`).value
        let inputSpotFechaModificacion = document.getElementById(`arrResFechaModificacionHidden${idFinalInputs}`).value
        
        let arrayFromSpotRevision = inputSpotRevision.split(",")
        let arrayFromSpotCreador = inputSpotCreador.split(",")
        let arrayFromSpotModificador = inputSpotModificador.split(",")
        let arrayFromSpotFecha = inputSpotFecha.split(",")
        let arrayFromSpotFechaModificacion = inputSpotFechaModificacion.split(",")
                
        for (let y=0; arrayFromSpotRevision.length > y; y++) {
            if (inputSpotIndex == y) {
                spanSpot.setAttribute("valueRevision", arrayFromSpotRevision[y])
                spanSpot.setAttribute("valueCreador", arrayFromSpotCreador[y])
                spanSpot.setAttribute("valueFecha", arrayFromSpotFecha[y])
                spanSpot.setAttribute("valueModificador", arrayFromSpotModificador[y])
                spanSpot.setAttribute("valueFechaMod", arrayFromSpotFechaModificacion[y])
            }

            tippy(spanSpot, {
                content: `Revision: ${spanSpot.getAttribute("valueRevision")}<br>
                        Creado por: ${spanSpot.getAttribute("valueCreador")}<br>
                        Fecha creac.: ${spanSpot.getAttribute("valueFecha")}<br>
                        Modificado por: ${spanSpot.getAttribute("valueModificador")}<br>
                        Fecha mod.: ${spanSpot.getAttribute("valueFechaMod")}`,
                allowHTML: true,
                maxWidth: 350,
                arrow: true,
                animation: 'shift-away',
                theme: 'material',
                interactive: false,
                hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
            })
        }
    })
})
//************ End ToolTip btn-Arrows Anterior/Siguiente -----------