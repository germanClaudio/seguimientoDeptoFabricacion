let arrBtnAnteriorPrograma3d2F = [], arrBtnSiguientePrograma3d2F = [],
    arrBtnAnteriorPrograma3d4F = [], arrBtnSiguientePrograma3d4F = [],
    arrBtnAnteriorNotasProgramacion = [], arrBtnSiguienteNotasProgramacion = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdPrograma3d2F = `btnAnteriorSiguientePrograma3d2F${i}_${p}_${q}`;
            const btnIdPrograma3d4F = `btnAnteriorSiguientePrograma3d4F${i}_${p}_${q}`;
            const btnIdNotasProgramacion = `btnAnteriorSiguienteNotasProgramacion${i}_${p}_${q}`;

            const btnElementPrograma3d2F = document.getElementById(btnIdPrograma3d2F);
            if ( btnElementPrograma3d2F ) {
                arrBtnAnteriorPrograma3d2F.push(i)
                arrBtnSiguientePrograma3d2F.push(i)
            }

            const btnElementIdPrograma3d4F = document.getElementById(btnIdPrograma3d4F);
            if ( btnElementIdPrograma3d4F ) {
                arrBtnAnteriorPrograma3d4F.push(i)
                arrBtnSiguientePrograma3d4F.push(i)
            }

            const btnElementIdNotasProgramacion = document.getElementById(btnIdNotasProgramacion);
            if ( btnElementIdNotasProgramacion ) {
                arrBtnAnteriorNotasProgramacion.push(i)
                arrBtnSiguienteNotasProgramacion.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorPrograma3d2F !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorPrograma3d2F"]')
    
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
                mostrarAnteriorProgramacionSegunda(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguientePrograma3d2F !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguientePrograma3d2F"]')
    
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
                mostrarSiguienteProgramacionSegunda(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorPrograma3d4F !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorPrograma3d4F"]')
    
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
                mostrarAnteriorProgramacionSegunda(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguientePrograma3d4F !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguientePrograma3d4F"]')
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
                mostrarSiguienteProgramacionSegunda(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorNotasProgramacion !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorNotasProgramacion"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resDatoHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")

                // console.log('kValue. ', kValue)
                mostrarAnteriorProgramacionSegunda(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteNotasProgramacion !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteNotasProgramacion"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resDatoHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")

                // console.log('kValue. ', kValue)
                mostrarSiguienteProgramacionSegunda(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElementoProgramacionSegunda(
    arrayFromValues,
    arrayFromEstadoValues,
    indiceAMostrar,
    kValue,
    resDatoPrograma3d2F,
    resPrograma3d4F,
    resNotasProgramacion)
    {
    // console.log('resPrograma3d2F: ', resPrograma3d2F, 'resAprobadoPrograma3d2F: ', resAprobadoPrograma3d2F)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resDatoPrograma3d2F) {
        let spanPrograma3d2F = document.getElementById(`resDatoPrograma3d2F${kValue}`)
        let spanEstadoPrograma3d2F = document.getElementById(`resEstadoPrograma3d2F${kValue}`)
        let spanRevisionPrograma3d2F = document.getElementById(`resRevisionPrograma3d2F${kValue}`)
        spanPrograma3d2F.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoPrograma3d2F.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionPrograma3d2F.innerText = parseInt(indiceAMostrar+1)

    } else if (resPrograma3d4F) {
        let spanPrograma3d4F = document.getElementById(`resPrograma3d4F${kValue}`)
        let spanEstadoPrograma3d4F = document.getElementById(`resEstadoPrograma3d4F${kValue}`)
        let spanRevisionPrograma3d4F = document.getElementById(`resRevisionPrograma3d4F${kValue}`)
        spanPrograma3d4F.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoPrograma3d4F.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionPrograma3d4F.innerText = parseInt(indiceAMostrar+1)

    } else if (resNotasProgramacion) {
        let spanNotasProgramacion = document.getElementById(`resNotasProgramacion${kValue}`)
        let spanRevisionNotasProgramacion = document.getElementById(`resRevisionNotasProgramacion${kValue}`)
        spanNotasProgramacion.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionNotasProgramacion.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnteriorPrograma3d2F = document.getElementById(`btnAnteriorPrograma3d2F${kValue}`)
    let btnSiguientePrograma3d2F = document.getElementById(`btnSiguientePrograma3d2F${kValue}`)
    let containerBtnAnteriorSiguientePrograma3d2F = document.getElementById(`btnAnteriorSiguientePrograma3d2F${kValue}`)
    
    let btnAnteriorPrograma3d4F = document.getElementById(`btnAnteriorPrograma3d4F${kValue}`)
    let btnSiguientePrograma3d4F = document.getElementById(`btnSiguientePrograma3d4F${kValue}`)
    let containerBtnAnteriorSiguientePrograma3d4F = document.getElementById(`btnAnteriorSiguientePrograma3d4F${kValue}`)

    let btnAnteriorNotasProgramacion = document.getElementById(`btnAnteriorNotasProgramacion${kValue}`)
    let btnSiguienteNotasProgramacion = document.getElementById(`btnSiguienteNotasProgramacion${kValue}`)
    let containerBtnAnteriorSiguienteNotasProgramacion = document.getElementById(`btnAnteriorSiguienteNotasProgramacion${kValue}`)


    function colorSpanProgramacionSegunda(spanElementProgramacionSegunda) {
        const classMap = {
            "terminado": { bgClass: "bg-success", textClass: "text-white" },
            "enProceso": { bgClass: "bg-warning", textClass: "text-dark" },
            "suspendido": { bgClass: "bg-danger", textClass: "text-white" },
            "sinDato": { bgClass: "bg-secondary", textClass: "text-white" },
            "noAplica": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        spanElementProgramacionSegunda.classList.remove(...defaultClasses);
    
        const text = spanElementProgramacionSegunda.innerText;
        if (classMap[text]) {
            spanElementProgramacionSegunda.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }
    

    function agregarEstiloRevPasadasProgramacionSegunda (containerBtnAnteriorSiguienteProgramacionSegunda) {
        containerBtnAnteriorSiguienteProgramacionSegunda.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasProgramacionSegunda (containerBtnAnteriorSiguienteProgramacionSegunda) {
        containerBtnAnteriorSiguienteProgramacionSegunda.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementPrograma3d2F
    let spanElementPrograma3d4F
    let spanElementNotasProgramacion
    
    resDatoPrograma3d2F ? spanElementPrograma3d2F = resDatoPrograma3d2F : null
    resPrograma3d4F ? spanElementPrograma3d4F = resPrograma3d4F : null
    resNotasProgramacion ? spanElementNotasProgramacion = resNotasProgramacion : null

    // console.log('spanElementPrograma3d2F:', spanElementPrograma3d2F)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpanProgramacionSegunda(spanElementPrograma3d2F)
        btnAnteriorPrograma3d2F.disabled = true
        btnSiguientePrograma3d2F.removeAttribute('disabled')

        colorSpanProgramacionSegunda(spanElementPrograma3d4F)
        btnAnteriorPrograma3d4F.disabled = true
        btnSiguientePrograma3d4F.removeAttribute('disabled')

        colorSpanProgramacionSegunda(spanElementNotasProgramacion)
        btnAnteriorNotasProgramacion.disabled = true
        btnSiguienteNotasProgramacion.removeAttribute('disabled')

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpanProgramacionSegunda(spanElementPrograma3d2F)
        btnAnteriorPrograma3d2F.removeAttribute('disabled')
        btnSiguientePrograma3d2F.disabled = true
        eliminarEstiloRevPasadasProgramacionSegunda(containerBtnAnteriorSiguientePrograma3d2F)

        colorSpanProgramacionSegunda(spanElementPrograma3d4F)
        btnAnteriorPrograma3d4F.removeAttribute('disabled')
        btnSiguientePrograma3d4F.disabled = true
        eliminarEstiloRevPasadasProgramacionSegunda(containerBtnAnteriorSiguientePrograma3d4F)

        colorSpanProgramacionSegunda(spanElementNotasProgramacion)
        btnAnteriorNotasProgramacion.removeAttribute('disabled')
        btnSiguienteNotasProgramacion.disabled = true
        eliminarEstiloRevPasadasProgramacionSegunda(containerBtnAnteriorSiguienteNotasProgramacion)

    } else {
        colorSpanProgramacionSegunda(spanElementPrograma3d2F)
        btnAnteriorPrograma3d2F.removeAttribute('disabled')
        btnSiguientePrograma3d2F.removeAttribute('disabled')
        agregarEstiloRevPasadasProgramacionSegunda(containerBtnAnteriorSiguientePrograma3d2F)

        colorSpanProgramacionSegunda(spanElementPrograma3d4F)
        btnAnteriorPrograma3d4F.removeAttribute('disabled')
        btnSiguientePrograma3d4F.removeAttribute('disabled')
        agregarEstiloRevPasadasProgramacionSegunda(containerBtnAnteriorSiguientePrograma3d4F)

        colorSpanProgramacionSegunda(spanElementNotasProgramacion)
        btnAnteriorNotasProgramacion.removeAttribute('disabled')
        btnSiguienteNotasProgramacion.removeAttribute('disabled')
        agregarEstiloRevPasadasProgramacionSegunda(containerBtnAnteriorSiguienteNotasProgramacion)
    }
}


// Función para mostrar el elemento anterior
function mostrarAnteriorProgramacionSegunda(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resDatoPrograma3d2F = document.getElementById(`resDatoPrograma3d2F${kValue}`)
    let resPrograma3d4F = document.getElementById(`resPrograma3d4F${kValue}`)
    let resNotasProgramacion = document.getElementById(`resNotasProgramacion${kValue}`)

    mostrarElementoProgramacionSegunda(
        arrayFromValues,
        arrayFromEstadoValues,
        indiceAMostrar,
        kValue,
        resDatoPrograma3d2F,
        resPrograma3d4F,
        resNotasProgramacion
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteProgramacionSegunda(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resDatoPrograma3d2F = document.getElementById(`resDatoPrograma3d2F${kValue}`)
    let resPrograma3d4F = document.getElementById(`resPrograma3d4F${kValue}`)
    let resNotasProgramacion = document.getElementById(`resNotasProgramacion${kValue}`)    

    mostrarElementoProgramacionSegunda(
        arrayFromValues,
        arrayFromEstadoValues,
        indiceAMostrar,
        kValue,
        resDatoPrograma3d2F,
        resPrograma3d4F,
        resNotasProgramacion
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** Programa3d2F + Programa3d4F ***** */
let spanResProgramacionSegunda = Array.from(document.querySelectorAll('span[name="resRevisionPrograma3d2F"],span[name="resRevisionPrograma3d4F"]'))

spanResProgramacionSegunda.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionPrograma3d2F':
                var regex = /^resRevisionPrograma3d2F/;
            break;
            case 'resRevisionPrograma3d4F':
                var regex = /^resRevisionPrograma3d4F/;
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
//****** NotasProgramacion ***** */
let spanResProgramacionSegundaNotas = Array.from(document.querySelectorAll('span[name="resRevisionNotasProgramacion"]'))

spanResProgramacionSegundaNotas.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionNotasProgramacion':
                var regex = /^resRevisionNotasProgramacion/;
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