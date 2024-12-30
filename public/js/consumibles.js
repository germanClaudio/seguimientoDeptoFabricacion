const socket = io.connect()
let URL_GOOGLE_STORE_IMAGESCONSUMIBLES,
    imagenLazy = '../src/images/upload/ConsumiblesImages/loader.gif';

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
    consumiblesAjuste: { optionType: blue, showType: consumibleAjuste, textColor: white },
    consumiblesMeca: { optionType: black, showType: consumibleMeca, textColor: white },
    otros: { optionType: green, showType: otros, textColor: white }
};

// Configuración por defecto
const defaultConfig = { optionType: info, showType: 'Otro', textColor: black };

//-------------------------------------------
const inputName = document.getElementById('designation')
function mostrarNombre() {
    const titleNewConsumible = document.getElementById('titleNewConsumibles')
    titleNewConsumible.innerText = 'Agregar Nuevo Consumible o EPP: '+ inputName.value
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
                element.stock > 0 ? stock = `<tr id="consumibleRow_${element._id}">` : stock =`<tr id="consumibleRow_${element._id}" class="row-highlight-stockCero">`
                return (`${stock}
                            <td class="text-center" id="checkSelect_${element._id}" name="checkSelect"><input class="form-check-input border border-2 border-primary shadow-lg rounded" type="checkbox" value="" id="inputCheckConsumible_${element._id}" name="inputCheckConsumible"></td>
                            <td class="text-center" id="codigo_${element._id}"><strong>${element.code}</strong></td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}">${showType}</span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center" id="imagenConsumible_${element._id}"><img id="imagen_${element._id}" class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageConsumible}' width="125px" height="125px"></td>
                            <td class="text-center"><img class="imgLazyLoad py-2" alt="QRCode" data-src="${element.qrCode}" src='${imagenLazy}' width="100px" height="100px" loading="lazy"></td>
                            <td class="text-center" id="stock_${element._id}"><span id="spanStock_${element._id} name="stock" class="badge bg-${optionStock} text-light">${element.stock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">${element.creator[0].name} ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center">
                                    <a href="/api/consumibles/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Consumible ${element.designation}"><i class="fa-solid fa-cart-shopping"></i></a>
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
            ( `<caption id="capConsumiblesList">Cantidad de Consumibles: ${parseInt(consumiblesActiveQty.length)}</caption><br>
            <caption id="capDeleteConsumiblesList">Cantidad de Consumibles Eliminados: ${parseInt(arrayConsumible.length - consumiblesActiveQty.length)}</caption>`)

        document.getElementById('capConsumiblesList').innerHTML = htmlConsumibleList
        
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

    //------------- LazyLoad Images ------------------
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            setTimeout(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src; // Sustituye data-src por src
                        img.onload = () => img.classList.add("loaded");
                        img.removeAttribute("data-src"); // Limpia el atributo
                        observer.unobserve(img); // Deja de observar esta imagen
                    }
                });
            }, 2000);
        });
        lazyImages.forEach(img => observer.observe(img));
        
    } else {
        // Fallback para navegadores sin IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

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
                element.stock > 0 ? stock = `<tr id="consumibleRow_${element._id}" name="checkSelect">` : stock =`<tr id="consumibleRow_${element._id}" style="background-color:rgba(32, 32, 32, 0.25);">`
                return (`${stock}
                            <td class="text-center" id="checkSelect_${element._id}"><input type="check" id="inputCheckConsumible_${element._id}" name="inputCheckConsumible_${element._id}" class="input-check" ></td>
                            <td class="text-center" id="codigo_${element._id}"><strong>${element.code}</strong></td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${element.imageConsumible}' width="140px" height="140px"></td>
                            <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="QR" src='${element.qrCode}' width="125px" height="125px"></td>
                            <td class="text-center" id="stock_${element._id}"><span class="badge bg-${optionStock} text-light">${element.stock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">${element.creator[0].name} ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-blck align-items-center text-center mx-1">
                                    <a href="/api/consumibles/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Consumible ${element.designation}"><i class="fa-solid fa-cart-shopping"></i></a>
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
            ( `<caption id="capConsumiblesList">Cantidad de Consumibles: ${parseInt(consumiblesActiveQty.length)}</caption><br>
            <caption id="capDeleteConsumiblesList">Cantidad de Consumibles Eliminados: ${parseInt(arrayConsumible.length - consumiblesActiveQty.length)}</caption>`)

        document.getElementById('capConsumiblesList').innerHTML = htmlConsumibleList
        
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

function messageNewConsumible(designation, code, type, stock) {
    if (designation, code, type, stock) {
        Swal.fire({
            title: `Nuevo Consumible <b>${designation}</b>`,
            text: `El consumible ${designation} (${type}), código: ${code}, stock: ${stock}, será registrado!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: true,
            confirmButtonText: 'Registrarlo! <i class="fa-solid fa-cart-shopping"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Creado!',
                    `El consumible ${designation} (${type}), código: ${code}, stock: ${stock}, ha sido registrado exitosamente.`,
                    'success'
                )
                setTimeout(() => {
                    document.getElementById("newConsumiblesForm").submit()
                }, 600)
                
            } else {
                Swal.fire(
                    'No registrado!',
                    `El consumible ${designation}, no ha sido registrado.`,
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
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-cart-shopping"></i>'
        })
    :
        Swal.fire({
            title: `${formFields.length} Campos Vacíos`,
            text: `Los campos ${formFields.join(", ")} están vacíos!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-cart-shopping"></i>'
        })
}

const btnAddNewConsumible = document.getElementById('btnAddNewConsumibles')
btnAddNewConsumible.addEventListener('click', (event) => {
    event.preventDefault()
    const designation = document.getElementById('designation').value,
        code = document.getElementById('code').value,
        type = document.getElementById('type').value,
        stock = document.getElementById('stock').value

    designation && code && type && stock? 
        messageNewConsumible(designation, code, type, stock) :
        messageWarningEmptyFields(designation, code, type, stock)
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

        // Reemplazar caracteres prohibidos al pegar o modificar el contenido
        input.addEventListener('input', function(event) {
            let forbiddenChars = /["$%?¡¿^=!'~`´Ø\\*{}\[\]<>@]/g; // Caracteres prohibidos
            let accentedChars = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', ñ: 'n', Ñ: 'N' }; // Vocales con acentos

            // Reemplazar caracteres prohibidos
            let newValue = input.value.replace(forbiddenChars, '');

            // Reemplazar vocales con acento por las equivalentes sin acento
            newValue = newValue.replace(/[áéíóúÁÉÍÓÚñÑ]/g, function(match) {
                return accentedChars[match];
            });

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
    let btnAceptarFrom = document.getElementById('btnAddNewConsumibles')
    const allInputs = document.querySelectorAll('input[type="text"], textarea, input[type="file"], input[type="hidden"], input[type="number"]')

    function stylesButtons (btnAceptar, input) {
        input.classList.add("border-primary", "border-2", "shadow")
        btnAceptar.removeAttribute('disabled')
        btnAceptar.style = "cursor: pointer;"
    }
    
    allInputs.forEach(function(input) {
        input.addEventListener('input', (event) => {
            event.preventDefault()
            btnAceptarFrom ? stylesButtons (btnAceptarFrom, input) : null
        })
    })    
}
disabledBtnAceptar()

function disabledBtnModificar () {
    let allInputs = document.querySelectorAll('input[type="number"]'),
        btnModificarStock = document.getElementById('btnAceptarModalStock')

    function stylesButtons (btnModificarStock, input) {
        input.classList.add("border-primary", "border-2", "shadow")
        btnModificarStock.removeAttribute('disabled')
        btnModificarStock.style = "cursor: pointer;"
    }
    
    allInputs.forEach(function(input) {
        input.addEventListener('input', (event) => {
            event.preventDefault()
            btnModificarStock ? stylesButtons (btnModificarStock, input) : null
        })
    })    
}

// -------- QR code generator ---------------
const MAX_QR_LENGTH = 1000; // Límite máximo para Versión 40 con nivel M 2331
const versionQR = 10; //1-10-20-40 Establece la versión máxima

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newConsumiblesForm"),
        qrContainer = document.getElementById("qrConsumible"),
        downloadButton = document.getElementById('downloadQR'),
        loader = document.getElementById("loader"), // Asegúrate de tener un elemento con ID 'loader'
        qrLabel = document.getElementById("qrLabel"),
        qrConsumibleInput = document.getElementById("qrConsumibleInput");

    let isGeneratingQR = false;

    // Mostrar loader mientras se genera el QR
    function generateQRCodeWithLoader(data) {
        qrLabel.innerText = `QR (autogenerado) ${data.length}/${MAX_QR_LENGTH} caracteres`
        if (data.length > MAX_QR_LENGTH) {
            Swal.fire(
                `El contenido excede el límite permitido (${MAX_QR_LENGTH} caracteres) para el código QR.`,
                'info'
            );
            return; // Detiene la generación del QR
        }

        if (isGeneratingQR) return; // Evita generar múltiples QRs
        isGeneratingQR = true;

        loader.classList.add('active'); // Muestra el loader
        qrContainer.classList.add('faded'); // Hace el QR semitransparente

        // Simula un retardo para mostrar el loader
        setTimeout(() => {
            qrContainer.innerHTML = ''; // Limpia cualquier contenido previo

            // Usar la librería qrCode-generator
            const qr = qrcode(versionQR, 'L'); // Versión ?? y Nivel L
            qr.addData(data);
            qr.make();

            // Genera el código QR como un elemento <img>
            qrContainer.innerHTML = qr.createImgTag(6); // Tamaño del módulo ajustado (6)
            loader.classList.remove('active'); // Oculta el loader
            qrContainer.classList.remove('faded'); // Restaura la opacidad del QR
            
            isGeneratingQR = false; // Resetea el indicador

            // Habilitar el botón de descarga
            const qrImage = qrContainer.querySelector('img');
            if (qrImage) {
                qrImage.id = "qrImage";
                qrConsumibleInput.value = qrImage.src
                downloadButton.style.display = 'block';
                downloadButton.addEventListener("click", () => downloadQRCode(qrImage.src));
            }
        }, 800); // Cambia el tiempo según el procesamiento real
    }

    // Evento para capturar datos y generar el QR
    form.addEventListener("input", () => {
        const designation = document.getElementById("designation").value.trim(),
            code = document.getElementById("code").value.trim(),
            type = document.getElementById("type").value,
            characteristics = document.getElementById("characteristics").value.trim();

        // Mapeo de tipos a sus correspondientes descripciones
        const typeMapping = {
            epp: 'EPP',
            insertos: 'Insertos',
            consumiblesAjuste: 'Consumibles Ajuste',
            consumiblesMeca: 'Consumibles Mecanizado',
        };

        // Obtener el valor correspondiente o asignar un valor predeterminado
        const qrType = typeMapping[type] || "Otros Consumibles";

        // Datos a incluir en el QR
        const qrData = JSON.stringify({
            designation,
            code,
            qrType,
            characteristics,
        });

        // Generar QR si hay datos válidos
        if (designation && code) {
            generateQRCodeWithLoader(qrData);
        } else {
            qrContainer.innerHTML = "Faltan datos para generar el código QR.";
            qrConsumibleInput.value = ''
        }
    });

    // Función para descargar el QR como imagen
    downloadButton.addEventListener('click', () => {
        const qrCanvas = qrContainer.querySelector('canvas');
        if (qrCanvas) {
            const link = document.createElement('a');
            link.href = qrCanvas.toDataURL(); // Convierte el canvas a un formato de imagen
            link.download = `codigo-qr${type.value}.png`;
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


//------------- Rows & Cards selected ------------------
document.addEventListener("DOMContentLoaded", () => {
    const tableId = "consumiblesTable",
        table = document.getElementById(tableId),
        cardsContainer = document.getElementById("showConsumiblesSearch"),
        btnCheckSelectionAll = document.getElementById("btnCheckSelectionAll"),
        spanCheckSelecMasive = document.getElementById("spanCheckSelecMasive");

    // Función para inicializar eventos en checkboxes de filas
    function initializeRowCheckboxes() {
        const rowCheckboxes = table.querySelectorAll('input[type="checkbox"]');
        rowCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                syncCheckboxWithCard(checkbox);
                updateSelectionState();
                updateRowStyle(checkbox);
            });
        });
    }

    // Función para inicializar eventos en checkboxes de cards
    function initializeCardCheckboxes() {
        const cardCheckboxes = cardsContainer.querySelectorAll('input.form-check-input');
        cardCheckboxes.forEach((checkbox) => {
            if (!checkbox.dataset.initialized) {
                checkbox.dataset.initialized = true;
                checkbox.addEventListener("change", () => {
                    syncCheckboxWithRow(checkbox);
                    updateSelectionState();
                });
            }
        });
    }

    // Sincronizar checkbox de fila con card correspondiente
    function syncCheckboxWithCard(rowCheckbox) {
        const extractIdNumber = (id) => id.split('_').pop()
        let idInputCard = extractIdNumber(rowCheckbox.id)
        const cardCheckbox = cardsContainer.querySelector(`#inputCheckConsumibleCard_${idInputCard}`);
        if (cardCheckbox) {
            if (rowCheckbox.checked) {
                cardCheckbox.checked = true;
                cardCheckbox.disabled = true; // Deshabilitar para evitar duplicados
            } else {
                cardCheckbox.checked = false;
                cardCheckbox.disabled = false; // Habilitar nuevamente
            }
            updateCardStyle(cardCheckbox);
            updateRowStyle(rowCheckbox);
        }
    }

    // Sincronizar checkbox de card con fila correspondiente
    function syncCheckboxWithRow(cardCheckbox) {
        const extractIdNumber = (id) => id.split('_').pop()
        let idInputRow = extractIdNumber(cardCheckbox.id)
        const rowCheckbox = table.querySelector(`#inputCheckConsumible_${idInputRow}`)
        if (rowCheckbox) {
            if (cardCheckbox.checked) {
                rowCheckbox.checked = true;
                rowCheckbox.disabled = true; // Deshabilitar para evitar duplicados
            } else {
                rowCheckbox.checked = false;
                rowCheckbox.disabled = false; // Habilitar nuevamente
            }
            updateRowStyle(rowCheckbox);
            updateCardStyle(cardCheckbox);
        }
    }

    // Actualizar estilo de las filas al cambiar el estado del checkbox
    function updateRowStyle(rowCheckbox) {
        const row = rowCheckbox.closest("tr");
        console.log('row: ', row)
        if (rowCheckbox.checked) {
            row.classList.add("row-highlight");
            row.classList.remove("row-highlight-stockCero");
        } else {
            row.classList.remove("row-highlight");
        }
    }

    // Actualizar estilo de las cards al cambiar el estado del checkbox
    function updateCardStyle(cardCheckbox) {
        const card = cardCheckbox.closest("div[id^='cardSelected_']");
        if (cardCheckbox.checked) {
            card.classList.add("cardSelected");
            card.classList.remove("shadow-lg");
        } else {
            card.classList.remove("cardSelected");
            card.classList.add("shadow-lg");
        }
    }

    // Actualizar contador y estado del botón masivo
    function updateSelectionState() {
        const selectedRowCheckboxes = table.querySelectorAll('input[type="checkbox"]:checked');
        // const selectedCardCheckboxes = cardsContainer.querySelectorAll('input.form-check-input:checked')
        let totalSelected = selectedRowCheckboxes.length //+ selectedCardCheckboxes.length;

        spanCheckSelecMasive.textContent = totalSelected;
        btnCheckSelectionAll.disabled = totalSelected === 0;
        spanCheckSelecMasive.classList.toggle("bg-danger", totalSelected === 0);
        spanCheckSelecMasive.classList.toggle("bg-success", totalSelected > 0);
    }

    // Configurar MutationObservers
    const rowObserver = new MutationObserver(() => {
        initializeRowCheckboxes();
    });

    const cardObserver = new MutationObserver(() => {
        initializeCardCheckboxes();
    });

    rowObserver.observe(table, { childList: true, subtree: true });
    cardObserver.observe(cardsContainer, { childList: true, subtree: true });

    // Inicializar eventos al cargar
    initializeRowCheckboxes();
    initializeCardCheckboxes();

    // Botón de SweetAlert2
    btnCheckSelectionAll.addEventListener("click", () => {
        const extractIdNumber = (id) => id.split('_').pop(); // Función para extraer el número del ID

        const selectedCheckboxes = Array.from(table.querySelectorAll('input[type="checkbox"]:checked'))
            .concat(Array.from(cardsContainer.querySelectorAll('input.form-check-input:checked')))
            .reduce((accumulator, checkbox) => {
                const row = checkbox.closest("tr"),
                    card = checkbox.closest("div[id^='cardSelected_']"),
                    idNumber = extractIdNumber(checkbox.id); // Extrae el número del ID

                // Verifica si el ID (número) ya fue procesado
                if (accumulator.some(item => item.idNumber === idNumber)) {
                    return accumulator; // No agregar duplicados
                }

                // Agrega al acumulador según corresponda (row o card)
                if (card) {
                    accumulator.push({
                        idNumber: idNumber,
                        id: checkbox.id,
                        codigo: card.querySelector(`[id^="cardCodigo_"]`).textContent.trim(),
                        tipo: card.querySelector(`[id^="cardTipo_"]`).textContent.trim(),
                        descripcion: card.querySelector(`[id^="cardDesignation_"]`).textContent.trim(),
                        imageConsumible: card.querySelector("img").src.trim(),
                        stock: card.querySelector(`[id^="cardStock_"]`).textContent.trim(),
                    });

                } else if (row) {
                    accumulator.push({
                        idNumber: idNumber,
                        id: checkbox.id,
                        codigo: row.querySelector(`[id^="codigo_"]`).textContent.trim(),
                        tipo: row.querySelector(`[id^="tipo_"]`).textContent.trim(),
                        descripcion: row.querySelector(`[id^="designation_"]`).textContent.trim(),
                        imageConsumible: row.querySelector("img").src.trim(),
                        stock: row.querySelector(`[id^="stock_"] span`).textContent.trim(),
                    });
                }
                return accumulator;
            }, []);

        // Generar SweetAlert2 con los datos seleccionados
        const tableHtml = `
            <form id="formStockValues" action="/api/consumibles/modificarStock" method="post">
                <fieldset>
                    <table id="stockConsumiblesTable" class="table align-middle" style="font-size: 11pt";>
                        <thead>
                            <tr>
                                <th style="width:15vw" class="text-center">Código</th>
                                <th style="width:25vw" class="text-center">Tipo</th>
                                <th style="width:25vw" class="text-center">Designación</th>
                                <th style="width:15vw" class="text-center">Imagen</th>
                                <th style="width:15vw" class="text-center">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${selectedCheckboxes.map((data) =>
                                `<tr>
                                    <td><strong>${data.codigo}</strong></td>
                                    <td><span class="common-style ${data.tipo.replace(/\s+/g, "").toLowerCase()}">${data.tipo}</span></td>
                                    <td>${data.descripcion}</td>
                                    <td><img class="img-fluid rounded-3 py-2" alt="Imagen" src='${data.imageConsumible}' width="60px" height="60px"></td>
                                    <td><input type="number" name="inputStockNumber_${extractIdNumber(data.id)}" class="form-control" value="${data.stock}" data-id="${data.id}" min="0" max="5000">
                                        <input type="hidden" name="idItemHidden_${extractIdNumber(data.id)}" value="${extractIdNumber(data.id)}" style="display: none;"></td>
                                </tr>`).join("")}
                        </tbody>
                    </table>
                </fieldset>
            </form>`;

        Swal.fire({
            title: "Modificar Stock",
            html: tableHtml,
            confirmButtonText: 'Modificar <i class="fa-regular fa-save"></i>',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
            cancelButtonColor: '#d33',
            width: 1000,
            position: "center",
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModalStock')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }
        }).then((result) => {
            const formStockValues = document.getElementById('formStockValues')
            if (result.isConfirmed) {
                formStockValues.submit()

                setTimeout(() => {
                    Swal.fire({
                        title: `Cambios Stock realizados!`,
                        html: 'El stock ha sido actualizado con éxito',
                        icon: 'success',
                        width: 600
                    })
                }, 500)

            } else {
                Swal.fire({
                    title: `Cambios Stock no guardado!`,
                    html: 'El stock no ha sido actualizado',
                    icon: 'warning',
                    width: 600
                })
                return false
            }
        });
        setTimeout(() => {
            disabledBtnModificar ()
        }, 300)
    });
});