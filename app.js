const initServer = require("./server.js");

const app = initServer()
const PORT = process.env.PORT || 8002

try {
    app.listen(PORT)
    console.log(`Escuchando en el puerto #${PORT}`)
} catch (error) {
    console.log(error)
}
