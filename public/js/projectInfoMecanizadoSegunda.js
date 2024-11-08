let arrBtnAnteriorFTres = [], arrBtnSiguienteFTres = [],
    arrBtnAnteriorFCuatro = [], arrBtnSiguienteFCuatro = [],
    arrBtnAnteriorNotasMecanizado = [], arrBtnSiguienteNotasMecanizado = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdFTres = `btnAnteriorSiguienteFTres${i}_${p}_${q}`;
            const btnIdFCuatro = `btnAnteriorSiguienteFCuatro${i}_${p}_${q}`;
            const btnIdNotasMecanizado = `btnAnteriorSiguienteNotasMecanizado${i}_${p}_${q}`;

            const btnElementFTres = document.getElementById(btnIdFTres);
            if ( btnElementFTres ) {
                arrBtnAnteriorFTres.push(i)
                arrBtnSiguienteFTres.push(i)
            }

            const btnElementIdFCuatro = document.getElementById(btnIdFCuatro);
            if ( btnElementIdFCuatro ) {
                arrBtnAnteriorFCuatro.push(i)
                arrBtnSiguienteFCuatro.push(i)
            }

            const btnElementIdNotasMecanizado = document.getElementById(btnIdNotasMecanizado);
            if ( btnElementIdNotasMecanizado ) {
                arrBtnAnteriorNotasMecanizado.push(i)
                arrBtnSiguienteNotasMecanizado.push(i)
            }
        }
    }
}

function changeIconEstadoFromArray(arrayFromEstadoValues) {
    // console.log('arrayFromEstadoValues(): ', arrayFromEstadoValues)
    const valueEstadoMap = {
        'enProceso': '<i class="fa-solid fa-arrows-spin fa-spin fa-lg" style="color: #b09b12;"></i>', // 'En Proceso',
        'terminado': '<i class="fa-solid fa-circle-check fa-lg" style="color: #008f30;"></i>', //'Terminado',
        'suspendido': '<i class="fa-solid fa-circle-xmark fa-lg" style="color: #c40000;"></i>', // 'Suspendido',
        'noAplica': '<i class="fa-solid fa-ban fa-lg"></i>', // 'N/A',
        'sinDato': '<i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #1c21ac;"></i>', //'S/D',
        'S/D': '<i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #1c21ac;"></i>',
        '': '<i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #1c21ac;"></i>'
    };
    return arrayFromEstadoValues.map(value => valueEstadoMap[value] || value);
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorFTres !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorFTres"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resDatoHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")

                let arrayEstadoActual = document.getElementById(`resEstadoHidden${kValue}`)
                let actualEstadoValue = arrayEstadoActual.value
                let arrayFromEstadoValues = actualEstadoValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorMecanizadoSegunda(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteFTres !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteFTres"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resDatoHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")

                let arrayEstadoActual = document.getElementById(`resEstadoHidden${kValue}`)
                let actualEstadoValue = arrayEstadoActual.value
                let arrayFromEstadoValues = actualEstadoValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguienteMecanizadoSegunda(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorFCuatro !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorFCuatro"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resDatoHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")

                let arrayEstadoActual = document.getElementById(`resEstadoHidden${kValue}`)
                let actualEstadoValue = arrayEstadoActual.value
                let arrayFromEstadoValues = actualEstadoValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarAnteriorMecanizadoSegunda(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteFCuatro !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteFCuatro"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resDatoHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")

                let arrayEstadoActual = document.getElementById(`resEstadoHidden${kValue}`)
                let actualEstadoValue = arrayEstadoActual.value
                let arrayFromEstadoValues = actualEstadoValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguienteMecanizadoSegunda(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorNotasMecanizado !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorNotasMecanizado"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resDatoHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarAnteriorMecanizadoSegunda(arrayFromValues, '', kValue)
            })
        }
    })
}

if(arrBtnSiguienteNotasMecanizado !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteNotasMecanizado"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resDatoHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguienteMecanizadoSegunda(arrayFromValues, '', kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElementoMecanizadoSegunda(
    arrayFromValues,
    arrayFromEstadoValues,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resDatoFTres,
    resDatoFCuatro,
    resDatoNotasMecanizado)
    {
    // console.log('resFTres: ', resFTres, 'resAprobadoFTres: ', resAprobadoFTres)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)

    let btnAnteriorFTres, btnSiguienteFTres, containerBtnAnteriorSiguienteFTres;
    let btnAnteriorFCuatro, btnSiguienteFCuatro, containerBtnAnteriorSiguienteFCuatro
    let btnAnteriorNotasMecanizado, btnSiguienteNotasMecanizado, containerBtnAnteriorSiguienteNotasMecanizado;
    
    if (resDatoFTres) {
        let spanFTres = document.getElementById(`resDatoFTres${kValue}`)
        let spanEstadoFTres = document.getElementById(`resEstadoFTres${kValue}`)
        let spanRevisionFTres = document.getElementById(`resRevisionFTres${kValue}`)
        spanFTres.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFTres.innerHTML = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFTres.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorFTres = document.getElementById(`btnAnteriorFTres${kValue}`)
        btnSiguienteFTres = document.getElementById(`btnSiguienteFTres${kValue}`)
        containerBtnAnteriorSiguienteFTres = document.getElementById(`btnAnteriorSiguienteFTres${kValue}`)

    } else if (resDatoFCuatro) {
        let spanFCuatro = document.getElementById(`resDatoFCuatro${kValue}`)
        let spanEstadoFCuatro = document.getElementById(`resEstadoFCuatro${kValue}`)
        let spanRevisionFCuatro = document.getElementById(`resRevisionFCuatro${kValue}`)
        spanFCuatro.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFCuatro.innerHTML = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFCuatro.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorFCuatro = document.getElementById(`btnAnteriorFCuatro${kValue}`)
        btnSiguienteFCuatro = document.getElementById(`btnSiguienteFCuatro${kValue}`)
        containerBtnAnteriorSiguienteFCuatro = document.getElementById(`btnAnteriorSiguienteFCuatro${kValue}`)

    } else if (resDatoNotasMecanizado) {
        let spanNotasMecanizado = document.getElementById(`resDatoNotasMecanizado${kValue}`)
        let spanRevisionNotasMecanizado = document.getElementById(`resRevisionNotasMecanizado${kValue}`)
        spanNotasMecanizado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionNotasMecanizado.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorNotasMecanizado = document.getElementById(`btnAnteriorNotasMecanizado${kValue}`)
        btnSiguienteNotasMecanizado = document.getElementById(`btnSiguienteNotasMecanizado${kValue}`)
        containerBtnAnteriorSiguienteNotasMecanizado = document.getElementById(`btnAnteriorSiguienteNotasMecanizado${kValue}`)
    }


    function colorSpanMecanizadoSegunda(spanElementMecanizadoSegunda) {
        const classMap = {
            "terminado": { bgClass: "bg-success" },
            "enProceso": { bgClass: "bg-warning" },
            "suspendido": { bgClass: "bg-danger" },
            "sinDato": { bgClass: "bg-secondary" },
            "": { bgClass: "bg-secondary" },
            "noAplica": { bgClass: "bg-info" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info"];
        if (spanElementMecanizadoSegunda) {
            spanElementMecanizadoSegunda.classList.remove(...defaultClasses)
            
            const text = spanElementMecanizadoSegunda.innerText;
            if (classMap[text]) {
                spanElementMecanizadoSegunda.classList.add(classMap[text].bgClass);
            } 
        }
    }
    

    function agregarEstiloRevPasadasMecanizadoSegunda (containerBtnAnteriorSiguienteMecanizadoSegunda) {
        containerBtnAnteriorSiguienteMecanizadoSegunda.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasMecanizadoSegunda (containerBtnAnteriorSiguienteMecanizadoSegunda) {
        containerBtnAnteriorSiguienteMecanizadoSegunda.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementFTres, spanElementFCuatro, spanElementNotasMecanizado    
    resDatoFTres ? spanElementFTres = resDatoFTres : null
    resDatoFCuatro ? spanElementFCuatro = resDatoFCuatro : null
    resDatoNotasMecanizado ? spanElementNotasMecanizado = resDatoNotasMecanizado : null

    // console.log('spanElementFTres:', spanElementFTres)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        if (btnAnteriorFTres && btnSiguienteFTres) {
            colorSpanMecanizadoSegunda(spanElementFTres)
            btnAnteriorFTres.disabled = true
            btnSiguienteFTres.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFTres)
        }

        if (btnAnteriorFCuatro && btnSiguienteFCuatro) {
            colorSpanMecanizadoSegunda(spanElementFCuatro)
            btnAnteriorFCuatro.disabled = true
            btnSiguienteFCuatro.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFCuatro)
        }

        if (btnAnteriorNotasMecanizado && btnSiguienteNotasMecanizado) {
            colorSpanMecanizadoSegunda(spanElementNotasMecanizado)
            btnAnteriorNotasMecanizado.disabled = true
            btnSiguienteNotasMecanizado.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteNotasMecanizado)
        }

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        if (btnAnteriorFTres && btnSiguienteFTres) {
            colorSpanMecanizadoSegunda(spanElementFTres)
            btnAnteriorFTres.removeAttribute('disabled')
            btnSiguienteFTres.disabled = true
            eliminarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFTres)
        }

        if (btnAnteriorFCuatro && btnSiguienteFCuatro) {
            colorSpanMecanizadoSegunda(spanElementFCuatro)
            btnAnteriorFCuatro.removeAttribute('disabled')
            btnSiguienteFCuatro.disabled = true
            eliminarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFCuatro)
        }

        if (btnAnteriorNotasMecanizado && btnSiguienteNotasMecanizado) {
            colorSpanMecanizadoSegunda(spanElementNotasMecanizado)
            btnAnteriorNotasMecanizado.removeAttribute('disabled')
            btnSiguienteNotasMecanizado.disabled = true
            eliminarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteNotasMecanizado)
        }

    } else {
        if (btnAnteriorFTres && btnSiguienteFTres) {
            colorSpanMecanizadoSegunda(spanElementFTres)
            btnAnteriorFTres.removeAttribute('disabled')
            btnSiguienteFTres.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFTres)
        }
        
        if (btnAnteriorFCuatro && btnSiguienteFCuatro) {
            colorSpanMecanizadoSegunda(spanElementFCuatro)
            btnAnteriorFCuatro.removeAttribute('disabled')
            btnSiguienteFCuatro.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFCuatro)
        }
        
        if (btnAnteriorNotasMecanizado && btnSiguienteNotasMecanizado) {
            colorSpanMecanizadoSegunda(spanElementNotasMecanizado)
            btnAnteriorNotasMecanizado.removeAttribute('disabled')
            btnSiguienteNotasMecanizado.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteNotasMecanizado)
        }
    }
}


// Función para mostrar el elemento anterior
function mostrarAnteriorMecanizadoSegunda(arrayFromValues, arrayFromEstadoValues, kValue) {
    //console.log('kValue: ', kValue)
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resDatoFTres = document.getElementById(`resDatoFTres${kValue}`)
    let resDatoFCuatro = document.getElementById(`resDatoFCuatro${kValue}`)
    let resDatoNotasMecanizado = document.getElementById(`resDatoNotasMecanizado${kValue}`)

    mostrarElementoMecanizadoSegunda(
        arrayFromValues,
        arrayFromEstadoValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resDatoFTres,
        resDatoFCuatro,
        resDatoNotasMecanizado
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteMecanizadoSegunda(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')

    let resDatoFTres = document.getElementById(`resDatoFTres${kValue}`)
    let resDatoFCuatro = document.getElementById(`resDatoFCuatro${kValue}`)
    let resDatoNotasMecanizado = document.getElementById(`resDatoNotasMecanizado${kValue}`)    

    mostrarElementoMecanizadoSegunda(
        arrayFromValues,
        arrayFromEstadoValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resDatoFTres,
        resDatoFCuatro,
        resDatoNotasMecanizado
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** FTres + FCuatro ***** */
let spanResMecanizadoSegunda = Array.from(document.querySelectorAll('span[name="resRevisionFTres"],span[name="resRevisionFCuatro"]'))

spanResMecanizadoSegunda.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionFTres':
                var regex = /^resRevisionFTres/;
            break;
            case 'resRevisionFCuatro':
                var regex = /^resRevisionFCuatro/;
            break;
            default:
            break;
        }
        // console.log('regex: ', regex)

        // Eliminar el texto inicial de la cadena
        var idFinalInputs = idSpotSelected.replace(regex, '');
        // console.log('idFinalInputs: ', idFinalInputs)

        let inputSpotIndex = document.getElementById(`resIndexHidden${idFinalInputs}`).value
        let inputSpotEstado = document.getElementById(`resEstadoHidden${idFinalInputs}`).value
        let inputSpotRevision = document.getElementById(`resRevisionHidden${idFinalInputs}`).value
        let inputSpotCreador = document.getElementById(`arrResCreadorHidden${idFinalInputs}`).value
        let inputSpotModificador = document.getElementById(`arrResModificadorHidden${idFinalInputs}`).value
        let inputSpotFecha = document.getElementById(`arrResFechaHidden${idFinalInputs}`).value
        let inputSpotFechaModificacion = document.getElementById(`arrResFechaModificacionHidden${idFinalInputs}`).value
        
        let arrayFromSpotRevision = inputSpotRevision.split(",")
        let arrayFromSpotEstado = inputSpotEstado.split(",")
        let arrayFromSpotCreador = inputSpotCreador.split(",")
        let arrayFromSpotModificador = inputSpotModificador.split(",")
        let arrayFromSpotFecha = inputSpotFecha.split(",")
        let arrayFromSpotFechaModificacion = inputSpotFechaModificacion.split(",")

        function changeIconEstadoFromSingle(value) {
            const valueEstadoMap = {
                'enProceso': '<i class="fa-solid fa-arrows-spin fa-lg" style="color: #b09b12;"></i>', // 'En Proceso',
                'terminado': '<i class="fa-solid fa-circle-check fa-lg" style="color: #008f30;"></i>', //'Terminado',
                'suspendido': '<i class="fa-solid fa-circle-xmark fa-lg" style="color: #c40000;"></i>', // 'Suspendido',
                'noAplica': '<i class="fa-solid fa-ban fa-lg"></i>', // 'N/A',
                'sinDato': '<i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #1c21ac;"></i>', //'S/D',
                'S/D': '<i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #1c21ac;"></i>',
                '': '<i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #1c21ac;"></i>'
            };
            return valueEstadoMap[value];
        }
                
        for (let y=0; arrayFromSpotRevision.length > y; y++) {
            if (inputSpotIndex == y) {
                spanSpot.setAttribute("valuerevision", arrayFromSpotRevision[y])
                spanSpot.setAttribute("valueestado", changeIconEstadoFromSingle(arrayFromSpotEstado[y]))
                spanSpot.setAttribute("valuecreador", arrayFromSpotCreador[y])
                spanSpot.setAttribute("valuefecha", arrayFromSpotFecha[y])
                spanSpot.setAttribute("valuemodificador", arrayFromSpotModificador[y])
                spanSpot.setAttribute("valuefechamod", arrayFromSpotFechaModificacion[y])
            }

            tippy(spanSpot, {
                content: `Revision: ${spanSpot.getAttribute("valueRevision")}<br>
                            Estado: ${spanSpot.getAttribute("valueEstado")}<br>
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

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** NotasMecanizado ***** */
let spanResMecanizadoSegundaNotas = Array.from(document.querySelectorAll('span[name="resRevisionNotasMecanizado"]'))

spanResMecanizadoSegundaNotas.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionNotasMecanizado':
                var regex = /^resRevisionNotasMecanizado/;
            break;
            default:
            break;
        }
        // console.log('regex: ', regex)

        // Eliminar el texto inicial de la cadena
        var idFinalInputs = idSpotSelected.replace(regex, '');
        // console.log('idFinalInputs: ', idFinalInputs)

        let inputSpotIndex = document.getElementById(`resIndexHidden${idFinalInputs}`).value
        let inputSpotNota = document.getElementById(`resDatoHidden${idFinalInputs}`).value
        let inputSpotRevision = document.getElementById(`resRevisionHidden${idFinalInputs}`).value
        let inputSpotCreador = document.getElementById(`arrResCreadorHidden${idFinalInputs}`).value
        let inputSpotModificador = document.getElementById(`arrResModificadorHidden${idFinalInputs}`).value
        let inputSpotFecha = document.getElementById(`arrResFechaHidden${idFinalInputs}`).value
        let inputSpotFechaModificacion = document.getElementById(`arrResFechaModificacionHidden${idFinalInputs}`).value
        
        let arrayFromSpotRevision = inputSpotRevision.split(",")
        let arrayFromSpotNota = inputSpotNota.split(",")
        let arrayFromSpotCreador = inputSpotCreador.split(",")
        let arrayFromSpotModificador = inputSpotModificador.split(",")
        let arrayFromSpotFecha = inputSpotFecha.split(",")
        let arrayFromSpotFechaModificacion = inputSpotFechaModificacion.split(",")
                
        for (let y=0; arrayFromSpotRevision.length > y; y++) {
            // console.log('inputSpotIndex: ', inputSpotIndex, ' - y: ', y)
            if (inputSpotIndex == y) {
                spanSpot.setAttribute("valuenota", arrayFromSpotNota[y])
                spanSpot.setAttribute("valuerevision", arrayFromSpotRevision[y])
                spanSpot.setAttribute("valuecreador", arrayFromSpotCreador[y])
                spanSpot.setAttribute("valuefecha", arrayFromSpotFecha[y])
                spanSpot.setAttribute("valuemodificador", arrayFromSpotModificador[y])
                spanSpot.setAttribute("valuefechamod", arrayFromSpotFechaModificacion[y])
            }

            tippy(spanSpot, {
                content: `Revision: ${spanSpot.getAttribute("valueRevision")}<br>
                            Nota: ${spanSpot.getAttribute("valuenota")}<br>
                            Creado por: ${spanSpot.getAttribute("valueCreador")}<br>
                            Fecha creac.: ${spanSpot.getAttribute("valueFecha")}<br>
                            Modificado por: ${spanSpot.getAttribute("valueModificador")}<br>
                            Fecha mod.: ${spanSpot.getAttribute("valueFechaMod")}`,
                allowHTML: true,
                maxWidth: 350,
                arrow: true,
                animation: 'scale-extreme',
                theme: 'material',
                interactive: true,
                hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
                appendTo: () => document.body,
                onUntrigger(instance, event) {
                    instance.setContent('...');
                },
            })
        }
    })
})
//************ End ToolTip btn-Arrows anterior/Siguiente -----------