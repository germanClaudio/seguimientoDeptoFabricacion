/*------------------ Evento cantidad de caracteres Password & Confirmar Password -----------------------*/
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById("newUserPasswordForm")
    form.reset()
    document.getElementById('messagePass').innerHTML = ""
    document.getElementById('messageConfirmPass').innerHTML = ""

    document.getElementById('btnAddNewUserPassword').disabled = true
    document.getElementById('btnAddNewUserPassword').style.opacity = (0.4)
    document.getElementById('confirmPassword').disabled = true

    let inputPassword = document.getElementById('password')
    inputPassword.addEventListener("input", validarCamposPassword)
    
    let inputConfirmPassword = document.getElementById('confirmPassword')
    inputConfirmPassword.addEventListener("input", validarCamposPassAndConfirm)

    function validarCamposPassword() {
        let valorPassword = document.getElementById('password').value
        let caracteres = valorPassword.length
        
        if (valorPassword !== "" || valorPassword !== null) {
            if (valorPassword.length < 6) {
                document.getElementById('messagePass').style.color = '#cc3333'
                document.getElementById('messagePass').innerHTML
				= '☒ El password debe ser mínimo 6 caracteres y van: '+ caracteres
                document.getElementById('btnAddNewUserPassword').disabled = true
                document.getElementById('btnAddNewUserPassword').style.opacity = (0.4)
                document.getElementById('confirmPassword').disabled = true
            } else {
                document.getElementById('messagePass').style.color = '#204120'
                document.getElementById('messagePass').innerHTML
				= '🗹 Largo de Password aceptable!'
                document.getElementById('confirmPassword').disabled = false
            }
        } else {
            document.getElementById('messagePass').innerHTML = ""
            document.getElementById('btnAddNewUserPassword').disabled = true
            document.getElementById('btnAddNewUserPassword').style.opacity = (0.4)
            document.getElementById('confirmPassword').disabled = true
        }
    }
        
    function validarCamposPassAndConfirm() {
        let valorPassword = document.getElementById('password').value
        let valorConfirmPass = document.getElementById('confirmPassword').value
        
        if (valorPassword !== "" || valorConfirmPass !== "" || valorPassword !== null || valorConfirmPass !== null) {
            if (valorPassword !== valorConfirmPass) {
                
                document.getElementById('messageConfirmPass').style.color = '#cc3333'
                document.getElementById('messageConfirmPass').innerHTML
                = '☒ Los password debe coincidir!'
                document.getElementById('btnAddNewUserPassword').disabled = true
                document.getElementById('btnAddNewUserPassword').style.opacity = (0.4)
            } else {	
                document.getElementById('messageConfirmPass').style.color = '#204120'
                document.getElementById('messageConfirmPass').innerHTML
                = '🗹 Los Password coinciden!'
                document.getElementById('btnAddNewUserPassword').disabled = false
                document.getElementById('btnAddNewUserPassword').style.opacity = (1)
            }        
        } else {
            document.getElementById('messageConfirmPass').innerHTML = ""
            document.getElementById('btnAddNewUserPassword').disabled = true
            document.getElementById('btnAddNewUserPassword').style.opacity = (0.4)
            document.getElementById('confirmPassword').disabled = true
        }    
    }
})

function messageResetUserPassword() {
    Swal.fire({
        title: `Nuevo Password`,
        text: `El Nuevo Password será registrado!`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Registrarlo <i class="fa-solid fa-user-check"></i>',
        cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>'

    }).then((result) => {
        if (result.isConfirmed) {
            const infoSubmited = document.getElementById("newUserPasswordForm")
            infoSubmited.submit()

            if (infoSubmited) {
                    Swal.fire({
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        title: 'Cambio de Password exitoso!',
                        text:  `El nuevo password se ha sido registrado exitosamente!`,
                        icon: 'success',
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                
            } else {
                Swal.fire(
                    'No registrado!',
                    `El nuevo password NO ha sido registrado correctamente.`,
                    'warning'
                    )
                return false
            }

        } else {
            Swal.fire(
                'No registrado!',
                `El nuevo password NO ha sido registrado correctamente.`,
                'warning'
                )
            return false
        }
    })
}


const btnAddNewUserPassword = document.getElementById('btnAddNewUserPassword')

btnAddNewUserPassword.addEventListener('click', (event) => {
    event.preventDefault()
    const password = document.getElementById('password').value,
        confirmPassword = document.getElementById('confirmPassword').value

    password && confirmPassword ? messageResetUserPassword() : null
})

const btnResetFormNewUserPassword = document.getElementById('btnResetFormNewUserPassword')
btnResetFormNewUserPassword.addEventListener('click', () => {
    document.getElementById('messagePass').innerHTML = ""
    document.getElementById('messageConfirmPass').innerHTML = ""
    btnAddNewUserPassword.disabled = true
    btnAddNewUserPassword.style.opacity = (0.4)
    document.getElementById('confirmPassword').disabled = true
})

let inputsDeTexto = document.querySelectorAll('input[type="password"]')

    // Agregar un listener de evento a cada input
    inputsDeTexto.forEach(function(input) {
        input.addEventListener('keydown', function(event) {
            // Obtener el código de la tecla presionada
            let key = event.key;

            // Lista de caracteres especiales prohibidos
            let forbiddenChars = /["?¡¿^/'~`´Ø\\*{}\[\]<>@]/;

            // Verificar si la tecla presionada es un carácter especial
            if (forbiddenChars.test(key)) {
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
            
            // Reemplazar caracteres prohibidos
            let newValue = input.value.replace(forbiddenChars, '');

            // Actualizar el valor del input
            input.value = newValue;
        });

    })