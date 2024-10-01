let arrBtnAnteriorRt = [], arrBtnSiguienteRt = [],
    arrBtnAnteriorPreparacionGeo = [], arrBtnSiguientePreparacionGeo = [],
    arrBtnAnteriorPrograma2d = [], arrBtnSiguientePrograma2d = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdRt = `btnAnteriorSiguienteRt${i}_${p}_${q}`;
            const btnIdPreparacionGeo = `btnAnteriorSiguientePreparacionGeo${i}_${p}_${q}`;
            const btnIdPrograma2d = `btnAnteriorSiguientePrograma2d${i}_${p}_${q}`;

            const btnElementRt = document.getElementById(btnIdRt);
            if ( btnElementRt ) {
                arrBtnAnteriorRt.push(i)
                arrBtnSiguienteRt.push(i)
            }

            const btnElementIdPreparacionGeo = document.getElementById(btnIdPreparacionGeo);
            if ( btnElementIdPreparacionGeo ) {
                arrBtnAnteriorPreparacionGeo.push(i)
                arrBtnSiguientePreparacionGeo.push(i)
            }

            const btnElementIdPrograma2d = document.getElementById(btnIdPrograma2d);
            if ( btnElementIdPrograma2d ) {
                arrBtnAnteriorPrograma2d.push(i)
                arrBtnSiguientePrograma2d.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorRt !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorRt"]')
    
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
                mostrarAnteriorProgramacionPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteRt !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteRt"]')
    
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
                mostrarSiguienteProgramacionPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorPreparacionGeo !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorPreparacionGeo"]')
    
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
                mostrarAnteriorProgramacionPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguientePreparacionGeo !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguientePreparacionGeo"]')
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
                mostrarSiguienteProgramacionPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorPrograma2d !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorPrograma2d"]')
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
                mostrarAnteriorProgramacionPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguientePrograma2d !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguientePrograma2d"]')
    
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
                mostrarSiguienteProgramacionPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElementoProgramacionPrimera(
    arrayFromValues,
    arrayFromEstadoValues,
    indiceAMostrar,
    kValue,
    resDatoRt,
    resPreparacionGeo,
    resPrograma2d)
    {
    // console.log('resRt: ', resRt, 'resAprobadoRt: ', resAprobadoRt)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resDatoRt) {
        let spanRt = document.getElementById(`resDatoRt${kValue}`)
        let spanEstadoRt = document.getElementById(`resEstadoRt${kValue}`)
        let spanRevisionRt = document.getElementById(`resRevisionRt${kValue}`)
        spanRt.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoRt.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionRt.innerText = parseInt(indiceAMostrar+1)
        
    } else if (resPreparacionGeo) {
        let spanPreparacionGeo = document.getElementById(`resPreparacionGeo${kValue}`)
        let spanEstadoPreparacionGeo = document.getElementById(`resEstadoPreparacionGeo${kValue}`)
        let spanRevisionPreparacionGeo = document.getElementById(`resRevisionPreparacionGeo${kValue}`)
        spanPreparacionGeo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoPreparacionGeo.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionPreparacionGeo.innerText = parseInt(indiceAMostrar+1)
        
    } else if (resPrograma2d) {
        let spanPrograma2d = document.getElementById(`resPrograma2d${kValue}`)
        let spanEstadoPrograma2d = document.getElementById(`resEstadoPrograma2d${kValue}`)
        let spanRevisionPrograma2d = document.getElementById(`resRevisionPrograma2d${kValue}`)
        spanPrograma2d.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoPrograma2d.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionPrograma2d.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnteriorRt = document.getElementById(`btnAnteriorRt${kValue}`)
    let btnSiguienteRt = document.getElementById(`btnSiguienteRt${kValue}`)
    let containerBtnAnteriorSiguienteRt = document.getElementById(`btnAnteriorSiguienteRt${kValue}`)
    
    let btnAnteriorPreparacionGeo = document.getElementById(`btnAnteriorPreparacionGeo${kValue}`)
    let btnSiguientePreparacionGeo = document.getElementById(`btnSiguientePreparacionGeo${kValue}`)
    let containerBtnAnteriorSiguientePreparacionGeo = document.getElementById(`btnAnteriorSiguientePreparacionGeo${kValue}`)

    let btnAnteriorPrograma2d = document.getElementById(`btnAnteriorPrograma2d${kValue}`)
    let btnSiguientePrograma2d = document.getElementById(`btnSiguientePrograma2d${kValue}`)
    let containerBtnAnteriorSiguientePrograma2d = document.getElementById(`btnAnteriorSiguientePrograma2d${kValue}`)


    function colorSpanProgramacionPrimera(spanElementProgramacionPrimera) {
        const classMap = {
            "terminado": { bgClass: "bg-success", textClass: "text-white" },
            "enProceso": { bgClass: "bg-warning", textClass: "text-dark" },
            "suspendido": { bgClass: "bg-danger", textClass: "text-white" },
            "sinDato": { bgClass: "bg-secondary", textClass: "text-white" },
            "noAplica": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        spanElementProgramacionPrimera.classList.remove(...defaultClasses);
    
        const text = spanElementProgramacionPrimera.innerText;
        if (classMap[text]) {
            spanElementProgramacionPrimera.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }
    

    function agregarEstiloRevPasadasProgramacionPrimera (containerBtnAnteriorSiguienteProgramacionPrimera) {
        containerBtnAnteriorSiguienteProgramacionPrimera.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasProgramacionPrimera (containerBtnAnteriorSiguienteProgramacionPrimera) {
        containerBtnAnteriorSiguienteProgramacionPrimera.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementRt
    let spanElementPreparacionGeo
    let spanElementPrograma2d
    
    resDatoRt ? spanElementRt = resDatoRt : null
    resPreparacionGeo ? spanElementPreparacionGeo = resPreparacionGeo : null
    resPrograma2d ? spanElementPrograma2d = resPrograma2d : null

    // console.log('spanElementRt:', spanElementRt)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpanProgramacionPrimera(spanElementRt)
        btnAnteriorRt.disabled = true
        btnSiguienteRt.removeAttribute('disabled')

        colorSpanProgramacionPrimera(spanElementPreparacionGeo)
        btnAnteriorPreparacionGeo.disabled = true
        btnSiguientePreparacionGeo.removeAttribute('disabled')

        colorSpanProgramacionPrimera(spanElementPrograma2d)
        btnAnteriorPrograma2d.disabled = true
        btnSiguientePrograma2d.removeAttribute('disabled')

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpanProgramacionPrimera(spanElementRt)
        btnAnteriorRt.removeAttribute('disabled')
        btnSiguienteRt.disabled = true
        eliminarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguienteRt)

        colorSpanProgramacionPrimera(spanElementPreparacionGeo)
        btnAnteriorPreparacionGeo.removeAttribute('disabled')
        btnSiguientePreparacionGeo.disabled = true
        eliminarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePreparacionGeo)

        colorSpanProgramacionPrimera(spanElementPrograma2d)
        btnAnteriorPrograma2d.removeAttribute('disabled')
        btnSiguientePrograma2d.disabled = true
        eliminarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePrograma2d)

    } else {
        colorSpanProgramacionPrimera(spanElementRt)
        btnAnteriorRt.removeAttribute('disabled')
        btnSiguienteRt.removeAttribute('disabled')
        agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguienteRt)

        colorSpanProgramacionPrimera(spanElementPreparacionGeo)
        btnAnteriorPreparacionGeo.removeAttribute('disabled')
        btnSiguientePreparacionGeo.removeAttribute('disabled')
        agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePreparacionGeo)

        colorSpanProgramacionPrimera(spanElementPrograma2d)
        btnAnteriorPrograma2d.removeAttribute('disabled')
        btnSiguientePrograma2d.removeAttribute('disabled')
        agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePrograma2d)
    }
}


// Función para mostrar el elemento anterior
function mostrarAnteriorProgramacionPrimera(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resDatoRt = document.getElementById(`resDatoRt${kValue}`)
    let resPreparacionGeo = document.getElementById(`resPreparacionGeo${kValue}`)
    let resPrograma2d = document.getElementById(`resPrograma2d${kValue}`)

    mostrarElementoProgramacionPrimera(
        arrayFromValues,
        arrayFromEstadoValues,
        indiceAMostrar,
        kValue,
        resDatoRt,
        resPreparacionGeo,
        resPrograma2d
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteProgramacionPrimera(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resDatoRt = document.getElementById(`resDatoRt${kValue}`)
    let resPreparacionGeo = document.getElementById(`resPreparacionGeo${kValue}`)
    let resPrograma2d = document.getElementById(`resPrograma2d${kValue}`)    

    mostrarElementoProgramacionPrimera(
        arrayFromValues,
        arrayFromEstadoValues,
        indiceAMostrar,
        kValue,
        resDatoRt,
        resPreparacionGeo,
        resPrograma2d
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** Rt + PreparacionGeo + Programa2d ***** */
let spanResProgramacionPrimera = Array.from(document.querySelectorAll('span[name="resRevisionRt"],span[name="resRevisionPreparacionGeo"],span[name="resRevisionPrograma2d"]'))

spanResProgramacionPrimera.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionRt':
                var regex = /^resRevisionRt/;
            break;
            case 'resRevisionPreparacionGeo':
                var regex = /^resRevisionPreparacionGeo/;
            break;
            case 'resRevisionPrograma2d':
                var regex = /^resRevisionPrograma2d/;
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