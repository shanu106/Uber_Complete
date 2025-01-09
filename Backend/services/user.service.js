const userModel = require('../models/userModel')


// check if all fields are filled or not if field than export eles return error

module.exports.createUser = async ({
    fullname, email, password
}) =>{
    if(!fullname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname, email, password
    })
    return user;
}