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
                mostrarAnteriorProgramacionPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarSiguienteProgramacionPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarAnteriorProgramacionPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarSiguienteProgramacionPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarAnteriorProgramacionPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarSiguienteProgramacionPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElementoProgramacionPrimera(
    arrayFromValues,
    arrayFromEstadoValues,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resDatoRt,
    resDatoPreparacionGeo,
    resDatoPrograma2d)
    {
    // console.log('resDatoRt: ', resDatoRt)
    // console.log('kValue', kValue)
    // console.log('indiceAMostrar', indiceAMostrar)
    // console.log('arrayFromValues', arrayFromValues)

    let btnAnteriorRt, btnSiguienteRt, containerBtnAnteriorSiguienteRt;
    let btnAnteriorPreparacionGeo, btnSiguientePreparacionGeo, containerBtnAnteriorSiguientePreparacionGeo;
    let btnAnteriorPrograma2d, btnSiguientePrograma2d, containerBtnAnteriorSiguientePrograma2d;
    
    if (resDatoRt) {
        let spanRt = document.getElementById(`resDatoRt${kValue}`)
        let spanEstadoRt = document.getElementById(`resEstadoRt${kValue}`)
        let spanRevisionRt = document.getElementById(`resRevisionRt${kValue}`)
        spanRt.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoRt.innerHTML = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionRt.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorRt = document.getElementById(`btnAnteriorRt${kValue}`)
        btnSiguienteRt = document.getElementById(`btnSiguienteRt${kValue}`)
        containerBtnAnteriorSiguienteRt = document.getElementById(`btnAnteriorSiguienteRt${kValue}`)
        
    } else if (resDatoPreparacionGeo) {
        let spanPreparacionGeo = document.getElementById(`resDatoPreparacionGeo${kValue}`)
        let spanEstadoPreparacionGeo = document.getElementById(`resEstadoPreparacionGeo${kValue}`)
        let spanRevisionPreparacionGeo = document.getElementById(`resRevisionPreparacionGeo${kValue}`)
        spanPreparacionGeo.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoPreparacionGeo.innerHTML = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionPreparacionGeo.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorPreparacionGeo = document.getElementById(`btnAnteriorPreparacionGeo${kValue}`)
        btnSiguientePreparacionGeo = document.getElementById(`btnSiguientePreparacionGeo${kValue}`)
        containerBtnAnteriorSiguientePreparacionGeo = document.getElementById(`btnAnteriorSiguientePreparacionGeo${kValue}`)
        
    } else if (resDatoPrograma2d) {
        let spanPrograma2d = document.getElementById(`resDatoPrograma2d${kValue}`)
        let spanEstadoPrograma2d = document.getElementById(`resEstadoPrograma2d${kValue}`)
        let spanRevisionPrograma2d = document.getElementById(`resRevisionPrograma2d${kValue}`)
        spanPrograma2d.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoPrograma2d.innerHTML = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionPrograma2d.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]
        
        btnAnteriorPrograma2d = document.getElementById(`btnAnteriorPrograma2d${kValue}`)
        btnSiguientePrograma2d = document.getElementById(`btnSiguientePrograma2d${kValue}`)
        containerBtnAnteriorSiguientePrograma2d = document.getElementById(`btnAnteriorSiguientePrograma2d${kValue}`)
    }


    function colorSpanProgramacionPrimera(spanElementProgramacionPrimera) {
        const classMap = {
            "Terminado": { bgClass: "bg-success" },
            "En Proceso": { bgClass: "bg-warning" },
            "Suspendido": { bgClass: "bg-danger" },
            "S/D": { bgClass: "bg-secondary" },
            "N/A": { bgClass: "bg-info" }
        };

        // console.log('spanElementProgramacionPrimera: ', spanElementProgramacionPrimera)
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info"];
        if (spanElementProgramacionPrimera) {
            spanElementProgramacionPrimera.classList.remove(...defaultClasses)
            
            const text = spanElementProgramacionPrimera.innerText;
            if (classMap[text]) {
                spanElementProgramacionPrimera.classList.add(classMap[text].bgClass);
            } 
        }
    }
    

    function agregarEstiloRevPasadasProgramacionPrimera (containerBtnAnteriorSiguienteProgramacionPrimera) {
        containerBtnAnteriorSiguienteProgramacionPrimera.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasProgramacionPrimera (containerBtnAnteriorSiguienteProgramacionPrimera) {
        containerBtnAnteriorSiguienteProgramacionPrimera.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementRt, spanElementPreparacionGeo, spanElementPrograma2d
    resDatoRt ? spanElementRt = resDatoRt : null
    resDatoPreparacionGeo ? spanElementPreparacionGeo = resDatoPreparacionGeo : null
    resDatoPrograma2d ? spanElementPrograma2d = resDatoPrograma2d : null

    // console.log('spanElementRt:', spanElementRt)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        if (btnAnteriorRt && btnSiguienteRt) {
            colorSpanProgramacionPrimera(spanElementRt)
            btnAnteriorRt.disabled = true
            btnSiguienteRt.removeAttribute('disabled')
            agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguienteRt)
        }

        if (btnAnteriorPreparacionGeo && btnSiguientePreparacionGeo) {
            colorSpanProgramacionPrimera(spanElementPreparacionGeo)
            btnAnteriorPreparacionGeo.disabled = true
            btnSiguientePreparacionGeo.removeAttribute('disabled')
            agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePreparacionGeo)
        }

        if (btnAnteriorPrograma2d && btnSiguientePrograma2d) {
            colorSpanProgramacionPrimera(spanElementPrograma2d)
            btnAnteriorPrograma2d.disabled = true
            btnSiguientePrograma2d.removeAttribute('disabled')
            agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePrograma2d)
        }

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        if (btnAnteriorRt && btnSiguienteRt) {
            colorSpanProgramacionPrimera(spanElementRt)
            btnAnteriorRt.removeAttribute('disabled')
            btnSiguienteRt.disabled = true
            eliminarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguienteRt)
        }

        if (btnAnteriorPreparacionGeo && btnSiguientePreparacionGeo) {
            colorSpanProgramacionPrimera(spanElementPreparacionGeo)
            btnAnteriorPreparacionGeo.removeAttribute('disabled')
            btnSiguientePreparacionGeo.disabled = true
            eliminarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePreparacionGeo)
        }

        if (btnAnteriorPrograma2d && btnSiguientePrograma2d) {
            colorSpanProgramacionPrimera(spanElementPrograma2d)
            btnAnteriorPrograma2d.removeAttribute('disabled')
            btnSiguientePrograma2d.disabled = true
            eliminarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePrograma2d)
        }

    } else {
        if (btnAnteriorRt && btnSiguienteRt) {
            colorSpanProgramacionPrimera(spanElementRt)
            btnAnteriorRt.removeAttribute('disabled')
            btnSiguienteRt.removeAttribute('disabled')
            agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguienteRt)
        }

        if (btnAnteriorPreparacionGeo && btnSiguientePreparacionGeo) {
            colorSpanProgramacionPrimera(spanElementPreparacionGeo)
            btnAnteriorPreparacionGeo.removeAttribute('disabled')
            btnSiguientePreparacionGeo.removeAttribute('disabled')
            agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePreparacionGeo)
        }

        if (btnAnteriorPrograma2d && btnSiguientePrograma2d) {
            colorSpanProgramacionPrimera(spanElementPrograma2d)
            btnAnteriorPrograma2d.removeAttribute('disabled')
            btnSiguientePrograma2d.removeAttribute('disabled')
            agregarEstiloRevPasadasProgramacionPrimera(containerBtnAnteriorSiguientePrograma2d)
        }
    }
}


// Función para mostrar el elemento anterior
function mostrarAnteriorProgramacionPrimera(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
// console.log('inputSpotIndex: ', inputSpotIndex)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
// console.log('lastIndexArrayFromValues: ', lastIndexArrayFromValues)
    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resDatoRt = document.getElementById(`resDatoRt${kValue}`)
    let resDatoPreparacionGeo = document.getElementById(`resDatoPreparacionGeo${kValue}`)
    let resDatoPrograma2d = document.getElementById(`resDatoPrograma2d${kValue}`)

    mostrarElementoProgramacionPrimera(
        arrayFromValues,
        arrayFromEstadoValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resDatoRt,
        resDatoPreparacionGeo,
        resDatoPrograma2d
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteProgramacionPrimera(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')

    let resDatoRt = document.getElementById(`resDatoRt${kValue}`)
    let resDatoPreparacionGeo = document.getElementById(`resDatoPreparacionGeo${kValue}`)
    let resDatoPrograma2d = document.getElementById(`resDatoPrograma2d${kValue}`)    

    mostrarElementoProgramacionPrimera(
        arrayFromValues,
        arrayFromEstadoValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resDatoRt,
        resDatoPreparacionGeo,
        resDatoPrograma2d
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
        let idFinalInputs = idSpotSelected.replace(regex, '');
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
                
        for (let y=0; parseInt(arrayFromSpotRevision.length) > y; y++) {
            if (inputSpotIndex == y) {
                spanSpot.setAttribute("valuerevision", arrayFromSpotRevision[y])
                spanSpot.setAttribute("valueestado", changeIconEstadoFromSingle(arrayFromSpotEstado[y]))
                spanSpot.setAttribute("valuecreador", arrayFromSpotCreador[y])
                spanSpot.setAttribute("valuefecha", arrayFromSpotFecha[y])
                spanSpot.setAttribute("valuemodificador", arrayFromSpotModificador[y])
                spanSpot.setAttribute("valuefechamod", arrayFromSpotFechaModificacion[y])
            }

            tippy(spanSpot, {
                content: `Revision: ${spanSpot.getAttribute("valuerevision")}<br>
                        Estado: ${spanSpot.getAttribute("valueestado")}<br>
                        Creado por: ${spanSpot.getAttribute("valuecreador")}<br>
                        Fecha creac.: ${spanSpot.getAttribute("valuefecha")}<br>
                        Modificado por: ${spanSpot.getAttribute("valuemodificador")}<br>
                        Fecha mod.: ${spanSpot.getAttribute("valuefechamod")}`,
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