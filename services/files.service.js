const ArchivosDaoFactory = require('../daos/archivos/ArchivosDaoFactory.js')
const archivosDao = ArchivosDaoFactory.getDaoFiles()

class FileService {
    constructor() {
        this.archivos = archivosDao
    }

    // return files upload to GCS
    async uploadToGCS(req, res) {
        return await this.archivos.uploadToGCS(req, res)
    }

}

module.exports = FileService