let arrBtnAnteriorDisenoPrimera = []
let arrBtnSiguienteDisenoPrimera = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguienteDisenoPrimera${i}_${p}_${q}`)) {
                arrBtnAnteriorDisenoPrimera.push(i)
                arrBtnSiguienteDisenoPrimera.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorDisenoPrimera !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorDisenoPrimera"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoPrimera(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArrayDisenoPrimera
            })
        }
    })
}

if(arrBtnSiguienteDisenoPrimera !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteDisenoPrimera"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoPrimera(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArrayDisenoPrimera
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoDisenoPrimera(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resAvDiseno,
    resPrimerRevision50,
    resSegundaRevision80,
    resEnvioCliente) {
    // console.log('resProcesoDisenoPrimera: ', resProcesoDisenoPrimera, 'resHorasProcesoDisenoPrimera: ', resHorasProcesoDisenoPrimera)
    // console.log('kValue', kValue)
    
    if (resAvDiseno) {
        let spanAvDiseno = document.getElementById(`resAvDiseno${kValue}`)
        let spanRevisionAvDiseno = document.getElementById(`resRevisionAvDiseno${kValue}`)
        spanAvDiseno.innerText = arrayFromValues[parseInt(indiceAMostrar)]+'%'
        spanRevisionAvDiseno.innerText = parseInt(indiceAMostrar+1)
    } else if (resPrimerRevision50) {
        let spanPrimerRevision50 = document.getElementById(`resPrimerRev50${kValue}`)
        let spanRevisionPrimerRevision50 = document.getElementById(`resRevisionPrimerRev50${kValue}`)
        spanPrimerRevision50.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionPrimerRevision50.innerText = parseInt(indiceAMostrar+1)
    } else if (resSegundaRevision80) {
        let spanSegundaRevision80 = document.getElementById(`resSegundaRev80${kValue}`)
        let spanRevisionSegundaRevision80 = document.getElementById(`resRevisionSegundaRev80${kValue}`)
        spanSegundaRevision80.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionSegundaRevision80.innerText = parseInt(indiceAMostrar+1)
    } else if (resEnvioCliente) {
        let spanEnvCliente = document.getElementById(`resEnvCliente${kValue}`)
        let spanRevisionEnvCliente = document.getElementById(`resRevisionEnvCliente${kValue}`)
        spanEnvCliente.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionEnvCliente.innerText = parseInt(indiceAMostrar+1)
    }
    

    let btnAnteriorDisenoPrimera = document.getElementById(`btnAnteriorDisenoPrimera${kValue}`)
    let btnSiguienteDisenoPrimera = document.getElementById(`btnSiguienteDisenoPrimera${kValue}`)
    let containerBtnAnteriorSiguienteDisenoPrimera = document.getElementById(`btnAnteriorSiguienteDisenoPrimera${kValue}`)
    
    function colorSpanDisenoPrimera(spanElementDisenoPrimera) {
        let resultColor
        let resultTextColor
        spanElementDisenoPrimera.classList.remove("bg-success")
        spanElementDisenoPrimera.classList.remove("bg-danger")
        spanElementDisenoPrimera.classList.remove("bg-warning")
        spanElementDisenoPrimera.classList.remove("bg-secondary")
        spanElementDisenoPrimera.classList.remove("bg-info")
        spanElementDisenoPrimera.classList.remove("text-white")
        spanElementDisenoPrimera.classList.remove("text-dark")

        if (spanElementDisenoPrimera.innerText == "OK") {
           resultColor = spanElementDisenoPrimera.classList.add("bg-success")
           resultTextColor = spanElementDisenoPrimera.classList.add("text-white")
        } else if (spanElementDisenoPrimera.innerText == "No OK") {
           resultColor = spanElementDisenoPrimera.classList.add("bg-danger")
           resultTextColor = spanElementDisenoPrimera.classList.add("text-white")
        } else if (spanElementDisenoPrimera.innerText == "S/D") {
           resultColor = spanElementDisenoPrimera.classList.add("bg-secondary")
           resultTextColor = spanElementDisenoPrimera.classList.add("text-white")
        } else if (spanElementDisenoPrimera.innerText == "Pendiente") {
           resultColor = spanElementDisenoPrimera.classList.add("bg-warning")
           resultTextColor = spanElementDisenoPrimera.classList.add("text-dark")
        } else if (spanElementDisenoPrimera.innerText == "N/A") {
            resultColor = spanElementDisenoPrimera.classList.add("bg-info")
            resultTextColor = spanElementDisenoPrimera.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadasDisenoPrimera (containerBtnAnteriorSiguienteDisenoPrimera) {
        containerBtnAnteriorSiguienteDisenoPrimera.classList.add("bg-secondary")
        containerBtnAnteriorSiguienteDisenoPrimera.classList.add("bg-gradient")
        containerBtnAnteriorSiguienteDisenoPrimera.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadasDisenoPrimera (containerBtnAnteriorSiguienteDisenoPrimera) {
        containerBtnAnteriorSiguienteDisenoPrimera.classList.remove("bg-secondary")
        containerBtnAnteriorSiguienteDisenoPrimera.classList.remove("bg-gradient")
        containerBtnAnteriorSiguienteDisenoPrimera.classList.remove("bg-opacity-25")
    }
    
    let spanElementDisenoPrimera
    if (resAvDiseno) {
        spanElementDisenoPrimera = resAvDiseno
    } else if (resPrimerRevision50) {
        spanElementDisenoPrimera = resPrimerRevision50
    } else if (resSegundaRevision80) {
        spanElementDisenoPrimera = resSegundaRevision80
    } else if (resEnvioCliente) {
        spanElementDisenoPrimera = resEnvioCliente
    }
    
    if (indiceAMostrar == 0) {
        colorSpanDisenoPrimera(spanElementDisenoPrimera)
        btnAnteriorDisenoPrimera.disabled = 'true'
        btnSiguienteDisenoPrimera.removeAttribute('disabled')
        agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteDisenoPrimera)
    } else if (indiceAMostrar == arrayFromValues.length-1) {
        colorSpanDisenoPrimera(spanElementDisenoPrimera)
        btnAnteriorDisenoPrimera.removeAttribute('disabled')
        btnSiguienteDisenoPrimera.disabled = true
        eliminarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteDisenoPrimera)
    } else {
        colorSpanDisenoPrimera(spanElementDisenoPrimera)
        btnAnteriorDisenoPrimera.removeAttribute('disabled')
        btnSiguienteDisenoPrimera.removeAttribute('disabled')
        agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteDisenoPrimera)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorDisenoPrimera(arrayFromValues, kValue) {
    
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resAvDiseno = document.getElementById(`resAvDiseno${kValue}`)
    let resPrimerRev50 = document.getElementById(`resPrimerRev50${kValue}`)
    let resSegundaRev80 = document.getElementById(`resSegundaRev80${kValue}`)
    let resEnvioCliente = document.getElementById(`resEnvCliente${kValue}`)

    mostrarElementoDisenoPrimera(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resAvDiseno,
        resPrimerRev50,
        resSegundaRev80,
        resEnvioCliente)
    }

// Función para mostrar el elemento siguiente
function mostrarSiguienteDisenoPrimera(arrayFromValues, kValue) {

    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)
    
    let resAvDiseno = document.getElementById(`resAvDiseno${kValue}`)
    let resPrimerRev50 = document.getElementById(`resPrimerRev50${kValue}`)
    let resSegundaRev80 = document.getElementById(`resSegundaRev80${kValue}`)
    let resEnvioCliente = document.getElementById(`resEnvCliente${kValue}`)

    mostrarElementoDisenoPrimera(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resAvDiseno,
        resPrimerRev50,
        resSegundaRev80,
        resEnvioCliente)
}
//*********** End Evento btn anterior y siguiente ********* */


//************ ToolTip btn-Arrows anterior/Siguiente -----------
//******Av Diseño + Rev50 + Rev80 + Env Cliente ***** */
let spanResDisenoPrimera = Array.from(document.querySelectorAll('span[name="resRevisionAvDiseno"],span[name="resRevisionPrimerRev50"],span[name="resRevisionSegundaRev80"],span[name="resRevisionEnvCliente"]'))

spanResDisenoPrimera.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionAvDiseno':
                regex = /^resRevisionAvDiseno/;
            break;
            case 'resRevisionPrimerRev50':
                regex = /^resRevisionPrimerRev50/;
            break;
            case 'resRevisionSegundaRev80':
                regex = /^resRevisionSegundaRev80/;
            break;
            case 'resRevisionEnvCliente':
                regex = /^resRevisionEnvCliente/;
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