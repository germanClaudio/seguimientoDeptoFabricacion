let arrBtnAnterior0Sim = []
let arrBtnSiguiente0Sim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente0Sim${i}_${p}_${q}`)) {
                arrBtnAnterior0Sim.push(i)
                arrBtnSiguiente0Sim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior0Sim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior0Sim"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnterior0Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente0Sim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente0Sim"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguiente0Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento0Sim(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    res0Sim,
    resDocu0Sim)
    {
    // console.log('res0Sim: ', res0Sim, 'res0Sim: ', resDocu0Sim)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (res0Sim) {
        let span0Sim = document.getElementById(`res0Sim${kValue}`)
        let spanRevision0Sim = document.getElementById(`resRevision0Sim${kValue}`)
        span0Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevision0Sim.innerText = parseInt(indiceAMostrar+1)
    } else if (resDocu0Sim) {
        let spanDocu0Sim = document.getElementById(`resDocu0Sim${kValue}`)
        let spanRevisionDocu0Sim = document.getElementById(`resRevisionDocu0Sim${kValue}`)
        spanDocu0Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionDocu0Sim.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnterior0Sim = document.getElementById(`btnAnterior0Sim${kValue}`)
    let btnSiguiente0Sim = document.getElementById(`btnSiguiente0Sim${kValue}`)
    let containerBtnAnteriorSiguiente0Sim = document.getElementById(`btnAnteriorSiguiente0Sim${kValue}`)
    
    function colorSpan0Sim(spanElement0Sim) {
        let resultColor
        let resultTextColor
        spanElement0Sim.classList.remove("bg-success")
        spanElement0Sim.classList.remove("bg-danger")
        spanElement0Sim.classList.remove("bg-warning")
        spanElement0Sim.classList.remove("bg-secondary")
        spanElement0Sim.classList.remove("bg-info")
        spanElement0Sim.classList.remove("text-white")
        spanElement0Sim.classList.remove("text-dark")

        if (spanElement0Sim.innerText == "OK") {
           resultColor = spanElement0Sim.classList.add("bg-success")
           resultTextColor = spanElement0Sim.classList.add("text-white")
        } else if (spanElement0Sim.innerText == "No OK") {
           resultColor = spanElement0Sim.classList.add("bg-danger")
           resultTextColor = spanElement0Sim.classList.add("text-white")
        } else if (spanElement0Sim.innerText == "S/D") {
           resultColor = spanElement0Sim.classList.add("bg-secondary")
           resultTextColor = spanElement0Sim.classList.add("text-white")
        } else if (spanElement0Sim.innerText == "Pendiente") {
           resultColor = spanElement0Sim.classList.add("bg-warning")
           resultTextColor = spanElement0Sim.classList.add("text-dark")
        } else if (spanElement0Sim.innerText == "N/A") {
            resultColor = spanElement0Sim.classList.add("bg-info")
            resultTextColor = spanElement0Sim.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadas0Sim (containerBtnAnteriorSiguiente0Sim) {
        containerBtnAnteriorSiguiente0Sim.classList.add("bg-secondary")
        containerBtnAnteriorSiguiente0Sim.classList.add("bg-gradient")
        containerBtnAnteriorSiguiente0Sim.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadas0Sim (containerBtnAnteriorSiguiente0Sim) {
        containerBtnAnteriorSiguiente0Sim.classList.remove("bg-secondary")
        containerBtnAnteriorSiguiente0Sim.classList.remove("bg-gradient")
        containerBtnAnteriorSiguiente0Sim.classList.remove("bg-opacity-25")
    }
    
    let spanElement0Sim
    if (res0Sim) {
        spanElement0Sim = res0Sim
    } else if (resDocu0Sim) {
        spanElement0Sim = resDocu0Sim
    }
    // console.log('spanElement0Sim:', spanElement0Sim)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpan0Sim(spanElement0Sim)
        btnAnterior0Sim.disabled = 'true'
        btnSiguiente0Sim.removeAttribute('disabled')
    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpan0Sim(spanElement0Sim)
        btnAnterior0Sim.removeAttribute('disabled')
        btnSiguiente0Sim.disabled = true
        eliminarEstiloRevPasadas0Sim(containerBtnAnteriorSiguiente0Sim)
    } else {
        colorSpan0Sim(spanElement0Sim)
        btnAnterior0Sim.removeAttribute('disabled')
        btnSiguiente0Sim.removeAttribute('disabled')
        agregarEstiloRevPasadas0Sim(containerBtnAnteriorSiguiente0Sim)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior0Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let res0Sim = document.getElementById(`res0Sim${kValue}`)
    let resDocu0Sim = document.getElementById(`resDocu0Sim${kValue}`)

    mostrarElemento0Sim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        res0Sim,
        resDocu0Sim
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente0Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let res0Sim = document.getElementById(`res0Sim${kValue}`)
    let resDocu0Sim = document.getElementById(`resDocu0Sim${kValue}`)

    mostrarElemento0Sim(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        res0Sim,
        resDocu0Sim
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** 0Sim + Docu 0Sim ***** */
let spanRes0Sim = Array.from(document.querySelectorAll('span[name="resRevision0Sim"],span[name="resRevisionDocu0Sim"]'))

spanRes0Sim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevision0Sim':
                var regex = /^resRevision0Sim/;
            break;
            case 'resRevisionDocu0Sim':
                var regex = /^resRevisionDocu0Sim/;
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