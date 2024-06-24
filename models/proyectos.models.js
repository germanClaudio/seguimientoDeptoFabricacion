const { Schema, model, mongoose } = require('mongoose')
let now = require('../utils/formatDate.js')
const programacionModels = require('./programas.models.js')

// ------- Client Schema -------------
let ClientSchema = new Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clientes",
    },
    name: { 
        type: String
    },
    logo: { 
        type: String
    },
})

// ------- Creator Schema -------------
let creatorSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
    },
    name: { 
        type: String,
    },
    lastName: {
        type: String,
    },
    username:{
        type: String,
    },
    email: {
        type: String,
    }
})

// ------- Modificator Schema -------------
let modificatorSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
    },
    name: { 
        type: String,
    },
    lastName: {
        type: String,
    },
    username:{
        type: String,
    },
    email: {
        type: String,
    }
})

// ------- OT Information R-14 Schema ---------
let otInformationR14Schema = new Schema({
    procesoR14: { 
        type: String,
        default: 'sinDato',
    },
    revisionProcesoR14: { 
        type: Number,
        default: 0,
    },
    aprobadoR14: {
        type: String,
        default: 'sinDato',
    },
    revisionAprobadoR14: { 
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Proceso Schema ---------
let otInformationProcesoSchema = new Schema({
    proceso3d: { 
        type: String,
        default: 'sinDato',
    },
    revisionProceso3d: { 
        type: Number,
        default: 0,
    },
    horasProceso3d: {
        type: Number,
        default: 0,
    },
    revisionHorasProceso3d: { 
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Diseno Schema ---------
let otInformationDisenoPrimeraSchema = new Schema({
    avDiseno: { 
        type: Number,
        default: 0,
    },
    revisionAvDiseno: { 
        type: Number,
        default: 0,
    },
    avDiseno50: {
        type: String,
        default: 'sinDato',
    },
    revisionAvDiseno50: { 
        type: Number,
        default: 0,
    },
    avDiseno80: {
        type: String,
        default: 'sinDato',
    },
    revisionAvDiseno80: { 
        type: Number,
        default: 0,
    },
    envioCliente: {
        type: String,
        default: 'sinDato',
    },
    revisionEnvioCliente: { 
        type: Number,
        default: 0,
    },   
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Diseno Schema ---------
let otInformationDisenoSegundaSchema = new Schema({
    revisionCliente: {
        type: String,
        default: 'sinDato',
    },
    revisionRevisionCliente: { 
        type: Number,
        default: 0,
    },
    ldmProvisoria: {
        type: String,
        default: 'noAplica',
    },
    revisionLdmProvisoria: { 
        type: Number,
        default: 0,
    },
    avDiseno100: {
        type: Number,
        default: 0,
    },
    revisionAvDiseno100: {
        type: Number,
        default: 0,
    },
    aprobadoCliente: {
        type: String,
        default: 'sinDato',
    },
    revisionAprobadoCliente: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Info80% Schema ---------
let otInformationInfo80Schema = new Schema({
    ldmAvanceCG: { 
        type: String,
        default: 'noAplica',
    },
    revisionLdmAvanceCG: {
        type: Number,
        default: 0,
    },
    ldmAvanceTD2: {
        type: String,
        default: 'noAplica',
    },
    revisionLdmAvanceTD2: {
        type: Number,
        default: 0,
    },
    ldm80: {
        type: Number,
        default: 0,
    },
    revisionLdm80: {
        type: Number,
        default: 0,
    },
    infoModelo: {
        type: Number,
        default: 0,
    },
    revisionInfoModelo: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Info100% Schema ---------
let otInformationInfo100Schema = new Schema({
    ldm100: { 
        type: Number,
        default: 0,
    },
    revisionLdm100: {
        type: Number,
        default: 0,
    },
    info100: {
        type: Number,
        default: 0,
    },
    revisionInfo100: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Sim0 Schema ---------
let otInformationSim0Schema = new Schema({
    sim0: { 
        type: String,
        default: 'sinDato',
    },
    revisionSim0: {
        type: Number,
        default: 0,
    },
    docuSim0: {
        type: String,
        default: 'sinDato',
    },
    revisionDocuSim0: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Sim1 Schema ---------
let otInformationSim1Schema = new Schema({
    sim1: { 
        type: String,
        default: 'sinDato',
    },
    revisionSim1: {
        type: Number,
        default: 0,
    },
    video: {
        type: String,
        default: 'sinDato',
    },
    revisionVideo: {
        type: Number,
        default: 0,
    },
    informe: {
        type: String,
        default: 'sinDato',
    },
    revisionInforme: {
        type: Number,
        default: 0,
    },
    ppt: {
        type: String,
        default: 'sinDato',
    },
    revisionPpt: {
        type: Number,
        default: 0,
    },
    s1pOp20: {
        type: String,
        default: 'sinDato',
    },
    revisionS1pOp20: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Sim2_3 Schema ---------
let otInformationSim2_3Schema = new Schema({
    sim2: { 
        type: String,
        default: 'noAplica',
    },
    revisionSim2: {
        type: Number,
        default: 0,
    },
    reporte: {
        type: String,
        default: 'noAplica',
    },
    revisionReporte: {
        type: Number,
        default: 0,
    },
    dfnProdismo: {
        type: String,
        default: 'noAplica',
    },
    revisionDfnProdismo: {
        type: Number,
        default: 0,
    },
    sim3: {
        type: String,
        default: 'noAplica',
    },
    revisionSim3: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Sim4 (1° Parte) Schema ---------
let otInformationSim4PrimeraSchema = new Schema({
    matEnsayo: { 
        type: String,
        default: 'noAplica',
    },
    revisionMatEnsayo: {
        type: Number,
        default: 0,
    },
    masMenos10: {
        type: String,
        default: 'noAplica',
    },
    revisionMasMenos10: {
        type: Number,
        default: 0,
    },
    mpAlternativo: {
        type: String,
        default: 'noAplica',
    },
    revisionMpAlternativo: {
        type: Number,
        default: 0,
    },
    reunionSim: {
        type: String,
        default: 'noAplica',
    },
    revisionReunionSim: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Sim4 (2° Parte) Schema ---------
let otInformationSim4SegundaSchema = new Schema({
    informeSim4 : {
        type: String,
        default: 'noAplica',
    },
    revisionInformeSim4: {
        type: Number,
        default: 0,
    },
    geoCopiado1: {
        type: String,
        default: 'noAplica',
    },
    revisionGeoCopiado1: {
        type: Number,
        default: 0,
    },
    geoCopiado2: {
        type: String,
        default: 'noAplica',
    },
    revisionGeoCopiado2: {
        type: Number,
        default: 0,
    },
    horasSim: {
        type: Number,
        default: 0,
    },
    revisionHorasSim: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Sim5 Schema ---------
let otInformationSim5Schema = new Schema({
    grillado: { 
        type: String,
        default: 'noAplica',
    },
    revisionGrillado: {
        type: Number,
        default: 0,
    },
    mpEnsayada: {
        type: String,
        default: 'noAplica',
    },
    revisionMpEnsayada: {
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Information Schema ---------
let otInformationSchema = new Schema({
    otInfoR14: [otInformationR14Schema],
    otInfoProceso: [otInformationProcesoSchema],
    otInfoDisenoPrimera: [otInformationDisenoPrimeraSchema],
    otInfoDisenoSegunda: [otInformationDisenoSegundaSchema],
    otInfoInfo80: [otInformationInfo80Schema],
    otInfoInfo100: [otInformationInfo100Schema],
    otInfoSim0: [otInformationSim0Schema],
    otInfoSim1: [otInformationSim1Schema],
    otInfoSim2_3: [otInformationSim2_3Schema],
    otInfoSim4Primera: [otInformationSim4PrimeraSchema],
    otInfoSim4Segunda: [otInformationSim4SegundaSchema],
    otInfoSim5: [otInformationSim5Schema],

})

// ------- OT Project Schema -------------
let otProjectSchema = new Schema({
    otId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    otNumber: { 
        type: Number,
        maxlength: 4,
    },
    opNumber: {
        type: String,
        maxlength: 50,
    },
    opDescription: {
        type: String,
        maxlength: 150,
    },
    otStatus:{
        type: Boolean,
        default: true,
    },
    otDesign:{
        type: String,
        maxlength: 150,
    },
    otSimulation:{
        type: String,
        maxlength: 150,
    },
    otSupplier:{
        type: String,
        maxlength: 150,
    },
    otInformation: [otInformationSchema],
    otDetalles: [programacionModels.ProgramacionSchema],
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
    visible: {
        type: Boolean,
        default: true,
    }

})

// ------- OCI Project Schema -------------
let ociProjectSchema = new Schema({
    ociId: {
        type: mongoose.Schema.Types.ObjectId
    },
    ociNumber: {
        type: Number, maxlength: 4
    },
    ociDescription: {
        type: String, maxlength: 100
    },
    ociAlias: {
        type: String, maxlength: 50,
        default: "Sin Apodo"
    },
    ociStatus: {
        type: Boolean, default: true
    },
    ociImage: { 
        type: String,
        maxlength: 1000,
        default: '../../../src/images/upload/LogoClientImages/noImageFound.png'
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
    visible:{
        type: Boolean,
        default: true,
    },
    otProject: [otProjectSchema]
    
})

// ------- Project Schema -------------
let projectSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    projectName: {
        type: String,
        maxlength: 100
    },
    projectDescription: {
        type: String,
        maxlength: 250
    },
    prioProject: {
        type: Number,
        value: 0,
        maxlength: 10,
        min: [0, 'Prio can not be less than 0']
    },
    imageProject: { 
        type: String,
        maxlength: 1000,
        value: '../../../src/images/upload/LogoClientImages/noImageFound.png'
    },
    codeProject:{
        type: String,
        maxlength: 15,
    },
    statusProject:{
        type: Boolean,
        default: true,
    },
    levelProject:{
        type: String,
        default: 'paraCotizar',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
    visible:{
        type: Boolean,
        default: true,
    },
    oci: [ociProjectSchema],
})

// ------- Complete Project per Client Schema -------------
const ProyectoSchema = new Schema({
    creator: [creatorSchema],
    client: [ClientSchema],
    project: [projectSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
    visible:{
        type: Boolean,
        default: true,
    },
},{
    versionKey: false
})

module.exports = model('Projects', ProyectoSchema)