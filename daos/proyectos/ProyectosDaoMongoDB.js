const ContenedorMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Proyectos = require('../../models/proyectos.models.js')
const Clientes = require('../../models/clientes.models.js')

let now = require('../../utils/formatDate.js')

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000}

class ProyectosDaoMongoDB extends ContenedorMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        // await this.connection
        mongoose.connect(this.cnxStr, advancedOptions) //createConnection or connect
    }

    // get all Projects form DB ----------------
    async getAllProjects() {
        try {
            const projects = await Proyectos.find()
            
            if (projects === undefined || projects === null) {
                return new Error('No hay proyectos cargados en ningún cliente!')
            } else {
                return projects
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

    // Create a New project ----------------------
    async createNewProject(project) {
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findOne({ projectName: `${project.name}` })
                if (itemMongoDB) {
                    // console.error("Proyecto con Nombre existente!! ")
                    return false
                } else {
                    const newProject = new Proyectos(project)
                    await newProject.save()
                    // console.info('Project created')
                    return newProject
                }
            } catch (error) {
                console.error("Error MongoDB createProject: ", error)
            }
        } else {
            return new Error(`No se pudo crear el Proyecto!`)
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

    // Get all OCI from all projects -----------
    async getAllOciNumbers() {
        try {
            const ocis = await Proyectos.find(
                'project.0.oci.' 
            )
            console.log('ocis: ', ocis)    
            if (ocis === undefined || ocis === null) {
                    return new Error('No hay ocis cargadas en este proyecto!')
            } else {
                return ocis
            }

        } catch (error) {
            console.error("Error MongoDB getAllOciNumbers: ", error)
            return new Error('No hay ocis en la DB!')
        }
    }

    // Select one OCI by Oci Number and k OCI number----------------
    async selectOciByOciNumber(numberOci, ociKNumber) {
        const numberOciParsed = parseInt(numberOci)
        const numberKOciParsed = parseInt(ociKNumber)

        if (numberOciParsed) {
            try {
                const project = await Proyectos.find({
                    [`project.0.oci.${numberKOciParsed}.ociNumber`]: numberOciParsed
                })
                return project ? numberOciParsed : null

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

    // Select one OT by OT Number and k OT number----------------
    async selectOtByOtNumber(numberOt, otKNumber, ociKNumber) {
        const numberKOciParsed = parseInt(ociKNumber)
        const numberOtParsed = parseInt(numberOt)
        const numberKOtParsed = parseInt(otKNumber)

        if (numberOtParsed) {
            try {
                const project = await Proyectos.find({
                    [`project.0.oci.${numberKOciParsed}.otProject.${numberKOtParsed}.otNumber`]: numberOtParsed
                })
                return project ? numberOtParsed : null

            } catch (error) {
                console.error("Error MongoDB selectOtByOtNumber: ", error)
            }

        } else {
            try {
                const projects = await Proyectos.find()
                return projects
            } catch (error) {
                console.error("Error MongoDB selectOtByOtNumber: ", error)
            }
        }
    }

    async getExistingProject(projectInput, projectCodeInput) {
                
        if (projectInput && projectCodeInput) {
            const existingProject = await Proyectos.findOne(
                { $or: [ {projectName: `${projectInput}`},
                         {codeProject: `${projectCodeInput}`}
                        ]
                }
            );

            if (existingProject) {
                return existingProject
                
            } else {
                return false
            }

        } else {
            return new Error (`No se pudo encontrar el Proyecto!`)
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

    // Add Info R14 to Ot's (Update 2-4-2024)----------------
    async addInfoR14ToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

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
                                        otInfoR14: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoR14`]:
                                    {
                                        procesoR14: infoAddedToOt[i].procesoR14,
                                        revisionProcesoR14: infoAddedToOt[i].revisionProcesoR14+1,
                                        aprobadoR14: infoAddedToOt[i].aprobadoR14,
                                        revisionAprobadoR14: infoAddedToOt[i].revisionAprobadoR14+1,
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
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
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoR14[otInfoR14Length-1]
                                
                                if (otInfoR14Length > 0) {
                                    var procesoR14Initial = pathToMongoDB.procesoR14
                                    var revisionProcesoR14Initial = pathToMongoDB.revisionProcesoR14
                                    var aprobadoR14Initial = pathToMongoDB.aprobadoR14
                                    var revisionAprobadoR14Initial = pathToMongoDB.revisionAprobadoR14
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
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoProceso[otInfoProceso3dLength-1]
                                
                                if (otInfoProceso3dLength > 0) {
                                    var proceso3dInitial = pathToMongoDB.proceso3d
                                    var revisionProceso3dInitial = pathToMongoDB.revisionProceso3d
                                    var horasProceso3dInitial = pathToMongoDB.horasProceso3d
                                    var revisionHorasProceso3dInitial = pathToMongoDB.revisionHorasProceso3d
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
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoPrimera[otInfoDisenoPrimeraLength-1]
                                
                                if (otInfoDisenoPrimeraLength > 0) {
                                    var avDisenoInitial = pathToMongoDB.avDiseno
                                    var revisionAvDisenoInitial = pathToMongoDB.revisionAvDiseno
                                    var avDiseno50Initial = pathToMongoDB.avDiseno50
                                    var revisionAvDiseno50Initial = pathToMongoDB.revisionAvDiseno50
                                    var avDiseno80Initial = pathToMongoDB.avDiseno80
                                    var revisionAvDiseno80Initial = pathToMongoDB.revisionAvDiseno80
                                    var envioClienteInitial = pathToMongoDB.envioCliente
                                    var revisionEnvioClienteInitial = pathToMongoDB.revisionEnvioCliente
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

                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoDisenoSegunda[otInfoDisenoSegundaLength-1]

                                if (otInfoDisenoSegundaLength > 0) {
                                    var av100DisenoInitial = pathToMongoDB.avDiseno100
                                    var revisionAv100DisenoInitial = pathToMongoDB.revisionAvDiseno100
                                    var revisionClienteInitial = pathToMongoDB.revisionCliente
                                    var revisionRevisionClienteInitial = pathToMongoDB.revisionRevisionCliente
                                    var ldmProvisoriaInitial = pathToMongoDB.ldmProvisoria
                                    var revisionLdmProvisoriaInitial = pathToMongoDB.revisionLdmProvisoria
                                    var aprobadoClienteInitial = pathToMongoDB.aprobadoCliente
                                    var revisionAprobadoClienteInitial = pathToMongoDB.revisionAprobadoCliente
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoInfo80`]:
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

    // ***************** Add Info 100% to Ot's ----------------
    async addInfo100ToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

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
                                        otInfoInfo100: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoInfo100`]:
                                    {
                                        ldm100: infoAddedToOt[i].ldm100,
                                        revisionLdm100: infoAddedToOt[i].revisionLdm100+1,
                                        info100: infoAddedToOt[i].info100,
                                        revisionInfo100: infoAddedToOt[i].revisionInfo100+1,
                                        
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var info100AddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', info100AddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoInfo100Length = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoInfo100.length)
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoInfo100[otInfoInfo100Length-1]

                                if (otInfoInfo100Length > 0) {
                                    var ldm100Initial = pathToMongoDB.ldm100
                                    var revisionLdm100Initial = pathToMongoDB.revisionLdm100
                                    var info100Initial = pathToMongoDB.info100
                                    var revisionInfo100Initial = pathToMongoDB.revisionInfo100
                                } else {
                                    var ldm100Initial = 0
                                    var revisionLdm100Initial = 0
                                    var info100Initial = 0
                                    var revisionInfo100Initial = 0
                                }

                                infoAddedToOt[i].ldm100 == ldm100Initial ?                                    
                                    infoAddedToOt[i].revisionLdm100 = parseInt(revisionLdm100Initial)
                                :
                                    infoAddedToOt[i].revisionLdm100 = parseInt(revisionLdm100Initial)+1

                                infoAddedToOt[i].info100 == info100Initial ?                                    
                                    infoAddedToOt[i].revisionInfo100 = parseInt(revisionInfo100Initial)
                                :
                                    infoAddedToOt[i].revisionInfo100 = parseInt(revisionInfo100Initial)+1


                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoInfo100`]:
                                    {
                                        ldm100: infoAddedToOt[i].ldm100,
                                        revisionLdm100: infoAddedToOt[i].revisionLdm100,
                                        info100: infoAddedToOt[i].info100,
                                        revisionInfo100: infoAddedToOt[i].revisionInfo100,
                                        
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
                //console.log("Error MongoDB adding info 100% to OT: ", error)
                console.error("Error MongoDB adding info 100% to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info 100% a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info Simulacion 0 to Ot's ----------------
    async addInfoSim0ToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

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
                                        otInfoSim0: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim0`]:
                                    {
                                        sim0: infoAddedToOt[i].sim0,
                                        revisionSim0: infoAddedToOt[i].revisionSim0+1,
                                        docuSim0: infoAddedToOt[i].docuSim0,
                                        revisionDocuSim0: infoAddedToOt[i].revisionDocuSim0+1,
                                        
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoSim0AddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoSim0AddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoSim0Length = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim0.length)
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim0[otInfoSim0Length-1]

                                if (otInfoSim0Length > 0) {
                                    var sim0Initial = pathToMongoDB.sim0
                                    var revisionSim0Initial = pathToMongoDB.revisionSim0
                                    var docuSim0Initial = pathToMongoDB.docuSim0
                                    var revisionDocuSim0Initial = pathToMongoDB.revisionDocuSim0
                                } else {
                                    var sim0Initial = 'sinDato'
                                    var revisionSim0Initial = 0
                                    var docuSim0Initial = 'sinDato'
                                    var revisionDocuSim0Initial = 0
                                }

                                infoAddedToOt[i].sim0 == sim0Initial ?                                    
                                    infoAddedToOt[i].revisionSim0 = parseInt(revisionSim0Initial)
                                :
                                    infoAddedToOt[i].revisionSim0 = parseInt(revisionSim0Initial)+1

                                infoAddedToOt[i].docuSim0 == docuSim0Initial ?                                    
                                    infoAddedToOt[i].revisionDocuSim0 = parseInt(revisionDocuSim0Initial)
                                :
                                    infoAddedToOt[i].revisionDocuSim0 = parseInt(revisionDocuSim0Initial)+1


                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim0`]:
                                    {
                                        sim0: infoAddedToOt[i].sim0,
                                        revisionSim0: infoAddedToOt[i].revisionSim0,
                                        docuSim0: infoAddedToOt[i].docuSim0,
                                        revisionDocuSim0: infoAddedToOt[i].revisionDocuSim0,
                                        
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
                //console.log("Error MongoDB adding info Sim0 to OT: ", error)
                console.error("Error MongoDB adding info Sim0 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Sim0 a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info Simulacion 1 to Ot's ----------------
    async addInfoSim1ToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

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
                                        otInfoSim1: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim1`]:
                                    {
                                        sim1: infoAddedToOt[i].sim1,
                                        revisionSim1: infoAddedToOt[i].revisionSim1+1,
                                        video: infoAddedToOt[i].video,
                                        revisionVideo: infoAddedToOt[i].revisionVideo+1,
                                        informe: infoAddedToOt[i].informe,
                                        revisionInforme: infoAddedToOt[i].revisionInforme+1,
                                        ppt: infoAddedToOt[i].ppt,
                                        revisionPpt: infoAddedToOt[i].revisionPpt+1,
                                        s1pOp20: infoAddedToOt[i].s1pOp20,
                                        revisionS1pOp20: infoAddedToOt[i].revisionS1pOp20+1,
                                        
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoSim1AddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoSim1AddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoSim1Length = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim1.length)
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim1[otInfoSim1Length-1]

                                if (otInfoSim1Length > 0) {
                                    var sim1Initial = pathToMongoDB.sim1
                                    var revisionSim1Initial = pathToMongoDB.revisionSim1
                                    var videoInitial = pathToMongoDB.video
                                    var revisionVideoInitial = pathToMongoDB.revisionVideo
                                    var informeInitial = pathToMongoDB.informe
                                    var revisionInformeInitial = pathToMongoDB.revisionInforme
                                    var pptInitial = pathToMongoDB.ppt
                                    var revisionPptInitial = pathToMongoDB.revisionPpt
                                    var s1pOp20Initial = pathToMongoDB.s1pOp20
                                    var revisionS1pOp20Initial = pathToMongoDB.revisionS1pOp20

                                } else {
                                    var sim1Initial = 'sinDato'
                                    var revisionSim1Initial = 0
                                    var videoInitial = 'sinDato'
                                    var revisionVideoInitial = 0
                                    var informeInitial = 'sinDato'
                                    var revisionInformeInitial = 0
                                    var pptInitial = 'sinDato'
                                    var revisionPptInitial = 0
                                    var s1pOp20Initial = 'sinDato'
                                    var revisionS1pOp20Initial = 0
                                }

                                infoAddedToOt[i].sim1 == sim1Initial ?                                    
                                    infoAddedToOt[i].revisionSim1 = parseInt(revisionSim1Initial)
                                :
                                    infoAddedToOt[i].revisionSim1 = parseInt(revisionSim1Initial)+1

                                infoAddedToOt[i].video == videoInitial ?                                    
                                    infoAddedToOt[i].revisionVideo = parseInt(revisionVideoInitial)
                                :
                                    infoAddedToOt[i].revisionVideo = parseInt(revisionVideoInitial)+1

                                infoAddedToOt[i].informe == informeInitial ?           
                                    infoAddedToOt[i].revisionInforme = parseInt(revisionInformeInitial)
                                :
                                    infoAddedToOt[i].revisionInforme = parseInt(revisionInformeInitial)+1    

                                infoAddedToOt[i].ppt == pptInitial ?
                                    infoAddedToOt[i].revisionPpt = parseInt(revisionPptInitial)
                                :
                                    infoAddedToOt[i].revisionPpt = parseInt(revisionPptInitial)+1
                                
                                infoAddedToOt[i].s1pOp20 == s1pOp20Initial ?
                                    infoAddedToOt[i].revisionS1pOp20 = parseInt(revisionS1pOp20Initial)
                                :
                                    infoAddedToOt[i].revisionS1pOp20 = parseInt(revisionS1pOp20Initial)+1

                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim1`]:
                                    {
                                        sim1: infoAddedToOt[i].sim1,
                                        revisionSim1: infoAddedToOt[i].revisionSim1,
                                        video: infoAddedToOt[i].video,
                                        revisionVideo: infoAddedToOt[i].revisionVideo,
                                        informe: infoAddedToOt[i].informe,
                                        revisionInforme: infoAddedToOt[i].revisionInforme,
                                        ppt: infoAddedToOt[i].ppt,
                                        revisionPpt: infoAddedToOt[i].revisionPpt,
                                        s1pOp20: infoAddedToOt[i].s1pOp20,
                                        revisionS1pOp20: infoAddedToOt[i].revisionS1pOp20,
                                        
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
                //console.log("Error MongoDB adding info Sim1 to OT: ", error)
                console.error("Error MongoDB adding info Sim1 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Sim1 a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info Simulacion 2_3 to Ot's ----------------
    async addInfoSim2_3ToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

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
                                        otInfoSim2_3: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim2_3`]:
                                    {
                                        sim2: infoAddedToOt[i].sim2,
                                        revisionSim2: infoAddedToOt[i].revisionSim2+1,
                                        reporte: infoAddedToOt[i].reporte,
                                        revisionReporte: infoAddedToOt[i].revisionReporte+1,
                                        dfnProdismo: infoAddedToOt[i].dfnProdismo,
                                        revisionDfnProdismo: infoAddedToOt[i].revisionDfnProdismo+1,
                                        sim3: infoAddedToOt[i].sim3,
                                        revisionSim3: infoAddedToOt[i].revisionSim3+1,
                                        
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoSim2_3AddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoSim2_3AddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoSim2_3Length = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim2_3.length)
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim2_3[otInfoSim2_3Length-1]

                                if (otInfoSim2_3Length > 0) {
                                    var sim2Initial = pathToMongoDB.sim2
                                    var revisionSim2Initial = pathToMongoDB.revisionSim2
                                    var reporteInitial = pathToMongoDB.reporte
                                    var revisionReporteInitial = pathToMongoDB.revisionReporte
                                    var dfnProdismoInitial = pathToMongoDB.dfnProdismo
                                    var revisionDfnProdismoInitial = pathToMongoDB.revisionDfnProdismo
                                    var sim3Initial = pathToMongoDB.sim3
                                    var revisionSim3Initial = pathToMongoDB.revisionSim3

                                } else {
                                    var sim2Initial = 'sinDato'
                                    var revisionSim2Initial = 0
                                    var reporteInitial = 'sinDato'
                                    var revisionReporteInitial = 0
                                    var dfnProdismoInitial = 'sinDato'
                                    var revisionDfnProdismoInitial = 0
                                    var sim3Initial = 'sinDato'
                                    var revisionSim3Initial = 0
                                }

                                infoAddedToOt[i].sim2 == sim2Initial ?                                    
                                    infoAddedToOt[i].revisionSim2 = parseInt(revisionSim2Initial)
                                :
                                    infoAddedToOt[i].revisionSim2 = parseInt(revisionSim2Initial)+1

                                infoAddedToOt[i].reporte == reporteInitial ?                                    
                                    infoAddedToOt[i].revisionReporte = parseInt(revisionReporteInitial)
                                :
                                    infoAddedToOt[i].revisionReporte = parseInt(revisionReporteInitial)+1

                                infoAddedToOt[i].dfnProdismo == dfnProdismoInitial ?           
                                    infoAddedToOt[i].revisionDfnProdismo = parseInt(revisionDfnProdismoInitial)
                                :
                                    infoAddedToOt[i].revisionDfnProdismo = parseInt(revisionDfnProdismoInitial)+1    

                                infoAddedToOt[i].sim3 == sim3Initial ?                                    
                                    infoAddedToOt[i].revisionSim3 = parseInt(revisionSim3Initial)
                                :
                                    infoAddedToOt[i].revisionSim3 = parseInt(revisionSim3Initial)+1
                                

                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim2_3`]:
                                    {
                                        sim2: infoAddedToOt[i].sim2,
                                        revisionSim2: infoAddedToOt[i].revisionSim2,
                                        reporte: infoAddedToOt[i].reporte,
                                        revisionReporte: infoAddedToOt[i].revisionReporte,
                                        dfnProdismo: infoAddedToOt[i].dfnProdismo,
                                        revisionDfnProdismo: infoAddedToOt[i].revisionDfnProdismo,
                                        sim3: infoAddedToOt[i].sim3,
                                        revisionSim3: infoAddedToOt[i].revisionSim3,
                                        
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
                //console.log("Error MongoDB adding info Sim2_3 to OT: ", error)
                console.error("Error MongoDB adding info Sim2_3 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Sim2_3 a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info Simulacion 4 Primera to Ot's ----------------
    async addInfoSim4PrimeraToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

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
                                        otInfoSim4Primera: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim4Primera`]:
                                    {
                                        matEnsayo: infoAddedToOt[i].matEnsayo,
                                        revisionMatEnsayo: infoAddedToOt[i].revisionMatEnsayo+1,
                                        masMenos10: infoAddedToOt[i].masMenos10,
                                        revisionMasMenos10: infoAddedToOt[i].revisionMasMenos10+1,
                                        mpAlternativo: infoAddedToOt[i].mpAlternativo,
                                        revisionMpAlternativo: infoAddedToOt[i].revisionMpAlternativo+1,
                                        reunionSim: infoAddedToOt[i].reunionSim,
                                        revisionReunionSim: infoAddedToOt[i].revisionReunionSim+1,
                                        
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoSim4PrimeraAddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoSim4PrimeraAddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoSim4PrimeraLength = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim4Primera.length)
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim4Primera[otInfoSim4PrimeraLength-1]

                                if (otInfoSim4PrimeraLength > 0) {
                                    var matEnsayoInitial = pathToMongoDB.matEnsayo
                                    var revisionMatEnsayoInitial = pathToMongoDB.revisionMatEnsayo
                                    var masMenos10Initial = pathToMongoDB.masMenos10
                                    var revisionMasMenos10Initial = pathToMongoDB.revisionMasMenos10
                                    var mpAlternativoInitial = pathToMongoDB.mpAlternativo
                                    var revisionMpAlternativoInitial = pathToMongoDB.revisionMpAlternativo
                                    var reunionSimInitial = pathToMongoDB.reunionSim
                                    var revisionReunionSimInitial = pathToMongoDB.revisionReunionSim

                                } else {
                                    var matEnsayoInitial = 'sinDato'
                                    var revisionMatEnsayoInitial = 0
                                    var masMenos10Initial = 'sinDato'
                                    var revisionMasMenos10Initial = 0
                                    var mpAlternativoInitial = 'sinDato'
                                    var revisionMpAlternativoInitial = 0
                                    var reunionSimInitial = 'sinDato'
                                    var revisionReunionSimInitial = 0
                                }

                                infoAddedToOt[i].matEnsayo == matEnsayoInitial ?                                    
                                    infoAddedToOt[i].revisionMatEnsayo = parseInt(revisionMatEnsayoInitial)
                                :
                                    infoAddedToOt[i].revisionMatEnsayo = parseInt(revisionMatEnsayoInitial)+1

                                infoAddedToOt[i].masMenos10 == masMenos10Initial ?                                    
                                    infoAddedToOt[i].revisionMasMenos10 = parseInt(revisionMasMenos10Initial)
                                :
                                    infoAddedToOt[i].revisionMasMenos10 = parseInt(revisionMasMenos10Initial)+1

                                infoAddedToOt[i].mpAlternativo == mpAlternativoInitial ?           
                                    infoAddedToOt[i].revisionMpAlternativo = parseInt(revisionMpAlternativoInitial)
                                :
                                    infoAddedToOt[i].revisionMpAlternativo = parseInt(revisionMpAlternativoInitial)+1    

                                infoAddedToOt[i].reunionSim == reunionSimInitial ?                                    
                                    infoAddedToOt[i].revisionReunionSim = parseInt(revisionReunionSimInitial)
                                :
                                    infoAddedToOt[i].revisionReunionSim = parseInt(revisionReunionSimInitial)+1
                                

                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim4Primera`]:
                                    {
                                        matEnsayo: infoAddedToOt[i].matEnsayo,
                                        revisionMatEnsayo: infoAddedToOt[i].revisionMatEnsayo,
                                        masMenos10: infoAddedToOt[i].masMenos10,
                                        revisionMasMenos10: infoAddedToOt[i].revisionMasMenos10,
                                        mpAlternativo: infoAddedToOt[i].mpAlternativo,
                                        revisionMpAlternativo: infoAddedToOt[i].revisionMpAlternativo,
                                        reunionSim: infoAddedToOt[i].reunionSim,
                                        revisionReunionSim: infoAddedToOt[i].revisionReunionSim,
                                        
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
                //console.log("Error MongoDB adding info Simulacion 4 Primera to OT: ", error)
                console.error("Error MongoDB adding info Simulacion 4 Primera to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Simulacion 4 Primera a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info Simulacion 4 Segunda to Ot's ----------------
    async addInfoSim4SegundaToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

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
                                        otInfoSim4Segunda: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim4Segunda`]:
                                    {
                                        informeSim4: infoAddedToOt[i].informeSim4,
                                        revisionInformeSim4: infoAddedToOt[i].revisionInformeSim4+1,
                                        geoCopiado1: infoAddedToOt[i].geoCopiado1,
                                        revisionGeoCopiado1: infoAddedToOt[i].revisionGeoCopiado1+1,
                                        geoCopiado2: infoAddedToOt[i].geoCopiado2,
                                        revisionGeoCopiado2: infoAddedToOt[i].revisionGeoCopiado2+1,
                                        horasSim: infoAddedToOt[i].horasSim,
                                        revisionHorasSim: infoAddedToOt[i].revisionHorasSim+1,
                                        
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoSim4SegundaAddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoSim4SegundaAddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoSim4SegundaLength = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim4Segunda.length)
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim4Segunda[otInfoSim4SegundaLength-1]

                                if (otInfoSim4SegundaLength > 0) {
                                    var informeSim4Initial = pathToMongoDB.informeSim4
                                    var revisionInformeSim4Initial = pathToMongoDB.revisionInformeSim4
                                    var geoCopiado1Initial = pathToMongoDB.geoCopiado1
                                    var revisionGeoCopiado1Initial = pathToMongoDB.revisionGeoCopiado1
                                    var geoCopiado2Initial = pathToMongoDB.geoCopiado2
                                    var revisionGeoCopiado2Initial = pathToMongoDB.revisionGeoCopiado2
                                    var horasSimInitial = pathToMongoDB.horasSim
                                    var revisionHorasSimInitial = pathToMongoDB.revisionHorasSim

                                } else {
                                    var informeSim4Initial = 'sinDato'
                                    var revisionInformeSim4Initial = 0
                                    var geoCopiado1Initial = 'sinDato'
                                    var revisionGeoCopiado1Initial = 0
                                    var geoCopiado2Initial = 'sinDato'
                                    var revisionGeoCopiado2Initial = 0
                                    var horasSimInitial = 0
                                    var revisionHorasSimInitial = 0
                                }

                                infoAddedToOt[i].informeSim4 == informeSim4Initial ?                                    
                                    infoAddedToOt[i].revisionInformeSim4 = parseInt(revisionInformeSim4Initial)
                                :
                                    infoAddedToOt[i].revisionInformeSim4 = parseInt(revisionInformeSim4Initial)+1

                                infoAddedToOt[i].geoCopiado1 == geoCopiado1Initial ?                                    
                                    infoAddedToOt[i].revisionGeoCopiado1 = parseInt(revisionGeoCopiado1Initial)
                                :
                                    infoAddedToOt[i].revisionGeoCopiado1 = parseInt(revisionGeoCopiado1Initial)+1

                                infoAddedToOt[i].geoCopiado2 == geoCopiado2Initial ?           
                                    infoAddedToOt[i].revisionGeoCopiado2 = parseInt(revisionGeoCopiado2Initial)
                                :
                                    infoAddedToOt[i].revisionGeoCopiado2 = parseInt(revisionGeoCopiado2Initial)+1    

                                infoAddedToOt[i].horasSim == horasSimInitial ?                                    
                                    infoAddedToOt[i].revisionHorasSim = parseInt(revisionHorasSimInitial)
                                :
                                    infoAddedToOt[i].revisionHorasSim = parseInt(revisionHorasSimInitial)+1
                                

                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim4Segunda`]:
                                    {
                                        informeSim4: infoAddedToOt[i].informeSim4,
                                        revisionInformeSim4: infoAddedToOt[i].revisionInformeSim4,
                                        geoCopiado1: infoAddedToOt[i].geoCopiado1,
                                        revisionGeoCopiado1: infoAddedToOt[i].revisionGeoCopiado1,
                                        geoCopiado2: infoAddedToOt[i].geoCopiado2,
                                        revisionGeoCopiado2: infoAddedToOt[i].revisionGeoCopiado2,
                                        horasSim: infoAddedToOt[i].horasSim,
                                        revisionHorasSim: infoAddedToOt[i].revisionHorasSim,
                                        
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
                //console.log("Error MongoDB adding info Simulacion 4 Segunda to OT: ", error)
                console.error("Error MongoDB adding info Simulacion 4 Segunda to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Simulacion 4 Segunda a la OT del Proyecto!`)
        }
    }

    // ***************** Add Info Simulacion 5 to Ot's ----------------
    async addInfoSim5ToOtProject(idProjectTarget, otQuantity, ociNumberK, infoAddedToOt) {

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
                                        otInfoSim5: []
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
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim5`]:
                                    {
                                        grillado: infoAddedToOt[i].grillado,
                                        revisionGrillado: infoAddedToOt[i].revisionGrillado+1,
                                        mpEnsayada: infoAddedToOt[i].mpEnsayada,
                                        revisionMpEnsayada: infoAddedToOt[i].revisionMpEnsayada+1,
                                                                                
                                        creator: infoAddedToOt[i].creator,
                                        timestamp: now,
                                        modificator: infoAddedToOt[i].modificator,
                                        modifiedOn: ''
                                    }
                                }
                                    arrayQuantity.push(updateQuery)

                                    // Si arrayTreeCreation.modifiedCount es = a 1 ---
                                    if (arrayTreeCreation[i].modifiedCount===1) {
                    
                                        var infoSim5AddedToOt = await Proyectos.updateOne(
                                            { _id: itemMongoDB._id },
                                            {
                                                $push: arrayQuantity[i]
                                            },
                                            { new: true }
                                        )
                                        countTreeCreation++
                                    }
                                    // console.log('3-Dao-Ot agregada: ', i,' - ', infoSim5AddedToOt)
                            
                            } else {

                                // Recupero el creador y la fecha inicial, ya que solo se modifica
                                let creatorInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].creator[0]
                                let timestampInitial = itemMongoDB.project[0].oci[ociKNumber].otProject[i].timestamp
                                
                                // Recupero los datos originales y comparo, ya que solo el dato que se modifica cambia su Revision
                                let otInfoSim5Length = parseInt(itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim5.length)
                                
                                let pathToMongoDB = itemMongoDB.project[0].oci[ociKNumber].otProject[i].otInformation[0].otInfoSim5[otInfoSim5Length-1]

                                if (otInfoSim5Length > 0) {
                                    var grilladoInitial = pathToMongoDB.grillado
                                    var revisionGrilladoInitial = pathToMongoDB.revisionGrillado
                                    var mpEnsayadaInitial = pathToMongoDB.mpEnsayada
                                    var revisionMpEnsayadaInitial = pathToMongoDB.revisionMpEnsayada

                                } else {
                                    var grilladoInitial = 'sinDato'
                                    var revisionGrilladoInitial = 0
                                    var mpEnsayadaInitial = 'sinDato'
                                    var revisionMpEnsayadaInitial = 0
                                }

                                infoAddedToOt[i].grillado == grilladoInitial ?                                    
                                    infoAddedToOt[i].revisionGrillado = parseInt(revisionGrilladoInitial)
                                :
                                    infoAddedToOt[i].revisionGrillado = parseInt(revisionGrilladoInitial)+1

                                infoAddedToOt[i].mpEnsayada == mpEnsayadaInitial ?                                    
                                    infoAddedToOt[i].revisionMpEnsayadaInitial = parseInt(revisionMpEnsayadaInitial)
                                :
                                    infoAddedToOt[i].revisionMpEnsayadaInitial = parseInt(revisionMpEnsayadaInitial)+1


                                // Si existe la extructura del arbol, se crea el array de datos a agregar --
                                let updateQuery = {
                                    [`project.0.oci.${ociKNumber}.otProject.${i}.otInformation.0.otInfoSim5`]:
                                    {
                                        grillado: infoAddedToOt[i].grillado,
                                        revisionGrillado: infoAddedToOt[i].revisionGrillado,
                                        mpEnsayada: infoAddedToOt[i].mpEnsayada,
                                        revisionMpEnsayada: infoAddedToOt[i].revisionMpEnsayada,
                                        
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
                //console.log("Error MongoDB adding info Simulacion 5 to OT: ", error)
                console.error("Error MongoDB adding info Simulacion 5 to OT: ", error)
            }

        } else {
            return new Error(`No se pudo agregar la info Simulacion 4 Segunda a la OT del Proyecto!`)
        }
    }


    // Update Status Project by Project Id
    async updateStatusProject(id, project, statusProject, userModificator) {
                
        let booleanStatus
        statusProject=='true' ? booleanStatus=true : booleanStatus=false
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                //console.log('itemMongoDB...', itemMongoDB)
                if (itemMongoDB) {
                    
                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                'project.0.statusProject': !booleanStatus,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                    //console.log('Status proyecto modificado: ', updatedProject)

                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        //console.log('itemUpdated...', itemUpdated)
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingProject: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
        }
    }

    // Update Level Project by Project Id
    async updateLevelProject(id, project, levelProject, userModificator) {
        //console.log('Project...', project)
        //console.log('userInfo...', userInfo)
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                //console.log('itemMongoDB...', itemMongoDB)
                if (itemMongoDB) {
                    
                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                'project.0.levelProject': levelProject,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )
                    //console.log('Status proyecto modificado: ', updatedProject)

                    if(updatedProject.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: project[0]._id })
                        //console.log('itemUpdated...', itemUpdated)
                        return itemUpdated
                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }
                    
                } else {
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingProject: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el nivel del Proyecto!`)
        }
    }

    // Update Status Oci by Project Id
    async updateStatusOci(id, project, statusOci, ociKNumber, userModificator) {
        let booleanStatus
        statusOci=='true' ? booleanStatus=true : booleanStatus=false
        
        if (project) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: project[0]._id })
                
                if (itemMongoDB) {
                    const ociNumberK = parseInt(ociKNumber) || 0

                    var updatedProject = await Proyectos.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                [`project.0.oci.${ociNumberK}.ociStatus`]: !booleanStatus,
                                [`project.0.oci.${ociNumberK}.modificator`]: userModificator,
                                [`project.0.oci.${ociNumberK}.modifiedOn`]: now
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
                    return new Error(`Proyecto no existe con este id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB updatingProject: ", error)
            }

        } else {
            return new Error(`No se pudo modificar el status del Proyecto!`)
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

    // Add new Oci to Project
    async addNewOciToProject(idProjectTarget, ociQty, arrayOciAddedToProject) {
        const ociQuantity = parseInt(ociQty)
        
        if (idProjectTarget) {
            try {
                const itemMongoDB = await Proyectos.findById({ _id: idProjectTarget })
                         
                if (itemMongoDB) {

                    let arrayQueryQuantity = []
                    for (let i = 0; i < ociQuantity; i++) {                            
                        let updateQuery = {
                                ociNumber: arrayOciAddedToProject[i].ociNumber,
                                ociDescription: arrayOciAddedToProject[i].ociDescription,
                                ociStatus: arrayOciAddedToProject[i].ociStatus,
                                ociAlias: arrayOciAddedToProject[i].ociAlias,
                                creator: arrayOciAddedToProject[i].creator,
                                timestamp: now,
                                ociImage: arrayOciAddedToProject[i].ociImage,
                                modificator: arrayOciAddedToProject[i].modificator,
                                modifiedOn: '',
                                visible: true
                        }
                        arrayQueryQuantity.push(updateQuery)
                    }    

                    // Se agregan las estructuras al arbol de MongoDB ---
                    for (let n=0; n<ociQuantity; n++) {
                        var ociAddedToProyecto = await Proyectos.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $push: {
                                    [`project.0.oci`]: arrayQueryQuantity[n]
                                }
                            },
                            { new: true }
                        )
                        // console.info('Oci agregada a Proyecto ', ociAddedToProyecto)
                    }

                    // Si se agrega correctamente las OCI => true ---
                    if (ociAddedToProyecto.acknowledged) {
                        const itemUpdated = await Proyectos.findById({ _id: idProjectTarget })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemMongoDB._id}`)
                    }

                } else {
                    console.error(`No se encontró la OCI`)
                    return new Error(`No se encontró la OCI`)
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

module.exports = ProyectosDaoMongoDB