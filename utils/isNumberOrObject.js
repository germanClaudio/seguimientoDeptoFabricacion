function esStringUObjeto(variable) {
    if (typeof variable === "string") {
        return false;
    } else if (Object.prototype.toString.call(variable) === "[object Object]") {
        return true;
    } else {
        return null;
    }
}

module.exports =
    esStringUObjeto