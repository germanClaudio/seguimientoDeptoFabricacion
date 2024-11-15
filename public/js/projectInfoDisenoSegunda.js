let arrBtnAnteriorRevisionCliente = [], arrBtnSiguienteRevisionCliente = [],
arrBtnAnteriorLdmProvisoria = [], arrBtnSiguienteLdmProvisoria = [],
arrBtnAnteriorAv100Diseno = [], arrBtnSiguienteAv100Diseno = [],
arrBtnAnteriorAprobadoCliente = [], arrBtnSiguienteAprobadoCliente = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdRevisionCliente = `btnAnteriorSiguienteRevisionCliente${i}_${p}_${q}`;
            const btnIdLdmProvisoria = `btnAnteriorSiguienteLdmProvisoria${i}_${p}_${q}`;
            const btnIdAv100Diseno = `btnAnteriorSiguienteAv100Diseno${i}_${p}_${q}`;
            const btnIdAprobadoCliente = `btnAnteriorSiguienteAprobadoCliente${i}_${p}_${q}`;

            const btnElementRevisionCliente = document.getElementById(btnIdRevisionCliente);
            if (btnElementRevisionCliente) {
                arrBtnAnteriorRevisionCliente.push(i)
                arrBtnSiguienteRevisionCliente.push(i)
            }

            const btnElementLdmProvisoria = document.getElementById(btnIdLdmProvisoria);
            if (btnElementLdmProvisoria) {
                arrBtnAnteriorLdmProvisoria.push(i)
                arrBtnSiguienteLdmProvisoria.push(i)
            }

            const btnElementAv100Diseno = document.getElementById(btnIdAv100Diseno);
            if (btnElementAv100Diseno) {
                arrBtnAnteriorAv100Diseno.push(i)
                arrBtnSiguienteAv100Diseno.push(i)
            }

            const btnElementAprobadoCliente = document.getElementById(btnIdAprobadoCliente);
            if (btnElementAprobadoCliente) {
                arrBtnAnteriorAprobadoCliente.push(i)
                arrBtnSiguienteAprobadoCliente.push(i)
            }
        }
    }
}

function changeIconAvanceFromArray(arrayFromValues) {
    let defaultValue = '<i class="fa-solid fa-person-digging fa-lg" style="color: #1c21ac;"></i>'
    const valueEstadoMap = {
        100 : '<i class="fa-solid fa-circle-check fa-lg" style="color: #067e00;"></i>',
        0 : '<i class="fa-solid fa-spinner fa-lg fa-spin-pulse"style="color: #ff0000f5;"></i>', 
    };
    return arrayFromValues.map(value => valueEstadoMap[value] || defaultValue);
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorRevisionCliente !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorRevisionCliente"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoSegunda(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnSiguienteRevisionCliente !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteRevisionCliente"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoSegunda(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnAnteriorLdmProvisoria !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorLdmProvisoria"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoSegunda(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnSiguienteLdmProvisoria !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteLdmProvisoria"]')    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoSegunda(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnAnteriorAv100Diseno !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorAv100Diseno"]')    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoSegunda(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteAv100Diseno !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteAv100Diseno"]')    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoSegunda(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorAprobadoCliente !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorAprobadoCliente"]')    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoSegunda(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnSiguienteAprobadoCliente !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteAprobadoCliente"]')    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoSegunda(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoDisenoSegunda(
    arrayFromValues,
    arrayFromValuesIcon,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resRevisionCliente,
    resLdmProvisoria,
    resSegundaAv100Diseno,
    resAprobadoCliente) {
    
    // console.log('kValue', kValue)

    let btnAnteriorRevisionCliente, btnSiguienteRevisionCliente, containerBtnAnteriorSiguienteRevisionCliente
    let btnAnteriorLdmProvisoria, btnSiguienteLdmProvisoria, containerBtnAnteriorSiguienteLdmProvisoria
    let btnAnteriorAv100Diseno, btnSiguienteAv100Diseno, containerBtnAnteriorSiguienteAv100Diseno
    let btnAnteriorAprobadoCliente, btnSiguienteAprobadoCliente, containerBtnAnteriorSiguienteAprobadoCliente
    
    if (resRevisionCliente) {
        let spanRevisionCliente = document.getElementById(`resRevisionCliente${kValue}`)
        let spanRevisionRevisionCliente = document.getElementById(`resRevisionRevisionCliente${kValue}`)
        spanRevisionCliente.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionRevisionCliente.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorRevisionCliente = document.getElementById(`btnAnteriorRevisionCliente${kValue}`)
        btnSiguienteRevisionCliente = document.getElementById(`btnSiguienteRevisionCliente${kValue}`)
        containerBtnAnteriorSiguienteRevisionCliente = document.getElementById(`btnAnteriorSiguienteRevisionCliente${kValue}`)

    } else if (resLdmProvisoria) {
        let spanLdmProvisoria = document.getElementById(`resLdmProvisoria${kValue}`)
        let spanRevisionLdmProvisoria = document.getElementById(`resRevisionLdmProvisoria${kValue}`)
        spanLdmProvisoria.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionLdmProvisoria.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorLdmProvisoria = document.getElementById(`btnAnteriorLdmProvisoria${kValue}`)
        btnSiguienteLdmProvisoria = document.getElementById(`btnSiguienteLdmProvisoria${kValue}`)
        containerBtnAnteriorSiguienteLdmProvisoria = document.getElementById(`btnAnteriorSiguienteLdmProvisoria${kValue}`)

    } else if (resSegundaAv100Diseno) {
        let spanSegundaAv100Diseno = document.getElementById(`resAv100Diseno${kValue}`)
        let spanRevisionSegundaAv100Diseno = document.getElementById(`resRevisionAv100Diseno${kValue}`)
        spanSegundaAv100Diseno.innerHTML = ''
        spanSegundaAv100Diseno.innerHTML = arrayFromValues[parseInt(indiceAMostrar)]+'% '+ arrayFromValuesIcon[parseInt(indiceAMostrar)]
        spanRevisionSegundaAv100Diseno.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorAv100Diseno = document.getElementById(`btnAnteriorAv100Diseno${kValue}`)
        btnSiguienteAv100Diseno = document.getElementById(`btnSiguienteAv100Diseno${kValue}`)
        containerBtnAnteriorSiguienteAv100Diseno = document.getElementById(`btnAnteriorSiguienteAv100Diseno${kValue}`)

    } else if (resAprobadoCliente) {
        let spanAprobadoCliente = document.getElementById(`resAprobadoCliente${kValue}`)
        let spanRevisionAprobadoCliente = document.getElementById(`resRevisionAprobadoCliente${kValue}`)
        spanAprobadoCliente.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionAprobadoCliente.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorAprobadoCliente = document.getElementById(`btnAnteriorAprobadoCliente${kValue}`)
        btnSiguienteAprobadoCliente = document.getElementById(`btnSiguienteAprobadoCliente${kValue}`)
        containerBtnAnteriorSiguienteAprobadoCliente = document.getElementById(`btnAnteriorSiguienteAprobadoCliente${kValue}`)
    }
    
    function colorSpanDisenoSegunda(spanElementDisenoSegunda) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElementDisenoSegunda) {
            spanElementDisenoSegunda.classList.remove(...defaultClasses);
        }
    
        const text = spanElementDisenoSegunda.innerText;
        if (classMap[text]) {
            spanElementDisenoSegunda.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadasDisenoSegunda (containerBtnAnteriorSiguienteDisenoSegunda) {
        containerBtnAnteriorSiguienteDisenoSegunda.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasDisenoSegunda (containerBtnAnteriorSiguienteDisenoSegunda) {
        containerBtnAnteriorSiguienteDisenoSegunda.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementRevisionCliente, spanElementLdmProvisoria, spanElementAv100Diseno, spanElementAprobadoCliente
    resRevisionCliente ? spanElementRevisionCliente = resRevisionCliente : null
    resLdmProvisoria ? spanElementLdmProvisoria = resLdmProvisoria : null
    resSegundaAv100Diseno ? spanElementAv100Diseno = resSegundaAv100Diseno : null
    resAprobadoCliente ? spanElementAprobadoCliente = resAprobadoCliente : null
    
    if (indiceAMostrar == 0) {
        if (btnAnteriorRevisionCliente && btnSiguienteRevisionCliente) {
            colorSpanDisenoSegunda(spanElementRevisionCliente)
            btnAnteriorRevisionCliente.disabled = 'true'
            btnSiguienteRevisionCliente.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteRevisionCliente)
        }

        if (btnAnteriorLdmProvisoria && btnSiguienteLdmProvisoria) {
            colorSpanDisenoSegunda(spanElementLdmProvisoria)
            btnAnteriorLdmProvisoria.disabled = 'true'
            btnSiguienteLdmProvisoria.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteLdmProvisoria)
        }

        if (btnAnteriorAv100Diseno && btnSiguienteAv100Diseno) {
            colorSpanDisenoSegunda(spanElementAv100Diseno)
            btnAnteriorAv100Diseno.disabled = 'true'
            btnSiguienteAv100Diseno.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteAv100Diseno)
        }

        if (btnAnteriorAprobadoCliente && btnSiguienteAprobadoCliente) {
            colorSpanDisenoSegunda(spanElementAprobadoCliente)
            btnAnteriorAprobadoCliente.disabled = 'true'
            btnSiguienteAprobadoCliente.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteAprobadoCliente)
        }

    } else if (indiceAMostrar == arrayFromValues.length-1) {
        if (btnAnteriorRevisionCliente && btnSiguienteRevisionCliente) {
            colorSpanDisenoSegunda(spanElementRevisionCliente)
            btnAnteriorRevisionCliente.removeAttribute('disabled')
            btnSiguienteRevisionCliente.disabled = true
            eliminarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteRevisionCliente)
        }

        if (btnAnteriorLdmProvisoria && btnSiguienteLdmProvisoria) {
            colorSpanDisenoSegunda(spanElementLdmProvisoria)
            btnAnteriorLdmProvisoria.removeAttribute('disabled')
            btnSiguienteLdmProvisoria.disabled = true
            eliminarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteLdmProvisoria)
        }
        
        if (btnAnteriorAv100Diseno && btnSiguienteAv100Diseno) {
            colorSpanDisenoSegunda(spanElementAv100Diseno)
            btnAnteriorAv100Diseno.removeAttribute('disabled')
            btnSiguienteAv100Diseno.disabled = true
            eliminarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteAv100Diseno)
        }

        if (btnAnteriorAprobadoCliente && btnSiguienteAprobadoCliente) {
            colorSpanDisenoSegunda(spanElementAprobadoCliente)
            btnAnteriorAprobadoCliente.removeAttribute('disabled')
            btnSiguienteAprobadoCliente.disabled = true
            eliminarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteAprobadoCliente)
        }

    } else {
        if (btnAnteriorRevisionCliente && btnSiguienteRevisionCliente) {
            colorSpanDisenoSegunda(spanElementRevisionCliente)
            btnAnteriorRevisionCliente.removeAttribute('disabled')
            btnSiguienteRevisionCliente.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteRevisionCliente)
        }
        
        if (btnAnteriorLdmProvisoria && btnSiguienteLdmProvisoria) {
            colorSpanDisenoSegunda(spanElementLdmProvisoria)
            btnAnteriorLdmProvisoria.removeAttribute('disabled')
            btnSiguienteLdmProvisoria.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteLdmProvisoria)
        }
                
        if (btnAnteriorAv100Diseno && btnSiguienteAv100Diseno) {
            colorSpanDisenoSegunda(spanElementAv100Diseno)
            btnAnteriorAv100Diseno.removeAttribute('disabled')
            btnSiguienteAv100Diseno.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteAv100Diseno)
        }
        
        if (btnAnteriorAprobadoCliente && btnSiguienteAprobadoCliente) {
            colorSpanDisenoSegunda(spanElementAprobadoCliente)
            btnAnteriorAprobadoCliente.removeAttribute('disabled')
            btnSiguienteAprobadoCliente.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoSegunda(containerBtnAnteriorSiguienteAprobadoCliente)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorDisenoSegunda(arrayFromValues, arrayFromValuesIcon, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resRevisionCliente = document.getElementById(`resRevisionCliente${kValue}`)
    let resLdmProvisoria = document.getElementById(`resLdmProvisoria${kValue}`)
    let resAv100Diseno = document.getElementById(`resAv100Diseno${kValue}`)
    let resAprobadoCliente = document.getElementById(`resAprobadoCliente${kValue}`)

    mostrarElementoDisenoSegunda(
        arrayFromValues,
        arrayFromValuesIcon,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resRevisionCliente,
        resLdmProvisoria,
        resAv100Diseno,
        resAprobadoCliente)
    }

// Función para mostrar el elemento siguiente
function mostrarSiguienteDisenoSegunda(arrayFromValues, arrayFromValuesIcon, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)
    
    let resRevisionCliente = document.getElementById(`resRevisionCliente${kValue}`)
    let resLdmProvisoria = document.getElementById(`resLdmProvisoria${kValue}`)
    let resAv100Diseno = document.getElementById(`resAv100Diseno${kValue}`)
    let resAprobadoCliente = document.getElementById(`resAprobadoCliente${kValue}`)

    mostrarElementoDisenoSegunda(
        arrayFromValues,
        arrayFromValuesIcon,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resRevisionCliente,
        resLdmProvisoria,
        resAv100Diseno,
        resAprobadoCliente)
}
//*********** End Evento btn anterior y siguiente ********* */


//************ ToolTip btn-Arrows anterior/Siguiente -----------
let spanResDisenoSegundaRev100 = Array.from(document.querySelectorAll('span[name="resRevisionAv100Diseno"]'))

spanResDisenoSegundaRev100.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionAv100Diseno':
                regex = /^resRevisionAv100Diseno/;
            break;
            default:
            break;
        }

        // Eliminar el texto inicial de la cadena
        var idFinalInputs = idSpotSelected.replace(regex, '');
        
        let inputSpotEstado = document.getElementById(`resHidden${idFinalInputs}`).value
        let inputSpotIndex = document.getElementById(`resIndexHidden${idFinalInputs}`).value
        let inputSpotRevision = document.getElementById(`resRevisionHidden${idFinalInputs}`).value
        let inputSpotCreador = document.getElementById(`arrResCreadorHidden${idFinalInputs}`).value
        let inputSpotModificador = document.getElementById(`arrResModificadorHidden${idFinalInputs}`).value
        let inputSpotFecha = document.getElementById(`arrResFechaHidden${idFinalInputs}`).value
        let inputSpotFechaModificacion = document.getElementById(`arrResFechaModificacionHidden${idFinalInputs}`).value
        
        let arrayFromSpotEstado = inputSpotEstado.split(",")
        let arrayFromSpotRevision = inputSpotRevision.split(",")
        let arrayFromSpotCreador = inputSpotCreador.split(",")
        let arrayFromSpotModificador = inputSpotModificador.split(",")
        let arrayFromSpotFecha = inputSpotFecha.split(",")
        let arrayFromSpotFechaModificacion = inputSpotFechaModificacion.split(",")

        function changeIconAvanceFromSingle(value) {
            value > 0 && value < 100 ? value = 'default' : null

            const valueEstadoMap = {
                100 : '<i class="fa-solid fa-circle-check fa-lg" style="color: #06ae00;"></i>',
                0 : '<i class="fa-solid fa-spinner fa-lg fa-spin-pulse"style="color: #ff0000f5;"></i>', 
                'default' : '<i class="fa-solid fa-person-digging fa-lg" style="color: #b09b12;"></i>'
            };
            return valueEstadoMap[value];
        }
        
        for (let y=0; arrayFromSpotRevision.length > y; y++) {
            if (inputSpotIndex == y) {
                spanSpot.setAttribute("valueEstadoNumber", arrayFromSpotEstado[y])
                spanSpot.setAttribute("valueEstadoIcon", changeIconAvanceFromSingle(arrayFromSpotEstado[y]))
                spanSpot.setAttribute("valueRevision", arrayFromSpotRevision[y])
                spanSpot.setAttribute("valueCreador", arrayFromSpotCreador[y])
                spanSpot.setAttribute("valueFecha", arrayFromSpotFecha[y])
                spanSpot.setAttribute("valueModificador", arrayFromSpotModificador[y])
                spanSpot.setAttribute("valueFechaMod", arrayFromSpotFechaModificacion[y])
            }

            tippy(spanSpot, {
                content: `Revision: ${spanSpot.getAttribute("valueRevision")}<br>
                        Estado: ${spanSpot.getAttribute("valueEstadoNumber")}% / ${spanSpot.getAttribute("valueEstadoIcon")}<br>
                        Creado por: ${spanSpot.getAttribute("valueCreador")}<br>
                        Fecha creac.: ${spanSpot.getAttribute("valueFecha")}<br>
                        Modificado por: ${spanSpot.getAttribute("valueModificador")}<br>
                        Fecha mod.: ${spanSpot.getAttribute("valueFechaMod")}`,
                allowHTML: true,
                maxWidth: 350,
                arrow: true,
                animation: 'scale-extreme',
                theme: 'material',
                interactive: false,
                hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
            })
        }
    })
})
//************ End ToolTip btn-Arrows anterior/Siguiente -----------

//************ ToolTip btn-Arrows anterior/Siguiente -----------
let spanResDisenoSegunda = Array.from(document.querySelectorAll('span[name="resRevisionRevisionCliente"],span[name="resRevisionLdmProvisoria"],span[name="resRevisionAprobadoCliente"]'))

spanResDisenoSegunda.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionRevisionCliente':
                regex = /^resRevisionRevisionCliente/;
            break;
            case 'resRevisionLdmProvisoria':
                regex = /^resRevisionLdmProvisoria/;
            break;
            case 'resRevisionAprobadoCliente':
                regex = /^resRevisionAprobadoCliente/;
            break;
            default:
                break;
        }

        // Eliminar el texto inicial de la cadena
        var idFinalInputs = idSpotSelected.replace(regex, '');
        
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