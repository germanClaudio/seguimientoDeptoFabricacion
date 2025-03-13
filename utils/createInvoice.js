const fs = require('fs'),
	PDFDocument = require('pdfkit'),
	date = require('date-and-time'),
	axios = require('axios'),
    { Buffer } = require('buffer'); // Import Buffer from the 'buffer' module

function formatDateInvoice(fecha) {
    const dayNow = new Date(fecha),
        rightNow = date.format(dayNow, 'DD-MM-YYYY HH:mm:ss');
    return rightNow.toString();
}

async function createInvoice(invoice, arrayTipoStock) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    // Create a buffer to store the PDF
    let chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
        // When the PDF is finished, you can do something with the buffer
        const pdfBuffer = Buffer.concat(chunks);
        // For example, you can return the buffer or pass it to another function
        // console.log('PDF created in memory:', pdfBuffer);
    });

    generateHeader(doc);
    generateHr(doc, 138);
    generateCustomerInformation(doc, invoice);
    await generateInvoiceTable(doc, invoice, arrayTipoStock);
    generateHr(doc, 740);
    generateFooter(doc);

    doc.end();
    // doc.pipe(fs.createWriteStream(path));

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
        .text('Moldes y Matrices // Líneas de Ensamble', 200, 65, { align: 'right' })
        .font("Helvetica")
        .text('Av. Japón 2230 – C.P. X5145XAB C.C. 46 Suc. 8 – Córdoba – Argentina', 200, 75, { align: 'right' })
        .text('Tel: (+54) (351) 4995921 / 24 - 4995239 – 4998276 Fax: (+54) (351) 4995920', 200, 85, { align: 'right' })
        .font("Helvetica-Bold")
        .text('Correo electrónico', 200, 95, { align: 'right' })
        .font("Helvetica")
        .text('e-mail: prodismo@prodismo.com / https://www.prodismo.com', 200, 105, { align: 'right' })
        .font("Helvetica-Bold")
        .text('México y Brasil', 200, 115, { align: 'right' })
        .font("Helvetica")
        .text('México – Te: (+52) (222) 2866203 – Fax: (+52) (222) 2866205 / Brasil – prodismo@prodismo.com', 200, 125, { align: 'right' })
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
        .text("Solicitud de ítems o EPP a Pañol", 50, 148)
        .fontSize(11)
        .text(`Pedido #: ${invoice.invoice_nr}`, 70, 170)
        .text(`Fecha y hora de pedido:`, 70, 190)
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

async function generateInvoiceTable(doc, invoice, arrayTipoStock) {
    let i;
    const invoiceTableTop = 300;

    doc.font("Helvetica-Bold");
    generateTableRowTitle(
        doc,
        invoiceTableTop,
        "Item Id",
        "Código",
        "Descripción",
        "Tipo",
        "Imagen",
        "",
        "Cantidad"
    );
    generateHr(doc, invoiceTableTop + 15);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i],
            position = invoiceTableTop + (i + 1) * 35,
            itemIdChain = item.consumibleId.toString().substring(19),
            tipoStockUnit = arrayTipoStock[i]

        try {
            // Intentar descargar la imagen del consumible desde la URL
            const imageBuffer = await axios.get(item.imageConsumible, { responseType: 'arraybuffer' });
            const imageBase64 = Buffer.from(imageBuffer.data, 'binary').toString('base64');

            // Insertar la imagen del consumible en el PDF
            doc.image(Buffer.from(imageBase64, 'base64'), 435, position - 13, { width: 30, height: 30 });
        
        } catch (error) {
            // Si falla, usar la imagen por defecto
            const defaultImageUrl = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/ConsumiblesImages/noImageFound.png";
            try {
                const defaultImageBuffer = await axios.get(defaultImageUrl, { responseType: 'arraybuffer' });
                const defaultImageBase64 = Buffer.from(defaultImageBuffer.data, 'binary').toString('base64');
                doc.image(Buffer.from(defaultImageBase64, 'base64'), 435, position - 13, { width: 30, height: 30 });
            
            } catch (defaultError) {
                // console.error('Error al cargar la imagen por defecto:', defaultError);
                // Si falla la imagen por defecto, simplemente no se inserta ninguna imagen
            }
        }

        // Insertar la fila de la tabla
        generateTableRow(
            doc,
            position,
            itemIdChain,
            item.code,
            item.designation,
            item.type,
            '', // No necesitamos texto aquí, ya que vamos a insertar la imagen
            '', // No necesitamos texto aquí, ya que vamos a insertar el código QR
            item.quantity,
            item.tipoTalle,
            tipoStockUnit
        );

        generateHr(doc, position + 20);
    }
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text('Su pedido se ha enviado con éxito y está en preparación.', 50, 745, { align: 'center', width: 500 } )
        .text('Si usted solicitó EPP, deberá firmar esta solicitud al retirar los ítems del Pañol.', 50, 760, { align: 'center', width: 500 } )
        .text('Gracias por utilizar esta App!', 50, 775, { align: 'center', width: 500 } );
}

function generateTableRow(
    doc,
    y,
    item,
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
        // Verificamos si la longitud del code es mayor a 30 caracteres
        if (code.length > 12) {
            // Cortamos el code hasta el carácter 27 y agregamos "..."
            return code.slice(0, 10) + "...";
        }
        // Si no es mayor a 12, devolvemos el code original
        return code;
    }
    let codeTrim = cortarTextoCodigo(code);

    function cortarTexto(texto) {
        // Verificamos si la longitud del texto es mayor a 30 caracteres
        if (texto.length > 50) {
            // Cortamos el texto hasta el carácter 27 y agregamos "..."
            return texto.slice(0, 47) + "...";
        }
        // Si no es mayor a 50, devolvemos el texto original
        return texto;
    }
    let designationTrim = cortarTexto(designation);


    // Mapeo de tipos
    const tipos = {
        epp: 'EPP',
        ropa: 'Ropa',
        consumiblesAjuste: 'Cons. Ajuste',
        consumiblesMecanizado: 'Cons. Mecanizado',
        consumiblesLineas: 'Cons. Líneas',
        herramientas: 'Herramientas',
    };

    // Función para obtener el tipo
    function obtenerTipo(type) {
        // Si el tipo existe en el objeto, lo devuelve; de lo contrario, devuelve 'Otros'
        return tipos[type] || 'Otros';
    }
    let tipo = obtenerTipo(type);


    // Mapeo de tipos de stock
    const talle = {
        // unico: 'U',
        talle: 'T',
        numero: 'N'
    }

    // Mapeo de tipos de stock
    const letterMapping = {
        'a': 'XS', 'b': 'S', 'c': 'M',
        'd': 'L', 'e': 'XL', 'f': '2XL',
        'g': '3XL', 'h': '4XL', 'i': '5XL',	'j': '6XL'
    };

    // Mapeo de tipos de stock
    const numberMapping = {
        35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 
        40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49,
        50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59,
        60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65
    };


    // Función para obtener el tipo
    function obtenerTipoTalleYStock(tipoTalle, tipoStock) {
        // Si el tipo existe en el objeto, lo devuelve; de lo contrario, devuelve ''
        if (talle[tipoTalle] === 'T') {
            return [ talle[tipoTalle], letterMapping[tipoStock] ];

        } else if (talle[tipoTalle] === 'N') {
            return [ talle[tipoTalle], numberMapping[tipoStock] ];

        } else {
            return null
        }

    }
    let tipoTalleToShow = obtenerTipoTalleYStock(tipoTalle, tipoStock)

    if (tipoTalleToShow) {
        doc
            .fontSize(8)
            .text('...'+item, 50, y)
            .fontSize(9)
            .text(codeTrim, 100, y)
            .fontSize(8)
            .text(designationTrim, 155, y)
            .text(tipo, 360, y, { width: 50, align: "center" })
            .font("Helvetica-Bold")
            .text(quantity, 495, y, { width: 40, align: "center" })
            .text(tipoTalleToShow[0]+': ', 523, y, { width: 10, align: "center" })
            .text(tipoTalleToShow[1], 531, y, { width: 15, align: "center" })
            .font("Helvetica");

    } else {
        doc
            .fontSize(8)
            .text('...'+item, 50, y)
            .fontSize(9)
            .text(codeTrim, 100, y)
            .fontSize(8)
            .text(designationTrim, 155, y)
            .text(tipo, 360, y, { width: 50, align: "center" })
            .font("Helvetica-Bold")
            .text(quantity, 510, y, { width: 40, align: "center" })
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
    qrCode,
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

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

module.exports = {
    createInvoice
};