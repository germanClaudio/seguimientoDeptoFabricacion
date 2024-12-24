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

const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', yellow = 'warning', black = 'dark', white = 'light',
        active = 'Activa', inactive = 'Inactiva', info = 'info',
        toricas = 'Tóricas', planas = 'Planas', esfericas = 'Esféricas'
let html, stock

const typeConfigurations = {
    TOR: { optionType: yellow, showType: toricas, textColor: black },
    PLA: { optionType: grey, showType: planas, textColor: white },
    ESF: { optionType: blue, showType: esfericas, textColor: white }
};

// Configuración por defecto
const defaultConfig = { optionType: blue, showType: 'Otras', textColor: white };

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
// Mostrar el spinner y ocultar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('cuttingToolTable').style.display = 'none';
});

//  ----------- CuttingTools list ----------------
socket.on('cuttingToolsAll', (arrCuttingTools, arrUsers) => {
    let cadena = document.getElementById('mostrarUserName').innerText,
        indice = cadena.indexOf(","),
        name = cadena.substring(0,indice),
        index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin,
            userId = arrUsers[index]._id
        user ? renderCuttingToolsAdmin(arrCuttingTools, userId) : renderCuttingToolsUser(arrCuttingTools)
    }   
})

// --------------- Render Admin ----------------------------
const renderCuttingToolsAdmin = (arrCuttingTools) => {
    const arrayCuttingTool = arrCuttingTools
    if (arrCuttingTools.length > 0) {
        html = arrCuttingTools.map((element) => {
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
                            <td class="text-center" id="diam_${element._id}"><span>Ø${element.diam}</span> mm</td>
                            <td class="text-center" id="largo_${element._id}"><span>${element.largo}</span> mm</td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageCuttingTool}' width="150px" height="150px"></td>
                            <td class="text-center" id="stock_${element._id}"><span class="badge bg-${optionStock} text-light">${element.stock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">${element.creator[0].name} ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center">
                                    <a href="/api/herramientas/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Herramienta ${element.designation}"><i class="fa-solid fa-screwdriver-wrench"></i></a>
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

    // ---- mensaje confirmacion eliminar Herramienta -----------
    function messageDeleteCuttingTool(id, designation, code) {
        const htmlForm =
            `La herramienta ${designation} - Código: ${code}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteCuttingTool" action="/api/herramientas/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Eliminar Herramienta <b>${designation}</b> - ${code}?`,
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
                }, 600)
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
                    code = document.getElementById(`codigo_${idCuttingTool}`).innerText,
                    type = document.getElementById(`tipo_${idCuttingTool}`).innerText,
                    diam = document.getElementById(`diam_${idCuttingTool}`).innerText,
                    largo = document.getElementById(`largo_${idCuttingTool}`).innerText

                idCuttingTool && designation && code && type && diam && largo ? messageDeleteCuttingTool(idCuttingTool, designation, code) : null
            })
        }
    })
}

//----------------------- Render User -------------------------------
const renderCuttingToolsUser = (arrCuttingTools) => {
    const arrayCuttingTool = arrCuttingTools
    if (arrCuttingTools.length>0) {
        html = arrCuttingTools.map((element) => {
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
                            <td class="text-center" id="diam_${element._id}"><span>Ø${element.diam}</span> mm</td>
                            <td class="text-center" id="largo_${element._id}"><span>${element.largo}</span> mm</td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageCuttingTool}' width="150px" height="150px"></td>
                            <td class="text-center" id="stock_${element._id}"><span class="badge bg-${optionStock} text-light">${element.stock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">${element.creator[0].name} ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-blck align-items-center text-center mx-1">
                                    <a href="/api/herramientas/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Herramienta ${element.designation}"><i class="fa-solid fa-screwdriver-wrench"></i></a>
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
            title: `Eliminar Herramienta <b>${designation}</b> - ${code}?`,
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
                    code = document.getElementById(`codigo_${idCuttingTool}`).innerText,
                    type = document.getElementById(`tipo_${idCuttingTool}`).innerText,
                    diam = document.getElementById(`diam_${idCuttingTool}`).innerText,
                    largo = document.getElementById(`largo_${idCuttingTool}`).innerText

                idCuttingTool && designation && code && type && diam && largo? messageDeleteCuttingTool(idCuttingTool, designation, code) : null
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


function messageNewCuttingTool(designation, code, type, diam, largo, stock) {
    if (designation, code, type, diam, stock) {
        Swal.fire({
            title: `Nueva Herramienta <b>${designation}</b>`,
            text: `La herramienta ${designation} (${type}), código: ${code}, stock: ${stock}, será registrada!`,
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
                    'Creada!',
                    `La herramienta ${designation} (${type}) Ø${diam}mm, largo: ${largo}, código: ${code}, stock: ${stock}, ha sido registrada exitosamente.`,
                    'success'
                )
                setTimeout(() => {
                    document.getElementById("newCuttingToolForm").submit()
                }, 600)
                
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
            timer: 2500,
            text: `La Herramienta no se creó correctamente!`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,
        })
    }
}

function messageWarningEmptyFields(designation, code, type, diam, largo, stock) {
    const formFields =[]
    
    designation == "" ? formFields.push('Designacion') : null
    code == "" ? formFields.push('Código') : null
    type == "" ? formFields.push('Tipo') : null
    diam == "" ? formFields.push('Diam') : null
    stock == "" ? formFields.push('Stock') : null 
    largo == "" ? formFields.push('Largo') : null

    formFields.length == 1 ?
        Swal.fire({
            title: `Campo Vacío`,
            text: `El campo ${formFields[0]} está vacío!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-screwdriver-wrench"></i>'
        })
    :
        Swal.fire({
            title: `${formFields.length} Campos Vacíos`,
            text: `Los campos ${formFields.join(", ")} están vacíos!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-screwdriver-wrench"></i>'
        })
}

const btnAddNewCuttingTool = document.getElementById('btnAddNewCuttingTool')

btnAddNewCuttingTool.addEventListener('click', (event) => {
    event.preventDefault()
    const designation = document.getElementById('designation').value,
        code = document.getElementById('codeHidden').value,
        type = document.getElementById('type').value,
        diam = document.getElementById('rangeValue').value,
        largo = document.getElementById('rangeValueRect').value,
        stock = document.getElementById('stock').value

    designation && code && type && diam && stock && largo? 
        messageNewCuttingTool(designation, code, type.toUpperCase(), diam, largo, stock) :
        messageWarningEmptyFields(designation, code, type.toUpperCase(), diam, largo, stock)
})

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

        // Reemplazar caracteres prohibidos al pegar o modificar el contenido
        input.addEventListener('input', function(event) {
            let forbiddenChars = /["$%?¡¿^=!'~`´\\*{}\[\]<>@]/g; // Caracteres prohibidos

            // Reemplazar caracteres prohibidos
            let newValue = input.value.replace(forbiddenChars, '');

            // Actualizar el valor del input
            input.value = newValue;
        });
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

const valores = [2, 3, 4, 6, 10, 16, 20, 25, 32, 50, 52, 63, 80, 100, 125], // Valores para los radios de los círculos
    avances = [52, 76, 102, 128, 156, 182, 208, 234, 260, 286, 312, 338, 364, 390, 420], // Valores de los radios de los círculos

    largos = [15, 20, 25, 30, 40, 45, 50, 57, 60, 63, 65, 66, 68, 70, 75, 76, 77, 78, 81, 86, 88, 89, 90, 91, 94, 96, 97, 98,
            102, 107, 108, 110, 111, 113, 116, 119, 120, 121, 123, 125, 128, 130, 131, 132, 138, 140, 142, 143, 144, 146, 147, 148,
            152, 154, 155, 158, 163, 164, 165, 170, 173, 175, 176, 177, 180, 182, 183, 186, 188, 191, 192, 196, 197, 198,
            204, 210, 214, 216, 217, 220, 221, 223, 225, 226, 230, 231, 233, 238, 241, 248, 254, 264, 265, 269, 270, 276, 277, 286, 291, 296,
            302, 310, 311, 321, 330, 331, 341, 342, 343, 351, 376, 377, 386, 391, 394, 442 ],

    avancesLargos = [0, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 36, 38, 40, 42, 44, 46, 48,
                    50, 52, 54, 56, 58, 60, 62, 63, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98,
                    100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148,
                    150, 152, 154, 156, 158, 160, 162, 164, 166, 167, 169, 170, 172, 173, 175, 177, 179, 181, 183, 185, 187, 189, 190, 192, 194, 196, 198,
                    200, 202, 204, 206 ],

    range = document.getElementById("customRange"),
    displayValue = document.getElementById("rangeValue"),
    diamHidden = document.getElementById("diamHidden"),
    dynamicCircle = document.getElementById("dynamicCircle"),

    rangeRect = document.getElementById("customRangeRect"),
    displayValueRect = document.getElementById("rangeValueRect"),
    rectHidden = document.getElementById("rectHidden"),
    dynamicRect = document.getElementById("dynamicRect"),

    codeInput = document.getElementById('code'),
    codeHidden = document.getElementById("codeHidden"),

    type = document.getElementById('type'),
    radio = document.getElementById('radio'),
    cono = document.getElementById('cono'),
    reduccion = document.getElementById('reduccion'),
    prolongacion = document.getElementById('prolongacion'),
    arrastre = document.getElementById('arrastre'),
    terminacion = document.getElementById('terminacion')

let typeInput = document.getElementById('type').value,
    radioInput = document.getElementById('radio').value,
    conoInput = document.getElementById('cono').value,
    reduccionInput = document.getElementById('reduccion').value,
    prolongacionInput = document.getElementById('prolongacion').value,
    arrastreInput = document.getElementById('arrastre').value,
    terminacionInput = document.getElementById('terminacion').value

    radioInput.value = conoInput.value = reduccionInput.value = prolongacionInput.value = arrastreInput.value = terminacionInput.value = ''

    codeInput.value = codeHidden.value = typeInput.toUpperCase() + valores[0] + '_L' + largos[0]

    // Inicialización del círculo
    dynamicCircle.setAttribute("cx", 82); //82 Centro fijo en X al inicio del input range
    dynamicCircle.setAttribute("cy", 45); // Centro fijo en Y
    dynamicCircle.setAttribute("r", 50);

    // Inicialización del rectángulo
    dynamicRect.setAttribute("width", 60)
    dynamicRect.setAttribute("height", 38)
    dynamicRect.setAttribute("x", 70); // Centrado inicial
    dynamicRect.setAttribute("y", 25)

    range.addEventListener("input", () => {
        let valor = updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)

        displayValue.value = valor.value; // Actualizar el valor mostrado
        diamHidden.value = valor.value
        dynamicCircle.setAttribute("r", parseInt(avances[valor.index])) // Actualizar el radio del círculo
        dynamicCircle.setAttribute("cx", 82); // Mantener el centro fijo desplazado 82px desde el inicio del input range

        const valueRange = range.value, max = 14, progress = Math.trunc((valueRange / max) * 100)

        range.style.background = `linear-gradient(to right, #005bbb ${progress}%, #ddd ${progress}%)`;
    });

    rangeRect.addEventListener("input", () => {        
        let valor = updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)

        displayValueRect.value = valor.valueRect; // Actualizar el valor mostrado
        rectHidden.value = valor.valueRect
        
        // Centrar el rectángulo
        dynamicRect.setAttribute("x", 70)
        dynamicRect.setAttribute("y", 25)

        const valueRangeRect = rangeRect.value, max = 106, progress = Math.trunc((valueRangeRect / max) * 100)

        rangeRect.style.background = `linear-gradient(to right, #005bbb ${progress}%, #ddd ${progress}%)`;
        
        // Actualizar el tamaño del rectángulo
        dynamicRect.setAttribute("width", parseInt(60 + avancesLargos[valor.indexRect]*1.8))
        
    });

    type.addEventListener("change", () => {
        if (type.value === 'TOR') {
            radio.removeAttribute('disabled')
        } else {
            radio.setAttribute('disabled', true)
            radio.value = ''
        }
        updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
    });

    radio.addEventListener("change", () => {
        updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
    });

    cono.addEventListener("change", () => {
        updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
    });

    reduccion.addEventListener("change", () => {
        updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
    });

    prolongacion.addEventListener("change", () => {
        updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
    });

    arrastre.addEventListener("change", () => {
        updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
    });

    terminacion.addEventListener("change", () => {
        updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
    });
    
    function updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion) {
        const index = parseInt(range.value, 10), // Índice del valor actual
            value = valores[index];

        const indexRect = parseInt(rangeRect.value, 10), // Índice del valor actual
            valueRect = largos[indexRect];

        let valorRadio, valorCono, valorReduccion, valorProlongacion, valorArrastre, valorTerminacion
        
        radio.value !== '' ? valorRadio = `_${radio.value}` : valorRadio = radio.value
        cono.value !== '' ? valorCono = `_${cono.value}` : valorCono = cono.value
        reduccion.value !== '' ? valorReduccion = `_${reduccion.value}` : valorReduccion = reduccion.value
        prolongacion.value !== '' ? valorProlongacion = `_${prolongacion.value}` : valorProlongacion = prolongacion.value
        arrastre.value !== '' ? valorArrastre = `_${arrastre.value}` : valorArrastre = arrastre.value
        terminacion.value !== '' ? valorTerminacion = `_${terminacion.value}` : valorTerminacion = terminacion.value

        codeInput.value = codeHidden.value = type.value + value + valorRadio + '_L' + valueRect +
                                            valorCono + valorReduccion + valorProlongacion + valorArrastre + valorTerminacion
        
        return {value, valueRect, index, indexRect}
    }


function disabledBtnAceptar () {
    let btnAceptarFrom = document.getElementById('btnAddNewCuttingTool');
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

