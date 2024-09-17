let URL_GOOGLE_STORE_TOOLIMAGE = 'https://storage.googleapis.com/imagenesproyectosingenieria/upload/ToolsImages/'

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const YY = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

// --------------- Update Tool ------------------------
// ----------- Tool  Image behavior ---------------
const dropAreaToolUpdate = document.getElementById('drop-areaToolUpdate')
const fileInputToolUpdate = document.getElementById('fileInputImageToolUpdate')
const fileImputTextToolUpdate = document.getElementById('fileInputTextImageToolUpdate')
const removeImageButtonToolUpdate = document.getElementById('removeImageToolUpdate')
const alertToolUpdate = document.getElementById('alertToolUpdate')
const alertToolSize = document.getElementById('alertToolSize')

dropAreaToolUpdate.style.width = "70%"
dropAreaToolUpdate.style.height = "200px"
dropAreaToolUpdate.style.border = "2px dashed #ccc"
dropAreaToolUpdate.style.textAlign = "center"
dropAreaToolUpdate.style.margin = "0 auto 0 50px"
dropAreaToolUpdate.style.borderRadius = "5px"
dropAreaToolUpdate.style.lineHeight = "200px"
dropAreaToolUpdate.style.cursor = "pointer"

dropAreaToolUpdate.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaToolUpdate.style.border = '2px dashed #77d'
    dropAreaToolUpdate.style.backgroundColor = '#7777dd10'
})

dropAreaToolUpdate.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaToolUpdate.style.border = '2px dashed #ccc'
    dropAreaToolUpdate.style.backgroundColor = '#9a9a9a'
})

function alertRefresh() {
    removeImageButtonToolUpdate.style.display = 'none'
    fileImputTextToolUpdate.value = ''
    fileInputToolUpdate.value = ''
    dropAreaToolUpdate.style.border = "2px dashed #ccc"
    dropAreaToolUpdate.style.textAlign = "center"
    dropAreaToolUpdate.style.backgroundColor = '#9a9a9a'
    dropAreaToolUpdate.style.display = 'block'
    dropAreaToolUpdate.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageToolUpdate() {
    alertToolUpdate.style.display = 'flex'
    alertToolSize.style.display = 'none'
    alertRefresh()
}

function alertSizeImageTool() {
    alertToolSize.style.display = 'flex'
    alertToolUpdate.style.display = 'none'
    alertRefresh()
}

dropAreaToolUpdate.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaToolUpdate.style.border = '3px dashed #2d2'
        dropAreaToolUpdate.style.backgroundColor = '#22dd2210'
        
        handleFileUploadToolUpdate(file)

    } else {
        alertNotImageToolUpdate()
    }     
})

dropAreaToolUpdate.addEventListener('click', () => {
    fileInputToolUpdate.click()
})

fileInputToolUpdate.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputToolUpdate.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaToolUpdate.style.border = '3px dashed #2d2'
        dropAreaToolUpdate.style.backgroundColor = '#22dd2210'

        handleFileUploadToolUpdate(file)

    } else {
        alertNotImageToolUpdate()
    }     
})

function handleFileUploadToolUpdate(file) {
    const fileSize = file.size
    const fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_TOOLIMAGE
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex);
        const extension = file.name.substring(dotIndex);
        fileImputTextToolUpdate.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonToolUpdate.style.display = 'flex'
        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaToolUpdate.innerHTML = 
                `<img class="p-2 mb-1" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertToolUpdate.style.display = 'none'
                alertToolSize.style.display = 'none'
        }

    } else {
        alertSizeImageTool()
    }
}

removeImageButtonToolUpdate.addEventListener('click', (e)=> {
    e.preventDefault()
    alertToolUpdate.style.display = 'none'
    alertToolSize.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})

function message(designation) {
        Swal.fire({
        title: 'Esta seguro?',
        text: `La máquina ${designation} será modificada!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, modificala!'
        
    }).then((result) => {
        if (result.isConfirmed) {
            setTimeout(() => {
                Swal.fire(
                    'Modificada!',
                    `La máquina ${designation}, ha sido modificada exitosamente.`,
                    'success'
                )
            }, 500)
            document.getElementById("formUpdateTool").submit()
            
        } else {
            Swal.fire(
                'No modificado!',
                `La máquina ${designation}, no ha sido modificada.`,
                'info'
            )
            return false
        }
    })
}

const btnUpdateTool = document.getElementById('btnUpdateTool')
btnUpdateTool.addEventListener('click', (event)=>{
    event.preventDefault()
    const desigantion = document.getElementById('designation').value
    message(desigantion)
})

var inputsDeTexto = document.querySelectorAll('input[type="text"], textarea, input[type="file"]')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        if (input) {
            input.addEventListener('keydown', function(event) {
                let key = event.key; // Obtener el código de la tecla presionada
                let forbiddenChars = /["$%?¡¿^=!'~`\\*{}\[\]<>@]/; // Lista de caracteres especiales prohibidos

                if (forbiddenChars.test(key)) {  // Verificar si la tecla presionada es un carácter especial
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
                btnUpdateTool.removeAttribute('disabled')
                btnUpdateTool.style = "cursor: pointer;"
            })
        }
    })
    
    var inputsDeCheckbox = document.querySelectorAll('input[type="checkbox"]')
    inputsDeCheckbox.forEach(function(input) {
        if (input) {
            input.addEventListener('input', (event) => {
                event.preventDefault()
                input.classList.add("border-primary")
                input.classList.add("border-2")
                input.classList.add("shadow")
                btnUpdateTool.removeAttribute('disabled')
                btnUpdateTool.style = "cursor: pointer;"
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
                btnUpdateTool.removeAttribute('disabled')
                btnUpdateTool.style = "cursor: pointer;"
            }
        }
    });

    // Configurar el observador para que observe los cambios en los nodos hijos del div
    observer.observe(dropAreaToolUpdate, { childList: true });