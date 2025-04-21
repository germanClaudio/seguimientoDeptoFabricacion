const socket = io.connect()

let offset = -3 * 60 * 60 * 1000;
let currentPage = 1;
let itemsPerPage = 10; // Valor por defecto
let selectedItemsPerPage = 10; // Valor por defecto
let proyectosGlobales = [];
const maxVisiblePages = 3;

let URL_GOOGLE_STORE_LOGOCLIENTS,
    URL_GOOGLE_STORE_IMGPROJECTS,
    imagenLazy = `https://i.gifer.com/7GW7.gif` || `https://i.gifer.com/VZvw.gif` || '../../../src/images/upload/ConsumiblesImages/loader.gif';

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_LOGOCLIENTS = config.URL_GOOGLE_STORE_LOGOCLIENTS
        URL_GOOGLE_STORE_IMGPROJECTS = config.URL_GOOGLE_STORE_IMGPROJECTS
    })
    .catch(error => console.error('Error fetching config:', error));


function sortTable(columnName) {
    const table = document.getElementById('projectTable');
    const tbody = table.querySelector('tbody');

    // Seleccionar todas las filas directas del tbody de la tabla principal (ignorando las tablas anidadas)
    const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => {
        // Filtrar filas que NO contengan tablas anidadas
        return row.querySelector('table');
    });

    // Obtener el botón de la columna para determinar el orden actual
    const column = document.querySelector(`th[data-column="${columnName}"]`);
    const order = column.getAttribute('data-order');
    
    // Ordenar las filas
    rows.sort((a, b) => {
        const aElement = a.querySelector(`td[data-column="${columnName}"]`);
        const bElement = b.querySelector(`td[data-column="${columnName}"]`);

        if (!aElement || !bElement) {
            console.error(`No se encontró <td> con data-column="${columnName}" en una de las filas.`);
            return 0;  // No alterar el orden si falta el <td>
        }

        const aValue = aElement.textContent.trim();
        const bValue = bElement.textContent.trim();

        if (order === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });

    // Limpiar el tbody antes de reordenar las filas
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Añadir las filas ordenadas de nuevo al tbody
    rows.forEach(row => tbody.appendChild(row));

    // Alternar el orden para la próxima vez
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    column.setAttribute('data-order', newOrder);

    // Actualizar el ícono de ordenación en el botón
    const btnClicked = document.getElementById(columnName);
    if (columnName === 'nombre' || columnName === 'nivel' || columnName === 'cliente') {
        btnClicked.innerHTML = newOrder === 'asc' 
            ? `<i class="fa-solid fa-sort-alpha-asc" aria-hidden="true"></i>`
            : `<i class="fa-solid fa-sort-alpha-desc" aria-hidden="true"></i>`;

    } else {
        btnClicked.innerHTML = newOrder === 'asc'
            ? `<i class="fa-solid fa-sort-amount-asc" aria-hidden="true"></i>`
            : `<i class="fa-solid fa-sort-amount-desc" aria-hidden="true"></i>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el spinner y ocultar la tabla al cargar la página
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('projectTable').style.display = 'none';
});

socket.on('projectsAll', (arrayProjects, arrUsers) => {
    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
        if(index !== -1) {
            let user = arrUsers[index].admin
            let userId = arrUsers[index]._id
            user ? renderProjectsForAdmin(arrayProjects) : renderProjectsForUser(arrayProjects)
        }   
})

// Función para generar los controles de paginación
const generarControlesPaginacion = () => {
    const totalPages = Math.ceil(proyectosGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderProjectsForAdmin(proyectosGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderProjectsForAdmin(proyectosGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderProjectsForAdmin(proyectosGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderProjectsForAdmin(proyectosGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderProjectsForAdmin(proyectosGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div>';
    return paginationHTML;
};

const cambiarItemsPorPagina = (nuevoItemsPerPage) => {
    selectedItemsPerPage = nuevoItemsPerPage; // Guardar la selección del usuario
    itemsPerPage = nuevoItemsPerPage;
    currentPage = 1; // Reiniciar a la primera página
    renderProjectsForAdmin(proyectosGlobales);
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
            <option value="${proyectosGlobales.length}" ${selectedItemsPerPage === proyectosGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        proyectos de ${proyectosGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationProyectos');
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

// --------------- Render Project table for AdminS -----------------------------------
const renderProjectsForAdmin = async (arrayProjects, page = 1, direction = 'none') => {
    proyectosGlobales = arrayProjects;
    currentPage = page;

    const container = document.getElementById('mostrarProyectos');
    const pagination = document.getElementById('paginationProyectos');
    container.classList.add('transition-out', direction);

    // Esperar a que termine la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = arrayProjects.slice(startIndex, endIndex);

    let html = '', htmlPagination = ''

    if (paginatedItems.length > 0) {
        html = paginatedItems.map((element) => {
            let green = 'success', blue = 'primary', red = 'danger', dark = 'dark', white = 'light',
                grey = 'secondary', yellow = 'warning', cian = 'info', btnGroup = '';

            // Definir valores predeterminados
            let colorResult = grey, colorLevel = white, text = "Cotizado";

            // ----------- Loops de Array OCI ----------------
            function loopOci(j) {
                let ociArr = []
                let otVisibleLength = 0
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) otVisibleLength++
                }
                
                if (otVisibleLength > 0 ) {
                    if (otVisibleLength % 2 === 0) {
                        for (let i=0; i < otVisibleLength; i++) {
                            if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                                element.project[0].oci[j].ociStatus
                                    ? ociArr.push(element.project[0].oci[j].ociNumber)
                                    : ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            
                            } else {
                                ociArr.push('&#8203;')
                            }
                        }

                    } else {
                        for (let i=0; i < otVisibleLength; i++) {
                            if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                                element.project[0].oci[j].ociStatus
                                    ? ociArr.push(element.project[0].oci[j].ociNumber)
                                    : ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            
                            } else {
                                ociArr.push('&#8203;')
                            }
                        }
                    }
                    return ociArr.join('<br>')

                } else {
                    return (`${element.project[0].oci[j].ociNumber} <i class="fa-solid fa-circle-exclamation" title="Sin Datos" style="color: #fd7e14;"></i>`)
                }
            }

            let arrOciArr = []
            function loopArrayOci() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrOciArr.push(loopOci(j))
                }
                return arrOciArr.join('<hr>')
            }

            //************* Loop  Alias de Oci *******************
            function loopAliasOci(j) {
                let ociAliasArr = []
                let otVisibleLength = 0
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) otVisibleLength++
                }
                
                if (otVisibleLength > 0 ) {
                    if (otVisibleLength % 2 === 0) {
                        for (let i=0; i < otVisibleLength; i++) {
                            if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                                element.project[0].oci[j].ociStatus
                                    ? ociAliasArr.push(`<span class="badge bg-${blue} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                                    : ociAliasArr.push(`<span class="badge bg-${red} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span><br>`)

                            } else {
                                ociAliasArr.push('&#8203;')
                            }
                        }

                    } else {
                        for (let i=0; i < otVisibleLength; i++) {
                            if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                                element.project[0].oci[j].ociStatus
                                    ? ociAliasArr.push(`<span class="badge bg-${blue} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                                    : ociAliasArr.push(`<span class="badge bg-${red} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span><br>`)

                            } else {
                                ociAliasArr.push('&#8203;')
                            }
                        }
                    }
                    return ociAliasArr.join('<br>')

                } else {
                    return (`<span class="badge bg-${grey} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                }
            }

            let arrOciAliasArr = []
            function loopArrayAliasOci() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrOciAliasArr.push(loopAliasOci(j))
                }
                return arrOciAliasArr.join('<hr>')
            }

            // ----------- Loops de Array OTs ----------------
            function loopOt(j) {
                let otArr = []
                if (element.project[0].oci[j].otProject.length > 0 ) {

                    for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                        if (element.project[0].oci[j].otProject[i].visible) {
                            element.project[0].oci[j].otProject[i].otStatus
                                ? otArr.push(element.project[0].oci[j].otProject[i].otNumber)
                                : otArr.push(element.project[0].oci[j].otProject[i].otNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OT Inactiva" style="color: #ff0000;"></i>')
                        }
                    }
                    return otArr.join('<br>')

                } else {
                    return ('<span class="badge rounded-pill bg-${grey} text-${white} my-auto">S/D</span>')
                }
            }
            
            let arrOtArr = []
            function loopArrayOt() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrOtArr.push(loopOt(j))
                }
                return arrOtArr.join('<hr>')
            }

            // ----------- Loops de Array OPs ----------------
            function loopOp(j) {
                let opArr = []
                if (element.project[0].oci[j].otProject.length > 0 ) {
                    for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                        if (element.project[0].oci[j].otProject[i].visible) opArr.push(element.project[0].oci[j].otProject[i].opNumber)
                    }
                    return opArr.join('<br>')

                } else {
                    return ('<span class="badge rounded-pill bg-${grey} text-${white} my-auto">S/D</span>')
                }
            }

            let arrOpArr = []
            function loopArrayOp() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrOpArr.push(loopOp(j))
                }
                return arrOpArr.join('<hr>')
            }

            // ----------- Loops de Array Op Descriptions ----------------
            function loopDescription(j) {
                let DescriptionArr = []
                if (element.project[0].oci[j].otProject.length > 0 ) {
                    for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                        if (element.project[0].oci[j].otProject[i].visible) {
                            DescriptionArr.push(element.project[0].oci[j].otProject[i].opDescription)
                        }
                    }
                    return DescriptionArr.join('<br>')

                } else {
                    return (`<span class="badge rounded-pill bg-${grey} text-${white} my-auto">S/D</span>`)
                }
            }

            let arrDescriptionArr = []
            function loopArrayDescription() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrDescriptionArr.push(loopDescription(j))
                }
                return arrDescriptionArr.join('<hr>')
            }    

            // Crear un objeto para mapear los diferentes estados
            const levelProjectMap = {
                ganado: {
                    colorLevel: white,
                    colorResult: green,
                    text: "Ganado"
                },
                paraCotizar: {
                    colorLevel: yellow,
                    colorResult: grey,
                    text: "Para Cotizar"
                },
                default: {
                    colorLevel: white,
                    colorResult: red,
                    text: "A Riesgo"
                }
            };

            // Obtener los valores correspondientes al levelProject
            const projectLevel = element.project[0].levelProject;
            const levelData = levelProjectMap[projectLevel] || levelProjectMap.default;

            // Asignar los valores
            colorLevel = levelData.colorLevel;
            colorResult = levelData.colorResult;
            text = levelData.text;

            const uNegocioMapping = {
                'matrices': { showUNegocio: 'M', optionUNegocio: dark, optionTextUNegocio: white },
                'lineas': { showUNegocio: 'L', optionUNegocio: blue, optionTextUNegocio: white }
            };
        
            // Valores predeterminados
            const defaultValuesuNegocio = { showUNegocio: 'ML', optionUNegocio: green };
            
            // Asignar valores basados en el Unidad de Negocio
            const { showUNegocio, optionUNegocio, optionTextUNegocio } = uNegocioMapping[element.uNegocio] || defaultValuesuNegocio;

            let utcDate = new Date(element.timestamp),
                utcDateModified = new Date(element.modifiedOn),
                localDate = new Date(utcDate.getTime() + offset),
                localDateModified = new Date(utcDateModified.getTime() + offset),
                formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                formattedDate === formattedDateModified ? formattedDateModified = '' : null

            if(element.project[0].visible) {
                element.uNegocio === 'lineas'
                    ? completeTr = `rgba(0, 0, 255, 0.1)`
                    : completeTr = `rgba(0, 0, 0, 0.05)`

                element.uNegocio === 'lineas'
                    ? btnGroup = `<a href="/api/clientes/${element.client[0]._id}" class="btn btn-${grey} btn-sm my-2 shadow-lg" data-toggle="tooltip" data-placement="top" title="Ver proyecto"><i class="fa-solid fa-eye"></i></a>
                                    <a href="/api/ingenieriaLineas/selectWonProjects/${element.project[0]._id}" class="btn btn-${blue} btn-sm my-2 shadow-lg" title="Editar datos de Ingeniería Líneas"><i class="fa-solid fa-pencil"></i></a>
                                    <a href="/api/proyectos/delete/${element.project[0]._id}" class="btn btn-${red} btn-sm mx-1 my-2" title="Eliminar proyectos"><i class="fa-solid fa-trash"></i></a>`
                    
                    : btnGroup = `<a href="/api/clientes/${element.client[0]._id}" class="btn btn-${grey} btn-sm me-1 my-2" data-toggle="tooltip" data-placement="top" title="Ver proyecto"><i class="fa-solid fa-eye"></i></a>
                                    <a href="/api/proyectos/selectProject/${element.project[0]._id}" class="btn btn-${dark} btn-sm mx-1 my-2" title="Editar datos de OCI"><i class="fa-solid fa-pencil"></i></a>
                                    <a href="/api/proyectos/delete/${element.project[0]._id}" class="btn btn-${red} btn-sm mx-1 my-2" title="Eliminar proyectos"><i class="fa-solid fa-trash"></i></a>`
                
                return (`<tr style="border-bottom: 2px solid #dedede; background-color: ${completeTr}">
                            <td class="text-center">${element.project[0].codeProject}<br><span class="badge rounded-pill bg-${optionUNegocio} text-${optionTextUNegocio} mt-2">${showUNegocio}</span></td>
                            <td class="text-center border-start" data-column="nombre">${element.project[0].projectName}</td>
                            <td class="text-center border-start"><a href="/api/clientes/${element.client[0]._id}"><img id="imgProject_${element._id}" class="imgLazyLoad img-fluid rounded-3 m-auto p-1 shadow" alt="Imagen Proyecto" data-src="${element.project[0].imageProject}" src='${imagenLazy}' width="90%" height="90%" loading="lazy"></a></td>
                            <td class="text-center border-start" data-column="cliente"><p style="display: none;">${element.client[0].name}</p><img id="logo_${element._id}" class="imgLazyLoad img-fluid rounded-3 m-auto p-1 shadow" alt="Logo Cliente" data-src='${element.client[0].logo}' src='${imagenLazy}' width="90%" height="90%" loading="lazy"></td>
                            <td class="text-center border-start" data-column="prio"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                            <td class="text-center border-start" data-column="nivel"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                            <td class="text-center px-2 border-start">${element.project[0].projectDescription}</td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0" data-column="ociAlias">${loopArrayAliasOci()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0" data-column="oci">${loopArrayOci()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0" data-column="ot">${loopArrayOt()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0">${loopArrayOp()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0 text-center align-middle overflow-ellipsis"">${loopArrayDescription()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start" data-column="fecha">${formattedDate}</td>
                            <td class="text-center border-start">
                                <div class="d-block align-items-center">
                                    ${btnGroup}
                                </div>
                            </td>
                        </tr>`
                    )
            }

        }).join(" ");
        htmlPagination = generarControlesPaginacion();

    } else {
        html = (`<tr>
                    <td colspan="14">
                        <img class="img-fluid rounded-2 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarProyectos').innerHTML = html
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('projectTable').style.display = 'block';
    
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);

    document.getElementById('mostrarProyectos').innerHTML = html
    
    let arrayCantProyectos = []
    for (let i=0; i<arrayProjects.length; i++){
        if (arrayProjects[i].project[0].visible) arrayCantProyectos.push(i)
    }

    const totalProyectos = parseInt(arrayCantProyectos.length)
    const projectosEliminados = parseInt(arrayProjects.length-arrayCantProyectos.length)
    let textTotalProyectos
    let textProyectosEliminados

    totalProyectos>1
        ? textTotalProyectos = `Mostrando ${totalProyectos} Proyectos en total`
        : textTotalProyectos = `Mostrando ${totalProyectos} Proyecto en total`

    projectosEliminados>1
        ? textProyectosEliminados = `(${projectosEliminados}) Proyectos, fueron eliminados`
        : textProyectosEliminados = `(${projectosEliminados}) Proyecto, fue eliminado`                  
    
    const htmlProjectsList = 
        ( `<caption id="capProjectsList">
            ${textTotalProyectos}
            <br>
            ${textProyectosEliminados}
        </caption>`)

    document.getElementById('capProjectsList').innerHTML = htmlProjectsList

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
}

// ------------- For Users --------------------------
// Función para generar los controles de paginación
const generarControlesPaginacionUser = () => {
    const totalPages = Math.ceil(proyectosGlobales.length / itemsPerPage);
    let paginationHTML = `<div class="pagination-anchor">
                            <div class="pagination-container justify-content-center">`;
    
    // Botón Anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderProjectsForUser(proyectosGlobales, ${currentPage - 1}, 'right')">
            &laquo; Anterior
        </button>`;

    // Primeros números
    if (currentPage > maxVisiblePages + 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="renderProjectsForUser(proyectosGlobales, 1)">1</button>
            <span class="pagination-ellipsis">...</span>`;
    }

    // Números centrales
    const start = Math.max(1, currentPage - maxVisiblePages);
    const end = Math.min(totalPages, currentPage + maxVisiblePages);
    
    for (let i = start; i <= end; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                onclick="renderProjectsForUser(proyectosGlobales, ${i})">
                ${i}
            </button>`;
    }

    // Últimos números
    if (currentPage < totalPages - maxVisiblePages) {
        paginationHTML += `
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-btn" onclick="renderProjectsForUser(proyectosGlobales, ${totalPages})">${totalPages}</button>`;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
            onclick="if(!this.classList.contains('disabled')) renderProjectsForUser(proyectosGlobales, ${currentPage + 1}, 'left')">
            Siguiente &raquo;
        </button>`;

    paginationHTML += '</div>';
    return paginationHTML;
};

const cambiarItemsPorPaginaUser = (nuevoItemsPerPage) => {
    selectedItemsPerPage = nuevoItemsPerPage; // Guardar la selección del usuario
    itemsPerPage = nuevoItemsPerPage;
    currentPage = 1; // Reiniciar a la primera página
    renderProjectsForUser(proyectosGlobales);
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
            <option value="${proyectosGlobales.length}" ${selectedItemsPerPage === proyectosGlobales.length ? 'selected' : ''}>Todos</option>
        </select>
        proyectos de ${proyectosGlobales.length}
    `;

    const paginationContainer = document.getElementById('paginationProyectos');
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

//---------------  Render Project table for User -------------------------
const renderProjectsForUser = async (arrayProjects, page = 1, direction = 'none') => {
    proyectosGlobales = arrayProjects;
    currentPage = page;

    const container = document.getElementById('mostrarProyectos');
    const pagination = document.getElementById('paginationProyectos');
    container.classList.add('transition-out', direction);

    // Esperar a que termine la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = arrayProjects.slice(startIndex, endIndex);

    let html = '', htmlPagination = ''

    if (paginatedItems.length > 0) {
        html = paginatedItems.map((element) => {
            let green = 'success', blue = 'primary', red = 'danger', dark = 'dark', white = 'light',
                grey = 'secondary', yellow = 'warning', cian = 'info', btnGroup = '';

            // Definir valores predeterminados
            let colorResult = grey, colorLevel = white, text = "Cotizado";

            // ----------- Loops de Array OCI ----------------
            function loopOci(j) {
                let ociArr = []
                let otVisibleLength = 0
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) otVisibleLength++
                }
                
                if (otVisibleLength > 0 ) {
                    if (otVisibleLength % 2 === 0) {
                        for (let i=0; i < otVisibleLength; i++) {
                            if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                                element.project[0].oci[j].ociStatus
                                    ? ociArr.push(element.project[0].oci[j].ociNumber)
                                    : ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            
                            } else {
                                ociArr.push('&#8203;')
                            }
                        }

                    } else {
                        for (let i=0; i < otVisibleLength; i++) {
                            if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                                element.project[0].oci[j].ociStatus
                                    ? ociArr.push(element.project[0].oci[j].ociNumber)
                                    : ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            
                            } else {
                                ociArr.push('&#8203;')
                            }
                        }
                    }
                    return ociArr.join('<br>')

                } else {
                    return (`${element.project[0].oci[j].ociNumber} <i class="fa-solid fa-circle-exclamation" title="Sin Datos" style="color: #fd7e14;"></i>`)
                }
            }

            let arrOciArr = []
            function loopArrayOci() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrOciArr.push(loopOci(j))
                }
                return arrOciArr.join('<hr>')
            }

            //************* Loop  Alias de Oci *******************
            function loopAliasOci(j) {
                let ociAliasArr = []
                let otVisibleLength = 0
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) otVisibleLength++
                }
                
                if (otVisibleLength > 0 ) {
                    if (otVisibleLength % 2 === 0) {
                        for (let i=0; i < otVisibleLength; i++) {
                            if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                                element.project[0].oci[j].ociStatus
                                    ? ociAliasArr.push(`<span class="badge bg-${blue} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                                    : ociAliasArr.push(`<span class="badge bg-${red} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span><br>`)

                            } else {
                                ociAliasArr.push('&#8203;')
                            }
                        }

                    } else {
                        for (let i=0; i < otVisibleLength; i++) {
                            if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                                element.project[0].oci[j].ociStatus
                                    ? ociAliasArr.push(`<span class="badge bg-${blue} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                                    : ociAliasArr.push(`<span class="badge bg-${red} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span><br>`)

                            } else {
                                ociAliasArr.push('&#8203;')
                            }
                        }
                    }
                    return ociAliasArr.join('<br>')

                } else {
                    return (`<span class="badge bg-${grey} text-${white} my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                }
            }

            let arrOciAliasArr = []
            function loopArrayAliasOci() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrOciAliasArr.push(loopAliasOci(j))
                }
                return arrOciAliasArr.join('<hr>')
            }

            // ----------- Loops de Array OTs ----------------
            function loopOt(j) {
                let otArr = []
                if (element.project[0].oci[j].otProject.length > 0 ) {

                    for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                        if (element.project[0].oci[j].otProject[i].visible) {
                            element.project[0].oci[j].otProject[i].otStatus
                                ? otArr.push(element.project[0].oci[j].otProject[i].otNumber)
                                : otArr.push(element.project[0].oci[j].otProject[i].otNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OT Inactiva" style="color: #ff0000;"></i>')
                        }
                    }
                    return otArr.join('<br>')

                } else {
                    return (`<span class="badge rounded-pill bg-${grey} text-${white} my-auto">S/D</span>`)
                }
            }
            
            let arrOtArr = []
            function loopArrayOt() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrOtArr.push(loopOt(j))
                }
                return arrOtArr.join('<hr>')
            }

            // ----------- Loops de Array OPs ----------------
            function loopOp(j) {
                let opArr = []
                if (element.project[0].oci[j].otProject.length > 0 ) {
                    for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                        if (element.project[0].oci[j].otProject[i].visible) opArr.push(element.project[0].oci[j].otProject[i].opNumber)
                    }
                    return opArr.join('<br>')

                } else {
                    return (`<span class="badge rounded-pill bg-${grey} text-${white} my-auto">S/D</span>`)
                }
            }

            let arrOpArr = []
            function loopArrayOp() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrOpArr.push(loopOp(j))
                }
                return arrOpArr.join('<hr>')
            }

            // ----------- Loops de Array Op Descriptions ----------------
            function loopDescription(j) {
                let DescriptionArr = []
                if (element.project[0].oci[j].otProject.length > 0 ) {
                    for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                        if (element.project[0].oci[j].otProject[i].visible) {
                            DescriptionArr.push(element.project[0].oci[j].otProject[i].opDescription)
                        }
                    }
                    return DescriptionArr.join('<br>')

                } else {
                    return ('<span class="badge rounded-pill bg-${grey} text-${white} my-auto">S/D</span>')
                }
            }

            let arrDescriptionArr = []
            function loopArrayDescription() {
                for (let j=0; j < element.project[0].oci.length; j++) {
                    if (element.project[0].oci[j].visible) arrDescriptionArr.push(loopDescription(j))
                }
                return arrDescriptionArr.join('<hr>')
            }    

            // Crear un objeto para mapear los diferentes estados
            const levelProjectMap = {
                ganado: {
                    colorLevel: white,
                    colorResult: green,
                    text: "Ganado"
                },
                paraCotizar: {
                    colorLevel: yellow,
                    colorResult: grey,
                    text: "Para Cotizar"
                },
                default: {
                    colorLevel: white,
                    colorResult: red,
                    text: "A Riesgo"
                }
            };

            // Obtener los valores correspondientes al levelProject
            const projectLevel = element.project[0].levelProject;
            const levelData = levelProjectMap[projectLevel] || levelProjectMap.default;

            // Asignar los valores
            colorLevel = levelData.colorLevel;
            colorResult = levelData.colorResult;
            text = levelData.text;

            const uNegocioMapping = {
                'matrices': { showUNegocio: 'M', optionUNegocio: dark, optionTextUNegocio: white },
                'lineas': { showUNegocio: 'L', optionUNegocio: blue, optionTextUNegocio: white }
            };
        
            // Valores predeterminados
            const defaultValuesuNegocio = { showUNegocio: 'ML', optionUNegocio: green };
            
            // Asignar valores basados en el Unidad de Negocio
            const { showUNegocio, optionUNegocio, optionTextUNegocio } = uNegocioMapping[element.uNegocio] || defaultValuesuNegocio;

            let utcDate = new Date(element.timestamp),
                utcDateModified = new Date(element.modifiedOn),
                localDate = new Date(utcDate.getTime() + offset),
                localDateModified = new Date(utcDateModified.getTime() + offset),
                formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                formattedDate === formattedDateModified ? formattedDateModified = '' : null

            if(element.project[0].visible) {
                element.uNegocio === 'lineas'
                    ? completeTr = `rgba(0, 0, 255, 0.1)`
                    : completeTr = `rgba(0, 0, 0, 0.05)`

                element.uNegocio === 'lineas'
                    ? btnGroup = `<a href="/api/clientes/${element.client[0]._id}" class="btn btn-${grey} btn-sm my-2 shadow-lg" data-toggle="tooltip" data-placement="top" title="Ver proyecto"><i class="fa-solid fa-eye"></i></a>
                                    <a href="/api/ingenieriaLineas/selectWonProjects/${element.project[0]._id}" class="btn btn-${dark} btn-sm my-2 shadow-lg" title="Editar datos de Ingeniería Líneas"><i class="fa-solid fa-pencil"></i></a>
                                    <button class="btn btn-${red} btn-sm mx-1 my-2 disabled" title="Eliminar proyectos"><i class="fa-solid fa-trash"></i></button>`
    
                    : btnGroup = `<a href="/api/clientes/${element.client[0]._id}" class="btn btn-${grey} btn-sm me-1 my-2" data-toggle="tooltip" data-placement="top" title="Ver proyecto"><i class="fa-solid fa-eye"></i></a>
                                    <a href="/api/proyectos/selectProject/${element.project[0]._id}" class="btn btn-${blue} btn-sm mx-1 my-2" title="Editar datos de OCI"><i class="fa-solid fa-pencil"></i></a>
                                    <button class="btn btn-${red} btn-sm mx-1 my-2 disabled" title="Eliminar proyectos"><i class="fa-solid fa-trash"></i></button>`
                
                return (`<tr style="border-bottom: 2px solid #dedede; background-color: ${completeTr}">
                            <td class="text-center">${element.project[0].codeProject}<br><span class="badge rounded-pill bg-${optionUNegocio} text-${optionTextUNegocio} mt-2">${showUNegocio}</span></td>
                            <td class="text-center border-start" data-column="nombre">${element.project[0].projectName}</td>
                            <td class="text-center border-start"><a href="/api/clientes/${element.client[0]._id}"><img id="imgProject_${element._id}" class="imgLazyLoad img-fluid rounded-3 m-auto p-1 shadow" alt="Imagen Proyecto" data-src="${element.project[0].imageProject}" src='${imagenLazy}' width="90%" height="90%" loading="lazy"></a></td>
                            <td class="text-center border-start" data-column="cliente"><p style="display: none;">${element.client[0].name}</p><img id="logo_${element._id}" class="imgLazyLoad img-fluid rounded-3 m-auto p-1 shadow" alt="Logo Cliente" data-src='${element.client[0].logo}' src='${imagenLazy}' width="90%" height="90%" loading="lazy"></td>
                            <td class="text-center border-start" data-column="prio"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                            <td class="text-center border-start" data-column="nivel"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                            <td class="text-center px-2 border-start">${element.project[0].projectDescription}</td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0" data-column="ociAlias">${loopArrayAliasOci()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0" data-column="oci">${loopArrayOci()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0" data-column="ot">${loopArrayOt()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0">${loopArrayOp()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start">
                                <table class="table-responsive mx-auto my-3" style="font-size: 10pt; width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td class="border border-0 text-center align-middle overflow-ellipsis"">${loopArrayDescription()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="text-center border-start" data-column="fecha">${formattedDate}</td>
                            <td class="text-center border-start">
                                <div class="d-block align-items-center">
                                    ${btnGroup}
                                </div>
                            </td>
                        </tr>`
                    )
            }

        }).join(" ");
        htmlPagination = generarControlesPaginacionUser();

    } else {
        html = (`<tr>
                    <td colspan="14">
                        <img class="img-fluid rounded-2 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarProyectos').innerHTML = html
    }

    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('projectTable').style.display = 'block';
    
    container.innerHTML = html;
    pagination.innerHTML = htmlPagination;
    container.classList.remove('transition-out', 'left', 'right');
    container.classList.add('transition-in', direction);

    document.getElementById('mostrarProyectos').innerHTML = html
    
    let arrayCantProyectos = []
    for (let i=0; i<arrayProjects.length; i++){
        if (arrayProjects[i].project[0].visible) arrayCantProyectos.push(i)
    }

    const totalProyectos = parseInt(arrayCantProyectos.length)
    const projectosEliminados = parseInt(arrayProjects.length-arrayCantProyectos.length)
    let textTotalProyectos
    let textProyectosEliminados

    totalProyectos>1
        ? textTotalProyectos = `Mostrando ${totalProyectos} Proyectos en total`
        : textTotalProyectos = `Mostrando ${totalProyectos} Proyecto en total`

    projectosEliminados>1
        ? textProyectosEliminados = `(${projectosEliminados}) Proyectos, fueron eliminados`
        : textProyectosEliminados = `(${projectosEliminados}) Proyecto, fue eliminado`                  
    
    const htmlProjectsList = 
        ( `<caption id="capProjectsList">
            ${textTotalProyectos}
            <br>
            ${textProyectosEliminados}
        </caption>`)

    document.getElementById('capProjectsList').innerHTML = htmlProjectsList

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
    agregarSelectItemsPorPaginaUser();
}