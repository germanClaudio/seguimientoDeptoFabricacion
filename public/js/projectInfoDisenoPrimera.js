let arrBtnAnteriorAvDiseno = [], arrBtnSiguienteAvDiseno = [],
arrBtnAnteriorPrimerRev50 = [], arrBtnSiguientePrimerRev50 = [],
arrBtnAnteriorSegundaRev80 = [], arrBtnSiguienteSegundaRev80 = [],
arrBtnAnteriorEnvCliente = [], arrBtnSiguienteEnvCliente = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdAvDiseno = `btnAnteriorSiguienteAvDiseno${i}_${p}_${q}`;
            const btnIdPrimerRev50 = `btnAnteriorSiguientePrimer50Rev${i}_${p}_${q}`;
            const btnIdSegundaRev80 = `btnAnteriorSiguienteSegunda80Rev${i}_${p}_${q}`;
            const btnIdEnvCliente = `btnAnteriorSiguienteEnvCliente${i}_${p}_${q}`;

            const btnElementAvDiseno = document.getElementById(btnIdAvDiseno);
            if (btnElementAvDiseno) {
                arrBtnAnteriorAvDiseno.push(i)
                arrBtnSiguienteAvDiseno.push(i)
            }

            const btnElementPrimerRev50 = document.getElementById(btnIdPrimerRev50);
            if (btnElementPrimerRev50) {
                arrBtnAnteriorPrimerRev50.push(i)
                arrBtnSiguientePrimerRev50.push(i)
            }

            const btnElementSegundaRev80 = document.getElementById(btnIdSegundaRev80);
            if (btnElementSegundaRev80) {
                arrBtnAnteriorSegundaRev80.push(i)
                arrBtnSiguienteSegundaRev80.push(i)
            }

            const btnElementEnvCliente = document.getElementById(btnIdEnvCliente);
            if (btnElementEnvCliente) {
                arrBtnAnteriorEnvCliente.push(i)
                arrBtnSiguienteEnvCliente.push(i)
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
if(arrBtnAnteriorAvDiseno !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorAvDiseno"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoPrimera(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteAvDiseno !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteAvDiseno"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoPrimera(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorPrimerRev50 !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorPrimer50Rev"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoPrimera(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnSiguientePrimerRev50 !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguientePrimer50Rev"]')    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoPrimera(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnAnteriorSegundaRev80 !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorSegunda80Rev"]')    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoPrimera(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnSiguienteSegundaRev80 !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteSegunda80Rev"]')    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoPrimera(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnAnteriorEnvCliente !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorEnvCliente"]')    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDisenoPrimera(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnSiguienteEnvCliente !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteEnvCliente"]')    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteDisenoPrimera(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoDisenoPrimera(
    arrayFromValues,
    arrayFromValuesIcon,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resAvDiseno,
    resPrimerRevision50,
    resSegundaRevision80,
    resEnvioCliente) {
    // console.log('resProcesoDisenoPrimera: ', resProcesoDisenoPrimera, 'resHorasProcesoDisenoPrimera: ', resHorasProcesoDisenoPrimera)
    // console.log('kValue', kValue)

    let btnAnteriorAvDiseno, btnSiguienteAvDiseno, containerBtnAnteriorSiguienteAvDiseno
    let btnAnteriorPrimerRev50, btnSiguientePrimerRev50, containerBtnAnteriorSiguientePrimerRev50
    let btnAnteriorSegundaRev80, btnSiguienteSegundaRev80, containerBtnAnteriorSiguienteSegundaRev80
    let btnAnteriorEnvCliente, btnSiguienteEnvCliente, containerBtnAnteriorSiguienteEnvCliente
    
    if (resAvDiseno) {
        let spanAvDiseno = document.getElementById(`resAvDiseno${kValue}`)
        let spanRevisionAvDiseno = document.getElementById(`resRevisionAvDiseno${kValue}`)
        spanAvDiseno.innerHTML = ''
        spanAvDiseno.innerHTML = arrayFromValues[parseInt(indiceAMostrar)]+'% '+ arrayFromValuesIcon[parseInt(indiceAMostrar)]
        spanRevisionAvDiseno.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorAvDiseno = document.getElementById(`btnAnteriorAvDiseno${kValue}`)
        btnSiguienteAvDiseno = document.getElementById(`btnSiguienteAvDiseno${kValue}`)
        containerBtnAnteriorSiguienteAvDiseno = document.getElementById(`btnAnteriorSiguienteAvDiseno${kValue}`)

    } else if (resPrimerRevision50) {
        let spanPrimerRevision50 = document.getElementById(`resPrimer50Rev${kValue}`)
        let spanRevisionPrimerRevision50 = document.getElementById(`resRevisionPrimer50Rev${kValue}`)
        spanPrimerRevision50.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionPrimerRevision50.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorPrimerRev50 = document.getElementById(`btnAnteriorPrimer50Rev${kValue}`)
        btnSiguientePrimerRev50 = document.getElementById(`btnSiguientePrimer50Rev${kValue}`)
        containerBtnAnteriorSiguientePrimerRev50 = document.getElementById(`btnAnteriorSiguientePrimer50Rev${kValue}`)

    } else if (resSegundaRevision80) {
        let spanSegundaRevision80 = document.getElementById(`resSegunda80Rev${kValue}`)
        let spanRevisionSegundaRevision80 = document.getElementById(`resRevisionSegunda80Rev${kValue}`)
        spanSegundaRevision80.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionSegundaRevision80.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorSegundaRev80 = document.getElementById(`btnAnteriorSegunda80Rev${kValue}`)
        btnSiguienteSegundaRev80 = document.getElementById(`btnSiguienteSegunda80Rev${kValue}`)
        containerBtnAnteriorSiguienteSegundaRev80 = document.getElementById(`btnAnteriorSiguienteSegunda80Rev${kValue}`)

    } else if (resEnvioCliente) {
        let spanEnvCliente = document.getElementById(`resEnvCliente${kValue}`)
        let spanRevisionEnvCliente = document.getElementById(`resRevisionEnvCliente${kValue}`)
        spanEnvCliente.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionEnvCliente.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorEnvCliente = document.getElementById(`btnAnteriorEnvCliente${kValue}`)
        btnSiguienteEnvCliente = document.getElementById(`btnSiguienteEnvCliente${kValue}`)
        containerBtnAnteriorSiguienteEnvCliente = document.getElementById(`btnAnteriorSiguienteEnvCliente${kValue}`)
    }
    
    function colorSpanDisenoPrimera(spanElementDisenoPrimera) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElementDisenoPrimera) {
            spanElementDisenoPrimera.classList.remove(...defaultClasses);
        }
    
        const text = spanElementDisenoPrimera.innerText;
        if (classMap[text]) {
            spanElementDisenoPrimera.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadasDisenoPrimera (containerBtnAnteriorSiguienteDisenoPrimera) {
        containerBtnAnteriorSiguienteDisenoPrimera.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasDisenoPrimera (containerBtnAnteriorSiguienteDisenoPrimera) {
        containerBtnAnteriorSiguienteDisenoPrimera.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementAvDiseno, spanElementPrimerRev50, spanElementSegundaRev80, spanElementEnvCliente
    resAvDiseno ? spanElementAvDiseno = resAvDiseno : null
    resPrimerRevision50 ? spanElementPrimerRev50 = resPrimerRevision50 : null
    resSegundaRevision80 ? spanElementSegundaRev80 = resSegundaRevision80 : null
    resEnvioCliente ? spanElementEnvCliente = resEnvioCliente : null
    
    if (indiceAMostrar == 0) {
        if (btnAnteriorAvDiseno && btnSiguienteAvDiseno) {
            colorSpanDisenoPrimera(spanElementAvDiseno)
            btnAnteriorAvDiseno.disabled = 'true'
            btnSiguienteAvDiseno.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteAvDiseno)
        }

        if (btnAnteriorPrimerRev50 && btnSiguientePrimerRev50) {
            colorSpanDisenoPrimera(spanElementPrimerRev50)
            btnAnteriorPrimerRev50.disabled = 'true'
            btnSiguientePrimerRev50.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguientePrimerRev50)
        }

        if (btnAnteriorSegundaRev80 && btnSiguienteSegundaRev80) {
            colorSpanDisenoPrimera(spanElementSegundaRev80)
            btnAnteriorSegundaRev80.disabled = 'true'
            btnSiguienteSegundaRev80.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteSegundaRev80)
        }

        if (btnAnteriorEnvCliente && btnSiguienteEnvCliente) {
            colorSpanDisenoPrimera(spanElementEnvCliente)
            btnAnteriorEnvCliente.disabled = 'true'
            btnSiguienteEnvCliente.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteEnvCliente)
        }

    } else if (indiceAMostrar == arrayFromValues.length-1) {
        if (btnAnteriorAvDiseno && btnSiguienteAvDiseno) {
            colorSpanDisenoPrimera(spanElementAvDiseno)
            btnAnteriorAvDiseno.removeAttribute('disabled')
            btnSiguienteAvDiseno.disabled = true
            eliminarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteAvDiseno)
        }

        if (btnAnteriorPrimerRev50 && btnSiguientePrimerRev50) {
            colorSpanDisenoPrimera(spanElementPrimerRev50)
            btnAnteriorPrimerRev50.removeAttribute('disabled')
            btnSiguientePrimerRev50.disabled = true
            eliminarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguientePrimerRev50)
        }
        
        if (btnAnteriorSegundaRev80 && btnSiguienteSegundaRev80) {
            colorSpanDisenoPrimera(spanElementSegundaRev80)
            btnAnteriorSegundaRev80.removeAttribute('disabled')
            btnSiguienteSegundaRev80.disabled = true
            eliminarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteSegundaRev80)
        }

        if (btnAnteriorEnvCliente && btnSiguienteEnvCliente) {
            colorSpanDisenoPrimera(spanElementEnvCliente)
            btnAnteriorEnvCliente.removeAttribute('disabled')
            btnSiguienteEnvCliente.disabled = true
            eliminarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteEnvCliente)
        }

    } else {
        if (btnAnteriorAvDiseno && btnSiguienteAvDiseno) {
            colorSpanDisenoPrimera(spanElementAvDiseno)
            btnAnteriorAvDiseno.removeAttribute('disabled')
            btnSiguienteAvDiseno.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteAvDiseno)
        }
        
        if (btnAnteriorPrimerRev50 && btnSiguientePrimerRev50) {
            colorSpanDisenoPrimera(spanElementPrimerRev50)
            btnAnteriorPrimerRev50.removeAttribute('disabled')
            btnSiguientePrimerRev50.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguientePrimerRev50)
        }
                
        if (btnAnteriorSegundaRev80 && btnSiguienteSegundaRev80) {
            colorSpanDisenoPrimera(spanElementSegundaRev80)
            btnAnteriorSegundaRev80.removeAttribute('disabled')
            btnSiguienteSegundaRev80.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteSegundaRev80)
        }
        
        if (btnAnteriorEnvCliente && btnSiguienteEnvCliente) {
            colorSpanDisenoPrimera(spanElementEnvCliente)
            btnAnteriorEnvCliente.removeAttribute('disabled')
            btnSiguienteEnvCliente.removeAttribute('disabled')
            agregarEstiloRevPasadasDisenoPrimera(containerBtnAnteriorSiguienteEnvCliente)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorDisenoPrimera(arrayFromValues, arrayFromValuesIcon, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resAvDiseno = document.getElementById(`resAvDiseno${kValue}`)
    let resPrimerRev50 = document.getElementById(`resPrimer50Rev${kValue}`)
    let resSegundaRev80 = document.getElementById(`resSegunda80Rev${kValue}`)
    let resEnvioCliente = document.getElementById(`resEnvCliente${kValue}`)

    mostrarElementoDisenoPrimera(
        arrayFromValues,
        arrayFromValuesIcon,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resAvDiseno,
        resPrimerRev50,
        resSegundaRev80,
        resEnvioCliente)
    }

// Función para mostrar el elemento siguiente
function mostrarSiguienteDisenoPrimera(arrayFromValues, arrayFromValuesIcon, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)
    
    let resAvDiseno = document.getElementById(`resAvDiseno${kValue}`)
    let resPrimerRev50 = document.getElementById(`resPrimer50Rev${kValue}`)
    let resSegundaRev80 = document.getElementById(`resSegunda80Rev${kValue}`)
    let resEnvioCliente = document.getElementById(`resEnvCliente${kValue}`)

    mostrarElementoDisenoPrimera(
        arrayFromValues,
        arrayFromValuesIcon,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resAvDiseno,
        resPrimerRev50,
        resSegundaRev80,
        resEnvioCliente)
}
//*********** End Evento btn anterior y siguiente ********* */


//************ ToolTip btn-Arrows anterior/Siguiente -----------
let spanResDisenoPrimeraAvDiseno = Array.from(document.querySelectorAll('span[name="resRevisionAvDiseno"]'))

spanResDisenoPrimeraAvDiseno.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionAvDiseno':
                regex = /^resRevisionAvDiseno/;
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
let spanResDisenoPrimera = Array.from(document.querySelectorAll('span[name="resRevisionPrimer50Rev"],span[name="resRevisionSegunda80Rev"],span[name="resRevisionEnvCliente"]'))

spanResDisenoPrimera.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionPrimer50Rev':
                regex = /^resRevisionPrimer50Rev/;
            break;
            case 'resRevisionSegunda80Rev':
                regex = /^resRevisionSegunda80Rev/;
            break;
            case 'resRevisionEnvCliente':
                regex = /^resRevisionEnvCliente/;
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