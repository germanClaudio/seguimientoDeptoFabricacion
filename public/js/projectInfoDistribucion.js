let arrBtnAnteriorMecanizado2dCompleto = [], arrBtnSiguienteMecanizado2dCompleto = [],
    arrBtnAnteriorMecanizado3dPrefinal = [], arrBtnSiguienteMecanizado3dPrefinal = [],
    arrBtnAnteriorMecanizado3dFinal = [], arrBtnSiguienteMecanizado3dFinal = [],
    arrBtnAnteriorBancoArmado = [], arrBtnSiguienteBancoArmado = []

for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    for (let p = 0; p<varLimMaxOtProyecto; p++) { //variable limite maximo de Ot por proyecto
        for (let q = 0; q<varLimMaxOtProyecto; q++) {
            const btnIdMec2d = `btnAnteriorSiguienteMecanizado2dCompleto${i}_${p}_${q}`;
            const btnIdMec3dPre = `btnAnteriorSiguienteMecanizado3dPrefinal${i}_${p}_${q}`;
            const btnIdMec3dFinal = `btnAnteriorSiguienteMecanizado3dFinal${i}_${p}_${q}`;
            const btnIdBancoArmado = `btnAnteriorSiguienteBancoArmado${i}_${p}_${q}`;

            const btnElementMec2d = document.getElementById(btnIdMec2d);
            if ( btnElementMec2d ) {
                arrBtnAnteriorMecanizado2dCompleto.push(i)
                arrBtnSiguienteMecanizado2dCompleto.push(i)
            }

            const btnElementIdMec3dPre = document.getElementById(btnIdMec3dPre);
            if ( btnElementIdMec3dPre ) {
                arrBtnAnteriorMecanizado3dPrefinal.push(i)
                arrBtnSiguienteMecanizado3dPrefinal.push(i)
            }

            const btnElementIdMec3dFinal = document.getElementById(btnIdMec3dFinal);
            if ( btnElementIdMec3dFinal ) {
                arrBtnAnteriorMecanizado3dFinal.push(i)
                arrBtnSiguienteMecanizado3dFinal.push(i)
            }

            const btnElementIdBancoArmado = document.getElementById(btnIdBancoArmado);
            if ( btnElementIdBancoArmado ) {
                arrBtnAnteriorBancoArmado.push(i)
                arrBtnSiguienteBancoArmado.push(i)
            }
        }
    }
}

//*********** Evento btn's anterior y siguiente ************* */
if(arrBtnAnteriorMecanizado2dCompleto !=[]) {
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorMecanizado2dCompleto"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                //console.log('kValue. ', kValue)
                mostrarAnteriorDistribucion(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteMecanizado2dCompleto !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteMecanizado2dCompleto"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarAnteriorDistribucion(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorMecanizado3dPrefinal !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorMecanizado3dPrefinal"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarAnteriorDistribucion(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteMecanizado3dPrefinal !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteMecanizado3dPrefinal"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguienteDistribucion(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorMecanizado3dFinal !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorMecanizado3dFinal"]')
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarAnteriorDistribucion(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteMecanizado3dFinal !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteMecanizado3dFinal"]')
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguienteDistribucion(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnAnteriorBancoArmado !=[]) {    
    let allBtnAnterior = document.querySelectorAll('[name="btnAnteriorBancoArmado"]')
    
    allBtnAnterior.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarAnteriorDistribucion(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}

if(arrBtnSiguienteBancoArmado !=[]) {    
    let allBtnSiguiente = document.querySelectorAll('[name="btnSiguienteBancoArmado"]')
    
    allBtnSiguiente.forEach(function(btn){
        if (btn.value) {
            btn.addEventListener("click", (event) => {
                let kValue = btn.value
                let arrayActual = document.getElementById(`resHidden${kValue}`)
                let actualValue = arrayActual.value
                let arrayFromValues = actualValue.split(",")
                // console.log('kValue. ', kValue)
                mostrarSiguienteDistribucion(changeValueFromArray(arrayFromValues), kValue)
            })
        }
    })
}


// Mostrar el elemento actual en la página
function mostrarElementoDistribucion(
    arrayFromValues,
    indiceAMostrar,
    kValue,
    resMecanizado2dCompleto,
    resMecanizado3dPrefinal,
    resMecanizado3dFinal,
    resBancoArmado)
    {
    // console.log('resMecanizado2dCompleto: ', resMecanizado2dCompleto, 'resAprobadoMecanizado2dCompleto: ', resAprobadoMecanizado2dCompleto)
    // console.log('kValue', kValue)
    // console.log('arrayFromValues', arrayFromValues)
    
    if (resMecanizado2dCompleto) {
        let spanMecanizado2dCompleto = document.getElementById(`resMecanizado2dCompleto${kValue}`)
        let spanRevisionMecanizado2dCompleto = document.getElementById(`resRevisionMecanizado2dCompleto${kValue}`)
        spanMecanizado2dCompleto.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMecanizado2dCompleto.innerText = parseInt(indiceAMostrar+1)
    } else if (resMecanizado3dPrefinal) {
        let spanMecanizado3dPrefinal = document.getElementById(`resMecanizado3dPrefinal${kValue}`)
        let spanRevisionMecanizado3dPrefinal = document.getElementById(`resRevisionMecanizado3dPrefinal${kValue}`)
        spanMecanizado3dPrefinal.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMecanizado3dPrefinal.innerText = parseInt(indiceAMostrar+1)
    } else if (resMecanizado3dFinal) {
        let spanMecanizado3dFinal = document.getElementById(`resMecanizado3dFinal${kValue}`)
        let spanRevisionMecanizado3dFinal = document.getElementById(`resRevisionMecanizado3dFinal${kValue}`)
        spanMecanizado3dFinal.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionMecanizado3dFinal.innerText = parseInt(indiceAMostrar+1)
    } else if (resBancoArmado) {
        let spanBancoArmado = document.getElementById(`resBancoArmado${kValue}`)
        let spanRevisionBancoArmado = document.getElementById(`resRevisionBancoArmado${kValue}`)
        spanBancoArmado.innerText = arrayFromValues[parseInt(indiceAMostrar)]
        spanRevisionBancoArmado.innerText = parseInt(indiceAMostrar+1)
    }
    
    let btnAnteriorMecanizado2dCompleto = document.getElementById(`btnAnteriorMecanizado2dCompleto${kValue}`)
    let btnSiguienteMecanizado2dCompleto = document.getElementById(`btnSiguienteMecanizado2dCompleto${kValue}`)
    let containerBtnAnteriorSiguienteMecanizado2dCompleto = document.getElementById(`btnAnteriorSiguienteMecanizado2dCompleto${kValue}`)
    
    let btnAnteriorMecanizado3dPrefinal = document.getElementById(`btnAnteriorMecanizado3dPrefinal${kValue}`)
    let btnSiguienteMecanizado3dPrefinal = document.getElementById(`btnSiguienteMecanizado3dPrefinal${kValue}`)
    let containerBtnAnteriorSiguienteMecanizado3dPrefinal = document.getElementById(`btnAnteriorSiguienteMecanizado3dPrefinal${kValue}`)

    let btnAnteriorMecanizado3dFinal = document.getElementById(`btnAnteriorMecanizado3dFinal${kValue}`)
    let btnSiguienteMecanizado3dFinal = document.getElementById(`btnSiguienteMecanizado3dFinal${kValue}`)
    let containerBtnAnteriorSiguienteMecanizado3dFinal = document.getElementById(`btnAnteriorSiguienteMecanizado3dFinal${kValue}`)

    let btnAnteriorBancoArmado = document.getElementById(`btnAnteriorBancoArmado${kValue}`)
    let btnSiguienteBancoArmado = document.getElementById(`btnSiguienteBancoArmado${kValue}`)
    let containerBtnAnteriorSiguienteBancoArmado = document.getElementById(`btnAnteriorSiguienteBancoArmado${kValue}`)


    function colorSpanDistribucion(spanElementDistribucion) {
        const classMap = {
            "PRODISMO": { bgClass: "bg-success", textClass: "text-white" },
            "Terceros": { bgClass: "bg-danger", textClass: "text-white" },
            "S/D": { bgClass: "bg-secondary", textClass: "text-white" },
            "CHINA": { bgClass: "bg-warning", textClass: "text-dark" },
            "N/A": { bgClass: "bg-info", textClass: "text-dark" }
        };
    
        const defaultClasses = ["bg-success", "bg-danger", "bg-warning", "bg-secondary", "bg-info", "text-white", "text-dark"];
        spanElementDistribucion.classList.remove(...defaultClasses);
    
        const text = spanElementDistribucion.innerText;
        if (classMap[text]) {
            spanElementDistribucion.classList.add(classMap[text].bgClass, classMap[text].textClass);
        }
    }
    

    function agregarEstiloRevPasadasDistribucion (containerBtnAnteriorSiguienteMecanizado2dCompleto) {
        containerBtnAnteriorSiguienteMecanizado2dCompleto.classList.add("bg-secondary", "bg-gradient", "bg-opacity-25")
    }

    function eliminarEstiloRevPasadasDistribucion (containerBtnAnteriorSiguienteMecanizado2dCompleto) {
        containerBtnAnteriorSiguienteMecanizado2dCompleto.classList.remove("bg-secondary", "bg-gradient", "bg-opacity-25")
    }
    
    let spanElementMecanizado2dCompleto
    let spanElementMecanizado3dPrefinal
    let spanElementMecanizado3dFinal
    let spanElementBancoArmado
    resMecanizado2dCompleto ? spanElementMecanizado2dCompleto = resMecanizado2dCompleto : null
    resMecanizado3dPrefinal ? spanElementMecanizado3dPrefinal = resMecanizado3dPrefinal : null
    resMecanizado3dFinal ? spanElementMecanizado3dFinal = resMecanizado3dFinal : null
    resBancoArmado ? spanElementBancoArmado = resBancoArmado : null

    // console.log('spanElementMecanizado2dCompleto:', spanElementMecanizado2dCompleto)
    // console.log('indiceaMostar:', indiceAMostrar)

    if (indiceAMostrar === 0) {
        colorSpanDistribucion(spanElementMecanizado2dCompleto)
        btnAnteriorMecanizado2dCompleto.disabled = true
        btnSiguienteMecanizado2dCompleto.removeAttribute('disabled')

        colorSpanDistribucion(spanElementMecanizado3dPrefinal)
        btnAnteriorMecanizado3dPrefinal.disabled = true
        btnSiguienteMecanizado3dPrefinal.removeAttribute('disabled')

        colorSpanDistribucion(spanElementMecanizado3dFinal)
        btnAnteriorMecanizado3dFinal.disabled = true
        btnSiguienteMecanizado3dFinal.removeAttribute('disabled')

        colorSpanDistribucion(spanElementBancoArmado)
        btnAnteriorBancoArmado.disabled = true
        btnSiguienteBancoArmado.removeAttribute('disabled')

    } else if (indiceAMostrar === arrayFromValues.length-1) {
        colorSpanDistribucion(spanElementMecanizado2dCompleto)
        btnAnteriorMecanizado2dCompleto.removeAttribute('disabled')
        btnSiguienteMecanizado2dCompleto.disabled = true
        eliminarEstiloRevPasadasDistribucion(containerBtnAnteriorSiguienteMecanizado2dCompleto)

        colorSpanDistribucion(spanElementMecanizado3dPrefinal)
        btnAnteriorMecanizado3dPrefinal.removeAttribute('disabled')
        btnSiguienteMecanizado3dPrefinal.disabled = true
        eliminarEstiloRevPasadasDistribucion(containerBtnAnteriorSiguienteMecanizado3dPrefinal)

        colorSpanDistribucion(spanElementMecanizado3dFinal)
        btnAnteriorMecanizado3dFinal.removeAttribute('disabled')
        btnSiguienteMecanizado3dFinal.disabled = true
        eliminarEstiloRevPasadasDistribucion(containerBtnAnteriorSiguienteMecanizado3dFinal)

        colorSpanDistribucion(spanElementBancoArmado)
        btnAnteriorBancoArmado.removeAttribute('disabled')
        btnSiguienteBancoArmado.disabled = true
        eliminarEstiloRevPasadasDistribucion(containerBtnAnteriorSiguienteBancoArmado)

    } else {
        colorSpanDistribucion(spanElementMecanizado2dCompleto)
        btnAnteriorMecanizado2dCompleto.removeAttribute('disabled')
        btnSiguienteMecanizado2dCompleto.removeAttribute('disabled')
        agregarEstiloRevPasadasDistribucion(containerBtnAnteriorSiguienteMecanizado2dCompleto)

        colorSpanDistribucion(spanElementMecanizado3dPrefinal)
        btnAnteriorMecanizado3dPrefinal.removeAttribute('disabled')
        btnSiguienteMecanizado3dPrefinal.removeAttribute('disabled')
        agregarEstiloRevPasadasDistribucion(containerBtnAnteriorSiguienteMecanizado3dPrefinal)

        colorSpanDistribucion(spanElementMecanizado3dFinal)
        btnAnteriorMecanizado3dFinal.removeAttribute('disabled')
        btnSiguienteMecanizado3dFinal.removeAttribute('disabled')
        agregarEstiloRevPasadasDistribucion(containerBtnAnteriorSiguienteMecanizado3dFinal)

        colorSpanDistribucion(spanElementBancoArmado)
        btnAnteriorBancoArmado.removeAttribute('disabled')
        btnSiguienteBancoArmado.removeAttribute('disabled')
        agregarEstiloRevPasadasDistribucion(containerBtnAnteriorSiguienteBancoArmado)
    }
}


// Función para mostrar el elemento anterior
function mostrarAnteriorDistribucion(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues-1)
    inputSpotIndex.value = parseInt(indiceAMostrar)

    let resMecanizado2dCompleto = document.getElementById(`resMecanizado2dCompleto${kValue}`)
    let resMecanizado3dPrefinal = document.getElementById(`resMecanizado3dPrefinal${kValue}`)
    let resMecanizado3dFinal = document.getElementById(`resMecanizado3dFinal${kValue}`)
    let resBancoArmado = document.getElementById(`resBancoArmado${kValue}`)

    mostrarElementoDistribucion(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resMecanizado2dCompleto,
        resMecanizado3dPrefinal,
        resMecanizado3dFinal,
        resBancoArmado
    )
}

// Función para mostrar el elemento siguiente
function mostrarSiguienteDistribucion(arrayFromValues, kValue) {
    let inputSpotIndex = document.getElementById(`resIndexHidden${kValue}`)
    let lastIndexArrayFromValues = parseInt(inputSpotIndex.value)

    let indiceAMostrar = parseInt(lastIndexArrayFromValues+1)
    inputSpotIndex.value =  parseInt(indiceAMostrar)

    let resMecanizado2dCompleto = document.getElementById(`resMecanizado2dCompleto${kValue}`)
    let resMecanizado3dPrefinal = document.getElementById(`resMecanizado3dPrefinal${kValue}`)
    let resMecanizado3dFinal = document.getElementById(`resMecanizado3dFinal${kValue}`)
    let resBancoArmado = document.getElementById(`resBancoArmado${kValue}`)
    

    mostrarElementoDistribucion(
        arrayFromValues,
        indiceAMostrar,
        kValue,
        resMecanizado2dCompleto,
        resMecanizado3dPrefinal,
        resMecanizado3dFinal,
        resBancoArmado
    )
}
//*********** End Evento btn anterior y siguiente ********* */

//************ ToolTip btn-Arrows anterior/Siguiente -----------
//****** Mecanizado2dCompleto + Mecanizado3dPrefinal + Mecanizado3dFinal + BancoArmado ***** */
let spanResDistribucion = Array.from(document.querySelectorAll('span[name="resRevisionMecanizado2dCompleto"],span[name="resRevisionMecanizado3dPrefinal"],span[name="resRevisionMecanizado3dFinal"], span[name="resRevisionBancoArmado"]'))

spanResDistribucion.forEach(function(spanElement) {
    spanElement.addEventListener("mouseover", (event) => {
        let spanSpot = document.getElementById(`${spanElement.id}`)
        let idSpotSelected = spanSpot.id

        // Expresión regular para eliminar el texto inicial
        switch (`${spanSpot.getAttribute('name')}`) {
            case 'resRevisionMecanizado2dCompleto':
                var regex = /^resRevisionMecanizado2dCompleto/;
            break;
            case 'resRevisionMecanizado3dPrefinal':
                var regex = /^resRevisionMecanizado3dPrefinal/;
            break;
            case 'resRevisionMecanizado3dFinal':
                var regex = /^resRevisionMecanizado3dFinal/;
            break;
            case 'resRevisionBancoArmado':
                var regex = /^resRevisionBancoArmado/;
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