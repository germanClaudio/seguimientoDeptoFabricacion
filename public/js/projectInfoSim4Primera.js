let arrBtnAnteriorMatEnsayo = [], arrBtnSiguienteMatEnsayo = [],
    arrBtnAnteriorMas10Menos = [], arrBtnSiguienteMas10Menos = [],
    arrBtnAnteriorMpAlternativo = [], arrBtnSiguienteMpAlternativo = [],
    arrBtnAnteriorReunionSim = [], arrBtnSiguienteReunionSim = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdMatEnsayo = `btnAnteriorSiguienteMatEnsayo${i}_${p}_${q}`;
            const btnIdMas10Menos = `btnAnteriorSiguienteMas10Menos${i}_${p}_${q}`;
            const btnIdMpAlternativo = `btnAnteriorSiguienteMpAlternativo${i}_${p}_${q}`;
            const btnIdReunionSim = `btnAnteriorSiguienteReunionSim${i}_${p}_${q}`;

            const btnElementMatEnsayo = document.getElementById(btnIdMatEnsayo);
            if (btnElementMatEnsayo) {
                arrBtnAnteriorMatEnsayo.push(i)
                arrBtnSiguienteMatEnsayo.push(i)
            }

            const btnElementMas10Menos = document.getElementById(btnIdMas10Menos);
            if (btnElementMas10Menos) {
                arrBtnAnteriorMas10Menos.push(i)
                arrBtnSiguienteMas10Menos.push(i)
            }

            const btnElementMpAlternativo = document.getElementById(btnIdMpAlternativo);
            if (btnElementMpAlternativo) {
                arrBtnAnteriorMpAlternativo.push(i)
                arrBtnSiguienteMpAlternativo.push(i)
            }

            const btnElementReunionSim = document.getElementById(btnIdReunionSim);
            if (btnElementReunionSim) {
                arrBtnAnteriorReunionSim.push(i)
                arrBtnSiguienteReunionSim.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorMatEnsayo !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorMatEnsayo"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteMatEnsayo !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteMatEnsayo"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorMas10Menos !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorMas10Menos"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteMas10Menos !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteMas10Menos"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorMpAlternativo !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorMpAlternativo"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteMpAlternativo !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteMpAlternativo"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorReunionSim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorReunionSim"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteReunionSim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteReunionSim"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente4PrimeraSim(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElemento4PrimeraSim(
    arrayFromValues,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resMatEnsayo,
    resMas10Menos,
    resMpAlternativo,
    resReunionSim
    ) {
    // console.log('res4PrimeraSim: ', res4PrimeraSim)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)

    let btnAnteriorMatEnsayo, btnSiguienteMatEnsayo, containerBtnAnteriorSiguienteMatEnsayo
    let btnAnteriorMas10Menos, btnSiguienteMas10Menos, containerBtnAnteriorSiguienteMas10Menos
    let btnAnteriorMpAlternativo, btnSiguienteMpAlternativo, containerBtnAnteriorSiguienteMpAlternativo
    let btnAnteriorReunionSim, btnSiguienteReunionSim, containerBtnAnteriorSiguienteReunionSim
    
    if (resMatEnsayo) {
        let spanMatEnsayo = document.getElementById(`resMatEnsayo${kValue}`)
        let spanRevisionMatEnsayo = document.getElementById(`resRevisionMatEnsayo${kValue}`)
        spanMatEnsayo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMatEnsayo.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorMatEnsayo = document.getElementById(`btnAnteriorMatEnsayo${kValue}`)
        btnSiguienteMatEnsayo = document.getElementById(`btnSiguienteMatEnsayo${kValue}`)
        containerBtnAnteriorSiguienteMatEnsayo = document.getElementById(`btnAnteriorSiguienteMatEnsayo${kValue}`)

    } else if (resMas10Menos) {
        let spanMas10Menos = document.getElementById(`resMas10Menos${kValue}`)
        let spanRevisionMas10Menos = document.getElementById(`resRevisionMas10Menos${kValue}`)
        spanMas10Menos.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMas10Menos.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorMas10Menos = document.getElementById(`btnAnteriorMas10Menos${kValue}`)
        btnSiguienteMas10Menos = document.getElementById(`btnSiguienteMas10Menos${kValue}`)
        containerBtnAnteriorSiguienteMas10Menos = document.getElementById(`btnAnteriorSiguienteMas10Menos${kValue}`)

    } else if (resMpAlternativo) {
        let spanMpAlternativo = document.getElementById(`resMpAlternativo${kValue}`)
        let spanRevisionMpAlternativo = document.getElementById(`resRevisionMpAlternativo${kValue}`)
        spanMpAlternativo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMpAlternativo.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorMpAlternativo = document.getElementById(`btnAnteriorMpAlternativo${kValue}`)
        btnSiguienteMpAlternativo = document.getElementById(`btnSiguienteMpAlternativo${kValue}`)
        containerBtnAnteriorSiguienteMpAlternativo = document.getElementById(`btnAnteriorSiguienteMpAlternativo${kValue}`)

    } else if (resReunionSim) {
        let spanReunionSim = document.getElementById(`resReunionSim${kValue}`)
        let spanRevisionReunionSim = document.getElementById(`resRevisionReunionSim${kValue}`)
        spanReunionSim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionReunionSim.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorReunionSim = document.getElementById(`btnAnteriorReunionSim${kValue}`)
        btnSiguienteReunionSim = document.getElementById(`btnSiguienteReunionSim${kValue}`)
        containerBtnAnteriorSiguienteReunionSim = document.getElementById(`btnAnteriorSiguienteReunionSim${kValue}`)
    }
    
    
    function colorSpan4PrimeraSim(spanElement4PrimeraSim) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElement4PrimeraSim) {
            spanElement4PrimeraSim.classList.remove(...defaultClasses);
        }
    
        const text = spanElement4PrimeraSim.innerText;
        if (classMap[text]) {
            spanElement4PrimeraSim.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadas4PrimeraSim (containerBtnAnteriorSiguiente4PrimeraSim) {
        containerBtnAnteriorSiguiente4PrimeraSim.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadas4PrimeraSim (containerBtnAnteriorSiguiente4PrimeraSim) {
        containerBtnAnteriorSiguiente4PrimeraSim.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementMatEnsayo, spanElementMas10Menos, spanElementMpAlternativo, spanElementresReunionSim
    resMatEnsayo ? spanElementMatEnsayo = resMatEnsayo : null
    resMas10Menos ? spanElementresMas10Menos = resMas10Menos : null
    resMpAlternativo ? spanElementMpAlternativo = resMpAlternativo : null
    resReunionSim ? spanElementresReunionSim = resReunionSim : null

    // console.log('spanElement4PrimeraSim:', spanElement4PrimeraSim)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        if (btnAnteriorMatEnsayo && btnSiguienteMatEnsayo) {
            colorSpan4PrimeraSim(spanElementMatEnsayo)
            btnAnteriorMatEnsayo.disabled = 'true'
            btnSiguienteMatEnsayo.removeAttribute('disabled')
            agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMatEnsayo)
        }

        if (btnAnteriorMas10Menos && btnSiguienteMas10Menos) {
            colorSpan4PrimeraSim(spanElementMas10Menos)
            btnAnteriorMas10Menos.disabled = 'true'
            btnSiguienteMas10Menos.removeAttribute('disabled')
            agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMas10Menos)
        }

        if (btnAnteriorMpAlternativo && btnSiguienteMpAlternativo) {
            colorSpan4PrimeraSim(spanElementMpAlternativo)
            btnAnteriorMpAlternativo.disabled = 'true'
            btnSiguienteMpAlternativo.removeAttribute('disabled')
            agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMpAlternativo)
        }

        if (btnAnteriorReunionSim && btnSiguienteReunionSim) {
            colorSpan4PrimeraSim(spanElementReunionSim)
            btnAnteriorReunionSim.disabled = 'true'
            btnSiguienteReunionSim.removeAttribute('disabled')
            agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteReunionSim)
        }

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        if (btnAnteriorMatEnsayo && btnSiguienteMatEnsayo) {
            colorSpan4PrimeraSim(spanElementMatEnsayo)
            btnAnteriorMatEnsayo.removeAttribute('disabled')
            btnSiguienteMatEnsayo.disabled = true
            eliminarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMatEnsayo)
        }

        if (btnAnteriorMas10Menos && btnSiguienteMas10Menos) {
            colorSpan4PrimeraSim(spanElementMas10Menos)
            btnAnteriorMas10Menos.removeAttribute('disabled')
            btnSiguienteMas10Menos.disabled = true
            eliminarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMas10Menos)
        }

        if (btnAnteriorMpAlternativo && btnSiguienteMpAlternativo) {
            colorSpan4PrimeraSim(spanElementMpAlternativo)
            btnAnteriorMpAlternativo.removeAttribute('disabled')
            btnSiguienteMpAlternativo.disabled = true
            eliminarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMpAlternativo)
        }

        if (btnAnteriorReunionSim && btnSiguienteReunionSim) {
            colorSpan4PrimeraSim(spanElementReunionSim)
            btnAnteriorReunionSim.removeAttribute('disabled')
            btnSiguienteReunionSim.disabled = true
            eliminarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteReunionSim)
        }

    } else {
        if (btnAnteriorMatEnsayo && btnSiguienteMatEnsayo) {
            colorSpan4PrimeraSim(spanElementMatEnsayo)
            btnAnteriorMatEnsayo.removeAttribute('disabled')
            btnSiguienteMatEnsayo.removeAttribute('disabled')
            agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMatEnsayo)
        }

        if (btnAnteriorMas10Menos && btnSiguienteMas10Menos) {
            colorSpan4PrimeraSim(spanElementMas10Menos)
            btnAnteriorMas10Menos.removeAttribute('disabled')
            btnSiguienteMas10Menos.removeAttribute('disabled')
            agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMas10Menos)
        }

        if (btnAnteriorMpAlternativo && btnSiguienteMpAlternativo) {
            colorSpan4PrimeraSim(spanElementMpAlternativo)
            btnAnteriorMpAlternativo.removeAttribute('disabled')
            btnSiguienteMpAlternativo.removeAttribute('disabled')
            agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteMpAlternativo)
        }

        if (btnAnteriorReunionSim && btnSiguienteReunionSim) {
            colorSpan4PrimeraSim(spanElementReunionSim)
            btnAnteriorReunionSim.removeAttribute('disabled')
            btnSiguienteReunionSim.removeAttribute('disabled')
            agregarEstiloRevPasadas4PrimeraSim(containerBtnAnteriorSiguienteReunionSim)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior4PrimeraSim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resMatEnsayo = document.getElementById(`resMatEnsayo${kValue}`)
    let resMas10Menos = document.getElementById(`resMas10Menos${kValue}`)
    let resMpAlternativo = document.getElementById(`resMpAlternativo${kValue}`)
    let resReunionSim = document.getElementById(`resReunionSim${kValue}`)

    mostrarElemento4PrimeraSim(
        arrayFromValues,
        indiceAMostrar,
        arrValuesRevisionMark,
        kValue,
        resMatEnsayo,
        resMas10Menos,
        resMpAlternativo,
        resReunionSim
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente4PrimeraSim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')

    let resMatEnsayo = document.getElementById(`resMatEnsayo${kValue}`)
    let resMas10Menos = document.getElementById(`resMas10Menos${kValue}`)
    let resMpAlternativo = document.getElementById(`resMpAlternativo${kValue}`)
    let resReunionSim = document.getElementById(`resReunionSim${kValue}`)

    mostrarElemento4PrimeraSim(
        arrayFromValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resMatEnsayo,
        resMas10Menos,
        resMpAlternativo,
        resReunionSim
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** MatEnsayo + Mas10Menos + MpAlternativo + ReunionSim + S1pOp20***** */
let spanRes4PrimeraSim = Array.from(document.querySelectorAll('span[name="resRevisionMatEnsayo"],span[name="resRevisionMas10Menos"],span[name="resRevisionMpAlternativo"],span[name="resRevisionReunionSim"]'))

spanRes4PrimeraSim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionMatEnsayo':
                var regex = /^resRevisionMatEnsayo/;
            break;
            case 'resRevisionMas10Menos':
                var regex = /^resRevisionMas10Menos/;
            break;
            case 'resRevisionMpAlternativo':
                var regex = /^resRevisionMpAlternativo/;
            break;
            case 'resRevisionReunionSim':
                var regex = /^resRevisionReunionSim/;
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