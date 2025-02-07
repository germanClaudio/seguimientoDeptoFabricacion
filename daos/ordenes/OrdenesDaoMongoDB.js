const ContainerMongoDB = require('../../contenedores/containerMongoDB.js'),
    mongoose = require('mongoose'),
    Ordenes = require("../../models/ordenes.models.js"),
    advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 },
    formatDate = require('../../utils/formatDate.js')

class OrdenesDaoMongoDB extends ContainerMongoDB {
	constructor(cnxStr) {
		super(cnxStr);
	}

	async init() {
		mongoose.connect(this.cnxStr, advancedOptions)
	}

	async getAllOrders() {
		try {
			const orders = await Ordenes.find({ visible: true });
			//console.log('orders Dao: ', orders)
			return orders;

		} catch (error) {
			console.log("Error MongoDB getAllOrders: ", error);
			return new Error("No hay ordenes en la DB!");
		}
	}

	async getActiveOrders() {
		try {
			const activeOrders = await Ordenes.find({ visible: true, active: true });
			return activeOrders;

		} catch (error) {
			console.log("Error MongoDB getActiveOrders: ", error);
			return new Error("No hay ordenes en la DB!");
		}
	}

	async getNonActiveOrders() {
		try {
			const nonActiveOrders = await Ordenes.find({ visible: true, active: false });
			return nonActiveOrders;

		} catch (error) {
			console.log("Error MongoDB getNonActiveOrders: ", error);
			return new Error("No hay ordenes en la DB!");
		}
	}

	async deleteOrdenById(id, userModificator) {
        if(id){
            try {
                const orderMongoDB = await Ordenes.findById({_id: id })
            
                if(orderMongoDB) {
                    let inactive = Boolean(false),
                        orderDeleted = await Ordenes.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                visible: inactive,
                                status: inactive,
                                modificator: userModificator,
                                modifiedOn: formatDate()
                            }
                        },
                        { new: true }
                    )

                    return orderDeleted.acknowledged 
                    ? await Ordenes.findById({ _id: id }) 
                    : new Error(`No se eliminó el item: ${orderMongoDB._id}`);

                } else {
                    return new Error (`La solicitud no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deleteConsumible: ",error)
            }

        } else {
            return new Error (`El Consumible no existe con ese ID${id}!`)
        }    
    }

	async disconnet() {
		await this.disconnection;
	}
}

module.exports = OrdenesDaoMongoDB;
