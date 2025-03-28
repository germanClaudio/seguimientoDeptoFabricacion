// Función para descargar el archivo PDF
function downloadPdfFile(orderNumber) {
    const pdfUrl = `https://storage.googleapis.com/imagenesproyectosingenieria/upload/PdfResumenOrders/Resumen_${orderNumber}.pdf`;

    // Abrir el PDF en una nueva pestaña
    const newWindow = window.open(pdfUrl, '_blank');

    // Opcional: Enfocar la nueva ventana (si el navegador lo permite)
    if (newWindow) {
        newWindow.focus();
    } else {
        // Fallback para navegadores que bloquean pop-ups
        alert('Por favor, autorice los pop-ups en este sitio para visualizar el PDF.');
    }
}

// Función para generar un color aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para asegurar el contraste del texto
function ensureContrast(color) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

// Asignar eventos a los botones de descarga
document.querySelectorAll('.download-btn').forEach(button => {
    // Asignar colores aleatorios a los botones
    const bgColor = getRandomColor();
    button.style.backgroundColor = bgColor;
    button.style.color = ensureContrast(bgColor);

    // Asignar el evento click a cada botón
    button.addEventListener('click', () => {
        // Obtener el número de orden desde el atributo data-order-number
        const orderNumber = button.getAttribute('data-order-number');
        if (orderNumber) {
            downloadPdfFile(orderNumber); // Pasar orderNumber como parámetro
        } else {
            // alert('No se encontró el número de orden asociado a este botón.');
            swal.fire({
                title: 'Error',
                position: 'center',
                timer: 2000,
                text: `No se encontró el número de orden asociado a este botón.`,
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
            })
            return false
        }
    });
});


// Función para descargar el archivo PDF
// function downloadPdfFile(orderNumber) {
//     const pdfUrl = `https://storage.googleapis.com/imagenesproyectosingenieria/upload/PdfResumenOrders/Resumen_${orderNumber}.pdf`;

//     // Abrir el PDF en una nueva pestaña
//     const newWindow = window.open(pdfUrl, '_blank');

//     // Opcional: Enfocar la nueva ventana (si el navegador lo permite)
//     if (newWindow) {
//         newWindow.focus();
//     } else {
//         // Fallback para navegadores que bloquean pop-ups
//         alert('Por favor, autorice los pop-ups en este sitio para visualizar el PDF.');
//     }
// }

// Función para generar un color aleatorio
// function getRandomColor() {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// Función para asegurar el contraste del texto
// function ensureContrast(color) {
//     const r = parseInt(color.substr(1, 2), 16);
//     const g = parseInt(color.substr(3, 2), 16);
//     const b = parseInt(color.substr(5, 2), 16);
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? '#000000' : '#FFFFFF';
// }

// Asignar eventos a los botones de descarga
// document.querySelectorAll('.download-btn').forEach(button => {
//     const bgColor = getRandomColor();
//     button.style.backgroundColor = bgColor;
//     button.style.color = ensureContrast(bgColor);

//     button.addEventListener('click', () => {
//         // Obtener el valor de orderNumber del input correspondiente
//         const orderNumberElement = document.getElementsByName('orderNumber');
//         if (orderNumberElement.length > 0) {
//             const orderNumber = orderNumberElement[0].value.replace(/\s/g, "");
//             downloadPdfFile(orderNumber); // Pasar orderNumber como parámetro
//         } else {
//             alert('No se encontró el número de orden.');
//         }
//     });
// });
