const fs = require('fs'),
	PDFDocument = require('pdfkit'),
	date = require('date-and-time'),
	axios = require('axios'),
	dataUriToBuffer = require('data-uri-to-buffer'); // Importación correcta de la librería

function formatDateInvoice() {
    const dayNow = new Date();
    const rightNow = date.format(dayNow, 'DD-MM-YYYY HH:mm:ss');
    return rightNow.toString();
}

async function createInvoice(invoice, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateHr(doc, 138);
    generateCustomerInformation(doc, invoice);
    await generateInvoiceTable(doc, invoice); // await Ahora es una función asíncrona
    generateHr(doc, 755);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
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

function generateCustomerInformation(doc, invoice) {
    const shipping = invoice.shipping;
    doc
        .fillColor("#444444")
        .fontSize(16)
        .text("Solicitud de ítems o EPP", 50, 148)
        .fontSize(11)
        .text(`Pedido #: ${invoice.invoice_nr}`, 70, 170)
        .text(`Fecha pedido: ${formatDateInvoice()}`, 70, 190)
        .font("Helvetica-Bold")
        .text(`Informacion del solicitante:`, 50, 210)
        .font("Helvetica")
        .text(`Nombre: ${shipping.name}`, 70, 230)
        .text(`Apellido: ${shipping.lastName}`, 290, 230)
        .text(`em@il: ${shipping.email}`, 70, 250)
        .text(`username: ${shipping.username}`, 290, 250)
        .text(`Legajo #: ${shipping.legajoId}`, 70, 270)
		.text(`Area: ${shipping.area}`, 290, 270)
        .moveDown();
}

// async function generateInvoiceTable(doc, invoice) {
//     let i;
//     const invoiceTableTop = 300;

//     doc.font("Helvetica-Bold");
//     generateTableRow(
//         doc,
//         invoiceTableTop,
//         "Item Id",
//         "Código",
//         "Descripción",
//         "Tipo",
//         "Imagen",
//         "QR",
//         "Cantidad"
//     );
//     generateHr(doc, invoiceTableTop + 20);
//     doc.font("Helvetica");

//     for (i = 0; i < invoice.items.length; i++) {
//         const item = invoice.items[i];
//         const position = invoiceTableTop + (i + 1) * 35;
// 		const itemIdChain = item.consumibleId.toString().substring(19)

//         // Descargar la imagen del consumible desde la URL
//         const imageBuffer = await axios.get(item.imageConsumible, { responseType: 'arraybuffer' });
//         const imageBase64 = Buffer.from(imageBuffer.data, 'binary').toString('base64');

//         // Convertir el código QR (en formato data URI) a un buffer
//         // const qrBuffer = dataUriToBuffer(item.qrCode); // Usamos data-uri-to-buffer para manejar la URI de datos

//         generateTableRow(
//             doc,
//             position,
//             itemIdChain,//item.consumibleId,
//             item.code,
//             item.designation,
//             item.type,
//             '', // No necesitamos texto aquí, ya que vamos a insertar la imagen
//             '', // No necesitamos texto aquí, ya que vamos a insertar el código QR
//             item.quantity
//         );

//         // Insertar la imagen del consumible en el PDF
//         doc.image(Buffer.from(imageBase64, 'base64'), 440, position - 10, { width: 30, height: 30 });

//         // Insertar la imagen del código QR en el PDF
//         // doc.image(qrBuffer, 450, position - 10, { width: 30, height: 30 });

//         generateHr(doc, position + 25);
//     }
// }

async function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 300;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item Id",
        "Código",
        "Descripción",
        "Tipo",
        "Imagen",
        "QR",
        "Cantidad"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 35;
        const itemIdChain = item.consumibleId.toString().substring(19);

        try {
            // Intentar descargar la imagen del consumible desde la URL
            const imageBuffer = await axios.get(item.imageConsumible, { responseType: 'arraybuffer' });
            const imageBase64 = Buffer.from(imageBuffer.data, 'binary').toString('base64');

            // Insertar la imagen del consumible en el PDF
            doc.image(Buffer.from(imageBase64, 'base64'), 440, position - 10, { width: 30, height: 30 });
        } catch (error) {
            console.error(`Error al cargar la imagen: ${item.imageConsumible}. Usando imagen por defecto.`, error);

            // Si falla, usar la imagen por defecto
            const defaultImageUrl = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/ConsumiblesImages/noImageFound.png";
            try {
                const defaultImageBuffer = await axios.get(defaultImageUrl, { responseType: 'arraybuffer' });
                const defaultImageBase64 = Buffer.from(defaultImageBuffer.data, 'binary').toString('base64');
                doc.image(Buffer.from(defaultImageBase64, 'base64'), 440, position - 10, { width: 30, height: 30 });
            } catch (defaultError) {
                console.error('Error al cargar la imagen por defecto:', defaultError);
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

        generateHr(doc, position + 25);
    }
}

function generateFooter(doc) {
    doc.fontSize(10).text(
        'Su pedido ha sido solicitado y está en preparación. Gracias por utilizar esta App.',
        50,
        780,
        { align: 'center', width: 500 }
    );
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
    doc
        .fontSize(8)
        .text('...'+item, 50, y)
        .fontSize(9)
        .text(code, 100, y)
        .text(designation, 210, y)
        .text(type, 360, y)
        .text(quantity, 470, y, { width: 50, align: "center" });
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