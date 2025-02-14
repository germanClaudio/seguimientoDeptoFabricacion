const mongoose = require('mongoose'),
    Ordenes = require("../../models/ordenes.models.js"),
    advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

async function migrateModifiedOn() {

    try {
        // Conectar a la base de datos
        await mongoose.connect('mongodb://localhost:27017/tudatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, advancedOptions);

        // Obtener todas las órdenes
        const orders = await Ordenes.find({});

        for (const order of orders) {
            // Convertir el campo modifiedOn a Date
            const [day, month, year, hour, minute, second] = order.modifiedOn.split(/[-_]/);
            const isoDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);

            // Actualizar el campo modifiedOn
            order.modifiedOn = isoDate;
            await order.save();
        }

        console.log('Migración completada con éxito.');
    } catch (error) {
        console.error('Error durante la migración:', error);
    } finally {
        // Desconectar de la base de datos
        await mongoose.disconnect();
    }
}

migrateModifiedOn();