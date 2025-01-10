let arrBtnAnterior2Sim = [], arrBtnSiguiente2Sim = [],
    arrBtnAnteriorReporte = [], arrBtnSiguienteReporte = [],
    arrBtnAnteriorDfnProdismo = [], arrBtnSiguienteDfnProdismo = [],
    arrBtnAnterior3Sim = [], arrBtnSiguiente3Sim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnId2Sim = `btnAnteriorSiguiente2Sim${i}_${p}_${q}`;
            const btnIdReporte = `btnAnteriorSiguienteReporte${i}_${p}_${q}`;
            const btnIdDfnProdismo = `btnAnteriorSiguienteDfnProdismo${i}_${p}_${q}`;
            const btnId3Sim = `btnAnteriorSiguiente3Sim${i}_${p}_${q}`;

            const btnElement2Sim = document.getElementById(btnId2Sim);
            if (btnElement2Sim) {
                arrBtnAnterior2Sim.push(i)
                arrBtnSiguiente2Sim.push(i)
            }

            const btnElementReporte = document.getElementById(btnIdReporte);
            if (btnElementReporte) {
                arrBtnAnteriorReporte.push(i)
                arrBtnSiguienteReporte.push(i)
            }

            const btnElementDfnProdismo = document.getElementById(btnIdDfnProdismo);
            if (btnElementDfnProdismo) {
                arrBtnAnteriorDfnProdismo.push(i)
                arrBtnSiguienteDfnProdismo.push(i)
            }

            const btnElement3Sim = document.getElementById(btnId3Sim);
            if (btnElement3Sim) {
                arrBtnAnterior3Sim.push(i)
                arrBtnSiguiente3Sim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior2Sim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior2Sim"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente2Sim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente2Sim"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorReporte !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorReporte"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteReporte !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteReporte"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorDfnProdismo !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorDfnProdismo"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteDfnProdismo !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteDfnProdismo"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnterior3Sim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior3Sim"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente3Sim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente3Sim"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente2_3Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento2_3Sim(
    arrayFromValues,
    arrValuesRevisionMark,
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

    let btnAnterior2Sim, btnSiguiente2Sim, containerBtnAnteriorSiguiente2Sim
    let btnAnteriorReporte, btnSiguienteReporte, containerBtnAnteriorSiguienteReporte
    let btnAnteriorDfnProdismo, btnSiguienteDfnProdismo, containerBtnAnteriorSiguienteDfnProdismo
    let btnAnterior3Sim, btnSiguiente3Sim, containerBtnAnteriorSiguiente3Sim
    
    if (res2Sim) {
        let span2Sim = document.getElementById(`res2Sim${kValue}`)
        let spanRevision2Sim = document.getElementById(`resRevision2Sim${kValue}`)
        span2Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevision2Sim.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnterior2Sim = document.getElementById(`btnAnterior2Sim${kValue}`)
        btnSiguiente2Sim = document.getElementById(`btnSiguiente2Sim${kValue}`)
        containerBtnAnteriorSiguiente2Sim = document.getElementById(`btnAnteriorSiguiente2Sim${kValue}`)

    } else if (resReporte) {
        let spanReporte = document.getElementById(`resReporte${kValue}`)
        let spanRevisionReporte = document.getElementById(`resRevisionReporte${kValue}`)
        spanReporte.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionReporte.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorReporte = document.getElementById(`btnAnteriorReporte${kValue}`)
        btnSiguienteReporte = document.getElementById(`btnSiguienteReporte${kValue}`)
        containerBtnAnteriorSiguienteReporte = document.getElementById(`btnAnteriorSiguienteReporte${kValue}`)

    } else if (resDfnProdismo) {
        let spanDfnProdismo = document.getElementById(`resDfnProdismo${kValue}`)
        let spanRevisionDfnProdismo = document.getElementById(`resRevisionDfnProdismo${kValue}`)
        spanDfnProdismo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionDfnProdismo.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorDfnProdismo = document.getElementById(`btnAnteriorDfnProdismo${kValue}`)
        btnSiguienteDfnProdismo = document.getElementById(`btnSiguienteDfnProdismo${kValue}`)
        containerBtnAnteriorSiguienteDfnProdismo = document.getElementById(`btnAnteriorSiguienteDfnProdismo${kValue}`)

    } else if (res3Sim) {
        let span3Sim = document.getElementById(`res3Sim${kValue}`)
        let spanRevision3Sim = document.getElementById(`resRevision3Sim${kValue}`)
        span3Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevision3Sim.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnterior3Sim = document.getElementById(`btnAnterior3Sim${kValue}`)
        btnSiguiente3Sim = document.getElementById(`btnSiguiente3Sim${kValue}`)
        containerBtnAnteriorSiguiente3Sim = document.getElementById(`btnAnteriorSiguiente3Sim${kValue}`)
    }
    
    
    function colorSpan2_3Sim(spanElement2_3Sim) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElement2_3Sim) {
            spanElement2_3Sim.classList.remove(...defaultClasses);
        }
    
        const text = spanElement2_3Sim.innerText;
        if (classMap[text]) {
            spanElement2_3Sim.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadas2_3Sim (containerBtnAnteriorSiguiente2_3Sim) {
        containerBtnAnteriorSiguiente2_3Sim.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadas2_3Sim (containerBtnAnteriorSiguiente2_3Sim) {
        containerBtnAnteriorSiguiente2_3Sim.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElement2Sim, spanElementReporte, spanElementDfnProdismo, spanElement3Sim
    res2Sim ? spanElement2Sim = res2Sim : null
    resReporte ? spanElementReporte = resReporte : null
    resDfnProdismo ? spanElementDfnProdismo = resDfnProdismo : null
    res3Sim ? spanElement3Sim = res3Sim : null

    if (indiceAMostrar === 0) {
        if (btnAnterior2Sim && btnSiguiente2Sim) {
            colorSpan2_3Sim(spanElement2Sim)
            btnAnterior2Sim.disabled = 'true'
            btnSiguiente2Sim.removeAttribute('disabled')
            agregarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguiente2Sim)
        }

        if (btnAnteriorReporte && btnSiguienteReporte) {
            colorSpan2_3Sim(spanElementReporte)
            btnAnteriorReporte.disabled = 'true'
            btnSiguienteReporte.removeAttribute('disabled')
            agregarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguienteReporte)
        }

        if (btnAnteriorDfnProdismo && btnSiguienteDfnProdismo) {
            colorSpan2_3Sim(spanElementDfnProdismo)
            btnAnteriorDfnProdismo.disabled = 'true'
            btnSiguienteDfnProdismo.removeAttribute('disabled')
            agregarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguienteDfnProdismo)
        }

        if (btnAnterior3Sim && btnSiguiente3Sim) {
            colorSpan2_3Sim(spanElement3Sim)
            btnAnterior3Sim.disabled = 'true'
            btnSiguiente3Sim.removeAttribute('disabled')
        }

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        if (btnAnterior2Sim && btnSiguiente2Sim) {
            colorSpan2_3Sim(spanElement2Sim)
            btnAnterior2Sim.removeAttribute('disabled')
            btnSiguiente2Sim.disabled = true
            eliminarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguiente2Sim)
        }
        
        if (btnAnteriorReporte && btnSiguienteReporte) {
            colorSpan2_3Sim(spanElementReporte)
            btnAnteriorReporte.removeAttribute('disabled')
            btnSiguienteReporte.disabled = true
            eliminarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguienteReporte)
        }
        
        if (btnAnteriorDfnProdismo && btnSiguienteDfnProdismo) {
            colorSpan2_3Sim(spanElementDfnProdismo)
            btnAnteriorDfnProdismo.removeAttribute('disabled')
            btnSiguienteDfnProdismo.disabled = true
            eliminarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguienteDfnProdismo)
        }
        
        if (btnAnterior3Sim && btnSiguiente3Sim) {
            colorSpan2_3Sim(spanElement3Sim)
            btnAnterior3Sim.removeAttribute('disabled')
            btnSiguiente3Sim.disabled = true
            eliminarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguiente3Sim)
        }

    } else {
        if (btnAnterior2Sim && btnSiguiente2Sim) {
            colorSpan2_3Sim(spanElement2Sim)
            btnAnterior2Sim.removeAttribute('disabled')
            btnSiguiente2Sim.removeAttribute('disabled')
            agregarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguiente2Sim)
        }
                
        if (btnAnteriorReporte && btnSiguienteReporte) {
            colorSpan2_3Sim(spanElementReporte)
            btnAnteriorReporte.removeAttribute('disabled')
            btnSiguienteReporte.removeAttribute('disabled')
            agregarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguienteReporte)
        }
        
        if (btnAnteriorDfnProdismo && btnSiguienteDfnProdismo) {
            colorSpan2_3Sim(spanElementReporte)
            btnAnteriorReporte.removeAttribute('disabled')
            btnSiguienteReporte.removeAttribute('disabled')
            agregarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguienteReporte)
        }
        
        if (btnAnterior3Sim && btnSiguiente3Sim) {
            colorSpan2_3Sim(spanElement3Sim)
            btnAnterior3Sim.removeAttribute('disabled')
            btnSiguiente3Sim.removeAttribute('disabled')
            agregarEstiloRevPasadas2_3Sim(containerBtnAnteriorSiguiente3Sim)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior2_3Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues)-1
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark

    let res2Sim = document.getElementById(`res2Sim${kValue}`)
    let resReporte = document.getElementById(`resReporte${kValue}`)
    let resDfnProdismo = document.getElementById(`resDfnProdismo${kValue}`)
    let res3Sim = document.getElementById(`res3Sim${kValue}`)

    mostrarElemento2_3Sim(
        arrayFromValues,
        arrValuesRevisionMark,
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

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark

    let res2Sim = document.getElementById(`res2Sim${kValue}`)
    let resReporte = document.getElementById(`resReporte${kValue}`)
    let resDfnProdismo = document.getElementById(`resDfnProdismo${kValue}`)
    let res3Sim = document.getElementById(`res3Sim${kValue}`)

    mostrarElemento2_3Sim(
        arrayFromValues,
        arrValuesRevisionMark,
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