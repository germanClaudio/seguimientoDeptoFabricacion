const socket = io.connect()
let URL_GOOGLE_STORE_IMAGESSUPPLIERS

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMAGESSUPPLIERS = config.URL_GOOGLE_STORE_IMAGESSUPPLIERS
    })
    .catch(error => console.error('Error fetching config:', error));

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const YY = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

//-------------------------------------------
const inputName = document.getElementById('designation')
function mostrarNombre() {
    const titleNewSupplier = document.getElementById('titleNewSupplier')
    titleNewSupplier.innerText = 'Agregar Nuevo Proveedor: '+ inputName.value
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
    document.getElementById('supplierTable').style.display = 'none';
});

//  ----------- Suppliers list ----------------
socket.on('suppliersAll', (arrSuppliers, arrUsers) => {
    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin
        let userId = arrUsers[index]._id
        user ? renderSuppliersAdmin(arrSuppliers, userId) : renderSuppliersUser(arrSuppliers)
    }   
})

// --------------- Render Admin ----------------------------
const renderSuppliersAdmin = (arrSuppliers) => {
    const arraySupplier = arrSuppliers
    const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', black = 'dark', white = 'light', info = 'info'
    const active = 'Activo', inactive = 'Inactivo'
    const diseno = 'Diseño', simulacion = 'Simulación'
    let textColor, html

    if (arrSuppliers.length>0) {
        html = arrSuppliers.map((element) => {
            let optionStatus = element.status ? green : red
            let optionType 
            let showType
            if(element.type === 'diseno') {
                optionType = info
                showType = diseno
                textColor = black
            } else if(element.type === 'simulacion') {
                optionType = grey
                showType = simulacion
                textColor = white
            } else {
                optionType = blue
                showType = 'Otros'
                textColor = white
            }
            let showStatus = element.status ? active : inactive
            diseno : simulacion
            let idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageSupplier}' width="150px" height="150px"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center px-2" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center">${element.creator[0].name}, ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center">
                                    <a href="/api/proveedores/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Proveedor ${element.designation}"><i class="fa-solid fa-truck-field"></i></a>
                                    <button id="${element._id}" name="btnDeleteSupplier" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Proveedor ${element.designation}"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>`)

            }
        }).join(" ");
        document.getElementById('mostrarProveedores').innerHTML = html

        const suppliersActiveQty = []
        for(let u=0; u<arraySupplier.length; u++) {
            arraySupplier[u].visible ? suppliersActiveQty.push(u) : null
        }

        const htmlSupplierList = 
            ( `<caption id="capSupplierList">Cantidad de Proveedores: ${parseInt(suppliersActiveQty.length)}</caption><br>
            <caption id="capDeleteSupplierList">Cantidad de Proveedores Eliminados: ${parseInt(arraySupplier.length - suppliersActiveQty.length)}</caption>`)

        document.getElementById('capSupplierList').innerHTML = htmlSupplierList
        
    } else {
        html = (`<td colspan="12">
                    <div class="text-center my-3 shadow p-2 mb-3 bg-body rounded">
                        <strong>No hay items cargados para mostrar</strong>
                    </div>
                </td>`)

        document.getElementById('mostrarProveedores').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('supplierTable').style.display = 'block';

    // ---- mensaje confirmacion eliminar Usuario -----------
    function messageDeleteSupplier(id, code, designation) {

        const htmlForm = `
                El proveedor ${designation} - Codigo: ${code}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteSupplier" action="/api/proveedores/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>
                        `
    
        Swal.fire({
            title: `Eliminar Proveedor <b>${designation}</b>?`,
            position: 'center',
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Eliminarlo! <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formDeleteSupplier").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminado!',
                        `El proveedor ${designation}, ha sido eliminada exitosamente.`,
                        'success'
                    )
                }, 1500)
            } else {
                Swal.fire(
                    'No eliminado!',
                    `El proveedor ${designation}, no ha sido eliminada.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteSupplier"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idSupplier = btn.id
                const designation = document.getElementById(`designation_${idSupplier}`).innerText
                const code = document.getElementById(`codigo_${idSupplier}`).innerText

                idSupplier && designation && code ? messageDeleteSupplier(idSupplier, designation, code) : null
            })
        }
    })
}

//----------------------- Render User -------------------------------
const renderSuppliersUser = (arrSuppliers) => {
    const arraySupplier = arrSuppliers
    const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', black = 'dark', white = 'light', info = 'info'
    const active = 'Activo', inactive = 'Inactivo'
    const diseno = 'Diseño', simulacion = 'Simulación'
    let textColor, html

    if (arrSuppliers.length>0) {
        html = arrSuppliers.map((element) => {
            let optionStatus = element.status ? green : red
            let optionType, showType
            
            if(element.type === 'diseno') {
                optionType = info
                showType = diseno
                textColor = black
            } else if(element.type === 'simulacion') {
                optionType = grey
                showType = simulacion
                textColor = white
            } else {
                optionType = blue
                showType = 'Otros'
                textColor = white
            }
            let showStatus = element.status ? active : inactive
            diseno : simulacion
            let idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageSupplier}' width="150px" height="150px"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center px-2" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center">${element.creator[0].name}, ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-blck align-items-center text-center mx-1">
                                    <a href="/api/proveedores/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Proveedor ${element.designation}"><i class="fa-solid fa-truck-field"></i></a>
                                    <button type="button" class="btn btn-danger btn-sm ms-1 disabled" title="Solo Admin puede modificar esto"><i class="fa-solid fa-info-circle"></i></button>
                                </div>
                            </td>
                        </tr>`)

            }
        }).join(" ");
        document.getElementById('mostrarProveedores').innerHTML = html

        const suppliersActiveQty = []
        for(let u=0; u<arraySupplier.length; u++) {
            arraySupplier[u].visible ? suppliersActiveQty.push(u) : null
        }

        const htmlSupplierList = 
            ( `<caption id="capSupplierList">Cantidad de Proveedores: ${parseInt(suppliersActiveQty.length)}</caption><br>
            <caption id="capDeleteSupplierList">Cantidad de Proveedores Eliminadas: ${parseInt(arraySupplier.length - suppliersActiveQty.length)}</caption>`)

        document.getElementById('capSupplierList').innerHTML = htmlSupplierList
        
    } else {
        html = (`<td colspan="12">
                    <div class="text-center my-3 shadow p-2 mb-3 bg-body rounded">
                        <strong>No hay items cargados para mostrar</strong>
                    </div>
                </td>`)

        document.getElementById('mostrarProveedores').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('supplierTable').style.display = 'block';

    // ---- mensaje confirmacion eliminar proveedores -----------
    function messageDeleteSupplier(id, code, designation) {

        const htmlForm = `
                El proveedor ${designation} - Codigo: ${code}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteSupplier" action="/api/proveedores/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>
                        `
    
        Swal.fire({
            title: `Eliminar Proveedor <b>${designation}</b>?`,
            position: 'center',
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            confirmButtonText: 'Eliminarlo! <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formDeleteSupplier").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminado!',
                        `La proveedor ${designation}, ha sido eliminado exitosamente.`,
                        'success'
                    )
                }, 1500)
            } else {
                Swal.fire(
                    'No eliminado!',
                    `El proveedor ${designation}, no ha sido eliminado.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteSupplier"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idSupplier = btn.id
                const designation = document.getElementById(`designation_${idSupplier}`).innerText
                const code = document.getElementById(`codigo_${idSupplier}`).innerText

                idSupplier && designation && code ? messageDeleteSupplier(idSupplier, designation, code) : null
            })
        }
    })
}

// ----------- Image Supplier Image behavior ---------------
const dropAreaImageSupplier = document.getElementById('drop-areaImageSupplier')
const fileInputImageSupplier = document.getElementById('fileInputImageSupplier')
const fileImputTextImageSupplier = document.getElementById('fileInputTextImageSupplier')
const removeImageButtonImageSupplier = document.getElementById('removeImageSupplier')
const alertImageSupplier = document.getElementById('alertImageSupplier')
const alertSizeImageSupplier = document.getElementById('alertSizeImageSupplier')

dropAreaImageSupplier.style.width = "300px"
dropAreaImageSupplier.style.height = "200px"
dropAreaImageSupplier.style.border = "2px dashed #ccc"
dropAreaImageSupplier.style.margin = "0 auto 0 50px"
dropAreaImageSupplier.style.borderRadius = "5px"
dropAreaImageSupplier.style.textAlign = "center"
dropAreaImageSupplier.style.lineHeight = "200px"
dropAreaImageSupplier.style.cursor = "pointer"

dropAreaImageSupplier.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaImageSupplier.style.border = '2px dashed #77d'
    dropAreaImageSupplier.style.backgroundColor = '#7777dd10'
})

dropAreaImageSupplier.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaImageSupplier.style.border = '2px dashed #ccc'
    dropAreaImageSupplier.style.backgroundColor = '#B6B6B6'
})

function alertRefresh() {
    removeImageButtonImageSupplier.style.display = 'none'
    fileInputImageSupplier.value = ''
    fileImputTextImageSupplier.value = ''
    dropAreaImageSupplier.style.border = "2px dashed #ccc"
    dropAreaImageSupplier.style.textAlign = "center"
    dropAreaImageSupplier.style.backgroundColor = '#B6B6B6'
    dropAreaImageSupplier.style.display = 'block'
    dropAreaImageSupplier.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageImageSupplier() {
    alertImageSupplier.style.display = 'flex'
    alertSizeImageSupplier.style.display = 'none'
    alertRefresh()
}

function alertSizeImageImageSupplier() {
    alertSizeImageSupplier.style.display = 'flex'
    alertImageSupplier.style.display = 'none'
    alertRefresh()
}

dropAreaImageSupplier.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaImageSupplier.style.border = '3px dashed #2d2'
        dropAreaImageSupplier.style.backgroundColor = '#22dd2210'        
        handleFileUploadImageSupplier(file)

    } else {
        alertNotImageImageSupplier()
    }     
})

dropAreaImageSupplier.addEventListener('click', () => {
    fileInputImageSupplier.click()
})

fileInputImageSupplier.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputImageSupplier.files[0]
    
    if (file && file.type.startsWith('image/')) { 
        dropAreaImageSupplier.style.border = '3px dashed #2d2'
        dropAreaImageSupplier.style.backgroundColor = '#22dd2210'
        handleFileUploadImageSupplier(file)

    } else {
        alertNotImageImageSupplier()
    }     
})

function handleFileUploadImageSupplier(file) {
    const fileSize = file.size
    const fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_IMAGESSUPPLIERS
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex);
        const extension = file.name.substring(dotIndex);
        fileImputTextImageSupplier.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonImageSupplier.style.display = 'flex'

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaImageSupplier.innerHTML = 
                `<img class="p-2 mb-3" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            alertImageSupplier.style.display = 'none'
            alertSizeImageSupplier.style.display = 'none'
        }

    } else {
        alertSizeImageImageSupplier()
    }
}

removeImageButtonImageSupplier.addEventListener('click', (e)=> {
    e.preventDefault()
    alertImageSupplier.style.display = 'none'
    alertSizeImageSupplier.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})


function messageNewSupplier(designation, code, type) {
    if (designation, code, type) {
        Swal.fire({
            title: `Nuevo Proveedor <b>${designation}</b>`,
            text: `El proveedor ${designation}, tipo: ${type}, código: ${code} será registrado!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: true,
            confirmButtonText: 'Registrarlo! <i class="fa-solid fa-user-gear"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Creado!',
                    `El proveedor ${designation} (${type}) , código #:${code}, ha sido registrado exitosamente.`,
                    'success'
                )
                setTimeout(() => {
                    document.getElementById("newSupplierForm").submit()
                }, 1000)
                
            } else {
                Swal.fire(
                    'No registrado!',
                    `El proveedor ${designation}, no ha sido registrado.`,
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
            text: `El proveedor no se creó correctamente!`,
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

const btnAddNewSupplier = document.getElementById('btnAddNewSupplier')

btnAddNewSupplier.addEventListener('click', (event) => {
    event.preventDefault()
    const designation = document.getElementById('designation').value
    const code = document.getElementById('code').value
    const type = document.getElementById('type').value

    designation && code && type ?  messageNewSupplier(designation, code, type.toUpperCase()) :  messageWarningEmptyFields(designation, code, type.toUpperCase())
})

const btnResetFormNewSupplier = document.getElementById('btnResetFormNewSupplier')
if (btnResetFormNewSupplier) {
    btnResetFormNewSupplier.addEventListener('click', () => {
        btnAddNewSupplier.disabled = true
        btnAddNewSupplier.style.opacity = (0.4)
        alertImageSupplier.style.display = 'none'
        alertSizeImageSupplier.style.display = 'none'
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
                input.classList.add("border", "border-danger", "border-2")
            } else {
                input.classList.remove("border", "border-danger", "border-2")
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
    let btnAceptarFrom = document.getElementById('btnAddNewSupplier');
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