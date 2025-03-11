const socket = io.connect(),
    offset = -3 * 60 * 60 * 1000;
let URL_GOOGLE_STORE_IMAGESCONSUMIBLES,
    imagenLazy = '../../src/images/upload/ConsumiblesImages/loader.gif';

fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        URL_GOOGLE_STORE_IMAGESCONSUMIBLES = config.URL_GOOGLE_STORE_IMAGESCONSUMIBLES
    })
    .catch(error => console.error('Error fetching config:', error));

// Variables globales
const green = 'success', red = 'danger', blue = 'primary', grey = 'secondary', yellow = 'warning', black = 'dark', white = 'light',
        active = 'Activo', inactive = 'Inactivo', info = 'info',
        epp = 'EPP', consumibleAjuste = 'Consumible Ajuste', consumibleMeca = 'Consumible Mecanizado', consumibleLineas = 'Consumible Lineas', ropa = "Ropa", otros = 'Otros'
let html, stockTr

const typeConfigurations = {
    epp: { optionType: yellow, showType: epp, textColor: black },
    consumiblesLineas: { optionType: grey, showType: consumibleLineas, textColor: white },
    consumiblesAjuste: { optionType: blue, showType: consumibleAjuste, textColor: white },
    consumiblesMeca: { optionType: black, showType: consumibleMeca, textColor: white },
    ropa: { optionType: green, showType: ropa, textColor: white },
    otros: { optionType: green, showType: otros, textColor: white }
};

// Configuración por defecto
const defaultConfig = { optionType: info, showType: 'Otro', textColor: black };

//-------------------------------------
// Mostrar el spinner y ocultar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('consumiblesTable').style.display = 'none';
});

//  ----------- Consumibles list ----------------
socket.on('consumiblesAll', (arrConsumibles, arrUsers) => {
    let cadena = document.getElementById('mostrarUserName').innerText,
        indice = cadena.indexOf(","),
        name = cadena.substring(0,indice),
        index = arrUsers.findIndex(el=> el.name == name.trim())
    
    if(index !== -1) {
        let user = arrUsers[index].admin,
            userId = arrUsers[index]._id
        user ? renderConsumiblesAdmin(arrConsumibles, userId) : renderConsumiblesUser(arrConsumibles)
    }   
})

// Función para extraer y mostrar los datos del campo stock
let size, stock, total, totalStock = 0, disabled = ''
function processStock(element) {
    if (Object.keys(element.stock).length > 1) { // Si hay múltiples talles
        Object.entries(element.stock).forEach(([size, stock]) => {
            return size, stock
        });
        totalStock = Object.values(element.stock).reduce((total, stock) => total + stock, 0);
        return totalStock

    } else { // Si no hay talles (solo un valor)
        size = Object.keys(element.stock)[0];
        stock = parseInt(element.stock[size]);
        totalStock = stock
        return size, stock, totalStock
    }
}

function cortarTexto(texto) {
    if (texto.length > 40) {
        return texto.slice(0, 37) + "...";
    }
    return texto;
}

function cortarTextoLong(texto) {
    if (texto.length > 70) {
        return texto.slice(0, 67) + "...";
    }
    return texto;
}

// --------------- Render Admin ----------------------------
const renderConsumiblesAdmin = (arrConsumibles) => {
    const arrayConsumible = arrConsumibles
    if (arrConsumibles.length > 0) {
        html = arrConsumibles.map((element) => {

            // Procesar cada elemento
            processStock(element)

            let optionStatus = element.status ? green : red,
                optionStock = totalStock > 0 ? black : red,
                showStatus = element.status ? active : inactive,
                idChain = element._id.substring(19),
                tipoTalle = 'U',
                background = 'dark',
                disabled = '',
                disabledRow = ''
            
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            if (element.tipoTalle === 'talle') {
                tipoTalle = 'T'
                background = 'danger'
                disabled = 'disabled'

            } else if (element.tipoTalle === 'numero') {
                tipoTalle = 'N'
                background = 'primary'
                disabled = 'disabled'
            }

            let characteristicsTrim = cortarTexto(element.characteristics),
                designationTrim = cortarTextoLong(element.designation),
                redHeart = '';

            let utcDate = new Date(element.timestamp),
                utcDateModified = new Date(element.modifiedOn),
                localDate = new Date(utcDate.getTime() + offset),
                localDateModified = new Date(utcDateModified.getTime() + offset),
                formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                formattedDate === formattedDateModified ? formattedDateModified = '-' : null

            if (element.favorito === 5) {
                redHeart = `<i class="fa-solid fa-heart position-absolute top-0 start-100 text-primary" 
                                style="font-size: 1.5em; z-index: 100 ;transform: translate(-200%, 40%) !important;">
                            </i>`
            }

            if (element.visible) {
                totalStock > 0 ? stockTr = `<tr id="consumibleRow_${element._id}">` : (stockTr =`<tr id="consumibleRow_${element._id}" class="row-highlight-stockCero">`, disabledRow = 'disabled')
                return (`${stockTr}
                            <td class="text-center" id="checkSelect_${element._id}" name="checkSelect"><input class="form-check-input border border-2 border-primary shadow-lg rounded" type="checkbox" value="" id="inputCheckConsumible_${element._id}" name="inputCheckConsumible" ${disabledRow}></td>
                            <td class="text-center" id="codigo_${element._id}"><strong>${element.code}</strong></td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}">${showType}</span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${designationTrim}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${characteristicsTrim}</td>
                            <td class="text-center position-relative" id="imagenConsumible_${element._id}">
                                ${element.imageConsumible ? `<img id="imagen_${element._id}" class="imgLazyLoad img-fluid rounded-3 py-2" alt="Imagen" data-src="${element.imageConsumible}"
                                                            src='${imagenLazy}' width="125px" height="125px" loading="lazy">` : '<div class="img-placeholder"></div>'}
                                                            ${redHeart}
                            </td>
                            <td class="text-center" id="tipoTalle_${element._id}"><span class="badge bg-${background} text-light">${tipoTalle}</span></td>
                            <td class="text-center" id="limMaxUser_${element._id}"><span class="badge bg-danger text-light">${element.limMaxUser}</span></td>
                            <td class="text-center" id="stock_${element._id}"><span id="spanStock_${element._id} name="stock" class="badge bg-${optionStock} text-light">${totalStock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                                <div class="d-block align-items-center text-center">
                                    <a href="/api/carts/${element._id}" class="btn btn-primary btn-sm me-1" title="Editar Consumible ${designationTrim}"><i class="fa-solid fa-cart-shopping"></i></a>
                                    <button id="${element._id}" name="btnDeleteConsumible" type="button" class="btn btn-danger btn-sm ms-1" title="Eliminar Consumible ${designationTrim}"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>`)
            } 
        }).join(" ");
        document.getElementById('mostrarConsumibles').innerHTML = html

        const consumiblesActiveQty = []
        for(let u=0; u<arrayConsumible.length; u++) {
            arrayConsumible[u].visible ? consumiblesActiveQty.push(u) : null
        }

        const htmlConsumibleList = 
            ( `<caption id="capConsumiblesList">Cantidad de Consumibles: ${parseInt(consumiblesActiveQty.length)}</caption>`)

        document.getElementById('capConsumiblesList').innerHTML = htmlConsumibleList
        
    } else {
        html = (`<tr>
                    <td colspan="10">
                        <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarConsumibles').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('consumiblesTable').style.display = 'block';

    //------------- LazyLoad Images ------------------
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            setTimeout(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src; // Sustituye data-src por src
                        img.onload = () => img.classList.add("loaded");
                        img.removeAttribute("data-src"); // Limpia el atributo
                        observer.unobserve(img); // Deja de observar esta imagen
                    }
                });
            }, 1250);
        });
        lazyImages.forEach(img => observer.observe(img));
        
    } else {
        // Fallback para navegadores sin IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

//---------------- Render User -----------------------------
const renderConsumiblesUser = (arrConsumibles) => {
    const arrayConsumible = arrConsumibles
    if (arrConsumibles.length>0) {
        html = arrConsumibles.map((element) => {

            // Procesar cada elemento
            processStock(element)

            let optionStatus = element.status ? green : red,
                optionStock = totalStock > 0 ? black : red,
                showStatus = element.status ? active : inactive,
                idChain = element._id.substring(19),
                tipoTalle = 'U',
                background = 'dark',
                disabled = '',
                disabledRow = ''
            
            // Obtener configuración según el tipo o usar la configuración por defecto
            const { optionType, showType, textColor } = typeConfigurations[element.type] || defaultConfig;

            if (element.tipoTalle === 'talle') {
                tipoTalle = 'T'
                background = 'danger'
                disabled = 'disabled'

            } else if (element.tipoTalle === 'numero') {
                tipoTalle = 'N'
                background = 'primary'
                disabled = 'disabled'
            }

            let characteristicsTrim = cortarTexto(element.characteristics),
                designationTrim = cortarTextoLong(element.designation),
                redHeart = '';

            let utcDate = new Date(element.timestamp),
                utcDateModified = new Date(element.modifiedOn),
                localDate = new Date(utcDate.getTime() + offset),
                localDateModified = new Date(utcDateModified.getTime() + offset),
                formattedDate = localDate.toISOString().replace('T', ' ').split('.')[0],
                formattedDateModified = localDateModified.toISOString().replace('T', ' ').split('.')[0];

                formattedDate === formattedDateModified ? formattedDateModified = '-' : null

            if (element.favorito === 5) {
                redHeart = `<i id="redHeart_${element._id}" class="fa-solid fa-heart position-absolute top-0 start-100 text-primary" 
                                style="font-size: 1.5em; z-index: 100 ;transform: translate(-200%, 40%) !important;">
                            </i>`
            }
            
            if (element.visible) {
                totalStock > 0 ? stockTr = `<tr id="consumibleRow_${element._id}">` : (stockTr =`<tr id="consumibleRow_${element._id}" class="row-highlight-stockCero">`, disabledRow = 'disabled')
                return (`${stockTr}
                            <td class="text-center" id="checkSelect_${element._id}" name="checkSelect"><input class="form-check-input border border-2 border-primary shadow-lg rounded" type="checkbox" value="" id="inputCheckConsumible_${element._id}" name="inputCheckConsumible" ${disabledRow}></td>
                            <td class="text-center" id="codigo_${element._id}"><strong>${element.code}</strong></td>
                            <td class="text-center" id="tipo_${element._id}"><span class="badge bg-${optionType} text-${textColor}"> ${showType} </span></td>
                            <td class="text-center" id="designation_${element._id}"><strong>${designationTrim}</strong></td>
                            <td class="text-center" id="characteristics_${element._id}">${characteristicsTrim}</td>
                            <td class="text-center position-relative" id="imagenConsumible_${element._id}">
                                ${element.imageConsumible ? `<img id="imagen_${element._id}" class="imgLazyLoad img-fluid rounded-3 py-2" alt="Imagen" data-src="${element.imageConsumible}"
                                                            src='${imagenLazy}' width="125px" height="125px" loading="lazy">` : '<div class="img-placeholder"></div>'}
                                                            ${redHeart}
                            </td>
                            <td class="text-center" id="tipoTalle_${element._id}"><span class="badge bg-${background} text-light">${tipoTalle}</span></td>
                            <td class="text-center" id="limMaxUser_${element._id}"><span class="badge bg-danger text-light">${element.limMaxUser}</span></td>
                            <td class="text-center" id="stock_${element._id}"><span class="badge bg-${optionStock} text-light">${totalStock}</span></td>
                            <td class="text-center"><span class="badge rounded-pill bg-${optionStatus}"> ${showStatus} </span></td>
                            <td class="text-center">
                                <div class="d-block align-items-center text-center mx-1">
                                    <a href="/api/carts/add/${element._id}" class="btn btn-primary btn-sm me-1" title="Añadir ${designationTrim} al carrito"><i class="fa-solid fa-cart-plus"></i></a>
                                    <button type="button" class="btn btn-danger btn-sm ms-1 disabled" title="Solo Admin puede modificar esto"><i class="fa-solid fa-info-circle"></i></button>
                                </div>
                            </td>
                        </tr>`)
            }
        }).join(" ");
        document.getElementById('mostrarConsumibles').innerHTML = html

        const consumiblesActiveQty = []
        for(let u=0; u<arrayConsumible.length; u++) {
            arrayConsumible[u].visible ? consumiblesActiveQty.push(u) : null
        }

        const htmlConsumibleList = 
            ( `<caption id="capConsumiblesList">Cantidad de Consumibles: ${parseInt(consumiblesActiveQty.length)}</caption>`)

        document.getElementById('capConsumiblesList').innerHTML = htmlConsumibleList
        
    } else {
        html = (`<tr>
                    <td colspan="11">
                        <img class="img-fluid rounded-5 my-2 shadow-lg" alt="No hay items cargados para mostrar"
                            src='../src/images/clean_table_graphic.png' width="auto" height="auto">
                    </td>
                </tr>`)

        document.getElementById('mostrarConsumibles').innerHTML = html    
    }
    // Ocultar el spinner y mostrar la tabla
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('consumiblesTable').style.display = 'block';

    //------------- LazyLoad Images ------------------
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            setTimeout(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src; // Sustituye data-src por src
                        img.onload = () => img.classList.add("loaded");
                        img.removeAttribute("data-src"); // Limpia el atributo
                        observer.unobserve(img); // Deja de observar esta imagen
                    }
                });
            }, 1500);
        });
        lazyImages.forEach(img => observer.observe(img));
        
    } else {
        // Fallback para navegadores sin IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

let inpuntDeNumeros = document.querySelectorAll('input[type="number"]')
    inpuntDeNumeros.forEach(function(input) {
        input.addEventListener('input', function(event) {
            // Obtener el valor actual del input
            let value = input.value,
                key = event.key;

            // Expresión regular para números enteros de hasta cinco cifras (0 a 99999)
            const regexp = /^[0-9]{1,5}$/;

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

//------------- Rows & Cards selected ------------------
document.addEventListener("DOMContentLoaded", () => {
    const tableId = "consumiblesTable",
        table = document.getElementById(tableId),
        cardsContainer = document.getElementById("showConsumiblesSearch"),
        btnCheckSelectionAll = document.getElementById("btnCheckSelectionAll"),
        spanCheckSelecMasive = document.getElementById("spanCheckSelecMasive");

    // Función para inicializar eventos en checkboxes de filas
    function initializeRowCheckboxes() {
        const rowCheckboxes = table.querySelectorAll('input[type="checkbox"]');
        rowCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                syncCheckboxWithCard(checkbox);
                updateSelectionState();
                updateRowStyle(checkbox);
            });
        });
    }

    // Función para inicializar eventos en checkboxes de cards
    function initializeCardCheckboxes() {
        const cardCheckboxes = cardsContainer.querySelectorAll('input.form-check-input');
        cardCheckboxes.forEach((checkbox) => {
            if (!checkbox.dataset.initialized) {
                checkbox.dataset.initialized = true;
                checkbox.addEventListener("change", () => {
                    syncCheckboxWithRow(checkbox);
                    updateSelectionState();
                });
            }
        });
    }

    // Sincronizar checkbox de fila con card correspondiente
    function syncCheckboxWithCard(rowCheckbox) {
        const extractIdNumber = (id) => id.split('_').pop()
        let idInputCard = extractIdNumber(rowCheckbox.id)
        const cardCheckbox = cardsContainer.querySelector(`#inputCheckConsumibleCard_${idInputCard}`);
        if (cardCheckbox) {
            if (rowCheckbox.checked) {
                cardCheckbox.checked = true;
                cardCheckbox.disabled = true; // Deshabilitar para evitar duplicados
            } else {
                cardCheckbox.checked = false;
                cardCheckbox.disabled = false; // Habilitar nuevamente
            }
            updateCardStyle(cardCheckbox);
            updateRowStyle(rowCheckbox);
        }
    }

    // Sincronizar checkbox de card con fila correspondiente
    function syncCheckboxWithRow(cardCheckbox) {
        const extractIdNumber = (id) => id.split('_').pop()
        let idInputRow = extractIdNumber(cardCheckbox.id)
        const rowCheckbox = table.querySelector(`#inputCheckConsumible_${idInputRow}`)
        if (rowCheckbox) {
            if (cardCheckbox.checked) {
                rowCheckbox.checked = true;
                rowCheckbox.disabled = true; // Deshabilitar para evitar duplicados
            } else {
                rowCheckbox.checked = false;
                rowCheckbox.disabled = false; // Habilitar nuevamente
            }
            updateRowStyle(rowCheckbox);
            updateCardStyle(cardCheckbox);
        }
    }

    // Actualizar estilo de las filas al cambiar el estado del checkbox
    function updateRowStyle(rowCheckbox) {
        const row = rowCheckbox.closest("tr");
        // console.log('row: ', row)
        if (rowCheckbox.checked) {
            row.classList.add("row-highlight");
            row.classList.remove("row-highlight-stockCero");
        } else {
            row.classList.remove("row-highlight");
        }
    }

    // Actualizar estilo de las cards al cambiar el estado del checkbox
    function updateCardStyle(cardCheckbox) {
        const card = cardCheckbox.closest("div[id^='cardSelected_']");
        if (cardCheckbox.checked) {
            card.classList.add("cardSelected");
            card.classList.remove("shadow-lg");
        } else {
            card.classList.remove("cardSelected");
            card.classList.add("shadow-lg");
        }
    }

    // Actualizar contador y estado del botón masivo
    function updateSelectionState() {
        const selectedRowCheckboxes = table.querySelectorAll('input[type="checkbox"]:checked');
        // const selectedCardCheckboxes = cardsContainer.querySelectorAll('input.form-check-input:checked')
        let totalSelected = selectedRowCheckboxes.length //+ selectedCardCheckboxes.length;

        spanCheckSelecMasive.textContent = totalSelected;
        btnCheckSelectionAll.disabled = totalSelected === 0;
        spanCheckSelecMasive.classList.toggle("bg-danger", totalSelected === 0);
        spanCheckSelecMasive.classList.toggle("bg-success", totalSelected > 0);
    }

    // Configurar MutationObservers
    const rowObserver = new MutationObserver(() => {
        initializeRowCheckboxes();
    });

    const cardObserver = new MutationObserver(() => {
        initializeCardCheckboxes();
    });

    rowObserver.observe(table, { childList: true, subtree: true });
    cardObserver.observe(cardsContainer, { childList: true, subtree: true });

    // Inicializar eventos al cargar
    initializeRowCheckboxes();
    initializeCardCheckboxes();

    // Botón de SweetAlert2
    btnCheckSelectionAll.addEventListener("click", () => {
        const extractIdNumber = (id) => id.split('_').pop(); // Función para extraer el número del ID
    
        // Función para forzar la carga de una imagen
        function loadImage(imageElement) {
            return new Promise((resolve, reject) => {
                if (imageElement.src) {
                    resolve(imageElement.src);
                } else {
                    imageElement.src = imageElement.dataset.src;
                    imageElement.onload = () => resolve(imageElement.src);
                    imageElement.onerror = () => reject(new Error('Error al cargar la imagen'));
                }
            });
        }

        let selectedCheckboxes = Array.from(cardsContainer.querySelectorAll('input.form-check-input:checked'))
            .concat(Array.from(table.querySelectorAll('input[type="checkbox"]:checked')))
            .reduce((accumulator, checkbox) => {
                const row = checkbox.closest("tr"),
                    card = checkbox.closest("div[id^='cardSelected_']"),
                    idNumber = extractIdNumber(checkbox.id); // Extrae el número del ID

                // Verifica si el ID (número) ya fue procesado
                if (accumulator.some(item => item.idNumber === idNumber)) {
                    return accumulator; // No agregar duplicados
                }
    
                // Agrega al acumulador según corresponda (row o card)
                let imageConsumible = null;
                if (row) {

                    const imgElement = row.querySelector(`[id^="imagen_"]`);
                    if (imgElement) {
                        try {
                            imageConsumible = loadImage(imgElement);
                        } catch (error) {
                        console.error('Error al cargar la imagen:', error);
                        }
                    }

                    accumulator.push({
                        idNumber: idNumber,
                        id: checkbox.id,
                        codigo: row.querySelector(`[id^="codigo_"]`).textContent.trim(),
                        tipo: row.querySelector(`[id^="tipo_"]`).textContent.trim(),
                        descripcion: row.querySelector(`[id^="designation_"]`).textContent.trim(),
                        imageConsumible: row.querySelector(`[id^="imagen_"]`).src.trim(),
                        stock: row.querySelector(`[id^="stock_"] span`).textContent.trim(),
                        limMaxUser: row.querySelector(`[id^="limMaxUser_"]`).textContent.trim(),
                        favorito: row.querySelector(`[id^="redHeart_"]`)
                    });

                } else if (card) {
                    const imgElement = card.querySelector("img");
                    if (imgElement) {
                        try {
                            imageConsumible = loadImage(imgElement);
                        } catch (error) {
                            console.error('Error al cargar la imagen:', error);
                        }
                    }

                    accumulator.push({
                        idNumber: idNumber,
                        id: checkbox.id,
                        codigo: card.querySelector(`[id^="cardCodigo_"]`).textContent.trim(),
                        tipo: card.querySelector(`[id^="cardTipo_"]`).textContent.trim(),
                        descripcion: card.querySelector(`[id^="cardDesignation_"]`).textContent.trim(),
                        imageConsumible: card.querySelector(`[id^="imageConsumible_"]`).src.trim(),
                        stock: card.querySelector(`[id^="cardStock_"]`).textContent.trim(),
                        limMaxUser: card.querySelector(`[id^="limMaxUser_"]`).value.trim(),
                        favorito: card.querySelector(`[id^="redHeart_"]`)
                    });

                }
                return accumulator;
            }, []);

        // Generar SweetAlert2 con los datos seleccionados
        const tableHtml = `
            <form id="formQuantityValues" action="/api/carts/addMulti/" method="post">
                <fieldset>
                    <table id="quantityConsumiblesTable" class="table align-middle" style="font-size: 11pt";>
                        <thead>
                            <tr>
                                <th style="width:15vw" class="text-center">Código</th>
                                <th style="width:12vw" class="text-center">Tipo</th>
                                <th style="width:38vw" class="text-center">Designación</th>
                                <th style="width:17vw" class="text-center">Imagen</th>
                                <th style="width:14vw" class="text-center">Cantidad</th>
                                <th style="width:4vw" class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${selectedCheckboxes.map((data) =>
                                `<tr id="tr_${extractIdNumber(data.id)}">
                                    <td><strong>${data.codigo}</strong></td>
                                    <td><span class="common-style ${data.tipo.replace(/\s+/g, "").toLowerCase()}">${data.tipo}</span></td>
                                    <td>${data.descripcion}</td>
                                    <td class="text-center position-relative">
                                        ${data.imageConsumible ? 
                                            `<img id="imagen_${extractIdNumber(data.id)}" class="img-fluid rounded-3 py-2" alt="Imagen Producto"
                                            src='${data.imageConsumible}' width="100px" height="100px">`
                                            : '<div class="img-placeholder"></div>'}

                                        ${data.favorito ?    
                                            `<i id="redHeart_${extractIdNumber(data.id)}" class="fa-solid fa-heart position-absolute top-0 start-100 text-primary" 
                                                style="font-size: 1.5em; z-index: 100 ;transform: translate(-200%, 40%) !important;">
                                            </i>`
                                            : '' }
                                    </td>
                                    <td><input type="number" name="inputQuantityNumber_${extractIdNumber(data.id)}" class="form-control" value="1" data-id="${data.id}" min="1" max="${data.limMaxUser}">
                                        <input type="hidden" name="idItemHidden_${extractIdNumber(data.id)}" value="${extractIdNumber(data.id)}" style="display: none;"></td>
                                    <td><button name="btnRemoveRow" type="button" id="btnRemoveRow_${extractIdNumber(data.id)}" class="btn btn-danger rounded-circle m-2 border border-2 shadow">
                                        <i class="fa-solid fa-trash"></i></button></td>
                                </tr>`).join("")}
                        </tbody>
                    </table>
                </fieldset>
            </form>`;

        Swal.fire({
            title: "Añadir Múltiples Consumibles",
            html: tableHtml,
            confirmButtonText: 'Añadir al Carrito <i class="fa-solid fa-cart-plus"></i>',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i>',
            cancelButtonColor: '#d33',
            width: 1100,
            position: "center"

        }).then((result) => {
            const formQuantityValues = document.getElementById('formQuantityValues')
            if (result.isConfirmed) {
                formQuantityValues.submit()

                setTimeout(() => {
                    Swal.fire({
                        title: `Ítems añadidos!`,
                        html: 'Los ítems fueron añadidos al carrito con éxito',
                        icon: 'success',
                        width: 500
                    })
                }, 500)

            } else {
                Swal.fire({
                    title: `Ítems no añadidos!`,
                    html: 'Los ítems no fueron añadidos al carrito',
                    icon: 'warning',
                    width: 500
                })
                selectedCheckboxes = []
                return false
            }
        });

        
        document.querySelectorAll("[id^='btnRemoveRow_']").forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault()
                const id = event.target.closest("button").id.split("_")[1];
                id ? removeRow(id) : null
            });
        });

        //---------------- Remove item Row ---------------------------
        function removeRow(idButton, ) {
            let removeButtons = document.querySelectorAll('button[name="btnRemoveRow"]')       
            const rowToDelete = document.getElementById(`tr_${idButton}`)

            if (parseInt(removeButtons.length) > 1) {
                rowToDelete ? rowToDelete.remove() : null
                
            } else {
                Swal.close()
                Swal.fire({
                    title: `Ítems no añadidos!`,
                    html: 'Los ítems no fueron añadidos al carrito',
                    icon: 'warning',
                    width: 500
                })
                return false
            }
        }
    });

});