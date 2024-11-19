let arrBtnAnterior1Sim = [], arrBtnSiguiente1Sim = [],
    arrBtnAnteriorVideo = [], arrBtnSiguienteVideo = [],
    arrBtnAnteriorInforme = [], arrBtnSiguienteInforme = [],
    arrBtnAnteriorPpt = [], arrBtnSiguientePpt = [],
    arrBtnAnteriorS1p20Op = [], arrBtnSiguienteS1p20Op = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnId1Sim = `btnAnteriorSiguiente1Sim${i}_${p}_${q}`;
            const btnIdVideo = `btnAnteriorSiguienteVideo${i}_${p}_${q}`;
            const btnIdInforme = `btnAnteriorSiguienteInforme${i}_${p}_${q}`;
            const btnIdPpt = `btnAnteriorSiguientePpt${i}_${p}_${q}`;
            const btnIdS1p20Op = `btnAnteriorSiguienteS1p20Op${i}_${p}_${q}`;

            const btnElement1Sim = document.getElementById(btnId1Sim);
            if (btnElement1Sim) {
                arrBtnAnterior1Sim.push(i)
                arrBtnSiguiente1Sim.push(i)
            }

            const btnElementVideo = document.getElementById(btnIdVideo);
            if (btnElementVideo) {
                arrBtnAnteriorVideo.push(i)
                arrBtnSiguienteVideo.push(i)
            }

            const btnElementInforme = document.getElementById(btnIdInforme);
            if (btnElementInforme) {
                arrBtnAnteriorInforme.push(i)
                arrBtnSiguienteInforme.push(i)
            }

            const btnElementPpt = document.getElementById(btnIdPpt);
            if (btnElementPpt) {
                arrBtnAnteriorPpt.push(i)
                arrBtnSiguientePpt.push(i)
            }

            const btnElementS1p20Op = document.getElementById(btnIdS1p20Op);
            if (btnElementS1p20Op) {
                arrBtnAnteriorS1p20Op.push(i)
                arrBtnSiguienteS1p20Op.push(i)
            }
        }
    }
}

function changeValueFromArraySim1(arrayFromValues) {
    const valueMap = {
        '': 'S/D',
        'sinDato': 'S/D',
        'noAplica': 'N/A',
        'ok': 'OK',
        'noOk': 'No OK',
        'pendiente': 'Pendte.'
    };

    return arrayFromValues.map(value => valueMap[value] || value);
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnterior1Sim !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior1Sim"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente1Sim !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente1Sim"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorVideo !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorVideo"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteVideo !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteVideo"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorInforme !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorInforme"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteInforme !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteInforme"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorPpt !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorPpt"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguientePpt !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguientePpt"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorS1p20Op !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorS1p20Op"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarAnterior1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteS1p20Op !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteS1p20Op"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                mostrarSiguiente1Sim(changeValueFromArraySim1(arrayFromValues), kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElemento1Sim(
    arrayFromValues,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    res1Sim,
    resVideo,
    resInforme,
    resPpt,
    resS1p20Op
    ) {

    let btnAnterior1Sim, btnSiguiente1Sim, containerBtnAnteriorSiguiente1Sim
    let btnAnteriorVideo, btnSiguienteVideo, containerBtnAnteriorSiguienteVideo
    let btnAnteriorInforme, btnSiguienteInforme, containerBtnAnteriorSiguienteInforme
    let btnAnteriorPpt, btnSiguientePpt, containerBtnAnteriorSiguientePpt
    let btnAnteriorS1p20Op, btnSiguienteS1p20Op, containerBtnAnteriorSiguienteS1p20Op
    
    if (res1Sim) {
        let span1Sim = document.getElementById(`res1Sim${kValue}`)
        let spanRevision1Sim = document.getElementById(`resRevision1Sim${kValue}`)
        span1Sim.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevision1Sim.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnterior1Sim = document.getElementById(`btnAnterior1Sim${kValue}`)
        btnSiguiente1Sim = document.getElementById(`btnSiguiente1Sim${kValue}`)
        containerBtnAnteriorSiguiente1Sim = document.getElementById(`btnAnteriorSiguiente1Sim${kValue}`)

    } else if (resVideo) {
        let spanVideo = document.getElementById(`resVideo${kValue}`)
        let spanRevisionVideo = document.getElementById(`resRevisionVideo${kValue}`)
        spanVideo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionVideo.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorVideo = document.getElementById(`btnAnteriorVideo${kValue}`)
        btnSiguienteVideo = document.getElementById(`btnSiguienteVideo${kValue}`)
        containerBtnAnteriorSiguienteVideo = document.getElementById(`btnAnteriorSiguienteVideo${kValue}`)

    } else if (resInforme) {
        let spanInforme = document.getElementById(`resInforme${kValue}`)
        let spanRevisionInforme = document.getElementById(`resRevisionInforme${kValue}`)
        spanInforme.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionInforme.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorInforme = document.getElementById(`btnAnteriorInforme${kValue}`)
        btnSiguienteInforme = document.getElementById(`btnSiguienteInforme${kValue}`)
        containerBtnAnteriorSiguienteInforme = document.getElementById(`btnAnteriorSiguienteInforme${kValue}`)

    } else if (resPpt) {
        let spanPpt = document.getElementById(`resPpt${kValue}`)
        let spanRevisionPpt = document.getElementById(`resRevisionPpt${kValue}`)
        spanPpt.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionPpt.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorPpt = document.getElementById(`btnAnteriorPpt${kValue}`)
        btnSiguientePpt = document.getElementById(`btnSiguientePpt${kValue}`)
        containerBtnAnteriorSiguientePpt = document.getElementById(`btnAnteriorSiguientePpt${kValue}`)

    } else if (resS1p20Op) {
        let spanS1p20Op = document.getElementById(`resS1p20Op${kValue}`)
        let spanRevisionS1p20Op = document.getElementById(`resRevisionS1p20Op${kValue}`)
        spanS1p20Op.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionS1p20Op.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorS1p20Op = document.getElementById(`btnAnteriorS1p20Op${kValue}`)
        btnSiguienteS1p20Op = document.getElementById(`btnSiguienteS1p20Op${kValue}`)
        containerBtnAnteriorSiguienteS1p20Op = document.getElementById(`btnAnteriorSiguienteS1p20Op${kValue}`)
    }
    
    
    function colorSpan1Sim(spanElement1Sim) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendte.": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElement1Sim) {
            spanElement1Sim.classList.remove(...defaultClasses);
        }
    
        const text = spanElement1Sim.innerText;
        if (classMap[text]) {
            spanElement1Sim.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadas1Sim (containerBtnAnteriorSiguiente1Sim) {
        containerBtnAnteriorSiguiente1Sim.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadas1Sim (containerBtnAnteriorSiguiente1Sim) {
        containerBtnAnteriorSiguiente1Sim.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElement1Sim, spanElementVideo, spanElementInforme, spanElementPpt, spanElementS1p20Op
    res1Sim ? spanElement1Sim = res1Sim : null
    resVideo ? spanElementVideo = resVideo : null
    resInforme ? spanElementInforme = resInforme : null
    resPpt ? spanElementPpt = resPpt : null
    resS1p20Op ? spanElementS1p20Op = resS1p20Op : null

    // console.log('spanElement1Sim:', spanElement1Sim)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        if (btnAnterior1Sim && btnSiguiente1Sim) {
            colorSpan1Sim(spanElement1Sim)
            btnAnterior1Sim.disabled = 'true'
            btnSiguiente1Sim.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguiente1Sim)
        }

        if (btnAnteriorVideo && btnSiguienteVideo) {
            colorSpan1Sim(spanElementVideo)
            btnAnteriorVideo.disabled = 'true'
            btnSiguienteVideo.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteVideo)
        }

        if (btnAnteriorInforme && btnSiguienteInforme) {
            colorSpan1Sim(spanElementInforme)
            btnAnteriorInforme.disabled = 'true'
            btnSiguienteInforme.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteInforme)
        }

        if (btnAnteriorPpt && btnSiguientePpt) {
            colorSpan1Sim(spanElementPpt)
            btnAnteriorPpt.disabled = 'true'
            btnSiguientePpt.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguientePpt)
        }

        if (btnAnteriorS1p20Op && btnSiguienteS1p20Op) {
            colorSpan1Sim(spanElementS1p20Op)
            btnAnteriorS1p20Op.disabled = 'true'
            btnSiguienteS1p20Op.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteS1p20Op)
        }


    } else if (indiceAMostrar === arrayFromValues.length-1) {
        if (btnAnterior1Sim && btnSiguiente1Sim) {
            colorSpan1Sim(spanElement1Sim)
            btnAnterior1Sim.removeAttribute('disabled')
            btnSiguiente1Sim.disabled = true
            eliminarEstiloRevPasadas1Sim(containerBtnAnteriorSiguiente1Sim)
        }

        if (btnAnteriorVideo && btnSiguienteVideo) {
            colorSpan1Sim(spanElementVideo)
            btnAnteriorVideo.removeAttribute('disabled')
            btnSiguienteVideo.disabled = true
            eliminarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteVideo)
        }

        if (btnAnteriorInforme && btnSiguienteInforme) {
            colorSpan1Sim(spanElementInforme)
            btnAnteriorInforme.removeAttribute('disabled')
            btnSiguienteInforme.disabled = true
            eliminarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteInforme)
        }

        if (btnAnteriorPpt && btnSiguientePpt) {
            colorSpan1Sim(spanElementPpt)
            btnAnteriorPpt.removeAttribute('disabled')
            btnSiguientePpt.disabled = true
            eliminarEstiloRevPasadas1Sim(containerBtnAnteriorSiguientePpt)
        }

        if (btnAnteriorS1p20Op && btnSiguienteS1p20Op) {
            colorSpan1Sim(spanElementS1p20Op)
            btnAnteriorS1p20Op.removeAttribute('disabled')
            btnSiguienteS1p20Op.disabled = true
            eliminarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteS1p20Op)
        }

    } else {
        if (btnAnterior1Sim && btnSiguiente1Sim) {
            colorSpan1Sim(spanElement1Sim)
            btnAnterior1Sim.removeAttribute('disabled')
            btnSiguiente1Sim.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguiente1Sim)
        }

        if (btnAnteriorVideo && btnSiguienteVideo) {
            colorSpan1Sim(spanElementVideo)
            btnAnteriorVideo.removeAttribute('disabled')
            btnSiguienteVideo.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteVideo)
        }

        if (btnAnteriorInforme && btnSiguienteInforme) {
            colorSpan1Sim(spanElementInforme)
            btnAnteriorInforme.removeAttribute('disabled')
            btnSiguienteInforme.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteInforme)
        }

        if (btnAnteriorPpt && btnSiguientePpt) {
            colorSpan1Sim(spanElementPpt)
            btnAnteriorPpt.removeAttribute('disabled')
            btnSiguientePpt.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguientePpt)
        }

        if (btnAnteriorS1p20Op && btnSiguienteS1p20Op) {
            colorSpan1Sim(spanElementS1p20Op)
            btnAnteriorS1p20Op.removeAttribute('disabled')
            btnSiguienteS1p20Op.removeAttribute('disabled')
            agregarEstiloRevPasadas1Sim(containerBtnAnteriorSiguienteS1p20Op)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnterior1Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)

    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let res1Sim = document.getElementById(`res1Sim${kValue}`)
    let resVideo = document.getElementById(`resVideo${kValue}`)
    let resInforme = document.getElementById(`resInforme${kValue}`)
    let resPpt = document.getElementById(`resPpt${kValue}`)
    let resS1p20Op = document.getElementById(`resS1p20Op${kValue}`)

    mostrarElemento1Sim(
        arrayFromValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        res1Sim,
        resVideo,
        resInforme,
        resPpt,
        resS1p20Op
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguiente1Sim(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let res1Sim = document.getElementById(`res1Sim${kValue}`)
    let resVideo = document.getElementById(`resVideo${kValue}`)
    let resInforme = document.getElementById(`resInforme${kValue}`)
    let resPpt = document.getElementById(`resPpt${kValue}`)
    let resS1p20Op = document.getElementById(`resS1p20Op${kValue}`)

    mostrarElemento1Sim(
        arrayFromValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        res1Sim,
        resVideo,
        resInforme,
        resPpt,
        resS1p20Op
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** 1Sim + Video + Informe + ppt + S1pOp20***** */
let spanRes1Sim = Array.from(document.querySelectorAll('span[name="resRevision1Sim"],span[name="resRevisionVideo"],span[name="resRevisionInforme"],span[name="resRevisionPpt"],span[name="resRevisionS1p20Op"]'))

spanRes1Sim.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevision1Sim':
                var regex = /^resRevision1Sim/;
            break;
            case 'resRevisionVideo':
                var regex = /^resRevisionVideo/;
            break;
            case 'resRevisionInforme':
                var regex = /^resRevisionInforme/;
            break;
            case 'resRevisionPpt':
                var regex = /^resRevisionPpt/;
            break;
            case 'resRevisionS1p20Op':
                var regex = /^resRevisionS1p20Op/;
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