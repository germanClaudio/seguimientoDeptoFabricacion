const socket = io.connect()

let currentPage = 1;
let itemsPerPage = 10; // Valor por defecto
let maquinasGlobales = [];
const maxVisiblePages = 3;

let URL_GOOGLE_STORE_IMAGESTOOLS,
    imagenLazy = `https://i.gifer.com/8CLc.gif` || '../../../src/images/upload/ConsumiblesImages/loader.gif';

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
        user ? renderToolsAdmin(arrTools) : renderToolsUser(arrTools)
    }   
})

// Función para generar los controles de paginación
const generarControlesPaginacion = () => {
    const totalPages = Math.ceil(maquinasGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderToolsAdmin(maquinasGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderToolsAdmin(maquinasGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderToolsAdmin(maquinasGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderToolsAdmin(maquinasGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderToolsAdmin(maquinasGlobales, ${currentPage + 1}, 'left')">
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
    renderToolsAdmin(maquinasGlobales);
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
            <option value="${maquinasGlobales.length}" ${selectedItemsPerPage === maquinasGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        máquinas de ${maquinasGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationMaquinas');
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

// --------------- Render Admin ----------------------------
const renderToolsAdmin = async (arrTools, page = 1, direction = 'none') => {
    maquinasGlobales = arrTools;
    currentPage = page;

    const container = document.getElementById('mostrarMaquinas');
    const pagination = document.getElementById('paginationMaquinas');
    container.classList.add('transition-out', direction);

    // Esperar a que termine la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = arrTools.slice(startIndex, endIndex);

    let html = '', htmlPagination = ''

    const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', black = 'dark', white = 'light',
        active = 'Activa', inactive = 'Mantenimiento', info = 'info',
        cnc = 'CNC', press = 'Prensa'
    let textColor
    
    if (paginatedItems.length > 0) {
        html = paginatedItems.map((element) => {
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
            // cnc : press
            let idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="model_${element._id}">${element.model}</td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center"><img class="imgLazyLoad img-fluid rounded-3 m-2 py-2" id="maquina_${element._id}" alt="Imagen Máquina" data-src="${element.imageTool}" src='${imagenLazy}' src='${element.imageTool}' width="150px" height="150px" loading="lazy"></td>
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
        htmlPagination = generarControlesPaginacion();
    
    } else {
        html = (`<tr>
                    <td colspan="13">
                        <img class="img-fluid rounded-2 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarMaquinas').innerHTML = html
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('toolTable').style.display = 'block';

    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);


    const toolsActiveQty = []
    for(let u=0; u<maquinasGlobales.length; u++) {
        maquinasGlobales[u].visible ? toolsActiveQty.push(u) : null
    }

    const htmlToolList = 
        ( `<caption id="capToolList">Cantidad de Máquinas: ${parseInt(toolsActiveQty.length)}</caption><br>
        <caption id="capDeleteToolList">Cantidad de Máquinas Eliminadas: ${parseInt(maquinasGlobales.length - toolsActiveQty.length)}</caption>`)

    document.getElementById('capToolList').innerHTML = htmlToolList

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
};


// Función para generar los controles de paginación
const generarControlesPaginacionUser = () => {
    const totalPages = Math.ceil(maquinasGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderToolsUser(maquinasGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderToolsUser(maquinasGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderToolsUser(maquinasGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderToolsUser(maquinasGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderToolsUser(maquinasGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div>';
    return paginationHTML;
};


const cambiarItemsPorPaginaUser = (nuevoItemsPerPage) => {
    selectedItemsPerPage = nuevoItemsPerPage; // Guardar la selección del usuario
    itemsPerPage = nuevoItemsPerPage;
    currentPage = 1; // Reiniciar a la primera página
    renderToolsUser(maquinasGlobales);
};

const agregarSelectItemsPorPaginaUser = () => {
    // Crear el HTML del select y la leyenda
    let selectHTML = `
        Mostrando 
        <select class="form-select small w-auto mx-2" id="itemsPerPageSelect" onchange="cambiarItemsPorPaginaUser(parseInt(this.value))">
            <option value="10" ${selectedItemsPerPage === 10 ? 'selected' : ''}>10</option>
            <option value="25" ${selectedItemsPerPage === 25 ? 'selected' : ''}>25</option>
            <option value="50" ${selectedItemsPerPage === 50 ? 'selected' : ''}>50</option>
            <option value="100" ${selectedItemsPerPage === 100 ? 'selected' : ''}>100</option>
            <option value="${maquinasGlobales.length}" ${selectedItemsPerPage === maquinasGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        máquinas de ${clientesGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationMaquinas');
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


//----------------------- Render User -------------------------------
const renderToolsUser = async (arrTools, page = 1, direction = 'none') => {
    maquinasGlobales = arrTools;
    currentPage = page;

    const container = document.getElementById('mostrarMaquinas');
    const pagination = document.getElementById('paginationMaquinas');
    container.classList.add('transition-out', direction);

    // Esperar a que termine la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = arrTools.slice(startIndex, endIndex);

    let html = '', htmlPagination = ''

    const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', black = 'dark', white = 'light',
        active = 'Activa', inactive = 'Mantenimiento', info = 'info',
        cnc = 'CNC', press = 'Prensa'
    let textColor
    
    if (paginatedItems.length > 0) {
        html = paginatedItems.map((element) => {
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
            // cnc : press
            let idChain = element._id.substring(19)

            if (element.visible) {
                return (`<tr>
                            <th scope="row" class="text-center"><strong>...${idChain}</strong></th>
                            <td class="text-center" id="codigo_${element._id}">${element.code}</td>
                            <td class="text-center" id="model_${element._id}">${element.model}</td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${element.designation}</strong></td>
                            <td class="text-center"><img class="imgLazyLoad img-fluid rounded-3 m-2 py-2" id="maquina_${element._id}" alt="Imagen Máquina" data-src="${element.imageTool}" src='${imagenLazy}' src='${element.imageTool}' width="150px" height="150px" loading="lazy"></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center" id="characteristics_${element._id}">${element.characteristics}</td>
                            <td class="text-center">${element.creator[0].name}, ${element.creator[0].lastName}</td>
                            <td class="text-center">${element.timestamp}</td>
                            <td class="text-center">${element.modificator[0].name} ${element.modificator[0].lastName}</td>
                            <td class="text-center">${element.modifiedOn}</td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center">
                                    <a href="/api/maquinas/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Máquina ${element.designation}"><i class="fa-solid fa-gears"></i></a>
                                    <button type="button" class="btn btn-danger btn-sm ms-1 disabled" title="Solo Admin puede modificar esto"><i class="fa-regular fa-info-circle"></i></button>
                                </div>
                            </td>
                        </tr>`)
            }
        }).join(" ");
        htmlPagination = generarControlesPaginacion();
    
    } else {
        html = (`<tr>
                    <td colspan="13">
                        <img class="img-fluid rounded-2 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarMaquinas').innerHTML = html
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('toolTable').style.display = 'block';

    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);


    const toolsActiveQty = []
    for(let u=0; u<maquinasGlobales.length; u++) {
        maquinasGlobales[u].visible ? toolsActiveQty.push(u) : null
    }

    const htmlToolList = 
        ( `<caption id="capToolList">Cantidad de Máquinas: ${parseInt(toolsActiveQty.length)}</caption><br>
        <caption id="capDeleteToolList">Cantidad de Máquinas Eliminadas: ${parseInt(maquinasGlobales.length - toolsActiveQty.length)}</caption>`)

    document.getElementById('capToolList').innerHTML = htmlToolList

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
};

// ----------- Image Tool Image behavior ---------------
const dropAreaImageTool = document.getElementById('drop-areaImageTool'),
    fileInputImageTool = document.getElementById('fileInputImageTool'),
    fileImputTextImageTool = document.getElementById('fileInputTextImageTool'),
    removeImageButtonImageTool = document.getElementById('removeImageTool'),
    alertImageTool = document.getElementById('alertImageTool'),
    alertSizeImageTool = document.getElementById('alertSizeImageTool')

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

// ----------- Nueva Maquina ---------------------
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
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>'
    
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

// ---- mensaje confirmacion eliminar Maquina -----------
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

let inputsDeTexto = document.querySelectorAll('input[type="text"]')
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