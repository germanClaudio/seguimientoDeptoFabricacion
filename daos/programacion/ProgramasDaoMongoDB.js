const ContenedorMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Proyectos = require('../../models/proyectos.models.js')
const Clientes = require('../../models/clientes.models.js')
const Programas = require('../../models/programas.models.js')

let now = require('../../utils/formatDate.js')
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
        detalleNumberK,
        detalleQuantity,
        infoAddedToOt
    ){
        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)
        const detalleKNumber = parseInt(detalleNumberK)
        const quantityDetalle = parseInt(detalleQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                // console.log('itemMongoDB', itemMongoDB.project[0].oci[0])
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = []
                    let arrayStructureTree = []
                    let arrayTreeCreation = []
                    let countInfoAdded = 0
                    let countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${i}`].otDetalles[`${detalleKNumber}`]
                        // console.log('0.1-Dao-treeOtInformation----> ',treeOtInformation, ' i=',i)
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    }
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        for (let i = 0; i < quantityOt; i++) {
                            // Si no existe la extructura del arbol, se crea la estructura a agregar --
                            if (!arrayStructureTreeExists[i]) {
                                let estructuraACrear = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otDetalles`]:
                                    {
                                        otDistribucion: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otDetalles.0.otDistribucion`]:
                                    {
                                        mecanizado2dCompleto: infoAddedToOt[i].mecanizado2dCompleto,
                                        revisionMecanizado2dCompleto: infoAddedToOt[i].revisionMecanizado2dCompleto+1,
                                        mecanizado3dPrefinal: infoAddedToOt[i].mecanizado3dPrefinal,
                                        revisionMecanizado3dPrefinal: infoAddedToOt[i].revisionMecanizado3dPrefinal+1,
                                        mecanizado3dFinal: infoAddedToOt[i].mecanizado3dFinal,
                                        revisionMecanizado3dFinal: infoAddedToOt[i].revisionMecanizado3dFinal+1,
                                        bancoArmado: infoAddedToOt[i].bancoArmado,
                                        revisionBancoArmado: infoAddedToOt[i].revisionBancoArmado+1,
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoProcesoR14AddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoProcesoR14AddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoR14Length = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoR14.length)
                                if (otInfoR14Length > 0) {
                                    var procesoR14Initial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoR14[otInfoR14Length-1].procesoR14
                                    var revisionProcesoR14Initial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoR14[otInfoR14Length-1].revisionProcesoR14
                                    var aprobadoR14Initial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoR14[otInfoR14Length-1].aprobadoR14
                                    var revisionAprobadoR14Initial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoR14[otInfoR14Length-1].revisionAprobadoR14
                                } else {
                                    var procesoR14Initial = 'sinDato'
                                    var revisionProcesoR14Initial = 0
                                    var aprobadoR14Initial = 'sinDato'
                                    var revisionAprobadoR14Initial = 0
                                }

                                infoAddedToOt[i].procesoR14 == procesoR14Initial ?                            
                                    infoAddedToOt[i].revisionProcesoR14 = parseInt(revisionProcesoR14Initial)
                                :
                                    infoAddedToOt[i].revisionProcesoR14 = parseInt(revisionProcesoR14Initial+1)
                                

                                infoAddedToOt[i].aprobadoR14 == aprobadoR14Initial ?                                    
                                    infoAddedToOt[i].revisionAprobadoR14 = parseInt(revisionAprobadoR14Initial)
                                :
                                    infoAddedToOt[i].revisionAprobadoR14 = parseInt(revisionAprobadoR14Initial+1)

                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoR14`]:
                                    {
                                        procesoR14: infoAddedToOt[i].procesoR14,
                                        revisionProcesoR14: infoAddedToOt[i].revisionProcesoR14,
                                        aprobadoR14: infoAddedToOt[i].aprobadoR14,
                                        revisionAprobadoR14: infoAddedToOt[i].revisionAprobadoR14,
                                        creator: creatorInitial,
                                        timestamp: timestampInitial,
                                        modificator: infoAddedToOt[i].creator,
                                        modifiedOn: now
                                    }
                                }
                                    arrayQuantity.push(updateQuery)
                                    //console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
                    
                                    // var infoProcesoR14AddedToOt = 
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
                //console.log("Error MongoDB adding info R14 to OT: ", error)
                console.error("Error MongoDB adding info R14 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info R14 a la OT del Proyecto!`)
        }
    }


    // ***************** Add Info Proceso 3D to Ot's (New Version)----------------
    async addInfoProceso3dToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                // console.log('itemMongoDB', itemMongoDB.project[0].oci[0])
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = []
                    let arrayStructureTree = []
                    let arrayTreeCreation = []
                    let countInfoAdded = 0
                    let countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${i}`].otInformation
                        // console.log('0.1-Dao-treeOtInformation----> ',treeOtInformation, ' i=',i)
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    }
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        for (let i = 0; i < quantityOt; i++) {
                            // Si no existe la extructura del arbol, se crea la estructura a agregar --
                            if (!arrayStructureTreeExists[i]) {
                                let estructuraACrear = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation`]:
                                    {
                                        otInfoProceso: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoProceso`]:
                                    {
                                        proceso3d: infoAddedToOt[i].proceso3d,
                                        revisionProceso3d: infoAddedToOt[i].revisionProceso3d+1,
                                        horasProceso3d: infoAddedToOt[i].horasProceso3d,
                                        revisionHorasProceso3d: infoAddedToOt[i].revisionHorasProceso3d+1,
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoProceso3dAddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoProceso3dAddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoProceso3dLength = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoProceso.length)
                                if (otInfoProceso3dLength > 0) {
                                    var proceso3dInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoProceso[otInfoProceso3dLength-1].proceso3d
                                    var revisionProceso3dInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoProceso[otInfoProceso3dLength-1].revisionProceso3d
                                    var horasProceso3dInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoProceso[otInfoProceso3dLength-1].horasProceso3d
                                    var revisionHorasProceso3dInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoProceso[otInfoProceso3dLength-1].revisionHorasProceso3d
                                } else {
                                    var proceso3dInitial = 'sinDato'
                                    var revisionProceso3dInitial = 0
                                    var horasProceso3dInitial = 'sinDato'
                                    var revisionHorasProceso3dInitial = 0
                                }

                                infoAddedToOt[i].proceso3d == proceso3dInitial ?                            
                                    infoAddedToOt[i].revisionProceso3d = parseInt(revisionProceso3dInitial)
                                :
                                    infoAddedToOt[i].revisionProceso3d = parseInt(revisionProceso3dInitial+1)
                                

                                infoAddedToOt[i].horasProceso3d == horasProceso3dInitial ?                                    
                                    infoAddedToOt[i].revisionHorasProceso3d = parseInt(revisionHorasProceso3dInitial)
                                :
                                    infoAddedToOt[i].revisionHorasProceso3d = parseInt(revisionHorasProceso3dInitial+1)

                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoProceso`]:
                                    {
                                        proceso3d: infoAddedToOt[i].proceso3d,
                                        revisionProceso3d: infoAddedToOt[i].revisionProceso3d,
                                        horasProceso3d: infoAddedToOt[i].horasProceso3d,
                                        revisionHorasProceso3d: infoAddedToOt[i].revisionHorasProceso3d,
                                        creator: creatorInitial,
                                        timestamp: timestampInitial,
                                        modificator: infoAddedToOt[i].creator,
                                        modifiedOn: now
                                    }
                                }
                                    arrayQuantity.push(updateQuery)
                                    //console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
                    
                                    // var infoProcesoR14AddedToOt = 
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
                //console.log("Error MongoDB adding info Proceso 3d to OT: ", error)
                console.error("Error MongoDB adding info Proceso 3d to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Proceso 3d a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info Avance Diseno Primera Parte to Ot's ----------------
    async addInfoDisenoPrimeraToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                // console.log('itemMongoDB', itemMongoDB.project[0].oci[0])
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = []
                    let arrayStructureTree = []
                    let arrayTreeCreation = []
                    let countInfoAdded = 0
                    let countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${i}`].otInformation
                        // console.log('0.1-Dao-treeOtInformation----> ',treeOtInformation, ' i=',i)
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    }
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        for (let i = 0; i < quantityOt; i++) {
                            // Si no existe la extructura del arbol, se crea la estructura a agregar --
                            if (!arrayStructureTreeExists[i]) {
                                let estructuraACrear = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation`]:
                                    {
                                        otInfoDisenoPrimera: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoDisenoPrimera`]:
                                    {
                                        avDiseno: infoAddedToOt[i].avDiseno,
                                        revisionAvDiseno: infoAddedToOt[i].revisionAvDiseno+1,
                                        avDiseno50: infoAddedToOt[i].avDiseno50,
                                        revisionAvDiseno50: infoAddedToOt[i].revisionAvDiseno50+1,
                                        avDiseno80: infoAddedToOt[i].avDiseno80,
                                        revisionAvDiseno80: infoAddedToOt[i].revisionAvDiseno80+1,
                                        envioCliente: infoAddedToOt[i].envioCliente,
                                        revisionEnvioCliente: infoAddedToOt[i].revisionEnvioCliente+1,
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoDisenoPrimeraAddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoDisenoPrimeraAddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoDisenoPrimeraLength = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera.length)
                                if (otInfoDisenoPrimeraLength > 0) {
                                    var avDisenoInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1].avDiseno
                                    var revisionAvDisenoInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1].revisionAvDiseno
                                    var avDiseno50Initial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1].avDiseno50
                                    var revisionAvDiseno50Initial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1].revisionAvDiseno50
                                    var avDiseno80Initial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1].avDiseno80
                                    var revisionAvDiseno80Initial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1].revisionAvDiseno80
                                    var envioClienteInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1].envioCliente
                                    var revisionEnvioClienteInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1].revisionEnvioCliente
                                } else {
                                    var avDisenoInitial = 0
                                    var revisionAvDisenoInitial = 0
                                    var avDiseno50Initial = 'sinDato'
                                    var revisionAvDiseno50Initial = 0
                                    var avDiseno80Initial = 'sinDato'
                                    var revisionAvDiseno80Initial = 0
                                    var envioClienteInitial = 'sinDato'
                                    var revisionEnvioClienteInitial = 0
                                }

                                infoAddedToOt[i].avDiseno == avDisenoInitial ?                            
                                    infoAddedToOt[i].revisionAvDiseno = parseInt(revisionAvDisenoInitial)
                                :
                                    infoAddedToOt[i].revisionAvDiseno = parseInt(revisionAvDisenoInitial)+1
                                
                                infoAddedToOt[i].avDiseno50 == avDiseno50Initial ?                                    
                                    infoAddedToOt[i].revisionAvDiseno50 = parseInt(revisionAvDiseno50Initial)
                                :
                                    infoAddedToOt[i].revisionAvDiseno50 = parseInt(revisionAvDiseno50Initial)+1

                                infoAddedToOt[i].avDiseno80 == avDiseno80Initial ?                                    
                                    infoAddedToOt[i].revisionAvDiseno80 = parseInt(revisionAvDiseno80Initial)
                                :
                                    infoAddedToOt[i].revisionAvDiseno80 = parseInt(revisionAvDiseno80Initial)+1

                                infoAddedToOt[i].envioCliente == envioClienteInitial ?                                    
                                    infoAddedToOt[i].revisionEnvioCliente = parseInt(revisionEnvioClienteInitial)
                                :
                                    infoAddedToOt[i].revisionEnvioCliente = parseInt(revisionEnvioClienteInitial)+1


                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoDisenoPrimera`]:
                                    {
                                        avDiseno: infoAddedToOt[i].avDiseno,
                                        revisionAvDiseno: infoAddedToOt[i].revisionAvDiseno,
                                        avDiseno50: infoAddedToOt[i].avDiseno50,
                                        revisionAvDiseno50: infoAddedToOt[i].revisionAvDiseno50,
                                        avDiseno80: infoAddedToOt[i].avDiseno80,
                                        revisionAvDiseno80: infoAddedToOt[i].revisionAvDiseno80,
                                        envioCliente: infoAddedToOt[i].envioCliente,
                                        revisionEnvioCliente: infoAddedToOt[i].revisionEnvioCliente,
                                        creator: creatorInitial,
                                        timestamp: timestampInitial,
                                        modificator: infoAddedToOt[i].creator,
                                        modifiedOn: now
                                    }
                                }
                                    arrayQuantity.push(updateQuery)
                                    //console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
                    
                                    // var infoProcesoR14AddedToOt = 
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
                //console.log("Error MongoDB adding info Avance Diseno Primera to OT: ", error)
                console.error("Error MongoDB adding info Proceso 3d to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Avance Diseno Primera a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info Avance Diseno Segunda Parte to Ot's ----------------
    async addInfoDisenoSegundaToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                // console.log('itemMongoDB', itemMongoDB.project[0].oci[0])
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = []
                    let arrayStructureTree = []
                    let arrayTreeCreation = []
                    let countInfoAdded = 0
                    let countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${i}`].otInformation
                        // console.log('0.1-Dao-treeOtInformation----> ',treeOtInformation, ' i=',i)
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    }
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        for (let i = 0; i < quantityOt; i++) {
                            // Si no existe la extructura del arbol, se crea la estructura a agregar --
                            if (!arrayStructureTreeExists[i]) {
                                let estructuraACrear = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation`]:
                                    {
                                        otInfoDisenoSegunda: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoDisenoSegunda`]:
                                    {
                                        avDiseno100: infoAddedToOt[i].av100Diseno,
                                        revisionAvDiseno100: infoAddedToOt[i].revisionAv100Diseno+1,
                                        revisionCliente: infoAddedToOt[i].revisionCliente,
                                        revisionRevisionCliente: infoAddedToOt[i].revisionRevisionCliente+1,
                                        ldmProvisoria: infoAddedToOt[i].ldmProvisoria,
                                        revisionLdmProvisoria: infoAddedToOt[i].revisionLdmProvisoria+1,
                                        aprobadoCliente: infoAddedToOt[i].aprobadoCliente,
                                        revisionAprobadoCliente: infoAddedToOt[i].revisionAprobadoCliente+1,
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoDisenoSegundaAddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoDisenoSegundaAddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoDisenoSegundaLength = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda.length)
                                if (otInfoDisenoSegundaLength > 0) {
                                    var av100DisenoInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1].avDiseno100
                                    var revisionAv100DisenoInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1].revisionAvDiseno100
                                    var revisionClienteInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1].revisionCliente
                                    var revisionRevisionClienteInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1].revisionRevisionCliente
                                    var ldmProvisoriaInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1].ldmProvisoria
                                    var revisionLdmProvisoriaInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1].revisionLdmProvisoria
                                    var aprobadoClienteInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1].aprobadoCliente
                                    var revisionAprobadoClienteInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1].revisionAprobadoCliente
                                } else {
                                    var av100DisenoInitial = 0
                                    var revisionAv100DisenoInitial = 0
                                    var revisionClienteInitial = 'sinDato'
                                    var revisionRevisionClienteInitial = 0
                                    var ldmProvisoriaInitial = 'sinDato'
                                    var revisionLdmProvisoriaInitial = 0
                                    var aprobadoClienteInitial = 'sinDato'
                                    var revisionAprobadoClienteInitial = 0
                                }

                                infoAddedToOt[i].av100Diseno == av100DisenoInitial ?                            
                                    infoAddedToOt[i].revisionAv100Diseno = parseInt(revisionAv100DisenoInitial)
                                :
                                    infoAddedToOt[i].revisionAv100Diseno = parseInt(revisionAv100DisenoInitial)+1
                                
                                infoAddedToOt[i].revisionCliente == revisionClienteInitial ?                                    
                                    infoAddedToOt[i].revisionRevisionCliente = parseInt(revisionRevisionClienteInitial)
                                :
                                    infoAddedToOt[i].revisionRevisionCliente = parseInt(revisionRevisionClienteInitial)+1

                                infoAddedToOt[i].ldmProvisoria == ldmProvisoriaInitial ?                                    
                                    infoAddedToOt[i].revisionLdmProvisoria = parseInt(revisionLdmProvisoriaInitial)
                                :
                                    infoAddedToOt[i].revisionLdmProvisoria = parseInt(revisionLdmProvisoriaInitial)+1

                                infoAddedToOt[i].aprobadoCliente == aprobadoClienteInitial ?                                    
                                    infoAddedToOt[i].revisionAprobadoCliente = parseInt(revisionAprobadoClienteInitial)
                                :
                                    infoAddedToOt[i].revisionAprobadoCliente = parseInt(revisionAprobadoClienteInitial)+1


                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoDisenoSegunda`]:
                                    {
                                        avDiseno100: infoAddedToOt[i].av100Diseno,
                                        revisionAvDiseno100: infoAddedToOt[i].revisionAv100Diseno,
                                        revisionCliente: infoAddedToOt[i].revisionCliente,
                                        revisionRevisionCliente: infoAddedToOt[i].revisionRevisionCliente,
                                        ldmProvisoria: infoAddedToOt[i].ldmProvisoria,
                                        revisionLdmProvisoria: infoAddedToOt[i].revisionLdmProvisoria,
                                        aprobadoCliente: infoAddedToOt[i].aprobadoCliente,
                                        revisionAprobadoCliente: infoAddedToOt[i].revisionAprobadoCliente,
                                        creator: creatorInitial,
                                        timestamp: timestampInitial,
                                        modificator: infoAddedToOt[i].creator,
                                        modifiedOn: now
                                    }
                                }
                                    arrayQuantity.push(updateQuery)
                                    //console.log('5-Dao-arrayQuantity-- ', i,' - ', arrayQuantity)
                    
                                    // var infoProcesoR14AddedToOt = 
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
                //console.log("Error MongoDB adding info Avance Diseno Segunda Parte to OT: ", error)
                console.error("Error MongoDB adding info Avance Diseno Segunda Parte to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Avance Diseno Segunda Parte a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info 80% to Ot's ----------------
    async addInfo80ToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

        const ociKNumber = parseInt(ociNumberK) || 0
        const quantityOt = parseInt(otQuantity)

        // compara si el proyecto existe --------
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                // console.log('itemMongoDB', itemMongoDB.project[0].oci[0])
                
                // Si encontro el proyecto en la BBDD ----- 
                if (itemMongoDB) {
                    let arrayQuantity = []
                    let arrayStructureTree = []
                    let arrayTreeCreation = []
                    let countInfoAdded = 0
                    let countTreeCreation = 0

                    //Se verifica si la estructura del arbol existe en la BBDD -----
                    let arrayStructureTreeExists = []
                    for (let i = 0; i < quantityOt; i++) {
                        const treeOtInformation = itemMongoDB.project[0].oci[`${ociKNumber}`].otProject[`${i}`].otInformation
                        // console.log('0.1-Dao-treeOtInformation----> ',treeOtInformation, ' i=',i)
                        treeOtInformation ? arrayStructureTreeExists.push(true) : arrayStructureTreeExists.push(false)
                    }
                        // console.log('0.2-Dao-arrayStructureTreeExists----> ',arrayStructureTreeExists)

                        for (let i = 0; i < quantityOt; i++) {
                            // Si no existe la extructura del arbol, se crea la estructura a agregar --
                            if (!arrayStructureTreeExists[i]) {
                                let estructuraACrear = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation`]:
                                    {
                                        otInfoInfo80: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.OtInfoInfo80`]:
                                    {
                                        ldmAvanceCG: infoAddedToOt[i].ldmAvanceCG,
                                        revisionLdmAvanceCG: infoAddedToOt[i].revisionLdmAvanceCG+1,
                                        ldmAvanceTD2: infoAddedToOt[i].ldmAvanceTD2,
                                        revisionLdmAvanceTD2: infoAddedToOt[i].revisionLdmAvanceTD2+1,
                                        ldm80: infoAddedToOt[i].ldm80,
                                        revisionLdm80: infoAddedToOt[i].revisionLdm80+1,
                                        infoModelo: infoAddedToOt[i].infoModelo,
                                        revisionInfoModelo: infoAddedToOt[i].revisionInfoModelo+1,
                                        
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var info80AddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', info80AddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoInfo80Length = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoInfo80.length)
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoInfo80[otInfoInfo80Length-1]

                                if (otInfoInfo80Length > 0) {
                                    var ldmAvanceCGInitial = pathToMongoDB.ldmAvanceCG
                                    var revisionLdmAvanceCGInitial = pathToMongoDB.revisionLdmAvanceCG
                                    var ldmAvanceTD2Initial = pathToMongoDB.ldmAvanceTD2
                                    var revisionLdmAvanceTD2Initial = pathToMongoDB.revisionLdmAvanceTD2
                                    var ldm80Initial = pathToMongoDB.ldm80
                                    var revisionLdm80Initial = pathToMongoDB.revisionLdm80
                                    var infoModeloInitial = pathToMongoDB.infoModelo
                                    var revisionInfoModeloInitial = pathToMongoDB.revisionInfoModelo
                                } else {
                                    var ldmAvanceCGInitial = 'noAplica'
                                    var revisionLdmAvanceCGInitial = 0
                                    var ldmAvanceTD2Initial = 'noAplica'
                                    var revisionLdmAvanceTD2Initial = 0
                                    var ldm80Initial = 0
                                    var revisionLdm80Initial = 0
                                    var infoModeloInitial = 0
                                    var revisionInfoModeloInitial = 0
                                }

                                infoAddedToOt[i].ldmAvanceCG == ldmAvanceCGInitial ?                            
                                    infoAddedToOt[i].revisionLdmAvanceCG = parseInt(revisionLdmAvanceCGInitial)
                                :
                                    infoAddedToOt[i].revisionLdmAvanceCG = parseInt(revisionLdmAvanceCGInitial)+1
                                
                                infoAddedToOt[i].ldmAvanceTD2 == ldmAvanceTD2Initial ?                                    
                                    infoAddedToOt[i].revisionLdmAvanceTD2 = parseInt(revisionLdmAvanceTD2Initial)
                                :
                                    infoAddedToOt[i].revisionLdmAvanceTD2 = parseInt(revisionLdmAvanceTD2Initial)+1

                                infoAddedToOt[i].ldm80 == ldm80Initial ?                                    
                                    infoAddedToOt[i].revisionLdm80 = parseInt(revisionLdm80Initial)
                                :
                                    infoAddedToOt[i].revisionLdm80 = parseInt(revisionLdm80Initial)+1

                                infoAddedToOt[i].infoModelo == infoModeloInitial ?                                    
                                    infoAddedToOt[i].revisionInfoModelo = parseInt(revisionInfoModeloInitial)
                                :
                                    infoAddedToOt[i].revisionInfoModelo = parseInt(revisionInfoModeloInitial)+1


                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoInfo80`]:
                                    {
                                        ldmAvanceCG: infoAddedToOt[i].ldmAvanceCG,
                                        revisionLdmAvanceCG: infoAddedToOt[i].revisionLdmAvanceCG,
                                        ldmAvanceTD2: infoAddedToOt[i].ldmAvanceTD2,
                                        revisionLdmAvanceTD2: infoAddedToOt[i].revisionLdmAvanceTD2,
                                        ldm80: infoAddedToOt[i].ldm80,
                                        revisionLdm80: infoAddedToOt[i].revisionLdm80,
                                        infoModelo: infoAddedToOt[i].infoModelo,
                                        revisionInfoModelo: infoAddedToOt[i].revisionInfoModelo,
                                        
                                        creator: creatorInitial,
                                        timestamp: timestampInitial,
                                        modificator: infoAddedToOt[i].creator,
                                        modifiedOn: now
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
                //console.log("Error MongoDB adding info 80% to OT: ", error)
                console.error("Error MongoDB adding info 80% to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info 80% a la OT del Proyecto!`)
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
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now, 
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: now
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
        const ot_Quantity = parseInt(otQuantity)
        const idProjectTarget = projectId 
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                if (itemMongoDB) {

                    let arrayQueryQuantity = []
                    for (let i = 0; i < ot_Quantity; i++) {                            
                        let updateQuery = {
                                numeroDetalle: arrayDetalleAddedToOt[i].detalleNumber,
                                descripcionDetalle: arrayDetalleAddedToOt[i].detalleDescription,
                                statusDetalle: arrayDetalleAddedToOt[i].detalleStatus,
                                creator: arrayDetalleAddedToOt[i].creator,
                                timestamp: now,
                                modificator: arrayDetalleAddedToOt[i].modificator,
                                modifiedOn: '',
                                visible: true
                        }
                        arrayQueryQuantity.push(updateQuery)
                    }    
                    console.log('Detalle agregado a Ot ', arrayQueryQuantity)
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
                        console.info('Detalle agregado a Ot ', detalleAddedToOt)
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
                                timestamp: now,
                                modificator: arrayDetalleAddedToOt[i].modificator,
                                modifiedOn: '',
                                visible: true
                        }
                        arrayQueryQuantity.push(updateQuery)
                    }    
                    console.log('Detalle agregado a Ot ', arrayQueryQuantity)
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
                        console.info('Detalle agregado a Ot ', detalleAddedToOt)
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

    // Update Project Data by Project Id
    async updateProject(
        id,
        project,
        statusProject,
        projectName,
        projectDescription,
        prioProject,
        levelProject,
        codeProject,
        imageProject,
        userModificator
    ) {
        
        if (id && project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                let booleanStatus
                statusProject == 'on' ? booleanStatus = true : booleanStatus = false
                imageProject ? imageProject : itemMongoDB.project[0].imageProject

                if (itemMongoDB) {
                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                'project.0.projectName': projectName,
                                'project.0.projectDescription': projectDescription,
                                'project.0.prioProject': prioProject,
                                'project.0.imageProject': imageProject,
                                'project.0.codeProject': codeProject,
                                'project.0.statusProject': booleanStatus,
                                'project.0.levelProject': levelProject,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${itemUpdated._id}`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingProject: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
        }
    }

    // Update Oci Data by Project Id
    async updateOci(
        id,
        project,
        statusOci,
        ociDescription,
        ociAlias,
        ociNumber,
        ociKNumber,
        ociImage,
        userModificator
    ) {

        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                let numberOciK = parseInt(ociKNumber)
                let numberOci = parseInt(ociNumber)
                let booleanStatus
                statusOci=='on' ? booleanStatus=true : booleanStatus=false
                ociImage ? ociImage : itemMongoDB.project[0].oci[numberOciK].ociImage

                if (itemMongoDB) {
                    
                    var updatedOci = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${numberOciK}.ociNumber`]: numberOci,
                                [`project.0.oci.${numberOciK}.ociDescription`]: ociDescription,
                                [`project.0.oci.${numberOciK}.ociAlias`]: ociAlias,
                                [`project.0.oci.${numberOciK}.ociStatus`]: booleanStatus,
                                [`project.0.oci.${numberOciK}.ociImage`]: ociImage,
                                [`project.0.oci.${numberOciK}.modificator`]: userModificator,
                                [`project.0.oci.${numberOciK}.modifiedOn`]: now
                            }
                        },
                        { new: true }
                    )
                    
                    if(updatedOci.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        //console.log('itemUpdated...', itemUpdated)
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }
                    
                } else {
                    return new Error(`Oci no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingOci: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
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
                                    [`project.0.oci.${ociNumberK}.modifiedOn`]: now,
                                    [`project.0.modificator`]: userModificator,
                                    [`project.0.modifiedOn`]: now,
                                    modificator: userModificator,
                                    modifiedOn: now
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
                                    [`project.0.oci.${ociNumberK}.modifiedOn`]: now,
                                    [`project.0.modificator`]: userModificator,
                                    [`project.0.modifiedOn`]: now,
                                    modificator: userModificator,
                                    modifiedOn: now
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
                                [`project.0.oci.${numberOciK}.otProject.${numberOtK}.modifiedOn`]: now
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
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: now,
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now,
                                [`project.0.modificator`]: userModificator,
                                [`project.0.modifiedOn`]: now,
                                modificator: userModificator,
                                modifiedOn: now
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
                                [`project.0.oci.${ociNumberK}.otProject.${otNumberK}.modifiedOn`]: now,
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now,
                                [`project.0.modificator`]: userModificator,
                                [`project.0.modifiedOn`]: now,
                                modificator: userModificator,
                                modifiedOn: now
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

    // Delete Project by Project Id
    async deleteProjectById(id, project, userModificator) {
                        
        if (id) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                //console.log('itemMongoDB...', itemMongoDB)
                if (itemMongoDB) {
                    
                    if(itemMongoDB.project[0].visible) {
                        var deleteProject = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    'project.0.visible': Boolean(false),
                                    'project.0.modificator': userModificator,
                                    'project.0.modifiedOn': now,
                                    modificator: userModificator,
                                    modifiedOn: now
                                }
                            },
                            { new: true }
                        )

                    } else {
                        var deleteProject = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    'project.0.visible': Boolean(true),
                                    'project.0.modificator': userModificator,
                                    'project.0.modifiedOn': now,
                                    modificator: userModificator,
                                    modifiedOn: now
                                }
                            },
                            { new: true }
                        )
                    }

                    if(deleteProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        return itemUpdated

                    } else {
                        return new Error(`No se eliminó el proyecto`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deletingProject: ", error)
            }

        } else {
            return new Error(`No se pudo eliminar el Proyecto!`)
        }
    }

    async disconnet() {
        await this.disconnection
    }

}

module.exports = ProgramacionDaoMongoDB