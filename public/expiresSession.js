const countdownElement = document.getElementById('countdown')
const expires = (document.getElementById('expires').innerText)

    function updateCountdown() {
        const countdownDate = new Date(`${expires}`).getTime()
        const now = new Date().getTime()
        let distance = countdownDate - now
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        
        if (distance > 3600000) {
            countdownElement.innerHTML = "<span class=\"badge rounded-pill bg-success\">Sessión Ilimitada</span>"
        } else if (distance > 0 && distance <= 3600000 ) {
            countdownElement.innerHTML = `<span class="badge rounded-pill bg-warning text-dark">Tiempo de Sesión: ${hours}h ${minutes}m ${seconds}s</span>`
        } else {
            countdownElement.innerHTML = `<span class="badge rounded-pill bg-danger">Expiró Tiempo de Sessión!</span>`
        }
    }

updateCountdown()

setInterval(updateCountdown, 1000)


// logout message function ------------
function confirmLogout({userName, rolUser, avatarUser}) {
    const nameUser = userName[0]
    const rol = rolUser
    let spanToShow = ''
// console.log('nameUser: ', nameUser, 'rol: ', rol)
    rol === "Admin"? spanToShow = `<span class="badge rounded-pill bg-primary">${rol}</span>`
                        :
                     spanToShow = `<span class="badge rounded-pill bg-info text-dark">${rol}</span>`

    const htmlForm = `
                    <div>${nameUser} - ${spanToShow}?</div>
                    <img class="img-fluid rounded-circle float-center my-3"
                        alt="Avatar" src="${avatarUser}"
                        width="50px" height="50px"><br>
                    Está seguro que desea continuar?<br>
                    <form id="formLogout" action="/api/auth/logout" method="post">
                    </form>
                    `
    
        Swal.fire({
            title: `Cerrar sesión de `,
            position: 'center',
            html: htmlForm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar <i class="fa-solid fa-door-closed"></i>',
            cancelButtonText: 'Cancelar <i class="fa-solid fa-user-shield"></i>'
    
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formLogout").submit()
            } else {
                return false
            }
        })
}

const logoutSidebar = document.getElementById('logoutSidebar')
const logoutBanner = document.getElementById('logoutBanner')

function getUserNameAndAvatar(bar) {
    const userName = (document.getElementById('mostrarUserName').innerText).split('-')
    let rolUser = (document.getElementById('mostrarRolUser').innerText.split('\n'))
    bar === 'banner' ? rolUser = rolUser[0] : rolUser = rolUser[1]
    const avatarUser = document.getElementById('avatarUser').src
    return {userName, rolUser, avatarUser}
}

logoutSidebar.addEventListener('click', (event) => {
    event.preventDefault()
    let sidebar = 'sidebar'
    confirmLogout(getUserNameAndAvatar(sidebar))
})

logoutBanner.addEventListener('click', (event) => {
    event.preventDefault()
    let banner = 'banner'
    confirmLogout(getUserNameAndAvatar(banner))
})