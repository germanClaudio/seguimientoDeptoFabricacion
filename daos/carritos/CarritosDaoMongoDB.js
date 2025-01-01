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
				let carts = await Carritos.find()

				return arrProducts, carts

			} catch (error) {
				console.error("Error MongoDB getConsumibles: ", error)
				return new Error('No hay consumibles en la DB!')
			}
		}
	}

	async reduceStockProduct(data) {
		try {
			let arrStockProduct = []
			if (data) {
				for (let i = 0; i < data.items.length; i++) {
					let productos = await Consumibles.findById(data.items[i].consumibleId),
						quantity = data.items[i].quantity,
						updatedStock = productos.stock - quantity;

				if (productos) {
					const newValues = {
					name: productos.name,
					description: productos.description,
					price: productos.price,
					code: productos.code,
					picture: productos.picture,
					stock: updatedStock,
					timestamp: now,
					category: productos.category,
					};

					const productUpdated = await Consumibles.findOneAndUpdate(
					{ _id: data.items[i].productId },
					newValues,
					{ new: true }
					);

					arrStockProduct.push(productUpdated)
				}
				}
				return arrStockProduct;
			}

		} catch (error) {
			console.error("Error MongoDB getConsumibles: ", error)
			return new Error("Error MongoDB reduceStockProduct: ", error)
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
		console.log('infoId: ', infoId)
		console.log('productId: ', productId)
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
		const productDeleted = await Carritos.findByIdAndUpdate(id);
		return productDeleted;

		} catch (error) {
		return new Error("Error MongoDB deleteProduct: ", error);
		}
	}

	async genOrderCart(cart, invoice) {
		const cartId = cart._id.valueOf();
		if (cart) {
		try {
			// -------------- Cart validation ----------------
			const cartMongoDB = await Carritos.findOne({ _id: `${cartId}` });

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

	async getAllOrders() {
		try {
		const orders = await Ordenes.find();
		return orders;

		} catch (error) {
		return new Error("No hay ordenes en la DB!", error);
		}
	}

	async disconnet() {
		await this.disconnection;
	}
}

module.exports = CarritosDaoMongoDB;
