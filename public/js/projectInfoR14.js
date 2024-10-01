let arrBtnAnteriorR14 = [], arrBtnSiguienteR14 = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnId = `btnAnteriorSiguienteR14${i}_${p}_${q}`;
            const btnElement = document.getElementById(btnId);
            if ( btnElement) {
                arrBtnAnteriorR14.push(i)
                arrBtnSiguienteR14.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorR14 !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorR14"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorR14(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteR14 !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteR14"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguienteR14(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoR14(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resProcesoR14,
    resAprobadoR14)
    {
    // console.log('resProcesoR14: ', resProcesoR14, 'resAprobadoR14: ', resAprobadoR14)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resProcesoR14) {
        let spanProcesoR14 = document.getElementById(`resProcesoR14${kValue}`)
        let spanRevisionProcesoR14 = document.getElementById(`resRevisionProcesoR14${kValue}`)
        spanProcesoR14.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionProcesoR14.innerText = parseInt(indiceAMostrar+1)
    } else if (resAprobadoR14) {
        let spanAprobadoR14 = document.getElementById(`resAprobadoR14${kValue}`)
        let spanRevisionAprobadoR14 = document.getElementById(`resRevisionAprobadoR14${kValue}`)
        spanAprobadoR14.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionAprobadoR14.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnteriorR14 = document.getElementById(`btnAnteriorR14${kValue}`)
    let btnSiguienteR14 = document.getElementById(`btnSiguienteR14${kValue}`)
    let containerBtnAnteriorSiguienteR14 = document.getElementById(`btnAnteriorSiguienteR14${kValue}`)
    
    function colorSpanR14(spanElementR14) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        spanElementR14.classList.remove(...defaultClasses);
    
        const text = spanElementR14.innerText;
        if (classMap[text]) {
            spanElementR14.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }
    

    function agregarEstiloRevPasadasR14 (containerBtnAnteriorSiguienteR14) {
        containerBtnAnteriorSiguienteR14.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasR14 (containerBtnAnteriorSiguienteR14) {
        containerBtnAnteriorSiguienteR14.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementR14
    resProcesoR14 ? spanElementR14 = resProcesoR14 : null
    resAprobadoR14 ? spanElementR14 = resAprobadoR14 : null

    // console.log('spanElementR14:', spanElementR14)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpanR14(spanElementR14)
        btnAnteriorR14.disabled = true
        btnSiguienteR14.removeAttribute('disabled')
    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpanR14(spanElementR14)
        btnAnteriorR14.removeAttribute('disabled')
        btnSiguienteR14.disabled = true
        eliminarEstiloRevPasadasR14(containerBtnAnteriorSiguienteR14)
    } else {
        colorSpanR14(spanElementR14)
        btnAnteriorR14.removeAttribute('disabled')
        btnSiguienteR14.removeAttribute('disabled')
        agregarEstiloRevPasadasR14(containerBtnAnteriorSiguienteR14)
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorR14(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resProcesoR14 = document.getElementById(`resProcesoR14${kValue}`)
    let resAprobadoR14 = document.getElementById(`resAprobadoR14${kValue}`)

    mostrarElementoR14(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resProcesoR14,
        resAprobadoR14
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteR14(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resProcesoR14 = document.getElementById(`resProcesoR14${kValue}`)
    let resAprobadoR14 = document.getElementById(`resAprobadoR14${kValue}`)

    mostrarElementoR14(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resProcesoR14,
        resAprobadoR14
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//******Proceso R14 + Aprobado R14 ***** */
let spanResR14 = Array.from(document.querySelectorAll('span[name="resRevisionProcesoR14"],span[name="resRevisionAprobadoR14"]'))

spanResR14.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionProcesoR14':
                var regex = /^resRevisionProcesoR14/;
            break;
            case 'resRevisionAprobadoR14':
                var regex = /^resRevisionAprobadoR14/;
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