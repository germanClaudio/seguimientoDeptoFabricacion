const socket = io.connect()
let URL_GOOGLE_STORE_TOOLIMAGE

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_TOOLIMAGE = config.URL_GOOGLE_STORE_TOOLIMAGE
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
        document.getElementById("formUpdateTool").submit()
        setTimeout(() => {
            Swal.fire(
                'Modificada!',
                `La máquina ${designation}, ha sido modificada exitosamente.`,
                'success'
            )
        }, 500)
        
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
if (btnUpdateTool) {
btnUpdateTool.addEventListener('click', (event)=>{
    event.preventDefault()
    const desigantion = document.getElementById('designation').value
    message(desigantion)
})
}

// --------------- Update Tool ------------------------
// ----------- Tool  Image behavior ---------------
const dropAreaToolUpdate = document.getElementById('drop-areaToolUpdate'),
    fileInputToolUpdate = document.getElementById('fileInputToolUpdate'),
    fileImputTextToolUpdate = document.getElementById('fileInputTextImageToolUpdate'),
    removeImageButtonToolUpdate = document.getElementById('removeImageToolUpdate'),
    alertToolUpdate = document.getElementById('alertImageToolUpdate'),
    alertToolSize = document.getElementById('alertSizeImageToolUpdate')

    Object.assign(dropAreaToolUpdate.style, {
        width: "70%",
        height: "200px",
        border: "2px dashed #ccc",
        textAlign: "center",
        margin: "0 auto 0 50px",
        borderRadius:"5px",
        lineHeight: "200px",
        cursor: "pointer"
    });

dropAreaToolUpdate.addEventListener('dragover', (e) => {
    e.preventDefault()
    Object.assign(dropAreaToolUpdate.style, {
        border: "2px dashed #77d",
        backgroundColor: '#7777dd10'
    })
})

dropAreaToolUpdate.addEventListener('dragleave', (e) => {
    e.preventDefault()
    Object.assign(dropAreaToolUpdate.style, {
        border: "2px dashed #ccc",
        backgroundColor: '#9a9a9a'
    })
})

function alertRefresh() {
    removeImageButtonToolUpdate.style.display = 'none'
    fileImputTextToolUpdate.value = ''
    fileInputToolUpdate.value = ''

    Object.assign(dropAreaToolUpdate.style, {
        border: "2px dashed #ccc",
        textAlign: "center",
        backgroundColor: "#9a9a9a",
        display: "block"
    });
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
        Object.assign(dropAreaToolUpdate.style, {
            border: "3px dashed #2d2",
            backgroundColor: "#22dd2210"
        });        
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
    console.log('file: ', file)
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaToolUpdate.style, {
            border: "3px dashed #2d2",
            backgroundColor: "#22dd2210"
        });
        handleFileUploadToolUpdate(file)

    } else {
        alertNotImageToolUpdate()
    }     
})

function handleFileUploadToolUpdate(file) {
    const fileSize = file.size,
        fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_TOOLIMAGE
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.'),
            name = file.name.substring(0, dotIndex),
            extension = file.name.substring(dotIndex)
        
        fileImputTextToolUpdate.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
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

const typeHidden = document.getElementById('typeHidden'),
    type = document.getElementById('type')

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
                let key = event.key, // Obtener el código de la tecla presionada
                    forbiddenChars = /["$%?¡¿^=!'~`\\*{}\[\]<>@]/; // Lista de caracteres especiales prohibidos

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
                btnUpdateTool.removeAttribute('disabled')
                btnUpdateTool.style = "cursor: pointer;"
            })
        }
    })
    
    let inputsDeCheckbox = document.querySelectorAll('input[type="checkbox"], input[type="select"]')
    .forEach(function(input) {
        if (input) {
            input.addEventListener('input', (event) => {
                event.preventDefault()
                input.classList.add("border-primary", "border-2", "shadow")
                btnUpdateTool.removeAttribute('disabled')
                btnUpdateTool.style = "cursor: pointer;"
            })
        }
    })

    let inputsSelect = document.getElementById('type')
        if (inputsSelect) {
            inputsSelect.addEventListener('input', (event) => {
                event.preventDefault()
                inputsSelect.classList.add("border-primary", "border-2", "shadow")
                btnUpdateTool.removeAttribute('disabled')
                btnUpdateTool.style = "cursor: pointer;"
            })
        }

    // Crear una nueva instancia de MutationObserver y pasar una función de callback
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Iterar sobre las mutaciones observadas
        for(let mutation of mutationsList) {
            // Verificar si la mutación fue una inserción o eliminación de nodos
            if (mutation.type === 'childList') {
                btnUpdateTool.removeAttribute('disabled')
                btnUpdateTool.style = "cursor: pointer;"
            }
        }
    });

    // Configurar el observador para que observe los cambios en los nodos hijos del div
    observer.observe(dropAreaToolUpdate, { childList: true });