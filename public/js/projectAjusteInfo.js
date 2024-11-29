//variable limite maximo de proyectos por Cliente
const varLimMaxProyectoCliente = 25

//variable limite maximo de Ot por Proyecto
const varLimMaxOtProyecto = 50

//variable limite maximo de OCI por Proyecto
const varLimMaxOciProyecto = 25

//variable limite maximo de Columnas Info por Ot
const varLimMaxColData = 20

//variable limite maximo de Revisiones por dato
const varLimMaxRevData = 99

// Manejador de eventos de tablas General y Dueño OT -------------------
const arrBtnHidde = []
for (let i = 0; i<varLimMaxOciProyecto; i++) { //25
    document.getElementById(`tablaGeneral${i}`) ? arrBtnHidde.push(i) : null
}

function hiddeTableGeneral(k) {
    const tablaGeneral = document.getElementById(`tablaGeneral${k}`)
    const tablaDuenoOt = document.getElementById(`tablaDuenoOt${k}`)
    const btnHiddeTableGeneral = document.getElementById(`btnHiddeTableGeneral${k}`)
    const posBtnHiddeTableGeneral = document.getElementById(`posBtnHiddeTableGeneral${k}`)

    if (tablaGeneral.style.display === 'none') {
        tablaGeneral.style.display = ''
        tablaGeneral.classList.add("col-3")
        tablaDuenoOt.classList.add("col-3")
        btnHiddeTableGeneral.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

        posBtnHiddeTableGeneral.classList.remove("col-1")
        posBtnHiddeTableGeneral.classList.add("col-3")
        btnHiddeTableGeneral.title = 'Ocultar General'

    } else {
        tablaGeneral.style.display = 'none'
        tablaGeneral.classList.remove("col-3")
        tablaDuenoOt.classList.add("col-3")
        btnHiddeTableGeneral.innerHTML = '<i class="fa-solid fa-eye"></i>'
        posBtnHiddeTableGeneral.classList.remove("col-3")
        posBtnHiddeTableGeneral.classList.add("col-1")
        btnHiddeTableGeneral.title = 'Mostrar General'
    }
}

function hiddeTableDuenoOt(k) {
    const tablaDuenoOt = document.getElementById(`tablaDuenoOt${k}`)
    const btnHiddeTableDuenoOt = document.getElementById(`btnHiddeTableDuenoOt${k}`)
    const posBtnHiddeTableDuenoOt = document.getElementById(`posBtnHiddeTableDuenoOt${k}`)

    if (tablaDuenoOt.style.display === 'none') {
        tablaDuenoOt.style.display = ''
        btnHiddeTableDuenoOt.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
        posBtnHiddeTableDuenoOt.classList.remove("col-1")
        posBtnHiddeTableDuenoOt.classList.add("col-2")
        btnHiddeTableDuenoOt.title = 'Ocultar Items'
    } else {
        tablaDuenoOt.style.display = 'none'
        btnHiddeTableDuenoOt.innerHTML = '<i class="fa-solid fa-eye"></i>'
        posBtnHiddeTableDuenoOt.classList.remove("col-2")
        posBtnHiddeTableDuenoOt.classList.add("col-1")
        btnHiddeTableDuenoOt.title = 'Mostrar Items'
    }
}

function extractNumbers(str) {
    const numbers = str.match(/\d{1,2}/g) // Extract 1 or 2 digit numbers from the string
    
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
    return null; // Return null if no valid numbers are found
}

function cleanString(cadena) {
    // Eliminar espacios en blanco al principio y al final
    let cadenaSinEspaciosInit = cadena.trim()
    // Eliminar etiquetas HTML
    let cadenaSinEtiquetas = cadenaSinEspaciosInit.replace(/<[^>]*>/g, '')
    // Eliminar espacios en blanco al principio y al final
    let cadenaSinEspaciosEnd = cadenaSinEtiquetas.trim()
    return cadenaSinEspaciosEnd
}

// Ocultar tablas cabeceras
if (arrBtnHidde !=[]) {
    let allButtonsHiddeTableGeneral = document.querySelectorAll('button[name="btnHiddeTableGeneral"]')
    let allButtonsHiddeTableDuenoOt = document.querySelectorAll('button[name="btnHiddeTableDuenoOt"]')
    
    allButtonsHiddeTableGeneral.forEach(function(btn){
        btn.id ?
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let kValue = btn.id//event.target.id
                hiddeTableGeneral(extractNumbers(kValue))
            })
        : null
    })

    allButtonsHiddeTableDuenoOt.forEach(function(btn){
        if (btn.id) {
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let kValue = btn.id
                hiddeTableDuenoOt(extractNumbers(kValue))
            })
        }    
    })
}

// Inicialización de arrays
let checkSelect = document.querySelectorAll('input[name="checkSelect"]');
let maxOtQuantity = checkSelect ? checkSelect.length : 0;
let ociTotalQty = parseInt(document.getElementById('ociTotalQty').innerText);

let arrayBtnUpdateDuenoOt = [], arrayCheckBoxSelect = [],
    arrayRowsOtDuenoOt = [], arrayBtnCheckSelectionAll = [], arrayBtnCheckSelecMasive = [],
    arrayBtnAddDuenoOtModal = [], arrayCheckBoxNotNull = [], arrayStatusOt = [],
    arrayBtnSearchDuenoOtUser = [], arrayBtnSearchDuenoOtUserClean = [];

// Función auxiliar para buscar y agregar elementos si existen
const addElementIfExists = (selector, array, attribute = null) => {
    let element = document.getElementById(selector);
    if (element) {
        if (attribute) element.setAttribute(attribute, true);
        array.push(element);
    }
};

// Recorrido de ociTotalQty
for (let m = 0; m < ociTotalQty; m++) {
    addElementIfExists(`btnCheckSelectionAll${m}`, arrayBtnCheckSelectionAll);
    addElementIfExists(`btnCheckSelecMasive${m}`, arrayBtnCheckSelecMasive, 'disabled');
    addElementIfExists(`searchDuenoOtUser${m}`, arrayBtnSearchDuenoOtUser);

    // Recorrido de maxOtQuantity
    for (let n = 0; n < maxOtQuantity; n++) {
        addElementIfExists(`btnEditDuenoOt${m}_${n}`, arrayBtnUpdateDuenoOt);
        // addElementIfExists(`checkSelect${m}_${n}`, arrayCheckBoxSelect);

        let checkBoxSelect = document.getElementById(`checkSelect${m}_${n}`);
            if (checkBoxSelect) {
                arrayCheckBoxSelect.push(checkBoxSelect);
                if (checkBoxSelect.checked) arrayCheckBoxNotNull.push(checkBoxSelect);
            }
            addElementIfExists(`lastOtStatus${m}_${n}`, arrayStatusOt);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const projectNameHidden = document.getElementById('projectNameHidden').value
    const projectNameTitle = document.getElementById('projectNameTitle')
    projectNameTitle.innerHTML = `Proyecto <strong>${projectNameHidden}</strong>`
})


// ---- Manejador de eventos para Carouseles --------------------
document.addEventListener('DOMContentLoaded', function (event) {
    let initIndex = event.eventPhase
    const arrayCarousel = []
    for (let i = 0; i<varLimMaxOciProyecto; i++) {
        document.getElementById(`carouselExampleControls${i}`) ? arrayCarousel.push(i) : null
    }

    if(arrayCarousel !=[]) {
        for (let i=0; i<arrayCarousel.length; i++) {
            let myCarousel = document.getElementById(`carouselExampleControls${arrayCarousel[i]}`)
            
            myCarousel ?
                initIndex === 2 ?
                    myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                :
                    myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            : null

            // Detectar cuando el slide cambia
            myCarousel.addEventListener('slid.bs.carousel', function (event) {
                let slideCount = event.relatedTarget.parentElement.children.length
                let currentIndex = event.to

                // Si el slide actual es el último, deshabilita el botón "Next"
                currentIndex === slideCount - 1 ? 
                    myCarousel.querySelector('[data-bs-slide="next"]').setAttribute('disabled', 'disabled')
                :
                    myCarousel.querySelector('[data-bs-slide="next"]').removeAttribute('disabled')
                
                // Si el slide actual es el primero, deshabilita el botón "Prev"
                currentIndex === 0 ?
                    myCarousel.querySelector('[data-bs-slide="prev"]').setAttribute('disabled', 'disabled')
                :
                    myCarousel.querySelector('[data-bs-slide="prev"]').removeAttribute('disabled')
            })
        }
    }
})

let slidesCarousel = document.getElementsByClassName('carousel-item'),
    btnInferiorCarousel = document.getElementsByName('btnInferiorCarousel')

// Función para dividir un array en subarrays de tamaño especificado
function dividirArrayEnSubarrays(array, tamanoSubarray) {
    const subarrays = []
    for (let i = 0; i < array.length; i += tamanoSubarray) {
        subarrays.push(array.slice(i, i + tamanoSubarray));
    }
    return subarrays
}

const arrayOriginal = Array.from(slidesCarousel)
const arrayOriginalBtn = Array.from(btnInferiorCarousel)

// Dividir el array en subarrays de 14 elementos cada uno
const subarrays = dividirArrayEnSubarrays(arrayOriginal, 14);
const subarrayBtns = dividirArrayEnSubarrays(arrayOriginalBtn, 14);

function activarElemento(subarray, index) {
    if (subarray.length > 0) {
        // Si el índice está dentro del rango, activamos el elemento correspondiente
        const safeIndex = (index >= 0 && index < subarray.length) ? index : 0;
        subarray[safeIndex].classList.add('active');
    }
}

// Convertimos el valor de slideHidden a entero una vez
const slideHidden = document.getElementById('slideHidden')
let slideIndex
slideHidden ? slideIndex = parseInt(slideHidden.value) : null

// Activamos los elementos en ambos conjuntos de subarrays
if(subarrays, subarrayBtns) {
    [subarrays, subarrayBtns].forEach(array => {
        array.forEach(subarray => {
            activarElemento(subarray, slideIndex);
        });
    });
}

const formulario = document.getElementById("formNewDuenoOt")
const radios = document.querySelectorAll('[name="ociNumber"]')
const projectNameHidden = document.getElementById('projectNameHidden').value
const projectNumberId = document.getElementById(`projectIdHidden`).value
const ociNumberK = document.getElementById('ociNumberK')
const ociNumberHidden = document.getElementById('ociNumberHidden')
const clientId = document.getElementById('clientIdHidden')

//-------------------- Boton asignar Dueno de Pieza a OCI ------------------------
function radioSelected(elementoId) {
    const radioSelected = document.getElementById(`radioSelectedValue${elementoId}`)
    radioSelected.checked = true
    ociNumberK.value = extractNumbers(elementoId)
    ociNumberHidden.value = radioSelected.value
    formulario.scrollTo({ behavior: 'smooth', block: 'start', left:0, top:0 })

    return (ociNumberHidden.value)
}

let arrayBtnAddOtFormSelected = []
for (let i=0; i<radios.length; i++) {
    let btnAddOtFormSelected = document.getElementById(`btnAddOtFormSelected${i}`)
    btnAddOtFormSelected ? arrayBtnAddOtFormSelected.push(btnAddOtFormSelected) : null
}

arrayBtnAddOtFormSelected.forEach(function(elemento) {
    if (elemento) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            ociNumberHidden.value = radioSelected(elemento.value)
            formulario.scrollIntoView({ behavior: 'smooth', block: 'start', left:0, top:0 })
        })
    }
})

for (let i=0; i<radios.length; i++) {
    radios[i].addEventListener("change", (event) => {
        event.preventDefault()
        let ociSeleccionada = event.target.value
        ociNumberK.value = i
        ociNumberHidden.value = ociSeleccionada
    })
}

//---- Update Dueño OCI Data ----------------
function messageUpdateDuenoOt(
    idProjectSelected,
    ociKNumber,
    otNumber,
    otKNumber,
    opNumber,
    statusOt,
    otDescription,
    otDueno,  
    imageOci,
    ociAlias,
    ociDescription,
    flag
) {
    
    let numberKOci = parseInt(ociKNumber)
    let numberKOt = parseInt(otKNumber)
    let numberOt = parseInt(otNumber)
    let numberOp = parseInt(opNumber)
    let checked = 'checked'
    statusOt=='Activo' ? checked : checked = ''
    
    let initialFlag = false
    flag ? initialFlag = flag : initialFlag = false

    let bgColorStatus
    statusOt=='Activo' ? bgColorStatus='background-color: #55dd5560;' : bgColorStatus='background-color: #dd555560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    let html = `<form id="formUpdateDuenoOt${idProjectSelected}" action="/api/proyectos/updateDuenoOt/${idProjectSelected}" method="post">
                    <fieldset>
                        <div class="row justify-content-between mb-3 mx-1 px-1">
                            <div class="col-3">
                                <label for="numberOtModal" class="form-label d-flex justify-content-start ms-1">Número OT</label>
                                <input type="text" name="numberOt" id="numberOtModal" class="form-control"
                                    placeholder="Número OT" value="${numberOt}" disabled>
                            </div>

                            <div class="col-4" style="${bgColorStatus}">
                                <label for="statusOtForm" class="form-label d-flex justify-content-start ms-1">Status OT</label>
                                <div>
                                    <p class="d-inline-block me-1">Inactiva</p>
                                    <div class="form-check form-switch d-inline-block mt-2">
                                        <input id="statusOtForm" class="form-check-input" type="checkbox" role="switch"
                                            name="statusOtForm" style="cursor: pointer;" ${checked} disabled>
                                        <label class="form-check-label" for="statusOtForm">Activa</label>
                                    </div>    
                                </div>
                            </div>
                        </div>    
                        
                        <div class="row mb-3 mx-1 px-1">
                            <div class="col-8">
                                <label for="descriptionOt" class="form-label d-flex justify-content-start ms-1">Descripción OT</label>
                                <input type="text" name="descriptionOt" id="descriptionOt" class="form-control" value="${otDescription}" disabled>
                            </div>
                            <div class="col-4">
                                <label for="numeroOp" class="form-label d-flex justify-content-start ms-1">Número OP</label>
                                <input type="text" name="numeroOp" id="numeroOp" class="form-control" value="${numberOp}" disabled>
                            </div>
                        </div>

                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-4">
                                <label for="duenoOt" class="form-label d-flex justify-content-start ms-1">Seleccionar Dueño Pieza</label>                                
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control position-relative" id="duenoOt" name="duenoOt" placeholder="Dueño de Pieza"
                                        aria-label="Dueño de Pieza" aria-describedby="searchDuenoOtUserModal" value="${otDueno}" disabled required>
                                    <button type="button" title="Buscar Dueño de Pieza" class="btn btn-sm btn-primary rounded-circle ms-1 mt-3 border shadow position-absolute top-0 start-100 translate-middle" id="searchDuenoOtUserModal">
                                        <i class="fa-solid fa-database"></i>
                                    </button>
                                </div>
                            </div>
                        </div> 
                            <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${numberKOci}" value="${numberKOci}">
                            <input type="hidden" name="otKNumberHidden" id="otKNumberHidden${numberKOt}" value="${numberKOt}">
                            <input type="hidden" name="otNumberHidden" id="otNumberHidden${numberKOt}" value="${numberOt}">
                    </fieldset>
                </form>`

    if(idProjectSelected && numberOt) {
        Swal.fire({
            title: `Actualizar Dueño Pieza ${ociDescription}`,
            position: 'center',
            html: html,
            width: 850,
            imageUrl: `${imageOci}`,
            imageWidth: `20%`,
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: 'Actualizar <i class="fa-regular fa-pen-to-square"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-ban"></i>',
            didOpen: ()=> {
                let btnAceptarPrimerModal = document.getElementsByClassName('swal2-confirm');
                btnAceptarPrimerModal[0].setAttribute('id','btnAceptarModal')
                btnAceptarPrimerModal[0].style = "cursor: not-allowed;"
                btnAceptarPrimerModal[0].disabled = true;

                //-----Btns Buscar en BBDD el Usuario Dueño de OT Pieza --------------
                const searchDuenoOtUserModal = document.getElementById('searchDuenoOtUserModal')

                async function cargarUsuarioDuenoOtModal(idPermiso) {
                    const permisos = {
                        'searchDuenoOtUserModal': {
                            permisoUsuario: 'fabricacion',
                            tituloSeguimiento: 'Dueño de Pieza',
                            inputTarget: 'duenoOt'
                        }
                    };
                    
                    const { permisoUsuario, tituloSeguimiento, inputTarget } = permisos[idPermiso] || {};
                
                    if (!permisoUsuario || !tituloSeguimiento || !inputTarget) {
                        throw new Error(`Permiso no encontrado para id:', ${idPermiso}`)
                    }
                
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        const url = `../../../api/usuarios/searchUsers/${userNameBanner}`
                        const response = await fetch(url, {
                            method: "GET",
                            headers: myHeaders,
                            mode: 'cors',
                            cache: 'default',
                        });
                        
                        if(!response.ok ){
                            throw new Error(`Error en la solicitud`);
                        }

                        const users = await response.json();
                        const arrayUsuariosEspecificos = [], arrayUsersAll = [];
                        
                        if (users && users.length > 0) {
                            users.forEach((user, i) => {
                                const userHTML = `
                                    <label>
                                        <span id="${user._id}" class="badge rounded-pill ${user.permiso === `${permisoUsuario}` ? 'bg-info' : 'bg-light'} text-dark my-2">
                                            <input id="${i}" class="form-check-input mb-1" type="radio"
                                                name="radioUsuarios" value="${user.legajoId}, ${user.name}, ${user.lastName}">
                                                #${user.legajoId}-${user.name} ${user.lastName}
                                        </span>
                                    </label>`;
                                
                                if (user.status) {
                                    user.permiso === `${permisoUsuario}` ? arrayUsuariosEspecificos.push(userHTML) : arrayUsersAll.push(userHTML);
                                }    
                            });
                            
                            const html = `<hr>
                                        <label>${tituloSeguimiento}</label>
                                        <div name='container' class="container">
                                            ${arrayUsuariosEspecificos.join(' ')}
                                        </div>
                                        <hr>
                                        <label>Usuarios</label>
                                        <div name='container' class="container">
                                            ${arrayUsersAll.join(' ')}
                                        </div>
                                        <hr>`;

                            Swal.fire({
                                title: tituloSeguimiento,
                                html: html,
                                width: 450,
                                background: "#eee",
                                allowOutsideClick: false,
                                showCloseButton: true,
                                focusConfirm: false,
                                confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>',
                                didOpen: () => {
                                    const btnAceptar = document.querySelector('.swal2-confirm');
                                    btnAceptar.setAttribute('id', 'btnAceptarModal');
                                    btnAceptar.style.cursor = "not-allowed";
                                    btnAceptar.disabled = true;

                                    const radios = document.getElementsByName('radioUsuarios');
                                    radios.forEach((radio) => {
                                        radio.addEventListener('change', () => {
                                            btnAceptar.style.cursor = "pointer";
                                            btnAceptar.disabled = false;
                                        });
                                    });
                                }
                                
                            }).then((result) => {
                                const radioSelected = document.querySelector('input[name="radioUsuarios"]:checked') 
                                if (result.isConfirmed && radioSelected) {
                                    if (idPermiso==='searchDuenoOtUserModal') {
                                        otDueno = radioSelected.value
                                        flag = true
                                    }
                                    // Al cerrar el segundo modal, reabrir el primer modal
                                    messageUpdateDuenoOt(idProjectSelected, ociKNumber, otNumber, otKNumber, opNumber, statusOt, otDescription, otDueno, imageOci, ociAlias, ociDescription, flag);

                                } else {
                                    const titulo = 'Usuario no seleccionado'
                                    const message = 'No ha seleccionado ningún usuario!'
                                    const icon = 'warning'
                                    messageAlertUser(titulo, message, icon)
                                    flag = false
                                    // Al cerrar el segundo modal, reabrir el primer modal
                                    setTimeout(() => {
                                        messageUpdateDuenoOt(idProjectSelected, ociKNumber, otNumber, otKNumber, opNumber, statusOt, otDescription, otDueno, imageOci, ociAlias, ociDescription, flag);
                                    }, 300)
                                }
                            });
                            
                        } else {
                            throw new Error(`No hay usuarios que seleccionar`);
                        }
                
                    } catch (error) {
                        const titulo = 'Error'
                        const message = `${error}`
                        const icon = 'error'
                        messageAlertUser(titulo, message, icon)
                    }
                }

                searchDuenoOtUserModal.addEventListener('click', async (event) => {
                    // Ocultar temporalmente el primer modal
                    Swal.close();

                    let idPermiso = searchDuenoOtUserModal.id
                    event.preventDefault();

                    try {
                        await cargarUsuarioDuenoOtModal(idPermiso);

                    } catch (error) {
                        const titulo = 'Error al cargar los usuarios'
                        const message = error
                        const icon = 'error'
                        messageAlertUser(titulo, message, icon)
                    }
                });

                if (initialFlag) {
                    btnAceptarPrimerModal = document.getElementById('btnAceptarModal');
                    btnAceptarPrimerModal.style.cursor = "pointer";
                    btnAceptarPrimerModal.disabled = false;
                }
            }
            
        }).then((result) => {
            if (result.isConfirmed) {
                if (otNumber) {
                    document.getElementById(`duenoOt`).removeAttribute('disabled')
                }
                document.getElementById(`formUpdateDuenoOt${idProjectSelected}`).submit()
                setTimeout(() => {
                    Toast.fire({
                        icon: 'success',
                        title: `El Dueño de pieza <b>${ociDescription}</b>, ${otDueno}, se asignó con éxito!`
                    })
                }, 1000)

            } else if (result.dismiss === 'cancel') {
                Swal.fire(
                    'Dueño Pieza no modificado!',
                    `El dueño de pieza <b>${ociDescription}</b>, no se asignó!`,
                    'warning'
                )
                return false
            }
        })
        disabledBtnAceptar(ociDescription)

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `El dueño de Pieza <b>${ociDescription}</b>, no se actualizó correctamente!`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            let key = event.key;
            let forbiddenChars = /[#"$%?¡¿^/()=!'~`\\*{}\[\]<>@]/;

            if (forbiddenChars.test(key)) {
                event.preventDefault()
                input.classList.add("border", "border-danger", "border-2")

            } else {
                input.classList.remove("border", "border-danger", "border-2")
            }
        })
    })
}

function updateBtnCheckSelecMasive(idOci) {     
    const spanIds = [
        `spanCheckSelecMasive`, `spanCheckSelecMasiveArmado`, `spanCheckSelecMasiveEtapaPrima`, `spanCheckSelecMasiveEtapaSegPrima`,
        `spanCheckSelecMasiveEtapaSegSeg`, `spanCheckSelecMasiveEtapaTerPrima`, `spanCheckSelecMasiveAnalCrit`, `spanCheckSelecMasiveEtapaTerSeg`, 
        `spanCheckSelecMasiveCicCorPrima`, `spanCheckSelecMasiveCicCorSeg`, `spanCheckSelecMasiveCicCorTer`, `spanCheckSelecMasiveLibBuyOffPrima`,
        `spanCheckSelecMasiveLibBuyOffSeg`, `spanCheckSelecMasiveBuyOff`, `spanCheckSelecMasivePendFinales`
    ];

    const spans = spanIds.map(id => document.getElementById(`${id}${idOci}`));
    const btnMasive = document.getElementById(`btnCheckSelecMasive${idOci}`);
    // console.log('btnMasive: ', btnMasive)
    const btnSelectAll = document.getElementById(`btnCheckSelectionAll${idOci}`);

    const cantidadSeleccionados = document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:checked`).length;
    const cantidadTotalXTabla = document.querySelectorAll(`#tablaGeneral${idOci} input[name="checkSelect"]:not(:disabled)`).length;

    // Función para actualizar el estado de los spans
    const updateSpans = (value) => {
        spans.forEach(span => span.innerText = value);
    };

    // Condiciones para actualizar los botones
    if (cantidadSeleccionados > 0) {
        if (cantidadSeleccionados === cantidadTotalXTabla) {
            btnSelectAll.title = 'Des-Seleccionar todas las OT';
            btnSelectAll.classList.replace("btn-primary", "btn-danger");
            btnSelectAll.value = 1;

        } else {
            btnSelectAll.title = 'Seleccionar todas las OT';
            btnSelectAll.classList.replace("btn-danger", "btn-primary");
            btnSelectAll.value = 0;
        }

        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (${cantidadSeleccionados}/${cantidadTotalXTabla})`;
        updateSpans(cantidadSeleccionados);
    
    } else {
        btnSelectAll.title = 'Seleccionar todas las OT';
        btnSelectAll.classList.replace("btn-danger", "btn-primary");
        btnSelectAll.value = 0;

        btnMasive.innerHTML = `<i class="fa-solid fa-list-check"></i> Mod. multiple (0)`;
        updateSpans(0);
    }
}

arrayBtnUpdateDuenoOt.forEach(function(elemento) {
    if (elemento.id) {
        elemento.addEventListener('click', (event) => {
            event.preventDefault()
            const elementoId = elemento.id
            let regex = /^btnEditDuenoOt/;

            // Eliminar el texto inicial de la cadena
            let idOtOci = elementoId.replace(regex, '')
            const arrayOciOtSelected = idOtOci.split('_')
            
            const idProjectSelected = document.getElementById('projectIdHidden').value
            const ociKNumber = parseInt(arrayOciOtSelected[0])
            const otNumber = parseInt(document.getElementById(`lastOtNumber${idOtOci}`).textContent)
            const otKNumber = parseInt(arrayOciOtSelected[1])       
            const opNumber = parseInt(document.getElementById(`lastOpNumber${idOtOci}`).textContent)
            const statusOt = document.getElementById(`lastOtStatus${idOtOci}`).textContent
            const otDescription = document.getElementById(`lastOpDescription${idOtOci}`).textContent
            const otDueno =  document.getElementById(`ociDueno${ociKNumber}`).textContent
            const ociImage = document.getElementById(`imageOciHeader${ociKNumber}`).src
            const ociAlias =  document.getElementById(`ociAlias${parseInt(arrayOciOtSelected[0])}`).textContent
            const ociDescription =  document.getElementById(`ociDescription${parseInt(arrayOciOtSelected[0])}`).textContent
            let flag = false

            messageUpdateDuenoOt(
                idProjectSelected,
                ociKNumber,
                otNumber,
                otKNumber,
                opNumber,
                cleanString(statusOt),
                cleanString(otDescription),
                cleanString(otDueno),
                ociImage,
                ociAlias,
                ociDescription,
                flag
            )
        })
    }
})

arrayCheckBoxSelect.forEach(function(element) {
    element.checked = ''
    element.addEventListener('change', (event) => {
        event.preventDefault()
        const idOtOci = (event.target.id).slice(11)
        
        let rowSelectCheck = []
        document.getElementsByName(`rowSelected${idOtOci}`) ? 
            rowSelectCheck = Array.from(document.getElementsByName(`rowSelected${idOtOci}`)) : null

        let idOci = extractNumbers(element.id)[0]
        //let idOt = extractNumbers(element.id)[1]

        updateBtnCheckSelecMasive(idOci)

        for (let q=0; q<rowSelectCheck.length; q++) {
            rowSelectCheck[q] && rowSelectCheck[q].style.cssText === "height: 7vh;" ? 
                rowSelectCheck[q].setAttribute('style', "height: 7vh; background-color: #c4f0fd;")
            :
                rowSelectCheck[q].setAttribute('style', "height: 7vh;")
        }
    })
})

arrayBtnCheckSelectionAll.forEach(element => {
    let seleccionados = false, seleccionarFilas = false;

    if (element) {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const idOci = parseInt(element.id.slice(20));
            const checkboxes = Array.from(document.querySelectorAll(`#tablaGeneral${idOci} tbody input[type="checkbox"]`));
            const spanIds = [
                `spanCheckSelecMasive`, `spanCheckSelecMasiveArmado`, `spanCheckSelecMasiveEtapaPrima`, `spanCheckSelecMasiveEtapaSegPrima`,
                `spanCheckSelecMasiveEtapaSegSeg`, `spanCheckSelecMasiveEtapaTerPrima`, `spanCheckSelecMasiveAnalCrit`, `spanCheckSelecMasiveEtapaTerSeg`, 
                `spanCheckSelecMasiveCicCorPrima`, `spanCheckSelecMasiveCicCorSeg`, `spanCheckSelecMasiveCicCorTer`, `spanCheckSelecMasiveLibBuyOffPrima`,
                `spanCheckSelecMasiveLibBuyOffSeg`, `spanCheckSelecMasiveBuyOff`, `spanCheckSelecMasivePendFinales`
            ];
            const spans = spanIds.map(id => document.getElementById(`${id}${idOci}`));

            let arrQueryRows = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.id) {
                    const idOciOt = checkbox.id.slice(11);
                    const rowsSelectCheck = document.getElementsByName(`rowSelected${idOciOt}`);
                    const statusOt = document.getElementById(`lastOtStatus${idOciOt}`);

                    if (rowsSelectCheck && statusOt.innerText === 'Activo') {
                        arrQueryRows.push(rowsSelectCheck);
                    }
                }
            });

            const toggleFilas = () => {
                arrQueryRows.forEach(nodeList => {
                    Array.from(nodeList).forEach(row => {
                        row.style = seleccionarFilas ? "height: 7vh;" : "height: 7vh; background-color: rgb(196, 240, 253);";
                    });
                });
                seleccionarFilas = !seleccionarFilas;
            };

            const toggleCheckboxes = () => {
                checkboxes.forEach(checkbox => {
                    if (!checkbox.disabled) {
                        checkbox.checked = !seleccionados;
                    }
                });
                seleccionados = !seleccionados;
            };

            const updateSpans = value => {
                spans.forEach(span => {
                    span.innerText = value;
                });
            };

            toggleFilas();
            toggleCheckboxes();

            if (element.classList.contains('btn-primary')) {
                element.classList.replace("btn-primary", "btn-danger");
                element.value = 1;
                element.title = 'Des-Seleccionar todos los ítems';
                updateSpans(arrQueryRows.length);

            } else {
                element.classList.replace("btn-danger", "btn-primary");
                element.title = 'Seleccionar todas las OT';
                updateSpans(0);
            }

            element.value == 0 ? updateSpans(0) : updateSpans(arrQueryRows.length);

            updateBtnCheckSelecMasive(idOci);
        });
    }
});


//-----Btns Buscar en BBDD el Usuario Dieño de Pieza --------------
const userNameBanner = document.getElementById('userNameBanner').innerText

function messageAlertUser(titulo, message, icon){
    Swal.fire(
        titulo, 
        message, 
        icon);
    return false
}


async function cargarUsuarioDuenoOt(idPermiso) {
    const permisos = {
        'searchDuenoOtUser': {
            permisoUsuario: 'fabricacion',
            tituloSeguimiento: 'Dueño de Pieza',
            inputTarget: `duenoOt`
        },
        'searchDuenoOtModal': {
            permisoUsuario: 'fabricacion',
            tituloSeguimiento: 'Dueño de Pieza',
            inputTarget: `duenoOt`
        }
    };
    
    const { permisoUsuario, tituloSeguimiento, inputTarget } = permisos[idPermiso] || {};

    if (!permisoUsuario || !tituloSeguimiento || !inputTarget) {
        throw new Error(`Permiso no encontrado para id:', ${idPermiso}`)
    }

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const url = `../../../api/usuarios/searchUsers/${userNameBanner}`
        const response = await fetch(url, {
            method: "GET",
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        });
        
        if(!response.ok ){
            throw new Error(`Error en la solicitud`);
        }

        const users = await response.json();
        const arrayUsuariosEspecificos = [], arrayUsersAll = [];

        if (users && users.length > 0) {
            users.forEach((user, i) => {
                const userHTML = `
                    <label>
                        <span id="${user._id}" class="badge rounded-pill ${user.permiso === `${permisoUsuario}` ? 'bg-info' : 'bg-light'} text-dark my-2">
                            <input id="${i}" class="form-check-input mb-1" type="radio" name="radioUsuarios" value="${user.legajoId}, ${user.name}, ${user.lastName}">
                            #${user.legajoId}-${user.name} ${user.lastName}
                        </span>
                    </label>`;

                if (user.status) {
                    user.permiso === `${permisoUsuario}` ? arrayUsuariosEspecificos.push(userHTML) : arrayUsersAll.push(userHTML);
                }    
            });

            const html = `
                <hr>
                <label>${tituloSeguimiento}</label>
                <div name='container' class="container">
                    ${arrayUsuariosEspecificos.join(' ')}
                </div>
                <hr>
                <label>Usuarios</label>
                <div name='container' class="container">
                    ${arrayUsersAll.join(' ')}
                </div>
                <hr>`;

            Swal.fire({
                title: tituloSeguimiento,
                html: html,
                width: 450,
                background: "#eee",
                allowOutsideClick: false,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Seleccionar <i class="fa-regular fa-circle-check"></i>',
                didOpen: () => {
                    const btnAceptar = document.querySelector('.swal2-confirm');
                    btnAceptar.setAttribute('id', 'btnAceptarModal');
                    btnAceptar.style.cursor = "not-allowed";
                    btnAceptar.disabled = true;

                    const radios = document.getElementsByName('radioUsuarios');
                    radios.forEach((radio) => {
                        radio.addEventListener('change', () => {
                            btnAceptar.style.cursor = "pointer";
                            btnAceptar.disabled = false;
                        });
                    });
                }

            }).then((result) => {
                const radioSelected = document.querySelector('input[name="radioUsuarios"]:checked');
                if (result.isConfirmed && radioSelected) {
                    const inputUserSelected = document.getElementById(`${inputTarget}`);
                    inputUserSelected.value = radioSelected.value;
                    disabledBtnAceptar()

                } else {
                    const titulo = 'Usuario no seleccionado'
                    const message = 'No ha seleccionado ningún usuario!'
                    const icon = 'warning'
                    messageAlertUser(titulo, message, icon)
                }
            });

        } else {
            throw new Error(`No hay usuarios que seleccionar`);
        }

    } catch (error) {
        const titulo = 'Error'
        const message = `${error}`
        const icon = 'error'
        messageAlertUser(titulo, message, icon)
    }
    disabledBtnAceptar()
}

arrayBtnSearchDuenoOtUser.forEach(function(element) {
    if (element) {
        element.addEventListener('click', async (event) => {
            let idPermiso = (element.id).replace(/\d+$/, '');
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            try {
                await cargarUsuarioDuenoOt(idPermiso);

            } catch (error) {
                const titulo = 'Error al cargar los usuarios'
                const message = error
                const icon = 'error'
                messageAlertUser(titulo, message, icon)
            }
        }, { once: true });
    }
});
//-----End Btns Buscar en BBDD el Usuario Dueño de Pieza -----------


function messageNewDuenoOt(ociNumber, duenoOt) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    });

    const confirmMessage = `Asignar dueño de pieza Leg.#${duenoOt} a la OCI#${ociNumber} ?`;
    const successMessage = `Se asignó dueño de pieza Leg.#${duenoOt} con éxito!`;
    const errorMessage = `Dueño de pieza no asignado a la OCI# ${ociNumber}`;

    Swal.fire({
        title: 'Asignar Dueño Pieza?',
        position: 'center',
        text: confirmMessage,
        icon: 'info',
        showCancelButton: true,
        showConfirmButton: true

    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById(`duenoOt`).removeAttribute('disabled')
            document.getElementById('formNewDuenoOt').submit();
            Toast.fire({
                icon: 'success',
                title: successMessage
            });

        } else {
            Swal.fire(
                'Dueño de pieza no asignado!',
                errorMessage,
                'warning'
            );
        }
    });
}

const btnCreateNewOtOwner = document.getElementById('btnNewDuenoOt')
btnCreateNewOtOwner.addEventListener('click', (event) => {
    event.preventDefault()
    let ociNumberHiddenValue = parseInt(document.getElementById('ociNumberHidden').value)
    let duenoOt = document.getElementById('duenoOt').value
    
    if (ociNumberHiddenValue && duenoOt) {
        messageNewDuenoOt(ociNumberHiddenValue, duenoOt)

    } else {
        Swal.fire({
            title: 'Error',
            position: 'center',
            timer: 3500,
            text: `Hubo un error al seleccionar el dueño de Pieza !`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,
        })
    }
})

//---------- Obtiene la lista de OT ------------
function getOtList(i) {
    const parentDiv = document.getElementById(`tablaGeneral${i}`)
    const tableBody = parentDiv.lastElementChild
    const lastChild = parseInt(tableBody.childElementCount)
    const k = i

    // Función auxiliar para obtener el texto de un elemento si existe
    const getElementText = id => document.getElementById(id)?.innerText || null;

    // Arrays para almacenar los datos
    let arrayOtNumber = [], arrayOpNumber = [], arrayOtStatus = [], arrayDescripcionOt = [],
        arrayOnumber = [], arrayNnumber = [], arraySelectedCheck = [];
    
    // Configuración de mapeo de IDs a arrays
    const mappings = [
        { prefix: 'lastOtNumber', array: arrayOtNumber, isOt: true  },
        { prefix: 'lastOpNumber', array: arrayOpNumber },
        { prefix: 'lastOtStatus', array: arrayOtStatus },
        { prefix: 'lastOpDescription', array: arrayDescripcionOt }
    ];

    for (let n=0; n < lastChild; n++) {
        mappings.forEach(({ prefix, array, isOt }) => {
            const id = `${prefix}${k}_${n}`;
            const text = getElementText(id);
            const checkId = `checkSelect${k}_${n}`;
            const selectCheck = document.getElementById(checkId);

            selectCheck?.checked ? arraySelectedCheck.push(`${k}_${n}`) : null

            if (text) {
                array.push(text);
                arrayOnumber.push(`${k}_${n}`);
                if (isOt) arrayNnumber.push(`${n}`);
            }
        });
    }

    // Eliminar duplicados y vacíos
    const uniqueSelectedCheck = [...new Set(arraySelectedCheck)];
    const uniqueONumberSelect = [...new Set(arrayOnumber)];

    // Encontrar índices de los elementos seleccionados
    const indicesSelected = uniqueSelectedCheck.map(selected => uniqueONumberSelect.indexOf(selected)).filter(index => index !== -1);

    if (uniqueSelectedCheck.length > 0) { 
        return {
            arrayOtNumber,
            arrayOpNumber,
            arrayOtStatus,
            arrayDescripcionOt,
            arrayOnumber,
            arrayNnumber,
            lastChild: uniqueSelectedCheck.length,
            arraySelectedCheck: uniqueSelectedCheck,
            indicesSelected,
            arrayONumberSelect: uniqueONumberSelect
        };

    } else {
        Swal.fire({
            title: `OT no seleccionada`,
            html: 'Debe seleccionar al menos una OT!',
            icon: 'warning',
            width: 400
        });
        return false;
    }
}

//---------- Obtiene los valores de la lista de OT ------------
function getOtListValues(i, idTabla, qInicial, qFinal) {
    const parentDiv = document.getElementById(idTabla);
    const tableBody = parentDiv.lastElementChild;
    const lastChild = parseInt(tableBody.childElementCount);

    const qInicialX = parseInt(qInicial);
    const qFinalX = parseInt(qFinal);
    let k = i;
    
    const arrays = {
        arrayArmadoMaquina: [], arrayRevisionArmadoMaquina: [],
        arrayPatronizado: [], arrayRevisionPatronizado: [],
        arrayLthArmado: [], arrayRevisionLthArmado: [],
        arrayArmadoPrensa: [], arrayRevisionArmadoPrensa: [],
        arrayGuiados: [], arrayRevisionGuiados: [],
        arrayCentradoLuzCorte: [], arrayRevisionCentradoLuzCorte: [],
        arrayCentradoLevas: [], arrayRevisionCentradoLevas: [],
        arrayLthEtapaPrimera: [], arrayRevisionLthEtapaPrimera: [],
        arrayAzulados: [], arrayRevisionAzulados: [],
        arrayTachoAjuste: [], arrayRevisionTachoAjuste: [],
        arrayAjusteFondo: [], arrayRevisionAjusteFondo: [],
        arrayAzuladoAceros: [], arrayRevisionAzuladoAceros: [],
        arrayLthEtapaSegunda: [], arrayRevisionLthEtapaSegunda: [],
        arrayEstatico: [], arrayRevisionEstatico: [],
        arrayDinamico: [], arrayRevisionDinamico: [],
        arrayLocalizacionFuncional: [], arrayRevisionLocalizacionFuncional: [],
        arrayObtencionPieza: [], arrayRevisionObtencionPieza: [],
        arrayAzuladoFuncional: [], arrayRevisionAzuladoFuncional: [],
        arrayFuncionalCompleta: [], arrayRevisionFuncionalCompleta: [],
        arrayLthEtapaTercera: [], arrayRevisionLthEtapaTercera: [],
        arrayLiberarPiezaMetrologia: [], arrayRevisionLiberarPiezaMetrologia: [],
        arrayPiezaMedidaReunionPrimera: [], arrayRevisionPiezaMedidaReunionPrimera: [],
        arrayMaquinaPrimera: [], arrayRevisionMaquinaPrimera: [],
        arrayAjustePrimera: [], arrayRevisionAjustePrimera: [],
        arrayPiezaMedidaReunionSegunda: [], arrayRevisionPiezaMedidaReunionSegunda: [],
        arrayMaquinaSegunda: [], arrayRevisionMaquinaSegunda: [],
        arrayAjusteSegunda: [], arrayRevisionAjusteSegunda: [],
        arrayPiezaMedidaReunionTercera: [], arrayRevisionPiezaMedidaReunionTercera: [],
        arrayMaquinaTercera: [], arrayRevisionMaquinaTercera: [],
        arrayAjusteTercera: [], arrayRevisionAjusteTercera: [],
        arrayAzuladosFondoPieza: [], arrayRevisionAzuladosFondoPieza: [],
        arrayRoces: [], arrayRevisionRoces: [],
        arrayAzuladoGuias: [], arrayRevisionAzuladoGuias: [],
        arrayRebabas: [], arrayRevisionRebabas: [],
        arrayCaidasScrap: [], arrayRevisionCaidasScrap: [],
        arrayAspecto: [], arrayRevisionAspecto: [],
        arrayBuyOffEstatico: [], arrayRevisionBuyOffEstatico: [],
        arrayBuyOffDinamico: [], arrayRevisionBuyOffDinamico: [],
        arrayPendientesMaquina: [], arrayRevisionPendientesMaquina: [],
        arrayPendientesAjuste: [], arrayRevisionPendientesAjuste: [],
        arrayNotasAjuste: [], arrayRevisionNotasAjuste: []
    };
    
    const mapping = {
        0: ['arrayArmadoMaquina', 'arrayRevisionArmadoMaquina'],
        1: ['arrayPatronizado', 'arrayRevisionPatronizado'],
        2: ['arrayLthArmado', 'arrayRevisionLthArmado'],
        3: ['arrayArmadoPrensa', 'arrayRevisionArmadoPrensa'],
        4: ['arrayGuiados', 'arrayRevisionGuiados'],
        5: ['arrayCentradoLuzCorte', 'arrayRevisionCentradoLuzCorte'],
        6: ['arrayCentradoLevas', 'arrayRevisionCentradoLevas'],
        7: ['arrayLthEtapaPrimera', 'arrayRevisionLthEtapaPrimera'],
        8: ['arrayAzulados', 'arrayRevisionAzulados'],
        9: ['arrayTachoAjuste', 'arrayRevisionTachoAjuste'],
        10: ['arrayAjusteFondo', 'arrayRevisionAjusteFondo'],
        11: ['arrayAzuladoAceros', 'arrayRevisionAzuladoAceros'],
        12: ['arrayLthEtapaSegunda', 'arrayRevisionLthEtapaSegunda'],
        13: ['arrayEstatico', 'arrayRevisionEstatico'],
        14: ['arrayDinamico', 'arrayRevisionDinamico'],
        15: ['arrayLocalizacionFuncional', 'arrayRevisionLocalizacionFuncional'],
        16: ['arrayObtencionPieza', 'arrayRevisionObtencionPieza'],
        17: ['arrayAzuladoFuncional', 'arrayRevisionAzuladoFuncional'],
        18: ['arrayFuncionalCompleta', 'arrayRevisionFuncionalCompleta'],
        19: ['arrayLthEtapaTercera', 'arrayRevisionLthEtapaTercera'],
        20: ['arrayLiberarPiezaMetrologia', 'arrayRevisionLiberarPiezaMetrologia'],
        21: ['arrayPiezaMedidaReunionPrimera', 'arrayRevisionPiezaMedidaReunionPrimera'],
        22: ['arrayMaquinaPrimera', 'arrayRevisionMaquinaPrimera'],
        23: ['arrayAjustePrimera', 'arrayRevisionAjustePrimera'],
        24: ['arrayPiezaMedidaReunionSegunda', 'arrayRevisionPiezaMedidaReunionSegunda'],
        25: ['arrayMaquinaSegunda', 'arrayRevisionMaquinaSegunda'],
        26: ['arrayAjusteSegunda', 'arrayRevisionAjusteSegunda'],
        27: ['arrayPiezaMedidaReunionTercera', 'arrayRevisionPiezaMedidaReunionTercera'],
        28: ['arrayMaquinaTercera', 'arrayRevisionMaquinaTercera'],
        29: ['arrayAjusteTercera', 'arrayRevisionAjusteTercera'],
        30: ['arrayAzuladosFondoPieza', 'arrayRevisionAzuladosFondoPieza'],
        31: ['arrayRoces', 'arrayRevisionRoces'],
        32: ['arrayAzuladoGuias', 'arrayRevisionAzuladoGuias'],
        33: ['arrayRebabas', 'arrayRevisionRebabas'],
        34: ['arrayCaidasScrap', 'arrayRevisionCaidasScrap'],
        35: ['arrayAspecto', 'arrayRevisionAspecto'],
        36: ['arrayBuyOffEstatico', 'arrayRevisionBuyOffEstatico'],
        37: ['arrayBuyOffDinamico', 'arrayRevisionBuyOffDinamico'],
        38: ['arrayPendientesMaquina', 'arrayRevisionPendientesMaquina'],
        39: ['arrayPendientesAjuste', 'arrayRevisionPendientesAjuste'],
        40: ['arrayNotasAjuste', 'arrayRevisionNotasAjuste']
    };

    for (let n = 0; n < lastChild; n++) {
        for (let q = qInicialX; q < qFinalX; q++) {
            let otHidden = '', otRevisionHidden = '';
            if(document.getElementById(`resHidden${k}_${n}_${q}`)) {
                otHidden = document.getElementById(`resHidden${k}_${n}_${q}`).value;
                otRevisionHidden = document.getElementById(`resRevisionHidden${k}_${n}_${q}`).value;
                
                var otRevision = otRevisionHidden.split(",").pop();
                var otInfo = changeValueFromArray(otHidden.split(",")).pop();
            }

            const [infoKey, revisionKey] = mapping[q] || [];
            if (infoKey && revisionKey && otHidden && otRevision) {
                arrays[infoKey].push(otInfo);
                arrays[revisionKey].push(otRevision);
            }
        }
    }

    const resultMap = {
        4: ['arrayArmadoMaquina', 'arrayRevisionArmadoMaquina', 'arrayPatronizado', 'arrayRevisionPatronizado','arrayLthArmado', 'arrayRevisionLthArmado', 'arrayArmadoPrensa', 'arrayRevisionArmadoPrensa'],
        8: ['arrayGuiados', 'arrayRevisionGuiados', 'arrayCentradoLuzCorte', 'arrayRevisionCentradoLuzCorte', 'arrayCentradoLevas', 'arrayRevisionCentradoLevas', 'arrayLthEtapaPrimera', 'arrayRevisionLthEtapaPrimera'],
        11: ['arrayAzulados', 'arrayRevisionAzulados', 'arrayTachoAjuste', 'arrayRevisionTachoAjuste', 'arrayAjusteFondo', 'arrayRevisionAjusteFondo'],
        13: ['arrayAzuladoAceros', 'arrayRevisionAzuladoAceros', 'arrayLthEtapaSegunda', 'arrayRevisionLthEtapaSegunda'],
        15: ['arrayEstatico', 'arrayRevisionEstatico', 'arrayDinamico', 'arrayRevisionDinamico'],
        18: ['arrayLocalizacionFuncional', 'arrayRevisionLocalizacionFuncional','arrayObtencionPieza', 'arrayRevisionObtencionPieza', 'arrayAzuladoFuncional', 'arrayRevisionAzuladoFuncional'],
        21: ['arrayFuncionalCompleta', 'arrayRevisionFuncionalCompleta', 'arrayLthEtapaTercera', 'arrayRevisionLthEtapaTercera', 'arrayLiberarPiezaMetrologia', 'arrayRevisionLiberarPiezaMetrologia'],
        24: ['arrayPiezaMedidaReunionPrimera', 'arrayRevisionPiezaMedidaReunionPrimera', 'arrayMaquinaPrimera', 'arrayRevisionMaquinaPrimera', 'arrayAjustePrimera', 'arrayRevisionAjustePrimera'],
        27: ['arrayPiezaMedidaReunionSegunda', 'arrayRevisionPiezaMedidaReunionSegunda', 'arrayMaquinaSegunda', 'arrayRevisionMaquinaSegunda', 'arrayAjusteSegunda', 'arrayRevisionAjusteSegunda'],
        30: ['arrayPiezaMedidaReunionTercera', 'arrayRevisionPiezaMedidaReunionTercera', 'arrayMaquinaTercera', 'arrayRevisionMaquinaTercera', 'arrayAjusteTercera', 'arrayRevisionAjusteTercera'],
        33: ['arrayAzuladosFondoPieza', 'arrayRevisionAzuladosFondoPieza', 'arrayRoces', 'arrayRevisionRoces', 'arrayAzuladoGuias', 'arrayRevisionAzuladoGuias'],
        36: ['arrayRebabas', 'arrayRevisionRebabas', 'arrayCaidasScrap', 'arrayRevisionCaidasScrap', 'arrayAspecto', 'arrayRevisionAspecto'],
        38: ['arrayBuyOffEstatico', 'arrayRevisionBuyOffEstatico', 'arrayBuyOffDinamico', 'arrayRevisionBuyOffDinamico'],
        41: ['arrayPendientesMaquina', 'arrayRevisionPendientesMaquina', 'arrayPendientesAjuste', 'arrayRevisionPendientesAjuste', 'arrayNotasAjuste', 'arrayRevisionNotasAjuste']
    };

    const keysToReturn = resultMap[qFinalX] || [];
    const result = {};
    keysToReturn.forEach(key => result[key] = arrays[key]);

    return result;
}

function changeValueFromArray(arrayFromValues) {
    const valueMap = {
        '': 'S/D',
        'sinDato': 'S/D',
        'noAplica': 'N/A',
        'terminado': 'Terminado',
        'enProceso': 'En Proceso',
        'detenido': 'Detenido'
    };

    return arrayFromValues.map(value => valueMap[value] || value);
}

function colorStatusOt(valorStatusOt) {
    let disabled = 'required', color = ''
    valorStatusOt==='Activo' ? color = 'success' : color = 'danger'

    return {
        color,
        disabled
    }
}

// ------------- Estado selected -------------------
function estadoSelect(option) {
    const options = {
        enProceso: `
            <option value="terminado">Terminado</option>
            <option value="suspendido">Suspendido</option>
            <option value="noAplica">N/A</option>
        `,
        terminado: `
            <option value="enProceso">En Proceso</option>
            <option value="suspendido">Suspendido</option>
            <option value="noAplica">N/A</option>
        `,
        suspendido: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="noAplica">N/A</option>
        `,
        noAplica: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="suspendido">Suspendido</option>
        `,
        default: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="suspendido">Suspendido</option>
            <option value="noAplica">N/A</option>
        `
    };

    return options[option] || options.default;
}

function optionSelect(option) {
    const options = {
        terminado: `
            <option value="enProceso">En Proceso</option>
            <option value="detenido">Detenido</option>
            <option value="noAplica">N/A</option>
        `,
        detenido: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="noAplica">N/A</option>
        `,
        enProceso: `
            <option value="terminado">Terminado</option>
            <option value="detenido">Detenido</option>
            <option value="noAplica">N/A</option>
        `,
        noAplica: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="detenido">Detenido</option>
        `,
        sinDato: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="detenido">Detenido</option>
            <option value="noAplica">N/A</option>
        `,
        default: `
            <option value="terminado">Terminado</option>
            <option value="enProceso">En Proceso</option>
            <option value="detenido">Detenido</option>
            <option value="noAplica">N/A</option>
        `
    };

    return options[option] || options.default;
}

function switchOptionSelected(switchValue) {
    const optionsMap = {
        "Terminado": { variableValue: 'terminado', optionKey: 'optionProdismo', getValueArrayDato: 'Terminado' },
        "En Proceso": { variableValue: 'enProceso', optionKey: 'optionEnProceso', getValueArrayDato: 'En Proceso' },
        "Detenido": { variableValue: 'detenido', optionKey: 'optionChina', getValueArrayDato: 'Detenido' },
        "N/A": { variableValue: 'noAplica', optionKey: 'optionNoAplica', getValueArrayDato: 'N/A' },
        "S/D": { variableValue: 'sinDato', optionKey: 'optionDefault', getValueArrayDato: 'S/D', getValueArrayRevision: 0 },
        "": { variableValue: 'sinDato', optionKey: 'optionDefault', getValueArrayDato: 'S/D', getValueArrayRevision: 0 }
    };

    // Configuración predeterminada si switchValue no coincide con ninguna clave
    const defaultOption = { variableValue: 'sinDato', optionKey: 'optionDefault', getValueArrayDato: 'S/D', getValueArrayRevision: 0 };

    // Selecciona la opción adecuada o la opción predeterminada
    const selectedOption = optionsMap[switchValue] || defaultOption;

    // Obtiene la opción definida llamando a optionSelect  
    const optionDefined = optionSelect(selectedOption.variableValue);

    return {
        variableValue: selectedOption.variableValue,
        optionDefined,
        getValueArrayDato: selectedOption.getValueArrayDato,
        getValueArrayRevision: selectedOption.getValueArrayRevision
    };
}

const cabeceraFormulario = `<div class="col-2 my-auto align-self-middle" style="width: 5rem;">
                                <label for="otStatus"><strong>OT Status</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-middle">
                                <label for="otNumber"><strong>OT#</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-middle">
                                <label for="opNumber"><strong>OP#</strong></label>
                            </div>
                            <div class="col-1 my-auto align-self-middle">
                                <label for="otDescription"><strong>Descripción</strong></label>
                            </div>`

function datosCabeceraFormulario (
        arrayOtStatus, 
        y, 
        arrayOtNumber, 
        arrayOpNumber,
        arrayOnumber,
        arrayOtDescription
    ) {

    const datosCabecera = 
        `<div class="col-2 my-auto align-self-middle" style="width: 5rem;">
            <span id="${arrayOtStatus}" class="badge rounded-pill bg-${(colorStatusOt(arrayOtStatus).color)} text-white">${arrayOtStatus}</span>
            <input type="hidden" name="otStatusHidden${y}" value="${arrayOtStatus}">
        </div>
        <div class="col-1 my-auto align-self-middle">
            <span id="${arrayOtNumber}" class="badge rounded-pill bg-dark text-white">${arrayOtNumber}</span>
            <input type="hidden" name="otNumberHidden${y}" value="${arrayOtNumber}">
        </div>
        <div class="col-1 my-auto align-self-middle">
            <span class="badge rounded-pill bg-secondary text-white">${arrayOpNumber}</span>
        </div>
        <div class="col-1 my-auto align-self-middle overflow-ellipsis">
            <span class="text-dark">${arrayOtDescription}</span>
        </div>`

    return datosCabecera                    
}

function footerFormularioHidden (projectNumberId, clientId, i, arrayBloqueLength, arrayOtKNumber) {
    let footerFormulario = `<input type="hidden" name="projectIdHidden" value="${projectNumberId}">
                            <input type="hidden" name="clientIdHidden" value="${clientId}">
                            <input type="hidden" name="ociNumberK" value="${parseInt(i)}">
                            <input type="hidden" name="otNumberK" value="${arrayOtKNumber}">
                            <input type="hidden" name="otQuantity" value="${parseInt(arrayOtKNumber.length)}">`

    return footerFormulario                            
}

const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

function swalFireAlert(
    titulo,
    html,
    ancho,
    background,
    formulario,
    arrayDeOtNumber,
    arrayDeOpNumber,
    arrayDeOtDescription) {

    Swal.fire({
        title: titulo,
        html: html,
        width: parseInt(ancho),
        background: background,
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
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
        const resultadoElement = document.createElement('ul');
        
        arrayDeOtNumber.forEach((value, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('listItemDetailNumber')
            listItem.textContent = `OT #${arrayDeOtNumber[index]} - OP: ${arrayDeOpNumber[index]} - ${arrayDeOtDescription[index]}`;
            
            resultadoElement.appendChild(listItem);
            resultadoElement.classList.add('listDetailNum')
        })
        
        let htmlLista = resultadoElement.outerHTML;
        let outputOk = `La información ${titulo}, fue agregada a las Ot's: ${htmlLista}`
        let outputNok = `La información ${titulo}, no fue agregada a las Ot's: ${htmlLista}`

        if (result.isConfirmed) {
            const formValues = document.getElementById(formulario)
            formValues.submit()

            Toast.fire({
                title: `Información de OT/s #${arrayDeOtNumber.join(" - #")} agregada con éxito!`,
                html: outputOk,
                icon: 'success',
                width: 600
            })

        } else {
            Swal.fire({
                title: `Información <strong>${titulo}</strong>, no agregada!`,
                html: outputNok,
                icon: 'warning',
                width: 600
            })
            return false
        }
    })
}    
// -----------------------------------------------

//***** addDatoToArmado ******
function addDatoToOtArmado(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal, getOtList(i)) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueArmado = [], arrayOtSelected = [], arrayOtKNumber=[], arrayOtStatus = [], arrayOpSelected = [], arrayOpDescriptionSelected = [];

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected); // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpSelected.push(res.arrayOpNumber[y])
                arrayOpDescriptionSelected.push(res.arrayDescripcionOt[y])

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="armadoMaquina${res.arrayOtNumber[y]}" name="armadoMaquina${y}"
                            oninput="updateInputsSelect()" class="form-select" )}>
                            <option selected value="${(switchOptionSelected(getValues.arrayArmadoMaquina[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayArmadoMaquina[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayArmadoMaquina[y])).optionDefined}
                        </select>
                        <input type="hidden" id="armadoMaquinaHidden${res.arrayOtNumber[y]}"
                        name="armadoMaquinaHidden${[y]}" value="${(switchOptionSelected(getValues.arrayArmadoMaquina[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">    
                        <input type="text" value="${getValues.arrayRevisionArmadoMaquina[y]}" name="revisionArmadoMaquina${y}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionArmadoMaquina${res.arrayOtNumber[y]}"
                            name="revisionArmadoMaquina${y}" value="${getValues.arrayRevisionArmadoMaquina[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="patronizado${res.arrayOtNumber[y]}" name="patronizado${y}"
                            oninput="updateInputsSelect()" class="form-select" )}>
                            <option selected value="${(switchOptionSelected(getValues.arrayPatronizado[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayPatronizado[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayPatronizado[y])).optionDefined}
                        </select>
                        <input type="hidden" id="patronizadoHidden${res.arrayOtNumber[y]}"
                        name="patronizadoHidden${[y]}" value="${(switchOptionSelected(getValues.arrayPatronizado[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionPatronizado[y]}" name="revisionPatronizado${y}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionPatronizado${res.arrayOtNumber[y]}"
                            name="revisionPatronizado${y}" value="${getValues.arrayRevisionPatronizado[y]}">    
                    </div>

                    <div class="col my-auto">
                        <select id="lthArmado${res.arrayOtNumber[y]}" name="lthArmado${y}"
                            oninput="updateInputsSelect()" class="form-select" )}>
                            <option selected value="${(switchOptionSelected(getValues.arrayLthArmado[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayLthArmado[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayLthArmado[y])).optionDefined}
                        </select>
                        <input type="hidden" id="lthArmadoHidden${res.arrayOtNumber[y]}"
                            name="lthArmadoHidden${[y]}" value="${(switchOptionSelected(getValues.arrayLthArmado[y])).variableValue}">
                    </div>
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionLthArmado[y]}" name="revisionLthArmado${y}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionLthArmado${res.arrayOtNumber[y]}"
                            name="revisionLthArmado${y}" value="${getValues.arrayRevisionLthArmado[y]}">    
                    </div>

                    <div class="col my-auto">
                        <select id="armadoPrensa${res.arrayOtNumber[y]}" name="armadoPrensa${y}"
                            oninput="updateInputsSelect()" class="form-select" )}>
                            <option selected value="${(switchOptionSelected(getValues.arrayArmadoPrensa[y])).variableValue}" disabled>
                            ${(switchOptionSelected(getValues.arrayArmadoPrensa[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayArmadoPrensa[y])).optionDefined}
                        </select>
                        <input type="hidden" id="armadoPrensaHidden${res.arrayOtNumber[y]}"
                            name="armadoPrensaHidden${[y]}" value="${(switchOptionSelected(getValues.arrayArmadoPrensa[y])).variableValue}">
                    </div>    
                    <div class="col-1 my-auto" style="width: 4vw;">  
                        <input type="text" value="${getValues.arrayRevisionArmadoPrensa[y]}" name="revisionArmadoPrensa${y}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionArmadoPrensa${res.arrayOtNumber[y]}"
                            name="revisionArmadoPrensa${y}" value="${getValues.arrayRevisionArmadoPrensa[y]}">    
                    </div>`

                const isInactive = res.arrayOtStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none' : ''
                
                arrayBloqueArmado.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOnumber[y], res.arrayDescripcionOt[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueArmado.push(`<hr class="my-1">`) : null
            }
        });

        const html = `<form id="formArmadoValues" action="/api/programas/infoOtArmado/${projectNumberId}" method="post" style="font-size: 10pt">
                        <fieldset>
                            <div class="row mx-auto">
                                ${cabeceraFormulario}
                                <div class="col my-auto">
                                    <span><strong>Armado p/Máquina</strong></span>
                                </div>
                                <div class="col-1 my-auto align-self-start border-end border-dark" style="width: 4vw;">
                                    <span><strong>Rev</strong></span>
                                </div>
                                <div class="col my-auto">
                                    <span><strong>Patronizado</strong></span>
                                </div>
                                <div class="col-1 my-auto align-self-start border-end border-dark" style="width: 4vw;">
                                    <span><strong>Rev</strong></span>
                                </div>
                                <div class="col my-auto">
                                    <span><strong>LTH</strong></span>
                                </div>
                                <div class="col-1 my-auto align-self-start border-end border-dark" style="width: 4vw;">
                                    <span><strong>Rev</strong></span>
                                </div>
                                <div class="col my-auto">
                                    <span><strong>Armado p/Prensa</strong></span>
                                </div>
                                <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                    <span><strong>Rev</strong></span>
                                </div>
                            </div>
                            <hr>
                                ${arrayBloqueArmado.join(`<br>`)}
                                ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber)}
                        </fieldset>
                    </form>`

        const titulo = "Armado",
            ancho = 1600,
            background = '#eeeeee',
            formulario = 'formArmadoValues',
            arrayDeOtNumber = arrayOtSelected,
            arrayDeOpNumber = arrayOpSelected,
            arrayDeOtDescription = arrayOpDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeOpNumber,
            arrayDeOtDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToOtEtapaPrimera ******
function addDatoToOtEtapaPrimera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueEtapaPrimera = [], arrayOtSelected = [], arrayOtKNumber=[], arrayOtStatus = [], arrayOpSelected = [], arrayOpDescriptionSelected = [];

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayOpSelected.push(res.arrayOpNumber[y])
                arrayOpDescriptionSelected.push(res.arrayDescripcionOt[y])

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="estadoRt${res.arrayOtNumber[y]}}" name="estadoRt${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayEstadoRt[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayEstadoRt[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayEstadoRt[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoRtHidden${res.arrayOtNumber[y]}}"
                            name="estadoRtHidden${[y]}" value="${(switchOptionSelected(getValues.arrayEstadoRt[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto">
                        <input type="text" value="${getValues.arrayRevisionRt[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionRt${res.arrayOtNumber[y]}}"
                            name="revisionRt${y}" value="${getValues.arrayRevisionRt[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="estadoPreparacionGeo${res.arrayOtNumber[y]}}" name="estadoPreparacionGeo${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayEstadoPreparacionGeo[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayEstadoPreparacionGeo[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayEstadoPreparacionGeo[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoPreparacionGeoHidden${res.arrayOtNumber[y]}}"
                        name="estadoPreparacionGeoHidden${[y]}" value="${(switchOptionSelected(getValues.arrayEstadoPreparacionGeo[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto">
                        <input type="text" value="${getValues.arrayRevisionPreparacionGeo[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionPreparacionGeo${res.arrayOtNumber[y]}}"
                            name="revisionPreparacionGeo${y}" value="${getValues.arrayRevisionPreparacionGeo[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="estadoPrograma2d${res.arrayOtNumber[y]}}" name="estadoPrograma2d${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchOptionSelected(getValues.arrayEstadoPrograma2d[y])).variableValue}" disabled>
                                ${(switchOptionSelected(getValues.arrayEstadoPrograma2d[y])).getValueArrayDato}
                            </option>
                            ${(switchOptionSelected(getValues.arrayEstadoPrograma2d[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoPrograma2dHidden${res.arrayOtNumber[y]}}"
                            name="estadoPrograma2dHidden${[y]}"
                            value="${(switchOptionSelected(getValues.arrayEstadoPrograma2d[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto">
                        <input type="text" value="${getValues.arrayRevisionPrograma2d[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionPrograma2d${res.arrayOtNumber[y]}}"
                            name="revisionPrograma2d${y}" value="${getValues.arrayRevisionPrograma2d[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueEtapaPrimera.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueEtapaPrimera.push(`<hr class="my-1">`) : null 
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });
    
        const html = `<form id="formEtapaPrimeraValues" action="/api/programas/otInfoEtapaPrimera/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>Req. Tec.</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 6vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Prep. GEO</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 6vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Programas 2D</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 6vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueEtapaPrimera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`
    
        const titulo = "Programación (1° Parte)"
        const formulario = 'formEtapaPrimeraValues'
        const ancho = 1880
        const background = '#efefef'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected
    
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToOtEtapaSegunda Primera ******
function addDatoToOtEtapaSegundaPrimera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueEtapaSegundaPrimera = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getUsersNames = cargarUsuarioPcpCad(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])

                let hiddenSelectedPrograma3d2F, hiddenSelectedPrograma3d4F
                getValues.arrayPrograma3d2F[y] != 'S/D' ? hiddenSelectedPrograma3d2F = getValues.arrayPrograma3d2F[y] : hiddenSelectedPrograma3d2F = (switchOptionSelected(getValues.arrayPrograma3d2F[y])).variableValue
                getValues.arrayPrograma3d4F[y] != 'S/D' ? hiddenSelectedPrograma3d4F = getValues.arrayPrograma3d4F[y] : hiddenSelectedPrograma3d4F = (switchOptionSelected(getValues.arrayPrograma3d4F[y])).variableValue
                
                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="programa3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="programa3d2F${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayPrograma3d2F[y]}" disabled>
                                ${getValues.arrayPrograma3d2F[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="programa3d2FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="programa3d2FHidden${[y]}" value="${hiddenSelectedPrograma3d2F}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoPrograma3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoPrograma3d2F${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoPrograma3d2FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoPrograma3d2FHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionPrograma3d2F[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionPrograma3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionPrograma3d2F${y}" value="${getValues.arrayRevisionPrograma3d2F[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="programa3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="programa3d4F${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayPrograma3d4F[y]}" disabled>
                                ${getValues.arrayPrograma3d4F[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="programa3d4FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="programa3d4FHidden${[y]}" value="${hiddenSelectedPrograma3d4F}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoPrograma3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoPrograma3d4F${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoPrograma3d4FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoPrograma3d4FHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionPrograma3d4F[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionPrograma3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionPrograma3d4F${y}" value="${getValues.arrayRevisionPrograma3d4F[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasEtapa${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasEtapa${y}" rows="1">${getValues.arrayNotasEtapa[y].trim()}</textarea>
                        <input type="hidden" id="notasEtapaHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasEtapaHidden${[y]}" value="${getValues.arrayNotasEtapa[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasEtapa[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasEtapa${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasEtapa${y}" value="${getValues.arrayRevisionNotasEtapa[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueEtapaSegundaPrimera.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueEtapaSegundaPrimera.push(`<hr class="my-1">`) : null 
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });
    
        const html = `<form id="formEtapaSegundaPrimeraValues" action="/api/programas/otInfoEtapaSegundaPrimera/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>Programa 3d F2</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Programa 3d F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueEtapaSegundaPrimera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Programación (2° Parte)"
        const formulario = 'formEtapaSegundaPrimeraValues'
        const ancho = 1880
        const background = '#efefef'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected
    
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToOtEtapaSegunda Segunda ******
function addDatoToOtEtapaSegundaSegunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueEtapaSegundaSegunda = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getUsersNames = cargarUsuarioPcpCad(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])

                let hiddenSelectedPrograma3d2F, hiddenSelectedPrograma3d4F
                getValues.arrayPrograma3d2F[y] != 'S/D' ? hiddenSelectedPrograma3d2F = getValues.arrayPrograma3d2F[y] : hiddenSelectedPrograma3d2F = (switchOptionSelected(getValues.arrayPrograma3d2F[y])).variableValue
                getValues.arrayPrograma3d4F[y] != 'S/D' ? hiddenSelectedPrograma3d4F = getValues.arrayPrograma3d4F[y] : hiddenSelectedPrograma3d4F = (switchOptionSelected(getValues.arrayPrograma3d4F[y])).variableValue
                
                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="programa3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="programa3d2F${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayPrograma3d2F[y]}" disabled>
                                ${getValues.arrayPrograma3d2F[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="programa3d2FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="programa3d2FHidden${[y]}" value="${hiddenSelectedPrograma3d2F}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoPrograma3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoPrograma3d2F${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoPrograma3d2FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoPrograma3d2FHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d2F[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionPrograma3d2F[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionPrograma3d2F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionPrograma3d2F${y}" value="${getValues.arrayRevisionPrograma3d2F[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="programa3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="programa3d4F${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayPrograma3d4F[y]}" disabled>
                                ${getValues.arrayPrograma3d4F[y]}
                            </option>
                                ${getUsersNames}
                        </select>
                        <input type="hidden" id="programa3d4FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="programa3d4FHidden${[y]}" value="${hiddenSelectedPrograma3d4F}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoPrograma3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoPrograma3d4F${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoPrograma3d4FHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoPrograma3d4FHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoPrograma3d4F[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionPrograma3d4F[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionPrograma3d4F${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionPrograma3d4F${y}" value="${getValues.arrayRevisionPrograma3d4F[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasEtapa${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasEtapa${y}" rows="1">${getValues.arrayNotasEtapa[y].trim()}</textarea>
                        <input type="hidden" id="notasEtapaHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasEtapaHidden${[y]}" value="${getValues.arrayNotasEtapa[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasEtapa[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasEtapa${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasEtapa${y}" value="${getValues.arrayRevisionNotasEtapa[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueEtapaSegundaSegunda.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueEtapaSegundaSegunda.push(`<hr class="my-1">`) : null 
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });
    
        const html = `<form id="formEtapaSegundaSegundaValues" action="/api/programas/otInfoEtapaSegundaSegunda/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>Programa 3d F2</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>Programa 3d F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueEtapaSegundaSegunda.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Programación (2° Parte)"
        const formulario = 'formEtapaSegundaSegundaValues'
        const ancho = 1880
        const background = '#efefef'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected
    
        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

// async function cargarMaquina(res) {
//     try {
//         const url = `../../../api/maquinas/searchTools/all`
//         await fetch(url, {method: "GET", mode: 'cors', cache: 'default'})
//             .then(response => response.json())
//             .then(data => {
//                 cargarOpcionesEnSelect(data, res);
//             })
//             .catch(error => new Error(`Error en la solicitud: ${error}`));

//     } catch (error) {
//         const titulo = 'Error'
//         const message = `${error}`
//         const icon = 'error'
//         messageAlertUser(titulo, message, icon)
//     }

//     // Función para cargar las opciones en el select
//     function cargarOpcionesEnSelect(datos, res) {
//         const selectElements = [
//             document.getElementById(`fCero${res}`),
//             document.getElementById(`fUno${res}`),
//             document.getElementById(`fDos${res}`),
//             document.getElementById(`fTres${res}`),
//             document.getElementById(`fCuatro${res}`)
//         ];

//         // Itera sobre el array de datos
//         datos.forEach(dato => {
//             // Itera sobre cada select para agregar una nueva opción
//             selectElements.forEach(selectElement => {
//                 if (selectElement) {
//                     const option = document.createElement('option');
//                     option.value = dato._id;  // Asigna el valor de la opción (puede ser un ID u otro identificador)
//                     option.textContent = `${dato.designation}`;  // Asigna el texto visible en la opción (puede ser el nombre u otro dato)

//                     dato.status && dato.type != 'prensa' ? selectElement.appendChild(option) : null
//                 }
//             });
//         });
//     }
// }

//***** addDatoToAnalisisCritico ******

function addDatoToAnalisisCritico(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueAnalisisCritico = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
                
                let hiddenSelectedFCero, hiddenSelectedFUno, hiddenSelectedFDos
                getValues.arrayFCero[y] != 'S/D' ? hiddenSelectedFCero = getValues.arrayFCero[y] : hiddenSelectedFCero = (switchOptionSelected(getValues.arrayFCero[y])).variableValue
                getValues.arrayFUno[y] != 'S/D' ? hiddenSelectedFUno = getValues.arrayFUno[y] : hiddenSelectedFUno = (switchOptionSelected(getValues.arrayFUno[y])).variableValue
                getValues.arrayFDos[y] != 'S/D' ? hiddenSelectedFDos = getValues.arrayFDos[y] : hiddenSelectedFDos = (switchOptionSelected(getValues.arrayFDos[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fCero${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCero${y}"
                            oninput="updateInputsSelect()" class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCero[y]}" disabled>
                                ${getValues.arrayFCero[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCeroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCeroHidden${[y]}" value="${hiddenSelectedFCero}">
                    </div>

                    <div class="col my-auto" style="width: 7vw;">
                        <select id="estadoFCero${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCero${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCero[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCero[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCero[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCeroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCeroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCero[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCero[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCero${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCero${y}" value="${getValues.arrayRevisionFCero[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fUno${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fUno${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFUno[y]}" disabled>
                                ${getValues.arrayFUno[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fUnoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fUnoHidden${[y]}" value="${hiddenSelectedFUno}">
                    </div>

                    <div class="col my-auto" style="width: 7vw;">
                        <select id="estadoFUno${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFUno${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFUno[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFUno[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFUno[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFUnoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFUnoHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFUno[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFUno[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFUno${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFUno${y}" value="${getValues.arrayRevisionFUno[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fDos${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fDos${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFDos[y]}" disabled>
                                ${getValues.arrayFDos[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fDosHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fDosHidden${[y]}" value="${hiddenSelectedFDos}">
                    </div>

                    <div class="col my-auto" style="width: 7vw;">
                        <select id="estadoFDos${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFDos${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFDos[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFDos[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFDos[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFDosHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFDosHidden${[y]}"
                        value="${(switchEstadoSelected(getValues.arrayEstadoFDos[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFDos[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFDos${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFDos${y}" value="${getValues.arrayRevisionFDos[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueAnalisisCritico.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueAnalisisCritico.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formAnalisisCriticoValues" action="/api/programas/otInfoAnalisisCritico/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F0</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F1</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F2</strong></span>
                            </div>
                            <div class="col my-auto align-self-start border-start border-end border-dark" style="width: 7vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueAnalisisCritico.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (1° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formAnalisisCriticoValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToEtapaTerceraPrimera ******
function addDatoToEtapaTerceraPrimera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueEtapaTerceraPrimera = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueEtapaTerceraPrimera.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueEtapaTerceraPrimera.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formEtapaTerceraPrimeraValues" action="/api/programas/otInfoEtapaTerceraPrimera/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueEtapaTerceraPrimera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formEtapaTerceraPrimeraValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToEtapaTerceraSegunda ******
function addDatoToEtapaTerceraSegunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueEtapaTerceraSegunda = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueEtapaTerceraSegunda.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueEtapaTerceraSegunda.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formEtapaTerceraSegundaValues" action="/api/programas/otInfoEtapaTerceraSegunda/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueEtapaTerceraSegunda.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formEtapaTerceraSegundaValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToCicloCorreccionPrimera ******
function addDatoToCicloCorreccionPrimera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueCicloCorreccionPrimera = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueCicloCorreccionPrimera.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueCicloCorreccionPrimera.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formCicloCorreccionPrimeraValues" action="/api/programas/otInfoCicloCorreccionPrimera/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueCicloCorreccionPrimera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formCicloCorreccionPrimeraValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToCicloCorreccionSegunda ******
function addDatoToCicloCorreccionSegunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueCicloCorreccionSegunda = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueCicloCorreccionSegunda.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueCicloCorreccionSegunda.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formCicloCorreccionSegundaValues" action="/api/programas/otInfoCicloCorreccionSegunda/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueCicloCorreccionSegunda.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formCicloCorreccionSegundaValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToCicloCorreccionTercera ******
function addDatoToCicloCorreccionTercera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueCicloCorreccionTercera = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueCicloCorreccionTercera.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueCicloCorreccionTercera.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formCicloCorreccionTerceraValues" action="/api/programas/otInfoCicloCorreccionTercera/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueCicloCorreccionTercera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formCicloCorreccionTerceraValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToLiberacionBuyOffPrimera ******
function addDatoToLiberacionBuyOffPrimera(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueLiberacionBuyOffPrimera = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueLiberacionBuyOffPrimera.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueLiberacionBuyOffPrimera.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formLiberacionBuyOffPrimeraValues" action="/api/programas/otInfoLiberacionBuyOffPrimera/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueLiberacionBuyOffPrimera.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formLiberacionBuyOffPrimeraValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToLiberacionBuyOffSegunda ******
function addDatoToLiberacionBuyOffSegunda(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueLiberacionBuyOffSegunda = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueLiberacionBuyOffSegunda.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueLiberacionBuyOffSegunda.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formLiberacionBuyOffSegundaValues" action="/api/programas/otInfoLiberacionBuyOffSegunda/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueLiberacionBuyOffSegunda.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formLiberacionBuyOffSegundaValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToBuyOff ******
function addDatoToBuyOff(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloqueBuyOff = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloqueBuyOff.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloqueBuyOff.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formBuyOffValues" action="/api/programas/otInfoBuyOff/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloqueBuyOff.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formBuyOffValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}

//***** addDatoToPendientesFinales ******
function addDatoToPendientesFinales(i, idTabla, qInicial, qFinal) {
    if (i, idTabla, qInicial, qFinal) {
        let res = getOtList(i)
        let getValues = getOtListValues(i, idTabla, qInicial, qFinal)
        let arrayBloquePendientesFinales = [], arrayNumberKDetalle = [], arrayOtSelected = [], arrayOtKNumber=[], arrayItemsSelected = [], arrayItemsDescriptionSelected = []

        res.arraySelectedCheck.forEach(selected => {
            let index = res.arrayONumberSelect.indexOf(selected);  // Encontrar el índice del valor en arrayONumberSelect
            if (index !== -1) {  // Si el elemento se encuentra, agregar el índice al array de resultados
                let y = index
                arrayOtSelected.push(res.arrayOtNumber[y])
                arrayOtKNumber.push(res.arrayNnumber[y])
                arrayItemsSelected.push(res.arrayOtDetalle[y])
                arrayItemsDescriptionSelected.push(res.arrayDescripcionDetalle[y])
                let getToolsNames = cargarMaquina(res.arrayOtNumber[y]+'_'+res.arrayOtDetalle[y])
            
                let hiddenSelectedFTres, hiddenSelectedFCuatro
                getValues.arrayFTres[y] != 'S/D' ? hiddenSelectedFTres = getValues.arrayFTres[y] : hiddenSelectedFTres = (switchOptionSelected(getValues.arrayFTres[y])).variableValue
                getValues.arrayFCuatro[y] != 'S/D' ? hiddenSelectedFCuatro = getValues.arrayFCuatro[y] : hiddenSelectedFCuatro = (switchOptionSelected(getValues.arrayFCuatro[y])).variableValue

                const dataEnArrayBloque = `
                    <div class="col my-auto">
                        <select id="fTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fTres${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFTres[y]}" disabled>
                                ${getValues.arrayFTres[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fTresHidden${[y]}" value="${hiddenSelectedFTres}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFTres${y}"
                            oninput="updateInputsSelect()" class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFTresHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFTresHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFTres[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFTres[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFTres${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFTres${y}" value="${getValues.arrayRevisionFTres[y]}">
                    </div>

                    <div class="col my-auto">
                        <select id="fCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="fCuatro${y}"
                            class="form-select" ${colorStatusOt(res.arrayOtDetalleStatus[y]).disabled}>
                            <option selected value="${getValues.arrayFCuatro[y]}" disabled>
                                ${getValues.arrayFCuatro[y]}
                            </option>
                                ${getToolsNames}
                        </select>
                        <input type="hidden" id="fCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="fCuatroHidden${[y]}" value="${hiddenSelectedFCuatro}">
                    </div>

                    <div class="col-1 my-auto" style="width: 9vw;">
                        <select id="estadoFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="estadoFCuatro${y}"
                            oninput="updateInputsSelect()"
                            class="form-select" ${(colorStatusOt(res.arrayOtDetalleStatus[y]).disabled)}>
                            <option selected value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}" disabled>
                                ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).getValueArrayDato}
                            </option>
                            ${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).optionDefined}
                        </select>
                        <input type="hidden" id="estadoFCuatroHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                        name="estadoFCuatroHidden${[y]}" value="${(switchEstadoSelected(getValues.arrayEstadoFCuatro[y])).variableValue}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionFCuatro[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionFCuatro${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionFCuatro${y}" value="${getValues.arrayRevisionFCuatro[y]}">
                    </div>

                    <div class="col-1 my-auto" style="width: 13vw;">
                        <textarea oninput="updateInputsTextarea()" class="form-control" id="notasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}" name="notasMecanizado${y}" rows="1">${getValues.arrayNotasMecanizado[y].trim()}</textarea>
                        <input type="hidden" id="notasMecanizadoHidden${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="notasMecanizadoHidden${[y]}" value="${getValues.arrayNotasMecanizado[y]}">
                    </div>
                    
                    <div class="col-1 my-auto" style="width: 4vw;">
                        <input type="text" value="${getValues.arrayRevisionNotasMecanizado[y]}"
                            class="form-control" style="text-align: center;" disabled readonly">
                        <input type="hidden" id="revisionNotasMecanizado${res.arrayOtNumber[y]}_${res.arrayOtDetalle[y]}"
                            name="revisionNotasMecanizado${y}" value="${getValues.arrayRevisionNotasMecanizado[y]}">
                    </div>`

                const isInactive = res.arrayOtDetalleStatus[y] === 'Inactivo';
                const divStyle = isInactive ? 'style="background-color: rgba(0, 0, 0, 0.25); opacity: 0.5"' : '';
                const divClass = isInactive ? 'pe-none contenteditable="false"' : '';
                
                arrayBloquePendientesFinales.push(`
                    <div class="row mx-auto ${divClass}" ${divStyle}>
                        ${datosCabeceraFormulario(res.arrayOtDetalleStatus[y], y, res.arrayOtNumber[y], res.arrayOpNumber[y], res.arrayOtDetalle[y], res.arrayDescripcionDetalle[y], res.arrayOnumber[y], res.arrayDetalleId[y])}
                        ${dataEnArrayBloque}
                    </div>`);
                
                res.arrayOtNumber[y] !== res.arrayOtNumber[y+1] ? arrayBloquePendientesFinales.push(`<hr class="my-1">`) : null
                res.arrayOtNumber[y] ? arrayNumberKDetalle.push(res.arrayOnumber[y]) : null
            }
        });

        const html = `<form id="formPendientesFinalesValues" action="/api/programas/otInfoPendientesFinales/${projectNumberId}" method="post" style="font-size: 10pt">
                    <fieldset>
                        <div class="row mx-auto">
                            ${cabeceraFormulario}
                            <div class="col my-auto">
                                <span><strong>F3</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col my-auto">
                                <spano><strong>F4</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start border-start border-end border-dark" style="width: 9vw;">
                                <span><strong>Estado</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                            <div class="col-1 my-auto border-end border-dark" style="width: 13vw;">
                                <spano><strong>Notas</strong></span>
                            </div>
                            <div class="col-1 my-auto align-self-start" style="width: 4vw;">
                                <span"><strong>Rev</strong></span>
                            </div>
                        </div>
                        <hr>
                            ${arrayBloquePendientesFinales.join("<br>")}
                            ${footerFormularioHidden(projectNumberId, clientId.value, i, res.arrayOtNumber.length, arrayOtKNumber, res.arrayDetalleId.length, arrayNumberKDetalle)}
                    </fieldset>
                </form>`

        const titulo = "Mecanizado (2° Parte)"
        const ancho = 1880
        const background = '#efefff'
        const formulario = 'formPendientesFinalesValues'
        const arrayDeOtNumber = arrayOtSelected
        const arrayDeDetalleNumber = arrayItemsSelected
        const arrayDeDetalleDescription = arrayItemsDescriptionSelected

        swalFireAlert (
            titulo,
            html,
            ancho,
            background,
            formulario,
            arrayDeOtNumber,
            arrayDeDetalleNumber,
            arrayDeDetalleDescription
        )
        disabledBtnAceptar()
    }
}


// Función para actualizar el valor del campo Text
function updateInputsText() {
    let arrayInputsRange = []

    for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
        document.getElementById(`tablaGeneral${i}`) ? arrayInputsRange.push(i) : null
    }
    
    arrayInputsRange !=[] ? allInputsRange = document.querySelectorAll('input[type="range"]') : null

    for (let y=0; y < parseInt(allInputsRange.length)-1; y++) {
        const idInputRange = allInputsRange[y].id//.substring(0, allInputsRange[y].id.length - 4)
        const idInputTextToChange = allInputsRange[y].id.substring(0, allInputsRange[y].id.length - 4) + 'Disabled' + allInputsRange[y].id.substring(allInputsRange[y].id.length - 4)
        const idInputRangeHidden = allInputsRange[y].id.substring(0, allInputsRange[y].id.length - 4) + 'Hidden' + allInputsRange[y].id.substring(allInputsRange[y].id.length - 4)
        // console.log('idInputTextToChange: ',idInputTextToChange)
        // console.log('idInputRangeHidden: ',idInputRangeHidden)
        // Obtener el valor del slider   
        var valorSlider = document.getElementById(`${idInputRange}`).value

        // Actualizar el campo de texto con el valor del slider
        if (valorSlider) {
            document.getElementById(`${idInputTextToChange}`).value = valorSlider
            document.getElementById(`${idInputRangeHidden}`).value = valorSlider
        }
    }
}

// Función para actualizar el valor del campo Text hidden con los Select's
function updateInputsSelect () {
    let arrayInputSelectHidden = [], allInputsSelect = []

    for (let i = 0; i<varLimMaxOtProyecto; i++) { //variable limite maximo de OT por proyecto
        document.getElementById(`tablaGeneral${i}`) ? arrayInputSelectHidden.push(i) : null
    }
    
    arrayInputSelectHidden !=[] ? allInputsSelect = document.querySelectorAll('select') : null

    let largoArrayInputsSelect = parseInt((allInputsSelect.length)-1)
    for (let y=0; y < largoArrayInputsSelect; y++) {
        const idInputSelectHidden = allInputsSelect[y].id.substring(0, allInputsSelect[y].id.length - 4) + 'Hidden' + allInputsSelect[y].id.substring(allInputsSelect[y].id.length - 4)
        // console.log('idInputSelectHidden: ', idInputSelectHidden)
        let inputSelectHidden = document.getElementById(`${idInputSelectHidden}`)
        // console.log('inputSelectHidden: ', inputSelectHidden)
        inputSelectHidden ? inputSelectHidden.value = document.getElementById(`${allInputsSelect[y].id}`).value : null
    }
}

function disabledBtnAceptar (ociDescription) {
    let btnAceptarModal = document.getElementsByClassName('swal2-confirm');
    const allInputs = document.querySelectorAll('input[type="text"],input[type="number"],select,textarea,input[type="file"]' )
    const allInputsRange = document.querySelectorAll('input[type="range"]')
    const allInputsCheck = document.querySelectorAll('input[type="checkbox"]')
    const allInputsRadio = document.querySelectorAll('input[type="radio"]')
    const checkbox = document.getElementById('confirmationAllOt')
    const otNumberDisabled = document.getElementById('numberOtModal')
    const opNumberDisabled = document.getElementById('numeroOp')
    const otDescriptionDisabled = document.getElementById('descriptionOt')
    const swalTitle = document.getElementById('swal2-title')
    
    allInputs.forEach(function(input) {
        input.value ?
        input.addEventListener('change', (event) => {
            event.preventDefault()
            input.classList.add("border-primary", "border-2", "shadow")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            })    
        : null       
    })

    allInputsRange.forEach(function(input) {
        input.value ?
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("drag__bar")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            })    
        : null
    })

    allInputsCheck.forEach(function(input) {
        input.value ?
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.toggle("bg-danger")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"

                checkbox.checked ? 
                    (otNumberDisabled.classList.remove("border-success", "border-2", "shadow"),
                    swalTitle.innerHTML = `Actualizar Dueño Pieza Completa "${ociDescription}"`)
                :
                    (otNumberDisabled.classList.add("border-success", "border-2", "shadow"),
                    swalTitle.innerHTML = `Actualizar Dueño OT#${otNumberDisabled.value} - OP#${opNumberDisabled.value} ${otDescriptionDisabled.value}`)
            })    
        : null
    })

    allInputsRadio.forEach(function(input) {
        input.value && input.name != 'ociNumber' ?
            input.addEventListener('input', (event) => {
                event.preventDefault()
                if (btnAceptarModal) {
                    btnAceptarModal[0].removeAttribute('disabled')
                    btnAceptarModal[0].style = "cursor: pointer;"
                }
            })    
        : null
    })
}

const arrTables = []
for (let i = 0; i<varLimMaxProyectoCliente; i++) { //variable limite maximo de proyectos por Cliente
    document.getElementById(`tablaGeneral${i}`) ? arrTables.push(i) : null
}

if(arrTables !=[]) {
    let allButtonsFromTables = document.querySelectorAll(`
        button[name="btnOtArmado"],
        button[name="btnOtEtapaPrimera"],
        button[name="btnOtEtapaSegundaPrimera"],
        button[name="btnOtEtapaSegundaSegunda"],
        button[name="btnOtAnalisisCritico"],
        button[name="btnOtEtapaTerceraPrimera"],
        button[name="btnOtEtapaTerceraSegunda"],
        button[name="btnOtCicloCorreccionPrimera"],
        button[name="btnOtCicloCorreccionSegunda"],
        button[name="btnOtCicloCorreccionTercera"],
        button[name="btnOtLiberacionBuyOffPrimera"],
        button[name="btnOtLiberacionBuyOffSegunda"],
        button[name="btnOtBuyOff"],
        button[name="btnOtPendientesFinales"]
    `);

    let arrayTituloTabla = [
        {
            nombreTabla: "tablaOtArmado",
            btnName: "btnOtArmado",
            functionName: addDatoToOtArmado,
            qInicial: 0,
            qFinal: 4
        },
        {
            nombreTabla: "tablaOtEtapaPrimera",
            btnName: "btnOtEtapaPrimera",
            functionName: addDatoToOtEtapaPrimera,
            qInicial: 4,
            qFinal: 8
        },
        {
            nombreTabla: "tablaOtEtapaSegundaPrimera",
            btnName: "btnOtEtapaSegundaPrimera",
            functionName: addDatoToOtEtapaSegundaPrimera,
            qInicial: 8,
            qFinal: 11
        },
        {
            nombreTabla: "tablaOtEtapaSegundaSegunda",
            btnName: "btnOtEtapaSegundaSegunda",
            functionName: addDatoToOtEtapaSegundaSegunda,
            qInicial: 11,
            qFinal: 13
        },
        {
            nombreTabla: "tablaOtAnalisisCritico",
            btnName: "btnOtAnalisisCritico",
            functionName: addDatoToAnalisisCritico,
            qInicial: 13,
            qFinal: 15
        },
        {
            nombreTabla: "tablaOtEtapaTerceraPrimera",
            btnName: "btnOtEtapaTerceraPrimera",
            functionName: addDatoToEtapaTerceraPrimera,
            qInicial: 15,
            qFinal: 18
        },
        {
            nombreTabla: "tablaOtEtapaTerceraSegunda",
            btnName: "btnOtEtapaTerceraSegunda",
            functionName: addDatoToEtapaTerceraSegunda,
            qInicial: 18,
            qFinal: 21
        },
        {
            nombreTabla: "tablaOtCicloCorreccionrimera",
            btnName: "btnOtCicloCorreccionPrimera",
            functionName: addDatoToCicloCorreccionPrimera,
            qInicial: 21,
            qFinal: 24
        },
        {
            nombreTabla: "tablaOtCicloCorreccionSegunda",
            btnName: "btnOtCicloCorreccionSegunda",
            functionName: addDatoToCicloCorreccionSegunda,
            qInicial: 24,
            qFinal: 27
        },
        {
            nombreTabla: "tablaOtCicloCorreccionTercera",
            btnName: "btnOtCicloCorreccionTercera",
            functionName: addDatoToCicloCorreccionTercera,
            qInicial: 27,
            qFinal: 30
        },
        {
            nombreTabla: "tablaOtLiberacionBuyOffPrimera",
            btnName: "btnOtLiberacionBuyOffPrimera",
            functionName: addDatoToLiberacionBuyOffPrimera,
            qInicial: 30,
            qFinal: 33
        },
        {
            nombreTabla: "tablaOtLiberacionBuyOffSegunda",
            btnName: "btnOtLiberacionBuyOffSegunda",
            functionName: addDatoToLiberacionBuyOffSegunda,
            qInicial: 33,
            qFinal: 36
        },
        {
            nombreTabla: "tablaOtBuyOff",
            btnName: "btnOtBuyOff",
            functionName: addDatoToBuyOff,
            qInicial: 36,
            qFinal: 38
        },
        {
            nombreTabla: "tablaOtPendientesFinales",
            btnName: "btnOtPendientesFinales",
            functionName: addDatoToPendientesFinales,
            qInicial: 38,
            qFinal: 41
        }
    ]

    allButtonsFromTables.forEach(function(btn){
        if (btn.value && btn.name){
            btn.addEventListener("click", (event) => {
                event.preventDefault()
                let index = arrayTituloTabla.findIndex(element => element.btnName === btn.name);
                const kValue = btn.value
                let nombreTabla = document.getElementById(`${arrayTituloTabla[index].nombreTabla}${kValue}`)
                const idTabla = nombreTabla.id
                const qInicial = arrayTituloTabla[index].qInicial
                const qFinal = arrayTituloTabla[index].qFinal
                arrayTituloTabla[index].functionName(kValue, idTabla, qInicial, qFinal)
                event.stopPropagation()
            })
        }
    })
}

let inputsDeTexto = document.querySelectorAll('input[type="text"]')
    // Agregar un listener de evento a cada input
inputsDeTexto.forEach(function(input) {
    input.addEventListener('keydown', function(event) {
        // Obtener el código de la tecla presionada
        let key = event.key;

        // Lista de caracteres especiales prohibidos
        let forbiddenChars = /["$%?¡¿^/=!'~`\\*{}\[\]<>@]/;

        // Verificar si la tecla presionada es un carácter especial
        if (forbiddenChars.test(key)) {
            event.preventDefault() // Cancelar el evento para evitar que se ingrese el carácter
            input.classList.toggle("border", "border-danger", "border-2")
        }
    })
})

let inputsDeTextarea = document.querySelectorAll('textarea')
inputsDeTextarea.forEach(function(input) {
    input.addEventListener('keydown', function(event) {
        // Obtener el código de la tecla presionada
        let key = event.key;

        // Lista de caracteres especiales prohibidos
        let forbiddenChars = /["¡¿^!'~`\\*{}\[\]<>@,]/;

        // Verificar si la tecla presionada es un carácter especial
        if (forbiddenChars.test(key)) {
            // Cancelar el evento para evitar que se ingrese el carácter
            event.preventDefault()
            input.classList.toggle("border", "border-danger", "border-2")
        }
    })
})