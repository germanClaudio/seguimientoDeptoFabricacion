const HerramientasDaoFactory = require('../daos/herramientas/HerramientasDaoFactory.js')
const herramientasDao = HerramientasDaoFactory.getDaoCuttingTools()

class CuttingToolService {
    constructor() {
        this.cuttingTool = herramientasDao
    }

    // return all cuttingTool from DB
    async getAllCuttingTools() {
        return await this.cuttingTool.getAllCuttingTools()
    }
    
    // return one cuttingTool by designation
    async getCuttingToolByDesignation(designation) {
        return await this.cuttingTool.getCuttingToolByDesignation(designation)
    }

    // return one cuttingTool by id
    async getCuttingToolById(id) {
        return await this.cuttingTool.getCuttingToolById(id)
    }

    // return one cuttingTool by designation || code
    async getExistingCuttingTool(cuttingTool) {
        return await this.cuttingTool.getExistingCuttingTool(cuttingTool)
    }

    // Register new cuttingTool
    async addNewCuttingTool(newCuttingTool) {
        return await this.cuttingTool.createNewCuttingTool(newCuttingTool)
    }
    
    // update one cuttingTool by cuttingTool Id
    async updateCuttingTool(id, updatedCuttingTool, userModificator) {
        return await this.cuttingTool.updateCuttingTool(id, updatedCuttingTool, userModificator)
    }

    // delete one cuttingTool by Id
    async deleteCuttingToolById(id, modificator) {
        return await this.cuttingTool.deleteCuttingToolById(id, modificator)
    }

    // search All cuttingTool
    async searchCuttingTools() {
        return await this.cuttingTool.searchCuttingTools()
    }

    // returns all CuttingTools from serching
    async getCuttingToolsBySearching(query) {
        return await this.cuttingTool.getCuttingToolsBySearching(query)
    }
}

module.exports = CuttingToolService