let arrBtnAnterior1Sim = []
let arrBtnSiguiente1Sim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente1Sim${i}_${p}_${q}`)) {
                arrBtnAnterior1Sim.push(i)
                arrBtnSiguiente1Sim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior1Sim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior1Sim"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnterior1Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente1Sim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente1Sim"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguiente1Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento1Sim(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    res1Sim,
    resVideo,
    resInforme,
    resPpt,
    resS1p20Op
    ) {
    // console.log('res1Sim: ', res1Sim)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (res1Sim) {
        let span1Sim = document.getElementById(`res1Sim${kValue}`)
        let spanRevision1Sim = document.getElementById(`resRevision1Sim${kValue}`)
        span1Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevision1Sim.innerText = parseInt(indiceAMostrar+1)
    } else if (resVideo) {
        let spanVideo = document.getElementById(`resVideo${kValue}`)
        let spanRevisionVideo = document.getElementById(`resRevisionVideo${kValue}`)
        spanVideo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionVideo.innerText = parseInt(indiceAMostrar+1)
    } else if (resInforme) {
        let spanInforme = document.getElementById(`resInforme${kValue}`)
        let spanRevisionInforme = document.getElementById(`resRevisionInforme${kValue}`)
        spanInforme.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionInforme.innerText = parseInt(indiceAMostrar+1)
    } else if (resPpt) {
        let spanPpt = document.getElementById(`resPpt${kValue}`)
        let spanRevisionPpt = document.getElementById(`resRevisionPpt${kValue}`)
        spanPpt.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionPpt.innerText = parseInt(indiceAMostrar+1)
    } else if (resS1p20Op) {
        let spanS1p20Op = document.getElementById(`resS1p20Op${kValue}`)
        let spanRevisionS1p20Op = document.getElementById(`resRevisionS1p20Op${kValue}`)
        spanS1p20Op.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionS1p20Op.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnterior1Sim = document.getElementById(`btnAnterior1Sim${kValue}`)
    let btnSiguiente1Sim = document.getElementById(`btnSiguiente1Sim${kValue}`)
    let containerBtnAnteriorSiguiente1Sim = document.getElementById(`btnAnteriorSiguiente1Sim${kValue}`)
    
    function colorSpan1Sim(spanElement1Sim) {
        let resultColor
        let resultTextColor
        spanElement1Sim.classList.remove("bg-success")
        spanElement1Sim.classList.remove("bg-danger")
        spanElement1Sim.classList.remove("bg-warning")
        spanElement1Sim.classList.remove("bg-secondary")
        spanElement1Sim.classList.remove("bg-info")
        spanElement1Sim.classList.remove("text-white")
        spanElement1Sim.classList.remove("text-dark")

        if (spanElement1Sim.innerText == "OK") {
           resultColor = spanElement1Sim.classList.add("bg-success")
           resultTextColor = spanElement1Sim.classList.add("text-white")
        } else if (spanElement1Sim.innerText == "No OK") {
           resultColor = spanElement1Sim.classList.add("bg-danger")
           resultTextColor = spanElement1Sim.classList.add("text-white")
        } else if (spanElement1Sim.innerText == "S/D") {
           resultColor = spanElement1Sim.classList.add("bg-secondary")
           resultTextColor = spanElement1Sim.classList.add("text-white")
        } else if (spanElement1Sim.innerText == "Pendiente") {
           resultColor = spanElement1Sim.classList.add("bg-warning")
           resultTextColor = spanElement1Sim.classList.add("text-dark")
        } else if (spanElement1Sim.innerText == "N/A") {
            resultColor = spanElement1Sim.classList.add("bg-info")
            resultTextColor = spanElement1Sim.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadas1Sim (containerBtnAnteriorSiguiente1Sim) {
        containerBtnAnteriorSiguiente1Sim.classList.add("bg-secondary")
        containerBtnAnteriorSiguiente1Sim.classList.add("bg-gradient")
        containerBtnAnteriorSiguiente1Sim.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadas1Sim (containerBtnAnteriorSiguiente1Sim) {
        containerBtnAnteriorSiguiente1Sim.classList.remove("bg-secondary")
        containerBtnAnteriorSiguiente1Sim.classList.remove("bg-gradient")
        containerBtnAnteriorSiguiente1Sim.classList.remove("bg-opacity-25")
    }
    
    let spanElement1Sim
    if (res1Sim) {
        spanElement1Sim = res1Sim
    } else if (resVideo) {
        spanElement1Sim = resVideo
    } else if (resInforme) {
        spanElement1Sim = resInforme
    } else if (resPpt) {
        spanElement1Sim = resPpt
    } else if (resS1p20Op) {
        spanElement1Sim = resS1p20Op
    }
    // console.log('spanElement1Sim:', spanElement1Sim)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpan1Sim(spanElement1Sim)
        btnAnterior1Sim.disabled = 'true'
        btnSiguiente1Sim.removeAttribute('disabled')
    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpan1Sim(spanElement1Sim)
        btnAnterior1Sim.removeAttribute('disabled')
        btnSiguiente1Sim.disabled = true
        eliminarEstiloRevPasadas1Sim(containerBtnAnteriorSiguiente1Sim)
    } else {
        colorSpan1Sim(spanElement1Sim)
        btnAnterior1Sim.removeAttribute('disabled')
        btnSiguiente1Sim.removeAttribute('disabled')
        agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguiente1Sim)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior1Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)-1
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let res1Sim = document.getElementById(`res1Sim${kValue}`)
    let resVideo = document.getElementById(`resVideo${kValue}`)
    let resInforme = document.getElementById(`resInforme${kValue}`)
    let resPpt = document.getElementById(`resPpt${kValue}`)
    let resS1p20Op = document.getElementById(`resS1p20Op${kValue}`)

    mostrarElemento1Sim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        res1Sim,
        resVideo,
        resInforme,
        resPpt,
        resS1p20Op
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente1Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)+1
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let res1Sim = document.getElementById(`res1Sim${kValue}`)
    let resVideo = document.getElementById(`resVideo${kValue}`)
    let resInforme = document.getElementById(`resInforme${kValue}`)
    let resPpt = document.getElementById(`resPpt${kValue}`)
    let resS1p20Op = document.getElementById(`resS1p20Op${kValue}`)

    mostrarElemento1Sim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        res1Sim,
        resVideo,
        resInforme,
        resPpt,
        resS1p20Op
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** 1Sim + Video + Informe + ppt + S1pOp20***** */
let spanRes1Sim = Array.from(document.querySelectorAll('span[name="resRevision1Sim"],span[name="resRevisionVideo"],span[name="resRevisionInforme"],span[name="resRevisionPpt"],span[name="resRevisionS1p20Op"]'))

spanRes1Sim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevision1Sim':
                var regex = /^resRevision1Sim/;
            break;
            case 'resRevisionVideo':
                var regex = /^resRevisionVideo/;
            break;
            case 'resRevisionInforme':
                var regex = /^resRevisionInforme/;
            break;
            case 'resRevisionPpt':
                var regex = /^resRevisionPpt/;
            break;
            case 'resRevisionS1p20Op':
                var regex = /^resRevisionS1p20Op/;
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