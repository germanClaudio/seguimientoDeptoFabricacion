const ContainerMongoDB = require('../../contenedores/containerMongoDB.js'),
	mongoose = require('mongoose')

const Carritos = require("../../models/carritos.models.js"),
	Consumibles = require('../../models/consumibles.models.js'),
	Ordenes = require("../../models/ordenes.models.js"),

	advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 },
	formatDate = require('../../utils/formatDate.js')


	class CarritosDaoMongoDB extends ContainerMongoDB {
	constructor(cnxStr) {
		super(cnxStr);
	}

	async init() {
		mongoose.connect(this.cnxStr, advancedOptions)
	}

	async getAllCarts() {
		try {
			const carts = await Carritos.find()
			if(!carts) {
				return new Error ('No hay carritos en la DB!')
			} else {
				return carts
			}

		} catch (error) {
			console.error("Error MongoDB getAllCarts: ", error)
			return new Error ('No hay carts en la DB!')
		}
	}
	
	async getArrProducts(data) {
		if (data) {
			try {
				let arrProducts = [];
				for (let i = 0; i < data.items.length; i++) {
					let products = await Consumibles.findById(data.items[i].consumibleId)
					arrProducts.push(products)
				}
				// let carts = await Carritos.find()
				// console.log('arrProduct-DaoCarts: ', arrProducts)
				return arrProducts //, carts

			} catch (error) {
				console.error("Error MongoDB getConsumibles: ", error)
				return new Error('No hay consumibles en la DB!')
			}
		}
	}

	async reduceStockProduct(data, arrayTipoStock) {
		let arrStockProduct = [];
		//console.log('1- array: ', arrayTipoStock);

		try {
			if (data) {
				for (let i = 0; i < data.items.length; i++) {
					const consumibleMongoDB = await Consumibles.findById({ _id: data.items[i].consumibleId });

					if (consumibleMongoDB) {
						let quantity = parseInt(data.items[i].quantity),
							tipoTalle = consumibleMongoDB.tipoTalle,
							stockMap = consumibleMongoDB.stock; // Este es un Map de Mongoose

						// console.log('Datos del producto:', {
						// 	tipoTalle: tipoTalle,
						// 	stock: stockMap,
						// 	quantity: quantity,
						// 	selectedOption: arrayTipoStock[i]
						// });

						// Función para reducir el stock según el tipoTalle
						function reduceParticularStock(tipoTalle, stockMap, quantity, selectedOption) {
							let updatedStockMap = new Map(stockMap); // Crear una copia del Map original

							if (tipoTalle === 'unico') {
								// Si el tipo es 'unico', restamos la cantidad del stock general
								if (updatedStockMap.has('0')) {
									updatedStockMap.set('0', updatedStockMap.get('0') - quantity);
								} else {
									console.error(`Stock no definido para tipoTalle "unico".`);
								}
							} else if (tipoTalle === 'talle') {
								// Si el tipo es 'talle', restamos la cantidad del talle seleccionado
								if (updatedStockMap.has(selectedOption)) {
									updatedStockMap.set(selectedOption, updatedStockMap.get(selectedOption) - quantity);
								} else {
									console.error(`Talle "${selectedOption}" no encontrado en el stock.`);
								}
							} else if (tipoTalle === 'numero') {
								// Si el tipo es 'numero', restamos la cantidad del número seleccionado
								if (updatedStockMap.has(selectedOption.toString())) { // Asegurarse de que la clave sea un string
									updatedStockMap.set(selectedOption.toString(), updatedStockMap.get(selectedOption.toString()) - quantity);
								} else {
									console.error(`Número "${selectedOption}" no encontrado en el stock.`);
								}
							}
							return updatedStockMap;
						}

						// Reducir el stock según el tipoTalle
						const updatedStockMap = reduceParticularStock(
							tipoTalle,
							stockMap,
							quantity,
							arrayTipoStock[i]
						);
						//console.log('2- updatedStockMap: ', updatedStockMap);

						// Actualizar el stock en la base de datos
						const productUpdated = await Consumibles.findOneAndUpdate(
							{ _id: data.items[i].consumibleId },
							{ stock: updatedStockMap, timestamp: new Date() },
							{ new: true }
						);
						arrStockProduct.push(productUpdated);
					}
				}
			}

			// console.log('3- arrStockProduct: ', arrStockProduct);
			return arrStockProduct;

		} catch (error) {
			console.error("Error MongoDB reduceStockProduct: ", error);
			return new Error("Error MongoDB reduceStockProduct: ", error);
		}
	}

	async getCart(id) {
		if (id) {
		try {
			const carts = await Carritos.findOne({ _id: `${id}` })
			return carts

		} catch (error) {
			return new Error("Error MongoDB getCart: ", error)
		}
		}
	}

	async getCartByUserId(id) {
		try {
			const userCart = await Carritos.findOne({ userId: `${id}` })
			if (userCart) {
				return userCart

			} else {
				return null
			}

		} catch (error) {
		return new Error("Error MongoDB getCartByUserId: ", error)
		}
	}

	async addItemToCart(payload) {
		const infoId = payload.items[0],
		productId = infoId.consumibleId;
		// console.log('infoId: ', infoId)
		// console.log('productId: ', productId)
		try {
		// -------------- Product validation ----------------
		const itemMongoDB = await Consumibles.findOne({ _id: `${productId}` })

		if (itemMongoDB) {
			const newItem = await Carritos.create(payload)
			return newItem

		} else {
			return null
		}

		} catch (error) {
		return new Error(`El Consumible no existe con ese Id: ${productId}!`)
		}
	}

	async removeItemFromCart(payload) {
		const infoId = payload.items[0]
		const productId = infoId.productId

		try {
		// -------------- Product validation ----------------
		const itemMongoDB = await Consumibles.findOne({ _id: `${productId}` })

		if (itemMongoDB) {
			const itemToRemove = await Carritos.findByIdAndDelete({
			_id: `${productId}`,
			});
			return itemToRemove;

		} else {
			return new Error(
			"No se puede eliminar el Producto del Cart o el Producto no existe!"
			);
		}

		} catch (error) {
		return new Error("Error MongoDB adding Product to cart: ", error)
		}
	}

	async emptyCart(id) {
		try {
			const itemMongoDB = await Carritos.findById({_id: `${id}`})
			if (itemMongoDB) {
				await Carritos.updateOne(
					{ _id: itemMongoDB._id },
					{
						items: [],
						modifiedOn: formatDate()
					},
					{ new: true }
				)
				let cartToBeEmptied = await Carritos.findById({_id: id})
				return cartToBeEmptied;

			} else {
				return new Error(`No se encontró el Carrito id# ${id}`)
			}

		} catch (error) {
			return new Error("Error MongoDB Vaciando el Carrito: ", error);
		}
	}

	async updateCart(id, consumiblesId, itemsQty) {
		try {
			const cart = await Carritos.findById({ _id: id });
			if (!cart) {
				throw new Error(`No se encontró el Carrito con id#:${id}`);
			}
	
			const currentItems = cart.items;
			// Caso 1: Si la cantidad de ítems en la BBDD es igual al largo del array "consumiblesId"
			if (currentItems.length === consumiblesId.length) {
				for (let i = 0; i < consumiblesId.length; i++) {
					const itemIndex = currentItems.findIndex(
						item => item.consumibleId.toString() === consumiblesId[i]
					);
					itemIndex !== -1 ? currentItems[itemIndex].quantity = itemsQty[i] : null
				}
			
			// Caso 2: Si hay más ítems en la BBDD que en "consumiblesId"
			} else if (currentItems.length > consumiblesId.length) {
				// Filtra los ítems que no están en "consumiblesId"
				const itemsToKeep = currentItems.filter(item =>
					consumiblesId.includes(item.consumibleId.toString())
				);
	
				// Actualiza las cantidades de los ítems que se mantienen
				for (let i = 0; i < itemsToKeep.length; i++) {
					const itemIndex = consumiblesId.indexOf(itemsToKeep[i].consumibleId.toString());
					itemIndex !== -1 ? itemsToKeep[i].quantity = itemsQty[itemIndex] : null
				}
				cart.items = itemsToKeep; // Asigna los ítems filtrados al carrito
			}
			cart.modifiedOn = formatDate();
			await cart.save();
			return await Carritos.findById({ _id: id });

		} catch (error) {
			throw new Error(`Error MongoDB Actualizando el Carrito: ${error.message}`);
		}
	}
	
	async genOrderCart(cart, invoice) {
		const cartId = cart._id.valueOf();
		if (cart) {
			try {
				// -------------- Cart validation ----------------
				const cartMongoDB = await Carritos.findById({ _id: cartId });

				if (cartMongoDB) {
					const newOrder = await Ordenes.create(invoice);
					return newOrder;

				} else {
				return new Error("No se puede crear la OC o el Carrito no existe!");
				}

			} catch (error) {
				return new Error("Error MongoDB generating OC of cart: ", error);
			}

		} else {
		return new Error(`No se pudo crear la Orden de Compra!`);
		}
	}

	async disconnet() {
		await this.disconnection;
	}
}

module.exports = CarritosDaoMongoDB;
