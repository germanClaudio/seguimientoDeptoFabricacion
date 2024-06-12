const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Usuarios = require('../../models/usuarios.models.js')
const Sessions = require('../../models/sessions.models.js')

const now = require('../../utils/formatDate.js')

const bCrypt = require('bcrypt')

const jwt = require('jsonwebtoken');

const fs = require('fs')
const util = require('util')

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000}


class UsuariosDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        // await this.connection
        mongoose.connect(this.cnxStr, advancedOptions)
        console.log('Connected to MongoDB Server 1-2-3 - UsuariosDaoFactory.js')
    }

    async getAllUsers() {
       try {
           const users = await Usuarios.find()
           if (!users) {
                return new Error ('No hay usuarios en la DB!')
           } else {
                return users    
           }
        } catch (error) {
            console.error("Error MongoDB getUsers: ",error)
            return new Error ('No hay usuarios en la DB!')
        }
    }

    async getAllSessions() {
        try {
            const sessions = await Sessions.find()
            
            if (!sessions) {
                 return new Error ('No hay sessions en la DB!')
            } else {
                 return sessions
            }
         } catch (error) {
             console.error("Error MongoDB getSessions: ",error)
             return new Error ('No hay sessions en la DB!')
         }
    }

    async getUserById(id) {
        if(id){
            try {
                const user = await Usuarios.findOne( {_id: `${id}`} )
                if ( user === undefined || user === null) {
                    return new Error (`El Usuario no existe con ese ID${id}!`)
                } else {
                    return user    
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`El Usuario no existe con ese ID${id}!`)
        }
    }

    async getUserByLegajoId(legajoId) {

        if(legajoId){
            try {
                const user = await Usuarios.findOne( {legajoId: `${legajoId}`} )
                if ( user === undefined || user === null) {
                    return null
                } else {
                    return user
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en legajo ID ${legajoId}!`)
        }
    }
    
    async getUserByUsername(username) {
        
        if(username) {
            const userInput = username; // Nombre de usuario o número de legajo ingresado por el usuario
            var legajoIdNumber = null;

                // Intentar convertir el input a un número
                if (!isNaN(userInput)) {
                    legajoIdNumber = parseInt(userInput, 10);
                }
                // console.log('legajoIdNumber:', legajoIdNumber)

                let query = {};
                if (legajoIdNumber !== null) {
                    query = { legajoId: legajoIdNumber };
                } else {
                    query = { username: { $regex: userInput, $options: 'i' } };
                }
                    
            try {        
                const user = await Usuarios.findOne(query);
                
                if ( user === undefined || user === null) {
                   return false
                } else {
                   return user
                }
            } catch (error) {
                console.error('Aca esta el error vieja: ', error)
            }
        } else {
            return console.error('Aca esta el error(username invalid)')
        }
    }

    async searchUsers(permiso) {
        if(permiso){
            try {
                const users = await Usuarios.find( { permiso: `simulacion` })
                
                 if (!users) {
                    return false
                 } else {
                    return users
                 }
            } catch (error) {
                console.error('Aca esta el error: ', error)
            }
        } else {
            return console.error('Aca esta el error(permiso: invalid)')
        }
    }
    
    async getUserByUsernameAndPassword(username, password) {
        if(username || password) {
            try {
                const user = await Usuarios.findOne( {username: `${username}`, password: `${password}` } )
                if ( user === undefined || user === null || password !== user.password ) {
                    return false    
                } else {
                    return true
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Usuario no existe o password incorrecto!`)
        }
    }

    async getExistingUser(newUser) {
        const legajoIdNum = parseInt(newUser.legajoId)
        
        if (newUser) {
            const user = await Usuarios.findOne(
                { $or: [ {username: `${newUser.username}`},
                         {legajoId: legajoIdNum},
                         {email: `${newUser.email}`}
                       ]
                });

            if (user) {
                return user
                
            } else {
                return false
            }

        } else {
            return new Error (`No se pudo encontrar al Usuario!`)
        }
    }
    
    async createNewUser(newUser) {
        
        if (newUser) {
            let username = newUser.username || "";
            let password = newUser.password || "";

            if (!username || !password ) {
                process.exit(1)
            } else {
                try {
                    function createHash(password) {
                        return bCrypt.hashSync(
                                  password,
                                  bCrypt.genSaltSync(10),
                                  null);
                    }
                    password = createHash(password)

                    const nuevoUsuario = {
                        name: newUser.name,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        username: newUser.username,
                        legajoId: newUser.userLegajoId,
                        avatar: newUser.avatar,

                        password: password,
                        permiso: newUser.permiso,
                        status: newUser.status,
                        admin: newUser.admin,
                        admin: newUser.superAdmin,
                        
                        creator: newUser.creator,
                        timestamp: newUser.timestamp,
                        modificator: newUser.modificator,
                        modifiedOn: '',
                        visible: newUser.visible
                    }             

                    const newUserCreated = new Usuarios(nuevoUsuario)
                    await newUserCreated.save()
                    //console.info('User created: ' + newUserCreated.username)

                    let avatarUserString = nuevoUsuario.avatar
                    let sectionString = avatarUserString.split('/')
                    let avatarFileName = sectionString[sectionString.length - 1]

                    const loginAppLink =  `https://seguimientoproyectosing.up.railway.app/api/auth/login`
                               
                    //////////////////// gmail to User && Administrator //////////////////////
                    const { createTransport } = require('nodemailer')
                    const TEST_EMAIL = process.env.TEST_EMAIL
                    const PASS_EMAIL = process.env.PASS_EMAIL
                    
                    const transporter = createTransport({
                        service: 'gmail',
                        port: 587,
                        auth: {
                            user: TEST_EMAIL,
                            pass: PASS_EMAIL
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    })

                    const readFile = util.promisify(fs.readFile)
                    const imagePath = './public/src/images/logo01-negro.png'
                    const image = await readFile(imagePath)
                    const base64Image = image.toString('base64')

                    const html =   `<p>Este mensaje fue enviado automaticamente por la App Web de Prodismo IT "Seguimiento Proyectos Ingeniería".</p>
                                    <h4 style="color: #000000;">${nuevoUsuario.name} ${nuevoUsuario.lastName}, legajo #${nuevoUsuario.legajoId} se registro exitosamente en la base de datos!</h4>
                                    <h4 style="color: #000000;">Haz click o pega el siguiente enlace en tu navegador para entrar en la aplicacion</h4>
                                    <br>
                                    <a href="${loginAppLink}">${loginAppLink}</a>
                                    <br>
                                    <p>Por favor, no responda a este email.</p>
                                    <p>Muchas gracias por utilizar nuestros servicios.</p>
                                    <p>--------------------------------------------------</p>
                                    <p>El Equipo de Seguimiento de Ingeniería - Prodismo IT</p>
                                    <img src="data:image/jpeg;base64,${base64Image}" alt="Logo Prodismo" width="165" height="28">
                                    <p style="font-size: 10pt;">Desarrollado por Germán C. Montalbetti para Prodismo - 2024(c)</p>`
                    

                    const mailOptions = {
                        from: 'Servidor Prodismo IT - (C)2024',
                        to: nuevoUsuario.email, //TEST_EMAIL,
                        subject: 'Registro de Usuario Exisitoso en App - Prodismo - by G. Montalbetti (C)2024',
                        html: html,
                        attachments: [
                            {
                                path: `./public/src/images/upload/AvatarUsersImages/${avatarFileName}`
                            }
                        ]
                    }
                    
                    ;(async () => {
                        try {
                            const info = await transporter.sendMail(mailOptions)
                            console.info(info)
                        } catch (err) {
                            console.error(err)
                        }
                    })()
                    return newUserCreated

                } catch (error) {
                    console.error(error)
                    return new Error (`No se pudo crear el Usuario! Error Try-catch`)
                }
            }   
        } else {
            return new Error (`No se pudo crear el Usuario! error else/if`)
        }
    }

    async getUserByEmail(email) {
        // console.log('email: ', email)
        if(email){
            try {
                const user = await Usuarios.findOne( { email: `${email}` })
                
                if ( user === undefined || user === null) {
                    return false
                } else if (user.status && user.visible) {
                    return user
                } else {
                    return false
                }

            } catch (error) {
                console.error('Aca esta el error vieja: ', error)
            }
        } else {
            return console.error('Aca esta el error(email invalid)')
        }
    }

    async resetUserPassword(usuario) {
        // console.log('usuario: ', usuario)

        if (usuario) {
            let userId = usuario.id

            const user = await Usuarios.findOne({_id: `${userId}`})
        //    console.log(user);  console.log(user.email);

            if (!user) {
                return false
            }

            if (!user.username || !user.status || !user.visible || !user.email ) {
                process.exit(1)
                // return false
            } else {

                try {
                    // Se genera un token con una fecha de vencimiento de 1 hora
                    const userIdEmail = { id: `${userId}` };
                    const secretKey = process.env.JWT_PRIVATE_KEY;
                    const token = jwt.sign(userIdEmail, secretKey, { expiresIn: '1h' });

                    // Se crea el enlace con el token
                    const resetPasswordLink =  `https://seguimientoproyectosing.up.railway.app/api/auth/reset-password?token=${token}`  //http://localhost:4000
                    // console.log('Enlace para restablecer contraseña:', resetPasswordLink)
                    
                    //////////////////// gmail to User //////////////////////
                    const { createTransport } = require('nodemailer')
                    const TEST_EMAIL = process.env.TEST_EMAIL
                    const PASS_EMAIL = process.env.PASS_EMAIL
                    
                    const transporter = createTransport({
                        service: 'gmail',
                        port: 587,
                        auth: {
                            user: TEST_EMAIL,
                            pass: PASS_EMAIL
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    })

                    const readFile = util.promisify(fs.readFile)
                    const imagePath = './public/src/images/logo01-negro.png'
                    const image = await readFile(imagePath)
                    const base64Image = image.toString('base64')

                    const html =   `<p>Este mensaje fue enviado automaticamente por la App Web de Prodismo IT "Seguimiento Proyectos de Ingeniería" por un recupero de password.</p>
                                    <h4 style="color: #000000;">Haz click o pega el siguiente enlace en tu navegador para resetar tu password</h4>
                                    <br>
                                    <a href="${resetPasswordLink}">${resetPasswordLink}</a>
                                    <br>
                                    <p>Si no solicitaste restablecer tu contraseña, ignora este correo.</p>
                                    <p>Por favor, no responda a este email.</p>
                                    <p>Muchas gracias por utilizar nuestros servicios.</p>
                                    <p>--------------------------------------------------</p>
                                    <p>El Equipo de Seguimiento de Ingeniería - Prodismo IT</p>
                                    <img src="data:image/jpeg;base64,${base64Image}" alt="Logo Prodismo" width="165" height="28">
                                    <p style="font-size: 10pt;">Desarrollado por Germán C. Montalbetti para Prodismo - 2024(c)</p>`
                    
                    const mailOptions = {
                        from: 'Servidor Prodismo - (C)2024',
                        to: user.email, //TEST_EMAIL,
                        subject: 'Em@il Reset Password App - Prodismo IT - by G. Montalbetti (C)2024',
                        html: html
                    }
                    
                    ;(async () => {
                        try {
                            const info = await transporter.sendMail(mailOptions)
                            console.info(info)
                        } catch (err) {
                            console.error(err)
                        }
                    })()

                    return true

                } catch (error) {
                    console.error(error)
                    return new Error (`No se pudo enviar el mail al usuario con el mail ${user.email}!`)
                }
            }

        } else {
            return new Error (`No se pudo enviar el mail al Usuario!`)
        }
    }

    async updatePasswordByUser(id, updatedUserPassword, userModificator) {
        //console.log('id-updatedUserPassword=', id, updatedUserPassword)
        if (updatedUserPassword && userModificator) {

            try {
                const userMongoDB = await Usuarios.findById( { _id: id } ) //`${id}`
                
                if(userMongoDB) {

                    let newPassword
                    updatedUserPassword.password !== '' ? newPassword = updatedUserPassword.password : process.exit(1)
                    
                    function createHash(newPassword) {
                        return bCrypt.hashSync(
                                    newPassword,
                                    bCrypt.genSaltSync(10),
                                    null);
                    }

                    let newPasswordEncoded = createHash(newPassword)

                    var updatedPasswordUser = await Usuarios.updateOne(
                        { _id: userMongoDB._id  },
                        {
                            $set: {
                                password: newPasswordEncoded,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    if(updatedPasswordUser.acknowledged) {
                        const itemUpdated = await Usuarios.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el password del item: ${itemUpdated._id}`)
                    }

                } else {
                    return new Error(`No existe el item Usuario con este id: ${itemUpdated._id} `)
                }

            } catch (error) {
                console.error("Error MongoDB updatePasswordUser: ", error)
                return new Error (`No se pudo actualizar el password del Usuario!`)
            }

        } else {
            console.info('El Ususario no existe! ', updatedUser)
            return new Error (`No se pudo actualizar el password Usuario!`)
        }
    }

    async updateUser(id, updatedUser, userModificator) {
        
        if (updatedUser && userModificator) {

            try {
                const userMongoDB = await Usuarios.findById( { _id: id } ) //`${id}`
                            
                updatedUser.name !== '' ? updatedUser.name : userMongoDB.name
                updatedUser.lastName !== '' ? updatedUser.lastName : userMongoDB.lastName
                updatedUser.email !== '' ? updatedUser.email : userMongoDB.email
                updatedUser.username !== '' ? updatedUser.username : userMongoDB.username
                updatedUser.avatar !== '' ? updatedUser.avatar : userMongoDB.avatar
                updatedUser.legajoId !== '' ? updatedUser.legajoId : userMongoDB.legajoId
                updatedUser.area !== '' ? updatedUser.area : userMongoDB.area
                updatedUser.admin !== '' ? updatedUser.admin : userMongoDB.admin
                updatedUser.superAdmin !== '' ? updatedUser.superAdmin : userMongoDB.superAdmin
                updatedUser.status !== '' ? updatedUser.status : userMongoDB.status
                updatedUser.permiso !== '' ? updatedUser.permiso : userMongoDB.permiso

                if(userMongoDB) {
                    var updatedFinalUser = await Usuarios.updateOne(
                        { _id: userMongoDB._id  },
                        {
                            $set: {
                                name: updatedUser.name,
                                lastName: updatedUser.lastName,
                                email: updatedUser.email,
                                username: updatedUser.username,
                                avatar: updatedUser.avatar,
                                legajoId: updatedUser.legajoId,
                                area: updatedUser.area,
                                admin: updatedUser.admin,
                                superAdmin: updatedUser.superAdmin,
                                status: updatedUser.status,
                                permiso: updatedUser.permiso,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    if(updatedFinalUser.acknowledged) {
                        const itemUpdated = await Usuarios.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }

                } else {
                    return new Error(`No existe el item Usuario con este id: ${itemUpdated._id} `)
                }

            } catch (error) {
                console.error("Error MongoDB updateUser: ", error)
                return new Error (`No se pudo actualizar el Usuario!`)
            }

        } else {
            console.info('El Ususario no existe! ', updatedUser)
            return new Error (`No se pudo actualizar el Usuario!`)
        }
    }

    async updateUserPreferences(id, updatedUser, userModificator) {
        
        if (updatedUser && userModificator) {

            try {
                const userMongoDB = await Usuarios.findById( { _id: id } ) //`${id}`
                            
                updatedUser.avatar !== '' ? updatedUser.avatar : userMongoDB.avatar
                updatedUser.name !== '' ? updatedUser.name : userMongoDB.name
                updatedUser.lastName !== '' ? updatedUser.lastName : userMongoDB.lastName
                updatedUser.email !== '' ? updatedUser.email : userMongoDB.email
                                
                if(userMongoDB) {
                    var updatedFinalUser = await Usuarios.updateOne(
                        { _id: userMongoDB._id  },
                        {
                            $set: {
                                name: updatedUser.name,
                                lastName: updatedUser.lastName,
                                email: updatedUser.email,
                                avatar: updatedUser.avatar,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    if(updatedFinalUser.acknowledged) {
                        const itemUpdated = await Usuarios.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }

                } else {
                    return new Error(`No existe el item Usuario con este id: ${itemUpdated._id} `)
                }

            } catch (error) {
                console.error("Error MongoDB updateUser: ", error)
                return new Error (`No se pudo actualizar el Usuario!`)
            }

        } else {
            console.info('El Ususario no existe! ', updatedUser)
            return new Error (`No se pudo actualizar el Usuario!`)
        }
    }

    async deleteUserById(id, userModificator) {
        
        if(id){
            try {
                const userMongoDB = await Usuarios.findById({_id: id })
            
                if(userMongoDB) {
                    let inactive = Boolean(false)
                    var userDeleted = await Usuarios.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                visible: inactive,
                                status: inactive,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    if(userDeleted.acknowledged) {
                        const itemUpdated = await Usuarios.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se eliminó el item: ${userMongoDB._id}`)
                    }
                    
                } else {
                    return new Error (`El Usuario no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deleteUser: ",error)
            }

        } else {
            return new Error (`El Usuario no existe con ese ID${id}!`)
        }    
    }

    async userLogout(id, user) {
        if (id, user) {
            try {
                return {id, user}
                
            } catch (error) {
                return error
            }
        }
    }

    async authBloq(password, user) {
        if (password, user) {
            try {
                return {user}
            } catch (error) {
                return error
            }
        }
    }

    async authNoBloq(password, user) {
        if (password, user) {
            try {
                return {user}
            } catch (error) {
                return error
            }
        }
    }

    

    async disconnet() {
        await this.disconnection
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = UsuariosDaoMongoDB 