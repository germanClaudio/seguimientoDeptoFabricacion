const socket = io.connect()
let URL_GOOGLE_STORE_IMAGESTOOLS='https://storage.googleapis.com/imagenesproyectosingenieria/upload/ToolsImages/'

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const YY = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el spinner y ocultar la tabla al cargar la página
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('toolTable').style.display = 'none';
});


//  ----------- Tools historial ----------------
socket.on('toolsAll', (arrTools) => {
    renderTools(arrTools)
})

const renderTools = (arrTools) => {
    const arrayTool = arrTools
    const green = 'success'
    const red = 'danger'
    const active = 'Activa'
    const inactive = 'Mantenimiento'
    let html
    if (arrTools.length>0) {
        html = arrTools.map((element) => {
            let optionStatus = element.status ? green : red
            let showStatus = element.status ? active : inactive
            let idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="designation_${element._id}">${element.designation}</td>
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
    function messageDeleteTool(id, code, designation) {

        const htmlForm = `
                La maquina ${designation} - Codigo: ${code}, se eliminará completamente.<br>
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
                const idTool = btn.id
                const designation = document.getElementById(`designation_${idTool}`).innerText
                const code = document.getElementById(`codigo_${idTool}`).innerText
                console.log(idTool, designation, code)

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

dropAreaImageTool.style.width = "300px"
dropAreaImageTool.style.height = "200px"
dropAreaImageTool.style.border = "2px dashed #ccc"
dropAreaImageTool.style.margin = "0 auto 0 50px"
dropAreaImageTool.style.borderRadius = "5px"
dropAreaImageTool.style.textAlign = "center"
dropAreaImageTool.style.lineHeight = "200px"
dropAreaImageTool.style.cursor = "pointer"

dropAreaImageTool.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaImageTool.style.border = '2px dashed #77d'
    dropAreaImageTool.style.backgroundColor = '#7777dd10'
})

dropAreaImageTool.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaImageTool.style.border = '2px dashed #ccc'
    dropAreaImageTool.style.backgroundColor = '#838383'
})

function alertRefresh() {
    removeImageButtonImageTool.style.display = 'none'
    fileInputImageTool.value = ''
    fileImputTextImageTool.value = ''
    dropAreaImageTool.style.border = "2px dashed #ccc"
    dropAreaImageTool.style.textAlign = "center"
    dropAreaImageTool.style.backgroundColor = '#838383'
    dropAreaImageTool.style.display = 'block'
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
        dropAreaImageTool.style.border = '3px dashed #2d2'
        dropAreaImageTool.style.backgroundColor = '#22dd2210'        
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
        dropAreaImageTool.style.border = '3px dashed #2d2'
        dropAreaImageTool.style.backgroundColor = '#22dd2210'
        handleFileUploadImageTool(file)

    } else {
        alertNotImageImageTool()
    }     
})

function handleFileUploadImageTool(file) {
    const fileSize = file.size
    const fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_IMAGESTOOLS
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex);
        const extension = file.name.substring(dotIndex);
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


function messageNewTool(designation, code) {
    if (designation, code) {
        Swal.fire({
            title: `Nueva Maquina <b>${designation}</b>`,
            text: `La maquina ${designation}, código: ${code} será registrada!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: true,
            confirmButtonText: 'Registrarla! <i class="fa-solid fa-user-gear"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("newToolForm").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Creada!',
                        `La máquina ${designation}, código #:${code}, ha sido registrada exitosamente.`,
                        'success'
                    )
                }, 2000)
                
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
    const designation = document.getElementById('designation').value
    const code = document.getElementById('code').value

    designation && code ?  messageNewTool(designation, code) :  messageWarningEmptyFields(designation, code)
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

            let forbiddenChars = /["$%?¡¿^=!'~`\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
                // Cancelar el evento para evitar que se ingrese el carácter
                event.preventDefault()
                input.classList.add("border")
                input.classList.add("border-danger")
                input.classList.add("border-2")
            } else {
                input.classList.remove("border")
                input.classList.remove("border-danger")
                input.classList.remove("border-2")
            }
        })
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
    const allInputs = document.querySelectorAll('input[type="text"], textarea, input[type="file"]')
    
    allInputs.forEach(function(input) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("border-primary")
                input.classList.add("border-2")
                input.classList.add("shadow")
                btnAceptarFrom.removeAttribute('disabled')
                btnAceptarFrom.style = "cursor: pointer;"
            })        
    })
}

disabledBtnAceptar()