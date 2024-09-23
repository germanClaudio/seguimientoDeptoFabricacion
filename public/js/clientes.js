let URL_GOOGLE_STORE_LOGOCLIENTS = 'https://storage.googleapis.com/imagenesproyectosingenieria/upload/LogoClientImages/'
const socket = io.connect()

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const YY = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

// function extractNumbers(str) {
//     const numbers = str.match(/\d{1,2}/g); // Extract 1 or 2 digit numbers from the string
    
//     if (numbers) {
//         if (numbers.length === 2) {
//             // If two numbers are found, check if both are numbers
//             if (!isNaN(parseInt(numbers[0])) && !isNaN(parseInt(numbers[1]))) {
//                 return numbers; // Return both numbers as an array
//             }
//         } else if (numbers.length === 1) {
//             // If only one number is found, check if it's a number
//             if (!isNaN(parseInt(numbers[0]))) {
//                 return numbers[0]; // Return the single number
//             }
//         }
//     }
//     return null // Return null if no valid numbers are found
// }

//-------------------------------------------
const inputName = document.getElementById('name')
function mostrarNombre() {
    const titleNewClient = document.getElementById('titleNewClient')
    titleNewClient.innerText = 'Nuevo Cliente: '+ inputName.value
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
    document.getElementById('clientTable').style.display = 'none';
});

//  ---------------- Clients list ----------------
socket.on('clientsAll', (arrClient, arrUsers) => {
    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin
        let userId = arrUsers[index]._id
        user ? renderClientAdmin(arrClient, userId) : renderClientUser(arrClient)
    }   
})

// --------------- Render Admin -----------------------------------
const renderClientAdmin = (arrClient) => {
    const arrayClient = arrClient
    
    const html = arrClient.map((element) => {
        let green = 'success'
        let red = 'danger'
        let text = "Activo"
        let grey = 'secondary'
        let black = 'dark'
        let blue = 'primary'
        let result = 'S/P'
        let colorResult = grey
        let colorStatus = green
        let idChain = element._id.substring(19)
        
        let userArr = []
        function loopUserId() {
            for (let i=0; i < element.creator.length; i++) {
                userArr.push(
                    element.creator[i].name,
                    element.creator[i].lastName
                )
            }
            return userArr.join('<br>')
        }

        let modifArr = []
        function loopModifId() {
            for (let i=0; i < element.modificator.length; i++) {
                modifArr.push(
                    element.modificator[i].name,
                    element.modificator[i].lastName
                )
            }
            return modifArr.join('<br>')
        }

        // Asignar colorStatus basado en element.status
        colorStatus = element.status ? green : red;

        // Asignar colorResult y result solo si project > 0
        if (element.project > 0) {
            colorResult = element.status ? black : blue;
            result = element.project;
        }

        // Asignar text solo si está inactivo
        if (!element.status) {
            text = "Inactivo";
        }

        if(element.visible) {
            return (`<tr>
                        <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                        <td class="text-center" id="name_${element._id}">${element.name}</td>
                        <td class="text-center"><a href="/api/clientes/select/${element._id}"><img id="logo_${element._id}" class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.logo}' width="100px" height="80px"></a></td>
                        <td class="text-center">${element.code}</td>
                        <td class="text-center"><span class="badge rounded-pill bg-${colorStatus}">${text}</span></td>
                        <td class="text-center"><span id="projectQty_${element._id}" class="badge rounded-pill bg-${colorResult}">${result}</span></td>
                        <td class="text-center">${loopUserId()}</td>
                        <td class="text-center">${element.timestamp}</td>
                        <td class="text-center">${loopModifId()}</td>
                        <td class="text-center">${element.modifiedOn}</td>
                        <td class="text-center">
                            <div class="d-block align-items-center">
                                <a href="/api/clientes/select/${element._id}" class="btn btn-secondary btn-sm me-1" data-toggle="tooltip" data-placement="top" title="Editar cliente ${element.name}"><i class="fa-regular fa-pen-to-square"></i></a>
                                <a href="/api/clientes/${element._id}" class="btn btn-primary btn-sm mx-1" title="Ver proyectos cliente ${element.name}"><i class="icon-rocket"></i></a>
                                <button id="${element._id}" name="btnDeleteClient" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Cliente ${element.name}"><i class="fa-regular fa-trash-can"></i></button>
                            </div>
                        </td>
                    </tr>`)
        }
    }).join(" ");

    document.getElementById('mostrarClientes').innerHTML = html

    const clientsActiveQty = []
    for(let c=0; c<arrClient.length; c++) {
        if (arrayClient[c].visible) {
            clientsActiveQty.push(c)
        }
    }

    const htmlClientList = 
        ( `<caption id="capClientList">Cantidad de Clientes: ${parseInt(clientsActiveQty.length)}</caption><br>
        <caption id="capClientDeletedList">Cantidad de Clientes Eliminados: ${parseInt(arrayClient.length - clientsActiveQty.length)}</caption>`)

    document.getElementById('capClientList').innerHTML = htmlClientList

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('clientTable').style.display = 'block';
}

//----------------------- Render User -------------------------------
const renderClientUser = (arrClient) => {
    const arrayClient = arrClient
    
    const html = arrClient.map((element) => {
        let green = 'success'
        let red = 'danger'
        let text = "Activo"
        let grey = 'secondary'
        let black = 'dark'
        let blue = 'primary'
        let result = 'S/P'
        let colorResult = grey
        let idChain = element._id.substring(19)

        let userArr = []
        function loopUserId() {
            for (let i=0; i < element.creator.length; i++) {
                userArr.push(
                    element.creator[i].name,
                    element.creator[i].lastName
                )
            }
            return userArr.join('<br>')
        }

        let modifArr = []
        function loopModifId() {
            for (let i=0; i < element.modificator.length; i++) {
                modifArr.push(
                    element.modificator[i].name,
                    element.modificator[i].lastName
                )
            }
            return modifArr.join('<br>')
        }
        
        if ( element.status === true && element.project > 0) {
            colorStatus = green
            colorResult = black
            result = element.project
        } else if ( element.status === true && element.project === 0 ) {
            colorStatus = green
        } else if ( element.status === false && element.project > 0 ) {
            colorStatus = red
            colorResult = blue
            result = element.project
            text = "Inactivo"
        } else if ( element.status === false && element.project === 0 ) {
            colorStatus = red
            text = "Inactivo"
        }

        if(element.visible) {
            return (`<tr>
                        <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                        <td class="text-center" id="name_${element._id}">${element.name}</td>
                        <td class="text-center"><a href="/api/clientes/select/${element._id}"><img id="logo_${element._id}" class="img-fluid rounded m-2" alt="Logo Cliente" src='${element.logo}' width="100px" height="80px"></a></td>
                        <td class="text-center">${element.code}</td>
                        <td class="text-center"><span class="badge rounded-pill bg-${colorStatus}">${text}</span></td>
                        <td class="text-center"><span id="projectQty_${element._id}" class="badge rounded-pill bg-${colorResult}">${result}</span></td>
                        <td class="text-center">${loopUserId()}</td>
                        <td class="text-center">${element.timestamp}</td>
                        <td class="text-center">${loopModifId()}</td>
                        <td class="text-center">${element.modifiedOn}</td>
                        <td class="text-center">
                            <div class="d-block align-items-center">
                                <a href="/api/clientes/select/${element._id}" class="btn btn-secondary btn-sm me-1" data-toggle="tooltip" data-placement="top" title="Ver cliente ${element.name}"><i class="fa-regular fa-eye"></i></a>
                                <a href="/api/clientes/${element._id}" class="btn btn-primary btn-sm mx-1" title="Ver proyectos cliente ${element.name}"><i class="icon-rocket"></i></a>
                                <button type="button" class="btn btn-danger btn-sm ms-1 disabled" title="Solo Admin puede modificar esto"><i class="fa-solid fa-info-circle"></i></button>
                            </div>
                        </td>
                    </tr>`)
        }
    }).join(" ");

    document.getElementById('mostrarClientes').innerHTML = html

    const clientsActiveQty = []
    for(let c=0; c<arrClient.length; c++) {
        if (arrayClient[c].visible) {
            clientsActiveQty.push(c)
        }
    }

    const htmlClientList = 
        ( `<caption id="capClientList">Cantidad de Clientes: ${parseInt(clientsActiveQty.length)}</caption><br>
        <caption id="capClientDeletedList">Cantidad de Clientes Eliminados: ${parseInt(arrayClient.length - clientsActiveQty.length)}</caption>`)

    document.getElementById('capClientList').innerHTML = htmlClientList
    
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('clientTable').style.display = 'block';
}

// ---- mensaje confirmacion eliminar Cliente
function messageDeleteClient(id, name, logo, ) {
    const htmlForm = `
            El cliente ${name}, se eliminará completamente.<br>
            <img class="img-fluid rounded-2 m-2" alt="Logo Cliente" src='${logo}' width="90px" height="75px"><br>
            Está seguro que desea continuar?<br>
            <form id="formDeleteClient" action="/api/clientes/delete/${id}" method="get">
            </form>`

    Swal.fire({
        title: `Eliminar Cliente <b>${name}</b>?`,
        position: 'center',
        html: htmlForm,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminarlo! <i class="fa-regular fa-trash-can"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'

    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("formDeleteClient").submit()
            Swal.fire(
                'Eliminado!',
                `El cliente ${name}, ha sido eliminado exitosamente.`,
                'success'
            )
        } else {
            Swal.fire(
                'No eliminado!',
                `El cliente ${name}, no ha sido eliminado`,
                'info'
                )
            return false
        }
    })
}

const nodeList = document.querySelectorAll('button[name="btnDeleteClient"]')

nodeList.forEach(function(btn){
    if (btn) {
        btn.addEventListener('click', (event) => {
            const idClient = btn.id
            const name = document.getElementById(`name_${idClient}`).innerText
            const logo = document.getElementById(`logo_${idClient}`).src
            const projectQty = parseInt(document.getElementById(`projectQty_${idClient}`).innerText)

            if (!isNaN(projectQty)) {
                let plText = ''
                projectQty==1 ? 
                plText = `El cliente ${name}<br>
                            <img class="img-fluid rounded-2 m-2" alt="Logo Cliente" src='${logo}' width="90px" height="75px"><br>
                            posee ${projectQty} proyecto asociado.<br>
                            No es posible eliminarlo.`
                :
                plText = `El cliente ${name}<br>
                            <img class="img-fluid rounded-2 m-2" alt="Logo Cliente" src='${logo}' width="90px" height="75px"><br>
                            posee ${projectQty} proyectos asociados.<br>
                            No es posible eliminarlo.`

                Swal.fire({
                    title: `Atención!`,
                    position: 'center',
                    html: plText,
                    icon: 'warning',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Salir <i class="fa-solid fa-user-shield"></i>'
                })

            } else if (idClient && name && logo) {
                messageDeleteClient(idClient, name, logo, projectQty)
            }
        })
    }
})

// --------------- Create New Client ------------------------
// ----------- Logo Client Image behavior ---------------
const dropAreaLogoClient = document.getElementById('drop-areaLogoClient')
const fileInputLogoClient = document.getElementById('fileInputLogoClient')
const fileImputTextLogoClient = document.getElementById('fileInputTextLogoClient')
const removeImageButtonLogoClient = document.getElementById('removeImageLogoClient')
const alertLogoClient = document.getElementById('alertLogoClient')
const alertLogoClientSize = document.getElementById('alertLogoClientSize')

dropAreaLogoClient.style.width = "40%"
dropAreaLogoClient.style.height = "200px"
dropAreaLogoClient.style.border = "2px dashed #ccc"
dropAreaLogoClient.style.margin = "0 auto 0 50px"
dropAreaLogoClient.style.borderRadius = "10px"
dropAreaLogoClient.style.textAlign = "center"
dropAreaLogoClient.style.lineHeight = "200px"
dropAreaLogoClient.style.cursor = "pointer"

dropAreaLogoClient.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaLogoClient.style.border = '2px dashed #77d'
    dropAreaLogoClient.style.backgroundColor = '#7777dd10'
})

dropAreaLogoClient.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaLogoClient.style.border = '2px dashed #ccc'
    dropAreaLogoClient.style.backgroundColor = '#9c9c9c'
})

function alertRefresh() {
    removeImageButtonLogoClient.style.display = 'none'
    fileImputTextLogoClient.value = ''
    fileInputLogoClient.value = ''
    dropAreaLogoClient.style.border = "2px dashed #ccc"
    dropAreaLogoClient.style.textAlign = "center"
    dropAreaLogoClient.style.backgroundColor = '#9c9c9c'
    dropAreaLogoClient.style.display = 'block'
    dropAreaLogoClient.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageLogoClient() {
    alertLogoClient.style.display = 'flex'
    alertLogoClientSize.style.display = 'none'
    alertRefresh()
}

function alertSizeImageLogoClient() {
    alertLogoClientSize.style.display = 'flex'
    alertLogoClient.style.display = 'none'
    alertRefresh()
}

dropAreaLogoClient.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    if (file && file.type.startsWith('image/')) {
        dropAreaLogoClient.style.border = '3px dashed #2d2'
        dropAreaLogoClient.style.backgroundColor = '#22dd2210'

        handleFileUploadLogoClient(file)
        
    } else {
        alertNotImageLogoClient()
    }     
})

dropAreaLogoClient.addEventListener('click', () => {
    fileInputLogoClient.click()
})

fileInputLogoClient.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputLogoClient.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaLogoClient.style.border = '3px dashed #2d2'
        dropAreaLogoClient.style.backgroundColor = '#22dd2210'

        handleFileUploadLogoClient(file)
        
    } else {
        alertNotImageLogoClient()
    }     
})

function handleFileUploadLogoClient(file) {
    const fileSize = file.size
    const fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_LOGOCLIENTS
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex);
        const extension = file.name.substring(dotIndex);
        fileImputTextLogoClient.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonLogoClient.style.display = 'flex'

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaLogoClient.innerHTML = 
                `<img class="rounded p-2 mb-1" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            alertLogoClient.style.display = 'none'
            alertLogoClientSize.style.display = 'none'
        }
        
    } else {
        alertSizeImageLogoClient()
    }
}

removeImageButtonLogoClient.addEventListener('click', (e)=> {
    e.preventDefault()
    alertLogoClient.style.display = 'none'
    alertLogoClientSize.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})

var inputsDeTexto = document.querySelectorAll('input[type="text"]')
const btnNewClient = document.getElementById('btnNewClient')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        if (input) {
            input.addEventListener('keydown', function(event) {
                // Obtener el código de la tecla presionada
                let key = event.key;
    
                // Lista de caracteres especiales prohibidos
                let forbiddenChars = /["$%?¡¿^/()=!'~`\\*{}\[\]<>@]/;
    
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
            input.addEventListener('input', (event) => {
                event.preventDefault()
                input.classList.add("border-primary")
                input.classList.add("border-2")
                input.classList.add("shadow")
                btnNewClient.removeAttribute('disabled')
                btnNewClient.style = "cursor: pointer;"
            })
        }
    })


// Crear una nueva instancia de MutationObserver y pasar una función de callback
const observer = new MutationObserver(function(mutationsList, observer) {
    // Iterar sobre las mutaciones observadas
    for(let mutation of mutationsList) {
        // Verificar si la mutación fue una inserción o eliminación de nodos
        if (mutation.type === 'childList') {
            // Realizar acciones en respuesta al cambio
            btnNewClient.removeAttribute('disabled')
            btnNewClient.style = "cursor: pointer;"
        }
    }
});

// Configurar el observador para que observe los cambios en los nodos hijos del div
observer.observe(dropAreaLogoClient, { childList: true });