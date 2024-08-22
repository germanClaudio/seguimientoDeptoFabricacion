let URL_GOOGLE_STORE_LOGOCLIENTS = 'https://storage.googleapis.com/imagenesproyectosingenieria/upload/LogoClientImages/'

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const YY = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

// --------------- Update Client ------------------------
// ----------- Logo Client Image behavior ---------------
const dropAreaLogoUpdate = document.getElementById('drop-areaLogoUpdate')
const fileInputLogoUpdate = document.getElementById('fileInputLogoUpdate')
const fileImputTextLogoUpdate = document.getElementById('fileInputTextLogoUpdate')
const removeImageButtonLogoUpdate = document.getElementById('removeImageLogoUpdate')
const alertLogoUpdate = document.getElementById('alertLogoUpdate')
const alertLogoClientSize = document.getElementById('alertLogoClientSize')

dropAreaLogoUpdate.style.width = "70%"
dropAreaLogoUpdate.style.height = "200px"
dropAreaLogoUpdate.style.border = "2px dashed #ccc"
dropAreaLogoUpdate.style.textAlign = "center"
dropAreaLogoUpdate.style.margin = "0 auto 0 50px"
dropAreaLogoUpdate.style.borderRadius = "5px"
dropAreaLogoUpdate.style.lineHeight = "200px"
dropAreaLogoUpdate.style.cursor = "pointer"

dropAreaLogoUpdate.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaLogoUpdate.style.border = '2px dashed #77d'
    dropAreaLogoUpdate.style.backgroundColor = '#7777dd10'
})

dropAreaLogoUpdate.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaLogoUpdate.style.border = '2px dashed #ccc'
    dropAreaLogoUpdate.style.backgroundColor = '#666666'
})

function alertRefresh() {
    removeImageButtonLogoUpdate.style.display = 'none'
    fileImputTextLogoUpdate.value = ''
    fileInputLogoUpdate.value = ''
    dropAreaLogoUpdate.style.border = "2px dashed #ccc"
    dropAreaLogoUpdate.style.textAlign = "center"
    dropAreaLogoUpdate.style.backgroundColor = '#666666'
    dropAreaLogoUpdate.style.display = 'block'
    dropAreaLogoUpdate.innerHTML = 'Haz click o arrastra y suelta una imagen aquí'
}

function alertNotImageLogoUpdate() {
    alertLogoUpdate.style.display = 'flex'
    alertLogoClientSize.style.display = 'none'
    alertRefresh()
}

function alertSizeImageLogoClient() {
    alertLogoClientSize.style.display = 'flex'
    alertLogoUpdate.style.display = 'none'
    alertRefresh()
}

dropAreaLogoUpdate.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaLogoUpdate.style.border = '3px dashed #2d2'
        dropAreaLogoUpdate.style.backgroundColor = '#22dd2210'
        
        handleFileUploadLogoUpdate(file)

    } else {
        alertNotImageLogoUpdate()
    }     
})

dropAreaLogoUpdate.addEventListener('click', () => {
    fileInputLogoUpdate.click()
})

fileInputLogoUpdate.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputLogoUpdate.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaLogoUpdate.style.border = '3px dashed #2d2'
        dropAreaLogoUpdate.style.backgroundColor = '#22dd2210'

        handleFileUploadLogoUpdate(file)

    } else {
        alertNotImageLogoUpdate()
    }     
})

function handleFileUploadLogoUpdate(file) {
    const fileSize = file.size
    const fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_LOGOCLIENTS
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex);
        const extension = file.name.substring(dotIndex);
        fileImputTextLogoUpdate.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonLogoUpdate.style.display = 'flex'
        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaLogoUpdate.innerHTML = 
                `<img class="p-2 mb-1" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
                alertLogoUpdate.style.display = 'none'
                alertLogoClientSize.style.display = 'none'
        }

    } else {
        alertSizeImageLogoClient()
    }
}

removeImageButtonLogoUpdate.addEventListener('click', (e)=> {
    e.preventDefault()
    alertLogoUpdate.style.display = 'none'
    alertLogoClientSize.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})

function message(clientName) {
        Swal.fire({
        title: 'Esta seguro?',
        text: `El cliente ${clientName} será modificado!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, modificalo!'
      }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("formUpdateClient").submit()
            setTimeout(() => {
                Swal.fire(
                    'Modificado!',
                    `El cliente ${clientName}, ha sido modificado exitosamente.`,
                    'success'
                )
            }, 1000)
            
        } else {
            Swal.fire(
                'No modificado!',
                `El cliente ${clientName}, no ha sido modificado.`,
                'info'
              )
              return false
        }
      })
}

const btnUpdateClient = document.getElementById('btnUpdateClient')
btnUpdateClient.addEventListener('click', (event)=>{
    event.preventDefault()
    const clientName = document.getElementById('name').value
    message(clientName)
})

var inputsDeTexto = document.querySelectorAll('input[type="text"]')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        if (input) {
            input.addEventListener('keydown', function(event) {
                let key = event.key; // Obtener el código de la tecla presionada
                let forbiddenChars = /["$%?¡¿^/()=!'~`\\*{}\[\]<>@]/; // Lista de caracteres especiales prohibidos

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
                btnUpdateClient.removeAttribute('disabled')
                btnUpdateClient.style = "cursor: pointer;"
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
                btnUpdateClient.removeAttribute('disabled')
                btnUpdateClient.style = "cursor: pointer;"
            }
        }
    });

    // Configurar el observador para que observe los cambios en los nodos hijos del div
    observer.observe(dropAreaLogoUpdate, { childList: true });