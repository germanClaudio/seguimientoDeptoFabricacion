const socket = io.connect()

function sortTable(columnName) {
    const table = document.getElementById('miTablaWon');
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
    document.getElementById('miTablaWon').style.display = 'none';
});

//  ---------------- Projects list ----------------
socket.on('projectsAllWon', (arrayProjects, arrUsers) => {

    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
        if(index !== -1) {
            let user = arrUsers[index].admin
            let userId = arrUsers[index]._id
            user ? renderProjectsWonForAdmin(arrayProjects, userId) : renderProjectsWonForUser(arrayProjects)
        }   
})

// --------------- Render Project table for AdminS -----------------------------------
const renderProjectsWonForAdmin = (arrayProjects) => {
    let arrayProyectos = arrayProjects
        
    const html = arrayProyectos.map((element) => {
        let green = 'success',
            red = 'danger',
            text = "Cotizado",
            grey = 'secondary',
            yellow = 'warning',
            white = 'white',
            colorResult = grey,
            colorLevel
        
        // ----------- Loops de Array OCI ----------------
        function loopOci(j) {
            let ociArr = [], otVisibleLength = 0
            for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                if (element.project[0].oci[j].otProject[i].visible) {
                    otVisibleLength++
                }
            }
            
            if (otVisibleLength > 0 ) {
                if (otVisibleLength % 2 === 0) {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                            element.project[0].oci[j].ociStatus ?
                                ociArr.push(element.project[0].oci[j].ociNumber)
                            :
                                ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            
                        } else {
                            ociArr.push('&#8203;')
                        }
                    }

                } else {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                            element.project[0].oci[j].ociStatus ?
                                ociArr.push(element.project[0].oci[j].ociNumber)
                            :
                                ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            
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
                if (element.project[0].oci[j].visible) {
                    arrOciArr.push(loopOci(j))
                }
            }
            return arrOciArr.join('<hr>')
        }

        //************* Loop  Alias de Oci *******************
        function loopAliasOci(j) {
            let ociAliasArr = [], otVisibleLength = 0
            for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                if (element.project[0].oci[j].otProject[i].visible) {
                    otVisibleLength++
                }
            }
            
            if (otVisibleLength > 0 ) {
                if (otVisibleLength % 2 === 0) {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                            element.project[0].oci[j].ociStatus ?
                                ociAliasArr.push(`<span class="badge bg-primary text-light my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                            :
                                ociAliasArr.push(`<span class="badge bg-danger text-light my-auto">${element.project[0].oci[j].ociAlias}</span><br>`)
                            
                        } else {
                            ociAliasArr.push('&#8203;')
                        }
                    }

                } else {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                            element.project[0].oci[j].ociStatus ?
                                ociAliasArr.push(`<span class="badge bg-primary text-light my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                            :
                                ociAliasArr.push(`<span class="badge bg-danger text-light my-auto">${element.project[0].oci[j].ociAlias}</span><br>`)
                            
                        } else {
                            ociAliasArr.push('&#8203;')
                        }
                    }
                }
                return ociAliasArr.join('<br>')

            } else {
                return (`<span class="badge bg-secondary text-light my-auto">${element.project[0].oci[j].ociAlias}</span>`)
            }
        }

        let arrOciAliasArr = []
        function loopArrayAliasOci() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOciAliasArr.push(loopAliasOci(j))
                }
            }
            return arrOciAliasArr.join('<hr>')
        }


        // ----------- Loops de Array OTs ----------------
        function loopOt(j) {
            let otArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {

                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        element.project[0].oci[j].otProject[i].otStatus ?
                            otArr.push(element.project[0].oci[j].otProject[i].otNumber)
                        :
                            otArr.push(element.project[0].oci[j].otProject[i].otNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OT Inactiva" style="color: #ff0000;"></i>')
                    }
                }
                return otArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }
        

        let arrOtArr = []
        function loopArrayOt() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOtArr.push(loopOt(j))
                }
            }
            return arrOtArr.join('<hr>')
        }

        // ----------- Loops de Array OPs ----------------
        function loopOp(j) {
            let opArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        opArr.push(element.project[0].oci[j].otProject[i].opNumber)
                    }
                }
                return opArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }

        let arrOpArr = []
        function loopArrayOp() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOpArr.push(loopOp(j))
                }
            }
            return arrOpArr.join('<hr>')
        }

        // ----------- Loops de Array Descriptions ----------------
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
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }

        let arrDescriptionArr = []
        function loopArrayDescription() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrDescriptionArr.push(loopDescription(j))
                }
            }
            return arrDescriptionArr.join('<hr>')
        }    


        if ( element.project[0].levelProject === "ganado") {
            colorLevel = white
            colorResult = green
            text = "Ganado"
        } 

        if (element.project[0].visible) {
            return (`<tr style="border-bottom: 2px solid #dedede";>
                        <td class="text-center">${element.project[0].codeProject}</td>
                        <td class="text-center border-start" data-column="nombre">${element.project[0].projectName}</td>
                        <td class="text-center border-start"><a href="/api/clientes/${element.client[0]._id}"><img class="img-fluid rounded-3 m-auto p-1 shadow" alt="Imagen Proyecto" src='${element.project[0].imageProject}' width="90%" height="90%"></a></td>
                        <td class="text-center border-start" data-column="cliente"><img class="img-fluid rounded-3 m-auto p-1 shadow" alt="Logo Cliente" src='${element.client[0].logo}' width="90%" height="90%"></td>
                        <td class="text-center border-start" data-column="prio"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                        <td class="text-center border-start" data-column="nivel"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                        <td class="text-center border-start px-2">${element.project[0].projectDescription}</td>
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
                                        <td class="border border-0 overflow-ellipsis">${loopArrayDescription()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="text-center border-start" data-column="fecha">${element.timestamp}</td>
                        <td class="text-center border-start">
                            <div class="d-flex flex-column align-items-center">
                                <a href="/api/clientes/${element.client[0]._id}" class="btn btn-secondary btn-sm my-2 shadow-lg" data-toggle="tooltip" data-placement="top" title="Ver proyecto"><i class="fa-solid fa-eye"></i></a>
                                <a href="/api/programas/selectWonProjects/${element.project[0]._id}" class="btn btn-primary btn-sm my-2 shadow-lg" title="Editar datos de Programación"><i class="fa-solid fa-pencil"></i></a>
                                <a href="/api/ajustes/selectAjusteProjects/${element.project[0]._id}" class="btn btn-warning btn-sm my-2 shadow-lg" title="Editar datos de Ajuste"><i class="fa-solid fa-file-pen"></i></a>
                            </div>
                        </td>
                    </tr>`)
        }

    }).join(" ");

    document.getElementById('mostrarProyectosGanados').innerHTML = html
    
        let arrayCantProyectos = []
        for (let i=0; i<arrayProyectos.length; i++){
            if(arrayProyectos[i].project[0].visible) {
                arrayCantProyectos.push(i)
            }
        }

        const totalProyectos = parseInt(arrayCantProyectos.length)
        const projectosEliminados = parseInt(arrayProyectos.length-arrayCantProyectos.length)
        let textTotalProyectos
        let textProyectosEliminados

        totalProyectos>1 ? textTotalProyectos = `Mostrando ${totalProyectos} Proyectos en total`
                            : 
                            textTotalProyectos = `Mostrando ${totalProyectos} Proyecto en total`

        projectosEliminados>1 ? textProyectosEliminados = `(${projectosEliminados}) Proyectos, fueron eliminados`
                                : 
                                textProyectosEliminados = `(${projectosEliminados}) Proyecto, fue eliminado`                  
        
        const htmlProjectsList = 
            ( `<caption id="capProjectsWonList">
                ${textTotalProyectos}
                <br>
                ${textProyectosEliminados}
            </caption>`)

        document.getElementById('capProjectsWonList').innerHTML = htmlProjectsList

        // Ocultar el spinner y mostrar la tabla
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('miTablaWon').style.display = 'block';
}

//---------------  Render Project table for User -------------------------
const renderProjectsWonForUser = (arrayProjects) => {
    let arrayProyectos = arrayProjects
        
    const html = arrayProyectos.map((element) => {
        let green = 'success'
        let red = 'danger'
        let text = "Ganado"
        let grey = 'secondary'
        let yellow = 'warning'
        let white = 'white'
        let colorResult = grey
        let colorLevel

        // ----------- Loops de Array OCI ----------------
        function loopOci(j) {
            let ociArr = []
            let otVisibleLength = 0
            for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                if (element.project[0].oci[j].otProject[i].visible) {
                    otVisibleLength++
                }
            }
            
            if (otVisibleLength > 0 ) {
                if (otVisibleLength % 2 === 0) {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                            element.project[0].oci[j].ociStatus ?
                                ociArr.push(element.project[0].oci[j].ociNumber)
                            :
                                ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                            
                        } else {
                            ociArr.push('&#8203;')
                        }
                    }

                } else {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                            element.project[0].oci[j].ociStatus ?
                                ociArr.push(element.project[0].oci[j].ociNumber)
                            :
                                ociArr.push(element.project[0].oci[j].ociNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OCI Inactiva" style="color: #ff0000;"></i><br>')
                    
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
                if (element.project[0].oci[j].visible) {
                    arrOciArr.push(loopOci(j))
                }
            }
            return arrOciArr.join('<hr>')
        }

        //************* Loop  Alias de Oci *******************
        function loopAliasOci(j) {
            let ociAliasArr = []
            let otVisibleLength = 0
            for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                if (element.project[0].oci[j].otProject[i].visible) {
                    otVisibleLength++
                }
            }
            
            if (otVisibleLength > 0 ) {
                if (otVisibleLength % 2 === 0) {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-1) {
                            element.project[0].oci[j].ociStatus ?
                                ociAliasArr.push(`<span class="badge bg-primary text-light my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                            :
                                ociAliasArr.push(`<span class="badge bg-danger text-light my-auto">${element.project[0].oci[j].ociAlias}</span><br>`)
                            
                        } else {
                            ociAliasArr.push('&#8203;')
                        }
                    }

                } else {
                    for (let i=0; i < otVisibleLength; i++) {
                        if (element.project[0].oci[j].visible && i === (otVisibleLength/2)-0.5) {
                            element.project[0].oci[j].ociStatus ?
                                ociAliasArr.push(`<span class="badge bg-primary text-light my-auto">${element.project[0].oci[j].ociAlias}</span>`)
                            :
                                ociAliasArr.push(`<span class="badge bg-danger text-light my-auto">${element.project[0].oci[j].ociAlias}</span><br>`)
                            
                        } else {
                            ociAliasArr.push('&#8203;')
                        }
                    }
                }
                return ociAliasArr.join('<br>')

            } else {
                return (`<span class="badge bg-secondary text-light my-auto">${element.project[0].oci[j].ociAlias}</span>`)
            }
        }

        let arrOciAliasArr = []
        function loopArrayAliasOci() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOciAliasArr.push(loopAliasOci(j))
                }
            }
            return arrOciAliasArr.join('<hr>')
        }

        // ----------- Loops de Array OTs ----------------
        function loopOt(j) {
            let otArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {

                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        element.project[0].oci[j].otProject[i].otStatus ?
                            otArr.push(element.project[0].oci[j].otProject[i].otNumber)
                        :
                            otArr.push(element.project[0].oci[j].otProject[i].otNumber + ' ' + '<i class="fa-solid fa-circle-info" title="OT Inactiva" style="color: #ff0000;"></i>')
                    }
                }
                return otArr.join('<br>')
                
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }
        
        let arrOtArr = []
        function loopArrayOt() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOtArr.push(loopOt(j))
                }
            }
            return arrOtArr.join('<hr>')
        }

        // ----------- Loops de Array OPs ----------------
        function loopOp(j) {
            let opArr = []
            if (element.project[0].oci[j].otProject.length > 0 ) {
                for (let i=0; i < element.project[0].oci[j].otProject.length; i++) {
                    if (element.project[0].oci[j].otProject[i].visible) {
                        opArr.push(element.project[0].oci[j].otProject[i].opNumber)
                    }
                }
                return opArr.join('<br>')
            } else {
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }

        let arrOpArr = []
        function loopArrayOp() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrOpArr.push(loopOp(j))
                }
            }
            return arrOpArr.join('<hr>')
        } 

        // ----------- Loops de Array Descriptions ----------------
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
                return ('<span class="badge rounded-pill bg-secondary text-light my-auto">S/D</span>')
            }
        }

        let arrDescriptionArr = []
        function loopArrayDescription() {
            for (let j=0; j < element.project[0].oci.length; j++) {
                if (element.project[0].oci[j].visible) {
                    arrDescriptionArr.push(loopDescription(j))
                }
            }
            return arrDescriptionArr.join('<hr>')
        }

        
        if(element.project[0].visible) {
            return (`<tr style="border-bottom: 2px solid #dedede";>
                        <td class="text-center">${element.project[0].codeProject}</td>
                        <td class="text-center border-start" data-column="nombre">${element.project[0].projectName}</td>
                        <td class="text-center border-start"><a href="/api/clientes/${element.client[0]._id}"><img class="img-fluid rounded-3 m-auto p-1 shadow" alt="Imagen Proyecto" src='${element.project[0].imageProject}' width="90%" height="90%"></a></td>
                        <td class="text-center border-start" data-column="cliente"><img class="img-fluid rounded-3 m-auto p-1 shadow" alt="Logo Cliente" src='${element.client[0].logo}' width="90%" height="90%"></td>
                        <td class="text-center border-start" data-column="prio"><span class="badge rounded-pill bg-dark">${element.project[0].prioProject}</span></td>
                        <td class="text-center border-start" data-column="nivel"><span class="badge rounded-pill bg-${colorResult} text-${colorLevel}">${text}</span></td>
                        <td class="text-center border-start">${element.project[0].projectDescription}</td>
                        
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
                                        <td class="border border-0 overflow-ellipsis">${loopArrayDescription()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                        <td class="text-center border-start" data-column="fecha">${element.timestamp}</td>
                        <td class="text-center border-start">
                            <div class="d-flex flex-column align-items-center">
                                <a href="/api/proyectos/${element.client[0]._id}" class="btn btn-secondary btn-sm my-2 shadow-lg" data-toggle="tooltip" data-placement="top" title="Ver proyecto"><i class="fa-solid fa-eye"></i></a>
                                <a href="/api/programas/selectWonProjects/${element.project[0]._id}" class="btn btn-primary btn-sm my-2 shadow-lg" title="Editar datos de OCI/OT/Ítems"><i class="fa-solid fa-pencil"></i></a>
                                <a href="/api/ajustes/selectAjusteProjects/${element.project[0]._id}" class="btn btn-warning btn-sm my-2 shadow-lg" title="Editar datos de Ajuste"><i class="fa-solid fa-file-pen"></i></a>
                            </div>
                        </td>
                    </tr>`)
        }

    }).join(" ");

    document.getElementById('mostrarProyectosGanados').innerHTML = html

    let arrayCantProyectos = []
        for (let i=0; i<arrayProyectos.length; i++){
            if(arrayProyectos[i].project[0].visible) {
                arrayCantProyectos.push(i)
            }
        }

        const totalProyectos = parseInt(arrayCantProyectos.length)
        const projectosEliminados = parseInt(arrayProyectos.length-arrayCantProyectos.length)
        let textTotalProyectos
        let textProyectosEliminados

        totalProyectos>1 ? textTotalProyectos = `Mostrando ${totalProyectos} Proyectos en total`
                            : 
                        textTotalProyectos = `Mostrando ${totalProyectos} Proyecto en total`

        projectosEliminados>1 ? textProyectosEliminados = `(${projectosEliminados}) Proyectos, fueron eliminados`
                                : 
                                textProyectosEliminados = `(${projectosEliminados}) Proyecto, fue eliminado`                  
        
        const htmlProjectsList = 
            ( `<caption id="capProjectsWonList">
                ${textTotalProyectos}
                <br>
                ${textProyectosEliminados}
            </caption>`)

        document.getElementById('capProjectsWonList').innerHTML = htmlProjectsList

        // Ocultar el spinner y mostrar la tabla
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('miTablaWon').style.display = 'block';
}