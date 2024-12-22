const socket = io.connect()
let URL_GOOGLE_STORE_IMAGESCONSUMIBLES

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMAGESCONSUMIBLES = config.URL_GOOGLE_STORE_IMAGESCONSUMIBLES
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
            document.getElementById("formUpdateCutTool").submit()
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
        btnUpdateCuttingTool.addEventListener('click', (event) => {
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
//----------------------------------------------------------------

let inputsDeTexto = document.querySelectorAll('input[type="text"], textarea, input[type="number"], input[type="file"], input[type="hidden"]')
    .forEach(function(input) {
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
    
let inputsDeCheckbox = document.querySelectorAll('input[type="checkbox"]')
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

let inputsSelect = document.querySelectorAll('select')
.forEach(function(inputsSelect) {
    if (inputsSelect) {
        inputsSelect.addEventListener('input', (event) => {
            event.preventDefault()
            inputsSelect.classList.add("border-primary", "border-2", "shadow")
            btnUpdateCuttingTool.removeAttribute('disabled')
            btnUpdateCuttingTool.style = "cursor: pointer;"
        })
    }
})

let diam = document.getElementById("diam"),
    type = document.getElementById('type'),
    largo = document.getElementById("largo"),
    radio = document.getElementById('radio'),
    cono = document.getElementById('cono'),
    reduccion = document.getElementById('reduccion'),
    prolongacion = document.getElementById('prolongacion'),
    arrastre = document.getElementById('arrastre'),
    terminacion = document.getElementById('terminacion'),
    codeInput = document.getElementById('code'),
    stockInput = document.getElementById('stock')

    typeHidden = document.getElementById('typeHidden'),
    diamHidden = document.getElementById("diamHidden"),
    largoHidden = document.getElementById("largoHidden"),
    radioHidden = document.getElementById('radioHidden'),
    conoHidden = document.getElementById('conoHidden'),
    reduccionHidden = document.getElementById('reduccionHidden'),
    prolongacionHidden = document.getElementById('prolongacionHidden'),
    arrastreHidden = document.getElementById('arrastreHidden'),
    terminacionHidden = document.getElementById('terminacionHidden'),
    codeHidden = document.getElementById("codeHidden");

diam.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

largo.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

type.addEventListener("change", () => {
    if (type.value === 'TOR') {
        radio.removeAttribute('disabled')
    } else {
        radio.setAttribute('disabled', true)
        radio.value = radioHidden = ''
    }
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

radio.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

cono.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

reduccion.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

prolongacion.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

arrastre.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

terminacion.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

stock.addEventListener("change", () => {
    updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)
});

function updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion) {
    let value = parseInt(diam.value, 10),
    valueLargo = parseInt(largo.value, 10)

    typeHidden.value = type.value
    diamHidden.value = value
    largoHidden.value = valueLargo
    radioHidden.value = radio.value
    conoHidden.value = cono.value
    reduccionHidden.value = reduccion.value
    prolongacionHidden.value = prolongacion.value
    arrastreHidden.value = arrastre.value
    terminacionHidden.value = terminacion.value

    let valorRadio, valorCono, valorReduccion, valorProlongacion, valorArrastre, valorTerminacion
        
    radio.value !== '' ? valorRadio = `_${radio.value}` : valorRadio = radio.value
    cono.value !== '' ? valorCono = `_${cono.value}` : valorCono = cono.value
    reduccion.value !== '' ? valorReduccion = `_${reduccion.value}` : valorReduccion = reduccion.value
    prolongacion.value !== '' ? valorProlongacion = `_${prolongacion.value}` : valorProlongacion = prolongacion.value
    arrastre.value !== '' ? valorArrastre = `_${arrastre.value}` : valorArrastre = arrastre.value
    terminacion.value !== '' ? valorTerminacion = `_${terminacion.value}` : valorTerminacion = terminacion.value

    codeInput.value = codeHidden.value = type.value + value + valorRadio + '_L' + valueLargo +
                                        valorCono + valorReduccion + valorProlongacion + valorArrastre + valorTerminacion

    disabledBtnUpdate(btnUpdateCuttingTool)
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

function disabledBtnUpdate() {
    const allInputs = document.querySelectorAll('select')
    allInputs.forEach(function(input) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("border-primary", "border-2", "shadow")
                btnUpdateCuttingTool.removeAttribute('disabled')
                btnUpdateCuttingTool.style = "cursor: pointer;"
            })        
    })
}
disabledBtnUpdate()

updateValues(type, radio, cono, reduccion, prolongacion, arrastre, terminacion)