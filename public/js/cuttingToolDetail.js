const socket = io.connect()
let URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS = config.URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS
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
    text: `La herramienta ${designation} será modificada!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificala!'
    
}).then((result) => {
    if (result.isConfirmed) {
        document.getElementById("formUpdateCuttingTool").submit()
        setTimeout(() => {
            Swal.fire(
                'Modificada!',
                `La herramienta ${designation}, ha sido modificada exitosamente.`,
                'success'
            )
        }, 500)
        
    } else {
        Swal.fire(
            'No modificado!',
            `La herramienta ${designation}, no ha sido modificada.`,
            'info'
        )
        return false
    }
})
}

const btnUpdateCuttingTool = document.getElementById('btnUpdateCuttingTool')
if (btnUpdateCuttingTool) {
btnUpdateCuttingTool.addEventListener('click', (event)=>{
    event.preventDefault()
    const desigantion = document.getElementById('designation').value
    message(desigantion)
})
}

// --------------- Update CuttingTool ------------------------
// ----------- CuttingTool  Image behavior ---------------
const dropAreaCuttingToolUpdate = document.getElementById('drop-areaCuttingToolUpdate'),
    fileInputCuttingToolUpdate = document.getElementById('fileInputCuttingToolUpdate'),
    fileImputTextCuttingToolUpdate = document.getElementById('fileInputTextImageCuttingToolUpdate'),
    removeImageButtonCuttingToolUpdate = document.getElementById('removeImageCuttingToolUpdate'),
    alertCuttingToolUpdate = document.getElementById('alertImageCuttingToolUpdate'),
    alertCuttingToolSize = document.getElementById('alertSizeImageCuttingToolUpdate')

    Object.assign(dropAreaCuttingToolUpdate.style, {
        width: "70%",
        height: "200px",
        border: "2px dashed #ccc",
        textAlign: "center",
        margin: "0 auto 0 50px",
        borderRadius:"5px",
        lineHeight: "200px",
        cursor: "pointer"
    });

dropAreaCuttingToolUpdate.addEventListener('dragover', (e) => {
    e.preventDefault()
    Object.assign(dropAreaCuttingToolUpdate.style, {
        border: "2px dashed #77d",
        backgroundColor: '#7777dd10'
    })
})

dropAreaCuttingToolUpdate.addEventListener('dragleave', (e) => {
    e.preventDefault()
    Object.assign(dropAreaCuttingToolUpdate.style, {
        border: "2px dashed #ccc",
        backgroundColor: '#9a9a9a'
    })
})

function alertRefresh() {
    removeImageButtonCuttingToolUpdate.style.display = 'none'
    fileImputTextCuttingToolUpdate.value = ''
    fileInputCuttingToolUpdate.value = ''

    Object.assign(dropAreaCuttingToolUpdate.style, {
        border: "2px dashed #ccc",
        textAlign: "center",
        backgroundColor: "#9a9a9a",
        display: "block"
    });
    dropAreaCuttingToolUpdate.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageCuttingToolUpdate() {
    alertCuttingToolUpdate.style.display = 'flex'
    alertCuttingToolSize.style.display = 'none'
    alertRefresh()
}

function alertSizeImageCuttingTool() {
    alertCuttingToolSize.style.display = 'flex'
    alertCuttingToolUpdate.style.display = 'none'
    alertRefresh()
}

dropAreaCuttingToolUpdate.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaCuttingToolUpdate.style, {
            border: "3px dashed #2d2",
            backgroundColor: "#22dd2210"
        });        
        handleFileUploadCuttingToolUpdate(file)

    } else {
        alertNotImageCuttingToolUpdate()
    }     
})

dropAreaCuttingToolUpdate.addEventListener('click', () => {
    fileInputCuttingToolUpdate.click()
})

fileInputCuttingToolUpdate.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputCuttingToolUpdate.files[0]
    console.log('file: ', file)
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaCuttingToolUpdate.style, {
            border: "3px dashed #2d2",
            backgroundColor: "#22dd2210"
        });
        handleFileUploadCuttingToolUpdate(file)

    } else {
        alertNotImageCuttingToolUpdate()
    }     
})

function handleFileUploadCuttingToolUpdate(file) {
    const fileSize = file.size,
        fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_TOOLIMAGE
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.'),
            name = file.name.substring(0, dotIndex),
            extension = file.name.substring(dotIndex)
        
        fileImputTextCuttingToolUpdate.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
        removeImageButtonCuttingToolUpdate.style.display = 'flex'
        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaCuttingToolUpdate.innerHTML = 
                `<img class="p-2 mb-1" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertCuttingToolUpdate.style.display = 'none'
                alertCuttingToolSize.style.display = 'none'
        }

    } else {
        alertSizeImageCuttingTool()
    }
}

removeImageButtonCuttingToolUpdate.addEventListener('click', (e)=> {
    e.preventDefault()
    alertCuttingToolUpdate.style.display = 'none'
    alertCuttingToolSize.style.display = 'none'
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
                btnUpdateCuttingTool.removeAttribute('disabled')
                btnUpdateCuttingTool.style = "cursor: pointer;"
            })
        }
    })
    
    let inputsDeCheckbox = document.querySelectorAll('input[type="checkbox"], input[type="select"]')
    .forEach(function(input) {
        if (input) {
            input.addEventListener('input', (event) => {
                event.preventDefault()
                input.classList.add("border-primary", "border-2", "shadow")
                btnUpdateCuttingTool.removeAttribute('disabled')
                btnUpdateCuttingTool.style = "cursor: pointer;"
            })
        }
    })

    let inputsSelect = document.getElementById('type')
        if (inputsSelect) {
            inputsSelect.addEventListener('input', (event) => {
                event.preventDefault()
                inputsSelect.classList.add("border-primary", "border-2", "shadow")
                btnUpdateCuttingTool.removeAttribute('disabled')
                btnUpdateCuttingTool.style = "cursor: pointer;"
            })
        }

    // Crear una nueva instancia de MutationObserver y pasar una función de callback
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Iterar sobre las mutaciones observadas
        for(let mutation of mutationsList) {
            // Verificar si la mutación fue una inserción o eliminación de nodos
            if (mutation.type === 'childList') {
                btnUpdateCuttingTool.removeAttribute('disabled')
                btnUpdateCuttingTool.style = "cursor: pointer;"
            }
        }
    });

    // Configurar el observador para que observe los cambios en los nodos hijos del div
    observer.observe(dropAreaCuttingToolUpdate, { childList: true });

const diam = document.getElementById("diam"),
    diamHidden = document.getElementById("diamHidden"),
    largo = document.getElementById("largo"),
    largoHidden = document.getElementById("largoHidden"),
    codeInput = document.getElementById('code'),
    codeHidden = document.getElementById("codeHidden"),
    typeInput = document.getElementById('type').value

diam.addEventListener("change", () => {
    updateValues(type)
});

largo.addEventListener("change", () => {
    updateValues(type)
});

type.addEventListener("change", () => {
    updateValues(type)
});

function updateValues(type) {
    value = parseInt(diam.value, 10)
    valueLargo = parseInt(largo.value, 10)

    diamHidden.value = value;
    largoHidden.value = valueLargo;

    codeInput.value = codeHidden.value = type.value.toUpperCase() + value + '_L' + valueLargo
}