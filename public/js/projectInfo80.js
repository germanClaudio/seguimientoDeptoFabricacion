let arrBtnAnteriorInfo80 = []
let arrBtnSiguienteInfo80 = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente

    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            if (document.getElementById(`btnAnteriorSiguiente80Info${i}_${p}_${q}`)) {
                arrBtnAnteriorInfo80.push(i)
                arrBtnSiguienteInfo80.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorInfo80 !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior80Info"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorInfo80(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo80
            })
        }
    })
}

if(arrBtnSiguienteInfo80 !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente80Info"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteInfo80(changeValueFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo80
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoInfo80(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resLdmAvanceCG,
    resLdmAvanceTD2,
    res80Ldm,
    resInfoModelo) {
    
    // console.log('kValue', kValue)

    if (resLdmAvanceCG) {
        let spanLdmAvanceCG = document.getElementById(`resLdmAvanceCG${kValue}`)
        let spanRevisionLdmAvanceCG = document.getElementById(`resRevisionLdmAvanceCG${kValue}`)
        spanLdmAvanceCG.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionLdmAvanceCG.innerText = parseInt(indiceAMostrar+1)
    } else if (resLdmAvanceTD2) {
        let spanLdmAvanceTD2 = document.getElementById(`resLdmAvanceTD2${kValue}`)
        let spanRevisionLdmAvanceTD2 = document.getElementById(`resRevisionLdmAvanceTD2${kValue}`)
        spanLdmAvanceTD2.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionLdmAvanceTD2.innerText = parseInt(indiceAMostrar+1)
    } else if (res80Ldm) {
        let spanLdm80 = document.getElementById(`res80Ldm${kValue}`)
        let spanRevisionLdm80 = document.getElementById(`resRevision80Ldm${kValue}`)
        spanLdm80.innerText = arrayFromValues[parseInt(indiceAMostrar)]+'%'
        spanRevisionLdm80.innerText = parseInt(indiceAMostrar+1)
    } else if (resInfoModelo) {
        let spanInfoModelo = document.getElementById(`resInfoModelo${kValue}`)
        let spanRevisionInfoModelo = document.getElementById(`resRevisionInfoModelo${kValue}`)
        spanInfoModelo.innerText = arrayFromValues[parseInt(indiceAMostrar)]+'%'
        spanRevisionInfoModelo.innerText = parseInt(indiceAMostrar+1)
    }
    

    let btnAnterior80Info = document.getElementById(`btnAnterior80Info${kValue}`)
    let btnSiguiente80Info = document.getElementById(`btnSiguiente80Info${kValue}`)
    let containerBtnAnteriorSiguienteInfo80 = document.getElementById(`btnAnteriorSiguiente80Info${kValue}`)
    
    function colorSpanInfo80(spanElementInfo80) {
        let resultColor
        let resultTextColor
        spanElementInfo80.classList.remove("bg-success")
        spanElementInfo80.classList.remove("bg-danger")
        spanElementInfo80.classList.remove("bg-warning")
        spanElementInfo80.classList.remove("bg-secondary")
        spanElementInfo80.classList.remove("bg-info")
        spanElementInfo80.classList.remove("text-white")
        spanElementInfo80.classList.remove("text-dark")

        if (spanElementInfo80.innerText == "OK") {
           resultColor = spanElementInfo80.classList.add("bg-success")
           resultTextColor = spanElementInfo80.classList.add("text-white")
        } else if (spanElementInfo80.innerText == "No OK") {
           resultColor = spanElementInfo80.classList.add("bg-danger")
           resultTextColor = spanElementInfo80.classList.add("text-white")
        } else if (spanElementInfo80.innerText == "S/D") {
           resultColor = spanElementInfo80.classList.add("bg-secondary")
           resultTextColor = spanElementInfo80.classList.add("text-white")
        } else if (spanElementInfo80.innerText == "Pendiente") {
           resultColor = spanElementInfo80.classList.add("bg-warning")
           resultTextColor = spanElementInfo80.classList.add("text-dark")
        } else if (spanElementInfo80.innerText == "N/A") {
            resultColor = spanElementInfo80.classList.add("bg-info")
            resultTextColor = spanElementInfo80.classList.add("text-dark")
         }
        return resultColor, resultTextColor
    }

    function agregarEstiloRevPasadasInfo80 (containerBtnAnteriorSiguienteInfo80) {
        containerBtnAnteriorSiguienteInfo80.classList.add("bg-secondary")
        containerBtnAnteriorSiguienteInfo80.classList.add("bg-gradient")
        containerBtnAnteriorSiguienteInfo80.classList.add("bg-opacity-25")
    }

    function eliminarEstiloRevPasadasInfo80 (containerBtnAnteriorSiguienteInfo80) {
        containerBtnAnteriorSiguienteInfo80.classList.remove("bg-secondary")
        containerBtnAnteriorSiguienteInfo80.classList.remove("bg-gradient")
        containerBtnAnteriorSiguienteInfo80.classList.remove("bg-opacity-25")
    }
    
    let spanElementInfo80
    if (resLdmAvanceCG) {
        spanElementInfo80 = resLdmAvanceCG
    } else if (resLdmAvanceTD2) {
        spanElementInfo80 = resLdmAvanceTD2
    } else if (res80Ldm) {
        spanElementInfo80 = res80Ldm
    } else if (resInfoModelo) {
        spanElementInfo80 = resInfoModelo
    }
    
    if (indiceAMostrar == 0) {
        colorSpanInfo80(spanElementInfo80)
        btnAnterior80Info.disabled = 'true'
        btnSiguiente80Info.removeAttribute('disabled')
        agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteInfo80)
    } else if (indiceAMostrar == arrayFromValues.length-1) {
        colorSpanInfo80(spanElementInfo80)
        btnAnterior80Info.removeAttribute('disabled')
        btnSiguiente80Info.disabled = true
        eliminarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteInfo80)
    } else {
        colorSpanInfo80(spanElementInfo80)
        btnAnterior80Info.removeAttribute('disabled')
        btnSiguiente80Info.removeAttribute('disabled')
        agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteInfo80)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorInfo80(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resLdmAvanceCG = document.getElementById(`resLdmAvanceCG${kValue}`)
    let resLdmAvanceTD2 = document.getElementById(`resLdmAvanceTD2${kValue}`)
    let res80Ldm = document.getElementById(`res80Ldm${kValue}`)
    let resInfoModelo = document.getElementById(`resInfoModelo${kValue}`)

    mostrarElementoInfo80(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resLdmAvanceCG,
        resLdmAvanceTD2,
        res80Ldm,
        resInfoModelo)
    }

// Función para mostrar el elemento siguiente
function mostrarSiguienteInfo80(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resLdmAvanceCG = document.getElementById(`resLdmAvanceCG${kValue}`)
    let resLdmAvanceTD2 = document.getElementById(`resLdmAvanceTD2${kValue}`)
    let res80Ldm = document.getElementById(`res80Ldm${kValue}`)
    let resInfoModelo = document.getElementById(`resInfoModelo${kValue}`)

    mostrarElementoInfo80(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resLdmAvanceCG,
        resLdmAvanceTD2,
        res80Ldm,
        resInfoModelo
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//******LdmAvanceCG + LdmAvanceTD2 + Ldm80 + InfoModelo ***** */
let spanResInfo80 = Array.from(document.querySelectorAll('span[name="resRevisionLdmAvanceCG"],span[name="resRevisionLdmAvanceTD2"],span[name="resRevision80Ldm"],span[name="resRevisionInfoModelo"]'))


spanResInfo80.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionLdmAvanceCG':
                regex = /^resRevisionLdmAvanceCG/;
            break;
            case 'resRevisionLdmAvanceTD2':
                regex = /^resRevisionLdmAvanceTD2/;
            break;
            case 'resRevision80Ldm':
                regex = /^resRevision80Ldm/;
            break;
            case 'resRevisionInfoModelo':
                regex = /^resRevisionInfoModelo/;
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