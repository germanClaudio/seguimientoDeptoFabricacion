let arrBtnAnteriorFCero = [], arrBtnSiguienteFCero = [],
    arrBtnAnteriorFUno = [], arrBtnSiguienteFUno = [],
    arrBtnAnteriorFDos = [], arrBtnSiguienteFDos = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdFCero = `btnAnteriorSiguienteFCero${i}_${p}_${q}`;
            const btnIdFUno = `btnAnteriorSiguienteFUno${i}_${p}_${q}`;
            const btnIdFDos = `btnAnteriorSiguienteFDos${i}_${p}_${q}`;

            const btnElementFCero = document.getElementById(btnIdFCero);
            if ( btnElementFCero ) {
                arrBtnAnteriorFCero.push(i)
                arrBtnSiguienteFCero.push(i)
            }

            const btnElementIdFUno = document.getElementById(btnIdFUno);
            if ( btnElementIdFUno ) {
                arrBtnAnteriorFUno.push(i)
                arrBtnSiguienteFUno.push(i)
            }

            const btnElementIdFDos = document.getElementById(btnIdFDos);
            if ( btnElementIdFDos ) {
                arrBtnAnteriorFDos.push(i)
                arrBtnSiguienteFDos.push(i)
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
if(arrBtnAnteriorFCero !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorFCero"]')
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
                mostrarAnteriorMecanizadoPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteFCero !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteFCero"]')
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
                mostrarSiguienteMecanizadoPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorFUno !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorFUno"]')
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
                mostrarAnteriorMecanizadoPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteFUno !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteFUno"]')
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
                mostrarSiguienteMecanizadoPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorFDos !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorFDos"]')
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
                mostrarAnteriorMecanizadoPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteFDos !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteFDos"]')
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
                mostrarSiguienteMecanizadoPrimera(arrayFromValues, changeIconEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElementoMecanizadoPrimera(
    arrayFromValues,
    arrayFromEstadoValues,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resDatoFCero,
    resDatoFUno,
    resDatoFDos)
    {
    // console.log('resFCero: ', resFCero, 'resAprobadoFCero: ', resAprobadoFCero)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)

    let btnAnteriorFCero, btnSiguienteFCero, containerBtnAnteriorSiguienteFCero;
    let btnAnteriorFUno, btnSiguienteFUno, containerBtnAnteriorSiguienteFUno;
    let btnAnteriorFDos, btnSiguienteFDos, containerBtnAnteriorSiguienteFDos;
    
    if (resDatoFCero) {
        let spanFCero = document.getElementById(`resDatoFCero${kValue}`)
        let spanEstadoFCero = document.getElementById(`resEstadoFCero${kValue}`)
        let spanRevisionFCero = document.getElementById(`resRevisionFCero${kValue}`)
        spanFCero.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFCero.innerHTML = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFCero.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorFCero = document.getElementById(`btnAnteriorFCero${kValue}`)
        btnSiguienteFCero = document.getElementById(`btnSiguienteFCero${kValue}`)
        containerBtnAnteriorSiguienteFCero = document.getElementById(`btnAnteriorSiguienteFCero${kValue}`)
        
    } else if (resDatoFUno) {
        let spanFUno = document.getElementById(`resDatoFUno${kValue}`)
        let spanEstadoFUno = document.getElementById(`resEstadoFUno${kValue}`)
        let spanRevisionFUno = document.getElementById(`resRevisionFUno${kValue}`)
        spanFUno.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFUno.innerHTML = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFUno.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorFUno = document.getElementById(`btnAnteriorFUno${kValue}`)
        btnSiguienteFUno = document.getElementById(`btnSiguienteFUno${kValue}`)
        containerBtnAnteriorSiguienteFUno = document.getElementById(`btnAnteriorSiguienteFUno${kValue}`)
        
    } else if (resDatoFDos) {
        let spanFDos = document.getElementById(`resDatoFDos${kValue}`)
        let spanEstadoFDos = document.getElementById(`resEstadoFDos${kValue}`)
        let spanRevisionFDos = document.getElementById(`resRevisionFDos${kValue}`)
        spanFDos.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFDos.innerHTML = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFDos.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorFDos = document.getElementById(`btnAnteriorFDos${kValue}`)
        btnSiguienteFDos = document.getElementById(`btnSiguienteFDos${kValue}`)
        containerBtnAnteriorSiguienteFDos = document.getElementById(`btnAnteriorSiguienteFDos${kValue}`)
    }
    
    
    function colorSpanMecanizadoPrimera(spanElementMecanizadoPrimera) {
        const classMap = {
            "Terminado": { bgClass: "bg-success" },
            "En Proceso": { bgClass: "bg-warning" },
            "Suspendido": { bgClass: "bg-danger" },
            "S/D": { bgClass: "bg-secondary" },
            "N/A": { bgClass: "bg-info" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info"];
        if (spanElementMecanizadoPrimera) {
            spanElementMecanizadoPrimera.classList.remove(...defaultClasses)
            
            const text = spanElementMecanizadoPrimera.innerText;
            if (classMap[text]) {
                spanElementMecanizadoPrimera.classList.add(classMap[text].bgClass);
            } 
        }
    }
    

    function agregarEstiloRevPasadasMecanizadoPrimera (containerBtnAnteriorSiguienteMecanizadoPrimera) {
        containerBtnAnteriorSiguienteMecanizadoPrimera.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasMecanizadoPrimera (containerBtnAnteriorSiguienteMecanizadoPrimera) {
        containerBtnAnteriorSiguienteMecanizadoPrimera.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementFCero, spanElementFUno, spanElementFDos    
    resDatoFCero ? spanElementFCero = resDatoFCero : null
    resDatoFUno ? spanElementFUno = resDatoFUno : null
    resDatoFDos ? spanElementFDos = resDatoFDos : null

    // console.log('spanElementFCero:', spanElementFCero)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        if (btnAnteriorFCero && btnSiguienteFCero) {
            colorSpanMecanizadoPrimera(spanElementFCero)
            btnAnteriorFCero.disabled = true
            btnSiguienteFCero.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFCero)
        }

        if (btnAnteriorFUno && btnSiguienteFUno) {
            colorSpanMecanizadoPrimera(spanElementFUno)
            btnAnteriorFUno.disabled = true
            btnSiguienteFUno.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFUno)
        }

        if (btnAnteriorFDos && btnSiguienteFDos) {
            colorSpanMecanizadoPrimera(spanElementFDos)
            btnAnteriorFDos.disabled = true
            btnSiguienteFDos.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFDos)
        }

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        if (btnAnteriorFCero && btnSiguienteFCero) {
            colorSpanMecanizadoPrimera(spanElementFCero)
            btnAnteriorFCero.removeAttribute('disabled')
            btnSiguienteFCero.disabled = true
            eliminarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFCero)
        }

        if (btnAnteriorFUno && btnSiguienteFUno) {
            colorSpanMecanizadoPrimera(spanElementFUno)
            btnAnteriorFUno.removeAttribute('disabled')
            btnSiguienteFUno.disabled = true
            eliminarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFUno)
        }

        if (btnAnteriorFDos && btnSiguienteFDos) {
            colorSpanMecanizadoPrimera(spanElementFDos)
            btnAnteriorFDos.removeAttribute('disabled')
            btnSiguienteFDos.disabled = true
            eliminarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFDos)
        }

    } else {
        if (btnAnteriorFCero && btnSiguienteFCero) {
            colorSpanMecanizadoPrimera(spanElementFCero)
            btnAnteriorFCero.removeAttribute('disabled')
            btnSiguienteFCero.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFCero)
        }

        if (btnAnteriorFUno && btnSiguienteFUno) {
            colorSpanMecanizadoPrimera(spanElementFUno)
            btnAnteriorFUno.removeAttribute('disabled')
            btnSiguienteFUno.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFUno)
        }

        if (btnAnteriorFDos && btnSiguienteFDos) {
            colorSpanMecanizadoPrimera(spanElementFDos)
            btnAnteriorFDos.removeAttribute('disabled')
            btnSiguienteFDos.removeAttribute('disabled')
            agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFDos)
        }
    }
}


// Función para mostrar el elemento anterior
function mostrarAnteriorMecanizadoPrimera(arrayFromValues, arrayFromEstadoValues, kValue) {
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

    let resDatoFCero = document.getElementById(`resDatoFCero${kValue}`)
    let resDatoFUno = document.getElementById(`resDatoFUno${kValue}`)
    let resDatoFDos = document.getElementById(`resDatoFDos${kValue}`)

    mostrarElementoMecanizadoPrimera(
        arrayFromValues,
        arrayFromEstadoValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resDatoFCero,
        resDatoFUno,
        resDatoFDos
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteMecanizadoPrimera(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')

    let resDatoFCero = document.getElementById(`resDatoFCero${kValue}`)
    let resDatoFUno = document.getElementById(`resDatoFUno${kValue}`)
    let resDatoFDos = document.getElementById(`resDatoFDos${kValue}`)    

    mostrarElementoMecanizadoPrimera(
        arrayFromValues,
        arrayFromEstadoValues,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resDatoFCero,
        resDatoFUno,
        resDatoFDos
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** FCero + FUno + FDos ***** */
let spanResMecanizadoPrimera = Array.from(document.querySelectorAll('span[name="resRevisionFCero"],span[name="resRevisionFUno"],span[name="resRevisionFDos"]'))

spanResMecanizadoPrimera.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionFCero':
                var regex = /^resRevisionFCero/;
            break;
            case 'resRevisionFUno':
                var regex = /^resRevisionFUno/;
            break;
            case 'resRevisionFDos':
                var regex = /^resRevisionFDos/;
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