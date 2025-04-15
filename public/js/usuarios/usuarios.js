const socket = io.connect()
let offset = -3 * 60 * 60 * 1000;

let currentPage = 1;
let itemsPerPage = 10; // Valor por defecto
let usuariosGlobales = [];
const maxVisiblePages = 3;

let URL_GOOGLE_STORE_AVATARS,
    imagenLazy = `https://i.gifer.com/VZvw.gif` || `https://i.gifer.com/7GW7.gif` || '../../../src/images/upload/ConsumiblesImages/loader.gif';

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


//  ----------- Users List ----------------
socket.on('usersAll', (arrUsers) => {
    renderUserAdmin(arrUsers)
})

// Función para generar los controles de paginación
const generarControlesPaginacion = () => {
    const totalPages = Math.ceil(usuariosGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderUserAdmin(usuariosGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderUserAdmin(usuariosGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderUserAdmin(usuariosGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderUserAdmin(usuariosGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderUserAdmin(usuariosGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div>';
    return paginationHTML;
};

// Función para cambiar el número de filas por página
let selectedItemsPerPage = 10; // Valor por defecto

const cambiarItemsPorPagina = (nuevoItemsPerPage) => {
    selectedItemsPerPage = nuevoItemsPerPage; // Guardar la selección del usuario
    itemsPerPage = nuevoItemsPerPage;
    currentPage = 1; // Reiniciar a la primera página
    renderUserAdmin(usuariosGlobales);
};

const agregarSelectItemsPorPagina = () => {
    // Crear el HTML del select y la leyenda
    let selectHTML = `
        Mostrando 
        <select class="form-select small w-auto mx-2" id="itemsPerPageSelect" onchange="cambiarItemsPorPagina(parseInt(this.value))">
            <option value="10" ${selectedItemsPerPage === 10 ? 'selected' : ''}>10</option>
            <option value="25" ${selectedItemsPerPage === 25 ? 'selected' : ''}>25</option>
            <option value="50" ${selectedItemsPerPage === 50 ? 'selected' : ''}>50</option>
            <option value="100" ${selectedItemsPerPage === 100 ? 'selected' : ''}>100</option>
            <option value="${usuariosGlobales.length}" ${selectedItemsPerPage === usuariosGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        usuarios de ${usuariosGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationUsuarios');
    const existingSelectContainer = document.getElementById('selectContainer');

    // Verificar si el contenedor de paginación existe
    if (paginationContainer) {
        // Si ya existe un contenedor para el select, actualizamos su contenido
        if (existingSelectContainer) {
            existingSelectContainer.innerHTML = selectHTML;
        } else {
            // Si no existe, creamos un nuevo contenedor y lo insertamos
            const selectContainer = document.createElement('div');
            selectContainer.id = 'selectContainer';
            selectContainer.classList.add('row', 'align-items-center', 'justify-content-center')
            selectContainer.innerHTML = selectHTML;
            paginationContainer.insertAdjacentHTML('beforebegin', selectContainer.outerHTML);
        }
    } else {
        console.error("El contenedor de paginación no existe en el DOM.");
    }
};

// --------------- Render Admin -----------------------------------
const renderUserAdmin = async (arrUsers, page = 1, direction = 'none') => {
    usuariosGlobales = arrUsers;
    currentPage = page;

    const container = document.getElementById('mostrarUsuarios');
    const pagination = document.getElementById('paginationUsuarios');
    container.classList.add('transition-out', direction);

    // Esperar a que termine la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = arrUsers.slice(startIndex, endIndex);

    let html = '', htmlPagination = ''
    
    if (paginatedItems.length > 0) {
        html = paginatedItems.map((element) => {
            let green = 'success', blue = 'primary', red = 'danger', dark = 'dark', white = 'light', grey = 'secondary', yellow = 'warning', cian = 'info',
                active = 'Activo', inactive = 'Inactivo', admin = 'Admin', user = 'User', idChain = element._id.substring(19)
    
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
            
            let optionStatus = element.status ? green : red,
                optionAdmin = element.admin ? dark : grey,
                optionVisits = element.visits == 0 ? red : green,
                showStatus = element.status ? active : inactive,
                showAdmin = element.admin ? admin : user

            const uNegocioMapping = {
                'matrices': { showUNegocio: 'M', optionUNegocio: dark, optionTextUNegocio: white },
                'lineas': { showUNegocio: 'L', optionUNegocio: blue, optionTextUNegocio: white }
            };
        
            // Valores predeterminados
            const defaultValuesuNegocio = { showUNegocio: 'ML', optionUNegocio: green };
            
            // Asignar valores basados en el Unidad de Negocio
            const { showUNegocio, optionUNegocio, optionTextUNegocio } = uNegocioMapping[element.uNegocio] || defaultValuesuNegocio;

            const areaMapping = {
                'ingenieria': { showArea: 'Ingeniería', optionArea: cian, optionTextArea: dark },
                'fabricacion': { showArea: 'Fabricación', optionArea: yellow, optionTextArea: dark },
                'administracion': { showArea: 'Administración', optionArea: grey, optionTextArea: white },
                'proyectos': { showArea: 'Proyectos', optionArea: blue, optionTextArea: dark }
            };
        
            // Valores predeterminados
            const defaultValues = { showArea: 'Todas', optionArea: green };
            
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

            let superAdmin = element.superAdmin ? '<i class="fa-solid fa-crown fa-rotate-by fa-xl" title="SuperAdmin" style="color: #a89c0d; --fa-rotate-angle: 20deg;"></i>' : null

            let utcDate = new Date(element.timestamp),
                utcDateModified = new Date(element.modifiedOn),
                localDate = new Date(utcDate.getTime() + offset),
                localDateModified = new Date(utcDateModified.getTime() + offset),
                formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                formattedDate === formattedDateModified ? formattedDateModified = '-' : null

            if (element.visible && element.superAdmin) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong>${superAdmin}</th>
                            <td class="text-center" id="legajoId_${element._id}"><strong>${element.legajoId}</strong></td>
                            <td class="text-center" id="name_${element._id}">${element.name}</td>
                            <td class="text-center" id="lastName_${element._id}">${element.lastName}</td>
                            <td class="text-center" id="email_${element._id}">${element.email}</td>
                            <td class="text-center" id="username_${element._id}"><strong>${element.username}</strong></td>
                            <td class="text-center"><img class="imgLazyLoad img-fluid rounded m-2" alt="Avatar" data-src='${element.avatar}' src='${imagenLazy}' width="100px" height="80px" loading="lazy"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">
                                <span class="badge rounded-pill bg-${optionAdmin} position-relative">
                                    ${showAdmin}
                                    <span class="position-absolute top-0 start-100 translate-middle">
                                        ${superAdmin}
                                    </span>
                                </span>
                            </td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionUNegocio} text-${optionTextUNegocio}">${showUNegocio}</span></td>
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
                            <td class="text-center" id="legajoId_${element._id}"><strong>${element.legajoId}</strong></td>
                            <td class="text-center" id="name_${element._id}">${element.name}</td>
                            <td class="text-center" id="lastName_${element._id}">${element.lastName}</td>
                            <td class="text-center" id="email_${element._id}">${element.email}</td>
                            <td class="text-center" id="username_${element._id}"><strong>${element.username}</strong></td>
                            <td class="text-center"><img class="imgLazyLoad img-fluid rounded m-2" alt="Avatar" data-src="${element.avatar}" src='${imagenLazy}' width="100px" height="80px" loading="lazy"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionAdmin}"> ${showAdmin} </span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionUNegocio} text-${optionTextUNegocio}">${showUNegocio}</span></td>
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
        htmlPagination = generarControlesPaginacion();
    
    } else {
        html = (`<tr>
                    <td colspan="14">
                        <img class="img-fluid rounded-2 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarUsuarios').innerHTML = html
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('userTable').style.display = 'block';
    
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);
    

    const usersActiveQty = []
    for(let u=0; u<arrUsers.length; u++) {
        if (arrUsers[u].visible) usersActiveQty.push(u)
    }

    const usersVisitsQty = []
    for(let v=0; v<arrUsers.length; v++) {
        if (arrUsers[v].visible && parseInt(arrUsers[v].visits) > 0) usersVisitsQty.push(parseInt(arrUsers[v].visits))
    }

    function sumarNumeros(array) {
        return array.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    }
    
    let totalVisitas = sumarNumeros(usersVisitsQty);

    const htmlUserList = 
        ( `<caption id="capUserList">Cantidad de Usuarios: ${parseInt(usersActiveQty.length)}</caption><br>
        <caption id="capDeleteUserList">Cantidad de Usuarios Eliminados: ${parseInt(arrUsers.length - usersActiveQty.length)}</caption><br>
        <caption id="capDeleteUserList">Cantidad de Visitas Totales: ${parseInt(totalVisitas)}</caption>`)

    document.getElementById('capUserList').innerHTML = htmlUserList

    // Remover clases de animación después de completar
    setTimeout(() => {
        container.classList.remove('transition-in', direction);
    }, 500);

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
            }, 1000);
        });
        lazyImages.forEach(img => observer.observe(img));
        
    } else {
        // Fallback para navegadores sin IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Llamar a la función para agregar el select después de renderizar la tabla
    agregarSelectItemsPorPagina();


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