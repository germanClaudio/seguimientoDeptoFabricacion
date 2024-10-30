function tieneNumeros(cadena) {
    // Expresión regular que verifica si hay un número al inicio (^) o en cualquier lugar de la cadena.
    const regex = /^[0-9]|[0-9]/;
    return regex.test(cadena);
}

module.exports =
    tieneNumeros