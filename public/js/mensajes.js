const socket = io.connect()

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const YY = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return DD + "-" + MM + "-" + YY + " " + hh + "." + mm + "." + ss
}

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('messageTextLength').innerHTML = "(0/500)"
    let inputText = document.getElementById('text')

    function validarCampoText() {
        let valorText = inputText.value
        let caracteres = valorText.length
        
        if (valorText !== "" || valorText !== null) {
            if (valorText.length <= 500) {
                document.getElementById('messageTextLength').style.color = '#333333'
                document.getElementById('messageTextLength').innerHTML
				= `(${caracteres}/500)`

            } else {
                document.getElementById('messageTextLength').style.color = '#8c0c0c'
                document.getElementById('messageTextLength').innerHTML
				= `Mensaje demasiado largo - (${caracteres}/500)`
            }

        } else {
            document.getElementById('messageTextLength').innerHTML = "(0/500)"
        }
    }

    inputText.addEventListener("input", validarCampoText)
    inputText.addEventListener("change", validarCampoText)
    
})


// ----------------  Messages ----------------
socket.on('mensajesAll', (arrMensajes, arrUsers) => {
    const cadena = document.getElementById('mostrarUserName').innerText
    let indice = cadena.indexOf(",");
    const name = cadena.substring(0,indice)
    let index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin
        user ? renderMessageAdmin(arrMensajes) : renderMessageUser(arrMensajes)
    }   
})


const addMessage = () => {
    const mensaje = {
        author: {
            email: document.getElementById('author').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('text').value,
        date: formatDate(new Date()),
        status: true
    }

    socket.emit('newMensaje', mensaje )
    return false
}

const botonMensaje = document.getElementById('botonMensaje')

if (botonMensaje) {
    botonMensaje.addEventListener('click', ()=> {
        addMessage()
    })
}

const renderMessageAdmin = async (arrMensajes) => {

    const htmlMsg = await arrMensajes.map((mensaje) => {

        if(mensaje.status === true) {
            return  (`
                    <div class="chat-module-body">
                        <div class="media chat-item mt-2 mb-3 p-2 border border-light shadow">
                            <img alt="${mensaje.author.name}" src="${mensaje.author.avatar}" class="rounded-circle user-avatar-lg" width="58" height="58">
                            <div class="media-body">
                                <div class="chat-item-title">
                                    <span class="chat-item-author">${mensaje.author.name} ${mensaje.author.lastName}</span>
                                    <span>Enviado: ${mensaje.date}</span>
                                </div>
                                <div class="chat-item-body mt-2 mx-2">
                                    <p>${mensaje.text}</p>
                                </div>
                            </div>
                            <div class="d-flex flex-column mt-5 ms-5">
                                <a href="/api/webchat/delete/${mensaje._id}" class="btn btn-danger btn-sm mx-1"><i class="icon-trash font-medium-1"></i></a>
                            </div>
                        </div>
                    </div>`)

        } else {
            return null
        }

    }).join(" ")

    document.getElementById('mostrarMensajes').innerHTML = htmlMsg
    document.getElementById('text').value = ""
    document.getElementById('messageTextLength').innerHTML = "(0/500)"
}

const renderMessageUser = async (arrMensajes) => {

    const htmlMsg = await arrMensajes.map((mensaje) => {
        if(mensaje.status === true) {
            return  (`<div class="chat-module-body">
            <div class="media chat-item mt-2 mb-3 p-2 border border-light shadow">
                <img alt="${mensaje.author.name}" src="${mensaje.author.avatar}" class="rounded-circle user-avatar-lg" width="58" height="58">
                <div class="media-body">
                    <div class="chat-item-title">
                        <span class="chat-item-author">${mensaje.author.name} ${mensaje.author.lastName}</span>
                        <span>Enviado: ${mensaje.date}</span>
                    </div>
                    <div class="chat-item-body mt-2 mx-2">
                        <p>${mensaje.text}</p>
                    </div>
                </div>
                <div class="d-flex flex-column mt-5 ms-5">
                    <i class="fa-solid fa-check-circle fa-2x data-toggle="tooltip" data-placement="top" title="Solo Admin puede cambiar esto" style="color:green;" aria-hidden="true"></i>
                </div>
            </div>
        </div>`)

        } else {
            return null
        }

    }).join(" ")

    document.getElementById('mostrarMensajes').innerHTML = htmlMsg

    document.getElementById('text').value = ""
    document.getElementById('messageTextLength').innerHTML = "(0/500)"
}