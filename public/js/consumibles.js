const socket = io.connect()
let URL_GOOGLE_STORE_IMAGESCONSUMIBLES

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMAGESCONSUMIBLES = config.URL_GOOGLE_STORE_IMAGESCONSUMIBLES
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

const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', yellow = 'warning', black = 'dark', white = 'light',
        active = 'Activo', inactive = 'Inactivo', info = 'info',
        epp = 'EPP', insertos = 'Insertos', consumibleAjuste = 'Consumible Ajuste', consumibleMeca = 'Consumible Mecanizado', otros = 'Otros'
let html, stock

const typeConfigurations = {
    epp: { optionType: yellow, showType: epp, textColor: black },
    insertos: { optionType: grey, showType: insertos, textColor: white },
    consumibleAjuste: { optionType: blue, showType: consumibleAjuste, textColor: white },
    consumibleMeca: { optionType: black, showType: consumibleMeca, textColor: white },
    otros: { optionType: green, showType: otros, textColor: white }
};

// Configuración por defecto
const defaultConfig = { optionType: blue, showType: 'Otro', textColor: white };

//-------------------------------------------
const inputName = document.getElementById('designation')
function mostrarNombre() {
    const titleNewConsumible = document.getElementById('titleNewConsumibles')
    titleNewConsumible.innerText = 'Agregar Nuevo Consumible o EPP '+ inputName.value
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
// Mostrar el spinner y ocultar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('consumiblesTable').style.display = 'none';
});

//  ----------- Consumibles list ----------------
socket.on('consumiblesAll', (arrConsumibles, arrUsers) => {
    let cadena = document.getElementById('mostrarUserName').innerText,
        indice = cadena.indexOf(","),
        name = cadena.substring(0,indice),
        index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin,
            userId = arrUsers[index]._id
        user ? renderConsumiblesAdmin(arrConsumibles, userId) : renderConsumiblesUser(arrConsumibles)
    }   
})

// --------------- Render Admin ----------------------------
const renderConsumiblesAdmin = (arrConsumibles) => {
    const arrayConsumible = arrConsumibles
    if (arrConsumibles.length > 0) {
        html = arrConsumibles.map((element) => {
            let optionStatus = element.status ? green : red,
                optionStock = element.stock>0 ? black : red
            
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            let showStatus = element.status ? active : inactive,
                idChain = element._id.substring(19)

            if (element.visible) {
                element.stock > 0 ? stock = '<tr>' : stock ='<tr style="background-color:rgba(32, 32, 32, 0.25);">'
                return (`${stock}
                            <td class="text-center" id="codigo_${element._id}"><strong>${element.code}</strong></td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageConsumible}' width="150px" height="150px"></td>
                            <td class="text-center" id="stock_${element._id}"><span class="badge bg-${optionStock} text-light">${element.stock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">${element.creator[0].name} ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center">
                                    <a href="/api/consumibles/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Consumible ${element.designation}"><i class="fa-solid fa-microchip"></i></a>
                                    <button id="${element._id}" name="btnDeleteConsumible" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Consumible ${element.designation}"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>`)
            }
        }).join(" ");
        document.getElementById('mostrarConsumibles').innerHTML = html

        const consumiblesActiveQty = []
        for(let u=0; u<arrayConsumible.length; u++) {
            arrayConsumible[u].visible ? consumiblesActiveQty.push(u) : null
        }

        const htmlConsumibleList = 
            ( `<caption id="capConsumibleList">Cantidad de Consumibles: ${parseInt(consumiblesActiveQty.length)}</caption><br>
            <caption id="capDeleteConsumibleList">Cantidad de Consumibles Eliminados: ${parseInt(arrayConsumible.length - consumiblesActiveQty.length)}</caption>`)

        document.getElementById('capConsumibleList').innerHTML = htmlConsumibleList
        
    } else {
        html = (`<tr>
                    <td colspan="13">
                        <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarConsumibles').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('consumiblesTable').style.display = 'block';

    // ---- mensaje confirmacion eliminar Consumible -----------
    function messageDeleteConsumible(id, designation, code) {
        const htmlForm =
            `El consumible ${designation} - Código: ${code}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteConsumible" action="/api/consumibles/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Eliminar Consumible <b>${designation}</b> - ${code}?`,
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
                document.getElementById("formDeleteConsumible").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminado!',
                        `El consumible ${designation}, ha sido eliminado exitosamente.`,
                        'success'
                    )
                }, 600)
            } else {
                Swal.fire(
                    'No eliminado!',
                    `El consumible ${designation}, no ha sido eliminado.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteConsumible"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idConsumible = btn.id,
                    designation = document.getElementById(`designation_${idConsumible}`).innerText,
                    code = document.getElementById(`codigo_${idConsumible}`).innerText,
                    type = document.getElementById(`tipo_${idConsumible}`).innerText

                idConsumible && designation && code && type ? messageDeleteConsumible(idConsumible, designation, code) : null
            })
        }
    })
}

//----------------------- Render User -------------------------------
const renderConsumiblesUser = (arrConsumibles) => {
    const arrayConsumible = arrConsumibles
    if (arrConsumibles.length>0) {
        html = arrConsumibles.map((element) => {
            let optionStatus = element.status ? green : red,
            optionStock = element.stock>0 ? black : red
            
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            let showStatus = element.status ? active : inactive,
                idChain = element._id.substring(19)

            if (element.visible) {
                element.stock > 0 ? stock = '<tr>' : stock ='<tr style="background-color:rgba(32, 32, 32, 0.25);">'
                return (`${stock}
                            <td class="text-center" id="codigo_${element._id}"><strong>${element.code}</strong></td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageConsumible}' width="150px" height="150px"></td>
                            <td class="text-center" id="stock_${element._id}"><span class="badge bg-${optionStock} text-light">${element.stock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">${element.creator[0].name} ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-blck align-items-center text-center mx-1">
                                    <a href="/api/consumibles/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Consumible ${element.designation}"><i class="fa-solid fa-microchip"></i></a>
                                    <button type="button" class="btn btn-danger btn-sm ms-1 disabled" title="Solo Admin puede modificar esto"><i class="fa-solid fa-info-circle"></i></button>
                                </div>
                            </td>
                        </tr>`)
            }
        }).join(" ");
        document.getElementById('mostrarConsumibles').innerHTML = html

        const consumiblesActiveQty = []
        for(let u=0; u<arrayConsumible.length; u++) {
            arrayConsumible[u].visible ? consumiblesActiveQty.push(u) : null
        }

        const htmlConsumibleList = 
            ( `<caption id="capConsumibleList">Cantidad de Consumibles: ${parseInt(consumiblesActiveQty.length)}</caption><br>
            <caption id="capDeleteConsumibleList">Cantidad de Consumibles Eliminados: ${parseInt(arrayConsumible.length - consumiblesActiveQty.length)}</caption>`)

        document.getElementById('capConsumibleList').innerHTML = htmlConsumibleList
        
    } else {
        html = (`<tr>
                    <td colspan="13">
                        <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarConsumibles').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('consumibleTable').style.display = 'block';

    // ---- mensaje confirmacion eliminar consumible -----------
    function messageDeleteConsumible(id, code, designation) {

        const htmlForm = `El consumible ${designation} - Código: ${code}, se eliminará completamente.<br>
                            Está seguro que desea continuar?<br>
                            <form id="formDeleteConsumible" action="/api/consumibles/delete/${id}" method="get">
                                <fieldset>
                                </fieldset>
                            </form>`
    
        Swal.fire({
            title: `Eliminar Consumible <b>${designation}</b> - ${code}?`,
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
                document.getElementById("formDeleteConsumible").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Eliminado!',
                        `El consumible ${designation}, ha sido eliminado exitosamente.`,
                        'success'
                    )
                }, 600)
            } else {
                Swal.fire(
                    'No eliminado!',
                    `El consumible ${designation}, no ha sido eliminado.`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteConsumible"]')
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                const idConsumible = btn.id,
                    designation = document.getElementById(`designation_${idConsumible}`).innerText,
                    code = document.getElementById(`codigo_${idConsumible}`).innerText,
                    type = document.getElementById(`tipo_${idConsumible}`).innerText

                idConsumible && designation && code && type ? messageDeleteConsumible(idConsumible, designation, code) : null
            })
        }
    })
}

// ----------- Image Consumible Image behavior ---------------
const dropAreaImageConsumible = document.getElementById('drop-areaImageConsumibles'),
    fileInputImageConsumible = document.getElementById('fileInputImageConsumibles'),
    fileImputTextImageConsumible = document.getElementById('fileInputTextImageConsumibles'),
    removeImageButtonImageConsumible = document.getElementById('removeImageConsumibles'),
    alertImageConsumible = document.getElementById('alertImageConsumibles'),
    alertSizeImageConsumible = document.getElementById('alertSizeImageConsumibles')

Object.assign(dropAreaImageConsumible.style, {
    width: "300px",
    height: "200px",
    border: "2px dashed #ccc",
    margin: "0 auto 0 50px",
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "200px",
    cursor: "pointer"
})

dropAreaImageConsumible.addEventListener('dragover', (e) => {
    e.preventDefault()
    Object.assign(dropAreaImageConsumible.style, {
        border: "2px dashed #77d",
        backgroundColor: '#7777dd10'
    })
})

dropAreaImageConsumible.addEventListener('dragleave', (e) => {
    e.preventDefault()
    Object.assign(dropAreaImageConsumible.style, {
        border: "2px dashed #ccc",
        backgroundColor: '#B6B6B6'
    })
})

function alertRefresh() {
    removeImageButtonImageConsumible.style.display = 'none'
    fileInputImageConsumible.value = ''
    fileImputTextImageConsumible.value = ''
    Object.assign(dropAreaImageConsumible.style, {
        border: "2px dashed #ccc",
        textAlign: "center",
        backgroundColor: '#B6B6B6',
        display: 'block'
    })
    dropAreaImageConsumible.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageImageConsumible() {
    alertImageConsumible.style.display = 'flex'
    alertSizeImageConsumible.style.display = 'none'
    alertRefresh()
}

function alertSizeImageImageConsumible() {
    alertSizeImageConsumible.style.display = 'flex'
    alertImageConsumible.style.display = 'none'
    alertRefresh()
}

dropAreaImageConsumible.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaImageConsumible.style, {
            border: "3px dashed #2d2",
            backgroundColor: '#22dd2210'
        })
        handleFileUploadImageConsumible(file)

    } else {
        alertNotImageImageConsumible()
    }     
})

dropAreaImageConsumible.addEventListener('click', () => {
    fileInputImageConsumible.click()
})

fileInputImageConsumible.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputImageConsumible.files[0]
    
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaImageConsumible.style, {
            border: "3px dashed #2d2",
            backgroundColor: '#22dd2210'
        })
        handleFileUploadImageConsumible(file)

    } else {
        alertNotImageImageConsumible()
    }     
})

function handleFileUploadImageConsumible(file) {
    const fileSize = file.size,
        fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_IMAGESCONSUMIBLES
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.'),
            name = file.name.substring(0, dotIndex),
            extension = file.name.substring(dotIndex)
        fileImputTextImageConsumible.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonImageConsumible.style.display = 'flex'

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaImageConsumible.innerHTML = 
                `<img class="p-2 mb-3" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            alertImageConsumible.style.display = 'none'
            alertSizeImageConsumible.style.display = 'none'
        }

    } else {
        alertSizeImageImageConsumible()
    }
}

removeImageButtonImageConsumible.addEventListener('click', (e)=> {
    e.preventDefault()
    alertImageConsumible.style.display = 'none'
    alertSizeImageConsumible.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})


function messageNewConsumible(designation, code, type, diam, largo, stock) {
    if (designation, code, type, diam, stock) {
        Swal.fire({
            title: `Nuevo Consumible <b>${designation}</b>`,
            text: `El consumible ${designation} (${type}), código: ${code}, stock: ${stock}, será registrada!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: true,
            confirmButtonText: 'Registrarla! <i class="fa-solid fa-screwdriver-wrench"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Creado!',
                    `El consumible ${designation} (${type}), código: ${code}, stock: ${stock}, ha sido registrado exitosamente.`,
                    'success'
                )
                setTimeout(() => {
                    document.getElementById("newConsumibleForm").submit()
                }, 600)
                
            } else {
                Swal.fire(
                    'No registrada!',
                    `El consumible ${designation}, no ha sido registrada.`,
                    'info'
                )
                return false
            }
        })

    } else {
        swal.fire({
            title: 'Error',
            position: 'center',
            timer: 2500,
            text: `El Consumible no se creó correctamente!`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,
        })
    }
}

function messageWarningEmptyFields(designation, code, type, stock) {
    const formFields =[]
    
    designation == "" ? formFields.push('Designacion') : null
    code == "" ? formFields.push('Código') : null
    type == "" ? formFields.push('Tipo') : null
    stock == "" ? formFields.push('Stock') : null 

    formFields.length == 1 ?
        Swal.fire({
            title: `Campo Vacío`,
            text: `El campo ${formFields[0]} está vacío!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-microchip"></i>'
        })
    :
        Swal.fire({
            title: `${formFields.length} Campos Vacíos`,
            text: `Los campos ${formFields.join(", ")} están vacíos!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-microchip"></i>'
        })
}

const btnAddNewConsumible = document.getElementById('btnAddNewConsumibles')

btnAddNewConsumible.addEventListener('click', (event) => {
    event.preventDefault()
    const designation = document.getElementById('designation').value,
        code = document.getElementById('codeHidden').value,
        type = document.getElementById('type').value,
        stock = document.getElementById('stock').value

    designation && code && type && stock? 
        messageNewConsumible(designation, code, type.toUpperCase(), stock) :
        messageWarningEmptyFields(designation, code, type.toUpperCase(), stock)
})

let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key,
                forbiddenChars = /["$%?¡¿^=!'~`´ñÑáéíóúØ\\*{}\[\]<>@]/;

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

            // Expresión regular para números enteros de hasta cinco cifras (0 a 99999)
            const regexp = /^[0-9]{1,5}$/;

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

let codeInput = document.getElementById('code'),
    codeHidden = document.getElementById("codeHidden"),
    type = document.getElementById('type'),
    typeInput = document.getElementById('type').value

function disabledBtnAceptar () {
    let btnAceptarFrom = document.getElementById('btnAddNewConsumibles');
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

// -------- QR code generator ---------------
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newConsumiblesForm"),
        qrContainer = document.getElementById("qrConsumible"),
        downloadButton = document.getElementById('downloadQR');

    // Mostrar loader mientras se genera el QR
    function generateQRCodeWithLoader(data) {
        loader.style.display = 'block'; // Muestra el spinner
        qrContainer.style.display = 'none'
        qrContainer.innerHTML = ''; // Limpia cualquier contenido previo

        // Simula un retardo para mostrar el loader (por ejemplo, 2 segundos)
        setTimeout(() => {
            const qr = new QRCode(qrContainer, {
                text: data,
                width: 160,
                height: 160,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.Q,
            });

            loader.style.display = 'none'; // Oculta el spinner
            qrContainer.style.display = 'flex'
        }, 1000); // Cambia el tiempo según el procesamiento real
        
        // Espera un pequeño tiempo para asegurarse de que el QR se haya generado
        setTimeout(() => {
            const qrCanvas = qrContainer.querySelector('canvas');
            if (qrCanvas) {
                downloadButton.style.display = 'block'; // Muestra el botón de descarga
            }
        }, 1500); // Ajusta el tiempo si es necesario
    }

    // Evento para capturar datos y generar el QR
    form.addEventListener("input", () => {
        const designation = document.getElementById("designation").value.trim(),
            code = document.getElementById("code").value.trim(),
            type = document.getElementById("type").value,
            characteristics = document.getElementById("characteristics").value.trim();

        let qrType = ''

        if (type === 'epp') {
            qrType = 'EPP'
        } else if (type === 'insertos') {
            qrType = 'Insertos'
        } else if (type === 'consumiblesAjuste') {
            qrType = "Consumibles Ajuste"
        } else if (type === 'consumiblesMeca') {
            qrType = "Consumibles Mecanizado"
        } else {
            qrType = "Otros Consumibles"
        }

        // Datos a incluir en el QR
        const qrData = JSON.stringify({
            designation,
            code,
            qrType,
            characteristics,
        });

        // Generar QR si hay datos válidos
        if (designation && code) {
            // generateQRCode(qrData);
            generateQRCodeWithLoader(qrData)
        } else {
            qrContainer.innerHTML = "Faltan datos para generar el código QR.";
        }
    });

    // Función para descargar el QR como imagen
    downloadButton.addEventListener('click', () => {
        const qrCanvas = qrContainer.querySelector('canvas');
        if (qrCanvas) {
            const link = document.createElement('a');
            link.href = qrCanvas.toDataURL(); // Convierte el canvas a un formato de imagen
            link.download = 'codigo-qr.png';
            link.click(); // Dispara el evento de descarga
        } else {
            Swal.fire(
                'Error!',
                `Primero debe generar el código QR para descargar.`,
                'info'
            )
            return false
        }
    });
});

