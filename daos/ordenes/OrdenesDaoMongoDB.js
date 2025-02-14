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
			const orders = await Ordenes.find({ 
                visible: true
            })
            .sort({ modifiedOn: -1 });
			
            return orders;

		} catch (error) {
			console.log("Error MongoDB getAllOrders: ", error);
			return new Error("No hay ordenes en la DB!");
		}
	}

	async getActiveOrders() {
		try {
			const activeOrders = await Ordenes.find({ 
                visible: true,
                active: true 
            })
            .sort({ modifiedOn: -1 });
			
			//-------------- Migration ModifiedOn field Ordenes -----------------
			// const orders = await Ordenes.find();
			// console.log('orders: ', orders)
			// for (const order of orders) {
			// 	// Convertir el campo modifiedOn a Date
			// 	const [day, month, year, hour, minute, second] = order.modifiedOn.split(/[-_]/);
			// 	console.log(day, month, year, hour, minute, second)
			// 	const isoDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
	
			// 	// Actualizar el campo modifiedOn
			// 	order.modifiedOn = isoDate;
			// 	await order.save();
			// }
	
			// console.log('Migración completada con éxito.');
			//return orders;
			//----------- End Migration ModifiedOn field Ordenes ----------------
			
			return activeOrders;

		} catch (error) {
			console.log("Error MongoDB getActiveOrders: ", error);
			return new Error("No hay ordenes en la DB!");
		}
		//-------------- Migration ModifiedOn field Ordenes -----------------
		// finally {
		// 	// Desconectar de la base de datos
		// 	await mongoose.disconnect();
		// }
	//----------- End Migration ModifiedOn field Ordenes ----------------
	}

	async getNonActiveOrders() {
		try {
			const nonActiveOrders = await Ordenes.find({ 
                visible: true,
                active: false 
            })
            .sort({ modifiedOn: -1 });
			
            return nonActiveOrders;

		} catch (error) {
			console.log("Error MongoDB getNonActiveOrders: ", error);
			return new Error("No hay ordenes en la DB!");
		}
	}

    async getAllOrdersByUserId(usuario) {
        let legajoUserId = usuario.legajoId
        if(legajoUserId) {
            try {
                const allOrdersByUserId = await Ordenes.find({ 
                    visible: true,
                    'shipping.legajoIdUser': legajoUserId
                })
                .sort({ modifiedOn: -1 });
    
                return allOrdersByUserId;
    
            } catch (error) {
                console.log("Error MongoDB getAllOrdersByUserId: ", error);
                return new Error("No hay ordenes en la DB!");
            }
        
        } else {
            return new Error (`Usuario no existe con ese legajo Id# ${legajoUserId}!`)
        }
	}

    async getActiveOrdersByUserId(usuario) {
        let legajoUserId = usuario.legajoId
        if(legajoUserId) {
            try {
                const activeOrdersByUserId = await Ordenes.find({ 
                    visible: true,
                    active: true,
                    'shipping.legajoIdUser': legajoUserId
                })
                .sort({ modifiedOn: -1 });
    
                return activeOrdersByUserId;
    
            } catch (error) {
                console.log("Error MongoDB getAllOrdersByUserId: ", error);
                return new Error("No hay ordenes en la DB!");
            }
        
        } else {
            return new Error (`Usuario no existe con ese legajo Id# ${legajoUserId}!`)
        }
	}

    async getNonActiveOrdersByUserId(usuario) {
        let legajoUserId = usuario.legajoId
        if(legajoUserId) {
            try {
                const activeOrdersByUserId = await Ordenes.find({ 
                    visible: true,
                    active: false,
                    'shipping.legajoIdUser': legajoUserId
                })
                .sort({ modifiedOn: -1 });
    
                return activeOrdersByUserId;
    
            } catch (error) {
                console.log("Error MongoDB getAllOrdersByUserId: ", error);
                return new Error("No hay ordenes en la DB!");
            }
        
        } else {
            return new Error (`Usuario no existe con ese legajo Id# ${legajoUserId}!`)
        }
	}

	async deleteOrderById(id, userModificator) {
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
                                modificator: userModificator,
                                modifiedOn: new Date()  //formatDate()
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
                console.error("Error MongoDB deleteOrder: ",error)
            }

        } else {
            return new Error (`La Orden no existe con ese Id${id}!`)
        }    
    }

	async prepareOrderById(id, userModificator) {
        if(id){
            try {
                const orderMongoDB = await Ordenes.findById({_id: id })
                if(orderMongoDB) {
                    let inactive = Boolean(false),
						active = Boolean(true),
                        orderPrepared = await Ordenes.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                prepared: active,
                                modificator: userModificator,
                                modifiedOn: new Date() //formatDate()
                            }
                        },
                        { new: true }
                    )

                    return orderPrepared.acknowledged 
                    ? await Ordenes.findById({ _id: id }) 
                    : new Error(`No se preparó el item: ${orderMongoDB._id}`);

                } else {
                    return new Error (`La solicitud no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB prepare Order: ",error)
            }

        } else {
            return new Error (`La Orden no existe con ese Id${id}!`)
        }    
    }

	async deliverOrderById(id, userModificator) {
        if(id){
            try {
                const orderMongoDB = await Ordenes.findById({_id: id })
            
                if(orderMongoDB) {
                    let inactive = Boolean(false),
						active = Boolean(true),
                        orderDelivered = await Ordenes.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                active: inactive,
								prepared: inactive,
                                modificator: userModificator,
                                modifiedOn: new Date() //formatDate()
                            }
                        },
                        { new: true }
                    )

                    return orderDelivered.acknowledged 
                    ? await Ordenes.findById({ _id: id }) 
                    : new Error(`No se entregó el item: ${orderMongoDB._id}`);

                } else {
                    return new Error (`La solicitud no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deliver Order: ",error)
            }

        } else {
            return new Error (`La Orden no existe con ese Id${id}!`)
        }    
    }

	async disconnet() {
		await this.disconnection;
	}
}

module.exports = OrdenesDaoMongoDB;
