const ContainerMongoDB = require('../../contenedores/containerMongoDB.js'),
    mongoose = require('mongoose'),
    Ordenes = require("../../models/ordenes.models.js"),
    Users = require("../../models/usuarios.models.js"),
    advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 },
    formatDate = require('../../utils/formatDate.js')

const { switchFilterOrdenesByUser,
        switchFilterOrdenes,
        switchFilterItemsConsumidos } = require('../../utils/switchFilterOrdenes.js')

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

    async getOrderById(id) {
        if(id){
            try {
                const orderMongoDB = await Ordenes.findById({_id: id })
                if(orderMongoDB) {
                    return orderMongoDB

                } else {
                    return new Error (`La Orden de solicitud no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deleteOrder: ",error)
            }

        } else {
            return new Error (`La Orden no existe con ese Id${id}!`)
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

    async getAllItemsOrdered(usuario) {
        let legajoUserId = usuario.legajoId
        
        if(legajoUserId) {
            try {
                const ordersByUser = await Ordenes.aggregate([
                    {
                        $match: {
                            visible: true,
                            active: false
                        }
                    },
                    {
                        $unwind: "$items" // Descompone el array de items en documentos individuales
                    },
                    {
                        $project: {
                            legajoIdUser: { $arrayElemAt: ["$shipping.legajoIdUser", 0] }, // Obtiene el legajoIdUser del primer elemento del array shipping
                            name: { $arrayElemAt: ["$shipping.name", 0] },
                            lastName: { $arrayElemAt: ["$shipping.lastName", 0] },
                            consumibleId: "$items.consumibleId",
                            designation: "$items.designation",
                            type: "$items.type",
                            quantity: "$items.quantity"
                        }
                    },
                    {
                        $group: {
                            _id: "$legajoIdUser", // Agrupa por legajoIdUser
                            userData: {
                                $push: {
                                    name: "$name",
                                    lastName: "$lastName"
                                }
                            },
                            items: {
                                $push: {
                                    consumibleId: "$consumibleId",
                                    designation: "$designation",
                                    type: "$type",
                                    quantity: "$quantity"
                                }
                            }
                        }
                    },
                    {
                        $sort: { "_id": 1 } // Ordena por legajoIdUser ascendente
                    }
                ]);
                // console.log('ordersByUser-Dao: ', ordersByUser)

                return ordersByUser;

            } catch (error) {
                console.log("Error MongoDB getAllItemsOrdered: ", error);
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
                                modifiedOn: new Date()
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

    async updateOrderStatusMulti(arrId, arrStatus, userModificator) {
        // Validar que los arrays tengan el mismo length
        if (arrId.length !== arrStatus.length) {
            throw new Error('Los arrays de entrada deben tener la misma longitud');
        }
    
        // Mapeo de estados a valores active/prepared
        const statusMapping = {
            'noentregado': { active: true, prepared: false },
            'preparado': { active: true, prepared: true },
            'entregado': { active: false, prepared: true }
        };
    
        const results = {
            updated: [],
            skipped: [],
            errors: []
        };
    
        for (let i = 0; i < arrId.length; i++) {
            const currentId = arrId[i];
            const currentStatus = arrStatus[i];
    
            try {
                // Validaciones básicas
                if (!currentId) {
                    results.skipped.push({
                        orderId: currentId,
                        reason: 'ID de orden faltante'
                    });
                    continue;
                }
    
                if (!statusMapping.hasOwnProperty(currentStatus)) {
                    results.errors.push({
                        orderId: currentId,
                        error: `Estado '${currentStatus}' no válido`
                    });
                    continue;
                }
    
                // Buscar la orden en MongoDB
                const order = await Ordenes.findById(currentId);
                if (!order) {
                    results.errors.push({
                        orderId: currentId,
                        error: `Orden no encontrada con ID: ${currentId}`
                    });
                    continue;
                }
    
                // Obtener los nuevos valores según el estado
                const { active: newActive, prepared: newPrepared } = statusMapping[currentStatus];
    
                // Verificar si los valores actuales son diferentes a los nuevos
                const needsUpdate = order.active !== newActive || order.prepared !== newPrepared;
    
                if (!needsUpdate) {
                    results.skipped.push({
                        orderId: currentId,
                        reason: 'Los valores ya están actualizados',
                        currentValues: {
                            active: order.active,
                            prepared: order.prepared
                        }
                    });
                    continue;
                }
    
                // Actualizar solo si hay cambios necesarios
                const updateResult = await Ordenes.updateOne(
                    { _id: currentId },
                    {
                        $set: {
                            active: newActive,
                            prepared: newPrepared,
                            modificator: userModificator,
                            modifiedOn: new Date()
                        }
                    }
                );
    
                if (updateResult.acknowledged) {
                    const updatedOrder = await Ordenes.findById(currentId);
                    results.updated.push({
                        orderId: currentId,
                        previousValues: {
                            active: order.active,
                            prepared: order.prepared
                        },
                        newValues: {
                            active: newActive,
                            prepared: newPrepared
                        },
                        data: updatedOrder
                    });

                } else {
                    throw new Error(`Falló la actualización de la orden ${currentId}`);
                }

            } catch (error) {
                results.errors.push({
                    orderId: currentId,
                    error: error.message
                });
                console.error(`Error procesando orden ${currentId}:`, error);
            }
        }
    
        return {
            success: results.errors.length === 0,
            totalProcessed: arrId.length,
            updatedCount: results.updated.length,
            skippedCount: results.skipped.length,
            errorCount: results.errors.length,
            details: results
        };
    }

    async getOrdenesBySearchingUser(query) {
        // Función para construir la consulta de búsqueda en los campos designation, type y characteristics
        const buildQuery = (queryText) => {
            if (!queryText) return null; // Si no hay texto de búsqueda, retornar null
    
            return {
                items: {
                    $elemMatch: {
                        $or: [
                            { designation: { $regex: queryText, $options: 'i' } }, // Busca en 'designation'
                            { characteristics: { $regex: queryText, $options: 'i' } }, // Busca en 'characteristics'
                            { type: { $regex: queryText, $options: 'i' } } // Busca en 'type'
                        ]
                    }
                }
            };
        };
    
        try {
            const searchQuery = {};
    
            // Construir la consulta de búsqueda si se proporciona queryOrdenes
            if (query.queryOrdenes) {
                const textSearchCondition = buildQuery(query.queryOrdenes);
                if (textSearchCondition) {
                    searchQuery.$and = searchQuery.$and || [];
                    searchQuery.$and.push(textSearchCondition);
                }
            }
    // console.log('1- Query: ', query);
            // Manejar campo statusOrdenes
            switch (query.statusOrdenes) {
                case 'todas':
                    searchQuery.visible = Boolean(true);
                    searchQuery.directiva = 'todas';
                    break;
                case 'activasPreparadas':
                    searchQuery.active = Boolean(true);
                    searchQuery.prepared = Boolean(true);
                    searchQuery.directiva = 'activasPreparadas';
                    break;
                case 'activas':
                    searchQuery.active = Boolean(true);
                    searchQuery.prepared = Boolean(false);
                    searchQuery.directiva = 'activas';
                    break;
                case 'inactivas':
                    searchQuery.active = Boolean(false);
                    searchQuery.prepared = Boolean(false);
                    searchQuery.directiva = 'inactivas';
                    break;
                case 'preparadas':
                    searchQuery.active = Boolean(true);
                    searchQuery.prepared = Boolean(true);
                    searchQuery.directiva = 'preparadas';
                    break;
                default:
                    searchQuery.visible = Boolean(true);
                    searchQuery.directiva = 'todas';
            }
    
            // Función para formatear una fecha a ISO 8601
            const formatoISO = (fecha) => fecha.toISOString();
    
            // Asignar la fecha de inicio
            const fechaInicioDefault = new Date('2025-01-01'); // Fecha por defecto: 1/1/2025
            const fechaInicio = query.fechaInicioOrdenes ? new Date(query.fechaInicioOrdenes) : fechaInicioDefault;
    
            // Asignar la fecha de fin
            const fechaFinDefault = new Date(); // Fecha actual por defecto
            const fechaFin = query.fechaFinOrdenes ? new Date(query.fechaFinOrdenes) : fechaFinDefault;
    
            // Validar que las fechas sean válidas
            if (isNaN(fechaInicio.getTime())) {
                throw new Error('Fecha de inicio no válida');
            }
    
            if (isNaN(fechaFin.getTime())) {
                throw new Error('Fecha de fin no válida');
            }
    
            // Convertir las fechas a formato ISO 8601
            const fechaInicioISO = formatoISO(fechaInicio);
            const fechaFinISO = formatoISO(fechaFin);
    
            // Agregar rango de fechas a la consulta
            searchQuery.timestamp = {
                $gte: fechaInicioISO,
                $lte: fechaFinISO
            };
    
            // Buscar el usuario solicitante
            if (query.solicitadasOrdenes) {
                searchQuery.username = await Users.findOne({ username: query.solicitadasOrdenes });
            }
    
            // console.log('2- searchQuery-Dao pre-result: ', searchQuery);
    
            // Ejecutar consulta
            let resultados = []
            searchQuery.username
            ? resultados = await switchFilterOrdenesByUser(Ordenes, searchQuery)
            : resultados = await switchFilterOrdenes(Ordenes, searchQuery);
            
            // console.log('resultados: ', resultados);
    
            return resultados.length ? resultados : false;

        } catch (error) {
            console.error("Error MongoDB getOrdenesBySearching: ", error);
            return false;
        }
    }

    async getItemsConsumidosBySearchingUser(query) {
        try {
            const searchQuery = {};

            // Función para formatear una fecha a ISO 8601
            const formatoISO = (fecha) => fecha.toISOString();
    
            // Asignar la fecha de inicio
            const fechaInicioDefault = new Date('2025-01-01'); // Fecha por defecto: 1/1/2025
            const fechaInicio = query.fechaInicioOrdenes ? new Date(query.fechaInicioOrdenes) : fechaInicioDefault;
    
            // Asignar la fecha de fin
            const fechaFinDefault = new Date(); // Fecha actual por defecto
            const fechaFin = query.fechaFinOrdenes ? new Date(query.fechaFinOrdenes) : fechaFinDefault;
    
            // Validar que las fechas sean válidas
            if (isNaN(fechaInicio.getTime())) {
                throw new Error('Fecha de inicio no válida');
            }
    
            if (isNaN(fechaFin.getTime())) {
                throw new Error('Fecha de fin no válida');
            }
    
            // Convertir las fechas a formato ISO 8601
            const fechaInicioISO = formatoISO(fechaInicio);
            const fechaFinISO = formatoISO(fechaFin);
    
            // Agregar rango de fechas a la consulta
            searchQuery.timestamp = {
                $gte: fechaInicioISO,
                $lte: fechaFinISO
            };
    
            // Buscar el usuario solicitante
            if (query.solicitadasOrdenes) {
                searchQuery.username = await Users.findOne({ username: query.solicitadasOrdenes });
            }
    
            // console.log('2- searchQuery-Dao pre-result: ', searchQuery);
    
            // Ejecutar consulta
            let resultados = []
            searchQuery.username
            ? resultados = await switchFilterItemsConsumidos(Ordenes, searchQuery)
            : null
            
            // console.log('resultados: ', resultados);
    
            return resultados.length ? resultados : false;

        } catch (error) {
            console.error("Error MongoDB getItemsConsumidosBySearching: ", error);
            return false;
        }
    }


	async disconnet() {
		await this.disconnection;
	}
}

module.exports = OrdenesDaoMongoDB;
