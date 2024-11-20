const socket = io.connect()
let URL_GOOGLE_STORE_SUPPLIERIMAGE

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_SUPPLIERIMAGE = config.URL_GOOGLE_STORE_SUPPLIERIMAGE
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

function message(designation) {
    Swal.fire({
    title: 'Esta seguro?',
    text: `El proveedor ${designation} será modificado!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificala!'
    
}).then((result) => {
    if (result.isConfirmed) {
        document.getElementById("formUpdateSupplier").submit()
        setTimeout(() => {
            Swal.fire(
                'Modificado!',
                `El proveedor ${designation}, ha sido modificado exitosamente.`,
                'success'
            )
        }, 300)
        
    } else {
        Swal.fire(
            'No modificado!',
            `El proveedor ${designation}, no ha sido modificado.`,
            'info'
        )
        return false
    }
})
}

const btnUpdateSupplier = document.getElementById('btnUpdateSupplier')
if (btnUpdateSupplier) {
btnUpdateSupplier.addEventListener('click', (event)=>{
    event.preventDefault()
    const desigantion = document.getElementById('designation').value
    message(desigantion)
})
}

// --------------- Update Supplier ------------------------
// ----------- Supplier  Image behavior ---------------
const dropAreaSupplierUpdate = document.getElementById('drop-areaSupplierUpdate')
const fileInputSupplierUpdate = document.getElementById('fileInputSupplierUpdate')
const fileImputTextSupplierUpdate = document.getElementById('fileInputTextImageSupplierUpdate')
const removeImageButtonSupplierUpdate = document.getElementById('removeImageSupplierUpdate')
const alertSupplierUpdate = document.getElementById('alertImageSupplierUpdate')
const alertSupplierSize = document.getElementById('alertSizeImageSupplierUpdate')

dropAreaSupplierUpdate.style.width = "70%"
dropAreaSupplierUpdate.style.height = "200px"
dropAreaSupplierUpdate.style.border = "2px dashed #ccc"
dropAreaSupplierUpdate.style.textAlign = "center"
dropAreaSupplierUpdate.style.margin = "0 auto 0 50px"
dropAreaSupplierUpdate.style.borderRadius = "5px"
dropAreaSupplierUpdate.style.lineHeight = "200px"
dropAreaSupplierUpdate.style.cursor = "pointer"

dropAreaSupplierUpdate.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaSupplierUpdate.style.border = '2px dashed #77d'
    dropAreaSupplierUpdate.style.backgroundColor = '#7777dd10'
})

dropAreaSupplierUpdate.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaSupplierUpdate.style.border = '2px dashed #ccc'
    dropAreaSupplierUpdate.style.backgroundColor = '#9a9a9a'
})

function alertRefresh() {
    removeImageButtonSupplierUpdate.style.display = 'none'
    fileImputTextSupplierUpdate.value = ''
    fileInputSupplierUpdate.value = ''
    dropAreaSupplierUpdate.style.border = "2px dashed #ccc"
    dropAreaSupplierUpdate.style.textAlign = "center"
    dropAreaSupplierUpdate.style.backgroundColor = '#9a9a9a'
    dropAreaSupplierUpdate.style.display = 'block'
    dropAreaSupplierUpdate.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageSupplierUpdate() {
    alertSupplierUpdate.style.display = 'flex'
    alertSupplierSize.style.display = 'none'
    alertRefresh()
}

function alertSizeImageSupplier() {
    alertSupplierSize.style.display = 'flex'
    alertSupplierUpdate.style.display = 'none'
    alertRefresh()
}

dropAreaSupplierUpdate.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaSupplierUpdate.style.border = '3px dashed #2d2'
        dropAreaSupplierUpdate.style.backgroundColor = '#22dd2210'
        
        handleFileUploadSupplierUpdate(file)

    } else {
        alertNotImageSupplierUpdate()
    }     
})

dropAreaSupplierUpdate.addEventListener('click', () => {
    fileInputSupplierUpdate.click()
})

fileInputSupplierUpdate.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputSupplierUpdate.files[0]
    console.log('file: ', file)
    if (file && file.type.startsWith('image/')) {
        dropAreaSupplierUpdate.style.border = '3px dashed #2d2'
        dropAreaSupplierUpdate.style.backgroundColor = '#22dd2210'

        handleFileUploadSupplierUpdate(file)

    } else {
        alertNotImageSupplierUpdate()
    }     
})

function handleFileUploadSupplierUpdate(file) {
    const fileSize = file.size
    const fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_SUPPLIERIMAGE
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex);
        const extension = file.name.substring(dotIndex);
        fileImputTextSupplierUpdate.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
        //console.log('fileImputTextSupplierUpdate: ', fileImputTextSupplierUpdate.value)
        removeImageButtonSupplierUpdate.style.display = 'flex'
        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaSupplierUpdate.innerHTML = 
                `<img class="p-2 mb-1" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertSupplierUpdate.style.display = 'none'
                alertSupplierSize.style.display = 'none'
        }

    } else {
        alertSizeImageSupplier()
    }
}

removeImageButtonSupplierUpdate.addEventListener('click', (e)=> {
    e.preventDefault()
    alertSupplierUpdate.style.display = 'none'
    alertSupplierSize.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})

const typeHidden = document.getElementById('typeHidden')
const type = document.getElementById('type')

document.addEventListener('DOMContentLoaded', ()=> {
    typeHidden.value = type.value
})

type.addEventListener('change', ()=>{
    typeHidden.value = type.value
})

let inputsDeTexto = document.querySelectorAll('input[type="text"], textarea, input[type="file"], input[type="hidden"]')
    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        if (input) {
            input.addEventListener('keydown', function(event) {
                let key = event.key; // Obtener el código de la tecla presionada
                let forbiddenChars = /["$%?¡¿^=!'~`\\*{}\[\]<>@]/; // Lista de caracteres especiales prohibidos

                if (forbiddenChars.test(key)) {  // Verificar si la tecla presionada es un carácter especial
                    // Cancelar el evento para evitar que se ingrese el carácter
                    event.preventDefault()
                    input.classList.add("border", "border-danger", "border-2")
                } else {
                    input.classList.remove("border", "border-danger", "border-2")
                }
            })

            input.addEventListener('input', (event) => {
                event.preventDefault()
                input.classList.add("border-primary", "border-2", "shadow")
                btnUpdateSupplier.removeAttribute('disabled')
                btnUpdateSupplier.style = "cursor: pointer;"
            })
        }
    })
    
    let inputsDeCheckbox = document.querySelectorAll('input[type="checkbox"], input[type="select"]')
    .forEach(function(input) {
        if (input) {
            input.addEventListener('input', (event) => {
                event.preventDefault()
                input.classList.add("border-primary", "border-2", "shadow")
                btnUpdateSupplier.removeAttribute('disabled')
                btnUpdateSupplier.style = "cursor: pointer;"
            })
        }
    })

    let inputsSelect = document.getElementById('type')
        if (inputsSelect) {
            inputsSelect.addEventListener('input', (event) => {
                event.preventDefault()
                inputsSelect.classList.add("border-primary", "border-2", "shadow")
                btnUpdateSupplier.removeAttribute('disabled')
                btnUpdateSupplier.style = "cursor: pointer;"
            })
        }

    // Crear una nueva instancia de MutationObserver y pasar una función de callback
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Iterar sobre las mutaciones observadas
        for(let mutation of mutationsList) {
            // Verificar si la mutación fue una inserción o eliminación de nodos
            if (mutation.type === 'childList') {
                // Realizar acciones en respuesta al cambio
                btnUpdateSupplier.removeAttribute('disabled')
                btnUpdateSupplier.style = "cursor: pointer;"
            }
        }
    });

    // Configurar el observador para que observe los cambios en los nodos hijos del div
    observer.observe(dropAreaSupplierUpdate, { childList: true });