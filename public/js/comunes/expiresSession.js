const countdownElement = document.getElementById('countdown'),
    expires = (document.getElementById('expires').innerText)

    function updateCountdown() {
        const countdownDate = new Date(`${expires}`).getTime(),
            now = new Date().getTime();
        let distance = countdownDate - now
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000)
        
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
    const nameUser = userName[0],
        rol = rolUser
    let spanToShow = ''
// console.log('nameUser: ', nameUser, 'rol: ', rol)
    rol === "Admin"
    ? spanToShow = `<span class="badge rounded-pill bg-primary">${rol}</span>`
    : spanToShow = `<span class="badge rounded-pill bg-info text-dark">${rol}</span>`

    const htmlForm = `<div>${nameUser} - ${spanToShow}?</div><br>
                        Está seguro que desea continuar?<br>
                        <form id="formLogout" action="/api/auth/logout" method="post">
                        </form>`

        Swal.fire({
            title: `Cerrar sesión de `,
            position: 'center',
            html: htmlForm,
            imageUrl: `${avatarUser}`,
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

        const imageSwal = document.getElementsByClassName('swal2-image')
        if(imageSwal) {
            imageSwal[0].setAttribute('style', 'width: 100px; height: 100px; object-fit: cover;')
            imageSwal[0].classList.add('rounded-circle', 'mb-0')
        }
}

const logoutSidebar = document.getElementById('logoutSidebar'),
    logoutBanner = document.getElementById('logoutBanner')

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