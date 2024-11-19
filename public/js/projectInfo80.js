let arrBtnAnteriorLdmAvanceCG = [], arrBtnSiguienteLdmAvanceCG = [], 
    arrBtnAnteriorLdmAvanceTD2 = [], arrBtnSiguienteLdmAvanceTD2 = [],
    arrBtnAnterior80Ldm = [], arrBtnSiguiente80Ldm = [],
    arrBtnAnteriorInfoModelo = [], arrBtnSiguienteInfoModelo = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdLdmAvanceCG = `btnAnteriorSiguienteLdmAvanceCG${i}_${p}_${q}`;
            const btnIdLdmAvanceTD2 = `btnAnteriorSiguienteLdmAvance2TD${i}_${p}_${q}`;
            const btnId80Ldm = `btnAnteriorSiguiente80Ldm${i}_${p}_${q}`;
            const btnIdInfoModelo = `btnAnteriorSiguienteInfoModelo${i}_${p}_${q}`;

            const btnElementLdmAvanceCG = document.getElementById(btnIdLdmAvanceCG);
            if ( btnElementLdmAvanceCG) {
                arrBtnAnteriorLdmAvanceCG.push(i)
                arrBtnSiguienteLdmAvanceCG.push(i)
            }

            const btnElementLdmAvanceTD2 = document.getElementById(btnIdLdmAvanceTD2);
            if ( btnElementLdmAvanceTD2) {
                arrBtnAnteriorLdmAvanceTD2.push(i)
                arrBtnSiguienteLdmAvanceTD2.push(i)
            }

            const btnElement80Ldm = document.getElementById(btnId80Ldm);
            if ( btnElement80Ldm) {
                arrBtnAnterior80Ldm.push(i)
                arrBtnSiguiente80Ldm.push(i)
            }

            const btnElementInfoModelo = document.getElementById(btnIdInfoModelo);
            if ( btnElementInfoModelo) {
                arrBtnAnteriorInfoModelo.push(i)
                arrBtnSiguienteInfoModelo.push(i)
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
if(arrBtnAnteriorLdmAvanceCG !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorLdmAvanceCG"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorInfo80(changeValueFromArray(arrayFromValues), '', kValue)
            })
        }
    })
}

if(arrBtnSiguienteLdmAvanceCG !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteLdmAvanceCG"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteInfo80(changeValueFromArray(arrayFromValues), '', kValue) //changeValueFromArrayInfo80
            })
        }
    })
}

if(arrBtnAnteriorLdmAvanceTD2 !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorLdmAvance2TD"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorInfo80(changeValueFromArray(arrayFromValues), '', kValue) //changeValueFromArrayInfo80
            })
        }
    })
}

if(arrBtnSiguienteLdmAvanceTD2 !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteLdmAvance2TD"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteInfo80(changeValueFromArray(arrayFromValues), '', kValue) //changeValueFromArrayInfo80
            })
        }
    })
}

if(arrBtnAnterior80Ldm !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnterior80Ldm"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorInfo80(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguiente80Ldm !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguiente80Ldm"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteInfo80(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo80
            })
        }
    })
}

if(arrBtnAnteriorInfoModelo !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorInfoModelo"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorInfo80(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue) //changeValueFromArrayInfo80
            })
        }
    })
}

if(arrBtnSiguienteInfoModelo !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteInfoModelo"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarSiguienteInfo80(arrayFromValues, changeIconAvanceFromArray(arrayFromValues), kValue)
            })
        }
    })
}

// Mostrar el elemento actual en la página
function mostrarElementoInfo80(
    arrayFromValues,
    arrayFromValuesIcon,
    arrValuesRevisionMark,
    indiceAMostrar,
    kValue,
    resLdmAvanceCG,
    resLdmAvanceTD2,
    res80Ldm,
    resInfoModelo) {
    
    // console.log('kValue', kValue)
    let btnAnteriorLdmAvanceCG, btnSiguienteLdmAvanceCG, containerBtnAnteriorSiguienteLdmAvanceCG
    let btnAnteriorLdmAvanceTD2, btnSiguienteLdmAvanceTD2, containerBtnAnteriorSiguienteLdmAvanceTD2
    let btnAnterior80Ldm, btnSiguiente80Ldm, containerBtnAnteriorSiguiente80Ldm
    let btnAnteriorInfoModelo, btnSiguienteInfoModelo, containerBtnAnteriorSiguienteInfoModelo

    if (resLdmAvanceCG) {
        let spanLdmAvanceCG = document.getElementById(`resLdmAvanceCG${kValue}`)
        let spanRevisionLdmAvanceCG = document.getElementById(`resRevisionLdmAvanceCG${kValue}`)
        spanLdmAvanceCG.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionLdmAvanceCG.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorLdmAvanceCG = document.getElementById(`btnAnteriorLdmAvanceCG${kValue}`)
        btnSiguienteLdmAvanceCG = document.getElementById(`btnSiguienteLdmAvanceCG${kValue}`)
        containerBtnAnteriorSiguienteLdmAvanceCG = document.getElementById(`btnAnteriorSiguienteLdmAvanceCG${kValue}`)

    } else if (resLdmAvanceTD2) {
        let spanLdmAvanceTD2 = document.getElementById(`resLdmAvance2TD${kValue}`)
        let spanRevisionLdmAvanceTD2 = document.getElementById(`resRevisionLdmAvance2TD${kValue}`)
        spanLdmAvanceTD2.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionLdmAvanceTD2.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorLdmAvanceTD2 = document.getElementById(`btnAnteriorLdmAvance2TD${kValue}`)
        btnSiguienteLdmAvanceTD2 = document.getElementById(`btnSiguienteLdmAvance2TD${kValue}`)
        containerBtnAnteriorSiguienteLdmAvanceTD2 = document.getElementById(`btnAnteriorSiguienteLdmAvance2TD${kValue}`)

    } else if (res80Ldm) {
        let spanLdm80 = document.getElementById(`res80Ldm${kValue}`)
        let spanRevisionLdm80 = document.getElementById(`resRevision80Ldm${kValue}`)
        spanLdm80.innerHTML = ''
        spanLdm80.innerHTML = arrayFromValues[parseInt(indiceAMostrar)]+'% '+ arrayFromValuesIcon[parseInt(indiceAMostrar)]
        spanRevisionLdm80.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnterior80Ldm = document.getElementById(`btnAnterior80Ldm${kValue}`)
        btnSiguiente80Ldm = document.getElementById(`btnSiguiente80Ldm${kValue}`)
        containerBtnAnteriorSiguiente80Ldm = document.getElementById(`btnAnteriorSiguiente80Ldm${kValue}`)

    } else if (resInfoModelo) {
        let spanInfoModelo = document.getElementById(`resInfoModelo${kValue}`)
        let spanRevisionInfoModelo = document.getElementById(`resRevisionInfoModelo${kValue}`)
        spanInfoModelo.innerHTML = ''
        spanInfoModelo.innerHTML = arrayFromValues[parseInt(indiceAMostrar)]+'% '+ arrayFromValuesIcon[parseInt(indiceAMostrar)]
        spanRevisionInfoModelo.innerText = arrValuesRevisionMark[parseInt(indiceAMostrar)]

        btnAnteriorInfoModelo = document.getElementById(`btnAnteriorInfoModelo${kValue}`)
        btnSiguienteInfoModelo = document.getElementById(`btnSiguienteInfoModelo${kValue}`)
        containerBtnAnteriorSiguienteInfoModelo = document.getElementById(`btnAnteriorSiguienteInfoModelo${kValue}`)
    }
    
    function colorSpanInfo80(spanElementInfo80) {
        const classMap = {
            "OK": { bgClass: "bg-success", textClass: "text-white" },
            "No OK": { bgClass: "bg-danger", textClass: "text-white" },
            "Pendiente": { bgClass: "bg-warning", textClass: "text-dark" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        if (spanElementInfo80) {
            spanElementInfo80.classList.remove(...defaultClasses);
        }
    
        const text = spanElementInfo80.innerText;
        if (classMap[text]) {
            spanElementInfo80.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }

    function agregarEstiloRevPasadasInfo80 (containerBtnAnteriorSiguienteInfo80) {
        containerBtnAnteriorSiguienteInfo80.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasInfo80 (containerBtnAnteriorSiguienteInfo80) {
        containerBtnAnteriorSiguienteInfo80.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementLdmAvanceCG, spanElementLdmAvanceTD2, spanElement80Ldm, spanElementInfoModelo
    resLdmAvanceCG ? spanElementLdmAvanceCG = resLdmAvanceCG : null
    resLdmAvanceTD2 ? spanElementLdmAvanceTD2 = resLdmAvanceTD2 : null
    res80Ldm ? spanElement80Ldm = res80Ldm : null
    resInfoModelo ? spanElementInfoModelo = resInfoModelo : null
    
    if (indiceAMostrar == 0) {
        if (btnAnteriorLdmAvanceCG && btnSiguienteLdmAvanceCG) {
            colorSpanInfo80(spanElementLdmAvanceCG)
            btnAnteriorLdmAvanceCG.disabled = true
            btnSiguienteLdmAvanceCG.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteLdmAvanceCG)
        }

        if (btnAnteriorLdmAvanceTD2 && btnSiguienteLdmAvanceTD2) {
            colorSpanInfo80(spanElementLdmAvanceTD2)
            btnAnteriorLdmAvanceTD2.disabled = true
            btnSiguienteLdmAvanceTD2.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteLdmAvanceTD2)
        }

        if (btnAnterior80Ldm && btnSiguiente80Ldm) {
            colorSpanInfo80(spanElement80Ldm)
            btnAnterior80Ldm.disabled = true
            btnSiguiente80Ldm.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguiente80Ldm)
        }

        if (btnAnteriorInfoModelo && btnSiguienteInfoModelo) {
            colorSpanInfo80(spanElementInfoModelo)
            btnAnteriorInfoModelo.disabled = true
            btnSiguienteInfoModelo.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteInfoModelo)
        }

    } else if (indiceAMostrar == arrayFromValues.length-1) {
        if (btnAnteriorLdmAvanceCG && btnSiguienteLdmAvanceCG) {
            colorSpanInfo80(spanElementLdmAvanceCG)
            btnAnteriorLdmAvanceCG.removeAttribute('disabled')
            btnSiguienteLdmAvanceCG.disabled = true
            eliminarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteLdmAvanceCG)
        }

        if (btnAnteriorLdmAvanceTD2 && btnSiguienteLdmAvanceTD2) {
            colorSpanInfo80(spanElementLdmAvanceTD2)
            btnAnteriorLdmAvanceTD2.removeAttribute('disabled')
            btnSiguienteLdmAvanceTD2.disabled = true
            eliminarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteLdmAvanceTD2)
        }

        if (btnAnterior80Ldm && btnSiguiente80Ldm) {
            colorSpanInfo80(spanElement80Ldm)
            btnAnterior80Ldm.removeAttribute('disabled')
            btnSiguiente80Ldm.disabled = true
            eliminarEstiloRevPasadasInfo80(containerBtnAnteriorSiguiente80Ldm)
        }

        if (btnAnteriorInfoModelo && btnSiguienteInfoModelo) {
            colorSpanInfo80(spanElementInfoModelo)
            btnAnteriorInfoModelo.removeAttribute('disabled')
            btnSiguienteInfoModelo.disabled = true
            eliminarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteInfoModelo)
        }

    } else {
        if (btnAnteriorLdmAvanceCG && btnSiguienteLdmAvanceCG) {
            colorSpanInfo80(spanElementLdmAvanceCG)
            btnAnteriorLdmAvanceCG.removeAttribute('disabled')
            btnSiguienteLdmAvanceCG.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteLdmAvanceCG)
        }

        if (btnAnteriorLdmAvanceTD2 && btnSiguienteLdmAvanceTD2) {
            colorSpanInfo80(spanElementLdmAvanceTD2)
            btnAnteriorLdmAvanceTD2.removeAttribute('disabled')
            btnSiguienteLdmAvanceTD2.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteLdmAvanceTD2)
        }

        if (btnAnterior80Ldm && btnSiguiente80Ldm) {
            colorSpanInfo80(spanElement80Ldm)
            btnAnterior80Ldm.removeAttribute('disabled')
            btnSiguiente80Ldm.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguiente80Ldm)
        }

        if (btnAnteriorInfoModelo && btnSiguienteInfoModelo) {
            colorSpanInfo80(spanElementInfoModelo)
            btnAnteriorInfoModelo.removeAttribute('disabled')
            btnSiguienteInfoModelo.removeAttribute('disabled')
            agregarEstiloRevPasadasInfo80(containerBtnAnteriorSiguienteInfoModelo)
        }
    }
}

// Función para mostrar el elemento anterior
function mostrarAnteriorInfo80(arrayFromValues, arrayFromValuesIcon, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues - 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resLdmAvanceCG = document.getElementById(`resLdmAvanceCG${kValue}`)
    let resLdmAvanceTD2 = document.getElementById(`resLdmAvance2TD${kValue}`)
    let res80Ldm = document.getElementById(`res80Ldm${kValue}`)
    let resInfoModelo = document.getElementById(`resInfoModelo${kValue}`)

    mostrarElementoInfo80(
        arrayFromValues,
        arrayFromValuesIcon,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resLdmAvanceCG,
        resLdmAvanceTD2,
        res80Ldm,
        resInfoModelo)
    }

// Función para mostrar el elemento siguiente
function mostrarSiguienteInfo80(arrayFromValues, arrayFromValuesIcon, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)
    
    let indiceAMostrar = parseInt(lastIndexArrayFromValues + 1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let revisionMark = document.getElementById(`resRevisionHidden${kValue}`)
    let valuesRevisionMark = revisionMark.value
    let arrValuesRevisionMark = valuesRevisionMark.split(',')
    // console.log('arrValuesRevisionMark: ', arrValuesRevisionMark)

    let resLdmAvanceCG = document.getElementById(`resLdmAvanceCG${kValue}`)
    let resLdmAvanceTD2 = document.getElementById(`resLdmAvance2TD${kValue}`)
    let res80Ldm = document.getElementById(`res80Ldm${kValue}`)
    let resInfoModelo = document.getElementById(`resInfoModelo${kValue}`)

    mostrarElementoInfo80(
        arrayFromValues,
        arrayFromValuesIcon,
        arrValuesRevisionMark,
        indiceAMostrar,
        kValue,
        resLdmAvanceCG,
        resLdmAvanceTD2,
        res80Ldm,
        resInfoModelo
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//******LdmAvanceCG + LdmAvanceTD2 ***** */
let spanResInfo80Ldm = Array.from(document.querySelectorAll('span[name="resRevisionLdmAvanceCG"],span[name="resRevisionLdmAvance2TD"]'))


spanResInfo80Ldm.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionLdmAvanceCG':
                regex = /^resRevisionLdmAvanceCG/;
            break;
            case 'resRevisionLdmAvance2TD':
                regex = /^resRevisionLdmAvance2TD/;
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
//************ End ToolTip btn-Arrows Anterior/Siguiente -----------

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** Ldm80 + InfoModelo ***** */
let spanResInfo80Avance = Array.from(document.querySelectorAll('span[name="resRevision80Ldm"],span[name="resRevisionInfoModelo"]'))

spanResInfo80Avance.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        var regex
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevision80Ldm':
                regex = /^resRevision80Ldm/;
            break;
            case 'resRevisionInfoModelo':
                regex = /^resRevisionInfoModelo/;
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