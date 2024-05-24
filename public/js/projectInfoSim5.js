let arrBtnAnterior5Sim = []
let arrBtnSiguiente5Sim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente5Sim${i}_${p}_${q}`)) {
                arrBtnAnterior5Sim.push(i)
                arrBtnSiguiente5Sim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior5Sim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior5Sim"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnterior5Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente5Sim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente5Sim"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguiente5Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento5Sim(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resGrillado,
    resMpEnsayada
    ) {
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resGrillado) {
        let spanGrillado = document.getElementById(`resGrillado${kValue}`)
        let spanRevisionGrillado = document.getElementById(`resRevisionGrillado${kValue}`)
        spanGrillado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionGrillado.innerText = parseInt(indiceAMostrar+1)
    } else if (resMpEnsayada) {
        let spanMpEnsayada = document.getElementById(`resMpEnsayada${kValue}`)
        let spanRevisionMpEnsayada = document.getElementById(`resRevisionMpEnsayada${kValue}`)
        spanMpEnsayada.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMpEnsayada.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnterior5Sim = document.getElementById(`btnAnterior5Sim${kValue}`)
    let btnSiguiente5Sim = document.getElementById(`btnSiguiente5Sim${kValue}`)
    let containerBtnAnteriorSiguiente5Sim = document.getElementById(`btnAnteriorSiguiente5Sim${kValue}`)
    
    function colorSpan5Sim(spanElement5Sim) {
        let resultColor
        let resultTextColor
        spanElement5Sim.classList.remove("bg-success")
        spanElement5Sim.classList.remove("bg-danger")
        spanElement5Sim.classList.remove("bg-warning")
        spanElement5Sim.classList.remove("bg-secondary")
        spanElement5Sim.classList.remove("bg-info")
        spanElement5Sim.classList.remove("text-white")
        spanElement5Sim.classList.remove("text-dark")

        if (spanElement5Sim.innerText == "OK") {
           resultColor = spanElement5Sim.classList.add("bg-success")
           resultTextColor = spanElement5Sim.classList.add("text-white")
        } else if (spanElement5Sim.innerText == "No OK") {
           resultColor = spanElement5Sim.classList.add("bg-danger")
           resultTextColor = spanElement5Sim.classList.add("text-white")
        } else if (spanElement5Sim.innerText == "S/D") {
           resultColor = spanElement5Sim.classList.add("bg-secondary")
           resultTextColor = spanElement5Sim.classList.add("text-white")
        } else if (spanElement5Sim.innerText == "Pendiente") {
           resultColor = spanElement5Sim.classList.add("bg-warning")
           resultTextColor = spanElement5Sim.classList.add("text-dark")
        } else if (spanElement5Sim.innerText == "N/A") {
            resultColor = spanElement5Sim.classList.add("bg-info")
            resultTextColor = spanElement5Sim.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadas5Sim (containerBtnAnteriorSiguiente5Sim) {
        containerBtnAnteriorSiguiente5Sim.classList.add("bg-secondary")
        containerBtnAnteriorSiguiente5Sim.classList.add("bg-gradient")
        containerBtnAnteriorSiguiente5Sim.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadas5Sim (containerBtnAnteriorSiguiente5Sim) {
        containerBtnAnteriorSiguiente5Sim.classList.remove("bg-secondary")
        containerBtnAnteriorSiguiente5Sim.classList.remove("bg-gradient")
        containerBtnAnteriorSiguiente5Sim.classList.remove("bg-opacity-25")
    }
    
    let spanElement5Sim
    if (resGrillado) {
        spanElement5Sim = resGrillado
    } else if (resMpEnsayada) {
        spanElement5Sim = resMpEnsayada
    }
    // console.log('spanElement5Sim:', spanElement5Sim)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpan5Sim(spanElement5Sim)
        btnAnterior5Sim.disabled = 'true'
        btnSiguiente5Sim.removeAttribute('disabled')
    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpan5Sim(spanElement5Sim)
        btnAnterior5Sim.removeAttribute('disabled')
        btnSiguiente5Sim.disabled = true
        eliminarEstiloRevPasadas5Sim(containerBtnAnteriorSiguiente5Sim)
    } else {
        colorSpan5Sim(spanElement5Sim)
        btnAnterior5Sim.removeAttribute('disabled')
        btnSiguiente5Sim.removeAttribute('disabled')
        agregarEstiloRevPasadas5Sim(containerBtnAnteriorSiguiente5Sim)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior5Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)-1
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resGrillado = document.getElementById(`resGrillado${kValue}`)
    let resMpEnsayada = document.getElementById(`resMpEnsayada${kValue}`)

    mostrarElemento5Sim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resGrillado,
        resMpEnsayada
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente5Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)+1
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resGrillado = document.getElementById(`resGrillado${kValue}`)
    let resMpEnsayada = document.getElementById(`resMpEnsayada${kValue}`)

    mostrarElemento5Sim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resGrillado,
        resMpEnsayada
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** Grillado + MpEnsayada ***** */
let spanRes5Sim = Array.from(document.querySelectorAll('span[name="resRevisionGrillado"],span[name="resRevisionMpEnsayada"]'))

spanRes5Sim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionGrillado':
                var regex = /^resRevisionGrillado/;
            break;
            case 'resRevisionMpEnsayada':
                var regex = /^resRevisionMpEnsayada/;
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