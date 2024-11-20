let arrBtnAnteriorGrillado = [], arrBtnSiguienteGrillado = [],
    arrBtnAnteriorMpEnsayada = [], arrBtnSiguienteMpEnsayada = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdGrillado = `btnAnteriorSiguienteGrillado${i}_${p}_${q}`;
            const btnIdMpEnsayada = `btnAnteriorSiguienteMpEnsayada${i}_${p}_${q}`;
            
            const btnElementGrillado = document.getElementById(btnIdGrillado);
            if ( btnElementGrillado) {
                arrBtnAnteriorGrillado.push(i)
                arrBtnSiguienteGrillado.push(i)
            }

            const btnElementMpEnsayada = document.getElementById(btnIdMpEnsayada);
            if ( btnElementMpEnsayada) {
                arrBtnAnteriorMpEnsayada.push(i)
                arrBtnSiguienteMpEnsayada.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorGrillado !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorGrillado"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior5Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteGrillado !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteGrillado"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente5Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorMpEnsayada !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorMpEnsayada"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior5Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteMpEnsayada !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteMpEnsayada"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente5Sim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento5Sim(
    arrayFromValues,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resGrillado,
    resMpEnsayada
    ) {

        let btnAnteriorGrillado, btnSiguienteGrillado, containerBtnAnteriorSiguienteGrillado
        let btnAnteriorMpEnsayada, btnSiguienteMpEnsayada, containerBtnAnteriorSiguienteMpEnsayada
    
    if (resGrillado) {
        let spanGrillado = document.getElementById(`resGrillado${kValue}`)
        let spanRevisionGrillado = document.getElementById(`resRevisionGrillado${kValue}`)
        spanGrillado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionGrillado.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorGrillado = document.getElementById(`btnAnteriorGrillado${kValue}`)
        btnSiguienteGrillado = document.getElementById(`btnSiguienteGrillado${kValue}`)
        containerBtnAnteriorSiguienteGrillado = document.getElementById(`btnAnteriorSiguienteGrillado${kValue}`)

    } else if (resMpEnsayada) {
        let spanMpEnsayada = document.getElementById(`resMpEnsayada${kValue}`)
        let spanRevisionMpEnsayada = document.getElementById(`resRevisionMpEnsayada${kValue}`)
        spanMpEnsayada.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMpEnsayada.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorMpEnsayada = document.getElementById(`btnAnteriorMpEnsayada${kValue}`)
        btnSiguienteMpEnsayada = document.getElementById(`btnSiguienteMpEnsayada${kValue}`)
        containerBtnAnteriorSiguienteMpEnsayada = document.getElementById(`btnAnteriorSiguienteMpEnsayada${kValue}`)
    }
    
    
    function colorSpan5Sim(spanElement5Sim) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElement5Sim) {
            spanElement5Sim.classList.remove(...defaultClasses);
        }
    
        const text = spanElement5Sim.innerText;
        if (classMap[text]) {
            spanElement5Sim.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadas5Sim (containerBtnAnteriorSiguiente5Sim) {
        containerBtnAnteriorSiguiente5Sim.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadas5Sim (containerBtnAnteriorSiguiente5Sim) {
        containerBtnAnteriorSiguiente5Sim.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementGrillado, spanElementMpEnsayada
    resGrillado ? spanElementGrillado = resGrillado : null
    resMpEnsayada ? spanElementMpEnsayada = resMpEnsayada : null

    if (indiceAMostrar === 0) {
        if (btnAnteriorGrillado && btnSiguienteGrillado) {
            colorSpan5Sim(spanElementGrillado)
            btnAnteriorGrillado.disabled = 'true'
            btnSiguienteGrillado.removeAttribute('disabled')
            agregarEstiloRevPasadas5Sim (containerBtnAnteriorSiguienteGrillado)
        }

        if (btnAnteriorMpEnsayada && btnSiguienteMpEnsayada) {
            colorSpan5Sim(spanElementMpEnsayada)
            btnAnteriorMpEnsayada.disabled = 'true'
            btnSiguienteMpEnsayada.removeAttribute('disabled')
            agregarEstiloRevPasadas5Sim (containerBtnAnteriorSiguienteMpEnsayada)
        }

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        if (btnAnteriorGrillado && btnSiguienteGrillado) {
            colorSpan5Sim(spanElementGrillado)
            btnAnteriorGrillado.removeAttribute('disabled')
            btnSiguienteGrillado.disabled = true
            eliminarEstiloRevPasadas5Sim(containerBtnAnteriorSiguienteGrillado)
        }

        if (btnAnteriorMpEnsayada && btnSiguienteMpEnsayada) {
            colorSpan5Sim(spanElementMpEnsayada)
            btnAnteriorMpEnsayada.removeAttribute('disabled')
            btnSiguienteMpEnsayada.disabled = true
            eliminarEstiloRevPasadas5Sim(containerBtnAnteriorSiguienteMpEnsayada)
        }

    } else {
        if (btnAnteriorGrillado && btnSiguienteGrillado) {
            colorSpan5Sim(spanElementGrillado)
            btnAnteriorGrillado.removeAttribute('disabled')
            btnSiguienteGrillado.removeAttribute('disabled')
            agregarEstiloRevPasadas5Sim(containerBtnAnteriorSiguienteGrillado)
        }

        if (btnAnteriorMpEnsayada && btnSiguienteMpEnsayada) {
            colorSpan5Sim(spanElementMpEnsayada)
            btnAnteriorMpEnsayada.removeAttribute('disabled')
            btnSiguienteMpEnsayada.removeAttribute('disabled')
            agregarEstiloRevPasadas5Sim(containerBtnAnteriorSiguienteMpEnsayada)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior5Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resGrillado = document.getElementById(`resGrillado${kValue}`)
    let resMpEnsayada = document.getElementById(`resMpEnsayada${kValue}`)

    mostrarElemento5Sim(
        arrayFromValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resGrillado,
        resMpEnsayada
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente5Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resGrillado = document.getElementById(`resGrillado${kValue}`)
    let resMpEnsayada = document.getElementById(`resMpEnsayada${kValue}`)

    mostrarElemento5Sim(
        arrayFromValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resGrillado,
        resMpEnsayada
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** Grillado + MpEnsayada ***** */
let spanRes5Sim = Array.from(document.querySelectorAll('span[name="resRevisionGrillado"],span[name="resRevisionMpEnsayada"]'))

spanRes5Sim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionGrillado':
                var regex = /^resRevisionGrillado/;
            break;
            case 'resRevisionMpEnsayada':
                var regex = /^resRevisionMpEnsayada/;
            break;
            default:
            break;
        }

        // Eliminar el texto inicial de la cadena
        let idFinalInputs = idSpotSelected.replace(regex, '');

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