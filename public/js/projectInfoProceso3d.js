let arrBtnAnteriorProceso3d = [], arrBtnSiguienteProceso3d = [],
    arrBtnAnteriorHorasProceso3d = [], arrBtnSiguienteHorasProceso3d = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdProceso3d = `btnAnteriorSiguienteProceso3d${i}_${p}_${q}`;
            const btnIdHorasProceso3d = `btnAnteriorSiguienteHorasProceso3d${i}_${p}_${q}`;
            
            const btnElementProceso3d = document.getElementById(btnIdProceso3d);
            if (btnElementProceso3d) {
                arrBtnAnteriorProceso3d.push(i)
                arrBtnSiguienteProceso3d.push(i)
            }

            const btnElementHorasProceso3d = document.getElementById(btnIdHorasProceso3d);
            if (btnElementHorasProceso3d) {
                arrBtnAnteriorHorasProceso3d.push(i)
                arrBtnSiguienteHorasProceso3d.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorProceso3d !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorProceso3d"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior3d(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteProceso3d !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteProceso3d"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente3d(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorHorasProceso3d !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorHorasProceso3d"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior3d(arrayFromValues, kValue)
            })
        }
    })
}

if(arrBtnSiguienteHorasProceso3d !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteHorasProceso3d"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente3d(arrayFromValues, kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento3d(
    arrayFromValues,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resProceso3d,
    resHorasProceso3d) {
    // console.log('resProceso3d: ', resProceso3d, 'resHorasProceso3d: ', resHorasProceso3d)
    // console.log('kValue', kValue)

    let btnAnteriorProceso3d, btnSiguienteProceso3d, containerBtnAnteriorSiguienteProceso3d
    let btnAnteriorHorasProceso3d, btnSiguienteHorasProceso3d, containerBtnAnteriorSiguienteHorasProceso3d
    
    if (resProceso3d) {
        let spanProceso3d = document.getElementById(`resProceso3d${kValue}`)
        let spanRevisionProceso3d = document.getElementById(`resRevisionProceso3d${kValue}`)
        spanProceso3d.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionProceso3d.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorProceso3d = document.getElementById(`btnAnteriorProceso3d${kValue}`)
        btnSiguienteProceso3d = document.getElementById(`btnSiguienteProceso3d${kValue}`)
        containerBtnAnteriorSiguienteProceso3d = document.getElementById(`btnAnteriorSiguienteProceso3d${kValue}`)

    } else if (resHorasProceso3d) {
        let spanHorasProceso3d = document.getElementById(`resHorasProceso3d${kValue}`)
        let spanRevisionHorasProceso3d = document.getElementById(`resRevisionHorasProceso3d${kValue}`)
        spanHorasProceso3d.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionHorasProceso3d.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorHorasProceso3d = document.getElementById(`btnAnteriorHorasProceso3d${kValue}`)
        btnSiguienteHorasProceso3d = document.getElementById(`btnSiguienteHorasProceso3d${kValue}`)
        containerBtnAnteriorSiguienteHorasProceso3d = document.getElementById(`btnAnteriorSiguienteHorasProceso3d${kValue}`)
    }
    
    function colorSpan3d(spanElement3d) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElement3d) {
            spanElement3d.classList.remove(...defaultClasses);
        }
    
        const text = spanElement3d.innerText;
        if (classMap[text]) {
            spanElement3d.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadas3d (containerBtnAnteriorSiguiente3d) {
        containerBtnAnteriorSiguiente3d.classList.add("bg-secondary","bg-gradient","bg-opacity-25")
    }

    function eliminarEstiloRevPasadas3d (containerBtnAnteriorSiguiente3d) {
        containerBtnAnteriorSiguiente3d.classList.remove("bg-secondary","bg-gradient","bg-opacity-25")
    }
    
    let spanElementProceso3d, spanElementHorasProceso3d 
    resProceso3d ? spanElementProceso3d = resProceso3d : null
    resHorasProceso3d ? spanElementHorasProceso3d = resHorasProceso3d: null
    
    if (indiceAMostrar == 0) {
        if (btnAnteriorProceso3d && btnSiguienteProceso3d) {
            colorSpan3d(spanElementProceso3d)
            btnAnteriorProceso3d.disabled = 'true'
            btnSiguienteProceso3d.removeAttribute('disabled')
            agregarEstiloRevPasadas3d(containerBtnAnteriorSiguienteProceso3d)
        }

        if (btnAnteriorHorasProceso3d && btnSiguienteHorasProceso3d) {
            colorSpan3d(spanElementHorasProceso3d)
            btnAnteriorHorasProceso3d.disabled = 'true'
            btnSiguienteHorasProceso3d.removeAttribute('disabled')
            agregarEstiloRevPasadas3d(containerBtnAnteriorSiguienteHorasProceso3d)
        }

    } else if (indiceAMostrar == arrayFromValues.length-1) {
        if (btnAnteriorProceso3d && btnSiguienteProceso3d) {
            colorSpan3d(spanElementProceso3d)
            btnAnteriorProceso3d.removeAttribute('disabled')
            btnSiguienteProceso3d.disabled = true
            eliminarEstiloRevPasadas3d(containerBtnAnteriorSiguienteProceso3d)
        }

        if (btnAnteriorHorasProceso3d && btnSiguienteHorasProceso3d) {
            colorSpan3d(spanElementHorasProceso3d)
            btnAnteriorHorasProceso3d.removeAttribute('disabled')
            btnSiguienteHorasProceso3d.disabled = true
            eliminarEstiloRevPasadas3d(containerBtnAnteriorSiguienteHorasProceso3d)
        }

    } else {
        if (btnAnteriorProceso3d && btnSiguienteProceso3d) {
            colorSpan3d(spanElementProceso3d)
            btnAnteriorProceso3d.removeAttribute('disabled')
            btnSiguienteProceso3d.removeAttribute('disabled')
            agregarEstiloRevPasadas3d(containerBtnAnteriorSiguienteProceso3d)
        }

        if (btnAnteriorHorasProceso3d && btnSiguienteHorasProceso3d) {
            colorSpan3d(spanElementHorasProceso3d)
            btnAnteriorHorasProceso3d.removeAttribute('disabled')
            btnSiguienteHorasProceso3d.removeAttribute('disabled')
            agregarEstiloRevPasadas3d(containerBtnAnteriorSiguienteHorasProceso3d)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior3d(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resProceso3d = document.getElementById(`resProceso3d${kValue}`)
    let resHorasProceso3d = document.getElementById(`resHorasProceso3d${kValue}`)

    mostrarElemento3d(
        arrayFromValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resProceso3d,
        resHorasProceso3d
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente3d(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')

    let resProceso3d = document.getElementById(`resProceso3d${kValue}`)
    let resHorasProceso3d = document.getElementById(`resHorasProceso3d${kValue}`)

    mostrarElemento3d(
        arrayFromValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resProceso3d,
        resHorasProceso3d
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//******Proceso 3D + Horas Proceso3D ***** */
let spanResProceso3d = Array.from(document.querySelectorAll('span[name="resRevisionProceso3d"],span[name="resRevisionHorasProceso3d"]'))

spanResProceso3d.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionProceso3d':
                regex = /^resRevisionProceso3d/;
            break;
            case 'resRevisionHorasProceso3d':
                regex = /^resRevisionHorasProceso3d/;
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