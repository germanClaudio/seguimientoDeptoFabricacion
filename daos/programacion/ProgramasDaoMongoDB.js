const ContenedorMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const Proyectos = require('../../models/proyectos.models.js')
const Clientes = require('../../models/clientes.models.js')
const Programas = require('../../models/programas.models.js')

let formatDate = require('../../utils/formatDate.js');
const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000}

class ProgramacionDaoMongoDB extends ContenedorMongoDB {
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

    // Search all Clients by Client Name o Code ----------------
    async searchClientsAll(name) {
        const query = name.clientName
        try {
            const clients = await Clientes.find({ $or: [{ clientName: query }, { clientCode: query }] }).exec()

            if (clients === undefined || clients === null) {
                return null
            } else {
                return clients
            }
        } catch (error) {
            console.error("Error MongoDB searched Clientes: ", error)
            return new Error('No hay clientes en la DB!')
        }
    }

    // Get all projects from a Client by Id ----------------
    async getProjectsByClientId(id) {
        if (id) {
            try {
                const project = await Proyectos.find({
                    'client.0._id': id
                })

                return project

            } catch (error) {
                console.error("Error MongoDB getProjectsByClientId: ", error)
            }
        } else {
            try {
                const project = await Proyectos.find()
                return project
            } catch (error) {
                console.error("Error MongoDB getOneClientById: ", error)
            }
        }
    }

    // Select all projects by Main project Id ----------------
    async selectProjectsByMainProjectId(id) {
        if (id) {
            try {
                const project = await Proyectos.find({
                    '_id': id
                })
                // console.log('project...',project)
                return project

            } catch (error) {
                console.error("Error MongoDB getProjectsByClientId: ", error)
            }
        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                console.error("Error MongoDB getOneProjectById: ", error)
            }
        }
    }

    // Select one project by project Id ----------------
    async selectProjectByProjectId(id) {
        
        if (id) {
            try {
                const project = await Proyectos.find({
                    'project.0._id': id
                })
                
                return project

            } catch (error) {
                console.error("Error MongoDB getProjectsByProjectId: ", error)
            }
        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                console.error("Error MongoDB getOneProjectById: ", error)
            }
        }
    }

    // Get all OCI from all projects -----------
    async getAllOciProjects() {
        try {
            const projects = await Proyectos.find() //{ $or: [{ clientName: query }, { clientCode: query }] }).exec()
            
            if (projects === undefined || projects === null) {
                return new Error('No hay proyectos cargados en ningún cliente!')
            } else {
                return projects
            }
        } catch (error) {
            console.error("Error MongoDB getAllOciProjects: ", error)
            return new Error('No hay proyectos en la DB!')
        }
    }

    // Select one OCI by Oci Number ----------------
    async selectOciByOciNumber(numberOci) {
        const numberOciParsed = parseInt(numberOci)
        if (numberOciParsed) {
            try {
                const project = await Proyectos.find({
                    [`project.0.oci.${numberOciParsed}.ociNumber`]: numberOciParsed
                })
                return project

            } catch (error) {
                console.error("Error MongoDB selectOciByOciNumber: ", error)
            }

        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                console.error("Error MongoDB selectOciByOciNumber: ", error)
            }
        }
    }

    // Add Ot's to Oci Number ----------------
    async addOtToOciProject(idProjectTarget, numberOci, ociNumberK, arrayOtAddedToOci) {
        //console.log('arrayOtAddedToOci: ', arrayOtAddedToOci)
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                if (itemMongoDB) {
                    const ociKNumber = parseInt(ociNumberK) || 0
                    
                    let infoOtToAddOci = {
                        [`project.0.oci.${ociKNumber}.otProject`]: arrayOtAddedToOci,
                    }

                    let infoOtModificator = {
                        [`project.0.oci.${ociKNumber}.modificator`]: arrayOtAddedToOci[0].modificator,
                        [`project.0.oci.${ociKNumber}.modifiedOn`]: ""
                    }

                    if(itemMongoDB.project[0].oci[ociKNumber].otProject != []) {

                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: infoOtModificator
                            },
                            { new: true }
                        )

                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: infoOtToAddOci
                            },
                            { new: true }
                        )
                        console.info('Ot agregada a OCI ', otAddedToOci)
    
                        if (otAddedToOci.acknowledged) {
                            const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                            return itemUpdated

                        } else {
                            return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                        }
                        
                    } else {

                        let infoOtToAddOci = {
                            [`project.0.oci.${ociKNumber}.otProject`]: arrayOtAddedToOci,
                            [`project.0.oci.${ociKNumber}.creator`]: arrayOtAddedToOci[0].creator,
                            [`project.0.oci.${ociKNumber}.timestamp`]: arrayOtAddedToOci[0].timestamp,
                        }

                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: infoOtModificator
                            },
                            { new: true }
                        )

                        var otAddedToOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: infoOtToAddOci
                            },
                            { new: true }
                        )
                        console.info('Ot agregada a OCI ', otAddedToOci)
    
                        if (otAddedToOci.acknowledged) {
                            const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                            return itemUpdated

                        } else {
                            return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                        }
                    }

                } else {
                    console.error(`No se encontró la OCI: ${numberOci}`)
                    return new Error(`No se encontró la OCI: ${numberOci}`)
                }

            } catch (error) {
                console.error("Error MongoDB adding OT to a OCI: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la OT a la OCI del Proyecto!`)
        }
    }

    // Add Info addInfoOtDistribucion----------------
    async addInfoOtDistribucion(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        arrayDetalleNumberK,
        detallesQuantity,
        totalDetallesQuantity,
        arrayInfoAddedToDetail
    ){

        const ociKNumber = parseInt(ociNumberK) || 0
        // const quantityOt = parseInt(otQuantity)
        const quantityDetalle = parseInt(detallesQuantity)
        const infoAddedToDetail = arrayInfoAddedToDetail

        // console.log('1-otQuantity-Dao:', quantityOt)
        // console.log('2-ociNumberK-Dao: ', ociNumberK)
        // console.log('A-arrayOtNumberK-Dao:', arrayOtNumberK)
        // console.log('B-arrayDetalleNumberK-Dao: ', arrayDetalleNumberK)
        // console.log('C-detallesQuantity-Dao:', detallesQuantity)
        // console.log('6-totalDetallesQuantity-Dao: ', totalDetallesQuantity)
        // console.log('D-arrayInfoAddedToDetail-Dao: ', arrayInfoAddedToDetail)
        
        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                //console.log('itemMongoDB', itemMongoDB)
                
                //Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i=0; i < quantityDetalle; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const iDetalleKParseInt = parseInt(arrayDetalleNumberK[i])
                        // console.log('0-If/iOtKParseInt: ', iOtKParseInt, ' - If/iDetalleKParseInt: ', iDetalleKParseInt)
                        const treeDetailInformation = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt].otDistribucion
                        // console.log('0.1-Dao-treeDetailInformation----> ',treeDetailInformation, ' i=',i)
                        treeDetailInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        // for (let i = 0; i < quantityDetalle; i++) {
                            // Si no existe la extructura del arbol, se crea la estructura a agregar --
                            if (!arrayStructureTreeExists[i]) {
                                let estructuraACrear = {
                                    [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}`]:
                                    {
                                        otDistribucion: []
                                    }
                                }
                                console.log('0.3-Dao-estructuraACrear: ', i,' - ', estructuraACrear)
                                if (estructuraACrear) {
                                    arrayStructureTree.push(estructuraACrear)
                                }
                                console.log('1-Dao-arrayStructureTree-- ', i,' - ', arrayStructureTree[i])

                                // Se agrega la estructura al arbol de MongoDB ---
                                const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                    { _id: itemMongoDB._id },
                                    {
                                        $set: arrayStructureTree[i] || estructuraACrear
                                    },
                                    { upsert: true }
                                )
                                arrayTreeCreation.push(treeInfoOtAddedToOt)
                                console.log('2-Dao-Estructura arbol creada: ', i,' - ', arrayTreeCreation)

                                // Se crea el array de datos a agregar ---
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otDistribucion`]:
                                    {
                                        mecanizado2dCompleto: infoAddedToDetail[i].mecanizado2dCompleto,
                                        revisionMecanizado2dCompleto: parseInt(infoAddedToDetail[i].revisionMecanizado2dCompleto+1),
                                        mecanizado3dPrefinal: infoAddedToDetail[i].mecanizado3dPrefinal,
                                        revisionMecanizado3dPrefinal: parseInt(infoAddedToDetail[i].revisionMecanizado3dPrefinal+1),
                                        mecanizado3dFinal: infoAddedToDetail[i].mecanizado3dFinal,
                                        revisionMecanizado3dFinal: parseInt(infoAddedToDetail[i].revisionMecanizado3dFinal+1),
                                        bancoArmado: infoAddedToDetail[i].bancoArmado,
                                        revisionBancoArmado: parseInt(infoAddedToDetail[i].revisionBancoArmado+1),
                                        creator: infoAddedToDetail[i].creator,
                                        timestamp: formatDate(),
                                        modificator: infoAddedToDetail[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                
                                        var infoDistribucionAddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoDistribucionAddedToOt)
                
                            } else {
                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let pathToDetalle = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt]
                                let creatorInitial = pathToDetalle.creator[0]
                                // console.log('creatorInitial: ', creatorInitial)
                                let timestampInitial = pathToDetalle.timestamp

                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otDistribucionLength = parseInt(pathToDetalle.otDistribucion.length) || 0
                                let pathToOtDistribucion = pathToDetalle.otDistribucion[otDistribucionLength-1]
                                
                                if (otDistribucionLength > 0) {
                                    var mecanizado2dCompletoInitial = pathToOtDistribucion.mecanizado2dCompleto,
                                        revisionMecanizado2dCompletoInitial = parseInt(pathToOtDistribucion.revisionMecanizado2dCompleto),
                                        mecanizado3dPrefinalInitial = pathToOtDistribucion.mecanizado3dPrefinal,
                                        revisionMecanizado3dPrefinalInitial = parseInt(pathToOtDistribucion.revisionMecanizado3dPrefinal),
                                        mecanizado3dFinalInitial = pathToOtDistribucion.mecanizado3dFinal,
                                        revisionMecanizado3dFinalInitial = parseInt(pathToOtDistribucion.revisionMecanizado3dFinal),
                                        bancoArmadoInitial = pathToOtDistribucion.bancoArmado,
                                        revisionBancoArmadoInitial = parseInt(pathToOtDistribucion.revisionBancoArmado)

                                } else {
                                    var mecanizado2dCompletoInitial = 'prodismo', revisionMecanizado2dCompletoInitial = 0,
                                        mecanizado3dPrefinalInitial = 'prodismo', revisionMecanizado3dPrefinalInitial = 0,
                                        mecanizado3dFinalInitial = 'prodismo', revisionMecanizado3dFinalInitial = 0,
                                        bancoArmadoInitial = 'prodismo', revisionBancoArmadoInitial = 0
                                }

                                // console.log('----infoAddedToDetail[i].mecanizado2dCompleto: ', infoAddedToDetail[i].mecanizado2dCompleto)
                                // console.log('----infoAddedToDetail[i].revisionMecanizado2dCompleto: ', infoAddedToDetail[i].revisionMecanizado2dCompleto)

                                infoAddedToDetail[i].mecanizado2dCompleto == mecanizado2dCompletoInitial ?                            
                                    infoAddedToDetail[i].revisionMecanizado2dCompleto = parseInt(revisionMecanizado2dCompletoInitial)
                                :
                                    infoAddedToDetail[i].revisionMecanizado2dCompleto = parseInt(revisionMecanizado2dCompletoInitial+1)
                                
                                infoAddedToDetail[i].mecanizado3dPrefinal == mecanizado3dPrefinalInitial ?                                    
                                    infoAddedToDetail[i].revisionMecanizado3dPrefinal = parseInt(revisionMecanizado3dPrefinalInitial)
                                :
                                    infoAddedToDetail[i].revisionMecanizado3dPrefinal = parseInt(revisionMecanizado3dPrefinalInitial+1)

                                infoAddedToDetail[i].mecanizado3dFinal == mecanizado3dFinalInitial ?                                    
                                    infoAddedToDetail[i].revisionMecanizado3dFinal = parseInt(revisionMecanizado3dFinalInitial)
                                :
                                    infoAddedToDetail[i].revisionMecanizado3dFinal = parseInt(revisionMecanizado3dFinalInitial+1)

                                infoAddedToDetail[i].bancoArmado == bancoArmadoInitial ?                                    
                                    infoAddedToDetail[i].revisionBancoArmado = parseInt(revisionBancoArmadoInitial)
                                :
                                    infoAddedToDetail[i].revisionBancoArmado = parseInt(revisionBancoArmadoInitial+1)
                                
                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otDistribucion`]:
                                    {
                                        mecanizado2dCompleto: infoAddedToDetail[i].mecanizado2dCompleto,
                                        revisionMecanizado2dCompleto: parseInt(infoAddedToDetail[i].revisionMecanizado2dCompleto),
                                        mecanizado3dPrefinal: infoAddedToDetail[i].mecanizado3dPrefinal,
                                        revisionMecanizado3dPrefinal: parseInt(infoAddedToDetail[i].revisionMecanizado3dPrefinal),
                                        mecanizado3dFinal: infoAddedToDetail[i].mecanizado3dFinal,
                                        revisionMecanizado3dFinal: parseInt(infoAddedToDetail[i].revisionMecanizado3dFinal),
                                        bancoArmado: infoAddedToDetail[i].bancoArmado,
                                        revisionBancoArmado: parseInt(infoAddedToDetail[i].revisionBancoArmado),
                                        creator: creatorInitial,
                                        timestamp: timestampInitial,
                                        modificator: infoAddedToDetail[i].creator,
                                        modifiedOn: formatDate()
                                    }
                                }
                                    arrayQuantity.push(updateQuery)
                                    // console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
                
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
                            // console.log('5.1-Dao-proyecto----otDetalles0: ', itemUpdated.project[0].oci[0].otProject[0].otDetalles[0])
                            return itemUpdated

                        } else {
                            return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                        }
                    // }
                    
                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Distribution to Detail: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Distribution a Detalle de OT!`)
        }
    }

    // Add Info addInfoOtProgramacionPrimera----------------
    async addInfoProgramacionPrimera(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        arrayDetalleNumberK,
        detallesQuantity,
        totalDetallesQuantity,
        arrayInfoAddedToDetail
    ){

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityDetalle = parseInt(detallesQuantity)
        const infoAddedToDetail = arrayInfoAddedToDetail

        // console.log('1-otQuantity-Dao:', quantityOt)
        // console.log('2-ociNumberK-Dao: ', ociNumberK)
        // console.log('A-arrayOtNumberK-Dao:', arrayOtNumberK)
        // console.log('B-arrayDetalleNumberK-Dao: ', arrayDetalleNumberK)
        // console.log('C-detallesQuantity-Dao:', detallesQuantity)
        // console.log('6-totalDetallesQuantity-Dao: ', totalDetallesQuantity)
        // console.log('D-arrayInfoAddedToDetail-Dao: ', arrayInfoAddedToDetail)
        
        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                //console.log('itemMongoDB', itemMongoDB)
                
                //Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i=0; i < quantityDetalle; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const iDetalleKParseInt = parseInt(arrayDetalleNumberK[i])
                        // console.log('0-If/iOtKParseInt: ', iOtKParseInt, ' - If/iDetalleKParseInt: ', iDetalleKParseInt)
                        const treeDetailInformation = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt].otProgramacionPrimera
                        // console.log('0.1-Dao-treeDetailInformation----> ',treeDetailInformation, ' i=',i)
                        treeDetailInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}`]:
                                {
                                    otProgramacionPrimera: []
                                }
                            }
                            //console.log('0.3-Dao-estructuraACrear: ', i,' - ', estructuraACrear)
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            //console.log('1-Dao-arrayStructureTree-- ', i,' - ', arrayStructureTree[i])

                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            //console.log('2-Dao-Estructura arbol creada: ', i,' - ', arrayTreeCreation)

                            // Se crea el array de datos a agregar ---
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otProgramacionPrimera`]:
                                {
                                    rt: infoAddedToDetail[i].rt,
                                    estadoRt: infoAddedToDetail[i].estadoRt,
                                    revisionRt: parseInt(infoAddedToDetail[i].revisionRt+1),
                                    preparacionGeo: infoAddedToDetail[i].preparacionGeo,
                                    estadoPreparacionGeo: infoAddedToDetail[i].estadoPreparacionGeo,
                                    revisionPreparacionGeo: parseInt(infoAddedToDetail[i].revisionPreparacionGeo+1),
                                    programa2d: infoAddedToDetail[i].programa2d,
                                    estadoPrograma2d: infoAddedToDetail[i].estadoPrograma2d,
                                    revisionPrograma2d: parseInt(infoAddedToDetail[i].revisionPrograma2d+1),
                                    creator: infoAddedToDetail[i].creator,
                                    timestamp: formatDate(),
                                    modificator: infoAddedToDetail[i].modificator,
                                    modifiedOn: ''
                                }
                            }
                                arrayQuantity.push(updateQuery)

                                // Si arrayTreeCreation.modifiedCount es = 1 ---
                                if (arrayTreeCreation[i].modifiedCount===1) {
            
                                    var infoProgramacionPrimeraAddedToOt = await Proyectos.updateOne(
                                        { _id: itemMongoDB._id },
                                        {
                                            $push: arrayQuantity[i]
                                        },
                                        { new: true }
                                    )
                                    countTreeCreation++
                                }
                                // console.log('3-Dao-Ot agregada: ', i,' - ', infoProgramacionPrimeraAddedToOt)
            
                        } else {
                            // Recupero el creador y la fecha inicial, ya que solo se modifica
                            let pathToDetalle = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt]
                            let creatorInitial = pathToDetalle.creator[0]
                            // console.log('creatorInitial: ', creatorInitial)
                            let timestampInitial = pathToDetalle.timestamp

                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            let otProgramacionPrimeraLength = parseInt(pathToDetalle.otProgramacionPrimera.length) || 0
                            let pathToOtProgramacionPrimera = pathToDetalle.otProgramacionPrimera[otProgramacionPrimeraLength-1]
                            
                            if (otProgramacionPrimeraLength > 0) {
                                var rtInitial = pathToOtProgramacionPrimera.rt,
                                    estadoRtInitial = pathToOtProgramacionPrimera.estadoRt,
                                    revisionRtInitial = parseInt(pathToOtProgramacionPrimera.revisionRt),
                                    preparacionGeoInitial = pathToOtProgramacionPrimera.preparacionGeo,
                                    estadoPreparacionGeoInitial = pathToOtProgramacionPrimera.estadoPreparacionGeo,
                                    revisionPreparacionGeoInitial = parseInt(pathToOtProgramacionPrimera.revisionPreparacionGeo),
                                    programa2dInitial = pathToOtProgramacionPrimera.programa2d,
                                    estadoPrograma2dInitial = pathToOtProgramacionPrimera.estadoPrograma2d,
                                    revisionPrograma2dInitial = parseInt(pathToOtProgramacionPrimera.revisionPrograma2d)

                            } else {
                                var rtInitial = 'sinDato', estadoRtInitial = 'sinDato', revisionRtInitial = 0,
                                    preparacionGeoInitial = 'sinDato', estadoPreparacionGeoInitial = 'sinDato', revisionPreparacionGeoInitial = 0,
                                    programa2dInitial = 'sinDato', estadoPrograma2dInitial = 'sinDato', revisionPrograma2dInitial = 0
                            }

                            // console.log('----infoAddedToDetail[i].mecanizado2dCompleto: ', infoAddedToDetail[i].mecanizado2dCompleto)
                            // console.log('----infoAddedToDetail[i].revisionMecanizado2dCompleto: ', infoAddedToDetail[i].revisionMecanizado2dCompleto)

                            infoAddedToDetail[i].rt == rtInitial && infoAddedToDetail[i].estadoRt == estadoRtInitial ?                            
                                infoAddedToDetail[i].revisionRt = parseInt(revisionRtInitial)
                            :
                                infoAddedToDetail[i].revisionRt = parseInt(revisionRtInitial+1)
                            
                            infoAddedToDetail[i].preparacionGeo == preparacionGeoInitial && infoAddedToDetail[i].estadoPreparacionGeo == estadoPreparacionGeoInitial ?                                    
                                infoAddedToDetail[i].revisionPreparacionGeo = parseInt(revisionPreparacionGeoInitial)
                            :
                                infoAddedToDetail[i].revisionPreparacionGeo = parseInt(revisionPreparacionGeoInitial+1)

                            infoAddedToDetail[i].programa2d == programa2dInitial && infoAddedToDetail[i].estadoPrograma2d == estadoPrograma2dInitial ?                                    
                                infoAddedToDetail[i].revisionPrograma2d = parseInt(revisionPrograma2dInitial)
                            :
                                infoAddedToDetail[i].revisionPrograma2d = parseInt(revisionPrograma2dInitial+1)
                            
                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otProgramacionPrimera`]:
                                {
                                    rt: infoAddedToDetail[i].rt,
                                    estadoRt: infoAddedToDetail[i].estadoRt,
                                    revisionRt: parseInt(infoAddedToDetail[i].revisionRt),
                                    preparacionGeo: infoAddedToDetail[i].preparacionGeo,
                                    estadoPreparacionGeo: infoAddedToDetail[i].estadoPreparacionGeo,
                                    revisionPreparacionGeo: parseInt(infoAddedToDetail[i].revisionPreparacionGeo),
                                    programa2d: infoAddedToDetail[i].programa2d,
                                    estadoPrograma2d: infoAddedToDetail[i].estadoPrograma2d,
                                    revisionPrograma2d: parseInt(infoAddedToDetail[i].revisionPrograma2d),
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToDetail[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                // console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
            
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
                        // console.log('5.1-Dao-proyecto----otDetalles0: ', itemUpdated.project[0].oci[0].otProject[0].otDetalles[0])
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Programacion Primera to Detail: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Programacion Primera a ítem de OT!`)
        }
    }

    // Add Info addInfoOtProgramacionSegunda----------------
    async addInfoProgramacionSegunda(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        arrayDetalleNumberK,
        detallesQuantity,
        totalDetallesQuantity,
        arrayInfoAddedToDetail
    ){

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityDetalle = parseInt(detallesQuantity)
        const infoAddedToDetail = arrayInfoAddedToDetail

        // console.log('1-otQuantity-Dao:', quantityOt)
        // console.log('2-ociNumberK-Dao: ', ociNumberK)
        // console.log('A-arrayOtNumberK-Dao:', arrayOtNumberK)
        // console.log('B-arrayDetalleNumberK-Dao: ', arrayDetalleNumberK)
        // console.log('C-detallesQuantity-Dao:', detallesQuantity)
        // console.log('6-totalDetallesQuantity-Dao: ', totalDetallesQuantity)
        // console.log('D-arrayInfoAddedToDetail-Dao: ', arrayInfoAddedToDetail)
        
        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                //console.log('itemMongoDB', itemMongoDB)
                
                //Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i=0; i < quantityDetalle; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const iDetalleKParseInt = parseInt(arrayDetalleNumberK[i])
                        // console.log('0-If/iOtKParseInt: ', iOtKParseInt, ' - If/iDetalleKParseInt: ', iDetalleKParseInt)
                        const treeDetailInformation = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt].otProgramacionSegunda
                        // console.log('0.1-Dao-treeDetailInformation----> ',treeDetailInformation, ' i=',i)
                        treeDetailInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}`]:
                                {
                                    otProgramacionSegunda: []
                                }
                            }
                            //console.log('0.3-Dao-estructuraACrear: ', i,' - ', estructuraACrear)
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            //console.log('1-Dao-arrayStructureTree-- ', i,' - ', arrayStructureTree[i])

                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            //console.log('2-Dao-Estructura arbol creada: ', i,' - ', arrayTreeCreation)

                            // Se crea el array de datos a agregar ---
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otProgramacionSegunda`]:
                                {
                                    programa3d2F: infoAddedToDetail[i].programa3d2F,
                                    estadoPrograma3d2F: infoAddedToDetail[i].estadoPrograma3d2F,
                                    revisionPrograma3d2F: parseInt(infoAddedToDetail[i].revisionPrograma3d2F+1),
                                    programa3d4F: infoAddedToDetail[i].programa3d4F,
                                    estadoPrograma3d4F: infoAddedToDetail[i].estadoPrograma3d4F,
                                    revisionPrograma3d4F: parseInt(infoAddedToDetail[i].revisionPrograma3d4F+1),
                                    notasProgramacion: infoAddedToDetail[i].notasProgramacion,
                                    revisionNotasProgramacion: parseInt(infoAddedToDetail[i].revisionNotasProgramacion+1),
                                    creator: infoAddedToDetail[i].creator,
                                    timestamp: formatDate(),
                                    modificator: infoAddedToDetail[i].modificator,
                                    modifiedOn: ''
                                }
                            }
                                arrayQuantity.push(updateQuery)

                                // Si arrayTreeCreation.modifiedCount es = 1 ---
                                if (arrayTreeCreation[i].modifiedCount===1) {
            
                                    var infoProgramacionSegundaAddedToOt = await Proyectos.updateOne(
                                        { _id: itemMongoDB._id },
                                        {
                                            $push: arrayQuantity[i]
                                        },
                                        { new: true }
                                    )
                                    countTreeCreation++
                                }
                                // console.log('3-Dao-Ot agregada: ', i,' - ', infoProgramacionSegundaAddedToOt)
            
                        } else {
                            // Recupero el creador y la fecha inicial, ya que solo se modifica
                            let pathToDetalle = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt]
                            let creatorInitial = pathToDetalle.creator[0]
                            // console.log('creatorInitial: ', creatorInitial)
                            let timestampInitial = pathToDetalle.timestamp

                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            let otProgramacionSegundaLength = parseInt(pathToDetalle.otProgramacionSegunda.length) || 0
                            let pathToOtProgramacionSegunda = pathToDetalle.otProgramacionSegunda[otProgramacionSegundaLength-1]
                            
                            if (otProgramacionSegundaLength > 0) {
                                var programa3d2FInitial = pathToOtProgramacionSegunda.programa3d2F,
                                    estadoPrograma3d2FInitial = pathToOtProgramacionSegunda.estadoPrograma3d2F,
                                    revisionPrograma3d2FInitial = parseInt(pathToOtProgramacionSegunda.revisionPrograma3d2F),
                                    programa3d4FInitial = pathToOtProgramacionSegunda.programa3d4F,
                                    estadoPrograma3d4FInitial = pathToOtProgramacionSegunda.estadoPrograma3d4F,
                                    revisionPrograma3d4FInitial = parseInt(pathToOtProgramacionSegunda.revisionPrograma3d4F),
                                    notasProgramacionInitial = pathToOtProgramacionSegunda.notasProgramacion,
                                    revisionNotasProgramacionInitial = parseInt(pathToOtProgramacionSegunda.revisionNotasProgramacion)

                            } else {
                                var programa3d2FInitial = 'sinDato', estadoPrograma3d2FInitial = 'sinDato', revisionPrograma3d2FInitial = 0,
                                    programa3d4FInitial = 'sinDato', estadoPrograma3d4FInitial = 'sinDato', revisionPrograma3d4FInitial = 0,
                                    notasProgramacionInitial = 'sinDato', revisionNotasProgramacionInitial = 0
                            }

                            // console.log('----infoAddedToDetail[i].mecanizado2dCompleto: ', infoAddedToDetail[i].mecanizado2dCompleto)
                            // console.log('----infoAddedToDetail[i].revisionMecanizado2dCompleto: ', infoAddedToDetail[i].revisionMecanizado2dCompleto)

                            infoAddedToDetail[i].programa3d2F == programa3d2FInitial && infoAddedToDetail[i].estadoPrograma3d2F == estadoPrograma3d2FInitial ?                            
                                infoAddedToDetail[i].revisionPrograma3d2F = parseInt(revisionPrograma3d2FInitial)
                            :
                                infoAddedToDetail[i].revisionPrograma3d2F = parseInt(revisionPrograma3d2FInitial+1)
                            
                            infoAddedToDetail[i].programa3d4F == programa3d4FInitial && infoAddedToDetail[i].estadoPrograma3d4F == estadoPrograma3d4FInitial ?                                    
                                infoAddedToDetail[i].revisionPrograma3d4F = parseInt(revisionPrograma3d4FInitial)
                            :
                                infoAddedToDetail[i].revisionPrograma3d4F = parseInt(revisionPrograma3d4FInitial+1)

                            infoAddedToDetail[i].notasProgramacion == notasProgramacionInitial ?                                    
                                infoAddedToDetail[i].revisionNotasProgramacion = parseInt(revisionNotasProgramacionInitial)
                            :
                                infoAddedToDetail[i].revisionNotasProgramacion = parseInt(revisionNotasProgramacionInitial+1)
                            
                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otProgramacionSegunda`]:
                                {
                                    programa3d2F: infoAddedToDetail[i].programa3d2F,
                                    estadoPrograma3d2F: infoAddedToDetail[i].estadoPrograma3d2F,
                                    revisionPrograma3d2F: parseInt(infoAddedToDetail[i].revisionPrograma3d2F),
                                    programa3d4F: infoAddedToDetail[i].programa3d4F,
                                    estadoPrograma3d4F: infoAddedToDetail[i].estadoPrograma3d4F,
                                    revisionPrograma3d4F: parseInt(infoAddedToDetail[i].revisionPrograma3d4F),
                                    notasProgramacion: infoAddedToDetail[i].notasProgramacion,
                                    revisionNotasProgramacion: parseInt(infoAddedToDetail[i].revisionNotasProgramacion),
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToDetail[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                // console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
            
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
                        // console.log('5.1-Dao-proyecto----otDetalles0: ', itemUpdated.project[0].oci[0].otProject[0].otDetalles[0])
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Programacion Segunda to Detail: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Programacion Segunda a ítem de OT!`)
        }
    }

    // Add Info addInfoOtMecanizadoPrimera----------------
    async addInfoMecanizadoPrimera(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        arrayDetalleNumberK,
        detallesQuantity,
        totalDetallesQuantity,
        arrayInfoAddedToDetail
    ){

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityDetalle = parseInt(detallesQuantity)
        const infoAddedToDetail = arrayInfoAddedToDetail

        // console.log('1-otQuantity-Dao:', quantityOt)
        // console.log('2-ociNumberK-Dao: ', ociNumberK)
        // console.log('A-arrayOtNumberK-Dao:', arrayOtNumberK)
        // console.log('B-arrayDetalleNumberK-Dao: ', arrayDetalleNumberK)
        // console.log('C-detallesQuantity-Dao:', detallesQuantity)
        // console.log('6-totalDetallesQuantity-Dao: ', totalDetallesQuantity)
        // console.log('D-arrayInfoAddedToDetail-Dao: ', arrayInfoAddedToDetail)
        
        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                //console.log('itemMongoDB', itemMongoDB)
                
                //Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i=0; i < quantityDetalle; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const iDetalleKParseInt = parseInt(arrayDetalleNumberK[i])
                        // console.log('0-If/iOtKParseInt: ', iOtKParseInt, ' - If/iDetalleKParseInt: ', iDetalleKParseInt)
                        const treeDetailInformation = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt].otMecanizadoPrimera
                        // console.log('0.1-Dao-treeDetailInformation----> ',treeDetailInformation, ' i=',i)
                        treeDetailInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        
                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}`]:
                                {
                                    otMecanizadoPrimera: []
                                }
                            }
                            //console.log('0.3-Dao-estructuraACrear: ', i,' - ', estructuraACrear)
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            //console.log('1-Dao-arrayStructureTree-- ', i,' - ', arrayStructureTree[i])

                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            //console.log('2-Dao-Estructura arbol creada: ', i,' - ', arrayTreeCreation)

                            // Se crea el array de datos a agregar ---
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otMecanizadoPrimera`]:
                                {
                                    fCero: infoAddedToDetail[i].fCero,
                                    estadoFCero: infoAddedToDetail[i].estadoFCero,
                                    revisionFCero: parseInt(infoAddedToDetail[i].revisionFCero+1),
                                    fUno: infoAddedToDetail[i].fUno,
                                    estadoFUno: infoAddedToDetail[i].estadoFUno,
                                    revisionFUno: parseInt(infoAddedToDetail[i].revisionFUno+1),
                                    fDos: infoAddedToDetail[i].fDos,
                                    estadoFDos: infoAddedToDetail[i].estadoFDos,
                                    revisionFDos: parseInt(infoAddedToDetail[i].revisionFDos+1),
                                    creator: infoAddedToDetail[i].creator,
                                    timestamp: formatDate(),
                                    modificator: infoAddedToDetail[i].modificator,
                                    modifiedOn: ''
                                }
                            }
                                arrayQuantity.push(updateQuery)

                                // Si arrayTreeCreation.modifiedCount es = 1 ---
                                if (arrayTreeCreation[i].modifiedCount===1) {
            
                                    var infoMecanizadoPrimeraAddedToOt = await Proyectos.updateOne(
                                        { _id: itemMongoDB._id },
                                        {
                                            $push: arrayQuantity[i]
                                        },
                                        { new: true }
                                    )
                                    countTreeCreation++
                                }
                                // console.log('3-Dao-Ot agregada: ', i,' - ', infoMecanizadoPrimeraAddedToOt)
            
                        } else {
                            // Recupero el creador y la fecha inicial, ya que solo se modifica
                            let pathToDetalle = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt]
                            let creatorInitial = pathToDetalle.creator[0]
                            // console.log('creatorInitial: ', creatorInitial)
                            let timestampInitial = pathToDetalle.timestamp

                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            let otMecanizadoPrimeraLength = parseInt(pathToDetalle.otMecanizadoPrimera.length) || 0
                            let pathToOtMecanizadoPrimera = pathToDetalle.otMecanizadoPrimera[otMecanizadoPrimeraLength-1]
                            
                            if (otMecanizadoPrimeraLength > 0) {
                                var fCeroInitial = pathToOtMecanizadoPrimera.fCero,
                                    estadoFCeroInitial = pathToOtMecanizadoPrimera.estadoFCero,
                                    revisionFCeroInitial = parseInt(pathToOtMecanizadoPrimera.revisionFCero),
                                    fUnoInitial = pathToOtMecanizadoPrimera.fUno,
                                    estadoFUnoInitial = pathToOtMecanizadoPrimera.estadoFUno,
                                    revisionFUnoInitial = parseInt(pathToOtMecanizadoPrimera.revisionFUno),
                                    fDosInitial = pathToOtMecanizadoPrimera.fDos,
                                    estadoFDosInitial = pathToOtMecanizadoPrimera.estadoFDos,
                                    revisionFDosInitial = parseInt(pathToOtMecanizadoPrimera.revisionFDos)

                            } else {
                                var fCeroInitial = 'sinDato', estadoFCeroInitial = 'sinDato', revisionFCeroInitial = 0,
                                    fUnoInitial = 'sinDato', estadoFUnoInitial = 'sinDato', revisionFUnoInitial = 0,
                                    fDosInitial = 'sinDato', estadoFDosInitial = 'sinDato', revisionFDosInitial = 0
                            }

                            infoAddedToDetail[i].fCero == fCeroInitial && infoAddedToDetail[i].estadoFCero == estadoFCeroInitial ?                            
                                infoAddedToDetail[i].revisionFCero = parseInt(revisionFCeroInitial)
                            :
                                infoAddedToDetail[i].revisionFCero = parseInt(revisionFCeroInitial+1)
                            
                            infoAddedToDetail[i].fUno == fUnoInitial && infoAddedToDetail[i].estadoFUno == estadoFUnoInitial ?                                    
                                infoAddedToDetail[i].revisionFUno = parseInt(revisionFUnoInitial)
                            :
                                infoAddedToDetail[i].revisionFUno = parseInt(revisionFUnoInitial+1)

                            infoAddedToDetail[i].fDos == fDosInitial && infoAddedToDetail[i].estadoFDos == estadoFDosInitial ?                                    
                                infoAddedToDetail[i].revisionFDos = parseInt(revisionFDosInitial)
                            :
                                infoAddedToDetail[i].revisionFDos = parseInt(revisionFDosInitial+1)
                            
                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otMecanizadoPrimera`]:
                                {
                                    fCero: infoAddedToDetail[i].fCero,
                                    estadoFCero: infoAddedToDetail[i].estadoFCero,
                                    revisionFCero: parseInt(infoAddedToDetail[i].revisionFCero),
                                    fUno: infoAddedToDetail[i].fUno,
                                    estadoFUno: infoAddedToDetail[i].estadoFUno,
                                    revisionFUno: parseInt(infoAddedToDetail[i].revisionFUno),
                                    fDos: infoAddedToDetail[i].fDos,
                                    estadoFDos: infoAddedToDetail[i].estadoFDos,
                                    revisionFDos: parseInt(infoAddedToDetail[i].revisionFDos),
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToDetail[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                // console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
            
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
                        // console.log('5.1-Dao-proyecto----otDetalles0: ', itemUpdated.project[0].oci[0].otProject[0].otDetalles[0])
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Mecanizado Primera to Detail: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Mecanizado Primera a ítem de OT!`)
        }
    }

    // Add Info addInfoOtMecanizadoSegunda----------------
    async addInfoMecanizadoSegunda(
        idProjectTarget,
        otQuantity,
        ociNumberK,
        arrayOtNumberK,
        arrayDetalleNumberK,
        detallesQuantity,
        totalDetallesQuantity,
        arrayInfoAddedToDetail
    ){

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityDetalle = parseInt(detallesQuantity)
        const infoAddedToDetail = arrayInfoAddedToDetail

        // console.log('1-otQuantity-Dao:', quantityOt)
        // console.log('2-ociNumberK-Dao: ', ociNumberK)
        // console.log('A-arrayOtNumberK-Dao:', arrayOtNumberK)
        // console.log('B-arrayDetalleNumberK-Dao: ', arrayDetalleNumberK)
        // console.log('C-detallesQuantity-Dao:', detallesQuantity)
        // console.log('6-totalDetallesQuantity-Dao: ', totalDetallesQuantity)
        // console.log('D-arrayInfoAddedToDetail-Dao: ', arrayInfoAddedToDetail)
        
        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                //console.log('itemMongoDB', itemMongoDB)
                
                //Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = [], arrayStructureTree = [], arrayTreeCreation = [], countInfoAdded = 0, countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i=0; i < quantityDetalle; i++) {
                        const iOtKParseInt = parseInt(arrayOtNumberK[i])
                        const iDetalleKParseInt = parseInt(arrayDetalleNumberK[i])
                        // console.log('0-If/iOtKParseInt: ', iOtKParseInt, ' - If/iDetalleKParseInt: ', iDetalleKParseInt)
                        const treeDetailInformation = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt].otMecanizadoSegunda
                        // console.log('0.1-Dao-treeDetailInformation----> ',treeDetailInformation, ' i=',i)
                        treeDetailInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        // Si no existe la extructura del arbol, se crea la estructura a agregar --
                        if (!arrayStructureTreeExists[i]) {
                            let estructuraACrear = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}`]:
                                {
                                    otMecanizadoSegunda: []
                                }
                            }
                            //console.log('0.3-Dao-estructuraACrear: ', i,' - ', estructuraACrear)
                            if (estructuraACrear) {
                                arrayStructureTree.push(estructuraACrear)
                            }
                            //console.log('1-Dao-arrayStructureTree-- ', i,' - ', arrayStructureTree[i])

                            // Se agrega la estructura al arbol de MongoDB ---
                            const treeInfoOtAddedToOt = await Proyectos.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    $set: arrayStructureTree[i] || estructuraACrear
                                },
                                { upsert: true }
                            )
                            arrayTreeCreation.push(treeInfoOtAddedToOt)
                            //console.log('2-Dao-Estructura arbol creada: ', i,' - ', arrayTreeCreation)

                            // Se crea el array de datos a agregar ---
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otMecanizadoSegunda`]:
                                {
                                    fTres: infoAddedToDetail[i].fTres,
                                    estadoFTres: infoAddedToDetail[i].estadoFTres,
                                    revisionFTres: parseInt(infoAddedToDetail[i].revisionFTres+1),
                                    fCuatro: infoAddedToDetail[i].fCuatro,
                                    estadoFCuatro: infoAddedToDetail[i].estadoFCuatro,
                                    revisionFCuatro: parseInt(infoAddedToDetail[i].revisionFCuatro+1),
                                    notasMecanizado: infoAddedToDetail[i].notasMecanizado,
                                    revisionNotasMecanizado: parseInt(infoAddedToDetail[i].revisionNotasMecanizado+1),
                                    creator: infoAddedToDetail[i].creator,
                                    timestamp: formatDate(),
                                    modificator: infoAddedToDetail[i].modificator,
                                    modifiedOn: ''
                                }
                            }
                                arrayQuantity.push(updateQuery)

                                // Si arrayTreeCreation.modifiedCount es = 1 ---
                                if (arrayTreeCreation[i].modifiedCount===1) {
            
                                    var infoMecanizadoSegundaAddedToOt = await Proyectos.updateOne(
                                        { _id: itemMongoDB._id },
                                        {
                                            $push: arrayQuantity[i]
                                        },
                                        { new: true }
                                    )
                                    countTreeCreation++
                                }
                                // console.log('3-Dao-Ot agregada: ', i,' - ', infoMecanizadoSegundaAddedToOt)
            
                        } else {
                            // Recupero el creador y la fecha inicial, ya que solo se modifica
                            let pathToDetalle = itemMongoDB.project[0].oci[ociKNumber].otProject[iOtKParseInt].otDetalles[iDetalleKParseInt]
                            let creatorInitial = pathToDetalle.creator[0]
                            // console.log('creatorInitial: ', creatorInitial)
                            let timestampInitial = pathToDetalle.timestamp

                            // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                            let otMecanizadoSegundaLength = parseInt(pathToDetalle.otMecanizadoSegunda.length) || 0
                            let pathToOtMecanizadoSegunda = pathToDetalle.otMecanizadoSegunda[otMecanizadoSegundaLength-1]
                            
                            if (otMecanizadoSegundaLength > 0) {
                                var fTresInitial = pathToOtMecanizadoSegunda.fTres,
                                    estadoFTresInitial = pathToOtMecanizadoSegunda.estadoFTres,
                                    revisionFTresInitial = parseInt(pathToOtMecanizadoSegunda.revisionFTres),
                                    fCuatroInitial = pathToOtMecanizadoSegunda.fCuatro,
                                    estadoFCuatroInitial = pathToOtMecanizadoSegunda.estadoFCuatro,
                                    revisionFCuatroInitial = parseInt(pathToOtMecanizadoSegunda.revisionFCuatro),
                                    notasMecanizadoInitial = pathToOtMecanizadoSegunda.notasMecanizado,
                                    revisionNotasMecanizadoInitial = parseInt(pathToOtMecanizadoSegunda.revisionNotasMecanizado)

                            } else {
                                var fTresInitial = 'sinDato', estadoFTresInitial = 'sinDato', revisionFTresInitial = 0,
                                    fCuatroInitial = 'sinDato', estadoFCuatroInitial = 'sinDato', revisionFCuatroInitial = 0,
                                    notasMecanizadoInitial = 'sinDato', revisionNotasMecanizadoInitial = 0
                            }

                            // console.log('----infoAddedToDetail[i].mecanizado2dCompleto: ', infoAddedToDetail[i].mecanizado2dCompleto)
                            // console.log('----infoAddedToDetail[i].revisionMecanizado2dCompleto: ', infoAddedToDetail[i].revisionMecanizado2dCompleto)

                            infoAddedToDetail[i].fTres == fTresInitial && infoAddedToDetail[i].estadoFTres == estadoFTresInitial ?                            
                                infoAddedToDetail[i].revisionFTres = parseInt(revisionFTresInitial)
                            :
                                infoAddedToDetail[i].revisionFTres = parseInt(revisionFTresInitial+1)
                            
                            infoAddedToDetail[i].fCuatro == fCuatroInitial && infoAddedToDetail[i].estadoFCuatro == estadoFCuatroInitial ?                                    
                                infoAddedToDetail[i].revisionFCuatro = parseInt(revisionFCuatroInitial)
                            :
                                infoAddedToDetail[i].revisionFCuatro = parseInt(revisionFCuatroInitial+1)

                            infoAddedToDetail[i].notasMecanizado == notasMecanizadoInitial ?                                    
                                infoAddedToDetail[i].revisionNotasMecanizado = parseInt(revisionNotasMecanizadoInitial)
                            :
                                infoAddedToDetail[i].revisionNotasMecanizado = parseInt(revisionNotasMecanizadoInitial+1)
                            
                            // Si existe la extructura del arbol, se crea el array de datos a agregar --
                            let updateQuery = {
                                [`project.0.oci.${ociKNumber}.otProject.${iOtKParseInt}.otDetalles.${iDetalleKParseInt}.otMecanizadoSegunda`]:
                                {
                                    fTres: infoAddedToDetail[i].fTres,
                                    estadoFTres: infoAddedToDetail[i].estadoFTres,
                                    revisionFTres: parseInt(infoAddedToDetail[i].revisionFTres),
                                    fCuatro: infoAddedToDetail[i].fCuatro,
                                    estadoFCuatro: infoAddedToDetail[i].estadoFCuatro,
                                    revisionFCuatro: parseInt(infoAddedToDetail[i].revisionFCuatro),
                                    notasMecanizado: infoAddedToDetail[i].notasMecanizado,
                                    revisionNotasMecanizado: parseInt(infoAddedToDetail[i].revisionNotasMecanizado),
                                    creator: creatorInitial,
                                    timestamp: timestampInitial,
                                    modificator: infoAddedToDetail[i].creator,
                                    modifiedOn: formatDate()
                                }
                            }
                                arrayQuantity.push(updateQuery)
                                // console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
            
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
                        // console.log('5.1-Dao-proyecto----otDetalles0: ', itemUpdated.project[0].oci[0].otProject[0].otDetalles[0])
                        return itemUpdated

                    } else {
                        return new Error(`No se agregó la info de OT en el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`No se encontró el Proyecto id#`)
                }

            } catch (error) {
                console.error("Error MongoDB adding info Mecanizado Segunda to Detail: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Mecanizado Segunda a ítem de OT!`)
        }
    }


    // Update Status Ot by Project Id
    async updateStatusOt(id, project, statusOt, ociKNumber, otKNumber, userModificator) {
        let booleanStatus
        statusOt==='Activo' ? booleanStatus=true : booleanStatus=false
        
        if (id && project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                if (itemMongoDB) {
                    const ociNumberK = parseInt(ociKNumber)
                    const otNumberK = parseInt(otKNumber)

                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.otStatus`]: !booleanStatus,
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: formatDate(), 
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: formatDate()
                            }
                        },
                        { new: true }
                    )
                    // console.log('Status OT modificado: ', updatedProject)

                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        // console.log('itemUpdated...', itemUpdated.project[0].oci[ociNumberK])
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el itemUpdated`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingOT: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status de la OT!`)
        }
    }

    // Add new Detalle to Ot
    async addDetailToOtProject(projectId, ociNumberK, otQuantity, otNumberK, arrayDetalleAddedToOt) {
        const idProjectTarget = projectId 
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                if (itemMongoDB) {

                    let arrayQueryQuantity = []
                    for (let i = 0; i < arrayDetalleAddedToOt.length; i++) {                            
                        let updateQuery = {
                                numeroDetalle: arrayDetalleAddedToOt[i].detalleNumber,
                                descripcionDetalle: arrayDetalleAddedToOt[i].detalleDescription,
                                statusDetalle: arrayDetalleAddedToOt[i].detalleStatus,
                                creator: arrayDetalleAddedToOt[i].creator,
                                timestamp: formatDate(),
                                modificator: arrayDetalleAddedToOt[i].modificator,
                                modifiedOn: '',
                                visible: true
                        }
                        arrayQueryQuantity.push(updateQuery)
                    }    
                    //console.log('Detalle agregado a Ot ', arrayQueryQuantity)
                    // Se agregan las estructuras al arbol de MongoDB ---
                    for (let n=0; n<arrayDetalleAddedToOt.length; n++) {
                        var detalleAddedToOt = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: {
                                    [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.otDetalles`]: arrayQueryQuantity[n]
                                }
                            },
                            { new: true }
                        )
                        //console.info('Detalle agregado a Ot ', detalleAddedToOt)
                    }

                    // Si se agrega correctamente los detalles a la OTOCI => true ---
                    if (detalleAddedToOt.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }

                } else {
                    console.error(`No se encontró la OT`)
                    return new Error(`No se encontró la OT`)
                }

            } catch (error) {
                console.error("Error MongoDB adding OCI to a Project: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la OCI al Proyecto!`)
        }
    }

    // Add new Detalles to Ot from excel file
    async addDetailsToOtProjectFromFile(projectId, ociNumberK, detailQuantity, otNumberK, arrayDetalleAddedToOt) {
        const det_Quantity = parseInt(detailQuantity)
        const idProjectTarget = projectId 
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                if (itemMongoDB) {

                    let arrayQueryQuantity = []
                    for (let i = 0; i < det_Quantity; i++) {                            
                        let updateQuery = {
                                numeroDetalle: arrayDetalleAddedToOt[i].detalleNumber,
                                descripcionDetalle: arrayDetalleAddedToOt[i].detalleDescription,
                                statusDetalle: arrayDetalleAddedToOt[i].detalleStatus,
                                creator: arrayDetalleAddedToOt[i].creator,
                                timestamp: formatDate(),
                                modificator: arrayDetalleAddedToOt[i].modificator,
                                modifiedOn: '',
                                visible: true
                        }
                        arrayQueryQuantity.push(updateQuery)
                    }    
                    //console.log('Detalle agregado a Ot ', arrayQueryQuantity)
                    // Se agregan las estructuras al arbol de MongoDB ---
                    for (let n=0; n<arrayDetalleAddedToOt.length; n++) {
                        var detalleAddedToOt = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: {
                                    [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.otDetalles`]: arrayQueryQuantity[n]
                                }
                            },
                            { new: true }
                        )
                        //console.info('Detalle agregado a Ot ', detalleAddedToOt)
                    }

                    // Si se agrega correctamente los detalles a la OTOCI => true ---
                    if (detalleAddedToOt.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }

                } else {
                    console.error(`No se encontró la OT`)
                    return new Error(`No se encontró la OT`)
                }

            } catch (error) {
                console.error("Error MongoDB adding OCI to a Project: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la OCI al Proyecto!`)
        }
    }

    // Update Detail Data by Project Id
    async updateOtDetail(
        id,
        ociKNumber,
        otKNumber,
        detalleKNumber,
        statusDetalle,
        detalleOt,
        descripcionDetalle,
        userModificator,
        idDetalle
    ) {
        const idProjectTarget = id 
        if (id && idDetalle) {
            try {
                
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                let numberOciK = parseInt(ociKNumber)
                let numberOtK = parseInt(otKNumber)
                let numberDetalleK = parseInt(detalleKNumber)
                let booleanStatus
                statusDetalle=='on' ? booleanStatus=true : booleanStatus=false
                
                // const detalleData = await Proyectos.find({ "otDetalles._id.$oid": `${idDetalle}` },
                //     { "otDetalles.$": `${numberDetalleK}` })
                // console.log('detalleData: ', detalleData)

                // const todosLosDatosDetalle = await Proyectos.aggregate([
                //     { $unwind: "$otDetalles" },
                //     { $match: { "otDetalles._id.$oid": `${idDetalle}` } },
                //     { $project: { otDetalles: `${numberDetalleK}`, _id: 0 } }
                // ]);
                // console.log('todosLosDatosDetalle: ', todosLosDatosDetalle)

                if (itemMongoDB) {
                    var updatedDetail = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.numeroDetalle`]: detalleOt,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.descripcionDetalle`]: descripcionDetalle,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.statusDetalle`]: booleanStatus,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.modificator`]: userModificator,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.modifiedOn`]: formatDate(),
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedDetail.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        // console.log('itemUpdated...', itemUpdated)
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`DEtalle no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingDetalle: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el item del Proyecto!`)
        }
    }

    // Update Detail Status by Project Id
    async updateStatusOtDetail(
        id,
        ociKNumber,
        otKNumber,
        detalleKNumber,
        statusDetalle,
        userModificator,
        idDetalle
    ) {
        const idProjectTarget = id 
        if (id && idDetalle) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                let numberOciK = parseInt(ociKNumber)
                let numberOtK = parseInt(otKNumber)
                let numberDetalleK = parseInt(detalleKNumber)
                let booleanStatus
                statusDetalle=='Inactivo' ? booleanStatus=true : booleanStatus=false

                if (itemMongoDB) {
                    var updatedDetail = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.statusDetalle`]: booleanStatus,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.modificator`]: userModificator,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.modifiedOn`]: formatDate(),
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedDetail.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        console.log('itemUpdated...', itemUpdated)
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`DEtalle no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingDetalle: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el item del Proyecto!`)
        }
    }

    // Delete Detail by Project Id
    async deleteOtDetail(
        id,
        ociKNumber,
        otKNumber,
        detalleKNumber,
        userModificator,
        idDetalle
    ) {
        const idProjectTarget = id 
        if (id && idDetalle) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                
                let numberOciK = parseInt(ociKNumber)
                let numberOtK = parseInt(otKNumber)
                let numberDetalleK = parseInt(detalleKNumber)

                if (itemMongoDB) {
                    var updatedDetail = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.visible`]: Boolean(false),
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.statusDetalle`]: Boolean(false),
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.modificator`]: userModificator,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDetalles.${numberDetalleK}.modifiedOn`]: formatDate(),
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedDetail.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        console.log('itemUpdated...', itemUpdated)
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`DEtalle no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingDetalle: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el item del Proyecto!`)
        }
    }

    // Delete Oci
    async deleteOci(
            id, 
            project, 
            ociKNumber, 
            userModificator
        ) {
        const ociNumberK = parseInt(ociKNumber)
                
        if (id && project) {
            
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                if (itemMongoDB) {
                    
                    if(itemMongoDB.project[0].oci[ociNumberK].visible) {
                        // var deleteOci = await Proyectos.deleteOne(
                        var deleteOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    [`project.0.oci.${ociNumberK}.visible`]: Boolean(false),
                                    [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                    [`project.0.oci.${ociNumberK}.modifiedOn`]: formatDate(),
                                    [`project.0.modificator`]: userModificator,
                                    [`project.0.modifiedOn`]: formatDate(),
                                    modificator: userModificator,
                                    modifiedOn: formatDate()
                                }
                            },
                            { new: true }
                        )

                    } else {
                        var deleteOci = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    [`project.0.oci.${ociNumberK}.visible`]: Boolean(true),
                                    [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                    [`project.0.oci.${ociNumberK}.modifiedOn`]: formatDate(),
                                    [`project.0.modificator`]: userModificator,
                                    [`project.0.modifiedOn`]: formatDate(),
                                    modificator: userModificator,
                                    modifiedOn: formatDate()
                                }
                            },
                            { new: true }
                        )
                    }

                    if(deleteOci.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        return itemUpdated

                    } else {
                        return new Error(`No se eliminó la OCI del proyecto`)
                    }
                    
                } else {
                    return new Error(`OCI no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deletingOci from project: ", error)
            }

        } else {
            return new Error(`No se pudo eliminar la OCI!`)
        }
    }

    // Update Ot Data by Project Id
    async updateOt(
        id,
        project,
        ociKNumber,
        otNumber,
        otKNumber,
        opNumber,
        statusOt,
        otDescription,
        otDesign,
        otSimulation,
        otSupplier,
        userModificator
    ) {
        
        if (id && project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
            
                let numberOciK = parseInt(ociKNumber)
                let numberOt = parseInt(otNumber)
                let numberOtK = parseInt(otKNumber)
                let numberOp = parseInt(opNumber)
                let booleanStatus
                statusOt=='on' ? booleanStatus=true : booleanStatus=false
                
                if (itemMongoDB) {
                    var updatedOt = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otNumber`]: numberOt,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.opNumber`]: numberOp,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otStatus`]: booleanStatus,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.opDescription`]: otDescription,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otDesign`]: otDesign,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otSimulation`]: otSimulation,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.otSupplier`]: otSupplier,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.modificator`]: userModificator,
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.modifiedOn`]: formatDate()
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedOt.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`Ot no existe con este id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingOci: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
        }
    }

    // Delete Ot from Oci
    async deleteOt(
        id, 
        project, 
        ociKNumber,
        otKNumber,
        userModificator
    ) {
    const ociNumberK = parseInt(ociKNumber)
    const otNumberK = parseInt(otKNumber) 

    if (id && project) {
        
        try {
            const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
            
            if (itemMongoDB) {
                                
                if(itemMongoDB.project[0].oci[ociNumberK].otProject[otNumberK].visible) {
                    var deleteOt = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.visible`]: Boolean(false),
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: formatDate(),
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: formatDate(),
                                [`project.0.modificator`]: userModificator,
                                [`project.0.modifiedOn`]: formatDate(),
                                modificator: userModificator,
                                modifiedOn: formatDate()
                            }
                        },
                        { new: true }
                    )

                } else {
                    var deleteOt = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.visible`]: Boolean(true),
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: formatDate(),
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: formatDate(),
                                [`project.0.modificator`]: userModificator,
                                [`project.0.modifiedOn`]: formatDate(),
                                modificator: userModificator,
                                modifiedOn: formatDate()
                            }
                        },
                        { new: true }
                    )
                }

                if(deleteOt.acknowledged) {
                    const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                    return itemUpdated

                } else {
                    return new Error(`No se eliminó la OT del proyecto`)
                }
                
            } else {
                return new Error(`OT no existe con este id!`)
            }

        } catch (error) {
            console.error("Error MongoDB deletingOt from Oci: ", error)
        }

    } else {
        return new Error(`No se pudo eliminar la OT!`)
    }
    }

    async disconnet() {
        await this.disconnection
    }

}

module.exports = ProgramacionDaoMongoDB