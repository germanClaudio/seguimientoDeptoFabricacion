function dataUserCreator(userCreator) {
    const user = [{
        name: userCreator.name,
        lastName: userCreator.lastName,
        username: userCreator.username,
        email: userCreator.email
    }]
    return user
}

function dataUserModificatorEmpty() {
    const modificator = [{
        name: "",
        lastName: "",
        username: "",
        email: ""
    }]
    return modificator
}

function dataUserModificatorNotEmpty(userCreator) {
    const userModificator = [{
        name: userCreator.name,
        lastName: userCreator.lastName,
        username: userCreator.username,
        email: userCreator.email
    }]
    return userModificator
}

function dataUserAuthorizator(userCreator) {
    const user = [{
        name: userCreator.name,
        lastName: userCreator.lastName,
        username: userCreator.username,
        email: userCreator.email
    }]
    return user
}

function dataUserOciOwnerEmpty() {
    const modificator = [{
        name: "",
        lastName: "",
        username: "",
        email: "",
        legajoId: ""
    }]
    return modificator
}

function dataToolEmpty() {
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