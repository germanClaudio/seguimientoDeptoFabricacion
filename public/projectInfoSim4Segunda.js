let arrBtnAnterior4SegundaSim = []
let arrBtnSiguiente4SegundaSim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente4SegundaSim${i}_${p}_${q}`)) {
                arrBtnAnterior4SegundaSim.push(i)
                arrBtnSiguiente4SegundaSim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior4SegundaSim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior4SegundaSim"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnterior4SegundaSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente4SegundaSim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente4SegundaSim"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguiente4SegundaSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento4SegundaSim(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resInforme4Sim,
    resGeo1Copiado,
    resGeo2Copiado,
    resHorasSim
    ) {
    // console.log('res4SegundaSim: ', res4SegundaSim)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resInforme4Sim) {
        let spanInformeSim4 = document.getElementById(`resInforme4Sim${kValue}`)
        let spanRevisionInformeSim4 = document.getElementById(`resRevisionInforme4Sim${kValue}`)
        spanInformeSim4.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionInformeSim4.innerText = parseInt(indiceAMostrar+1)
    } else if (resGeo1Copiado) {
        let spanGeo1Copiado = document.getElementById(`resGeo1Copiado${kValue}`)
        let spanRevisionGeo1Copiado = document.getElementById(`resRevisionGeo1Copiado${kValue}`)
        spanGeo1Copiado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionGeo1Copiado.innerText = parseInt(indiceAMostrar+1)
    } else if (resGeo2Copiado) {
        let spanGeo2Copiado = document.getElementById(`resGeo2Copiado${kValue}`)
        let spanRevisionGeo2Copiado = document.getElementById(`resRevisionGeo2Copiado${kValue}`)
        spanGeo2Copiado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionGeo2Copiado.innerText = parseInt(indiceAMostrar+1)
    } else if (resHorasSim) {
        let spanHorasSim = document.getElementById(`resHorasSim${kValue}`)
        let spanRevisionHorasSim = document.getElementById(`resRevisionHorasSim${kValue}`)
        spanHorasSim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionHorasSim.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnterior4SegundaSim = document.getElementById(`btnAnterior4SegundaSim${kValue}`)
    let btnSiguiente4SegundaSim = document.getElementById(`btnSiguiente4SegundaSim${kValue}`)
    let contBtnAntSig4SegundaSim = document.getElementById(`btnAnteriorSiguiente4SegundaSim${kValue}`)
    
    function colorSpan4SegundaSim(spanElement4SegundaSim) {
        let resultColor
        let resultTextColor
        spanElement4SegundaSim.classList.remove("bg-success")
        spanElement4SegundaSim.classList.remove("bg-danger")
        spanElement4SegundaSim.classList.remove("bg-warning")
        spanElement4SegundaSim.classList.remove("bg-secondary")
        spanElement4SegundaSim.classList.remove("bg-info")
        spanElement4SegundaSim.classList.remove("text-white")
        spanElement4SegundaSim.classList.remove("text-dark")

        if (spanElement4SegundaSim.innerText == "OK") {
           resultColor = spanElement4SegundaSim.classList.add("bg-success")
           resultTextColor = spanElement4SegundaSim.classList.add("text-white")
        } else if (spanElement4SegundaSim.innerText == "No OK") {
           resultColor = spanElement4SegundaSim.classList.add("bg-danger")
           resultTextColor = spanElement4SegundaSim.classList.add("text-white")
        } else if (spanElement4SegundaSim.innerText == "S/D") {
           resultColor = spanElement4SegundaSim.classList.add("bg-secondary")
           resultTextColor = spanElement4SegundaSim.classList.add("text-white")
        } else if (spanElement4SegundaSim.innerText == "Pendiente") {
           resultColor = spanElement4SegundaSim.classList.add("bg-warning")
           resultTextColor = spanElement4SegundaSim.classList.add("text-dark")
        } else if (spanElement4SegundaSim.innerText == "N/A") {
            resultColor = spanElement4SegundaSim.classList.add("bg-info")
            resultTextColor = spanElement4SegundaSim.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadas4SegundaSim (contBtnAntSig4SegundaSim) {
        contBtnAntSig4SegundaSim.classList.add("bg-secondary")
        contBtnAntSig4SegundaSim.classList.add("bg-gradient")
        contBtnAntSig4SegundaSim.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadas4SegundaSim (contBtnAntSig4SegundaSim) {
        contBtnAntSig4SegundaSim.classList.remove("bg-secondary")
        contBtnAntSig4SegundaSim.classList.remove("bg-gradient")
        contBtnAntSig4SegundaSim.classList.remove("bg-opacity-25")
    }
    
    let spanElement4SegundaSim
    if (resInforme4Sim) {
        spanElement4SegundaSim = resInforme4Sim
    } else if (resGeo1Copiado) {
        spanElement4SegundaSim = resGeo1Copiado
    } else if (resGeo2Copiado) {
        spanElement4SegundaSim = resGeo2Copiado
    } else if (resHorasSim) {
        spanElement4SegundaSim = resHorasSim
    }
    // console.log('spanElement4SegundaSim:', spanElement4SegundaSim)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpan4SegundaSim(spanElement4SegundaSim)
        btnAnterior4SegundaSim.disabled = 'true'
        btnSiguiente4SegundaSim.removeAttribute('disabled')
    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpan4SegundaSim(spanElement4SegundaSim)
        btnAnterior4SegundaSim.removeAttribute('disabled')
        btnSiguiente4SegundaSim.disabled = true
        eliminarEstiloRevPasadas4SegundaSim(contBtnAntSig4SegundaSim)
    } else {
        colorSpan4SegundaSim(spanElement4SegundaSim)
        btnAnterior4SegundaSim.removeAttribute('disabled')
        btnSiguiente4SegundaSim.removeAttribute('disabled')
        agregarEstiloRevPasadas4SegundaSim(contBtnAntSig4SegundaSim)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior4SegundaSim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)-1
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resInforme4Sim = document.getElementById(`resInforme4Sim${kValue}`)
    let resGeo1Copiado = document.getElementById(`resGeo1Copiado${kValue}`)
    let resGeo2Copiado = document.getElementById(`resGeo2Copiado${kValue}`)
    let resHorasSim = document.getElementById(`resHorasSim${kValue}`)

    mostrarElemento4SegundaSim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resInforme4Sim,
        resGeo1Copiado,
        resGeo2Copiado,
        resHorasSim
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente4SegundaSim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)+1
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resInforme4Sim = document.getElementById(`resInforme4Sim${kValue}`)
    let resGeo1Copiado = document.getElementById(`resGeo1Copiado${kValue}`)
    let resGeo2Copiado = document.getElementById(`resGeo2Copiado${kValue}`)
    let resHorasSim = document.getElementById(`resHorasSim${kValue}`)

    mostrarElemento4SegundaSim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resInforme4Sim,
        resGeo1Copiado,
        resGeo2Copiado,
        resHorasSim
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** InformeSim4 + Geo1Copiado + Geo2Copiado + HorasSim + S1pOp20***** */
let spanRes4SegundaSim = Array.from(document.querySelectorAll('span[name="resRevisionInforme4Sim"],span[name="resRevisionGeo1Copiado"],span[name="resRevisionGeo2Copiado"],span[name="resRevisionHorasSim"]'))

spanRes4SegundaSim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionInforme4Sim':
                var regex = /^resRevisionInforme4Sim/;
            break;
            case 'resRevisionGeo1Copiado':
                var regex = /^resRevisionGeo1Copiado/;
            break;
            case 'resRevisionGeo2Copiado':
                var regex = /^resRevisionGeo2Copiado/;
            break;
            case 'resRevisionHorasSim':
                var regex = /^resRevisionHorasSim/;
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