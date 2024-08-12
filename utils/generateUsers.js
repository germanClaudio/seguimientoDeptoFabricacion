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

module.exports = {
    dataUserCreator,
    dataUserModificatorEmpty,
    dataUserModificatorNotEmpty
}