let URL_GOOGLE_STORE_IMGPROJECTS = 'https://storage.googleapis.com/imagenesproyectosingenieria/upload/projectImages/'

// Manejador de eventos de tablas Oci con Ot y sin Ot -------
const tablaOciConOt = document.getElementById(`tablaOciConOt`)
const tablaOciSinOt = document.getElementById(`tablaOciSinOt`)
const nestable = document.getElementById(`nestable`)
const nestable2 = document.getElementById(`nestable2`)
const btnShowTablaOciConOt = document.getElementById(`btnShowTablaOciConOt`)
const btnShowTablaOciSinOt = document.getElementById(`btnShowTablaOciSinOt`)
const btnRefreshTablaOciConOt = document.getElementById(`btnRefreshTablaOciConOt`)
const btnRefreshTablaOciSinOt = document.getElementById(`btnRefreshTablaOciSinOt`)
const titleOciConOt = document.getElementById(`titleOciConOt`)
const titleOciSinOt = document.getElementById(`titleOciSinOt`)

function showHiddeTablaOciConOt() {
    if (nestable2.style.display === 'none') {
        nestable2.style.display = ''
        tablaOciConOt.classList.remove("col-md-11")
        tablaOciConOt.classList.remove("col-sm-11")
        tablaOciConOt.classList.remove("col-11")

        tablaOciSinOt.classList.remove("col-xl-1")
        tablaOciSinOt.classList.remove("col-lg-1")

        tablaOciConOt.classList.add("col-xl-6")
        tablaOciConOt.classList.add("col-lg-6")

        tablaOciSinOt.classList.add("col-xl-6")
        tablaOciSinOt.classList.add("col-lg-6")

        btnShowTablaOciConOt.innerHTML = '<i class="fa-solid fa-circle-arrow-right fa-xl"></i>'
        btnShowTablaOciSinOt.style.display = ''
        btnShowTablaOciSinOt.innerHTML = '<i class="fa-solid fa-circle-arrow-left fa-xl"></i>'
        btnShowTablaOciConOt.title = 'Mostrar solo esta tabla'
        btnRefreshTablaOciSinOt.style.display = ''
        btnRefreshTablaOciSinOt.innerHTML = '<i class="fa-solid fa-rotate fa-xl"></i>'
        
        titleOciSinOt.style.fontSize = '1.25rem'
                
    } else {
        nestable2.style.display = 'none'
        tablaOciConOt.classList.add("col-md-11")
        tablaOciConOt.classList.add("col-sm-11")
        tablaOciConOt.classList.add("col-11")

        tablaOciSinOt.classList.add("col-xl-1")
        tablaOciSinOt.classList.add("col-lg-1")

        tablaOciConOt.classList.remove("col-xl-6")
        tablaOciConOt.classList.remove("col-lg-6")

        tablaOciSinOt.classList.remove("col-xl-6")
        tablaOciSinOt.classList.remove("col-lg-6")

        btnShowTablaOciConOt.innerHTML = '<i class="fa-solid fa-circle-arrow-left fa-xl"></i>'
        btnShowTablaOciSinOt.style.display = 'none'
        btnRefreshTablaOciSinOt.style.display = 'none'
        btnShowTablaOciConOt.title = 'Mostrar ambas tablas'

        titleOciSinOt.style.fontSize = '.01rem'

    }
}

function showHiddeTablaOciSinOt() {
    if (nestable.style.display === 'none') {
        nestable.style.display = ''
        tablaOciSinOt.classList.remove("col-md-11")
        tablaOciSinOt.classList.remove("col-sm-11")
        tablaOciSinOt.classList.remove("col-11")

        tablaOciConOt.classList.remove("col-xl-1")
        tablaOciConOt.classList.remove("col-lg-1")

        tablaOciSinOt.classList.add("col-xl-6")
        tablaOciSinOt.classList.add("col-lg-6")

        tablaOciConOt.classList.add("col-xl-6")
        tablaOciConOt.classList.add("col-lg-6")

        btnShowTablaOciSinOt.innerHTML = '<i class="fa-solid fa-circle-arrow-left fa-xl"></i>'
        btnShowTablaOciConOt.style.display = ''
        btnShowTablaOciConOt.innerHTML = '<i class="fa-solid fa-circle-arrow-right fa-xl"></i>'
        btnRefreshTablaOciConOt.style.display = ''
        btnRefreshTablaOciConOt.innerHTML = '<i class="fa-solid fa-rotate fa-xl"></i>'
        btnShowTablaOciSinOt.title = 'Mostrar solo esta tabla'

        titleOciConOt.style.fontSize = '1.25rem'
                
    } else {
        nestable.style.display = 'none'
        tablaOciSinOt.classList.add("col-md-11")
        tablaOciSinOt.classList.add("col-sm-11")
        tablaOciSinOt.classList.add("col-11")

        tablaOciConOt.classList.add("col-xl-1")
        tablaOciConOt.classList.add("col-lg-1")

        tablaOciSinOt.classList.remove("col-xl-6")
        tablaOciSinOt.classList.remove("col-lg-6")

        tablaOciConOt.classList.remove("col-xl-6")
        tablaOciConOt.classList.remove("col-lg-6")

        btnShowTablaOciSinOt.innerHTML = '<i class="fa-solid fa-circle-arrow-right fa-xl"></i>'
        btnShowTablaOciConOt.style.display = 'none'
        btnRefreshTablaOciConOt.style.display = 'none'
        btnShowTablaOciSinOt.title = 'Mostrar ambas tablas'

        titleOciConOt.style.fontSize = '.01rem'
    }
}

btnShowTablaOciConOt.addEventListener("click", (event) => {
    event.preventDefault()
    showHiddeTablaOciConOt()
})

btnShowTablaOciSinOt.addEventListener("click", (event) => {
    event.preventDefault()
    showHiddeTablaOciSinOt()
})


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


// Manejador de eventos para ocultar OCI u OT de tablas ----------
const arrBtnHiddeOciConOt = []
const arrBtnHiddeOciSinOt = []
const arrBtnHiddeOt = []

for (let i = 0; i<999; i++) { //ver limite maximo de OCI
    if (document.getElementById(`btnHiddeOciConOt${i}`)) {
        arrBtnHiddeOciConOt.push(i)
    }

    if (document.getElementById(`btnHiddeOciSinOt${i}`)) {
        arrBtnHiddeOciSinOt.push(i)
    }

    if (document.getElementById(`btnHiddeOt${i}`)) {
        arrBtnHiddeOt.push(i)
    }
}


function hiddeOciConOt(k) {
    const ociConOtList = document.getElementById(`ociConOtList${k}`)

    if (ociConOtList.style.display === '') {
        ociConOtList.style.display = 'none'
    }
}

function hiddeOciSinOt(k) {
    const ociSinOtList = document.getElementById(`ociSinOtList${k}`)

    if (ociSinOtList.style.display === '') {
        ociSinOtList.style.display = 'none'
    }
}

function hiddeOt(k) {
    const otList = document.getElementById(`otList${k}`)

    if (otList.style.display === '') {
        otList.style.display = 'none'
    }
}


if(arrBtnHiddeOciConOt !=[] || arrBtnHiddeOciSinOt !=[] || arrBtnHiddeOt !=[]) {
    let allBtnsHiddeOciConOt = document.querySelectorAll('button[name="btnHiddeOciConOt"]')
    let allBtnsHiddeOciSinOt = document.querySelectorAll('button[name="btnHiddeOciSinOt"]')
    let allBtnsHiddeOt = document.querySelectorAll('button[name="btnHiddeOt"]')

    allBtnsHiddeOciConOt.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            event.preventDefault()
            let kValue = event.target.id
            hiddeOciConOt(extractNumbers(kValue))
    	})
    })

    allBtnsHiddeOciSinOt.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            event.preventDefault()
            let kValue = event.target.id
            hiddeOciSinOt(extractNumbers(kValue))
    	})
    })

    allBtnsHiddeOt.forEach(function(btn){
		btn.addEventListener("click", (event) => {
            event.preventDefault()
            let kValue = event.target.id
            hiddeOt(extractNumbers(kValue))
    	})
    })
}

function refreshTablaOciSinOt() {
    for (let i = 1; i<999; i++) { //ver limite maximo de OCI
        if (document.getElementById(`ociSinOtList${i}`) && document.getElementById(`ociSinOtList${i}`).style.display === 'none') {
            document.getElementById(`ociSinOtList${i}`).style.display = ''
        }
    }
}

function refreshTablaOciConOt() {
    for (let i = 0; i<999; i++) { //ver limite maximo de OCI
        if (document.getElementById(`ociConOtList${i}`) && document.getElementById(`ociConOtList${i}`).style.display === 'none') {
            document.getElementById(`ociConOtList${i}`).style.display = ''
        }
    }

    for (let i = 0; i<999; i++) { //ver limite maximo de OCI
        if (document.getElementById(`otList${i}`) && document.getElementById(`otList${i}`).style.display === 'none') {
            document.getElementById(`otList${i}`).style.display = ''
        }
        
    }
}

btnRefreshTablaOciSinOt.addEventListener("click", (event) => {
    event.preventDefault()
    refreshTablaOciSinOt()
})

btnRefreshTablaOciConOt.addEventListener("click", (event) => {
    event.preventDefault()
    refreshTablaOciConOt()
})


//---- Update OCI Data ----------------
function messageUpdateOci(
    projectId,
    imageOci,
    ociDescription,
    ociNumber,
    k
) {
    
    let numberOci = parseInt(ociNumber)
    let checked = 'checked'
    let bgColorStatus = 'background-color: #55dd5560;'

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
    })

    var html = `<form id="formUpdateOci${k}" enctype="multipart/form-data" action="/api/proyectos/updateOci/${projectId}" method="post">
                    <fieldset>
                        <div class="row justify-content-evenly mb-3 mx-1 px-1">
                            <div class="col-6">
                                <label for="numberOci" class="form-label d-flex justify-content-start ms-1">Número OCI</label>
                                <input type="number" name="numberOci" class="form-control"
                                    placeholder="Número OCI" value="${numberOci}" required>
                            </div>
                            
                            <div class="col-6" style="${bgColorStatus}">
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
                            <div class="col">
                                <label for="descriptionOci" class="form-label d-flex justify-content-start ms-1">Descripción OCI</label>
                                <input type="text" name="descriptionOci" class="form-control"
                                    placeholder="Descripción OCI" value="${ociDescription}" required>
                            </div>                            
                        </div> 

                        <div class="row justify-content-start align-items-center mb-1 mx-1 px-1">
                            <div class="col mb-1">
                                <label for="imageOci" class="form-label d-flex justify-content-start ms-1">Seleccione una imagen para la OCI</label>
                                    
                                <input type="text" id="fileInputTextUpdate" name="imageOciFileName"
                                    value="${imageOci}" style="display: none;" required>
                                <input type="file" id="fileInputUpdate" name="imageOci"
                                    value="" accept="image/*" style="display: none;" required>
                            
                                <div id="drop-areaUpdate" class="mb-2 mx-auto">
                                    Arrastra y suelta una imagen aquí
                                </div>
                                <button title="Eliminar Imagen" class="btn btn-danger rounded-circle mx-auto"
                                        id="removeImageUpdate" style="display: none;">
                                        <i class="fa-solid fa-xmark"></i>
                                </button>
                                
                                <div id="alertUpdate" class="alert alert-warning align-items-center" role="alert" style="display: none; font-size: 0.95rem; height: 1.15rem;"">
                                    <strong class="me-2">Error!</strong> Solo puedes ingresar una imagen jpg, png, bmp o jpeg.
                                </div>
                            </div>
                        </div>
                        
                        <div class="row justify-content-evenly mb-1 px-1 mx-auto">
                            <div class="col-12 my-1 mx-auto px-1">
                            <label class="form-label d-flex justify-content-start ms-1">Imagen actual de la OCI# ${numberOci}</label>
                                <img src="${imageOci}" class="img-fluid rounded px-1"
                                    alt="Imagen OCI" width="115px">
                            </div>
                        </div>
                        <input type="hidden" name="ociKNumberHidden" id="ociKNumberHidden${k}" value="${k}">
                    </fieldset>
                </form>`


    if(numberOci) {
        Swal.fire({
            title: `Actualizar OCI# ${numberOci}`,
            position: 'center',
            html: html,
            width: 700,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
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

    const dropAreaUpdate = document.getElementById('drop-areaUpdate')
    const fileInputUpdate = document.getElementById('fileInputUpdate')
    const fileImputTextUpdate = document.getElementById('fileInputTextUpdate')
    const removeImageButtonUpdate = document.getElementById('removeImageUpdate')
    const alertUpdate = document.getElementById('alertUpdate')

    dropAreaUpdate.style.width = "300px"
    dropAreaUpdate.style.height = "200px"
    dropAreaUpdate.style.border = "2px dashed #ccc"
    dropAreaUpdate.style.margin = "0 auto 0 50px"
    dropAreaUpdate.style.borderRadius = "5px"
    dropAreaUpdate.style.textAlign = "center"
    dropAreaUpdate.style.lineHeight = "200px"
    dropAreaUpdate.style.cursor = "pointer"

    dropAreaUpdate.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropAreaUpdate.style.border = '2px dashed #77a'
        dropAreaUpdate.style.backgroundColor = '#7777aa10'
    })
  
    dropAreaUpdate.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropAreaUpdate.style.border = '2px dashed #ccc'
        dropAreaUpdate.style.backgroundColor = '#fff'
        removeImageButtonUpdate.style.display = 'none'
    })

    function alertNotImageUpdate() {
        alertUpdate.style.display = 'flex'
        removeImageButtonUpdate.style.display = 'none'
        dropAreaUpdate.style.border = "2px dashed #ccc"
        dropAreaUpdate.style.textAlign = "center"
        dropAreaUpdate.style.backgroundColor = '#fff'
        dropAreaUpdate.style.display = 'block'
        dropAreaUpdate.innerHTML = 'Arrastra y suelta una imagen aquí'
    }
    
    dropAreaUpdate.addEventListener('drop', (e) => {
        e.preventDefault()
        dropAreaUpdate.style.border = '3px dashed #2a2'
        dropAreaUpdate.style.backgroundColor = '#22aa2210'
        const file = e.dataTransfer.files[0]

        if (file && file.type.startsWith('image/')) {
            fileInputUpdate.files = e.dataTransfer.files
            let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
            fileImputTextUpdate.value = pathToImage + file.name
            removeImageButtonUpdate.style.display = 'flex'
            alertUpdate.style.display = 'none'
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
            let pathToImage = URL_GOOGLE_STORE_IMGPROJECTS
            fileImputTextUpdate.value = pathToImage + file.name
            removeImageButtonUpdate.style.display = 'flex'
            alertUpdate.style.display = 'none'
            handleFileUploadUpdate(file)
        } else {
            alertNotImageUpdate()
        }     
    })

    function handleFileUploadUpdate(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropAreaUpdate.innerHTML = 
                    `<img class="p-2" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                dropAreaUpdate.style.display = 'block'
                alertUpdate.style.display = 'none'
            }

        } else {
            alertNotImageUpdate()
        }
    }

    removeImageButtonUpdate.addEventListener('click', ()=> {
        fileImputTextUpdate.value = ''
        dropAreaUpdate.style.border = "2px dashed #ccc"
        dropAreaUpdate.style.textAlign = "center"
        dropAreaUpdate.style.backgroundColor = '#fff'
        dropAreaUpdate.style.display = 'block'
        dropAreaUpdate.innerHTML = 'Arrastra y suelta una imagen aquí'
        removeImageButtonUpdate.style.display = 'none'
        alertUpdate.style.display = 'none'
    })
}


let maxOciQuantity
document.getElementById('ociQuantityHidden') ?
    maxOciQuantity = parseInt(document.getElementById('ociQuantityHidden').value)
    :
    maxOciQuantity=0

var arrayBtnUpdateOci = []

for (let m=0; m<maxOciQuantity; m++) {
    for (let n=0; n<maxOciQuantity; n++) {

        let btnUpdateOci = document.getElementById(`btnUpdateOci${m}_${n}`)
        if(btnUpdateOci) {
            arrayBtnUpdateOci.push(btnUpdateOci)
        }
    }
}

arrayBtnUpdateOci.forEach(function(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        // console.log('element.id:', element.id)
        const projectId = document.getElementById(`projectIdHidden${element.id.slice(12)}`).value
        const imageOci = document.getElementById(`imageOci${element.id.slice(12)}`).src
        const ociDescription = document.getElementById(`ociDescription${element.id.slice(12)}`).innerText
        const ociNumber = document.getElementById(`ociNumberHidden${element.id.slice(12)}`).value
        const ociKNumber = document.getElementById(`ociKNumberHidden${element.id.slice(12)}`).value
        // console.log('ociKNumber', ociKNumber)
        messageUpdateOci(
            projectId,
            imageOci,
            ociDescription,
            ociNumber,
            ociKNumber
        )
    })
})

function disabledBtnAceptar () {
    let btnAceptarModal = document.getElementsByClassName('swal2-confirm');
    const allInputs = document.querySelectorAll('input[type="number"],select')
    const allInputsText = document.querySelectorAll('input[type="text"],textarea')
    const allInputsCheck = document.querySelectorAll('input[type="checkbox"]')
    const dropAreaUpdate = document.getElementById('drop-areaUpdate')
    
    const removeBtnImage = document.getElementById('removeImage')
    if (removeBtnImage) {
        removeBtnImage.addEventListener('transitionend', () => {

            if (removeBtnImage.style.display === 'flex') {
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            }
        })
    }
    
    allInputs.forEach(function(input) {
        if (input) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("border-primary")
                input.classList.add("border-2")
                input.classList.add("shadow")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            })    
        }        
    })

    allInputsText.forEach(function(input) {
        if (input) {
            input.addEventListener('input', (event) => {
                event.preventDefault()
                input.classList.add("border-primary")
                input.classList.add("border-2")
                input.classList.add("shadow")
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            })    
        }        
    })

    allInputsCheck.forEach(function(input) {
        if (input.value) {
            // const toggle = () => input.classList.toggle("bg-danger");
            input.addEventListener('change', (event) => {
                event.preventDefault()
                // input.classList.add("bg-danger")
                input.classList.toggle("bg-danger")
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
            if (mutation.type === 'childList') {
                // Realizar acciones en respuesta al cambio
                btnAceptarModal[0].removeAttribute('disabled')
                btnAceptarModal[0].style = "cursor: pointer;"
            }
        }
    });

    // Configurar el observador para que observe los cambios en los nodos hijos del div
    observer.observe(dropAreaUpdate, { childList: true });
}