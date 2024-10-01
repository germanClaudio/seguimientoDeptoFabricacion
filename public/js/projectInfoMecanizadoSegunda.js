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
                mostrarAnteriorMecanizadoSegunda(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarSiguienteMecanizadoSegunda(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarAnteriorMecanizadoSegunda(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarSiguienteMecanizadoSegunda(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarAnteriorMecanizadoSegunda(changeValueFromArray(arrayFromValues), kValue)
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
                mostrarSiguienteMecanizadoSegunda(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElementoMecanizadoSegunda(
    arrayFromValues,
    arrayFromEstadoValues,
    indiceAMostrar,
    kValue,
    resDatoFTres,
    resFCuatro,
    resNotasMecanizado)
    {
    // console.log('resFTres: ', resFTres, 'resAprobadoFTres: ', resAprobadoFTres)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resDatoFTres) {
        let spanFTres = document.getElementById(`resDatoFTres${kValue}`)
        let spanEstadoFTres = document.getElementById(`resEstadoFTres${kValue}`)
        let spanRevisionFTres = document.getElementById(`resRevisionFTres${kValue}`)
        spanFTres.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFTres.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFTres.innerText = parseInt(indiceAMostrar+1)

    } else if (resFCuatro) {
        let spanFCuatro = document.getElementById(`resFCuatro${kValue}`)
        let spanEstadoFCuatro = document.getElementById(`resEstadoFCuatro${kValue}`)
        let spanRevisionFCuatro = document.getElementById(`resRevisionFCuatro${kValue}`)
        spanFCuatro.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFCuatro.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFCuatro.innerText = parseInt(indiceAMostrar+1)

    } else if (resNotasMecanizado) {
        let spanNotasMecanizado = document.getElementById(`resNotasMecanizado${kValue}`)
        let spanRevisionNotasMecanizado = document.getElementById(`resRevisionNotasMecanizado${kValue}`)
        spanNotasMecanizado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionNotasMecanizado.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnteriorFTres = document.getElementById(`btnAnteriorFTres${kValue}`)
    let btnSiguienteFTres = document.getElementById(`btnSiguienteFTres${kValue}`)
    let containerBtnAnteriorSiguienteFTres = document.getElementById(`btnAnteriorSiguienteFTres${kValue}`)
    
    let btnAnteriorFCuatro = document.getElementById(`btnAnteriorFCuatro${kValue}`)
    let btnSiguienteFCuatro = document.getElementById(`btnSiguienteFCuatro${kValue}`)
    let containerBtnAnteriorSiguienteFCuatro = document.getElementById(`btnAnteriorSiguienteFCuatro${kValue}`)

    let btnAnteriorNotasMecanizado = document.getElementById(`btnAnteriorNotasMecanizado${kValue}`)
    let btnSiguienteNotasMecanizado = document.getElementById(`btnSiguienteNotasMecanizado${kValue}`)
    let containerBtnAnteriorSiguienteNotasMecanizado = document.getElementById(`btnAnteriorSiguienteNotasMecanizado${kValue}`)


    function colorSpanMecanizadoSegunda(spanElementMecanizadoSegunda) {
        const classMap = {
            "terminado": { bgClass: "bg-success", textClass: "text-white" },
            "enProceso": { bgClass: "bg-warning", textClass: "text-dark" },
            "suspendido": { bgClass: "bg-danger", textClass: "text-white" },
            "sinDato": { bgClass: "bg-secondary", textClass: "text-white" },
            "noAplica": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        spanElementMecanizadoSegunda.classList.remove(...defaultClasses);
    
        const text = spanElementMecanizadoSegunda.innerText;
        if (classMap[text]) {
            spanElementMecanizadoSegunda.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }
    

    function agregarEstiloRevPasadasMecanizadoSegunda (containerBtnAnteriorSiguienteMecanizadoSegunda) {
        containerBtnAnteriorSiguienteMecanizadoSegunda.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasMecanizadoSegunda (containerBtnAnteriorSiguienteMecanizadoSegunda) {
        containerBtnAnteriorSiguienteMecanizadoSegunda.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementFTres
    let spanElementFCuatro
    let spanElementNotasMecanizado
    
    resDatoFTres ? spanElementFTres = resDatoFTres : null
    resFCuatro ? spanElementFCuatro = resFCuatro : null
    resNotasMecanizado ? spanElementNotasMecanizado = resNotasMecanizado : null

    // console.log('spanElementFTres:', spanElementFTres)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpanMecanizadoSegunda(spanElementFTres)
        btnAnteriorFTres.disabled = true
        btnSiguienteFTres.removeAttribute('disabled')

        colorSpanMecanizadoSegunda(spanElementFCuatro)
        btnAnteriorFCuatro.disabled = true
        btnSiguienteFCuatro.removeAttribute('disabled')

        colorSpanMecanizadoSegunda(spanElementNotasMecanizado)
        btnAnteriorNotasMecanizado.disabled = true
        btnSiguienteNotasMecanizado.removeAttribute('disabled')

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpanMecanizadoSegunda(spanElementFTres)
        btnAnteriorFTres.removeAttribute('disabled')
        btnSiguienteFTres.disabled = true
        eliminarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFTres)

        colorSpanMecanizadoSegunda(spanElementFCuatro)
        btnAnteriorFCuatro.removeAttribute('disabled')
        btnSiguienteFCuatro.disabled = true
        eliminarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFCuatro)

        colorSpanMecanizadoSegunda(spanElementNotasMecanizado)
        btnAnteriorNotasMecanizado.removeAttribute('disabled')
        btnSiguienteNotasMecanizado.disabled = true
        eliminarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteNotasMecanizado)

    } else {
        colorSpanMecanizadoSegunda(spanElementFTres)
        btnAnteriorFTres.removeAttribute('disabled')
        btnSiguienteFTres.removeAttribute('disabled')
        agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFTres)

        colorSpanMecanizadoSegunda(spanElementFCuatro)
        btnAnteriorFCuatro.removeAttribute('disabled')
        btnSiguienteFCuatro.removeAttribute('disabled')
        agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteFCuatro)

        colorSpanMecanizadoSegunda(spanElementNotasMecanizado)
        btnAnteriorNotasMecanizado.removeAttribute('disabled')
        btnSiguienteNotasMecanizado.removeAttribute('disabled')
        agregarEstiloRevPasadasMecanizadoSegunda(containerBtnAnteriorSiguienteNotasMecanizado)
    }
}


// Función para mostrar el elemento anterior
function mostrarAnteriorMecanizadoSegunda(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resDatoFTres = document.getElementById(`resDatoFTres${kValue}`)
    let resFCuatro = document.getElementById(`resFCuatro${kValue}`)
    let resNotasMecanizado = document.getElementById(`resNotasMecanizado${kValue}`)

    mostrarElementoMecanizadoSegunda(
        arrayFromValues,
        arrayFromEstadoValues,
        indiceAMostrar,
        kValue,
        resDatoFTres,
        resFCuatro,
        resNotasMecanizado
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteMecanizadoSegunda(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resDatoFTres = document.getElementById(`resDatoFTres${kValue}`)
    let resFCuatro = document.getElementById(`resFCuatro${kValue}`)
    let resNotasMecanizado = document.getElementById(`resNotasMecanizado${kValue}`)    

    mostrarElementoMecanizadoSegunda(
        arrayFromValues,
        arrayFromEstadoValues,
        indiceAMostrar,
        kValue,
        resDatoFTres,
        resFCuatro,
        resNotasMecanizado
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
                
        for (let y=0; arrayFromSpotRevision.length > y; y++) {
            if (inputSpotIndex == y) {
                spanSpot.setAttribute("valueEstado", arrayFromSpotEstado[y])
                spanSpot.setAttribute("valueRevision", arrayFromSpotRevision[y])
                spanSpot.setAttribute("valueCreador", arrayFromSpotCreador[y])
                spanSpot.setAttribute("valueFecha", arrayFromSpotFecha[y])
                spanSpot.setAttribute("valueModificador", arrayFromSpotModificador[y])
                spanSpot.setAttribute("valueFechaMod", arrayFromSpotFechaModificacion[y])
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