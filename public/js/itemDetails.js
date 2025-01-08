const maxStock = parseInt(document.getElementById('stock').value)
let value = parseInt(document.getElementById('number').value)

//----------------- Add quatity --------------------------
function incrementValue() {
    value = isNaN(value) ? 0 : value
    value < maxStock ? value++ : null
    document.getElementById('number').value = value
}

//----------------- Remove quatity -----------------------
function decrementValue() {
    value = isNaN(value) ? 0 : value
    value > 1 ? value-- : null
    document.getElementById('number').value = value
}