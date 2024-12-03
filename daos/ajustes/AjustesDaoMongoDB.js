const ContenedorMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')

const Proyectos = require('../../models/proyectos.models.js')
const Clientes = require('../../models/clientes.models.js')
const Ajustes = require('../../models/ajustes.models.js')

let formatDate = require('../../utils/formatDate.js');
const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000}

class AjustesDaoMongoDB extends ContenedorMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        mongoose.connect(this.cnxStr, advancedOptions)
    }

    // get all Projects w/ status & visible true and level won form DB ----------------
    async getAllProjectsWon() {
        try {
            const projects = await Proyectos.find(
                {$and: [{'project.0.levelProject' : 'ganado',
                'project.0.visible' : true,
                'project.0.statusProject' : true}] }
            )

            if (projects) {
                return projects

            } else {
                return Error('No hay proyectos cargados en ningún cliente!')
            }

        } catch (error) {
            console.error("Error MongoDB getClients: ", error)
            return new Error('No hay proyectos en la DB!')
        }
    }

    // 1 Add Info Armado to Ot's ----------------
    async addInfoOtArmado(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)
        // console.log('1-otQuantity-Dao:', quantityOt)
        // console.log('2-ociNumberK-Dao: ', ociNumberK)
        // console.log('A-arrayOtNumberK-Dao:', arrayOtNumberK)
        // console.log('B-infoAddedToOt-Dao: ', infoAddedToOt)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                // console.log('itemMongoDB', itemMongoDB.project[0].oci[0])
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        // console.log('0.1-Dao-treeOtInformation----> ',treeOtInformation, ' i=',i)
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoArmado: []
                                }
                            }
                            // console.log('0.3-Dao-estructuraACrear: ', i,' - ', estructuraACrear)
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            // console.log('1-Dao-arrayStructureTree-- ', i,' - ', arrayStructureTree[i])

                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            // console.log('2-Dao-Estructura arbol creada: ', i,' - ', arrayTreeCreation)

                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoArmado`]:
                                {
                                    armadoMaquina: infoAddedToOt[i].armadoMaquina,
                                    revisionArmadoMaquina: infoAddedToOt[i].revisionArmadoMaquina+1,
                                    patronizado: infoAddedToOt[i].patronizado,
                                    revisionPatronizado: infoAddedToOt[i].revisionPatronizado+1,
                                    lthArmado: infoAddedToOt[i].lthArmado,
                                    revisionLthArmado: infoAddedToOt[i].revisionLthArmado+1,
                                    armadoPrensa: infoAddedToOt[i].armadoPrensa,
                                    revisionArmadoPrensa: infoAddedToOt[i].revisionArmadoPrensa+1,
                                    creator: infoAddedToOt[i].creator,
                                    timestamp: formatDate(),
                                    modificator: infoAddedToOt[i].modificator,
                                    modifiedOn: ''
                                }
                            }
                                arrayQuantity.push(updateQuery)

                                // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                if (arrayTreeCreation[i].modifiedCount===1) {
                
                                    await Proyectos.updateOne(
                                        { _id: itemMongoDB._id },
                                        {
                                            $push: arrayQuantity[i]
                                        },
                                        { new: true }
                                    )
                                    countTreeCreation++
                                }
                        
                        } else {
                            // Recupero el creador y la fecha inicial, ya que solo se modifica
                            let pathToOtProject = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt],
                                pathToOtAjuste = pathToOtProject.otAjuste[0],
                                otInfoArmadoLength = parseInt(pathToOtAjuste.otInfoArmado.length) || 0,
                                pathToOtInfoArmado = pathToOtAjuste.otInfoArmado[otInfoArmadoLength-1]

                            let creatorInitial, timestampInitial,
                                armadoMaquinaInitial, revisionArmadoMaquinaInitial,
                                patronizadoInitial, revisionPatronizadoInitial,
                                lthArmadoInitial, revisionLthArmadoInitial,
                                armadoPrensaInitial, revisionArmadoPrensaInitial
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoArmadoLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoArmado[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoArmado[0].timestamp
                                armadoMaquinaInitial = pathToOtInfoArmado.armadoMaquina
                                revisionArmadoMaquinaInitial = parseInt(pathToOtInfoArmado.revisionArmadoMaquina)
                                patronizadoInitial = pathToOtInfoArmado.patronizado
                                revisionPatronizadoInitial = parseInt(pathToOtInfoArmado.revisionPatronizado)
                                lthArmadoInitial = pathToOtInfoArmado.lthArmado
                                revisionLthArmadoInitial = parseInt(pathToOtInfoArmado.revisionLthArmado)
                                armadoPrensaInitial = pathToOtInfoArmado.armadoPrensa
                                revisionArmadoPrensaInitial = parseInt(pathToOtInfoArmado.revisionArmadoPrensa)
                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                armadoMaquinaInitial = 'sinDato', revisionArmadoMaquinaInitial = 0
                                patronizadoInitial = 'sinDato', revisionPatronizadoInitial = 0
                                lthArmadoInitial = 'sinDato', revisionLthArmadoInitial = 0
                                armadoPrensaInitial = 'sinDato', revisionArmadoPrensaInitial = 0
                            }

                            infoAddedToOt[i].armadoMaquina == armadoMaquinaInitial ?                            
                                infoAddedToOt[i].revisionArmadoMaquina = parseInt(revisionArmadoMaquinaInitial)
                            :
                                infoAddedToOt[i].revisionArmadoMaquina = parseInt(revisionArmadoMaquinaInitial+1)

                            infoAddedToOt[i].patronizado == patronizadoInitial ?                                    
                                infoAddedToOt[i].revisionPatronizado = parseInt(revisionPatronizadoInitial)
                            :
                                infoAddedToOt[i].revisionPatronizado = parseInt(revisionPatronizadoInitial+1)

                            infoAddedToOt[i].lthArmado == lthArmadoInitial ?                                    
                                infoAddedToOt[i].revisionLthArmado = parseInt(revisionLthArmadoInitial)
                            :
                                infoAddedToOt[i].revisionLthArmado = parseInt(revisionLthArmadoInitial+1)

                            infoAddedToOt[i].armadoPrensa == armadoPrensaInitial ?                                    
                                infoAddedToOt[i].revisionArmadoPrensa = parseInt(revisionArmadoPrensaInitial)
                            :
                                infoAddedToOt[i].revisionArmadoPrensa = parseInt(revisionArmadoPrensaInitial+1)
                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoArmado`]:
                                {
                                    armadoMaquina: infoAddedToOt[i].armadoMaquina,
                                    revisionArmadoMaquina: infoAddedToOt[i].revisionArmadoMaquina,
                                    patronizado: infoAddedToOt[i].patronizado,
                                    revisionPatronizado: infoAddedToOt[i].revisionPatronizado,
                                    lthArmado: infoAddedToOt[i].lthArmado,
                                    revisionLthArmado: infoAddedToOt[i].revisionLthArmado,
                                    armadoPrensa: infoAddedToOt[i].armadoPrensa,
                                    revisionArmadoPrensa: infoAddedToOt[i].revisionArmadoPrensa,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                //console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)

                                await Proyectos.updateOne(
                                    { _id: itemMongoDB._id },
                                    {
                                        $push: arrayQuantity[i]
                                    },
                                    { new: true }
                                )
                                countInfoAdded++
                        }
                    }

                    // Si el recuento de info agregada o creacion de arbol es mayor a 0
                    if (countInfoAdded > 0 || countTreeCreation > 0 ) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        // console.log('5.1-Dao-proyecto: ', itemUpdated.project[0].oci)
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info R14 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info R14 a la OT del Proyecto!`)
        }
    }

    async disconnet() {
        await this.disconnection
    }

}

module.exports = AjustesDaoMongoDB