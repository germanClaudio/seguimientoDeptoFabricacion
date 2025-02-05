const orderNumberElement = document.getElementById('orderNumber').value,
	orderNumber = orderNumberElement.replace(/\s/g, ""),
	filename = `Invoice_${orderNumber}.pdf`,
	downloadBtn = document.getElementById('download-btn')

function downloadPdf() {
	const pdfUrl = `https://storage.googleapis.com/imagenesproyectosingenieria/upload/PdfOrders/Invoice_${orderNumber}.pdf`
	
	// Create a new anchor element
	const link = document.createElement("a");
	
	link.setAttribute('href', pdfUrl);
	
	// Set the download attribute to force download
	link.setAttribute("download", filename);
	
	// Append the anchor element to the document body
	document.body.appendChild(link);
	
	// Trigger the click event to initiate download
	link.click();
	
	// Remove the anchor element from the document body
	document.body.removeChild(link);
}

downloadBtn.addEventListener('click', () => {
    downloadPdf()
})