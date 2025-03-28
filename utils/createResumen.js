const PDFDocument = require('pdfkit'),
    date = require('date-and-time'),
    axios = require('axios'),
    { Buffer } = require('buffer'); // Import Buffer from the 'buffer' module

function formatDateInvoice(fecha) {
    const dayNow = new Date(fecha),
        rightNow = date.format(dayNow, 'DD-MM-YYYY HH:mm:ss');
    return rightNow.toString();
}

async function createResumen(invoice) {
    let doc = new PDFDocument({ size: "A4", margin: 50 }),
        currentPage = 1, // Contador de páginas
        totalPages = 1; // Inicializar el total de páginas

    // Create a buffer to store the PDF
    let chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    generateHeader(doc);
    generateHr(doc, 138);
    generateCustomerInformation(doc, invoice);
    await generateInvoiceTable(doc, invoice, totalPages); // Pasar totalPages como referencia
    // generateHr(doc, 740); // Línea horizontal antes del footer, decia doc.y
    // generateFooter(doc, currentPage, totalPages); // Footer en la primera página

    doc.end();

    // Return a promise that resolves with the PDF buffer
    return new Promise((resolve, reject) => {
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(chunks);
            resolve(pdfBuffer);
        });
        doc.on('error', reject);
    });
}

function generateHeader(doc) {
    doc.image('./public/src/images/Logo_Prodismo.png', 50, 65, { width: 65 })
        .fillColor('#444444')
        .fontSize(8)
        .font("Helvetica-Bold")
        .text('Moldes y Matrices // Líneas de Ensamble', 190, 65, { align: 'right' })
        .font("Helvetica")
        .text('Av. Japón 2230 – C.P. X5145XAB C.C. 46 Suc. 8 – Córdoba – Argentina', 190, 75, { align: 'right' })
        .text('Tel: (+54) (351) 4995921 / 24 - 4995239 – 4998276 Fax: (+54) (351) 4995920', 190, 85, { align: 'right' })
        .font("Helvetica-Bold")
        .text('Correo electrónico', 190, 95, { align: 'right' })
        .font("Helvetica")
        .text('e-mail: prodismo@prodismo.com / https://www.prodismo.com', 190, 105, { align: 'right' })
        .font("Helvetica-Bold")
        .text('México y Brasil', 190, 115, { align: 'right' })
        .font("Helvetica")
        .text('México – Te: (+52) (222) 2866203 – Fax: (+52) (222) 2866205 / Brasil – prodismo@prodismo.com', 190, 125, { align: 'right' })
        .moveDown();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateCustomerInformation(doc, invoice) {
    const shipping = invoice.shipping,
        areaCapitalized = capitalizeFirstLetter(shipping.area);
    doc
        .fillColor("#444444")
        .fontSize(15)
        .text("Resumen Solicitud de ítems o EPP a Pañol", 50, 148)
        .fontSize(11)
        .text(`Resumen #: ${invoice.resumen_nr}`, 70, 170)
        .text(`Fecha y hora de resumen:`, 70, 190)
        .font("Helvetica-Bold")
        .text(`${formatDateInvoice(invoice.timestamp)}`, 200, 190)
        .font("Helvetica-Bold")
        .text(`Información del solicitante:`, 50, 210)
        .font("Helvetica")
        .text(`Nombre: ${shipping.name}`, 70, 230)
        .text(`Apellido: ${shipping.lastName}`, 270, 230)
        .text(`em@il: ${shipping.email}`, 70, 250)
        .text(`username: ${shipping.username}`, 270, 250)
        .text(`Legajo #: ${shipping.legajoIdUser}`, 70, 270)
        .text(`Area: ${areaCapitalized}`, 270, 270)
        .text(`____________________`, 405, 255)
        .text(`Firma Solicitante`, 425, 270)
        .moveDown();
}

async function generateInvoiceTable(doc, invoice, totalPages) {
    let i, j,
        currentPage = 1, // Contador de páginas
        y = 300; // Posición inicial para la tabla de órdenes

    // Función para agregar una nueva página
    const addNewPage = () => {
        totalPages++; // Incrementar el total de páginas
        generateFooter(doc, currentPage, totalPages);
        doc.addPage();
        currentPage++;
        generateHeader(doc); // Generar encabezado en la nueva página
        generateHr(doc, 138); // Línea horizontal después del encabezado
        y = 150; // Reiniciar la posición Y en la nueva página
    };

    // Iterar sobre cada orden
    for (i = 0; i < invoice.orders.length; i++) {
        const order = invoice.orders[i],
            orderDate = formatDateInvoice(order.timestamp),
            orderItems = order.items,
            letterOrNumberItem = order.letterOrNumber

        // Verificar si hay espacio suficiente en la página actual
        if (y + 100 > 740) { // 740 es la posición aproximada del footer
            addNewPage();
        }

        // Mostrar información de la orden
        generateTableRowTitleForOrder(
            doc,
            i,
            order,
            y,
            orderDate,
            orderItems.length,
            letterOrNumberItem
        );

        y += 25; // Ajustar la posición Y después de la información de la orden, decía 30
        generateHr(doc, y); // Línea horizontal después de la información de la orden
        y += 15; // Ajustar la posición Y después de la línea horizontal

        // Mostrar la cabecera de los ítems (solo una vez por orden)
        generateTableRowTitle(
            doc,
            y,
            "Item Id",
            "Código",
            "Descripción",
            "Tipo",
            "Imagen",
            "Cantidad"
        );

        y += 10; // Ajustar la posición Y después del título de ítems, decía 20
        generateHr(doc, y); // Línea horizontal después del título de ítems
        y += 15; // Ajustar la posición Y después de la línea horizontal, decía 10

        // Mostrar los ítems de la orden
        doc.font("Helvetica")
            .fontSize(9);

        for (j = 0; j < orderItems.length; j++) {
            const item = orderItems[j],
                letterOrNumber = letterOrNumberItem[j]

            // Verificar si hay espacio suficiente para el ítem actual
            if (y + 30 > 740) { // 30 es la altura aproximada de cada fila de ítem
                addNewPage();
            }

            generateTableRow(
                doc,
                y,
                j,
                y,
                item.code,
                item.designation,
                item.type,
                item.imageConsumible,
                item.qrCode,
                item.quantity,
                item.tipoTalle,
                letterOrNumber
            );

            // Insertar imagen del ítem si está disponible
            if (item.imageConsumible) {
                try {
                    // Intentar descargar la imagen del consumible desde la URL
                    const imageBuffer = await axios.get(item.imageConsumible, { responseType: 'arraybuffer' });
                    const imageBase64 = Buffer.from(imageBuffer.data, 'binary').toString('base64');

                    // Insertar la imagen del consumible en el PDF
                    doc.image(Buffer.from(imageBase64, 'base64'), 435, y - 11, { width: 30, height: 30 } ) //{ fit: [30, 30] }); // decia -13

                } catch (error) {
                    // Si falla, usar la imagen por defecto
                    const defaultImageUrl = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/ConsumiblesImages/noImageFound.png";
                    try {
                        const defaultImageBuffer = await axios.get(defaultImageUrl, { responseType: 'arraybuffer' });
                        const defaultImageBase64 = Buffer.from(defaultImageBuffer.data, 'binary').toString('base64');
                        doc.image(Buffer.from(defaultImageBase64, 'base64'), 435, y - 11, { width: 30, height: 30 } ) //{ fit: [30, 30] }); // decia -13
                    
                    } catch (defaultError) {
                        // Si falla la imagen por defecto, simplemente no se inserta ninguna imagen
                    }
                }
            }

            y += 25; // Ajustar la posición Y después de cada ítem, decia 30
            generateHr(doc, y); // Línea horizontal después de cada ítem
            y += 15; // Ajustar la posición Y después de la línea horizontal
        }

        // Espacio entre órdenes
        y += 25;
    }

    generateFooter(doc, currentPage, totalPages);
}

// Función para generar el footer con numeración de páginas
function generateFooter(doc, pageNumber, totalPages) {
    generateHr(doc, 745)
    doc
        .fontSize(9)
        .text(`Página ${pageNumber} de ${totalPages}`, 50, 750, { align: 'center', width: 500 })
        .text('Si usted solicitó EPP, deberá firmar esta solicitud al retirar los ítems del Pañol.', 50, 765, { align: 'center', width: 500 })
        .text('Gracias por utilizar esta App!', 50, 775, { align: 'center', width: 500 });
}

function generateTableRow(
    doc,
    y,
    j,
    position,
    code,
    designation,
    type,
    imageConsumible,
    qrCode,
    quantity,
    tipoTalle,
    tipoStock
) {
    function cortarTextoCodigo(code) {
        if (code.length > 12) {
            return code.slice(0, 10) + "...";
        }
        return code;
    }
    let codeTrim = cortarTextoCodigo(code);

    function cortarTexto(texto) {
        if (texto.length > 50) {
            return texto.slice(0, 47) + "...";
        }
        return texto;
    }
    let designationTrim = cortarTexto(designation);

    const tipos = {
        epp: 'EPP',
        ropa: 'Ropa',
        consumiblesAjuste: 'Cons. Ajuste',
        consumiblesMecanizado: 'Cons. Mecanizado',
        consumiblesLineas: 'Cons. Líneas',
        herramientas: 'Herramientas',
    };

    function obtenerTipo(type) {
        return tipos[type] || 'Otros';
    }
    let tipo = obtenerTipo(type);

    const talle = {
        talle: 'T',
        numero: 'N'
    }

    const letterMapping = {
        'a': 'XS', 'b': 'S', 'c': 'M',
        'd': 'L', 'e': 'XL', 'f': '2XL',
        'g': '3XL', 'h': '4XL', 'i': '5XL', 'j': '6XL'
    };

    const numberMapping = {
        35: 35, 36: 36, 37: 37, 38: 38, 39: 39,
        40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49,
        50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59,
        60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65
    };

    function obtenerTipoTalleYStock(tipoTalle, tipoStock) {
        if (talle[tipoTalle] === 'T') {
            return [talle[tipoTalle], letterMapping[tipoStock]];
        } else if (talle[tipoTalle] === 'N') {
            return [talle[tipoTalle], numberMapping[tipoStock]];
        } else {
            return null;
        }
    }

    let tipoTalleToShow = obtenerTipoTalleYStock(tipoTalle, tipoStock);
    
    if (obtenerTipo(type) === 'Ropa') {
        doc
            .fontSize(8)
            .text(`#${j + 1}`, 50, position, { width: 30, align: "center" })
            .fontSize(9)
            .text(codeTrim, 100, position)
            .fontSize(8)
            .text(designationTrim, 160, position)
            .text(tipo, 360, position, { width: 50, align: "center" })
            .font("Helvetica-Bold")
            .text(quantity, 495, position, { width: 40, align: "center" })
            .text(tipoTalleToShow[0] + ': ', 523, position, { width: 10, align: "center" })
            .text(tipoTalleToShow[1], 531, position, { width: 15, align: "center" })
            .font("Helvetica");

    } else {
        doc
            .fontSize(8)
            .text(`#${j + 1}`, 50, position, { width: 30, align: "center" })
            .fontSize(9)
            .text(codeTrim, 100, position)
            .fontSize(8)
            .text(designationTrim, 160, position)
            .text(tipo, 360, position, { width: 50, align: "center" })
            .font("Helvetica-Bold")
            .text(quantity, 510, position, { width: 40, align: "center" })
            .font("Helvetica");
    }
}

function generateTableRowTitle(
    doc,
    y,
    item,
    code,
    designation,
    type,
    imageConsumible,
    quantity
) {
    doc
        .fontSize(9)
        .text(item, 50, y)
        .text(code, 100, y)
        .text(designation, 160, y, { width: 190, align: "center" })
        .text(type, 375, y)
        .text(imageConsumible, 435, y)
        .text(quantity, 500, y, { width: 50, align: "center" });
}

function generateTableRowTitleForOrder(
    doc,
    i,
    order,
    y,
    orderDate,
    orderQuantity
) {
    doc.font("Helvetica-Bold")
        .fontSize(10)
        .text(`Orden #${i + 1} - id#: ${order._id}`, 50, y)
        .text(`Fecha: ${orderDate}`, 270, y)
        .font("Helvetica")
        .fontSize(9)
        .text(`Prod.: ${orderQuantity}`, 440, y)
        .text(`Ítems: ${order.items.length}`, 480, y)
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

module.exports = {
    createResumen
};