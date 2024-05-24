let arrBtnAnteriorDisenoSegunda = []
let arrBtnSiguienteDisenoSegunda = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguienteDisenoSegunda${i}_${p}_${q}`)) {
                arrBtnAnteriorDisenoSegunda.push(i)
                arrBtnSiguienteDisenoSegunda.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorDisenoSegunda !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorDisenoSegunda"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoSegunda(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArrayDisenoSegunda
            })
        }
    })
}

if(arrBtnSiguienteDisenoSegunda !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteDisenoSegunda"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoSegunda(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArrayDisenoSegunda
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoDisenoSegunda(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resRevisionCliente,
    resLdmProvisoria,
    resAv100Diseno,
    resAprobadoCliente) {
    // console.log('kValue', kValue)
    
    if (resAv100Diseno) {
        let spanAv100Diseno = document.getElementById(`resAv100Diseno${kValue}`)
        let spanRevisionAv100Diseno = document.getElementById(`resRevisionAv100Diseno${kValue}`)
        spanAv100Diseno.innerText = arrayFromValues[parseInt(indiceAMostrar)]+'%'
        spanRevisionAv100Diseno.innerText = parseInt(indiceAMostrar+1)
    } else if (resRevisionCliente) {
        let spanRevisionCliente = document.getElementById(`resRevisionCliente${kValue}`)
        let spanRevisionRevisionCliente = document.getElementById(`resRevisionRevisionCliente${kValue}`)
        spanRevisionCliente.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionRevisionCliente.innerText = parseInt(indiceAMostrar+1)
    } else if (resLdmProvisoria) {
        let spanLdmProvisoria = document.getElementById(`resLdmProvisoria${kValue}`)
        let spanRevisionLdmProvisoria = document.getElementById(`resRevisionLdmProvisoria${kValue}`)
        spanLdmProvisoria.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionLdmProvisoria.innerText = parseInt(indiceAMostrar+1)
    } else if (resAprobadoCliente) {
        let spanAprobadoCliente = document.getElementById(`resAprobadoCliente${kValue}`)
        let spanRevisionAprobadoCliente = document.getElementById(`resRevisionAprobadoCliente${kValue}`)
        spanAprobadoCliente.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionAprobadoCliente.innerText = parseInt(indiceAMostrar+1)
    }
    

    let btnAnteriorDisenoSegunda = document.getElementById(`btnAnteriorDisenoSegunda${kValue}`)
    let btnSiguienteDisenoSegunda = document.getElementById(`btnSiguienteDisenoSegunda${kValue}`)
    let containerBtnAnteriorSiguienteDisenoSegunda = document.getElementById(`btnAnteriorSiguienteDisenoSegunda${kValue}`)
    
    function colorSpanDisenoSegunda(spanElementDisenoSegunda) {
        let resultColor
        let resultTextColor
        spanElementDisenoSegunda.classList.remove("bg-success")
        spanElementDisenoSegunda.classList.remove("bg-danger")
        spanElementDisenoSegunda.classList.remove("bg-warning")
        spanElementDisenoSegunda.classList.remove("bg-secondary")
        spanElementDisenoSegunda.classList.remove("bg-info")
        spanElementDisenoSegunda.classList.remove("text-white")
        spanElementDisenoSegunda.classList.remove("text-dark")

        if (spanElementDisenoSegunda.innerText == "OK") {
           resultColor = spanElementDisenoSegunda.classList.add("bg-success")
           resultTextColor = spanElementDisenoSegunda.classList.add("text-white")
        } else if (spanElementDisenoSegunda.innerText == "No OK") {
           resultColor = spanElementDisenoSegunda.classList.add("bg-danger")
           resultTextColor = spanElementDisenoSegunda.classList.add("text-white")
        } else if (spanElementDisenoSegunda.innerText == "S/D") {
           resultColor = spanElementDisenoSegunda.classList.add("bg-secondary")
           resultTextColor = spanElementDisenoSegunda.classList.add("text-white")
        } else if (spanElementDisenoSegunda.innerText == "Pendiente") {
           resultColor = spanElementDisenoSegunda.classList.add("bg-warning")
           resultTextColor = spanElementDisenoSegunda.classList.add("text-dark")
        } else if (spanElementDisenoSegunda.innerText == "N/A") {
            resultColor = spanElementDisenoSegunda.classList.add("bg-info")
            resultTextColor = spanElementDisenoSegunda.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadasDisenoSegunda (containerBtnAnteriorSiguienteDisenoSegunda) {
        containerBtnAnteriorSiguienteDisenoSegunda.classList.add("bg-secondary")
        containerBtnAnteriorSiguienteDisenoSegunda.classList.add("bg-gradient")
        containerBtnAnteriorSiguienteDisenoSegunda.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadasDisenoSegunda (containerBtnAnteriorSiguienteDisenoSegunda) {
        containerBtnAnteriorSiguienteDisenoSegunda.classList.remove("bg-secondary")
        containerBtnAnteriorSiguienteDisenoSegunda.classList.remove("bg-gradient")
        containerBtnAnteriorSiguienteDisenoSegunda.classList.remove("bg-opacity-25")
    }
    
    let spanElementDisenoSegunda
    if (resAv100Diseno) {
        spanElementDisenoSegunda = resAv100Diseno
    } else if (resRevisionCliente) {
        spanElementDisenoSegunda = resRevisionCliente
    } else if (resLdmProvisoria) {
        spanElementDisenoSegunda = resLdmProvisoria
    } else if (resAprobadoCliente) {
        spanElementDisenoSegunda = resAprobadoCliente
    }
    
    if (indiceAMostrar == 0) {
        colorSpanDisenoSegunda(spanElementDisenoSegunda)
        btnAnteriorDisenoSegunda.disabled = 'true'
        btnSiguienteDisenoSegunda.removeAttribute('disabled')
        agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteDisenoSegunda)
    } else if (indiceAMostrar == arrayFromValues.length-1) {
        colorSpanDisenoSegunda(spanElementDisenoSegunda)
        btnAnteriorDisenoSegunda.removeAttribute('disabled')
        btnSiguienteDisenoSegunda.disabled = true
        eliminarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteDisenoSegunda)
    } else {
        colorSpanDisenoSegunda(spanElementDisenoSegunda)
        btnAnteriorDisenoSegunda.removeAttribute('disabled')
        btnSiguienteDisenoSegunda.removeAttribute('disabled')
        agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteDisenoSegunda)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorDisenoSegunda(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)
    
    let resAv100Diseno = document.getElementById(`resAv100Diseno${kValue}`)
    let resRevisionCliente = document.getElementById(`resRevisionCliente${kValue}`)
    let resLdmProvisoria = document.getElementById(`resLdmProvisoria${kValue}`)
    let resAprobadoCliente = document.getElementById(`resAprobadoCliente${kValue}`)
    
    mostrarElementoDisenoSegunda(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resAv100Diseno,
        resRevisionCliente,
        resLdmProvisoria,
        resAprobadoCliente)
    }

// Función para mostrar el elemento siguiente
function mostrarSiguienteDisenoSegunda(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resAv100Diseno = document.getElementById(`resAv100Diseno${kValue}`)
    let resRevisionCliente = document.getElementById(`resRevisionCliente${kValue}`)
    let resLdmProvisoria = document.getElementById(`resLdmProvisoria${kValue}`)
    let resAprobadoCliente = document.getElementById(`resAprobadoCliente${kValue}`)
    

    mostrarElementoDisenoSegunda(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resAv100Diseno,
        resRevisionCliente,
        resLdmProvisoria,
        resAprobadoCliente)
}
//*********** End Evento btn anterior y siguiente ********* */


//************ ToolTip btn-Arrows anterior/Siguiente -----------
//******Av Diseño 100% + Revision Cliente + LdM Provisoria + Aprobado Cliente ***** */
let spanResDisenoSegunda = Array.from(document.querySelectorAll('span[name="resRevisionAv100Diseno"],span[name="resRevisionRevisionCliente"],span[name="resRevisionLdmProvisoria"],span[name="resRevisionAprobadoCliente"]'))

spanResDisenoSegunda.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionAv100Diseno':
                regex = /^resRevisionAv100Diseno/;
            break;
            case 'resRevisionRevisionCliente':
                regex = /^resRevisionRevisionCliente/;
            break;
            case 'resRevisionLdmProvisoria':
                regex = /^resRevisionLdmProvisoria/;
            break;
            case 'resRevisionAprobadoCliente':
                regex = /^resRevisionAprobadoCliente/;
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