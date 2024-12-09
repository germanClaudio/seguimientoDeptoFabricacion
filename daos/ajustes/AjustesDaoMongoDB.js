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

    // Add new Dueño Oci to Project
    async addNewDuenoOci(idProjectTarget, ociKNumber, arrayOciAddedToProject) {
        let numberKOci = parseInt(ociKNumber)
        if (idProjectTarget && arrayOciAddedToProject) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                if (itemMongoDB) {
                    
                    // Se agregan las estructuras al arbol de MongoDB ---
                    let ociAddedToProyecto = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${numberKOci}.ociOwner.0`] : arrayOciAddedToProject[0].ociOwner,
                                [`project.0.oci.${numberKOci}.modificator.0`] : arrayOciAddedToProject[0].modificator,
                                [`project.0.oci.${numberKOci}.modifiedOn`] : formatDate()
                            }
                        },
                        { new: true }
                    )
                    // console.info('Dueno Oci agregada a Proyecto ', ociAddedToProyecto)

                    // Si se agrega correctamente las OCI => true ---
                    if (ociAddedToProyecto.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó el dueño: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró la proyect`)
                }

            } catch (error) {
                console.error("Error MongoDB adding Dueño OCI to a Project: ", error)
            }

        } else {
            return new Error(`No se pudo agregar dueño a la OCI del Proyecto!`)
        }
    }

    // Update Dueño Oci to Project
    async updateDuenoOci(idProjectTarget, ociKNumber, arrayOciAddedToProject) {
        console.log('arrayOciAddedToProject[0].modificator: ', arrayOciAddedToProject[0].modificator)
        let numberKOci = parseInt(ociKNumber)
        if (idProjectTarget && arrayOciAddedToProject) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                if (itemMongoDB) {
                    
                    // Se agregan las estructuras al arbol de MongoDB ---
                    let ociAddedToProyecto = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${numberKOci}.ociOwner.0`] : arrayOciAddedToProject[0].ociOwner,
                                [`project.0.oci.${numberKOci}.modificator.0`] : arrayOciAddedToProject[0].modificator,
                                [`project.0.oci.${numberKOci}.modifiedOn`] : formatDate()
                            }
                        },
                        { new: true }
                    )
                    // console.info('Dueno Oci agregada a Proyecto ', ociAddedToProyecto)
                    
                    // Si se agrega correctamente las OCI => true ---
                    if (ociAddedToProyecto.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó el dueño: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró la proyect`)
                }

            } catch (error) {
                console.error("Error MongoDB adding Dueño OCI to a Project: ", error)
            }

        } else {
            return new Error(`No se pudo agregar dueño a la OCI del Proyecto!`)
        }
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

    // 0 Add Info Armado to Ot's ----------------
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
                console.error("Error MongoDB adding info Armado to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Armado a la OT del Proyecto!`)
        }
    }

    // 1 Add Info Etapa 1 to Ot's ----------------
    async addInfoOtEtapaPrimera(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)

                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoEtapaPrimera: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaPrimera`]:
                                {
                                    guiados: infoAddedToOt[i].guiados,
                                    revisionGuiados: infoAddedToOt[i].revisionGuiados+1,
                                    centradoLuzCorte: infoAddedToOt[i].centradoLuzCorte,
                                    revisionCentradoLuzCorte: infoAddedToOt[i].revisionCentradoLuzCorte+1,
                                    centradoLevas: infoAddedToOt[i].centradoLevas,
                                    revisionCentradoLevas: infoAddedToOt[i].revisionCentradoLevas+1,
                                    lthEtapaPrimera: infoAddedToOt[i].lthEtapaPrimera,
                                    revisionLthEtapaPrimera: infoAddedToOt[i].revisionLthEtapaPrimera+1,
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
                                otInfoEtapaPrimeraLength = parseInt(pathToOtAjuste.otInfoEtapaPrimera.length) || 0,
                                pathToOtInfoArmado = pathToOtAjuste.otInfoEtapaPrimera[otInfoEtapaPrimeraLength-1]

                            let creatorInitial, timestampInitial,
                                guiadosInitial, revisionGuiadosInitial,
                                centradoLuzCorteInitial, revisionCentradoLuzCorteInitial,
                                centradoLevasInitial, revisionCentradoLevasInitial,
                                lthEtapaPrimeraInitial, revisionLthEtapaPrimeraInitial
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoEtapaPrimeraLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoEtapaPrimera[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoEtapaPrimera[0].timestamp
                                guiadosInitial = pathToOtInfoArmado.guiados
                                revisionGuiadosInitial = parseInt(pathToOtInfoArmado.revisionGuiados)
                                centradoLuzCorteInitial = pathToOtInfoArmado.centradoLuzCorte
                                revisionCentradoLuzCorteInitial = parseInt(pathToOtInfoArmado.revisionCentradoLuzCorte)
                                centradoLevasInitial = pathToOtInfoArmado.centradoLevas
                                revisionCentradoLevasInitial = parseInt(pathToOtInfoArmado.revisionCentradoLevas)
                                lthEtapaPrimeraInitial = pathToOtInfoArmado.lthEtapaPrimera
                                revisionLthEtapaPrimeraInitial = parseInt(pathToOtInfoArmado.revisionLthEtapaPrimera)
                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                guiadosInitial = 'sinDato', revisionGuiadosInitial = 0
                                centradoLuzCorteInitial = 'sinDato', revisionCentradoLuzCorteInitial = 0
                                centradoLevasInitial = 'sinDato', revisionCentradoLevasInitial = 0
                                lthEtapaPrimeraInitial = 'sinDato', revisionLthEtapaPrimeraInitial = 0
                            }

                            infoAddedToOt[i].guiados == guiadosInitial ?                            
                                infoAddedToOt[i].revisionGuiados = parseInt(revisionGuiadosInitial)
                            :
                                infoAddedToOt[i].revisionGuiados = parseInt(revisionGuiadosInitial+1)

                            infoAddedToOt[i].centradoLuzCorte == centradoLuzCorteInitial ?                                    
                                infoAddedToOt[i].revisionCentradoLuzCorte = parseInt(revisionCentradoLuzCorteInitial)
                            :
                                infoAddedToOt[i].revisionCentradoLuzCorte = parseInt(revisionCentradoLuzCorteInitial+1)

                            infoAddedToOt[i].centradoLevas == centradoLevasInitial ?                                    
                                infoAddedToOt[i].revisionCentradoLevas = parseInt(revisionCentradoLevasInitial)
                            :
                                infoAddedToOt[i].revisionCentradoLevas = parseInt(revisionCentradoLevasInitial+1)

                            infoAddedToOt[i].lthEtapaPrimera == lthEtapaPrimeraInitial ?                                    
                                infoAddedToOt[i].revisionLthEtapaPrimera = parseInt(revisionLthEtapaPrimeraInitial)
                            :
                                infoAddedToOt[i].revisionLthEtapaPrimera = parseInt(revisionLthEtapaPrimeraInitial+1)
                            
                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaPrimera`]:
                                {
                                    guiados: infoAddedToOt[i].guiados,
                                    revisionGuiados: infoAddedToOt[i].revisionGuiados,
                                    centradoLuzCorte: infoAddedToOt[i].centradoLuzCorte,
                                    revisionCentradoLuzCorte: infoAddedToOt[i].revisionCentradoLuzCorte,
                                    centradoLevas: infoAddedToOt[i].centradoLevas,
                                    revisionCentradoLevas: infoAddedToOt[i].revisionCentradoLevas,
                                    lthEtapaPrimera: infoAddedToOt[i].lthEtapaPrimera,
                                    revisionLthEtapaPrimera: infoAddedToOt[i].revisionLthEtapaPrimera,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Etapa 1 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Etapa 1 a la OT del Proyecto!`)
        }
    }

    // 2 Add Info Etapa 2 (1° parte) to Ot's ----------------
    async addInfoOtEtapaSegundaPrimera(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoEtapaSegundaPrimera: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaSegundaPrimera`]:
                                {
                                    azulados: infoAddedToOt[i].azulados,
                                    revisionAzulados: infoAddedToOt[i].revisionAzulados+1,
                                    tachoAjuste: infoAddedToOt[i].tachoAjuste,
                                    revisionTachoAjuste: infoAddedToOt[i].revisionTachoAjuste+1,
                                    ajusteFondo: infoAddedToOt[i].ajusteFondo,
                                    revisionAjusteFondo: infoAddedToOt[i].revisionAjusteFondo+1,
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
                                otInfoEtapaSegundaPrimeraLength = parseInt(pathToOtAjuste.otInfoEtapaSegundaPrimera.length) || 0,
                                pathToEtapaSegundaPrimera = pathToOtAjuste.otInfoEtapaSegundaPrimera[otInfoEtapaSegundaPrimeraLength-1]

                            let creatorInitial, timestampInitial,
                                azuladosInitial, revisionAzuladosInitial,
                                tachoAjusteInitial, revisionTachoAjusteInitial,
                                ajusteFondoInitial, revisionAjusteFondoInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoEtapaSegundaPrimeraLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoEtapaSegundaPrimera[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoEtapaSegundaPrimera[0].timestamp
                                azuladosInitial = pathToEtapaSegundaPrimera.azulados
                                revisionAzuladosInitial = parseInt(pathToEtapaSegundaPrimera.revisionAzulados)
                                tachoAjusteInitial = pathToEtapaSegundaPrimera.tachoAjuste
                                revisionTachoAjusteInitial = parseInt(pathToEtapaSegundaPrimera.revisionTachoAjuste)
                                ajusteFondoInitial = pathToEtapaSegundaPrimera.ajusteFondo
                                revisionAjusteFondoInitial = parseInt(pathToEtapaSegundaPrimera.revisionAjusteFondo)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                azuladosInitial = 'sinDato', revisionAzuladosInitial = 0
                                tachoAjusteInitial = 'sinDato', revisionTachoAjusteInitial = 0
                                ajusteFondoInitial = 'sinDato', revisionAjusteFondoInitial = 0
                            }

                            infoAddedToOt[i].azulados == azuladosInitial ?                            
                                infoAddedToOt[i].revisionAzulados = parseInt(revisionAzuladosInitial)
                            :
                                infoAddedToOt[i].revisionAzulados = parseInt(revisionAzuladosInitial+1)

                            infoAddedToOt[i].tachoAjuste == tachoAjusteInitial ?                                    
                                infoAddedToOt[i].revisionTachoAjuste = parseInt(revisionTachoAjusteInitial)
                            :
                                infoAddedToOt[i].revisionTachoAjuste = parseInt(revisionTachoAjusteInitial+1)

                            infoAddedToOt[i].ajusteFondo == ajusteFondoInitial ?                                    
                                infoAddedToOt[i].revisionAjusteFondo = parseInt(revisionAjusteFondoInitial)
                            :
                                infoAddedToOt[i].revisionAjusteFondo = parseInt(revisionAjusteFondoInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaSegundaPrimera`]:
                                {
                                    azulados: infoAddedToOt[i].azulados,
                                    revisionAzulados: infoAddedToOt[i].revisionAzulados,
                                    tachoAjuste: infoAddedToOt[i].tachoAjuste,
                                    revisionTachoAjuste: infoAddedToOt[i].revisionTachoAjuste,
                                    ajusteFondo: infoAddedToOt[i].ajusteFondo,
                                    revisionAjusteFondo: infoAddedToOt[i].revisionAjusteFondo,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Etapa 2 (1° Parte) to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Etapa 2 (1° Parte) a la OT del Proyecto!`)
        }
    }

    // 3 Add Info Etapa 2 (2° parte) to Ot's ----------------
    async addInfoOtEtapaSegundaSegunda(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoEtapaSegundaSegunda: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaSegundaSegunda`]:
                                {
                                    azuladoAceros: infoAddedToOt[i].azuladoAceros,
                                    revisionAzuladoAceros: infoAddedToOt[i].revisionAzuladoAceros+1,
                                    lthEtapaSegunda: infoAddedToOt[i].lthEtapaSegunda,
                                    revisionLthEtapaSegunda: infoAddedToOt[i].revisionLthEtapaSegunda+1,
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
                                otInfoEtapaSegundaSegundaLength = parseInt(pathToOtAjuste.otInfoEtapaSegundaSegunda.length) || 0,
                                pathToEtapaSegundaSegunda = pathToOtAjuste.otInfoEtapaSegundaSegunda[otInfoEtapaSegundaSegundaLength-1]

                            let creatorInitial, timestampInitial,
                                azuladoAcerosInitial, revisionAzuladoAcerosInitial,
                                lthEtapaSegundaInitial, revisionLthEtapaSegundaInitial                       
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoEtapaSegundaSegundaLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoEtapaSegundaSegunda[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoEtapaSegundaSegunda[0].timestamp
                                azuladoAcerosInitial = pathToEtapaSegundaSegunda.azuladoAceros
                                revisionAzuladoAcerosInitial = parseInt(pathToEtapaSegundaSegunda.revisionAzuladoAceros)
                                lthEtapaSegundaInitial = pathToEtapaSegundaSegunda.lthEtapaSegunda
                                revisionLthEtapaSegundaInitial = parseInt(pathToEtapaSegundaSegunda.revisionLthEtapaSegunda)
                                
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                azuladoAcerosInitial = 'sinDato', revisionAzuladoAcerosInitial = 0
                                lthEtapaSegundaInitial = 'sinDato', revisionLthEtapaSegundaInitial = 0
                            }

                            infoAddedToOt[i].azuladoAceros == azuladoAcerosInitial ?                            
                                infoAddedToOt[i].revisionAzuladoAceros = parseInt(revisionAzuladoAcerosInitial)
                            :
                                infoAddedToOt[i].revisionAzuladoAceros = parseInt(revisionAzuladoAcerosInitial+1)

                            infoAddedToOt[i].lthEtapaSegunda == lthEtapaSegundaInitial ?                                    
                                infoAddedToOt[i].revisionLthEtapaSegunda = parseInt(revisionLthEtapaSegundaInitial)
                            :
                                infoAddedToOt[i].revisionLthEtapaSegunda = parseInt(revisionLthEtapaSegundaInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaSegundaSegunda`]:
                                {
                                    azuladoAceros: infoAddedToOt[i].azuladoAceros,
                                    revisionAzuladoAceros: infoAddedToOt[i].revisionAzuladoAceros,
                                    lthEtapaSegunda: infoAddedToOt[i].lthEtapaSegunda,
                                    revisionLthEtapaSegunda: infoAddedToOt[i].revisionLthEtapaSegunda,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Etapa 2 (2° Parte) to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Etapa 2 (2° Parte) a la OT del Proyecto!`)
        }
    }

    // 4 Add Info Analisis Critico to Ot's ----------------
    async addInfoOtAnalisisCritico(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoAnalisisCritico: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoAnalisisCritico`]:
                                {
                                    estatico: infoAddedToOt[i].estatico,
                                    revisionEstatico: infoAddedToOt[i].revisionEstatico+1,
                                    dinamico: infoAddedToOt[i].dinamico,
                                    revisionDinamico: infoAddedToOt[i].revisionDinamico+1,
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
                                otInfoAnalisisCriticoLength = parseInt(pathToOtAjuste.otInfoAnalisisCritico.length) || 0,
                                pathToAnalisisCritico = pathToOtAjuste.otInfoAnalisisCritico[otInfoAnalisisCriticoLength-1]

                            let creatorInitial, timestampInitial,
                                estaticoInitial, revisionEstaticoInitial,
                                dinamicoInitial, revisionDinamicoInitial                       
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoAnalisisCriticoLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoAnalisisCritico[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoAnalisisCritico[0].timestamp
                                estaticoInitial = pathToAnalisisCritico.estatico
                                revisionEstaticoInitial = parseInt(pathToAnalisisCritico.revisionEstatico)
                                dinamicoInitial = pathToAnalisisCritico.dinamico
                                revisionDinamicoInitial = parseInt(pathToAnalisisCritico.revisionDinamico)
                                
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                estaticoInitial = 'sinDato', revisionEstaticoInitial = 0
                                dinamicoInitial = 'sinDato', revisionDinamicoInitial = 0
                            }

                            infoAddedToOt[i].estatico == estaticoInitial ?                            
                                infoAddedToOt[i].revisionEstatico = parseInt(revisionEstaticoInitial)
                            :
                                infoAddedToOt[i].revisionEstatico = parseInt(revisionEstaticoInitial+1)

                            infoAddedToOt[i].dinamico == dinamicoInitial ?                                    
                                infoAddedToOt[i].revisionDinamico = parseInt(revisionDinamicoInitial)
                            :
                                infoAddedToOt[i].revisionDinamico = parseInt(revisionDinamicoInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoAnalisisCritico`]:
                                {
                                    estatico: infoAddedToOt[i].estatico,
                                    revisionEstatico: infoAddedToOt[i].revisionEstatico,
                                    dinamico: infoAddedToOt[i].dinamico,
                                    revisionDinamico: infoAddedToOt[i].revisionDinamico,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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

    // 5 Add Info Etapa 3 (1° parte) to Ot's ----------------
    async addInfoOtEtapaTerceraPrimera(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoEtapaTerceraPrimera: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaTerceraPrimera`]:
                                {
                                    localizacionFuncional: infoAddedToOt[i].localizacionFuncional,
                                    revisionLocalizacionFuncional: infoAddedToOt[i].revisionLocalizacionFuncional+1,
                                    obtencionPieza: infoAddedToOt[i].obtencionPieza,
                                    revisionObtencionPieza: infoAddedToOt[i].revisionObtencionPieza+1,
                                    azuladoFuncional: infoAddedToOt[i].azuladoFuncional,
                                    revisionAzuladoFuncional: infoAddedToOt[i].revisionAzuladoFuncional+1,
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
                                otInfoEtapaTerceraPrimeraLength = parseInt(pathToOtAjuste.otInfoEtapaTerceraPrimera.length) || 0,
                                pathToEtapaTerceraPrimera = pathToOtAjuste.otInfoEtapaTerceraPrimera[otInfoEtapaTerceraPrimeraLength-1]

                            let creatorInitial, timestampInitial,
                                localizacionFuncionalInitial, revisionLocalizacionFuncionalInitial,
                                obtencionPiezaInitial, revisionObtencionPiezaInitial,
                                azuladoFuncionalInitial, revisionAzuladoFuncionalInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoEtapaTerceraPrimeraLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoEtapaTerceraPrimera[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoEtapaTerceraPrimera[0].timestamp
                                localizacionFuncionalInitial = pathToEtapaTerceraPrimera.localizacionFuncional
                                revisionLocalizacionFuncionalInitial = parseInt(pathToEtapaTerceraPrimera.revisionLocalizacionFuncional)
                                obtencionPiezaInitial = pathToEtapaTerceraPrimera.obtencionPieza
                                revisionObtencionPiezaInitial = parseInt(pathToEtapaTerceraPrimera.revisionObtencionPieza)
                                azuladoFuncionalInitial = pathToEtapaTerceraPrimera.azuladoFuncional
                                revisionAzuladoFuncionalInitial = parseInt(pathToEtapaTerceraPrimera.revisionAzuladoFuncional)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                localizacionFuncionalInitial = 'sinDato', revisionLocalizacionFuncionalInitial = 0
                                obtencionPiezaInitial = 'sinDato', revisionObtencionPiezaInitial = 0
                                azuladoFuncionalInitial = 'sinDato', revisionAzuladoFuncionalInitial = 0
                            }

                            infoAddedToOt[i].localizacionFuncional == localizacionFuncionalInitial ?                            
                                infoAddedToOt[i].revisionLocalizacionFuncional = parseInt(revisionLocalizacionFuncionalInitial)
                            :
                                infoAddedToOt[i].revisionLocalizacionFuncional = parseInt(revisionLocalizacionFuncionalInitial+1)

                            infoAddedToOt[i].obtencionPieza == obtencionPiezaInitial ?                                    
                                infoAddedToOt[i].revisionObtencionPieza = parseInt(revisionObtencionPiezaInitial)
                            :
                                infoAddedToOt[i].revisionObtencionPieza = parseInt(revisionObtencionPiezaInitial+1)

                            infoAddedToOt[i].azuladoFuncional == azuladoFuncionalInitial ?                                    
                                infoAddedToOt[i].revisionAzuladoFuncional = parseInt(revisionAzuladoFuncionalInitial)
                            :
                                infoAddedToOt[i].revisionAzuladoFuncional = parseInt(revisionAzuladoFuncionalInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaTerceraPrimera`]:
                                {
                                    localizacionFuncional: infoAddedToOt[i].localizacionFuncional,
                                    revisionLocalizacionFuncional: infoAddedToOt[i].revisionLocalizacionFuncional,
                                    obtencionPieza: infoAddedToOt[i].obtencionPieza,
                                    revisionObtencionPieza: infoAddedToOt[i].revisionObtencionPieza,
                                    azuladoFuncional: infoAddedToOt[i].azuladoFuncional,
                                    revisionAzuladoFuncional: infoAddedToOt[i].revisionAzuladoFuncional,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Etapa 3 (1° Parte) to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Etapa 3 (1° Parte) a la OT del Proyecto!`)
        }
    }

    // 6 Add Info Etapa 3 (2° parte) to Ot's ----------------
    async addInfoOtEtapaTerceraSegunda(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoEtapaTerceraSegunda: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaTerceraSegunda`]:
                                {
                                    funcionalCompleta: infoAddedToOt[i].funcionalCompleta,
                                    revisionFuncionalCompleta: infoAddedToOt[i].revisionFuncionalCompleta+1,
                                    lthEtapaTercera: infoAddedToOt[i].lthEtapaTercera,
                                    revisionLthEtapaTercera: infoAddedToOt[i].revisionLthEtapaTercera+1,
                                    liberarPiezaMetrologia: infoAddedToOt[i].liberarPiezaMetrologia,
                                    revisionLiberarPiezaMetrologia: infoAddedToOt[i].revisionLiberarPiezaMetrologia+1,
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
                                otInfoEtapaTerceraSegundaLength = parseInt(pathToOtAjuste.otInfoEtapaTerceraSegunda.length) || 0,
                                pathToEtapaTerceraSegunda = pathToOtAjuste.otInfoEtapaTerceraSegunda[otInfoEtapaTerceraSegundaLength-1]

                            let creatorInitial, timestampInitial,
                                funcionalCompletaInitial, revisionFuncionalCompletaInitial,
                                lthEtapaTerceraInitial, revisionLthEtapaTerceraInitial,
                                liberarPiezaMetrologiaInitial, revisionLiberarPiezaMetrologiaInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoEtapaTerceraSegundaLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoEtapaTerceraSegunda[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoEtapaTerceraSegunda[0].timestamp
                                funcionalCompletaInitial = pathToEtapaTerceraSegunda.funcionalCompleta
                                revisionFuncionalCompletaInitial = parseInt(pathToEtapaTerceraSegunda.revisionFuncionalCompleta)
                                lthEtapaTerceraInitial = pathToEtapaTerceraSegunda.lthEtapaTercera
                                revisionLthEtapaTerceraInitial = parseInt(pathToEtapaTerceraSegunda.revisionLthEtapaTercera)
                                liberarPiezaMetrologiaInitial = pathToEtapaTerceraSegunda.liberarPiezaMetrologia
                                revisionLiberarPiezaMetrologiaInitial = parseInt(pathToEtapaTerceraSegunda.revisionLiberarPiezaMetrologia)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                funcionalCompletaInitial = 'sinDato', revisionFuncionalCompletaInitial = 0
                                lthEtapaTerceraInitial = 'sinDato', revisionLthEtapaTerceraInitial = 0
                                liberarPiezaMetrologiaInitial = 'sinDato', revisionLiberarPiezaMetrologiaInitial = 0
                            }

                            infoAddedToOt[i].funcionalCompleta == funcionalCompletaInitial ?                            
                                infoAddedToOt[i].revisionFuncionalCompleta = parseInt(revisionFuncionalCompletaInitial)
                            :
                                infoAddedToOt[i].revisionFuncionalCompleta = parseInt(revisionFuncionalCompletaInitial+1)

                            infoAddedToOt[i].lthEtapaTercera == lthEtapaTerceraInitial ?                                    
                                infoAddedToOt[i].revisionLthEtapaTercera = parseInt(revisionLthEtapaTerceraInitial)
                            :
                                infoAddedToOt[i].revisionLthEtapaTercera = parseInt(revisionLthEtapaTerceraInitial+1)

                            infoAddedToOt[i].liberarPiezaMetrologia == liberarPiezaMetrologiaInitial ?                                    
                                infoAddedToOt[i].revisionLiberarPiezaMetrologia = parseInt(revisionLiberarPiezaMetrologiaInitial)
                            :
                                infoAddedToOt[i].revisionLiberarPiezaMetrologia = parseInt(revisionLiberarPiezaMetrologiaInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoEtapaTerceraSegunda`]:
                                {
                                    funcionalCompleta: infoAddedToOt[i].funcionalCompleta,
                                    revisionFuncionalCompleta: infoAddedToOt[i].revisionFuncionalCompleta,
                                    lthEtapaTercera: infoAddedToOt[i].lthEtapaTercera,
                                    revisionLthEtapaTercera: infoAddedToOt[i].revisionLthEtapaTercera,
                                    liberarPiezaMetrologia: infoAddedToOt[i].liberarPiezaMetrologia,
                                    revisionLiberarPiezaMetrologia: infoAddedToOt[i].revisionLiberarPiezaMetrologia,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Etapa 3 (2° Parte) to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Etapa 3 (2° Parte) a la OT del Proyecto!`)
        }
    }

    // 7 Add Info Ciclo Correccion 1 to Ot's ----------------
    async addInfoOtCicloCorreccionPrimera(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoCicloCorreccionPrimera: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoCicloCorreccionPrimera`]:
                                {
                                    piezaMedidaReunionPrimera: infoAddedToOt[i].piezaMedidaReunionPrimera,
                                    revisionPiezaMedidaReunionPrimera: infoAddedToOt[i].revisionPiezaMedidaReunionPrimera+1,
                                    maquinaPrimera: infoAddedToOt[i].maquinaPrimera,
                                    revisionMaquinaPrimera: infoAddedToOt[i].revisionMaquinaPrimera+1,
                                    ajustePrimera: infoAddedToOt[i].ajustePrimera,
                                    revisionAjustePrimera: infoAddedToOt[i].revisionAjustePrimera+1,
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
                                otInfoCicloCorreccionPrimeraLength = parseInt(pathToOtAjuste.otInfoCicloCorreccionPrimera.length) || 0,
                                pathToCicloCorreccionPrimera = pathToOtAjuste.otInfoCicloCorreccionPrimera[otInfoCicloCorreccionPrimeraLength-1]

                            let creatorInitial, timestampInitial,
                                piezaMedidaReunionPrimeraInitial, revisionPiezaMedidaReunionPrimeraInitial,
                                maquinaPrimeraInitial, revisionMaquinaPrimeraInitial,
                                ajustePrimeraInitial, revisionAjustePrimeraInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoCicloCorreccionPrimeraLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoCicloCorreccionPrimera[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoCicloCorreccionPrimera[0].timestamp
                                piezaMedidaReunionPrimeraInitial = pathToCicloCorreccionPrimera.piezaMedidaReunionPrimera
                                revisionPiezaMedidaReunionPrimeraInitial = parseInt(pathToCicloCorreccionPrimera.revisionPiezaMedidaReunionPrimera)
                                maquinaPrimeraInitial = pathToCicloCorreccionPrimera.maquinaPrimera
                                revisionMaquinaPrimeraInitial = parseInt(pathToCicloCorreccionPrimera.revisionMaquinaPrimera)
                                ajustePrimeraInitial = pathToCicloCorreccionPrimera.ajustePrimera
                                revisionAjustePrimeraInitial = parseInt(pathToCicloCorreccionPrimera.revisionAjustePrimera)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                piezaMedidaReunionPrimeraInitial = 'sinDato', revisionPiezaMedidaReunionPrimeraInitial = 0
                                maquinaPrimeraInitial = 'sinDato', revisionMaquinaPrimeraInitial = 0
                                ajustePrimeraInitial = 'sinDato', revisionAjustePrimeraInitial = 0
                            }

                            infoAddedToOt[i].piezaMedidaReunionPrimera == piezaMedidaReunionPrimeraInitial ?                            
                                infoAddedToOt[i].revisionPiezaMedidaReunionPrimera = parseInt(revisionPiezaMedidaReunionPrimeraInitial)
                            :
                                infoAddedToOt[i].revisionPiezaMedidaReunionPrimera = parseInt(revisionPiezaMedidaReunionPrimeraInitial+1)

                            infoAddedToOt[i].maquinaPrimera == maquinaPrimeraInitial ?                                    
                                infoAddedToOt[i].revisionMaquinaPrimera = parseInt(revisionMaquinaPrimeraInitial)
                            :
                                infoAddedToOt[i].revisionMaquinaPrimera = parseInt(revisionMaquinaPrimeraInitial+1)

                            infoAddedToOt[i].ajustePrimera == ajustePrimeraInitial ?                                    
                                infoAddedToOt[i].revisionAjustePrimera = parseInt(revisionAjustePrimeraInitial)
                            :
                                infoAddedToOt[i].revisionAjustePrimera = parseInt(revisionAjustePrimeraInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoCicloCorreccionPrimera`]:
                                {
                                    piezaMedidaReunionPrimera: infoAddedToOt[i].piezaMedidaReunionPrimera,
                                    revisionPiezaMedidaReunionPrimera: infoAddedToOt[i].revisionPiezaMedidaReunionPrimera,
                                    maquinaPrimera: infoAddedToOt[i].maquinaPrimera,
                                    revisionMaquinaPrimera: infoAddedToOt[i].revisionMaquinaPrimera,
                                    ajustePrimera: infoAddedToOt[i].ajustePrimera,
                                    revisionAjustePrimera: infoAddedToOt[i].revisionAjustePrimera,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Ciclo Correccion 1 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Ciclo Correccion 1 a la OT del Proyecto!`)
        }
    }

    // 8 Add Info Ciclo Correccion 2 to Ot's ----------------
    async addInfoOtCicloCorreccionSegunda(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoCicloCorreccionSegunda: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoCicloCorreccionSegunda`]:
                                {
                                    piezaMedidaReunionSegunda: infoAddedToOt[i].piezaMedidaReunionSegunda,
                                    revisionPiezaMedidaReunionSegunda: infoAddedToOt[i].revisionPiezaMedidaReunionSegunda+1,
                                    maquinaSegunda: infoAddedToOt[i].maquinaSegunda,
                                    revisionMaquinaSegunda: infoAddedToOt[i].revisionMaquinaSegunda+1,
                                    ajusteSegunda: infoAddedToOt[i].ajusteSegunda,
                                    revisionAjusteSegunda: infoAddedToOt[i].revisionAjusteSegunda+1,
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
                                otInfoCicloCorreccionSegundaLength = parseInt(pathToOtAjuste.otInfoCicloCorreccionSegunda.length) || 0,
                                pathToCicloCorreccionSegunda = pathToOtAjuste.otInfoCicloCorreccionSegunda[otInfoCicloCorreccionSegundaLength-1]

                            let creatorInitial, timestampInitial,
                                piezaMedidaReunionSegundaInitial, revisionPiezaMedidaReunionSegundaInitial,
                                maquinaSegundaInitial, revisionMaquinaSegundaInitial,
                                ajusteSegundaInitial, revisionAjusteSegundaInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoCicloCorreccionSegundaLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoCicloCorreccionSegunda[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoCicloCorreccionSegunda[0].timestamp
                                piezaMedidaReunionSegundaInitial = pathToCicloCorreccionSegunda.piezaMedidaReunionSegunda
                                revisionPiezaMedidaReunionSegundaInitial = parseInt(pathToCicloCorreccionSegunda.revisionPiezaMedidaReunionSegunda)
                                maquinaSegundaInitial = pathToCicloCorreccionSegunda.maquinaSegunda
                                revisionMaquinaSegundaInitial = parseInt(pathToCicloCorreccionSegunda.revisionMaquinaSegunda)
                                ajusteSegundaInitial = pathToCicloCorreccionSegunda.ajusteSegunda
                                revisionAjusteSegundaInitial = parseInt(pathToCicloCorreccionSegunda.revisionAjusteSegunda)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                piezaMedidaReunionSegundaInitial = 'sinDato', revisionPiezaMedidaReunionSegundaInitial = 0
                                maquinaSegundaInitial = 'sinDato', revisionMaquinaSegundaInitial = 0
                                ajusteSegundaInitial = 'sinDato', revisionAjusteSegundaInitial = 0
                            }

                            infoAddedToOt[i].piezaMedidaReunionSegunda == piezaMedidaReunionSegundaInitial ?                            
                                infoAddedToOt[i].revisionPiezaMedidaReunionSegunda = parseInt(revisionPiezaMedidaReunionSegundaInitial)
                            :
                                infoAddedToOt[i].revisionPiezaMedidaReunionSegunda = parseInt(revisionPiezaMedidaReunionSegundaInitial+1)

                            infoAddedToOt[i].maquinaSegunda == maquinaSegundaInitial ?                                    
                                infoAddedToOt[i].revisionMaquinaSegunda = parseInt(revisionMaquinaSegundaInitial)
                            :
                                infoAddedToOt[i].revisionMaquinaSegunda = parseInt(revisionMaquinaSegundaInitial+1)

                            infoAddedToOt[i].ajusteSegunda == ajusteSegundaInitial ?                                    
                                infoAddedToOt[i].revisionAjusteSegunda = parseInt(revisionAjusteSegundaInitial)
                            :
                                infoAddedToOt[i].revisionAjusteSegunda = parseInt(revisionAjusteSegundaInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoCicloCorreccionSegunda`]:
                                {
                                    piezaMedidaReunionSegunda: infoAddedToOt[i].piezaMedidaReunionSegunda,
                                    revisionPiezaMedidaReunionSegunda: infoAddedToOt[i].revisionPiezaMedidaReunionSegunda,
                                    maquinaSegunda: infoAddedToOt[i].maquinaSegunda,
                                    revisionMaquinaSegunda: infoAddedToOt[i].revisionMaquinaSegunda,
                                    ajusteSegunda: infoAddedToOt[i].ajusteSegunda,
                                    revisionAjusteSegunda: infoAddedToOt[i].revisionAjusteSegunda,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Ciclo Correccion 2 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Ciclo Correccion 2 a la OT del Proyecto!`)
        }
    }

    // 9 Add Info Ciclo Correccion 3 to Ot's ----------------
    async addInfoOtCicloCorreccionTercera(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoCicloCorreccionTercera: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoCicloCorreccionTercera`]:
                                {
                                    piezaMedidaReunionTercera: infoAddedToOt[i].piezaMedidaReunionTercera,
                                    revisionPiezaMedidaReunionTercera: infoAddedToOt[i].revisionPiezaMedidaReunionTercera+1,
                                    maquinaTercera: infoAddedToOt[i].maquinaTercera,
                                    revisionMaquinaTercera: infoAddedToOt[i].revisionMaquinaTercera+1,
                                    ajusteTercera: infoAddedToOt[i].ajusteTercera,
                                    revisionAjusteTercera: infoAddedToOt[i].revisionAjusteTercera+1,
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
                                otInfoCicloCorreccionTerceraLength = parseInt(pathToOtAjuste.otInfoCicloCorreccionTercera.length) || 0,
                                pathToCicloCorreccionTercera = pathToOtAjuste.otInfoCicloCorreccionTercera[otInfoCicloCorreccionTerceraLength-1]

                            let creatorInitial, timestampInitial,
                                piezaMedidaReunionTerceraInitial, revisionPiezaMedidaReunionTerceraInitial,
                                maquinaTerceraInitial, revisionMaquinaTerceraInitial,
                                ajusteTerceraInitial, revisionAjusteTerceraInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoCicloCorreccionTerceraLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoCicloCorreccionTercera[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoCicloCorreccionTercera[0].timestamp
                                piezaMedidaReunionTerceraInitial = pathToCicloCorreccionTercera.piezaMedidaReunionTercera
                                revisionPiezaMedidaReunionTerceraInitial = parseInt(pathToCicloCorreccionTercera.revisionPiezaMedidaReunionTercera)
                                maquinaTerceraInitial = pathToCicloCorreccionTercera.maquinaTercera
                                revisionMaquinaTerceraInitial = parseInt(pathToCicloCorreccionTercera.revisionMaquinaTercera)
                                ajusteTerceraInitial = pathToCicloCorreccionTercera.ajusteTercera
                                revisionAjusteTerceraInitial = parseInt(pathToCicloCorreccionTercera.revisionAjusteTercera)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                piezaMedidaReunionTerceraInitial = 'sinDato', revisionPiezaMedidaReunionTerceraInitial = 0
                                maquinaTerceraInitial = 'sinDato', revisionMaquinaTerceraInitial = 0
                                ajusteTerceraInitial = 'sinDato', revisionAjusteTerceraInitial = 0
                            }

                            infoAddedToOt[i].piezaMedidaReunionTercera == piezaMedidaReunionTerceraInitial ?                            
                                infoAddedToOt[i].revisionPiezaMedidaReunionTercera = parseInt(revisionPiezaMedidaReunionTerceraInitial)
                            :
                                infoAddedToOt[i].revisionPiezaMedidaReunionTercera = parseInt(revisionPiezaMedidaReunionTerceraInitial+1)

                            infoAddedToOt[i].maquinaTercera == maquinaTerceraInitial ?                                    
                                infoAddedToOt[i].revisionMaquinaTercera = parseInt(revisionMaquinaTerceraInitial)
                            :
                                infoAddedToOt[i].revisionMaquinaTercera = parseInt(revisionMaquinaTerceraInitial+1)

                            infoAddedToOt[i].ajusteTercera == ajusteTerceraInitial ?                                    
                                infoAddedToOt[i].revisionAjusteTercera = parseInt(revisionAjusteTerceraInitial)
                            :
                                infoAddedToOt[i].revisionAjusteTercera = parseInt(revisionAjusteTerceraInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoCicloCorreccionTercera`]:
                                {
                                    piezaMedidaReunionTercera: infoAddedToOt[i].piezaMedidaReunionTercera,
                                    revisionPiezaMedidaReunionTercera: infoAddedToOt[i].revisionPiezaMedidaReunionTercera,
                                    maquinaTercera: infoAddedToOt[i].maquinaTercera,
                                    revisionMaquinaTercera: infoAddedToOt[i].revisionMaquinaTercera,
                                    ajusteTercera: infoAddedToOt[i].ajusteTercera,
                                    revisionAjusteTercera: infoAddedToOt[i].revisionAjusteTercera,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Ciclo Correccion 3 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Ciclo Correccion 3 a la OT del Proyecto!`)
        }
    }

    // 10 Add Info Liberacion BuyOff (1° Parte) to Ot's ----------------
    async addInfoOtLiberacionBuyOffPrimera(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoLiberacionBuyOffPrimera: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoLiberacionBuyOffPrimera`]:
                                {
                                    azuladosFondoPieza: infoAddedToOt[i].azuladosFondoPieza,
                                    revisionAzuladosFondoPieza: infoAddedToOt[i].revisionAzuladosFondoPieza+1,
                                    roces: infoAddedToOt[i].roces,
                                    revisionRoces: infoAddedToOt[i].revisionRoces+1,
                                    azuladoGuias: infoAddedToOt[i].azuladoGuias,
                                    revisionAzuladoGuias: infoAddedToOt[i].revisionAzuladoGuias+1,
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
                                otInfoLiberacionBuyOffPrimeraLength = parseInt(pathToOtAjuste.otInfoLiberacionBuyOffPrimera.length) || 0,
                                pathToLiberacionBuyOffPrimera = pathToOtAjuste.otInfoLiberacionBuyOffPrimera[otInfoLiberacionBuyOffPrimeraLength-1]

                            let creatorInitial, timestampInitial,
                                azuladosFondoPiezaInitial, revisionAzuladosFondoPiezaInitial,
                                rocesInitial, revisionRocesInitial,
                                azuladoGuiasInitial, revisionAzuladoGuiasInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoLiberacionBuyOffPrimeraLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoLiberacionBuyOffPrimera[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoLiberacionBuyOffPrimera[0].timestamp
                                azuladosFondoPiezaInitial = pathToLiberacionBuyOffPrimera.azuladosFondoPieza
                                revisionAzuladosFondoPiezaInitial = parseInt(pathToLiberacionBuyOffPrimera.revisionAzuladosFondoPieza)
                                rocesInitial = pathToLiberacionBuyOffPrimera.roces
                                revisionRocesInitial = parseInt(pathToLiberacionBuyOffPrimera.revisionRoces)
                                azuladoGuiasInitial = pathToLiberacionBuyOffPrimera.azuladoGuias
                                revisionAzuladoGuiasInitial = parseInt(pathToLiberacionBuyOffPrimera.revisionAzuladoGuias)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                azuladosFondoPiezaInitial = 'sinDato', revisionAzuladosFondoPiezaInitial = 0
                                rocesInitial = 'sinDato', revisionRocesInitial = 0
                                azuladoGuiasInitial = 'sinDato', revisionAzuladoGuiasInitial = 0
                            }

                            infoAddedToOt[i].azuladosFondoPieza == azuladosFondoPiezaInitial ?                            
                                infoAddedToOt[i].revisionAzuladosFondoPieza = parseInt(revisionAzuladosFondoPiezaInitial)
                            :
                                infoAddedToOt[i].revisionAzuladosFondoPieza = parseInt(revisionAzuladosFondoPiezaInitial+1)

                            infoAddedToOt[i].roces == rocesInitial ?                                    
                                infoAddedToOt[i].revisionRoces = parseInt(revisionRocesInitial)
                            :
                                infoAddedToOt[i].revisionRoces = parseInt(revisionRocesInitial+1)

                            infoAddedToOt[i].azuladoGuias == azuladoGuiasInitial ?                                    
                                infoAddedToOt[i].revisionAzuladoGuias = parseInt(revisionAzuladoGuiasInitial)
                            :
                                infoAddedToOt[i].revisionAzuladoGuias = parseInt(revisionAzuladoGuiasInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoLiberacionBuyOffPrimera`]:
                                {
                                    azuladosFondoPieza: infoAddedToOt[i].azuladosFondoPieza,
                                    revisionAzuladosFondoPieza: infoAddedToOt[i].revisionAzuladosFondoPieza,
                                    roces: infoAddedToOt[i].roces,
                                    revisionRoces: infoAddedToOt[i].revisionRoces,
                                    azuladoGuias: infoAddedToOt[i].azuladoGuias,
                                    revisionAzuladoGuias: infoAddedToOt[i].revisionAzuladoGuias,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Liberacion BuyOff (1° Parte) to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Liberacion BuyOff (1° Parte) a la OT del Proyecto!`)
        }
    }

    // 11 Add Info Liberacion BuyOff (2° Parte) to Ot's ----------------
    async addInfoOtLiberacionBuyOffSegunda(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoLiberacionBuyOffSegunda: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoLiberacionBuyOffSegunda`]:
                                {
                                    rebabas: infoAddedToOt[i].rebabas,
                                    revisionRebabas: infoAddedToOt[i].revisionRebabas+1,
                                    caidasScrap: infoAddedToOt[i].caidasScrap,
                                    revisionCaidasScrap: infoAddedToOt[i].revisionCaidasScrap+1,
                                    aspecto: infoAddedToOt[i].aspecto,
                                    revisionAspecto: infoAddedToOt[i].revisionAspecto+1,
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
                                otInfoLiberacionBuyOffSegundaLength = parseInt(pathToOtAjuste.otInfoLiberacionBuyOffSegunda.length) || 0,
                                pathToLiberacionBuyOffSegunda = pathToOtAjuste.otInfoLiberacionBuyOffSegunda[otInfoLiberacionBuyOffSegundaLength-1]

                            let creatorInitial, timestampInitial,
                                rebabasInitial, revisionRebabasInitial,
                                caidasScrapInitial, revisionCaidasScrapInitial,
                                aspectoInitial, revisionAspectoInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoLiberacionBuyOffSegundaLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoLiberacionBuyOffSegunda[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoLiberacionBuyOffSegunda[0].timestamp
                                rebabasInitial = pathToLiberacionBuyOffSegunda.rebabas
                                revisionRebabasInitial = parseInt(pathToLiberacionBuyOffSegunda.revisionRebabas)
                                caidasScrapInitial = pathToLiberacionBuyOffSegunda.caidasScrap
                                revisionCaidasScrapInitial = parseInt(pathToLiberacionBuyOffSegunda.revisionCaidasScrap)
                                aspectoInitial = pathToLiberacionBuyOffSegunda.aspecto
                                revisionAspectoInitial = parseInt(pathToLiberacionBuyOffSegunda.revisionAspecto)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                rebabasInitial = 'sinDato', revisionRebabasInitial = 0
                                caidasScrapInitial = 'sinDato', revisionCaidasScrapInitial = 0
                                aspectoInitial = 'sinDato', revisionAspectoInitial = 0
                            }

                            infoAddedToOt[i].rebabas == rebabasInitial ?                            
                                infoAddedToOt[i].revisionRebabas = parseInt(revisionRebabasInitial)
                            :
                                infoAddedToOt[i].revisionRebabas = parseInt(revisionRebabasInitial+1)

                            infoAddedToOt[i].caidasScrap == caidasScrapInitial ?                                    
                                infoAddedToOt[i].revisionCaidasScrap = parseInt(revisionCaidasScrapInitial)
                            :
                                infoAddedToOt[i].revisionCaidasScrap = parseInt(revisionCaidasScrapInitial+1)

                            infoAddedToOt[i].aspecto == aspectoInitial ?                                    
                                infoAddedToOt[i].revisionAspecto = parseInt(revisionAspectoInitial)
                            :
                                infoAddedToOt[i].revisionAspecto = parseInt(revisionAspectoInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoLiberacionBuyOffSegunda`]:
                                {
                                    rebabas: infoAddedToOt[i].rebabas,
                                    revisionRebabas: infoAddedToOt[i].revisionRebabas,
                                    caidasScrap: infoAddedToOt[i].caidasScrap,
                                    revisionCaidasScrap: infoAddedToOt[i].revisionCaidasScrap,
                                    aspecto: infoAddedToOt[i].aspecto,
                                    revisionAspecto: infoAddedToOt[i].revisionAspecto,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Liberacion BuyOff (2° Parte) to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Liberacion BuyOff (2° Parte) a la OT del Proyecto!`)
        }
    }

    // 12 Add Info BuyOff to Ot's ----------------
    async addInfoOtBuyOff(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoBuyOff: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoBuyOff`]:
                                {
                                    buyOffEstatico: infoAddedToOt[i].buyOffEstatico,
                                    revisionBuyOffEstatico: infoAddedToOt[i].revisionBuyOffEstatico+1,
                                    buyOffDinamico: infoAddedToOt[i].buyOffDinamico,
                                    revisionBuyOffDinamico: infoAddedToOt[i].revisionBuyOffDinamico+1,
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
                                otInfoBuyOffLength = parseInt(pathToOtAjuste.otInfoBuyOff.length) || 0,
                                pathToBuyOff = pathToOtAjuste.otInfoBuyOff[otInfoBuyOffLength-1]

                            let creatorInitial, timestampInitial,
                                buyOffEstaticoInitial, revisionBuyOffEstaticoInitial,
                                buyOffDinamicoInitial, revisionBuyOffDinamicoInitial                       
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoBuyOffLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoBuyOff[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoBuyOff[0].timestamp
                                buyOffEstaticoInitial = pathToBuyOff.buyOffEstatico
                                revisionBuyOffEstaticoInitial = parseInt(pathToBuyOff.revisionBuyOffEstatico)
                                buyOffDinamicoInitial = pathToBuyOff.buyOffDinamico
                                revisionBuyOffDinamicoInitial = parseInt(pathToBuyOff.revisionBuyOffDinamico)
                                
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                buyOffEstaticoInitial = 'sinDato', revisionBuyOffEstaticoInitial = 0
                                buyOffDinamicoInitial = 'sinDato', revisionBuyOffDinamicoInitial = 0
                            }

                            infoAddedToOt[i].buyOffEstatico == buyOffEstaticoInitial ?                            
                                infoAddedToOt[i].revisionBuyOffEstatico = parseInt(revisionBuyOffEstaticoInitial)
                            :
                                infoAddedToOt[i].revisionBuyOffEstatico = parseInt(revisionBuyOffEstaticoInitial+1)

                            infoAddedToOt[i].buyOffDinamico == buyOffDinamicoInitial ?                                    
                                infoAddedToOt[i].revisionBuyOffDinamico = parseInt(revisionBuyOffDinamicoInitial)
                            :
                                infoAddedToOt[i].revisionBuyOffDinamico = parseInt(revisionBuyOffDinamicoInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoBuyOff`]:
                                {
                                    buyOffEstatico: infoAddedToOt[i].buyOffEstatico,
                                    revisionBuyOffEstatico: infoAddedToOt[i].revisionBuyOffEstatico,
                                    buyOffDinamico: infoAddedToOt[i].buyOffDinamico,
                                    revisionBuyOffDinamico: infoAddedToOt[i].revisionBuyOffDinamico,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info BuyOff to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info BuyOff a la OT del Proyecto!`)
        }
    }

    // 13 Add Info Pendinetes Finales to Ot's ----------------
    async addInfoOtPendientesFinales(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        infoAddedToOt
    ) {
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${iOtKParseInt}`].otAjuste
                        
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste`]:
                                {
                                    otInfoPendientesFinales: []
                                }
                            }
                            
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            
                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            
                            // Se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoPendientesFinales`]:
                                {
                                    pendientesMaquina: infoAddedToOt[i].pendientesMaquina,
                                    revisionPendientesMaquina: infoAddedToOt[i].revisionPendientesMaquina+1,
                                    pendientesAjuste: infoAddedToOt[i].pendientesAjuste,
                                    revisionPendientesAjuste: infoAddedToOt[i].revisionPendientesAjuste+1,
                                    notasAjuste: infoAddedToOt[i].notasAjuste,
                                    revisionNotasAjuste: infoAddedToOt[i].revisionNotasAjuste+1,
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
                                otInfoPendientesFinalesLength = parseInt(pathToOtAjuste.otInfoPendientesFinales.length) || 0,
                                pathToPendientesFinales = pathToOtAjuste.otInfoPendientesFinales[otInfoPendientesFinalesLength-1]

                            let creatorInitial, timestampInitial,
                                pendientesMaquinaInitial, revisionPendientesMaquinaInitial,
                                pendientesAjusteInitial, revisionPendientesAjusteInitial,
                                notasAjusteInitial, revisionNotasAjusteInitial                                
                            
                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            if (otInfoPendientesFinalesLength > 0) {
                                creatorInitial = pathToOtAjuste.otInfoPendientesFinales[0].creator[0]
                                timestampInitial = pathToOtAjuste.otInfoPendientesFinales[0].timestamp
                                pendientesMaquinaInitial = pathToPendientesFinales.pendientesMaquina
                                revisionPendientesMaquinaInitial = parseInt(pathToPendientesFinales.revisionPendientesMaquina)
                                pendientesAjusteInitial = pathToPendientesFinales.pendientesAjuste
                                revisionPendientesAjusteInitial = parseInt(pathToPendientesFinales.revisionPendientesAjuste)
                                notasAjusteInitial = pathToPendientesFinales.notasAjuste
                                revisionNotasAjusteInitial = parseInt(pathToPendientesFinales.revisionNotasAjuste)
                                                            
                            } else {
                                creatorInitial = pathToOtProject.creator[0]
                                timestampInitial = pathToOtProject.timestamp
                                pendientesMaquinaInitial = 'sinDato', revisionPendientesMaquinaInitial = 0
                                pendientesAjusteInitial = 'sinDato', revisionPendientesAjusteInitial = 0
                                notasAjusteInitial = 'sinDato', revisionNotasAjusteInitial = 0
                            }

                            infoAddedToOt[i].pendientesMaquina == pendientesMaquinaInitial ?                            
                                infoAddedToOt[i].revisionPendientesMaquina = parseInt(revisionPendientesMaquinaInitial)
                            :
                                infoAddedToOt[i].revisionPendientesMaquina = parseInt(revisionPendientesMaquinaInitial+1)

                            infoAddedToOt[i].pendientesAjuste == pendientesAjusteInitial ?                                    
                                infoAddedToOt[i].revisionPendientesAjuste = parseInt(revisionPendientesAjusteInitial)
                            :
                                infoAddedToOt[i].revisionPendientesAjuste = parseInt(revisionPendientesAjusteInitial+1)

                            infoAddedToOt[i].notasAjuste == notasAjusteInitial ?                                    
                                infoAddedToOt[i].revisionNotasAjuste = parseInt(revisionNotasAjusteInitial)
                            :
                                infoAddedToOt[i].revisionNotasAjuste = parseInt(revisionNotasAjusteInitial+1)

                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otAjuste.0.otInfoPendientesFinales`]:
                                {
                                    pendientesMaquina: infoAddedToOt[i].pendientesMaquina,
                                    revisionPendientesMaquina: infoAddedToOt[i].revisionPendientesMaquina,
                                    pendientesAjuste: infoAddedToOt[i].pendientesAjuste,
                                    revisionPendientesAjuste: infoAddedToOt[i].revisionPendientesAjuste,
                                    notasAjuste: infoAddedToOt[i].notasAjuste,
                                    revisionNotasAjuste: infoAddedToOt[i].revisionNotasAjuste,
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToOt[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                
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
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }

                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Pendientes Finales to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Pendientes Finales a la OT del Proyecto!`)
        }
    }


    async disconnet() {
        await this.disconnection
    }

}

module.exports = AjustesDaoMongoDB