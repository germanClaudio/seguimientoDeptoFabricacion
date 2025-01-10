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
    text: `El consumible ${designation} será modificado!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificalo!'
    
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("formUpdateConsumibles").submit()
            setTimeout(() => {
                Swal.fire(
                    'Modificado!',
                    `El consumible ${designation}, ha sido modificado exitosamente.`,
                    'success'
                )
            }, 500)
            
        } else {
            Swal.fire(
                'No modificado!',
                `El consumible ${designation}, no ha sido modificado.`,
                'info'
            )
            return false
        }
    })
}

const btnUpdateConsumible = document.getElementById('btnUpdateConsumibles')
    if (btnUpdateConsumible) {
        btnUpdateConsumible.addEventListener('click', (event) => {
            event.preventDefault()
            const desigantion = document.getElementById('designation').value
            message(desigantion)
        })
    }

// --------------- Update Consumible ------------------------
// ----------- Consumible  Image behavior ---------------
const dropAreaConsumibleUpdate = document.getElementById('drop-areaConsumiblesUpdate'),
    fileInputConsumibleUpdate = document.getElementById('fileInputConsumiblesUpdate'),
    fileImputTextConsumibleUpdate = document.getElementById('fileInputTextImageConsumiblesUpdate'),
    removeImageButtonConsumibleUpdate = document.getElementById('removeImageConsumiblesUpdate'),
    alertConsumibleUpdate = document.getElementById('alertImageConsumiblesUpdate'),
    alertConsumibleSize = document.getElementById('alertSizeImageConsumiblesUpdate')

    Object.assign(dropAreaConsumibleUpdate.style, {
        width: "70%",
        height: "200px",
        border: "2px dashed #ccc",
        textAlign: "center",
        margin: "0 auto 0 50px",
        borderRadius:"5px",
        lineHeight: "200px",
        cursor: "pointer"
    });

dropAreaConsumibleUpdate.addEventListener('dragover', (e) => {
    e.preventDefault()
    Object.assign(dropAreaConsumibleUpdate.style, {
        border: "2px dashed #77d",
        backgroundColor: '#7777dd10'
    })
})

dropAreaConsumibleUpdate.addEventListener('dragleave', (e) => {
    e.preventDefault()
    Object.assign(dropAreaConsumibleUpdate.style, {
        border: "2px dashed #ccc",
        backgroundColor: '#9a9a9a'
    })
})

function alertRefresh() {
    removeImageButtonConsumibleUpdate.style.display = 'none'
    fileImputTextConsumibleUpdate.value = ''
    fileInputConsumibleUpdate.value = ''

    Object.assign(dropAreaConsumibleUpdate.style, {
        border: "2px dashed #ccc",
        textAlign: "center",
        backgroundColor: "#9a9a9a",
        display: "block"
    });
    dropAreaConsumibleUpdate.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageConsumibleUpdate() {
    alertConsumibleUpdate.style.display = 'flex'
    alertConsumibleSize.style.display = 'none'
    alertRefresh()
}

function alertSizeImageConsumible() {
    alertConsumibleSize.style.display = 'flex'
    alertConsumibleUpdate.style.display = 'none'
    alertRefresh()
}

dropAreaConsumibleUpdate.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaConsumibleUpdate.style, {
            border: "3px dashed #2d2",
            backgroundColor: "#22dd2210"
        });        
        handleFileUploadConsumibleUpdate(file)

    } else {
        alertNotImageConsumibleUpdate()
    }     
})

dropAreaConsumibleUpdate.addEventListener('click', () => {
    fileInputConsumibleUpdate.click()
})

fileInputConsumibleUpdate.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputConsumibleUpdate.files[0]
    console.log('file: ', file)
    if (file && file.type.startsWith('image/')) {
        Object.assign(dropAreaConsumibleUpdate.style, {
            border: "3px dashed #2d2",
            backgroundColor: "#22dd2210"
        });
        handleFileUploadConsumibleUpdate(file)

    } else {
        alertNotImageConsumibleUpdate()
    }     
})

function handleFileUploadConsumibleUpdate(file) {
    const fileSize = file.size,
        fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_IMAGESCONSUMIBLES
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.'),
            name = file.name.substring(0, dotIndex),
            extension = file.name.substring(dotIndex)
        
        fileImputTextConsumibleUpdate.value = pathToImage + name.replace(/[^a-zA-Z0-9./_ ]/g, '-') + "-" + formatDate(new Date()) + extension
        removeImageButtonConsumibleUpdate.style.display = 'flex'
        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaConsumibleUpdate.innerHTML = 
                `<img class="p-2 mb-1" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertConsumibleUpdate.style.display = 'none'
                alertConsumibleSize.style.display = 'none'
        }

    } else {
        alertSizeImageConsumible()
    }
}

removeImageButtonConsumibleUpdate.addEventListener('click', (e)=> {
    e.preventDefault()
    alertConsumibleUpdate.style.display = 'none'
    alertConsumibleSize.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})
//----------------------------------------------------------------

let inputsDeTexto = document.querySelectorAll('input[type="text"], textarea, input[type="number"], input[type="file"], input[type="hidden"]')
.forEach(function(input) {
    if (input) {
        input.addEventListener('keydown', function(event) {
            let key = event.key, // Obtener el código de la tecla presionada
                forbiddenChars = /["$%?¡¿^=!'~`´ñÑáéíóúØ\\*{}\[\]<>@]/; // Lista de caracteres especiales prohibidos

            if (forbiddenChars.test(key)) {  // Verificar si la tecla presionada es un carácter especial
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
            let accentedChars = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', ñ: 'n', Ñ: 'N' }; // Vocales con acentos

            // Reemplazar caracteres prohibidos
            let newValue = input.value.replace(forbiddenChars, '');

            // Reemplazar vocales con acento por las equivalentes sin acento
            newValue = newValue.replace(/[áéíóúÁÉÍÓÚñÑ]/g, function(match) {
                return accentedChars[match];
            });

            // Actualizar el valor del input
            input.value = newValue;
        });

        input.addEventListener('input', (event) => {
            event.preventDefault()
            input.classList.add("border-primary", "border-2", "shadow")
            btnUpdateConsumible.removeAttribute('disabled')
            btnUpdateConsumible.style = "cursor: pointer;"
        })
    }
})

let inputsDeCheckbox = document.querySelectorAll('input[type="checkbox"]')
.forEach(function(input) {
    if (input) {
        input.addEventListener('input', (event) => {
            event.preventDefault()
            input.classList.add("border-primary", "border-2", "shadow")
            btnUpdateConsumible.removeAttribute('disabled')
            btnUpdateConsumible.style = "cursor: pointer;"
        })
    }
})

let inputsSelect = document.querySelectorAll('select')
.forEach(function(inputsSelect) {
    if (inputsSelect) {
        inputsSelect.addEventListener('input', (event) => {
            event.preventDefault()
            inputsSelect.classList.add("border-primary", "border-2", "shadow")
            btnUpdateConsumible.removeAttribute('disabled')
            btnUpdateConsumible.style = "cursor: pointer;"
        })
    }
})

let type = document.getElementById('type'),
    codeInput = document.getElementById('code'),
    stockInput = document.getElementById('stock')

    typeHidden = document.getElementById('typeHidden'),
    codeHidden = document.getElementById("codeHidden");

    // Crear una nueva instancia de MutationObserver y pasar una función de callback
const observer = new MutationObserver(function(mutationsList, observer) {
    // Iterar sobre las mutaciones observadas
    for(let mutation of mutationsList) {
        // Verificar si la mutación fue una inserción o eliminación de nodos
        if (mutation.type === 'childList') {
            btnUpdateConsumible.removeAttribute('disabled')
            btnUpdateConsumible.style = "cursor: pointer;"
        }
    }
});
// Configurar el observador para que observe los cambios en los nodos hijos del div
observer.observe(dropAreaConsumibleUpdate, { childList: true });

function disabledBtnUpdate() {
    const allInputs = document.querySelectorAll('select')
    allInputs.forEach(function(input) {
            input.addEventListener('change', (event) => {
                event.preventDefault()
                input.classList.add("border-primary", "border-2", "shadow")
                btnUpdateConsumible.removeAttribute('disabled')
                btnUpdateConsumible.style = "cursor: pointer;"
            })        
    })
}
disabledBtnUpdate()

// -------- QR code generator ---------------
const MAX_QR_LENGTH = 1000; // Límite máximo para Versión 40 con nivel M 2331
const versionQR = 10; //1-10-20-40 Establece la versión máxima

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formUpdateConsumibles"),
        qrContainer = document.getElementById("qrConsumibleUpdate"),
        downloadButton = document.getElementById('downloadQR'),
        loader = document.getElementById("loaderUpdate"), // Asegúrate de tener un elemento con ID 'loader'
        qrLabel = document.getElementById("qrLabel"),
        qrConsumibleInput = document.getElementById("qrConsumibleInput");

    let isGeneratingQR = false;
    downloadButton.style.display = 'block';
    // Mostrar loader mientras se genera el QR
    function generateQRCodeWithLoader(data) {
        qrLabel.innerText = `QR (autogenerado) ${data.length}/${MAX_QR_LENGTH} caracteres`
        if (data.length > MAX_QR_LENGTH) {
            Swal.fire(
                `El contenido excede el límite permitido (${MAX_QR_LENGTH} caracteres) para el código QR.`,
                'info'
            );
            return; // Detiene la generación del QR
        }

        if (isGeneratingQR) return; // Evita generar múltiples QRs
        isGeneratingQR = true;

        loader.classList.add('active'); // Muestra el loader
        qrContainer.classList.add('faded'); // Hace el QR semitransparente

        // Simula un retardo para mostrar el loader
        setTimeout(() => {
            qrContainer.innerHTML = ''; // Limpia cualquier contenido previo

            // Usar la librería qrCode-generator
            const qr = qrcode(versionQR, 'L'); // Versión 40 y Nivel M
            qr.addData(data);
            qr.make();

            // Genera el código QR como un elemento <img>
            qrContainer.innerHTML = qr.createImgTag(6); // Tamaño del módulo ajustado (6)
            loader.classList.remove('active'); // Oculta el loader
            qrContainer.classList.remove('faded'); // Restaura la opacidad del QR

            isGeneratingQR = false; // Resetea el indicador

            // Habilitar el botón de descarga
            const qrImage = qrContainer.querySelector('img');
            if (qrImage) {
                qrImage.id = "qrImageUpdated";
                qrImage.classList.add("img-thumbnail", "rounded", "my-1", "mx-auto", "text-center")
                qrConsumibleInput.value = qrImage.src
                downloadButton.style.display = 'block';
                downloadButton.addEventListener("click", () => downloadQRCode(qrImage.src));
            }
        }, 800); // Cambia el tiempo según el procesamiento real
    }

    // Evento para capturar datos y generar el QR
    form.addEventListener("input", () => {
        const designation = document.getElementById("designation").value.trim(),
            code = document.getElementById("code").value.trim(),
            type = document.getElementById("type").value,
            characteristics = document.getElementById("characteristics").value.trim();

        // Mapeo de tipos a sus correspondientes descripciones
        const typeMapping = {
            epp: 'EPP',
            insertos: 'Insertos',
            consumiblesAjuste: 'Consumibles Ajuste',
            consumiblesMeca: 'Consumibles Mecanizado',
        };

        // Obtener el valor correspondiente o asignar un valor predeterminado
        const qrType = typeMapping[type] || "Otros Consumibles";

        // Datos a incluir en el QR
        const qrData = JSON.stringify({
            designation,
            code,
            qrType,
            characteristics,
        });

        // Generar QR si hay datos válidos
        if (designation && code) {
            generateQRCodeWithLoader(qrData);
        } else {
            qrContainer.innerHTML = "Faltan datos para generar el código QR.";
            qrConsumibleInput.value = ''
        }
    });

    // Función para descargar el QR como imagen
    downloadButton.addEventListener('click', () => {
        const qrCanvas = qrContainer.querySelector('canvas');
        if (qrCanvas) {
            const link = document.createElement('a');
            link.href = qrCanvas.toDataURL(); // Convierte el canvas a un formato de imagen
            link.download = `codigo-qr${type.value}.png`;
            link.click(); // Dispara el evento de descarga
        } else {
            Swal.fire(
                'Error!',
                `Primero debe generar el código QR para descargar.`,
                'info'
            )
            return false
        }
    });

});