const MaquinasDaoFactory = require('../daos/maquinas/MaquinasDaoFactory.js')
const maquinasDao = MaquinasDaoFactory.getDaoTools()

class ToolService {
    constructor() {
        this.tools = maquinasDao
    }

    // return all tools from DB
    async getAllTools() {
        return await this.tools.getAllTools()
    }
    
    // return one tool by designation
    async getToolByDesignation(designation) {
        return await this.tools.getToolByDesignation(designation)
    }

    // return one tool by id
    async getToolById(id) {
        return await this.tools.getToolById(id)
    }

    // return one tool by designation || code
    async getExistingTool(tool) {
        return await this.tools.getExistingTool(tool)
    }

    // Register new tool
    async addNewTool(newTool) {
        return await this.tools.createNewTool(newTool)
    }
    
    // update one tool by tool Id
    async updateTool(id, updatedTool, userModificator) {
        return await this.tools.updateTool(id, updatedTool, userModificator)
    }

    // delete one tool by Id
    async deleteToolById(id, modificator) {
        return await this.tools.deleteToolById(id, modificator)
    }

    // search All tools
    async searchTools() {
        return await this.tools.searchTools()
    }

    // returns all Tools from serching
    async getToolsBySearching(query) {
        return await this.tools.getToolsBySearching(query)
    }
}

module.exports = ToolService