const socket = io.connect()
let URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS = config.URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS
    })
    .catch(error => console.error('Error fetching config:', error));

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0'),
        MM = String(date.getMonth() + 1).padStart(2, '0'),
        YY = date.getFullYear(),
        hh = String(date.getHours()).padStart(2, '0'),
        mm = String(date.getMinutes()).padStart(2, '0'),
        ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

//-------------------------------------------
const inputName = document.getElementById('designation')
function mostrarNombre() {
    const titleNewCuttingTool = document.getElementById('titleNewCuttingTool')
    titleNewCuttingTool.innerText = 'Agregar Nueva Herramienta: '+ inputName.value
}

    if(inputName) {
        inputName.addEventListener('keyup', () => {
            mostrarNombre()    
        })
        
        inputName.addEventListener('blur', () => {
            mostrarNombre()    
        })
    }
//-------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el spinner y ocultar la tabla al cargar la página
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('cuttingToolTable').style.display = 'none';
});

//  ----------- CuttingTools list ----------------
socket.on('cuttingToolsAll', (arrCuttingTools, arrUsers) => {
    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin,
            userId = arrUsers[index]._id
        user ? renderCuttingToolsAdmin(arrCuttingTools, userId) : renderCuttingToolsUser(arrCuttingTools)
    }   
})

// --------------- Render Admin ----------------------------
const renderCuttingToolsAdmin = (arrCuttingTools) => {
    const arrayCuttingTool = arrCuttingTools,
        green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', black = 'dark', white = 'light',
        active = 'Activa', inactive = 'Mantenimiento', info = 'info',
        toricas = 'Tóricas', planas = 'Planas', esfericas = 'Esféricas', final = 'final', altoAvance = 'altoAvance'
    let html
    
    if (arrCuttingTools.length > 0) {
        html = arrCuttingTools.map((element) => {
            let optionStatus = element.status ? green : red
            
            const typeConfigurations = {
                toricas: { optionType: info, showType: toricas, textColor: black },
                planas: { optionType: grey, showType: planas, textColor: white },
                esfericas: { optionType: grey, showType: esfericas, textColor: white },
                final: { optionType: grey, showType: final, textColor: white },
                altoAvance: { optionType: grey, showType: altoAvance, textColor: white },
            };
            
            // Configuración por defecto
            const defaultConfig = { optionType: blue, showType: 'Otras', textColor: white };
            
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            let showStatus = element.status ? active : inactive,
                idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageCuttingTool}' width="150px" height="150px"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center">${element.creator[0].name}, ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center">
                                    <a href="/api/herramientas/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Herramienta ${element.designation}"><i class="fa-solid fa-gears"></i></a>
                                    <button id="${element._id}" name="btnDeleteCuttingTool" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Herramienta ${element.designation}"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>`)
            }
        }).join(" ");
        document.getElementById('mostrarHerramientas').innerHTML = html

        const cuttingToolsActiveQty = []
        for(let u=0; u<arrayCuttingTool.length; u++) {
            arrayCuttingTool[u].visible ? cuttingToolsActiveQty.push(u) : null
        }

        const htmlCuttingToolList = 
            ( `<caption id="capCuttingToolList">Cantidad de Herramientas: ${parseInt(cuttingToolsActiveQty.length)}</caption><br>
            <caption id="capDeleteCuttingToolList">Cantidad de Herramientas Eliminadas: ${parseInt(arrayCuttingTool.length - cuttingToolsActiveQty.length)}</caption>`)

        document.getElementById('capCuttingToolList').innerHTML = htmlCuttingToolList
        
    } else {
        html = (`<tr>
                    <td colspan="16">
                        <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarHerramientas').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('cuttingToolTable').style.display = 'block';

    // ---- mensaje confirmacion eliminar Usuario -----------
    function messageDeleteCuttingTool(id, code, designation) {

        const htmlForm =
            `La herramienta ${designation} - Código: ${code}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteCuttingTool" action="/api/herramientas/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Eliminar Herramienta <b>${designation}</b>?`,
            position: 'center',
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Eliminarla! <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formDeleteCuttingTool").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminada!',
                        `La herramienta ${designation}, ha sido eliminada exitosamente.`,
                        'success'
                    )
                }, 1500)
            } else {
                Swal.fire(
                    'No eliminada!',
                    `La herramienta ${designation}, no ha sido eliminada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteCuttingTool"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idCuttingTool = btn.id,
                    designation = document.getElementById(`designation_${idCuttingTool}`).innerText,
                    code = document.getElementById(`codigo_${idCuttingTool}`).innerText

                idCuttingTool && designation && code? messageDeleteCuttingTool(idCuttingTool, code, designation) : null
            })
        }
    })
}

//----------------------- Render User -------------------------------
const renderCuttingToolsUser = (arrCuttingTools) => {
    const arrayCuttingTool = arrCuttingTools,
        green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', black = 'dark', white = 'light',
        active = 'Activa', inactive = 'En uso', info = 'info',
        toricas = 'Tóricas', planas = 'Planas', esfericas = 'Esféricas', final = 'final', altoAvance = 'altoAvance'
    let textColor, html

    if (arrCuttingTools.length>0) {
        html = arrCuttingTools.map((element) => {
            let optionStatus = element.status ? green : red
            
            const typeConfigurations = {
                toricas: { optionType: info, showType: toricas, textColor: black },
                planas: { optionType: grey, showType: planas, textColor: white },
                esfericas: { optionType: grey, showType: esfericas, textColor: white },
                final: { optionType: grey, showType: final, textColor: white },
                altoAvance: { optionType: grey, showType: altoAvance, textColor: white },
            };
            
            // Configuración por defecto
            const defaultConfig = { optionType: blue, showType: 'Otras', textColor: white };
            
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            let showStatus = element.status ? active : inactive,
                idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageCuttingTool}' width="150px" height="150px"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center">${element.creator[0].name}, ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-blck align-items-center text-center mx-1">
                                    <a href="/api/herramientas/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Herramienta ${element.designation}"><i class="fa-solid fa-gears"></i></a>
                                    <button type="button" class="btn btn-danger btn-sm ms-1 disabled" title="Solo Admin puede modificar esto"><i class="fa-solid fa-info-circle"></i></button>
                                </div>
                            </td>
                        </tr>`)

            }
        }).join(" ");
        document.getElementById('mostrarHerramientas').innerHTML = html

        const cuttingToolsActiveQty = []
        for(let u=0; u<arrayCuttingTool.length; u++) {
            arrayCuttingTool[u].visible ? cuttingToolsActiveQty.push(u) : null
        }

        const htmlCuttingToolList = 
            ( `<caption id="capCuttingToolList">Cantidad de Herramientas: ${parseInt(cuttingToolsActiveQty.length)}</caption><br>
            <caption id="capDeleteCuttingToolList">Cantidad de Herramientas Eliminadas: ${parseInt(arrayCuttingTool.length - cuttingToolsActiveQty.length)}</caption>`)

        document.getElementById('capCuttingToolList').innerHTML = htmlCuttingToolList
        
    } else {
        html = (`<tr>
                    <td colspan="16">
                        <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarHerramientas').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('cuttingToolTable').style.display = 'block';

    // ---- mensaje confirmacion eliminar herramienta -----------
    function messageDeleteCuttingTool(id, code, designation) {

        const htmlForm = `
                La herramienta ${designation} - Código: ${code}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteCuttingTool" action="/api/herramientas/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>
                        `
    
        Swal.fire({
            title: `Eliminar Herramienta <b>${designation}</b>?`,
            position: 'center',
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Eliminarla! <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formDeleteCuttingTool").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminada!',
                        `La herramienta ${designation}, ha sido eliminada exitosamente.`,
                        'success'
                    )
                }, 1500)
            } else {
                Swal.fire(
                    'No eliminada!',
                    `La herramienta ${designation}, no ha sido eliminada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteCuttingTool"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idCuttingTool = btn.id,
                    designation = document.getElementById(`designation_${idCuttingTool}`).innerText,
                    code = document.getElementById(`codigo_${idCuttingTool}`).innerText

                idCuttingTool && designation && code ? messageDeleteCuttingTool(idCuttingTool, designation, code) : null
            })
        }
    })
}

// ----------- Image CuttingTool Image behavior ---------------
const dropAreaImageCuttingTool = document.getElementById('drop-areaImageCuttingTool'),
    fileInputImageCuttingTool = document.getElementById('fileInputImageCuttingTool'),
    fileImputTextImageCuttingTool = document.getElementById('fileInputTextImageCuttingTool'),
    removeImageButtonImageCuttingTool = document.getElementById('removeImageCuttingTool'),
    alertImageCuttingTool = document.getElementById('alertImageCuttingTool'),
    alertSizeImageCuttingTool = document.getElementById('alertSizeImageCuttingTool')

Object.assign(dropAreaImageCuttingTool.style, {
    width: "300px",
    height: "200px",
    border: "2px dashed #ccc",
    margin: "0 auto 0 50px",
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "200px",
    cursor: "pointer"
})

dropAreaImageCuttingTool.addEventListener('dragover', (e) => {
    e.preventDefault()
    Object.assign(dropAreaImageCuttingTool.style, {
        border: "2px dashed #77d",
        backgroundColor: '#7777dd10'
    })
})

dropAreaImageCuttingTool.addEventListener('dragleave', (e) => {
    e.preventDefault()
    Object.assign(dropAreaImageCuttingTool.style, {
        border: "2px dashed #ccc",
        backgroundColor: '#B6B6B6'
    })
})

function alertRefresh() {
    removeImageButtonImageCuttingTool.style.display = 'none'
    fileInputImageCuttingTool.value = ''
    fileImputTextImageCuttingTool.value = ''
    Object.assign(dropAreaImageCuttingTool.style, {
        border: "2px dashed #ccc",
        textAlign: "center",
        backgroundColor: '#B6B6B6',
        display: 'block'
    })
    dropAreaImageCuttingTool.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageImageCuttingTool() {
    alertImageCuttingTool.style.display = 'flex'
    alertSizeImageCuttingTool.style.display = 'none'
    alertRefresh()
}

function alertSizeImageImageCuttingTool() {
    alertSizeImageCuttingTool.style.display = 'flex'
    alertImageCuttingTool.style.display = 'none'
    alertRefresh()
}

dropAreaImageCuttingTool.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaImageCuttingTool.style, {
            border: "3px dashed #2d2",
            backgroundColor: '#22dd2210'
        })
        handleFileUploadImageCuttingTool(file)

    } else {
        alertNotImageImageCuttingTool()
    }     
})

dropAreaImageCuttingTool.addEventListener('click', () => {
    fileInputImageCuttingTool.click()
})

fileInputImageCuttingTool.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputImageCuttingTool.files[0]
    
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaImageCuttingTool.style, {
            border: "3px dashed #2d2",
            backgroundColor: '#22dd2210'
        })
        handleFileUploadImageCuttingTool(file)

    } else {
        alertNotImageImageCuttingTool()
    }     
})

function handleFileUploadImageCuttingTool(file) {
    const fileSize = file.size,
        fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.'),
            name = file.name.substring(0, dotIndex),
            extension = file.name.substring(dotIndex)
        fileImputTextImageCuttingTool.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonImageCuttingTool.style.display = 'flex'

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaImageCuttingTool.innerHTML = 
                `<img class="p-2 mb-3" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            alertImageCuttingTool.style.display = 'none'
            alertSizeImageCuttingTool.style.display = 'none'
        }

    } else {
        alertSizeImageImageCuttingTool()
    }
}

removeImageButtonImageCuttingTool.addEventListener('click', (e)=> {
    e.preventDefault()
    alertImageCuttingTool.style.display = 'none'
    alertSizeImageCuttingTool.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})


function messageNewCuttingTool(designation, code, type) {
    if (designation, code, type) {
        Swal.fire({
            title: `Nueva Herramienta <b>${designation}</b>`,
            text: `La herramienta ${designation}, tipo: ${type}, código: ${code} será registrada!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: true,
            confirmButtonText: 'Registrarla! <i class="fa-solid fa-user-gear"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Creada!',
                    `La herramienta ${designation} (${type}) , código #:${code}, ha sido registrada exitosamente.`,
                    'success'
                )
                setTimeout(() => {
                    document.getElementById("newCuttingToolForm").submit()
                }, 1000)
                
            } else {
                Swal.fire(
                    'No registrada!',
                    `La herramienta ${designation}, no ha sido registrada.`,
                    'info'
                )
                return false
            }
        })

    } else {
        swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `La Herramienta no se creó correctamente!`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,
        })
    }
}

function messageWarningEmptyFields(designation, code) {
    const formFields =[]
    
    designation == "" ? formFields.push('Designacion') : null
    code == "" ? formFields.push('Código') : null
    type == "" ? formFields.push('Tipo') : null
    diam == "" ? formFields.push('Diam') : null

    formFields.length == 1 ?
        Swal.fire({
            title: `Campo Vacío`,
            text: `El campo ${formFields[0]} está vacío!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-user-gear"></i>'
        })
    :
        Swal.fire({
            title: `${formFields.length} Campos Vacíos`,
            text: `Los campos ${formFields.join(", ")} están vacíos!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-user-gear"></i>'
        })
}

const btnAddNewCuttingTool = document.getElementById('btnAddNewCuttingTool')

btnAddNewCuttingTool.addEventListener('click', (event) => {
    event.preventDefault()
    const designation = document.getElementById('designation').value,
        code = document.getElementById('code').value,
        type = document.getElementById('type').value
        diam = document.getElementById('diam').value

    designation && code && type ?  messageNewCuttingTool(designation, code, type.toUpperCase()) :  messageWarningEmptyFields(designation, code, type.toUpperCase())
})

const btnResetFormNewCuttingTool = document.getElementById('btnResetFormNewCuttingTool')
if (btnResetFormNewCuttingTool) {
    btnResetFormNewCuttingTool.addEventListener('click', () => {
        btnAddNewCuttingTool.disabled = true
        btnAddNewCuttingTool.style.opacity = (0.4)
        alertImageCuttingTool.style.display = 'none'
        alertSizeImageCuttingTool.style.display = 'none'
        alertRefresh()
    })
}

let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key,
                forbiddenChars = /["$%?¡¿^=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.add("border", "border-danger", "border-2")
            } else {
                input.classList.remove("border", "border-danger", "border-2")
            }
        })
    })

let inpuntDeNumeros = document.querySelectorAll('input[type="number"]')
    inpuntDeNumeros.forEach(function(input) {
        input.addEventListener('input', function(event) {
            // Obtener el valor actual del input
            let value = input.value,
                key = event.key;

            // Expresión regular para números enteros de hasta cuatro cifras (0 a 9999)
            const regexp = /^[0-9]{1,4}$/;

            // Verificar si el valor cumple con la expresión regular
            if (!regexp.test(value)) {
                // Remover el último carácter si no cumple con la expresión regular
                input.value = value.slice(0, -1);
                input.classList.add("border", "border-danger", "border-2");
            } else {
                input.classList.remove("border", "border-danger", "border-2");
            }
        })
    })

function disabledBtnAceptar () {
    let btnAceptarFrom = document.getElementById('btnAddNewCuttingTool');
    const allInputs = document.querySelectorAll('input[type="text"], textarea, input[type="file"], input[type="hidden"], input[type="select"]')
    
    allInputs.forEach(function(input) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("border-primary", "border-2", "shadow")
                btnAceptarFrom.removeAttribute('disabled')
                btnAceptarFrom.style = "cursor: pointer;"
            })        
    })
}
disabledBtnAceptar()

const valores = [16, 20, 25, 32, 50, 52, 63, 80, 100, 125], // Valores para los radios de los círculos
        avances = [50, 100, 149, 199, 247, 295, 343, 393, 443, 491], // Valores de los radios de los círculos
        range = document.getElementById("customRange"),
        displayValue = document.getElementById("rangeValue"),
        dynamicCircle = document.getElementById("dynamicCircle")

    range.addEventListener("input", () => {
        const index = parseInt(range.value, 10), // Índice del valor actual
            value = valores[index];

        displayValue.value = value; // Actualizar el valor mostrado
        dynamicCircle.setAttribute("r", parseInt(avances[index])) // Actualizar el radio del círculo
        dynamicCircle.setAttribute("cx", 95); // Mantener el centro fijo desplazado 95px desde el inicio del input range

        const valueRange = range.value,
            max = 9
            progress = (valueRange / max) * 100

        range.style.background = `linear-gradient(to right, #005bbb ${progress}%, #ddd ${progress}%)`;
    });

    // Inicialización del círculo
    dynamicCircle.setAttribute("cx", 95); // Centro fijo en X al inicio del input range
    dynamicCircle.setAttribute("cy", 45); // Centro fijo en Y
    dynamicCircle.setAttribute("r", 50);