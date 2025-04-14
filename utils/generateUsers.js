async function dataUserCreator(userCreator) {
    const user = [{
        name: userCreator.name,
        lastName: userCreator.lastName,
        username: userCreator.username,
        email: userCreator.email,
        legajoId: userCreator.legajoId
    }]
    return user
}

async function dataUserModificatorEmpty() {
    const modificator = [{
        name: "",
        lastName: "",
        username: "",
        email: "",
        legajoId: "",
    }]
    return modificator
}

async function dataUserModificatorNotEmpty(userCreator) {
    const userModificator = [{
        name: userCreator.name,
        lastName: userCreator.lastName,
        username: userCreator.username,
        email: userCreator.email,
        legajoId: userCreator.legajoId
    }]
    return userModificator
}

async function dataUserAuthorizator(userCreator) {
    const user = [{
        name: userCreator.name,
        lastName: userCreator.lastName,
        username: userCreator.username,
        email: userCreator.email,
        legajoId: userCreator.legajoId
    }]
    return user
}

async function dataUserOciOwnerEmpty() {
    const modificator = [{
        name: "",
        lastName: "",
        username: "",
        email: "",
        legajoId: ""
    }]
    return modificator
}

async function dataToolEmpty() {
    const tool = [{
        designation: "",
        code: "",
        type: "",
        model: "",
        imageTool: "",
    }]
    return tool
}


module.exports = {
    dataUserCreator,
    dataUserModificatorEmpty,
    dataUserModificatorNotEmpty,
    dataUserAuthorizator,
    dataUserOciOwnerEmpty,
    dataToolEmpty
}