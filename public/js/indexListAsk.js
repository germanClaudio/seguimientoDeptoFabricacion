const socket = io.connect()

function formatDate(date) {
    const DD = String(date.getDate()).padStart(2, '0'),
        MM = String(date.getMonth() + 1).padStart(2, '0'),
        YY = date.getFullYear(),
        hh = String(date.getHours()).padStart(2, '0'),
        mm = String(date.getMinutes()).padStart(2, '0'),
        ss = String(date.getSeconds()).padStart(2, '0');
    return DD + MM + YY + "_" + hh + mm + ss
}

const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', yellow = 'warning', black = 'dark', white = 'light',
        active = 'Activo', inactive = 'Inactivo', info = 'info',
        epp = 'EPP', insertos = 'Insertos', consumibleAjuste = 'Consumible Ajuste', consumibleMeca = 'Consumible Mecanizado', otros = 'Otros'
let html, stock

const typeConfigurations = {
    epp: { optionType: yellow, showType: epp, textColor: black },
    insertos: { optionType: grey, showType: insertos, textColor: white },
    consumiblesAjuste: { optionType: blue, showType: consumibleAjuste, textColor: white },
    consumiblesMeca: { optionType: black, showType: consumibleMeca, textColor: white },
    otros: { optionType: green, showType: otros, textColor: white }
};

// Configuración por defecto
const defaultConfig = { optionType: info, showType: 'Otro', textColor: black };

// -------------- Show All Consumibles ----------------
socket.on('consumiblesAll', async (arrConsumibles) => {
    renderConsumible (await arrConsumibles)
})

const renderConsumible = (arrConsumible) => {
    const html = arrConsumible.map((element) => {
        let disabled = '', styleBckgrd = "background-color: #00000060; opacity: 0.5", classBckgrd = 'footer_disabled'
            footerTextDisabled = '<span class="badge bg-danger text-light mt-3 p-2 mx-auto"><strong>Sin Stock</strong> <i class="fa-regular fa-face-sad-tear fa-xl"></i></span>',
            footerText = `<a class="btn mx-auto text-light mt-3 small ${disabled}" type="submit" href="/api/consumibles/add/${element._id}" style="background-color: #1d1d1d;">
                                Añadir al Carrito <i class="icon-basket"></i>
                        </a>`
        let optionStatus, optionStock = ''
        element.status ? optionStatus = green : (optionStatus = red, disabled = 'disabled')
        element.stock>0 ? (optionStock = black, footerText, footerTextDisabled='', classBckgrd = '', styleBckgrd = '') : (optionStock = red, disabled = 'disabled', footerTextDisabled, footerText='', styleBckgrd, classBckgrd)
            
        // Obtener configuración según el tipo o usar la configuración por defecto
        const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

        let showStatus = element.status ? active : inactive

        if (element.visible) {
            return (
                `<div class="col">
                    <div class="card shadow-lg rounded-3 mx-auto my-3" style="width: 15rem; height: 25rem; ${styleBckgrd}" ${disabled}>
                        <img src="${element.imageConsumible}" class="card-img-top mx-auto px-5 pt-2" alt="Imagen Consumible" style="min-height: 10rem; object-fit: contain;">
                        <div class="card-body">
                            <h6 class="card-title"><strong>${element.designation}</strong></h6>
                            <p class="card-text my-1">Código: ${element.code}</p>
                            <p class="card-text my-1">Tipo: <span class="badge bg-${optionType} text-${textColor}">${showType}</span></p>
                            <p class="card-text my-1">Status: <span class="badge rounded-pill bg-${optionStatus}">${showStatus}</span></p>
                            <p class="card-text my-1">Stock: <span class="badge rounded-pill bg-${optionStock} text-light">${element.stock}</span></p>
                            <div class="card-footer card-footer-client ${classBckgrd}">
                                ${footerText}${footerTextDisabled}
                            </div>
                        </div>
                    </div>
                </div>`)
        } 
    }).join(" ");

    document.getElementById('mostrarConsumibles').innerHTML = html
}

