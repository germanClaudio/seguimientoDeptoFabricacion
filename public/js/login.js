const passwordInput = document.getElementById('password'),
	showPasswordBtn = document.getElementById('show-password-btn')

showPasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordInput.setAttribute('type', type)
    showPasswordBtn.innerHTML = type === 'password' ?
		'<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>'
})

function inputMissing() {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 4000,
		timerProgressBar: false
	})

	Toast.fire({
		icon: 'error',
		title: `Error en formulario Login!`
	})
	return false
}

const btnFormLogin = document.getElementById('btnFormLogin')
btnFormLogin.addEventListener('click', ()=> {
    const uName = (document.getElementById('username').value).trim()
    const passWord = document.getElementById('password').value
	
    if (uName && passWord == "") {
		document.getElementById('warningPassword').innerHTML = '¡El password no puede ser vacío!'
		document.getElementById('password').focus()
		inputMissing()
	} else if (uName == "" && passWord) {
		document.getElementById('warningUser').innerHTML = '¡El Usuario no puede ser vacío!'
		document.getElementById('username').focus()
		inputMissing()
	} else if (uName == "" && passWord == '') {
		inputMissing()
	} else {
		document.getElementById('warningUser').innerHTML = ''
		document.getElementById('warningPassword').innerHTML = ''
		const loginForm = document.getElementById('loginForm')
		loginForm.submit()
	}
})

const inputUsername = document.getElementById('username')
inputUsername.addEventListener('change', ()=> {
	document.getElementById('warningUser').innerHTML = ''
})

passwordInput.addEventListener('change', ()=> {
	document.getElementById('warningPassword').innerHTML = ''
})

inputUsername.value = ""
passwordInput.value = ""