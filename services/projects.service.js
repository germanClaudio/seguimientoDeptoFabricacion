const ProyectosDaoFactory = require('../daos/proyectos/ProyectosDaoFactory.js')
const proyectosDao = ProyectosDaoFactory.getDao()

class ProjectService {
    constructor() {
        this.proyectos = proyectosDao
    }

    // returns all projects
    async getAllProjects() {
        return this.proyectos.getAllProjects()
    }

    // returns all projects from one Client
    async getProjectsByClientId(data) {
        return this.proyectos.getProjectsByClientId(data)
    }

    // returns one project from a ProjectId
    async selectProjectByProjectId(idProject) {
        return this.proyectos.selectProjectByProjectId(idProject)
    }

    // returns all projects from a Main ProjectId
    async selectProjectsByMainProjectId(idProject) {
        return this.proyectos.selectProjectsByMainProjectId(idProject)
    }

     // returns a project from a Name Project
     async getExistingProject(project) {
        return this.proyectos.getExistingProject(project)
    }

    // returns all OCI from projects
    async getAllOciProjects() {
        return this.proyectos.getAllOciProjects()
    }

    // returns all OCI Numbers from one project
    async getAllOciNumbers() {
        return this.proyectos.getAllOciNumbers()
    }

    // add new project to a Client
    async addProjectToClient(payload) {
        return this.proyectos.createNewProject(payload)
    }
    
    // add new Ot to OCI - Project
    async addOtToOciProject(projectId, numberOci, ociNumberK, otAddedToOci) {
        return this.proyectos.addOtToOciProject(
            projectId,
            numberOci,
            ociNumberK, 
            otAddedToOci
        )
    }

    // add Info R14 to Ot - Project
    async addInfoR14ToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoR14ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info Proceso 3D to Ot - Project
    async addInfoProceso3dToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoProceso3dToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

     // add Info Avance Diseno Priemra Parte to Ot - Project
     async addInfoDisenoPrimeraToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoDisenoPrimeraToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info Avance Diseno Segunda Parte to Ot - Project
     async addInfoDisenoSegundaToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoDisenoSegundaToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

     // add Info 80% to Ot - Project
     async addInfo80ToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfo80ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info 100% to Ot - Project
    async addInfo100ToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfo100ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info Simulacion 0 to Ot - Project
    async addInfoSim0ToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoSim0ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info Simulacion 1 to Ot - Project
    async addInfoSim1ToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoSim1ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info Simulacion 2_3 to Ot - Project
    async addInfoSim2_3ToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoSim2_3ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info Simulacion 4 Priemra to Ot - Project
    async addInfoSim4PrimeraToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoSim4PrimeraToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info Simulacion 4 Segunda to Ot - Project
    async addInfoSim4SegundaToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoSim4SegundaToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }

    // add Info Simulacion 5 to Ot - Project
    async addInfoSim5ToOtProject(projectId, otQuantity, ociNumberK, infoAddedToOt) {
        return this.proyectos.addInfoSim5ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            infoAddedToOt)
    }


    
    // Select OCI - Project
    async selectOciByOciNumber(numberOci, ociKNumber) {
        return this.proyectos.selectOciByOciNumber(numberOci, ociKNumber)
    }

    // Select OT - Project
    async selectOtByOtNumber(numberOt, otKNumber, ociKNumber) {
        return this.proyectos.selectOtByOtNumber(numberOt, otKNumber, ociKNumber)
    }

    // Update Status Project by id
    async updateStatusProject(id, project, statusProject, userInfo) {
        return this.proyectos.updateStatusProject(
            id,
            project,
            statusProject,
            userInfo)
    }

    // Update Level Project by id
    async updateLevelProject(id, project, levelProject, userInfo) {
        return this.proyectos.updateLevelProject(
            id,
            project,
            levelProject,
            userInfo)
    }

    // Update Status OCI by id Project
    async updateStatusOci(id, project, statusOci, ociKNumber, userInfo) {
        return this.proyectos.updateStatusOci(
            id,
            project,
            statusOci,
            ociKNumber,
            userInfo)
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

    // add New Oci To Project
    async addNewOciToProject(id, project, ociKNumber, userInfo) {
        return this.proyectos.addNewOciToProject(
            id,
            project,
            ociKNumber,
            userInfo
        )
    }

    // Update Project by id
    async updateProject(
            id,
            project,
            statusProject,
            projectName,
            projectDescription,
            prioProject,
            levelProject,
            codeProject,
            imageProject,
            userInfo
    ) {
        return this.proyectos.updateProject(
            id,
            project,
            statusProject,
            projectName,
            projectDescription,
            prioProject,
            levelProject,
            codeProject,
            imageProject,
            userInfo
        )
    }

    // Update Oci by Project id
    async updateOci(
            id,
            proyecto,
            statusOci,
            ociDescription,
            ociNumber,
            ociKNumber,
            ociImage,
            userInfo) {

        return this.proyectos.updateOci(
            id,
            proyecto,
            statusOci,
            ociDescription,
            ociNumber,
            ociKNumber,
            ociImage,
            userInfo)
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

    // remove one OCI from project by Id
    async deleteOci(id, project, ociKNumber, user) {
        return this.proyectos.deleteOci(id, project, ociKNumber, user)
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

    // remove one project by Id
    async deleteProjectById(id, project, user) {
        return this.proyectos.deleteProjectById(id, project, user)
    }
}

module.exports = ProjectService
