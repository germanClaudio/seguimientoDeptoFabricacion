const orderNumberElement = document.getElementById('orderNumber').value,
	orderNumber = orderNumberElement.replace(/\s/g, ""),
	filename = `Invoice_${orderNumber}.pdf`,
	downloadBtn = document.getElementById('download-btn');

function downloadPdf() {
    const pdfUrl = `https://storage.googleapis.com/imagenesproyectosingenieria/upload/PdfOrders/Invoice_${orderNumber}.pdf`;

    // Open the PDF in a new tab
    const newWindow = window.open(pdfUrl, '_blank');

    // Optional: Focus the new window (if supported by the browser)
    if (newWindow) {
        newWindow.focus();
    } else {
        // Fallback for browsers that block pop-ups
        alert('Por favor, autorice los pop-ups en este sitio para visualizar el PDF.');
    }
}

downloadBtn.addEventListener('click', () => {
    downloadPdf();
});