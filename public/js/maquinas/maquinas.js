const socket = io.connect()
let URL_GOOGLE_STORE_IMAGESTOOLS

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMAGESTOOLS = config.URL_GOOGLE_STORE_IMAGESTOOLS
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
    const titleNewTool = document.getElementById('titleNewTool')
    titleNewTool.innerText = 'Agregar Nueva Máquina: '+ inputName.value
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
    document.getElementById('toolTable').style.display = 'none';
});

//  ----------- Tools list ----------------
socket.on('toolsAll', (arrTools, arrUsers) => {
    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin,
            userId = arrUsers[index]._id
        user ? renderToolsAdmin(arrTools, userId) : renderToolsUser(arrTools)
    }   
})

// --------------- Render Admin ----------------------------
const renderToolsAdmin = (arrTools) => {
    const arrayTool = arrTools,
        green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', black = 'dark', white = 'light',
        active = 'Activa', inactive = 'Mantenimiento', info = 'info',
        cnc = 'CNC', press = 'Prensa'
    let textColor,
        html
    
    if (arrTools.length>0) {
        html = arrTools.map((element) => {
            let optionStatus = element.status ? green : red,
                optionType,
                showType
            if(element.type === 'cnc') {
                optionType = info
                showType = cnc
                textColor = black
            } else if(element.type === 'prensa') {
                optionType = grey
                showType = press
                textColor = white
            } else {
                optionType = blue
                showType = 'Otros'
                textColor = white
            }
            let showStatus = element.status ? active : inactive
            cnc : press
            let idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="model_${element._id}">${element.model}</td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageTool}' width="150px" height="150px"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center">${element.creator[0].name}, ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center">
                                    <a href="/api/maquinas/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Máquina ${element.designation}"><i class="fa-solid fa-gears"></i></a>
                                    <button id="${element._id}" name="btnDeleteTool" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Máquina ${element.designation}"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>`)

            }
        }).join(" ");
        document.getElementById('mostrarMaquinas').innerHTML = html

        const toolsActiveQty = []
        for(let u=0; u<arrayTool.length; u++) {
            arrayTool[u].visible ? toolsActiveQty.push(u) : null
        }

        const htmlToolList = 
            ( `<caption id="capToolList">Cantidad de Máquinas: ${parseInt(toolsActiveQty.length)}</caption><br>
            <caption id="capDeleteToolList">Cantidad de Máquinas Eliminadas: ${parseInt(arrayTool.length - toolsActiveQty.length)}</caption>`)

        document.getElementById('capToolList').innerHTML = htmlToolList
        
    } else {
        html = (`<tr>
                    <th scope="row" class="text-center"><strong>No hay items cargados para mostrar</strong></th>
                </tr>`)

        document.getElementById('mostrarMaquinas').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('toolTable').style.display = 'block';

    // ---- mensaje confirmacion eliminar Usuario -----------
    function messageDeleteTool(id, code, model, designation) {

        const htmlForm = `
                La maquina ${designation} - Modelo: ${model} Codigo: ${code}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteTool" action="/api/maquinas/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>
                        `
    
        Swal.fire({
            title: `Eliminar Máquina <b>${designation}</b>?`,
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
                document.getElementById("formDeleteTool").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminada!',
                        `La maquina ${designation}, ha sido eliminada exitosamente.`,
                        'success'
                    )
                }, 1500)
            } else {
                Swal.fire(
                    'No eliminada!',
                    `La maquina ${designation}, no ha sido eliminada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteTool"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idTool = btn.id,
                    designation = document.getElementById(`designation_${idTool}`).innerText,
                    code = document.getElementById(`codigo_${idTool}`).innerText,
                    model = document.getElementById(`modelo_${idTool}`).innerText

                idTool && designation && code && model ? messageDeleteTool(idTool, code, model, designation) : null
            })
        }
    })
}

//----------------------- Render User -------------------------------
const renderToolsUser = (arrTools) => {
    const arrayTool = arrTools,
        green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', black = 'dark', white = 'light',
        active = 'Activa', inactive = 'Mantenimiento', info = 'info', cnc = 'CNC', press = 'Prensa'
    let textColor,
        html

    if (arrTools.length>0) {
        html = arrTools.map((element) => {
            let optionStatus = element.status ? green : red,
                optionType,
                showType
            if(element.type === 'cnc') {
                optionType = info
                showType = cnc
                textColor = black
            } else if(element.type === 'prensa') {
                optionType = grey
                showType = press
                textColor = white
            } else {
                optionType = blue
                showType = 'Otros'
                textColor = white
            }
            let showStatus = element.status ? active : inactive
            cnc : press
            let idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="modelo_${element._id}">${element.model}</td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageTool}' width="150px" height="150px"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center">${element.creator[0].name}, ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-blck align-items-center text-center mx-1">
                                    <a href="/api/maquinas/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Máquina ${element.designation}"><i class="fa-solid fa-gears"></i></a>
                                    <button type="button" class="btn btn-danger btn-sm ms-1 disabled" title="Solo Admin puede modificar esto"><i class="fa-solid fa-info-circle"></i></button>
                                </div>
                            </td>
                        </tr>`)

            }
        }).join(" ");
        document.getElementById('mostrarMaquinas').innerHTML = html

        const toolsActiveQty = []
        for(let u=0; u<arrayTool.length; u++) {
            arrayTool[u].visible ? toolsActiveQty.push(u) : null
        }

        const htmlToolList = 
            ( `<caption id="capToolList">Cantidad de Máquinas: ${parseInt(toolsActiveQty.length)}</caption><br>
            <caption id="capDeleteToolList">Cantidad de Máquinas Eliminadas: ${parseInt(arrayTool.length - toolsActiveQty.length)}</caption>`)

        document.getElementById('capToolList').innerHTML = htmlToolList
        
    } else {
        html = (`<tr>
                    <th scope="row" class="text-center"><strong>No hay items cargados para mostrar</strong></th>
                </tr>`)

        document.getElementById('mostrarMaquinas').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('toolTable').style.display = 'block';

    // ---- mensaje confirmacion eliminar maquina -----------
    function messageDeleteTool(id, code, designation) {

        const htmlForm = `La maquina ${designation} - Codigo: ${code}, se eliminará completamente.<br>
                            Está seguro que desea continuar?<br>
                            <form id="formDeleteTool" action="/api/maquinas/delete/${id}" method="get">
                                <fieldset></fieldset>
                            </form>`
    
        Swal.fire({
            title: `Eliminar Máquina <b>${designation}</b>?`,
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
                document.getElementById("formDeleteTool").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminada!',
                        `La maquina ${designation}, ha sido eliminada exitosamente.`,
                        'success'
                    )
                }, 1500)

            } else {
                Swal.fire(
                    'No eliminada!',
                    `La maquina ${designation}, no ha sido eliminada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteTool"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idTool = btn.id
                const designation = document.getElementById(`designation_${idTool}`).innerText
                const code = document.getElementById(`codigo_${idTool}`).innerText

                idTool && designation && code ? messageDeleteTool(idTool, designation, code) : null
            })
        }
    })
}

// ----------- Image Tool Image behavior ---------------
const dropAreaImageTool = document.getElementById('drop-areaImageTool')
const fileInputImageTool = document.getElementById('fileInputImageTool')
const fileImputTextImageTool = document.getElementById('fileInputTextImageTool')
const removeImageButtonImageTool = document.getElementById('removeImageTool')
const alertImageTool = document.getElementById('alertImageTool')
const alertSizeImageTool = document.getElementById('alertSizeImageTool')

Object.assign(dropAreaImageTool.style, {
    width: "300px",
    height: "200px",
    border: "2px dashed #ccc",
    textAlign: "center",
    margin: "0 auto 0 50px",
    borderRadius:"5px",
    lineHeight: "200px",
    cursor: "pointer"
});

dropAreaImageTool.addEventListener('dragover', (e) => {
    e.preventDefault()
    Object.assign(dropAreaImageTool.style, {
        border: "2px dashed #77d",
        backgroundColor: '#7777dd10'
    })
})

dropAreaImageTool.addEventListener('dragleave', (e) => {
    e.preventDefault()
    Object.assign(dropAreaImageTool.style, {
        border: "2px dashed #ccc",
        backgroundColor: '#B6B6B6'
    })
})

function alertRefresh() {
    removeImageButtonImageTool.style.display = 'none'
    fileInputImageTool.value = ''
    fileImputTextImageTool.value = ''

    Object.assign(dropAreaImageTool.style, {
        border: "2px dashed #ccc",
        textAlign: "center",
        backgroundColor: "#B6B6B6",
        display: "block"
    });
    dropAreaImageTool.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageImageTool() {
    alertImageTool.style.display = 'flex'
    alertSizeImageTool.style.display = 'none'
    alertRefresh()
}

function alertSizeImageImageTool() {
    alertSizeImageTool.style.display = 'flex'
    alertImageTool.style.display = 'none'
    alertRefresh()
}

dropAreaImageTool.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaImageTool.style, {
            border: "3px dashed #2d2",
            backgroundColor: "#22dd2210"
        });      
        handleFileUploadImageTool(file)

    } else {
        alertNotImageImageTool()
    }     
})

dropAreaImageTool.addEventListener('click', () => {
    fileInputImageTool.click()
})

fileInputImageTool.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputImageTool.files[0]
    
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaImageTool.style, {
            border: "3px dashed #2d2",
            backgroundColor: "#22dd2210"
        });
        handleFileUploadImageTool(file)

    } else {
        alertNotImageImageTool()
    }     
})

function handleFileUploadImageTool(file) {
    const fileSize = file.size,
        fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_IMAGESTOOLS
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.'),
            name = file.name.substring(0, dotIndex),
            extension = file.name.substring(dotIndex);
        fileImputTextImageTool.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonImageTool.style.display = 'flex'

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaImageTool.innerHTML = 
                `<img class="p-2 mb-3" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            alertImageTool.style.display = 'none'
            alertSizeImageTool.style.display = 'none'
        }

    } else {
        alertSizeImageImageTool()
    }
}

removeImageButtonImageTool.addEventListener('click', (e)=> {
    e.preventDefault()
    alertImageTool.style.display = 'none'
    alertSizeImageTool.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})


function messageNewTool(designation, code, type) {
    if (designation, code, type) {
        Swal.fire({
            title: `Nueva Maquina <b>${designation}</b>`,
            text: `La maquina ${designation}, tipo: ${type}, código: ${code} será registrada!`,
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
                    `La máquina ${designation} (${type}) , código #:${code}, ha sido registrada exitosamente.`,
                    'success'
                )
                setTimeout(() => {
                    document.getElementById("newToolForm").submit()
                }, 1000)
                
            } else {
                Swal.fire(
                    'No registrada!',
                    `La máquina ${designation}, no ha sido registrada.`,
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
            text: `La Máquina no se creó correctamente!`,
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

const btnAddNewTool = document.getElementById('btnAddNewTool')

btnAddNewTool.addEventListener('click', (event) => {
    event.preventDefault()
    const designation = document.getElementById('designation').value,
        code = document.getElementById('code').value,
        type = document.getElementById('type').value

    designation && code && type ?  messageNewTool(designation, code, type.toUpperCase()) :  messageWarningEmptyFields(designation, code, type.toUpperCase())
})

const btnResetFormNewTool = document.getElementById('btnResetFormNewTool')
if (btnResetFormNewTool) {
    btnResetFormNewTool.addEventListener('click', () => {
        btnAddNewTool.disabled = true
        btnAddNewTool.style.opacity = (0.4)
        alertImageTool.style.display = 'none'
        alertSizeImageTool.style.display = 'none'
        alertRefresh()
    })
}

var inputsDeTexto = document.querySelectorAll('input[type="text"]')
    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            let forbiddenChars = /["$%?¡¿^=!'~`´Ø\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.add("border", "border-danger", "border-2")
            } else {
                input.classList.remove("border", "border-danger", "border-2")
            }
        })

        // Reemplazar caracteres prohibidos al pegar o modificar el contenido
        input.addEventListener('input', function(event) {
            let forbiddenChars = /["$%?¡¿^=!'~`´Ø\\*{}\[\]<>@]/g; // Caracteres prohibidos
            
            // Reemplazar caracteres prohibidos
            let newValue = input.value.replace(forbiddenChars, '');

            // Actualizar el valor del input
            input.value = newValue;
        });
    })

var inpuntDeNumeros = document.querySelectorAll('input[type="number"]')
    inpuntDeNumeros.forEach(function(input) {
        input.addEventListener('input', function(event) {
            // Obtener el valor actual del input
            let value = input.value;

            // Obtener el código de la tecla presionada
            let key = event.key;

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
    let btnAceptarFrom = document.getElementById('btnAddNewTool');
    const allInputs = document.querySelectorAll('input[type="text"], textarea, input[type="file"], input[type="hidden"]')
    
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