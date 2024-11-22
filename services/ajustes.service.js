const AjustesDaoFactory = require('../daos/ajustes/AjustesDaoFactory.js')
const ajustesDao = AjustesDaoFactory.getDaoAjustes()

class AjustesService {
    constructor() {
        // this.proyectos = proyectosDao
        this.ajustes = ajustesDao
    }

    // returns all projects
    async getAllProjectsWon() {
        return this.ajustes.getAllProjectsWon()
    }

    // returns all projects from one Client
    async getProjectsByClientId(data) {
        return this.proyectos.getProjectsByClientId(data)
    }

    // returns one project from a ProjectId
    async selectProjectByProjectId(idProject) {
        return this.ajustes.selectProjectByProjectId(idProject)
    }

    // returns all projects from a Main ProjectId
    async selectProjectsByMainProjectId(idProject) {
        return this.proyectos.selectProjectsByMainProjectId(idProject)
    }

    // returns all OCI from projects
    async getAllOciProjects() {
        return this.proyectos.getAllOciProjects()
    }

    // add Info Distribution to Detail - Project
    // async addInfoOtDistribucion(projectId, otQuantity, ociNumberK, arrayOtNumberK, arrayDetalleNumberK, detallesQuantity, totalDetallesQuantity, arrayInfoAddedToDetail) {
    //     return this.ajustes.addInfoOtDistribucion(
    //         projectId,
    //         otQuantity,
    //         ociNumberK,
    //         arrayOtNumberK,
    //         arrayDetalleNumberK,
    //         detallesQuantity,
    //         totalDetallesQuantity,
    //         arrayInfoAddedToDetail)
    // }

    // add Info Programation 1° to Detail - Project
    // async addInfoProgramacionPrimera(projectId, otQuantity, ociNumberK, arrayOtNumberK, arrayDetalleNumberK, detallesQuantity, totalDetallesQuantity, arrayInfoAddedToDetail) {
    //     return this.ajustes.addInfoProgramacionPrimera(
    //         projectId,
    //         otQuantity,
    //         ociNumberK,
    //         arrayOtNumberK,
    //         arrayDetalleNumberK,
    //         detallesQuantity,
    //         totalDetallesQuantity,
    //         arrayInfoAddedToDetail)
    // }

    // add Info Programation 2° to Detail - Project
    // async addInfoProgramacionSegunda(projectId, otQuantity, ociNumberK, arrayOtNumberK, arrayDetalleNumberK, detallesQuantity, totalDetallesQuantity, arrayInfoAddedToDetail) {
    //     return this.ajustes.addInfoProgramacionSegunda(
    //         projectId,
    //         otQuantity,
    //         ociNumberK,
    //         arrayOtNumberK,
    //         arrayDetalleNumberK,
    //         detallesQuantity,
    //         totalDetallesQuantity,
    //         arrayInfoAddedToDetail)
    // }

    // add Info Machinned 1° to Detail - Project
    // async addInfoMecanizadoPrimera(projectId, otQuantity, ociNumberK, arrayOtNumberK, arrayDetalleNumberK, detallesQuantity, totalDetallesQuantity, arrayInfoAddedToDetail) {
    //     return this.ajustes.addInfoMecanizadoPrimera(
    //         projectId,
    //         otQuantity,
    //         ociNumberK,
    //         arrayOtNumberK,
    //         arrayDetalleNumberK,
    //         detallesQuantity,
    //         totalDetallesQuantity,
    //         arrayInfoAddedToDetail)
    // }

    // add Info Machinned 2° to Detail - Project
    // async addInfoMecanizadoSegunda(projectId, otQuantity, ociNumberK, arrayOtNumberK, arrayDetalleNumberK, detallesQuantity, totalDetallesQuantity, arrayInfoAddedToDetail) {
    //     return this.ajustes.addInfoMecanizadoSegunda(
    //         projectId,
    //         otQuantity,
    //         ociNumberK,
    //         arrayOtNumberK,
    //         arrayDetalleNumberK,
    //         detallesQuantity,
    //         totalDetallesQuantity,
    //         arrayInfoAddedToDetail)
    // }


    // Select OCI - Project
    async selectOciByOciNumber(numberOci) {
        return this.proyectos.selectOciByOciNumber(numberOci)
    }
    
}

module.exports = AjustesService
