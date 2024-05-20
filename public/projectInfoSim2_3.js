let arrBtnAnterior2_3Sim = []
let arrBtnSiguiente2_3Sim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente2_3Sim${i}_${p}_${q}`)) {
                arrBtnAnterior2_3Sim.push(i)
                arrBtnSiguiente2_3Sim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior2_3Sim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior2_3Sim"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnterior2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente2_3Sim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente2_3Sim"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguiente2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento2_3Sim(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    res2Sim,
    resReporte,
    resDfnProdismo,
    res3Sim
    ) {
    // console.log('res2_3Sim: ', res2_3Sim)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (res2Sim) {
        let span2Sim = document.getElementById(`res2Sim${kValue}`)
        let spanRevision2Sim = document.getElementById(`resRevision2Sim${kValue}`)
        span2Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevision2Sim.innerText = parseInt(indiceAMostrar+1)
    } else if (resReporte) {
        let spanReporte = document.getElementById(`resReporte${kValue}`)
        let spanRevisionReporte = document.getElementById(`resRevisionReporte${kValue}`)
        spanReporte.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionReporte.innerText = parseInt(indiceAMostrar+1)
    } else if (resDfnProdismo) {
        let spanDfnProdismo = document.getElementById(`resDfnProdismo${kValue}`)
        let spanRevisionDfnProdismo = document.getElementById(`resRevisionDfnProdismo${kValue}`)
        spanDfnProdismo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionDfnProdismo.innerText = parseInt(indiceAMostrar+1)
    } else if (res3Sim) {
        let span3Sim = document.getElementById(`res3Sim${kValue}`)
        let spanRevision3Sim = document.getElementById(`resRevision3Sim${kValue}`)
        span3Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevision3Sim.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnterior2_3Sim = document.getElementById(`btnAnterior2_3Sim${kValue}`)
    let btnSiguiente2_3Sim = document.getElementById(`btnSiguiente2_3Sim${kValue}`)
    let containerBtnAnteriorSiguiente2_3Sim = document.getElementById(`btnAnteriorSiguiente2_3Sim${kValue}`)
    
    function colorSpan2_3Sim(spanElement2_3Sim) {
        let resultColor
        let resultTextColor
        spanElement2_3Sim.classList.remove("bg-success")
        spanElement2_3Sim.classList.remove("bg-danger")
        spanElement2_3Sim.classList.remove("bg-warning")
        spanElement2_3Sim.classList.remove("bg-secondary")
        spanElement2_3Sim.classList.remove("bg-info")
        spanElement2_3Sim.classList.remove("text-white")
        spanElement2_3Sim.classList.remove("text-dark")

        if (spanElement2_3Sim.innerText == "OK") {
           resultColor = spanElement2_3Sim.classList.add("bg-success")
           resultTextColor = spanElement2_3Sim.classList.add("text-white")
        } else if (spanElement2_3Sim.innerText == "No OK") {
           resultColor = spanElement2_3Sim.classList.add("bg-danger")
           resultTextColor = spanElement2_3Sim.classList.add("text-white")
        } else if (spanElement2_3Sim.innerText == "S/D") {
           resultColor = spanElement2_3Sim.classList.add("bg-secondary")
           resultTextColor = spanElement2_3Sim.classList.add("text-white")
        } else if (spanElement2_3Sim.innerText == "Pendiente") {
           resultColor = spanElement2_3Sim.classList.add("bg-warning")
           resultTextColor = spanElement2_3Sim.classList.add("text-dark")
        } else if (spanElement2_3Sim.innerText == "N/A") {
            resultColor = spanElement2_3Sim.classList.add("bg-info")
            resultTextColor = spanElement2_3Sim.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadas2_3Sim (containerBtnAnteriorSiguiente2_3Sim) {
        containerBtnAnteriorSiguiente2_3Sim.classList.add("bg-secondary")
        containerBtnAnteriorSiguiente2_3Sim.classList.add("bg-gradient")
        containerBtnAnteriorSiguiente2_3Sim.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadas2_3Sim (containerBtnAnteriorSiguiente2_3Sim) {
        containerBtnAnteriorSiguiente2_3Sim.classList.remove("bg-secondary")
        containerBtnAnteriorSiguiente2_3Sim.classList.remove("bg-gradient")
        containerBtnAnteriorSiguiente2_3Sim.classList.remove("bg-opacity-25")
    }
    
    let spanElement2_3Sim
    if (res2Sim) {
        spanElement2_3Sim = res2Sim
    } else if (resReporte) {
        spanElement2_3Sim = resReporte
    } else if (resDfnProdismo) {
        spanElement2_3Sim = resDfnProdismo
    } else if (res3Sim) {
        spanElement2_3Sim = res3Sim
    }
    // console.log('spanElement2_3Sim:', spanElement2_3Sim)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpan2_3Sim(spanElement2_3Sim)
        btnAnterior2_3Sim.disabled = 'true'
        btnSiguiente2_3Sim.removeAttribute('disabled')
    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpan2_3Sim(spanElement2_3Sim)
        btnAnterior2_3Sim.removeAttribute('disabled')
        btnSiguiente2_3Sim.disabled = true
        eliminarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguiente2_3Sim)
    } else {
        colorSpan2_3Sim(spanElement2_3Sim)
        btnAnterior2_3Sim.removeAttribute('disabled')
        btnSiguiente2_3Sim.removeAttribute('disabled')
        agregarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguiente2_3Sim)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior2_3Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)-1
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let res2Sim = document.getElementById(`res2Sim${kValue}`)
    let resReporte = document.getElementById(`resReporte${kValue}`)
    let resDfnProdismo = document.getElementById(`resDfnProdismo${kValue}`)
    let res3Sim = document.getElementById(`res3Sim${kValue}`)

    mostrarElemento2_3Sim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        res2Sim,
        resReporte,
        resDfnProdismo,
        res3Sim
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente2_3Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)+1
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let res2Sim = document.getElementById(`res2Sim${kValue}`)
    let resReporte = document.getElementById(`resReporte${kValue}`)
    let resDfnProdismo = document.getElementById(`resDfnProdismo${kValue}`)
    let res3Sim = document.getElementById(`res3Sim${kValue}`)

    mostrarElemento2_3Sim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        res2Sim,
        resReporte,
        resDfnProdismo,
        res3Sim
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** 2Sim + Reporte + DfnProdismo + 3Sim + S1pOp20***** */
let spanRes2_3Sim = Array.from(document.querySelectorAll('span[name="resRevision2Sim"],span[name="resRevisionReporte"],span[name="resRevisionDfnProdismo"],span[name="resRevision3Sim"]'))

spanRes2_3Sim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevision2Sim':
                var regex = /^resRevision2Sim/;
            break;
            case 'resRevisionReporte':
                var regex = /^resRevisionReporte/;
            break;
            case 'resRevisionDfnProdismo':
                var regex = /^resRevisionDfnProdismo/;
            break;
            case 'resRevision3Sim':
                var regex = /^resRevision3Sim/;
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