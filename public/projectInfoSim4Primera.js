let arrBtnAnterior4PrimeraSim = []
let arrBtnSiguiente4PrimeraSim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente4PrimeraSim${i}_${p}_${q}`)) {
                arrBtnAnterior4PrimeraSim.push(i)
                arrBtnSiguiente4PrimeraSim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior4PrimeraSim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior4PrimeraSim"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnterior4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente4PrimeraSim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente4PrimeraSim"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguiente4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento4PrimeraSim(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resMatEnsayo,
    resMas10Menos,
    resMpAlternativo,
    resReunionSim
    ) {
    // console.log('res4PrimeraSim: ', res4PrimeraSim)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resMatEnsayo) {
        let spanMatEnsayo = document.getElementById(`resMatEnsayo${kValue}`)
        let spanRevisionMatEnsayo = document.getElementById(`resRevisionMatEnsayo${kValue}`)
        spanMatEnsayo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMatEnsayo.innerText = parseInt(indiceAMostrar+1)
    } else if (resMas10Menos) {
        let spanMas10Menos = document.getElementById(`resMas10Menos${kValue}`)
        let spanRevisionMas10Menos = document.getElementById(`resRevisionMas10Menos${kValue}`)
        spanMas10Menos.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMas10Menos.innerText = parseInt(indiceAMostrar+1)
    } else if (resMpAlternativo) {
        let spanMpAlternativo = document.getElementById(`resMpAlternativo${kValue}`)
        let spanRevisionMpAlternativo = document.getElementById(`resRevisionMpAlternativo${kValue}`)
        spanMpAlternativo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMpAlternativo.innerText = parseInt(indiceAMostrar+1)
    } else if (resReunionSim) {
        let spanReunionSim = document.getElementById(`resReunionSim${kValue}`)
        let spanRevisionReunionSim = document.getElementById(`resRevisionReunionSim${kValue}`)
        spanReunionSim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionReunionSim.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnterior4PrimeraSim = document.getElementById(`btnAnterior4PrimeraSim${kValue}`)
    let btnSiguiente4PrimeraSim = document.getElementById(`btnSiguiente4PrimeraSim${kValue}`)
    let containerBtnAnteriorSiguiente4PrimeraSim = document.getElementById(`btnAnteriorSiguiente4PrimeraSim${kValue}`)
    
    function colorSpan4PrimeraSim(spanElement4PrimeraSim) {
        let resultColor
        let resultTextColor
        spanElement4PrimeraSim.classList.remove("bg-success")
        spanElement4PrimeraSim.classList.remove("bg-danger")
        spanElement4PrimeraSim.classList.remove("bg-warning")
        spanElement4PrimeraSim.classList.remove("bg-secondary")
        spanElement4PrimeraSim.classList.remove("bg-info")
        spanElement4PrimeraSim.classList.remove("text-white")
        spanElement4PrimeraSim.classList.remove("text-dark")

        if (spanElement4PrimeraSim.innerText == "OK") {
           resultColor = spanElement4PrimeraSim.classList.add("bg-success")
           resultTextColor = spanElement4PrimeraSim.classList.add("text-white")
        } else if (spanElement4PrimeraSim.innerText == "No OK") {
           resultColor = spanElement4PrimeraSim.classList.add("bg-danger")
           resultTextColor = spanElement4PrimeraSim.classList.add("text-white")
        } else if (spanElement4PrimeraSim.innerText == "S/D") {
           resultColor = spanElement4PrimeraSim.classList.add("bg-secondary")
           resultTextColor = spanElement4PrimeraSim.classList.add("text-white")
        } else if (spanElement4PrimeraSim.innerText == "Pendiente") {
           resultColor = spanElement4PrimeraSim.classList.add("bg-warning")
           resultTextColor = spanElement4PrimeraSim.classList.add("text-dark")
        } else if (spanElement4PrimeraSim.innerText == "N/A") {
            resultColor = spanElement4PrimeraSim.classList.add("bg-info")
            resultTextColor = spanElement4PrimeraSim.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadas4PrimeraSim (containerBtnAnteriorSiguiente4PrimeraSim) {
        containerBtnAnteriorSiguiente4PrimeraSim.classList.add("bg-secondary")
        containerBtnAnteriorSiguiente4PrimeraSim.classList.add("bg-gradient")
        containerBtnAnteriorSiguiente4PrimeraSim.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadas4PrimeraSim (containerBtnAnteriorSiguiente4PrimeraSim) {
        containerBtnAnteriorSiguiente4PrimeraSim.classList.remove("bg-secondary")
        containerBtnAnteriorSiguiente4PrimeraSim.classList.remove("bg-gradient")
        containerBtnAnteriorSiguiente4PrimeraSim.classList.remove("bg-opacity-25")
    }
    
    let spanElement4PrimeraSim
    if (resMatEnsayo) {
        spanElement4PrimeraSim = resMatEnsayo
    } else if (resMas10Menos) {
        spanElement4PrimeraSim = resMas10Menos
    } else if (resMpAlternativo) {
        spanElement4PrimeraSim = resMpAlternativo
    } else if (resReunionSim) {
        spanElement4PrimeraSim = resReunionSim
    }
    // console.log('spanElement4PrimeraSim:', spanElement4PrimeraSim)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpan4PrimeraSim(spanElement4PrimeraSim)
        btnAnterior4PrimeraSim.disabled = 'true'
        btnSiguiente4PrimeraSim.removeAttribute('disabled')
    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpan4PrimeraSim(spanElement4PrimeraSim)
        btnAnterior4PrimeraSim.removeAttribute('disabled')
        btnSiguiente4PrimeraSim.disabled = true
        eliminarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguiente4PrimeraSim)
    } else {
        colorSpan4PrimeraSim(spanElement4PrimeraSim)
        btnAnterior4PrimeraSim.removeAttribute('disabled')
        btnSiguiente4PrimeraSim.removeAttribute('disabled')
        agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguiente4PrimeraSim)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior4PrimeraSim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)-1
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resMatEnsayo = document.getElementById(`resMatEnsayo${kValue}`)
    let resMas10Menos = document.getElementById(`resMas10Menos${kValue}`)
    let resMpAlternativo = document.getElementById(`resMpAlternativo${kValue}`)
    let resReunionSim = document.getElementById(`resReunionSim${kValue}`)

    mostrarElemento4PrimeraSim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resMatEnsayo,
        resMas10Menos,
        resMpAlternativo,
        resReunionSim
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente4PrimeraSim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)+1
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resMatEnsayo = document.getElementById(`resMatEnsayo${kValue}`)
    let resMas10Menos = document.getElementById(`resMas10Menos${kValue}`)
    let resMpAlternativo = document.getElementById(`resMpAlternativo${kValue}`)
    let resReunionSim = document.getElementById(`resReunionSim${kValue}`)

    mostrarElemento4PrimeraSim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resMatEnsayo,
        resMas10Menos,
        resMpAlternativo,
        resReunionSim
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** MatEnsayo + Mas10Menos + MpAlternativo + ReunionSim + S1pOp20***** */
let spanRes4PrimeraSim = Array.from(document.querySelectorAll('span[name="resRevisionMatEnsayo"],span[name="resRevisionMas10Menos"],span[name="resRevisionMpAlternativo"],span[name="resRevisionReunionSim"]'))

spanRes4PrimeraSim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionMatEnsayo':
                var regex = /^resRevisionMatEnsayo/;
            break;
            case 'resRevisionMas10Menos':
                var regex = /^resRevisionMas10Menos/;
            break;
            case 'resRevisionMpAlternativo':
                var regex = /^resRevisionMpAlternativo/;
            break;
            case 'resRevisionReunionSim':
                var regex = /^resRevisionReunionSim/;
            break;
            default:
                break;
        }
        // console.log('regex: ', regex)

        // Eliminar el texto inicial de la cadena
        var idFinalInputs = idSpotSelected.replace(regex, '');
        // console.log('idFinalInputs: ', idFinalInputs)

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