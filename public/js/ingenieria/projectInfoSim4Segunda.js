let arrBtnAnteriorInforme4Sim = [], arrBtnSiguienteInforme4Sim = [],
    arrBtnAnteriorGeo1Copiado = [], arrBtnSiguienteGeo1Copiado = [],
    arrBtnAnteriorGeo2Copiado = [], arrBtnSiguienteGeo2Copiado = [],
    arrBtnAnteriorHorasSim = [], arrBtnSiguienteHorasSim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdInforme4Sim = `btnAnteriorSiguienteInforme4Sim${i}_${p}_${q}`;
            const btnIdGeo1Copiado = `btnAnteriorSiguienteGeo1Copiado${i}_${p}_${q}`;
            const btnIdGeo2Copiado = `btnAnteriorSiguienteGeo2Copiado${i}_${p}_${q}`;
            const btnIdHorasSim = `btnAnteriorSiguienteHorasSim${i}_${p}_${q}`;
            
            const btnElementInforme4Sim = document.getElementById(btnIdInforme4Sim);
            if (btnElementInforme4Sim) {
                arrBtnAnteriorInforme4Sim.push(i)
                arrBtnSiguienteInforme4Sim.push(i)
            }

            const btnElementGeo1Copiado = document.getElementById(btnIdGeo1Copiado);
            if (btnElementGeo1Copiado) {
                arrBtnAnteriorGeo1Copiado.push(i)
                arrBtnSiguienteGeo1Copiado.push(i)
            }

            const btnElementGeo2Copiado = document.getElementById(btnIdGeo2Copiado);
            if (btnElementGeo2Copiado) {
                arrBtnAnteriorGeo2Copiado.push(i)
                arrBtnSiguienteGeo2Copiado.push(i)
            }

            const btnElementHorasSim = document.getElementById(btnIdHorasSim);
            if (btnElementHorasSim) {
                arrBtnAnteriorHorasSim.push(i)
                arrBtnSiguienteHorasSim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorInforme4Sim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorInforme4Sim"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior4SegundaSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteInforme4Sim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteInforme4Sim"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente4SegundaSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorGeo1Copiado !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorGeo1Copiado"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior4SegundaSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteGeo1Copiado !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteGeo1Copiado"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente4SegundaSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorGeo2Copiado !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorGeo2Copiado"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior4SegundaSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteGeo2Copiado !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteGeo2Copiado"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente4SegundaSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorHorasSim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorHorasSim"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior4SegundaSim(arrayFromValues, kValue)
            })
        }
    })
}

if(arrBtnSiguienteHorasSim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteHorasSim"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente4SegundaSim(arrayFromValues, kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento4SegundaSim(
    arrayFromValues,
    arrValuesRevisionMark,
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
    
    let btnAnteriorInforme4Sim, btnSiguienteInforme4Sim, containerBtnAnteriorSiguienteInforme4Sim
    let btnAnteriorGeo1Copiado, btnSiguienteGeo1Copiado, containerBtnAnteriorSiguienteGeo1Copiado
    let btnAnteriorGeo2Copiado, btnSiguienteGeo2Copiado, containerBtnAnteriorSiguienteGeo2Copiado
    let btnAnteriorHorasSim, btnSiguienteHorasSim, containerBtnAnteriorSiguienteHorasSim

    if (resInforme4Sim) {
        let spanInforme4Sim = document.getElementById(`resInforme4Sim${kValue}`)
        let spanRevisionInforme4Sim = document.getElementById(`resRevisionInforme4Sim${kValue}`)
        spanInforme4Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionInforme4Sim.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorInforme4Sim = document.getElementById(`btnAnteriorInforme4Sim${kValue}`)
        btnSiguienteInforme4Sim = document.getElementById(`btnSiguienteInforme4Sim${kValue}`)
        containerBtnAnteriorSiguienteInforme4Sim = document.getElementById(`btnAnteriorSiguienteInforme4Sim${kValue}`)

    } else if (resGeo1Copiado) {
        let spanGeo1Copiado = document.getElementById(`resGeo1Copiado${kValue}`)
        let spanRevisionGeo1Copiado = document.getElementById(`resRevisionGeo1Copiado${kValue}`)
        spanGeo1Copiado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionGeo1Copiado.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorGeo1Copiado = document.getElementById(`btnAnteriorGeo1Copiado${kValue}`)
        btnSiguienteGeo1Copiado = document.getElementById(`btnSiguienteGeo1Copiado${kValue}`)
        containerBtnAnteriorSiguienteGeo1Copiado = document.getElementById(`btnAnteriorSiguienteGeo1Copiado${kValue}`)

    } else if (resGeo2Copiado) {
        let spanGeo2Copiado = document.getElementById(`resGeo2Copiado${kValue}`)
        let spanRevisionGeo2Copiado = document.getElementById(`resRevisionGeo2Copiado${kValue}`)
        spanGeo2Copiado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionGeo2Copiado.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorGeo2Copiado = document.getElementById(`btnAnteriorGeo2Copiado${kValue}`)
        btnSiguienteGeo2Copiado = document.getElementById(`btnSiguienteGeo2Copiado${kValue}`)
        containerBtnAnteriorSiguienteGeo2Copiado = document.getElementById(`btnAnteriorSiguienteGeo2Copiado${kValue}`)

    } else if (resHorasSim) {
        let spanHorasSim = document.getElementById(`resHorasSim${kValue}`)
        let spanRevisionHorasSim = document.getElementById(`resRevisionHorasSim${kValue}`)
        spanHorasSim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionHorasSim.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorHorasSim = document.getElementById(`btnAnteriorHorasSim${kValue}`)
        btnSiguienteHorasSim = document.getElementById(`btnSiguienteHorasSim${kValue}`)
        containerBtnAnteriorSiguienteHorasSim = document.getElementById(`btnAnteriorSiguienteHorasSim${kValue}`)
    }

    
    function colorSpan4SegundaSim(spanElement4SegundaSim) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElement4SegundaSim) {
            spanElement4SegundaSim.classList.remove(...defaultClasses);
        }
    
        const text = spanElement4SegundaSim.innerText;
        if (classMap[text]) {
            spanElement4SegundaSim.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadas4SegundaSim(contBtnAntSig4SegundaSim) {
        contBtnAntSig4SegundaSim.classList.add("bg-secondary","bg-gradient","bg-opacity-25")
    }

    function eliminarEstiloRevPasadas4SegundaSim(contBtnAntSig4SegundaSim) {
        contBtnAntSig4SegundaSim.classList.remove("bg-secondary","bg-gradient","bg-opacity-25")
    }
    
    let spanElementInforme4Sim, spanElementGeo1Copiado, spanElementGeo2Copiado, spanElementHorasSim
    resInforme4Sim ? spanElementInforme4Sim = resInforme4Sim : null
    resGeo1Copiado ? spanElementGeo1Copiado = resGeo1Copiado : null
    resGeo2Copiado ? spanElementGeo2Copiado = resGeo2Copiado : null
    resHorasSim ? spanElementHorasSim = resHorasSim : null

    if (indiceAMostrar === 0) {
        if (btnAnteriorInforme4Sim && btnSiguienteInforme4Sim) {
            colorSpan4SegundaSim(spanElementInforme4Sim)
            btnAnteriorInforme4Sim.disabled = 'true'
            btnSiguienteInforme4Sim.removeAttribute('disabled')
            agregarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteInforme4Sim)
        }

        if (btnAnteriorGeo1Copiado && btnSiguienteGeo1Copiado) {
            colorSpan4SegundaSim(spanElementGeo1Copiado)
            btnAnteriorGeo1Copiado.disabled = 'true'
            btnSiguienteGeo1Copiado.removeAttribute('disabled')
            agregarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteGeo1Copiado)
        }

        if (btnAnteriorGeo2Copiado && btnSiguienteGeo2Copiado) {
            colorSpan4SegundaSim(spanElementGeo2Copiado)
            btnAnteriorGeo2Copiado.disabled = 'true'
            btnSiguienteGeo2Copiado.removeAttribute('disabled')
            agregarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteGeo2Copiado)
        }

        if (btnAnteriorHorasSim && btnSiguienteHorasSim) {
            colorSpan4SegundaSim(spanElementHorasSim)
            btnAnteriorHorasSim.disabled = 'true'
            btnSiguienteHorasSim.removeAttribute('disabled')
            agregarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteHorasSim)
        }

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        if (btnAnteriorInforme4Sim && btnSiguienteInforme4Sim) {
            colorSpan4SegundaSim(spanElementInforme4Sim)
            btnAnteriorInforme4Sim.removeAttribute('disabled')
            btnSiguienteInforme4Sim.disabled = true
            eliminarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteInforme4Sim)
        }

        if (btnAnteriorGeo1Copiado && btnSiguienteGeo1Copiado) {
            colorSpan4SegundaSim(spanElementGeo1Copiado)
            btnAnteriorGeo1Copiado.removeAttribute('disabled')
            btnSiguienteGeo1Copiado.disabled = true
            eliminarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteGeo1Copiado)
        }

        if (btnAnteriorGeo2Copiado && btnSiguienteGeo2Copiado) {
            colorSpan4SegundaSim(spanElementGeo2Copiado)
            btnAnteriorGeo2Copiado.removeAttribute('disabled')
            btnSiguienteGeo2Copiado.disabled = true
            eliminarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteGeo2Copiado)
        }

        if (btnAnteriorHorasSim && btnSiguienteHorasSim) {
            colorSpan4SegundaSim(spanElementHorasSim)
            btnAnteriorHorasSim.removeAttribute('disabled')
            btnSiguienteHorasSim.disabled = true
            eliminarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteHorasSim)
        }

    } else {
        if (btnAnteriorInforme4Sim && btnSiguienteInforme4Sim) {
            colorSpan4SegundaSim(spanElementInforme4Sim)
            btnAnteriorInforme4Sim.removeAttribute('disabled')
            btnSiguienteInforme4Sim.removeAttribute('disabled')
            agregarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteInforme4Sim)
        }

        if (btnAnteriorGeo1Copiado && btnSiguienteGeo1Copiado) {
            colorSpan4SegundaSim(spanElementGeo1Copiado)
            btnAnteriorGeo1Copiado.removeAttribute('disabled')
            btnSiguienteGeo1Copiado.removeAttribute('disabled')
            agregarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteGeo1Copiado)
        }

        if (btnAnteriorGeo2Copiado && btnSiguienteGeo2Copiado) {
            colorSpan4SegundaSim(spanElementGeo2Copiado)
            btnAnteriorGeo2Copiado.removeAttribute('disabled')
            btnSiguienteGeo2Copiado.removeAttribute('disabled')
            agregarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteGeo2Copiado)
        }

        if (btnAnteriorHorasSim && btnSiguienteHorasSim) {
            colorSpan4SegundaSim(spanElementHorasSim)
            btnAnteriorHorasSim.removeAttribute('disabled')
            btnSiguienteHorasSim.removeAttribute('disabled')
            agregarEstiloRevPasadas4SegundaSim(containerBtnAnteriorSiguienteHorasSim)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior4SegundaSim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resInforme4Sim = document.getElementById(`resInforme4Sim${kValue}`)
    let resGeo1Copiado = document.getElementById(`resGeo1Copiado${kValue}`)
    let resGeo2Copiado = document.getElementById(`resGeo2Copiado${kValue}`)
    let resHorasSim = document.getElementById(`resHorasSim${kValue}`)

    mostrarElemento4SegundaSim(
        arrayFromValues,
        arrValuesRevisionMark,
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

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resInforme4Sim = document.getElementById(`resInforme4Sim${kValue}`)
    let resGeo1Copiado = document.getElementById(`resGeo1Copiado${kValue}`)
    let resGeo2Copiado = document.getElementById(`resGeo2Copiado${kValue}`)
    let resHorasSim = document.getElementById(`resHorasSim${kValue}`)

    mostrarElemento4SegundaSim(
        arrayFromValues,
        arrValuesRevisionMark,
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