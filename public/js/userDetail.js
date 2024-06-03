let URL_GOOGLE_STORE_AVATARS='https://storage.googleapis.com/imagenesproyectosingenieria/upload/AvatarUsersImages/'
const socket = io.connect()

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const YY = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

function message(name, lastName, username) {
    Swal.fire({
    title: 'Esta seguro?',
    text: `El usuario ${name} ${lastName} será modificado!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificalo! <i class="fa-solid fa-user-pen"></i>',
    cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'

  }).then((result) => {
    if (result.isConfirmed) {
        document.getElementById("formUpdateUser").submit()
      Swal.fire(
        `${username} modificado!`,
        `El usuario ${name} ${lastName} ha sido modificado exitosamente.`,
        'success'
      )
    } else {
        Swal.fire(
            `${username} no modificado!`,
            `El usuario ${name} ${lastName} no ha sido modificado.`,
            'info'
          )
        return false
    }
  })
}

const btnUpdate = document.getElementById('btnUpdateUser')
btnUpdate.addEventListener('click', (event)=>{
    event.preventDefault()
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const username = document.getElementById('username').value
    if (name && lastName && username) {
        message(name, lastName, username)
    }
})


// ----------- Avatar User Image behavior ---------------
const dropAreaAvatarUser = document.getElementById('drop-areaAvatarUser')
const fileInputAvatarUser = document.getElementById('fileInputAvatarUser')
const fileImputTextAvatarUser = document.getElementById('fileInputTextAvatarUser')
const removeImageButtonAvatarUser = document.getElementById('removeImageAvatarUser')
const alertAvatarUser = document.getElementById('alertAvatarUser')
const alertSizeAvatarUser = document.getElementById('alertSizeAvatarUser')

dropAreaAvatarUser.style.width = "300px"
dropAreaAvatarUser.style.height = "200px"
dropAreaAvatarUser.style.border = "2px dashed #ccc"
dropAreaAvatarUser.style.margin = "0 auto 0 50px"
dropAreaAvatarUser.style.borderRadius = "5px"
dropAreaAvatarUser.style.textAlign = "center"
dropAreaAvatarUser.style.lineHeight = "200px"
dropAreaAvatarUser.style.cursor = "pointer"

dropAreaAvatarUser.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropAreaAvatarUser.style.border = '2px dashed #77d'
    dropAreaAvatarUser.style.backgroundColor = '#7777dd10'
})

dropAreaAvatarUser.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropAreaAvatarUser.style.border = '2px dashed #ccc'
    dropAreaAvatarUser.style.backgroundColor = '#838383'
})

function alertRefresh() {
    removeImageButtonAvatarUser.style.display = 'none'
    fileInputAvatarUser.value = ''
    fileImputTextAvatarUser.value = ''
    dropAreaAvatarUser.style.border = "2px dashed #ccc"
    dropAreaAvatarUser.style.textAlign = "center"
    dropAreaAvatarUser.style.backgroundColor = '#838383'
    dropAreaAvatarUser.style.display = 'block'
    dropAreaAvatarUser.innerHTML = 'Arrastra y suelta una imagen aquí'
}

function alertNotImageAvatarUser() {
    alertAvatarUser.style.display = 'flex'
    alertSizeAvatarUser.style.display = 'none'
    alertRefresh()
}

function alertSizeImageAvatarUser() {
    alertSizeAvatarUser.style.display = 'flex'
    alertAvatarUser.style.display = 'none'
    alertRefresh()
}

dropAreaAvatarUser.addEventListener('drop', (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    if (file && file.type.startsWith('image/')) {
        dropAreaAvatarUser.style.border = '3px dashed #2d2'
        dropAreaAvatarUser.style.backgroundColor = '#22dd2210'
        handleFileUploadAvatarUser(file)

    } else {
        alertNotImageAvatarUser()
    }     
})

dropAreaAvatarUser.addEventListener('click', () => {
    fileInputAvatarUser.click()
})

fileInputAvatarUser.addEventListener('change', (e) => {
    e.preventDefault()
    const file = fileInputAvatarUser.files[0]
    
    if (file && file.type.startsWith('image/')) {
        dropAreaAvatarUser.style.border = '3px dashed #2d2'
        dropAreaAvatarUser.style.backgroundColor = '#22dd2210'

        handleFileUploadAvatarUser(file)
        
    } else {
        alertNotImageAvatarUser()
    }     
})

function handleFileUploadAvatarUser(file) {
    const fileSize = file.size
    const fileSizeInMb = fileSize / (1024 * 1024)

    if (fileSizeInMb < 3) {
        let pathToImage = URL_GOOGLE_STORE_AVATARS
        // Separar el nombre del archivo y la extensión
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex);
        const extension = file.name.substring(dotIndex);
        fileImputTextAvatarUser.value = pathToImage + name + "-" + formatDate(new Date()) + extension
        removeImageButtonAvatarUser.style.display = 'flex'
        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dropAreaAvatarUser.innerHTML = 
                `<img class="p-2 mb-5" src="${reader.result}" style="max-width: 100%; max-height: 100%;">`
            alertAvatarUser.style.display = 'none'
            alertSizeAvatarUser.style.display = 'none'
        }

    } else {
        alertSizeImageAvatarUser()
    }
}

removeImageButtonAvatarUser.addEventListener('click', (e)=> {
    e.preventDefault()
    alertAvatarUser.style.display = 'none'
    alertSizeAvatarUser.style.display = 'none'
    alertRefresh()
    e.stopPropagation()
})

const permisoHidden = document.getElementById('permisoHidden')
const permiso = document.getElementById('permiso')

document.addEventListener('DOMContentLoaded', ()=> {
    permisoHidden.value = permiso.value
})

permiso.addEventListener('change', ()=>{
    permisoHidden.value = permiso.value
})

const areaHidden = document.getElementById('areaHidden')
const area = document.getElementById('area')

document.addEventListener('DOMContentLoaded', ()=> {
    areaHidden.value = area.value
})

area.addEventListener('change', ()=>{
    areaHidden.value = area.value
})

var inputsDeTexto = document.querySelectorAll('input[type="text"]')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        if (input) {
            input.addEventListener('keydown', function(event) {
                // Obtener el código de la tecla presionada
                let key = event.key;

                // Lista de caracteres especiales prohibidos
                let forbiddenChars = /["$%?¡¿^/()=!'~`\\*{}\[\]<>@]/;

                // Verificar si la tecla presionada es un carácter especial
                if (forbiddenChars.test(key)) {
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
                btnUpdate.removeAttribute('disabled')
                btnUpdate.style = "cursor: pointer;"
            })
        }
    })

    var inpuntDeNumeros = document.querySelectorAll('input[type="number"]')

    inpuntDeNumeros.forEach(function(input) {
        input.addEventListener('input', function(event) {
            // Obtener el valor actual del input
            let value = input.value;

            // Obtener el código de la tecla presionada
            let key = event.key;

            // Expresión regular para números enteros de hasta cuatro cifras (0 a 9999)
                const regexp = /^[0-9]{1,4}$/;

            // Verificar si el valor cumple con la expresión regular
            if (!regexp.test(value)) {
                // Remover el último carácter si no cumple con la expresión regular
                input.value = value.slice(0, -1);
                input.classList.add("border", "border-danger", "border-2");
            } else {
                input.classList.remove("border", "border-danger", "border-2");
            }
        })
    })

    const inputFile = document.getElementById('drop-areaAvatarUser')
    // Crear una nueva instancia de MutationObserver y pasar una función de callback
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Iterar sobre las mutaciones observadas
        for(let mutation of mutationsList) {
            // Verificar si la mutación fue una inserción o eliminación de nodos
            if (mutation.type === 'childList') {
                // Realizar acciones en respuesta al cambio
                btnUpdate.removeAttribute('disabled')
                btnUpdate.style = "cursor: pointer;"
            }
        }
    });

    // Configurar el observador para que observe los cambios en los nodos hijos del div
    observer.observe(inputFile, { childList: true });