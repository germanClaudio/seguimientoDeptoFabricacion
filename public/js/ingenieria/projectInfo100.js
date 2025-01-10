let arrBtnAnterior100Ldm = [], arrBtnSiguiente100Ldm = [],
arrBtnAnterior100Info = [], arrBtnSiguiente100Info = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnId100Ldm = `btnAnteriorSiguiente100Ldm${i}_${p}_${q}`;
            const btnId100Info = `btnAnteriorSiguiente100Info${i}_${p}_${q}`;

            const btnElement100Ldm = document.getElementById(btnId100Ldm);
            if ( btnElement100Ldm) {
                arrBtnAnterior100Ldm.push(i)
                arrBtnSiguiente100Ldm.push(i)
            }

            const btnElement100Info = document.getElementById(btnId100Info);
            if ( btnElement100Info) {
                arrBtnAnterior100Info.push(i)
                arrBtnSiguiente100Info.push(i)
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
if(arrBtnAnterior100Ldm !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior100Ldm"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorInfo100(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo100
            })
        }
    })
}

if(arrBtnSiguiente100Ldm !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente100Ldm"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteInfo100(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo100
            })
        }
    })
}

if(arrBtnAnterior100Info !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior100Info"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorInfo100(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo100
            })
        }
    })
}

if(arrBtnSiguiente100Info !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente100Info"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteInfo100(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo100
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoInfo100(
    arrayFromValues,
    arrayFromValuesIcon,
    arrValuesRevisionMark,
    indiceAMostrar,    
    kValue,
    res100Ldm,
    res100Info) {
    
    // console.log('kValue', kValue)
    let btnAnteriorLdm100, btnSiguienteLdm100, containerBtnAnteriorSiguienteLdm100
    let btnAnteriorInfo100, btnSiguienteInfo100, containerBtnAnteriorSiguienteInfo100

    if (res100Ldm) {
        let spanLdm100 = document.getElementById(`res100Ldm${kValue}`)
        let spanRevisionLdm100 = document.getElementById(`resRevision100Ldm${kValue}`)
        spanLdm100.innerHTML = ''
        spanLdm100.innerHTML = arrayFromValues[parseInt(indiceAMostrar)]+'% '+ arrayFromValuesIcon[parseInt(indiceAMostrar)]
        spanRevisionLdm100.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorLdm100 = document.getElementById(`btnAnterior100Ldm${kValue}`)
        btnSiguienteLdm100 = document.getElementById(`btnSiguiente100Ldm${kValue}`)
        containerBtnAnteriorSiguienteLdm100 = document.getElementById(`btnAnteriorSiguiente100Ldm${kValue}`)

    } else if (res100Info) {
        let spanInfo100 = document.getElementById(`res100Info${kValue}`)
        let spanRevisionInfo100 = document.getElementById(`resRevision100Info${kValue}`)
        spanInfo100.innerHTML = ''
        spanInfo100.innerHTML = arrayFromValues[parseInt(indiceAMostrar)]+'% '+ arrayFromValuesIcon[parseInt(indiceAMostrar)]
        spanRevisionInfo100.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorInfo100 = document.getElementById(`btnAnterior100Info${kValue}`)
        btnSiguienteInfo100 = document.getElementById(`btnSiguiente100Info${kValue}`)
        containerBtnAnteriorSiguienteInfo100 = document.getElementById(`btnAnteriorSiguiente100Info${kValue}`)
    }
    
    function colorSpanInfo100(spanElementInfo100) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElementInfo100) {
            spanElementInfo100.classList.remove(...defaultClasses);
        }
    
        const text = spanElementInfo100.innerText;
        if (classMap[text]) {
            spanElementInfo100.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadasInfo100 (containerBtnAnteriorSiguienteInfo100) {
        containerBtnAnteriorSiguienteInfo100.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasInfo100 (containerBtnAnteriorSiguienteInfo100) {
        containerBtnAnteriorSiguienteInfo100.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementLdm100, spanElementInfo100
    res100Ldm ? spanElementLdm100 = res100Ldm : null
    res100Info ? spanElementInfo100 = res100Info : null
    
    if (indiceAMostrar == 0) {
        if (btnAnteriorLdm100 && btnSiguienteLdm100) {
            colorSpanInfo100(spanElementLdm100)
            btnAnteriorLdm100.disabled = 'true'
            btnSiguienteLdm100.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteLdm100)
        }

        if (btnAnteriorInfo100 && btnSiguienteInfo100) {
            colorSpanInfo100(spanElementInfo100)
            btnAnteriorInfo100.disabled = 'true'
            btnSiguienteInfo100.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteInfo100)
        }

    } else if (indiceAMostrar == arrayFromValues.length-1) {
        if (btnAnteriorLdm100 && btnSiguienteLdm100) {
            colorSpanInfo100(spanElementLdm100)
            btnAnteriorLdm100.removeAttribute('disabled')
            btnSiguienteLdm100.disabled = true
            eliminarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteLdm100)
        }

        if (btnAnteriorInfo100 && btnSiguienteInfo100) {
            colorSpanInfo100(spanElementInfo100)
            btnAnteriorInfo100.removeAttribute('disabled')
            btnSiguienteInfo100.disabled = true
            eliminarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteInfo100)
        }

    } else {
        if (btnAnteriorLdm100 && btnSiguienteLdm100) {
            colorSpanInfo100(spanElementLdm100)
            btnAnteriorLdm100.removeAttribute('disabled')
            btnSiguienteLdm100.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteLdm100)
        }
        
        if (btnAnteriorInfo100 && btnSiguienteInfo100) {
            colorSpanInfo100(spanElementInfo100)
            btnAnteriorInfo100.removeAttribute('disabled')
            btnSiguienteInfo100.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo100(containerBtnAnteriorSiguienteInfo100)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorInfo100(arrayFromValues, arrayFromValuesIcon, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let res100Ldm = document.getElementById(`res100Ldm${kValue}`)
    let res100Info = document.getElementById(`res100Info${kValue}`)

    mostrarElementoInfo100(
        arrayFromValues,
        arrayFromValuesIcon,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        res100Ldm,
        res100Info)
    }

// Función para mostrar el elemento siguiente
function mostrarSiguienteInfo100(arrayFromValues, arrayFromValuesIcon, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let res100Ldm = document.getElementById(`res100Ldm${kValue}`)
    let res100Info = document.getElementById(`res100Info${kValue}`)

    mostrarElementoInfo100(
        arrayFromValues,
        arrayFromValuesIcon,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        res100Ldm,
        res100Info
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** Ldm100 + Info100 ***** */
let spanResInfo100 = Array.from(document.querySelectorAll('span[name="resRevision100Ldm"],span[name="resRevision100Info"]'))


spanResInfo100.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevision100Ldm':
                regex = /^resRevision100Ldm/;
            break;
            case 'resRevision100Info':
                regex = /^resRevision100Info/;
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
//************ End ToolTip btn-Arrows Anterior/Siguiente -----------