const AjustesDaoFactory = require('../daos/ajustes/AjustesDaoFactory.js')
const ajustesDao = AjustesDaoFactory.getDaoAjustes()

const ProyectosDaoFactory = require('../daos/proyectos/ProyectosDaoFactory.js')
const proyectosDao = ProyectosDaoFactory.getDao()

class AjustesService {
    constructor() {
        this.proyectos = proyectosDao
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

    // Select OCI - Project
    async selectOciByOciNumber(numberOci) {
        return this.proyectos.selectOciByOciNumber(numberOci)
    }

    // add New Dueño Oci To Project
    async addNewDuenoOci(id, ociKNumber, duenoOciInfo) {
        return await this.ajustes.addNewDuenoOci(
            id,
            ociKNumber,
            duenoOciInfo
        )
    }

    // update Dueño Oci To Project
    async updateDuenoOci(id, ociKNumber, duenoOciInfo) {
        return await this.ajustes.updateDuenoOci(
            id,
            ociKNumber,
            duenoOciInfo
        )
    }

    // 0 add Info Armado
    async addInfoOtArmado(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtArmado(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 1 add Info Etapa 1
    async addInfoOtEtapaPrimera(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtEtapaPrimera(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 2 add Info Etapa 2 1° Parte
    async addInfoOtEtapaSegundaPrimera(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtEtapaSegundaPrimera(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 3 add Info Etapa 2 2° Parte
    async addInfoOtEtapaSegundaSegunda(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtEtapaSegundaSegunda(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 4 add Info Analisis Critico
    async addInfoOtAnalisisCritico(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtAnalisisCritico(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 5 add Info Etapa Tercera 1° Parte
    async addInfoOtEtapaTerceraPrimera(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtEtapaTerceraPrimera(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 6 add Info Etapa Tercera 2° Parte
    async addInfoOtEtapaTerceraSegunda(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtEtapaTerceraSegunda(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 7 add Info Ciclo Correccion 1
    async addInfoOtCicloCorreccionPrimera(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtCicloCorreccionPrimera(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 8 add Info Ciclo Correccion 2
    async addInfoOtCicloCorreccionSegunda(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtCicloCorreccionSegunda(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 9 add Info Ciclo Correccion 3
    async addInfoOtCicloCorreccionTercera(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtCicloCorreccionTercera(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 10 add Info Liberacion BuyOff 1° Parte
    async addInfoOtLiberacionBuyOffPrimera(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtLiberacionBuyOffPrimera(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 11 add Info Liberacion BuyOff 2° Parte
    async addInfoOtLiberacionBuyOffSegunda(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtLiberacionBuyOffSegunda(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 12 add Info BuyOff
    async addInfoOtBuyOff(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtBuyOff(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

    // 13 add Info Pendientes Finales
    async addInfoOtPendientesFinales(projectId, otQuantity, ociNumberK, arrayOtNumberK, infoAddedToOt) {
        return this.ajustes.addInfoOtPendientesFinales(
            projectId,
            otQuantity,
            ociNumberK,
            arrayOtNumberK,
            infoAddedToOt)
    }

}

module.exports = AjustesService
