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
                mostrarAnteriorMecanizadoPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarSiguienteMecanizadoPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarAnteriorMecanizadoPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarSiguienteMecanizadoPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarAnteriorMecanizadoPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
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
                mostrarSiguienteMecanizadoPrimera(changeValueFromArray(arrayFromValues), changeValueEstadoFromArray(arrayFromEstadoValues), kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElementoMecanizadoPrimera(
    arrayFromValues,
    arrayFromEstadoValues,
    indiceAMostrar,
    kValue,
    resDatoFCero,
    resFUno,
    resFDos)
    {
    // console.log('resFCero: ', resFCero, 'resAprobadoFCero: ', resAprobadoFCero)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resDatoFCero) {
        let spanFCero = document.getElementById(`resDatoFCero${kValue}`)
        let spanEstadoFCero = document.getElementById(`resEstadoFCero${kValue}`)
        let spanRevisionFCero = document.getElementById(`resRevisionFCero${kValue}`)
        spanFCero.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFCero.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFCero.innerText = parseInt(indiceAMostrar+1)
        
    } else if (resFUno) {
        let spanFUno = document.getElementById(`resFUno${kValue}`)
        let spanEstadoFUno = document.getElementById(`resEstadoFUno${kValue}`)
        let spanRevisionFUno = document.getElementById(`resRevisionFUno${kValue}`)
        spanFUno.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFUno.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFUno.innerText = parseInt(indiceAMostrar+1)
        
    } else if (resFDos) {
        let spanFDos = document.getElementById(`resFDos${kValue}`)
        let spanEstadoFDos = document.getElementById(`resEstadoFDos${kValue}`)
        let spanRevisionFDos = document.getElementById(`resRevisionFDos${kValue}`)
        spanFDos.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanEstadoFDos.innerText = arrayFromEstadoValues[parseInt(indiceAMostrar)]
        spanRevisionFDos.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnteriorFCero = document.getElementById(`btnAnteriorFCero${kValue}`)
    let btnSiguienteFCero = document.getElementById(`btnSiguienteFCero${kValue}`)
    let containerBtnAnteriorSiguienteFCero = document.getElementById(`btnAnteriorSiguienteFCero${kValue}`)
    
    let btnAnteriorFUno = document.getElementById(`btnAnteriorFUno${kValue}`)
    let btnSiguienteFUno = document.getElementById(`btnSiguienteFUno${kValue}`)
    let containerBtnAnteriorSiguienteFUno = document.getElementById(`btnAnteriorSiguienteFUno${kValue}`)

    let btnAnteriorFDos = document.getElementById(`btnAnteriorFDos${kValue}`)
    let btnSiguienteFDos = document.getElementById(`btnSiguienteFDos${kValue}`)
    let containerBtnAnteriorSiguienteFDos = document.getElementById(`btnAnteriorSiguienteFDos${kValue}`)


    function colorSpanMecanizadoPrimera(spanElementMecanizadoPrimera) {
        const classMap = {
            "terminado": { bgClass: "bg-success", textClass: "text-white" },
            "enProceso": { bgClass: "bg-warning", textClass: "text-dark" },
            "suspendido": { bgClass: "bg-danger", textClass: "text-white" },
            "sinDato": { bgClass: "bg-secondary", textClass: "text-white" },
            "noAplica": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        spanElementMecanizadoPrimera.classList.remove(...defaultClasses);
    
        const text = spanElementMecanizadoPrimera.innerText;
        if (classMap[text]) {
            spanElementMecanizadoPrimera.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }
    

    function agregarEstiloRevPasadasMecanizadoPrimera (containerBtnAnteriorSiguienteMecanizadoPrimera) {
        containerBtnAnteriorSiguienteMecanizadoPrimera.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasMecanizadoPrimera (containerBtnAnteriorSiguienteMecanizadoPrimera) {
        containerBtnAnteriorSiguienteMecanizadoPrimera.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementFCero
    let spanElementFUno
    let spanElementFDos
    
    resDatoFCero ? spanElementFCero = resDatoFCero : null
    resFUno ? spanElementFUno = resFUno : null
    resFDos ? spanElementFDos = resFDos : null

    // console.log('spanElementFCero:', spanElementFCero)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpanMecanizadoPrimera(spanElementFCero)
        btnAnteriorFCero.disabled = true
        btnSiguienteFCero.removeAttribute('disabled')

        colorSpanMecanizadoPrimera(spanElementFUno)
        btnAnteriorFUno.disabled = true
        btnSiguienteFUno.removeAttribute('disabled')

        colorSpanMecanizadoPrimera(spanElementFDos)
        btnAnteriorFDos.disabled = true
        btnSiguienteFDos.removeAttribute('disabled')

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpanMecanizadoPrimera(spanElementFCero)
        btnAnteriorFCero.removeAttribute('disabled')
        btnSiguienteFCero.disabled = true
        eliminarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFCero)

        colorSpanMecanizadoPrimera(spanElementFUno)
        btnAnteriorFUno.removeAttribute('disabled')
        btnSiguienteFUno.disabled = true
        eliminarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFUno)

        colorSpanMecanizadoPrimera(spanElementFDos)
        btnAnteriorFDos.removeAttribute('disabled')
        btnSiguienteFDos.disabled = true
        eliminarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFDos)

    } else {
        colorSpanMecanizadoPrimera(spanElementFCero)
        btnAnteriorFCero.removeAttribute('disabled')
        btnSiguienteFCero.removeAttribute('disabled')
        agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFCero)

        colorSpanMecanizadoPrimera(spanElementFUno)
        btnAnteriorFUno.removeAttribute('disabled')
        btnSiguienteFUno.removeAttribute('disabled')
        agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFUno)

        colorSpanMecanizadoPrimera(spanElementFDos)
        btnAnteriorFDos.removeAttribute('disabled')
        btnSiguienteFDos.removeAttribute('disabled')
        agregarEstiloRevPasadasMecanizadoPrimera(containerBtnAnteriorSiguienteFDos)
    }
}


// Función para mostrar el elemento anterior
function mostrarAnteriorMecanizadoPrimera(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resDatoFCero = document.getElementById(`resDatoFCero${kValue}`)
    let resFUno = document.getElementById(`resFUno${kValue}`)
    let resFDos = document.getElementById(`resFDos${kValue}`)

    mostrarElementoMecanizadoPrimera(
        arrayFromValues,
        arrayFromEstadoValues,
        indiceAMostrar,
        kValue,
        resDatoFCero,
        resFUno,
        resFDos
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteMecanizadoPrimera(arrayFromValues, arrayFromEstadoValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resDatoFCero = document.getElementById(`resDatoFCero${kValue}`)
    let resFUno = document.getElementById(`resFUno${kValue}`)
    let resFDos = document.getElementById(`resFDos${kValue}`)    

    mostrarElementoMecanizadoPrimera(
        arrayFromValues,
        arrayFromEstadoValues,
        indiceAMostrar,
        kValue,
        resDatoFCero,
        resFUno,
        resFDos
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