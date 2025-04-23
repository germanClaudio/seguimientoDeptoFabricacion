//variable limite maximo de proyectos por Cliente
const varLimMaxProyectoCliente = 99

//variable limite maximo de Ot por Proyecto
const varLimMaxOtProyecto = 99

//variable limite maximo de OCI por Proyecto
const varLimMaxOciProyecto = 99

//variable limite maximo de Columnas Info por Ot
const varLimMaxColData = 20

//variable limite maximo de Revisiones por dato
const varLimMaxRevData = 99

let URL_GOOGLE_STORE_IMGPROJECTS

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMGPROJECTS = config.URL_GOOGLE_STORE_IMGPROJECTS
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

function extractNumbers(str) {
    const numbers = str.match(/\d{1,2}/g); // Extract 1 or 2 digit numbers from the string
    
    if (numbers) {
        if (numbers.length === 2) {
            // If two numbers are found, check if both are numbers
            if (!isNaN(parseInt(numbers[0])) && !isNaN(parseInt(numbers[1]))) {
                return numbers; // Return both numbers as an array
            }
        } else if (numbers.length === 1) {
            // If only one number is found, check if it's a number
            if (!isNaN(parseInt(numbers[0]))) {
                return numbers[0]; // Return the single number
            }
        }
    }
    return null // Return null if no valid numbers are found
}

//------------- Create New Project ---------------
function messageNewProject(imgCliente, idCliente, nameCliente) { 
    if (imgCliente, idCliente, nameCliente) {
        let html = `<form id="formNewProject" action="/api/proyectos/newProject/${idCliente}" enctype="multipart/form-data" method="post">
                <fieldset>
                    <div class="row justify-content-between align-items-center mx-auto my-3">
                        <div class="col-3">
                            <label for="projectName" class="d-flex justify-content-start">Nombre Proyecto</label>
                            <input type="text" name="projectName" id="projectName" class="form-control"
                                placeholder="Nombre Proyecto" required>
                        </div>
                        <br>
                        <div class="col-auto">
                            <label for="statusProject" class="justify-content-start">Status Proyecto</label>
                            <div class="">
                                <div class="form-check form-switch d-inline-block mt-2">
                                    <input class="form-check-input" type="checkbox" id="statusProject" aria-checked="true" name="statusProject" style="cursor: pointer;" checked>
                                    <label class="form-check-label" for="statusProject">Activo</label>
                                </div>    
                            </div>
                        </div>
                        <br>
                        <div class="col-2">
                            <label for="levelProject" class="d-flex justify-content-start">Nivel</label>
                            <select id="levelProject" name="levelProject" class="form-select" required>
                                <option selected disabled value="">Seleccione un Nivel</option>
                                <option value="ganado">Ganado</option>
                                <option value="paraCotizar">Para Cotizar</option>
                                <option value="aRiesgo">A Riesgo</option>
                            </select>
                        </div>
                        <br>
                        <div class="col-2">
                            <label for="uNegocioProject" class="d-flex justify-content-start">Unidad de Negocio</label>
                            <select id="uNegocioProject" name="uNegocioProject" class="form-select" required>
                                <option selected disabled value="">Seleccione Unidad Negocio</option>
                                <option value="matrices">Matrices</option>
                                <option value="lineas">Líneas</option>
                            </select>
                        </div>
                        <br>
                        <div class="col-2">
                            <label for="codeProject" class="d-flex justify-content-start">Codigo Proyecto</label>
                            <input type="text" name="codeProject" id="codeProject" class="form-control"
                                placeholder="Codigo Proyecto" required>
                        </div>
                        <br>
                        <div class="col-2">
                            <label for="prioProject" class="d-flex justify-content-start">Prioridad Proyecto</label>
                            <input type="number" name="prioProject" id="prioProject" class="form-control" min="0" max="999"
                                placeholder="Prio Proyecto" value="0">
                        </div>
                    </div>

                    <div class="row justify-content-between mx-auto my-3">
                        <div class="col-5">
                            <label for="projectDescription" class="d-flex justify-content-start">Descripción Proyecto</label>
                            <input type="text" name="projectDescription" id="projectDescription" class="form-control"
                                placeholder="Descripción Proyecto" required>
                        </div>
                        <br>
                        <div class="col">
                            <input type="text" id="fileInputTextProject" name="imageProject" style="display: none;">
                            <input type="file" id="fileInputProject" name="imageProject"
                                value="" accept="image/*" style="display: none;">
                            <div id="drop-areaProject" class="mx-auto" style="font-size: .8em;">
                                <label for="fileInputTextProject" class="d-flex justify-content-center">
                                    Seleccione una imagen para el Proyecto
                                </label>
                                <p>Haz click o arrastra y suelta una imagen aquí</p>
                            </div>

                            <button title="Eliminar Imagen" type="button"
                                class="btn btn-danger rounded-circle mx-auto"
                                id="removeImageProject" style="display: none;">
                                    <i class="fa-solid fa-xmark"></i>
                            </button>

                            <div id="alertProject" class="alert alert-warning align-items-center mx-auto" role="alert"
                                style="display: none; font-size: 0.85rem; height: 1.15rem;  width: 28rem;">
                                <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                            </div>
                            <div id="alertProjectSize" class="alert alert-warning align-items-center mx-auto" role="alert"
                                style="display: none; font-size: 0.85rem; height: 1.15rem; width: 25rem;">
                                <strong class="me-2">Atención!</strong> El tamaño de la imagen debe ser menor a 3Mb.
                            </div>
                        </div>
                    </div>
                    
                    <div class="row justify-content-between mx-auto my-3">
                        <div class="col-11">
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                        <button class="accordion-button" id="buttonOne" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOneForm" aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseOneForm">
                                            <strong>Información OCI</strong>
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOneForm" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                                        <div class="accordion-body" id="div_body">
                                            <div class="row my-3" id="ociItemRow">
                                                <div class="row text-start">
                                                    <strong>#1</strong>
                                                </div>
                                                <hr>
                                                <div class="col-1">
                                                    <label for="ociNumber" id="labelOciNumber" class="d-flex text-start">Núm. OCI</label>
                                                    <input type="number" name="ociNumber" id="ociNumber" class="form-control"
                                                    min="0" max="9999" placeholder="Número OCI" value="1" required>
                                                </div>
                                                <div class="col-1">
                                                    <label for="ociPrio" id="labelOciPrio" class="d-flex text-start">Prio OCI</label>
                                                    <input type="number" name="ociPrio" id="ociPrio" class="form-control"
                                                    min="0" max="999" placeholder="Prio OCI" value="1" required>
                                                </div>
                                                <div class="col-3">
                                                    <label for="ociDescription" id="labelOciDescription" class="d-flex text-start">Descripción OCI</label>
                                                    <textarea type="text" name="ociDescription" id="ociDescription" rows="3" maxlength="100" class="form-control" placeholder="Descripcion OCI" required></textarea>
                                                </div>
                                                <div class="col-2">
                                                    <label for="ociAlias" id="labelOciAlias" class="d-flex text-start">Alias OCI</label>
                                                    <input type="text" name="ociAlias" id="ociAlias"
                                                    maxlength="50" class="form-control" placeholder="Alias OCI">
                                                </div>
                                                <div class="col-1">
                                                    <label for="ociStatus" id="labelOciStatus" class="d-flex text-start">Status OCI</label><br>
                                                    <div class="form-check form-switch d-inline-block">
                                                        <input class="form-check-input" type="checkbox" id="ociStatus"
                                                        name="ociStatus" aria-checked="true" style="cursor: pointer;" checked>
                                                    </div>    
                                                        <label class="form-check-label" for="ociStatus">Activa</label>
                                                </div>
                                                <div class="col">
                                                    <input type="text" id="fileInputNewOciText" name="imageOciFileName" value="" style="display: none;">
                                                    <input type="file" id="fileInputNewOci" name="imageNewOci" value="" accept="image/*" style="display: none;">
                                                    <div id="drop-area-oci" class="mx-auto" style="font-size: .75em;">
                                                        <label for="fileInputNewOci" id="labelOciImage" class="d-flex justify-content-center">
                                                            Seleccione una imagen para la OCI
                                                        </label>
                                                        <p>Haz click o arrastra y suelta una imagen aquí</p>
                                                    </div>

                                                    <button title="Eliminar Imagen" type="button" class="btn btn-danger rounded-circle mx-auto mt-2"
                                                        id="btnRemoveOciImage0" name="btnRemoveOciImage" style="display: none;">
                                                        <i class="fa-solid fa-xmark"></i>
                                                    </button>
                                                    
                                                    <div id="alertOci" class="alert alert-warning align-items-center mx-auto" role="alert"
                                                        style="display: none; font-size: 0.75rem; height: 1.15rem;">
                                                        <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                                                    </div>
                                                    <div id="alertOciSize" class="alert alert-warning align-items-center mx-auto" role="alert"
                                                        style="display: none; font-size: 0.75rem; height: 1.15rem;">
                                                        <strong class="me-2">Atención!</strong> El tamaño de la imagen debe ser menor a 3Mb.
                                                    </div>
                                                </div>
                                                <div class="col-1 my-1 align-self-middle">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col mx-auto">
                                <div class="d-flex justify-content-center">
                                    <button type="button" id="btnAddNewRow" title="Agregar nueva línea de OCI" 
                                        class="btn btn-primary rounded-circle me-2 my-2" autocomplete="off" disabled>
                                        <i class="fa-solid fa-plus-circle"></i>
                                    </button>
                                </div>
                        </div>
                    </div>
                    <div id="mensajeError" class="alert alert-warning align-items-center justify-content-center w-50 mx-auto" role="alert"
                        style="display: none; font-size: 0.85rem; height: 1.15rem;">
                    </div>
                    <input type="hidden" name="ociQuantity" id="ociQuantity" value="1">
                </fieldset>
            </form>`

        swal.fire({
            title: `Ingreso Nuevo Proyecto a cliente: ${nameCliente}`,
            position: 'center',
            html: html,
            width: 1500,
            imageUrl: `${imgCliente}`,
            imageWidth: `8%`,
            focusConfirm: false,
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText: 'Guardar <i class="fa-regular fa-save"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
            didOpen: () => {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            },
            showLoaderOnConfirm: true,
            preConfirm: () => {
                // Resetear mensajes y estilos
                document.getElementById('mensajeError').style.display = 'none';
                document.querySelectorAll('.is-invalid').forEach(el => {
                    el.classList.remove('is-invalid');
                    el.style.border = '';
                });
                document.querySelectorAll('[id^="drop-area-oci"]').forEach(el => {
                    el.style.border = '2px dashed #ccc';
                });
        
                // Validación principal
                const form = document.getElementById('formNewProject');
                let errorMessages = [];
                let firstInvalidElement = null;
        
                // 1. Validar campos del proyecto
                const projectRequiredFields = [
                    'projectName', 'levelProject', 'uNegocioProject', 
                    'codeProject', 'projectDescription'
                ];
        
                projectRequiredFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field && field.hasAttribute('required') && !field.value.trim()) {
                        field.classList.add('is-invalid');
                        field.style.border = '1px solid red';
                        const label = document.querySelector(`label[for="${fieldId}"]`);
                        errorMessages.push(label ? label.textContent.trim() : fieldId);
                        if (!firstInvalidElement) firstInvalidElement = field;
                    }
                });
        
                // 2. Validar OCIs
                const ociQuantity = parseInt(document.getElementById('ociQuantity').value);
                
                if (ociQuantity === 0) {
                    swal.showValidationMessage('El proyecto debe contener al menos 1 OCI');
                    return false;
                }
        
                let ociNumbers = new Set();
                let hasDuplicateOci = false;
        
                for (let i = 0; i < ociQuantity; i++) {
                    const suffix = i === 0 ? '' : i;
                    const ociNumber = document.getElementById(`ociNumber${suffix}`);
                    const ociDesc = document.getElementById(`ociDescription${suffix}`);
                    const ociImage = document.getElementById(`fileInputNewOci${suffix}`);
                    const ociDropArea = document.getElementById(`drop-area-oci${suffix}`);
        
                    // Validar número OCI
                    if (ociNumber && !ociNumber.value.trim()) {
                        ociNumber.classList.add('is-invalid');
                        ociNumber.style.border = '1px solid red';
                        errorMessages.push(`Número OCI #${i+1}`);
                        if (!firstInvalidElement) firstInvalidElement = ociNumber;

                    } else if (ociNumber) {
                        // Verificar duplicados
                        if (ociNumbers.has(ociNumber.value)) {
                            hasDuplicateOci = true;
                            ociNumber.classList.add('is-invalid');
                            ociNumber.style.border = '1px solid red';
                            errorMessages.push(`Número OCI #${i+1} (duplicado)`);
                        }
                        ociNumbers.add(ociNumber.value);
                    }
        
                    // Validar descripción OCI
                    if (ociDesc && !ociDesc.value.trim()) {
                        ociDesc.classList.add('is-invalid');
                        ociDesc.style.border = '1px solid red';
                        errorMessages.push(`Descripción OCI #${i+1}`);
                        if (!firstInvalidElement) firstInvalidElement = ociDesc;
                    }
        
                    // Validar imagen OCI
                    if (ociImage && ociImage.hasAttribute('required') && !ociImage.files[0]) {
                        ociDropArea.style.border = '1px solid red';
                        errorMessages.push(`Imagen OCI #${i+1}`);
                        if (!firstInvalidElement) firstInvalidElement = ociDropArea;
                    }
                }
        
                if (hasDuplicateOci) {
                    swal.showValidationMessage('No puede haber números de OCI duplicados');
                    return false;
                }
        
                // 3. Mostrar errores acumulados
                if (errorMessages.length > 0) {
                    // Mostrar mensaje en el formulario
                    const errorDiv = document.getElementById('mensajeError');
                    errorDiv.style.display = 'flex';
                    errorDiv.innerHTML = `
                        <i class="fa-solid fa-triangle-exclamation me-2"></i>
                        Campos requeridos faltantes: ${errorMessages.join(', ')}
                    `;
        
                    // Scroll y acordeón
                    if (firstInvalidElement?.closest('.accordion-item')) {
                        const accordion = document.getElementById('panelsStayOpen-collapseOneForm');
                        if (!accordion.classList.contains('show')) {
                            document.getElementById('buttonOne').click();
                        }
                    }
                    
                    firstInvalidElement?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
        
                    swal.showValidationMessage('Complete los campos requeridos');
                    return false;
                }
        
                // Si todo está validado, retornar los datos
                return {
                    formData: new FormData(form),
                    projectName: document.getElementById('projectName').value,
                    totalOciQty: parseInt(document.getElementById('ociQuantity').value),
                    ociNumbersValues: ociNumbers
                };
            },
            allowOutsideClick: () => !swal.isLoading()

        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('mensajeError').style.display = 'none';
                
                // Mostrar loader mientras se envía
                // swal.fire({
                //     title: 'Guardando proyecto...',
                //     allowOutsideClick: false,
                //     didOpen: () => {
                //         swal.isLoading()  //showLoading();
                //     }
                // });
        
                // Enviar formulario                
                const ociTotalQuantity = parseInt(document.getElementById('ociQuantity').value)
        
                if (ociTotalQuantity === 1) {
                    const ociNumber = parseInt(document.getElementById('ociNumber').value)
                    const projectNameString = document.getElementById('projectName').value
                    const formularioNewProject = document.getElementById('formNewProject')
                    // console.log('formularioNewProject: ', formularioNewProject)
                    formularioNewProject.submit()
                
                    setTimeout(() => {
                        swal.fire({
                            icon: 'success',
                            title: `El proyecto ${projectNameString}, con la OCI# ${ociNumber}, se creó con éxito!`
                        })
                    }, 1000)

                } else {
                    let arrayOciNumbers = []
                    const ociNumber = parseInt(document.getElementById('ociNumber').value)
                    arrayOciNumbers.push(ociNumber)

                    for (let oci=0; oci<ociTotalQuantity; oci++) {
                        if (document.getElementById(`ociNumber${oci}`)) {
                            arrayOciNumbers.push(parseInt(document.getElementById(`ociNumber${oci}`).value))
                        }
                    }
                    // Filtrar los elementos únicos
                    const elementosUnicos = arrayOciNumbers.filter((valor, indice, self) => {
                        return self.indexOf(valor) === indice;
                    });
                    
                    if (elementosUnicos.length !== arrayOciNumbers.length) {
                        swal.fire(
                            'Números de OCI repetidas!',
                            `El proyecto no puede tener 2 números de OCI repetidas!`,
                            'warning'
                        )
                        return false

                    } else {
                        const projectName = document.getElementById('projectName').value
                        document.getElementById('formNewProject').submit()
                        
                        setTimeout(() => {
                            swal.fire({
                                icon: 'success',
                                title: `El proyecto ${projectName} con ${ociTotalQuantity} OCI's, se creó con éxito!`
                            })
                        }, 1000)            
                    }
                }

            } else {
                swal.fire(
                    'Proyecto no creado!',
                    `El proyecto, no se creó!`,
                    'warning'
                )
                return false
            }
        });
        disabledBtnAceptar()

    } else {
        swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El proyecto no se creó correctamente!`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,
        })
    }

    //----------------------------------------------------------------------------------------------
    const btnAddNewRow = document.getElementById("btnAddNewRow"),
        buttonOne = document.getElementById('buttonOne')

    if (buttonOne) {
        buttonOne.addEventListener('click', () => {
            let ariaExpanded = buttonOne.getAttribute('aria-expanded')
        
            ariaExpanded === 'true'
            ? btnAddNewRow.removeAttribute('disabled')
            : btnAddNewRow.setAttribute('disabled', true)
        })
    }

    //*********** */
    tippy(btnAddNewRow, {
        content: `<strong>Límite máximo de OCI ${varLimMaxOciProyecto+1}</strong><br>
                Puedes agregar ${varLimMaxOciProyecto} OCI's mas`,
        allowHTML: true,
        maxWidth: 350,
        inlinePositioning: true,
        arrow: true,
        animation: 'shift-away', //'scale',
        theme: 'material',
        interactive: false,
        hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
    })
    //*********** */

    //-------------------------- Add New OCI Row --------------------------------
    if (btnAddNewRow) {
        btnAddNewRow.addEventListener('click', () => {
        
            const parentDiv = document.getElementById('div_body')
            let i = parentDiv.childElementCount
            
            const lastChild = parentDiv.children[i - 1],
                lastChildId = lastChild.id
        
            if (lastChildId < i || i == 1) {
                i = parentDiv.childElementCount
            } else {
                const numberId1 = parseInt(lastChildId.slice(-1)),
                    numberId2 = parseInt(lastChildId.slice(-2))
                let numberIdLastChild
        
                numberId1 >= 0 && numberId2 ? numberIdLastChild = numberId2 : numberIdLastChild = numberId1;
        
                i = numberIdLastChild + 1
            }
            
            const ociNumberValue = parseInt(document.getElementById('ociNumber').value),
                ociPrioValue = parseInt(document.getElementById('ociPrio').value),
                originalDiv = (
                    `<div class="row text-start">
                        <strong>#${i+1}</strong>
                    </div>
                    <hr>
                    <div class="col-1">
                        <label for="ociNumber${i}" id="labelOciNumber${i}" class="d-flex text-start">Núm. OCI</label>
                        <input type="number" name="ociNumber${i}" id="ociNumber${i}" class="form-control" min="0" max="9999"
                        placeholder="Número OCI" value="${ociNumberValue+i}" required>
                    </div>
                    <div class="col-1">
                        <label for="ociPrio${i}" id="labelOciPrio${i}" class="d-flex text-start">Prio OCI</label>
                        <input type="number" name="ociPrio${i}" id="ociPrio${i}" class="form-control" min="0" max="999"
                        placeholder="Número OCI" value="${ociPrioValue+i}" required>
                    </div>
                    <div class="col-3">
                        <label for="ociDescription${i}" id="labelOciDescription${i}">Descripción OCI</label>
                        <textarea type="text" name="ociDescription${i}" id="ociDescription${i}" rows="3" maxlength="100" class="form-control" placeholder="Descripción OCI" required></textarea>
                    </div>
                    <div class="col-2">
                        <label for="ociAlias${i}" id="labelOciAlias${i}">Alias OCI</label>
                        <input type="text" name="ociAlias${i}" id="ociAlias${i}"
                            maxlength="50" class="form-control" placeholder="Alias OCI">
                    </div>
                    <div class="col-1">
                        <label for="ociStatus${i}" id="labelOciStatus${i}">Status OCI</label><br>
                        <div class="form-check form-switch d-inline-block mt-2">
                            <input class="form-check-input" type="checkbox" id="ociStatus${i}" aria-checked="true" name="ociStatus${i}" style="cursor: pointer;" checked>
                        </div>
                        <label class="form-check-label" for="ociStatus${i}">Activa</label>
                    </div>
                    <div class="col">
                        <input type="text" id="fileInputNewOciText${i}" name="imageOciFileName${i}" style="display: none;">
                        <input type="file" id="fileInputNewOci${i}" name="imageNewOci${i}" value="" accept="image/*" style="display: none;">
                        <div id="drop-area-oci${i}" class="mb-1 mx-auto" style="font-size: 0.75em;">
                            <label for="fileInputNewOciText${i}" id="labelNewOciImage${i} class="d-flex justify-content-center">
                                Seleccione una imagen para la OCI
                            </label>
                                <p>Haz click o arrastra y suelta una imagen aquí</p>
                        </div>

                        <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                                id="btnRemoveOciImage${i}" name="btnRemoveOciImage" style="display: none;">
                                <i class="fa-solid fa-xmark"></i>
                        </button>
                        <div id="alertOci${i}" class="alert alert-warning align-items-center" role="alert"
                            style="display: none; font-size: 0.75rem; height: 1.15rem;">
                            <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                        </div>
                        <div id="alertOciSize${i}" class="alert alert-warning align-items-center mx-auto" role="alert"
                            style="display: none; font-size: 0.75rem; height: 1.15rem;">
                            <strong class="me-2">Atención!</strong> El tamaño de la imagen debe ser menor a 3Mb.
                        </div>
        
                    </div>
                    <div class="col-1 my-auto">
                        <div class="d-flex">
                            <button type="button" id="btnRemoveRow${i}" name="btnRemoveRow" title="Eliminar línea de OCI"
                                class="btn btn-danger rounded-circle m-2" autocomplete="off">
                                    <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>    
                    </div>`
                )
        
            if (i == 1) {
                originalDiv
        
            } else if (i !== 1 && i < (varLimMaxOciProyecto-1)) { //cantidad maxima de OCI en conjunto a agregar 100
                originalDiv
                btnRemoveItem = document.getElementById(`btnRemoveRow${i - 1}`)
                btnRemoveItem.style.display = 'none'
        
            } else {
                btnRemoveItem = document.getElementById(`btnRemoveRow${i - 1}`)
                btnRemoveItem.style.display = 'none'
                btnAddNewRow.setAttribute('disabled', true)
            }
        
            const newDiv = document.createElement('div')
            newDiv.setAttribute('class', "row my-3")
            newDiv.id = `ociItemRow${i}`
            newDiv.innerHTML = originalDiv
            parentDiv.appendChild(newDiv)
            const ociQty = document.getElementById("ociQuantity")
            ociQty.setAttribute('value', i + 1)
        
            let removeButtons = document.querySelectorAll('button[name="btnRemoveRow"]') //  Buttons to delete Oci Rows
            let lastRemoveButton = removeButtons[removeButtons.length-1]
        
            if (lastRemoveButton) {
                lastRemoveButton.addEventListener("click", (event) => {
                    event.preventDefault()
                    let idBtnRemoveRow = lastRemoveButton.id
                    removeRow(idBtnRemoveRow)
                })
            }

            let arrayDropAreas = [], arrayBtnRemoveOciImage = [], arrayAlertOci = [],
                arrayAlertSizeOci = [], arrayImageOciFileName = [], arrayFileInputNewOci = [];
            const totalOciQty = parseInt(document.getElementById("ociQuantity").value)
            
            function addElementToArray(elementId, array) {
                const element = document.getElementById(elementId);
                if (element) array.push(element);
            }
            
            for (let m = 1; m < totalOciQty; m++) {
                addElementToArray(`drop-area-oci${m}`, arrayDropAreas);
                addElementToArray(`btnRemoveOciImage${m}`, arrayBtnRemoveOciImage);
                addElementToArray(`alertOci${m}`, arrayAlertOci);
                addElementToArray(`alertOciSize${m}`, arrayAlertSizeOci);
                addElementToArray(`fileInputNewOciText${m}`, arrayImageOciFileName);
                addElementToArray(`fileInputNewOci${m}`, arrayFileInputNewOci);
            }

        function alertRefresh(number) {
            const dropArea = arrayDropAreas[number];
            arrayBtnRemoveOciImage[number].style.display = 'none';
            arrayFileInputNewOci[number].value = '';
            arrayImageOciFileName[number].value = '';
            
            Object.assign(dropArea.style, {
                border: "2px dashed #ccc",
                textAlign: "center",
                backgroundColor: "#fff",
                display: "block",
                fontSize: ".75em"
            });
            dropArea.innerHTML = 'Seleccione una imagen para la OCI <br>Haz click o arrastra y suelta una imagen aquí';
        }
        
            function alertNotImageNewOci(number) {
                arrayAlertOci[number].style.display = 'flex'
                arrayAlertSizeOci[number].style.display = 'none'
                alertRefresh(number)
            }
        
            function alertSizeImageNewOci(number) {
                arrayAlertSizeOci[number].style.display = 'flex'
                arrayAlertOci[number].style.display = 'none'
                alertRefresh(number)
            }
        
            arrayDropAreas.forEach(function(elemento) {
                Object.assign(elemento.style, {
                    width: "100%",
                    height: "160px",
                    border: "2px dashed #ccc",
                    margin: "0 auto 0 25px",
                    borderRadius: "10px",
                    textAlign: "center",
                    lineHeight: "40px",
                    cursor: "pointer",
                });
        
                elemento.addEventListener('dragover', (e) => {
                    e.preventDefault()
                    elemento.style.border = '2px dashed #77d'
                    elemento.style.backgroundColor = '#7777dd10'
                })
        
                elemento.addEventListener('dragleave', (e) => {
                    e.preventDefault()
                    elemento.style.border = '2px dashed #ccc'
                    elemento.style.backgroundColor = '#fff'
                })
        
                elemento.addEventListener('drop', (e) => {
                    e.preventDefault()
                    const file = e.dataTransfer.files[0],
                        number = parseInt(extractNumbers(elemento.id)-1)
                    
                    if (file && file.type.startsWith('image/')) {
                        elemento.style.border = '3px dashed #2d2'
                        elemento.style.backgroundColor = '#22dd2210'
                        
                        handleFileUploadNewOci(file, number)
        
                    } else {
                        alertNotImageNewOci(number)
                    }     
                })
        
                elemento.addEventListener('click', (e) => {
                    const number = parseInt(extractNumbers(elemento.id)-1)
                    arrayFileInputNewOci[number].click()
                })
            })
        
        
            arrayFileInputNewOci.forEach(function(elemento) {
                elemento.addEventListener('change', (e) => {
                    e.preventDefault()
                    const file = elemento.files[0],
                        number = parseInt(extractNumbers(elemento.id)-1)

                        if (file && file.type.startsWith('image/')) {
                            arrayDropAreas[number].style.border = '3px dashed #2d2'
                            arrayDropAreas[number].style.backgroundColor = '#22dd2210'
        
                            handleFileUploadNewOci(file, number)
        
                        } else {
                            alertNotImageNewOci(number)
                        }     
                })
            })
            
            function handleFileUploadNewOci(file, number) {
                const fileSize = file.size,
                    fileSizeInMb = fileSize / (1024 * 1024)
        
                if (fileSizeInMb < 3) {
                    let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
                    // Separar el nombre del archivo y la extensión
                    const dotIndex = file.name.lastIndexOf('.'),
                        name = file.name.substring(0, dotIndex),
                        extension = file.name.substring(dotIndex);
                    
                    arrayImageOciFileName[number].value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
                    arrayBtnRemoveOciImage[number].style.display = 'flex'
        
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => {
                        arrayDropAreas[number].innerHTML = 
                            `<img class="m-auto mt-3" src="${reader.result}" style="max-width: 75%; max-height: 75%;">`
                        arrayAlertOci[number].style.display = 'none'
                        arrayAlertSizeOci[number].style.display = 'none'
                    }
        
                } else {
                    alertSizeImageNewOci(number)
                }
            }
        
            arrayBtnRemoveOciImage.forEach(function(elemento) {
                elemento.addEventListener("click", (e) => {
                    e.preventDefault()
                    const number = parseInt(extractNumbers(elemento.id)-1)
                    arrayAlertOci[number].style.display = 'none'
                    arrayAlertSizeOci[number].style.display = 'none'
                    alertRefresh(number)
                    e.stopPropagation()
                })
                
            })
            
            //*************** ToolTip cantidad de OCI a agregar *************** */
            if (i == 1 || i < varLimMaxOciProyecto) {
                tippy(btnAddNewRow, {
                    content: `<strong>Límite máximo de OCI (${varLimMaxOciProyecto+1})</strong><br>
                                Puedes agregar ${varLimMaxOciProyecto-i} OCI's mas`,
                    allowHTML: true,
                    maxWidth: 350,
                    inlinePositioning: true,
                    arrow: true,
                    animation: 'shift-away',
                    theme: 'material',
                    interactive: false,
                    hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
                })

            } else if (i == varLimMaxOciProyecto) {
                tippy(btnAddNewRow, {
                    content: `<strong>Límite máximo de OCI (${varLimMaxOciProyecto+1})</strong><br>
                                Puedes agregar 1 OCI mas`,
                    allowHTML: true,
                    maxWidth: 350,
                    inlinePositioning: true,
                    arrow: true,
                    animation: 'shift-away',
                    theme: 'material',
                    interactive: false,
                    hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
                })
            }
            //*************************************** */
        })
    }

    //-------------------------- Remove OCI Row ----------------------------------
    function removeRow(e) {

        const parentDiv = document.getElementById('div_body')
        let i = parentDiv.childElementCount

        if (extractNumbers(e) && i > 1) {
            let btnRemoveRow = e
            const numberId1 = parseInt(btnRemoveRow.slice(-1)),
                numberId2 = parseInt(btnRemoveRow.slice(-2))
            let numberIdToDelete

            numberId1 >= 0 && numberId2 ? numberIdToDelete = numberId2 : numberIdToDelete = numberId1;

            function checkString(string) {
                return /^[0-9]*$/.test(string);
            }

            if (checkString(numberIdToDelete)) {
                const rowToDelete = document.getElementById(`ociItemRow${numberIdToDelete}`)
                if (rowToDelete) {
                    rowToDelete.remove()
                }
                const ociQty = document.getElementById("ociQuantity")
                ociQty.setAttribute('value', (i - 1))

                if (numberIdToDelete === 1) {
                    btnAddNewRow.removeAttribute('disabled')

                } else if (numberIdToDelete !== 1 && numberIdToDelete < varLimMaxOciProyecto) {
                    btnRemoveItem = document.getElementById(`btnRemoveRow${numberIdToDelete - 1}`)
                    btnRemoveItem.style.display = 'inline'

                } else {
                    btnRemoveItem = document.getElementById(`btnRemoveRow${numberIdToDelete - 1}`)
                    btnRemoveItem.style.display = 'inline'
                    btnAddNewRow.removeAttribute('disabled')
                }
            }
        }
        //********************** */
        if (i > 1 && i <= varLimMaxOciProyecto) {
            tippy(btnAddNewRow, {
                content: `<strong>Límite máximo de OCI (${varLimMaxOciProyecto+1})</strong><br>
                            Puedes agregar ${((varLimMaxOciProyecto)-i)+1} OCI's mas`,
                allowHTML: true,
                maxWidth: 350,
                inlinePositioning: true,
                arrow: true,
                animation: 'shift-away',
                theme: 'material',
                interactive: false,
                hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
            })
            
        } else if (i == 1) {
            tippy(btnAddNewRow, {
                content: `<strong>Límite máximo de OCI (${varLimMaxOciProyecto+1})</strong><br>
                            Puedes agregar ${(varLimMaxOciProyecto+1)-i} OCI's mas`,
                allowHTML: true,
                maxWidth: 350,
                inlinePositioning: true,
                arrow: true,
                animation: 'shift-away', //'scale',
                theme: 'material',
                interactive: false,
                hideOnClick: true, // Oculta el tooltip al hacer clic en cualquier lugar fuera de él
            })
        }
        //********************** */
    }

    // ------------------ New Project Image behavior ---------------
    const dropAreaProject = document.getElementById('drop-areaProject'),
        fileInputProject = document.getElementById('fileInputProject'),
        fileImputTextProject = document.getElementById('fileInputTextProject'),
        removeImageButtonProject = document.getElementById('removeImageProject'),
        alertProject = document.getElementById('alertProject'),
        alertProjectSize = document.getElementById('alertProjectSize')

    if (dropAreaProject) {
    
        Object.assign(dropAreaProject.style, {
            width: "50%",
            height: "200px",
            border: "2px dashed #ccc",
            margin: "0 auto 0 50px",
            borderRadius: "10px",
            textAlign: "center",
            lineHeight: "50px",
            cursor: "pointer",
            textWrap: "wrap"
        });

        dropAreaProject.addEventListener('dragover', (e) => {
            e.preventDefault()
            dropAreaProject.style.border = '2px dashed #77d'
            dropAreaProject.style.backgroundColor = '#7777dd10'
        })
    
        dropAreaProject.addEventListener('dragleave', (e) => {
            e.preventDefault()
            dropAreaProject.style.border = '2px dashed #ccc'
            dropAreaProject.style.backgroundColor = '#FFFFFF'
        })
    
        function alertRefreshImageProject() {
            removeImageButtonProject.style.display = 'none'
            fileInputProject.value = ''
            fileImputTextProject.value = ''
            Object.assign(dropAreaProject.style, {
                border: "2px dashed #ccc",
                textAlign: "center",
                backgroundColor: '#FFFFFF',
                display: 'block',
                fontSize: '.75em'
            });
            dropAreaProject.innerHTML = 'Seleccione una imagen para el Proyecto <br>Haz click o arrastra y suelta una imagen aquí'
        }

        function alertNotImageProject() {
            alertProject.style.display = 'flex'
            alertProjectSize.style.display = 'none'
            alertRefreshImageProject()
        }

        function alertWrongImageProject() {
            alertProjectSize.style.display = 'flex'
            alertProject.style.display = 'none'
            alertRefreshImageProject()
        }

        dropAreaProject.addEventListener('drop', (e) => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]

            if (file && file.type.startsWith('image/')) {
                dropAreaProject.style.border = '3px dashed #2d2'
                dropAreaProject.style.backgroundColor = '#22dd2210'
                handleFileUploadProject(file)

            } else {
                alertNotImageProject()
            }
        })

        dropAreaProject.addEventListener('click', () => {
            fileInputProject.click()
        })

        fileInputProject.addEventListener('change', (e) => {
            e.preventDefault()
            const file = fileInputProject.files[0]
                    
            if (file && file.type.startsWith('image/')) {
                dropAreaProject.style.border = '3px dashed #2d2'
                dropAreaProject.style.backgroundColor = '#22dd2210'

                handleFileUploadProject(file)

            } else {
                alertNotImageProject()
            }     
        })

        function handleFileUploadProject(file) {
            const fileSize = file.size
            const fileSizeInMb = fileSize / (1024 * 1024)

            if (fileSizeInMb < 3) {
                let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
                // Separar el nombre del archivo y la extensión
                const dotIndex = file.name.lastIndexOf('.'),
                    name = file.name.substring(0, dotIndex),
                    extension = file.name.substring(dotIndex);
                fileImputTextProject.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
                removeImageButtonProject.style.display = 'flex'

                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    dropAreaProject.innerHTML = 
                        `<img class="m-auto mt-3" src="${reader.result}" style="max-width: 75%; max-height: 75%;">`
                    alertProject.style.display = 'none'
                    alertProjectSize.style.display = 'none'
                }

            } else {
                alertWrongImageProject()
            }
        }

        removeImageButtonProject.addEventListener('click', (e)=> {
            e.preventDefault()
            alertProject.style.display = 'none'
            alertProjectSize.style.display = 'none'
            alertRefreshImageProject()
            e.stopPropagation()
        })
    }

    // -------------------- Oci Image behavior ---------------
    const dropAreaOci = document.getElementById('drop-area-oci'),
        fileInputNewOci = document.getElementById('fileInputNewOci'),
        fileInputNewOciText = document.getElementById('fileInputNewOciText'),
        btnRemoveOciImage = document.getElementById('btnRemoveOciImage0'),
        alertOci = document.getElementById('alertOci'),
        alertOciSize = document.getElementById(`alertOciSize`)

    if (dropAreaOci) {
        Object.assign(dropAreaOci.style, {
            width: "100%",
            height: "160px",
            border: "2px dashed #ccc",
            margin: "0 auto 0 25px",
            borderRadius: "10px",
            textAlign: "center",
            lineHeight: "40px",
            cursor: "pointer"
        });

        dropAreaOci.addEventListener('dragover', (e) => {
            e.preventDefault()
            dropAreaOci.style.border = '2px dashed #77d'
            dropAreaOci.style.backgroundColor = '#7777dd10'
        })
    
        dropAreaOci.addEventListener('dragleave', (e) => {
            e.preventDefault()
            dropAreaOci.style.border = '2px dashed #ccc'
            dropAreaOci.style.backgroundColor = '#fff'
        })

        function alertRefreshOciImage() {
            fileInputNewOci.value = ''
            fileInputNewOciText.value = ''
            btnRemoveOciImage.style.display = 'none'

            Object.assign(dropAreaOci.style, {
                border: "2px dashed #ccc",
                textAlign: "center",
                backgroundColor: '#fff',
                display: 'block',
                fontSize: '.75em',
                overflowWrap: 'break-word',
            });
            dropAreaOci.innerHTML = 'Seleccione una imagen para la OCI <br>Haz click o arrastra y suelta una imagen aquí'
        }

        function alertNotImageNewOciAlone() {
            alertOci.style.display = 'flex'
            alertOciSize.style.display = 'none'
            alertRefreshOciImage()
        }

        function alertWrongSizeImageNewOciAlone() {
            alertOciSize.style.display = 'flex'
            alertOci.style.display = 'none'
            alertRefreshOciImage()
        }

        dropAreaOci.addEventListener('drop', (e) => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]

            if (file && file.type.startsWith('image/')) {
                dropAreaOci.style.border = '3px dashed #2d2'
                dropAreaOci.style.backgroundColor = '#22dd2210'
                handleFileUploadNewOci(file)

            } else {
                alertNotImageNewOciAlone()
            }     
        })

        dropAreaOci.addEventListener('click', () => {
            fileInputNewOci.click()
        })

        fileInputNewOci.addEventListener('change', (e) => {
            e.preventDefault()
            const file = fileInputNewOci.files[0]
                    
            if (file && file.type.startsWith('image/')) {
                dropAreaOci.style.border = '3px dashed #2d2'
                dropAreaOci.style.backgroundColor = '#22dd2210'
                handleFileUploadNewOci(file)

            } else {
                alertNotImageNewOciAlone()
            }     
        })

        function handleFileUploadNewOci(file) {
            const fileSize = file.size,
                fileSizeInMb = fileSize / (1024 * 1024)

            if (fileSizeInMb < 3) {
                // fileInputNewOci.files = e.dataTransfer.files
                let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
                // Separar el nombre del archivo y la extensión
                const dotIndex = file.name.lastIndexOf('.'),
                    name = file.name.substring(0, dotIndex),
                    extension = file.name.substring(dotIndex);
                fileInputNewOciText.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
                btnRemoveOciImage.style.display = 'flex'
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    dropAreaOci.innerHTML = 
                        `<img class="m-auto mt-3" src="${reader.result}" style="max-width: 75%; max-height: 75%;">`
                    alertOci.style.display = 'none'
                    alertOciSize.style.display = 'none'
                }

            } else {
                alertWrongSizeImageNewOciAlone()
            }
        }

        if (btnRemoveOciImage) {
            btnRemoveOciImage.addEventListener('click', (e)=> {
                e.preventDefault()
                alertOci.style.display = 'none'
                alertOciSize.style.display = 'none'
                alertRefreshOciImage()
                e.stopPropagation()
            })
        }
    }
    //------------------------------------------------------------------------------
}

const btnCreateNewProjectOutSide = document.getElementById('btnNewProject'),
    btnCreateNewProject = document.getElementById('btnAddProjectToClient0')

if (btnCreateNewProject) {
    btnCreateNewProject.addEventListener('click', (event) => {
        event.preventDefault()
        const imgCliente = document.getElementById('imgCliente').src,
            idCliente = document.getElementById('idCliente').value,
            nameCliente = document.getElementById(`name_${idCliente}`).innerText
        
        messageNewProject( imgCliente, idCliente, nameCliente )
    })
}

if (btnCreateNewProjectOutSide) {
    btnCreateNewProjectOutSide.addEventListener('click', (event) => {
        event.preventDefault()
        const imgCliente = document.getElementById('imgCliente').src,
            idCliente = document.getElementById('idCliente').value,
            nameCliente = document.getElementById(`name_${idCliente}`).innerText
        
        messageNewProject( imgCliente, idCliente, nameCliente )
    })
}


//---- Change Project Status ----------------
function messageChangeProjectStatus(projectName, statusProject, k) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
    if(projectName) {
        Swal.fire({
            title: 'Cambio status del Proyecto!',
            position: 'center',
            html: `El status del proyecto <b>${projectName}</b> se modificará a
                    <span class="badge rounded-pill bg-${ statusProject=='true' ? 'danger' : 'primary' } text-white">
                    ${ statusProject=='true' ? 'Inactivo' : 'Activo' }
                    </span> y ${ statusProject=='true' ? 'no' : '' } podrá ingresar o modificar datos en este proyecto!`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Continuar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formChangeStatusProject${k}_0`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El status del proyecto <b>${projectName}</b>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    'Status de proyecto no modificado!',
                    `El status del proyecto <b>${projectName}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El status del proyecto no se modificó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

const projectQuantity = parseInt(document.getElementById('projectQuantity').innerText) + parseInt(document.getElementById('projectQuantityLineas').innerText)
// console.log('projectQuantity: ', projectQuantity)
let arrayBtnChangeStatusProject = [], j=0
for (let k=0; k<projectQuantity; k++) {
    let btnChangeStatusProject = document.getElementById(`btnChangeStatusProyect${k}_${j}`)
    btnChangeStatusProject ? arrayBtnChangeStatusProject.push(btnChangeStatusProject) : null

    arrayBtnChangeStatusProject.length !=0 ?
        arrayBtnChangeStatusProject[k].addEventListener('click', (event) => {
            event.preventDefault()
            const projectName = document.getElementById(`projectNameHidden${k}_${j}`).value
            const statusProject = document.getElementById(`statusProjectHidden${k}_${j}`).value
            messageChangeProjectStatus(projectName, statusProject, k)
        })
    : null
}

//---- Change Project Level ----------------
function messageChangeProjectLevel(projectName, levelProject, k, idProject) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        width: 550,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    if(projectName) {
        let html
        if(levelProject=='ganado') {
            html = `<form id="formChangeLevelProject${k}_0" action="/api/proyectos/updateLevelProject/${idProject}" method="post">
                            <fieldset>
                                El nivel del proyecto <b>${projectName}</b> se modificará a
                                <div class="container mt-2 mx-auto">
                                    <div class="row justify-content-center">
                                        <select id="levelProjectSelection" name="levelProject" class="form-select w-25 my-2 px-auto" required>
                                            <option selected disabled value="ganado">Ganado</option>
                                            <option value="paraCotizar">Para Cotizar</option>
                                            <option value="aRiesgo">A riesgo</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </form>`

        } else if (levelProject=='paraCotizar') {
                html = `<form id="formChangeLevelProject${k}_0" action="/api/proyectos/updateLevelProject/${idProject}" method="post">
                            <fieldset>
                                El nivel del proyecto <b>${projectName}</b> se modificará a
                                <div class="container mt-2 mx-auto">
                                    <div class="row justify-content-center">
                                        <select id="levelProjectSelection" name="levelProject" class="form-select w-25 my-2 px-auto" required>
                                            <option selected disabled value="paraCotizar">Para Cotizar</option>
                                            <option value="ganado">Ganado</option>
                                            <option value="aRiesgo">A riesgo</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </form>`

        } else {
                html = `<form id="formChangeLevelProject${k}_0" action="/api/proyectos/updateLevelProject/${idProject}" method="post">
                            <fieldset>
                                El nivel del proyecto <b>${projectName}</b> se modificará a
                                <div class="container mt-2 mx-auto">
                                    <div class="row justify-content-center">
                                        <select id="levelProjectSelection" name="levelProject" class="form-select w-25 my-2 px-auto" required>
                                            <option selected disabled value="aRiesgo">A riesgo</option>
                                            <option value="ganado">Ganado</option>
                                            <option value="paraCotizar">Para Cotizar</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </form>`
        }

        
        Swal.fire({
            title: 'Cambio nivel del Proyecto!',
            position: 'center',
            width: 600,
            html: html,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Continuar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }

        }).then((result) => {
            if (result.isConfirmed) {
                let levelProjectBadge, levelProjectColor, levelProjectMessage
                const levelProjectSelected = document.getElementById('levelProjectSelection').value                
                if(levelProjectSelected =='ganado') {
                    levelProjectBadge = 'Ganado'
                    levelProjectColor = 'success text-white'
                    levelProjectMessage = 'podrá ingresar o modificar todos los datos de este proyecto!'
                } else if (levelProjectSelected =='paraCotizar') {
                    levelProjectBadge = 'Para Cotizar'
                    levelProjectColor = 'secondary text-warning'
                    levelProjectMessage = 'solo podrá ingresar o modificar datos de S0 y proceso 3D en este proyecto!'
                } else {
                    levelProjectBadge = 'A Riesgo'
                    levelProjectColor = 'danger text-white'
                    levelProjectMessage = 'solo podrá ingresar o modificar datos hasta S3 en este proyecto!'
                }

                document.getElementById(`formChangeLevelProject${k}_0`).submit()
                
                Toast.fire({
                    icon: 'success',
                    title: `El nivel del proyecto <b>${projectName}</b>,
                        se modificó a <span class="badge rounded-pill bg-${levelProjectColor}">${levelProjectBadge}</span> con éxito!
                        Y ${levelProjectMessage}                    `
                })

            } else {
                Swal.fire(
                    'Nivel de proyecto no modificado!',
                    `El nivel del proyecto <b>${projectName}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
        disabledBtnAceptar()
    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El nivel del proyecto no se modificó!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

let arrayBtnChangeLevelProject = [], x=0
for (let k=0; k<projectQuantity; k++) {
    let btnChangeLevelProject = document.getElementById(`btnChangeLevelProyect${k}_${x}`)
    btnChangeLevelProject ? arrayBtnChangeLevelProject.push(btnChangeLevelProject) : null
    
    arrayBtnChangeLevelProject.length !=0 ?
        arrayBtnChangeLevelProject[k].addEventListener('click', (event) => {
            event.preventDefault()
            const projectName = document.getElementById(`projectNameHidden${k}_${x}`).value,
                levelProject = document.getElementById(`levelProjectHidden${k}_${x}`).value,
                idProject = document.getElementById(`projectIdHidden${k}_${x}`).value
            messageChangeProjectLevel(projectName, levelProject, k, idProject)
        })
    : null
}

//------- Change OCI status ----------------
function messageChangeOciStatus(statusOci, ociNumber, elementoId) {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
        Swal.fire({
            title: `Cambio status de OCI# ${ociNumber}`,
            position: 'center',
            html: `El status de la OCI# <b>${ociNumber}</b> se modificará a
                    <span class="badge rounded-pill bg-${ statusOci=='true' ? 'danger' : 'primary' } text-white">
                    ${ statusOci=='true' ? 'Inactiva' : 'Activa' }
                    </span> y ${ statusOci=='true' ? 'no' : '' } podrá ingresar o modificar datos en esta OCI !`,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Continuar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formChangeStatusOci${elementoId}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El status de la OCI# <b>${ociNumber}</b>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    'Status de OCI no modificado!',
                    `El status de la OCI# <b>${ociNumber}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })

}

//---- Update OCI Data ----------------
function messageUpdateOci(
    projectId,
    statusOci,
    imageOci,
    ociDescription,
    ociNumber,
    ociAlias,
    ociPrio,
    k
) {
    
    let descriptionOci = ociDescription.slice(13),
        aliasOci = ociAlias.slice(7),
        prioOci = ociPrio.slice(6),
        numberOci = parseInt(ociNumber),
        checked = 'checked'
    statusOci=='true' ? checked : checked = ''

    let bgColorStatus
    statusOci=='true' ? bgColorStatus='background-color: #55dd5560;'
                        : 
                        bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let html = `<form id="formUpdateOci${k}" enctype="multipart/form-data" action="/api/proyectos/updateOci/${projectId}" method="post">
                    <fieldset>
                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-3">
                                <label for="numberOciModal" class="form-label d-flex justify-content-start ms-1">Número OCI</label>
                                <input type="number" name="numberOci" id="numberOciModal" class="form-control" placeholder="Número OCI" value="${numberOci}" min="0" max="9999" disabled required>
                            </div>
                            <div class="col-5 my-auto">
                                <input class="form-check-input" type="checkbox" name="confirmationNumberOci" id="confirmationNumberOci" value="true">
                                <label class="form-check-label" for="confirmationNumberOci">Confirmar Cambio N° OCI</label>
                            </div>
                            <div class="col-4" style="${bgColorStatus}">
                                <label for="statusOci" class="form-label d-flex justify-content-start ms-1">Status OCI</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactiva</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOciForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOciForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusOci">Activa</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row mb-3 mx-1 px-1">
                            <div class="col-6">
                                <label for="descriptionOci" class="form-label d-flex justify-content-start ms-1">Descripción OCI</label>
                                <input type="text" name="descriptionOci" class="form-control"
                                    placeholder="Descripción OCI" value="${descriptionOci}" required>
                            </div>

                            <div class="col-2">
                                <label for="prioOci" class="form-label d-flex justify-content-start ms-1">Prio OCI</label>
                                <input type="number" name="prioOci" class="form-control"
                                    placeholder="Prio OCI" value="${prioOci}" min="0" max="999" required>
                            </div> 

                            <div class="col-4">
                                <label for="aliasOci" class="form-label d-flex justify-content-start ms-1">Alias OCI</label>
                                <input type="text" name="aliasOci" class="form-control"
                                    placeholder="Alias OCI" value="${aliasOci}" required>
                            </div>                                
                        </div> 

                        <div class="row justify-content-start align-items-center mb-1 mx-1 px-1">
                            <div class="col mb-1">
                                <input type="text" id="fileInputTextUpdate" name="imageOciFileName"
                                    value="${imageOci}" style="display: none;" required>
                                <input type="file" id="fileInputUpdate" name="imageOci"
                                    value="" accept="image/*" style="display: none;" required>
                            
                                <div id="drop-areaUpdate" class="mb-2 mx-auto" style="font-size: 1em; overflow-wrap:break-word;">
                                    <label for="imageOci" class="form-label d-flex justify-content-center">
                                        Seleccione una imagen para la OCI
                                    </label>
                                    <p>Haz click o arrastra y suelta una imagen aquí</p>
                                </div>

                                <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                                        id="removeImageUpdate" style="display: none;">
                                        <i class="fa-solid fa-xmark"></i>
                                </button>
                                
                                <div id="alertUpdate" class="alert alert-warning align-items-center" role="alert"
                                    style="display: none; font-size: 0.65rem; height: 1rem;"">
                                    <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                                </div>
                                <div id="alertOciSizeFileUpdate" class="alert alert-warning align-items-center mx-auto" role="alert"
                                    style="display: none; font-size: 0.65rem; height: 1rem;">
                                    <strong class="me-2">Atención!</strong> El tamaño de la imagen debe ser menor a 3Mb.
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="numberOciHidden" id="ociNumberHidden${k}" value="${numberOci}">
                        <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${k}" value="${k}">
                    </fieldset>
                </form>`

                
    if(projectId && numberOci) {
        Swal.fire({
            title: `Actualizar OCI# ${numberOci} - Alias: ${aliasOci}`,
            position: 'center',
            html: html,
            width: 800,
            imageUrl: `${imageOci}`,
            imageWidth: `25%`,
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateOci${k}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OCI# <b>${numberOci}</b>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    'OCI no modificada!',
                    `La OCI# <b>${numberOci}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
        disabledBtnAceptar()

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `La OCI# ${numberOci} no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    let inputsDeTexto = document.querySelectorAll('input[type="text"]')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /["$%&?¡¿^/()=!'~`\\*{}\[\]<>@]/;

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

    const dropAreaUpdate = document.getElementById('drop-areaUpdate'),
        fileInputUpdate = document.getElementById('fileInputUpdate'),
        fileImputTextUpdate = document.getElementById('fileInputTextUpdate'),
        removeImageButtonUpdate = document.getElementById('removeImageUpdate'),
        alertUpdate = document.getElementById('alertUpdate'),
        alertOciSizeFileUpdate = document.getElementById('alertOciSizeFileUpdate')

    Object.assign(dropAreaUpdate.style, {
        width : "50%",
        height : "200px",
        border : "2px dashed #ccc",
        margin : "0 auto 0 50px",
        borderRadius : "10px",
        textAlign : "center",
        lineHeight : "40px",
        cursor : "pointer",
    });

    dropAreaUpdate.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropAreaUpdate.style.border = '2px dashed #77a'
        dropAreaUpdate.style.backgroundColor = '#7777aa10'
    })

    dropAreaUpdate.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropAreaUpdate.style.border = '2px dashed #ccc'
        dropAreaUpdate.style.backgroundColor = '#fff'
    })

    function alertOciRefresh() {
        fileInputUpdate.value = ''
        fileImputTextUpdate.value = ''
        removeImageButtonUpdate.style.display = 'none'

        Object.assign(dropAreaUpdate.style, {
            border : "2px dashed #ccc",
            textAlign : "center",
            backgroundColor : '#fff',
            display : 'block',
            fontSize : '.85em',
            overflowWrap : 'break-word',
        });

        dropAreaUpdate.innerHTML = 'Seleccione una imagen para la OCI <br>Haz click o arrastra y suelta una imagen aquí'
    }

    function alertNotImageUpdate() {
        alertUpdate.style.display = 'flex'
        alertOciSizeFileUpdate.style.display = 'none'
        alertOciRefresh()
    }

    function alertSizeImageNewOciUpdate() {
        alertOciSizeFileUpdate.style.display = 'flex'
        alertUpdate.style.display = 'none'
        alertOciRefresh()
    }
    
    dropAreaUpdate.addEventListener('drop', (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        
        if (file && file.type.startsWith('image/')) {
            dropAreaUpdate.style.border = '3px dashed #2a2'
            dropAreaUpdate.style.backgroundColor = '#22aa2210'
            handleFileUploadUpdate(file)

        } else {
            alertNotImageUpdate()
        }     
    })

    dropAreaUpdate.addEventListener('click', () => {
        fileInputUpdate.click()
    })

    fileInputUpdate.addEventListener('change', (e) => {
        e.preventDefault()
        const file = fileInputUpdate.files[0]
                
        if (file && file.type.startsWith('image/')) {
            dropAreaUpdate.style.border = '3px dashed #2a2'
            dropAreaUpdate.style.backgroundColor = '#22aa2210'
            handleFileUploadUpdate(file)

        } else {
            alertNotImageUpdate()
        }     
    })

    function handleFileUploadUpdate(file) {
        const fileSize = file.size,
            fileSizeInMb = fileSize / (1024 * 1024)

        if (fileSizeInMb < 3) {
            let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
            // Separar el nombre del archivo y la extensión
            const dotIndex = file.name.lastIndexOf('.');
            const name = file.name.substring(0, dotIndex);
            const extension = file.name.substring(dotIndex);
            fileImputTextUpdate.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
            removeImageButtonUpdate.style.display = 'flex'

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropAreaUpdate.innerHTML = 
                    `<img class="m-auto mt-3" src="${reader.result}" style="max-width: 75%; max-height: 75%;">`
                dropAreaUpdate.style.display = 'block'
                alertUpdate.style.display = 'none'
                alertOciSizeFileUpdate.style.display = 'none'
            }

        } else {
            alertSizeImageNewOciUpdate()
        }
    }

    removeImageButtonUpdate.addEventListener('click', (e)=> {
        e.preventDefault()
        alertUpdate.style.display = 'none'
        alertOciSizeFileUpdate.style.display = 'none'
        alertOciRefresh()
        e.stopPropagation()
    })
}

//-------------- Delete Oci ----------------
function messageDeleteOci(
    projectId,
    ociNumber,
    ociKNumber,
    ociDescription,
    ociAlias,
    ociPrio,
    imageOci
    ) {
        
    const descriptionOci = ociDescription.slice(13),
        aliasOci = ociAlias.slice(7),
        prioOci = ociPrio.slice(6)
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `
        <div class="container m-auto">
            La OCI#<strong>${ociNumber}</strong> - Alias: ${aliasOci} - Prio: <b>${prioOci}</b><br>
            Descripcion: "${descriptionOci}" y toda su información interna, <br>
            <b>se eliminará completamente</b>.
            
            <div id="alertDelete" class="alert alert-danger d-flex align-items-center justify-content-center mx-4 mt-3" role="alert">
                <i class="fa-solid fa-triangle-exclamation me-2"></i>
                <div>
                    <strong class="me-2">Atención!</strong> Esta acción no se puede deshacer!
                </div>
            </div>

            <div id="imagePreview" class="p-1 my-1 mx-auto w-50">
                <img class="m-auto mt-3" src="${imageOci}" style="max-width: 75%; max-height: 75%;">
            </div>
            
            Está seguro que desea continuar?
            <form id="formDeleteOci${projectId}" action="/api/proyectos/deleteOci/${projectId}" method="post">
                <fieldset>
                    <input type="hidden" name="ociKNumberHidden" value="${ociKNumber}">
                </fieldset>
            </form>
        </div>    
                    `
    
    if(projectId && ociNumber) {
        Swal.fire({
            title: `Eliminar OCI# ${ociNumber} - ${ociAlias} ?`,
            position: 'center',
            html: htmlForm,
            icon: 'question',
            width: 650,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            focusConfirm: false,
            confirmButtonText: 'Eliminar <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formDeleteOci${projectId}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `La OCI#<strong>${ociNumber}</strong>, se eliminó correctamente!`
                })
            } else {
                Swal.fire(
                    `OCI# ${ociNumber}`,
                    `La OCI#<b>${ociNumber}</b>, no se eliminó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `La OCI#<strong>${ociNumber}</strong>, no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

let maxOciQuantity
document.getElementById('totalOciQtyHidden')
    ? maxOciQuantity = parseInt(document.getElementById('totalOciQtyHidden').value + 1)
    : maxOciQuantity = 1

let arrayBtnChangeStatusOci = [], arrayBtnUpdateOci = [], arrayBtnDeleteOci = []
for (let m=0; m<maxOciQuantity; m++) {
    for (let n=0; n<maxOciQuantity; n++) {
        let btnChangeStatusOci = document.getElementById(`${m}_${n}`)
        btnChangeStatusOci ? arrayBtnChangeStatusOci.push(btnChangeStatusOci) : null

        let btnUpdateOci = document.getElementById(`btnUpdateOci${m}_${n}`)
        btnUpdateOci ? arrayBtnUpdateOci.push(btnUpdateOci) : null

        let btnDeleteOci = document.getElementById(`btnDeleteOci${m}_${n}`)
        btnDeleteOci ? arrayBtnDeleteOci.push(btnDeleteOci) : null
    }
}

arrayBtnChangeStatusOci.forEach(function(elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault()
        const statusOci = document.getElementById(`statusOciHidden${elemento.id}`).value,
            ociNumber = document.getElementById(`ociNumberHidden${elemento.id}`).value
        
        messageChangeOciStatus(
            statusOci, 
            ociNumber,
            elemento.id
        )
    })
})

arrayBtnUpdateOci.forEach(function(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const idElement = element.id.slice(12)
        const projectId = document.getElementById(`projectIdHidden${idElement}`).value,
            statusOci = document.getElementById(`statusOciHidden${idElement}`).value,
            imageOci = document.getElementById(`imageOci${idElement}`).src,
            ociDescription = document.getElementById(`ociDescription${idElement}`).innerText,
            ociAlias = document.getElementById(`ociAlias${idElement}`).innerText,
            ociPrio = document.getElementById(`ociPrio${idElement}`).innerText,
            ociNumber = document.getElementById(`ociNumberHidden${idElement}`).value,
            ociKNumber = document.getElementById(`ociKNumberHidden${idElement}`).value

        messageUpdateOci(
            projectId,
            statusOci,
            imageOci,
            ociDescription,
            ociNumber,
            ociAlias,
            ociPrio,
            ociKNumber
        )
    })
})

arrayBtnDeleteOci.forEach(function(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const idElement = element.id.slice(12)
        const projectId = document.getElementById(`projectIdHidden${idElement}`).value,
            ociNumber = document.getElementById(`ociNumberHidden${idElement}`).value,
            ociKNumber = document.getElementById(`ociKNumberHidden${idElement}`).value,
            ociDescription = document.getElementById(`ociDescription${idElement}`).innerText,
            ociAlias = document.getElementById(`ociAlias${idElement}`).innerText,
            ociPrio = document.getElementById(`ociPrio${idElement}`).innerText,
            imageOci = document.getElementById(`imageOci${idElement}`).src
        
        messageDeleteOci(
            projectId,
            ociNumber,
            ociKNumber,
            ociDescription,
            ociAlias,
            ociPrio,
            imageOci
        )
    })
})
    

// --------------- Adding New OCI to an existing Project ------------------------
function addNewOciToProject(projectName, lastOciNumber, lastOciPrio,projectIdHidden) {
        let arrayBloque = []
        arrayBloque.push(`
            <div id="ociItemRow0" class="row m-1">
                <div class="row text-start">
                    <strong>#1</strong>
                </div>
                <div class="col-1 my-1 align-self-middle">
                    <input type="number" name="ociNumber0" id="ociNumber0" class="form-control" min="0" max="9999"
                    placeholder="Número OCI" value="${lastOciNumber+1}" required>
                </div>
                <div class="col-1 my-1 align-self-middle">
                    <input type="number" name="ociPrio0" id="ociPrio0" class="form-control" min="0" max="999"
                    placeholder="Prio OCI" value="${lastOciPrio+1}" required>
                </div>
                <div class="col-3 my-1 align-self-middle">
                    <textarea name="ociDescription0" id="ociDescription0" class="form-control" rows="3" maxlength="100" placeholder="Descripcion OCI" required></textarea>
                </div>
                <div class="col-2 my-1 align-self-middle">
                    <input type="text" name="ociAlias0" id="ociAlias0" class="form-control"
                        maxlength="50" placeholder="Alias OCI">
                </div>
                <div class="col-1 mt-3 align-self-middle">
                    <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input" type="checkbox" name="ociStatus0" id="ociStatus0"
                            aria-checked="true" style="cursor: pointer;" checked>
                        <label class="form-check-label" for="ociStatus">Activa</label>
                    </div>
                </div>    
                <div class="col align-self-middle">
                    <input type="text" id="fileInputNewOciTextModal0" name="imageOciFileNameModal0" style="display: none;">
                    <input type="file" id="fileInputNewOciModal0" name="imageNewOciModal0" value=""
                        accept="image/*" style="display: none;" required>
                    <div id="drop-area-ociModal0" class="mb-1 mx-auto">
                        <label for="fileInputNewOciModal0" class="form-label d-flex justify-content-center">
                            Seleccione una imagen para la OCI
                        </label>
                        <p>Haz click o arrastra y suelta una imagen aquí</p>
                    </div>

                    <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                        id="btnRemoveOciImageModal0" name="btnRemoveOciImageModal0" style="display: none;">
                            <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div id="alertOciModal0" class="alert alert-warning align-items-center" role="alert"
                        style="display: none; font-size: 0.65rem; height: 1rem;">
                        <strong class="me-1">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                    </div>
                    <div id="alertSizeOciModal0" class="alert alert-warning align-items-center mx-auto" role="alert"
                        style="display: none; font-size: 0.65rem; height: 1rem;">
                        <strong class="me-2">Atención!</strong> El tamaño de la imagen debe ser menor a 3Mb.
                    </div>
                </div>
            
                <div class="col-1 my-1 align-self-middle">
                </div>
            </div>
        `)
    
    const html = `
            <form id="formNewOciValues" enctype="multipart/form-data" action="/api/proyectos/addNewOciToProject/${projectIdHidden}" method="post" style="font-size: 10pt">
                <fieldset id="ociNewItemRow">
                    <div class="row my-auto mx-1">
                        <div class="col-1 my-auto align-self-middle">
                            <label for="ociNumber"><strong>OCI#</strong></label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <label for="ociPrio"><strong>Prio OCI</strong></label>
                        </div>
                        <div class="col-3 my-auto align-self-middle">
                            <label for="ociDescription"><strong>Descripcion OCI</strong></label>
                        </div>
                        <div class="col-2 my-auto align-self-middle">
                            <label for="ociAlias"><strong>Alias OCI</strong></label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <label for="ociStatus"><strong>OCI Status</strong></label>
                        </div>
                        <div class="col my-auto align-self-middle">
                            <label for="ociImage"><strong>Imagen OCI</strong></label>
                            <label for="newOciImage">(Seleccione una imagen para cada OCI)</label>
                        </div>
                        <div class="col-1 my-auto align-self-middle">
                            <button type="button" id="btnAddNewOciRow0" title="Agregar nueva línea de OCI"
                                class="btn btn-primary rounded-circle mx-1 my-auto border border-dark border-1 shadow">
                                    <i class="fa-solid fa-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <hr>
                        ${arrayBloque}
                    <input type="hidden" id="ociQuantityModal" name="ociQuantityModal" value="${arrayBloque.length}">
                </fieldset>
            </form>`


    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })
    
    Swal.fire({
        title: `Agregar Nueva OCI al proyecto: ${projectName}`,
        html: html,
        width: 1375,
        background: "#efefef",
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Guardar <i class="fa-solid fa-save"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
        didOpen: ()=> {
            let btnAceptar = document.getElementsByClassName('swal2-confirm');
            btnAceptar[0].setAttribute('id','btnAceptarModal')
            btnAceptar[0].style = "cursor: not-allowed;"
            btnAceptar[0].disabled = true
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const formNewOci = document.getElementById('formNewOciValues')
            formNewOci.submit()
            let ociQuantityModal = document.getElementById('ociQuantityModal').value
            
            if (ociQuantityModal===1) {
                Toast.fire({
                    icon: 'success',
                    title: `OCI agregada con éxito!`
                })

            } else {
                Toast.fire({
                    icon: 'success',
                    title: `OCI's agregadas con éxito!`
                })
            }

        } else {
            Swal.fire(
                'Nueva OCI no agregada!',
                `La información no fue agregada al proyecto!`,
                'warning'
            )
            return false
        }
    })
    disabledBtnAceptar()
    let inputsDeTexto = document.querySelectorAll('input[type="text"]')

    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /["$%&?¡¿^/=!'~`´Ø\\*{}\[\]<>@]/;

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

    //----------------------------
    let dropAreasOciFileModal0 = document.getElementById(`drop-area-ociModal0`),
        btnRemoveOciImageFileModal0 = document.getElementById(`btnRemoveOciImageModal0`),
        alertOciFileModal0 = document.getElementById(`alertOciModal0`),
        fileInputNewOciTextFileModal0 = document.getElementById(`fileInputNewOciTextModal0`),
        fileInputNewOciFileModal0 = document.getElementById(`fileInputNewOciModal0`),
        alertSizeOciModal0 = document.getElementById('alertSizeOciModal0')

        Object.assign(dropAreasOciFileModal0.style, {
            width : "100%",
            height : "160px",
            border : "2px dashed #ccc",
            margin : "0 auto 0 25px",
            borderRadius : "10px",
            textAlign : "center",
            lineHeight : "40px",
            cursor : "pointer",
        });

    dropAreasOciFileModal0.addEventListener('dragover', (e) => {
        e.preventDefault()
        Object.assign(dropAreasOciFileModal0.style, {
            border : '2px dashed #77d',
            backgroundColor : '#7777dd10',
        });
    })

    dropAreasOciFileModal0.addEventListener('dragleave', (e) => {
        e.preventDefault()
        Object.assign(dropAreasOciFileModal0.style, {
            border : '2px dashed #ccc',
            backgroundColor : '#efefef',
        });
    })

    function alertRefreshNewOciModal0() {
        btnRemoveOciImageFileModal0.style.display = 'none'
        fileInputNewOciFileModal0.value = ''
        fileInputNewOciTextFileModal0.value = ''

        Object.assign(dropAreasOciFileModal0.style, {
            border : "2px dashed #ccc",
            textAlign : "center",
            backgroundColor : '#efefef',
            display : 'block',
            fontSize : '.75em',
        });

        dropAreasOciFileModal0.innerHTML = 'Seleccione una imagen para la OCI <br>Haz click o arrastra y suelta una imagen aquí'
    }

    function alertNotImageNewOciModal0() {
        alertOciFileModal0.style.display = 'flex'
        alertSizeOciModal0.style.display = 'none'
        alertRefreshNewOciModal0()
    }

    function alertSizeImageNewOciModal0() {
        alertSizeOciModal0.style.display = 'flex'
        alertOciFileModal0.style.display = 'none'
        alertRefreshNewOciModal0()
    }

    dropAreasOciFileModal0.addEventListener('drop', (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        
        if (file && file.type.startsWith('image/')) {
            dropAreasOciFileModal0.style.border = '3px dashed #2d2'
            dropAreasOciFileModal0.style.backgroundColor = '#22dd2210'
            
            handleFileUploadNewOciModal0(file)

        } else {
            alertNotImageNewOciModal0()
        }     
    })

    dropAreasOciFileModal0.addEventListener('click', () => {
        fileInputNewOciFileModal0.click()
    })

    fileInputNewOciFileModal0.addEventListener('change', (e) => {
        e.preventDefault()
        const file = fileInputNewOciFileModal0.files[0]
        
            if (file && file.type.startsWith('image/')) {
                dropAreasOciFileModal0.style.border = '3px dashed #2d2'
                dropAreasOciFileModal0.style.backgroundColor = '#22dd2210'
                    
                handleFileUploadNewOciModal0(file)

            } else {
                alertNotImageNewOciModal0()
            }     
    })

    function handleFileUploadNewOciModal0(file) {
        const fileSize = file.size
        const fileSizeInMb = fileSize / (1024 * 1024)

        if (fileSizeInMb < 3) {
            let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
            // Separar el nombre del archivo y la extensión
            const dotIndex = file.name.lastIndexOf('.');
            const name = file.name.substring(0, dotIndex);
            const extension = file.name.substring(dotIndex);
            fileInputNewOciTextFileModal0.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
            btnRemoveOciImageFileModal0.style.display = 'flex'

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropAreasOciFileModal0.innerHTML = 
                    `<img class="m-auto mt-3" src="${reader.result}" style="max-width: 75%; max-height: 75%;">`

                alertOciFileModal0.style.display = 'none'
                alertSizeOciModal0.style.display = 'none'
            }

        } else {
            alertSizeImageNewOciModal0()
        }
    }

    btnRemoveOciImageFileModal0.addEventListener("click", (e) => {
        e.preventDefault()
        alertOciFileModal0.style.display = 'none'
        alertSizeOciModal0.style.display = 'none'
        alertRefreshNewOciModal0()
        e.stopPropagation()
    })
    

    //-------------------------- Add New OCI Row Modal Form--------------------------------
    const btnAddNewOciRow = document.getElementById("btnAddNewOciRow0")
    
    if (btnAddNewOciRow) {
        btnAddNewOciRow.addEventListener('click', () => {
            const parentDiv = document.getElementById('ociNewItemRow')
            let i = parseInt(document.getElementById('ociQuantityModal').value)
            const ociNumberValue = parseInt(document.getElementById(`ociNumber${i-1}`).value)
            const ociPrioValue = parseInt(document.getElementById(`ociPrio${i-1}`).value)
    
            const originalDiv = (
                `<div class="row text-start">
                    <strong>#${i+1}</strong>
                </div>   
                    <div class="col-1 my-1 align-self-middle">
                        <input type="number" name="ociNumber${i}" id="ociNumber${i}" class="form-control"
                        min="0" max="9999" placeholder="Número OCI" value="${ociNumberValue+1}" required>
                    </div>
                    <div class="col-1 my-1 align-self-middle">
                        <input type="number" name="ociPrio${i}" id="ociPrio${i}" class="form-control"
                        min="0" max="999" placeholder="Prio OCI" value="${ociPrioValue+1}" required>
                    </div>
                    <div class="col-3 my-1 align-self-middle">
                        <textarea type="text" name="ociDescription${i}" id="ociDescription${i}" rows="3" maxlength="100" class="form-control" placeholder="Descripción OCI" required></textarea>
                    </div>
                    <div class="col-2 my-1 align-self-middle">
                        <input type="text" name="ociAlias${i}" id="ociAlias${i}"
                            maxlength="100" class="form-control" placeholder="Alias OCI">                    
                    </div>
                    <div class="col-1 mt-1 align-self-middle">
                        <div class="form-check form-switch d-inline-block mt-2">
                            <input class="form-check-input" type="checkbox" id="ociStatus${i}"
                            aria-checked="true" name="ociStatus${i}" style="cursor: pointer;" checked>
                            <label class="form-check-label" for="ociStatus${i}">Activa</label>
                        </div>
                    </div>
                    <div class="col align-self-middle">
                        <input type="text" id="fileInputNewOciTextModal${i}" name="imageOciFileNameModal${i}" style="display: none;">
                        <input type="file" id="fileInputNewOciModal${i}" name="imageNewOciModal${i}" value=""
                            accept="image/*" style="display: none;" required>
                        <div id="drop-area-ociModal${i}" class="mb-1 mx-auto" style="font-size: 1em; overflowWrap: break-word;">
                            <label for="imageOci" class="form-label d-flex justify-content-start ms-1">
                                Seleccione una imagen para la OCI
                            </label>    
                            <p>Haz click o arrastra y suelta una imagen aquí</p>
                        </div>
                        <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                                id="btnRemoveOciImageModal${i}" name="btnRemoveOciImageModal" style="display: none;">
                                <i class="fa-solid fa-xmark"></i>
                        </button>
                        <div id="alertOciModal${i}" class="alert alert-warning align-items-center" role="alert"
                            style="display: none; font-size: 0.65rem; height: 1rem;">
                            <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                        </div>
                        <div id="alertSizeOciModal${i}" class="alert alert-warning align-items-center mx-auto" role="alert"
                            style="display: none; font-size: 0.65rem; height: 1rem;">
                            <strong class="me-2">Atención!</strong> El tamaño de la imagen debe ser menor a 3Mb.
                        </div>
                    </div>
    
                    <div class="col-1 my-auto align-self-middle">
                        <button type="button" name="btnRemoveNewOciRow" id="btnRemoveNewOciRow${i}"
                            title="Eliminar línea de OCI" class="btn btn-danger rounded-circle m-2 border border-dark border-1 shadow">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>`
            )
    
            if (i == 1) {
                originalDiv
                btnAddNewOciRow.title = 'Agregar una línea de OCI'
    
            } else if (i !== 1 && i < varLimMaxOciProyecto) { //cantidad maxima de OCI en conjunto a agregar 100
                originalDiv
                btnRemoveNewItem = document.getElementById(`btnRemoveNewOciRow${i-1}`)
                btnRemoveNewItem.style.display = 'none'
                btnAddNewOciRow.title = 'Agregar una línea de OCI'
                btnRemoveNewItem.title= 'Eliminar línea de OCI'

            } else {
                btnRemoveNewItem = document.getElementById(`btnRemoveNewOciRow${i-1}`)
                btnRemoveNewItem.style.display = 'none'
                btnAddNewOciRow.setAttribute('disabled', true)
                btnRemoveNewItem.title = 'Eliminar línea de OCI'
            }
    
            const newDiv = document.createElement('div')
            newDiv.setAttribute('class', "row m-1")
            newDiv.id = `ociItemRow${i}`
            newDiv.innerHTML = originalDiv
            parentDiv.appendChild(newDiv)
            const ociQty = document.getElementById("ociQuantityModal")
            ociQty.setAttribute('value', i + 1)
    
            let removeButtons = document.querySelectorAll('button[name="btnRemoveNewOciRow"]')
            let lastRemoveButton = removeButtons[removeButtons.length-1]
        
            if (lastRemoveButton) {
                lastRemoveButton.addEventListener("click", (event) => {
                    event.preventDefault()
                    let idBtnRemoveRow = lastRemoveButton.id
                    removeNewOciRow(idBtnRemoveRow)
                })
            }
            
            //---------------------New Oci Imges behavior ------------------------------
            let arrayDropAreasModal = [], arrayBtnRemoveOciImageModal = [],
                arrayAlertOciModal = [], arrayAlertSizeOciModal = [],
                arrayImageOciFileNameModal = [], arrayFileInputNewOciModal = []
            
            for (let m=0; m<parseInt(ociQty.value); m++) {
                let dropAreasOciFileModal = document.getElementById(`drop-area-ociModal${m}`),
                    btnRemoveOciImageFileModal = document.getElementById(`btnRemoveOciImageModal${m}`),
                    alertOciFileModal = document.getElementById(`alertOciModal${m}`),
                    alertSizeOciModal = document.getElementById(`alertSizeOciModal${m}`),
                    fileInputNewOciTextFileModal = document.getElementById(`fileInputNewOciTextModal${m}`),
                    fileInputNewOciFileModal = document.getElementById(`fileInputNewOciModal${m}`)
                
                dropAreasOciFileModal ? arrayDropAreasModal.push(dropAreasOciFileModal) : null
                btnRemoveOciImageFileModal ? arrayBtnRemoveOciImageModal.push(btnRemoveOciImageFileModal) : null
                alertOciFileModal ? arrayAlertOciModal.push(alertOciFileModal) : null
                alertSizeOciModal ? arrayAlertSizeOciModal.push(alertSizeOciModal) : null
                fileInputNewOciTextFileModal ? arrayImageOciFileNameModal.push(fileInputNewOciTextFileModal) : null
                fileInputNewOciFileModal ? arrayFileInputNewOciModal.push(fileInputNewOciFileModal) : null
            }

            function alertNewOciModalRefresh(number) {
                arrayImageOciFileNameModal[number].value = ''
                arrayBtnRemoveOciImageModal[number].style.display = 'none'
                arrayImageOciFileNameModal[number].value = ''

                Object.assign(arrayDropAreasModal[number].style, {
                    border : "2px dashed #ccc",
                    textAlign : "center",
                    backgroundColor : '#efefef',
                    display : 'block',
                    fontSize : '.75em',
                    overflowWrap : 'break-word',
                });

                arrayDropAreasModal[number].innerHTML = 'Seleccione una imagen para la OCI <br>Haz click o arrastra y suelta una imagen aquí'
            }

            function alertNotImageNewOciModal(number) {
                arrayAlertOciModal[number].style.display = 'flex'
                arrayAlertSizeOciModal[number].style.display = 'none'
                alertNewOciModalRefresh(number)
            }

            function alertSizeNewOciModal(number) {
                arrayAlertSizeOciModal[number].style.display = 'flex'
                arrayAlertOciModal[number].style.display = 'none'
                alertNewOciModalRefresh(number)
            }

    
            arrayDropAreasModal.forEach(function(elemento) {
                Object.assign(elemento.style, {
                    width : "100%",
                    height : "160px",
                    border : "2px dashed #ccc",
                    margin : "0 auto 0 25px",
                    borderRadius : "10px",
                    textAlign : "center",
                    lineHeight : "40px",
                    cursor : "pointer",
                });
    
                elemento.addEventListener('dragover', (e) => {
                    e.preventDefault()
                    elemento.style.border = '2px dashed #77d'
                    elemento.style.backgroundColor = '#7777dd10'
                })
    
                elemento.addEventListener('dragleave', (e) => {
                    e.preventDefault()
                    elemento.style.border = '2px dashed #ccc'
                    elemento.style.backgroundColor = '#efefef'
                })
            
                elemento.addEventListener('drop', (e) => {
                    e.preventDefault()
                    const file = e.dataTransfer.files[0]
                    const number = parseInt(extractNumbers(elemento.id))
                    
                    if (file && file.type.startsWith('image/')) {
                        elemento.style.border = '3px dashed #2d2'
                        elemento.style.backgroundColor = '#22dd2210'
                        
                        handleFileUploadNewOciModal(file, number)
    
                    } else {
                        alertNotImageNewOciModal(number)
                    }     
                })
    
                elemento.addEventListener('click', (e) => {
                    const number = parseInt(extractNumbers(elemento.id))
                    arrayFileInputNewOciModal[number].click()
                })
    
            })
    
            arrayFileInputNewOciModal.forEach(function(elemento) {
                elemento.addEventListener('change', (e) => {
                    e.preventDefault()
                    const number = parseInt(extractNumbers(elemento.id))
                    const file = elemento.files[0]

                    if (file && file.type.startsWith('image/')) {
                        arrayDropAreasModal[number].style.border = '3px dashed #2d2'
                        arrayDropAreasModal[number].style.backgroundColor = '#22dd2210'
                        
                        handleFileUploadNewOciModal(file, number)

                    } else {
                        alertNotImageNewOciModal(number)
                    }     
                })
            })
            
            function handleFileUploadNewOciModal(file, number) {
                const fileSize = file.size,
                    fileSizeInMb = fileSize / (1024 * 1024)

                if (fileSizeInMb < 3) {
                    let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
                    // Separar el nombre del archivo y la extensión
                    const dotIndex = file.name.lastIndexOf('.'),
                        name = file.name.substring(0, dotIndex),
                        extension = file.name.substring(dotIndex);
                    arrayImageOciFileNameModal[number].value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
                    arrayBtnRemoveOciImageModal[number].style.display = 'flex'

                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => {
                        arrayDropAreasModal[number].innerHTML = 
                            `<img class="m-auto mt-3" src="${reader.result}" style="max-width: 75%; max-height: 75%;">`
                        arrayAlertOciModal[number].style.display = 'none'
                        arrayAlertSizeOciModal[number].style.display = 'none'
                    }
    
                } else {
                    alertSizeNewOciModal(number)
                }
            }
        
            arrayBtnRemoveOciImageModal.forEach(function(elemento) {
                elemento.addEventListener("click", (e) => {
                    e.preventDefault()
                    const number = parseInt(extractNumbers(elemento.id))
                    arrayAlertOciModal[number].style.display = 'none'
                    arrayAlertSizeOciModal[number].style.display = 'none'
                    alertNewOciModalRefresh(number)
                    e.stopPropagation()
                })
            })
        })
    }

    //-------------------------- Remove OCI Row from Modal Form ----------------------------------
    function removeNewOciRow(e) {
        
        let i = document.getElementById('ociQuantityModal').value
        
        if (extractNumbers(e) && i > 1) {
            let btnRemoveRow = e
            const numberId1 = parseInt(btnRemoveRow.slice(-1)),
                numberId2 = parseInt(btnRemoveRow.slice(-2))
            let numberIdToDelete
            
            numberId1 >= 0 && numberId2 ? numberIdToDelete = numberId2 : numberIdToDelete = numberId1;
            
            function checkString(string) {
            return /^[0-9]*$/.test(string);
            }

            if (checkString(numberIdToDelete)) {
                const rowToDelete = document.getElementById(`ociItemRow${numberIdToDelete}`)
                rowToDelete.remove()
                const ociQty = document.getElementById("ociQuantityModal")
                ociQty.setAttribute('value', (i - 1))

                if (numberIdToDelete === 1) {
                    btnAddNewOciRow.removeAttribute('disabled')
                    btnAddNewOciRow.title = 'Agregar una línea de OCI'

                } else if (numberIdToDelete !== 1 && numberIdToDelete < varLimMaxOciProyecto) {
                    btnRemoveNewItem = document.getElementById(`btnRemoveNewOciRow${numberIdToDelete - 1}`)
                    btnRemoveNewItem.style.display = 'inline'
                    btnRemoveNewItem.title = 'Eliminar línea de OCI'
                    btnAddNewOciRow.title = 'Agregar una línea de OCI'

                } else {
                    btnRemoveNewItem = document.getElementById(`btnRemoveNewOciRow${numberIdToDelete - 1}`)
                    btnRemoveNewItem.style.display = 'inline'
                    btnRemoveNewItem.title = 'Eliminar línea de OCI'
                    btnAddNewOciRow.removeAttribute('disabled')
                }
            }
        }
    }
}

const arrayProjectList = []
    for (let i = 0; i<projectQuantity; i++) {  //ver limite maximo de proyectos por Cliente
        if (document.getElementById(`accordionPanelsStayOpen${i}`)) {
            arrayProjectList.push(i)
        }
    }

    if (arrayProjectList !=[]) {
        let allButtonsNewOci = document.querySelectorAll('button[name="btnAddNewOciToProject"]')
        
        allButtonsNewOci.forEach(function(btn) {
            if (btn) {
                btn.addEventListener("click", (event) => {
                    event.preventDefault()           
                    const btnValue = extractNumbers(btn.id),
                        projectName = document.getElementById(`projectNameHidden${btnValue}_0`).value,
                        projectIdHidden = document.getElementById(`projectIdHidden${btnValue}_0`).value

                    let arrayLastOciNumber=[], arrayLastOciPrio = []
                    for(let n=0; n<maxOciQuantity; n++) { 
                        if(document.getElementById(`ociNumberHidden${btnValue}_${n}`)) {
                            arrayLastOciNumber.push(parseInt(document.getElementById(`ociNumberHidden${btnValue}_${n}`).value))
                            arrayLastOciPrio.push(parseInt(document.getElementById(`ociPrioHidden${btnValue}_${n}`).value))
                        }
                    }

                    let lastOciIndex = parseInt(arrayLastOciNumber.length-1)
                    addNewOciToProject(
                        projectName, 
                        arrayLastOciNumber[lastOciIndex],
                        arrayLastOciPrio[lastOciIndex],
                        projectIdHidden
                    )
                })
            }
        })
    }

//---- Update Project Data ----------------
function messageUpdateProject(
    projectId, 
    projectName, 
    statusProject,
    uNegocioProject,
    imgProject, 
    descriptionProject,
    prioProject,
    codeProject,
    levelProject,
    k
    ) {
    
        let projectDescription = descriptionProject.slice(13).trim(),
            projectPrio = parseInt(prioProject.slice(5)),
            projectCode = codeProject.slice(8).trim(),
            checked = 'checked',
            bgColorStatus
        statusProject=='true' ? checked : checked = ''

        statusProject=='true'
            ? bgColorStatus='background-color: #55dd5560;'
            : bgColorStatus='background-color: #dd555560;'
        
        let projectLevel
        if (levelProject==='ganado') {
            projectLevel = `<option selected disabled value="ganado">Ganado</option>
                            <option value="paraCotizar">Para Cotizar</option>
                            <option value="aRiesgo">A Riesgo</option>`

        } else if (levelProject==='paraCotizar') {
            projectLevel = `<option selected disabled value="paraCotizar">Para Cotizar</option>
                            <option value="ganado">Ganado</option>
                            <option value="aRiesgo">A Riesgo</option>`

        } else {
            projectLevel = `<option selected disabled value="aRiesgo">A Riesgo</option>
                            <option value="ganado">Ganado</option>
                            <option value="paraCotizar">Para Cotizar</option>`
        }

        let projectUNegocio
        if (uNegocioProject==='matrices') {
            projectUNegocio = `<option selected disabled value="matrices">Matrices</option>
                            <option value="lineas">Líneas</option>`

        } else {
            projectUNegocio = `<option selected disabled value="lineas">Líneas</option>
                            <option value="matrices">Matrices</option>`
        }
        
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let html = `<form id="formUpdateProject${k}" enctype="multipart/form-data" action="/api/proyectos/updateProject/${projectId}" method="post">
                    <fieldset>
                        <div class="row justify-content-evenly mb-2 mx-1 px-1">
                            <div class="col-6">
                                <label for="projectName" class="form-label d-flex justify-content-start ms-1">Nombre Proyecto</label>
                                <input type="text" name="projectName" class="form-control"
                                    placeholder="Nombre Proyecto" value="${projectName}" required>
                            </div>
                            
                            <div class="col-6" style="${bgColorStatus}">
                                <label for="statusProject" class="form-label d-flex justify-content-start ms-1">Status Proyecto</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactivo</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusProjectForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusProjectForm" style="cursor: pointer;" ${checked}>
                                        <label class="form-check-label" for="statusProject">Activo</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row justify-content-evenly mb-2 mx-1 px-1">
                            <div class="col-8">
                                <label for="projectDescription" class="form-label d-flex justify-content-start ms-1">Descripción Proyecto</label>
                                <input type="text" name="projectDescription" class="form-control"
                                    placeholder="Descripción Proyecto" value="${projectDescription}" required>
                            </div>
                            
                            <div class="col-4">
                                <label for="prioProject" class="form-label d-flex justify-content-start ms-1">Prioridad Proyecto</label>
                                <input type="number" name="prioProject" class="form-control"
                                    placeholder="Prioridad Proyecto" value="${projectPrio}">
                            </div>
                        </div> 

                        <div class="row justify-content-between mb-4 mx-1 px-1">    
                            <div class="col-3">
                                <label for="levelProject" class="form-label d-flex justify-content-start ms-1">Nivel</label>
                                <select name="levelProject" class="form-select" required>
                                    ${projectLevel}
                                </select>
                            </div>

                            <div class="col-3">
                                <label for="uNegocioProject" class="form-label d-flex justify-content-start ms-1">Unidad Negocio</label>
                                <select name="uNegocioProject" class="form-select" required>
                                    ${projectUNegocio}
                                </select>
                            </div>
                            
                            <div class="col-3">
                                <label for="codeProject" class="form-label d-flex justify-content-start ms-1">Código Proyecto</label>
                                <input type="text" name="codeProject" class="form-control"
                                    placeholder="Codigo Proyecto" value="${projectCode}" required>
                            </div>
                        </div>
                        
                        <div class="row justify-content-start align-items-center mb-1 mx-1 px-1">
                            <div class="col mb-1">
                            
                            <input type="text" id="fileInputText" name="imageProjectFileName" value="" style="display: none;" required>
                            <input type="file" id="fileInput" name="imageProject"
                                value="" accept="image/*" style="display: none;" required>
                            
                            <div id="drop-area" class="mx-auto" style="font-size: .9em; overflowWrap: break-word;">
                                <label for="fileInputText" class="form-label d-flex justify-content-center">Seleccione una imagen para el Proyecto</label>
                                    <p>Haz click o arrastra y suelta una imagen aquí</p>
                                </div>
                                <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                                        id="removeImage" style="display: none;">
                                        <i class="fa-solid fa-xmark"></i>
                                </button>
                                
                                <div id="alertImage" class="alert alert-warning align-items-center" role="alert"
                                    style="display: none; font-size: 0.95rem; height: 1.15rem;">
                                    <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                                </div>
                                <div id="alertProjectImageSize" class="alert alert-warning align-items-center mx-auto" role="alert"
                                    style="display: none; font-size: 0.85rem; height: 1.15rem; width: 25rem;">
                                    <strong class="me-2">Atención!</strong> El tamaño de la imagen debe ser menor a 3Mb.
                                </div>

                            </div>
                        </div>
                    </fieldset>
                </form>`
                

    if(projectName) {
        Swal.fire({
            title: `Actualizar Proyecto ${projectName}`,
            position: 'center',
            html: html,
            width: 700,
            imageUrl: `${imgProject}`,
            imageWidth: `25%`,
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptar = document.getElementsByClassName('swal2-confirm');
                btnAceptar[0].setAttribute('id','btnAceptarModal')
                btnAceptar[0].style = "cursor: not-allowed;"
                btnAceptar[0].disabled = true
            }
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formUpdateProject${k}`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El proyecto <b>${projectName}</b>, se modificó con éxito!`
                })
            } else {
                Swal.fire(
                    'Proyecto no modificado!',
                    `El proyecto <b>${projectName}</b>, no se modificó!`,
                    'warning'
                )
                return false
            }
        })
        disabledBtnAceptar()

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El proyecto no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    let inputsDeTexto = document.querySelectorAll('input[type="text"]')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /[#"$%&?¡¿^/()=!'~`´Ø\\*{}\[\]<>@]/;

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
            let forbiddenChars = /[#"$%?¡¿^=!/()'~`´Ø\\*{}\[\]<>@]/g; // Caracteres prohibidos
            // Reemplazar caracteres prohibidos
            let newValue = input.value.replace(forbiddenChars, '');

            // Actualizar el valor del input
            input.value = newValue;
        });


    })

    const dropArea = document.getElementById('drop-area'),
        fileInput = document.getElementById('fileInput'),
        fileImputText = document.getElementById('fileInputText'),
        removeImageButton = document.getElementById('removeImage'),
        alertImage = document.getElementById('alertImage'),
        alertProjectImageSize = document.getElementById('alertProjectImageSize')
    
        Object.assign(dropArea.style, {
            width : "50%",
            height : "200px",
            border : "2px dashed #ccc",
            margin : "0 auto 0 50px",
            borderRadius : "10px",
            textAlign : "center",
            lineHeight : "40px",
            cursor : "pointer",
        });

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropArea.style.border = '2px dashed #77a'
        dropArea.style.backgroundColor = '#7777aa10'
    })

    dropArea.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropArea.style.border = '2px dashed #ccc'
        dropArea.style.backgroundColor = '#fff'
    })

    function alertImageProjectRefresh() {
        fileInput.value = ''
        fileImputText.value = ''
        removeImageButton.style.display = 'none'

        Object.assign(dropArea.style, {
            border : "2px dashed #ccc",
            textAlign : "center",
            backgroundColor : '#fff',
            display : 'block',
            fontSize : '.85em',
            overflowWrap : 'break-word',
        });
        dropArea.innerHTML = 'Seleccione una imagen para el Proyecto <br>Haz click o arrastra y suelta una imagen aquí'
    }

    function alertNotImage() {
        alertImage.style.display = 'flex'
        alertProjectImageSize.style.display = 'none'
        alertImageProjectRefresh()
    }

    function alertSizeImageProject() {
        alertProjectImageSize.style.display = 'flex'
        alertImage.style.display = 'none'
        alertImageProjectRefresh()
    }

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        
        if (file && file.type.startsWith('image/')) {
            dropArea.style.border = '3px dashed #2a2'
            dropArea.style.backgroundColor = '#22aa2210'
            
            handleFileUpload(file)

        } else {
            alertNotImage()
        }     
    })

    dropArea.addEventListener('click', () => {
        fileInput.click()
    })

    fileInput.addEventListener('change', (e) => {
        e.preventDefault()
        const file = fileInput.files[0]
                
        if (file && file.type.startsWith('image/')) {
            dropArea.style.border = '3px dashed #2a2'
            dropArea.style.backgroundColor = '#22aa2210'

            handleFileUpload(file)

        } else {
            alertNotImage()
        }     
    })

    function handleFileUpload(file) {
        const fileSize = file.size
        const fileSizeInMb = fileSize / (1024 * 1024)

        if (fileSizeInMb < 3) {
            let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
            // Separar el nombre del archivo y la extensión
            const dotIndex = file.name.lastIndexOf('.');
            const name = file.name.substring(0, dotIndex);
            const extension = file.name.substring(dotIndex);
            fileImputText.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
            removeImageButton.style.display = 'flex'

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropArea.innerHTML = 
                    `<img class="m-auto mt-3" src="${reader.result}" style="max-width: 75%; max-height: 75%;">`
                dropArea.style.display = 'block'
                alertImage.style.display = 'none'
                alertProjectImageSize.style.display = 'none'
            }

        } else {
            alertSizeImageProject()
        }
    }

    removeImageButton.addEventListener('click', (e)=> {
        e.preventDefault()
        alertImage.style.display = 'none'
        alertProjectImageSize.style.display = 'none'
        alertImageProjectRefresh()
        e.stopPropagation()
    })
}

let arrayBtnUpdateProject = [], l=0
for (let k=0; k<projectQuantity; k++) {
    let btnUpdateProject = document.getElementById(`btnUpdateProject${k}_${l}`)
    btnUpdateProject ? arrayBtnUpdateProject.push(btnUpdateProject) : null

    
    arrayBtnUpdateProject.length !=0 ?
        arrayBtnUpdateProject[k].addEventListener('click', (event) => {
            event.preventDefault()
            const projectName = document.getElementById(`projectNameHidden${k}_${l}`).value,
                levelProject = document.getElementById(`levelProjectHidden${k}_${l}`).value,
                idProject = document.getElementById(`projectIdHidden${k}_${l}`).value,
                statusProject = document.getElementById(`statusProjectHidden${k}_${l}`).value,
                uNegocioProject = document.getElementById(`uNegocioProjectHidden${k}_${l}`).value,
                descriptionProject = document.getElementById(`projectDescription${k}`).innerText,
                prioProject = document.getElementById(`prioProject${k}`).innerText,
                codeProject = document.getElementById(`codeProject${k}`).innerText,
                imgProject = document.getElementById(`imageProject${k}`).src
            
            messageUpdateProject(
                idProject,
                projectName,
                statusProject,
                uNegocioProject,
                imgProject,
                descriptionProject,
                prioProject,
                codeProject,
                levelProject,
                k
            )
        })
    : null
}

//------------ Delete Project ------------------------
function messageDeleteProject(projectName, id, k, imgProject) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    const htmlForm = `El proyecto <b>${projectName}</b> y toda su información interna
                        <br>
                        <b>se eliminará completamente</b>.
                        <br>
                        <div id="alertDelete" class="alert alert-danger d-flex align-items-center justify-content-center mx-4 mt-3" role="alert">
                            <i class="fa-solid fa-triangle-exclamation me-2"></i>
                            <div>
                                <strong class="me-2">Atención!</strong> Esta acción no se puede deshacer!
                            </div>
                        </div>
                        <div id="imageProjectPreview" class="p-1 my-1 mx-auto w-50">
                            <img class="m-auto mt-3" src="${imgProject}" style="max-width: 50%; max-height: 50%;">
                        </div>
                        Está seguro que desea continuar?
                        <form id="formDeleteProject${k}_0" action="/api/proyectos/deleteProject/${id}" method="post">
                            <fieldset>
                                <input type="hidden" name="projectNameHidden" value="${projectName}">
                                <input type="hidden" name="projectIdHidden" value="${id}">
                            </fieldset>
                        </form>`
    
    if(projectName) {
        Swal.fire({
            title: 'Eliminar Proyecto!',
            position: 'center',
            width: 550,
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            focusConfirm: false,
            confirmButtonText: 'Eliminar <i class="fa-regular fa-trash-can"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`formDeleteProject${k}_0`).submit()
                Toast.fire({
                    icon: 'success',
                    title: `El proyecto <b>${projectName}</b>, se eliminó correctamente!`
                })
            } else {
                Swal.fire(
                    'Proyecto no eliminado!',
                    `El proyecto <b>${projectName}</b>, no se eliminó!`,
                    'warning'
                )
                return false
            }
        })

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El proyecto no se eliminó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
}

let arrayBtnDeleteProject = [], p=0
for (let k=0; k<projectQuantity; k++) {
    let btnDeleteProject = document.getElementById(`btnDeleteProject${k}_${p}`)
    btnDeleteProject ? arrayBtnDeleteProject.push(btnDeleteProject) :null
    
    arrayBtnDeleteProject.length !=0 ?
        arrayBtnDeleteProject[k].addEventListener('click', (event) => {
            event.preventDefault()
            const projectName = document.getElementById(`projectNameHidden${k}_${p}`).value,
                idProject = document.getElementById(`projectIdHidden${k}_${p}`).value,
                imgProject = document.getElementById(`imageProject${k}`).src
            messageDeleteProject(projectName, idProject, k, imgProject)
        })
    : null
}

//---------- ToolTip btn-spot OT -----------
let btnOtNumberSpot = Array.from(document.querySelectorAll('button[name="otNumberSpot"]'))

btnOtNumberSpot.forEach(function(btnSpot) {
    btnSpot.addEventListener("mouseover", (event) => {
        let btnSpotOtNumber = document.getElementById(`${btnSpot.id}`)
        
        tippy(btnSpotOtNumber, {
            content: `OT: ${btnSpotOtNumber.id}<br>
                    Op: ${btnSpotOtNumber.getAttribute("valueop")}<br>
                    Descripcion: ${btnSpotOtNumber.getAttribute("valuedes")}<br>
                    Diseño: ${btnSpotOtNumber.getAttribute("valuedesig")}<br>
                    Simulacion: ${btnSpotOtNumber.getAttribute("valuesim")}<br>
                    Proveedor: ${btnSpotOtNumber.getAttribute("valuesup")}`,
            allowHTML: true,
            arrow: true,
            animation: 'scale',
            theme: 'material',
            interactive: true,
            hideOnClick: true,
        })
    })
})


//*********Invalida ingreso de carateres especiales en inputs de texto*********** */
let inputsDeTexto = document.querySelectorAll('input[type="text"]')

// Agregar un listener de evento a cada input
inputsDeTexto.forEach(function(input) {
    input.addEventListener('keydown', function(event) {
        // Obtener el código de la tecla presionada
        let key = event.key;

        // Lista de caracteres especiales prohibidos
        let forbiddenChars = /["$%?¡¿^/=!'~`´Ø\\*{}\[\]<>@]/;

        // Verificar si la tecla presionada es un carácter especial
        if (forbiddenChars.test(key)) {
            // Cancelar el evento para evitar que se ingrese el carácter
            event.preventDefault()
            input.classList.toggle("border", "border-danger", "border-2")
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

function disabledBtnAceptar () {
    let btnAceptarModal = document.getElementsByClassName('swal2-confirm');
    const allInputs = document.querySelectorAll('input[type="number"],select'),
        allInputsText = document.querySelectorAll('input[type="text"],textarea'),
        allInputsRange = document.querySelectorAll('input[type="range"]'),
        allInputsCheck = document.querySelectorAll('input[type="checkbox"]'),
        dropAreaUpdate = document.getElementById('drop-areaUpdate'),
        dropArea = document.getElementById('drop-area'),
        dropAreasOciFileModal0 = document.getElementById(`drop-area-ociModal0`),
        dropAreaOci = document.getElementById('drop-area-oci'),
        dropAreaProject = document.getElementById('drop-areaProject'),
        checkbox = document.getElementById('confirmationNumberOci'),
        ociNumberDisabled = document.getElementById('numberOciModal')

    const removeBtnImage = document.getElementById('removeImage')
    if (removeBtnImage) {
        removeBtnImage.addEventListener('transitionend', () => {

            if (removeBtnImage.style.display === 'flex') {
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            }
        })
    }

    function borderPrimary(input) {
        input.classList.add("border", "border-2", "shadow")
        btnAceptarModal[0].removeAttribute('disabled')
        btnAceptarModal[0].style = "cursor: pointer;"
    }
    
    allInputs.forEach(function(input) {
        if (input) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                borderPrimary(input)
            })    
        }        
    })

    allInputsText.forEach(function(input) {
        if (input) {
            input.addEventListener('input', (event) => {
                event.preventDefault()
                borderPrimary(input)
            })    
        }        
    })

    allInputsCheck.forEach(function(input) {
        if (input.value) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.toggle("bg-danger")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;" 
                
                if (checkbox) {
                    checkbox.checked
                    ? ociNumberDisabled.removeAttribute('disabled')
                    : ociNumberDisabled.setAttribute('disabled', 'true')
                }
            })
        }        
    })

    allInputsRange.forEach(function(input) {
        if (input.value) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("drag__bar")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            })    
        }        
    })

    // Crear una nueva instancia de MutationObserver y pasar una función de callback
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Iterar sobre las mutaciones observadas
        for(let mutation of mutationsList) {
            // Verificar si la mutación fue una inserción o eliminación de nodos
            if (mutation.type === 'childList' && btnAceptarModal) {
                // Realizar acciones en respuesta al cambio
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            }
        }
    });

    // Configurar el observador para que observe los cambios en los nodos hijos del div
    if (dropAreaUpdate) observer.observe(dropAreaUpdate, { childList: true });
    if (dropArea) observer.observe(dropArea, { childList: true });
    if (dropAreaProject) observer.observe(dropAreaProject, { childList: true });
    if (dropAreaOci) observer.observe(dropAreaOci, { childList: true });
    if (dropAreasOciFileModal0) observer.observe(dropAreasOciFileModal0, { childList: true });
}

// --------- Manejador de eventos de Accordion Proyectos -------------------
const btnProyectosLineas = document.getElementById('btnHiddeProyectosLineas');
const btnProyectosMatrices = document.getElementById('btnHiddeProyectosMatrices');

// Función para verificar si todos los elementos están ocultos
function allElementsHidden(type) {
    for (let k = 0; k < varLimMaxProyectoCliente; k++) {
        const element = document.getElementById(`${type}_${k}`);
        if (element && !element.classList.contains('d-none')) {
            return false;
        }
    }
    return true;
}

// Función principal
async function hiddeAccordionProyectosMatrices(clickedBtn) {
    const isLineasBtn = clickedBtn === btnProyectosLineas,
        elementType = isLineasBtn ? 'lineas' : 'matrices',
        otherElementType = isLineasBtn ? 'matrices' : 'lineas',
        btnIcon = clickedBtn.querySelector('i');
    
    // Verificar estado actual antes de cambiar
    const allHiddenBefore = allElementsHidden(elementType);
    
    // Cambiar visibilidad
    for (let k = 0; k < varLimMaxProyectoCliente; k++) {
        const element = document.getElementById(`${elementType}_${k}`);
        if (element) element.classList.toggle('d-none');
    }
    
    // Actualizar ícono
    const allHiddenAfter = allElementsHidden(elementType);
    btnIcon.classList.toggle('fa-eye', allHiddenAfter);
    btnIcon.classList.toggle('fa-eye-slash', !allHiddenAfter);
    
    // Actualizar title de los botones
    if (isLineasBtn) {
        clickedBtn.title = allHiddenAfter ? "Mostrar Proyectos Líneas" : "Ocultar Proyectos Líneas";
        btnProyectosMatrices.title = allHiddenAfter ? "Mostrar Proyectos Matrices" : "Ocultar Proyectos Matrices";
    } else {
        clickedBtn.title = allHiddenAfter ? "Mostrar Proyectos Matrices" : "Ocultar Proyectos Matrices";
        btnProyectosLineas.title = allHiddenAfter ? "Mostrar Proyectos Líneas" : "Ocultar Proyectos Líneas";
    }
    
    // Verificar si ambos tipos están ocultos
    const otherAllHidden = allElementsHidden(otherElementType);
    if (allHiddenAfter && otherAllHidden) {
        await Swal.fire({
            title: '¡Atención!',
            text: 'Estás ocultando ambos tipos de proyectos. ¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, ocultar ambos',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (!result.isConfirmed) {
                // Revertir cambios si el usuario cancela
                for (let k = 0; k < varLimMaxProyectoCliente; k++) {
                    const element = document.getElementById(`${elementType}_${k}`);
                    if (element) {
                        element.classList.toggle('d-none');
                    }
                }
                btnIcon.classList.toggle('fa-eye', !allHiddenAfter);
                btnIcon.classList.toggle('fa-eye-slash', allHiddenAfter);

                // También revertir los títulos si se cancela
                if (isLineasBtn) {
                    clickedBtn.title = !allHiddenAfter ? "Mostrar Proyectos Líneas" : "Ocultar Proyectos Líneas";
                    btnProyectosMatrices.title = !allHiddenAfter ? "Mostrar Proyectos Matrices" : "Ocultar Proyectos Matrices";
                } else {
                    clickedBtn.title = !allHiddenAfter ? "Mostrar Proyectos Matrices" : "Ocultar Proyectos Matrices";
                    btnProyectosLineas.title = !allHiddenAfter ? "Mostrar Proyectos Líneas" : "Ocultar Proyectos Líneas";
                }
            }
        });
    }
}

// Asignación de eventos
if (btnProyectosLineas) btnProyectosLineas.addEventListener('click', () => hiddeAccordionProyectosMatrices(btnProyectosLineas));
if (btnProyectosMatrices) btnProyectosMatrices.addEventListener('click', () => hiddeAccordionProyectosMatrices(btnProyectosMatrices));