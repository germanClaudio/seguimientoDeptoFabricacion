const ProgramacionDaoFactory = require('../daos/programacion/ProgramasDaoFactory.js')
const programasDao = ProgramacionDaoFactory.getDaoProgramms()

class ProgramasService {
    constructor() {
        // this.proyectos = proyectosDao
        this.programas = programasDao
    }

    // returns all projects
    async getAllProjectsWon() {
        return this.programas.getAllProjectsWon()
    }

    // returns all projects from one Client
    async getProjectsByClientId(data) {
        return this.proyectos.getProjectsByClientId(data)
    }

    // returns one project from a ProjectId
    async selectProjectByProjectId(idProject) {
        return this.programas.selectProjectByProjectId(idProject)
    }

    // returns all projects from a Main ProjectId
    async selectProjectsByMainProjectId(idProject) {
        return this.proyectos.selectProjectsByMainProjectId(idProject)
    }

    // returns all OCI from projects
    async getAllOciProjects() {
        return this.proyectos.getAllOciProjects()
    }
    
    // add new Ot to OCI - Project
    async addOtToOciProject(projectId, ociNumberK, otQuantity, otNumberK, arrayDetalleAddedToOt) {
        return this.programas.addOtToOciProject(
            projectId,
            ociNumberK,
            otQuantity,
            otNumberK,
            arrayDetalleAddedToOt
        )
    }

    // add Info Distribution to Detail - Project
    async addInfoOtDistribucion(projectId, otQuantity, ociNumberK, arrayOtNumberK, detallesQuantity, arrayInfoAddedToDetail) {
        return this.programas.addInfoOtDistribucion(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            detallesQuantity,
            arrayInfoAddedToDetail)
    }

    // add Info Programation 1° to Detail - Project
    

    // add Info Programation 2° to Detail - Project
    

    // add Info Machinned 1° to Detail - Project
    

    // add Info Machinned 2° to Detail - Project
    


    // Select OCI - Project
    async selectOciByOciNumber(numberOci) {
        return this.proyectos.selectOciByOciNumber(numberOci)
    }

    // Update Status OT by Ot Number
    async updateStatusOt(id, project, statusOt, ociKNumber, otKNumber, userInfo) {
        return this.proyectos.updateStatusOt(
            id,
            project,
            statusOt,
            ociKNumber,
            otKNumber,
            userInfo)
    }

    // add New Detail To OT 
    async addDetailToOtProject(projectId, ociNumberK, otQuantity, otNumberK, arrayDetalleAddedToOt) {
        return this.programas.addDetailToOtProject(
            projectId,
            ociNumberK,
            otQuantity,
            otNumberK,
            arrayDetalleAddedToOt
        )
    }

    // add New Details To OT from Excel File
    async addDetailsToOtProjectFromFile(projectId, ociNumberK, detailQuantity, otNumberK, arrayDetalleAddedToOt) {
        return this.programas.addDetailsToOtProjectFromFile(
            projectId,
            ociNumberK,
            detailQuantity,
            otNumberK,
            arrayDetalleAddedToOt
        )
    }

    // Update Detail by Project id
    async updateOtDetail(
        id,
        ociKNumber,
        otKNumber,
        detalleKNumber,
        statusDetalle,
        detalleOt,
        descripcionDetalle,
        userModificator,
        idDetalle
    ) {
        return this.programas.updateOtDetail(
            id,
            ociKNumber,
            otKNumber,
            detalleKNumber,
            statusDetalle,
            detalleOt,
            descripcionDetalle,
            userModificator,
            idDetalle)
        }

    // Update Status Detail by Project id
    async updateStatusOtDetail(
        id,
        ociKNumber,
        otKNumber,
        detalleKNumber,
        statusDetalle,
        userModificator,
        idDetalle
    ) {
        return this.programas.updateStatusOtDetail(
            id,
            ociKNumber,
            otKNumber,
            detalleKNumber,
            statusDetalle,
            userModificator,
            idDetalle)
        }

    // Delete Detail by Project id
    async deleteOtDetail(
        id,
        ociKNumber,
        otKNumber,
        detalleKNumber,
        userModificator,
        idDetalle
    ) {
        return this.programas.deleteOtDetail(
            id,
            ociKNumber,
            otKNumber,
            detalleKNumber,
            userModificator,
            idDetalle)
        }

    // Update Ot by Project id
    async updateOt(
        id,
        proyecto,
        ociKNumber,
        otNumber,
        otKNumber,
        opNumber,
        statusOt,
        otDescription,
        otDesign,
        otSimulation,
        otSupplier,
        userInfo
    ) {
        return this.proyectos.updateOt(
            id,
            proyecto,
            ociKNumber,
            otNumber,
            otKNumber,
            opNumber,
            statusOt,
            otDescription,
            otDesign,
            otSimulation,
            otSupplier,
            userInfo)
        }

    // remove one OT from OCI by Id
    async deleteOt(
        id, 
        project, 
        ociKNumber, 
        otKNumber, 
        userInfo
    ) {
        return this.proyectos.deleteOt(
            id, 
            project, 
            ociKNumber, 
            otKNumber, 
            userInfo)
        }
}

module.exports = ProgramasService
