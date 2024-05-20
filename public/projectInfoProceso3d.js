let arrBtnAnterior3d = []
let arrBtnSiguiente3d = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente3d${i}_${p}_${q}`)) {
                arrBtnAnterior3d.push(i)
                arrBtnSiguiente3d.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior3d !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior3d"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnterior3d(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArray3d
            })
        }
    })
}

if(arrBtnSiguiente3d !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente3d"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguiente3d(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArray3d
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento3d(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resProceso3d,
    resHorasProceso3d) {
    // console.log('resProceso3d: ', resProceso3d, 'resHorasProceso3d: ', resHorasProceso3d)
    // console.log('kValue', kValue)
    
    if (resProceso3d) {
        let spanProceso3d = document.getElementById(`resProceso3d${kValue}`)
        let spanRevisionProceso3d = document.getElementById(`resRevisionProceso3d${kValue}`)
        spanProceso3d.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionProceso3d.innerText = parseInt(indiceAMostrar+1)
    } else if (resHorasProceso3d) {
        let spanHorasProceso3d = document.getElementById(`resHorasProceso3d${kValue}`)
        let spanRevisionHorasProceso3d = document.getElementById(`resRevisionHorasProceso3d${kValue}`)
        spanHorasProceso3d.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionHorasProceso3d.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnterior3d = document.getElementById(`btnAnterior3d${kValue}`)
    let btnSiguiente3d = document.getElementById(`btnSiguiente3d${kValue}`)
    let containerBtnAnteriorSiguiente3d = document.getElementById(`btnAnteriorSiguiente3d${kValue}`)
    
    function colorSpan3d(spanElement3d) {
        let resultColor
        let resultTextColor
        spanElement3d.classList.remove("bg-success")
        spanElement3d.classList.remove("bg-danger")
        spanElement3d.classList.remove("bg-warning")
        spanElement3d.classList.remove("bg-secondary")
        spanElement3d.classList.remove("bg-info")
        spanElement3d.classList.remove("text-white")
        spanElement3d.classList.remove("text-dark")

        if (spanElement3d.innerText == "OK") {
           resultColor = spanElement3d.classList.add("bg-success")
           resultTextColor = spanElement3d.classList.add("text-white")
        } else if (spanElement3d.innerText == "No OK") {
           resultColor = spanElement3d.classList.add("bg-danger")
           resultTextColor = spanElement3d.classList.add("text-white")
        } else if (spanElement3d.innerText == "S/D") {
           resultColor = spanElement3d.classList.add("bg-secondary")
           resultTextColor = spanElement3d.classList.add("text-white")
        } else if (spanElement3d.innerText == "Pendiente") {
           resultColor = spanElement3d.classList.add("bg-warning")
           resultTextColor = spanElement3d.classList.add("text-dark")
        } else if (spanElement3d.innerText == "N/A") {
            resultColor = spanElement3d.classList.add("bg-info")
            resultTextColor = spanElement3d.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadas3d (containerBtnAnteriorSiguiente3d) {
        containerBtnAnteriorSiguiente3d.classList.add("bg-secondary")
        containerBtnAnteriorSiguiente3d.classList.add("bg-gradient")
        containerBtnAnteriorSiguiente3d.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadas3d (containerBtnAnteriorSiguiente3d) {
        containerBtnAnteriorSiguiente3d.classList.remove("bg-secondary")
        containerBtnAnteriorSiguiente3d.classList.remove("bg-gradient")
        containerBtnAnteriorSiguiente3d.classList.remove("bg-opacity-25")
    }
    
    let spanElement3d
    if (resProceso3d) {
        spanElement3d = resProceso3d
    } else if (resHorasProceso3d) {
        spanElement3d = resHorasProceso3d
    }
    
    if (indiceAMostrar == 0) {
        colorSpan3d(spanElement3d)
        btnAnterior3d.disabled = 'true'
        btnSiguiente3d.removeAttribute('disabled')
        agregarEstiloRevPasadas3d(containerBtnAnteriorSiguiente3d)
    } else if (indiceAMostrar == arrayFromValues.length-1) {
        colorSpan3d(spanElement3d)
        btnAnterior3d.removeAttribute('disabled')
        btnSiguiente3d.disabled = true
        eliminarEstiloRevPasadas3d(containerBtnAnteriorSiguiente3d)
    } else {
        colorSpan3d(spanElement3d)
        btnAnterior3d.removeAttribute('disabled')
        btnSiguiente3d.removeAttribute('disabled')
        agregarEstiloRevPasadas3d(containerBtnAnteriorSiguiente3d)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior3d(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resProceso3d = document.getElementById(`resProceso3d${kValue}`)
    let resHorasProceso3d = document.getElementById(`resHorasProceso3d${kValue}`)

    mostrarElemento3d(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resProceso3d,
        resHorasProceso3d
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente3d(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resProceso3d = document.getElementById(`resProceso3d${kValue}`)
    let resHorasProceso3d = document.getElementById(`resHorasProceso3d${kValue}`)

    mostrarElemento3d(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resProceso3d,
        resHorasProceso3d
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//******Proceso 3D + Horas Proceso3D ***** */
let spanResProceso3d = Array.from(document.querySelectorAll('span[name="resRevisionProceso3d"],span[name="resRevisionHorasProceso3d"]'))

spanResProceso3d.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionProceso3d':
                regex = /^resRevisionProceso3d/;
            break;
            case 'resRevisionHorasProceso3d':
                regex = /^resRevisionHorasProceso3d/;
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
//************ End ToolTip btn-Arrows anterior/Siguiente -----------