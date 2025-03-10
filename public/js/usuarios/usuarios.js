const socket = io.connect()
let URL_GOOGLE_STORE_AVATARS

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_AVATARS = config.URL_GOOGLE_STORE_AVATARS
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

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el spinner y ocultar la tabla al cargar la página
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('userTable').style.display = 'none';
});


//  ----------- Users historial ----------------
socket.on('usersAll', (arrUsers) => {
    renderUser(arrUsers)
})

const renderUser = (arrUsers) => {
    const arrayUser = arrUsers,
        green = 'success', blue = 'primary', red = 'danger', dark = 'dark', white = 'light', grey = 'secondary', yellow = 'warning', cian = 'info',
        active = 'Activo', inactive = 'Inactivo', admin = 'Admin', user = 'User'
        
    const html = arrUsers.map((element) => {
        let optionStatus = element.status ? green : red,
            optionAdmin = element.admin ? dark : grey,
            optionVisits = element.visits == 0 ? red : green,
            showStatus = element.status ? active : inactive,
            showAdmin = element.admin ? admin : user,
            idChain = element._id.substring(19)

        const areaMapping = {
            'ingenieria': { showArea: 'Ingeniería', optionArea: cian, optionTextArea: dark },
            'fabricacion': { showArea: 'Fabricación', optionArea: yellow, optionTextArea: dark },
            'administracion': { showArea: 'Administración', optionArea: grey, optionTextArea: white },
            'proyectos': { showArea: 'Proyectos', optionArea: blue, optionTextArea: dark }
        };
        
        // Valores predeterminados
        const defaultValues = { showArea: 'Todas', optionArea: 'green' };
        
        // Asignar valores basados en el área
        const { showArea, optionArea, optionTextArea } = areaMapping[element.area] || defaultValues;
        
        const permisoMap = {
            diseno: { showPermiso: "Diseño", optionPermiso: cian, optionTextPermiso: dark },
            simulacion: { showPermiso: "Simulación", optionPermiso: yellow, optionTextPermiso: dark },
            disenoSimulacion: { showPermiso: "Diseño-Simulación", optionPermiso: red, optionTextPermiso: white },
            cadCam: { showPermiso: "Cad-Cam", optionPermiso: grey, optionTextPermiso: dark },
            projectManager: { showPermiso: "Project Manager", optionPermiso: dark, optionTextPermiso: white },
            mecanizado: { showPermiso: "Mecanizado", optionPermiso: yellow, optionTextPermiso: dark },
            ajuste: { showPermiso: "Ajuste", optionPermiso: red, optionTextPermiso: white }
        };
        
        const defaultPermiso = { showPermiso: "Todos", optionPermiso: green, optionText: dark };
        
        const { showPermiso, optionPermiso, optionTextPermsiso } = permisoMap[element.permiso] || defaultPermiso;

        var superAdmin = element.superAdmin ? '<i class="fa-solid fa-crown fa-rotate-by fa-xl" title="SuperAdmin" style="color: #a89c0d; --fa-rotate-angle: 20deg;"></i>' : null

        if (element.visible && element.superAdmin) {
            return (`<tr>
                        <th scope="row" class="text-center"><strong>...${idChain}</strong>${superAdmin}</th>
                        <td class="text-center" id="legajoId_${element._id}">${element.legajoId}</td>
                        <td class="text-center" id="name_${element._id}">${element.name}</td>
                        <td class="text-center" id="lastName_${element._id}">${element.lastName}</td>
                        <td class="text-center" id="email_${element._id}">${element.email}</td>
                        <td class="text-center" id="username_${element._id}">${element.username}</td>
                        <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Avatar" src='${element.avatar}' width="90px" height="70px"></td>
                        <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                        <td class="text-center">
                            <span class="badge rounded-pill bg-${optionAdmin} position-relative">
                                ${showAdmin}
                                <span class="position-absolute top-0 start-100 translate-middle">
                                    ${superAdmin}
                                </span>
                            </span>
                        </td>
                        <td class="text-center"><span class="badge rounded-pill bg-${optionArea} text-${optionTextArea}">${showArea}</span></td>
                        <td class="text-center"><span class="badge text-bg-${optionPermiso} text-${optionTextPermsiso}">${showPermiso}</span></td>
                        <td class="text-center" id="visits_${element._id}"><span class="badge rounded-pill bg-${optionVisits} text-white">${element.visits}</span></td>
                        <td class="text-center">
                            <div class="d-block align-items-center text-center">
                                <a href="/api/usuarios/${element._id}" class="btn btn-primary btn-sm me-1"><i class="fa-solid fa-user-pen"></i></a>
                                <button id="${element._id}" name="btnDeleteUser" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Usuario ${element.username}"><i class="fa-regular fa-trash-can"></i></button>
                            </div>
                        </td>
                    </tr>`)

        } else {
            return (`<tr>
                        <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                        <td class="text-center" id="legajoId_${element._id}">${element.legajoId}</td>
                        <td class="text-center" id="name_${element._id}">${element.name}</td>
                        <td class="text-center" id="lastName_${element._id}">${element.lastName}</td>
                        <td class="text-center" id="email_${element._id}">${element.email}</td>
                        <td class="text-center" id="username_${element._id}">${element.username}</td>
                        <td class="text-center"><img class="img-fluid rounded-3 py-2" alt="Avatar" src='${element.avatar}' width="90px" height="70px"></td>
                        <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                        <td class="text-center"><span class="badge rounded-pill bg-${optionAdmin}"> ${showAdmin} </span></td>
                        <td class="text-center"><span class="badge rounded-pill bg-${optionArea} text-${optionTextArea}">${showArea}</span></td>
                        <td class="text-center"><span class="badge text-bg-${optionPermiso} text-${optionTextPermsiso}">${showPermiso}</span></td>
                        <td class="text-center" id="visits_${element._id}"><span class="badge rounded-pill bg-${optionVisits} text-white">${element.visits}</span></td>
                        <td class="text-center">
                            <div class="d-block align-items-center text-center">
                                <a href="/api/usuarios/${element._id}" class="btn btn-primary btn-sm me-1"><i class="fa-solid fa-user-pen"></i></a>
                                <button id="${element._id}" name="btnDeleteUser" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Usuario ${element.username}"><i class="fa-regular fa-trash-can"></i></button>
                            </div>
                        </td>
                    </tr>`)
        }
    }).join(" ");

    document.getElementById('mostrarUsuarios').innerHTML = html

    const usersActiveQty = []
    for(let u=0; u<arrayUser.length; u++) {
        if (arrayUser[u].visible) {
            usersActiveQty.push(u)
        }
    }

    const usersVisitsQty = []
    for(let v=0; v<arrayUser.length; v++) {
        if (arrayUser[v].visible && parseInt(arrayUser[v].visits) > 0) {
            usersVisitsQty.push(parseInt(arrayUser[v].visits))
        }
    }

    function sumarNumeros(array) {
        return array.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    }
    
    let totalVisitas = sumarNumeros(usersVisitsQty);

    const htmlUserList = 
        ( `<caption id="capUserList">Cantidad de Usuarios: ${parseInt(usersActiveQty.length)}</caption><br>
        <caption id="capDeleteUserList">Cantidad de Usuarios Eliminados: ${parseInt(arrayUser.length - usersActiveQty.length)}</caption><br>
        <caption id="capDeleteUserList">Cantidad de Visitas Totales: ${parseInt(totalVisitas)}</caption>`)

    document.getElementById('capUserList').innerHTML = htmlUserList

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('userTable').style.display = 'block';


    // ---- mensaje confirmacion eliminar Usuario -----------
    function messageDeleteUser(id, name, lastName, username) {

        const htmlForm = `
                El usuario ${name} ${lastName}, se eliminará completamente.<br>
                Está seguro que desea continuar?<br>
                <form id="formDeleteUser" action="/api/usuarios/delete/${id}" method="get">
                    <fieldset>
                    </fieldset>
                </form>`
    
        Swal.fire({
            title: `Eliminar Usuario <b>${username}</b>?`,
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
                document.getElementById("formDeleteUser").submit()
                Swal.fire(
                    'Eliminado!',
                    `El usuario ${name} ${lastName}, ha sido eliminado exitosamente.`,
                    'success'
                )
            } else {
                Swal.fire(
                    'No eliminado!',
                    `El usuario ${name} ${lastName}, no ha sido eliminado`,
                    'info'
                    )
                return false
            }
        })
    }

    const nodeList = document.querySelectorAll('button[name="btnDeleteUser"]')
    
    nodeList.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                // console.log(btn.id)
                const idUser = btn.id,
                    name = document.getElementById(`name_${idUser}`).innerText,
                    lastName = document.getElementById(`lastName_${idUser}`).innerText,
                    username = document.getElementById(`username_${idUser}`).innerText,
                    userInfoId = document.getElementById(`userBanner_${idUser}`)
                
                if (userInfoId) {
                    Swal.fire({
                        title: `Atención!`,
                        position: 'center',
                        text: 'Usted no puede eliminase a sí mismo',
                        icon: 'warning',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Salir <i class="fa-solid fa-user-shield"></i>'
                    })
    
                } else if (idUser && name && lastName && username) {
                    messageDeleteUser(idUser, name, lastName, username)
                }
            })
        }
    })
}

/*------------------ Evento cantidad de caracteres Password & Confirmar Password -----------------------*/
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById("newUserForm")
    form.reset()
    document.getElementById('messagePass').innerHTML = ""
    document.getElementById('messageConfirmPass').innerHTML = ""

    document.getElementById('btnAddNewUser').disabled = true
    document.getElementById('btnAddNewUser').style.opacity = (0.4)
    document.getElementById('confirmPassword').disabled = true

    let inputPassword = document.getElementById('password')
    inputPassword.addEventListener("input", validarCamposPassword)
    
    let inputConfirmPassword = document.getElementById('confirmPassword')
    inputConfirmPassword.addEventListener("input", validarCamposPassAndConfirm)

    let inputName = document.getElementById('name')
    inputName.addEventListener("blur", resultadoNameLast)

    let inputLastName = document.getElementById('lastName')
    inputLastName.addEventListener("blur", resultadoNameLast)
    
    function validarCamposPassword() {
        let valorPassword = document.getElementById('password').value
        let caracteres = valorPassword.length
        
        if (valorPassword !== "" || valorPassword !== null) {
            if (valorPassword.length < 6) {
                document.getElementById('messagePass').style.color = '#4c0c0c'
                document.getElementById('messagePass').innerHTML
				= '☒ El password debe ser mínimo 6 caracteres y van: '+ caracteres
                document.getElementById('btnAddNewUser').disabled = true
                document.getElementById('btnAddNewUser').style.opacity = (0.4)
                document.getElementById('confirmPassword').disabled = true
            } else {
                document.getElementById('messagePass').style.color = '#33ff33'
                document.getElementById('messagePass').innerHTML
				= '🗹 Largo de Password aceptable!'
                document.getElementById('confirmPassword').disabled = false
            }
        } else {
            document.getElementById('messagePass').innerHTML = ""
            document.getElementById('btnAddNewUser').disabled = true
            document.getElementById('btnAddNewUser').style.opacity = (0.4)
            document.getElementById('confirmPassword').disabled = true
        }
    }
        
    function validarCamposPassAndConfirm() {
        let valorPassword = document.getElementById('password').value
        let valorConfirmPass = document.getElementById('confirmPassword').value
        
        if (valorPassword !== "" || valorConfirmPass !== "" || valorPassword !== null || valorConfirmPass !== null) {
            if (valorPassword !== valorConfirmPass) {
                
                document.getElementById('messageConfirmPass').style.color = '#4c0c0c'
                document.getElementById('messageConfirmPass').innerHTML
                = '☒ Los password debe coincidir!'
                document.getElementById('btnAddNewUser').disabled = true
                document.getElementById('btnAddNewUser').style.opacity = (0.4)
            } else {	
                document.getElementById('messageConfirmPass').style.color = '#33ff33'
                document.getElementById('messageConfirmPass').innerHTML
                = '🗹 Los Password coinciden!'
                document.getElementById('btnAddNewUser').disabled = false
                document.getElementById('btnAddNewUser').style.opacity = (1)
            }        
        } else {
            document.getElementById('messageConfirmPass').innerHTML = ""
            document.getElementById('btnAddNewUser').disabled = true
            document.getElementById('btnAddNewUser').style.opacity = (0.4)
            document.getElementById('confirmPassword').disabled = true
        }    
    }

    function resultadoNameLast() {
        let nameValue = inputName.value,
            lastNameValue = inputLastName.value,
            username = document.getElementById('username')

        if (nameValue && lastNameValue) {
            username.value = nameValue.charAt(0).toLowerCase()+lastNameValue.toLowerCase()
        }
    }
})

// ----------- Avatar User Image behavior ---------------
const dropAreaAvatarUser = document.getElementById('drop-areaAvatarUser')
const fileInputAvatarUser = document.getElementById('fileInputAvatarUser')
const fileImputTextAvatarUser = document.getElementById('fileInputTextAvatarUser')
const removeImageButtonAvatarUser = document.getElementById('removeImageAvatarUser')
const alertAvatarUser = document.getElementById('alertAvatarUser')
const alertSizeAvatarUser = document.getElementById('alertSizeAvatarUser')

dropAreaAvatarUser.style.width = "300px"
dropAreaAvatarUser.style.height = "200px"
dropAreaAvatarUser.style.border = "2px dashed #ccc"
dropAreaAvatarUser.style.margin = "0 auto 0 50px"
dropAreaAvatarUser.style.borderRadius = "5px"
dropAreaAvatarUser.style.textAlign = "center"
dropAreaAvatarUser.style.lineHeight = "200px"
dropAreaAvatarUser.style.cursor = "pointer"

dropAreaAvatarUser.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaAvatarUser.style.border = '2px dashed #77d'
    dropAreaAvatarUser.style.backgroundColor = '#7777dd10'
})

dropAreaAvatarUser.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaAvatarUser.style.border = '2px dashed #ccc'
    dropAreaAvatarUser.style.backgroundColor = '#838383'
})

function alertRefresh() {
    removeImageButtonAvatarUser.style.display = 'none'
    fileInputAvatarUser.value = ''
    fileImputTextAvatarUser.value = ''
    dropAreaAvatarUser.style.border = "2px dashed #ccc"
    dropAreaAvatarUser.style.textAlign = "center"
    dropAreaAvatarUser.style.backgroundColor = '#838383'
    dropAreaAvatarUser.style.display = 'block'
    dropAreaAvatarUser.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageAvatarUser() {
    alertAvatarUser.style.display = 'flex'
    alertSizeAvatarUser.style.display = 'none'
    alertRefresh()
}

function alertSizeImageAvatarUser() {
    alertSizeAvatarUser.style.display = 'flex'
    alertAvatarUser.style.display = 'none'
    alertRefresh()
}

dropAreaAvatarUser.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaAvatarUser.style.border = '3px dashed #2d2'
        dropAreaAvatarUser.style.backgroundColor = '#22dd2210'
        handleFileUploadAvatarUser(file)

    } else {
        alertNotImageAvatarUser()
    }     
})

dropAreaAvatarUser.addEventListener('click', () => {
    fileInputAvatarUser.click()
})

fileInputAvatarUser.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputAvatarUser.files[0]
    
    if (file && file.type.startsWith('image/')) { 
        dropAreaAvatarUser.style.border = '3px dashed #2d2'
        dropAreaAvatarUser.style.backgroundColor = '#22dd2210'
        handleFileUploadAvatarUser(file)

    } else {
        alertNotImageAvatarUser()
    }     
})

function handleFileUploadAvatarUser(file) {
    const fileSize = file.size
    const fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_AVATARS
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex);
        const extension = file.name.substring(dotIndex);
        fileImputTextAvatarUser.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonAvatarUser.style.display = 'flex'

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaAvatarUser.innerHTML = 
                `<img class="p-2 mb-3" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            alertAvatarUser.style.display = 'none'
            alertSizeAvatarUser.style.display = 'none'
        }

    } else {
        alertSizeImageAvatarUser()
    }
}

removeImageButtonAvatarUser.addEventListener('click', (e)=> {
    e.preventDefault()
    alertAvatarUser.style.display = 'none'
    alertSizeAvatarUser.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})


function messageNewUser(name, lastName, username, legajoId, email) {

    if (username, legajoId, email) {
        Swal.fire({
            title: `Nuevo Usuario <b>${username}</b>`,
            text: `El usuario ${name} ${lastName} será registrado!`,
            icon: 'warning',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: true,
            confirmButtonText: 'Registrarlo! <i class="fa-solid fa-user-plus"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-xmark"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("newUserForm").submit()
                setTimeout(() => {
                    Swal.fire(
                        'Creado!',
                        `El usuario ${name} ${lastName}, legajo #:${legajoId}, ha sido registrado exitosamente.`,
                        'success'
                    )
                }, 1000)
                
            } else {
                Swal.fire(
                    'No registrado!',
                    `El usuario ${name} ${lastName}, no ha sido registrado`,
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
            text: `El usuario no se creó correctamente!`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,
        })
    }
}

function messageWarningEmptyFields(
    name,
    lastName,
    username,
    email,
    password,
    confirmPassword,
    legajoId
    ) {
    
    const formFields =[]
    
    name=="" ? formFields.push('Nombre') : null
    lastName == "" ? formFields.push('Apellido') : null
    username == "" ? formFields.push('Username') : null
    email == "" ? formFields.push('Email') : null
    password == "" ? formFields.push('Password') : null
    confirmPassword == "" ? formFields.push('Confirmacion Password') : null
    legajoId == "" ? formFields.push('Legajo') : null
    
    formFields.length == 1 ?
        Swal.fire({
            title: `Campo Vacío`,
            text: `El campo ${formFields[0]} está vacío!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-user-xmark"></i>'
        })
    :
        Swal.fire({
            title: `${formFields.length} Campos Vacíos`,
            text: `Los campos ${formFields.join(", ")} están vacíos!`,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Volver al Formulario <i class="fa-solid fa-user-xmark"></i>'
        })
}

const btnAddNewUser = document.getElementById('btnAddNewUser')

btnAddNewUser.addEventListener('click', (event) => {
    event.preventDefault()
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value
    const legajoId = document.getElementById('userLegajoId').value

    name && lastName && username && legajoId && email && password && confirmPassword ?
        messageNewUser(name, lastName, username, legajoId, email)
    :
        messageWarningEmptyFields(name, lastName, username, email, password, confirmPassword, legajoId)
})

const btnResetFormNewUser = document.getElementById('btnResetFormNewUser')

if (btnResetFormNewUser) {
    btnResetFormNewUser.addEventListener('click', () => {
        document.getElementById('messagePass').innerHTML = ""
        document.getElementById('messageConfirmPass').innerHTML = ""
        btnAddNewUser.disabled = true
        btnAddNewUser.style.opacity = (0.4)
        document.getElementById('confirmPassword').disabled = true
        alertAvatarUser.style.display = 'none'
        alertSizeAvatarUser.style.display = 'none'
        alertRefresh()
    })
}

let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Solo numeros
            let forbiddenChars = /["$%?¡¿^/()=!'~`\\*{}\[\]<>@]/;

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

function disabledBtnAceptar() {
    let btnAceptarFrom = document.getElementById('btnAddNewUser');
    const allInputs = document.querySelectorAll('input[type="text"],input[type="number"],select,textarea,input[type="check"], input[type="file"],input[type="hidden"]')
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