const fs = require('fs'),
	PDFDocument = require('pdfkit'),
	date = require('date-and-time'),
	axios = require('axios'),
    { Buffer } = require('buffer'); // Import Buffer from the 'buffer' module

function formatDateInvoice() {
    const dayNow = new Date(),
        rightNow = date.format(dayNow, 'DD-MM-YYYY HH:mm:ss');
    return rightNow.toString();
}

async function createInvoice(invoice, path) {
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
    await generateInvoiceTable(doc, invoice); // await Ahora es una función asíncrona
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
        .text(`Fecha y hora de pedido: ${formatDateInvoice()}`, 70, 190)
        .font("Helvetica-Bold")
        .text(`Información del solicitante:`, 50, 210)
        .font("Helvetica")
        .text(`Nombre: ${shipping.name}`, 70, 230)
        .text(`Apellido: ${shipping.lastName}`, 300, 230)
        .text(`em@il: ${shipping.email}`, 70, 250)
        .text(`username: ${shipping.username}`, 300, 250)
        .text(`Legajo #: ${shipping.legajoIdUser}`, 70, 270)
		.text(`Area: ${areaCapitalized}`, 300, 270)
        .moveDown();
}

async function generateInvoiceTable(doc, invoice) {
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
            itemIdChain = item.consumibleId.toString().substring(19);

        try {
            // Intentar descargar la imagen del consumible desde la URL
            const imageBuffer = await axios.get(item.imageConsumible, { responseType: 'arraybuffer' });
            const imageBase64 = Buffer.from(imageBuffer.data, 'binary').toString('base64');

            // Insertar la imagen del consumible en el PDF
            doc.image(Buffer.from(imageBase64, 'base64'), 425, position - 13, { width: 30, height: 30 });
        
        } catch (error) {
            // Si falla, usar la imagen por defecto
            const defaultImageUrl = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/ConsumiblesImages/noImageFound.png";
            try {
                const defaultImageBuffer = await axios.get(defaultImageUrl, { responseType: 'arraybuffer' });
                const defaultImageBase64 = Buffer.from(defaultImageBuffer.data, 'binary').toString('base64');
                doc.image(Buffer.from(defaultImageBase64, 'base64'), 425, position - 13, { width: 30, height: 30 });
            
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
            item.quantity
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
    quantity
) {

    function cortarTexto(texto) {
        // Verificamos si la longitud del texto es mayor a 30 caracteres
        if (texto.length > 30) {
            // Cortamos el texto hasta el carácter 27 y agregamos "..."
            return texto.slice(0, 27) + "...";
        }
        // Si no es mayor a 30, devolvemos el texto original
        return texto;
    }

    let designationTrim = cortarTexto(designation);

    // Mapeo de tipos
    const tipos = {
        epp: 'EPP',
        consumiblesAjuste: 'Cons. Ajuste',
        consumiblesMecanizado: 'Cons. Mecanizado',
        insertos: 'Insertos',
        herramientas: 'Herramientas',
    };

    // Función para obtener el tipo
    function obtenerTipo(type) {
        // Si el tipo existe en el objeto, lo devuelve; de lo contrario, devuelve 'Otros'
        return tipos[type] || 'Otros';
    }

    let tipo = obtenerTipo(type);

    doc
        .fontSize(9)
        .text('...'+item, 50, y)
        .text(code, 100, y)
        .text(designationTrim, 210, y)
        .text(tipo, 350, y)
        .text(quantity, 500, y, { width: 50, align: "center" });
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
        .text(designation, 210, y)
        .text(type, 350, y)
        .text(imageConsumible, 425, y)
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